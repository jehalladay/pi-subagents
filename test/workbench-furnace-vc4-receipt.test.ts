/**
 * wb-752.3 (VC-4 residual): the live external Furnace Run acceptance receipt judges what it claims.
 *
 * Offline, no network and no furnace: the pure assessor is driven with an evidence record that satisfies every
 * criterion and with one mutant per guarantee, so an assessor that returned a constant (or ignored a field)
 * would fail here. The live runner and the tier launcher are read as text; the runner is executed only without a
 * usable fixture identity, in front of a sentinel furnace that records any call it receives.
 */
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessLive,
  BINARY_IDENTITY_SOURCE,
  buildReceipt,
  compareStores,
  exitCodeFor,
  FINDING_RULES,
  FIXTURE_ENV,
  FIXTURE_ROOT_PATTERN,
  FIXTURE_ROOT_PREFIX,
  fixtureIdentityOf,
  fixtureRootRefusal,
  HASHED_STORES,
  LAUNCHER_CONTRACT,
  LAUNCHER_RECORD,
  PHASES,
  READ_ONLY_VERBS,
  RECEIPT_CONTRACT,
  UNREALISED_STEPS,
  verbOf,
} from "../qa/workbench/live-furnace-vc4-receipt.mjs";

interface Transition {
  phase: string;
  utc: string;
  freshness: string;
  connection: string;
  runState: string;
  attemptState: string;
  runNodeFreshness: string;
  attemptNodeFreshness: string;
  attemptNodeStatusText: string;
}
interface Relation {
  from: string;
  to: string;
  kind: string;
  provenanceSource: string;
  nativeConfirmationRef?: string;
}
interface RunSummary {
  state: string;
  controllerSessionId: string | null;
  attemptIds: string[];
  cancelledAttemptIds: string[];
  updatedAt?: string;
  controllerLive?: boolean | null;
  attemptStates?: Record<string, string>;
}
interface LauncherRecord {
  contract: string;
  root: string;
  runId: string;
  requestId: string;
  formula: string;
  launcherPid: number;
  launchedAt: string;
}
interface Fixture {
  root?: string;
  runId?: string;
  realRoot: string | null;
  repoRoot: string;
  beadsStore: boolean;
  runRecord: boolean;
  launcher: LauncherRecord | null;
}
interface InspectSummary {
  contract: string;
  workspaceRoot: string;
  kind: string;
  runId: string;
  workspace: string;
  beadsRunId: string;
  creatingRequestId: string;
  formula: string;
  state: string;
  createdAt: string;
  exitCode: number;
}
interface BinaryIdentity {
  source: string;
  binary_path?: string;
  binary_digest?: string;
  binary_revision?: string;
  furnace_version: string;
  protocol_version: number;
  beads_version?: string;
}
interface StoreHashes {
  at: string;
  digest: string;
  count: number;
  files: Record<string, string>;
}
interface Evidence {
  fixture: Fixture;
  environment: { furnaceAvailable: boolean; diagnostic?: string };
  acquisition: { mode: string; runId?: string; error?: string };
  inspect: InspectSummary;
  binary: BinaryIdentity;
  attach: {
    runId: string;
    attachedBy: string;
    parentInvocationId: string | null;
    ownership: string;
    runnerPid: number;
    controllerPid: number | null;
    via?: string;
    launcherPid?: number;
    creatingRequestId?: string;
    launcherRequestId?: string;
    runCreatedAt?: string;
    attachedAt?: string;
    runSummary?: RunSummary;
  };
  transitions: Transition[];
  close: {
    observerCalls: string[];
    argv: string[][];
    runBefore: RunSummary;
    runAfter: RunSummary;
    closedAt?: string;
  };
  stores: { before: StoreHashes; after: StoreHashes };
  topology: {
    runId: string;
    nativeAttemptIds: string[];
    confirmations: string[];
    nodes: { type: string; id: string }[];
    relations: Relation[];
    intervals: { attemptId: string; startedAt: string; endedAt?: string }[];
    nativeIntervals: { attemptId: string; startedAt?: string; finishedAt?: string }[];
    completeness: string;
    gaps: string[];
  };
}

const RUN = "frn-run-fx-wisp-aaa";
const ATTEMPT = "frn-atm-fx-wisp-bbb-1";
const T = (second: number): string => `2026-10-15T09:00:${String(second).padStart(2, "0")}.000Z`;
const ROOT = "/tmp/pi-external-furnace-realbd.Ab12Cd";
const REPO = "/workplace/example/worktrees/ws-04-wb-752.3";
const REQUEST = "vc4-external-4241-abc";
const DIGEST = "a".repeat(64);

function launcher(): LauncherRecord {
  return { contract: LAUNCHER_CONTRACT, root: ROOT, runId: RUN, requestId: REQUEST, formula: "vc4-external", launcherPid: 4241, launchedAt: T(0) };
}

function summary(fields: Partial<RunSummary> = {}): RunSummary {
  return {
    state: "active",
    controllerSessionId: "ses-1",
    attemptIds: [ATTEMPT],
    cancelledAttemptIds: [],
    updatedAt: T(0),
    controllerLive: true,
    attemptStates: { [ATTEMPT]: "running" },
    ...fields,
  };
}

function hashes(at: string): StoreHashes {
  return {
    at,
    digest: "d".repeat(64),
    count: 4,
    files: {
      ".beads/embeddeddolt/fx/.dolt/noms/manifest": "1".repeat(64),
      ".beads/metadata.json": "2".repeat(64),
      [`.furnace/runs/${RUN}/run.json`]: "3".repeat(64),
      [`.furnace/runs/${RUN}/events.jsonl`]: "4".repeat(64),
    },
  };
}

function transition(phase: string, second: number, fields: Partial<Transition>): Transition {
  return {
    phase,
    utc: T(second),
    freshness: "current",
    connection: "connected",
    runState: "active",
    attemptState: "running",
    runNodeFreshness: "current",
    attemptNodeFreshness: "current",
    attemptNodeStatusText: "running",
    ...fields,
  };
}

function good(): Evidence {
  const stale = { freshness: "stale", connection: "disconnected", runNodeFreshness: "stale", attemptNodeFreshness: "stale" };
  return {
    fixture: { root: ROOT, runId: RUN, realRoot: ROOT, repoRoot: REPO, beadsStore: true, runRecord: true, launcher: launcher() },
    environment: { furnaceAvailable: true },
    acquisition: { mode: "fixture", runId: RUN },
    inspect: {
      contract: "furnace.run.inspect/v1",
      workspaceRoot: ROOT,
      kind: "run_inspect",
      runId: RUN,
      workspace: ROOT,
      beadsRunId: "fx-wisp-aaa",
      creatingRequestId: REQUEST,
      formula: "vc4-external",
      state: "active",
      createdAt: T(0),
      exitCode: 0,
    },
    binary: {
      source: BINARY_IDENTITY_SOURCE,
      binary_path: "/home/u/.local/bin/furnace",
      binary_digest: DIGEST,
      binary_revision: "e2294c9f00b3",
      furnace_version: "0.1.0",
      protocol_version: 1,
      beads_version: "1.1.0-rc.1",
    },
    attach: {
      runId: RUN,
      attachedBy: "run-id",
      parentInvocationId: null,
      ownership: "external",
      runnerPid: 100,
      controllerPid: 4242,
      via: "nativeFurnaceRunInspect",
      launcherPid: 4241,
      creatingRequestId: REQUEST,
      launcherRequestId: REQUEST,
      runCreatedAt: T(0),
      attachedAt: T(1),
      runSummary: summary(),
    },
    transitions: [
      transition("attached", 1, {}),
      transition("disconnected", 2, stale),
      transition("reconnected", 3, { ...stale, connection: "connected" }),
      transition("reconciled", 4, {}),
    ],
    close: {
      observerCalls: ["runs.status", "attempts.list", "logs.read"],
      argv: [
        ["-C", "/tmp/w", "--json", "run", "status", RUN],
        ["-C", "/tmp/w", "--json", "attempt", "list", RUN, "--limit", "5"],
        ["-C", "/tmp/w", "--json", "logs", RUN, "--attempt", ATTEMPT, "--stream", "stdout"],
      ],
      runBefore: summary(),
      runAfter: summary(),
      closedAt: T(5),
    },
    stores: { before: hashes(T(1)), after: hashes(T(6)) },
    topology: {
      runId: RUN,
      nativeAttemptIds: [ATTEMPT],
      confirmations: ["frn-req-attempts-1"],
      nodes: [
        { type: "run", id: RUN },
        { type: "attempt", id: ATTEMPT },
      ],
      relations: [{ from: RUN, to: ATTEMPT, kind: "ownership", provenanceSource: "furnace", nativeConfirmationRef: "frn-req-attempts-1" }],
      intervals: [{ attemptId: ATTEMPT, startedAt: T(0) }],
      nativeIntervals: [{ attemptId: ATTEMPT, startedAt: T(0) }],
      completeness: "complete",
      gaps: [],
    },
  };
}

const rulesOf = (evidence: Evidence): string[] => assessLive(evidence).findings.map((finding: { rule: string }) => finding.rule);

const sourceOf = (path: string): string => readFileSync(new URL(path, import.meta.url), "utf8");
const specifiersOf = (source: string): string[] =>
  [...source.matchAll(/\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']/gm)].map((match) => match[1] ?? match[2] ?? "").sort();
const DYNAMIC_LOAD = /\bimport\s*\(|\brequire\s*\(/;

const BUILD = {
  utc: T(9),
  revision: "abc1234",
  command: "node qa/workbench/live-furnace-vc4.mjs",
  node: "v22.0.0",
  arch: "x64",
  platform: "linux",
  toolchain: { sdk: "@furnace/sdk@0.1.0", producer: "0.1.0" },
};

// Respin 3 (gate-1 g2-gate-r2 07:30Z U1/U2/U4/U7, owner rulings 07:4xZ). Seat rule F11: every invisible or control code
// point in the respin-3 probes below is built with String.fromCodePoint; every token and value is synthetic.
const cp = (code: number): string => String.fromCodePoint(code);
/** A default-ignorable code point, by the Unicode property itself, never by a list. */
const DEFAULT_IGNORABLE = /^\p{Default_Ignorable_Code_Point}$/u;
/** A code point the separator unit names: default-ignorable, control, lone surrogate, space, line or paragraph separator. */
const SEPARATOR_CODE_POINT = /^[\p{Default_Ignorable_Code_Point}\p{Cc}\p{Cs}\p{Zs}\p{Zl}\p{Zp}]$/u;
/** A probe in ASCII for failure output: each code point outside printable ASCII shows as <U+XXXX>. */
const shown = (text: string): string =>
  [...text].map((character) => (/^[ -~]$/.test(character) ? character : `<U+${(character.codePointAt(0) ?? 0).toString(16).toUpperCase()}>`)).join("");
/** Where a probe sits in the builder input: by default one string value of the evidence. */
type Placement = (probe: string) => Record<string, unknown>;
const inNote: Placement = (probe) => ({ evidence: { ...good(), note: probe } });

/** The probes the builder RECORDED instead of refusing (shown in ASCII); a refusal must not name the secret either. */
function unrefused(probes: readonly string[], secret: string, place: Placement = inNote): string[] {
  const missed: string[] = [];
  for (const probe of probes) {
    let refusal: unknown;
    try {
      buildReceipt({ ...BUILD, ...place(probe) });
    } catch (error) {
      refusal = error;
    }
    if (!(refusal instanceof Error) || !/credential; refusing to record it$/.test(refusal.message)) missed.push(shown(probe));
    else expect(refusal.message).not.toContain(secret);
  }
  return missed;
}

/** True when the builder records evidence carrying this text (no refusal of any kind). */
function recorded(note: string): boolean {
  try {
    buildReceipt({ ...BUILD, evidence: { ...good(), note } });
    return true;
  } catch {
    return false;
  }
}

describe("wb-752.3 VC-4 live Furnace receipt: assessor", () => {
  it("passes evidence that satisfies every criterion: realised, no findings, zero control calls, exit 0", () => {
    const assessment = assessLive(good());
    expect(assessment.findings).toEqual([]);
    expect(assessment.unrealised).toEqual([]);
    expect(assessment.controlCallsObserved).toBe(0);
    const receipt = buildReceipt({ ...BUILD, evidence: good() });
    expect(receipt).toMatchObject({ contract: RECEIPT_CONTRACT, realised: true, pass: true, findings: [] });
    expect(exitCodeFor(receipt)).toBe(0);
  });

  it("carries the evidence-grade fields: contract, utc, revision, host, toolchain, run and attempt ids, transitions", () => {
    const receipt = buildReceipt({ ...BUILD, evidence: good() });
    expect(RECEIPT_CONTRACT).toBe("workbench.furnace-vc4/v1");
    expect(receipt).toMatchObject({
      utc: BUILD.utc,
      revision: "abc1234",
      node: "v22.0.0",
      arch: "x64",
      platform: "linux",
      toolchain: BUILD.toolchain,
      run: { runId: RUN, attemptIds: [ATTEMPT] },
      close: { controlCallsObserved: 0 },
    });
    expect(receipt.transitions.map((entry: { phase: string }) => entry.phase)).toEqual([...PHASES]);
    for (const entry of receipt.transitions) expect(Number.isFinite(Date.parse(entry.utc))).toBe(true);
  });

  it("C3 falsifier: a control verb issued after close is control-call-on-close and exits 1", () => {
    const evidence = good();
    evidence.close.argv.push(["-C", "/tmp/w", "--json", "run", "stop", RUN]);
    expect(rulesOf(evidence)).toEqual(["control-call-on-close"]);
    const receipt = buildReceipt({ ...BUILD, evidence });
    expect(receipt.close.controlCallsObserved).toBe(1);
    expect(receipt).toMatchObject({ realised: true, pass: false });
    expect(exitCodeFor(receipt)).toBe(1);
  });

  it("C3 falsifier: a control-capable SDK method is a control call even when no argv was recorded", () => {
    const evidence = good();
    evidence.close.observerCalls.push("runs.stop");
    expect(rulesOf(evidence)).toEqual(["control-call-on-close"]);
    expect(assessLive(evidence).controlCallsObserved).toBe(1);
  });

  it("classifies the verb after global flags, so a stop hidden behind -C/--request-id is still a control call", () => {
    expect(verbOf(["-C", "/tmp/w", "--request-id", "r1", "--json", "run", "status", RUN])).toBe("run status");
    expect(verbOf(["--json", "attempt", "list", RUN])).toBe("attempt list");
    expect(verbOf(["--json", "logs", RUN])).toBe("logs");
    expect(verbOf(["-C", "/tmp/w", "--request-id", "r1", "attempt", "stop", ATTEMPT])).toBe("attempt stop");
    const evidence = good();
    evidence.close.argv.push(["-C", "/tmp/w", "--request-id", "r1", "attempt", "stop", ATTEMPT]);
    expect(rulesOf(evidence)).toEqual(["control-call-on-close"]);
  });

  it("C3 falsifier: a Run stopped, cancelled or taken over by another controller is run-changed-on-close", () => {
    const stopped = good();
    stopped.close.runAfter.state = "stopped";
    expect(rulesOf(stopped)).toEqual(["run-changed-on-close"]);
    const cancelled = good();
    cancelled.close.runAfter.cancelledAttemptIds = [ATTEMPT];
    expect(rulesOf(cancelled)).toEqual(["run-changed-on-close"]);
    const taken = good();
    taken.close.runAfter.controllerSessionId = "ses-2";
    expect(rulesOf(taken)).toEqual(["run-changed-on-close"]);
    const lost = good();
    lost.close.runAfter.attemptIds = [];
    expect(rulesOf(lost)).toEqual(["run-changed-on-close"]);
  });

  it("allows the Run its own progress: completed with a new Attempt is not a finding", () => {
    const evidence = good();
    evidence.close.runAfter = { state: "completed", controllerSessionId: null, attemptIds: [ATTEMPT, "frn-atm-fx-wisp-ccc-2"], cancelledAttemptIds: [] };
    expect(rulesOf(evidence)).toEqual([]);
  });

  it("C2 falsifier: reconnect alone must not restore freshness (observer or projection node)", () => {
    const observer = good();
    observer.transitions[2] = transition("reconnected", 3, { freshness: "current" });
    expect(rulesOf(observer)).toContain("reconnect-upgraded-freshness");
    const node = good();
    node.transitions[2] = { ...node.transitions[2], attemptNodeFreshness: "current" } as Transition;
    expect(rulesOf(node)).toEqual(["reconnect-upgraded-freshness"]);
  });

  it("C2 falsifier: disconnect must make the reading and the nodes stale, keeping the last-known running label", () => {
    const notStale = good();
    notStale.transitions[1] = { ...notStale.transitions[1], freshness: "current" } as Transition;
    expect(rulesOf(notStale)).toContain("disconnect-not-stale");
    const nodeCurrent = good();
    nodeCurrent.transitions[1] = { ...nodeCurrent.transitions[1], attemptNodeFreshness: "current" } as Transition;
    expect(rulesOf(nodeCurrent)).toContain("disconnect-not-stale");
    const erased = good();
    erased.transitions[1] = { ...erased.transitions[1], attemptState: "succeeded", attemptNodeStatusText: "succeeded" } as Transition;
    expect(rulesOf(erased)).toEqual(["last-known-running-lost"]);
  });

  it("C2 falsifier: only a read-current snapshot clears stale", () => {
    const evidence = good();
    evidence.transitions[3] = { ...evidence.transitions[3], freshness: "stale", attemptNodeFreshness: "stale" } as Transition;
    expect(rulesOf(evidence)).toEqual(["reconcile-not-current"]);
  });

  it("C2 falsifier: transitions out of order or with a clock running backwards are transition-order", () => {
    const evidence = good();
    evidence.transitions[3] = { ...evidence.transitions[3], utc: T(0) } as Transition;
    expect(rulesOf(evidence)).toEqual(["transition-order"]);
    const swapped = good();
    [swapped.transitions[1], swapped.transitions[2]] = [swapped.transitions[2] as Transition, swapped.transitions[1] as Transition];
    expect(rulesOf(swapped)).toContain("transition-order");
  });

  it("C4 falsifier: an ownership edge without native confirmation is invented-edge", () => {
    const evidence = good();
    delete evidence.topology.relations[0]?.nativeConfirmationRef;
    expect(rulesOf(evidence)).toEqual(["invented-edge"]);
    const unrecorded = good();
    (unrecorded.topology.relations[0] as Relation).nativeConfirmationRef = "frn-req-never-made";
    expect(rulesOf(unrecorded)).toEqual(["invented-edge"]);
  });

  it("C4 falsifier: an edge to an Attempt the producer never listed, a non-ownership edge or a foreign owner is invented-edge", () => {
    const unknown = good();
    (unknown.topology.relations[0] as Relation).to = "frn-atm-ghost";
    expect(rulesOf(unknown)).toContain("invented-edge");
    const dependency = good();
    dependency.topology.relations.push({ from: ATTEMPT, to: ATTEMPT, kind: "dependency", provenanceSource: "furnace", nativeConfirmationRef: "frn-req-attempts-1" });
    expect(rulesOf(dependency)).toEqual(["invented-edge"]);
    const foreign = good();
    (foreign.topology.relations[0] as Relation).from = "frn-run-other";
    expect(rulesOf(foreign)).toContain("invented-edge");
  });

  it("C4 falsifier: a node for an Attempt the producer never listed is invented-node", () => {
    const evidence = good();
    evidence.topology.nodes.push({ type: "attempt", id: "frn-atm-ghost" });
    expect(rulesOf(evidence)).toEqual(["invented-node"]);
  });

  it("C4 falsifier: an interval the producer did not state is invented-interval; an open interval over a finished Attempt too", () => {
    const shifted = good();
    shifted.topology.intervals = [{ attemptId: ATTEMPT, startedAt: T(5) }];
    expect(rulesOf(shifted)).toEqual(["invented-interval"]);
    const finished = good();
    finished.topology.nativeIntervals = [{ attemptId: ATTEMPT, startedAt: T(0), finishedAt: T(7) }];
    expect(rulesOf(finished)).toEqual(["invented-interval"]);
    const closed = good();
    closed.topology.nativeIntervals = [{ attemptId: ATTEMPT, startedAt: T(0), finishedAt: T(7) }];
    closed.topology.intervals = [{ attemptId: ATTEMPT, startedAt: T(0), endedAt: T(7) }];
    expect(rulesOf(closed)).toEqual([]);
  });

  it("C4 falsifier: partial or unknown completeness must be stated as a gap, never silently filled", () => {
    const evidence = good();
    evidence.topology.completeness = "partial";
    expect(rulesOf(evidence)).toEqual(["gap-unstated"]);
    evidence.topology.gaps = ["attempt page incomplete (next_cursor present)"];
    expect(rulesOf(evidence)).toEqual([]);
  });

  it("C1 falsifier: a parent workflow invocation, a self-owned controller or non-external ownership fails attach", () => {
    const parent = good();
    parent.attach.parentInvocationId = "inv-1";
    expect(rulesOf(parent)).toEqual(["parent-invocation-present"]);
    const own = good();
    own.attach.controllerPid = own.attach.runnerPid;
    expect(rulesOf(own)).toEqual(["parent-invocation-present"]);
    const owned = good();
    owned.attach.ownership = "pi";
    expect(rulesOf(owned)).toEqual(["attach-not-external"]);
  });

  it("C5: not realised is exit 2 with a diagnostic naming the unrealised step, never a pass and never a finding list", () => {
    const missing = buildReceipt({ ...BUILD, evidence: { ...good(), environment: { furnaceAvailable: false, diagnostic: "furnace: command not found" } } });
    expect(missing).toMatchObject({ realised: false, pass: false });
    expect(missing.unrealised[0]).toMatchObject({ step: "furnace-unavailable" });
    expect(missing.unrealised[0].diagnostic).toContain("furnace: command not found");
    expect(exitCodeFor(missing)).toBe(2);

    const finished = good();
    finished.transitions[0] = { ...finished.transitions[0], runState: "completed", attemptState: "succeeded", attemptNodeStatusText: "succeeded" } as Transition;
    const early = buildReceipt({ ...BUILD, evidence: finished });
    expect(early.unrealised[0]).toMatchObject({ step: "run-not-running-before-disconnect" });
    expect(early.findings).toEqual([]);
    expect(exitCodeFor(early)).toBe(2);

    const noAcquire = good();
    noAcquire.acquisition = { mode: "supplied", error: "FURNACE_RUN_ID names no Run" };
    expect(buildReceipt({ ...BUILD, evidence: noAcquire }).unrealised[0]).toMatchObject({ step: "run-not-acquired" });

    const partial = good();
    partial.transitions = partial.transitions.slice(0, 2);
    expect(buildReceipt({ ...BUILD, evidence: partial }).unrealised[0]).toMatchObject({ step: "transition-missing" });
  });

  it("an unrealised receipt wins over findings: exit 2 even when a violation was also measured", () => {
    const evidence = good();
    evidence.close.argv.push(["run", "stop", RUN]);
    evidence.transitions = evidence.transitions.slice(0, 3);
    const receipt = buildReceipt({ ...BUILD, evidence });
    expect(receipt.realised).toBe(false);
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("C6 falsifier: a receipt input containing an Authorization bearer value makes the builder throw without echoing it", () => {
    const header = good() as Evidence & { note?: string };
    header.note = "Authorization: Bearer sk-live-0123456789abcdef";
    let thrown: unknown;
    try {
      buildReceipt({ ...BUILD, evidence: header });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(Error);
    expect(String((thrown as Error).message)).not.toContain("sk-live-0123456789abcdef");
    expect(() => buildReceipt({ ...BUILD, evidence: { ...good(), headers: { authorization: "Basic abcdef" } } })).toThrow();
    expect(() => buildReceipt({ ...BUILD, toolchain: { ...BUILD.toolchain, sdk: "bearer abcdefgh12345" }, evidence: good() })).toThrow();
  });

  it("C6 falsifier: a credential split by a control, line break or default-ignorable separator is still refused (separators normalise to one space; deletion never precedes the check)", () => {
    const token = "sk-live-0123456789abcdef";
    const sep = (code: number): string => String.fromCharCode(code);
    const shapes: string[] = [
      `auth${sep(10)}Bearer ${token}`,
      `Bearer${sep(9)}${token}`,
      `Bearer${sep(10)}${token}`,
      `Bearer${sep(11)}${token}`,
      `Bearer${sep(0x85)}${token}`,
      `Bearer${sep(0)}${token}`,
      `Bearer${sep(0x200b)}${token}`,
      `Bearer${sep(0xfeff)}${token}`,
      `Bearer${sep(0x2028)}${token}`,
      `Bearer${sep(13)}${sep(10)}${token}`,
      `bearer ${token}`,
    ];
    for (const shape of shapes) {
      const evidence = { ...good(), note: shape } as Evidence;
      let thrown: unknown;
      try {
        buildReceipt({ ...BUILD, evidence });
      } catch (error) {
        thrown = error;
      }
      expect(thrown, `shape ${JSON.stringify(shape)} must be refused`).toBeInstanceOf(Error);
      expect(String((thrown as Error).message)).not.toContain(token);
    }
    expect(() => buildReceipt({ ...BUILD, evidence: { ...good(), nested: { list: [`Bearer${sep(0x85)}${token}`] } } as Evidence })).toThrow();
    expect(() => buildReceipt({ ...BUILD, evidence: { ...good(), note: `Bearer${sep(0xad)}word and plain text` } as Evidence })).not.toThrow();
    expect(() => buildReceipt({ ...BUILD, evidence: { ...good(), note: "nothing secret here, bearer of no news" } as Evidence })).not.toThrow();
  });

  it("C6 falsifier (respin 3, U1): ANY default-ignorable code point, astral ones included, separates a bare Bearer from its token, and an escape sequence is one separator unit", () => {
    const token = "SYNTHETICTOKEN0123456789";
    const ESC = cp(0x1b);
    // The six default-ignorables and the two SGR shapes gate-1 measured unrefused at 0f69fc5 and on its landing merge.
    const measured = [0xe0020, 0x1d173, 0x1bca0, 0xe0001, 0xe007f, 0xfff0].map((code) => `Bearer${cp(code)}${token}`);
    expect(unrefused([...measured, `${ESC}[0mBearer ${token}`, `Bearer${ESC}[0m${token}`], token)).toEqual([]);
    // An escape sequence whose parameters hold a delimiter is still ONE separator unit, never ESC and then visible text.
    expect(unrefused([`Bearer${ESC}[1;31m${token}`], token)).toEqual([]);
    // The property, never a list: every Default_Ignorable_Code_Point code point (4174 at Unicode 17), every control, every
    // space, line or paragraph separator and every lone surrogate is a separator (the trunk UNSAFE_UNIT set plus spacing).
    // The refusal precedes every judgement, so a bare evidence record carries each probe (any other error is a miss).
    const units: number[] = [];
    for (let code = 0; code <= 0x10ffff; code++) if (SEPARATOR_CODE_POINT.test(cp(code))) units.push(code);
    expect(units.filter((code) => DEFAULT_IGNORABLE.test(cp(code))).length).toBeGreaterThan(4000);
    expect(units.length).toBeGreaterThan(6000);
    const missed = unrefused(
      units.map((code) => `Bearer${cp(code)}${token}`),
      token,
      (probe) => ({ evidence: { note: probe } }),
    );
    expect(missed.length, missed.slice(0, 12).join(" ")).toBe(0);
  });

  it("C6 falsifier (respin 3, U2): an invisible, control or escape glued INSIDE a scheme, key name or token is still refused (a refusal-only tolerant reading of the raw text); prose that merely resembles one is still recorded", () => {
    const [NUL, BEL, LF, ESC, C1, ZWSP, RLO, BOM, LONE] = [0x00, 0x07, 0x0a, 0x1b, 0x80, 0x200b, 0x202e, 0xfeff, 0xd800].map(cp);
    const probes = [
      `token: Bear${ZWSP}er GLUEDSCHEMEONE`, // inside the scheme (the 952 corpus S4)
      `x${LF}Bear${BEL}er GLUEDSCHEMETWO`, // a separator before it, a control inside it (M1)
      `x${ZWSP}Bea${ZWSP}rer GLUEDSCHEMETHREE`, // one unit both before and inside it (X1)
      `x${BEL}Bear${BEL}er${BEL}GLUEDSCHEMEFOUR`, // before, inside and after it (X4)
      `x${BOM}Bea${BOM}rer${BOM}GLUEDSCHEMEFIVE`, // inside it and as its space, no Authorization key before it (X3)
      `Bea${C1}rer GLUEDSCHEMESIX`, // a C1 control inside a bare scheme
      `Bear${ESC}[0mer GLUEDSCHEMESEVEN`, // a CSI sequence inside the scheme
      `Bea${ESC}]0;t${BEL}rer GLUEDSCHEMEEIGHT`, // an OSC string sequence inside the scheme
      `x${RLO}Bearer SEC${RLO}GLUEDTOKENNINE`, // inside the token (X5)
      `Bearer SEC${LONE}GLUEDTOKENTEN`, // a lone surrogate inside the token
      `Bearer SEC${NUL}GLUEDTOKENELEVEN`, // NUL inside the token
      `Author${ZWSP}ization: GLUEDKEYTWELVE`, // inside the authorization key name
    ];
    expect(unrefused(probes, "GLUED")).toEqual([]);
    const prose = [`Bearer${cp(0xad)}word and plain text`, "nothing secret here, bearer of no news", "the pallbearer carried the casket", `soft${cp(0xad)}hyphenated prose about a bearer`];
    for (const text of prose) expect(recorded(text), shown(text)).toBe(true);
  });

  it("C6 falsifier (respin 3, U4): a credential in an object KEY is refused although the JSON text escapes its separator (the key walk is load-bearing; gate mutant M1 dropped it)", () => {
    const token = "sk-live-0123456789abcdef";
    const keyed: Placement = (key) => ({ evidence: { ...good(), keyed: { [key]: 1 } } });
    expect(unrefused([`Bearer${cp(0x09)}${token}`, `Bearer${cp(0x0a)}${token}`], token, keyed)).toEqual([]);
  });

  it("C6 falsifier (respin 3, U7): the shared redactor's shapes are refused as well (src/workbench/redaction.ts SCHEMES, KEY_PREFIXES, ASSIGNMENT_KEYS, SECRET_FIELD), plain and glued; prose that names them is still recorded", () => {
    const value = "SYNTHETICVALUE0123";
    const [NUL, BEL, ZWSP, LRM, RLM, WJ, BOM] = [0x00, 0x07, 0x200b, 0x200e, 0x200f, 0x2060, 0xfeff].map(cp);
    const keys = ["api_key", "api-key", "apikey", "access_token", "access-token", "accesstoken", "refresh_token", "refresh-token", "refreshtoken", "password", "secret", "aws_secret_access_key", "aws_session_token"];
    const probes = [
      `Basic ${value}`, // a bare Basic value
      `key sk-ant-${value}`,
      `sk-proj-${value}`,
      `ghp_${value}`,
      `github_pat_${value}`,
      ...keys.map((key) => `${key}=${value}`),
      `api_key: ${value}`,
      `password = ${value}`,
      `{'password': '${value}'}`,
      // The same classes glued (952 corpus X8, Z2, Z3, Z1, Z4, K1, K5, K7).
      `x${NUL}Ba${NUL}sic ${value}`,
      `see gh${LRM}p_${value}`,
      `sk-${RLM}ant-${value}`,
      `sk-ant-${ZWSP}${value}`,
      `github${BOM}_pat_${value}`,
      `pass${BEL}word=${value}`,
      `api${WJ}_key=${value}`,
      `pass${ZWSP}word="two ${value}"`,
    ];
    expect(unrefused(probes, value)).toEqual([]);
    // A field named for a secret, whatever its value. A control inside or after the name is escaped in the JSON text, so
    // only the key reading sees that name.
    const field: Placement = (key) => ({ evidence: { ...good(), settings: { [key]: value } } });
    expect(unrefused(["password", "api_key", "authorization", `pass${BEL}word`, `password${BEL}`], value, field)).toEqual([]);
    // A field whose name ENDS in a secret name: only the JSON text joins that name to its quote and colon.
    expect(unrefused(["client_secret", "db_password"], value, field)).toEqual([]);
    // An assignment flag split from its value across two adjacent strings (an argv) is refused too.
    expect(unrefused(["password:"], value, (flag) => ({ evidence: { ...good(), argv: ["--header", flag, value] } }))).toEqual([]);
    const prose = ["a password is required", "the secret sauce", "basic usage notes", "Bearer word", "a setting named basicAuthFallback", "task-antenna and ghp", "keys start with the sk-ant- prefix"];
    for (const text of prose) expect(recorded(text), text).toBe(true);
    // A field holding names only is recorded: a name alone is not a secret.
    expect(() => buildReceipt({ ...BUILD, evidence: { ...good(), secret_env: ["SYNTHETIC_API_KEY"] } })).not.toThrow();
  });

  it("names the contract rules and steps exactly so a quiet rename is caught", () => {
    expect([...FINDING_RULES]).toEqual([
      "attach-not-external",
      "attach-not-inspected",
      "parent-invocation-present",
      "transition-order",
      "disconnect-not-stale",
      "last-known-running-lost",
      "reconnect-upgraded-freshness",
      "reconcile-not-current",
      "control-call-on-close",
      "run-changed-on-close",
      "store-changed-by-attach",
      "invented-edge",
      "invented-node",
      "invented-interval",
      "gap-unstated",
    ]);
    expect([...UNREALISED_STEPS]).toEqual([
      "fixture-identity-absent",
      "fixture-root-refused",
      "furnace-unavailable",
      "run-not-acquired",
      "binary-identity-unrecorded",
      "measurement-error",
      "run-not-running-before-disconnect",
      "transition-missing",
      "stores-not-hashed",
      "run-progressed-during-attach",
    ]);
    expect([...PHASES]).toEqual(["attached", "disconnected", "reconnected", "reconciled"]);
  });
});

describe("wb-752.3 VC-4 live Furnace receipt: placement and runner shape", () => {
  const runner = sourceOf("../qa/workbench/live-furnace-vc4.mjs");
  const receipt = sourceOf("../qa/workbench/live-furnace-vc4-receipt.mjs");

  it("keeps the receipt module pure: no imports, no dynamic load, no wall clock or random source", () => {
    expect(specifiersOf(receipt)).toEqual([]);
    expect(receipt).not.toMatch(DYNAMIC_LOAD);
    expect(receipt).not.toMatch(/Date\.now|Math\.random|process\./);
  });

  it("drives the compiled observer modules only: no src import, no dynamic load, no process.exit, no doctor probe", () => {
    const specifiers = specifiersOf(runner);
    expect(specifiers).toContain("../../dist/workbench/furnace-observer.js");
    expect(specifiers).toContain("../../dist/workbench/observation.js");
    expect(specifiers).toContain("../../dist/workbench/providers/furnace.js");
    expect(specifiers).toContain("./live-furnace-vc4-receipt.mjs");
    for (const specifier of specifiers) expect(specifier).not.toMatch(/\/src\//);
    expect(runner).not.toMatch(DYNAMIC_LOAD);
    expect(runner).not.toMatch(/process\.exit\s*\(/);
    expect(runner).not.toMatch(/doctor/);
  });

  it("attaches by Run ID only: no start, adopt, resume, pause, stop, retry or unlock verb is ever spoken by the runner", () => {
    for (const verb of ["start", "adopt", "resume", "pause", "stop", "unlock", "retry", "clear"]) expect(runner).not.toMatch(new RegExp(`["'\`]${verb}["'\`]`));
    expect(runner).toMatch(/fixtureIdentityOf\(process\.env\)/);
    expect(runner).not.toMatch(/FURNACE_WORKSPACE|process\.env\.FURNACE_RUN_ID/);
    expect(runner).toMatch(/exitCodeFor\(receipt\)/);
    expect(runner).toMatch(/process\.exitCode\s*=\s*code;\s*$/);
  });

  it("registers the runner as one additive Forge command outside the default gate, leaving the gate byte-for-byte unchanged", () => {
    const forge = sourceOf("../forge.toml");
    expect(forge).toContain('[build.commands.furnace-vc4-live]\ncommand = "node qa/workbench/live-furnace-vc4.mjs"\ntimeout = 240\n');
    expect(forge.match(/\[build\.commands\.furnace-vc4-live\]/g)).toHaveLength(1);
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[0];
    expect(gate).toBe('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]');
  });
});

describe("wb-752.3 respin (BOUNDARY gate substance check): the receipt judges each external-Run rule", () => {
  it("item 5: the fixture identity is exactly PI_FURNACE_FIXTURE_ROOT and PI_FURNACE_FIXTURE_RUN_ID; the old self-chosen names are ignored", () => {
    expect(FIXTURE_ENV).toEqual({ root: "PI_FURNACE_FIXTURE_ROOT", runId: "PI_FURNACE_FIXTURE_RUN_ID" });
    expect(fixtureIdentityOf({ PI_FURNACE_FIXTURE_ROOT: ROOT, PI_FURNACE_FIXTURE_RUN_ID: RUN })).toEqual({ root: ROOT, runId: RUN, missing: [] });
    expect(fixtureIdentityOf({}).missing).toEqual(["PI_FURNACE_FIXTURE_ROOT", "PI_FURNACE_FIXTURE_RUN_ID"]);
    expect(fixtureIdentityOf({ PI_FURNACE_FIXTURE_ROOT: ROOT, PI_FURNACE_FIXTURE_RUN_ID: "" }).missing).toEqual(["PI_FURNACE_FIXTURE_RUN_ID"]);
    expect(fixtureIdentityOf({ PI_FURNACE_FIXTURE_ROOT: "  ", PI_FURNACE_FIXTURE_RUN_ID: RUN }).missing).toEqual(["PI_FURNACE_FIXTURE_ROOT"]);
    expect(fixtureIdentityOf({ FURNACE_RUN_ID: RUN, FURNACE_WORKSPACE: ROOT }).missing).toEqual(["PI_FURNACE_FIXTURE_ROOT", "PI_FURNACE_FIXTURE_RUN_ID"]);
  });

  it("item 5: an absent fixture identity is not realised (exit 2), names both variables, and pre-empts every other judgement", () => {
    const evidence = good();
    evidence.fixture = { realRoot: null, repoRoot: REPO, beadsStore: false, runRecord: false, launcher: null };
    evidence.close.argv.push(["-C", ROOT, "run", "stop", RUN, "--json"]);
    const receipt = buildReceipt({ ...BUILD, evidence });
    expect(receipt).toMatchObject({ realised: false, pass: false, findings: [] });
    expect(receipt.unrealised).toHaveLength(1);
    expect(receipt.unrealised[0].step).toBe("fixture-identity-absent");
    expect(receipt.unrealised[0].diagnostic).toContain("PI_FURNACE_FIXTURE_ROOT");
    expect(receipt.unrealised[0].diagnostic).toContain("PI_FURNACE_FIXTURE_RUN_ID");
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("item 1: only a disposable /tmp/pi-external-furnace-realbd.* root is accepted, never the product store, this repository or another prefix", () => {
    expect(FIXTURE_ROOT_PREFIX).toBe("/tmp/pi-external-furnace-realbd.");
    expect(FIXTURE_ROOT_PATTERN.test(ROOT)).toBe(true);
    expect(fixtureRootRefusal(good().fixture)).toBeNull();
    for (const root of [
      "/tmp/pi-furnace-vc4-live.UDAAyP",
      "/tmp/pi-external-furnace-realbd.x/nested",
      "/tmp/pi-external-furnace-realbdX",
      "/var/tmp/pi-external-furnace-realbd.x",
      "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/PrimaryInstallation/src/Pi-subagents",
    ]) {
      expect(FIXTURE_ROOT_PATTERN.test(root)).toBe(false);
      expect(fixtureRootRefusal({ ...good().fixture, realRoot: root })).toMatch(/disposable/);
    }
    expect(fixtureRootRefusal({ ...good().fixture, realRoot: null })).toMatch(/does not resolve/);
  });

  it("item 1: refuses a root that is the repository, lacks the real bd store or the Run record, or was not made by the tier launcher", () => {
    const base = good().fixture;
    expect(fixtureRootRefusal({ ...base, repoRoot: ROOT })).toMatch(/repository/);
    expect(fixtureRootRefusal({ ...base, repoRoot: "/tmp" })).toMatch(/repository/);
    expect(fixtureRootRefusal({ ...base, beadsStore: false })).toMatch(/embeddeddolt/);
    expect(fixtureRootRefusal({ ...base, runRecord: false })).toMatch(/run\.json/);
    expect(LAUNCHER_RECORD).toBe("launcher/fixture.json");
    expect(fixtureRootRefusal({ ...base, launcher: null })).toMatch(/launcher/);
    expect(fixtureRootRefusal({ ...base, launcher: { ...launcher(), runId: "frn-run-other" } })).toMatch(/launcher/);
    expect(fixtureRootRefusal({ ...base, launcher: { ...launcher(), root: "/tmp/pi-external-furnace-realbd.other" } })).toMatch(/launcher/);
    expect(fixtureRootRefusal({ ...base, launcher: { ...launcher(), contract: "workbench.other/v1" } })).toMatch(/launcher/);
    expect(fixtureRootRefusal({ ...base, launcher: { ...launcher(), requestId: "" } })).toMatch(/launcher/);
    expect(fixtureRootRefusal({ ...base, runId: "../../etc/passwd" })).toMatch(/Run identity/);
  });

  it("item 1: the assessor re-judges the root itself, so a refused root is not realised (exit 2) whatever the runner did", () => {
    const evidence = good();
    evidence.fixture = { ...evidence.fixture, realRoot: "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/PrimaryInstallation/src/Pi-subagents" };
    const receipt = buildReceipt({ ...BUILD, evidence });
    expect(receipt.unrealised[0]).toMatchObject({ step: "fixture-root-refused" });
    expect(receipt.unrealised[0].diagnostic).toMatch(/disposable/);
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("item 1: the Run must come from the tier launcher's own request, be created before the attach, and by another process", () => {
    const foreign = good();
    foreign.attach.creatingRequestId = "someone-else-1";
    expect(rulesOf(foreign)).toEqual(["attach-not-external"]);
    const late = good();
    late.attach.runCreatedAt = T(5);
    expect(rulesOf(late)).toEqual(["attach-not-external"]);
    const unrecorded = good();
    delete unrecorded.attach.runCreatedAt;
    expect(rulesOf(unrecorded)).toEqual(["attach-not-external"]);
    const self = good();
    self.attach.launcherPid = self.attach.runnerPid;
    expect(rulesOf(self)).toEqual(["parent-invocation-present"]);
  });

  it("item 2: the attach must be nativeFurnaceRunInspect's successful furnace.run.inspect/v1 envelope for this Run and root", () => {
    const other = good();
    other.attach.via = "sdk-run-status";
    expect(rulesOf(other)).toEqual(["attach-not-inspected"]);
    const contract = good();
    contract.inspect.contract = "furnace.run.status/v1";
    expect(rulesOf(contract)).toEqual(["attach-not-inspected"]);
    const kind = good();
    kind.inspect.kind = "run_status";
    expect(rulesOf(kind)).toEqual(["attach-not-inspected"]);
    const wrongRun = good();
    wrongRun.inspect.runId = "frn-run-other";
    expect(rulesOf(wrongRun)).toEqual(["attach-not-inspected"]);
    const wrongRoot = good();
    wrongRoot.inspect.workspace = "/tmp/pi-external-furnace-realbd.other";
    expect(rulesOf(wrongRoot)).toEqual(["attach-not-inspected"]);
    const failed = good();
    failed.inspect.exitCode = 3;
    expect(rulesOf(failed)).toEqual(["attach-not-inspected"]);
  });

  it("item 2: compareStores names every added, removed and modified file", () => {
    const before = { a: "1", b: "2", c: "3" };
    expect(compareStores(before, { ...before })).toEqual({ equal: true, added: [], removed: [], modified: [] });
    expect(compareStores(before, { a: "1", b: "9", d: "4" })).toEqual({ equal: false, added: ["d"], removed: ["c"], modified: ["b"] });
  });

  it("item 2: byte-identical .beads and .furnace hashes before the attach and after the close are recorded in the receipt", () => {
    expect(HASHED_STORES).toEqual([".beads", ".furnace"]);
    const receipt = buildReceipt({ ...BUILD, evidence: good() });
    expect(receipt.stores).toMatchObject({
      equal: true,
      changed: { added: [], removed: [], modified: [] },
      before: { at: T(1), digest: "d".repeat(64), count: 4 },
      after: { at: T(6), digest: "d".repeat(64), count: 4 },
    });
    expect(Object.keys(receipt.stores.before.files)).toHaveLength(4);
  });

  it("item 2: a store byte changed while the Run stood still is store-changed-by-attach (exit 1), naming the path", () => {
    const modified = good();
    modified.stores.after = { ...modified.stores.after, files: { ...modified.stores.after.files, ".beads/metadata.json": "f".repeat(64) } };
    expect(rulesOf(modified)).toEqual(["store-changed-by-attach"]);
    const receipt = buildReceipt({ ...BUILD, evidence: modified });
    expect(receipt.findings[0].detail).toContain(".beads/metadata.json");
    expect(receipt.stores.equal).toBe(false);
    expect(exitCodeFor(receipt)).toBe(1);
    const added = good();
    added.stores.after = { ...added.stores.after, files: { ...added.stores.after.files, ".furnace/runs/x/new.json": "e".repeat(64) } };
    expect(rulesOf(added)).toEqual(["store-changed-by-attach"]);
    const removed = good();
    const { ".beads/metadata.json": _gone, ...rest } = removed.stores.after.files;
    removed.stores.after = { ...removed.stores.after, files: rest };
    expect(rulesOf(removed)).toEqual(["store-changed-by-attach"]);
  });

  it("item 2: a store change while the Run made its own progress is not realised, never a pass and never excused as a finding", () => {
    const evidence = good();
    evidence.stores.after = { ...evidence.stores.after, files: { ...evidence.stores.after.files, [`.furnace/runs/${RUN}/run.json`]: "f".repeat(64) } };
    evidence.close.runAfter = summary({ state: "completed", updatedAt: T(8), controllerLive: false, attemptStates: { [ATTEMPT]: "succeeded" } });
    const receipt = buildReceipt({ ...BUILD, evidence });
    expect(receipt).toMatchObject({ realised: false, pass: false });
    expect(receipt.unrealised[0].step).toBe("run-progressed-during-attach");
    expect(receipt.unrealised[0].diagnostic).toContain("run.json");
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("item 2: progress is never inferred from an absent field, and cannot excuse a change a control call or a halted Run explains", () => {
    const silent = good();
    silent.stores.after = { ...silent.stores.after, files: { ...silent.stores.after.files, [`.furnace/runs/${RUN}/run.json`]: "f".repeat(64) } };
    silent.close.runAfter = { state: "active", controllerSessionId: "ses-1", attemptIds: [ATTEMPT], cancelledAttemptIds: [] };
    expect(rulesOf(silent)).toEqual(["store-changed-by-attach"]);
    const halted = good();
    halted.stores.after = { ...halted.stores.after, files: { ...halted.stores.after.files, [`.furnace/runs/${RUN}/run.json`]: "f".repeat(64) } };
    halted.close.argv.push(["-C", ROOT, "run", "stop", RUN, "--json"]);
    halted.close.runAfter = summary({ state: "stopped", updatedAt: T(8) });
    expect(rulesOf(halted)).toEqual(["control-call-on-close", "run-changed-on-close", "store-changed-by-attach"]);
    expect(exitCodeFor(buildReceipt({ ...BUILD, evidence: halted }))).toBe(1);
  });

  it("item 2: hashes that are missing, cover one store only, or do not enclose the attach..close window are not realised", () => {
    const furnaceOnly = good();
    const onlyFurnace = (hashed: StoreHashes): StoreHashes => ({ ...hashed, files: Object.fromEntries(Object.entries(hashed.files).filter(([path]) => path.startsWith(".furnace/"))) });
    furnaceOnly.stores = { before: onlyFurnace(furnaceOnly.stores.before), after: onlyFurnace(furnaceOnly.stores.after) };
    expect(buildReceipt({ ...BUILD, evidence: furnaceOnly }).unrealised[0]).toMatchObject({ step: "stores-not-hashed" });
    const lateBefore = good();
    lateBefore.stores.before = { ...lateBefore.stores.before, at: T(2) };
    expect(buildReceipt({ ...BUILD, evidence: lateBefore }).unrealised[0]).toMatchObject({ step: "stores-not-hashed" });
    const earlyAfter = good();
    earlyAfter.stores.after = { ...earlyAfter.stores.after, at: T(4) };
    expect(buildReceipt({ ...BUILD, evidence: earlyAfter }).unrealised[0]).toMatchObject({ step: "stores-not-hashed" });
    const { stores: _stores, ...unhashed } = good();
    const receipt = buildReceipt({ ...BUILD, evidence: unhashed });
    expect(receipt.unrealised[0]).toMatchObject({ step: "stores-not-hashed" });
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("item 3: nativeFurnaceRunInspect's version and run inspect are reads; doctor, run start, run resume and run list are not", () => {
    expect([...READ_ONLY_VERBS]).toEqual(["version", "run inspect", "run status", "attempt list", "logs"]);
    expect(verbOf(["-C", ROOT, "version", "--json"])).toBe("version");
    expect(verbOf(["-C", ROOT, "run", "inspect", RUN, "--json"])).toBe("run inspect");
    const reads = good();
    reads.close.argv.push(["-C", ROOT, "version", "--json"], ["-C", ROOT, "run", "inspect", RUN, "--json"]);
    expect(rulesOf(reads)).toEqual([]);
    for (const words of [["doctor"], ["run", "start", "vc4-external"], ["run", "resume", RUN, "--continue"], ["run", "list"]]) {
      const probed = good();
      probed.close.argv.push(["-C", ROOT, ...words, "--json"]);
      expect(rulesOf(probed)).toEqual(["control-call-on-close"]);
    }
  });

  it("item 6: the binary identity is the inspect envelope's version block, verbatim; a prose-derived furnace identity is refused", () => {
    expect(BINARY_IDENTITY_SOURCE).toBe("furnace.run.inspect/v1#version");
    const receipt = buildReceipt({ ...BUILD, evidence: good() });
    expect(receipt.binary).toEqual(good().binary);
    expect(receipt.toolchain).not.toHaveProperty("furnace");
    expect(() =>
      buildReceipt({ ...BUILD, toolchain: { ...BUILD.toolchain, furnace: { version: "furnace 0.1.0 (e2294c9f00b3)", sha256: "00" } }, evidence: good() }),
    ).toThrow(/inspect envelope/);
  });

  it("item 6: a binary identity missing its path, digest or revision, or taken from anywhere but the envelope, is not realised", () => {
    const mutants: ((binary: BinaryIdentity) => void)[] = [
      (binary) => {
        delete binary.binary_path;
      },
      (binary) => {
        binary.binary_path = "furnace";
      },
      (binary) => {
        delete binary.binary_digest;
      },
      (binary) => {
        binary.binary_digest = "00";
      },
      (binary) => {
        binary.binary_revision = "";
      },
      (binary) => {
        binary.source = "furnace --version stdout";
      },
    ];
    for (const mutate of mutants) {
      const evidence = good();
      mutate(evidence.binary);
      const receipt = buildReceipt({ ...BUILD, evidence });
      expect(receipt.unrealised[0]).toMatchObject({ step: "binary-identity-unrecorded" });
      expect(exitCodeFor(receipt)).toBe(2);
    }
  });

  it("binds the receipt to the bytes it ran and the fixture it attached to: dirty flag, source digests, root, launcher and inspect", () => {
    const sources = { "qa/workbench/live-furnace-vc4.mjs": DIGEST };
    const receipt = buildReceipt({ ...BUILD, dirty: false, sources, evidence: good() });
    expect(receipt).toMatchObject({
      dirty: false,
      sources,
      fixture: { root: ROOT, runId: RUN, pattern: FIXTURE_ROOT_PATTERN.source, launcher: launcher() },
      inspect: { contract: "furnace.run.inspect/v1", creatingRequestId: REQUEST, workspace: ROOT },
    });
  });
});

describe("wb-752.3 respin: the tier launcher and the runner, read as text", () => {
  const runner = sourceOf("../qa/workbench/live-furnace-vc4.mjs");
  const launch = sourceOf("../qa/workbench/live-furnace-vc4-launch.mjs");
  const receiptModule = sourceOf("../qa/workbench/live-furnace-vc4-receipt.mjs");
  const PROBE_NAME = ["furnace", "capability", "probe", "does", "not", "exist"].join("-");
  const quoted = (word: string): RegExp => new RegExp(`["'\`]${word}["'\`]`, "g");

  it("item 1/3: the launcher alone starts the Run, once, inside a fresh mkdtemp /tmp/pi-external-furnace-realbd.* workspace with its own bd init", () => {
    expect(specifiersOf(launch)).toContain("./live-furnace-vc4-receipt.mjs");
    expect(launch).toMatch(/mkdtempSync\(FIXTURE_ROOT_PREFIX\)/);
    expect(launch).toMatch(/FIXTURE_ROOT_PATTERN\.test\(/);
    expect(launch.match(quoted("start"))).toHaveLength(1);
    expect(launch.match(quoted("init"))).toHaveLength(1);
    expect(launch).toMatch(/LAUNCHER_RECORD/);
    expect(launch).not.toMatch(DYNAMIC_LOAD);
    expect(launch).not.toMatch(/process\.exit\s*\(/);
  });

  it("item 3: neither the launcher nor the runner speaks a control verb or a capability probe", () => {
    for (const source of [launch, runner]) {
      expect(source).not.toMatch(/doctor/);
      for (const verb of ["stop", "resume", "adopt", "pause", "retry", "unlock", "clear"]) expect(source).not.toMatch(quoted(verb));
    }
    expect(runner).not.toMatch(quoted("start"));
    expect(runner).not.toMatch(quoted("list"));
    expect(runner).not.toMatch(/\bspawn\s*\(|spawnSync\(\s*["'`](?:furnace|bd|sh)["'`]/);
  });

  it("item 4: no bead or formula is named for the capability probe anywhere in the tier", () => {
    for (const source of [launch, runner, receiptModule]) expect(source).not.toContain(PROBE_NAME);
    expect(launch).toMatch(/const FORMULA = ["']vc4-external["']/);
  });

  it("item 2/5: the runner gates on the fixture identity and root first, then attaches through the compiled nativeFurnaceRunInspect", () => {
    expect(runner).toMatch(/fixtureRootRefusal\(/);
    expect(runner).toMatch(/nativeFurnaceRunInspect\(/);
    expect(runner).toMatch(/HASHED_STORES/);
  });

  it("item 6: the runner never reads a furnace identity from prose", () => {
    expect(runner).not.toMatch(/--version|binary sha256/);
  });
});

describe("wb-752.3 respin: the runner executed without a usable fixture identity", () => {
  const repoRoot = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
  const runnerPath = join(repoRoot, "qa/workbench/live-furnace-vc4.mjs");
  interface Outcome {
    status: number | null;
    stderr: string;
    receipt: { contract: string; realised: boolean; pass: boolean; findings: unknown[]; unrealised: { step: string; diagnostic: string }[] };
    calls: string;
  }

  function run(extra: Record<string, string>): Outcome {
    expect(existsSync(join(repoRoot, "dist/workbench/providers/furnace.js")), "the runner drives dist/: run `npm run build` (the forge gate builds before test)").toBe(true);
    const sandbox = mkdtempSync(join(tmpdir(), "vc4-identity-"));
    try {
      const sentinel = join(sandbox, "furnace-calls.log");
      const fake = join(sandbox, "furnace");
      writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$*" >> '${sentinel}'\nexit 97\n`);
      chmodSync(fake, 0o755);
      const receiptPath = join(sandbox, "receipt.json");
      const result = spawnSync(process.execPath, [runnerPath], {
        cwd: repoRoot,
        encoding: "utf8",
        env: { PATH: `${sandbox}:${process.env.PATH ?? ""}`, HOME: process.env.HOME ?? sandbox, VC4_RECEIPT: receiptPath, ...extra },
        timeout: 60_000,
      });
      return {
        status: result.status,
        stderr: result.stderr,
        receipt: JSON.parse(readFileSync(receiptPath, "utf8")),
        calls: existsSync(sentinel) ? readFileSync(sentinel, "utf8") : "",
      };
    } finally {
      rmSync(sandbox, { recursive: true, force: true });
    }
  }

  it("item 5: without PI_FURNACE_FIXTURE_ROOT / PI_FURNACE_FIXTURE_RUN_ID it exits 2 (fixture-identity-absent) and never calls furnace", () => {
    const outcome = run({});
    expect(outcome.status).toBe(2);
    expect(outcome.receipt).toMatchObject({ contract: RECEIPT_CONTRACT, realised: false, pass: false, findings: [] });
    expect(outcome.receipt.unrealised[0].step).toBe("fixture-identity-absent");
    expect(outcome.stderr).toContain("not realised");
    expect(outcome.calls).toBe("");
  }, 60_000);

  it("item 5: the old FURNACE_RUN_ID / FURNACE_WORKSPACE identity is ignored: still exit 2 and still no furnace call", () => {
    const outcome = run({ FURNACE_RUN_ID: RUN, FURNACE_WORKSPACE: tmpdir() });
    expect(outcome.status).toBe(2);
    expect(outcome.receipt.unrealised[0].step).toBe("fixture-identity-absent");
    expect(outcome.calls).toBe("");
  }, 60_000);

  it("item 1: a root outside /tmp/pi-external-furnace-realbd.* (here: this repository) is refused, exit 2, before any furnace call", () => {
    const outcome = run({ PI_FURNACE_FIXTURE_ROOT: repoRoot, PI_FURNACE_FIXTURE_RUN_ID: RUN });
    expect(outcome.status).toBe(2);
    expect(outcome.receipt.unrealised[0].step).toBe("fixture-root-refused");
    expect(outcome.receipt.unrealised[0].diagnostic).toMatch(/disposable/);
    expect(outcome.calls).toBe("");
  }, 60_000);
});
