/** Optional SAME-MACHINE host. One invocation per OS session; no scheduler, retry,
 * checkpoint, remote authentication, or hostile-same-UID isolation. Unix DAC is
 * the local operator boundary (root can bypass it). The script VM is NOT a sandbox.
 *
 * Compile this module before launch. launchDetachedWorkflow() admits a reviewed
 * trusted script, pins its input/config/implementation and returns the receipt
 * served by the actual detached process. connectDetachedWorkflow(root,id) never
 * launches anything. inspect() after loss returns unknown/reconcile, never a
 * saved terminal verdict or a replacement JavaScript execution.
 *
 * Socket placement and cleanup (wb-71q, wb-70b PF2/PF4). The host listens on
 * <base>/pw-<uid>/<digest>.sock under a private per-user runtime base
 * (XDG_RUNTIME_DIR, then /run/user/<uid>); under the shared tmpdir fallback it
 * listens in a fresh per-launch mkdtemp directory <tmpdir>/pw-<uid>-XXXXXX that
 * no other local user can pre-create. The launcher records the path in the boot
 * pin and the receipt; clients read it from there. A graceful stop (shutdown,
 * retention or idle expiry, SIGTERM/SIGINT) unlinks the socket and removes a
 * per-launch directory; the shared pw-<uid> directory stays for later hosts. A
 * launch refused before its host starts removes the per-launch directory it
 * made. A crashed host (SIGKILL, OOM, power loss) runs no cleanup, so its socket,
 * and a per-launch directory, stay where they are: the reserved invocation ID
 * means that path is never bound again, a client reading the receipt gets a
 * refused connection and reports unknown with reconcile guidance, and nothing in
 * the workbench deletes it. It goes when its base is cleaned: the login manager
 * clears the runtime directory at the user's last logout or a reboot; the OS
 * temp cleaner, a reboot or the operator clears tmpdir. The invocation
 * directory (boot pin and receipt) always stays: it is the ID reservation.
 */
import { spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, closeSync, constants, existsSync, fstatSync, lstatSync, mkdirSync, mkdtempSync, openSync, readdirSync, readFileSync, realpathSync, rmdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createConnection, createServer, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { runWorkflow, validateScript, type WorkflowHost } from "../../workflow/runtime.js";
import { CapabilityError, CapabilityRegistry, type JsonValue, validatedCapabilityJson } from "../capability-registry.js";
import { type ClaudeWorkflowHostOptions, createClaudeWorkflowHost } from "../claude-host.js";
import { captureInvocationIdentity, type IdentityCaptureInput, type InvocationSnapshot, identityDigest, WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../identity.js";
import { registerNativeForgeGateStatus } from "../providers/forge.js";
import { registerNativeFurnaceRunInspect } from "../providers/furnace.js";
import { registerNativeHyperUnixFind } from "../providers/hyperunix.js";
import { registerNativeReactiveFiberRender } from "../providers/reactivefiber.js";
import { redactWorkbenchText } from "../redaction.js";

export const DETACHED_CONTRACT = "workbench.local-detached/v1";
export const DETACHED_MAX_FRAME_BYTES = 1024 * 1024;
const MAX_COMMAND_BYTES = 16 * 1024;
const ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
const RECONCILE = "Host connection lost: JavaScript state is not recoverable. Never automatically retry this invocation; reconcile known native effects with their producer before a new invocation.";
export type DetachedPermission = "inspect" | "execute" | "cancel" | "shutdown";
export interface LocalOperator { issuer: "local-os-dac"; uid: number; id: string }
export function localOperator(): LocalOperator {
  if (process.platform !== "linux" || !process.getuid || !process.geteuid || process.getuid() !== process.geteuid()) throw new Error("Local detached hosting requires Linux and a non-setuid local OS operator.");
  const uid = process.getuid();
  return { issuer: "local-os-dac", uid, id: `local-os:uid:${uid}` };
}
export interface DetachedLaunchRequest {
  directory: string;
  invocationId: string;
  scriptPath: string;
  cwd: string;
  input: JsonValue;
  /** Explicit review assertion. LLM-generated/untrusted scripts must be refused. */
  trustedScript: true;
  backend: "deterministic" | "claude";
  providers?: readonly ("forge" | "hyperunix" | "reactivefiber" | "furnace-observe")[];
  grants?: readonly string[];
  permissions?: readonly DetachedPermission[];
  /** Declared regular source files, measured locally; NOT full workspace authority. */
  sourceFiles?: readonly string[];
  claude?: Pick<ClaudeWorkflowHostOptions, "model" | "tools" | "roles">;
  /** Reviewed allowlisted provider artifact, loaded only in the child. Its results
   * carry local-provider evidence, never a native SDK/model-success claim. */
  localProvider?: { kind: "trusted-local"; version: "1.0.0"; modulePath: string; digest: string; capabilities: readonly string[] };
  timeoutMs?: number;
  retentionMs?: number;
  /** Create/handshake without execution; execute() still checks pinned ACL/basis. */
  autoStart?: boolean;
}
export interface DetachedReceipt {
  contract: typeof DETACHED_CONTRACT;
  invocationId: string;
  hostInstanceId: string;
  pid: number;
  sessionId: number;
  processStartTicks: string;
  owner: LocalOperator;
  invocationDirectory: string;
  socketPath: string;
  /** Directory the socket was placed under (runtime dir, /run/user/<uid>, or tmpdir). */
  socketBase?: string;
  launchedAt: string;
  deploymentDigest: string;
  inputDigest: string;
  scriptDigest: string;
  snapshotDigest: string;
  permissions: DetachedPermission[];
  security: "same-machine-os-dac-only";
  lifetime: "survives-client-disconnect-not-host-crash";
  nativeRuntimeIdentity: "unsupported";
  evidenceClass: "local-provider" | "native-client" | "local-computation";
}
export interface DetachedSnapshot {
  contract: typeof DETACHED_CONTRACT;
  invocationId: string;
  observation: "observed-started" | "observed-running" | "observed-terminal" | "unknown";
  observedAt: string;
  source: "live-detached-host" | "local-client-transport";
  terminal?: "completed" | "failed" | "cancelled" | "unknown";
  receipt?: DetachedReceipt;
  result?: JsonValue;
  diagnostic?: string;
  reconcileHint?: string;
  nativeRuntimeIdentity: "unsupported";
  progress: JsonValue[];
  droppedProgress: number;
  controlAudit: JsonValue[];
  /** Cancellation acknowledges only this local interpreter and its owned waits. */
  cancellationRequested: boolean;
}
export type DetachedCommand =
  | { command: "hello" | "inspect" | "execute"; invocationId: string }
  | { command: "cancel" | "shutdown"; invocationId: string; reason: string };
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected JSON object.");
  return value as Record<string, unknown>;
}
function only(value: Record<string, unknown>, keys: readonly string[]): void {
  for (const key of Object.keys(value)) if (!keys.includes(key)) throw new Error(`Unsupported field: ${key}.`);
}
function invocationId(id: unknown): asserts id is string {
  if (typeof id !== "string" || !ID.test(id)) throw new Error("Invalid invocation ID (no paths or shell syntax).");
}
export function decodeDetachedCommand(input: unknown): DetachedCommand {
  const value = record(validatedCapabilityJson(input, "detached command", 16, MAX_COMMAND_BYTES));
  const command = value.command;
  if (!["hello", "inspect", "execute", "cancel", "shutdown"].includes(String(command))) throw new Error("Unsupported detached command; retry and arbitrary invocation payloads are forbidden.");
  invocationId(value.invocationId);
  only(value, command === "cancel" || command === "shutdown" ? ["command", "invocationId", "reason"] : ["command", "invocationId"]);
  if (command === "cancel" || command === "shutdown") {
    if (typeof value.reason !== "string" || !value.reason.trim() || value.reason.length > 512 || /[\u0000-\u001f]/.test(value.reason)) throw new Error("Control requires a bounded operator reason.");
    return { command, invocationId: value.invocationId, reason: value.reason };
  }
  return { command: command as "hello" | "inspect" | "execute", invocationId: value.invocationId };
}
export function detachedFrame(value: unknown): Buffer {
  const bytes = Buffer.from(JSON.stringify(validatedCapabilityJson(value, "detached frame", 64, DETACHED_MAX_FRAME_BYTES)));
  const header = Buffer.alloc(4); header.writeUInt32BE(bytes.length);
  return Buffer.concat([header, bytes]);
}
/** 4-byte unsigned BE length then strict UTF-8 JSON, bounded before allocation. */
export class DetachedFrameDecoder {
  private pending = Buffer.alloc(0);
  constructor(private readonly maxBytes = DETACHED_MAX_FRAME_BYTES) {}
  push(chunk: Buffer): JsonValue[] {
    if (chunk.length + this.pending.length > this.maxBytes + 4) throw new Error("Detached frame buffer exceeds bound.");
    this.pending = Buffer.concat([this.pending, chunk]);
    const values: JsonValue[] = [];
    while (this.pending.length >= 4) {
      const size = this.pending.readUInt32BE(0);
      if (size === 0 || size > this.maxBytes) throw new Error("Invalid detached frame length.");
      if (this.pending.length < size + 4) break;
      const bytes = this.pending.subarray(4, size + 4);
      const text = bytes.toString("utf8");
      if (!Buffer.from(text).equals(bytes)) throw new Error("Detached frame is not UTF-8.");
      values.push(validatedCapabilityJson(JSON.parse(text), "detached frame", 64, this.maxBytes));
      this.pending = this.pending.subarray(size + 4);
      if (values.length > 16) throw new Error("Detached command batch exceeds bound.");
    }
    return values;
  }
}
function hash(bytes: string | Buffer): string { return `sha256:${createHash("sha256").update(bytes).digest("hex")}`; }
function privatePath(path: string, kind: "directory" | "file" | "socket", uid = localOperator().uid): void {
  const stat = lstatSync(path);
  const correct = kind === "directory" ? stat.isDirectory() : kind === "file" ? stat.isFile() : stat.isSocket();
  if (!correct || stat.isSymbolicLink() || stat.uid !== uid || (stat.mode & 0o7777) !== (kind === "directory" ? 0o700 : 0o600) || (kind === "file" && stat.nlink !== 1)) throw new Error(`Authorization: ${kind} must be owned by uid ${uid} with exact private permissions: ${path}.`);
}
/** Reject symlink ancestors and non-sticky writable ancestors. Sticky /tmp is OK
 * because invocation roots are owned/exclusive 0700; never relax an existing root. */
function ancestors(path: string): void {
  if (!isAbsolute(path) || resolve(path) !== path) throw new Error("Detached directory must be a canonical absolute path.");
  let current = dirname(path);
  while (true) {
    const stat = lstatSync(current);
    if (!stat.isDirectory() || stat.isSymbolicLink() || ((stat.mode & 0o022) !== 0 && (stat.mode & 0o1000) === 0)) throw new Error("Authorization: unsafe detached directory ancestor.");
    if (current === dirname(current)) break;
    current = dirname(current);
  }
}
function paths(root: string, id: string) {
  invocationId(id);
  ancestors(root); privatePath(root, "directory");
  const directory = join(root, id);
  return { directory, boot: join(directory, "invocation.json"), receipt: join(directory, "receipt.json") };
}
/** Linux sun_path holds 108 bytes including the NUL; 103 leaves headroom the host has always kept. */
export const DETACHED_SOCKET_PATH_LIMIT = 103;
export type DetachedSocketBaseSource = "XDG_RUNTIME_DIR" | "run-user" | "tmpdir";
export interface DetachedSocketLocation { base: string; source: DetachedSocketBaseSource; socket: string }
export interface DetachedSocketOptions { env?: NodeJS.ProcessEnv; tmpdir?: string; uid?: number; runUserRoot?: string }
/** The socket-base inputs a launch may name instead of its own environment (tests reach the tmpdir fallback with it); never the uid. */
export type DetachedSocketPlacement = Pick<DetachedSocketOptions, "env" | "tmpdir" | "runUserRoot">;
/** mkdtemp's six-character template: the tmpdir fallback's per-launch socket directory is <tmpdir>/pw-<uid>-XXXXXX. */
const PER_LAUNCH_TEMPLATE = "XXXXXX";
/** A runtime base qualifies only when absolute, a real directory (no symlink), owned by uid, mode exactly 0700. */
function privateRuntimeBase(path: string | undefined, uid: number): path is string {
  if (path === undefined || !isAbsolute(path) || resolve(path) !== path) return false;
  try { const stat = lstatSync(path); return stat.isDirectory() && !stat.isSymbolicLink() && stat.uid === uid && (stat.mode & 0o7777) === 0o700; }
  catch { return false; }
}
/** Choose the Unix-socket base: XDG_RUNTIME_DIR, then /run/user/<uid>, then tmpdir(). The socket name is a
 * deterministic digest of (directory, id), so the path is short and stable; it is recorded in the boot pin and
 * receipt, never re-derived from a later caller's environment. A private runtime base holds the socket in its one
 * <base>/pw-<uid> directory; the shared tmpdir fallback gets a per-launch mkdtemp directory instead (wb-70b PF2), so
 * there the directory component is the template <tmpdir>/pw-<uid>-XXXXXX, whose byte length the launched path keeps. */
export function resolveDetachedSocket(directory: string, id: string, options: DetachedSocketOptions = {}): DetachedSocketLocation {
  const uid = options.uid ?? localOperator().uid; const env = options.env ?? process.env;
  const perUser = join(options.runUserRoot ?? "/run/user", String(uid));
  let base: string; let source: DetachedSocketBaseSource;
  if (privateRuntimeBase(env.XDG_RUNTIME_DIR, uid)) { base = env.XDG_RUNTIME_DIR; source = "XDG_RUNTIME_DIR"; }
  else if (privateRuntimeBase(perUser, uid)) { base = perUser; source = "run-user"; }
  else { base = options.tmpdir ?? tmpdir(); source = "tmpdir"; }
  const name = createHash("sha256").update(`${directory}\0${id}`).digest("hex").slice(0, 16);
  const socket = join(base, source === "tmpdir" ? `pw-${uid}-${PER_LAUNCH_TEMPLATE}` : `pw-${uid}`, `${name}.sock`);
  if (Buffer.byteLength(socket) > DETACHED_SOCKET_PATH_LIMIT) throw new Error(`Detached Unix socket path exceeds the ${DETACHED_SOCKET_PATH_LIMIT}-byte Linux socket path bound (${Buffer.byteLength(socket)} bytes) under ${source} base ${base}; set XDG_RUNTIME_DIR to a short private directory (owner-only, mode 0700) or use a shorter TMPDIR.`);
  return { base, source, socket };
}
/** True when `socket` sits in the per-user socket directory directly under `base`: <base>/pw-<uid>/<digest>.sock, or a
 * per-launch <base>/pw-<uid>-XXXXXX/<digest>.sock. The child checks its boot pin with it and a client its receipt. */
function socketWithinBase(socket: string, base: string, uid: number): boolean {
  const directory = dirname(socket);
  return isAbsolute(base) && dirname(directory) === resolve(base) && resolve(socket) === socket
    && socketDirectoryName(uid).test(basename(directory)) && /^[a-f0-9]{16}\.sock$/.test(basename(socket));
}
const socketDirectoryName = (uid: number): RegExp => new RegExp(`^pw-${uid}(-[A-Za-z0-9]{${PER_LAUNCH_TEMPLATE.length}})?$`);
/** A per-launch tmpdir socket directory (pw-<uid>-XXXXXX): the only kind a host removes as it stops. */
const perLaunchDirectory = (socket: string, uid: number): boolean => socketDirectoryName(uid).exec(basename(dirname(socket)))?.[1] !== undefined;
/** Removes a directory only when it is empty; anything left inside keeps it. */
function removeEmptyDirectory(path: string): void {
  try { rmdirSync(path); } catch {}
}
/** The socket directory, made and validated BEFORE the id is reserved so a refused one never burns the id (wb-71q
 * F1): the one shared <base>/pw-<uid> under a private runtime base, or a fresh per-launch mkdtemp directory under the
 * tmpdir fallback (wb-70b PF2), which a pre-created foreign <tmpdir>/pw-<uid> cannot block. Returns the socket path. */
function openSocketDirectory(location: DetachedSocketLocation, uid: number): string {
  if (location.source !== "tmpdir") {
    try { mkdirSync(dirname(location.socket), { mode: 0o700 }); } catch (error) { if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error; }
    privatePath(dirname(location.socket), "directory", uid);
    return location.socket;
  }
  const directory = mkdtempSync(join(location.base, `pw-${uid}-`));
  try { privatePath(directory, "directory", uid); } catch (error) { removeEmptyDirectory(directory); throw error; }
  return join(directory, basename(location.socket));
}
/** No reuse, even after a dead host: a deliberate second execution needs a NEW invocation ID. A taken ID is a typed
 * refusal naming the ID and its reservation (wb-70b R2), never the raw mkdir EEXIST. */
function reserveInvocation(directory: string, id: string): void {
  try { mkdirSync(directory, { mode: 0o700 }); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    throw new CapabilityError("validation", `Detached invocation ID conflict: ${id} is already reserved by an earlier launch (${directory} exists); IDs are never reused, even after a dead host, so a deliberate second execution needs a NEW invocation ID.`);
  }
  privatePath(directory, "directory");
}
function readPrivate(path: string, maxBytes: number): Buffer {
  privatePath(path, "file");
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile() || stat.size > maxBytes || stat.uid !== localOperator().uid || (stat.mode & 0o7777) !== 0o600 || stat.nlink !== 1) throw new Error("Authorization: invalid private file.");
    return readFileSync(fd);
  } finally { closeSync(fd); }
}
function writePrivate(path: string, value: unknown): void {
  const fd = openSync(path, constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | constants.O_NOFOLLOW, 0o600);
  try { writeFileSync(fd, JSON.stringify(value)); } finally { closeSync(fd); }
}
interface FilePin { path: string; digest: string }
function pinFile(path: string, maxBytes = 32 * 1024 * 1024): FilePin {
  if (!isAbsolute(path) || realpathSync(path) !== path || !lstatSync(path).isFile() || lstatSync(path).size > maxBytes) throw new Error("Pinned source must be a bounded canonical regular file.");
  return { path, digest: hash(readFileSync(path)) };
}
/** Full bounded local-provider source directory, including additions/deletions.
 * No ignored-file shortcut. This is a surveyed source universe, not filesystem
 * isolation or a claim that arbitrary trusted code cannot read other data. */
function providerTree(root: string): FilePin[] {
  const files: FilePin[] = []; let bytes = 0;
  let directories = 0;
  function visit(path: string, depth = 0): void {
    if (depth > 64 || ++directories > 2000) throw new Error("Local provider directory tree exceeds traversal bound.");
    for (const name of readdirSync(path).sort()) {
      const child = join(path, name); const stat = lstatSync(child);
      if (stat.isDirectory() && !stat.isSymbolicLink()) visit(child, depth + 1);
      else {
        if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("Local provider tree requires regular files; links and special files refused.");
        bytes += stat.size;
        if (files.length >= 2000 || bytes > 32 * 1024 * 1024) throw new Error("Local provider tree exceeds bounded source budget.");
        files.push(pinFile(child));
        if (/\.(?:js|mjs|cjs)$/.test(name)) {
          const source = ts.createSourceFile(child, readFileSync(child, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
          function dependency(node: ts.Node): void {
            let specifier: ts.Expression | undefined;
            if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) specifier = node.moduleSpecifier;
            if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
              if (node.arguments.length !== 1) throw new Error("Local provider imports must be static local literals.");
              specifier = node.arguments[0];
            }
            if (specifier) {
              if (!ts.isStringLiteral(specifier) || !specifier.text.startsWith(".")) throw new Error("Local provider dependencies must be explicit relative source literals.");
              const target = createRequire(child).resolve(specifier.text);
              const rel = relative(root, target);
              if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error("Local provider dependency escapes pinned source tree.");
              pinFile(target);
            }
            ts.forEachChild(node, dependency);
          }
          dependency(source);
        }
      }
    }
  }
  visit(root); return files;
}
function verifyFiles(files: readonly FilePin[]): void {
  for (const file of files) if (pinFile(file.path).digest !== file.digest) throw new Error("IDENTITY_CONFLICT: pinned source or implementation changed; dispatch refused.");
}
function packageRoot(): string {
  let root = dirname(fileURLToPath(import.meta.url));
  while (!existsSync(join(root, "package.json"))) {
    if (root === dirname(root)) throw new Error("Detached host cannot locate its package.");
    root = dirname(root);
  }
  return realpathSync(root);
}
function implementationArtifacts(root: string): string[] {
  const base = join(root, "dist");
  const files: string[] = [];
  function visit(path: string) {
    for (const name of readdirSync(path).sort()) {
      const child = join(path, name); const stat = lstatSync(child);
      if (stat.isSymbolicLink()) throw new Error("Unpinned implementation symlink.");
      if (stat.isDirectory()) visit(child);
      else if (stat.isFile() && name.endsWith(".js")) files.push(relative(root, child));
    }
  }
  visit(base);
  return files;
}
/** Pin the installed JavaScript package closure (not only a barrel entrypoint).
 * Native executables launched by SDK defaults/PATH still have unsupported identity. */
function runtimeClosure(entries: readonly string[]): string[] {
  const files = new Set<string>();
  for (const entry of entries) {
    const resolved = realpathSync(entry);
    if (resolved === realpathSync(process.execPath)) { files.add(resolved); continue; }
    let root = dirname(resolved);
    while (!existsSync(join(root, "package.json"))) {
      if (root === dirname(root)) throw new Error("Runtime package closure unavailable.");
      root = dirname(root);
    }
    files.add(join(root, "package.json"));
    // TypeScript's worker loads typescript.js, not the unrelated tsserver tool.
    if (resolved === fileURLToPath(import.meta.resolve("typescript"))) { files.add(resolved); continue; }
    function visit(path: string) {
      for (const name of readdirSync(path).sort()) {
        if (name === "node_modules") continue;
        const child = join(path, name); const stat = lstatSync(child);
        if (stat.isSymbolicLink()) throw new Error("Runtime closure contains unpinned symlink.");
        if (stat.isDirectory()) visit(child);
        else if (stat.isFile() && /\.(?:js|mjs|cjs)$/.test(name)) files.add(child);
        if (files.size > 4096) throw new Error("Runtime closure exceeds identity budget.");
      }
    }
    visit(root);
  }
  return [...files].sort();
}
interface Boot {
  contract: typeof DETACHED_CONTRACT;
  request: DetachedLaunchRequest;
  owner: LocalOperator;
  hostInstanceId: string;
  pin: InvocationSnapshot;
  capture: IdentityCaptureInput;
  sourcePins: FilePin[];
  /** Socket chosen by the launcher; the child and later clients never re-derive it from their own env. */
  socket: string;
  socketBase: string;
  localProviderTree?: FilePin[];
  inputDigest: string;
  snapshotDigest: string;
}
const NATIVE_GRANTS = { forge: "forge:inspect", hyperunix: "hyperunix:read", reactivefiber: "reactivefiber:render", "furnace-observe": "furnace:inspect" } as const;
/** The capability each native provider registers: one source for identity capture and effect metadata. */
const NATIVE_CAPABILITIES = { forge: "forge.gate.status", hyperunix: "hyperunix.find", reactivefiber: "reactivefiber.render.preview", "furnace-observe": "furnace.run.inspect" } as const;
function validateRequest(raw: DetachedLaunchRequest): DetachedLaunchRequest {
  const input = record(validatedCapabilityJson(raw, "launch request", 64, DETACHED_MAX_FRAME_BYTES));
  only(input, ["directory", "invocationId", "scriptPath", "cwd", "input", "trustedScript", "backend", "providers", "grants", "permissions", "sourceFiles", "claude", "localProvider", "timeoutMs", "retentionMs", "autoStart"]);
  invocationId(input.invocationId);
  if (input.trustedScript !== true) throw new Error("Only explicitly reviewed trusted scripts may run; VM is not an isolation boundary.");
  if (input.backend !== "deterministic" && input.backend !== "claude") throw new Error("Unsupported detached backend.");
  for (const name of ["directory", "scriptPath", "cwd"] as const) if (typeof input[name] !== "string" || !isAbsolute(input[name] as string)) throw new Error(`Missing absolute ${name}.`);
  if (!Object.hasOwn(input, "input")) throw new Error("Invocation input must be explicit JSON.");
  const request = input as unknown as DetachedLaunchRequest;
  if (request.autoStart !== undefined && typeof request.autoStart !== "boolean") throw new Error("Invalid autoStart.");
  if (realpathSync(request.cwd) !== request.cwd || !lstatSync(request.cwd).isDirectory()) throw new Error("Workspace must be canonical directory.");
  const providers = request.providers ?? [];
  const grants = request.grants ?? [];
  const permissions = request.permissions ?? ["inspect", "execute", "cancel", "shutdown"];
  if (!Array.isArray(providers) || new Set(providers).size !== providers.length || providers.some(id => !Object.hasOwn(NATIVE_GRANTS, id))) throw new Error("Unsupported or duplicate native provider.");
  if (!Array.isArray(grants) || grants.length > 128 || grants.some(grant => typeof grant !== "string" || !grant.trim() || grant.length > 256)) throw new Error("Invalid explicit grants.");
  if (!Array.isArray(permissions) || !permissions.includes("inspect") || new Set(permissions).size !== permissions.length || permissions.some(p => !["inspect", "execute", "cancel", "shutdown"].includes(p))) throw new Error("Invalid invocation permissions.");
  for (const provider of providers as readonly (keyof typeof NATIVE_GRANTS)[]) if (!grants.includes(NATIVE_GRANTS[provider])) throw new Error(`Native provider ${provider} requires explicit grant ${NATIVE_GRANTS[provider]}.`);
  if (request.backend === "claude" && !grants.includes("claude:invoke")) throw new Error("Claude requires explicit claude:invoke grant (auth is SDK-owned and separate).");
  if (request.claude) {
    if (request.backend !== "claude") throw new Error("Claude config requires Claude backend.");
    only(record(request.claude), ["model", "tools", "roles"]);
    if (request.claude.model !== undefined && (typeof request.claude.model !== "string" || !request.claude.model.trim())) throw new Error("Invalid Claude model.");
    if (request.claude.tools !== undefined && !Array.isArray(request.claude.tools)) throw new Error("Invalid Claude tool array.");
    const tools = [...(request.claude.tools ?? [])];
    if (request.claude.roles) for (const role of Object.values(request.claude.roles)) {
      only(record(role), ["prompt", "tools", "model", "effort"]);
      if (typeof role.prompt !== "string" || (role.tools !== undefined && !Array.isArray(role.tools)) || (role.model !== undefined && typeof role.model !== "string") || (role.effort !== undefined && !["low", "medium", "high", "xhigh", "max"].includes(role.effort))) throw new Error("Invalid Claude role config.");
      tools.push(...(role.tools ?? []));
    }
    for (const tool of tools) if (typeof tool !== "string" || !grants.includes(`claude:tool:${tool}`)) throw new Error("Claude built-ins require exact host grants.");
  }
  if (request.localProvider) {
    only(record(request.localProvider), ["kind", "version", "modulePath", "digest", "capabilities"]);
    if (request.localProvider.kind !== "trusted-local" || request.localProvider.version !== "1.0.0" || request.backend !== "deterministic" || providers.length !== 0 || typeof request.localProvider.modulePath !== "string" || !/^sha256:[a-f0-9]{64}$/.test(request.localProvider.digest)) throw new Error("Local providers require explicit reviewed manifest; cannot masquerade as native or Claude.");
    if (!Array.isArray(request.localProvider.capabilities) || request.localProvider.capabilities.length === 0 || request.localProvider.capabilities.length > 32 || request.localProvider.capabilities.some(id => typeof id !== "string" || !/^local\.[a-z][a-z0-9.-]*$/.test(id))) throw new Error("Local provider capability IDs must be explicitly allowlisted in the local.* namespace.");
    const file = pinFile(request.localProvider.modulePath);
    if (file.digest !== request.localProvider.digest) throw new Error("Local provider source digest mismatch.");
    const rel = relative(request.cwd, file.path);
    if (rel.startsWith(`..${sep}`) || rel === ".." || isAbsolute(rel)) throw new Error("Local provider source must be inside the authorized workspace (not an arbitrary plugin path).");
  }
  const files = request.sourceFiles ?? [request.scriptPath];
  if (!Array.isArray(files) || files.length === 0 || files.length > 2000) throw new Error("Declared source files must be bounded and nonempty.");
  let sourceBytes = 0;
  for (const path of files) {
    pinFile(path); sourceBytes += lstatSync(path).size;
    if (sourceBytes > 32 * 1024 * 1024) throw new Error("Declared source exceeds total 32 MiB budget."); const rel = relative(request.cwd, path);
    if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error("Source file escapes workspace.");
  }
  for (const [name, value, min, max] of [["timeoutMs", request.timeoutMs ?? 86400000, 1, 86400000], ["retentionMs", request.retentionMs ?? 600000, 100, 3600000]] as const) if (!Number.isSafeInteger(value) || value < min || value > max) throw new Error(`Invalid ${name}.`);
  return { ...request, providers: [...providers], grants: [...grants], permissions: [...permissions], sourceFiles: [...files], timeoutMs: request.timeoutMs ?? 86400000, retentionMs: request.retentionMs ?? 600000 };
}
function registryFor(request: DetachedLaunchRequest): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  for (const provider of request.providers ?? []) {
    switch (provider) {
      case "forge": registerNativeForgeGateStatus(registry, request.cwd); break;
      case "hyperunix": registerNativeHyperUnixFind(registry, request.cwd); break;
      case "reactivefiber": registerNativeReactiveFiberRender(registry, request.cwd); break;
      case "furnace-observe": registerNativeFurnaceRunInspect(registry, request.cwd); break;
    }
  }
  if (request.localProvider) {
    if (pinFile(request.localProvider.modulePath).digest !== request.localProvider.digest) throw new Error("IDENTITY_CONFLICT: local provider source changed.");
    const module: { register?: (registry: CapabilityRegistry) => void } = createRequire(import.meta.url)(request.localProvider.modulePath);
    if (typeof module.register !== "function") throw new Error("Local provider source must export register(registry).");
    const register = registry.register.bind(registry);
    registry.register = provider => {
      if (!request.localProvider!.capabilities.includes(provider.descriptor.id)) throw new Error("Local provider tried registering an undeclared capability.");
      register(provider);
    };
    module.register(registry);
    const declared = request.localProvider.capabilities;
    const registered = registry.discover({ grants: declared.map(id => `discover:${id}`) });
    if (registered.length !== declared.length || registered.some(d => d.permissions.some(permission => !(request.grants ?? []).includes(permission)))) throw new Error("Local provider manifest/capability grants mismatch.");

  }
  return registry;
}
function processIdentity(): { sessionId: number; processStartTicks: string } {
  const stat = readFileSync(`/proc/${process.pid}/stat`, "utf8");
  const fields = stat.slice(stat.lastIndexOf(")") + 2).trim().split(/\s+/);
  const sessionId = Number(fields[3]); const processStartTicks = fields[19];
  if (sessionId !== process.pid || !/^\d+$/.test(processStartTicks)) throw new Error("Host is not the actual detached OS session leader.");
  return { sessionId, processStartTicks };
}
function safeJson(value: unknown, maxBytes = 256 * 1024): JsonValue {
  const json = validatedCapabilityJson(value, "snapshot", 64, maxBytes);
  const walk = (v: JsonValue): JsonValue => typeof v === "string" ? redactWorkbenchText(v) : Array.isArray(v) ? v.map(walk) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, child]) => [k, walk(child)])) : v;
  return walk(json);
}
interface PreparedBoot { boot: Boot; bootDigest: string; hostEntrypoint: string; root: string }
/** Everything the child needs before it may start: the provider registry, identity capture, source pins and the
 * private boot pin, which records the socket the launcher chose. */
function prepareBoot(request: DetachedLaunchRequest, owner: LocalOperator, p: ReturnType<typeof paths>, socket: string, socketBase: string): PreparedBoot {
  const registry = registryFor({ ...request, localProvider: undefined });
  // Local provider manifest + exact module bytes are pinned in config/sourcePins.
  // Registration occurs only in the child, not in the Pi caller.
  const root = packageRoot();
  const hostEntrypoint = join(root, "dist", "workbench", "hosts", "local-detached.js");
  if (!existsSync(hostEntrypoint) || realpathSync(hostEntrypoint) !== hostEntrypoint) throw new Error("Detached launch requires the compiled distribution; build it before launch.");
  const localProviderTree = request.localProvider ? providerTree(request.cwd) : undefined;
  const sourcePins = [...new Set([request.scriptPath, ...(request.sourceFiles ?? []), ...(localProviderTree?.map(file => file.path) ?? [])])].map(path => pinFile(path));
  const runtimeArtifacts = [fileURLToPath(import.meta.resolve("@forge/sdk")), fileURLToPath(import.meta.resolve("@furnace/sdk")), fileURLToPath(import.meta.resolve("@hyperunix/sdk")), realpathSync(process.execPath), fileURLToPath(import.meta.resolve("@anthropic-ai/claude-agent-sdk")), fileURLToPath(import.meta.resolve("typebox/value")), fileURLToPath(import.meta.resolve("typescript"))];
  const capture: IdentityCaptureInput = {
    definition: { kind: "script", id: request.scriptPath, schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION }, scriptPath: request.scriptPath,
    packageRoot: root, hostArtifacts: implementationArtifacts(root), runtimeArtifacts: runtimeClosure(runtimeArtifacts), logicalInvocationId: request.invocationId,
    principal: { issuer: owner.issuer, subject: owner.id }, workspace: { path: request.cwd, sourceBasis: `declared-files:${identityDigest("declared-source", sourcePins)}` },
    effectiveConfig: validatedCapabilityJson(request, "configuration") ,
    hostAbi: { runtime: "node", version: process.versions.node, platform: process.platform, arch: process.arch, interfaceVersion: DETACHED_CONTRACT },
    providerDescriptors: registry.discover({ grants: (request.providers ?? []).map(id => `discover:${NATIVE_CAPABILITIES[id]}`) }).map(d => ({ id: d.id, version: d.version, permissions: d.permissions, effectClass: d.effectClass, supportedModes: d.supportedModes, inputSchema: validatedCapabilityJson(d.inputSchema, "schema"), ...(d.outputSchema ? { outputSchema: validatedCapabilityJson(d.outputSchema, "schema") } : {}), contractSource: d.contractSource ?? "unknown" })),
  };
  const pin = captureInvocationIdentity(capture); validateScript(pin.scriptSource);
  const boot: Boot = { contract: DETACHED_CONTRACT, request, owner, hostInstanceId: randomBytes(24).toString("hex"), pin, capture, sourcePins, socket, socketBase, ...(localProviderTree ? { localProviderTree } : {}), inputDigest: identityDigest("invocation-input", request.input), snapshotDigest: identityDigest("invocation-snapshot", pin) };
  writePrivate(p.boot, boot);
  return { boot, bootDigest: hash(readPrivate(p.boot, 8 * DETACHED_MAX_FRAME_BYTES)), hostEntrypoint, root };
}
/** Receipt comes through hello from the actual process, never spawn.pid alone. `placement` names the socket-base
 * inputs instead of this process's environment (how a test reaches the tmpdir fallback); Pi never passes it. */
export async function launchDetachedWorkflow(raw: DetachedLaunchRequest, placement: DetachedSocketPlacement = {}): Promise<DetachedReceipt> {
  const owner = localOperator(); const request = validateRequest(raw);
  ancestors(request.directory);
  if (!existsSync(request.directory)) mkdirSync(request.directory, { mode: 0o700 });
  const p = paths(request.directory, request.invocationId);
  const location = resolveDetachedSocket(request.directory, request.invocationId, { env: placement.env, tmpdir: placement.tmpdir, runUserRoot: placement.runUserRoot, uid: owner.uid });
  // The socket directory is created and validated BEFORE the id is reserved, so a refused one never burns the id.
  const socket = openSocketDirectory(location, owner.uid);
  // Until a host process runs, a per-launch socket directory is this launcher's to remove when the launch fails.
  const discard = () => { if (location.source === "tmpdir") removeEmptyDirectory(dirname(socket)); };
  let prepared: PreparedBoot;
  try { reserveInvocation(p.directory, request.invocationId); prepared = prepareBoot(request, owner, p, socket, location.base); }
  catch (error) { discard(); throw error; }
  const { boot, bootDigest, hostEntrypoint, root } = prepared;
  const env = { ...process.env }; delete env.NODE_OPTIONS; delete env.NODE_PATH;
  const child = spawn(process.execPath, [hostEntrypoint, "--serve", p.boot, bootDigest], { cwd: root, env, detached: true, stdio: "ignore", shell: false });
  let launchError: Error | undefined;
  child.on("error", error => { launchError = error; }); child.unref();
  for (let attempt = 0; attempt < 100; attempt++) {
    if (launchError) { discard(); throw launchError; }
    if (child.exitCode !== null || child.signalCode !== null) { discard(); throw new Error("Detached host exited before handshake; invocation reserved, do not retry automatically."); }
    if (existsSync(socket)) {
      try {
        const reply = record(await commandAt(request.directory, request.invocationId, { command: "hello", invocationId: request.invocationId }, socket));
        const receipt = validateReceipt(reply.receipt, request.invocationId);
        if (receipt.hostInstanceId !== boot.hostInstanceId || receipt.pid !== child.pid || receipt.snapshotDigest !== boot.snapshotDigest || receipt.owner.id !== owner.id) throw new Error("Detached handshake identity conflict.");
        if (request.autoStart !== false && request.permissions?.includes("execute")) await commandAt(request.directory, request.invocationId, { command: "execute", invocationId: request.invocationId }, socket);
        return receipt;
      } catch (error) {
        if (error instanceof Error && !/ENOENT|ECONNREFUSED/.test(error.message)) throw error;
      }
    }
    await new Promise(r => setTimeout(r, 50));
  }
  throw new Error("Detached handshake timed out; invocation reserved and effects unknown. Do not automatically retry.");
}
function validateReceipt(raw: unknown, id: string): DetachedReceipt {
  const receipt = record(validatedCapabilityJson(raw, "receipt")); const owner = record(receipt.owner);
  if (receipt.contract !== DETACHED_CONTRACT || receipt.invocationId !== id || typeof receipt.pid !== "number" || !Number.isSafeInteger(receipt.pid) || receipt.pid < 1 || receipt.sessionId !== receipt.pid || typeof receipt.hostInstanceId !== "string" || !/^[a-f0-9]{48}$/.test(receipt.hostInstanceId) || owner.id !== localOperator().id || owner.uid !== localOperator().uid || receipt.nativeRuntimeIdentity !== "unsupported") throw new Error("Authorization: invalid detached receipt identity.");
  return receipt as unknown as DetachedReceipt;
}
/** The socket the host recorded in its private receipt; a client never re-derives it from its own env. It must sit
 * in the per-user socket directory under the recorded socketBase, the check the child makes on its boot pin (wb-71q
 * F3); a receipt from before socketBase existed names its invocation directory's host.sock and keeps it. */
function recordedSocket(p: ReturnType<typeof paths>, id: string): string {
  const receipt = validateReceipt(JSON.parse(readPrivate(p.receipt, DETACHED_MAX_FRAME_BYTES).toString("utf8")), id);
  const { socketPath, socketBase } = receipt;
  if (typeof socketPath !== "string" || !isAbsolute(socketPath) || Buffer.byteLength(socketPath) > DETACHED_SOCKET_PATH_LIMIT || !socketPath.endsWith(".sock")) throw new Error("Authorization: receipt socket path invalid.");
  const contained = socketBase === undefined ? socketPath === join(p.directory, "host.sock") : typeof socketBase === "string" && socketWithinBase(socketPath, socketBase, localOperator().uid);
  if (!contained) throw new Error("Authorization: receipt socket path invalid.");
  return socketPath;
}
async function commandAt(root: string, id: string, command: DetachedCommand, knownSocket?: string): Promise<JsonValue> {
  const p = paths(root, id); privatePath(p.directory, "directory");
  const socketPath = knownSocket ?? recordedSocket(p, id);
  privatePath(dirname(socketPath), "directory"); privatePath(socketPath, "socket");
  return new Promise((resolveReply, reject) => {
    const socket = createConnection(socketPath); const decoder = new DetachedFrameDecoder();
    let answered = false;
    const fail = (error: Error) => { if (!answered) { answered = true; socket.destroy(); reject(error); } };
    socket.setTimeout(3000, () => fail(new Error("Detached transport timeout; effects may be unresolved.")));
    socket.once("error", fail);
    socket.once("close", () => { if (!answered) fail(new Error("Detached host disconnected before reply.")); });
    socket.once("connect", () => socket.write(detachedFrame(command)));
    socket.on("data", chunk => {
      try {
        for (const value of decoder.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)) {
          const response = record(value);
          if (response.ok === false) { fail(new Error(`Detached ${String(response.category)}: ${String(response.diagnostic)}`)); return; }
          if (response.ok !== true || !Object.hasOwn(response, "value")) throw new Error("Malformed detached response.");
          answered = true; socket.destroy(); resolveReply(response.value as JsonValue); return;
        }
      } catch (error) { fail(error instanceof Error ? error : new Error(String(error))); }
    });
  });
}
export function connectDetachedWorkflow(root: string, id: string) {
  localOperator(); invocationId(id);
  return {
    /** Fresh bounded read, no retained connection; dropping this handle cancels nothing. */
    async inspect(): Promise<DetachedSnapshot> {
      try { return await commandAt(root, id, { command: "inspect", invocationId: id }) as unknown as DetachedSnapshot; }
      catch (error) {
        // Permissions/schema failures are denials, not evidence of a dead host.
        if (error instanceof Error && /Authorization|authorization|Unsupported|Invalid|EACCES|EPERM/.test(error.message)) throw error;
        return { contract: DETACHED_CONTRACT, invocationId: id, observation: "unknown", observedAt: new Date().toISOString(), source: "local-client-transport", terminal: "unknown", diagnostic: redactWorkbenchText(error instanceof Error ? error.message : String(error)), reconcileHint: RECONCILE, nativeRuntimeIdentity: "unsupported", progress: [], droppedProgress: 0, controlAudit: [], cancellationRequested: false };
      }
    },
    async execute(): Promise<{ started: boolean }> { return await commandAt(root, id, { command: "execute", invocationId: id }) as unknown as { started: boolean }; },
    async cancel(reason: string): Promise<{ accepted: boolean; terminalConfirmed: boolean }> { return await commandAt(root, id, decodeDetachedCommand({ command: "cancel", invocationId: id, reason })) as unknown as { accepted: boolean; terminalConfirmed: boolean }; },
    async shutdown(reason: string): Promise<{ accepted: boolean; unresolvedEffects: boolean }> { return await commandAt(root, id, decodeDetachedCommand({ command: "shutdown", invocationId: id, reason })) as unknown as { accepted: boolean; unresolvedEffects: boolean }; },
  };
}
/** The admitted launch-request fields the child's workflow host reads. */
export type DetachedHostRequest = Pick<DetachedLaunchRequest, "backend" | "cwd" | "invocationId" | "providers" | "grants" | "localProvider" | "claude">;
export interface DetachedHostOptions {
  /** Already admitted by validateRequest in the child, never raw script input. */
  request: DetachedHostRequest;
  /** The child's registry: the enabled native adapters or the reviewed local manifest's allowlist. */
  registry: CapabilityRegistry;
  /** The receipt's local OS operator, bound by the host and never by the script. */
  principal: { readonly id: string; readonly role: "local-operator" };
  signal: AbortSignal;
  /** Re-verifies the immutable invocation basis before every dispatch. */
  beforeDispatch: () => void;
}
/** The pinned provider manifest: each capability this invocation may dispatch
 * (the enabled native adapters, or exactly the reviewed local allowlist) with
 * the effect class its producer declared. Prose and schemas stay out of it. */
function providerManifest(registry: CapabilityRegistry, request: Pick<DetachedHostRequest, "providers" | "localProvider">) {
  const ids = [...(request.providers ?? []).map(provider => NATIVE_CAPABILITIES[provider]), ...(request.localProvider?.capabilities ?? [])];
  return registry.discover({ grants: ids.map(id => `discover:${id}`) })
    .map(d => ({ id: d.id, version: d.version, effectClass: d.effectClass, permissions: [...d.permissions], supportedModes: [...d.supportedModes], contractSource: d.contractSource ?? null }))
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
/** The workflow host the detached child's interpreter runs against. Built only in
 * the child (and by in-process tests); the Pi caller never constructs one.
 *
 * Node effect metadata comes from the pinned provider manifest, so every journal
 * recorded through this host carries the producer-declared effect class and a
 * resume refuses a journaled non-read effect with uncertain-effect instead of
 * re-running it live. Only the manifest vouches: an id outside it records no
 * class. The runtime stamps replayBasis on every entry and replays a node read
 * only under an equal basis, so the Claude backend, which permits settled-agent
 * replay, hands back a read only under the same workspace, operator, grant set,
 * provider manifest and Claude policy. replaySafe stays false on the
 * deterministic backend, as before effect metadata: it has no settled agents to
 * reuse and re-observes its reads live; declining costs a live re-read, never an effect. */
export function createDetachedWorkflowHost({ request, registry, principal, signal, beforeDispatch }: DetachedHostOptions): WorkflowHost {
  const commonHost: WorkflowHost = request.backend === "claude" ? createClaudeWorkflowHost({ cwd: request.cwd, signal, ...request.claude, settingSources: [], permissionMode: "dontAsk", capabilities: registry, grants: request.grants, invocationId: request.invocationId, principal, beforeDispatch }) : {
    replaySafe: false,
    async spawnAgent() { return { ok: false, error: "Claude is not enabled; deterministic host never substitutes a fake model." }; },
    abortAgent() {},
    async callNode(node) { beforeDispatch();
      if (request.localProvider && !request.localProvider.capabilities.includes(node.capabilityId)) throw new CapabilityError("authorization", "Capability absent from trusted local provider manifest.");
      return registry.invoke(node.capabilityId, node.input, { grants: request.grants ?? [], signal: node.signal, invocationId: request.invocationId, callId: String(node.callId), principal, workspace: request.cwd }); },
  };
  // Nested filesystem resolution would load mutable, unpinned source. Refuse it.
  const { loadWorkflow: _unboundNested, ...host } = commonHost;
  const manifest = providerManifest(registry, request);
  const effects = new Map(manifest.map(entry => [entry.id, entry.effectClass]));
  const local = request.localProvider;
  return {
    ...host,
    describeNodeEffect: capabilityId => effects.get(capabilityId),
    // The policy a recorded answer depends on beyond its own payload; per-run
    // identity (invocation, host instance, input) stays out, as in the Claude host.
    replayBasis: identityDigest("local-detached-replay-basis", {
      contract: DETACHED_CONTRACT, backend: request.backend, workspace: request.cwd, principal: principal.id,
      grants: [...new Set(request.grants ?? [])].sort(), manifest,
      localProvider: local ? { kind: local.kind, version: local.version, modulePath: local.modulePath, digest: local.digest, capabilities: [...local.capabilities].sort() } : null,
      host: commonHost.replayBasis ?? null,
    }),
  };
}
/** Internal child entry, exported for the explicit detached Node bootstrap only. */
export async function startDetachedHost(bootPath: string, expectedDigest: string): Promise<void> {
  process.umask(0o077);
  const bytes = readPrivate(bootPath, 8 * DETACHED_MAX_FRAME_BYTES);
  if (hash(bytes) !== expectedDigest) throw new Error("IDENTITY_CONFLICT: boot bytes changed.");
  const boot = JSON.parse(bytes.toString("utf8")) as Boot;
  if (boot.contract !== DETACHED_CONTRACT || boot.owner.id !== localOperator().id) throw new Error("Authorization: boot owner conflict.");
  const request = validateRequest(boot.request); const p = paths(request.directory, request.invocationId);
  if (bootPath !== p.boot) throw new Error("Authorization: boot path mismatch.");
  if (typeof boot.socket !== "string" || typeof boot.socketBase !== "string" || !isAbsolute(boot.socket) || !boot.socket.endsWith(".sock") || Buffer.byteLength(boot.socket) > DETACHED_SOCKET_PATH_LIMIT || !socketWithinBase(boot.socket, boot.socketBase, localOperator().uid)) throw new Error("Authorization: boot socket path invalid.");
  privatePath(dirname(boot.socket), "directory");
  privatePath(p.directory, "directory"); verifyFiles(boot.sourcePins);
  if (boot.localProviderTree && identityDigest("local-provider-tree", providerTree(request.cwd)) !== identityDigest("local-provider-tree", boot.localProviderTree)) throw new Error("IDENTITY_CONFLICT: local provider tree changed.");
  const actual = captureInvocationIdentity(boot.capture);
  if (identityDigest("invocation-snapshot", actual) !== boot.snapshotDigest || identityDigest("invocation-input", request.input) !== boot.inputDigest) throw new Error("IDENTITY_CONFLICT: actual host pin differs from admission.");
  const registry = registryFor(request);
  const receipt: DetachedReceipt = { contract: DETACHED_CONTRACT, invocationId: request.invocationId, hostInstanceId: boot.hostInstanceId, pid: process.pid, ...processIdentity(), owner: localOperator(), invocationDirectory: p.directory, socketPath: boot.socket, socketBase: boot.socketBase, launchedAt: new Date().toISOString(), deploymentDigest: boot.pin.identity.deploymentDigest, scriptDigest: boot.pin.scriptDigest, inputDigest: boot.inputDigest, snapshotDigest: boot.snapshotDigest, permissions: [...(request.permissions ?? [])], security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash", nativeRuntimeIdentity: "unsupported", evidenceClass: request.localProvider ? "local-provider" : request.backend === "claude" || request.providers?.length ? "native-client" : "local-computation" };
  writePrivate(p.receipt, receipt);
  const controller = new AbortController(); const sockets = new Set<Socket>();
  let started = false; let closing = false; let terminal: DetachedSnapshot["terminal"];
  let result: JsonValue | undefined; let diagnostic: string | undefined; let droppedProgress = 0;
  const progress: JsonValue[] = []; const audit: JsonValue[] = [];
  let retention: ReturnType<typeof setTimeout> | undefined;
  let deadline: ReturnType<typeof setTimeout> | undefined;
  let lastObservation = Date.now();
  function basis() {
    privatePath(p.directory, "directory"); privatePath(p.boot, "file");
    if (hash(readPrivate(p.boot, 8 * DETACHED_MAX_FRAME_BYTES)) !== expectedDigest) throw new Error("IDENTITY_CONFLICT: immutable invocation changed.");
    verifyFiles(boot.sourcePins);
    if (boot.localProviderTree && identityDigest("local-provider-tree", providerTree(request.cwd)) !== identityDigest("local-provider-tree", boot.localProviderTree)) throw new Error("IDENTITY_CONFLICT: local provider tree changed.");
    const now = captureInvocationIdentity(boot.capture);
    if (identityDigest("invocation-snapshot", now) !== boot.snapshotDigest) throw new Error("IDENTITY_CONFLICT: implementation/config/source changed.");
  }
  const host = createDetachedWorkflowHost({ request, registry, principal: { id: receipt.owner.id, role: "local-operator" }, signal: controller.signal, beforeDispatch: basis });
  function snapshot(): DetachedSnapshot {
    return { contract: DETACHED_CONTRACT, invocationId: request.invocationId, observation: terminal ? "observed-terminal" : started ? "observed-running" : "observed-started", observedAt: new Date().toISOString(), source: "live-detached-host", receipt, ...(terminal ? { terminal } : {}), ...(result !== undefined ? { result } : {}), ...(diagnostic ? { diagnostic } : {}), nativeRuntimeIdentity: "unsupported", progress: [...progress], droppedProgress, controlAudit: [...audit], cancellationRequested: controller.signal.aborted, ...(controller.signal.aborted ? { reconcileHint: "Local interpreter cancellation does not prove native effects rolled back; reconcile with their owning producer." } : {}) };
  }
  function start(): boolean {
    if (started || terminal || closing) return false;
    basis(); started = true;
    deadline = setTimeout(() => { diagnostic = "Owned interpreter exceeded wall-clock bound; native effects require reconciliation."; controller.abort(); }, request.timeoutMs);
    void runWorkflow({ script: boot.pin.scriptSource, args: request.input, host, signal: controller.signal, onProgress(entries) {
      for (const entry of entries) {
        try {
          const publicRow = { ...entry } as Record<string, unknown>;
          delete publicRow.promptPreview; delete publicRow.resultPreview;
          const row = safeJson(publicRow, 8192); progress.push(row);
        }
        catch { droppedProgress++; }
        while (progress.length > 64) { progress.shift(); droppedProgress++; }
      }
    } }).then(outcome => {
      terminal = controller.signal.aborted ? "cancelled" : outcome.status === "completed" ? "completed" : "failed";
      try { if (outcome.value !== undefined) result = safeJson(outcome.value); }
      catch { terminal = "failed"; diagnostic = "Workflow returned a result exceeding the bounded JSON snapshot contract."; }
      if (outcome.error) diagnostic = redactWorkbenchText(outcome.error);
    }, error => { terminal = controller.signal.aborted ? "cancelled" : "failed"; diagnostic = redactWorkbenchText(error instanceof Error ? error.message : String(error)); }).finally(() => {
      clearTimeout(deadline);
      retention = setTimeout(() => { void stop(); }, request.retentionMs);
    });
    return true;
  }
  async function stop() {
    if (closing) return;
    closing = true; controller.abort(); clearTimeout(deadline); clearTimeout(retention);
    clearInterval(idle);
    server.close();
    // Closing unlinks the socket; a per-launch tmpdir socket directory goes with it, the shared pw-<uid> stays (PF4).
    if (perLaunchDirectory(boot.socket, receipt.owner.uid)) removeEmptyDirectory(dirname(boot.socket));
    for (const socket of sockets) socket.end();
    // Native waits can ignore cancellation. Bound graceful shutdown, never claim rollback.
    setTimeout(() => process.exit(0), 250).unref();
  }
  const server = createServer(socket => {
    if (closing || sockets.size >= 16) { socket.destroy(); return; }
    sockets.add(socket); socket.once("close", () => sockets.delete(socket)); socket.on("error", () => socket.destroy());
    socket.setTimeout(3000, () => socket.destroy()); const decoder = new DetachedFrameDecoder(MAX_COMMAND_BYTES);
    let handled = false;
    socket.on("data", chunk => {
      try {
        const frames = decoder.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
        if (frames.length === 0) return;
        if (handled || frames.length !== 1) throw new Error("One bounded command per connection.");
        handled = true;
        privatePath(p.directory, "directory"); privatePath(boot.socket, "socket");
        const command = decodeDetachedCommand(frames[0]);
        if (command.invocationId !== request.invocationId) throw new CapabilityError("authorization", "Invocation ACL mismatch.");
        const permission = command.command === "hello" ? "inspect" : command.command;
        if (!request.permissions?.includes(permission)) throw new CapabilityError("authorization", `Invocation ${permission} grant denied.`);
        lastObservation = Date.now();
        let value: unknown;
        if (command.command === "hello") value = { receipt };
        else if (command.command === "inspect") value = snapshot();
        else if (command.command === "execute") value = { started: start() };
        else {
          const unresolvedEffects = started && !terminal;
          const accepted = command.command === "shutdown" || (!terminal && started);
          audit.push({ command: command.command, principal: receipt.owner.id, invocationId: request.invocationId, reason: redactWorkbenchText("reason" in command ? command.reason : ""), accepted, observedAt: new Date().toISOString(), ownership: "owned-local-interpreter-only", terminalConfirmed: false });
          if (audit.length > 16) audit.shift();
          if (command.command === "cancel" && accepted) controller.abort();
          value = command.command === "cancel" ? { accepted, terminalConfirmed: terminal === "cancelled" } : { accepted, unresolvedEffects };
        }
        socket.end(detachedFrame({ ok: true, value }));
        if (command.command === "shutdown") setTimeout(() => { void stop(); }, 20);
      } catch (error) {
        try { socket.end(detachedFrame({ ok: false, category: error instanceof CapabilityError ? error.category : "validation", diagnostic: redactWorkbenchText(error instanceof Error ? error.message : String(error)) })); }
        catch { socket.destroy(); }
      }
    });
  });
  const idle = setInterval(() => { if (!started && Date.now() - lastObservation > 60000) void stop(); }, 1000);
  process.once("SIGTERM", () => { void stop(); }); process.once("SIGINT", () => { void stop(); });
  await new Promise<void>((resolveReady, reject) => { server.once("error", reject); server.listen(boot.socket, () => { chmodSync(boot.socket, 0o600); privatePath(boot.socket, "socket"); resolveReady(); }); });
}

// Actual compiled entrypoint: no --eval/--input-type flags reach workflow workers.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url) && process.argv[2] === "--serve") {
  startDetachedHost(process.argv[3], process.argv[4]).catch(() => { process.exit(1); });
}
