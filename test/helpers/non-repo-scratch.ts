/**
 * non-repo-scratch.ts — scratch directories that are guaranteed to sit outside
 * any git repository, whatever `os.tmpdir()` resolves to.
 *
 * Fixtures that stand for "not a repository" otherwise inherit an enclosing
 * checkout when TMPDIR lives inside a worktree. This pins
 * GIT_CEILING_DIRECTORIES to the fixture's parent so git never ascends out of
 * the fixture, and asserts up front that no repository is discovered, naming
 * the git directory when one is.
 */

import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { dirname } from "node:path";
import { makeScratch, removeScratch } from "./scratch.js";

const CEILING = "GIT_CEILING_DIRECTORIES";

export interface NonRepoScratch {
  dir: string;
  /** Restores the environment and removes the directory. */
  dispose: () => void;
}

/** Throws, naming the discovered git directory, when `dir` lies inside a repository. */
export function assertOutsideRepository(dir: string): void {
  let found: string;
  try {
    found = execFileSync("git", ["rev-parse", "--absolute-git-dir"], {
      cwd: dir,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return;
  }
  throw new Error(`fixture ${dir} is inside a git repository (discovered ${found || ".git"}); it must be outside any repository`);
}

/**
 * Pin GIT_CEILING_DIRECTORIES to the real parent of `dir` for the current
 * process and assert `dir` then discovers no repository. Returns a restore
 * function that puts the previous value back.
 */
export function pinNonRepo(dir: string): () => void {
  const previous = process.env[CEILING];
  const parent = realpathSync(dirname(realpathSync(dir)));
  process.env[CEILING] = previous ? `${previous}:${parent}` : parent;
  const restore = (): void => {
    if (previous === undefined) delete process.env[CEILING];
    else process.env[CEILING] = previous;
  };
  try {
    assertOutsideRepository(dir);
  } catch (error) {
    restore();
    throw error;
  }
  return restore;
}

/** A fresh temp directory under tmpdir() pinned outside any repository, allocated through the tracked scratch path (wb-g5o) so the leak guard covers it. */
export function nonRepoScratch(prefix: string): NonRepoScratch {
  const dir = makeScratch(prefix);
  let restore: () => void;
  try {
    restore = pinNonRepo(dir);
  } catch (error) {
    removeScratch(dir);
    throw error;
  }
  return {
    dir,
    dispose() {
      restore();
      removeScratch(dir);
    },
  };
}
