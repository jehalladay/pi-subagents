/** wb-71q: the detached Unix socket base prefers a short per-user runtime dir over a long TMPDIR. */
import { chmodSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { DETACHED_SOCKET_PATH_LIMIT, resolveDetachedSocket } from "../src/workbench/hosts/local-detached.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const uid = process.getuid?.() ?? 0;
const scratch: string[] = [];
const hosts: number[] = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
let savedEnv: { tmpdir?: string; xdg?: string } | undefined;
function private0700(prefix: string, parent = tmpdir()): string {
  const dir = realpathSync(mkdtempSync(join(parent, prefix))); chmodSync(dir, 0o700); scratch.push(dir); return dir;
}
afterEach(() => {
  for (const pid of hosts.splice(0)) { try { process.kill(pid, "SIGTERM"); } catch {} }
  if (savedEnv) {
    if (savedEnv.tmpdir === undefined) delete process.env.TMPDIR; else process.env.TMPDIR = savedEnv.tmpdir;
    if (savedEnv.xdg === undefined) delete process.env.XDG_RUNTIME_DIR; else process.env.XDG_RUNTIME_DIR = savedEnv.xdg;
    savedEnv = undefined;
  }
  sandbox?.restore(); sandbox = undefined;
  for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true });
});
const LONG_ROOT = `/${"x".repeat(100)}`;

describe("detached socket base selection (wb-71q)", () => {
  it("pins the Linux sun_path bound the refusal names", () => {
    expect(DETACHED_SOCKET_PATH_LIMIT).toBe(103);
  });
  it("prefers an owned 0700 absolute XDG_RUNTIME_DIR over tmpdir", () => {
    const xdg = private0700("xdg-");
    const found = resolveDetachedSocket(LONG_ROOT, "one", { env: { XDG_RUNTIME_DIR: xdg }, tmpdir: LONG_ROOT, uid });
    expect(found.source).toBe("XDG_RUNTIME_DIR"); expect(found.base).toBe(xdg);
    expect(found.socket.startsWith(`${xdg}/`)).toBe(true);
    expect(Buffer.byteLength(found.socket)).toBeLessThanOrEqual(DETACHED_SOCKET_PATH_LIMIT);
  });
  it("falls through to <runUserRoot>/<uid> when XDG_RUNTIME_DIR is unset, relative, or group-readable", () => {
    const runRoot = private0700("run-user-"); const perUser = join(runRoot, String(uid)); mkdirSync(perUser, { mode: 0o700 }); chmodSync(perUser, 0o700);
    const open = private0700("xdg-open-"); chmodSync(open, 0o750);
    for (const env of [{}, { XDG_RUNTIME_DIR: "relative/dir" }, { XDG_RUNTIME_DIR: open }]) {
      const found = resolveDetachedSocket(LONG_ROOT, "one", { env, tmpdir: LONG_ROOT, uid, runUserRoot: runRoot });
      expect(found.source).toBe("run-user"); expect(found.base).toBe(perUser);
    }
  });
  it("refuses a foreign-owned runtime dir rather than trusting it", () => {
    const xdg = private0700("xdg-foreign-");
    expect(() => resolveDetachedSocket(LONG_ROOT, "one", { env: { XDG_RUNTIME_DIR: xdg }, tmpdir: LONG_ROOT, uid: uid + 1, runUserRoot: join(xdg, "none") })).toThrow(/103/);
  });
  it("uses tmpdir when no runtime dir qualifies, and a short tmpdir works", () => {
    const short = private0700("tmp-");
    const found = resolveDetachedSocket(LONG_ROOT, "one", { env: {}, tmpdir: short, uid, runUserRoot: join(short, "absent") });
    expect(found.source).toBe("tmpdir"); expect(found.base).toBe(short);
  });
  it("refuses a long tmpdir with no runtime dir, naming the chosen base, its source and the limit", () => {
    expect(() => resolveDetachedSocket(LONG_ROOT, "one", { env: {}, tmpdir: LONG_ROOT, uid, runUserRoot: "/nonexistent-run-user" })).toThrow(
      new RegExp(`${LONG_ROOT.replaceAll("/", "\\/")}.*tmpdir|tmpdir.*${LONG_ROOT.replaceAll("/", "\\/")}`));
    expect(() => resolveDetachedSocket(LONG_ROOT, "one", { env: {}, tmpdir: LONG_ROOT, uid, runUserRoot: "/nonexistent-run-user" })).toThrow(/103/);
  });
  it("derives one deterministic socket per (directory, id) so reattachment never depends on env", () => {
    const xdg = private0700("xdg-det-");
    const options = { env: { XDG_RUNTIME_DIR: xdg }, tmpdir: LONG_ROOT, uid };
    const a = resolveDetachedSocket("/a/dir", "one", options); const b = resolveDetachedSocket("/a/dir", "one", options);
    expect(a.socket).toBe(b.socket);
    expect(resolveDetachedSocket("/a/dir", "two", options).socket).not.toBe(a.socket);
    expect(resolveDetachedSocket("/b/dir", "one", options).socket).not.toBe(a.socket);
  });

  it("launches and reattaches under a 60-byte TMPDIR when a short XDG_RUNTIME_DIR exists, recording the base in the receipt", async () => {
    savedEnv = { tmpdir: process.env.TMPDIR, xdg: process.env.XDG_RUNTIME_DIR };
    const longTmp = join(private0700("lt-", "/tmp"), "n".repeat(60 - 20)); mkdirSync(longTmp, { mode: 0o700 }); chmodSync(longTmp, 0o700);
    expect(Buffer.byteLength(longTmp)).toBeGreaterThanOrEqual(34);
    const xdg = private0700("rt-", "/tmp");
    process.env.TMPDIR = longTmp; process.env.XDG_RUNTIME_DIR = xdg;
    sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:detach", "workbench:observe"] } } });
    expect(sandbox.dir.startsWith(longTmp)).toBe(true);
    const path = join(sandbox.dir, "pure.js"); writeFileSync(path, 'export const meta={name:"detached",description:"local computation"}; return 42;');
    const pi = makePi(); subagentsExtension(pi.pi); const context = ctx({ cwd: sandbox.dir }); await pi.lifecycle.get("session_start")?.({}, context);
    const tool = pi.tools.get("workflow_detached");
    const launched = await tool.execute("launch", { action: "launch", invocationId: "sock-base", scriptPath: path, trustedScript: true, backend: "deterministic" }, undefined, undefined, context);
    const receipt = JSON.parse(launched.content[0].text) as { pid: number; socketPath: string; socketBase: string };
    hosts.push(receipt.pid);
    expect(receipt.socketBase).toBe(xdg); expect(receipt.socketPath.startsWith(`${xdg}/`)).toBe(true);
    // Reattachment must not depend on the env at connect time.
    delete process.env.XDG_RUNTIME_DIR;
    let observed = JSON.parse((await tool.execute("inspect", { action: "inspect", invocationId: "sock-base" }, undefined, undefined, context)).content[0].text);
    for (let i = 0; i < 100 && !observed.terminal; i++) { await new Promise(r => setTimeout(r, 20)); observed = JSON.parse((await tool.execute("inspect", { action: "inspect", invocationId: "sock-base" }, undefined, undefined, context)).content[0].text); }
    expect(observed.terminal).toBe("completed"); expect(observed.result).toBe(42);
  }, 30000);
});
