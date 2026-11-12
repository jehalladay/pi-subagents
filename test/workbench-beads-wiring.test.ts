/**
 * wb-lkz7 (VC-4, the Beads half of wb-752.12, carved from wb-752.13 by ruling M:78809): the show-only Beads work client and
 * the wiring that resolves Furnace Attempt work ids into Beads Work nodes, src/workbench/providers/beads.ts.
 *
 * THE B3 ANSWER (the wb-kku9.3 census question the carve names: admit a show-only observation importer, or keep Beads out of
 * the reply path): ADMITTED, as exactly one module. src/workbench/providers/beads.ts imports the landed reader
 * (src/workbench/beads-observer.ts, readBeadsWork and projectBeadsWork, unchanged) and spells one native read, the show verb;
 * test/workbench-beads-claim-recheck-census.test.ts B3 holds the reader's importers and the files spelling a readiness read
 * outside the reader to that one module, and that module's reads to the show verb alone.
 *
 * THE PINNED READER SET (this file; each case named by its id, its assertion target in brackets):
 *  W0 [this file, read from disk] the ids this set lists, in order, are the ids of the cases the file registers, in order.
 *  W1 [beadsShowArgv] every id the reader's grammar admits yields the frozen argv show, the id, --json, and every other input
 *     is refused as validation before any launch, so the verb position holds show for every input (B2).
 *  W2 [createBeadsShowClient over a recording launcher] one show call launches the command bd once with that argv, cwd the
 *     call's workspace root, shell false, stdin ignored, stdout and stderr piped, and an environment holding only
 *     BEADS_CHILD_ENV_ALLOWLIST names (a canary and BEADS_DIR planted in process.env never reach it); the allowlist's exact
 *     members (B2).
 *  W3 [the same client, child behaviours] a nonzero exit resolves with that exit for the reader to refuse; stdout past
 *     BEADS_SHOW_STDOUT_BYTES, stderr past BEADS_SHOW_STDERR_BYTES, the call's deadline and an abort each stop the child
 *     (SIGTERM) and reject; a launch error rejects; an already aborted signal launches nothing (B2, B4).
 *  W4 [createBeadsShowClient with node's own launcher] with PATH holding only a scratch directory whose bd script records its
 *     argv and prints an envelope, the client returns that envelope and the script saw show, the id, --json; with PATH
 *     holding an empty scratch directory the show rejects (B2).
 *  W5 [observeAttemptWork, the grant] without the exact literal beads:inspect (furnace:inspect alone, a wildcard, another
 *     letter case, a longer name) the call issues zero show calls and leaves the projection's revision unchanged; the
 *     literal is spelled once under src/ (this module) and satisfies the capabilityGrants grammar read from src/settings.ts
 *     (B3).
 *  W6 [observeAttemptWork, projection] each distinct work id is read once; each reading's projectBeadsWork snapshot and
 *     relations reach the projection as they are; each Attempt naming a resolved work id gains one causation edge to it,
 *     provenance source furnace with nativeConfirmationRef the work id; the Work ref type differs from the Run and Attempt
 *     types; an envelope without dependencies yields no dependency or grouping edge; a work id bd cannot show yields no node
 *     and no edge; a title naming another id yields no edge (B1, B7).
 *  W7 [observeAttemptWork, failures] a nonzero exit, a non-JSON body, another work id, a throwing client and an aborted
 *     signal each mark the Work ref stale through projection.markStale and invent no node; a Run node refreshed before the
 *     call reads the same after it; a Work node refreshed by an earlier call turns stale (B4).
 *  W8 [observeAttemptWork, bounds] at most BEADS_WIRING_MAX_WORK distinct ids are read, in first-named order, the rest
 *     counted as the remainder; ids outside the reader's grammar are counted as refused and never read or marked; every read
 *     runs under BEADS_WIRING_LIMITS (its timeoutMs reaches the client, maxDependencies cuts the edges, maxTitleChars cuts
 *     the title) (B5).
 *  W9 [observeAttemptWork, display] a Work title carrying a bearer credential, or one split across a line break after
 *     "Authorization: Bearer", reaches the projection redacted; description, notes and acceptance text reach no projected
 *     node or edge (B8).
 *  W10 [observeAttemptWork, FIND-2] a dependency type that only sanitizes to a mapped literal is edged nowhere: the reading
 *     counts it under that literal's key, and the projection holds no edge to its id (FIND-2).
 *  W11 [observeAttemptWork, F8 non-goal] a closed blocker and an open blocker project dependency edges whose provenance is
 *     the same three fields, none of them a status (B6, the non-goal pinned).
 *  W12 [attemptWorkOf] the Attempt snapshots of a Furnace topology, and only those, yield (Attempt ref, work id) pairs.
 *  W13 [observeAttemptWork, no held readiness] two calls for one id issue two shows, and the second reading's status is the
 *     node's (B2's "no readiness held" for the wiring); a third read stamped before the second is counted superseded, states
 *     no relation, and the node keeps the second reading.
 * F6 (the separator corpus through the public entry point for each projected label) is the SITES row "wb-lkz7
 * providers/beads.ts observeAttemptWork" of test/workbench-sanitizer-corpus.test.ts.
 *
 * B6 NON-GOAL (F8, one sentence, as wb-752.12's acceptance allows): a projected dependency edge does not carry the blocker's
 * satisfied-versus-live status, because ObservationProjection.relate takes no status field and the reader stays unchanged;
 * the blocker's status stays in the reading's dependencies.items and W11 pins that the edge holds none.
 *
 * NOT CLAIMED (scope sentences): the furnace_observe hook is NOT CLAIMED by this census - no registered tool calls
 * observeAttemptWork yet, so the tool-level legs (the reply byte-identical without beads:inspect, the line-split credential
 * case through the full tool reply, the remainder in the reply) land with the hook on wb-752.13's converged furnace_observe
 * (the owner chain of record, wb-752.13 before the Beads wiring). A remainder recorded on the projection itself is NOT
 * CLAIMED by this census (the projection has no provider-remainder field; the count is the wiring result's remainder). A
 * live bd binary is NOT CLAIMED by this census (W4 runs a recording script on PATH). What bd does with the argv is NOT
 * CLAIMED by this census.
 */
import { chmodSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { PassThrough } from "node:stream";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { type BeadsReadClient, type BeadsShowCall, type BeadsShowResult, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { BEADS_CHILD_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import {
  attemptWorkOf,
  BEADS_INSPECT_GRANT,
  BEADS_SHOW_STDERR_BYTES,
  BEADS_SHOW_STDOUT_BYTES,
  BEADS_WIRING_LIMITS,
  BEADS_WIRING_MAX_WORK,
  type BeadsChildProcess,
  type BeadsLaunch,
  type BeadsLaunchOptions,
  beadsShowArgv,
  createBeadsShowClient,
  observeAttemptWork,
} from "../src/workbench/providers/beads.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const WORKSPACE = "/tmp/beads-wiring-ws";
const SCOPE: ObservationScope = { workspace: WORKSPACE, principal: "operator" };
const NOW = (): string => "2026-11-12T19:00:00.000Z";
const GRANTED: readonly string[] = ["furnace:inspect", BEADS_INSPECT_GRANT];

interface Dep {
  readonly id: string;
  readonly dependency_type: string;
  readonly status: string;
}
const dep = (id: string, dependency_type: string, status = "open"): Dep => ({ id, dependency_type, status });
/** bd 1.1.0-rc.1: `show <id> --json` prints an array of issue objects (the reader's measured envelope). */
function envelope(id: string, overrides: Record<string, unknown> = {}): string {
  return JSON.stringify([
    {
      id,
      title: `work ${id}`,
      status: "open",
      issue_type: "task",
      priority: 2,
      dependencies: [],
      description: "DESCRIPTION-PROBE",
      notes: "NOTES-PROBE",
      acceptance_criteria: "ACCEPTANCE-PROBE",
      ...overrides,
    },
  ]);
}
const ok = (stdout: string): BeadsShowResult => ({ exit: 0, stdout, stderr: "" });

interface Recorded {
  readonly id: string;
  readonly call: BeadsShowCall;
}
/** A recording client: each show answers from the table (a function of the id), or throws when the table says so. */
function recordingClient(answer: (id: string, call: BeadsShowCall) => BeadsShowResult | Error): BeadsReadClient & { readonly seen: Recorded[] } {
  const seen: Recorded[] = [];
  return {
    seen,
    async show(id, call) {
      seen.push({ id, call });
      const result = answer(id, call);
      if (result instanceof Error) throw result;
      return result;
    },
  };
}
const attempt = (id: string): NativeRef => ({ provider: "furnace", type: "attempt", id, scope: WORKSPACE });
const workRef = (id: string): NativeRef => ({ provider: "beads", type: "work", id, scope: WORKSPACE });
const runSnapshot = (): NativeSnapshot => ({
  source: { provider: "furnace", type: "run", id: "frn-run-r1", scope: WORKSPACE },
  scope: SCOPE,
  capturedAt: "2026-11-12T18:59:00.000Z",
  observedAt: "2026-11-12T18:59:00.000Z",
  coverage: "complete",
  node: { title: "Furnace Run frn-run-r1", type: "workflow", statusText: "active", statusTone: "active" },
  kind: "furnace.run.snapshot",
});
const nodeOf = (projection: ObservationProjection, ref: NativeRef) =>
  projection.query({ scope: SCOPE, limit: 100 }).nodes.find(node => node.nativeRef.provider === ref.provider && node.nativeRef.type === ref.type && node.nativeRef.id === ref.id);
const edges = (projection: ObservationProjection) => projection.relations({ scope: SCOPE, limit: 100 });
/** The projection's revision, read through its UI window (every node, edge or freshness change moves it). */
const revisionOf = (projection: ObservationProjection): number => projection.window({ scope: SCOPE, invocationId: "frn-run-r1", offset: 0, limit: 1 }).revision;
const keyOf = (ref: NativeRef): string => JSON.stringify([SCOPE.workspace, SCOPE.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
/** Every string a projection holds for the scope: node presentations and identities, and edge ends and provenance. */
function projectedStrings(projection: ObservationProjection): string[] {
  const out: string[] = [];
  const walk = (value: unknown): void => {
    if (typeof value === "string") out.push(value);
    else if (Array.isArray(value)) for (const item of value) walk(item);
    else if (value !== null && typeof value === "object") for (const item of Object.values(value)) walk(item);
  };
  walk(projection.query({ scope: SCOPE, limit: 100 }).nodes);
  walk(edges(projection));
  return out;
}

/** A child the recording launcher hands out: piped streams the case writes, and the signals kill() received. */
interface FakeChild extends BeadsChildProcess {
  readonly out: PassThrough;
  readonly err: PassThrough;
  readonly kills: string[];
  close(code: number | null): void;
  fail(): void;
}
function fakeChild(onKill: (child: FakeChild, signal: string) => void = (child, signal) => child.close(signal === "SIGKILL" ? null : 143)): FakeChild {
  const out = new PassThrough();
  const err = new PassThrough();
  const listeners: { error: ((error: Error) => void)[]; close: ((code: number | null) => void)[] } = { error: [], close: [] };
  const kills: string[] = [];
  let exitCode: number | null = null;
  const child: FakeChild = {
    out,
    err,
    kills,
    stdout: out,
    stderr: err,
    get exitCode() {
      return exitCode;
    },
    signalCode: null,
    kill(signal) {
      kills.push(signal ?? "SIGTERM");
      onKill(child, signal ?? "SIGTERM");
      return true;
    },
    once(event: "error" | "close", listener: ((error: Error) => void) | ((code: number | null) => void)) {
      if (event === "error") listeners.error.push(listener as (error: Error) => void);
      else listeners.close.push(listener as (code: number | null) => void);
      return child;
    },
    close(code) {
      // Deferred, as a real child's close follows its last output: data written before close() is read first.
      setImmediate(() => {
        if (exitCode !== null) return;
        exitCode = code ?? -1;
        for (const listener of listeners.close.splice(0)) listener(code);
      });
    },
    fail() {
      for (const listener of listeners.error.splice(0)) listener(new Error("spawn bd ENOENT"));
    },
  };
  return child;
}
interface Launched {
  readonly command: string;
  readonly args: readonly string[];
  readonly options: BeadsLaunchOptions;
  readonly child: FakeChild;
}
function recordingLauncher(script: (child: FakeChild) => void, onKill?: (child: FakeChild, signal: string) => void): BeadsLaunch & { readonly launched: Launched[] } {
  const launched: Launched[] = [];
  const launch: BeadsLaunch = (command, args, options) => {
    const child = fakeChild(onKill);
    launched.push({ command, args: [...args], options, child });
    queueMicrotask(() => script(child));
    return child;
  };
  return Object.assign(launch, { launched });
}
const call = (extra: Partial<BeadsShowCall> = {}): BeadsShowCall => ({ cwd: WORKSPACE, timeoutMs: 5_000, ...extra });
const rejection = async (promise: Promise<unknown>): Promise<CapabilityError> => {
  const outcome = await promise.then(
    () => undefined,
    (error: unknown) => error,
  );
  expect(outcome, "the promise rejects with a CapabilityError").toBeInstanceOf(CapabilityError);
  return outcome as CapabilityError;
};

describe("wb-lkz7 show-only Beads work client and Attempt work wiring (src/workbench/providers/beads.ts)", () => {
  it("W0 the pinned reader set's ids are the registered cases' ids, in order", () => {
    const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const header = text.slice(0, text.indexOf("*/"));
    const listed = [...header.matchAll(/^ \* {2}(W\d+) \[/gm)].map(match => match[1]);
    const registered = [...text.matchAll(/^\s*it\("(W\d+) /gm)].map(match => match[1]);
    expect(listed, "the header lists W0 to W13").toEqual(Array.from({ length: 14 }, (_, index) => `W${index}`));
    expect(registered, "the registered cases are the listed ones, in order").toEqual(listed);
  });

  it("W1 beadsShowArgv: the frozen show argv around every admitted id, validation for every other input", () => {
    for (const id of ["wb-lkz7", "wb-752.13", "A", "x_1-2.3", "update", "close", `a${"b".repeat(127)}`]) {
      const argv = beadsShowArgv(id);
      expect(argv, `argv for ${id}`).toEqual(["show", id, "--json"]);
      expect(Object.isFrozen(argv), `argv for ${id} is frozen`).toBe(true);
    }
    const refused = ["", "-x", "--help", " wb-1", "wb 1", "wb-1;rm", "wb-1\n", "../wb-1", ".wb-1", `a${"b".repeat(128)}`, `wb-1${String.fromCodePoint(0x2028)}`, "wb-é"];
    for (const id of refused) {
      let thrown: unknown;
      try {
        beadsShowArgv(id);
      } catch (error) {
        thrown = error;
      }
      expect(thrown instanceof CapabilityError && thrown.category === "validation", `refused ${JSON.stringify(id)}`).toBe(true);
    }
  });

  it("W2 the client launches bd once with that argv, the call's cwd, no shell and an allowlist-only environment", async () => {
    const planted = { WB_LKZ7_CANARY_TOKEN: "canary-value-not-a-secret", BEADS_DIR: "/tmp/another-store" };
    const before = Object.fromEntries(Object.keys(planted).map(name => [name, process.env[name]]));
    Object.assign(process.env, planted);
    try {
      const launch = recordingLauncher(child => {
        child.out.write(envelope("wb-1"));
        child.close(0);
      });
      const result = await createBeadsShowClient(launch).show("wb-1", call());
      expect(result).toEqual({ exit: 0, stdout: envelope("wb-1"), stderr: "" });
      expect(launch.launched.map(entry => ({ command: entry.command, args: entry.args }))).toEqual([{ command: "bd", args: ["show", "wb-1", "--json"] }]);
      const options = launch.launched[0]?.options;
      expect({ cwd: options?.cwd, shell: options?.shell, stdio: options?.stdio }).toEqual({ cwd: WORKSPACE, shell: false, stdio: ["ignore", "pipe", "pipe"] });
      const names = Object.keys(options?.env ?? {});
      expect(names.filter(name => !BEADS_CHILD_ENV_ALLOWLIST.includes(name)), "names outside the allowlist").toEqual([]);
      expect(names.includes("WB_LKZ7_CANARY_TOKEN") || names.includes("BEADS_DIR"), "a planted name reached the child").toBe(false);
      if (typeof process.env.PATH === "string") expect(options?.env.PATH, "PATH reaches the child").toBe(process.env.PATH);
    } finally {
      for (const [name, value] of Object.entries(before)) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
    expect(BEADS_CHILD_ENV_ALLOWLIST).toEqual(["PATH", "HOME", "TMPDIR", "LANG", "LC_ALL", "LC_CTYPE", "TZ", "XDG_CONFIG_HOME", "XDG_CACHE_HOME", "XDG_DATA_HOME"]);
    expect(Object.isFrozen(BEADS_CHILD_ENV_ALLOWLIST)).toBe(true);
  });

  it("W3 exit codes resolve; output bounds, the deadline, an abort and a launch error stop the child and reject", async () => {
    const exited = recordingLauncher(child => {
      child.err.write("no issue found");
      child.close(1);
    });
    expect(await createBeadsShowClient(exited).show("wb-1", call())).toEqual({ exit: 1, stdout: "", stderr: "no issue found" });

    const flood = recordingLauncher(child => {
      child.out.write(Buffer.alloc(BEADS_SHOW_STDOUT_BYTES + 1, 0x20));
    });
    await rejection(createBeadsShowClient(flood).show("wb-1", call()));
    expect(flood.launched[0]?.child.kills, "stdout past its bound stops the child").toEqual(["SIGTERM"]);

    const noisy = recordingLauncher(child => {
      child.err.write(Buffer.alloc(BEADS_SHOW_STDERR_BYTES + 1, 0x20));
    });
    await rejection(createBeadsShowClient(noisy).show("wb-1", call()));
    expect(noisy.launched[0]?.child.kills, "stderr past its bound stops the child").toEqual(["SIGTERM"]);

    const silent = recordingLauncher(() => undefined);
    await rejection(createBeadsShowClient(silent).show("wb-1", call({ timeoutMs: 20 })));
    expect(silent.launched[0]?.child.kills, "the deadline stops the child").toEqual(["SIGTERM"]);

    const stubborn = recordingLauncher(
      () => undefined,
      (child, signal) => {
        if (signal === "SIGKILL") child.close(null);
      },
    );
    await rejection(createBeadsShowClient(stubborn).show("wb-1", call({ timeoutMs: 20 })));
    expect(stubborn.launched[0]?.child.kills, "a child that outlives SIGTERM is killed").toEqual(["SIGTERM", "SIGKILL"]);

    const controller = new AbortController();
    const waiting = recordingLauncher(() => controller.abort());
    const aborted = await rejection(createBeadsShowClient(waiting).show("wb-1", call({ signal: controller.signal })));
    expect(aborted.category).toBe("transport");
    expect(waiting.launched[0]?.child.kills, "an abort stops the child").toEqual(["SIGTERM"]);

    const missing = recordingLauncher(child => child.fail());
    await rejection(createBeadsShowClient(missing).show("wb-1", call()));

    const early = new AbortController();
    early.abort();
    const never = recordingLauncher(() => undefined);
    expect((await rejection(createBeadsShowClient(never).show("wb-1", call({ signal: early.signal })))).category).toBe("transport");
    expect(never.launched, "an aborted signal launches nothing").toEqual([]);
    const invalid = recordingLauncher(() => undefined);
    expect((await rejection(createBeadsShowClient(invalid).show("--help", call()))).category).toBe("validation");
    expect(invalid.launched, "an invalid id launches nothing").toEqual([]);
  });

  describe("W4 node's own launcher", () => {
    const dirs: string[] = [];
    afterEach(() => removeScratch(...dirs.splice(0)));
    it("W4 a bd script on PATH sees show, the id, --json and its envelope is returned; an empty PATH rejects", async () => {
      const bin = makeScratch("beads-wiring-bin-");
      const empty = makeScratch("beads-wiring-empty-");
      const workspace = makeScratch("beads-wiring-root-");
      dirs.push(bin, empty, workspace);
      const argvFile = join(workspace, "argv.txt");
      writeFileSync(join(bin, "bd"), `#!/bin/sh\nprintf '%s\\n' "$@" > '${argvFile}'\nprintf '%s' '${envelope("wb-1")}'\n`);
      chmodSync(join(bin, "bd"), 0o755);
      const path = process.env.PATH;
      try {
        process.env.PATH = bin;
        const result = await createBeadsShowClient().show("wb-1", { cwd: workspace, timeoutMs: 10_000 });
        expect(result).toEqual({ exit: 0, stdout: envelope("wb-1"), stderr: "" });
        expect(readFileSync(argvFile, "utf8")).toBe("show\nwb-1\n--json\n");
        process.env.PATH = empty;
        await rejection(createBeadsShowClient().show("wb-1", { cwd: workspace, timeoutMs: 10_000 }));
      } finally {
        if (path === undefined) delete process.env.PATH;
        else process.env.PATH = path;
      }
    });
  });

  it("W5 without the exact beads:inspect grant nothing is read and nothing is touched; the literal and its grammar", async () => {
    for (const grants of [["furnace:inspect"], ["*"], ["furnace:inspect", "Beads:inspect"], ["beads:inspectx"], ["beads:inspect "], []]) {
      const projection = new ObservationProjection();
      projection.refresh(runSnapshot());
      const revision = revisionOf(projection);
      const client = recordingClient(id => ok(envelope(id)));
      const result = await observeAttemptWork({ projection, scope: SCOPE, grants, client, attempts: [{ attempt: attempt("frn-atm-1"), workId: "wb-1" }], now: NOW });
      expect(client.seen, `zero show calls under ${JSON.stringify(grants)}`).toEqual([]);
      expect(revisionOf(projection), `the projection is untouched under ${JSON.stringify(grants)}`).toBe(revision);
      expect(result.granted).toBe(false);
    }
    const spelled = readdirFiles(join(process.cwd(), "src")).flatMap(file => {
      const count = readFileSync(file, "utf8").split("beads:inspect").length - 1;
      return count === 0 ? [] : [`${relative(process.cwd(), file)}:${count}`];
    });
    expect(spelled, "the grant literal is spelled once under src/").toEqual(["src/workbench/providers/beads.ts:1"]);
    const settings = readFileSync(join(process.cwd(), "src", "settings.ts"), "utf8");
    const grammar = /typeof grant === "string" && \/(.+?)\/\.test\(grant\)/.exec(settings)?.[1];
    expect(grammar, "the capabilityGrants grammar is read from src/settings.ts").toBeDefined();
    expect(new RegExp(grammar ?? "^$").test(BEADS_INSPECT_GRANT), "beads:inspect satisfies the capabilityGrants grammar").toBe(true);
  });

  it("W6 each distinct work id is read once; readings, their relations and native-confirmed Attempt edges reach the projection", async () => {
    const answers: Record<string, BeadsShowResult> = {
      "wb-1": ok(envelope("wb-1", { title: "blocks wb-9 per the title", dependencies: [dep("wb-2", "blocks"), dep("wb-0", "parent-child", "open")] })),
      "wb-2": ok(envelope("wb-2", { dependencies: [] })),
      "wb-9": { exit: 1, stdout: "", stderr: "no issue found" },
    };
    const client = recordingClient(id => answers[id] ?? { exit: 1, stdout: "", stderr: "" });
    const projection = new ObservationProjection();
    const attempts = [
      { attempt: attempt("frn-atm-1"), workId: "wb-1" },
      { attempt: attempt("frn-atm-2"), workId: "wb-1" },
      { attempt: attempt("frn-atm-3"), workId: "wb-2" },
      { attempt: attempt("frn-atm-4"), workId: "wb-9" },
    ];
    const result = await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts, now: NOW });
    expect(client.seen.map(entry => entry.id), "each distinct id read once, in first-named order").toEqual(["wb-1", "wb-2", "wb-9"]);
    expect(client.seen.every(entry => entry.call.cwd === WORKSPACE), "every read runs at the workspace root").toBe(true);
    expect(result).toEqual({ granted: true, offered: 3, resolved: 2, superseded: 0, stale: 1, refused: 0, remainder: 0 });
    // The readings as the landed reader and projector produce them, refreshed and related as they are.
    for (const id of ["wb-1", "wb-2"]) {
      const answer = answers[id] as BeadsShowResult;
      const expected = projectBeadsWork(
        await readBeadsWork({ show: async () => answer }, { workId: id, workspaceRoot: WORKSPACE, scope: SCOPE, limits: BEADS_WIRING_LIMITS, now: NOW }),
        SCOPE,
      );
      const node = nodeOf(projection, workRef(id));
      expect(node?.presentation, `${id} presentation`).toEqual(expected.snapshot.node);
      expect({ kind: node?.kind, completeness: node?.completeness, freshness: node?.freshness }, `${id} node`).toEqual({ kind: "beads.work.snapshot", completeness: expected.snapshot.coverage, freshness: "current" });
      for (const relation of expected.relations) {
        expect(
          edges(projection).some(edge => edge.from === keyOf(relation.from) && edge.to === keyOf(relation.to) && edge.kind === relation.kind),
          `${id} relation ${relation.kind}`,
        ).toBe(true);
      }
    }
    const attemptEdges = edges(projection).filter(edge => edge.kind === "causation");
    expect(attemptEdges.map(edge => [edge.from, edge.to, edge.provenance])).toEqual([
      [keyOf(attempt("frn-atm-1")), keyOf(workRef("wb-1")), { source: "furnace", observedAt: NOW(), nativeConfirmationRef: "wb-1" }],
      [keyOf(attempt("frn-atm-2")), keyOf(workRef("wb-1")), { source: "furnace", observedAt: NOW(), nativeConfirmationRef: "wb-1" }],
      [keyOf(attempt("frn-atm-3")), keyOf(workRef("wb-2")), { source: "furnace", observedAt: NOW(), nativeConfirmationRef: "wb-2" }],
    ]);
    expect(edges(projection).map(edge => edge.kind).sort(), "every edge: wb-1's dependency and grouping, three Attempt edges").toEqual(["causation", "causation", "causation", "dependency", "grouping"]);
    expect(nodeOf(projection, workRef("wb-9")), "a work id bd cannot show projects no node").toBeUndefined();
    expect(edges(projection).some(edge => edge.to === keyOf(workRef("wb-9")) || edge.from === keyOf(workRef("wb-9"))), "and no edge").toBe(false);
    expect(edges(projection).filter(edge => edge.from === keyOf(workRef("wb-2"))), "an envelope without dependencies yields no edge from it").toEqual([]);
    expect(new Set([workRef("wb-1").type, attempt("frn-atm-1").type, "run"]).size, "the Work type differs from the Run and Attempt types").toBe(3);
  });

  it("W7 a failed read marks the Work ref stale, invents no node and leaves the Furnace nodes as they were", async () => {
    const failures: Record<string, BeadsShowResult | Error> = {
      "wb-exit": { exit: 2, stdout: "", stderr: "" },
      "wb-text": ok("not json"),
      "wb-other": ok(envelope("wb-someone-else")),
      "wb-throw": new Error("timed out"),
    };
    const projection = new ObservationProjection();
    projection.refresh(runSnapshot());
    const runBefore = JSON.stringify(nodeOf(projection, runSnapshot().source));
    const marked: NativeRef[] = [];
    const markStale = projection.markStale.bind(projection);
    projection.markStale = input => {
      marked.push(input.ref);
      markStale(input);
    };
    const client = recordingClient(id => failures[id] ?? ok(envelope(id)));
    const result = await observeAttemptWork({
      projection,
      scope: SCOPE,
      grants: GRANTED,
      client,
      attempts: Object.keys(failures).map((workId, index) => ({ attempt: attempt(`frn-atm-${index}`), workId })),
      now: NOW,
    });
    expect(result).toEqual({ granted: true, offered: 4, resolved: 0, superseded: 0, stale: 4, refused: 0, remainder: 0 });
    expect(marked, "each failed read marks its Work ref").toEqual(Object.keys(failures).map(workRef));
    expect(projection.query({ scope: SCOPE, limit: 100 }).nodes.filter(node => node.nativeRef.provider === "beads"), "no Work node invented").toEqual([]);
    expect(edges(projection), "no edge").toEqual([]);
    expect(JSON.stringify(nodeOf(projection, runSnapshot().source)), "the Run node reads the same").toBe(runBefore);

    const controller = new AbortController();
    controller.abort();
    const abortedClient = recordingClient(id => ok(envelope(id)));
    const aborted = await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client: abortedClient, attempts: [{ attempt: attempt("frn-atm-9"), workId: "wb-late" }], now: NOW, signal: controller.signal });
    expect(aborted).toEqual({ granted: true, offered: 1, resolved: 0, superseded: 0, stale: 1, refused: 0, remainder: 0 });
    expect(abortedClient.seen, "an aborted signal reads nothing").toEqual([]);
    expect(marked.at(-1)).toEqual(workRef("wb-late"));

    let fail = false;
    const flaky = recordingClient(id => (fail ? { exit: 1, stdout: "", stderr: "" } : ok(envelope(id))));
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client: flaky, attempts: [{ attempt: attempt("frn-atm-5"), workId: "wb-seen" }], now: NOW });
    expect(nodeOf(projection, workRef("wb-seen"))?.freshness).toBe("current");
    fail = true;
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client: flaky, attempts: [{ attempt: attempt("frn-atm-5"), workId: "wb-seen" }], now: NOW });
    expect(nodeOf(projection, workRef("wb-seen"))?.freshness, "a Work node read before turns stale on a failed re-read").toBe("stale");
    expect(JSON.stringify(nodeOf(projection, runSnapshot().source)), "the Run node still reads the same").toBe(runBefore);
  });

  it("W8 the work bound, the remainder, the refused ids and the reader limits", async () => {
    const ids = Array.from({ length: BEADS_WIRING_MAX_WORK + 2 }, (_, index) => `wb-${index}`);
    const client = recordingClient(id =>
      ok(
        envelope(id, {
          title: `${"t".repeat(BEADS_WIRING_LIMITS.maxTitleChars + 40)}`,
          dependencies: Array.from({ length: BEADS_WIRING_LIMITS.maxDependencies + 5 }, (_, at) => dep(`${id}-dep-${at}`, "blocks")),
        }),
      ),
    );
    const projection = new ObservationProjection({ maxEdges: 10_000 });
    const attempts = [...ids, "wb-0", "--help", "wb 1"].map((workId, index) => ({ attempt: attempt(`frn-atm-${index}`), workId }));
    const result = await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts, now: NOW });
    expect(BEADS_WIRING_MAX_WORK).toBe(8);
    expect(BEADS_WIRING_LIMITS).toEqual({ maxDependencies: 32, maxTitleChars: 160, timeoutMs: 5_000 });
    expect(client.seen.map(entry => entry.id), "the first BEADS_WIRING_MAX_WORK distinct ids").toEqual(ids.slice(0, BEADS_WIRING_MAX_WORK));
    expect(result).toEqual({ granted: true, offered: ids.length + 2, resolved: BEADS_WIRING_MAX_WORK, superseded: 0, stale: 0, refused: 2, remainder: 2 });
    expect(client.seen.every(entry => entry.call.timeoutMs === BEADS_WIRING_LIMITS.timeoutMs), "every read carries the limit's timeoutMs").toBe(true);
    const dependencyEdges = projection.relations({ scope: SCOPE, from: keyOf(workRef("wb-0")), limit: 100 }).filter(edge => edge.kind === "dependency");
    expect(dependencyEdges.length, "maxDependencies cuts the edges").toBe(BEADS_WIRING_LIMITS.maxDependencies);
    expect(Array.from(nodeOf(projection, workRef("wb-0"))?.presentation.title ?? "").length, "maxTitleChars cuts the title").toBe(BEADS_WIRING_LIMITS.maxTitleChars);
    expect(nodeOf(projection, workRef("wb-0"))?.completeness, "a cut dependency list reads partial").toBe("partial");
    expect(nodeOf(projection, workRef(ids[BEADS_WIRING_MAX_WORK] as string)), "an id past the bound is never read").toBeUndefined();
  });

  it("W9 a bearer credential in a title, whole or split across a line break, reaches the projection redacted; long text is never read", async () => {
    const titles: Record<string, string> = {
      "wb-a": "deploy with Bearer abc123def456ghi789",
      "wb-b": "Authorization: Bearer\nZZSPLITSECRET1234567890",
    };
    const client = recordingClient(id => ok(envelope(id, { title: titles[id] })));
    const projection = new ObservationProjection();
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts: Object.keys(titles).map((workId, index) => ({ attempt: attempt(`frn-atm-${index}`), workId })), now: NOW });
    const strings = projectedStrings(projection);
    expect(nodeOf(projection, workRef("wb-a")), "the titled node is projected").toBeDefined();
    expect(nodeOf(projection, workRef("wb-b")), "the split-titled node is projected").toBeDefined();
    for (const secret of ["abc123def456ghi789", "ZZSPLITSECRET1234567890"]) expect(strings.some(text => text.includes(secret)), `${secret} reached the projection`).toBe(false);
    for (const probe of ["DESCRIPTION-PROBE", "NOTES-PROBE", "ACCEPTANCE-PROBE"]) expect(strings.some(text => text.includes(probe)), `${probe} reached the projection`).toBe(false);
  });

  it("W10 a dependency type that only sanitizes to a mapped literal is counted, never edged", async () => {
    const aliased = `bl${String.fromCodePoint(0x200b)}ocks`;
    const answer = ok(envelope("wb-1", { dependencies: [dep("wb-hostile", aliased), dep("wb-real", "blocks")] }));
    const reading = await readBeadsWork({ show: async () => answer }, { workId: "wb-1", workspaceRoot: WORKSPACE, scope: SCOPE, limits: BEADS_WIRING_LIMITS, now: NOW });
    expect(reading.unmappedDependencyTypes, "the reader counts it under the mapped literal's key (FIND-2)").toEqual({ blocks: 1 });
    const projection = new ObservationProjection();
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client: recordingClient(() => answer), attempts: [{ attempt: attempt("frn-atm-1"), workId: "wb-1" }], now: NOW });
    expect(edges(projection).some(edge => edge.to === keyOf(workRef("wb-hostile"))), "no edge reaches the aliased dependency").toBe(false);
    expect(edges(projection).some(edge => edge.to === keyOf(workRef("wb-real")) && edge.kind === "dependency"), "the genuine blocker is edged").toBe(true);
  });

  it("W11 dependency edges carry no blocker status: a closed and an open blocker project the same provenance fields", async () => {
    const answer = ok(envelope("wb-1", { dependencies: [dep("wb-closed", "blocks", "closed"), dep("wb-open", "blocks", "open")] }));
    const projection = new ObservationProjection();
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client: recordingClient(() => answer), attempts: [{ attempt: attempt("frn-atm-1"), workId: "wb-1" }], now: NOW });
    const blockers = edges(projection).filter(edge => edge.kind === "dependency");
    expect(blockers.map(edge => edge.to)).toEqual([keyOf(workRef("wb-closed")), keyOf(workRef("wb-open"))]);
    expect(blockers.map(edge => Object.keys(edge.provenance).sort())).toEqual([
      ["nativeConfirmationRef", "observedAt", "source"],
      ["nativeConfirmationRef", "observedAt", "source"],
    ]);
    expect(blockers[0]?.provenance, "the closed and the open blocker's edges hold the same provenance").toEqual(blockers[1]?.provenance);
  });

  it("W12 attemptWorkOf reads the Attempt snapshots of a Furnace topology and nothing else", () => {
    const attemptSnapshot = (id: string, workId?: string): NativeSnapshot => ({
      source: attempt(id),
      scope: SCOPE,
      capturedAt: NOW(),
      observedAt: NOW(),
      node: { title: `Furnace Attempt ${id}`, type: "sdk-operation", statusText: "running", statusTone: "active" },
      kind: "furnace.attempt.snapshot",
      trace: { invocationId: "frn-run-r1", correlationIds: { runId: "frn-run-r1", ...(workId === undefined ? {} : { workId }) } },
    });
    const foreign: NativeSnapshot = { ...attemptSnapshot("frn-atm-x", "wb-x"), source: { provider: "forge", type: "attempt", id: "op-1", scope: WORKSPACE } };
    const run: NativeSnapshot = { ...runSnapshot(), trace: { correlationIds: { workId: "wb-run" } } };
    expect(attemptWorkOf([run, attemptSnapshot("frn-atm-1", "wb-1"), attemptSnapshot("frn-atm-2"), foreign, attemptSnapshot("frn-atm-3", "wb-1")])).toEqual([
      { attempt: attempt("frn-atm-1"), workId: "wb-1" },
      { attempt: attempt("frn-atm-3"), workId: "wb-1" },
    ]);
  });

  it("W13 the wiring holds no reading: two calls for one id issue two shows and the second status is the node's", async () => {
    let status = "open";
    const client = recordingClient(id => ok(envelope(id, { status })));
    const projection = new ObservationProjection();
    const attempts = [{ attempt: attempt("frn-atm-1"), workId: "wb-1" }];
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts, now: NOW });
    status = "closed";
    await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts, now: () => "2026-11-12T19:00:01.000Z" });
    expect(client.seen.map(entry => entry.id)).toEqual(["wb-1", "wb-1"]);
    expect(nodeOf(projection, workRef("wb-1"))?.presentation.statusText).toBe("closed");
    status = "open";
    const late = await observeAttemptWork({ projection, scope: SCOPE, grants: GRANTED, client, attempts: [{ attempt: attempt("frn-atm-2"), workId: "wb-1" }], now: NOW });
    expect(late).toEqual({ granted: true, offered: 1, resolved: 0, superseded: 1, stale: 0, refused: 0, remainder: 0 });
    expect(nodeOf(projection, workRef("wb-1"))?.presentation.statusText, "the node keeps the later reading").toBe("closed");
    expect(edges(projection).some(edge => edge.from === keyOf(attempt("frn-atm-2"))), "a superseded reading states no relation").toBe(false);
  });
});

/** Every file below a directory (no symbolic links followed). */
function readdirFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => (entry.isDirectory() ? readdirFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : []));
}
