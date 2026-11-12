/**
 * wb-yk1k (MII P03+ packet), cut #1: EAT-R399 criterion 1 only. Requirement text: docs/workbench/programs/
 * mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md at Pi master 347d58ea (the program pages
 * are master-only). The statement, line 254: "Admitted Mechanical function writers on one supported machine MUST acquire
 * ownership through one durable authoritative reservation store keyed by canonical root." Criterion 1, line 259:
 *   "Start two independent Pi processes with the same configured authoritative store, simultaneously requesting one
 *   realpath through direct/symlink/dot aliases. Exactly one acquires the writer reservation; the other receives
 *   writer-held (or the ratified bounded queue state), with aggregate writer count one."
 * The negative mutant, line 262: "Replace the authoritative store with new WriterLeases per process; the dual-process
 * alias test must detect two writers." Line 263 names the planned evidence label G07-CROSS-PID-RESERVATION; this file is
 * that label's criterion 1 leg, at evidence tier V1 only.
 *
 * The trial. Every race runs two child Node processes (CHILD below, run with --experimental-transform-types and a resolve
 * hook that maps a relative ".js" import to its ".ts" source) that import the REAL src/workbench/source-admission.ts.
 * Each child builds its own registry - new WriterLeases({ store }) over the race's store directory, or new WriterLeases()
 * where a case says so - prints READY and waits on its stdin. Once both children are READY the parent writes GO to each
 * child's stdin, one after the other, and each child then makes its one request through its own spelling of ws, a
 * committed Git repository in tracked scratch: its direct path, the symlink ws-link beside it, or the dot spelling
 * <authorized>/./ws. A child reports what it got on stdout and holds it, releasing nothing, until the parent writes
 * FINISH. Each race over a store uses a fresh store directory. R399-C1-STORE and R399-C1-ADMISSION each run one race for
 * each unordered pair of the three spellings (ALIAS_PAIRS), the first spelling of a pair in the child that runs inv-a and
 * the second in the child that runs inv-b.
 *
 * PINNED READER SET (case id: reader, what it asserts):
 *   R399-C1-STORE: WriterLeases acquire, in the two children of a race over one store, each on its spelling of ws: exactly
 *     one child gets a lease, equal to { canonicalRoot: the realpath of ws, invocationId: that child's invocation }, the
 *     other gets undefined, both children exit 0, and holder, read in the parent through a third registry over the same
 *     store, names the lease's invocation for each of the three spellings.
 *   R399-C1-ADMISSION: admitSourceWrite, in the two children of a race over one store, each child admitting its own
 *     invocation on its spelling of ws under its own authority's attestation of ws's measured identity, with a dispatch
 *     that reports ENTERED with its grant's lease and then waits for FINISH: exactly one child enters its dispatch, with
 *     the lease { canonicalRoot: the realpath of ws, invocationId: that child's invocation }, the other admission returns
 *     the whole writer-held refusal and never enters, so ENTERED is reported once across the two children; after FINISH
 *     the entered admission returns { decision: "dispatched", value: "wrote" } and both children exit 0.
 *   R399-C1-DETECTOR: the R399-C1-ADMISSION race over one pair (direct, symlink) with new WriterLeases() in each child and no
 *     store, the per-process registry of the named mutant: both children enter their dispatch, each with the lease
 *     { canonicalRoot: the realpath of ws, invocationId: its own invocation }, so the harness's ENTERED count reads 2 in a
 *     race where both processes write, and both admissions return { decision: "dispatched", value: "wrote" }.
 *   R399-C1-SHAPE: test/fixtures/mii-r399-requirement.json vendors EAT-R399's lines 250-272 at 347d58ea, the anchor outside
 *     this file's literals: the statement, criterion 1 and negative mutant this header quotes equal the vendored lines, and
 *     the header names the vendored commit; ALIAS_KINDS equals the alias kinds the vendored criterion 1 names (direct,
 *     symlink and dot); and ALIAS_PAIRS equals the frozen list direct+symlink, direct+dot, symlink+dot, which is each
 *     unordered pair of those kinds once.
 *   ROSTER: the tests this file registers are exactly the ROSTER titles, in order, each in run mode and none marked to fail,
 *     ROSTER registered last; the leading ids of their titles are exactly the ids that open this PINNED READER SET's
 *     bullets, read from this file's own source.
 * NOT CLAIMED by this census: EAT-R399 criteria 2 and 3 (a fresh process reading the persisted owner, generation and
 * custody state; a second registry in one process; the receipt's store facts; restart; acquisition-store failure). When
 * and how a reservation is released (EAT-R400, EAT-R403) is NOT CLAIMED by this census. The bead's other rows (EAT-R400
 * to EAT-R411, EAT-R427, EAT-R464) are NOT CLAIMED by this census. A Pi session, an extension host or the registered
 * workflow_execute route (V3), and any fault trial (V5), are NOT CLAIMED by this census. More than two processes, any
 * spelling other than the three, letter-case, hard-link and bind-mount aliases, nested or overlapping roots, and any file
 * system other than the scratch directory's are NOT CLAIMED by this census. Which child wins a race, and how close
 * together the two requests run, are NOT CLAIMED by this census. Power-loss durability is NOT CLAIMED by this census.
 * RESIDUAL: none claimed.
 */
import { type ChildProcess, execFileSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WriterLeases } from "../src/workbench/source-admission.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

vi.setConfig({ testTimeout: 240_000 });

const THIS_FILE = fileURLToPath(import.meta.url);
const ROOT = realpathSync(resolve(dirname(THIS_FILE), ".."));
const MODULE = join(ROOT, "src", "workbench", "source-admission.ts");
const NODE_FLAGS = ["--experimental-transform-types", "--disable-warning=ExperimentalWarning", "--input-type=module", "-e"];
/** How long one child may take to report an event before the race fails with its stderr. */
const EVENT_MS = 180_000;
const INVOCATIONS = ["inv-a", "inv-b"] as const;
/** EAT-R399's section of the program's ATOMIC-REQUIREMENTS.md, vendored line by line with its commit and blob. */
interface RequirementFixture {
  readonly commit: string;
  readonly requirement: { readonly id: string; readonly lines: string; readonly text: readonly string[] };
}
const REQUIREMENT = JSON.parse(readFileSync(join(ROOT, "test", "fixtures", "mii-r399-requirement.json"), "utf8")) as RequirementFixture;
const WRITER_HELD = { decision: "refused", code: "writer-held", reason: "the writer lease of this canonical workspace is held" } as const;
const DISPATCHED = { decision: "dispatched", value: "wrote" } as const;

/** The criterion's alias kinds, each spelled for ws by spellingOf. */
const ALIAS_KINDS = ["direct", "symlink", "dot"] as const;
type AliasKind = (typeof ALIAS_KINDS)[number];
/** Each unordered pair of the alias kinds once: the first runs in inv-a's child, the second in inv-b's. */
const ALIAS_PAIRS: readonly (readonly [AliasKind, AliasKind])[] = [
  ["direct", "symlink"],
  ["direct", "dot"],
  ["symlink", "dot"],
];

/** Every test this file registers, in registration order (the ROSTER case reads vitest's task tree against it). */
const ROSTER = [
  "R399-C1-STORE two children over one store, released together, acquire ws through each pair of its direct, symlink and dot spellings: exactly one gets a lease naming the realpath and its own invocation, the other gets undefined, and holder read in the parent names that invocation through every spelling",
  "R399-C1-ADMISSION two children running admitSourceWrite over one store, released together, on each pair of ws's spellings: exactly one enters its dispatch with a lease naming the realpath, the other refuses writer-held without entering, and the entered write then dispatches",
  "R399-C1-DETECTOR the same admission race with new WriterLeases() in each child, the named mutant's per-process registry, enters both dispatches, so the race reads two writers when two exist",
  "R399-C1-SHAPE this header's statement, criterion 1 and negative-mutant quotes equal the vendored EAT-R399 lines, ALIAS_KINDS are the alias kinds the vendored criterion 1 names, and ALIAS_PAIRS is the frozen list, each unordered pair of them once",
  "ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail, ROSTER last, and their leading ids are the ids of this file's PINNED READER SET bullets",
] as const;

/** The child: the real source-admission.ts module, one request on GO, held until FINISH. */
const CHILD = `
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { createInterface } from "node:readline";
import { fileURLToPath, pathToFileURL } from "node:url";
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && specifier.endsWith(".js") && context.parentURL?.startsWith("file:")) {
      const source = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(source))) return { url: source.href, format: "module-typescript", shortCircuit: true };
    }
    const result = nextResolve(specifier, context);
    return result.url.startsWith("file:") && result.url.endsWith(".ts") ? { ...result, format: "module-typescript" } : result;
  },
});
const plan = JSON.parse(process.env.R399_PLAN);
const { WriteBoundaryAuthority, WriterLeases, admitSourceWrite, measureSourceIdentity } = await import(pathToFileURL(plan.module).href);
const say = (tag, value) => process.stdout.write(tag + " " + JSON.stringify(value === undefined ? null : value) + "\\n");
const lines = createInterface({ input: process.stdin })[Symbol.asyncIterator]();
const line = async () => (await lines.next()).value;
const git = (directory, args) => {
  try {
    return execFileSync("git", ["-C", directory, ...args], { encoding: "buffer", stdio: ["ignore", "pipe", "ignore"], timeout: 60000 });
  } catch {
    return undefined;
  }
};
const leases = plan.store === null ? new WriterLeases() : new WriterLeases({ store: plan.store });
let host;
if (plan.mode === "admission") {
  const authority = new WriteBoundaryAuthority();
  const measured = measureSourceIdentity(plan.canonical, "forge.toml", git);
  if (measured.decision !== "measured") {
    say("SETUP", measured.code);
    process.exit(3);
  }
  host = { authorizedRoot: plan.authorized, gateManifest: "forge.toml", git, authority, attestation: authority.attest("operator-1", measured.identity), leases };
}
say("READY", process.pid);
if ((await line()) !== "GO") process.exit(4);
if (plan.mode === "store") {
  say("RESULT", leases.acquire(plan.spelling, plan.invocationId));
  await line();
} else {
  const outcome = await admitSourceWrite({ invocationId: plan.invocationId, workspace: plan.spelling, policy: { allowWrites: true } }, host, async grant => {
    say("ENTERED", { canonicalRoot: grant.lease.canonicalRoot, invocationId: grant.lease.invocationId });
    await line();
    return "wrote";
  });
  say("RESULT", outcome.decision === "dispatched" ? { decision: outcome.decision, value: outcome.value } : outcome);
  if (outcome.decision !== "dispatched") await line();
}
process.exit(0);
`;

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi Reservation Fixture", "-c", "user.email=reservation-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];
const CLEAN_ENV: NodeJS.ProcessEnv = Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name)));

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, env: CLEAN_ENV, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

/** A committed repository holding README.md and the gate manifest forge.toml; its realpath. */
function fixtureRepo(path: string): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q");
  writeFileSync(join(path, "README.md"), "# reservation fixture\n");
  writeFileSync(join(path, "forge.toml"), '[build]\ngate = ["test"]\n');
  git(path, "add", "README.md", "forge.toml");
  git(path, "commit", "-q", "--no-verify", "-m", "fixture base");
  return realpathSync(path);
}

interface ChildEvent {
  readonly tag: string;
  readonly value: unknown;
}
interface ChildExit {
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
}
interface RaceChild {
  readonly events: ChildEvent[];
  /** The first event at or after index `from` whose tag is one of `tags`. */
  next(tags: readonly string[], from: number): Promise<{ readonly event: ChildEvent; readonly index: number }>;
  send(line: string): void;
  readonly exited: Promise<ChildExit>;
  stop(): void;
}

interface ChildPlan {
  readonly mode: "store" | "admission";
  readonly store: string | null;
  readonly spelling: string;
  readonly invocationId: string;
}

let scratchDir: string;
let base: string;
let authorized: string;
let ws: string;
let races = 0;

function spellingOf(kind: AliasKind): string {
  if (kind === "direct") return ws;
  if (kind === "symlink") return join(authorized, "ws-link");
  return `${authorized}/./ws`;
}

function freshStore(): string {
  races += 1;
  const store = join(base, `store-${races}`);
  mkdirSync(store);
  return store;
}

/** One stdout line of a child: "<TAG> <json>"; a line that does not parse is kept whole as an UNPARSED event. */
function eventOf(text: string): ChildEvent {
  const space = text.indexOf(" ");
  if (space < 0) return { tag: text, value: null };
  try {
    return { tag: text.slice(0, space), value: JSON.parse(text.slice(space + 1)) };
  } catch {
    return { tag: "UNPARSED", value: text };
  }
}

function start(plan: ChildPlan): RaceChild {
  const payload = JSON.stringify({ module: MODULE, authorized, canonical: ws, ...plan });
  const child: ChildProcess = spawn(process.execPath, [...NODE_FLAGS, CHILD], { cwd: ROOT, env: { ...CLEAN_ENV, R399_PLAN: payload }, stdio: ["pipe", "pipe", "pipe"] });
  const events: ChildEvent[] = [];
  const waiters: Array<() => void> = [];
  let stdout = "";
  let stderr = "";
  let ended = false;
  const wake = (): void => {
    for (const waiter of waiters.splice(0)) waiter();
  };
  child.stdout?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => {
    stdout += chunk;
    let newline = stdout.indexOf("\n");
    while (newline >= 0) {
      const text = stdout.slice(0, newline);
      stdout = stdout.slice(newline + 1);
      events.push(eventOf(text));
      newline = stdout.indexOf("\n");
    }
    wake();
  });
  child.stderr?.setEncoding("utf8");
  child.stderr?.on("data", (chunk: string) => {
    stderr += chunk;
  });
  const exited = new Promise<ChildExit>(settle => {
    child.once("exit", (code, signal) => {
      ended = true;
      wake();
      settle({ code, signal });
    });
  });
  const next = (tags: readonly string[], from: number): Promise<{ readonly event: ChildEvent; readonly index: number }> =>
    new Promise((settle, fail) => {
      const timer = setTimeout(() => fail(new Error(`${plan.invocationId}: no ${tags.join("/")} within ${EVENT_MS} ms; events ${JSON.stringify(events)}; stderr ${stderr}`)), EVENT_MS);
      const check = (): void => {
        const index = events.findIndex((event, at) => at >= from && tags.includes(event.tag));
        const found = events[index];
        if (found !== undefined) {
          clearTimeout(timer);
          settle({ event: found, index });
        } else if (ended) {
          clearTimeout(timer);
          fail(new Error(`${plan.invocationId}: exited before ${tags.join("/")}; events ${JSON.stringify(events)}; stderr ${stderr}`));
        } else {
          waiters.push(check);
        }
      };
      check();
    });
  return {
    events,
    next,
    send: line => {
      child.stdin?.write(`${line}\n`);
    },
    exited,
    stop: () => {
      if (!ended) child.kill("SIGKILL");
    },
  };
}

interface RaceReading {
  /** Each child's first event after GO: RESULT, or ENTERED for an admission whose dispatch was entered. */
  readonly first: readonly ChildEvent[];
  /** Each child's events, read once it exited. */
  readonly events: readonly (readonly ChildEvent[])[];
  readonly exits: readonly ChildExit[];
}

/** One race: both children READY, GO to each, each child's first report, then FINISH to each and both exits. */
async function race(mode: "store" | "admission", store: string | null, pair: readonly [AliasKind, AliasKind]): Promise<RaceReading> {
  const children = pair.map((kind, index) => start({ mode, store, spelling: spellingOf(kind), invocationId: INVOCATIONS[index] ?? "inv-x" }));
  try {
    const ready = await Promise.all(children.map(child => child.next(["READY"], 0)));
    for (const child of children) child.send("GO");
    const first = await Promise.all(children.map((child, index) => child.next(["ENTERED", "RESULT"], (ready[index]?.index ?? 0) + 1)));
    for (const child of children) child.send("FINISH");
    const exits = await Promise.all(children.map(child => child.exited));
    return { first: first.map(found => found.event), events: children.map(child => [...child.events]), exits };
  } finally {
    for (const child of children) child.stop();
  }
}

function lastResult(events: readonly ChildEvent[]): unknown {
  return events.filter(event => event.tag === "RESULT").at(-1)?.value;
}

function enteredCount(reading: RaceReading): number {
  return reading.events.flat().filter(event => event.tag === "ENTERED").length;
}

/** This file's PINNED READER SET bullet ids, in order, read from its own header. */
function headerIds(): string[] {
  const source = readFileSync(THIS_FILE, "utf8");
  const header = source.slice(source.indexOf("PINNED READER SET"), source.indexOf("NOT CLAIMED by this census"));
  return [...header.matchAll(/^ \* {3}([A-Z0-9-]+):/gm)].map(match => match[1] ?? "");
}

/** This file's header comment as prose: each line without its comment prefix, joined by single spaces. */
function headerProse(): string {
  const source = readFileSync(THIS_FILE, "utf8");
  return source
    .slice(0, source.indexOf("*/"))
    .split("\n")
    .map(line => line.replace(/^\s*\/?\*+\s?/, "").trim())
    .filter(line => line !== "")
    .join(" ");
}

function titleId(title: string): string {
  return title.split(" ")[0] ?? "";
}

beforeEach(() => {
  scratchDir = makeScratch("pi-mii-r399-");
  base = realpathSync(scratchDir);
  authorized = join(base, "authorized");
  mkdirSync(authorized);
  ws = fixtureRepo(join(authorized, "ws"));
  symlinkSync(ws, join(authorized, "ws-link"));
});

afterEach(() => {
  removeScratch(scratchDir);
});

describe("EAT-R399 criterion 1: two processes over one configured store hold one writer reservation of one realpath", () => {
  it(ROSTER[0], async () => {
    for (const pair of ALIAS_PAIRS) {
      const label = pair.join("+");
      const store = freshStore();
      const reading = await race("store", store, pair);
      expect(reading.exits, label).toEqual([
        { code: 0, signal: null },
        { code: 0, signal: null },
      ]);
      expect(
        reading.first.map(event => event.tag),
        label,
      ).toEqual(["RESULT", "RESULT"]);
      const leases = reading.first.map((event, index) => ({ invocationId: INVOCATIONS[index], value: event.value })).filter(entry => entry.value !== null);
      expect(leases, label).toHaveLength(1);
      const [won] = leases;
      expect(won?.value, label).toStrictEqual({ canonicalRoot: ws, invocationId: won?.invocationId });
      const reader = new WriterLeases({ store });
      expect(
        ALIAS_KINDS.map(kind => reader.holder(spellingOf(kind))),
        label,
      ).toEqual(ALIAS_KINDS.map(() => won?.invocationId));
    }
  });

  it(ROSTER[1], async () => {
    for (const pair of ALIAS_PAIRS) {
      const label = pair.join("+");
      const reading = await race("admission", freshStore(), pair);
      expect(reading.exits, label).toEqual([
        { code: 0, signal: null },
        { code: 0, signal: null },
      ]);
      const entered = reading.first.map((event, index) => ({ invocationId: INVOCATIONS[index], event, index })).filter(entry => entry.event.tag === "ENTERED");
      expect(entered, label).toHaveLength(1);
      const [winner] = entered;
      expect(winner?.event.value, label).toStrictEqual({ canonicalRoot: ws, invocationId: winner?.invocationId });
      const loser = reading.first.findIndex(event => event.tag !== "ENTERED");
      expect(reading.first[loser], label).toStrictEqual({ tag: "RESULT", value: WRITER_HELD });
      expect(reading.events[loser]?.some(event => event.tag === "ENTERED"), label).toBe(false);
      expect(enteredCount(reading), label).toBe(1);
      expect(lastResult(reading.events[winner?.index ?? -1] ?? []), label).toStrictEqual(DISPATCHED);
    }
  });

  it(ROSTER[2], async () => {
    const reading = await race("admission", null, ["direct", "symlink"]);
    expect(reading.exits).toEqual([
      { code: 0, signal: null },
      { code: 0, signal: null },
    ]);
    expect(reading.first).toStrictEqual([
      { tag: "ENTERED", value: { canonicalRoot: ws, invocationId: "inv-a" } },
      { tag: "ENTERED", value: { canonicalRoot: ws, invocationId: "inv-b" } },
    ]);
    expect(enteredCount(reading)).toBe(2);
    expect(reading.events.map(lastResult)).toStrictEqual([DISPATCHED, DISPATCHED]);
  });

  it(ROSTER[3], () => {
    const { text } = REQUIREMENT.requirement;
    expect([REQUIREMENT.requirement.id, REQUIREMENT.requirement.lines, text[0]?.startsWith("## EAT-R399 ")]).toEqual(["EAT-R399", "250-272", true]);
    const vendored = (prefix: string): string => text.find(line => line.startsWith(prefix))?.slice(prefix.length) ?? "";
    const statement = vendored("- Statement: ");
    const criterion = vendored("  1. ");
    const mutant = vendored("- Negative mutant: ");
    const header = headerProse();
    for (const quote of [statement, criterion, mutant]) {
      expect(quote.length, quote).toBeGreaterThan(40);
      expect(header, quote).toContain(`"${quote}"`);
    }
    expect(header).toContain(`at Pi master ${REQUIREMENT.commit.slice(0, 8)}`);
    const kinds = /through ([a-z]+(?:\/[a-z]+)+) aliases/.exec(criterion)?.[1]?.split("/") ?? [];
    expect([...ALIAS_KINDS]).toEqual(kinds);
    const pairs = ALIAS_PAIRS.map(pair => pair.join("+"));
    expect(pairs).toEqual(["direct+symlink", "direct+dot", "symlink+dot"]);
    expect(pairs).toEqual(kinds.flatMap((first, at) => kinds.slice(at + 1).map(second => `${first}+${second}`)));
  });
});

it(ROSTER[4], ({ task }) => {
  const registered: Array<{ name: string; mode: string; fails: boolean; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(registered.map(entry => entry.name)).toEqual([...ROSTER]);
  expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => entry.name)).toEqual([]);
  expect(registered.findIndex(entry => entry.self)).toBe(registered.length - 1);
  expect(registered.map(entry => titleId(entry.name))).toEqual(headerIds());
});
