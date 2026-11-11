/**
 * wb-mo89, EAT-R482 (pi-system DX triage packet P14; requirement text in test/fixtures/dx-p14-requirements-roster.json): the
 * instrumented descendant fixture and its process-tree receipt.
 *
 * A disposable RF stand-in (a /bin/sh script, the only `rf` on a hermetic PATH) is launched by the real provider
 * (registerNativeReactiveFiberRender) through a real CapabilityRegistry whose deadline cuts the call. In the held-pipe trial
 * the stand-in starts one identified grandchild that keeps its stdout pipe (its stderr goes to /dev/null) and then execs
 * into a long sleep; in the no-grandchild trial it only execs into the sleep. The provider's stdout "pipe" is the UNIX
 * socketpair libuv makes for a child's stdio: the child's end is the socket at its fd 1, and the reading end is that
 * socket's peer (read from `ss -xH`), which this process holds. Each trial records, from /proc, ss and the registry: this
 * process (the parent), the direct child and the grandchild with each one's ppid and the stdout socket it holds as fd 1,
 * this process's end of that socketpair, a decoy process this suite starts itself with the same command (never the
 * child's descendant), the deadline, the direct child's disappearance, the grandchild's release of the stdout socket and
 * its exit (a process's fds close before /proc shows it gone), the reading end's closure, and the registry's inFlight
 * sampled every SAMPLE_MS until the slot settled (then on to the grandchild's exit) or the observation window expired.
 * Each trial is judged by judgeDescendantTrial (qa/workbench/dx-p14-acquisition-judge.mjs) and printed as one
 * RF_DESCENDANT_PIPE_RECEIPT line on the process stdout. Every process signalled here is one this suite's fixture started
 * and recorded by pid; there is no process sweep.
 */
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, readlinkSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { judgeDescendantTrial } from "../qa/workbench/dx-p14-acquisition-judge.mjs";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const DEADLINE_MS = 2_000;
const HOLD_SECONDS = 6;
const GRACE_MS = 1_000;
const WINDOW_MS = 30_000;
const SAMPLE_MS = 25;
const SLEEP = ["/usr/bin/sleep", "/bin/sleep"].find(path => existsSync(path)) ?? "/bin/sleep";
/** Resolved before a trial narrows PATH to the stand-in's directory. */
const SS = ["/usr/sbin/ss", "/sbin/ss", "/usr/bin/ss", "/bin/ss"].find(path => existsSync(path)) ?? "ss";
/** How long sampling continues after the slot settles, to observe the grandchild's /proc exit (its fds close first). */
const AFTER_SETTLE_MS = 3_000;
const PREVIEW = "reactivefiber.render.preview";

type Variant = "held-pipe" | "no-grandchild";
interface ProcessReading {
  readonly pid: number;
  readonly ppid: number | undefined;
  readonly stdout: string | undefined;
  readonly stderr?: string | undefined;
  /** For the grandchild: whether its /proc exe was the sleep binary when its fds were read. */
  readonly execd?: boolean;
}
/**
 * One sample, read in causal order: the slot, then this process's end of the stdout socketpair, then whether the grandchild
 * still holds its end as fd 1, then liveness. A settled slot follows the read end's closure, which follows the last
 * holder's release, so within one sample a later reading never shows an earlier state than the reading before it.
 */
interface Sample {
  readonly at: number;
  readonly inFlight: number;
  readonly readEndHeld: boolean;
  readonly grandchildHoldsStdout: boolean;
  readonly grandchildAlive: boolean;
  readonly childAlive: boolean;
}
interface Trial {
  readonly variant: Variant;
  readonly procfs: boolean;
  readonly standInSha256: string;
  readonly parent: { readonly pid: number };
  readonly child: ProcessReading;
  readonly grandchild?: ProcessReading;
  readonly decoy: ProcessReading;
  readonly readEnd: { readonly link: string | undefined; readonly held: boolean };
  readonly deadlineMs: number;
  readonly graceMs: number;
  readonly windowMs: number;
  readonly callerError: { readonly category: string; readonly message: string } | undefined;
  readonly deadlineAt: number | undefined;
  readonly childGoneAt: number | undefined;
  readonly grandchildReleasedAt: number | undefined;
  readonly grandchildGoneAt: number | undefined;
  readonly pipeClosedAt: number | undefined;
  readonly settledAt: number | undefined;
  readonly samples: readonly Sample[];
}

const pause = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
function statOf(pid: number): { state: string; ppid: number } | undefined {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    const fields = stat.slice(stat.lastIndexOf(")") + 2).split(" ");
    return { state: fields[0] ?? "", ppid: Number(fields[1]) };
  } catch {
    return undefined;
  }
}
const alive = (pid: number): boolean => {
  const stat = statOf(pid);
  return stat !== undefined && stat.state !== "Z";
};
function fdLink(pid: number | "self", fd: number | string): string | undefined {
  try {
    return readlinkSync(`/proc/${pid}/fd/${fd}`);
  } catch {
    return undefined;
  }
}
/** The peer of a UNIX socket, by inode, from `ss -xH` (local inode at field 5, peer inode at field 7), or undefined. */
function peerSocket(link: string | undefined): string | undefined {
  const inode = /^socket:\[(\d+)\]$/.exec(link ?? "")?.[1];
  if (inode === undefined) return undefined;
  const ss = spawnSync(SS, ["-xH"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 60_000 });
  const row = (ss.stdout ?? "").split("\n").map(line => line.trim().split(/\s+/)).find(fields => fields[5] === inode);
  return row?.[7] === undefined ? undefined : `socket:[${row[7]}]`;
}
function selfHolds(link: string | undefined): boolean {
  if (link === undefined) return false;
  try {
    return readdirSync("/proc/self/fd").some(fd => fdLink("self", fd) === link);
  } catch {
    return false;
  }
}

const oldPath = process.env.PATH;
const started: number[] = [];
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  for (const pid of started.splice(0)) {
    if (alive(pid)) process.kill(pid, "SIGTERM");
  }
  removeScratch(...scratches.splice(0));
});

/** Writes the stand-in `rf` for `variant` into a fresh scratch bin directory; returns that directory, its log path and the script's SHA-256. */
function standIn(variant: Variant): { bin: string; log: string; sha256: string } {
  const root = makeScratch("rf-descendant-pipe-");
  scratches.push(root);
  const bin = join(root, "bin");
  mkdirSync(bin);
  const log = join(root, "stand-in.log");
  const body = variant === "held-pipe"
    ? [`'${SLEEP}' ${HOLD_SECONDS} 2>/dev/null &`, `printf '%s %s\\n' "$$" "$!" > '${log}'`, `exec '${SLEEP}' 600`]
    : [`printf '%s\\n' "$$" > '${log}'`, `exec '${SLEEP}' 600`];
  const script = ["#!/bin/sh", ...body, ""].join("\n");
  writeFileSync(join(bin, "rf"), script);
  chmodSync(join(bin, "rf"), 0o700);
  return { bin, log, sha256: createHash("sha256").update(script).digest("hex") };
}

async function trial(variant: Variant): Promise<Trial> {
  const fixture = standIn(variant);
  const decoyProcess = spawn(SLEEP, [String(HOLD_SECONDS)], { stdio: "ignore" });
  // A failed decoy launch surfaces through its pid (-1) in the identity assertions, not as an unhandled error event.
  decoyProcess.on("error", () => {});
  const decoyPid = decoyProcess.pid ?? -1;
  started.push(decoyPid);
  process.env.PATH = fixture.bin;
  const registry = new CapabilityRegistry({ deadlineMs: DEADLINE_MS });
  registerNativeReactiveFiberRender(registry, join(fixture.bin, ".."));
  const origin = performance.now();
  const now = () => Math.round(performance.now() - origin);
  let deadlineAt: number | undefined;
  let callerError: Trial["callerError"];
  const call = registry.invoke(PREVIEW, { model: "m", task: "t" }, { grants: ["reactivefiber:render"], signal: new AbortController().signal }).then(
    () => { callerError = { category: "none", message: "the stand-in returned an answer" }; },
    (error: unknown) => {
      deadlineAt = now();
      callerError = error instanceof CapabilityError ? { category: error.category, message: error.message } : { category: "unknown", message: String(error) };
    },
  );
  // The stand-in logs its own pid ($$, the provider's direct child) and, in the held-pipe trial, its grandchild's ($!).
  const expected = variant === "held-pipe" ? 2 : 1;
  let logged: number[] = [];
  while (logged.length < expected && now() < DEADLINE_MS) {
    const text = existsSync(fixture.log) ? readFileSync(fixture.log, "utf8") : "";
    logged = /\n$/.test(text) ? text.trim().split(" ").map(Number) : [];
    if (logged.length < expected) await pause(5);
  }
  const [childPid = -1, grandchildPid] = logged;
  if (grandchildPid !== undefined) started.push(grandchildPid);
  // The stand-in logs $! as soon as it forks, before the forked shell has applied 2>/dev/null and exec'd its sleep; the
  // readback waits (bounded by the deadline) until the grandchild's /proc exe is the sleep binary, so its fds are final.
  const sleepBinary = realpathSync(SLEEP);
  const execd = (pid: number): boolean => {
    try {
      return realpathSync(`/proc/${pid}/exe`) === sleepBinary;
    } catch {
      return false;
    }
  };
  while (grandchildPid !== undefined && !execd(grandchildPid) && now() < DEADLINE_MS) await pause(5);
  const child: ProcessReading = { pid: childPid, ppid: statOf(childPid)?.ppid, stdout: fdLink(childPid, 1) };
  const grandchild: ProcessReading | undefined = grandchildPid === undefined ? undefined : { pid: grandchildPid, ppid: statOf(grandchildPid)?.ppid, stdout: fdLink(grandchildPid, 1), stderr: fdLink(grandchildPid, 2), execd: execd(grandchildPid) };
  const decoy: ProcessReading = { pid: decoyPid, ppid: statOf(decoyPid)?.ppid, stdout: fdLink(decoyPid, 1) };
  const readEndLink = peerSocket(child.stdout);
  const readEnd = { link: readEndLink, held: selfHolds(readEndLink) };
  const samples: Sample[] = [];
  let childGoneAt: number | undefined;
  let grandchildReleasedAt: number | undefined;
  let grandchildGoneAt: number | undefined;
  let pipeClosedAt: number | undefined;
  let settledAt: number | undefined;
  const grandchildPending = () => grandchildPid !== undefined && grandchildGoneAt === undefined;
  // Sampling runs until the slot settles, then on until one sample stands at or past the grace point after the child's
  // disappearance (so the judge's inFlightAtGrace has a sample in both trials, however slowly a pause returns under load)
  // and, bounded, until the grandchild's /proc exit is seen; the observation window bounds all of it.
  const observing = (): boolean => {
    if (settledAt === undefined) return true;
    const gone = childGoneAt;
    const graceDue = gone !== undefined && !samples.some(sample => sample.at >= gone + GRACE_MS);
    return graceDue || (grandchildPending() && now() < settledAt + AFTER_SETTLE_MS);
  };
  while (now() < WINDOW_MS && observing()) {
    const at = now();
    const inFlight = registry.admission().inFlight;
    const readEndHeld = selfHolds(readEndLink);
    const grandchildHoldsStdout = grandchildPid !== undefined && child.stdout !== undefined && fdLink(grandchildPid, 1) === child.stdout;
    const sample: Sample = { at, inFlight, readEndHeld, grandchildHoldsStdout, grandchildAlive: grandchildPid !== undefined && alive(grandchildPid), childAlive: alive(childPid) };
    samples.push(sample);
    if (childGoneAt === undefined && !sample.childAlive) childGoneAt = at;
    if (grandchildPid !== undefined && grandchildReleasedAt === undefined && !sample.grandchildHoldsStdout) grandchildReleasedAt = at;
    if (grandchildPid !== undefined && grandchildGoneAt === undefined && !sample.grandchildAlive) grandchildGoneAt = at;
    if (pipeClosedAt === undefined && !sample.readEndHeld) pipeClosedAt = at;
    if (settledAt === undefined && sample.inFlight === 0) settledAt = at;
    await pause(SAMPLE_MS);
  }
  await call;
  process.env.PATH = oldPath;
  const result: Trial = {
    variant, procfs: existsSync("/proc/self/stat"), standInSha256: fixture.sha256, parent: { pid: process.pid }, child,
    ...(grandchild === undefined ? {} : { grandchild }), decoy, readEnd,
    deadlineMs: DEADLINE_MS, graceMs: GRACE_MS, windowMs: WINDOW_MS, callerError,
    deadlineAt, childGoneAt, grandchildReleasedAt, grandchildGoneAt, pipeClosedAt, settledAt, samples,
  };
  const { samples: kept, ...summary } = result;
  process.stdout.write(`\nRF_DESCENDANT_PIPE_RECEIPT ${JSON.stringify({ ...summary, sampleCount: kept.length, judged: judgeDescendantTrial(result) })}\n`);
  return result;
}

/** The processes whose ppid, read while the direct child lived, is the direct child: its owned descendants among those this suite recorded. */
function ownedDescendants(run: Trial): number[] {
  return [run.grandchild, run.decoy].filter((reading): reading is ProcessReading => reading !== undefined && reading.ppid === run.child.pid).map(reading => reading.pid);
}

describe("EAT-R482 RF descendant-pipe settlement (G-DESCENDANT-PIPE)", () => {
  it("R482-C1-HELD: in the held-pipe trial the registry deadline answers the caller and the direct child is gone, yet the slot stays counted (inFlight 1) in every sample until the grandchild releases the stdout socket and the read end closes, and settles only after that closure; the grandchild's own exit is observed", async () => {
    const run = await trial("held-pipe");
    const judged = judgeDescendantTrial(run);
    expect(judged).toMatchObject({ status: "measured", requirement: "EAT-R482", variant: "held-pipe", inFlightAtGrace: 1, settled: true, windowExpired: false });
    expect(run.callerError).toEqual({ category: "transport", message: `Capability ${PREVIEW} exceeded its deadline of ${DEADLINE_MS}ms.` });
    const { deadlineAt, childGoneAt, grandchildReleasedAt, grandchildGoneAt, pipeClosedAt, settledAt } = run;
    if (deadlineAt === undefined || childGoneAt === undefined || grandchildReleasedAt === undefined || grandchildGoneAt === undefined || pipeClosedAt === undefined || settledAt === undefined) {
      throw new Error("the held-pipe trial is missing a recorded time");
    }
    expect(deadlineAt).toBeGreaterThanOrEqual(DEADLINE_MS - 5);
    expect(childGoneAt).toBeGreaterThanOrEqual(DEADLINE_MS - 5);
    expect(grandchildReleasedAt).toBeGreaterThan(childGoneAt + GRACE_MS);
    expect(pipeClosedAt).toBeGreaterThanOrEqual(grandchildReleasedAt);
    expect(settledAt).toBeGreaterThanOrEqual(pipeClosedAt);
    expect(grandchildGoneAt).toBeGreaterThanOrEqual(grandchildReleasedAt);
    expect(run.samples.filter(sample => sample.at < pipeClosedAt).every(sample => sample.inFlight === 1)).toBe(true);
    const childGoneStdoutHeld = run.samples.filter(sample => !sample.childAlive && sample.grandchildHoldsStdout);
    expect(childGoneStdoutHeld.length).toBeGreaterThan(0);
    expect(childGoneStdoutHeld.every(sample => sample.inFlight === 1 && sample.readEndHeld && sample.grandchildAlive)).toBe(true);
  }, 60_000);

  it("R482-C2-NO-GRANDCHILD: in the no-grandchild trial the deadline answers the caller, the direct child disappears and the slot settles (inFlight 0) within the grace window of that disappearance", async () => {
    const run = await trial("no-grandchild");
    const judged = judgeDescendantTrial(run);
    expect(judged).toMatchObject({ status: "measured", requirement: "EAT-R482", variant: "no-grandchild", inFlightAtGrace: 0, settled: true, windowExpired: false });
    expect(run.callerError).toEqual({ category: "transport", message: `Capability ${PREVIEW} exceeded its deadline of ${DEADLINE_MS}ms.` });
    expect(run.grandchild).toBeUndefined();
    expect(run.childGoneAt).toBeGreaterThanOrEqual(DEADLINE_MS - 5);
    expect(judged.status === "measured" ? judged.settledAfterChildGoneMs : null).toBeLessThanOrEqual(GRACE_MS);
  }, 60_000);

  it("R482-C3-IDENTITY: the receipt ties the direct child to this process and the stand-in, shows the grandchild is the child's own descendant holding the same stdout socket as fd 1 (stderr /dev/null) whose peer end this process holds, and keeps the decoy this suite started out of the child's descendants", async () => {
    const run = await trial("held-pipe");
    expect(run.procfs).toBe(true);
    expect(run.standInSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(run.child.ppid).toBe(process.pid);
    expect(run.child.stdout).toMatch(/^socket:\[\d+\]$/);
    expect(run.grandchild?.ppid).toBe(run.child.pid);
    expect(run.grandchild?.execd).toBe(true);
    expect(run.grandchild?.stdout).toBe(run.child.stdout);
    expect(run.grandchild?.stderr).toBe("/dev/null");
    expect(run.readEnd.link).toMatch(/^socket:\[\d+\]$/);
    expect(run.readEnd.link).not.toBe(run.child.stdout);
    expect(run.readEnd.held).toBe(true);
    expect(run.decoy.ppid).toBe(process.pid);
    expect(run.decoy.pid).not.toBe(run.grandchild?.pid);
    expect(ownedDescendants(run)).toEqual([run.grandchild?.pid]);
  }, 60_000);

  it("R482-C3-BLOCKED: the trial judge reads BLOCKED on G-DESCENDANT-PIPE, naming what is absent, for no trial, a trial without process-tree readback, a held-pipe trial without its grandchild, a trial without the read-end readback, a trial without samples and one without the child's disappearance time; a complete trial with no settlement reads window-expired, never settled", () => {
    const blocked = (missing: string[]) => ({ status: "BLOCKED", requirement: "EAT-R482", gate: "G-DESCENDANT-PIPE", missing });
    const base = {
      variant: "held-pipe", procfs: true, child: { pid: 10, stdout: "socket:[1]" }, grandchild: { pid: 11, stdout: "socket:[1]" }, readEnd: { link: "socket:[2]", held: true },
      samples: [{ at: 0, inFlight: 1 }], deadlineAt: 2000, childGoneAt: 2010, graceMs: GRACE_MS,
    };
    expect(judgeDescendantTrial(base)).toMatchObject({ status: "measured", settled: false, windowExpired: true });
    expect(judgeDescendantTrial(undefined)).toEqual(blocked(["instrumented descendant fixture", "process-tree readback"]));
    expect(judgeDescendantTrial({ ...base, procfs: false })).toEqual(blocked(["process-tree readback"]));
    expect(judgeDescendantTrial({ ...base, grandchild: undefined })).toEqual(blocked(["grandchild pid and stdout readback"]));
    expect(judgeDescendantTrial({ ...base, readEnd: { link: undefined, held: false } })).toEqual(blocked(["read-end readback"]));
    expect(judgeDescendantTrial({ ...base, samples: [] })).toEqual(blocked(["registry inFlight samples"]));
    expect(judgeDescendantTrial({ ...base, childGoneAt: undefined })).toEqual(blocked(["direct child disappearance time"]));
  });
});
