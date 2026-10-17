/**
 * wb-973.18 (row-425 F2 option (b)): the literal boot-channel proof of the SCG-R6 contract.
 *
 * wb-973.6 / 973.7 landed the allowlist route: the detached host child is spawned with
 * scrubbedEnvironment(process.env) (src/workbench/process-env.ts) and the two rf workspace
 * locators ride that allowlist. The census (test/workbench-env-scrub-census.test.ts) reads the
 * options handed to a captured spawn; it never looks at the process that actually started. This
 * suite closes that last step: it launches the REAL detached host child, reads the kernel's
 * view of that child's initial environment (/proc/<pid>/environ), and asserts it.
 *
 *   1. RF_WORKSPACE and SWARM_RF_WORKSPACE are present with the host's exact values.
 *   2. A credential-shaped canary name and one unlisted operational name set on the host are
 *      ABSENT from the child's environment (allowlist-only construction, never subtraction).
 *   3. A child that cannot be spawned FAILS the suite; there is no skip path anywhere in it.
 *
 * Test-only: no src change, the allowlist is not edited. The canary value is an obviously fake
 * placeholder (W19 rule), never a real key. The assertions name variable NAMES and the locator
 * values the test itself set; no display path is added.
 */
import { chmodSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { type DetachedLaunchRequest, launchDetachedWorkflow } from "../src/workbench/hosts/local-detached.js";
import { installScratchLeakGuard, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** Short root: the detached socket path is bounded (103 bytes), so fixtures never sit under an inherited TMPDIR. */
const SHORT_ROOT = "/tmp";
const NO_RUN_USER = "/nonexistent-run-user";

const LOCATORS = { RF_WORKSPACE: "/srv/swarm/rf-child-parity", SWARM_RF_WORKSPACE: "/srv/swarm/rf-swarm-child-parity" } as const;
/** An obviously fake credential-shaped placeholder (standing rule 7). */
const CANARY_CREDENTIAL = { name: "WB973_18_CANARY_API_KEY", value: "sk-ant-api03-FAKE-PLACEHOLDER-NOT-A-REAL-KEY-0000" } as const;
/** An operational-looking name that is not on DETACHED_HOST_ENV_ALLOWLIST. */
const UNLISTED_OPERATIONAL = { name: "WB973_18_UNLISTED_OPERATIONAL_SETTING", value: "unlisted-operational-value" } as const;
const HOST_ENV_NAMES = [...Object.keys(LOCATORS), CANARY_CREDENTIAL.name, UNLISTED_OPERATIONAL.name] as const;

const scratch: string[] = [];
const hostPids: number[] = [];
let savedEnv: Record<string, string | undefined> = {};

function privateDir(prefix: string): string {
  const dir = trackScratch(realpathSync(mkdtempSync(join(SHORT_ROOT, prefix)))); chmodSync(dir, 0o700); scratch.push(dir); return dir;
}
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
async function gone(pid: number): Promise<boolean> {
  for (let i = 0; i < 150 && alive(pid); i++) await new Promise(resolve => setTimeout(resolve, 20));
  return !alive(pid);
}
beforeEach(() => {
  savedEnv = Object.fromEntries(HOST_ENV_NAMES.map(name => [name, process.env[name]]));
});
afterEach(async () => {
  const stopping = hostPids.splice(0);
  for (const pid of stopping) { try { process.kill(pid, "SIGTERM"); } catch {} }
  // Each host has exited (bounded) before its fixtures are removed: it unlinks its own socket directory while stopping (wb-e37).
  await Promise.all(stopping.map(gone));
  for (const name of HOST_ENV_NAMES) {
    const prior = savedEnv[name];
    if (prior === undefined) delete process.env[name]; else process.env[name] = prior;
  }
  removeScratch(...scratch.splice(0));
});

function launchRequest(invocationId: string): DetachedLaunchRequest {
  const cwd = privateDir("env973-ws-");
  const scriptPath = join(cwd, "pure.js");
  writeFileSync(scriptPath, 'export const meta={name:"detached",description:"local computation"}; return 42;');
  const directory = join(privateDir("env973-root-"), "hosts");
  return { directory, invocationId, scriptPath, cwd, input: null, trustedScript: true, backend: "deterministic", providers: [], grants: [], permissions: ["inspect", "execute", "cancel", "shutdown"], sourceFiles: [scriptPath] };
}

/** The child's initial environment as the kernel holds it: NAME=value entries split on NUL, first occurrence wins. */
function childEnviron(pid: number): Map<string, string> {
  const raw = readFileSync(`/proc/${pid}/environ`, "utf8");
  const entries = new Map<string, string>();
  for (const entry of raw.split("\0")) {
    if (entry === "") continue;
    const at = entry.indexOf("=");
    if (at <= 0) continue;
    const name = entry.slice(0, at);
    if (!entries.has(name)) entries.set(name, entry.slice(at + 1));
  }
  return entries;
}

/** Launch the real detached host child with the four host variables set and return its environment. */
async function launchedChildEnviron(invocationId: string): Promise<{ pid: number; environ: Map<string, string> }> {
  process.env.RF_WORKSPACE = LOCATORS.RF_WORKSPACE;
  process.env.SWARM_RF_WORKSPACE = LOCATORS.SWARM_RF_WORKSPACE;
  process.env[CANARY_CREDENTIAL.name] = CANARY_CREDENTIAL.value;
  process.env[UNLISTED_OPERATIONAL.name] = UNLISTED_OPERATIONAL.value;
  const base = privateDir("env973-sock-");
  const receipt = await launchDetachedWorkflow(launchRequest(invocationId), { env: {}, tmpdir: base, runUserRoot: NO_RUN_USER });
  hostPids.push(receipt.pid);
  return { pid: receipt.pid, environ: childEnviron(receipt.pid) };
}

describe("wb-973.18 live-child env parity: /proc/<pid>/environ of the real detached host child", () => {
  it("reads the environment of the process the launch receipt names, which is alive and is not this process (instrument check)", async () => {
    const { pid, environ } = await launchedChildEnviron("env973-instrument");
    expect(pid, "the receipt names a child, not the test process").not.toBe(process.pid);
    expect(alive(pid), "the child the receipt names is alive").toBe(true);
    expect(environ.size, "the child environment is non-empty and readable").toBeGreaterThan(0);
    expect(environ.has("PATH"), "an allowlisted operational name reaches the child (the read is the child's, not an empty map)").toBe(process.env.PATH !== undefined);
  }, 30000);

  it("carries both rf workspace locators into the child with the host's exact values (AC1)", async () => {
    const { environ } = await launchedChildEnviron("env973-locators");
    expect(environ.get("RF_WORKSPACE"), "RF_WORKSPACE in the live child").toBe(LOCATORS.RF_WORKSPACE);
    expect(environ.get("SWARM_RF_WORKSPACE"), "SWARM_RF_WORKSPACE in the live child").toBe(LOCATORS.SWARM_RF_WORKSPACE);
  }, 30000);

  it("withholds a credential-shaped canary and an unlisted operational name set on the host (AC2)", async () => {
    const { environ } = await launchedChildEnviron("env973-negatives");
    expect(process.env[CANARY_CREDENTIAL.name], "the canary was set on the host").toBe(CANARY_CREDENTIAL.value);
    expect(process.env[UNLISTED_OPERATIONAL.name], "the unlisted name was set on the host").toBe(UNLISTED_OPERATIONAL.value);
    expect(environ.has(CANARY_CREDENTIAL.name), `${CANARY_CREDENTIAL.name} reached the live child`).toBe(false);
    expect(environ.has(UNLISTED_OPERATIONAL.name), `${UNLISTED_OPERATIONAL.name} reached the live child`).toBe(false);
    for (const [name, value] of environ) {
      expect(value, `the child value of ${name} carries the canary credential`).not.toContain(CANARY_CREDENTIAL.value);
    }
  }, 30000);

  it("fails, never skips, when the child cannot be spawned (AC3)", async () => {
    // A launch whose script path is missing is refused before any child exists; the helper must surface that as a
    // rejection (a red test), so a missing child can never read as a pass or a skip.
    const request = { ...launchRequest("env973-nospawn"), scriptPath: "/nonexistent/wb-973-18/pure.js" };
    const base = privateDir("env973-sock-");
    await expect(launchDetachedWorkflow(request, { env: {}, tmpdir: base, runUserRoot: NO_RUN_USER })).rejects.toBeInstanceOf(Error);
    expect(hostPids.length, "no child was registered for a refused launch").toBe(0);
    expect(() => childEnviron(2 ** 22 + 7), "reading a pid that does not exist throws instead of returning an empty environment").toThrow();
  }, 30000);
});
