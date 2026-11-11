/**
 * wb-0kg.3 (VC-7 residual): the detached exit/reattach acceptance receipt of a module-API launching client, judged offline.
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
 * NARROWING (a disclosed scope boundary; the bead's acceptance asks for the marker "AFTER full Pi client exit"): the client
 * whose exit the marker follows is that module-API launching client, not a Pi client. The registered workflow_detached launch
 * passes providers [] and no localProvider (PI_PIN below), so a script it launches has no capability through which the host
 * could write a marker, and this bead leaves src untouched. The launching client therefore imports the compiled host module,
 * calls its launchDetachedWorkflow with a reviewed trusted-local provider and boots no Pi extension (RUNNER below), and the
 * receipt's own wording carries the matching non-claim. The Pi processes of the journeys are the relaunched observer and the
 * post-loss inspector.
 *
 * PINNED reader set (this file; every case runs offline over fabricated journeys and three source texts - src/index.ts and the
 * receipt module, each read as a TypeScript syntax tree, and this file itself, read as its leading comment, this header, and as
 * a syntax tree for its case titles - and starts no process).
 * Each label below opens exactly one header line and at least one case title:
 *   CLEAN: the clean journey is judged realised with no finding and maps to exit 0.
 *   MUTANTS: rows for every finding rule of DETACHED_REATTACH_FINDING_RULES (host-not-detached, host-stopped-by-client-exit, effect-lost, effect-not-in-host, duplicate-effect, reattach-failed, reattach-identity-mismatch, no-own-terminal, observer-control-call, replayed-verdict, unknown-not-reconcilable, rerun-after-loss, overclaim), in roster order with frozen per-rule row counts; each row's mutant is judged realised with its rule among the findings and maps to exit 1.
 *   NOT_REALISED: rows for every condition of DETACHED_REATTACH_UNREALISED (launch-and-exit-unarmed, continued-execution-unarmed, observer-reattach-unarmed, host-loss-unarmed, evidence-block-missing, client-not-exited, host-pid-invalid, effect-before-exit, observer-not-booted, host-not-lost, inspector-not-booted), in roster order with frozen per-condition row counts; each row's plant is judged not realised with its condition among the unmet ones, directly and through a built receipt that then maps to exit 2.
 *   SHAPE: the built receipt carries contract, utc, revision, tools, host, commands, nativeRefs, wording, launchProfile, journeys, markerCounts, findings, unrealised, diagnostics, realised and pass, in that order, frozen at every depth, with the wording stamped from the module's constants.
 *   SCRUB: one row per block of DETACHED_REATTACH_SCRUBBED (tools, host, commands, nativeRefs, launchProfile, journeys, markerCounts, findings, diagnostics): an absolute path planted in a string value of that block (for findings, a markerCounts key that a duplicate-effect detail names) reaches the built block as its basename only.
 *   REFUSALS: one row per requirement of DETACHED_REATTACH_REQUIRED (utc, revision, tools.node, tools.package, host.hostname, host.platform, host.arch, commands, commands.entry): an input that breaks it - an empty utc or revision, tools or host without that key, an empty commands list, an empty command - makes buildDetachedReattachReceipt throw its own error naming the field.
 *   PI_PIN: the one registered workflow_detached launch call in src/index.ts passes providers as an empty array literal, permissions as the string literals of PI_TOOL_PERMISSIONS (inspect, execute), and no localProvider property, among its own properties or in the object literals it spreads.
 *   RUNNER: in the runner, the Pi role piInspectClient imports RUNNER_ENTRIES.extension (dist/index.js) and uses the workflow_detached tool only through execute calls whose action is the string literal inspect; the launcher role launchClient imports RUNNER_ENTRIES.host (dist/workbench/hosts/local-detached.js), calls launchDetachedWorkflow and names neither the Pi extension entry nor workflow_detached; toolVersions digests both entries; every kill call naming hostPid in harness sends the string literal SIGKILL, and the host-loss record's signal is that literal (the signal sent: the host is not the harness's child); the runner imports basenameOnly and faultProviderSource from ./local-detached-faults-receipt.mjs.
 * Each positive claim's falsifier: removing or inverting any operand of the && and || chains, at any depth, of the condition of
 * an if statement in assessDetachedReattachJourneys whose branch adds a finding or an unmet condition, or inverting that whole
 * condition, turns a CLEAN, MUTANTS or NOT_REALISED row red; leaving one DETACHED_REATTACH_SCRUBBED block unscrubbed turns its
 * SCRUB row red; dropping one requirement check of buildDetachedReattachReceipt turns its REFUSALS row red; a header label line
 * duplicated, added or emptied, a table row removed with or without its frozen-shape entry, or a roster entry removed here turns
 * the header, frozen-shape or roster row red against the module's own rosters; and a launch property, tool call, import or kill
 * signal changed in source while a comment keeps the old text turns its PI_PIN or RUNNER row red.
 * NOT CLAIMED by this census: the live journey's outcome on any machine (it is measured by running the runner, whose receipt this file never reads); a Pi-client exit before the marker (the narrowing above); launch through the registered workflow_detached tool; remote authentication; hostile-same-user isolation; host-crash durability; native executable identity; removing a conjoined isNumber guard, which only widens its condition, and weakening a comparison rather than removing or inverting it, beyond the rows that plant it; an absolute path in an object key, in utc or revision, or of a single segment; a value of another type that buildDetachedReattachReceipt also refuses; the wording of each row's plant description (a row's rule, condition, block or requirement and the per-table counts are pinned, its description is not).
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  assessDetachedReattachJourneys,
  buildDetachedReattachReceipt,
  DETACHED_REATTACH_CONTRACT,
  DETACHED_REATTACH_FINDING_RULES,
  DETACHED_REATTACH_JOURNEYS,
  DETACHED_REATTACH_REQUIRED,
  DETACHED_REATTACH_SCRUBBED,
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
  cancellationRequested: boolean | null;
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
type ReceiptInput = ReturnType<typeof receiptInput>;
function readRepo(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

/** One row per mutant: the finding rule it must raise, what it plants, and the plant. */
type Mutant = readonly [rule: string, plants: string, mutate: (o: Observed) => void];
const MUTANTS: readonly Mutant[] = [
  ["host-not-detached", "the host is the launching client's own process and session", o => { launchOf(o).hostPid = CLIENT_PID; launchOf(o).hostSessionId = CLIENT_PID; }],
  ["host-not-detached", "the host is not the leader of its own OS session", o => { launchOf(o).hostSessionId = 1; }],
  ["host-not-detached", "the host's session id is neither its own pid nor 1", o => { launchOf(o).hostSessionId = 7; }],
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
  ["reattach-failed", "the reattached snapshot source is unparsed", o => { reattachOf(o).final.source = "unparsed"; }],
  ["reattach-failed", "the armed reattach carries no final snapshot", o => { Reflect.deleteProperty(reattachOf(o), "final"); }],
  ["reattach-identity-mismatch", "the reattached host pid differs from the launch receipt", o => { reattachOf(o).final.receiptPid = 9999; }],
  ["reattach-identity-mismatch", "the reattached host instance differs from the launch receipt", o => { reattachOf(o).final.receiptHostInstanceId = "b2".repeat(24); }],
  ["reattach-identity-mismatch", "the reattached invocation differs from the launch receipt", o => { reattachOf(o).final.receiptInvocationId = "other-invocation"; }],
  ["reattach-identity-mismatch", "the invocation ref names another invocation", o => { o.nativeRefs[0] = { provider: "local-detached", type: "invocation", id: "other-invocation" }; }],
  ["reattach-identity-mismatch", "the host-instance ref is missing", o => { o.nativeRefs = o.nativeRefs.filter(ref => ref.type !== "host-instance"); }],
  ["reattach-identity-mismatch", "the refs name another provider", o => { o.nativeRefs = o.nativeRefs.map(ref => ({ ...ref, provider: "pi-workflow" })); }],
  ["reattach-identity-mismatch", "the host-instance ref is typed as an invocation", o => { o.nativeRefs[1] = { provider: "local-detached", type: "invocation", id: HOST_INSTANCE }; }],
  ["reattach-identity-mismatch", "the invocation ref entry is not an object", o => { Reflect.set(o.nativeRefs, 0, null); }],
  ["no-own-terminal", "the reattached terminal is failed", o => { reattachOf(o).final.terminal = "failed"; }],
  ["no-own-terminal", "the reattached terminal is cancelled", o => { reattachOf(o).final.terminal = "cancelled"; }],
  ["no-own-terminal", "the reattached terminal carries no result", o => { reattachOf(o).final.hasResult = false; }],
  ["observer-control-call", "the observer called a second tool action", o => { reattachOf(o).actions.push("launch"); }],
  ["observer-control-call", "the host audit holds a control entry after the reattach", o => { reattachOf(o).final.controlAudit = [{ command: "cancel" }]; }],
  ["observer-control-call", "the host shows cancellationRequested after the reattach", o => { reattachOf(o).final.cancellationRequested = true; }],
  ["observer-control-call", "the host never reported cancellationRequested after the reattach", o => { reattachOf(o).final.cancellationRequested = null; }],
  ["observer-control-call", "the post-loss inspector called a second tool action", o => { lossOf(o).actions.push("launch"); }],
  ["replayed-verdict", "the post-loss inspection replays completed", o => { lossOf(o).snapshot.terminal = "completed"; }],
  ["replayed-verdict", "the post-loss inspection replays failed", o => { lossOf(o).snapshot.terminal = "failed"; }],
  ["replayed-verdict", "the post-loss inspection replays cancelled", o => { lossOf(o).snapshot.terminal = "cancelled"; }],
  ["replayed-verdict", "the post-loss inspection carries a result", o => { lossOf(o).snapshot.hasResult = true; }],
  ["unknown-not-reconcilable", "the post-loss observation is not unknown", o => { lossOf(o).snapshot.observation = "observed-terminal"; }],
  ["unknown-not-reconcilable", "the post-loss source is not the client transport", o => { lossOf(o).snapshot.source = "live-detached-host"; }],
  ["unknown-not-reconcilable", "the post-loss terminal is absent", o => { lossOf(o).snapshot.terminal = null; }],
  ["unknown-not-reconcilable", "the post-loss hint does not forbid a retry", o => { lossOf(o).snapshot.reconcileHint = "Reconnect later."; }],
  ["unknown-not-reconcilable", "the post-loss hint invites a retry", o => { lossOf(o).snapshot.reconcileHint = "Host connection lost. Retry this invocation once the host is back."; }],
  ["unknown-not-reconcilable", "the post-loss hint is absent", o => { lossOf(o).snapshot.reconcileHint = null; }],
  ["unknown-not-reconcilable", "the armed host loss carries no snapshot", o => { Reflect.deleteProperty(lossOf(o), "snapshot"); }],
  ["rerun-after-loss", "a marker was added right after the host loss", o => { lossOf(o).markersAfterLoss = 2; }],
  ["rerun-after-loss", "a marker was added within the settle window", o => { lossOf(o).markersAfterSettle = 2; }],
  ["overclaim", "the wording claims more than OS DAC", o => { o.wording.security = "authenticated"; }],
  ["overclaim", "the wording claims crash durability", o => { o.wording.lifetime = "survives-host-crash"; }],
  ["overclaim", "the wording claims native identity", o => { o.wording.nativeRuntimeIdentity = "verified"; }],
  ["overclaim", "the wording drops the first non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.slice(1); }],
  ["overclaim", "the wording drops the second non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 1); }],
  ["overclaim", "the wording drops the third non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 2); }],
  ["overclaim", "the wording drops the fourth non-claim", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 3); }],
  ["overclaim", "the wording drops the fifth non-claim, the Pi-client exit", o => { o.wording.nonClaims = o.wording.nonClaims.filter((_, at) => at !== 4); }],
  ["overclaim", "the host receipt claims more than OS DAC", o => { launchOf(o).labels.security = "authenticated"; }],
  ["overclaim", "the host receipt claims crash durability", o => { launchOf(o).labels.lifetime = "survives-host-crash"; }],
  ["overclaim", "the host receipt claims native identity", o => { launchOf(o).labels.nativeRuntimeIdentity = "verified"; }],
  ["overclaim", "the host receipt carries no labels", o => { Reflect.deleteProperty(launchOf(o), "labels"); }],
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
  ["launch-and-exit-unarmed", "the launch-and-exit journey carries no armed flag", o => { Reflect.deleteProperty(launchOf(o), "armed"); return o; }],
  ["continued-execution-unarmed", "the continued-execution journey is missing", o => omit(o, "continued-execution")],
  ["continued-execution-unarmed", "the continued-execution journey is unarmed", o => { continuedOf(o).armed = false; return o; }],
  ["continued-execution-unarmed", "the continued-execution journey carries no armed flag", o => { Reflect.deleteProperty(continuedOf(o), "armed"); return o; }],
  ["observer-reattach-unarmed", "the observer-reattach journey is missing", o => omit(o, "observer-reattach")],
  ["observer-reattach-unarmed", "the observer-reattach journey is unarmed", o => { reattachOf(o).armed = false; return o; }],
  ["observer-reattach-unarmed", "the observer-reattach journey carries no armed flag", o => { Reflect.deleteProperty(reattachOf(o), "armed"); return o; }],
  ["host-loss-unarmed", "the host-loss journey is missing", o => omit(o, "host-loss")],
  ["host-loss-unarmed", "the host-loss journey is unarmed", o => { lossOf(o).armed = false; return o; }],
  ["host-loss-unarmed", "the host-loss journey carries no armed flag", o => { Reflect.deleteProperty(lossOf(o), "armed"); return o; }],
  ["evidence-block-missing", "the launch profile is missing", o => ({ ...o, launchProfile: undefined })],
  ["evidence-block-missing", "the launch profile is not an object", o => ({ ...o, launchProfile: "module-api-client" })],
  ["evidence-block-missing", "the native refs are missing", o => ({ ...o, nativeRefs: undefined })],
  ["evidence-block-missing", "the native refs are not a list", o => ({ ...o, nativeRefs: { invocation: INVOCATION } })],
  ["client-not-exited", "the launching client exited nonzero", o => { launchOf(o).clientExit = { code: 1, signal: null }; return o; }],
  ["client-not-exited", "the launching client was killed by a signal, with no exit code", o => { launchOf(o).clientExit = { code: null, signal: "SIGKILL" }; return o; }],
  ["client-not-exited", "the launching client was still present after its exit", o => { launchOf(o).clientGoneAtExit = false; return o; }],
  ["client-not-exited", "the client pid is not a pid", o => { launchOf(o).clientPid = 0; return o; }],
  ["client-not-exited", "the armed launch carries no client exit record", o => { Reflect.deleteProperty(launchOf(o), "clientExit"); return o; }],
  ["host-pid-invalid", "the host pid is not a pid", o => { launchOf(o).hostPid = -1; return o; }],
  ["host-pid-invalid", "the host pid is fractional", o => { launchOf(o).hostPid = HOST_PID + 0.5; launchOf(o).hostSessionId = HOST_PID + 0.5; return o; }],
  ["effect-before-exit", "a marker already existed when the client exited", o => { launchOf(o).markersAtClientExit = 1; return o; }],
  ["effect-before-exit", "no marker census was taken at the client's exit", o => { Reflect.deleteProperty(launchOf(o), "markersAtClientExit"); return o; }],
  ["observer-not-booted", "the Pi observer exited nonzero", o => { reattachOf(o).observerExit = { code: 3, signal: null }; return o; }],
  ["observer-not-booted", "the Pi observer was killed by a signal, with no exit code", o => { reattachOf(o).observerExit = { code: null, signal: "SIGKILL" }; return o; }],
  ["observer-not-booted", "the Pi observer registered no workflow_detached tool", o => { reattachOf(o).registered = false; return o; }],
  ["observer-not-booted", "the armed Pi observer carries no exit record", o => { Reflect.deleteProperty(reattachOf(o), "observerExit"); return o; }],
  ["host-not-lost", "the host survived its SIGKILL", o => { lossOf(o).hostGone = false; return o; }],
  ["host-not-lost", "the host was stopped by SIGTERM, not SIGKILL", o => { lossOf(o).signal = "SIGTERM"; return o; }],
  ["host-not-lost", "the host was stopped by SIGINT, not SIGKILL", o => { lossOf(o).signal = "SIGINT"; return o; }],
  ["inspector-not-booted", "the post-loss Pi inspector exited nonzero", o => { lossOf(o).inspectorExit = { code: 3, signal: null }; return o; }],
  ["inspector-not-booted", "the post-loss Pi inspector was killed by a signal, with no exit code", o => { lossOf(o).inspectorExit = { code: null, signal: "SIGKILL" }; return o; }],
  ["inspector-not-booted", "the post-loss Pi inspector registered no workflow_detached tool", o => { lossOf(o).registered = false; return o; }],
  ["inspector-not-booted", "the armed post-loss Pi inspector carries no exit record", o => { Reflect.deleteProperty(lossOf(o), "inspectorExit"); return o; }],
];

/** One row per scrubbed block: the block, what it plants, the basename the built block must keep, and the plant. */
type Scrub = readonly [block: string, plants: string, basename: string, plant: (input: ReceiptInput) => object];
const PLANTED = "/tmp/wb-scrub-plant/deep";
const SCRUB: readonly Scrub[] = [
  ["tools", "a tool digest names the compiled host module's path", "local-detached.js", input => ({ ...input, tools: { ...input.tools, hostModuleSha256: `missing at ${PLANTED}/local-detached.js` } })],
  ["host", "the host release names a path", "release-6.12", input => ({ ...input, host: { ...input.host, release: `${PLANTED}/release-6.12` } })],
  ["commands", "the launch command names the runner and request paths", "request.json", input => ({ ...input, commands: [`node ${PLANTED}/detached-reattach-receipt.mjs --client launch ${PLANTED}/request.json`, ...input.commands.slice(1)] })],
  ["nativeRefs", "the invocation ref carries a scope path", "invocation-scope", input => ({ ...input, nativeRefs: [{ ...input.nativeRefs[0], scope: `${PLANTED}/invocation-scope` }, ...input.nativeRefs.slice(1)] })],
  ["launchProfile", "the launch profile names its directory path", "workbench-detached", input => ({ ...input, launchProfile: { ...input.launchProfile, directory: `${PLANTED}/workbench-detached` } })],
  ["journeys", "the reattached snapshot's hint names a receipt path", "receipt.json", input => {
    const observed = clean();
    reattachOf(observed).final.reconcileHint = `attached at ${PLANTED}/receipt.json`;
    return { ...input, journeys: observed.journeys };
  }],
  ["markerCounts", "a marker census value names a path", "marker-note", input => ({ ...input, markerCounts: { ...input.markerCounts, note: `${PLANTED}/marker-note` } })],
  ["findings", "a duplicate-effect detail names a marker key's path", "pi-exit-reattach-copy", input => ({ ...input, markerCounts: { ...input.markerCounts, [`${PLANTED}/pi-exit-reattach-copy`]: 2 } })],
  ["diagnostics", "a diagnostic names its scratch path", "source", input => ({ ...input, diagnostics: [`scratch at ${PLANTED}/source`] })],
];

/** One row per receipt requirement: the requirement, what breaks it, the field the refusal names, and the override. */
type Refusal = readonly [requirement: string, plants: string, field: string, override: object];
const REFUSALS: readonly Refusal[] = [
  ["utc", "an empty utc", "utc", { utc: "" }],
  ["revision", "an empty revision", "revision", { revision: "" }],
  ["tools.node", "tools without node", "tools", { tools: { package: "@tintinweb/pi-subagents@0.20.0" } }],
  ["tools.package", "tools without package", "tools", { tools: { node: "v24.20.0" } }],
  ["host.hostname", "a host without hostname", "host", { host: { platform: "linux", arch: "x64" } }],
  ["host.platform", "a host without platform", "host", { host: { hostname: "fixture-host", arch: "x64" } }],
  ["host.arch", "a host without arch", "host", { host: { hostname: "fixture-host", platform: "linux" } }],
  ["commands", "an empty commands list", "commands", { commands: [] }],
  ["commands.entry", "an empty command in the list", "commands", { commands: ["node qa/workbench/detached-reattach-receipt.mjs", ""] }],
];

/** Every object or array under `value` that is not frozen, by path. */
function unfrozenPaths(value: unknown, path: string): string[] {
  if (typeof value !== "object" || value === null) return [];
  return [...(Object.isFrozen(value) ? [] : [path]), ...Object.entries(value).flatMap(([key, child]) => unfrozenPaths(child, `${path}.${key}`))];
}

// The source pins below are syntax pins: the sources are parsed, so a comment, a string or an earlier textual match never
// satisfies one, and every lookup that names one node asserts that exactly one exists.
const CENSUS_PATH = "test/workbench-detached-receipt.test.ts";
const LABELS = ["CLEAN", "MUTANTS", "NOT_REALISED", "SHAPE", "SCRUB", "REFUSALS", "PI_PIN", "RUNNER"] as const;

function sourceFile(path: string, kind: ts.ScriptKind): ts.SourceFile {
  return ts.createSourceFile(path, readRepo(path), ts.ScriptTarget.Latest, true, kind);
}
function descendants<T extends ts.Node>(root: ts.Node, matches: (node: ts.Node) => node is T): T[] {
  const found: T[] = [];
  const visit = (node: ts.Node): void => {
    if (matches(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration {
  const found = descendants(source, ts.isFunctionDeclaration).filter(node => node.name?.text === name);
  if (found.length !== 1) throw new Error(`${source.fileName} declares ${found.length} functions named ${name}, not one`);
  return found[0];
}
function calleeName(call: ts.CallExpression): string | undefined {
  if (ts.isPropertyAccessExpression(call.expression)) return call.expression.name.text;
  return ts.isIdentifier(call.expression) ? call.expression.text : undefined;
}
function callsNamed(root: ts.Node, name: string): ts.CallExpression[] {
  return descendants(root, ts.isCallExpression).filter(call => calleeName(call) === name);
}
function dynamicImports(root: ts.Node): ts.CallExpression[] {
  return descendants(root, ts.isCallExpression).filter(call => call.expression.kind === ts.SyntaxKind.ImportKeyword);
}
/** The RUNNER_ENTRIES members a node reads, as `RUNNER_ENTRIES.<member>`, in source order. */
function entriesRead(root: ts.Node): string[] {
  return descendants(root, ts.isPropertyAccessExpression)
    .filter(access => ts.isIdentifier(access.expression) && access.expression.text === "RUNNER_ENTRIES")
    .map(access => `RUNNER_ENTRIES.${access.name.text}`);
}
function mentions(root: ts.Node, name: string): boolean {
  return descendants(root, ts.isIdentifier).some(identifier => identifier.text === name);
}
/** A string literal's text; any other node reads as its source text marked as no literal, so it never equals a literal pin. */
function literal(node: ts.Node | undefined, source: ts.SourceFile): string {
  if (node === undefined) return "(absent)";
  return ts.isStringLiteralLike(node) ? node.text : `${node.getText(source)} (not a string literal)`;
}
/** The initializer of an object literal's own `name: value` property, when exactly one exists. */
function initializer(object: ts.ObjectLiteralExpression, name: string, source: ts.SourceFile): ts.Expression | undefined {
  const own = object.properties.filter((member): member is ts.PropertyAssignment => ts.isPropertyAssignment(member) && member.name.getText(source) === name);
  return own.length === 1 ? own[0].initializer : undefined;
}
/** The object literals a spread contributes, read through parentheses and conditionals; any other spread is refused. */
function spreadObjects(expression: ts.Expression, source: ts.SourceFile): ts.ObjectLiteralExpression[] {
  if (ts.isParenthesizedExpression(expression)) return spreadObjects(expression.expression, source);
  if (ts.isConditionalExpression(expression)) return [...spreadObjects(expression.whenTrue, source), ...spreadObjects(expression.whenFalse, source)];
  if (ts.isObjectLiteralExpression(expression)) return [expression];
  throw new Error(`a spread this reader cannot resolve: ${expression.getText(source)}`);
}
/** Every property name an object literal carries, its own and through the object literals it spreads. */
function propertyNames(object: ts.ObjectLiteralExpression, source: ts.SourceFile): string[] {
  return object.properties.flatMap(member => (ts.isSpreadAssignment(member) ? spreadObjects(member.expression, source).flatMap(spread => propertyNames(spread, source)) : [member.name.getText(source)]));
}
/** The value references to `name` under `root`: never a declaration's own name, a member name or a key, and never inside a function that rebinds `name` as a parameter. */
function references(root: ts.Node, name: string, source: ts.SourceFile): ts.Identifier[] {
  const found: ts.Identifier[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionLike(node) && node !== root && node.parameters.some(parameter => parameter.name.getText(source) === name)) return;
    if (ts.isIdentifier(node) && node.text === name) {
      const parent = node.parent;
      const declared = ts.isVariableDeclaration(parent) && parent.name === node;
      const memberName = ts.isPropertyAccessExpression(parent) && parent.name === node;
      const key = ts.isPropertyAssignment(parent) && parent.name === node;
      if (!declared && !memberName && !key) found.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
function censusHeader(): string {
  const text = readRepo(CENSUS_PATH);
  const range = ts.getLeadingCommentRanges(text, 0)?.[0];
  return range ? text.slice(range.pos, range.end) : "";
}
/** The titles of this file's it() and it.each() cases, read from its syntax tree. */
function caseTitles(): string[] {
  const source = sourceFile(CENSUS_PATH, ts.ScriptKind.TS);
  const isIt = (callee: ts.Expression): boolean =>
    (ts.isIdentifier(callee) && callee.text === "it") ||
    (ts.isCallExpression(callee) && ts.isPropertyAccessExpression(callee.expression) && callee.expression.name.text === "each" && callee.expression.expression.getText(source) === "it");
  return descendants(source, ts.isCallExpression)
    .filter(call => isIt(call.expression))
    .map(call => call.arguments[0])
    .filter((title): title is ts.StringLiteralLike => title !== undefined && ts.isStringLiteralLike(title))
    .map(title => title.text);
}

describe("wb-0kg.3 detached exit/reattach receipt judge: the CLEAN journey, the MUTANTS rows per finding rule and the NOT_REALISED rows per unmet condition", () => {
  it("CLEAN: judges the clean journey realised with no finding, exit 0", () => {
    const assessed = assessDetachedReattachJourneys(clean());
    expect(assessed.findings).toEqual([]);
    expect(assessed.realised).toBe(true);
    expect(assessed.unrealised).toEqual([]);
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

  it("NOT_REALISED evidence-block-missing: a direct judge call whose wording block is missing or not an object, while a built receipt stamps the module's wording", () => {
    for (const wording of [undefined, DETACHED_REATTACH_WORDING.security]) {
      expect(unrealisedOf({ ...clean(), wording }), String(wording)).toEqual(["evidence-block-missing"]);
      expect(rules({ ...clean(), wording }), String(wording)).toEqual([]);
    }
    expect(buildDetachedReattachReceipt({ ...receiptInput(clean()), wording: undefined }).unrealised).toEqual([]);
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

  it("NOT_REALISED: maps a not-realised measurement to exit 2 even when it also carries findings", () => {
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

describe("wb-0kg.3 receipt rosters and frozen shapes: the module rosters, the MUTANTS, NOT_REALISED, SCRUB and REFUSALS rows against them, and the header's PINNED lines", () => {
  it("pins the finding-rule, journey, unmet-condition, scrubbed-block and required-field rosters", () => {
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
    expect([...DETACHED_REATTACH_SCRUBBED]).toEqual(["tools", "host", "commands", "nativeRefs", "launchProfile", "journeys", "markerCounts", "findings", "diagnostics"]);
    expect([...DETACHED_REATTACH_REQUIRED]).toEqual(["utc", "revision", "tools.node", "tools.package", "host.hostname", "host.platform", "host.arch", "commands", "commands.entry"]);
  });

  it("MUTANTS holds rows for every finding rule of the module's roster, in roster order, with the frozen per-rule row counts and distinct plants", () => {
    expect([...new Set(MUTANTS.map(([rule]) => rule))]).toEqual([...DETACHED_REATTACH_FINDING_RULES]);
    const counts = DETACHED_REATTACH_FINDING_RULES.map((rule: string) => `${rule}:${MUTANTS.filter(([named]) => named === rule).length}`);
    expect(counts).toEqual([
      "host-not-detached:3",
      "host-stopped-by-client-exit:1",
      "effect-lost:2",
      "effect-not-in-host:2",
      "duplicate-effect:5",
      "reattach-failed:3",
      "reattach-identity-mismatch:8",
      "no-own-terminal:3",
      "observer-control-call:5",
      "replayed-verdict:4",
      "unknown-not-reconcilable:7",
      "rerun-after-loss:2",
      "overclaim:17",
    ]);
    expect(new Set(MUTANTS.map(([, plants]) => plants)).size).toBe(MUTANTS.length);
  });

  it("NOT_REALISED holds rows for every condition of the module's roster, in roster order, with the frozen per-condition row counts and distinct plants", () => {
    expect([...new Set(NOT_REALISED.map(([condition]) => condition))]).toEqual([...DETACHED_REATTACH_UNREALISED]);
    const counts = DETACHED_REATTACH_UNREALISED.map((condition: string) => `${condition}:${NOT_REALISED.filter(([named]) => named === condition).length}`);
    expect(counts).toEqual([
      "launch-and-exit-unarmed:3",
      "continued-execution-unarmed:3",
      "observer-reattach-unarmed:3",
      "host-loss-unarmed:3",
      "evidence-block-missing:4",
      "client-not-exited:5",
      "host-pid-invalid:2",
      "effect-before-exit:2",
      "observer-not-booted:4",
      "host-not-lost:3",
      "inspector-not-booted:4",
    ]);
    expect(new Set(NOT_REALISED.map(([, plants]) => plants)).size).toBe(NOT_REALISED.length);
  });

  it("SCRUB holds one row per block of the module's DETACHED_REATTACH_SCRUBBED, in roster order, with the frozen block:basename shapes and distinct plants", () => {
    expect(SCRUB.map(([block]) => block)).toEqual([...DETACHED_REATTACH_SCRUBBED]);
    expect(SCRUB.map(([block, , basename]) => `${block}:${basename}`)).toEqual([
      "tools:local-detached.js",
      "host:release-6.12",
      "commands:request.json",
      "nativeRefs:invocation-scope",
      "launchProfile:workbench-detached",
      "journeys:receipt.json",
      "markerCounts:marker-note",
      "findings:pi-exit-reattach-copy",
      "diagnostics:source",
    ]);
    expect(new Set(SCRUB.map(([, plants]) => plants)).size).toBe(SCRUB.length);
  });

  it("REFUSALS holds one row per requirement of the module's DETACHED_REATTACH_REQUIRED, in roster order, with the frozen requirement:field shapes, distinct plants and an accepted base input", () => {
    expect(REFUSALS.map(([requirement]) => requirement)).toEqual([...DETACHED_REATTACH_REQUIRED]);
    expect(REFUSALS.map(([requirement, , field]) => `${requirement}:${field}`)).toEqual([
      "utc:utc",
      "revision:revision",
      "tools.node:tools",
      "tools.package:tools",
      "host.hostname:host",
      "host.platform:host",
      "host.arch:host",
      "commands:commands",
      "commands.entry:commands",
    ]);
    expect(new Set(REFUSALS.map(([, plants]) => plants)).size).toBe(REFUSALS.length);
    expect(() => buildDetachedReattachReceipt(receiptInput(clean()))).not.toThrow();
  });

  it("the header holds each PINNED label on exactly one line, in order, opening a case title, its lines name the module's rosters, fields, pins and clean exit, and its one NOT CLAIMED sentence names every receipt non-claim", () => {
    const header = censusHeader();
    expect(header.startsWith("/**")).toBe(true);
    const lines = header.split("\n");
    expect(lines.map(line => /^ \* {3}([A-Z_]+): /.exec(line)?.[1]).filter(label => label !== undefined)).toEqual([...LABELS]);
    const listed = (label: string): string => {
      const found = lines.filter(line => line.startsWith(` *   ${label}: `));
      expect(found, label).toHaveLength(1);
      return found[0] ?? "";
    };
    const named = (line: string, name: string): string[] => (new RegExp(`${name.replaceAll(".", "\\.")} \\(([^)]*)\\)`).exec(line)?.[1] ?? "").split(", ");
    expect(named(listed("MUTANTS"), "DETACHED_REATTACH_FINDING_RULES")).toEqual([...DETACHED_REATTACH_FINDING_RULES]);
    expect(named(listed("NOT_REALISED"), "DETACHED_REATTACH_UNREALISED")).toEqual([...DETACHED_REATTACH_UNREALISED]);
    expect(named(listed("SCRUB"), "DETACHED_REATTACH_SCRUBBED")).toEqual([...DETACHED_REATTACH_SCRUBBED]);
    expect(named(listed("REFUSALS"), "DETACHED_REATTACH_REQUIRED")).toEqual([...DETACHED_REATTACH_REQUIRED]);
    expect(named(listed("PI_PIN"), "PI_TOOL_PERMISSIONS")).toEqual([...PI_TOOL_PERMISSIONS]);
    expect(named(listed("RUNNER"), "RUNNER_ENTRIES.extension")).toEqual([RUNNER_ENTRIES.extension]);
    expect(named(listed("RUNNER"), "RUNNER_ENTRIES.host")).toEqual([RUNNER_ENTRIES.host]);
    const fields = /receipt carries (.*?), in that order/.exec(listed("SHAPE"))?.[1] ?? "";
    expect(fields.replace(" and ", ", ").split(", ")).toEqual(Object.keys(buildDetachedReattachReceipt(receiptInput(clean()))));
    expect(/maps to exit (\d)/.exec(listed("CLEAN"))?.[1]).toBe(String(exitCodeFor(buildDetachedReattachReceipt(receiptInput(clean())))));
    const titles = caseTitles();
    for (const label of LABELS) expect(titles.some(title => title.startsWith(`${label} `) || title.startsWith(`${label}:`)), label).toBe(true);
    const notClaimed = lines.filter(line => line.includes("NOT CLAIMED by this census:"));
    expect(notClaimed).toHaveLength(1);
    for (const claim of DETACHED_REATTACH_WORDING.nonClaims) {
      const subject = claim.replace(/^no /, "").split(/ evidence|:/)[0] ?? "";
      expect(subject.length, claim).toBeGreaterThan(0);
      expect(notClaimed[0], subject).toContain(subject);
    }
  });
});

describe("wb-0kg.3 receipt SHAPE, SCRUB and REFUSALS: the docs/14 evidence fields frozen at every depth and worded by the module, scrubbed per block, refused per requirement", () => {
  it("SHAPE: builds a passing receipt frozen at every depth with revision, tool versions, commands, timestamp, host, native refs and actual output", () => {
    const receipt = buildDetachedReattachReceipt(receiptInput(clean()));
    expect(receipt.contract).toBe(DETACHED_REATTACH_CONTRACT);
    expect(DETACHED_REATTACH_CONTRACT).toBe("workbench.detached-reattach/v1");
    expect(receipt.utc).toBe("2026-11-11T07:00:00.000Z");
    expect(receipt.revision).toBe("ce180d82f9385a315ff26bd8e7f9202cac19f5b3");
    expect(receipt.tools).toEqual(receiptInput(clean()).tools);
    expect(receipt.host).toEqual({ hostname: "fixture-host", platform: "linux", arch: "x64", release: "6.12.0" });
    expect(receipt.commands).toEqual(receiptInput(clean()).commands);
    expect(receipt.nativeRefs).toEqual(clean().nativeRefs);
    expect(receipt.journeys["observer-reattach"].final.result).toEqual(live({}).result);
    expect(receipt.journeys["host-loss"].snapshot.reconcileHint).toBe(RECONCILE_TEXT);
    expect(receipt.markerCounts).toEqual({ [INVOCATION]: 1 });
    expect(receipt.findings).toEqual([]);
    expect(receipt.unrealised).toEqual([]);
    expect(receipt.diagnostics).toEqual([]);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(true);
    expect(unfrozenPaths({ block: { list: [] } }, "control")).toEqual(["control", "control.block", "control.block.list"]);
    expect(unfrozenPaths(receipt, "receipt")).toEqual([]);
  });

  it("SHAPE: does not pass with a finding, and keeps the finding's rule and detail", () => {
    const observed = clean();
    reattachOf(observed).final.cancellationRequested = true;
    const receipt = buildDetachedReattachReceipt(receiptInput(observed));
    expect(receipt.pass).toBe(false);
    expect(receipt.realised).toBe(true);
    expect(receipt.findings).toHaveLength(1);
    expect(receipt.findings[0].rule).toBe("observer-control-call");
    expect(receipt.findings[0].detail).toContain(INVOCATION);
  });

  it("SHAPE: stamps the wording from the module constants, never from the caller's text", () => {
    expect(DETACHED_REATTACH_WORDING).toEqual({
      security: "same-machine-os-dac-only",
      lifetime: "survives-client-disconnect-not-host-crash",
      nativeRuntimeIdentity: "unsupported",
      nonClaims: [
        "no remote authentication evidence",
        "no hostile-same-user isolation evidence",
        "no host-crash durability evidence",
        "no launch through the registered workflow_detached tool: its launch pins providers [] and no local provider, so a module-API client launches this invocation",
        "no Pi-client exit evidence: the client whose exit the marker follows is the module-API launching client, not a Pi session",
      ],
    });
    const receipt = buildDetachedReattachReceipt({ ...receiptInput(clean()), wording: { security: "authenticated", lifetime: "survives-host-crash", nativeRuntimeIdentity: "verified", nonClaims: [] } });
    expect(receipt.wording).toEqual(DETACHED_REATTACH_WORDING);
    expect(receipt.pass).toBe(true);
  });

  it("SCRUB: the absolute paths planted together in a journey hint, the launch command and a diagnostic scrub to exact basenames", () => {
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

  it.each(SCRUB.map(([block, plants, basename, plant]) => ({ block, plants, basename, plant })))("SCRUB $block: $plants, built as its basename $basename", ({ block, basename, plant }) => {
    const planted = plant(receiptInput(clean()));
    expect(JSON.stringify(planted)).toContain(PLANTED);
    const built = JSON.stringify(buildDetachedReattachReceipt(planted)[block]);
    expect(built).toContain(basename);
    expect(built).not.toContain("/tmp/");
  });

  it.each(REFUSALS.map(([requirement, plants, field, override]) => ({ requirement, plants, field, override })))("REFUSALS $requirement: $plants is refused, naming $field", ({ field, override }) => {
    expect(() => buildDetachedReattachReceipt({ ...receiptInput(clean()), ...override })).toThrow(`buildDetachedReattachReceipt: ${field} `);
  });
});

describe("wb-0kg.3 PI_PIN and RUNNER, read as syntax trees: the registered workflow_detached launch literals, and the runner's role imports, tool calls, launch call and kill signal", () => {
  it("PI_PIN: the one registered workflow_detached launch call in src/index.ts passes providers [], permissions [inspect, execute] and no localProvider", () => {
    const source = sourceFile("src/index.ts", ts.ScriptKind.TS);
    const tools = descendants(source, ts.isObjectLiteralExpression).filter(object => literal(initializer(object, "name", source), source) === "workflow_detached");
    expect(tools).toHaveLength(1);
    const launches = callsNamed(tools[0], "launchDetachedWorkflow");
    expect(launches).toHaveLength(1);
    const launch = launches[0].arguments[0];
    if (launch === undefined || !ts.isObjectLiteralExpression(launch)) throw new Error("the workflow_detached launch argument is not an object literal");
    const names = propertyNames(launch, source);
    expect(names.filter(name => name === "providers")).toHaveLength(1);
    expect(names.filter(name => name === "permissions")).toHaveLength(1);
    expect(names).not.toContain("localProvider");
    expect(descendants(tools[0], ts.isIdentifier).map(identifier => identifier.text)).not.toContain("localProvider");
    const providers = initializer(launch, "providers", source);
    expect(providers !== undefined && ts.isArrayLiteralExpression(providers) ? providers.elements.length : literal(providers, source)).toBe(0);
    const permissions = initializer(launch, "permissions", source);
    expect(permissions !== undefined && ts.isArrayLiteralExpression(permissions) ? permissions.elements.map(element => literal(element, source)) : literal(permissions, source)).toEqual([...PI_TOOL_PERMISSIONS]);
    expect([...PI_TOOL_PERMISSIONS]).toEqual(["inspect", "execute"]);
  });

  it("RUNNER: the Pi role imports dist/index.js and only inspects through workflow_detached execute, the launcher imports the host module and launches without a Pi extension, and harness kills the host with SIGKILL", () => {
    const source = sourceFile("qa/workbench/detached-reattach-receipt.mjs", ts.ScriptKind.JS);
    expect(RUNNER_ENTRIES).toEqual({ host: "dist/workbench/hosts/local-detached.js", extension: "dist/index.js" });
    const piRole = functionNamed(source, "piInspectClient");
    const launcher = functionNamed(source, "launchClient");
    const harness = functionNamed(source, "harness");

    expect(dynamicImports(piRole).map(entriesRead)).toEqual([["RUNNER_ENTRIES.extension"]]);
    const getters = descendants(piRole, ts.isCallExpression).filter(call => ts.isPropertyAccessExpression(call.expression) && call.expression.name.text === "get" && call.expression.expression.getText(source) === "tools");
    expect(getters.map(call => call.arguments.map(argument => literal(argument, source)))).toEqual([["workflow_detached"]]);
    const binding = getters[0].parent;
    if (!ts.isVariableDeclaration(binding) || !ts.isIdentifier(binding.name)) throw new Error("the workflow_detached tool is not bound to a name");
    const executions: ts.CallExpression[] = [];
    for (const use of references(piRole, binding.name.text, source)) {
      const parent = use.parent;
      if (ts.isPrefixUnaryExpression(parent) && parent.operator === ts.SyntaxKind.ExclamationToken) continue;
      const call = ts.isPropertyAccessExpression(parent) && parent.name.text === "execute" && ts.isCallExpression(parent.parent) && parent.parent.expression === parent ? parent.parent : undefined;
      expect(call, parent.getText(source)).toBeDefined();
      if (call) executions.push(call);
    }
    expect(executions.length).toBeGreaterThan(0);
    for (const call of executions) {
      const params = call.arguments[1];
      if (params === undefined || !ts.isObjectLiteralExpression(params)) throw new Error(`workflow_detached execute without an object literal: ${call.getText(source)}`);
      expect(params.properties.some(ts.isSpreadAssignment), call.getText(source)).toBe(false);
      expect(propertyNames(params, source).filter(name => name === "action"), call.getText(source)).toHaveLength(1);
      expect(literal(initializer(params, "action", source), source), call.getText(source)).toBe("inspect");
    }

    expect(dynamicImports(launcher).map(entriesRead)).toEqual([["RUNNER_ENTRIES.host"]]);
    expect(callsNamed(launcher, "launchDetachedWorkflow")).toHaveLength(1);
    expect(entriesRead(launcher)).toEqual(["RUNNER_ENTRIES.host"]);
    expect(descendants(launcher, ts.isStringLiteralLike).map(literal => literal.text)).not.toContain("workflow_detached");
    expect(entriesRead(functionNamed(source, "toolVersions"))).toEqual(["RUNNER_ENTRIES.host", "RUNNER_ENTRIES.extension"]);

    const kills = callsNamed(harness, "kill").filter(call => call.arguments.some(argument => mentions(argument, "hostPid")));
    expect(kills.length).toBeGreaterThan(0);
    for (const call of kills) {
      expect([call.arguments.length, call.arguments[0]?.getText(source), literal(call.arguments[1], source)], call.getText(source)).toEqual([2, "hostPid", "SIGKILL"]);
    }
    const lossRecords = descendants(harness, ts.isBinaryExpression).filter(
      binary => binary.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isElementAccessExpression(binary.left) && literal(binary.left.argumentExpression, source) === "host-loss",
    );
    expect(lossRecords).toHaveLength(1);
    const record = lossRecords[0].right;
    if (!ts.isObjectLiteralExpression(record)) throw new Error("the host-loss record is not an object literal");
    const signal = initializer(record, "signal", source);
    expect(literal(signal, source)).toBe("SIGKILL");

    const faults = source.statements.filter(ts.isImportDeclaration).filter(statement => literal(statement.moduleSpecifier, source) === "./local-detached-faults-receipt.mjs");
    expect(faults).toHaveLength(1);
    const bindings = faults[0].importClause?.namedBindings;
    expect(bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => element.name.text) : []).toEqual(["basenameOnly", "faultProviderSource"]);
  });
});
