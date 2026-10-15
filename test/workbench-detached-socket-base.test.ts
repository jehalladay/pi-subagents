/** wb-71q: the detached Unix socket base prefers a short per-user runtime dir over a long TMPDIR. */
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { DETACHED_SOCKET_PATH_LIMIT, resolveDetachedSocket } from "../src/workbench/hosts/local-detached.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const uid = process.getuid?.() ?? 0;
const scratch: string[] = [];
const hosts: number[] = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
let savedEnv: { tmpdir?: string; xdg?: string } | undefined;
/** Ratified constraint (4): this suite passes under ANY inherited TMPDIR (default, 60 B, the 141 B seat form),
 * so every fixture root sits under this short root and never under tmpdir(). */
const SHORT_ROOT = "/tmp";
function private0700(prefix: string, parent = SHORT_ROOT): string {
  const dir = realpathSync(mkdtempSync(join(parent, prefix))); chmodSync(dir, 0o700); scratch.push(dir); return dir;
}
/** A directory of exactly `bytes` bytes under a fresh short-root fixture; the padding is derived from the measured prefix. */
function exactDir(prefix: string, bytes: number): string {
  const holder = private0700(prefix); const dir = join(holder, "n".repeat(bytes - Buffer.byteLength(holder) - 1));
  mkdirSync(dir, { mode: 0o700 }); chmodSync(dir, 0o700); return dir;
}
function saveEnv(): void { savedEnv = { tmpdir: process.env.TMPDIR, xdg: process.env.XDG_RUNTIME_DIR }; }
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
/** Bytes the resolver appends to its base: "/pw-<uid>/<16 hex>.sock". */
const SOCKET_SUFFIX_BYTES = Buffer.byteLength(`/pw-${uid}/${"0".repeat(16)}.sock`);
const NO_RUN_USER = "/nonexistent-run-user";
const DETACHED_SETTINGS = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:detach", "workbench:observe"] } };
function privateDirRefusal(path: string): string { return `Authorization: directory must be owned by uid ${uid} with exact private permissions: ${path}.`; }

describe("detached socket base selection (wb-71q)", () => {
  it("pins the Linux sun_path bound the refusal names", () => {
    expect(DETACHED_SOCKET_PATH_LIMIT).toBe(103);
  });
  it("builds every fixture root under a short root, never under the inherited TMPDIR (ratified constraint 4)", () => {
    saveEnv();
    process.env.TMPDIR = exactDir("inherit-", 141);
    expect(Buffer.byteLength(tmpdir())).toBe(141);
    const root = private0700("xdg-");
    expect(dirname(root)).toBe(realpathSync(SHORT_ROOT));
    expect(resolveDetachedSocket("/a/dir", "one", { env: { XDG_RUNTIME_DIR: root }, tmpdir: tmpdir(), uid }).source).toBe("XDG_RUNTIME_DIR");
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
  it("falls through a non-normalized XDG_RUNTIME_DIR even when the directory itself qualifies (gate mutant M2)", () => {
    const xdg = private0700("xdg-norm-"); const short = private0700("tmp-norm-");
    const options = (XDG_RUNTIME_DIR: string) => ({ env: { XDG_RUNTIME_DIR }, tmpdir: short, uid, runUserRoot: NO_RUN_USER });
    expect(resolveDetachedSocket("/a/dir", "one", options(xdg)).source).toBe("XDG_RUNTIME_DIR");
    for (const spelled of [`${xdg}/`, `${dirname(xdg)}/./${basename(xdg)}`, `${dirname(xdg)}//${basename(xdg)}`]) {
      const found = resolveDetachedSocket("/a/dir", "one", options(spelled));
      expect(found.source).toBe("tmpdir"); expect(found.base).toBe(short);
    }
  });
  it("falls through an XDG_RUNTIME_DIR that is an owned 0700 regular file, not a directory (gate mutant M3)", () => {
    const holder = private0700("xdg-file-"); const file = join(holder, "runtime"); writeFileSync(file, ""); chmodSync(file, 0o700);
    const short = private0700("tmp-file-");
    const found = resolveDetachedSocket("/a/dir", "one", { env: { XDG_RUNTIME_DIR: file }, tmpdir: short, uid, runUserRoot: NO_RUN_USER });
    expect(found.source).toBe("tmpdir"); expect(found.base).toBe(short);
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
    expect(() => resolveDetachedSocket(LONG_ROOT, "one", { env: {}, tmpdir: LONG_ROOT, uid, runUserRoot: NO_RUN_USER })).toThrow(
      new RegExp(`${LONG_ROOT.replaceAll("/", "\\/")}.*tmpdir|tmpdir.*${LONG_ROOT.replaceAll("/", "\\/")}`));
    expect(() => resolveDetachedSocket(LONG_ROOT, "one", { env: {}, tmpdir: LONG_ROOT, uid, runUserRoot: NO_RUN_USER })).toThrow(/103/);
  });
  it("accepts a socket path of exactly the limit and refuses one byte more (gate mutant M9)", () => {
    const options = (base: string) => ({ env: {}, tmpdir: base, uid, runUserRoot: NO_RUN_USER });
    const atLimit = `/${"b".repeat(DETACHED_SOCKET_PATH_LIMIT - SOCKET_SUFFIX_BYTES - 1)}`;
    const found = resolveDetachedSocket("/a/dir", "one", options(atLimit));
    expect(found.source).toBe("tmpdir"); expect(Buffer.byteLength(found.socket)).toBe(DETACHED_SOCKET_PATH_LIMIT);
    expect(() => resolveDetachedSocket("/a/dir", "one", options(`${atLimit}b`))).toThrow(`(${DETACHED_SOCKET_PATH_LIMIT + 1} bytes)`);
  });
  it("derives one deterministic socket per (directory, id) so reattachment never depends on env", () => {
    const xdg = private0700("xdg-det-");
    const options = { env: { XDG_RUNTIME_DIR: xdg }, tmpdir: LONG_ROOT, uid };
    const a = resolveDetachedSocket("/a/dir", "one", options); const b = resolveDetachedSocket("/a/dir", "one", options);
    expect(a.socket).toBe(b.socket);
    expect(resolveDetachedSocket("/a/dir", "two", options).socket).not.toBe(a.socket);
    expect(resolveDetachedSocket("/b/dir", "one", options).socket).not.toBe(a.socket);
  });

  it("routes the over-limit refusal, which names an env-derived base, through the shared reply sanitizer and never burns the id (display path)", async () => {
    saveEnv();
    const secret = "sk-ant-api03-abcDEF0123456789abcDEF0123456789";
    const holder = private0700("rt-disp-"); const xdg = join(holder, `${secret}\u200B${"d".repeat(20)}`);
    mkdirSync(xdg, { mode: 0o700 }); chmodSync(xdg, 0o700);
    expect(Buffer.byteLength(xdg) + SOCKET_SUFFIX_BYTES).toBeGreaterThan(DETACHED_SOCKET_PATH_LIMIT);
    process.env.XDG_RUNTIME_DIR = xdg;
    sandbox = hermeticDir({ settings: DETACHED_SETTINGS });
    const path = join(sandbox.dir, "pure.js"); writeFileSync(path, 'export const meta={name:"detached",description:"local computation"}; return 42;');
    const pi = makePi(); subagentsExtension(pi.pi); const context = ctx({ cwd: sandbox.dir }); await pi.lifecycle.get("session_start")?.({}, context);
    const reply = (await pi.tools.get("workflow_detached").execute("launch", { action: "launch", invocationId: "disp-path", scriptPath: path, trustedScript: true, backend: "deterministic" }, undefined, undefined, context)).content[0].text as string;
    expect(reply).toContain(`exceeds the ${DETACHED_SOCKET_PATH_LIMIT}-byte Linux socket path bound`); expect(reply).toContain(`under XDG_RUNTIME_DIR base ${holder}/`);
    expect(reply).toContain("[REDACTED]"); expect(reply).not.toContain(secret); expect(reply).not.toContain("\u200B");
    expect(existsSync(join(process.env.PI_CODING_AGENT_DIR ?? "", "workbench-detached", "disp-path"))).toBe(false);
  });

  it("launches and reattaches under a 60-byte TMPDIR when a short XDG_RUNTIME_DIR exists, recording the base in the receipt", async () => {
    saveEnv();
    const longTmp = exactDir("lt-", 60);
    expect(Buffer.byteLength(longTmp)).toBe(60);
    const xdg = private0700("rt-");
    process.env.TMPDIR = longTmp; process.env.XDG_RUNTIME_DIR = xdg;
    sandbox = hermeticDir({ settings: DETACHED_SETTINGS });
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
    const inspect = async () => (await tool.execute("inspect", { action: "inspect", invocationId: "sock-base" }, undefined, undefined, context)).content[0].text as string;
    let observed = JSON.parse(await inspect());
    for (let i = 0; i < 100 && !observed.terminal; i++) { await new Promise(r => setTimeout(r, 20)); observed = JSON.parse(await inspect()); }
    expect(observed.terminal).toBe("completed"); expect(observed.result).toBe(42);
    // A client refuses to connect once the recorded socket directory stops being private (gate mutant M7).
    const socketDir = dirname(receipt.socketPath);
    chmodSync(socketDir, 0o755);
    const exposed = await inspect();
    chmodSync(socketDir, 0o700);
    expect(exposed).toBe(privateDirRefusal(socketDir));
    // A client validates the receipt-recorded socket path before trusting it (gate mutant M12).
    const receiptFile = join(process.env.PI_CODING_AGENT_DIR ?? "", "workbench-detached", "sock-base", "receipt.json");
    const recorded = readFileSync(receiptFile, "utf8");
    writeFileSync(receiptFile, JSON.stringify({ ...JSON.parse(recorded), socketPath: "relative.sock" }));
    const forged = await inspect();
    writeFileSync(receiptFile, recorded);
    expect(forged).toBe("Authorization: receipt socket path invalid.");
    expect(JSON.parse(await inspect()).terminal).toBe("completed");
  }, 30000);

  it("validates the pw-<uid> socket directory BEFORE reserving the invocation id, so a refused socket dir never burns the id (gate fold F1)", async () => {
    saveEnv();
    const xdg = private0700("rt-f1-");
    const socketDir = join(xdg, `pw-${uid}`); mkdirSync(socketDir); chmodSync(socketDir, 0o755);
    process.env.XDG_RUNTIME_DIR = xdg;
    sandbox = hermeticDir({ settings: DETACHED_SETTINGS });
    const reserved = join(process.env.PI_CODING_AGENT_DIR ?? "", "workbench-detached", "f1-order");
    const path = join(sandbox.dir, "pure.js"); writeFileSync(path, 'export const meta={name:"detached",description:"local computation"}; return 42;');
    const pi = makePi(); subagentsExtension(pi.pi); const context = ctx({ cwd: sandbox.dir }); await pi.lifecycle.get("session_start")?.({}, context);
    const tool = pi.tools.get("workflow_detached");
    const launch = async () => (await tool.execute("launch", { action: "launch", invocationId: "f1-order", scriptPath: path, trustedScript: true, backend: "deterministic" }, undefined, undefined, context)).content[0].text as string;
    expect(await launch()).toBe(privateDirRefusal(socketDir));
    expect(existsSync(reserved)).toBe(false);
    chmodSync(socketDir, 0o700);
    const receipt = JSON.parse(await launch()) as { pid: number; socketPath: string; socketBase: string };
    hosts.push(receipt.pid);
    expect(receipt.socketBase).toBe(xdg); expect(dirname(receipt.socketPath)).toBe(socketDir);
    expect(existsSync(reserved)).toBe(true);
  }, 30000);
});
