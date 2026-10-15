/**
 * Pins test/helpers/scratch.ts (wb-g5o): suite scratch is removed together with the
 * per-session tree `sessionTaskDir` creates for it, and a survivor is reported by
 * path — so a suite that leaks goes red in itself rather than at the host's
 * inode floor.
 *
 * Spec (wb-g5o): "each harness removes its scratch ... on failure too; one shared
 * test/helpers scratch helper with an afterAll leak guard asserting none of the
 * suite's own prefixed directories remain under tmpdir()".
 */

import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sessionTaskDir } from "../src/output-file.js";
import { drainLeaks, makeScratch, removeScratch, sessionScratchFor } from "./helpers/scratch.js";

describe("scratch helper", () => {
  it("makeScratch creates a directory under tmpdir() with the requested prefix", () => {
    const dir = makeScratch("scratch-helper-a-");
    try {
      expect(dir.startsWith(join(tmpdir(), "scratch-helper-a-"))).toBe(true);
      expect(existsSync(dir)).toBe(true);
    } finally {
      removeScratch(dir);
    }
  });

  it("removeScratch removes the directory AND the session tree sessionTaskDir made for it", () => {
    const dir = makeScratch("scratch-helper-b-");
    const tasks = sessionTaskDir(dir, "s1");
    expect(existsSync(tasks)).toBe(true);
    const [session] = sessionScratchFor(dir);
    expect(session && existsSync(session)).toBe(true);

    removeScratch(dir);

    expect(existsSync(dir)).toBe(false);
    expect(existsSync(tasks)).toBe(false);
    expect(session && existsSync(session)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });

  it("removeScratch also removes session trees for directories nested beneath the scratch dir", () => {
    const dir = makeScratch("scratch-helper-e-");
    const nestedTasks = sessionTaskDir(join(dir, "nested"), "s1");
    expect(existsSync(nestedTasks)).toBe(true);

    removeScratch(dir);

    expect(existsSync(nestedTasks)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });

  it("drainLeaks names each surviving path (directory and session tree) and clears it", () => {
    const dir = makeScratch("scratch-helper-c-");
    sessionTaskDir(dir, "s1");
    const [session] = sessionScratchFor(dir);

    const leaked = drainLeaks();

    expect(leaked).toContain(dir);
    expect(session && leaked).toContain(session);
    expect(existsSync(dir)).toBe(false);
    expect(session && existsSync(session)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });

  it("removeScratch tolerates undefined and already-removed paths", () => {
    const dir = makeScratch("scratch-helper-d-");
    removeScratch(undefined, dir);
    expect(() => removeScratch(dir)).not.toThrow();
  });
});
