/** wb-a9s (W22-H follow-up): pre-push commit-message invisible-point scan.
 * Spec (bead wb-a9s): "a pre-push check scanning git log --format=%B <base>..HEAD; any new commit whose MESSAGE
 * carries a guard-set code point refuses the push naming commit sha, line and U+XXXX - the message-side mirror
 * of the tree-side source-hygiene guard." Guard set: U+061C, U+200B-U+200F, U+202A-U+202E, U+2060,
 * U+2066-U+2069, U+FEFF. Motivation of record: wb-era F1, a rejected commit message carried raw invisible points
 * (incl. U+202E) against a 0-of-497 baseline.
 * Every code point below is built with String.fromCodePoint so this file itself carries no raw guard point.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GUARD_CODE_POINTS, isGuardCodePoint, scanCommitMessage, scanCommitMessages, scanCommitObject } from "../qa/workbench/commit-message-scan.mjs";

const SCRIPT = join(process.cwd(), "qa/workbench/commit-message-scan.mjs");
const cp = (n: number): string => String.fromCodePoint(n);
const hex = (n: number): string => `U+${n.toString(16).toUpperCase().padStart(4, "0")}`;

const EXPECTED: number[] = [0x061c, ...range(0x200b, 0x200f), ...range(0x202a, 0x202e), 0x2060, ...range(0x2066, 0x2069), 0xfeff];
function range(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let n = lo; n <= hi; n += 1) out.push(n);
  return out;
}

describe("wb-a9s guard set", () => {
  it("is exactly the bead's set: 1 + 5 + 5 + 1 + 4 + 1 = 17 points", () => {
    expect([...GUARD_CODE_POINTS]).toEqual(EXPECTED);
    expect(EXPECTED).toHaveLength(17);
  });

  for (const n of EXPECTED) {
    it(`flags ${hex(n)} wherever it sits in a message`, () => {
      const found = scanCommitMessage("abc123", `subject\n\nbody${cp(n)}tail\n`);
      expect(found).toEqual([{ sha: "abc123", line: 3, column: 5, codePoint: hex(n) }]);
    });
  }

  it("does not flag the neighbours just outside each range or ordinary text", () => {
    const outside = [0x061b, 0x061d, 0x200a, 0x2010, 0x2028, 0x2029, 0x202f, 0x2061, 0x2065, 0x206a, 0xfefe, 0xff00, 0x00a0, 0x00ad, 0x1f600];
    for (const n of outside) {
      expect(isGuardCodePoint(n), hex(n)).toBe(false);
      expect(scanCommitMessage("s", `x${cp(n)}y\n`), hex(n)).toEqual([]);
    }
    expect(scanCommitMessage("s", "feat: plain ascii message\n\nbody line\n")).toEqual([]);
  });
});

describe("wb-a9s scanner positions and multiplicity", () => {
  it("reports line (1-based) and column (1-based, in code points) and every occurrence", () => {
    const msg = `subject\nsecond ${cp(0x202e)}${cp(0x200b)}\n\nlast${cp(0xfeff)}\n`;
    expect(scanCommitMessage("deadbeef", msg)).toEqual([
      { sha: "deadbeef", line: 2, column: 8, codePoint: "U+202E" },
      { sha: "deadbeef", line: 2, column: 9, codePoint: "U+200B" },
      { sha: "deadbeef", line: 4, column: 5, codePoint: "U+FEFF" },
    ]);
  });

  it("counts an astral character as one column so a later point is not mis-positioned", () => {
    expect(scanCommitMessage("s", `${cp(0x1f600)}${cp(0x2066)}\n`)).toEqual([{ sha: "s", line: 1, column: 2, codePoint: "U+2066" }]);
  });

  it("counts CRLF as one line break", () => {
    expect(scanCommitMessage("s", `a\r\nb${cp(0x2069)}\r\n`)).toEqual([{ sha: "s", line: 2, column: 2, codePoint: "U+2069" }]);
  });

  it("scans several commits and names each offending sha", () => {
    const rows = scanCommitMessages([
      { sha: "aaa", message: "clean\n" },
      { sha: "bbb", message: `bad${cp(0x061c)}\n` },
      { sha: "ccc", message: `${cp(0x2060)}bad\n` },
    ]);
    expect(rows.map((r) => [r.sha, r.line, r.column, r.codePoint])).toEqual([
      ["bbb", 1, 4, "U+061C"],
      ["ccc", 1, 1, "U+2060"],
    ]);
  });
});

describe("wb-a9s commit objects: raw bytes, NUL, author and committer identity (owner F7, F8)", () => {
  const sha = "abc123";
  const object = (headers: string, message: string): Buffer => Buffer.from(`tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904\n${headers}\n${message}`, "utf8");
  const ident = (role: string, name: string, email = "t@example.invalid"): string => `${role} ${name} <${email}> 0 +0000\n`;

  it("scans the author line, the committer line and the message of one object in that order", () => {
    const raw = object(`${ident("author", `a${cp(0x202e)}b`)}${ident("committer", "c", `e${cp(0x200b)}@x.invalid`)}`, `subject\nbody${cp(0x2060)}\n`);
    expect(scanCommitObject(sha, raw)).toEqual([
      { sha, field: "author", column: 2, codePoint: "U+202E" },
      { sha, field: "committer", column: 5, codePoint: "U+200B" },
      { sha, field: "message", line: 2, column: 5, codePoint: "U+2060" },
    ]);
  });

  it("numbers message lines from the first message line, not from the object header", () => {
    expect(scanCommitObject(sha, object(`${ident("author", "a")}${ident("committer", "c")}`, `${cp(0xfeff)}x\n`))).toEqual([{ sha, field: "message", line: 1, column: 1, codePoint: "U+FEFF" }]);
  });

  it("does not read a header-lookalike line inside the message as an identity", () => {
    const raw = object(`${ident("author", "a")}${ident("committer", "c")}`, `subject\n\nauthor x${cp(0x202e)}y <e@x.invalid> 0 +0000\n`);
    expect(scanCommitObject(sha, raw)).toEqual([{ sha, field: "message", line: 3, column: 9, codePoint: "U+202E" }]);
  });

  it("reads past a NUL: a point after a NUL byte in the message is still found", () => {
    const raw = object(`${ident("author", "a")}${ident("committer", "c")}`, `subject\n\nhidden\0tail${cp(0x202e)}\n`);
    expect(scanCommitObject(sha, raw)).toEqual([{ sha, field: "message", line: 3, column: 12, codePoint: "U+202E" }]);
  });

  it("returns nothing for a clean object and tolerates an object with no message", () => {
    expect(scanCommitObject(sha, object(`${ident("author", "a")}${ident("committer", "c")}`, "feat: clean\n"))).toEqual([]);
    expect(scanCommitObject(sha, Buffer.from(`tree x\n${ident("author", "a")}${ident("committer", "c")}`, "utf8"))).toEqual([]);
  });
});

/** Git variables that choose which repository, index, object store or config a git child acts on. A pre-push hook run from
 * a linked worktree receives GIT_DIR, so a fixture that spreads process.env writes its commits into the OUTER repository. */
const GIT_LOCATING = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE", "GIT_CONFIG_PARAMETERS", "GIT_CONFIG_COUNT"];
function scrubGitEnv(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const out: NodeJS.ProcessEnv = { ...source };
  for (const key of Object.keys(out)) if (GIT_LOCATING.includes(key) || /^GIT_CONFIG_(KEY|VALUE)_\d+$/.test(key)) delete out[key];
  return out;
}

const ZEROS = "0".repeat(40);
const dirs: string[] = [];
afterAll(() => {
  for (const d of dirs) rmSync(d, { recursive: true, force: true });
});

interface Repo {
  readonly dir: string;
  git(...args: string[]): string;
  commit(message: string, extra?: NodeJS.ProcessEnv): string;
  run(...args: string[]): SpawnSyncReturns<string>;
}

/** A throwaway repository whose git children never see an inherited repository-locating variable. */
function makeRepo(inherited: NodeJS.ProcessEnv = process.env): Repo {
  const dir = mkdtempSync(join(tmpdir(), "a9s-"));
  dirs.push(dir);
  const env: NodeJS.ProcessEnv = { ...scrubGitEnv(inherited), GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@example.invalid", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@example.invalid", GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
  const git = (...args: string[]): string => execFileSync("git", args, { cwd: dir, env, encoding: "utf8" }).trim();
  git("init", "-q");
  return {
    dir,
    git,
    commit: (message, extra = {}) => {
      execFileSync("git", ["commit", "--allow-empty", "-q", "-m", message], { cwd: dir, env: { ...env, ...extra }, encoding: "utf8" });
      return git("rev-parse", "HEAD");
    },
    run: (...args) => spawnSync(process.execPath, [SCRIPT, ...args], { cwd: dir, env, encoding: "utf8" }),
  };
}

describe("wb-a9s CLI against a real repository (base..HEAD only)", () => {
  let repo: Repo;
  let old: string;
  let base: string;
  let clean: string;
  beforeAll(() => {
    repo = makeRepo();
    // A guard-set message BELOW the base is history, not a new commit: it must not refuse the push.
    old = repo.commit(`old${cp(0x202e)}history`);
    base = repo.commit("base commit");
    clean = repo.commit("feat: clean new commit");
  });

  it("exits 0 and prints nothing offending when every new message is clean (history below base ignored)", () => {
    const r = repo.run("--base", base);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("0 offenders");
    expect(r.stdout).not.toContain(old);
    expect(clean).toHaveLength(40);
  });

  it("exits 3 naming sha, line and U+XXXX, and never echoes the raw point", () => {
    const bad = repo.commit(`fix: tricky\n\nbody ${cp(0x202e)}reversed`);
    const r = repo.run("--base", base);
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(bad);
    expect(r.stdout).toContain("line 3");
    expect(r.stdout).toContain("U+202E");
    expect(r.stdout).not.toContain(cp(0x202e));
    expect(r.stderr).not.toContain(cp(0x202e));
  });

  it("exits 2 on a base it cannot resolve instead of passing silently", () => {
    const r = repo.run("--base", "no-such-rev");
    expect(r.status).toBe(2);
    expect(r.stdout).not.toContain("0 offenders");
  });

  it("exits 2 on a missing --base value", () => {
    expect(repo.run("--base").status).toBe(2);
  });

  it("exits 2 on an unknown argument and never echoes a raw point carried by it (owner O2)", () => {
    const r = repo.run(`--surprise${cp(0x202e)}`);
    expect(r.status).toBe(2);
    expect(r.stdout).not.toContain(cp(0x202e));
    expect(r.stderr).not.toContain(cp(0x202e));
    expect(r.stderr).toContain("unknown argument");
  });
});

describe("wb-a9s ANY NEW COMMIT: a non-tip offender under a clean tip (gate U3)", () => {
  it("exits 3, names the middle commit only, and counts exactly 3 commits and 1 offender", () => {
    const repo = makeRepo();
    const base = repo.commit("base commit");
    const first = repo.commit("feat: clean first");
    const bad = repo.commit(`fix: middle${cp(0x2066)}commit`);
    const tip = repo.commit("feat: clean tip");
    const r = repo.run("--base", base);
    const offenderLines = r.stdout.split("\n").filter((line) => /^[0-9a-f]{40} /.test(line));
    expect(r.status).toBe(3);
    expect(offenderLines).toEqual([`${bad} line 1 column 12 U+2066`]);
    expect(r.stdout).not.toContain(tip);
    expect(r.stdout).not.toContain(first);
    expect(r.stdout).toContain("commit-message-scan: 3 commits, 1 offenders");
  });
});

describe("wb-a9s commit range contract (owner F9: scan remote..local, every commit, all commits on a zero remote)", () => {
  it("scans every commit reachable from the tip when the remote sha is all zeros (a first push)", () => {
    const repo = makeRepo();
    const old = repo.commit(`old${cp(0x202e)}history`);
    repo.commit("base commit");
    repo.commit("feat: clean tip");
    const r = repo.run("--base", ZEROS);
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(old);
    expect(r.stdout).toContain("commit-message-scan: 3 commits, 1 offenders");
  });

  it("scans base..<tip> for an explicit --tip instead of HEAD", () => {
    const repo = makeRepo();
    const base = repo.commit("base commit");
    const bad = repo.commit(`fix: bad${cp(0x200b)}`);
    const tip = repo.commit("feat: clean tip");
    const atBad = repo.run("--base", base, "--tip", bad);
    expect(atBad.status).toBe(3);
    expect(atBad.stdout).toContain("commit-message-scan: 1 commits, 1 offenders");
    expect(repo.run("--base", base, "--tip", tip).stdout).toContain("2 commits, 1 offenders");
    expect(repo.run("--base", bad, "--tip", tip).status).toBe(0);
  });

  it("exits 2 on an unresolvable --tip and on a missing --tip value", () => {
    const repo = makeRepo();
    const base = repo.commit("base commit");
    expect(repo.run("--base", base, "--tip", "no-such-rev").status).toBe(2);
    expect(repo.run("--base", base, "--tip").status).toBe(2);
  });
});

describe("wb-a9s CLI reads the raw commit object (owner F7 NUL, F8 identity)", () => {
  it("finds a point hidden after a NUL byte that a NUL-terminated read would drop", () => {
    const repo = makeRepo();
    const base = repo.commit("base commit");
    const tree = repo.git("rev-parse", "HEAD^{tree}");
    const body = `tree ${tree}\nparent ${base}\nauthor t <t@example.invalid> 0 +0000\ncommitter t <t@example.invalid> 0 +0000\n\nsubject\n\nhidden\0${cp(0x202e)}tail\n`;
    const crafted = execFileSync("git", ["hash-object", "-t", "commit", "-w", "--literally", "--stdin"], { cwd: repo.dir, input: Buffer.from(body, "utf8"), encoding: "utf8", env: scrubGitEnv(process.env) }).trim();
    repo.git("update-ref", "HEAD", crafted);
    const r = repo.run("--base", base);
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(`${crafted} line 3 column 8 U+202E`);
    expect(r.stdout).not.toContain(cp(0x202e));
  });

  for (const [label, env] of [
    ["author name", { GIT_AUTHOR_NAME: `au${String.fromCodePoint(0x202e)}thor` }],
    ["author email", { GIT_AUTHOR_EMAIL: `a${String.fromCodePoint(0x202e)}@example.invalid` }],
    ["committer name", { GIT_COMMITTER_NAME: `co${String.fromCodePoint(0x202e)}mmitter` }],
    ["committer email", { GIT_COMMITTER_EMAIL: `c${String.fromCodePoint(0x202e)}@example.invalid` }],
  ] as const) {
    it(`exits 3 for U+202E in the ${label} and never echoes the raw point`, () => {
      const repo = makeRepo();
      const base = repo.commit("base commit");
      const bad = repo.commit("feat: a clean message", env);
      const r = repo.run("--base", base);
      expect(r.status).toBe(3);
      expect(r.stdout).toContain(bad);
      expect(r.stdout).toContain("U+202E");
      expect(r.stdout).toContain(label.startsWith("author") ? " author " : " committer ");
      expect(r.stdout).toContain("1 offenders");
      expect(r.stdout).not.toContain(cp(0x202e));
      expect(r.stderr).not.toContain(cp(0x202e));
    });
  }
});

describe("wb-a9s fixture isolation (owner O1, O3)", () => {
  it("scrubs every repository-locating git variable from an inherited environment", () => {
    const inherited: NodeJS.ProcessEnv = { PATH: process.env.PATH, KEEP: "1", GIT_CONFIG_KEY_0: "x", GIT_CONFIG_VALUE_0: "y" };
    for (const key of GIT_LOCATING) inherited[key] = "/sentinel";
    expect(scrubGitEnv(inherited)).toEqual({ PATH: process.env.PATH, KEEP: "1" });
  });

  it("with GIT_DIR inherited from a hook, fixture commits do not land in the sentinel repository", () => {
    const sentinel = makeRepo();
    const before = { head: sentinel.commit("sentinel only"), count: sentinel.git("rev-list", "--count", "--all") };
    const fixture = makeRepo({ ...process.env, GIT_DIR: join(sentinel.dir, ".git"), GIT_WORK_TREE: sentinel.dir });
    fixture.commit(`bad${cp(0x202e)}message`);
    fixture.commit("clean");
    expect(sentinel.git("rev-parse", "HEAD")).toBe(before.head);
    expect(sentinel.git("rev-list", "--count", "--all")).toBe(before.count);
  });

  it("leaves the OUTER repository HEAD unchanged across the whole suite", () => {
    expect(outerHead()).toBe(OUTER_HEAD_AT_START);
  });
});

function outerHead(): string | null {
  const r = spawnSync("git", ["rev-parse", "HEAD"], { cwd: process.cwd(), env: process.env, encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}
const OUTER_HEAD_AT_START = outerHead();
