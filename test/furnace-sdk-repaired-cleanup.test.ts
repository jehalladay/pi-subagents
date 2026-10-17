/**
 * Pins test/helpers/furnace-sdk-repaired.ts cleanup (wb-g5o, owner fold F2 recorded by the
 * wb-zmd landing dispositions): "copies the whole SDK to os.tmpdir() with no cleanup (87 inodes
 * / 888 KB per suite run)". The copy is allocated through the tracked scratch path and
 * `dispose()` removes it, so the leak guard names a suite that forgets.
 */

import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { describe, expect, it } from "vitest";
import { loadRepairedFurnaceSdk } from "./helpers/furnace-sdk-repaired.js";
import { drainLeaks, installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

describe("loadRepairedFurnaceSdk cleanup", () => {
  it("dispose removes the whole temp copy", async () => {
    const repaired = await loadRepairedFurnaceSdk();
    const copyDir = dirname(repaired.root);
    expect(existsSync(repaired.root)).toBe(true);

    repaired.dispose();

    expect(existsSync(repaired.root)).toBe(false);
    expect(existsSync(copyDir)).toBe(false);
    expect(drainLeaks()).toEqual([]);
  });

  it("an undisposed copy is named by the leak guard's audit", async () => {
    const repaired = await loadRepairedFurnaceSdk();
    const copyDir = dirname(repaired.root);

    const leaked = drainLeaks();

    expect(leaked).toContain(copyDir);
    expect(existsSync(copyDir)).toBe(false);
  });
});
