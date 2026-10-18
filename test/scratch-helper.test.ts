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

import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sessionTaskDir } from "../src/output-file.js";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import { drainLeaks, installScratchLeakGuard, makeScratch, removeScratch, sessionScratchFor } from "./helpers/scratch.js";

installScratchLeakGuard();

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

  // wb-g5o U3 (gate verdict): "so a regression goes red in the leaking suite". A path
  // re-created AFTER removeScratch (the strict-agent-files fire-and-forget class) must
  // still be named, so removed paths stay audited until the suite's afterAll.
  it("drainLeaks names a directory re-created after removeScratch", () => {
    const dir = makeScratch("scratch-helper-f-");
    removeScratch(dir);
    mkdirSync(dir);

    const leaked = drainLeaks();

    expect(leaked).toContain(dir);
    expect(existsSync(dir)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });

  it("drainLeaks names a session tree re-created after removeScratch", () => {
    const dir = makeScratch("scratch-helper-g-");
    removeScratch(dir);
    sessionTaskDir(dir, "s1");
    const [session] = sessionScratchFor(dir);
    expect(session && existsSync(session)).toBe(true);

    const leaked = drainLeaks();

    expect(session && leaked).toContain(session);
    expect(session && existsSync(session)).toBe(false);
  });

  it("the installed afterAll guard throws naming every leaked path", async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(hook => {
      registered = hook;
    });
    expect(registered).toBeTypeOf("function");

    await expect(registered?.()).resolves.toBeUndefined();

    const dir = makeScratch("scratch-helper-h-");
    await expect(registered?.()).rejects.toThrow(dir);
    expect(existsSync(dir)).toBe(false);
  });

  // The strict-agent-files class: fire-and-forget work lands AFTER the suite's last
  // removeScratch. The guard settles before auditing, so a late re-creation goes red.
  it("the installed afterAll guard names a directory re-created shortly after removeScratch", async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(hook => {
      registered = hook;
    });
    const dir = makeScratch("scratch-helper-i-");
    removeScratch(dir);
    setTimeout(() => mkdirSync(dir), 20);

    await expect(registered?.()).rejects.toThrow(dir);
    expect(existsSync(dir)).toBe(false);
  });

  // wb-g5o owner ruling (16:08Z): one scratch discipline. nonRepoScratch allocates
  // through the tracked path, keeping its public API.
  it("nonRepoScratch directories are tracked: an undisposed one is named, a disposed one is not", () => {
    const kept = nonRepoScratch("scratch-helper-nr-a-");
    const leaked = drainLeaks();
    expect(leaked).toContain(kept.dir);
    kept.dispose();

    const disposed = nonRepoScratch("scratch-helper-nr-b-");
    disposed.dispose();
    expect(existsSync(disposed.dir)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });
});
