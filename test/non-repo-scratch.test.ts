/**
 * wb-7uq: "not a repository" fixtures must not depend on where TMPDIR lives.
 * The shared helper pins GIT_CEILING_DIRECTORIES to the fixture's parent and
 * asserts up front that git discovers no repository, naming the discovered
 * git directory when it does.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { assertOutsideRepository, nonRepoScratch, pinNonRepo } from "./helpers/non-repo-scratch.js";

const CEILING = "GIT_CEILING_DIRECTORIES";
const cleanup: string[] = [];
const savedCeiling = process.env[CEILING];
const savedTmp = process.env.TMPDIR;

function outerRepo(): string {
  const outer = mkdtempSync(join(tmpdir(), "pi-nonrepo-outer-"));
  cleanup.push(outer);
  execFileSync("git", ["init", "-q", outer], { stdio: "pipe" });
  return outer;
}

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(() => {
  restoreEnv(CEILING, savedCeiling);
  restoreEnv("TMPDIR", savedTmp);
  for (const dir of cleanup.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("non-repository scratch fixtures", () => {
  it("makes a directory nested in a repository discover no repository once pinned", () => {
    const outer = outerRepo();
    const inner = join(outer, "nested", "fixture");
    mkdirSync(inner, { recursive: true });
    delete process.env[CEILING];
    const restore = pinNonRepo(inner);
    try {
      expect(() => execFileSync("git", ["rev-parse", "--git-dir"], { cwd: inner, stdio: "pipe" })).toThrow();
    } finally {
      restore();
    }
  });

  it("pins the ceiling to the fixture's real parent, keeps an existing ceiling, and restores the prior value", () => {
    const outer = outerRepo();
    const inner = join(outer, "fixture");
    mkdirSync(inner);
    process.env[CEILING] = "/sentinel";
    const restore = pinNonRepo(inner);
    expect(process.env[CEILING]?.split(":")).toEqual(["/sentinel", realpathSync(outer)]);
    restore();
    expect(process.env[CEILING]).toBe("/sentinel");
    delete process.env[CEILING];
    pinNonRepo(inner)();
    expect(process.env[CEILING]).toBeUndefined();
  });

  it("fails up front naming the discovered git directory when the fixture itself is a repository", () => {
    const outer = outerRepo();
    delete process.env[CEILING];
    expect(() => assertOutsideRepository(outer)).toThrow(/\.git/);
    expect(() => pinNonRepo(outer)).toThrow(/inside a git repository.*\.git/s);
    expect(process.env[CEILING]).toBeUndefined();
  });

  it("creates scratch that is outside any repository even when TMPDIR sits inside one, and disposes it", () => {
    const outer = outerRepo();
    const inside = join(outer, "tmp");
    mkdirSync(inside);
    process.env.TMPDIR = inside;
    delete process.env[CEILING];
    const scratch = nonRepoScratch("pi-nonrepo-test-");
    expect(scratch.dir.startsWith(realpathSync(inside)) || scratch.dir.startsWith(inside)).toBe(true);
    expect(() => execFileSync("git", ["rev-parse", "--git-dir"], { cwd: scratch.dir, stdio: "pipe" })).toThrow();
    scratch.dispose();
    expect(existsSync(scratch.dir)).toBe(false);
    expect(process.env[CEILING]).toBeUndefined();
  });
});
