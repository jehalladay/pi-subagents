/** wb-71q: the detached Unix socket base prefers a short per-user runtime dir over a long TMPDIR. wb-70b: typed same-id
 * relaunch refusal (R2), per-launch tmpdir socket directory (PF2), receipt socket containment (F3), cleanup contract (PF4). */
import { chmodSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  connectDetachedWorkflow,
  DETACHED_SOCKET_PATH_LIMIT,
  type DetachedLaunchRequest,
  type DetachedSnapshot,
  detachedFrame,
  launchDetachedWorkflow,
  resolveDetachedSocket,
} from "../src/workbench/hosts/local-detached.js";
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
/** Bytes the resolver appends to a private runtime base: "/pw-<uid>/<16 hex>.sock". */
const SOCKET_SUFFIX_BYTES = Buffer.byteLength(`/pw-${uid}/${"0".repeat(16)}.sock`);
/** Bytes it appends to the tmpdir fallback, whose socket directory is a per-launch mkdtemp (wb-70b PF2): "/pw-<uid>-XXXXXX/<16 hex>.sock". */
const TMPDIR_SOCKET_SUFFIX_BYTES = Buffer.byteLength(`/pw-${uid}-XXXXXX/${"0".repeat(16)}.sock`);
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
    const atLimit = `/${"b".repeat(DETACHED_SOCKET_PATH_LIMIT - TMPDIR_SOCKET_SUFFIX_BYTES - 1)}`;
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

/** The direct launch API's inputs: a reviewed one-line script in a private workspace and a detached root beside it. */
function fixture(prefix: string): { cwd: string; scriptPath: string; root: string } {
  const cwd = private0700(`${prefix}ws-`);
  const scriptPath = join(cwd, "pure.js");
  writeFileSync(scriptPath, 'export const meta={name:"detached",description:"local computation"}; return 42;');
  return { cwd, scriptPath, root: join(private0700(`${prefix}root-`), "hosts") };
}
function request(f: ReturnType<typeof fixture>, invocationId: string): DetachedLaunchRequest {
  return { directory: f.root, invocationId, scriptPath: f.scriptPath, cwd: f.cwd, input: null, trustedScript: true, backend: "deterministic", providers: [], grants: [], permissions: ["inspect", "execute", "cancel", "shutdown"], sourceFiles: [f.scriptPath] };
}
async function launched(f: ReturnType<typeof fixture>, invocationId: string, placement?: Parameters<typeof launchDetachedWorkflow>[1]) {
  const receipt = await launchDetachedWorkflow(request(f, invocationId), placement);
  hosts.push(receipt.pid);
  return receipt;
}
async function terminal(root: string, id: string): Promise<DetachedSnapshot> {
  const client = connectDetachedWorkflow(root, id);
  let observed = await client.inspect();
  for (let i = 0; i < 150 && !observed.terminal; i++) { await new Promise(r => setTimeout(r, 20)); observed = await client.inspect(); }
  return observed;
}
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
async function gone(pid: number): Promise<boolean> {
  for (let i = 0; i < 150 && alive(pid); i++) await new Promise(r => setTimeout(r, 20));
  return !alive(pid);
}
async function refusal(promise: Promise<unknown>): Promise<unknown> {
  return promise.then(() => undefined, (error: unknown) => error);
}
/** The tmpdir fallback, reached by naming the inputs a host without a private runtime dir has (wb-70b PF2). */
const tmpdirOnly = (base: string) => ({ env: {}, tmpdir: base, runUserRoot: NO_RUN_USER });
const PER_LAUNCH_DIR = new RegExp(`^pw-${uid}-[A-Za-z0-9]{6}$`);

describe("detached invocation reuse, socket placement and cleanup (wb-70b)", () => {
  it("refuses a second launch under a reserved id with a typed conflict naming the id and its reservation, never the raw EEXIST (R2)", async () => {
    saveEnv();
    process.env.XDG_RUNTIME_DIR = private0700("rt-r2-");
    const f = fixture("r2-");
    const first = await launched(f, "reserved-one");
    const error = await refusal(launchDetachedWorkflow(request(f, "reserved-one")));
    expect(error).toBeInstanceOf(CapabilityError);
    expect((error as CapabilityError).category).toBe("validation");
    const text = (error as Error).message;
    expect(text).not.toMatch(/EEXIST|file already exists/);
    // wb-0kg.1's relaunch probe keeps passing.
    expect(text).toMatch(/exists|conflict/i);
    expect(text).toContain("reserved-one");
    expect(text).toContain(join(f.root, "reserved-one"));
    // The refusal reserves nothing new, and the first host keeps serving its receipt.
    expect(readdirSync(f.root)).toEqual(["reserved-one"]);
    expect((await connectDetachedWorkflow(f.root, "reserved-one").inspect()).receipt?.pid).toBe(first.pid);
  }, 30000);

  it("routes the typed relaunch refusal to the model through the workflow_detached catch, sanitized (R2 display path)", async () => {
    saveEnv();
    process.env.XDG_RUNTIME_DIR = private0700("rt-r2d-");
    sandbox = hermeticDir({ settings: DETACHED_SETTINGS });
    const path = join(sandbox.dir, "pure.js"); writeFileSync(path, 'export const meta={name:"detached",description:"local computation"}; return 42;');
    const pi = makePi(); subagentsExtension(pi.pi); const context = ctx({ cwd: sandbox.dir }); await pi.lifecycle.get("session_start")?.({}, context);
    const launch = async () => (await pi.tools.get("workflow_detached").execute("launch", { action: "launch", invocationId: "reuse-me", scriptPath: path, trustedScript: true, backend: "deterministic" }, undefined, undefined, context)).content[0].text as string;
    hosts.push((JSON.parse(await launch()) as { pid: number }).pid);
    const reply = await launch();
    expect(reply).toMatch(/conflict/i); expect(reply).toContain("reuse-me");
    expect(reply).not.toMatch(/EEXIST|file already exists/);
    expect(reply).toContain(join(process.env.PI_CODING_AGENT_DIR ?? "", "workbench-detached", "reuse-me"));
  }, 30000);

  it("gives the tmpdir fallback a per-launch mkdtemp socket directory, never the predictable shared <tmpdir>/pw-<uid> (PF2)", () => {
    const short = private0700("tmp-pf2-");
    const found = resolveDetachedSocket("/a/dir", "one", { env: {}, tmpdir: short, uid, runUserRoot: NO_RUN_USER });
    expect(found.source).toBe("tmpdir");
    expect(dirname(found.socket)).toBe(join(short, `pw-${uid}-XXXXXX`));
    // A private per-user runtime base keeps its one stable directory.
    const xdg = private0700("xdg-pf2-");
    expect(dirname(resolveDetachedSocket("/a/dir", "one", { env: { XDG_RUNTIME_DIR: xdg }, tmpdir: short, uid }).socket)).toBe(join(xdg, `pw-${uid}`));
  });

  it("launches under the tmpdir fallback past a pre-created foreign <tmpdir>/pw-<uid>, recording the per-launch path in boot and receipt (PF2)", async () => {
    const f = fixture("pf2-");
    const base = private0700("tmp-pf2-");
    // What another local user can pre-create in a shared tmpdir: not ours, not private.
    const foreign = join(base, `pw-${uid}`); mkdirSync(foreign); chmodSync(foreign, 0o755);
    const receipt = await launched(f, "pf2-one", tmpdirOnly(base));
    expect(receipt.socketBase).toBe(base);
    expect(dirname(dirname(receipt.socketPath))).toBe(base);
    expect(basename(dirname(receipt.socketPath))).toMatch(PER_LAUNCH_DIR);
    const boot = JSON.parse(readFileSync(join(f.root, "pf2-one", "invocation.json"), "utf8")) as { socket: string; socketBase: string };
    expect(boot.socket).toBe(receipt.socketPath); expect(boot.socketBase).toBe(base);
    // Reattachment reads the recorded path; nothing re-derives it from the caller's environment.
    const observed = await terminal(f.root, "pf2-one");
    expect(observed.terminal).toBe("completed"); expect(observed.result).toBe(42);
    // Each launch gets its own directory; an unnormalized spelling of the same base still launches and reattaches.
    const second = await launched(f, "pf2-two", tmpdirOnly(`${base}/.`));
    expect(dirname(dirname(second.socketPath))).toBe(base);
    expect(dirname(second.socketPath)).not.toBe(dirname(receipt.socketPath));
    expect((await terminal(f.root, "pf2-two")).terminal).toBe("completed");
    expect(lstatSync(foreign).mode & 0o7777).toBe(0o755);
  }, 30000);

  it("refuses a receipt whose socket lies outside the recorded socketBase/pw-<uid>, as the child's boot check does (wb-71q F3)", async () => {
    saveEnv();
    const xdg = private0700("rt-f3-");
    process.env.XDG_RUNTIME_DIR = xdg;
    const f = fixture("f3-");
    const receipt = await launched(f, "f3-one");
    const receiptFile = join(f.root, "f3-one", "receipt.json");
    const recorded = readFileSync(receiptFile, "utf8");
    // A same-uid decoy that passes every other client check: private directory, private socket, listening.
    const decoyDir = join(private0700("decoy-"), `pw-${uid}`); mkdirSync(decoyDir, { mode: 0o700 }); chmodSync(decoyDir, 0o700);
    const decoySocket = join(decoyDir, basename(receipt.socketPath));
    const decoy = createServer(socket => { socket.on("error", () => socket.destroy()); socket.end(detachedFrame({ ok: false, category: "validation", diagnostic: "decoy reached" })); });
    await new Promise<void>(resolveListen => decoy.listen(decoySocket, () => resolveListen()));
    chmodSync(decoySocket, 0o600);
    const rewrite = (fields: Record<string, unknown>) => {
      const next = { ...JSON.parse(recorded), ...fields } as Record<string, unknown>;
      for (const [key, value] of Object.entries(fields)) if (value === undefined) delete next[key];
      writeFileSync(receiptFile, JSON.stringify(next));
    };
    const client = connectDetachedWorkflow(f.root, "f3-one");
    try {
      for (const fields of [
        { socketPath: decoySocket },
        { socketPath: join(xdg, basename(receipt.socketPath)) },
        { socketPath: join(xdg, `pw-${uid + 1}`, basename(receipt.socketPath)) },
        { socketPath: join(dirname(receipt.socketPath), "host.sock") },
        { socketBase: undefined, socketPath: decoySocket },
      ]) {
        rewrite(fields);
        await expect(client.inspect(), JSON.stringify(fields)).rejects.toThrow("Authorization: receipt socket path invalid.");
      }
      // An existing receipt written before socketBase existed (the invocation directory's host.sock) is still accepted.
      rewrite({ socketBase: undefined, socketPath: join(f.root, "f3-one", "host.sock") });
      expect((await client.inspect()).observation).toBe("unknown");
    } finally {
      writeFileSync(receiptFile, recorded);
      decoy.close();
    }
    expect((await client.inspect()).receipt?.pid).toBe(receipt.pid);
  }, 30000);

  it("pins the cleanup contract under a runtime base: a graceful stop unlinks the socket and keeps pw-<uid>; a crash leaves the socket, never rebound and never deleted by a client (PF4)", async () => {
    saveEnv();
    const xdg = private0700("rt-pf4-");
    process.env.XDG_RUNTIME_DIR = xdg;
    const f = fixture("pf4-");
    const shared = join(xdg, `pw-${uid}`);
    const graceful = await launched(f, "pf4-graceful");
    expect(dirname(graceful.socketPath)).toBe(shared);
    expect((await terminal(f.root, "pf4-graceful")).terminal).toBe("completed");
    await connectDetachedWorkflow(f.root, "pf4-graceful").shutdown("wb-70b PF4 graceful stop");
    expect(await gone(graceful.pid)).toBe(true);
    expect(existsSync(graceful.socketPath)).toBe(false);
    // The shared directory stays even when the stopping host was its only tenant.
    expect(readdirSync(shared)).toEqual([]);
    const crashed = await launched(f, "pf4-crashed");
    expect(dirname(crashed.socketPath)).toBe(shared);
    expect((await terminal(f.root, "pf4-crashed")).terminal).toBe("completed");
    process.kill(crashed.pid, "SIGKILL");
    expect(await gone(crashed.pid)).toBe(true);
    expect(lstatSync(crashed.socketPath).isSocket()).toBe(true);
    const lost = await connectDetachedWorkflow(f.root, "pf4-crashed").inspect();
    expect(lost.observation).toBe("unknown"); expect(lost.reconcileHint).toMatch(/never automatically retry/i);
    expect(lstatSync(crashed.socketPath).isSocket()).toBe(true);
    // Both ids stay reserved, so neither path is ever bound again.
    for (const id of ["pf4-graceful", "pf4-crashed"]) expect(await refusal(launchDetachedWorkflow(request(f, id)))).toBeInstanceOf(CapabilityError);
    expect(readdirSync(join(f.root, "pf4-crashed")).sort()).toEqual(["invocation.json", "receipt.json"]);
    expect(readdirSync(shared).sort()).toEqual([basename(crashed.socketPath)]);
  }, 30000);

  it("pins the cleanup contract under the tmpdir fallback: a graceful stop removes the per-launch directory, a crash leaves it with its socket, a refused relaunch leaves none (PF4)", async () => {
    const f = fixture("pf4t-");
    const base = private0700("tmp-pf4-");
    const graceful = await launched(f, "pf4t-graceful", tmpdirOnly(base));
    const crashed = await launched(f, "pf4t-crashed", tmpdirOnly(base));
    expect((await terminal(f.root, "pf4t-graceful")).terminal).toBe("completed");
    expect((await terminal(f.root, "pf4t-crashed")).terminal).toBe("completed");
    await connectDetachedWorkflow(f.root, "pf4t-graceful").shutdown("wb-70b PF4 graceful stop");
    expect(await gone(graceful.pid)).toBe(true);
    expect(existsSync(dirname(graceful.socketPath))).toBe(false);
    process.kill(crashed.pid, "SIGKILL");
    expect(await gone(crashed.pid)).toBe(true);
    expect(lstatSync(crashed.socketPath).isSocket()).toBe(true);
    expect(await refusal(launchDetachedWorkflow(request(f, "pf4t-graceful"), tmpdirOnly(base)))).toBeInstanceOf(CapabilityError);
    expect(readdirSync(base).filter(name => PER_LAUNCH_DIR.test(name))).toEqual([basename(dirname(crashed.socketPath))]);
  }, 30000);
});

/** The socket path a launch of `id` under the private runtime base `xdg` uses, with its pw-<uid> directory made private. */
function heldSocketPath(f: ReturnType<typeof fixture>, id: string, xdg: string): string {
  const { socket } = resolveDetachedSocket(f.root, id, { env: { XDG_RUNTIME_DIR: xdg } });
  mkdirSync(dirname(socket), { recursive: true, mode: 0o700 }); chmodSync(dirname(socket), 0o700);
  return socket;
}
/** A stand-in Unix socket at `path` with exact `mode`, so the launched host cannot bind there. */
async function holdSocket(path: string, mode: number): Promise<() => Promise<void>> {
  const holder = createServer();
  await new Promise<void>(resolveListen => holder.listen(path, () => resolveListen()));
  chmodSync(path, mode);
  return () => new Promise<void>(resolveClose => holder.close(() => resolveClose()));
}
/** The host writes its receipt before it binds, so a launch refused before its handshake still names the host to wait for. */
async function hostGone(root: string, id: string): Promise<boolean> {
  const receipt = join(root, id, "receipt.json");
  for (let i = 0; i < 250 && !existsSync(receipt); i++) await new Promise(r => setTimeout(r, 20));
  return gone((JSON.parse(readFileSync(receipt, "utf8")) as { pid: number }).pid);
}
const socketRefusal = (path: string): string => `Authorization: socket must be owned by uid ${uid} with exact private permissions: ${path}.`;

describe("the launch handshake and the host's socket bind mode (wb-70b re-cut, launcher race)", () => {
  it("waits out an owned socket still at the host's bind mode (0700, before the listening callback sets 0600) instead of refusing it, so the host's own fate decides the launch", async () => {
    const f = fixture("mb-");
    const xdg = private0700("rt-mb-");
    const socket = heldSocketPath(f, "mid-bind", xdg);
    const release = await holdSocket(socket, 0o700);
    try {
      const error = await refusal(launchDetachedWorkflow(request(f, "mid-bind"), { env: { XDG_RUNTIME_DIR: xdg } }));
      expect((error as Error).message).not.toBe(socketRefusal(socket));
      // The host cannot bind the held path, so it exits; the launch reports that, never an authorization refusal.
      expect((error as Error).message).toBe("Detached host exited before handshake; invocation reserved, do not retry automatically.");
      expect(await hostGone(f.root, "mid-bind")).toBe(true);
    } finally { await release(); }
  }, 30000);

  it("still refuses at once anything else at the launch's socket path: a regular file at the bind mode, or a socket at any mode but the bind mode", async () => {
    const f = fixture("nb-");
    const xdg = private0700("rt-nb-");
    const placement = { env: { XDG_RUNTIME_DIR: xdg } };
    const file = heldSocketPath(f, "not-a-socket", xdg);
    writeFileSync(file, ""); chmodSync(file, 0o700);
    expect((await refusal(launchDetachedWorkflow(request(f, "not-a-socket"), placement)) as Error).message).toBe(socketRefusal(file));
    expect(await hostGone(f.root, "not-a-socket")).toBe(true);
    const open = heldSocketPath(f, "open-mode", xdg);
    const release = await holdSocket(open, 0o755);
    try {
      expect((await refusal(launchDetachedWorkflow(request(f, "open-mode"), placement)) as Error).message).toBe(socketRefusal(open));
      expect(await hostGone(f.root, "open-mode")).toBe(true);
    } finally { await release(); }
  }, 30000);
});
