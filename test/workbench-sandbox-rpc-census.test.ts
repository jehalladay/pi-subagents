/**
 * wb-ksz.5 (W19/WB-022 slice 2 of wb-ksz): sandbox RPC tool-surface census falsifier (respin U1-U6).
 *
 * Measurement only: src/ is untouched (owner 16:44Z). The "child" here is the real workflow Worker the runtime
 * spawns; frames a hostile script could not send through the VM are injected onto the host's side of that same
 * Worker, so the HOST-side handler under test is the real one.
 *
 * Quoted spec (docs/workbench/12-security.md):
 *   'Authorization design': "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names."
 *                           "Treat unknown permission data as deny."
 *   'Security acceptance tests': "Host-side deny even when script crafts raw RPC"
 *   'Credential boundaries': "no serialized clients/private tokens across worker channel"
 *                            "Disable untrusted script filesystem/network"
 * Owner boundary (wb-ksz, 16:19Z): "RPC exposes only the registered grant-gated tool surface".
 *
 * MARKER DISCLOSURE (U5; owner R1 07:16Z = GRANT BY NAME for wb-ksz.5, conditional on this disclosure): the one
 * vi.mock in this file, vi.mock("node:worker_threads"), is a CALL-THROUGH RECORDING SUBCLASS of the real
 * node:worker_threads Worker: super(...args) builds the real Worker (a real thread runs the real WORKER_SOURCE),
 * postMessage is recorded then forwarded to the original, and the factory decides nothing. The captured real
 * instance receives host-side emit("message", <plain-JSON frame>) injection into the REAL runtime listener, so
 * every reply and refusal below is decided by src/workflow/runtime.ts and the real CapabilityRegistry. Any other
 * mock shape needs its own named grant (ksz.6 F4 shape reading). H1 pins the call-through property.
 *
 * HONEST LIMITS: frames are injected on the host side of the REAL Worker (a script cannot send raw frames), so
 * this is host-side handler evidence, not a child-escape proof; the isolation tier is a worker thread, not an OS
 * process; the env-scrub seams are wb-ksz.3's census. The host-accepted verb set (U1) is enumerated over a FINITE
 * corpus - every identifier-like word and short string literal in src/, the Object and Function prototype names,
 * a hand-authored hostile list, near-miss spellings and non-string method values - so a verb assembled at runtime
 * from fragments that appear nowhere in that corpus is outside the enumeration. The frame-type census (U1b) sees
 * replies and settlement only; a type handled silently is outside it. R8's kill is the registry's JSON boundary
 * (capability-registry.ts); the runtime's own node-output boundary is pinned nowhere here (F2: deferred groom
 * bundle, owner 07:16Z). Malformed non-call frames (e.g. a progress frame without iterable entries) are outside
 * this verb census: their listener hardening is the owner's wb-zin (landed 3c09587) with its own test file
 * (test/workflow-progress-frame-hardening.test.ts), so they are not rowed here.
 *
 * LANDED CURE (U2a): a malformed AGENT frame used to get no reply and escape the real host listener as an unhandled
 * TypeError rejection (gate F1); owner commit b5a37c4 (wb-3l9: isAgentCallPayload guard + MALFORMED_AGENT_RPC typed
 * refusal) cured it, so the measured-defect row is retired and the required-behaviour row is a plain it (verify-at-cut
 * flip, gate-measured 20/20 on the trunk merge; reverting b5a37c4's runtime.ts hunk reddens exactly that row). Host
 * rejections are collected by a test-scoped unhandledRejection listener that is always removed (vitest 4 defers to a
 * user listener while one is present).
 *
 * SCOPE EXCLUSION (U4b, named): the bead clause "refusal text routes through the shared sanitizers (two-pass order)"
 * is NOT met and NOT asserted. Row O1 records the measured truth: the unknown-verb refusal echoes the crafted method
 * raw. That reply is a worker-channel frame to the requesting child only (the worker drops replies to callIds it
 * never issued) and is neither a registered tool output nor a UI label - the reach of the program sanitizer
 * invariant - and making it true needs a src change this measurement-only slice cannot make.
 *
 * F3 READING (owner default, 07:16Z): docs/12 'Credential boundaries' binds host-held clients and tokens; a
 * provider's own plain-JSON output is data the script asked for, so a token-shaped string inside it crossing the
 * channel is recorded as an observation (row O2), not asserted as a violation.
 *
 * NAMES-ONLY failure output: crafted-frame replies are projected through shape() before any assertion (the reply
 * value is reduced to its type, free error text to a class), so a host that answered with a host value would be
 * named on the failure path, never printed.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { createServer, type Server } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { runWorkflow, type WorkflowHost, type WorkflowScriptRef, type WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import { resolveWorkflowSource } from "../src/workflow/saved.js";
import { WORKER_SOURCE } from "../src/workflow/worker-source.js";

type Frame = Record<string, unknown>;
type Spied = { emit(event: "message", frame: Frame): boolean; postMessage(message: unknown): void };

const spawned = vi.hoisted(() => ({ workers: [] as Spied[], sent: [] as Frame[] }));
vi.mock("node:worker_threads", async importOriginal => {
  const actual = await importOriginal<typeof import("node:worker_threads")>();
  class SpyWorker extends actual.Worker {
    constructor(...args: ConstructorParameters<typeof actual.Worker>) {
      super(...args);
      spawned.workers.push(this as unknown as Spied);
      const original = this.postMessage.bind(this);
      this.postMessage = ((message: unknown, ...rest: never[]) => {
        spawned.sent.push(message as Frame);
        return original(message, ...rest);
      }) as typeof this.postMessage;
    }
  }
  return { ...actual, Worker: SpyWorker };
});

const HEAD = 'export const meta={name:"rpc-census",description:"W19 slice 2"};\n';
const PROTECTED = "fixture.protected.read";
const REGISTERED = "fixture.registered.read";
const PARK = "park";
const MARKER = "sk-ant-api03-RPCCENSUSMARKER0123456789";
const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
const flush = async (): Promise<void> => { await new Promise(resolve => setTimeout(resolve, 40)); };

/** The registered RPC verbs: the only methods the host may answer. Everything else must draw the unknown-method refusal. */
const RPC_VERBS = ["agent", "node", "workflow"] as const;
/** The frame types the host listener handles; any other type must draw nothing. */
const FRAME_TYPES = ["call", "complete", "error", "progress"] as const;
const unknownMethodRefusal = (method: unknown): string => `Unknown workflow host method "${String(method)}".`;

interface Rig {
  readonly invoked: ReturnType<typeof vi.fn>;
  readonly callNode: ReturnType<typeof vi.fn>;
  readonly spawnAgent: ReturnType<typeof vi.fn<(request: WorkflowSpawnRequest) => Promise<{ ok: boolean; text: string }>>>;
  readonly loadWorkflow: ReturnType<typeof vi.fn<(ref: WorkflowScriptRef) => ReturnType<typeof resolveWorkflowSource>>>;
  readonly host: WorkflowHost;
  readonly release: () => void;
}
/**
 * A registry-backed host holding one granted and one ungranted capability; callNode is the REAL registry path and
 * loadWorkflow is the production resolver (mirrors claude-host.ts). Only the parking agent waits.
 */
function rig(grants: readonly string[]): Rig {
  const registry = new CapabilityRegistry();
  const invoked = vi.fn(async () => ({ ok: true }));
  registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] }, invoke: invoked });
  registry.register({ descriptor: { id: PROTECTED, version: "1.0.0", description: "ungranted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:admin"], supportedModes: ["invoke"] }, invoke: invoked });
  let release: () => void = () => {};
  const parked = new Promise<void>(resolve => { release = resolve; });
  const callNode = vi.fn(async (request: { capabilityId: string; input: unknown; signal: AbortSignal }) =>
    registry.invoke(request.capabilityId, request.input, { grants, signal: request.signal }));
  const spawnAgent = vi.fn(async (request: WorkflowSpawnRequest) => {
    if (request.prompt === PARK) await parked;
    return { ok: true, text: "" };
  });
  const loadWorkflow = vi.fn((ref: WorkflowScriptRef) => resolveWorkflowSource(ref, tmpdir()));
  const host: WorkflowHost = { spawnAgent, abortAgent: () => {}, callNode, loadWorkflow };
  return { invoked, callNode, spawnAgent, loadWorkflow, host, release };
}

interface Parked {
  readonly worker: Spied;
  /** Every host reply recorded so far, by callId. */
  readonly replies: () => Map<unknown, Frame>;
  readonly finish: () => Promise<Awaited<ReturnType<typeof runWorkflow>>>;
}
/** Start a script that parks on a real agent call and hand back the captured real Worker. */
async function park(rg: Rig): Promise<Parked> {
  spawned.workers.length = 0; spawned.sent.length = 0;
  const controller = new AbortController();
  const run = runWorkflow({ script: `${HEAD}return await agent("${PARK}");`, host: rg.host, signal: controller.signal });
  await flush();
  const worker = spawned.workers[0];
  expect(worker).toBeDefined();
  return {
    worker,
    replies: () => new Map(spawned.sent.filter(message => message.type === "response").map(message => [message.callId, message])),
    finish: async () => { controller.abort(); rg.release(); return await run; },
  };
}

/** Run a script that parks on a real agent call, inject raw frames on the host side, then abort. */
async function withCraftedFrames(rg: Rig, frames: readonly Frame[]): Promise<{ replies: Frame[]; settle: Awaited<ReturnType<typeof runWorkflow>> }> {
  const parked = await park(rg);
  for (const frame of frames) parked.worker.emit("message", frame);
  await flush();
  const replies = [...parked.replies().values()];
  return { replies, settle: await parked.finish() };
}

/** Collect host unhandled rejections while `body` runs; the listener is test-scoped and always removed. */
async function capturingRejections<T>(body: (rejections: readonly unknown[]) => Promise<T>): Promise<T> {
  const rejections: unknown[] = [];
  const collect = (reason: unknown): void => { rejections.push(reason); };
  process.on("unhandledRejection", collect);
  try {
    return await body(rejections);
  } finally {
    process.off("unhandledRejection", collect);
  }
}

interface Shape { readonly ok: unknown; readonly fatal: unknown; readonly error: string; readonly typed: string; readonly value: string }
/** Names-only projection of a host reply: protocol fields kept, the value reduced to its type, error text to a class. */
function shape(reply: Frame | undefined): Shape | "no reply" {
  if (reply === undefined) return "no reply";
  const error = reply.error;
  const diagnostic = reply.capabilityError as { name?: unknown; category?: unknown } | undefined;
  const flag = (value: unknown): unknown => value === undefined || typeof value === "boolean" ? value : `non-boolean ${typeof value}`;
  return {
    ok: flag(reply.ok),
    fatal: flag(reply.fatal),
    error: typeof error !== "string" ? "none"
      : /^Unknown workflow host method\b/.test(error) ? "unknown-method"
      : error === "Malformed workflow node RPC payload." ? "malformed-node"
      : "text",
    typed: diagnostic === undefined ? "untyped" : `${String(diagnostic.name)}:${String(diagnostic.category)}`,
    value: reply.value === undefined ? "none" : typeof reply.value,
  };
}

interface RejectionSignature { readonly name: string; readonly message: string; readonly innermost: string; readonly viaHandleAgent: boolean }
/** The measured signature of a host rejection: error class, message and the stack's function names (never values). */
function signature(reason: unknown): RejectionSignature | string {
  if (!(reason instanceof Error)) return `non-error ${typeof reason}`;
  const frames = (reason.stack ?? "").split("\n").slice(1).map(line => line.trim());
  return {
    name: reason.name,
    message: reason.message,
    innermost: /^at (\S+)/.exec(frames[0] ?? "")?.[1] ?? "",
    viaHandleAgent: frames.some(line => line.startsWith("at handleAgent ")),
  };
}

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) sourceFiles(full, out);
    else if (name.endsWith(".ts")) out.push(full);
  }
  return out;
}

/** Hand-authored for this census, independently of the runtime's dispatch: verbs a hostile script would try first. */
const HOSTILE_VERBS = [
  "exec", "execSync", "execFile", "spawn", "spawnSync", "fork", "shell", "sh", "bash", "cmd", "powershell", "run", "eval",
  "evaluate", "require", "import", "importModule", "env", "environ", "getenv", "setenv", "process", "child_process", "fs",
  "readFile", "writeFile", "readdir", "unlink", "rm", "mkdir", "open", "net", "http", "https", "fetch", "request", "socket",
  "connect", "listen", "dns", "secret", "secrets", "token", "tokens", "credential", "credentials", "apiKey", "auth",
  "authorize", "login", "client", "sdk", "provider", "grant", "grants", "permission", "permissions", "principal",
  "workspace", "scope", "admin", "root", "sudo", "debug", "inspect", "inspector", "config", "settings", "tool", "tools",
  "invoke", "capability", "capabilities", "registry", "mcp", "plugin", "load", "unload", "kill", "terminate", "exit",
  "abort", "shutdown", "ping", "echo", "help", "list", "status", "control", "reconcile", "resume", "replay", "journal",
  "gate", "pause", "stop", "cancel", "call", "response", "progress", "complete", "error", "message", "send", "post", "emit",
  "spawnAgent", "abortAgent", "resumeAgent", "callNode", "runGate", "loadWorkflow", "describeNodeEffect",
];
/** Spellings one normalisation away from a registered verb: an exact-match host refuses every one. */
const NEAR_MISSES = ["", " ", ...RPC_VERBS.flatMap(verb => [
  verb.toUpperCase(), `${verb[0].toUpperCase()}${verb.slice(1)}`, ` ${verb}`, `${verb} `, `${verb}\n`, `${verb}\u0000`,
  `\u200b${verb}`, `${verb}s`, verb.slice(0, -1), `${verb}.`, `${verb}()`, `host.${verb}`,
])];
/** Plain-JSON method values that are not strings, plus a frame with no method at all. */
const NON_STRING_METHODS: ReadonlyArray<readonly [string, Frame]> = [
  ["missing", {}], ["null", { method: null }], ["0", { method: 0 }], ["7", { method: 7 }], ["true", { method: true }],
  ["false", { method: false }], ["[]", { method: [] }], ['["agent"]', { method: ["agent"] }], ['["node","workflow"]', { method: ["node", "workflow"] }],
  ["{}", { method: {} }], ['{"method":"node"}', { method: { method: "node" } }],
];

/** Every identifier-like word and every short string literal in src/, the prototype names, the hostile list and near misses. */
function verbCorpus(): string[] {
  const corpus = new Set<string>([...RPC_VERBS, ...HOSTILE_VERBS, ...NEAR_MISSES, ...Object.getOwnPropertyNames(Object.prototype), ...Object.getOwnPropertyNames(Function.prototype)]);
  for (const file of sourceFiles(SRC)) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/[A-Za-z_$][\w$]*/g)) corpus.add(match[0]);
    for (const match of text.matchAll(/"([^"\\\n]{1,64})"|'([^'\\\n]{1,64})'|`([^`\\\n$]{1,64})`/g)) corpus.add(match[1] ?? match[2] ?? match[3] ?? "");
  }
  return [...corpus].sort();
}

interface HostSurface {
  readonly corpusSize: number;
  readonly hostileCovered: boolean;
  readonly accepted: string[];
  readonly nonFatalRefusals: string[];
  readonly acceptedNonStrings: string[];
  readonly answeredFrameTypes: string[];
  readonly registeredReplies: Record<string, Shape | "no reply">;
  readonly sentinelsRefused: boolean[];
  readonly rejections: number;
  readonly settled: string;
}
let surface: Promise<HostSurface> | undefined;
/**
 * U1: drive every corpus name through the REAL host listener as a crafted call verb, and every corpus name outside
 * FRAME_TYPES as a crafted frame type. A verb is ACCEPTED unless its reply is exactly the unknown-method refusal;
 * sentinels at both ends prove the listener stayed live and the run stayed unsettled throughout.
 */
function hostSurface(): Promise<HostSurface> {
  surface ??= capturingRejections(async rejections => {
    const corpus = verbCorpus();
    const rg = rig(["fixture:read"]);
    const parked = await park(rg);
    const payload = { prompt: "census" };
    let callId = 100_000;
    const verbIds = new Map<number, string>();
    const nonStringIds = new Map<number, string>();
    const typeIds = new Map<number, string>();
    const sentinelIds: number[] = [];
    const sentinel = (): void => {
      callId++; sentinelIds.push(callId);
      parked.worker.emit("message", { type: "call", callId, method: `census-sentinel-${callId}-not-a-verb`, payload });
    };
    sentinel();
    for (const verb of corpus) {
      callId++; verbIds.set(callId, verb);
      parked.worker.emit("message", { type: "call", callId, method: verb, payload });
    }
    for (const [label, method] of NON_STRING_METHODS) {
      callId++; nonStringIds.set(callId, label);
      parked.worker.emit("message", { type: "call", callId, ...method, payload });
    }
    for (const type of corpus) {
      if ((FRAME_TYPES as readonly string[]).includes(type)) continue;
      callId++; typeIds.set(callId, type);
      parked.worker.emit("message", { type, callId, method: "node", payload });
    }
    sentinel();
    await flush();
    const replies = parked.replies();
    const settle = await parked.finish();
    // Refused = the unknown-method refusal CLASS (wording-independent, so a sanitising reword reddens O1, not this census).
    const refused = (id: number): boolean => {
      const projected = shape(replies.get(id));
      return projected !== "no reply" && projected.ok === false && projected.error === "unknown-method";
    };
    return {
      corpusSize: corpus.length,
      hostileCovered: HOSTILE_VERBS.every(verb => corpus.includes(verb)),
      accepted: [...verbIds].filter(([id]) => !refused(id)).map(([, verb]) => verb).sort(),
      nonFatalRefusals: [...verbIds].filter(([id]) => refused(id) && replies.get(id)?.fatal !== true).map(([, verb]) => verb).sort(),
      acceptedNonStrings: [...nonStringIds].filter(([id]) => !refused(id)).map(([, label]) => label),
      answeredFrameTypes: [...typeIds].filter(([id]) => replies.has(id)).map(([, type]) => type).sort(),
      registeredReplies: Object.fromEntries(RPC_VERBS.map(verb => [verb, shape(replies.get([...verbIds].find(([, name]) => name === verb)?.[0]))])),
      sentinelsRefused: sentinelIds.map(id => refused(id)),
      rejections: rejections.length,
      settled: settle.status,
    };
  });
  return surface;
}

/**
 * A minimal worker program authored HERE in the real worker's emission shape (one port binding, callHost relaying
 * through a nested executor, port.on, a completion frame), so the scanner falsifiers in R1f never depend on src text.
 */
const FIXTURE_WORKER = [
  '"use strict";',
  'const { parentPort, workerData } = require("node:worker_threads");',
  "const port = parentPort;",
  "let nextCallId = 1;",
  "function callHost(method, payload) {",
  "  return new Promise(function (resolve, reject) {",
  "    const callId = nextCallId++;",
  '    port.postMessage({ type: "call", callId: callId, method: method, payload: payload });',
  "  });",
  "}",
  'port.on("message", function (message) { return message; });',
  'async function main() { await callHost("agent", workerData); port.postMessage({ type: "complete", resultJson: undefined }); }',
  "main();",
].join("\n");
interface WorkerSurface { readonly verbs: string[]; readonly frameTypes: string[]; readonly findings: string[] }
/** Names that would run generated code in the worker's own realm or open another channel; the worker's vm strings run in the sandbox context instead. */
const WORKER_REALM_DYNAMIC = ["eval", "Function", "runInThisContext", "compileFunction", "Worker", "MessageChannel", "BroadcastChannel"];
/**
 * Parse-aware census of every path by which a worker program can put a frame on its port. Comments are trivia and
 * never read; any emission whose verb or frame shape does not resolve statically is a FINDING (fail closed).
 */
function workerSurface(source: string): WorkerSurface {
  const file = ts.createSourceFile("worker-source.js", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const verbs = new Set<string>();
  const frameTypes = new Set<string>();
  const findings: string[] = [];
  const shown = (node: ts.Node): string => node.getText(file).replace(/\s+/g, " ").slice(0, 70);
  const literal = (node: ts.Node | undefined): string | undefined =>
    node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
  const bindings = new Map<string, ts.Node[]>();
  const bind = (name: ts.Node, at: ts.Node): void => {
    if (ts.isIdentifier(name)) bindings.set(name.text, [...(bindings.get(name.text) ?? []), at]);
  };
  const gather = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node)) bind(node.name, node);
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) bind(node.name, node);
    ts.forEachChild(node, gather);
  };
  gather(file);
  /** A verb argument: a string literal, or an identifier bound exactly once, by a const declaration of a literal. */
  const resolveVerb = (node: ts.Node | undefined): string | undefined => {
    const direct = literal(node);
    if (direct !== undefined || node === undefined || !ts.isIdentifier(node)) return direct;
    const only = bindings.get(node.text)?.length === 1 ? bindings.get(node.text)?.[0] : undefined;
    if (only === undefined || !ts.isVariableDeclaration(only) || !ts.isVariableDeclarationList(only.parent)) return undefined;
    return (only.parent.flags & ts.NodeFlags.Const) !== 0 ? literal(only.initializer) : undefined;
  };
  const isPropertyName = (node: ts.Identifier): boolean => {
    const parent = node.parent;
    return (ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isPropertyAssignment(parent) && parent.name === node) ||
      (ts.isBindingElement(parent) && parent.propertyName === node) || (ts.isMethodDeclaration(parent) && parent.name === node);
  };
  /** True when `name` here is callHost's own first parameter: the one relay site, with no closer binding shadowing it. */
  const isCallHostParameter = (name: ts.Identifier): boolean => {
    for (let current = name.parent; current !== undefined; current = current.parent) {
      if (!ts.isFunctionLike(current)) continue;
      const own = current.parameters.some(parameter => ts.isIdentifier(parameter.name) && parameter.name.text === name.text);
      if (ts.isFunctionDeclaration(current) && current.name?.text === "callHost") {
        const first = current.parameters[0]?.name;
        return first !== undefined && ts.isIdentifier(first) && first.text === name.text;
      }
      if (own) return false;
    }
    return false;
  };
  const isWorkerThreadsRequire = (node: ts.Node | undefined): boolean =>
    node !== undefined && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require" &&
    literal(node.arguments[0]) === "node:worker_threads";
  let callHostDeclarations = 0;
  let workerThreadsRequires = 0;
  const frame = (call: ts.CallExpression): void => {
    const object = call.arguments[0];
    if (call.arguments.length !== 1 || object === undefined || !ts.isObjectLiteralExpression(object)) {
      findings.push(`frame is not one object literal: ${shown(call)}`);
      return;
    }
    const fields = new Map<string, ts.Expression>();
    for (const property of object.properties) {
      if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) fields.set(property.name.text, property.initializer);
      else if (ts.isShorthandPropertyAssignment(property)) fields.set(property.name.text, property.name);
      else findings.push(`frame member not statically named: ${shown(property)}`);
    }
    const type = literal(fields.get("type"));
    if (type === undefined) {
      findings.push(`frame type unresolved: ${shown(call)}`);
      return;
    }
    frameTypes.add(type);
    if (type !== "call") return;
    const method = fields.get("method");
    if (method !== undefined && ts.isIdentifier(method) && isCallHostParameter(method)) return;
    const verb = literal(method);
    if (verb === undefined) findings.push(`raw call frame verb unresolved: ${shown(call)}`);
    else verbs.add(verb);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && !isPropertyName(node)) {
      const parent = node.parent;
      if (node.text === "callHost") {
        if (ts.isFunctionDeclaration(parent) && parent.name === node) callHostDeclarations++;
        else if (ts.isCallExpression(parent) && parent.expression === node) {
          const verb = resolveVerb(parent.arguments[0]);
          if (verb === undefined) findings.push(`unresolvable callHost verb: ${shown(parent)}`);
          else verbs.add(verb);
        } else findings.push(`callHost used as a value: ${shown(parent)}`);
      } else if (node.text === "port") {
        const declared = ts.isVariableDeclaration(parent) && parent.name === node && parent.initializer !== undefined &&
          ts.isIdentifier(parent.initializer) && parent.initializer.text === "parentPort";
        const called = ts.isPropertyAccessExpression(parent) && parent.expression === node && (parent.name.text === "postMessage" || parent.name.text === "on") &&
          ts.isCallExpression(parent.parent) && parent.parent.expression === parent;
        if (!declared && !called) findings.push(`port used outside port.postMessage()/port.on(): ${shown(parent)}`);
      } else if (node.text === "parentPort") {
        const destructured = ts.isBindingElement(parent) && parent.name === node && ts.isObjectBindingPattern(parent.parent) &&
          ts.isVariableDeclaration(parent.parent.parent) && isWorkerThreadsRequire(parent.parent.parent.initializer);
        const aliased = ts.isVariableDeclaration(parent) && parent.initializer === node && ts.isIdentifier(parent.name) && parent.name.text === "port";
        if (!destructured && !aliased) findings.push(`parentPort reached outside its one binding: ${shown(parent)}`);
      } else if (node.text === "require") {
        if (!ts.isCallExpression(parent) || parent.expression !== node || parent.arguments.length !== 1 || literal(parent.arguments[0]) === undefined) {
          findings.push(`require used dynamically: ${shown(parent)}`);
        } else if (isWorkerThreadsRequire(parent)) workerThreadsRequires++;
      } else if (node.text === "postMessage") {
        findings.push(`postMessage referenced as a free name: ${shown(parent)}`);
      }
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "postMessage") {
      const call = node.parent;
      if (!ts.isIdentifier(node.expression) || node.expression.text !== "port" || !ts.isCallExpression(call) || call.expression !== node) {
        findings.push(`postMessage outside port.postMessage(...): ${shown(call)}`);
      } else frame(call);
    }
    const named = literal(node);
    if (named === "postMessage" || named === "parentPort" || named === "callHost") findings.push(`string-named port access: ${shown(node.parent)}`);
    // Code generated in the worker's OWN realm (or a second channel) would hide an emission from any static reading.
    if (ts.isIdentifier(node) && WORKER_REALM_DYNAMIC.includes(node.text)) findings.push(`dynamic code or extra channel in the worker realm: ${shown(node.parent)}`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  if (callHostDeclarations !== 1) findings.push(`callHost declared ${callHostDeclarations} times`);
  if (workerThreadsRequires !== 1) findings.push(`node:worker_threads required ${workerThreadsRequires} times`);
  return { verbs: [...verbs].sort(), frameTypes: [...frameTypes].sort(), findings };
}

describe("W19 slice 2 harness: the recording Worker is call-through (marker class named in the header)", () => {
  it("H1 a real worker thread runs the script, and each host reply is recorded AND still delivered to it", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ answer: 21 }) });
    spawned.workers.length = 0; spawned.sent.length = 0;
    const liveThreadIds: number[] = [];
    const result = await runWorkflow({
      script: `${HEAD}const first = await node("${REGISTERED}", {}); const second = await node("${REGISTERED}", {}); return first.answer + second.answer;`,
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => {
          liveThreadIds.push((spawned.workers[0] as unknown as { threadId: number }).threadId);
          return registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal });
        } },
    });
    expect(result).toMatchObject({ status: "completed", value: 42 });
    expect(spawned.workers).toHaveLength(1);
    expect(liveThreadIds).toHaveLength(2);
    expect(liveThreadIds.every(id => id > 0)).toBe(true);
    expect(spawned.sent.filter(message => message.type === "response").map(message => message.callId)).toEqual([1, 2]);
  });
});

describe("W19 slice 2: the host-accepted RPC surface, enumerated behaviourally through the real listener (U1)", () => {
  it("U1a the host accepts exactly agent, node and workflow over an independently authored verb corpus; red names any extra verb", async () => {
    const measured = await hostSurface();
    const extra = measured.accepted.filter(verb => !(RPC_VERBS as readonly string[]).includes(verb));
    expect(measured.corpusSize).toBeGreaterThan(5000);
    expect(measured.hostileCovered).toBe(true);
    expect({
      extraVerbs: extra.slice(0, 25), extraCount: extra.length,
      missingVerbs: RPC_VERBS.filter(verb => !measured.accepted.includes(verb)),
      nonFatalRefusals: measured.nonFatalRefusals.slice(0, 25), acceptedNonStrings: measured.acceptedNonStrings,
      sentinelsRefused: measured.sentinelsRefused, rejections: measured.rejections, settled: measured.settled,
    }).toEqual({
      extraVerbs: [], extraCount: 0, missingVerbs: [], nonFatalRefusals: [], acceptedNonStrings: [],
      sentinelsRefused: [true, true], rejections: 0, settled: "killed",
    });
    expect(measured.registeredReplies).toEqual({
      agent: { ok: true, fatal: undefined, error: "none", typed: "untyped", value: "string" },
      node: { ok: false, fatal: true, error: "malformed-node", typed: "CapabilityError:validation", value: "none" },
      workflow: { ok: false, fatal: undefined, error: "text", typed: "untyped", value: "none" },
    });
  });

  it("U1b no frame type outside call, complete, error and progress draws a reply or settles the run", async () => {
    const measured = await hostSurface();
    expect({ answeredFrameTypes: measured.answeredFrameTypes.slice(0, 25), sentinelsRefused: measured.sentinelsRefused, settled: measured.settled })
      .toEqual({ answeredFrameTypes: [], sentinelsRefused: [true, true], settled: "killed" });
  });

  it("R1 the worker's emission sites, read parse-aware from WORKER_SOURCE, cite exactly the host-accepted verbs and every path resolves statically", async () => {
    expect(ts.transpileModule(WORKER_SOURCE, { fileName: "worker-source.js", reportDiagnostics: true, compilerOptions: { allowJs: true } }).diagnostics ?? []).toEqual([]);
    const worker = workerSurface(WORKER_SOURCE);
    const host = (await hostSurface()).accepted;
    expect({
      findings: worker.findings, frameTypes: worker.frameTypes, verbs: worker.verbs,
      workerOnly: worker.verbs.filter(verb => !host.includes(verb)), hostOnly: host.filter(verb => !worker.verbs.includes(verb)),
    }).toEqual({ findings: [], frameTypes: [...FRAME_TYPES], verbs: [...RPC_VERBS], workerOnly: [], hostOnly: [] });
  });

  it("R1f the worker-surface scanner names each emission shape it must catch and never reads a comment (over its own fixture, never src text)", () => {
    const base = workerSurface(FIXTURE_WORKER);
    expect(base).toEqual({ verbs: ["agent"], frameTypes: ["call", "complete"], findings: [] });
    const scan = (snippet: string): WorkerSurface => workerSurface(`${FIXTURE_WORKER}\n${snippet}\n`);
    const plusShell = { ...base, verbs: ["agent", "shell"] };
    expect(scan("function extraVerb() { return callHost('shell', {}); }")).toEqual(plusShell);
    expect(scan('function rawFrame() { port.postMessage({ type: "call", callId: nextCallId++, method: "shell", payload: {} }); }')).toEqual(plusShell);
    expect(scan('const SHELL_VERB = "shell";\nfunction viaConst() { return callHost(SHELL_VERB, {}); }')).toEqual(plusShell);
    expect(scan('function extraType() { port.postMessage({ type: "env" }); }')).toEqual({ ...base, frameTypes: ["call", "complete", "env"] });
    expect(scan('let shellVerb = "shell";\nfunction viaLet() { return callHost(shellVerb, {}); }').findings).toEqual(["unresolvable callHost verb: callHost(shellVerb, {})"]);
    expect(scan('function built() { return callHost("sh" + "ell", {}); }').findings).toEqual(['unresolvable callHost verb: callHost("sh" + "ell", {})']);
    expect(scan("const relay = callHost;").findings).toEqual(["callHost used as a value: relay = callHost"]);
    expect(scan('const leaked = port;\nleaked.postMessage({ type: "call", method: "shell" });').findings).toEqual([
      "port used outside port.postMessage()/port.on(): leaked = port",
      'postMessage outside port.postMessage(...): leaked.postMessage({ type: "call", method: "shell" })',
    ]);
    expect(scan('require("node:worker_threads").parentPort.postMessage({ type: "call", method: "shell" });').findings).toEqual([
      expect.stringMatching(/^postMessage outside port\.postMessage\(\.\.\.\): require\("node:worker_threads"\)\.parentPort\.postMessage\(/),
      "node:worker_threads required 2 times",
    ]);
    expect(scan('port["postMessage"]({ type: "call", method: "shell" });').findings).toEqual([
      'port used outside port.postMessage()/port.on(): port["postMessage"]',
      'string-named port access: port["postMessage"]',
    ]);
    expect(scan("function hidden() { return eval(\"callHost('shell', {})\"); }").findings).toEqual([
      "dynamic code or extra channel in the worker realm: eval(\"callHost('shell', {})\")",
    ]);
    expect(scan('// callHost("exec", {})\n/* port.postMessage({ type: "call", method: "exec" }) */')).toEqual(base);
  });

  it("R2 a crafted frame for an unregistered verb is refused host-side with a fatal UNTYPED refusal (no capabilityError, measured) and no handler runs", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9001, method: "exec", payload: { command: "id" } },
      { type: "call", callId: 9002, method: "constructor", payload: {} },
      { type: "call", callId: 9003, method: "__proto__", payload: {} },
    ]);
    for (const id of [9001, 9002, 9003]) {
      expect(shape(replies.find(reply => reply.callId === id))).toEqual({ ok: false, fatal: true, error: "unknown-method", typed: "untyped", value: "none" });
    }
    expect(rg.callNode).not.toHaveBeenCalled();
    expect(rg.invoked).not.toHaveBeenCalled();
    expect(rg.spawnAgent.mock.calls.map(([request]) => request.prompt)).toEqual([PARK]);
    expect(rg.loadWorkflow).not.toHaveBeenCalled();
  });

  it("R3 a crafted node RPC for an unregistered capability is refused by the real registry and no provider runs", async () => {
    const rg = rig(["fixture:read", "fixture:admin"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9101, method: "node", payload: { capabilityId: "fixture.not.registered", label: "x", input: {} } },
    ]);
    expect(shape(replies.find(reply => reply.callId === 9101))).toMatchObject({ ok: false, typed: "CapabilityError:unavailable" });
    expect(rg.invoked).not.toHaveBeenCalled();
  });

  it("R4 a crafted node RPC for a registered but UNGRANTED capability is denied host-side (policy after RPC, not tool-name hiding)", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9201, method: "node", payload: { capabilityId: PROTECTED, label: "x", input: {} } },
    ]);
    expect(shape(replies.find(reply => reply.callId === 9201))).toMatchObject({ ok: false, typed: "CapabilityError:authorization" });
    expect(rg.invoked).not.toHaveBeenCalled();
  });

  it("R5 a crafted payload cannot carry its own grants or principal: the host passes only its own grant set", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9301, method: "node", payload: { capabilityId: PROTECTED, label: "x", input: {}, grants: ["fixture:admin"], principal: { id: "root" }, workspace: "/", scope: "admin" } },
    ]);
    expect(shape(replies.find(reply => reply.callId === 9301))).toMatchObject({ ok: false, typed: "CapabilityError:authorization" });
    expect(rg.invoked).not.toHaveBeenCalled();
    for (const [request] of rg.callNode.mock.calls) {
      expect(Object.keys(request as object)).not.toEqual(expect.arrayContaining(["grants"]));
      expect(JSON.stringify(request)).not.toContain("root");
    }
  });

  it("R6 unknown or malformed permission data denies: a host with a non-array grant set cannot invoke", async () => {
    const registry = new CapabilityRegistry();
    const invoked = vi.fn(async () => ({ ok: true }));
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] }, invoke: invoked });
    for (const grants of [undefined, null, "fixture:read", { 0: "fixture:read" }, [42], [["fixture:read"]], ["FIXTURE:READ"]]) {
      await expect(registry.invoke(REGISTERED, {}, { grants: grants as never, signal: new AbortController().signal })).rejects.toMatchObject({ category: "authorization" });
    }
    expect(invoked).not.toHaveBeenCalled();
  });

  it("R7 malformed node frames are refused with a typed validation refusal before any host capability call", async () => {
    const rg = rig(["fixture:read"]);
    const { replies } = await withCraftedFrames(rg, [
      { type: "call", callId: 9401, method: "node", payload: null },
      { type: "call", callId: 9402, method: "node", payload: { capabilityId: 7, label: "x", input: {} } },
      { type: "call", callId: 9403, method: "node", payload: { capabilityId: "A.B", label: "x", input: {} } },
      { type: "call", callId: 9404, method: "node", payload: { capabilityId: REGISTERED, label: "x".repeat(201), input: {} } },
    ]);
    for (const id of [9401, 9402, 9403, 9404]) {
      expect(shape(replies.find(reply => reply.callId === id))).toMatchObject({ ok: false, fatal: true, typed: "CapabilityError:validation" });
    }
    expect(rg.callNode).not.toHaveBeenCalled();
  });

  it("R8 a provider output carrying a client-like function is refused at the JSON boundary and nothing of it crosses the worker channel", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ answer: 42, client: { send: () => "host-socket" } }) as never });
    spawned.sent.length = 0;
    const result = await runWorkflow({
      script: HEAD + 'return await node("fixture.registered.read", {});',
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal }) },
    });
    expect(result).toMatchObject({ status: "failed", capabilityError: { name: "CapabilityError", category: "validation" } });
    const wire = JSON.stringify(spawned.sent.filter(message => message.type === "response"));
    expect(wire).not.toContain("host-socket");
    expect(wire).not.toContain("send");
  });

  it("R9 a granted plain-JSON reply crosses the channel intact and carries no host-only member", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ answer: 42 }) });
    spawned.sent.length = 0;
    const result = await runWorkflow({
      script: HEAD + 'return await node("fixture.registered.read", {});',
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal }) },
    });
    expect(result).toMatchObject({ status: "completed", value: { answer: 42 } });
    const responses = spawned.sent.filter(message => message.type === "response");
    expect(responses).toHaveLength(1);
    expect(Object.keys(responses[0]).sort()).toEqual(["callId", "capabilityError", "error", "fatal", "ok", "spent", "type", "value"].filter(key => key in responses[0]).sort());
    expect(JSON.parse(JSON.stringify(responses[0]))).toEqual(expect.objectContaining({ ok: true, value: { answer: 42 } }));
  });
});

/** Plain-JSON payloads no well-formed worker sends: one table for every exposed verb. */
const MALFORMED: ReadonlyArray<readonly [string, unknown]> = [
  ["null", null], ["number", 7], ["string", "x"], ["array", []], ["empty object", {}], ["non-string prompt", { prompt: 42 }],
];
/** Inject each malformed agent frame on its own and record its reply shape and the host rejections it raised. */
async function malformedAgentFrames(rg: Rig): Promise<Array<{ label: string; reply: Shape | "no reply"; rejections: Array<RejectionSignature | string> }>> {
  return await capturingRejections(async rejections => {
    const parked = await park(rg);
    const rows: Array<{ label: string; reply: Shape | "no reply"; rejections: Array<RejectionSignature | string> }> = [];
    for (const [index, [label, payload]] of MALFORMED.entries()) {
      const callId = 9800 + index;
      const before = rejections.length;
      parked.worker.emit("message", { type: "call", callId, method: "agent", payload });
      await flush();
      rows.push({ label, reply: shape(parked.replies().get(callId)), rejections: rejections.slice(before).map(signature) });
    }
    await parked.finish();
    return rows;
  });
}

describe("W19 slice 2: malformed frames on every exposed verb (U2)", () => {
  it("U2n every malformed node frame gets a fatal typed validation refusal and no host capability call", async () => {
    const rg = rig(["fixture:read"]);
    const outcome = await capturingRejections(async rejections => {
      const { replies } = await withCraftedFrames(rg, MALFORMED.map(([, payload], index) => ({ type: "call", callId: 9500 + index, method: "node", payload })));
      return { shapes: MALFORMED.map((_, index) => shape(replies.find(reply => reply.callId === 9500 + index))), rejections: rejections.length };
    });
    expect(outcome).toEqual({
      shapes: MALFORMED.map(() => ({ ok: false, fatal: true, error: "malformed-node", typed: "CapabilityError:validation", value: "none" })),
      rejections: 0,
    });
    expect(rg.callNode).not.toHaveBeenCalled();
  });

  it("U2w malformed workflow frames are refused without a host fault; measured (observation): untyped, non-fatal, and each raw payload reaches host.loadWorkflow unvalidated", async () => {
    const rg = rig(["fixture:read"]);
    const outcome = await capturingRejections(async rejections => {
      const { replies } = await withCraftedFrames(rg, MALFORMED.map(([, payload], index) => ({ type: "call", callId: 9600 + index, method: "workflow", payload })));
      return {
        shapes: MALFORMED.map((_, index) => shape(replies.find(reply => reply.callId === 9600 + index))),
        loaderSaw: rg.loadWorkflow.mock.calls.map(([ref]) => ref),
        rejections: rejections.length,
      };
    });
    expect(outcome).toEqual({
      shapes: MALFORMED.map(() => ({ ok: false, fatal: undefined, error: "text", typed: "untyped", value: "none" })),
      loaderSaw: MALFORMED.map(([, payload]) => payload),
      rejections: 0,
    });
  });

  it("U2a each malformed agent frame must get a fatal typed validation refusal, spawn nothing and raise no host rejection", async () => {
    const rg = rig(["fixture:read"]);
    const rows = await malformedAgentFrames(rg);
    expect(rows).toEqual(MALFORMED.map(([label]) => ({
      label, reply: { ok: false, fatal: true, error: "text", typed: "CapabilityError:validation", value: "none" }, rejections: [],
    })));
    expect(rg.spawnAgent.mock.calls.map(([request]) => request.prompt)).toEqual([PARK]);
  });
});

describe("W19 slice 2: the census input tables are non-empty (R2 E1-E4; an emptied table leaves every row above vacuously green)", () => {
  it("E1 the malformed-payload table holds the six named payload classes", () => {
    expect(MALFORMED.map(([label]) => label)).toEqual(["null", "number", "string", "array", "empty object", "non-string prompt"]);
  });

  it("E2 the non-string method table holds all eleven named method shapes", () => {
    expect(NON_STRING_METHODS.map(([label]) => label)).toEqual(["missing", "null", "0", "7", "true", "false", "[]", '["agent"]', '["node","workflow"]', "{}", '{"method":"node"}']);
  });

  it("E3 the hostile verb list is non-empty, duplicate-free and holds no registered verb", () => {
    expect(HOSTILE_VERBS.length).toBeGreaterThan(100);
    expect(new Set(HOSTILE_VERBS).size).toBe(HOSTILE_VERBS.length);
    expect(HOSTILE_VERBS.filter(verb => (RPC_VERBS as readonly string[]).includes(verb))).toEqual([]);
  });

  it("E4 the near-miss table holds the two blanks plus twelve spellings of each registered verb", () => {
    expect(NEAR_MISSES).toHaveLength(2 + RPC_VERBS.length * 12);
    expect(NEAR_MISSES.filter(spelling => (RPC_VERBS as readonly string[]).includes(spelling))).toEqual([]);
  });
});

describe("W19 slice 2: record-honesty observations (U4b scope exclusion, F3 reading)", () => {
  it("O1 the unknown-verb refusal echoes a crafted method RAW (ESC, U+202E, a planted token-shaped marker) to the requesting child only; the run result carries none of it", async () => {
    const rg = rig(["fixture:read"]);
    const crafted = `census\u001b[31m\u202eevil ${MARKER}`;
    const { replies, settle } = await withCraftedFrames(rg, [{ type: "call", callId: 9701, method: crafted, payload: {} }]);
    const error = replies.find(reply => reply.callId === 9701)?.error;
    const echoed = typeof error === "string" ? error : "";
    expect({ exact: echoed === unknownMethodRefusal(crafted), esc: echoed.includes("\u001b"), rlo: echoed.includes("\u202e"), marker: echoed.includes(MARKER) })
      .toEqual({ exact: true, esc: true, rlo: true, marker: true });
    const result = JSON.stringify(settle);
    expect({ status: settle.status, esc: result.includes("\\u001b"), rlo: result.includes("\u202e"), marker: result.includes(MARKER) })
      .toEqual({ status: "killed", esc: false, rlo: false, marker: false });
  });

  it("O2 a provider's plain-JSON output carrying a planted token-shaped string crosses the worker channel and lands in the run result unmodified", async () => {
    const registry = new CapabilityRegistry();
    registry.register({ descriptor: { id: REGISTERED, version: "1.0.0", description: "granted", inputSchema: { type: "object" }, effectClass: "read", permissions: ["fixture:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ note: MARKER }) });
    spawned.sent.length = 0;
    const result = await runWorkflow({
      script: `${HEAD}return await node("${REGISTERED}", {});`,
      host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {},
        callNode: request => registry.invoke(request.capabilityId, request.input, { grants: ["fixture:read"], signal: request.signal }) },
    });
    const wire = JSON.stringify(spawned.sent.filter(message => message.type === "response"));
    expect({ status: result.status, onWire: wire.includes(MARKER), inResult: JSON.stringify(result.value).includes(MARKER) })
      .toEqual({ status: "completed", onWire: true, inResult: true });
  });
});

describe("W19 slice 2: probes from the child position (recorded honestly, never a fabricated green)", () => {
  it("P1 a dynamic import from the script position is refused with ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING, for the SDK and for cwd-independent builtins", async () => {
    const host: WorkflowHost = { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {}, callNode: async () => ({ ok: true }) };
    const specifiers = ["@anthropic-ai/claude-agent-sdk", "node:child_process", "node:fs", "node:worker_threads"];
    const outcomes: Array<{ specifier: string; status: string; value: unknown }> = [];
    for (const specifier of specifiers) {
      const result = await runWorkflow({ script: `${HEAD}try { const imported = await import(${JSON.stringify(specifier)}); return {imported: Object.keys(imported).length}; } catch (error) { return {name: error.name, code: error.code}; }`, host });
      outcomes.push({ specifier, status: result.status, value: result.value });
    }
    expect(outcomes).toEqual(specifiers.map(specifier => ({ specifier, status: "completed", value: { name: "TypeError", code: "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING" } })));
  });

  it("P2 the script position has no network primitive and a loopback listener sees no connection attempt", async () => {
    let connections = 0;
    const server: Server = createServer(socket => { connections++; socket.destroy(); });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    try {
      const host: WorkflowHost = { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {}, callNode: async () => ({ ok: true }) };
      const result = await runWorkflow({ script: HEAD + `
        const present = {};
        try { present.fetch = typeof fetch; } catch (error) { present.fetch = error.name; }
        try { present.WebSocket = typeof WebSocket; } catch (error) { present.WebSocket = error.name; }
        try { present.XMLHttpRequest = typeof XMLHttpRequest; } catch (error) { present.XMLHttpRequest = error.name; }
        try { present.require = typeof require; } catch (error) { present.require = error.name; }
        try { present.process = typeof process; } catch (error) { present.process = error.name; }
        try { await fetch("http://127.0.0.1:${port}/"); present.reached = true; } catch (error) { present.fetchError = error.name; }
        return present;`, host });
      await flush();
      expect(result.status).toBe("completed");
      const seen = result.value as Record<string, unknown>;
      for (const name of ["fetch", "WebSocket", "XMLHttpRequest", "require", "process"]) expect(seen[name]).toBe("undefined");
      expect(seen.reached).toBeUndefined();
      expect(connections).toBe(0);
    } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
  });
});
