/**
 * wb-752.7 (VC-4/W16 residual): the live external Furnace adverse cancellation journey receipt judges what it claims.
 *
 * Offline, no furnace and no network: the pure assessor (test/helpers/furnace-control-live-receipt.ts) is driven with an
 * evidence record that satisfies every rule and with one mutant per rule, so an assessor that returned a constant or
 * ignored a field would fail here. The live suite is read as text (its imports, its executor mirror of src/index.ts and
 * its tier wiring), never executed: it runs only from `forge run furnace-control-live`.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { READ_ONLY_VERBS as VC4_READ_ONLY_VERBS, verbOf as vc4VerbOf } from "../qa/workbench/live-furnace-vc4-receipt.mjs";
import {
  ACTIVE_STOP_SCENARIOS,
  assess,
  BINARY_IDENTITY_SOURCE,
  buildReceipt,
  CONTRACT,
  classifyArgv,
  EVIDENCE_CLASS,
  FINDING_RULES,
  FIXTURE_ROOT_PATTERN,
  fixtureRefusal,
  GRANT,
  type Journey,
  LAUNCHER_CONTRACT,
  type PhaseRecord,
  READ_ONLY_VERBS,
  REQUIRED_SCENARIOS,
  type ReceiptEvidence,
  type RunSummary,
  SCENARIOS,
  truthLabelOf,
  UNREALISED_STEPS,
  verbOf,
} from "./helpers/furnace-control-live-receipt.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readRepo = (relative: string): string => readFileSync(join(ROOT, relative), "utf8");

const LIVE_SUITE = "test/workbench-furnace-control-live.test.ts";
const HELPER = "test/helpers/furnace-control-live-receipt.ts";
const LIVE_CONFIG = "vitest.furnace-control-live.config.ts";
const FORGE_BLOCK = '[build.commands.furnace-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.furnace-control-live.config.ts"\ntimeout = 900\n';
const FORGE_PREDECESSOR = '[build.commands.forge-control-live]\ncommand = "./node_modules/.bin/vitest run --config vitest.forge-control-live.config.ts"\ntimeout = 600\n';
const GATE_LINE = 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]';

// Hand-built evidence. Every literal is a plain fake placeholder for the live suite's recorded values.
const REPO = "/tmp/fake-repo-checkout";
const PRINCIPAL = "local-operator:1000:s-fake";
const T = (second: number): string => `2026-10-17T13:00:${String(second).padStart(2, "0")}Z`;
const SINCE = (second: number): string => `2026-10-17T13:00:${String(second).padStart(2, "0")}.123456789+00:00`;
const requestIdOf = (digit: string): string => `ctl_${digit.repeat(32)}`;
const rootOf = (tag: string): string => `/tmp/pi-external-furnace-realbd.fake${tag}`;
const runIdOf = (n: number): string => `frn-run-fx-wisp-${n}`;
const attemptIdOf = (n: number): string => `frn-atm-fx-wisp-${n}-1`;

interface Row {
  scenario: string;
  tag: string;
  run: number;
  requestDigit: string;
  sibling?: number;
}
const ROWS: readonly Row[] = [
  { scenario: SCENARIOS.adverse, tag: "01", run: 101, requestDigit: "a" },
  { scenario: SCENARIOS.denied, tag: "02", run: 102, requestDigit: "b" },
  { scenario: SCENARIOS.observer, tag: "03", run: 103, requestDigit: "c" },
  { scenario: SCENARIOS.sibling, tag: "04", run: 104, requestDigit: "d", sibling: 105 },
  { scenario: SCENARIOS.completed, tag: "05", run: 106, requestDigit: "e" },
  { scenario: SCENARIOS.ambiguous, tag: "06", run: 107, requestDigit: "f" },
];
const rowOf = (scenario: string): Row => {
  const row = ROWS.find(candidate => candidate.scenario === scenario);
  if (row === undefined) throw new Error(`no fixture row for ${scenario}`);
  return row;
};

function summary(state: string, second: number, attempt: string, attemptState: string, live: boolean | null): RunSummary {
  return {
    state, stateSince: SINCE(second), updatedAt: SINCE(second), controllerLive: live, controllerSessionId: live === null ? null : "frn-ses-fake-1",
    attemptIds: [attempt], cancelledAttemptIds: [], attemptStates: { [attempt]: attemptState },
  };
}

function journey(row: Row): Journey {
  const root = rootOf(row.tag);
  const runId = runIdOf(row.run);
  const attemptId = attemptIdOf(row.run);
  const requestId = `vc4-external-4242-${row.tag}`;
  return {
    scenario: row.scenario,
    fixture: {
      root, realRoot: root, runId, repoRoot: REPO, beadsStore: true, runRecord: true, pattern: FIXTURE_ROOT_PATTERN.source, formula: "vc4-external", holdSeconds: 45,
      launcher: { contract: LAUNCHER_CONTRACT, root, runId, requestId, formula: "vc4-external", launcherPid: 4242, controllerPid: 4243, holdSeconds: 45, launchedAt: T(1), runningAt: T(3), attemptId },
      ...(row.sibling !== undefined
        ? { sibling: { runId: runIdOf(row.sibling), requestId: `vc4-sibling-4242-${row.tag}`, controllerPid: 4244, launchedBy: "harness-detached-spawn" as const, attemptId: attemptIdOf(row.sibling) } }
        : {}),
    },
    scope: { workspace: root, principal: PRINCIPAL, sessionId: "s-fake", owningInvocation: "wf_fake752700001" },
    attach: {
      via: "nativeFurnaceRunInspect", contract: "furnace.run.inspect/v1", kind: "run_inspect", requestId: `frn-req-inspect-${row.tag}`,
      run: { runId, beadsRunId: `fx-wisp-${row.run}`, workspace: root, formula: "vc4-external", state: row.scenario === SCENARIOS.completed ? "completed" : "active", stateSince: SINCE(3), creatingRequestId: requestId },
      observation: { contract: "furnace.external-observation/v1", requestIds: { status: `frn-req-status-${row.tag}`, attempts: `frn-req-attempts-${row.tag}`, logs: [`frn-req-logs-${row.tag}`] }, attemptIds: [attemptId], completeness: "complete", controllerLive: row.scenario === SCENARIOS.completed ? "no" : "yes" },
      projection: { nodes: [`furnace:run:${runId}`, `furnace:attempt:${attemptId}`], ownershipEdges: [{ from: `furnace:run:${runId}`, to: `furnace:attempt:${attemptId}`, nativeConfirmationRef: `frn-req-attempts-${row.tag}` }] },
    },
    cleanup: { root, controllerPid: 4243, controllerExit: "observed", removed: true, ...(row.sibling !== undefined ? { siblingControllerExit: "observed" as const } : {}) },
  };
}

function requested(row: Row, before: { state: string; live: string }): PhaseRecord {
  const runId = runIdOf(row.run);
  return {
    scenario: row.scenario, phase: "requested", at: T(10), text: `workflow_control stop of ${runId}`,
    fields: {
      phase: "requested", requestId: requestIdOf(row.requestDigit), grant: GRANT, policy: "exact-grant+confirmed-owner+operator-confirmed", ownershipConfirmationRef: `frn-req-attempts-${row.tag}`,
      target: { provider: "furnace", type: "run", id: runId, scope: rootOf(row.tag) }, decidedAt: T(10), runStateBefore: before.state, controllerLiveBefore: before.live,
    },
  };
}
function acknowledged(row: Row): PhaseRecord {
  const requestId = requestIdOf(row.requestDigit);
  return {
    scenario: row.scenario, phase: "acknowledged", at: T(11), text: "run_stop envelope echoed the request id",
    fields: { phase: "acknowledged", status: "settled", requestId, nativeAckRef: `run_stop:${requestId}`, acknowledgedAt: T(11), echo: { kind: "run_stop", requestId, id: runIdOf(row.run), state: "stopped" } },
  };
}
function result(row: Row): PhaseRecord {
  const runId = runIdOf(row.run);
  return {
    scenario: row.scenario, phase: "result", at: T(12), text: "stopped record echoed",
    fields: {
      phase: "result", requestId: requestIdOf(row.requestDigit), targetId: runId, outcome: "completed", nativeResultRef: `furnace-run:${runId}:stopped@${SINCE(11)}`, settledAt: T(12), stateSince: SINCE(11),
      seamCalls: 1, nativeStateAfter: "stopped", nativeStateSinceAfter: SINCE(11), echo: { kind: "run_stop", requestId: requestIdOf(row.requestDigit), id: runId, state: "stopped" },
    },
  };
}
function denied(policy: string, category: string): PhaseRecord {
  return {
    scenario: SCENARIOS.denied, phase: "denied", at: T(10), text: `typed ${policy} denial`,
    fields: { phase: "denied", policy, category, status: "refused", invoked: false, seamCalls: 0, processControlVerbs: 0 },
  };
}
function uncertain(row: Row, reason: string, failure: { kind: string; code?: string } | undefined, nativeStateAfter: string): PhaseRecord {
  return {
    scenario: row.scenario, phase: "uncertain", at: T(11), text: `parked ${reason}`,
    fields: { phase: "uncertain", requestId: requestIdOf(row.requestDigit), status: "uncertain", reason, ...(failure ? { failure } : {}), seamCalls: 1, retried: false, nativeStateAfter },
  };
}
function observerClose(): PhaseRecord {
  const row = rowOf(SCENARIOS.observer);
  const root = rootOf(row.tag);
  const runId = runIdOf(row.run);
  const attempt = attemptIdOf(row.run);
  return {
    scenario: SCENARIOS.observer, phase: "observer-close", at: T(12), text: "two polls then close",
    fields: {
      phase: "observer-close", observerCalls: ["runs.status", "attempts.list", "logs.read", "runs.status", "attempts.list", "logs.read"], controlCalls: 0,
      argv: [["-C", root, "run", "status", runId, "--json"], ["-C", root, "attempt", "list", runId, "--limit", "20", "--json"], ["-C", root, "logs", runId, "--attempt", attempt, "--limit", "512", "--stream", "stdout", "--json"]],
      runBefore: summary("active", 3, attempt, "running", true), runAfter: summary("active", 3, attempt, "running", true), closedAt: T(12), storesEqual: true,
    },
  };
}
function sibling(): PhaseRecord {
  const row = rowOf(SCENARIOS.sibling);
  const siblingRun = row.sibling ?? 0;
  return {
    scenario: SCENARIOS.sibling, phase: "sibling", at: T(13), text: "sibling read after the stop",
    fields: {
      phase: "sibling", siblingRunId: runIdOf(siblingRun), targetRunId: runIdOf(row.run), stateBefore: "active", stateAfter: "active", controllerLiveAfter: true, attemptStateAfter: "running",
      siblingSeamCalls: 0, argvNamingSibling: 0, listed: [runIdOf(row.run), runIdOf(siblingRun)],
    },
  };
}

function argvRows(): string[][] {
  const rows: string[][] = [];
  for (const row of ROWS) {
    const root = rootOf(row.tag);
    const runId = runIdOf(row.run);
    rows.push(["-C", root, "version", "--json"], ["-C", root, "run", "inspect", runId, "--json"], ["-C", root, "run", "status", runId, "--json"],
      ["-C", root, "attempt", "list", runId, "--limit", "20", "--json"], ["-C", root, "logs", runId, "--attempt", attemptIdOf(row.run), "--limit", "512", "--stream", "stdout", "--json"]);
    if (row.sibling !== undefined) {
      rows.push(["-C", root, "run", "start", "vc4-external", "--executor-program", `${root}/launcher/hold.sh`, "--request-id", `vc4-sibling-4242-${row.tag}`, "--json"],
        ["-C", root, "run", "list", "--creating-request-id", `vc4-sibling-4242-${row.tag}`, "--json"], ["-C", root, "run", "status", runIdOf(row.sibling), "--json"], ["-C", root, "run", "list", "--json"]);
    }
    if (row.scenario !== SCENARIOS.denied && row.scenario !== SCENARIOS.observer) {
      rows.push(["-C", root, "--request-id", requestIdOf(row.requestDigit), "run", "stop", runId, "--json"], ["-C", root, "run", "status", runId, "--json"]);
    }
  }
  return rows;
}

function satisfying(): ReceiptEvidence {
  const adverse = rowOf(SCENARIOS.adverse);
  const siblingRow = rowOf(SCENARIOS.sibling);
  const completed = rowOf(SCENARIOS.completed);
  const ambiguous = rowOf(SCENARIOS.ambiguous);
  const rows = argvRows();
  const active = { state: "active", live: "yes" };
  const phases: PhaseRecord[] = [
    requested(adverse, active), acknowledged(adverse), result(adverse),
    denied("observer-only", "authorization"), denied("missing-exact-grant", "authorization"), denied("operator-confirmation", "validation"),
    observerClose(),
    requested(siblingRow, active), acknowledged(siblingRow), result(siblingRow), sibling(),
    requested(completed, { state: "completed", live: "no" }), uncertain(completed, "seam-failure", { kind: "command_error", code: "invalid_state_transition" }, "completed"),
    requested(ambiguous, active), uncertain(ambiguous, "wait-timeout", undefined, "active"),
  ];
  const scenarios: ReceiptEvidence["scenarios"] = {};
  for (const name of REQUIRED_SCENARIOS) scenarios[name] = { realised: true, detail: `${name} measured` };
  scenarios[SCENARIOS.strictBooted] = { realised: false, detail: "UNREALISED: the booted projection admits no fixture Run node" };
  return {
    utc: T(30), command: "forge run furnace-control-live", revision: "0123456789abcdef0123456789abcdef01234567", dirty: false,
    sources: { [LIVE_SUITE]: "00".repeat(32), [HELPER]: "11".repeat(32) },
    toolchain: {
      node: "v24.0.0", vitest: "4.1.10", sdk: "@furnace/sdk@0.1.0",
      furnace: { source: BINARY_IDENTITY_SOURCE, furnace_version: "0.1.0", protocol_version: 1, supported_state_schema: 1, binary_revision: "fakerev00000", binary_path: "/fake/bin/furnace", binary_digest: "22".repeat(32), beads_version: "1.1.0-rc.1", beads_probe_dir: rootOf("01") },
    },
    host: { platform: "linux", arch: "x64", release: "0.0.0-fake", hostname: "fake-host", pid: 4242 },
    grants: { permitted: [GRANT], denied: [["workbench:observe"], ["control:furnace.pause"], [GRANT]] },
    journeys: ROWS.map(journey),
    scenarios,
    phases,
    nativeReferences: {
      runIds: ROWS.flatMap(row => [runIdOf(row.run), ...(row.sibling !== undefined ? [runIdOf(row.sibling)] : [])]), attemptIds: ROWS.map(row => attemptIdOf(row.run)), beadsRunIds: ROWS.map(row => `fx-wisp-${row.run}`),
      furnaceRequestIds: ROWS.flatMap(row => [`frn-req-inspect-${row.tag}`, `frn-req-status-${row.tag}`, `frn-req-attempts-${row.tag}`]),
      controlRequestIds: [adverse, siblingRow, completed, ambiguous].map(row => requestIdOf(row.requestDigit)),
      nativeAckRefs: [adverse, siblingRow].map(row => `run_stop:${requestIdOf(row.requestDigit)}`),
      nativeResultRefs: [adverse, siblingRow].map(row => `furnace-run:${runIdOf(row.run)}:stopped@${SINCE(11)}`),
      ownershipConfirmationRefs: ROWS.map(row => `frn-req-attempts-${row.tag}`),
    },
    verbCounts: {
      seam: { "runs.stop": 4, "runs.pause": 0, "runs.resume": 0, "attempts.stop": 0 },
      reads: { "runs.status": 8, "attempts.list": 8, "logs.read": 8 },
      processArgv: { rows, ...classifyArgv(rows) },
    },
    replies: [{ scenario: SCENARIOS.adverse, raw: '{"contract":"workbench.tool-reply/v1","tool":"workflow_control","ok":true,"invoked":true,"status":"settled","completion":"not-asserted","control":{}}' }],
    runRecords: [{ scenario: SCENARIOS.adverse, before: summary("active", 3, attemptIdOf(adverse.run), "running", true), after: summary("stopped", 11, attemptIdOf(adverse.run), "running", true) }],
    unrealised: [],
  };
}

const rulesOf = (evidence: ReceiptEvidence & { truthLabel?: string }): string[] => assess(evidence).findings.map(finding => finding.rule);
const phase = (evidence: ReceiptEvidence, scenario: string, kind: string): PhaseRecord => {
  const found = evidence.phases.find(entry => entry.scenario === scenario && entry.phase === kind);
  if (found === undefined) throw new Error(`no ${kind} phase for ${scenario}`);
  return found;
};

describe("wb-752.7 live Furnace control receipt: assessor (O1)", () => {
  it("accepts evidence that satisfies every rule: realised, no findings, label live SDK pass", () => {
    const receipt = buildReceipt(satisfying());
    expect(receipt).toMatchObject({ contract: CONTRACT, evidenceClass: EVIDENCE_CLASS, realised: true, pass: true, findings: [], unrealised: [], truthLabel: "live SDK pass" });
    expect(receipt.verbCounts.processArgv.controlCapable).toEqual(["run stop", "run start", "run list", "run list", "run stop", "run stop", "run stop"]);
    expect(truthLabelOf(receipt)).toBe("live SDK pass");
    expect(truthLabelOf({ realised: true, pass: false })).toBe("live run with findings");
    expect(truthLabelOf({ realised: false, pass: false })).toBe("not realised");
  });

  it("stop-verb-count: a second seam stop, a missing seam stop, a stray control verb in the argv or a per-journey seam count of two is a finding", () => {
    const twice = satisfying();
    twice.verbCounts.seam["runs.stop"] = 2;
    expect(rulesOf(twice)).toEqual(["stop-verb-count"]);
    const pause = satisfying();
    pause.verbCounts.seam["runs.pause"] = 1;
    expect(rulesOf(pause)).toEqual(["stop-verb-count"]);
    const stray = satisfying();
    stray.verbCounts.processArgv.rows.push(["-C", rootOf("01"), "run", "resume", runIdOf(101), "--json"]);
    expect(rulesOf(stray)).toEqual(["stop-verb-count"]);
    const perJourney = satisfying();
    const fields = phase(perJourney, SCENARIOS.adverse, "result").fields;
    if (fields.phase === "result") fields.seamCalls = 2;
    expect(rulesOf(perJourney)).toEqual(["stop-verb-count"]);
    const unaccountedStart = satisfying();
    unaccountedStart.verbCounts.processArgv.rows.push(["-C", rootOf("02"), "run", "start", "vc4-external", "--json"]);
    expect(rulesOf(unaccountedStart)).toEqual(["stop-verb-count"]);
  });

  it("control-call-on-observer-close: a stop argv during the observer journey, a control method, or a non-zero control count is a finding", () => {
    const argv = satisfying();
    const fields = phase(argv, SCENARIOS.observer, "observer-close").fields;
    if (fields.phase === "observer-close") fields.argv.push(["-C", rootOf("03"), "run", "stop", runIdOf(103), "--json"]);
    expect(rulesOf(argv)).toEqual(["control-call-on-observer-close"]);
    const method = satisfying();
    const methodFields = phase(method, SCENARIOS.observer, "observer-close").fields;
    if (methodFields.phase === "observer-close") methodFields.observerCalls.push("runs.stop");
    expect(rulesOf(method)).toEqual(["control-call-on-observer-close"]);
    const count = satisfying();
    const countFields = phase(count, SCENARIOS.observer, "observer-close").fields;
    if (countFields.phase === "observer-close") countFields.controlCalls = 1;
    expect(rulesOf(count)).toEqual(["control-call-on-observer-close"]);
  });

  it("denial-reached-seam: a denial recorded with one seam call, one process control verb, invoked true or a status other than refused is a finding", () => {
    for (const mutate of [
      (fields: Extract<PhaseRecord["fields"], { phase: "denied" }>) => { fields.seamCalls = 1; },
      (fields: Extract<PhaseRecord["fields"], { phase: "denied" }>) => { fields.processControlVerbs = 1; },
      (fields: Extract<PhaseRecord["fields"], { phase: "denied" }>) => { fields.invoked = true; },
      (fields: Extract<PhaseRecord["fields"], { phase: "denied" }>) => { fields.status = "settled"; },
      (fields: Extract<PhaseRecord["fields"], { phase: "denied" }>) => { fields.policy = "made-up-policy"; },
    ]) {
      const evidence = satisfying();
      const fields = phase(evidence, SCENARIOS.denied, "denied").fields;
      if (fields.phase === "denied") mutate(fields);
      expect(rulesOf(evidence)).toEqual(["denial-reached-seam"]);
    }
  });

  it("result-without-native-echo: a result whose nativeResultRef lacks :stopped@<state_since>, whose record did not read stopped, or whose outcome is not completed is a finding", () => {
    const ref = satisfying();
    const refFields = phase(ref, SCENARIOS.adverse, "result").fields;
    if (refFields.phase === "result") refFields.nativeResultRef = `furnace-run:${runIdOf(101)}:acknowledged`;
    expect(rulesOf(ref)).toEqual(["result-without-native-echo"]);
    const state = satisfying();
    const stateFields = phase(state, SCENARIOS.adverse, "result").fields;
    if (stateFields.phase === "result") stateFields.nativeStateAfter = "active";
    expect(rulesOf(state)).toEqual(["result-without-native-echo"]);
    const outcome = satisfying();
    const outcomeFields = phase(outcome, SCENARIOS.adverse, "result").fields;
    if (outcomeFields.phase === "result") outcomeFields.outcome = "unknown";
    expect(rulesOf(outcome)).toEqual(["result-without-native-echo"]);
    const orphan = satisfying();
    orphan.phases = orphan.phases.filter(entry => !(entry.scenario === SCENARIOS.adverse && entry.phase === "acknowledged"));
    expect(rulesOf(orphan)).toEqual(["result-without-native-echo"]);
  });

  it("acknowledged-not-echoed: a nativeAckRef that is not run_stop:<requestId>, or an echo naming another request, kind or target, is a finding", () => {
    const ref = satisfying();
    const refFields = phase(ref, SCENARIOS.adverse, "acknowledged").fields;
    if (refFields.phase === "acknowledged") refFields.nativeAckRef = "run_stop:ctl_minted-elsewhere";
    expect(rulesOf(ref)).toEqual(["acknowledged-not-echoed"]);
    const echo = satisfying();
    const echoFields = phase(echo, SCENARIOS.adverse, "acknowledged").fields;
    if (echoFields.phase === "acknowledged") echoFields.echo = { ...echoFields.echo, requestId: requestIdOf("9") };
    expect(rulesOf(echo)).toEqual(["acknowledged-not-echoed"]);
    const kind = satisfying();
    const kindFields = phase(kind, SCENARIOS.adverse, "acknowledged").fields;
    if (kindFields.phase === "acknowledged") kindFields.echo = { ...kindFields.echo, kind: "run_pause" };
    expect(rulesOf(kind)).toEqual(["acknowledged-not-echoed"]);
  });

  it("uncertain-retried: an uncertain phase with two seam calls or retried true is a finding", () => {
    const twice = satisfying();
    const fields = phase(twice, SCENARIOS.completed, "uncertain").fields;
    if (fields.phase === "uncertain") fields.seamCalls = 2;
    expect(rulesOf(twice)).toEqual(["stop-verb-count", "uncertain-retried"]);
    const retried = satisfying();
    const retriedFields = phase(retried, SCENARIOS.ambiguous, "uncertain").fields;
    if (retriedFields.phase === "uncertain") retriedFields.retried = true;
    expect(rulesOf(retried)).toEqual(["uncertain-retried"]);
  });

  it("sibling-changed: a sibling whose state changed, whose controller let go, with a seam call or a control argv naming it, or missing from the listing, is a finding", () => {
    for (const mutate of [
      (fields: Extract<PhaseRecord["fields"], { phase: "sibling" }>) => { fields.stateAfter = "stopped"; },
      (fields: Extract<PhaseRecord["fields"], { phase: "sibling" }>) => { fields.controllerLiveAfter = false; },
      (fields: Extract<PhaseRecord["fields"], { phase: "sibling" }>) => { fields.siblingSeamCalls = 1; },
      (fields: Extract<PhaseRecord["fields"], { phase: "sibling" }>) => { fields.argvNamingSibling = 1; },
      (fields: Extract<PhaseRecord["fields"], { phase: "sibling" }>) => { fields.listed = [fields.targetRunId]; },
    ]) {
      const evidence = satisfying();
      const fields = phase(evidence, SCENARIOS.sibling, "sibling").fields;
      if (fields.phase === "sibling") mutate(fields);
      expect(rulesOf(evidence)).toEqual(["sibling-changed"]);
    }
    const stopNamingSibling = satisfying();
    stopNamingSibling.verbCounts.processArgv.rows.push(["-C", rootOf("04"), "run", "stop", runIdOf(105), "--json"]);
    expect(rulesOf(stopNamingSibling)).toEqual(["stop-verb-count", "sibling-changed"]);
  });

  it("run-changed-on-close: a Run stopped, an Attempt cancelled, a controller session changed, or stores changed with no Run progress across the close is a finding", () => {
    const halted = satisfying();
    const fields = phase(halted, SCENARIOS.observer, "observer-close").fields;
    if (fields.phase === "observer-close") fields.runAfter = { ...fields.runAfter, state: "stopped" };
    expect(rulesOf(halted)).toEqual(["run-changed-on-close"]);
    const cancelled = satisfying();
    const cancelledFields = phase(cancelled, SCENARIOS.observer, "observer-close").fields;
    if (cancelledFields.phase === "observer-close") cancelledFields.runAfter = { ...cancelledFields.runAfter, cancelledAttemptIds: [attemptIdOf(103)] };
    expect(rulesOf(cancelled)).toEqual(["run-changed-on-close"]);
    const session = satisfying();
    const sessionFields = phase(session, SCENARIOS.observer, "observer-close").fields;
    if (sessionFields.phase === "observer-close") sessionFields.runAfter = { ...sessionFields.runAfter, controllerSessionId: "frn-ses-fake-2" };
    expect(rulesOf(session)).toEqual(["run-changed-on-close"]);
    const stores = satisfying();
    const storesFields = phase(stores, SCENARIOS.observer, "observer-close").fields;
    if (storesFields.phase === "observer-close") storesFields.storesEqual = false;
    expect(rulesOf(stores)).toEqual(["run-changed-on-close"]);
    // The Run's own progress explains a store change: not a finding.
    const progressed = satisfying();
    const progressedFields = phase(progressed, SCENARIOS.observer, "observer-close").fields;
    if (progressedFields.phase === "observer-close") {
      progressedFields.storesEqual = false;
      progressedFields.runAfter = { ...progressedFields.runAfter, state: "completed", updatedAt: SINCE(20), attemptStates: { [attemptIdOf(103)]: "succeeded" } };
    }
    expect(rulesOf(progressed)).toEqual([]);
  });

  it("phase-fields-missing: a phase with capped text but no typed fields, or fields of another phase, is a finding", () => {
    const missing = satisfying();
    missing.phases.push({ scenario: SCENARIOS.adverse, phase: "result", at: T(12), text: "free text only" } as unknown as PhaseRecord);
    expect(rulesOf(missing)).toEqual(["phase-fields-missing"]);
    const mislabelled = satisfying();
    const entry = phase(mislabelled, SCENARIOS.adverse, "acknowledged");
    (entry as { phase: string }).phase = "result";
    expect(rulesOf(mislabelled)).toContain("phase-fields-missing");
  });

  it("uncommitted-tree: a dirty tree, or one whose status could not be read, is a finding; the label follows", () => {
    const dirty = satisfying();
    dirty.dirty = true;
    expect(rulesOf(dirty)).toEqual(["uncommitted-tree"]);
    const unknown = satisfying();
    unknown.dirty = null;
    expect(rulesOf(unknown)).toEqual(["uncommitted-tree"]);
    const receipt = buildReceipt(dirty);
    expect(receipt).toMatchObject({ realised: true, pass: false, truthLabel: "live run with findings" });
  });

  it("controller-outlived-hold: a forced kill, an unknown controller exit or an unremoved root is a finding", () => {
    for (const mutate of [
      (cleanup: NonNullable<Journey["cleanup"]>) => { cleanup.controllerExit = "forced-kill"; },
      (cleanup: NonNullable<Journey["cleanup"]>) => { cleanup.controllerExit = "unknown"; },
      (cleanup: NonNullable<Journey["cleanup"]>) => { cleanup.removed = false; },
    ]) {
      const evidence = satisfying();
      const cleanup = evidence.journeys[0]?.cleanup;
      if (cleanup) mutate(cleanup);
      expect(rulesOf(evidence)).toEqual(["controller-outlived-hold"]);
    }
  });

  it("label-mismatch: a record labelled live SDK pass that carries a finding is one finding more", () => {
    const evidence: ReceiptEvidence & { truthLabel?: string } = satisfying();
    evidence.dirty = true;
    evidence.truthLabel = "live SDK pass";
    expect(rulesOf(evidence)).toEqual(["uncommitted-tree", "label-mismatch"]);
    const honest = { ...satisfying(), truthLabel: "live SDK pass" };
    expect(rulesOf(honest)).toEqual([]);
  });

  it("unrealised steps pre-empt findings: a recorded unrealised step, a refused root, a missing attach, an unrealised scenario or a stop issued against a Run not active under a live controller is exit-class not realised, never graded", () => {
    const recorded = satisfying();
    recorded.unrealised.push({ step: "launcher-failed", diagnostic: "exit 2 naming /tmp/pi-external-furnace-realbd.fake99" });
    recorded.dirty = true;
    const receipt = buildReceipt(recorded);
    expect(receipt).toMatchObject({ realised: false, pass: false, findings: [], truthLabel: "not realised" });
    expect(receipt.unrealised[0]).toMatchObject({ step: "launcher-failed" });

    const refused = satisfying();
    const first = refused.journeys[0];
    if (first) first.fixture.beadsStore = false;
    expect(assess(refused).unrealised[0]).toMatchObject({ step: "fixture-root-refused" });

    const unattached = satisfying();
    const second = unattached.journeys[1];
    if (second) second.attach = null;
    expect(assess(unattached).unrealised[0]).toMatchObject({ step: "attach-failed" });

    const foreign = satisfying();
    if (foreign.toolchain.furnace) foreign.toolchain.furnace.beads_probe_dir = REPO;
    expect(assess(foreign).unrealised[0]).toMatchObject({ step: "attach-failed" });

    const scenario = satisfying();
    scenario.scenarios[SCENARIOS.sibling] = { realised: false, detail: "sibling never reached running" };
    expect(assess(scenario).unrealised[0]).toMatchObject({ step: "scenario-unrealised" });

    const inactive = satisfying();
    const fields = phase(inactive, SCENARIOS.adverse, "requested").fields;
    if (fields.phase === "requested") fields.runStateBefore = "paused";
    expect(assess(inactive).unrealised[0]).toMatchObject({ step: "run-not-active-at-stop" });

    const unsupervised = satisfying();
    const liveFields = phase(unsupervised, SCENARIOS.ambiguous, "requested").fields;
    if (liveFields.phase === "requested") liveFields.controllerLiveBefore = "no";
    expect(assess(unsupervised).unrealised[0]).toMatchObject({ step: "controller-not-live-at-stop" });
    expect([...ACTIVE_STOP_SCENARIOS]).toEqual([SCENARIOS.adverse, SCENARIOS.sibling, SCENARIOS.ambiguous]);
  });

  it("refuses receipt input whose furnace identity is not the inspect envelope's, and input carrying a credential-shaped value (plain input hygiene; the fake token below is not a real secret)", () => {
    const prose = satisfying();
    if (prose.toolchain.furnace) prose.toolchain.furnace.source = "furnace version stdout";
    expect(() => buildReceipt(prose)).toThrow(/inspect envelope/);
    const shaped = satisfying();
    shaped.replies.push({ scenario: SCENARIOS.adverse, raw: "Authorization: Bearer fake-not-a-token-000000" });
    expect(() => buildReceipt(shaped)).toThrow(/credential/);
    const named = satisfying() as ReceiptEvidence & { api_key?: string };
    named.api_key = "placeholder";
    expect(() => buildReceipt(named)).toThrow(/credential/);
  });

  it("names the rules, steps and scenarios exactly so a quiet rename is caught", () => {
    expect([...FINDING_RULES]).toEqual([
      "stop-verb-count", "control-call-on-observer-close", "denial-reached-seam", "acknowledged-not-echoed", "result-without-native-echo", "uncertain-retried",
      "sibling-changed", "run-changed-on-close", "phase-fields-missing", "uncommitted-tree", "controller-outlived-hold", "label-mismatch",
    ]);
    expect([...UNREALISED_STEPS]).toEqual(["furnace-unavailable", "launcher-failed", "fixture-root-refused", "attach-failed", "run-not-active-at-stop", "controller-not-live-at-stop", "scenario-unrealised"]);
    expect([...REQUIRED_SCENARIOS]).toEqual([
      "adverse-stop-mid-flight", "denied-without-grant", "observer-close-stops-nothing", "sibling-unaffected", "stop-of-completed-parks-uncertain", "ambiguous-stop-parks-uncertain",
    ]);
    expect(SCENARIOS.strictBooted).toBe("strict-booted-tool-reading");
    expect(CONTRACT).toBe("workbench.furnace-control-live/v1");
    expect(EVIDENCE_CLASS).toBe("live");
    expect(fixtureRefusal({ root: REPO, realRoot: REPO, runId: runIdOf(1), repoRoot: REPO, beadsStore: true, runRecord: true, launcher: null })).toMatch(/not a disposable/);
    expect(fixtureRefusal(journey(rowOf(SCENARIOS.adverse)).fixture)).toBeNull();
  });
});

describe("wb-752.7 verb classification agrees with the vc4 tier (O2)", () => {
  it("READ_ONLY_VERBS lists are equal and verbOf classifies every sampled argv exactly as the vc4 module does", () => {
    expect([...READ_ONLY_VERBS]).toEqual([...VC4_READ_ONLY_VERBS]);
    const root = rootOf("01");
    const samples: string[][] = [
      ["-C", root, "version", "--json"], ["-C", root, "run", "inspect", runIdOf(1), "--json"], ["-C", root, "run", "status", runIdOf(1), "--json"],
      ["-C", root, "attempt", "list", runIdOf(1), "--limit", "20", "--json"], ["-C", root, "logs", runIdOf(1), "--attempt", attemptIdOf(1), "--json"],
      ["-C", root, "--request-id", requestIdOf("a"), "run", "stop", runIdOf(1), "--json"], ["-C", root, "run", "list", "--creating-request-id", "x", "--json"],
      ["-C", root, "run", "start", "vc4-external", "--json"], ["--state-dir", "/tmp/fake-state", "doctor", "--json"], ["-C", root, "attempt", "stop", attemptIdOf(1), "--json"],
      ["-C", root, "run", "pause", runIdOf(1), "--json"], ["-C", root, "run", "resume", runIdOf(1), "--continue", "--json"], [],
    ];
    for (const sample of samples) expect(verbOf(sample), sample.join(" ")).toBe(vc4VerbOf(sample));
    expect(classifyArgv(samples)).toEqual({
      total: 13, verbs: samples.map(verbOf), readOnly: 5,
      controlCapable: ["run stop", "run list", "run start", "doctor", "attempt stop", "run pause", "run resume", ""],
    });
  });
});

describe("wb-752.7 tier wiring (O3)", () => {
  it("forge.toml appends exactly one furnace-control-live block after forge-control-live, both byte-for-byte, and the gate line is unchanged", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toContain(`${FORGE_PREDECESSOR}\n${FORGE_BLOCK}`);
    expect(toml.match(/^\[build\.commands\.furnace-control-live\]$/gm)).toHaveLength(1);
    expect(toml.match(/^\[build\.commands\.forge-control-live\]$/gm)).toHaveLength(1);
    expect(toml).toContain(`${GATE_LINE}\n`);
    expect(toml.match(/^gate = /gm)).toHaveLength(1);
    const gate = /^gate = \[(.*)\]$/m.exec(toml)?.[0];
    expect(gate).toBe(GATE_LINE);
  });

  it("vitest.config.ts excludes the live suite on its one exclude line and keeps allowOnly false", () => {
    const config = readRepo("vitest.config.ts");
    const excludeLines = config.split("\n").filter(line => line.includes("exclude:"));
    expect(excludeLines).toHaveLength(1);
    expect(excludeLines[0]).toContain(`"${LIVE_SUITE}"`);
    expect(excludeLines[0]).toContain('"test/workbench-forge-control-live.test.ts"');
    expect(config).toContain('include: ["test/**/*.test.ts"]');
    expect(config).toContain("allowOnly: false");
  });

  it("vitest.furnace-control-live.config.ts is include-only for the live suite, on the forge-control-live pattern", () => {
    expect(readRepo(LIVE_CONFIG)).toBe(`import { defineConfig } from "vitest/config";\nexport default defineConfig({ test: { include: ["${LIVE_SUITE}"] } });\n`);
  });
});

const DYNAMIC_LOAD = /await\s+import\s*\(|\brequire\s*\(|import\s*\(\s*["'`]/;
const specifiersOf = (source: string): string[] => [...source.matchAll(/^import\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)].map(match => match[1] ?? "").sort();

describe("wb-752.7 the live suite and the helper, read as text (O4)", () => {
  const suite = readRepo(LIVE_SUITE);
  const helper = readRepo(HELPER);

  it("the live suite imports only node, vitest, the vendored SDK, the five workbench modules it exercises, the task type and the test helpers", () => {
    const allowed = new Set([
      "@furnace/sdk", "vitest", "../src/workbench/control-tool.js", "../src/workbench/furnace-control.js", "../src/workbench/furnace-observer.js",
      "../src/workbench/observation.js", "../src/workbench/providers/furnace.js", "../src/workflow/task.js", "./helpers/scratch.js", "./helpers/furnace-control-live-receipt.js",
    ]);
    for (const specifier of specifiersOf(suite)) expect(specifier.startsWith("node:") || allowed.has(specifier), specifier).toBe(true);
    expect(specifiersOf(suite)).toContain("./helpers/furnace-control-live-receipt.js");
    expect(specifiersOf(suite)).toContain("../src/workbench/providers/furnace.js");
    expect(suite).not.toMatch(DYNAMIC_LOAD);
    expect(suite).not.toMatch(/:\s*any\b|as\s+any\b|<any>/);
  });

  it("the live suite never probes, never names the capability probe, never exits the process, and binds no Furnace client to the repository", () => {
    expect(suite).not.toMatch(/doctor/);
    expect(suite).not.toContain(["furnace", "capability", "probe", "does", "not", "exist"].join("-"));
    expect(suite).not.toMatch(/process\.exit\s*\(/);
    expect(suite).not.toMatch(/cwd:\s*process\.cwd\(\)/);
    const clients = suite.split("\n").filter(line => line.includes("new Furnace("));
    expect(clients.length).toBeGreaterThanOrEqual(3);
    for (const line of clients) expect(line, line).toMatch(/cwd: (?:request\.scope\.workspace|realRoot)\b/);
    expect(suite).toMatch(/installScratchLeakGuard\(\)/);
    expect(suite).toMatch(/trackScratch\(/);
    expect(suite).not.toMatch(/mkdtempSync\(\s*join\(\s*tmpdir\(\)/);
  });

  it("every capped text sits in a phase record beside typed fields (wb-6hb.12)", () => {
    const capped = suite.split("\n").filter(line => line.includes(".slice(0,"));
    expect(capped.length).toBeGreaterThan(0);
    for (const line of capped) expect(line, line).toContain("fields");
  });

  it("the helper is pure: no imports, no dynamic load, no clock, no random source, no process access", () => {
    expect(specifiersOf(helper)).toEqual([]);
    expect(helper).not.toMatch(/^import\s/m);
    expect(helper).not.toMatch(DYNAMIC_LOAD);
    expect(helper).not.toMatch(/Date\.now|new Date\(|Math\.random|process\./);
    expect(helper).not.toMatch(/:\s*any\b|as\s+any\b|<any>/);
  });
});

describe("wb-752.7 the suite's furnace executor mirrors src/index.ts (O5)", () => {
  const suite = readRepo(LIVE_SUITE);
  const index = readRepo("src/index.ts");
  const CLIENT = 'new Furnace({ binary: "furnace", cwd: request.scope.workspace, timeoutMs: 10_000 })';
  const CALL = "executeFurnaceControl(decision, {";

  it("both files construct the client and call the adapter with the same workspace binding and bound", () => {
    for (const [name, text] of [["suite", suite], ["index", index]] as const) {
      expect(text, name).toContain(CLIENT);
      expect(text, name).toContain(CALL);
      expect(text, name).toContain("workspaceRoot: request.scope.workspace");
      expect(text, name).toContain("timeoutMs: 10_000");
      expect(text, name).toContain("return { receipt: execution.receipt, status: execution.status };");
    }
    expect(index.match(/new Furnace\(\{ binary: "furnace", cwd: request\.scope\.workspace, timeoutMs: 10_000 \}\)/g)).toHaveLength(1);
  });
});
