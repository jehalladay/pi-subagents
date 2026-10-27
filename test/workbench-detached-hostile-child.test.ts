/**
 * wb-ksz (W19/WB-022) slice 3 of 4: the docs/12 hostile cases against the REAL child.
 *
 * Owner boundary of record (wb-ksz, 2026-10-15 16:19Z): "OS PROCESS isolation, never node:vm - scrubbed-env child
 * (credential vars absent by allowlist), RPC channel exposing only the registered grant-gated tool surface,
 * credentials host-only, disposable child cwd", in four falsifier slices: (1) env-scrub census, (2) RPC surface
 * census, (3) docs/12 hostile cases against the REAL child, (4) child crash never takes the host. Slices 1, 2 and 4
 * landed (test/workbench-env-scrub-census.test.ts, test/workbench-sandbox-rpc-census.test.ts,
 * test/workbench-child-crash-faults.test.ts) and wb-ksz.8 landed the allowlist seams. Slice 2 names its own limit:
 * its frames are injected on the host side of an in-process worker thread, "not a child-escape proof; the isolation
 * tier is a worker thread, not an OS process". This suite runs the hostile scripts inside the process of record.
 * Every row launches the real detached host child: a separate OS process, spawned with scrubbedEnvironment, running
 * the compiled dist interpreter. Each row reads only what crosses that process boundary: the child's inspect
 * snapshot, the child's own socket replies, the kernel's view of the child's environment (/proc/<pid>/environ,
 * names only) and the marker files the provider fixture writes BESIDE the workspace (one per provider call).
 *
 * Quoted spec (docs/workbench/12-security.md):
 *   'Security acceptance tests': "Host-side deny even when script crafts raw RPC"; "JS VM escape attempt must not
 *     yield privileged provider client in declared isolation mode"; "unknown/expired grant refused"; "observer-only
 *     stop refused"; "cross-workspace ref returns authorization failure"; "secret env not displayed"; "schema
 *     pollution payload refused".
 *   'Credential boundaries': "redact tokens from logs, UI, recordings and failure messages."
 *
 * NOT EXERCISED here, by name: "ANSI escape output sanitized" (stripping belongs to the display path: the child's
 * snapshot redacts and does not strip, and the Pi tool display that strips is pinned in-process by
 * test/workbench-security-pi-tools.test.ts); "isolated agent cannot see host tools not explicitly granted" (a Claude
 * backend case that needs the live SDK; the deterministic child runs no agent, and agent() resolves null in row H2);
 * an EXPIRED grant (a detached invocation's grants are fixed at launch and carry no expiry, so only the unknown half
 * applies to this child). No claim of hostile-JavaScript isolation follows from these rows (docs/12 'Current
 * diagnostic protections').
 *
 * Test-only: no src, docs/12 or allowlist edit. Input hygiene only (W19 user rule): the env canary is a plain marker
 * value chosen so redaction could not mask a leak of it (instrument row), and the credential-shaped placeholder is
 * obviously fake and assembled at run time, so no scanner-shaped literal sits in this source. Display paths added:
 * none. No skip path: a child that cannot be launched, or a reading that never settles, fails its row.
 */
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { createConnection } from "node:net";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { faultProviderSource } from "../qa/workbench/local-detached-faults-receipt.mjs";
import { DetachedFrameDecoder, type DetachedLaunchRequest, type DetachedReceipt, type DetachedSnapshot, detachedFrame } from "../src/workbench/hosts/local-detached.js";
import { redactWorkbenchText } from "../src/workbench/redaction.js";
import { connectDetachedMarked, HOST_HOOK_TIMEOUT_MS, launchDetachedMarked, pollFor, reportAfterCleanup } from "./helpers/detached-timing.js";
import { chooseScratchBase, scratchBaseBudget } from "./helpers/fixture-roots.js";
import { installScratchLeakGuard, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const uid = process.getuid?.() ?? 0;
const NO_RUN_USER = "/nonexistent-run-user";
/** Everything past the base the socket path carries: <base>/wb-ksz-<12 hex>/s/pw-<uid>-XXXXXX/<16 hex>.sock. */
const SOCKET_LAYOUT = `/wb-ksz-${"0".repeat(12)}/s/pw-${uid}-XXXXXX/${"0".repeat(16)}.sock`;
/** The fixture-roots rule (owner wb-0kg.4 F5): XDG_RUNTIME_DIR first, /tmp only as the recorded fallback, never TMPDIR. */
const SCRATCH_BASE = chooseScratchBase(process.env, scratchBaseBudget(SOCKET_LAYOUT));
const CAPABILITY = "local.effect";
const GRANT = "fixture:effect";
const ALL_PERMISSIONS: DetachedLaunchRequest["permissions"] = ["inspect", "execute", "cancel", "shutdown"];
/** Set on the host for every row. The value is plain on purpose: redaction leaves it as it is, so a leak would show. */
const ENV_CANARY = { name: "WB_KSZ_SLICE3_CANARY_API_KEY", value: "wb-ksz-slice3-plain-canary-marker" } as const;
/** An obviously fake credential-shaped placeholder, assembled at run time (W19 rule): the shared redaction masks it. */
const FAKE_TOKEN = ["sk", "ant", "api03", "FAKE-PLACEHOLDER-NOT-A-REAL-KEY-KSZ3"].join("-");
const FAKE_BEARER = ["Authorization:", "Bearer", "FAKE-PLACEHOLDER-TOKEN-KSZ3"].join(" ");

/** The probe the in-process VM-escape row runs (test/workbench-security-workflow.test.ts), aimed at the canary's name. */
const ESCAPE_PROBES = `const body = "return require('node:process').env." + ${JSON.stringify(ENV_CANARY.name)};
const probe = fn => { try { return { escaped: fn() }; } catch (error) { return { error: error.name, realmError: error instanceof EvalError }; } };
const callables = [agent, node, parallel, pipeline, phase, log, workflow, budget.spent, budget.remaining, console.log, console.info, console.warn, console.error, console.debug];
const probes = [probe(() => Function(body)()), ...callables.flatMap(fn => [
  probe(() => fn.constructor(body)()),
  probe(() => fn.constructor.constructor(body)()),
  probe(() => Object.getPrototypeOf(fn).constructor(body)()),
])];
return { probes, reach: { process: typeof process, require: typeof require, globalProcess: typeof globalThis.process, buffer: typeof Buffer } };`;
/** A script-side helper: a call's answer, or the refusal it drew reduced to name, category and message. */
const REFUSAL = `const refusal = async call => {
  try { return { ok: true, value: await call() }; }
  catch (error) { return { ok: false, name: error.name, category: error.category ?? null, message: String(error.message) }; }
};`;

interface Fixture {
  readonly hosts: string;
  readonly workspace: string;
  readonly markers: string;
  readonly sockets: string;
  readonly provider: string;
  readonly digest: string;
}

const roots: string[] = [];
const hostPids: number[] = [];
let savedCanary: string | undefined;

function privateDir(path: string): string {
  mkdirSync(path, { mode: 0o700 });
  chmodSync(path, 0o700);
  return path;
}
/**
 * One launch's private tree: workspace (the provider and the script), markers beside it, hosts and socket bases. The
 * root is short and sits under the fixture-roots base, never under an inherited TMPDIR, because the socket path is
 * bounded at 103 bytes. It is created exclusively (mkdirSync throws on an existing name, never reuses one) and
 * registered with trackScratch, so the leak guard audits it and removeScratch removes it.
 */
function fixture(): Fixture {
  const root = join(realpathSync(SCRATCH_BASE.path), `wb-ksz-${randomBytes(6).toString("hex")}`);
  mkdirSync(root, { mode: 0o700 });
  trackScratch(root);
  chmodSync(root, 0o700);
  roots.push(root);
  const workspace = privateDir(join(root, "ws"));
  // Markers live BESIDE the workspace: the host pins the whole provider tree of its cwd, so a marker inside it would
  // change the tree under the pin (an identity conflict, not a measurement).
  const markers = privateDir(join(root, "markers"));
  const sockets = privateDir(join(root, "s"));
  const provider = join(workspace, "provider.mjs");
  writeFileSync(provider, faultProviderSource({ capabilityId: CAPABILITY, markerDirectory: markers, crashAfterEffect: false }), { mode: 0o600 });
  const digest = `sha256:${createHash("sha256").update(readFileSync(provider)).digest("hex")}`;
  return { hosts: join(root, "hosts"), workspace, markers, sockets, provider, digest };
}

/** Launch the real detached host child for `body` under one reviewed local provider holding CAPABILITY. */
async function launch(f: Fixture, invocationId: string, body: string, extra: Partial<DetachedLaunchRequest> = {}): Promise<DetachedReceipt> {
  const scriptPath = join(f.workspace, `${invocationId}.js`);
  writeFileSync(scriptPath, `export const meta={name:${JSON.stringify(invocationId)},description:"wb-ksz slice 3 hostile probe"};\n${body}`, { mode: 0o600 });
  const request: DetachedLaunchRequest = {
    directory: f.hosts,
    invocationId,
    scriptPath,
    cwd: f.workspace,
    input: { capability: CAPABILITY },
    trustedScript: true,
    backend: "deterministic",
    providers: [],
    grants: [GRANT],
    permissions: ALL_PERMISSIONS,
    localProvider: { kind: "trusted-local", version: "1.0.0", modulePath: f.provider, digest: f.digest, capabilities: [CAPABILITY] },
    sourceFiles: [scriptPath, f.provider],
    ...extra,
  };
  const receipt = await launchDetachedMarked(request, { env: {}, tmpdir: f.sockets, runUserRoot: NO_RUN_USER });
  hostPids.push(receipt.pid);
  return receipt;
}

/** The child's snapshot once its run is terminal, read through its own socket. */
function settled(f: Fixture, receipt: DetachedReceipt): Promise<DetachedSnapshot> {
  const handle = connectDetachedMarked(f.hosts, receipt.invocationId);
  return pollFor(`the terminal reading of ${receipt.invocationId}`, () => handle.inspect(), snapshot => snapshot.terminal !== undefined);
}

/** How many times the provider ran for `invocationId`: one marker file per call. */
function providerCalls(f: Fixture, invocationId: string): number {
  return readdirSync(f.markers).filter(name => name.startsWith(`${invocationId}.`)).length;
}

/** The NAMES in the child's initial environment as the kernel holds it (values are never read into the test). */
function childEnvironNames(pid: number): string[] {
  return readFileSync(`/proc/${pid}/environ`, "utf8")
    .split("\0")
    .filter(entry => entry.indexOf("=") > 0)
    .map(entry => entry.slice(0, entry.indexOf("=")));
}

/** One connection to the child's own socket: write `frames`, then collect every reply frame until the child closes it. */
function exchange(socketPath: string, frames: readonly Buffer[]): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const socket = createConnection(socketPath);
    const decoder = new DetachedFrameDecoder();
    const replies: unknown[] = [];
    socket.once("error", reject);
    socket.on("data", (chunk: Buffer) => {
      try {
        replies.push(...decoder.push(chunk));
      } catch (error) {
        socket.destroy();
        reject(error);
      }
    });
    socket.once("close", () => resolve(replies));
    socket.once("connect", () => socket.write(Buffer.concat(frames)));
  });
}

/** Neither the env canary's value nor the fake token ever leaves the child in what it reports. */
function expectNothingSecret(snapshot: DetachedSnapshot): void {
  const text = JSON.stringify(snapshot);
  expect(text.includes(ENV_CANARY.value), "the host's env canary value left the child").toBe(false);
  expect(text.includes(FAKE_TOKEN), "the fake token left the child unredacted").toBe(false);
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
/** True once `pid` has exited; a host still running at the budget is a lapse that names the wait (wb-maza). */
async function gone(pid: number): Promise<boolean> {
  await pollFor(`the exit of host pid ${pid}`, () => alive(pid), running => !running);
  return !alive(pid);
}

beforeEach(() => {
  savedCanary = process.env[ENV_CANARY.name];
  process.env[ENV_CANARY.name] = ENV_CANARY.value;
});
afterEach(async () => {
  const stopping = hostPids.splice(0);
  for (const pid of stopping) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {}
  }
  // Each host has exited (bounded) before its fixtures are removed: it unlinks its own socket directory as it stops.
  await reportAfterCleanup(stopping.map(gone), () => {
    if (savedCanary === undefined) delete process.env[ENV_CANARY.name];
    else process.env[ENV_CANARY.name] = savedCanary;
    removeScratch(...roots.splice(0));
  });
}, HOST_HOOK_TIMEOUT_MS);

describe("wb-ksz slice 3: docs/12 hostile cases against the real detached host child", () => {
  it("H0: launches a real child that is not this process, keeps the host canary out of its environment, and the canary is unmaskable by redaction (instrument check)", async () => {
    const f = fixture();
    const receipt = await launch(f, "ksz3-instrument", "return 42;");
    const snapshot = await settled(f, receipt);
    expect(receipt.pid, "the receipt names a child, not the test process").not.toBe(process.pid);
    expect(alive(receipt.pid), "the child the receipt names is alive").toBe(true);
    expect(snapshot).toMatchObject({ source: "live-detached-host", terminal: "completed", result: 42 });
    expect(process.env[ENV_CANARY.name], "the canary is set on the host").toBe(ENV_CANARY.value);
    const names = childEnvironNames(receipt.pid);
    expect(names.length, "the child environment is readable and non-empty").toBeGreaterThan(0);
    expect(names.includes(ENV_CANARY.name), "the canary name reached the child's environment").toBe(false);
    // A leak of the canary would read verbatim: the shared redaction leaves the plain value as it is ...
    expect(redactWorkbenchText(ENV_CANARY.value)).toBe(ENV_CANARY.value);
    // ... while it masks the fake token, so the echo rows below can tell a redaction from a pass-through.
    expect(redactWorkbenchText(FAKE_TOKEN).includes(FAKE_TOKEN)).toBe(false);
    expect(providerCalls(f, "ksz3-instrument")).toBe(0);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H1: JS VM escape attempt in the child yields no host realm and no provider client: every constructor-chain probe is a realm EvalError and no host global is reachable", async () => {
    const f = fixture();
    const receipt = await launch(f, "ksz3-escape", ESCAPE_PROBES);
    const snapshot = await settled(f, receipt);
    expect(snapshot.terminal, snapshot.diagnostic).toBe("completed");
    expect(snapshot.result).toEqual({
      probes: Array.from({ length: 43 }, () => ({ error: "EvalError", realmError: true })),
      reach: { process: "undefined", require: "undefined", globalProcess: "undefined", buffer: "undefined" },
    });
    expect(providerCalls(f, "ksz3-escape"), "an escape probe reached the provider").toBe(0);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H2: Host-side deny even when the script crafts raw RPC: the child's host side refuses forged authority, forged options and nested resolution, and only the granted call reaches the provider", async () => {
    const f = fixture();
    const receipt = await launch(
      f,
      "ksz3-crafted",
      `${REFUSAL}
let vehicle;
try { node.constructor("return require(\\"node:worker_threads\\").parentPort")(); vehicle = "escaped"; } catch (error) { vehicle = error.name; }
const forgedFields = await refusal(() => node(args.capability, { token: "forged", grants: ["*"], principal: { id: "root" }, workspace: "/" }));
const forgedOptions = await refusal(() => node(args.capability, { token: "forged" }, { principal: { id: "root" } }));
const nested = await refusal(() => workflow("a-saved-workflow"));
const agentCall = await refusal(() => agent("hello"));
const granted = await refusal(() => node(args.capability, { token: "control" }));
const plainData = granted.ok && Object.getPrototypeOf(granted.value) === Object.prototype && Object.values(granted.value).every(value => typeof value !== "function");
return { vehicle, forgedFields, forgedOptions, nested, agentCall, granted, plainData };`,
    );
    const snapshot = await settled(f, receipt);
    expect(snapshot.terminal, snapshot.diagnostic).toBe("completed");
    expect(snapshot.result).toEqual({
      vehicle: "EvalError",
      forgedFields: { ok: false, name: "CapabilityError", category: "validation", message: `Invalid input schema for capability ${CAPABILITY}.` },
      forgedOptions: { ok: false, name: "CapabilityError", category: "validation", message: "node() options.principal is not supported. Supported: label, phase." },
      nested: { ok: false, name: "Error", category: null, message: "This workflow host cannot run nested workflows." },
      agentCall: { ok: true, value: null },
      granted: { ok: true, value: { coverage: "fixture", marker: 0, invocationId: "ksz3-crafted" } },
      plainData: true,
    });
    expect(providerCalls(f, "ksz3-crafted"), "only the granted control call reaches the provider").toBe(1);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H3: unknown grant refused: a capability outside the invocation's reviewed manifest, local or native, is an authorization denial in the child and never reaches a provider", async () => {
    const f = fixture();
    const receipt = await launch(
      f,
      "ksz3-unknown",
      `${REFUSAL}
const unlisted = await refusal(() => node("local.unlisted", {}));
const native = await refusal(() => node("forge.gate.status", {}));
const granted = await refusal(() => node(args.capability, { token: "control" }));
return { unlisted, native, granted: granted.ok };`,
    );
    const snapshot = await settled(f, receipt);
    expect(snapshot.terminal, snapshot.diagnostic).toBe("completed");
    const denied = { ok: false, name: "CapabilityError", category: "authorization", message: "Capability absent from trusted local provider manifest." };
    expect(snapshot.result).toEqual({ unlisted: denied, native: denied, granted: true });
    expect(providerCalls(f, "ksz3-unknown"), "only the granted control call reaches the provider").toBe(1);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H4: observer-only stop refused: a child launched with the inspect permission alone refuses cancel, shutdown and execute host-side, records no control, and keeps serving inspect", async () => {
    const f = fixture();
    const receipt = await launch(f, "ksz3-observer", `return await node(args.capability, { token: "never" });`, { permissions: ["inspect"] });
    const handle = connectDetachedMarked(f.hosts, receipt.invocationId);
    const refusalOf = async (call: () => Promise<unknown>): Promise<string> => {
      try {
        await call();
        return "accepted";
      } catch (error) {
        return error instanceof Error ? error.message : String(error);
      }
    };
    expect(await refusalOf(() => handle.cancel("operator stop"))).toBe("Detached authorization: Invocation cancel grant denied.");
    expect(await refusalOf(() => handle.shutdown("operator stop"))).toBe("Detached authorization: Invocation shutdown grant denied.");
    expect(await refusalOf(() => handle.execute())).toBe("Detached authorization: Invocation execute grant denied.");
    const snapshot = await handle.inspect();
    expect(snapshot).toMatchObject({ source: "live-detached-host", observation: "observed-started", controlAudit: [], cancellationRequested: false });
    expect(snapshot.terminal, "an observer-only child never ran").toBeUndefined();
    expect(alive(receipt.pid), "the refused stop left the child running").toBe(true);
    expect(providerCalls(f, "ksz3-observer"), "an observer-only child never ran its script").toBe(0);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H5: cross-workspace ref returns authorization failure: a frame naming another workspace's invocation on a child's own socket is refused, and so is every other crafted frame", async () => {
    const left = fixture();
    const right = fixture();
    const body = `return await node(args.capability, { token: "control" });`;
    const leftReceipt = await launch(left, "ksz3-left", body);
    const rightReceipt = await launch(right, "ksz3-right", body);
    expect(leftReceipt.socketPath).not.toBe(rightReceipt.socketPath);
    expect((await settled(left, leftReceipt)).terminal).toBe("completed");
    expect((await settled(right, rightReceipt)).terminal).toBe("completed");
    const frame = (value: Record<string, unknown>): Buffer => detachedFrame(value);
    const mismatch = [{ ok: false, category: "authorization", diagnostic: "Invocation ACL mismatch." }];
    expect(await exchange(leftReceipt.socketPath, [frame({ command: "inspect", invocationId: "ksz3-right" })])).toEqual(mismatch);
    expect(await exchange(rightReceipt.socketPath, [frame({ command: "execute", invocationId: "ksz3-left" })])).toEqual(mismatch);
    expect(await exchange(leftReceipt.socketPath, [frame({ command: "execute", invocationId: "ksz3-left", grants: ["*"] })])).toEqual([
      { ok: false, category: "validation", diagnostic: "Unsupported field: grants." },
    ]);
    expect(await exchange(leftReceipt.socketPath, [frame({ command: "run-script", invocationId: "ksz3-left" })])).toEqual([
      { ok: false, category: "validation", diagnostic: "Unsupported detached command; retry and arbitrary invocation payloads are forbidden." },
    ]);
    const twoCommands = [frame({ command: "inspect", invocationId: "ksz3-left" }), frame({ command: "inspect", invocationId: "ksz3-left" })];
    expect(await exchange(leftReceipt.socketPath, twoCommands)).toEqual([{ ok: false, category: "validation", diagnostic: "One bounded command per connection." }]);
    // Controls: the child answers a well-formed frame naming its own invocation, a crafted re-execute starts nothing,
    // and no refused frame entered the control audit or reached a provider.
    expect(await exchange(leftReceipt.socketPath, [frame({ command: "execute", invocationId: "ksz3-left" })])).toEqual([{ ok: true, value: { started: false } }]);
    const own = await exchange(leftReceipt.socketPath, [frame({ command: "inspect", invocationId: "ksz3-left" })]);
    expect(own).toHaveLength(1);
    expect(own[0]).toMatchObject({ ok: true, value: { invocationId: "ksz3-left", terminal: "completed", controlAudit: [] } });
    expect(providerCalls(left, "ksz3-left")).toBe(1);
    expect(providerCalls(right, "ksz3-right")).toBe(1);
    expect(providerCalls(left, "ksz3-right") + providerCalls(right, "ksz3-left"), "a crafted frame reached the other workspace's provider").toBe(0);
  }, 60_000);

  it("H6: schema pollution payload refused: prototype keys and over-deep input are refused before any host frame, the child's realm stays unpolluted, and only the control call reaches the provider", async () => {
    const f = fixture();
    const receipt = await launch(
      f,
      "ksz3-pollution",
      `${REFUSAL}
const proto = await refusal(() => node(args.capability, JSON.parse('{"token":"x","__proto__":{"polluted":true}}')));
const ctor = await refusal(() => node(args.capability, { token: "x", constructor: { prototype: { polluted: true } } }));
let deep = { token: "x" };
for (let depth = 0; depth < 70; depth++) deep = { next: deep };
const tooDeep = await refusal(() => node(args.capability, deep));
const control = await refusal(() => node(args.capability, { token: "control" }));
return { proto, ctor, tooDeep: { ok: tooDeep.ok, name: tooDeep.name, category: tooDeep.category, depth: tooDeep.message.includes("maximum depth 64") }, clean: ({}).polluted === undefined, control: control.ok };`,
    );
    const snapshot = await settled(f, receipt);
    expect(snapshot.terminal, snapshot.diagnostic).toBe("completed");
    const pollution = (key: string) => ({ ok: false, name: "CapabilityError", category: "validation", message: `Cannot pass a prototype pollution key across the workflow VM boundary (at node() input.${key}).` });
    expect(snapshot.result).toEqual({
      proto: pollution("__proto__"),
      ctor: pollution("constructor"),
      tooDeep: { ok: false, name: "CapabilityError", category: "validation", depth: true },
      clean: true,
      control: true,
    });
    expect(providerCalls(f, "ksz3-pollution"), "only the control call reaches the provider").toBe(1);
    expectNothingSecret(snapshot);
  }, 30_000);

  it("H7: secret env not displayed: the host's env canary is absent from the child's environment, and a credential-shaped value in a result, a log row or a failure message leaves the child redacted", async () => {
    const echoed = fixture();
    const echoReceipt = await launch(
      echoed,
      "ksz3-echo",
      `log("upstream token " + ${JSON.stringify(FAKE_TOKEN)});
return { echo: ${JSON.stringify(FAKE_TOKEN)}, header: ${JSON.stringify(FAKE_BEARER)} };`,
    );
    const thrown = fixture();
    const throwReceipt = await launch(thrown, "ksz3-throw", `throw new Error("upstream rejected " + ${JSON.stringify(FAKE_TOKEN)});`);
    for (const receipt of [echoReceipt, throwReceipt]) {
      expect(childEnvironNames(receipt.pid).includes(ENV_CANARY.name), `the canary name reached ${receipt.invocationId}`).toBe(false);
    }
    const echo = await settled(echoed, echoReceipt);
    expect(echo.terminal, echo.diagnostic).toBe("completed");
    expect(echo.result).toEqual({ echo: "[REDACTED]", header: "Authorization: [REDACTED]" });
    expect(echo.progress).toContainEqual({ type: "workflow_log", message: "upstream token [REDACTED]" });
    expectNothingSecret(echo);
    expect(JSON.stringify(echo).includes("FAKE-PLACEHOLDER-TOKEN-KSZ3"), "the fake bearer value left the child").toBe(false);
    const failure = await settled(thrown, throwReceipt);
    expect(failure.terminal).toBe("failed");
    expect(failure.diagnostic).toBe("upstream rejected [REDACTED]");
    expectNothingSecret(failure);
  }, 60_000);
});
