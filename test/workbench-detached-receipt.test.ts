/**
 * wb-0kg.3 (VC-7 residual): the live detached exit/reattach acceptance receipt, judged offline.
 *
 * Spec lines pinned:
 *   docs/workbench/15-implementation-program.md, VC-7: "Pi exits without stopping execution."
 *   docs/workbench/08-lifecycle-and-recovery.md, "Optional local detached profile": "Closing or exiting Pi disconnects the client, not the execution host. Inspection after host loss reports unknown with producer reconciliation guidance; it does not replay a saved terminal verdict or rerun JavaScript. The profile is same-machine OS discretionary-access control only, not remote authentication or hostile-same-user protection."
 *   docs/workbench/14-qa-and-benchmarks.md, "Truth labels and release gates": "Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output."
 *
 * qa/workbench/detached-reattach-receipt.mjs is the pure judge (assessDetachedReattachJourneys, buildDetachedReattachReceipt,
 * exitCodeFor) and the live runner (`npm run build && node qa/workbench/detached-reattach-receipt.mjs`): a module-API client
 * process launches the saved fixture workflow on the local detached profile and exits entirely; the detached host itself
 * writes the exactly-once effect marker after that exit; a booted Pi extension relaunched in a new process reattaches by the
 * invocation ref through workflow_detached inspect with zero control verbs; the host is killed with SIGKILL and a second
 * booted Pi inspects after the loss.
 *
 * PINNED reader set (this file; every case runs offline over fabricated journeys and three source texts - src/index.ts, the
 * receipt module and this header - and starts no process):
 *   CLEAN: the clean journey is judged realised with no finding and maps to exit 0.
 *   MUTANTS: one row per finding rule of DETACHED_REATTACH_FINDING_RULES (host-not-detached, host-stopped-by-client-exit, effect-lost, effect-not-in-host, duplicate-effect, reattach-failed, reattach-identity-mismatch, no-own-terminal, observer-control-call, replayed-verdict, unknown-not-reconcilable, rerun-after-loss, overclaim), each of its mutants judged realised with that rule among the findings and mapped to exit 1.
 *   NOT_REALISED: one row per condition of DETACHED_REATTACH_UNREALISED (launch-and-exit-unarmed, continued-execution-unarmed, observer-reattach-unarmed, host-loss-unarmed, evidence-block-missing, client-not-exited, host-pid-invalid, effect-before-exit, observer-not-booted, host-not-lost, inspector-not-booted), each of its plants judged not realised with that condition among the unmet ones and mapped to exit 2.
 *   SHAPE: the built receipt carries contract, utc, revision, tools, host, commands, nativeRefs, wording, launchProfile, journeys, markerCounts, findings, unrealised, diagnostics, realised and pass, deep-frozen, with absolute paths scrubbed to basenames and the wording stamped from the module.
 *   PI_PIN: the launch permissions the receipt mirrors equal the registered workflow_detached launch pin in src/index.ts, whose providers [] and missing localProvider are the recorded deviation.
 *   RUNNER: the runner's Pi role calls workflow_detached with the inspect action only, its launcher and Pi roles load the compiled dist entries the receipt names, and the loss signal is SIGKILL.
 * Each positive claim's falsifier: a judge clause removed or inverted in the receipt module turns its MUTANTS or NOT_REALISED
 * row red; a header line, row, roster or wording entry removed here turns the roster, frozen-shape or header row red, and
 * a row removed together with its frozen-shape entry still reds against the module's own roster.
 * NOT CLAIMED by this census: the live journey's outcome on any machine (it is measured by running the runner, whose receipt this file never reads); launch through the registered workflow_detached tool; remote authentication; hostile-same-user isolation; host-crash durability; native executable identity; the wording of each row's plant description (a row's rule or condition and the per-rule and per-condition counts are pinned, its description is not).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessDetachedReattachJourneys,
  buildDetachedReattachReceipt,
  DETACHED_REATTACH_CONTRACT,
  DETACHED_REATTACH_FINDING_RULES,
  DETACHED_REATTACH_JOURNEYS,
  DETACHED_REATTACH_UNREALISED,
  DETACHED_REATTACH_WORDING,
  exitCodeFor,
  PI_TOOL_PERMISSIONS,
  RUNNER_ENTRIES,
} from "../qa/workbench/detached-reattach-receipt.mjs";

interface ExitRecord {
  code: number | null;
  signal: string | null;
}
interface SnapshotSummary {
  observation: string;
  source: string;
  terminal: string | null;
  hasResult: boolean;
  result?: unknown;
  receiptPid: number | null;
  receiptHostInstanceId: string | null;
  receiptInvocationId: string | null;
  controlAudit: unknown[];
  cancellationRequested: boolean;
  reconcileHint: string | null;
}
interface Observed {
  journeys: {
    "launch-and-exit": {
      armed: boolean;
      invocationId: string;
      clientPid: number;
      clientExit: ExitRecord;
      clientGoneAtExit: boolean;
      markersAtClientExit: number;
      hostPid: number;
      hostSessionId: number;
      hostInstanceId: string;
      hostAliveAfterClientExit: boolean;
      labels: { security: string; lifetime: string; nativeRuntimeIdentity: string };
      permissions: string[];
    };
    "continued-execution": { armed: boolean; markersAfterClientExit: number; markerAfterExitMs: number };
    "observer-reattach": {
      armed: boolean;
      observer: string;
      observerExit: ExitRecord;
      registered: boolean;
      actions: string[];
      first: SnapshotSummary;
      final: SnapshotSummary;
      markersAfterReattach: number;
      markerContent: string;
    };
    "host-loss": {
      armed: boolean;
      signal: string;
      hostGone: boolean;
      inspectorExit: ExitRecord;
      registered: boolean;
      actions: string[];
      snapshot: SnapshotSummary;
      markersAfterLoss: number;
      markersAfterSettle: number;
    };
  };
  markerCounts: Record<string, number>;
  nativeRefs: { provider: string; type: string; id: string }[];
  wording: { security: string; lifetime: string; nativeRuntimeIdentity: string; nonClaims: string[] };
  launchProfile: { launcher: string; observer: string; deviatesFromPiTool: boolean; deviations: string[]; permissions: string[] };
}
type JourneyKey = keyof Observed["journeys"];

const INVOCATION = "pi-exit-reattach";
const HOST_INSTANCE = "a1".repeat(24);
const CLIENT_PID = 4141;
const HOST_PID = 5252;
const RECONCILE_TEXT = "Host connection lost: JavaScript state is not recoverable. Never automatically retry this invocation; reconcile known native effects with their producer before a new invocation.";

function live(over: Partial<SnapshotSummary>): SnapshotSummary {
  return {
    observation: "observed-terminal",
    source: "live-detached-host",
    terminal: "completed",
    hasResult: true,
    result: { gone: { coverage: "fixture", clientGone: true, waitedMs: 0 }, effect: { coverage: "fixture", marker: 0, invocationId: INVOCATION } },
    receiptPid: HOST_PID,
    receiptHostInstanceId: HOST_INSTANCE,
    receiptInvocationId: INVOCATION,
    controlAudit: [],
    cancellationRequested: false,
    reconcileHint: null,
    ...over,
  };
}

function clean(): Observed {
  return {
    journeys: {
      "launch-and-exit": {
        armed: true,
        invocationId: INVOCATION,
        clientPid: CLIENT_PID,
        clientExit: { code: 0, signal: null },
        clientGoneAtExit: true,
        markersAtClientExit: 0,
        hostPid: HOST_PID,
        hostSessionId: HOST_PID,
        hostInstanceId: HOST_INSTANCE,
        hostAliveAfterClientExit: true,
        labels: { security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash", nativeRuntimeIdentity: "unsupported" },
        permissions: ["inspect", "execute"],
      },
      "continued-execution": { armed: true, markersAfterClientExit: 1, markerAfterExitMs: 550 },
      "observer-reattach": {
        armed: true,
        observer: "booted-pi-extension",
        observerExit: { code: 0, signal: null },
        registered: true,
        actions: ["inspect", "inspect"],
        first: live({ observation: "observed-running", terminal: null, hasResult: false, result: undefined }),
        final: live({}),
        markersAfterReattach: 1,
        markerContent: String(HOST_PID),
      },
      "host-loss": {
        armed: true,
        signal: "SIGKILL",
        hostGone: true,
        inspectorExit: { code: 0, signal: null },
        registered: true,
        actions: ["inspect"],
        snapshot: {
          observation: "unknown",
          source: "local-client-transport",
          terminal: "unknown",
          hasResult: false,
          receiptPid: null,
          receiptHostInstanceId: null,
          receiptInvocationId: null,
          controlAudit: [],
          cancellationRequested: false,
          reconcileHint: RECONCILE_TEXT,
        },
        markersAfterLoss: 1,
        markersAfterSettle: 1,
      },
    },
    markerCounts: { [INVOCATION]: 1 },
    nativeRefs: [
      { provider: "local-detached", type: "invocation", id: INVOCATION },
      { provider: "local-detached", type: "host-instance", id: HOST_INSTANCE },
    ],
    wording: {
      security: "same-machine-os-dac-only",
      lifetime: "survives-client-disconnect-not-host-crash",
      nativeRuntimeIdentity: "unsupported",
      nonClaims: [...DETACHED_REATTACH_WORDING.nonClaims],
    },
    launchProfile: {
      launcher: "module-api-client",
      observer: "booted-pi-extension",
      deviatesFromPiTool: true,
      deviations: ["localProvider", "grants", "input"],
      permissions: ["inspect", "execute"],
    },
  };
}

const launchOf = (o: Observed) => o.journeys["launch-and-exit"];
const continuedOf = (o: Observed) => o.journeys["continued-execution"];
const reattachOf = (o: Observed) => o.journeys["observer-reattach"];
const lossOf = (o: Observed) => o.journeys["host-loss"];

function rules(observed: unknown): string[] {
  return assessDetachedReattachJourneys(observed).findings.map((finding: { rule: string }) => finding.rule);
}
function realisedOf(observed: unknown): boolean {
  return assessDetachedReattachJourneys(observed).realised;
}
function unrealisedOf(observed: unknown): string[] {
  return assessDetachedReattachJourneys(observed).unrealised;
}
function receiptInput(observed: Observed) {
  return {
    utc: "2026-11-11T07:00:00.000Z",
    revision: "ce180d82f9385a315ff26bd8e7f9202cac19f5b3",
    tools: { node: "v24.20.0", package: "@tintinweb/pi-subagents@0.20.0", hostModuleSha256: `sha256:${"c".repeat(64)}`, extensionSha256: `sha256:${"d".repeat(64)}` },
    host: { hostname: "fixture-host", platform: "linux", arch: "x64", release: "6.12.0" },
    commands: [
      "node qa/workbench/detached-reattach-receipt.mjs",
      "node detached-reattach-receipt.mjs --client launch request.json",
      `node detached-reattach-receipt.mjs --client pi-inspect ${INVOCATION} terminal`,
      `node detached-reattach-receipt.mjs --client pi-inspect ${INVOCATION} once`,
    ],
    diagnostics: [],
    ...observed,
  };
}
function readRepo(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

/** One row per mutant: the finding rule it must raise, what it plants, and the plant. */
type Mutant = readonly [rule: string, plants: string, mutate: (o: Observed) => void];
const MUTANTS: readonly Mutant[] = [
  ["host-not-detached", "the host is the launching client's own process and session", o => { launchOf(o).hostPid = CLIENT_PID; launchOf(o).hostSessionId = CLIENT_PID; }],
  ["host-not-detached", "the host is not the leader of its own OS session", o => { launchOf(o).hostSessionId = 1; }],
  ["host-stopped-by-client-exit", "the host process was gone once the client had exited", o => { launchOf(o).hostAliveAfterClientExit = false; }],
  ["effect-lost", "no marker appeared after the client exited", o => { continuedOf(o).markersAfterClientExit = 0; }],
  ["effect-lost", "no marker was on disk after the reattach", o => { reattachOf(o).markersAfterReattach = 0; }],
  ["effect-not-in-host", "the marker names the launching client's pid", o => { reattachOf(o).markerContent = String(CLIENT_PID); }],
  ["effect-not-in-host", "the marker is empty", o => { reattachOf(o).markerContent = ""; }],
  ["duplicate-effect", "the final marker census counts two markers", o => { o.markerCounts[INVOCATION] = 2; }],
  ["duplicate-effect", "two markers after the client exited", o => { continuedOf(o).markersAfterClientExit = 2; }],
  ["duplicate-effect", "two markers after the reattach", o => { reattachOf(o).markersAfterReattach = 2; }],
  ["duplicate-effect", "two markers right after the host loss", o => { lossOf(o).markersAfterLoss = 2; }],
  ["duplicate-effect", "two markers after the settle window", o => { lossOf(o).markersAfterSettle = 2; }],
  ["reattach-failed", "the observer only reached its own client transport", o => { reattachOf(o).final = live({ observation: "unknown", source: "local-client-transport", terminal: "unknown", hasResult: false }); }],
  ["reattach-identity-mismatch", "the reattached host pid differs from the launch receipt", o => { reattachOf(o).final.receiptPid = 9999; }],
  ["reattach-identity-mismatch", "the reattached host instance differs from the launch receipt", o => { reattachOf(o).final.receiptHostInstanceId = "b2".repeat(24); }],
  ["reattach-identity-mismatch", "the reattached invocation differs from the launch receipt", o => { reattachOf(o).final.receiptInvocationId = "other-invocation"; }],
  ["reattach-identity-mismatch", "the invocation ref names another invocation", o => { o.nativeRefs[0] = { provider: "local-detached", type: "invocation", id: "other-invocation" }; }],
  ["reattach-identity-mismatch", "the host-instance ref is missing", o => { o.nativeRefs = o.nativeRefs.filter(ref => ref.type !== "host-instance"); }],
  ["reattach-identity-mismatch", "the refs name another provider", o => { o.nativeRefs = o.nativeRefs.map(ref => ({ ...ref, provider: "pi-workflow" })); }],
  ["no-own-terminal", "the reattached terminal is failed", o => { reattachOf(o).final.terminal = "failed"; }],
  ["no-own-terminal", "the reattached terminal carries no result", o => { reattachOf(o).final.hasResult = false; }],
  ["observer-control-call", "the observer called a second tool action", o => { reattachOf(o).actions.push("launch"); }],
  ["observer-control-call", "the host audit holds a control entry after the reattach", o => { reattachOf(o).final.controlAudit = [{ command: "cancel" }]; }],
  ["observer-control-call", "the host shows cancellationRequested after the reattach", o => { reattachOf(o).final.cancellationRequested = true; }],
  ["observer-control-call", "the post-loss inspector called a second tool action", o => { lossOf(o).actions.push("launch"); }],
  ["replayed-verdict", "the post-loss inspection replays completed", o => { lossOf(o).snapshot.terminal = "completed"; }],
  ["replayed-verdict", "the post-loss inspection replays failed", o => { lossOf(o).snapshot.terminal = "failed"; }],
  ["replayed-verdict", "the post-loss inspection replays cancelled", o => { lossOf(o).snapshot.terminal = "cancelled"; }],
  ["replayed-verdict", "the post-loss inspection carries a result", o => { lossOf(o).snapshot.hasResult = true; }],
  ["unknown-not-reconcilable", "the post-loss observation is not unknown", o => { lossOf(o).snapshot.observation = "observed-terminal"; }],
  ["unknown-not-reconcilable", "the post-loss source is not the client transport", o => { lossOf(o).snapshot.source = "live-detached-host"; }],
  ["unknown-not-reconcilable", "the post-loss terminal is absent", o => { lossOf(o).snapshot.terminal = null; }],
  ["unknown-not-reconcilable", "the post-loss hint does not forbid a retry", o => { lossOf(o).snapshot.reconcileHint = "Reconnect later."; }],
  ["unknown-not-reconcilable", "the post-loss hint is absent", o => { lossOf(o).snapshot.reconcileHint = null; }],
  ["rerun-after-loss", "a marker was added right after the host loss", o => { lossOf(o).markersAfterLoss = 2; }],
  ["rerun-after-loss", "a marker was added within the settle window", o => { lossOf(o).markersAfterSettle = 2; }],
  ["overclaim", "the wording claims more than OS DAC", o => { o.wording.security = "authenticated"; }],
  ["overclaim", "the wording claims crash durability", o => { o.wording.lifetime = "survives-host-crash"; }],
  ["overclaim", "the wording claims native identity", o => { o.wording.nativeRuntimeIdentity = "verified"; }],
  ["overclaim", "the wording drops the first non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.slice(1); }],
  ["overclaim", "the wording drops the second non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 1); }],
  ["overclaim", "the wording drops the third non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 2); }],
  ["overclaim", "the wording drops the fourth non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 3); }],
  ["overclaim", "the host receipt claims more than OS DAC", o => { launchOf(o).labels.security = "authenticated"; }],
  ["overclaim", "the host receipt claims crash durability", o => { launchOf(o).labels.lifetime = "survives-host-crash"; }],
  ["overclaim", "the host receipt claims native identity", o => { launchOf(o).labels.nativeRuntimeIdentity = "verified"; }],
  ["overclaim", "the launch profile hides its deviation from the Pi tool", o => { o.launchProfile.deviatesFromPiTool = false; }],
  ["overclaim", "the launch profile drops the local-provider deviation", o => { o.launchProfile.deviations = ["grants", "input"]; }],
  ["overclaim", "the launch profile misstates the launch permissions", o => { o.launchProfile.permissions = ["inspect", "execute", "cancel", "shutdown"]; }],
  ["overclaim", "the launch exceeds the Pi tool's permission pin", o => { launchOf(o).permissions = ["inspect", "execute", "cancel", "shutdown"]; o.launchProfile.permissions = ["inspect", "execute", "cancel", "shutdown"]; }],
  ["overclaim", "the launch carries less than the Pi tool's permission pin", o => { launchOf(o).permissions = ["inspect"]; o.launchProfile.permissions = ["inspect"]; }],
];

/** One row per not-realised plant: the unmet condition it must raise, what it plants, and the plant. */
type Unrealised = readonly [condition: string, plants: string, mutate: (o: Observed) => object];
const omit = (o: Observed, key: JourneyKey): object => ({ ...o, journeys: Object.fromEntries(Object.entries(o.journeys).filter(([name]) => name !== key)) });
const NOT_REALISED: readonly Unrealised[] = [
  ["launch-and-exit-unarmed", "the launch-and-exit journey is missing", o => omit(o, "launch-and-exit")],
  ["launch-and-exit-unarmed", "the launch-and-exit journey is unarmed", o => { launchOf(o).armed = false; return o; }],
  ["continued-execution-unarmed", "the continued-execution journey is missing", o => omit(o, "continued-execution")],
  ["continued-execution-unarmed", "the continued-execution journey is unarmed", o => { continuedOf(o).armed = false; return o; }],
  ["observer-reattach-unarmed", "the observer-reattach journey is missing", o => omit(o, "observer-reattach")],
  ["observer-reattach-unarmed", "the observer-reattach journey is unarmed", o => { reattachOf(o).armed = false; return o; }],
  ["host-loss-unarmed", "the host-loss journey is missing", o => omit(o, "host-loss")],
  ["host-loss-unarmed", "the host-loss journey is unarmed", o => { lossOf(o).armed = false; return o; }],
  ["evidence-block-missing", "the launch profile is missing", o => ({ ...o, launchProfile: undefined })],
  ["evidence-block-missing", "the native refs are missing", o => ({ ...o, nativeRefs: undefined })],
  ["client-not-exited", "the launching client exited nonzero", o => { launchOf(o).clientExit = { code: 1, signal: null }; return o; }],
  ["client-not-exited", "the launching client was still present after its exit", o => { launchOf(o).clientGoneAtExit = false; return o; }],
  ["client-not-exited", "the client pid is not a pid", o => { launchOf(o).clientPid = 0; return o; }],
  ["host-pid-invalid", "the host pid is not a pid", o => { launchOf(o).hostPid = -1; return o; }],
  ["effect-before-exit", "a marker already existed when the client exited", o => { launchOf(o).markersAtClientExit = 1; return o; }],
  ["observer-not-booted", "the Pi observer exited nonzero", o => { reattachOf(o).observerExit = { code: 3, signal: null }; return o; }],
  ["observer-not-booted", "the Pi observer registered no workflow_detached tool", o => { reattachOf(o).registered = false; return o; }],
  ["host-not-lost", "the host survived its SIGKILL", o => { lossOf(o).hostGone = false; return o; }],
  ["host-not-lost", "the host was stopped by a signal other than SIGKILL", o => { lossOf(o).signal = "SIGTERM"; return o; }],
  ["inspector-not-booted", "the post-loss Pi inspector exited nonzero", o => { lossOf(o).inspectorExit = { code: 3, signal: null }; return o; }],
  ["inspector-not-booted", "the post-loss Pi inspector registered no workflow_detached tool", o => { lossOf(o).registered = false; return o; }],
];

describe("wb-0kg.3 detached exit/reattach receipt judge: the clean journey, one MUTANTS row per finding rule, and the NOT_REALISED rows", () => {
  it("CLEAN: judges the clean journey realised with no finding, exit 0", () => {
    const assessed = assessDetachedReattachJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
    expect(exitCodeFor(buildDetachedReattachReceipt(receiptInput(clean())))).toBe(0);
  });

  it.each(MUTANTS.map(([rule, plants, mutate]) => ({ rule, plants, mutate })))("MUTANTS $rule: $plants", ({ rule, mutate }) => {
    const observed = clean();
    mutate(observed);
    expect(rules(observed)).toContain(rule);
    expect(realisedOf(observed)).toBe(true);
    // The judge's own verdict maps to exit 1; a wording mutant never reaches a built receipt, which stamps the module's wording.
    expect(exitCodeFor(assessDetachedReattachJourneys(observed))).toBe(1);
  });

  it.each(NOT_REALISED.map(([condition, plants, mutate]) => ({ condition, plants, mutate })))("NOT_REALISED $condition: $plants", ({ condition, mutate }) => {
    const observed = mutate(clean());
    expect(unrealisedOf(observed)).toContain(condition);
    expect(realisedOf(observed)).toBe(false);
    const receipt = buildDetachedReattachReceipt({ ...receiptInput(clean()), ...observed });
    expect(receipt.unrealised).toContain(condition);
    expect(receipt.realised).toBe(false);
    expect(receipt.pass).toBe(false);
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("NOT_REALISED evidence-block-missing: a direct judge call without the wording block (the receipt build always stamps it)", () => {
    expect(unrealisedOf({ ...clean(), wording: undefined })).toEqual(["evidence-block-missing"]);
    expect(rules({ ...clean(), wording: undefined })).toEqual([]);
  });

  it("NOT_REALISED: nothing observed leaves every journey unarmed and the evidence blocks missing, with no finding", () => {
    expect(unrealisedOf(undefined)).toEqual(["launch-and-exit-unarmed", "continued-execution-unarmed", "observer-reattach-unarmed", "host-loss-unarmed", "evidence-block-missing"]);
    expect(rules(undefined)).toEqual([]);
    expect(unrealisedOf(clean())).toEqual([]);
  });

  it("NOT_REALISED: a missing or unarmed journey adds no finding of its own", () => {
    for (const key of DETACHED_REATTACH_JOURNEYS as readonly JourneyKey[]) {
      expect(rules(omit(clean(), key)), `missing ${key}`).toEqual([]);
      const unarmed = clean();
      unarmed.journeys[key].armed = false;
      expect(rules(unarmed), `unarmed ${key}`).toEqual([]);
    }
  });

  it("NOT_REALISED: a journey that never ran is judged for nothing, so the runner's sparse unarmed records add no finding", () => {
    const launchLapsed = { ...clean(), journeys: { ...clean().journeys, "launch-and-exit": { armed: false, invocationId: INVOCATION, clientExit: { code: 3, signal: null } } } };
    expect(realisedOf(launchLapsed)).toBe(false);
    expect(rules(launchLapsed)).toEqual([]);
    const observerUnbooted = {
      ...clean(),
      journeys: {
        ...clean().journeys,
        "observer-reattach": { armed: false, observer: "booted-pi-extension", observerExit: { code: 3, signal: null }, registered: false, actions: [], first: null, final: null, markersAfterReattach: 1, markerContent: "" },
      },
    };
    expect(realisedOf(observerUnbooted)).toBe(false);
    expect(rules(observerUnbooted)).toEqual([]);
    const inspectorUnbooted = {
      ...clean(),
      journeys: {
        ...clean().journeys,
        "host-loss": { armed: false, signal: "SIGKILL", hostGone: true, inspectorExit: { code: 3, signal: null }, registered: false, actions: [], snapshot: null, markersAfterLoss: 1, markersAfterSettle: 1 },
      },
    };
    expect(realisedOf(inspectorUnbooted)).toBe(false);
    expect(rules(inspectorUnbooted)).toEqual([]);
  });

  it("maps a not-realised measurement to exit 2 even when it also carries findings", () => {
    const both = clean();
    lossOf(both).hostGone = false;
    lossOf(both).snapshot.terminal = "completed";
    const receipt = buildDetachedReattachReceipt(receiptInput(both));
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain("replayed-verdict");
    expect(receipt.unrealised).toEqual(["host-not-lost"]);
    expect(receipt.realised).toBe(false);
    expect(receipt.pass).toBe(false);
    expect(exitCodeFor(receipt)).toBe(2);
  });
});

describe("wb-0kg.3 receipt rosters and frozen shape: the finding rules, the unmet conditions, the journeys, the MUTANTS and NOT_REALISED rows and the header's pinned lines", () => {
  it("pins the finding-rule, journey and unmet-condition rosters", () => {
    expect([...DETACHED_REATTACH_FINDING_RULES]).toEqual([
      "host-not-detached",
      "host-stopped-by-client-exit",
      "effect-lost",
      "effect-not-in-host",
      "duplicate-effect",
      "reattach-failed",
      "reattach-identity-mismatch",
      "no-own-terminal",
      "observer-control-call",
      "replayed-verdict",
      "unknown-not-reconcilable",
      "rerun-after-loss",
      "overclaim",
    ]);
    expect([...DETACHED_REATTACH_JOURNEYS]).toEqual(["launch-and-exit", "continued-execution", "observer-reattach", "host-loss"]);
    expect([...DETACHED_REATTACH_UNREALISED]).toEqual([
      "launch-and-exit-unarmed",
      "continued-execution-unarmed",
      "observer-reattach-unarmed",
      "host-loss-unarmed",
      "evidence-block-missing",
      "client-not-exited",
      "host-pid-invalid",
      "effect-before-exit",
      "observer-not-booted",
      "host-not-lost",
      "inspector-not-booted",
    ]);
  });

  it("MUTANTS holds one row per finding rule of the module's roster, in roster order, with the frozen per-rule mutant counts", () => {
    expect([...new Set(MUTANTS.map(([rule]) => rule))]).toEqual([...DETACHED_REATTACH_FINDING_RULES]);
    const counts = DETACHED_REATTACH_FINDING_RULES.map((rule: string) => `${rule}:${MUTANTS.filter(([named]) => named === rule).length}`);
    expect(counts).toEqual([
      "host-not-detached:2",
      "host-stopped-by-client-exit:1",
      "effect-lost:2",
      "effect-not-in-host:2",
      "duplicate-effect:5",
      "reattach-failed:1",
      "reattach-identity-mismatch:6",
      "no-own-terminal:2",
      "observer-control-call:4",
      "replayed-verdict:4",
      "unknown-not-reconcilable:5",
      "rerun-after-loss:2",
      "overclaim:15",
    ]);
    expect(new Set(MUTANTS.map(([, plants]) => plants)).size).toBe(MUTANTS.length);
  });

  it("NOT_REALISED holds one row per condition of the module's roster, in roster order, with the frozen per-condition plant counts", () => {
    expect([...new Set(NOT_REALISED.map(([condition]) => condition))]).toEqual([...DETACHED_REATTACH_UNREALISED]);
    const counts = DETACHED_REATTACH_UNREALISED.map((condition: string) => `${condition}:${NOT_REALISED.filter(([named]) => named === condition).length}`);
    expect(counts).toEqual([
      "launch-and-exit-unarmed:2",
      "continued-execution-unarmed:2",
      "observer-reattach-unarmed:2",
      "host-loss-unarmed:2",
      "evidence-block-missing:2",
      "client-not-exited:3",
      "host-pid-invalid:1",
      "effect-before-exit:1",
      "observer-not-booted:2",
      "host-not-lost:2",
      "inspector-not-booted:2",
    ]);
    expect(new Set(NOT_REALISED.map(([, plants]) => plants)).size).toBe(NOT_REALISED.length);
  });

  it("the header's pinned MUTANTS, NOT_REALISED and SHAPE lines name the module's finding rules, its unmet conditions and the built receipt's fields, in order", () => {
    const header = readRepo("test/workbench-detached-receipt.test.ts").split("*/")[0] ?? "";
    const listed = (label: string): string => header.split("\n").find(entry => entry.startsWith(` *   ${label}: `)) ?? "";
    const mutants = listed("MUTANTS");
    const named = /DETACHED_REATTACH_FINDING_RULES \(([^)]*)\)/.exec(mutants)?.[1] ?? "";
    expect(named.split(", ")).toEqual([...DETACHED_REATTACH_FINDING_RULES]);
    const conditions = /DETACHED_REATTACH_UNREALISED \(([^)]*)\)/.exec(listed("NOT_REALISED"))?.[1] ?? "";
    expect(conditions.split(", ")).toEqual([...DETACHED_REATTACH_UNREALISED]);
    const shape = listed("SHAPE");
    const fields = /receipt carries (.*?), deep-frozen/.exec(shape)?.[1] ?? "";
    expect(fields.replace(" and ", ", ").split(", ")).toEqual(Object.keys(buildDetachedReattachReceipt(receiptInput(clean()))));
    for (const label of ["CLEAN", "PI_PIN", "RUNNER"]) expect(listed(label), label).not.toBe("");
  });
});

describe("wb-0kg.3 receipt SHAPE: docs/14 evidence fields, frozen, scrubbed, worded by the module", () => {
  it("builds a deep-frozen passing receipt with revision, tool versions, commands, timestamp, host, native refs and actual output", () => {
    const receipt = buildDetachedReattachReceipt(receiptInput(clean()));
    expect(receipt.contract).toBe(DETACHED_REATTACH_CONTRACT);
    expect(DETACHED_REATTACH_CONTRACT).toBe("workbench.detached-reattach/v1");
    expect(receipt.utc).toBe("2026-11-11T07:00:00.000Z");
    expect(receipt.revision).toBe("ce180d82f9385a315ff26bd8e7f9202cac19f5b3");
    expect(receipt.tools).toEqual(receiptInput(clean()).tools);
    expect(receipt.host).toEqual({ hostname: "fixture-host", platform: "linux", arch: "x64", release: "6.12.0" });
    expect(receipt.commands).toHaveLength(4);
    expect(receipt.nativeRefs).toEqual(clean().nativeRefs);
    expect(receipt.journeys["observer-reattach"].final.result).toEqual(live({}).result);
    expect(receipt.journeys["host-loss"].snapshot.reconcileHint).toBe(RECONCILE_TEXT);
    expect(receipt.markerCounts).toEqual({ [INVOCATION]: 1 });
    expect(receipt.findings).toEqual([]);
    expect(receipt.unrealised).toEqual([]);
    expect(receipt.diagnostics).toEqual([]);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(true);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys["launch-and-exit"])).toBe(true);
    expect(Object.isFrozen(receipt.wording.nonClaims)).toBe(true);
  });

  it("does not pass with a finding, and keeps the finding's rule and detail", () => {
    const observed = clean();
    reattachOf(observed).final.cancellationRequested = true;
    const receipt = buildDetachedReattachReceipt(receiptInput(observed));
    expect(receipt.pass).toBe(false);
    expect(receipt.realised).toBe(true);
    expect(receipt.findings).toHaveLength(1);
    expect(receipt.findings[0].rule).toBe("observer-control-call");
    expect(receipt.findings[0].detail).toContain(INVOCATION);
  });

  it("stamps the wording from the module constants, never from the caller's text", () => {
    expect(DETACHED_REATTACH_WORDING).toEqual({
      security: "same-machine-os-dac-only",
      lifetime: "survives-client-disconnect-not-host-crash",
      nativeRuntimeIdentity: "unsupported",
      nonClaims: [
        "no remote authentication evidence",
        "no hostile-same-user isolation evidence",
        "no host-crash durability evidence",
        "no launch through the registered workflow_detached tool: its launch pins providers [] and no local provider, so a module-API client launches this invocation",
      ],
    });
    const receipt = buildDetachedReattachReceipt({ ...receiptInput(clean()), wording: { security: "authenticated", lifetime: "survives-host-crash", nativeRuntimeIdentity: "verified", nonClaims: [] } });
    expect(receipt.wording).toEqual(DETACHED_REATTACH_WORDING);
    expect(receipt.pass).toBe(true);
  });

  it("scrubs every absolute path in journeys, refs, commands and diagnostics to its basename", () => {
    const input = receiptInput(clean());
    const observed = clean();
    reattachOf(observed).final.reconcileHint = "attached at /tmp/wb-reattach-abc/agent/workbench-detached/pi-exit-reattach/receipt.json";
    const receipt = buildDetachedReattachReceipt({
      ...input,
      ...observed,
      commands: ["node /home/someone/repo/qa/workbench/detached-reattach-receipt.mjs --client launch /tmp/wb-reattach-abc/request.json", ...input.commands.slice(1)],
      diagnostics: ["scratch at /tmp/wb-reattach-abc/source"],
    });
    const text = JSON.stringify(receipt);
    expect(text).not.toMatch(/\/tmp\/|\/home\/someone/);
    expect(text).toContain("receipt.json");
    expect(receipt.commands[0]).toBe("node detached-reattach-receipt.mjs --client launch request.json");
    expect(receipt.diagnostics).toEqual(["scratch at source"]);
  });

  it.each([
    ["utc", { utc: "" }],
    ["revision", { revision: "" }],
    ["tools", { tools: { package: "@tintinweb/pi-subagents@0.20.0" } }],
    ["tools", { tools: { node: "v24.20.0" } }],
    ["host", { host: { platform: "linux", arch: "x64" } }],
    ["host", { host: { hostname: "fixture-host", arch: "x64" } }],
    ["host", { host: { hostname: "fixture-host", platform: "linux" } }],
    ["commands", { commands: [] }],
    ["commands", { commands: ["node qa/workbench/detached-reattach-receipt.mjs", ""] }],
  ] as const)("refuses a receipt without its %s", (field, override) => {
    expect(() => buildDetachedReattachReceipt({ ...receiptInput(clean()), ...override })).toThrow(field);
  });
});

describe("wb-0kg.3 PI_PIN and RUNNER: the Pi tool pin the launch mirrors, and the runner roles the receipt names", () => {
  it("PI_PIN: mirrors the registered workflow_detached launch pin, whose providers [] and missing localProvider are the recorded deviation", () => {
    const index = readRepo("src/index.ts");
    const start = index.indexOf('name: "workflow_detached"');
    const end = index.indexOf("pi.registerTool(", start);
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const block = index.slice(start, end);
    const pinned = /permissions:\[([^\]]*)\]/.exec(block)?.[1] ?? "";
    expect(pinned.split(",").map(entry => entry.replaceAll('"', ""))).toEqual([...PI_TOOL_PERMISSIONS]);
    expect([...PI_TOOL_PERMISSIONS]).toEqual(["inspect", "execute"]);
    expect(block).toContain("providers:[]");
    expect(block).not.toContain("localProvider");
  });

  it("RUNNER: the Pi role calls workflow_detached with the inspect action only, the roles load the compiled entries the receipt names, and the loss signal is SIGKILL", () => {
    const runner = readRepo("qa/workbench/detached-reattach-receipt.mjs");
    expect(RUNNER_ENTRIES).toEqual({ host: "dist/workbench/hosts/local-detached.js", extension: "dist/index.js" });
    const start = runner.indexOf("async function piInspectClient(");
    const end = runner.indexOf("\n}\n", start);
    expect(start).toBeGreaterThan(-1);
    const role = runner.slice(start, end);
    expect(role).toContain("RUNNER_ENTRIES.extension");
    expect(role).toContain('tools.get("workflow_detached")');
    expect(role.match(/action: "[a-z]+"/g)).toEqual(['action: "inspect"']);
    expect(runner.slice(runner.indexOf("async function launchClient("), runner.indexOf("async function piInspectClient("))).toContain("RUNNER_ENTRIES.host");
    expect(runner).toContain('process.kill(hostPid, "SIGKILL")');
    expect(runner).toContain('signal: "SIGKILL"');
    expect(runner).toContain('import { basenameOnly, faultProviderSource } from "./local-detached-faults-receipt.mjs";');
  });
});
