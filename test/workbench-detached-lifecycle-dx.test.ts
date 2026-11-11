/**
 * wb-r1bz ([DX P06] Detached lifecycle): EAT-R341, EAT-R342 and EAT-R344 of the pi-system-dx-triage-2026-11-11 program
 * (docs/workbench/programs/pi-system-dx-triage-2026-11-11/requirements/.work/req-r-ops.md at master 0a5ac3a3), each driven
 * through the REAL registered Pi tools only: workflow_detached, and workflow_execute with hostMode detached, captured from
 * the booted src/index.ts extension. Every admitted launch spawns the compiled child host (dist/, which the gate's build step
 * makes before its test step).
 *
 * Requirements, quoted:
 *   EAT-R341 "The registered detached launch paths MUST resolve their extension-owned default base to its real path before
 *     applying the existing owner/mode/ancestor safety checks." AC1 "Assert both workflow_detached launch and
 *     workflow_execute(hostMode:detached) launch successfully with a hermetic symlinked HOME whose resolved base is private
 *     and owned by the current UID." AC2 "Assert unsafe permissions, foreign ownership and replaced ancestors still refuse
 *     before host spawn."
 *   EAT-R342 "The detached terminal classifier MUST retain terminal completed when a successful return value exceeds the
 *     bounded snapshot contract, reporting result omission separately." AC1 'Assert return "x".repeat(300*1024) produces
 *     terminal completed, no inlined oversized result and typed exceeds-snapshot-bound omission.' AC2 "Assert a genuinely
 *     thrown workflow error still reports failed; every serialized snapshot stays within its declared byte bound."
 *   EAT-R344 "Detached inspect MUST return a typed transport-loss cause that distinguishes a never-existing invocation from
 *     missing socket, connection refusal and transport timeout." AC1 "Assert nonexistent ID yields no-such-invocation and no
 *     claim that a host was lost or native effects occurred." AC2 "Assert P1/P3 yield socket-missing/connection-refused
 *     respectively, terminal remains unknown without a durable terminal observation, and simulated timeout has its own code."
 *
 * PINNED reader set: each case id below leads its own test titles in this file. The CENSUS row holds this list, its
 * sentences, the collected titles and the frozen PINNED_CASES literal (each id with the count of tests it leads) to one
 * another, and the rows' expected values to anchors outside this file: the DetachedTransportLoss union and the
 * resultOmitted member of src/workbench/hosts/local-detached.ts, and the two registered launch producers of src/index.ts.
 *   R341a, through each producer: under a HOME that is a symlink to a private directory, the launch is admitted, the resolved base is a real directory owned by this uid at mode 0700 holding exactly the launched id, exactly one live host process names its boot pin under that base, and workflow_detached inspect reads the run completed with result 42.
 *   R341b, through each producer and under that symlinked HOME: a base at mode 0755, a world-writable ancestor of the resolved base, a base owned by a uid other than the operator's and a base replaced by a symlink each refuse the launch with the launcher's own Authorization words, reserve no invocation and start no host process.
 *   R341c, through each producer: an agent directory that does not exist refuses the launch with the ENOENT lstat words naming that directory, workflow_detached as its reply rather than a throw, reserving no invocation and starting no host process.
 *   R342a, a reviewed script returning "x".repeat(300 * 1024) reads terminal completed with no result and the typed omission resultOmitted exceeds-snapshot-bound, and its snapshot holds none of the 300 KiB.
 *   R342b, a reviewed script that throws reads terminal failed with its error as the diagnostic and no resultOmitted.
 *   R342c, a reviewed script returning 42 reads terminal completed with result 42 and no resultOmitted, and each R342 snapshot stays within DETACHED_MAX_FRAME_BYTES.
 *   R344a, inspect of an id no launch reserved reads transportLoss no-such-invocation with no terminal, no diagnostic and no reconcile hint, both before any detached root exists and beside another launched invocation.
 *   R344b, a host retired by SIGTERM reads transportLoss socket-missing with terminal unknown and the reconcile hint.
 *   R344c, a host killed by SIGKILL reads transportLoss connection-refused with terminal unknown and the reconcile hint.
 *   R344d, a host held stopped by SIGSTOP reads transportLoss transport-timeout with terminal unknown and the reconcile hint.
 *   R344e, an invocation directory reserved without a receipt reads transportLoss transport-failure with terminal unknown and the reconcile hint.
 *   R344f, a socket that closes the connection without answering reads transportLoss transport-failure with terminal unknown and the reconcile hint.
 * The falsifiers each row reds under: the trunk launch paths (the base join(getAgentDir(), "workbench-detached") unresolved)
 * refuse every R341a launch with "Authorization: unsafe detached directory ancestor."; resolving the base itself, not its agent
 * directory, admits R341b's replaced base; a resolution that throws reds R341c's workflow_detached row and one that falls
 * back to another directory reds both R341c rows; the trunk classifier, which reclassifies an oversized completed result as failed,
 * reds R342a; a classifier that keeps completed for a thrown error reds R342b; the trunk client, whose every lost reading is one
 * undifferentiated unknown carrying the reconcile hint, reds R344a through R344f.
 * NOT CLAIMED by this census: EAT-R343, the authorized detached stop, is NOT CLAIMED by this census. The local-detached leg of
 * workflow_control, which keeps join(getAgentDir(), "workbench-detached") byte-pinned by
 * test/workbench-detached-control-live-receipt.test.ts, is NOT CLAIMED by this census. A directory a caller passes to the module
 * API is NOT CLAIMED by this census. An ancestor replaced between the resolution and the launcher's own check is NOT CLAIMED by
 * this census. A base owned by a real second account is NOT CLAIMED by this census: R341b presents the operator as uid + 1 for
 * its one call instead, since a non-root test cannot chown. A result the snapshot contract refuses for its depth or shape rather
 * than its size is NOT CLAIMED by this census. A transport failure other than R344e's is NOT CLAIMED by this census.
 *
 * This suite is a member of the detached-* family (test/workbench-detached-timing-guard.test.ts, wb-maza): every timed wait is
 * pollFor, a reply that carries one of the product's two fixed-bound lapse sentences where none is expected fails re-labelled
 * with the strict marker (markTimingLapse), and the hook that stops hosts waits for their exit under HOST_HOOK_TIMEOUT_MS and
 * reports a lapse only after its cleanup (reportAfterCleanup).
 */
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ExtensionContext, getAgentDir } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { inspectWorkflowSource } from "../src/workbench/designer.js";
import { DETACHED_MAX_FRAME_BYTES, type DetachedReceipt, type DetachedSnapshot } from "../src/workbench/hosts/local-detached.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { DetachedTimingLapse, HOST_HOOK_TIMEOUT_MS, markTimingLapse, pollFor, reportAfterCleanup } from "./helpers/detached-timing.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const SELF = fileURLToPath(import.meta.url);
const uid = process.getuid?.() ?? 0;
/** Every right a row's launches and readings need, held by the host through workbench.capabilityGrants. */
const RIGHTS: readonly string[] = ["workbench:execute", "workbench:detach", "workbench:observe", "claude:invoke"];
const PURE = 'export const meta={name:"wb-r1bz-pure",description:"reviewed pure computation"}; return 42;';
const OVERSIZED = 'export const meta={name:"wb-r1bz-oversized",description:"reviewed pure computation"}; return "x".repeat(300 * 1024);';
const THROWING = 'export const meta={name:"wb-r1bz-throws",description:"reviewed computation that fails"}; throw new Error("wb-r1bz reviewed failure");';
/** A run that never settles and holds no timer: the host stays live until a row signals it. */
const HOLDING = 'export const meta={name:"wb-r1bz-holds",description:"reviewed computation that never settles"}; await new Promise(() => {}); return 0;';
/** The client's own guidance on every reading whose host may have run (src/workbench/hosts/local-detached.ts RECONCILE). */
const RECONCILE = "Host connection lost: JavaScript state is not recoverable. Never automatically retry this invocation; reconcile known native effects with their producer before a new invocation.";
/** The client's fixed socket-timeout sentence, the one R344d expects to read. */
const TRANSPORT_TIMEOUT = "Detached transport timeout; effects may be unresolved.";
const PRODUCERS = ["workflow_detached", "workflow_execute"] as const;
/** R342a's expected typed omission; the CENSUS row holds it to the resultOmitted member of DetachedSnapshot in src. */
const OMISSION = "exceeds-snapshot-bound";
type Producer = (typeof PRODUCERS)[number];

interface RegisteredTool {
  execute(id: string, params: Record<string, unknown>, signal: undefined, update: undefined, context: ExtensionContext): Promise<{ content: { type: string; text: string }[] }>;
}
interface ExecuteReply {
  ok: boolean;
  status: string;
  error?: { code: string; message: string };
  nativeRefs: { provider: string; type: string; id: string; scope?: string }[];
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
/** Scratch a row allocated beside its sandbox (the symlinked HOME layout), removed once the row's hosts have exited. */
const scratch: string[] = [];
/** The detached bases a row's launches may use: the hook stops the hosts whose boot pins sit under them. */
const bases: string[] = [];
/** Sockets a host this row crashed left behind (nothing in the workbench deletes them); the hook removes them. */
const leftSockets: string[] = [];

/** Live host processes whose boot pin sits under `base`: the launcher spawns `node <host> --serve <base>/<id>/invocation.json <digest>`. */
function hostsUnder(base: string): number[] {
  return readdirSync("/proc").filter(name => /^[0-9]+$/.test(name)).flatMap(name => {
    let args: string[] = [];
    try { args = readFileSync(`/proc/${name}/cmdline`, "utf8").split("\0"); } catch { return []; }
    const serve = args.indexOf("--serve");
    const pin = serve < 0 ? "" : (args[serve + 1] ?? "");
    return pin.startsWith(`${base}/`) && pin.endsWith("/invocation.json") ? [Number(name)] : [];
  });
}
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
/** True once `pid` has exited; a host still running at the budget is a lapse that names the wait (wb-maza). */
async function gone(pid: number): Promise<boolean> {
  await pollFor(`the exit of host pid ${pid}`, () => alive(pid), running => !running);
  return !alive(pid);
}

afterEach(async () => {
  // Every host a row started stops, and has exited, before its sandbox goes; a host still running at its budget is a lapse
  // reported only after that cleanup (wb-maza). A host R344d holds stopped takes its SIGTERM only once continued.
  const stopping = [...new Set(bases.flatMap(base => hostsUnder(base)))];
  for (const pid of stopping) {
    try { process.kill(pid, "SIGCONT"); } catch {}
    try { process.kill(pid, "SIGTERM"); } catch {}
  }
  await reportAfterCleanup(stopping.map(pid => gone(pid)), () => {
    for (const socket of leftSockets.splice(0)) rmSync(socket, { force: true });
    bases.splice(0);
    sandbox?.restore();
    sandbox = undefined;
    removeScratch(...scratch.splice(0));
  });
}, HOST_HOOK_TIMEOUT_MS);

/** `text`, unless it carries one of the product's two fixed-bound lapse sentences: that fails re-labelled (wb-maza). */
function unlapsed(site: string, text: string): string {
  const marked = markTimingLapse(site, new Error(text));
  if (marked instanceof DetachedTimingLapse) throw marked;
  return text;
}
/** A reply that must be JSON; a refusal text where JSON was expected fails naming that text, never as JSON.parse's. */
function jsonOf<T>(site: string, reply: string): T {
  try { return JSON.parse(reply) as T; }
  catch { throw new Error(`${site}: expected a JSON reply, received: ${reply}`); }
}
/** The reply as JSON when it is JSON (an admitted launch), undefined when it is a refusal's words. */
function maybeJson<T>(reply: string): T | undefined {
  try { return JSON.parse(reply) as T; } catch { return undefined; }
}

/**
 * Boots the real extension under Claude workbench settings holding RIGHTS, with the reviewed `script` saved as reviewed.js.
 * A "symlinked" home points HOME at <scratch>/home, a symlink to the private <scratch>/local-home holding .pi/agent, with no
 * PI_CODING_AGENT_DIR, so the agent directory is spelled through the symlink exactly as on a /home -> /local/home host.
 */
async function boot(script: string, home: "hermetic" | "symlinked" = "hermetic") {
  const settings = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...RIGHTS] } };
  sandbox = hermeticDir({ settings });
  let layout: string | undefined;
  if (home === "symlinked") {
    layout = makeScratch("wb-r1bz-home-");
    scratch.push(layout);
    mkdirSync(join(layout, "local-home", ".pi", "agent"), { recursive: true, mode: 0o700 });
    symlinkSync(join(layout, "local-home"), join(layout, "home"));
    process.env.HOME = join(layout, "home");
    delete process.env.PI_CODING_AGENT_DIR;
  }
  // The base the resolved launch paths use: the agent directory's real path, then the extension's own base name.
  const realHome = layout === undefined ? undefined : realpathSync(join(layout, "home"));
  const base = realHome === undefined ? join(realpathSync(getAgentDir()), "workbench-detached") : join(realHome, ".pi", "agent", "workbench-detached");
  // The hook stops every host whose boot pin sits under the layout too, so a launch a regression admits into R341b's
  // symlink target (<scratch>/elsewhere) is stopped with the row's other hosts.
  bases.push(base, ...(layout === undefined ? [] : [layout]));
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const scriptPath = join(sandbox.dir, "reviewed.js");
  writeFileSync(scriptPath, script);
  const tool = (name: string): RegisteredTool => {
    const registered: RegisteredTool | undefined = pi.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  return { context, scriptPath, dir: sandbox.dir, tool, base, layout: layout ?? "" };
}
type Booted = Awaited<ReturnType<typeof boot>>;

/** One launch through `producer`'s registered tool: its reply text, and the launched invocation id when the launch was admitted. */
async function launchThrough(producer: Producer, booted: Booted, invocationId: string): Promise<{ text: string; id?: string; receipt?: DetachedReceipt; ref?: ExecuteReply["nativeRefs"][number] }> {
  if (producer === "workflow_detached") {
    const params = { action: "launch", invocationId, scriptPath: booted.scriptPath, trustedScript: true };
    const text = unlapsed(`launch of ${invocationId}`, textOf(await booted.tool("workflow_detached").execute("wb-r1bz", params, undefined, undefined, booted.context)));
    const receipt = maybeJson<DetachedReceipt>(text);
    return { text, ...(receipt?.invocationId ? { id: receipt.invocationId, receipt } : {}) };
  }
  const definitionRef = inspectWorkflowSource({ scriptPath: booted.scriptPath }, booted.dir).definition;
  const params = { definitionRef, input: { n: 1 }, hostMode: "detached" };
  const text = unlapsed(`workflow_execute launch for ${invocationId}`, textOf(await booted.tool("workflow_execute").execute("wb-r1bz", params, undefined, undefined, booted.context)));
  const reply = jsonOf<ExecuteReply>("workflow_execute reply", text);
  if (reply.error) unlapsed("workflow_execute launch", reply.error.message);
  const ref = reply.nativeRefs.find(entry => entry.provider === "local-detached" && entry.type === "invocation");
  return { text, ...(ref ? { id: ref.id, ref } : {}) };
}
/** One reading through workflow_detached inspect: the reply text and the snapshot it carries. `expectLapse` is R344d's own read. */
async function inspectThrough(booted: Booted, invocationId: string, expectLapse = false): Promise<{ text: string; snapshot: DetachedSnapshot }> {
  const reply = textOf(await booted.tool("workflow_detached").execute("wb-r1bz", { action: "inspect", invocationId }, undefined, undefined, booted.context));
  const text = expectLapse ? reply : unlapsed(`inspect of ${invocationId}`, reply);
  return { text, snapshot: jsonOf<DetachedSnapshot>(`inspect of ${invocationId}`, text) };
}
/** The first reading `done` accepts, re-read through workflow_detached inspect; a budget lapse names the wait. */
function readingWhen(booted: Booted, invocationId: string, what: string, done: (snapshot: DetachedSnapshot) => boolean) {
  return pollFor(`${what} of ${invocationId} through workflow_detached`, () => inspectThrough(booted, invocationId), reading => done(reading.snapshot));
}
const terminalReading = (booted: Booted, invocationId: string) => readingWhen(booted, invocationId, "a terminal reading", snapshot => Boolean(snapshot.terminal));
const runningReading = (booted: Booted, invocationId: string) => readingWhen(booted, invocationId, "a running reading", snapshot => snapshot.observation === "observed-running");

/** The launched host's own receipt, as the host wrote it into the reserved invocation directory. */
function receiptOf(booted: Booted, invocationId: string): DetachedReceipt {
  return JSON.parse(readFileSync(join(booted.base, invocationId, "receipt.json"), "utf8")) as DetachedReceipt;
}
/** The operator the launcher reads (process.getuid and process.geteuid) presented as `operator` for one call. */
async function asOperator<T>(operator: number, call: () => Promise<T>): Promise<T> {
  const identity = process as { getuid(): number; geteuid(): number };
  const getuid = vi.spyOn(identity, "getuid").mockReturnValue(operator);
  const geteuid = vi.spyOn(identity, "geteuid").mockReturnValue(operator);
  try { return await call(); }
  finally { getuid.mockRestore(); geteuid.mockRestore(); }
}
/** The refusal's own words a producer replies with: workflow_detached's reply text, workflow_execute's launch-failed message. */
function refusalWords(producer: Producer, text: string): string {
  if (producer === "workflow_detached") return text;
  const reply = jsonOf<ExecuteReply>("workflow_execute refusal", text);
  expect(reply).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
  expect(reply.error?.code).toBe("launch-failed");
  return reply.error?.message ?? "";
}
const privateWords = (owner: number, base: string): string => `Authorization: directory must be owned by uid ${owner} with exact private permissions: ${base}.`;
const ANCESTOR_WORDS = "Authorization: unsafe detached directory ancestor.";

describe("EAT-R341: the registered launch paths resolve the extension-owned base before the launcher's checks", () => {
  it.each(PRODUCERS)("R341a: %s launches under a symlinked HOME; the resolved base is a real directory owned by this uid at mode 0700, holds exactly the launched id, one live host names its boot pin under it, and the run completes", async producer => {
    const booted = await boot(PURE, "symlinked");
    expect(lstatSync(join(booted.layout, "home")).isSymbolicLink(), "HOME is spelled through a symlink").toBe(true);
    const launch = await launchThrough(producer, booted, "wb-r1bz-r341a");
    if (!launch.id) throw new Error(`R341a: the ${producer} launch was refused: ${launch.text}`);
    const stat = lstatSync(booted.base);
    expect({ directory: stat.isDirectory(), symlink: stat.isSymbolicLink(), uid: stat.uid, mode: stat.mode & 0o7777 }, "the resolved base").toEqual({ directory: true, symlink: false, uid, mode: 0o700 });
    expect(readdirSync(booted.base), "the invocations the base holds").toEqual([launch.id]);
    expect(hostsUnder(booted.base).length, "live host processes whose boot pin sits under the resolved base").toBe(1);
    if (producer === "workflow_detached") expect(launch.receipt?.invocationDirectory).toBe(join(booted.base, launch.id));
    else expect(launch.ref?.scope).toBe(join(booted.base, launch.id));
    expect((await terminalReading(booted, launch.id)).snapshot).toMatchObject({ terminal: "completed", result: 42 });
  }, 60_000);

  /** R341b's four layouts under the symlinked HOME: what each plants, the operator its launch runs as, and the words it refuses with. */
  const REFUSALS = [
    { layout: "a base at mode 0755", plant: (booted: Booted) => { mkdirSync(booted.base, { mode: 0o700 }); chmodSync(booted.base, 0o755); }, operator: uid, words: (booted: Booted) => privateWords(uid, booted.base), holds: (booted: Booted) => booted.base },
    { layout: "a world-writable ancestor without the sticky bit", plant: (booted: Booted) => { chmodSync(join(booted.layout, "local-home", ".pi"), 0o777); }, operator: uid, words: () => ANCESTOR_WORDS, holds: (booted: Booted) => booted.base },
    { layout: "a base owned by a uid other than the operator's", plant: (booted: Booted) => { mkdirSync(booted.base, { mode: 0o700 }); }, operator: uid + 1, words: (booted: Booted) => privateWords(uid + 1, booted.base), holds: (booted: Booted) => booted.base },
    { layout: "a base replaced by a symlink to a private directory this uid owns", plant: (booted: Booted) => { mkdirSync(join(booted.layout, "elsewhere"), { mode: 0o700 }); symlinkSync(join(booted.layout, "elsewhere"), booted.base); }, operator: uid, words: (booted: Booted) => privateWords(uid, booted.base), holds: (booted: Booted) => join(booted.layout, "elsewhere") },
  ] as const;
  it.each(PRODUCERS.flatMap(producer => REFUSALS.map(row => [producer, row.layout, row] as const)))("R341b: %s under a symlinked HOME with %s refuses with the launcher's own words, reserves no invocation and starts no host", async (producer, _layout, row) => {
    const booted = await boot(PURE, "symlinked");
    row.plant(booted);
    const launch = await asOperator(row.operator, () => launchThrough(producer, booted, "wb-r1bz-r341b"));
    expect(launch.id, `the ${producer} launch was admitted: ${launch.text}`).toBeUndefined();
    expect(refusalWords(producer, launch.text)).toContain(row.words(booted));
    expect(existsSync(row.holds(booted)) ? readdirSync(row.holds(booted)) : [], "invocations reserved").toEqual([]);
    expect(hostsUnder(booted.base).length + hostsUnder(row.holds(booted)).length, "live host processes under the base").toBe(0);
  }, 30_000);

  it.each(PRODUCERS)("R341c: %s with an agent directory that does not exist refuses the launch with the ENOENT lstat words naming it, as a reply rather than a throw, reserving no invocation and starting no host", async producer => {
    const booted = await boot(PURE);
    const absent = join(booted.dir, "absent-agent-dir");
    process.env.PI_CODING_AGENT_DIR = absent;
    bases.push(absent);
    const launch = await launchThrough(producer, booted, "wb-r1bz-r341c");
    expect(launch.id, `the ${producer} launch was admitted: ${launch.text}`).toBeUndefined();
    expect(refusalWords(producer, launch.text)).toContain(`ENOENT: no such file or directory, lstat '${absent}'`);
    expect(existsSync(absent), "the absent agent directory").toBe(false);
    expect(hostsUnder(absent).length, "live host processes under the absent agent directory").toBe(0);
  }, 30_000);
});

describe("EAT-R342: the terminal classifier keeps completion distinct from result omission", () => {
  it("R342a: a reviewed script returning a 300 KiB string reads terminal completed, carries no result, names resultOmitted exceeds-snapshot-bound and holds none of the 300 KiB", async () => {
    const booted = await boot(OVERSIZED);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r342a");
    if (!launch.id) throw new Error(`R342a: the launch was refused: ${launch.text}`);
    const { text, snapshot } = await terminalReading(booted, launch.id);
    expect(snapshot).toMatchObject({ observation: "observed-terminal", source: "live-detached-host", terminal: "completed", resultOmitted: OMISSION });
    expect(snapshot).not.toHaveProperty("result");
    expect(text).not.toContain("x".repeat(1024));
    expect(Buffer.byteLength(text), "the serialized snapshot").toBeLessThanOrEqual(DETACHED_MAX_FRAME_BYTES);
  }, 60_000);

  it("R342b: a reviewed script that throws reads terminal failed with its error as the diagnostic and no resultOmitted", async () => {
    const booted = await boot(THROWING);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r342b");
    if (!launch.id) throw new Error(`R342b: the launch was refused: ${launch.text}`);
    const { text, snapshot } = await terminalReading(booted, launch.id);
    expect(snapshot).toMatchObject({ observation: "observed-terminal", terminal: "failed", diagnostic: expect.stringContaining("wb-r1bz reviewed failure") });
    expect(snapshot).not.toHaveProperty("resultOmitted");
    expect(Buffer.byteLength(text), "the serialized snapshot").toBeLessThanOrEqual(DETACHED_MAX_FRAME_BYTES);
  }, 60_000);

  it("R342c: a reviewed script returning 42 reads terminal completed with result 42 and no resultOmitted, its snapshot within DETACHED_MAX_FRAME_BYTES", async () => {
    const booted = await boot(PURE);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r342c");
    if (!launch.id) throw new Error(`R342c: the launch was refused: ${launch.text}`);
    const { text, snapshot } = await terminalReading(booted, launch.id);
    expect(snapshot).toMatchObject({ observation: "observed-terminal", terminal: "completed", result: 42 });
    expect(snapshot).not.toHaveProperty("resultOmitted");
    expect(Buffer.byteLength(text), "the serialized snapshot").toBeLessThanOrEqual(DETACHED_MAX_FRAME_BYTES);
  }, 60_000);
});

/** Each R344 row's expected cause; the CENSUS row holds these values to the DetachedTransportLoss union in src. */
const TRANSPORT_ROWS = { R344a: "no-such-invocation", R344b: "socket-missing", R344c: "connection-refused", R344d: "transport-timeout", R344e: "transport-failure", R344f: "transport-failure" } as const;
/** The fields a reading of a host that may have run carries, whatever the cause it names. */
const lostHost = (transportLoss: string) => ({ observation: "unknown", source: "local-client-transport", terminal: "unknown", transportLoss, reconcileHint: RECONCILE });

describe("EAT-R344: detached inspect names a typed transport-loss cause", () => {
  it("R344a: an id no launch reserved reads no-such-invocation with no terminal, no diagnostic and no reconcile hint, before any detached root exists and beside another launched invocation", async () => {
    const booted = await boot(PURE);
    expect(existsSync(booted.base), "no detached root exists yet").toBe(false);
    const before = await inspectThrough(booted, "wb-r1bz-never");
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r344a-other");
    if (!launch.id) throw new Error(`R344a: the launch was refused: ${launch.text}`);
    await terminalReading(booted, launch.id);
    const beside = await inspectThrough(booted, "wb-r1bz-never");
    for (const reading of [before, beside]) {
      expect(reading.snapshot).toMatchObject({ invocationId: "wb-r1bz-never", observation: "unknown", source: "local-client-transport", transportLoss: TRANSPORT_ROWS.R344a });
      expect(Object.keys(reading.snapshot).filter(key => ["terminal", "result", "diagnostic", "reconcileHint", "receipt"].includes(key)), "fields claiming a host or its effects").toEqual([]);
      expect(reading.text).not.toMatch(/lost|reconcil|effect/i);
    }
  }, 60_000);

  it("R344b: a host retired by SIGTERM reads socket-missing with terminal unknown and the reconcile hint", async () => {
    const booted = await boot(HOLDING);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r344b");
    if (!launch.id) throw new Error(`R344b: the launch was refused: ${launch.text}`);
    await runningReading(booted, launch.id);
    const { pid, socketPath } = receiptOf(booted, launch.id);
    process.kill(pid, "SIGTERM");
    await gone(pid);
    expect(existsSync(socketPath), "the retired host unlinked its socket").toBe(false);
    const { snapshot } = await inspectThrough(booted, launch.id);
    expect(snapshot).toMatchObject(lostHost(TRANSPORT_ROWS.R344b));
    expect(snapshot).not.toHaveProperty("result");
  }, 60_000);

  it("R344c: a host killed by SIGKILL reads connection-refused with terminal unknown and the reconcile hint", async () => {
    const booted = await boot(HOLDING);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r344c");
    if (!launch.id) throw new Error(`R344c: the launch was refused: ${launch.text}`);
    await runningReading(booted, launch.id);
    const { pid, socketPath } = receiptOf(booted, launch.id);
    process.kill(pid, "SIGKILL");
    await gone(pid);
    leftSockets.push(socketPath);
    expect(existsSync(socketPath), "the crashed host left its socket behind").toBe(true);
    const { snapshot } = await inspectThrough(booted, launch.id);
    expect(snapshot).toMatchObject(lostHost(TRANSPORT_ROWS.R344c));
    expect(snapshot).not.toHaveProperty("result");
  }, 60_000);

  it("R344d: a host held stopped by SIGSTOP reads transport-timeout with terminal unknown and the reconcile hint", async () => {
    const booted = await boot(HOLDING);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r344d");
    if (!launch.id) throw new Error(`R344d: the launch was refused: ${launch.text}`);
    await runningReading(booted, launch.id);
    process.kill(receiptOf(booted, launch.id).pid, "SIGSTOP");
    const { snapshot } = await inspectThrough(booted, launch.id, true);
    expect(snapshot).toMatchObject({ ...lostHost(TRANSPORT_ROWS.R344d), diagnostic: expect.stringContaining(TRANSPORT_TIMEOUT) });
    expect(snapshot).not.toHaveProperty("result");
  }, 60_000);

  it("R344e: an invocation directory reserved without a receipt reads transport-failure with terminal unknown and the reconcile hint", async () => {
    const booted = await boot(PURE);
    mkdirSync(booted.base, { mode: 0o700 });
    mkdirSync(join(booted.base, "wb-r1bz-r344e"), { mode: 0o700 });
    const { snapshot } = await inspectThrough(booted, "wb-r1bz-r344e");
    expect(snapshot).toMatchObject(lostHost(TRANSPORT_ROWS.R344e));
    expect(snapshot).not.toHaveProperty("result");
  }, 30_000);

  it("R344f: a socket that closes the connection without answering reads transport-failure with terminal unknown and the reconcile hint", async () => {
    const booted = await boot(HOLDING);
    const launch = await launchThrough("workflow_detached", booted, "wb-r1bz-r344f");
    if (!launch.id) throw new Error(`R344f: the launch was refused: ${launch.text}`);
    await runningReading(booted, launch.id);
    const { pid, socketPath } = receiptOf(booted, launch.id);
    process.kill(pid, "SIGKILL");
    await gone(pid);
    // The crashed host's socket path, served again by a listener that closes every connection unanswered.
    rmSync(socketPath, { force: true });
    leftSockets.push(socketPath);
    const silent = createServer(connection => connection.destroy());
    await new Promise<void>(resolve => silent.listen(socketPath, resolve));
    try {
      chmodSync(socketPath, 0o600);
      const { snapshot } = await inspectThrough(booted, launch.id);
      expect(snapshot).toMatchObject(lostHost(TRANSPORT_ROWS.R344f));
      expect(snapshot).not.toHaveProperty("result");
    } finally {
      await new Promise<void>(resolve => silent.close(() => resolve()));
    }
  }, 60_000);
});

/** A vitest task as this file reads it: a test, or a suite holding tasks. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly tasks?: readonly TaskNode[];
}
const testsOf = (tasks: readonly TaskNode[]): TaskNode[] => tasks.flatMap(child => (child.type === "test" ? [child] : child.type === "suite" ? testsOf(child.tasks ?? []) : []));

/** The repository file at `path`, read as text. */
const repoText = (...path: string[]): string => readFileSync(join(dirname(SELF), "..", ...path), "utf8");
/** The string-literal members of the type alias `name` declared in `source` (export type <name> = "a" | "b";). */
function unionMembers(source: string, name: string): string[] {
  const declaration = new RegExp(`export type ${name} = ([^;]+);`).exec(source)?.[1] ?? "";
  return declaration.split("|").map(member => member.trim().replace(/^"|"$/g, "")).filter(member => member.length > 0);
}

describe("wb-r1bz census: the leading comment's pinned reader set is exactly this file's cases", () => {
  it("CENSUS: the leading comment pins exactly the PINNED_CASES ids in order with their claim sentences verbatim, each id leads exactly its frozen count of collected titles, no other title but this row's is collected, and the anchors outside this file's literals (the DetachedTransportLoss union, the resultOmitted member and the two registered launch producers in src) are exactly the ones the rows read", ({ task }) => {
    const source = readFileSync(SELF, "utf8");
    const comment = source.slice(0, source.indexOf("*/"));
    const pinnedLines = [...comment.matchAll(/^ \* {3}(R34[0-9][a-z]), (.+)$/gm)].map(match => [match[1], match[2]] as const);
    const ids = PINNED_CASES.map(entry => entry.slice(0, entry.indexOf(":")));
    expect(pinnedLines.map(([id]) => id), "the comment's pinned case ids").toEqual(ids);
    expect(pinnedLines.map(([, sentence]) => sentence), "the comment's claim sentences").toEqual([...CLAIM_SENTENCES]);
    const titles = testsOf(task.file.tasks).map(entry => entry.name);
    expect(ids.map(id => `${id}:${titles.filter(title => title.startsWith(`${id}: `)).length}`), "collected titles each pinned case leads").toEqual([...PINNED_CASES]);
    expect(titles.filter(title => !ids.some(id => title.startsWith(`${id}: `))), "collected titles outside the pinned set").toEqual([task.name]);
    const host = repoText("src", "workbench", "hosts", "local-detached.ts");
    expect(Object.keys(TRANSPORT_ROWS).every(id => ids.includes(id)), "every transport row is a pinned case").toBe(true);
    expect([...new Set(Object.values(TRANSPORT_ROWS))].sort(), "the causes the R344 rows read are the src union's").toEqual(unionMembers(host, "DetachedTransportLoss").sort());
    expect(/resultOmitted\?: "([a-z-]+)";/.exec(host)?.[1], "the omission R342a reads is the src member's").toBe(OMISSION);
    expect(repoText("src", "index.ts").split("workbenchNative().launchDetachedWorkflow(").length - 1, "the registered launch producers").toBe(PRODUCERS.length);
  });
});

/** The frozen shape of the pinned reader set: each case id with the count of collected tests it leads, one per line, in the comment's order. */
const PINNED_CASES = [
  "R341a:2",
  "R341b:8",
  "R341c:2",
  "R342a:1",
  "R342b:1",
  "R342c:1",
  "R344a:1",
  "R344b:1",
  "R344c:1",
  "R344d:1",
  "R344e:1",
  "R344f:1",
] as const;
/** Each claim sentence of the comment, verbatim. */
const CLAIM_SENTENCES: readonly string[] = [
  "through each producer: under a HOME that is a symlink to a private directory, the launch is admitted, the resolved base is a real directory owned by this uid at mode 0700 holding exactly the launched id, exactly one live host process names its boot pin under that base, and workflow_detached inspect reads the run completed with result 42.",
  "through each producer and under that symlinked HOME: a base at mode 0755, a world-writable ancestor of the resolved base, a base owned by a uid other than the operator's and a base replaced by a symlink each refuse the launch with the launcher's own Authorization words, reserve no invocation and start no host process.",
  "through each producer: an agent directory that does not exist refuses the launch with the ENOENT lstat words naming that directory, workflow_detached as its reply rather than a throw, reserving no invocation and starting no host process.",
  'a reviewed script returning "x".repeat(300 * 1024) reads terminal completed with no result and the typed omission resultOmitted exceeds-snapshot-bound, and its snapshot holds none of the 300 KiB.',
  "a reviewed script that throws reads terminal failed with its error as the diagnostic and no resultOmitted.",
  "a reviewed script returning 42 reads terminal completed with result 42 and no resultOmitted, and each R342 snapshot stays within DETACHED_MAX_FRAME_BYTES.",
  "inspect of an id no launch reserved reads transportLoss no-such-invocation with no terminal, no diagnostic and no reconcile hint, both before any detached root exists and beside another launched invocation.",
  "a host retired by SIGTERM reads transportLoss socket-missing with terminal unknown and the reconcile hint.",
  "a host killed by SIGKILL reads transportLoss connection-refused with terminal unknown and the reconcile hint.",
  "a host held stopped by SIGSTOP reads transportLoss transport-timeout with terminal unknown and the reconcile hint.",
  "an invocation directory reserved without a receipt reads transportLoss transport-failure with terminal unknown and the reconcile hint.",
  "a socket that closes the connection without answering reads transportLoss transport-failure with terminal unknown and the reconcile hint.",
];
