/**
 * Pins test/helpers/scratch.ts (wb-g5o): suite scratch is removed together with the
 * per-session tree `sessionTaskDir` creates for it, and a survivor is reported by
 * path — so a suite that leaks goes red in itself rather than at the host's
 * inode floor.
 *
 * Spec (wb-g5o): "each harness removes its scratch ... on failure too; one shared
 * test/helpers scratch helper with an afterAll leak guard asserting none of the
 * suite's own prefixed directories remain under tmpdir()".
 *
 * Spec (wb-0xjp, owner filing): "drainLeaks() gets a bounded settle wait (poll until empty or ~10 s) before
 * throwing, so a true leak still reds and a slow teardown does not; assertion purpose unchanged. Never a retry of
 * tests." The rows in the wb-0xjp block pin both halves: a teardown still in flight when the suite drains (an
 * unawaited cleanup, a SIGTERM'd detached host removing what it holds as it exits) releases its scratch after the
 * settle and the suite stays green, while a leak nobody releases stays on disk through the wait, is named and removed
 * at the bound, and the two guard rows above still red at the default bound.
 */

import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sessionTaskDir } from "../src/output-file.js";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import {
  drainLeaks,
  installScratchLeakGuard,
  makeScratch,
  removeScratch,
  SCRATCH_SETTLE_BOUND_MS,
  SCRATCH_SETTLE_MS,
  sessionScratchFor,
} from "./helpers/scratch.js";

installScratchLeakGuard();

/** A guard row that waits out the whole default bound (a leak nobody releases) gets this per-row timeout (ms). */
const FULL_BOUND_ROW_TIMEOUT_MS = 30_000;

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

  it("the installed afterAll guard throws naming every leaked path", { timeout: FULL_BOUND_ROW_TIMEOUT_MS }, async () => {
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
  it("the installed afterAll guard names a directory re-created shortly after removeScratch", { timeout: FULL_BOUND_ROW_TIMEOUT_MS }, async () => {
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

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * A detached host that holds a scratch directory until it is SIGTERM'd and removes it as it exits, the way a host's own
 * exit sweep does. It prints one line once its SIGTERM listener is armed, so a signal sent after that line is handled.
 */
const HOST = `
const { rmSync } = require("node:fs");
const dir = process.argv[1];
process.on("SIGTERM", () => {
  rmSync(dir, { recursive: true, force: true });
  process.exit(0);
});
process.stdout.write("armed\\n");
setInterval(() => {}, 1000);
`;

/** Start HOST holding `dir`; resolves once it reports its SIGTERM listener armed. */
function startHost(dir: string): Promise<ChildProcess> {
  const host = spawn(process.execPath, ["-e", HOST, dir], { stdio: ["ignore", "pipe", "ignore"] });
  return new Promise((resolve, reject) => {
    let stdout = "";
    const timer = setTimeout(() => reject(new Error("the host did not report within 20000 ms")), 20_000);
    host.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
      if (!stdout.includes("\n")) return;
      clearTimeout(timer);
      resolve(host);
    });
    host.once("exit", () => {
      clearTimeout(timer);
      if (!stdout.includes("\n")) reject(new Error("the host exited before reporting"));
    });
  });
}

describe("scratch leak guard: the bounded settle wait (wb-0xjp)", () => {
  it("a teardown still in flight when the suite drains releases its scratch after the settle: the guard waits for it and stays green", { timeout: FULL_BOUND_ROW_TIMEOUT_MS }, async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(hook => {
      registered = hook;
    });
    const dir = makeScratch("scratch-helper-j-");
    // An unawaited cleanup: it lands four settles in, after the guard's first look.
    const release = setTimeout(() => removeScratch(dir), SCRATCH_SETTLE_MS * 4);
    try {
      await expect(registered?.()).resolves.toBeUndefined();
      expect(existsSync(dir)).toBe(false);
    } finally {
      clearTimeout(release);
      removeScratch(dir);
    }
  });

  it("a SIGTERM'd detached host that removes the scratch it holds as it exits settles before the audit: the guard stays green", { timeout: FULL_BOUND_ROW_TIMEOUT_MS }, async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(hook => {
      registered = hook;
    });
    const dir = makeScratch("scratch-helper-k-");
    const host = await startHost(dir);
    // The suite drains while the host still runs; its teardown SIGTERMs it four settles in.
    const term = setTimeout(() => host.kill("SIGTERM"), SCRATCH_SETTLE_MS * 4);
    try {
      await expect(registered?.()).resolves.toBeUndefined();
      expect(existsSync(dir)).toBe(false);
    } finally {
      clearTimeout(term);
      if (host.exitCode === null && host.signalCode === null) host.kill("SIGKILL");
      removeScratch(dir);
    }
  });

  it("the wait only observes: a leak nobody releases stays on disk through the wait, then is named and removed at the bound", { timeout: FULL_BOUND_ROW_TIMEOUT_MS }, async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(
      hook => {
        registered = hook;
      },
      { boundMs: 2_000 },
    );
    const dir = makeScratch("scratch-helper-l-");
    const outcome = registered?.().then(
      () => undefined,
      (error: unknown) => error,
    );
    // Past the settle, inside the bound: a drain here would remove the leak and leave nothing to name at the bound.
    await sleep(SCRATCH_SETTLE_MS * 2);
    const midWait = existsSync(dir);
    const error = await outcome;
    expect({
      midWait,
      named: error instanceof Error && error.message.includes(dir),
      removed: !existsSync(dir),
    }).toEqual({ midWait: true, named: true, removed: true });
  });

  it("the default bound is 10 s, and the guard registers its hook with a timeout that covers the settle plus the bound", () => {
    let timeout: number | undefined;
    installScratchLeakGuard((_hook, hookTimeout) => {
      timeout = hookTimeout;
    });
    expect(SCRATCH_SETTLE_BOUND_MS).toBe(10_000);
    expect(timeout).toBeGreaterThan(SCRATCH_SETTLE_MS + SCRATCH_SETTLE_BOUND_MS);
  });

  it("a suite that leaks nothing pays nothing: a clean audit resolves without waiting out the bound", async () => {
    let registered: (() => Promise<void>) | undefined;
    installScratchLeakGuard(hook => {
      registered = hook;
    });
    removeScratch(makeScratch("scratch-helper-m-"));
    const started = performance.now();
    await expect(registered?.()).resolves.toBeUndefined();
    expect(performance.now() - started).toBeLessThan(10_000);
  });
});
