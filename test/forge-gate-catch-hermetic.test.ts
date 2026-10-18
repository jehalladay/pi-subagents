/**
 * wb-e6w: the forge-gate-catch helper (test/helpers/forge-gate-catch.ts, landed by wb-a3s.1) boots the real extension and calls the
 * registered forge_gate_run tool. It pinned only PI_CODING_AGENT_DIR, so the booted process and the tool call could read the invoking
 * user's real HOME and cwd. These rows pin the cure: while the helper boots and calls, HOME and cwd are scratch directories the
 * helper made, the host values come back afterwards, and the scratch HOME is removed with the rest of the sandbox.
 *
 * The "host" state here is itself a scratch directory holding an OBVIOUSLY FAKE canary file, so no row ever touches the real HOME.
 * The @forge/sdk seam is the same shape as the corpus file's: ServerConnection.spawn() returns a connection whose initialize()
 * rejects, and the fake records what the process looked like at that moment.
 */
import { existsSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type * as ForgeSdk from "@forge/sdk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { forgeGateCatchDriver } from "./helpers/forge-gate-catch.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

const CANARY = "wb-e6w-fake-host-canary.txt";

interface Seen {
  home: string | undefined;
  cwd: string;
  agentDir: string | undefined;
  homeEntries: string[];
  canaryViaHome: boolean;
  canaryViaCwd: boolean;
}

const seam = vi.hoisted(() => ({ message: "wb-e6w obviously fake forge connection refusal", seen: [] as Seen[] }));

vi.mock("@forge/sdk", async importOriginal => {
  const original = await importOriginal<typeof ForgeSdk>();
  const { existsSync: exists, readdirSync: list } = await import("node:fs");
  const { join: joinPath } = await import("node:path");
  const connection = {
    initialize: async (): Promise<never> => {
      const home = process.env.HOME;
      seam.seen.push({
        home,
        cwd: process.cwd(),
        agentDir: process.env.PI_CODING_AGENT_DIR,
        homeEntries: home === undefined ? [] : list(home),
        canaryViaHome: home !== undefined && exists(joinPath(home, "wb-e6w-fake-host-canary.txt")),
        canaryViaCwd: exists("wb-e6w-fake-host-canary.txt"),
      });
      throw new Error(seam.message);
    },
    close: async (): Promise<void> => {},
  };
  return { ...original, ServerConnection: { spawn: () => connection } };
});

installScratchLeakGuard();

describe("wb-e6w forge-gate-catch helper is hermetic about HOME and cwd", () => {
  let fakeHost = "";
  let hostHome: string | undefined;
  let hostCwd = "";
  let hostAgentDir: string | undefined;
  const cleanups: Array<() => void | Promise<void>> = [];

  beforeEach(() => {
    seam.seen.length = 0;
    fakeHost = realpathSync(makeScratch("wb-e6w-fakehost-"));
    writeFileSync(join(fakeHost, CANARY), "obviously fake canary, not a credential");
    hostHome = process.env.HOME;
    hostCwd = process.cwd();
    hostAgentDir = process.env.PI_CODING_AGENT_DIR;
    process.env.HOME = fakeHost;
    process.chdir(fakeHost);
  });

  afterEach(async () => {
    for (const hook of cleanups.splice(0)) await hook();
    process.chdir(hostCwd);
    if (hostHome === undefined) delete process.env.HOME;
    else process.env.HOME = hostHome;
    if (hostAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = hostAgentDir;
    removeScratch(fakeHost);
  });

  const driver = () => forgeGateCatchDriver(raw => { seam.message = raw; }, hook => { cleanups.push(hook); });

  it("the tool call runs with HOME and cwd pinned to scratch directories, not the invoking user's", async () => {
    const plain = "wb-e6w obviously fake forge connection refusal";
    expect(await driver()(plain)).toEqual([plain]);
    const [seen] = seam.seen;
    expect(seen).toBeDefined();
    if (!seen) return;
    expect(seen.canaryViaHome).toBe(false);
    expect(seen.canaryViaCwd).toBe(false);
    expect(seen.home).toBeDefined();
    expect(seen.home).not.toBe(fakeHost);
    expect(realpathSync(seen.cwd)).not.toBe(fakeHost);
    expect(seen.agentDir).toBeDefined();
    expect(seen.home).not.toBe(seen.agentDir);
    expect(seen.homeEntries).toEqual([]);
  });

  it("restores the invoking process HOME, cwd and PI_CODING_AGENT_DIR after the call", async () => {
    await driver()("wb-e6w obviously fake forge connection refusal");
    expect(process.env.HOME).toBe(fakeHost);
    expect(process.cwd()).toBe(fakeHost);
    expect(process.env.PI_CODING_AGENT_DIR).toBe(hostAgentDir);
  });

  it("removes the scratch HOME with the sandbox when the registered hook runs", async () => {
    await driver()("wb-e6w obviously fake forge connection refusal");
    const home = seam.seen[0]?.home;
    expect(home).toBeDefined();
    expect(existsSync(home ?? "")).toBe(true);
    for (const hook of cleanups.splice(0)) await hook();
    expect(existsSync(home ?? "")).toBe(false);
    expect(readdirSync(fakeHost)).toEqual([CANARY]);
  });
});
