/**
 * wb-752.3 (VC-4 residual): the live external Furnace Run acceptance receipt judges what it claims.
 *
 * Offline, no network and no furnace: the pure assessor is driven with an evidence record that satisfies every
 * criterion and with one mutant per guarantee, so an assessor that returned a constant (or ignored a field)
 * would fail here. The live runner is read as text only.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessLive,
  buildReceipt,
  exitCodeFor,
  FINDING_RULES,
  PHASES,
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
interface Evidence {
  environment: { furnaceAvailable: boolean; diagnostic?: string };
  acquisition: { mode: string; runId?: string; error?: string };
  attach: {
    runId: string;
    attachedBy: string;
    parentInvocationId: string | null;
    ownership: string;
    runnerPid: number;
    controllerPid: number | null;
  };
  transitions: Transition[];
  close: {
    observerCalls: string[];
    argv: string[][];
    runBefore: { state: string; controllerSessionId: string | null; attemptIds: string[]; cancelledAttemptIds: string[] };
    runAfter: { state: string; controllerSessionId: string | null; attemptIds: string[]; cancelledAttemptIds: string[] };
  };
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
    environment: { furnaceAvailable: true },
    acquisition: { mode: "out-of-band", runId: RUN },
    attach: { runId: RUN, attachedBy: "run-id", parentInvocationId: null, ownership: "external", runnerPid: 100, controllerPid: 4242 },
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
      runBefore: { state: "active", controllerSessionId: "ses-1", attemptIds: [ATTEMPT], cancelledAttemptIds: [] },
      runAfter: { state: "active", controllerSessionId: "ses-1", attemptIds: [ATTEMPT], cancelledAttemptIds: [] },
    },
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
  toolchain: { furnace: { version: "furnace 0.1.0 (e2294c9f00b3)", sha256: "00" }, bd: "1.1.0-rc.1", sdk: "@furnace/sdk@0.1.0", producer: "0.1.0" },
};

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

  it("names the contract rules and steps exactly so a quiet rename is caught", () => {
    expect([...FINDING_RULES]).toEqual([
      "attach-not-external",
      "parent-invocation-present",
      "transition-order",
      "disconnect-not-stale",
      "last-known-running-lost",
      "reconnect-upgraded-freshness",
      "reconcile-not-current",
      "control-call-on-close",
      "run-changed-on-close",
      "invented-edge",
      "invented-node",
      "invented-interval",
      "gap-unstated",
    ]);
    expect([...UNREALISED_STEPS]).toEqual([
      "furnace-unavailable",
      "run-not-acquired",
      "transition-missing",
      "run-not-running-before-disconnect",
      "measurement-error",
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
    expect(specifiers).toContain("./live-furnace-vc4-receipt.mjs");
    for (const specifier of specifiers) expect(specifier).not.toMatch(/\/src\//);
    expect(runner).not.toMatch(DYNAMIC_LOAD);
    expect(runner).not.toMatch(/process\.exit\s*\(/);
    expect(runner).not.toMatch(/doctor/);
  });

  it("attaches by Run ID only: no adopt, resume, pause, stop, retry or unlock verb is ever spoken by the runner", () => {
    for (const verb of ["adopt", "resume", "pause", "unlock", "retry", "clear"]) expect(runner).not.toMatch(new RegExp(`["'\`]${verb}["'\`]`));
    expect(runner).toMatch(/FURNACE_RUN_ID/);
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
