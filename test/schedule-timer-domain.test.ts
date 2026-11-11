/**
 * wb-z8hg (DX P11), EAT-R379 "Reject schedules outside the timer domain" (docs/workbench/programs/pi-system-dx-triage-2026-11-11,
 * requirements/.work/req-r-platform.md at 0a5ac3a3; audited basis C248, C249 and C267 ESTABLISHED at ce180d82). Statement, quoted:
 * "Schedule admission MUST reject durations outside a finite supported timer domain before storing or arming a job."
 * Acceptance criteria, quoted:
 *   1. "Assert interval and relative delay are safe integers in 1000..2147483647 ms; zero, negative/overflow arithmetic, 30d, +30d
 *      and +99999999999d refuse with the bound named and zero jobs/timers/spawns."
 *   2. "Assert an absolute future delay beyond the same bound refuses before setTimeout; past ISO still refuses before record
 *      creation."
 *   3. "Assert valid boundary values arm without TimeoutOverflowWarning using fake timers, and README/schema describe the actual
 *      supported bound."
 * Why: Node's setTimeout and setInterval replace any delay above 2^31-1 ms with 1 ms, so a "30d" interval spawned every ~1 ms and
 * "+30d" fired at once (C248); a "0m" interval was stored as an enabled job that can never fire (C249); a past ISO time is refused
 * before any record exists (C267, preserved). The domain is src/schedule.ts SCHEDULE_DELAY_MIN_MS..SCHEDULE_DELAY_MAX_MS.
 *
 * Pinned reader set (case id: assertion target -> result at the cut):
 *   T1 SubagentScheduler.addJob under fake timers, every interval of OUT_OF_DOMAIN_INTERVALS -> throws naming 1000..2147483647 ms;
 *      no stored job, no armed timer, no spawn after 25 ms of fake time (an overflowed timer fires after 1 ms), no
 *      subagents:scheduled event
 *   T2 the same for every relative one-shot of OUT_OF_DOMAIN_RELATIVES
 *   T3 addJob under fake timers, every value of IN_DOMAIN_DURATIONS (the domain's edges in each unit, both forms) -> stored, with
 *      exactly one armed timer (the positive control against a false deny)
 *   T4 the Agent tool the booted extension registers, schedule 30d, +30d, +99999999999d and 0m -> each reply names
 *      1000..2147483647 ms, no job is persisted in the session's schedule store, no subagents:scheduled event
 *   T5 src/schedule.ts's domain constants equal the criterion's 1000 and 2^31-1 ms; addJob under fake timers, an ISO time exactly
 *      2147483647 ms ahead -> stored with one armed timer; 2147483648 ms ahead -> throws naming at most 2147483647 ms, no stored
 *      job, no timer, no spawn, no subagents:scheduled event
 *   T6 addJob, an ISO time 1 ms and 60 s in the past -> still throws "is in the past" and stores nothing
 *   T7 start() over a store already holding an enabled 2592000000 ms interval and an enabled one-shot 30 days ahead -> no timer,
 *      no spawn after 25 ms of fake time; each record disabled with lastStatus error, and one error event per record, in store
 *      order, naming at most 2147483647 ms
 *   T8 fake timers, every value of BOUNDARY_SCHEDULES -> no spawn 1 ms before the value's own delay, exactly one at it
 *   T9 real timers, arming every value of BOUNDARY_SCHEDULES -> process.emitWarning receives TimeoutOverflowWarning zero times;
 *      a planted 2147483648 ms setTimeout -> once (the positive control of the same counter)
 *   T10 README.md "Schedule formats" -> the Interval and One-shot relative bullets name 1000..2147483647 ms, the One-shot
 *      absolute bullet names at most 2147483647 ms
 *   T11 the schedule parameter description of the Agent tool the booted extension registers -> names 1000..2147483647 ms
 * isError on the Agent tool's refusal reply is NOT CLAIMED by this census (EAT-R383 owns the refusal channel).
 * The 1000 ms floor for a record written outside admission (an updateJob patch or a hand-edited store) is NOT CLAIMED by this
 * census: T7 judges only the ceiling at arming, and test/schedule-e2e.test.ts arms a 100 ms interval through updateJob.
 * A cron expression's period is NOT CLAIMED by this census (croner splits its own long waits).
 * A schedule spelling outside the duration grammar [+][-]<digits><s|m|h|d> and the ISO and cron forms is NOT CLAIMED by this census.
 * Scheduled-fire concurrency (bypassQueue) is NOT CLAIMED by this census.
 * EAT-R376..R378, R380..R386 and R388 of wb-z8hg are NOT CLAIMED by this census.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";
import type { AgentManager } from "../src/agent-manager.js";
import subagentsExtension from "../src/index.js";
import { type NewJobInput, SCHEDULE_DELAY_MAX_MS, SCHEDULE_DELAY_MIN_MS, type ScheduleChangeEvent, SubagentScheduler } from "../src/schedule.js";
import { resolveStorePath, ScheduleStore } from "../src/schedule-store.js";
import type { ScheduledSubagent } from "../src/types.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** The criterion's domain, spelled as the criterion spells it; T5 holds src/schedule.ts's constants to it. */
const FLOOR_MS = 1000;
const CEILING_MS = 2_147_483_647;
/** What a duration refusal names (criterion 1: "refuse with the bound named"). */
const BOUND = "1000..2147483647 ms";
/** What an absolute or stored-record refusal names: the same domain's ceiling. */
const CEILING = "at most 2147483647 ms";
const DAY_MS = 86_400_000;
const SESSION_ID = "timer-domain-session";

/**
 * Intervals outside the domain: zero in two units, each unit's first value past the ceiling, the criterion's 30d and
 * 99999999999d, a negative, and two digit runs whose product overflows (past 2^53, and past Number.MAX_VALUE to Infinity).
 */
const OUT_OF_DOMAIN_INTERVALS = ["0s", "0m", "2147484s", "35792m", "597h", "25d", "30d", "99999999999d", "-5m", "9007199254740993s", `${"9".repeat(400)}s`];
/** The same values as relative one-shots ("+30d", "+99999999999d", "+-5m", ...). */
const OUT_OF_DOMAIN_RELATIVES = OUT_OF_DOMAIN_INTERVALS.map((value) => `+${value}`);
/** The domain's edges in each unit, as intervals and as relative one-shots: the floor 1s, and the largest value under the ceiling. */
const IN_DOMAIN_DURATIONS = ["1s", "2147483s", "35791m", "596h", "24d", "+1s", "+2147483s", "+35791m", "+596h", "+24d"];

/** A schedule T8 times and T9 arms: its spelling (an ISO time is computed when used, from the clock then) and its own delay. */
interface BoundarySchedule {
  label: string;
  schedule: () => string;
  delayMs: number;
}
/** The floor and the largest whole-second delay in both duration forms, and an absolute time exactly at the ceiling. */
const BOUNDARY_SCHEDULES: readonly BoundarySchedule[] = [
  { label: "1s", schedule: () => "1s", delayMs: 1000 },
  { label: "+1s", schedule: () => "+1s", delayMs: 1000 },
  { label: "2147483s", schedule: () => "2147483s", delayMs: 2_147_483_000 },
  { label: "+2147483s", schedule: () => "+2147483s", delayMs: 2_147_483_000 },
  { label: "ISO at the ceiling", schedule: () => isoAhead(CEILING_MS), delayMs: CEILING_MS },
];

/** README.md, read from this file's location (T4 and T11 move the process cwd into a sandbox). */
const README = readFileSync(fileURLToPath(new URL("../README.md", import.meta.url)), "utf8");

function isoAhead(ms: number): string {
  return new Date(Date.now() + ms).toISOString();
}

function newJob(schedule: string): NewJobInput {
  return { name: `timer domain ${schedule.slice(0, 32)}`, description: "timer domain", schedule, subagent_type: "general-purpose", prompt: "p" };
}

interface Harness {
  scheduler: SubagentScheduler;
  store: ScheduleStore;
  spawn: Mock<() => string>;
  /** The subagents:scheduled events the scheduler emitted, in order. */
  scheduled(): ScheduleChangeEvent[];
}

const opened: Array<{ scheduler: SubagentScheduler; dir: string }> = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;

/** A started scheduler over a fresh store (seeded first, as a reloaded session's store is), a counting manager and a recording pi. */
function harness(seed: readonly ScheduledSubagent[] = []): Harness {
  const dir = makeScratch("schedule-timer-domain-");
  const store = new ScheduleStore(join(dir, "schedules.json"));
  for (const job of seed) store.add(job);
  const emit = vi.fn<(event: string, payload: unknown) => void>();
  const pi = { events: { emit } } as unknown as ExtensionAPI;
  const context = { cwd: dir, modelRegistry: { find: vi.fn(), getAll: () => [], getAvailable: () => [] } } as unknown as ExtensionContext;
  let launched = 0;
  const spawn = vi.fn((): string => `agent-${++launched}`);
  const manager = {
    spawn,
    awaitStartup: vi.fn(async () => {}),
    getRecord: vi.fn(() => ({ status: "completed", promise: Promise.resolve("") })),
  } as unknown as AgentManager;
  const scheduler = new SubagentScheduler();
  opened.push({ scheduler, dir });
  scheduler.start(pi, context, manager, store);
  return {
    scheduler,
    store,
    spawn,
    scheduled: () => emit.mock.calls.filter(([event]) => event === "subagents:scheduled").map(([, payload]) => payload as ScheduleChangeEvent),
  };
}

interface RegisteredAgentTool {
  parameters: { properties: Record<string, { description?: string }> };
  execute(id: string, params: Record<string, unknown>, signal: undefined, onUpdate: undefined, context: unknown): Promise<unknown>;
}

/** Boots the REAL extension in a hermetic sandbox and returns its registered Agent tool. */
function bootAgentTool(): { booted: ReturnType<typeof makePi>; agent: RegisteredAgentTool } {
  sandbox?.restore();
  sandbox = hermeticDir();
  const booted = makePi();
  subagentsExtension(booted.pi);
  const agent: RegisteredAgentTool | undefined = booted.tools.get("Agent");
  if (agent === undefined) throw new Error("the Agent tool is not registered");
  return { booted, agent };
}

afterEach(() => {
  for (const { scheduler, dir } of opened.splice(0)) {
    scheduler.stop();
    removeScratch(dir);
  }
  vi.useRealTimers();
  vi.restoreAllMocks();
  sandbox?.restore();
  sandbox = undefined;
});

describe("EAT-R379 criterion 1: a duration outside 1000..2147483647 ms is refused naming the bound, with zero jobs, timers and spawns", () => {
  it("T1 every out-of-domain interval is refused naming the bound before anything is stored, armed or spawned", () => {
    vi.useFakeTimers();
    for (const schedule of OUT_OF_DOMAIN_INTERVALS) {
      const h = harness();
      expect(() => h.scheduler.addJob(newJob(schedule)), schedule).toThrow(BOUND);
      expect(h.store.list(), schedule).toEqual([]);
      expect(vi.getTimerCount(), schedule).toBe(0);
      vi.advanceTimersByTime(25);
      expect(h.spawn, schedule).not.toHaveBeenCalled();
      expect(h.scheduled(), schedule).toEqual([]);
    }
  });

  it("T2 every out-of-domain relative one-shot is refused naming the bound before anything is stored, armed or spawned", () => {
    vi.useFakeTimers();
    for (const schedule of OUT_OF_DOMAIN_RELATIVES) {
      const h = harness();
      expect(() => h.scheduler.addJob(newJob(schedule)), schedule).toThrow(BOUND);
      expect(h.store.list(), schedule).toEqual([]);
      expect(vi.getTimerCount(), schedule).toBe(0);
      vi.advanceTimersByTime(25);
      expect(h.spawn, schedule).not.toHaveBeenCalled();
      expect(h.scheduled(), schedule).toEqual([]);
    }
  });

  it("T3 every in-domain interval and relative one-shot at the domain's edges is stored and armed with exactly one timer", () => {
    vi.useFakeTimers();
    for (const schedule of IN_DOMAIN_DURATIONS) {
      const h = harness();
      const job = h.scheduler.addJob(newJob(schedule));
      expect(
        h.store.list().map((stored) => stored.id),
        schedule,
      ).toEqual([job.id]);
      expect(vi.getTimerCount(), schedule).toBe(1);
      h.scheduler.stop();
    }
  });

  it("T4 the registered Agent tool answers 30d, +30d, +99999999999d and 0m naming the bound and persists no job", async () => {
    const { booted, agent } = bootAgentTool();
    const context = ctx({ cwd: sandbox?.dir, sessionManager: { getSessionId: vi.fn(() => SESSION_ID), getBranch: vi.fn(() => []) } });
    await booted.lifecycle.get("session_start")?.({}, context);
    const replies: Array<[string, string]> = [];
    for (const schedule of ["30d", "+30d", "+99999999999d", "0m"]) {
      const params = { prompt: "p", description: `timer domain ${schedule}`, subagent_type: "general-purpose", schedule };
      replies.push([schedule, textOf(await agent.execute(`timer-domain-${schedule}`, params, undefined, undefined, context))]);
    }
    const persisted = new ScheduleStore(resolveStorePath(context.cwd, SESSION_ID)).list();
    const scheduled = (booted.pi.events.emit as Mock<(event: string, payload: unknown) => void>).mock.calls.filter(([event]) => event === "subagents:scheduled");
    await booted.lifecycle.get("session_shutdown")?.();
    for (const [schedule, reply] of replies) expect(reply, schedule).toContain(BOUND);
    expect(persisted).toEqual([]);
    expect(scheduled).toEqual([]);
  });
});

describe("EAT-R379 criterion 2: an absolute time past the ceiling refuses before setTimeout, and a past ISO still refuses before any record", () => {
  it("T5 an ISO time exactly 2147483647 ms ahead is stored and armed, and 2147483648 ms ahead is refused naming the ceiling with nothing stored, armed or spawned", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-11T00:00:00.000Z"));
    const atCeiling = harness();
    const admitted = atCeiling.scheduler.addJob(newJob(isoAhead(CEILING_MS)));
    expect(atCeiling.store.list().map((stored) => stored.id)).toEqual([admitted.id]);
    expect(vi.getTimerCount()).toBe(1);
    atCeiling.scheduler.stop();
    const beyond = harness();
    expect(() => beyond.scheduler.addJob(newJob(isoAhead(CEILING_MS + 1)))).toThrow(CEILING);
    expect(beyond.store.list()).toEqual([]);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(25);
    expect(beyond.spawn).not.toHaveBeenCalled();
    expect(beyond.scheduled()).toEqual([]);
    expect([SCHEDULE_DELAY_MIN_MS, SCHEDULE_DELAY_MAX_MS], "src/schedule.ts's domain is the criterion's").toEqual([FLOOR_MS, CEILING_MS]);
  });

  it("T6 an ISO time 1 ms or 60 s in the past is still refused as in the past before any record exists", () => {
    for (const offsetMs of [-1, -60_000]) {
      const h = harness();
      expect(() => h.scheduler.addJob(newJob(isoAhead(offsetMs))), String(offsetMs)).toThrow(/is in the past/);
      expect(h.store.list(), String(offsetMs)).toEqual([]);
    }
  });

  it("T7 start() leaves a stored interval and one-shot already past the ceiling unarmed: each disabled with lastStatus error and one error event naming the ceiling", () => {
    vi.useFakeTimers();
    const createdAt = new Date().toISOString();
    const seeds: ScheduledSubagent[] = [
      { id: "stored-interval", name: "stored interval", description: "x", schedule: "30d", scheduleType: "interval", intervalMs: 30 * DAY_MS, subagent_type: "general-purpose", prompt: "p", enabled: true, createdAt, runCount: 0 },
      { id: "stored-once", name: "stored once", description: "x", schedule: isoAhead(30 * DAY_MS), scheduleType: "once", subagent_type: "general-purpose", prompt: "p", enabled: true, createdAt, runCount: 0 },
    ];
    const h = harness(seeds);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(25);
    expect(h.spawn).not.toHaveBeenCalled();
    for (const seed of seeds) expect(h.store.get(seed.id), seed.id).toMatchObject({ enabled: false, lastStatus: "error" });
    const errors = h.scheduled().flatMap((event) => (event.type === "error" ? [event] : []));
    expect(errors.map((event) => event.jobId)).toEqual(["stored-interval", "stored-once"]);
    for (const event of errors) expect(event.error, event.jobId).toContain(CEILING);
  });
});

describe("EAT-R379 criterion 3: boundary values arm without overflow, and README and the schedule schema state the bound", () => {
  it("T8 under fake timers every boundary schedule fires its first spawn at its own delay, never 1 ms after arming", () => {
    vi.useFakeTimers();
    for (const { label, schedule, delayMs } of BOUNDARY_SCHEDULES) {
      const h = harness();
      h.scheduler.addJob(newJob(schedule()));
      vi.advanceTimersByTime(delayMs - 1);
      expect(h.spawn, `${label}: 1 ms before its delay`).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(h.spawn, `${label}: at its delay`).toHaveBeenCalledTimes(1);
      h.scheduler.stop();
    }
  });

  it("T9 arming every boundary schedule on real timers raises no TimeoutOverflowWarning, while a planted 2147483648 ms timeout raises one", () => {
    const emitWarning = vi.spyOn(process, "emitWarning").mockImplementation(() => {});
    // Node's timers call process.emitWarning(message, "TimeoutOverflowWarning"); the spy's overload types that argument as options.
    const overflowWarnings = () => emitWarning.mock.calls.filter((args: readonly unknown[]) => args[1] === "TimeoutOverflowWarning").length;
    for (const { schedule } of BOUNDARY_SCHEDULES) {
      const h = harness();
      h.scheduler.addJob(newJob(schedule()));
      h.scheduler.stop();
    }
    expect(overflowWarnings(), "the boundary schedules").toBe(0);
    clearTimeout(setTimeout(() => {}, CEILING_MS + 1));
    expect(overflowWarnings(), "the planted overflow").toBe(1);
  });

  it("T10 README's Schedule formats name the bound for intervals and relative one-shots and the ceiling for absolute ones", () => {
    const formats = README.slice(README.indexOf("Schedule formats:")).split("\n");
    const bullet = (label: string) => formats.find((line) => line.startsWith(`- **${label}**`)) ?? "";
    expect(bullet("Interval")).toContain(BOUND);
    expect(bullet("One-shot relative")).toContain(BOUND);
    expect(bullet("One-shot absolute")).toContain(CEILING);
  });

  it("T11 the registered Agent tool's schedule parameter description names the bound", () => {
    const { agent } = bootAgentTool();
    expect(agent.parameters.properties.schedule?.description ?? "").toContain(BOUND);
  });
});
