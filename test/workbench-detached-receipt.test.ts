/**
 * wb-0kg.3 (VC-7 residual): the detached exit/reattach acceptance receipt of a module-API launching client, judged offline.
 *
 * Spec lines pinned:
 *   docs/workbench/15-implementation-program.md, VC-7: "Pi exits without stopping execution."
 *   docs/workbench/08-lifecycle-and-recovery.md, "Optional local detached profile": "Closing or exiting Pi disconnects the client, not the execution host. Inspection after host loss reports unknown with producer reconciliation guidance; it does not replay a saved terminal verdict or rerun JavaScript. The profile is same-machine OS discretionary-access control only, not remote authentication or hostile-same-user protection."
 *   docs/workbench/14-qa-and-benchmarks.md, "Truth labels and release gates": "Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native references and actual output."
 *
 * qa/workbench/detached-reattach-receipt.mjs is the pure judge (assessDetachedReattachJourneys, buildDetachedReattachReceipt,
 * exitCodeFor) and the live runner (`npm run build && node qa/workbench/detached-reattach-receipt.mjs`). This census never
 * runs the runner. The runner is written to measure four journeys when it runs: a module-API client process launches the
 * saved fixture workflow on the local detached profile and exits; the detached host writes the effect marker after that exit;
 * a booted Pi extension relaunched in a new process reattaches by the invocation ref through workflow_detached inspect; the
 * host is killed and a second booted Pi inspects after the loss.
 * NARROWING (a disclosed scope boundary, R-B773; the bead's acceptance asks for the marker "AFTER full Pi client exit"): the
 * client whose exit the marker follows is the runner's launchClient role, a module-API client, and a Pi-client exit is not
 * claimed. The registered workflow_detached launch call passes providers as an empty array literal and no localProvider key
 * (PI_PIN below) and this bead leaves src untouched, so launchClient imports RUNNER_ENTRIES.host and calls
 * launchDetachedWorkflow on that import, while the member access RUNNER_ENTRIES.extension appears only in piInspectClient and
 * toolVersions and harness spells RUNNER_ENTRIES only in Object.values(RUNNER_ENTRIES) (RUNNER and RUNNER_CALLS below). The
 * receipt's fifth non-claim states the same boundary.
 *
 * PINNED reader set (this file; every case runs offline over fabricated journeys and three source texts - src/index.ts and the
 * receipt module, each read as a TypeScript syntax tree, and this file itself, read as its leading comment, this header, and as
 * a syntax tree for its case titles, imports and reads - and starts no process).
 * Each label below opens exactly one header line and at least one case title:
 *   CLEAN: the clean journey is judged realised with no finding and maps to exit 0.
 *   MUTANTS: rows for every finding rule of DETACHED_REATTACH_FINDING_RULES (host-not-detached, host-stopped-by-client-exit, effect-lost, effect-not-in-host, duplicate-effect, reattach-failed, reattach-identity-mismatch, no-own-terminal, observer-control-call, replayed-verdict, unknown-not-reconcilable, rerun-after-loss, overclaim), in roster order with frozen per-rule row counts; each row's mutant is judged realised with its rule among the findings and maps to exit 1.
 *   NOT_REALISED: rows for every condition of DETACHED_REATTACH_UNREALISED (launch-and-exit-unarmed, continued-execution-unarmed, observer-reattach-unarmed, host-loss-unarmed, evidence-block-missing, client-not-exited, host-pid-invalid, effect-before-exit, observer-not-booted, host-not-lost, inspector-not-booted), in roster order with frozen per-condition row counts; each row's plant is judged not realised with its condition among the unmet ones, directly and through a built receipt that then maps to exit 2.
 *   SHAPE: the built receipt carries contract, utc, revision, tools, host, commands, nativeRefs, wording, launchProfile, journeys, markerCounts, findings, unrealised, diagnostics, realised and pass, in that order, frozen at every depth, with the wording stamped from the module's constants.
 *   SCRUB: one row per block of DETACHED_REATTACH_SCRUBBED (tools, host, commands, nativeRefs, launchProfile, journeys, markerCounts, findings, diagnostics), in roster order: the row plants PLANTED/<name> paths (PLANTED is /tmp/wb-scrub-plant/deep; the commands row plants two, the others one) in one string value of that block (for findings, in a markerCounts key that a duplicate-effect detail names), and the built block deep-equals the planted input's block with each planted path written as its bare <name> (for findings, exactly one duplicate-effect finding whose detail is the row's text), so the planted value reads exactly as the row's scrubbed text and no other value of the block changes; the three-path SCRUB case reads each of its planted values as its exact scrubbed text.
 *   REFUSALS: one row per requirement of DETACHED_REATTACH_REQUIRED (utc, revision, tools.node, tools.package, host.hostname, host.platform, host.arch, commands, commands.entry): an input that breaks it - an empty utc or revision, tools or host without that key, an empty commands list, an empty command - makes buildDetachedReattachReceipt throw its own error naming the field.
 *   PI_PIN: src/index.ts spells the string literal workflow_detached once, as the name of the one object literal passed to defineTool inside a registerTool call, and spells localProvider and __proto__ nowhere (no identifier, no string literal); inside that tool object launchDetachedWorkflow is spelled once, as the member of one direct call whose first argument is an object literal; every spread of that argument reaches only object literals, through parentheses and conditionals, and every key, its own and in those object literals, resolves to a static name (an identifier, string, numeric or template-literal key, a shorthand, method or accessor name, or a computed key holding such a literal), and among them providers appears once, initialized by an empty array literal, and permissions once, initialized by an array literal of the string literals of PI_TOOL_PERMISSIONS (inspect, execute).
 *   RUNNER: in the runner, RUNNER_ENTRIES (RUNNER_ENTRIES.host (dist/workbench/hosts/local-detached.js) and RUNNER_ENTRIES.extension (dist/index.js)) is declared once and otherwise spelled at five sites: launchClient's RUNNER_ENTRIES.host, piInspectClient's RUNNER_ENTRIES.extension, both in toolVersions and harness's Object.values(RUNNER_ENTRIES); the runner's own import declarations are exactly the nine its RUNNER case lists, it re-exports nothing, and it holds exactly two dynamic imports, launchClient's of pathToFileURL(join(ROOT, RUNNER_ENTRIES.host)).href and piInspectClient's of pathToFileURL(join(ROOT, RUNNER_ENTRIES.extension)).href, with ROOT declared once as join(dirname(SELF), "..", ".."), SELF once as fileURLToPath(import.meta.url), and join and pathToFileURL once each, by those imports; and it spells none of require, createRequire, getBuiltinModule, eval or Function.
 *   RUNNER_CALLS: in the runner, launchDetachedWorkflow is spelled once, as host.launchDetachedWorkflow called in launchClient, whose host is declared once there and written only by its dynamic import of RUNNER_ENTRIES.host; the string literal workflow_detached is spelled once, as the argument of piInspectClient's tools.get call; and execute is spelled twice, as the string literal of PI_TOOL_PERMISSIONS and as the member of one direct call in piInspectClient whose second argument is an object literal without spreads holding exactly one action key, resolved as PI_PIN resolves keys, initialized by the string literal inspect.
 *   RUNNER_SIGNALS: in the runner, kill is spelled four times, each the member of a direct call in harness sending the string literal SIGKILL (process.kill(hostPid, "SIGKILL") twice, a child's kill("SIGKILL") twice); process is never declared, assigned or spelled as a string literal, and hostPid is declared once; the one spawn call spawns process.execPath with this file (SELF) first; the string literal host-loss is spelled at three sites (the journey roster, the judge's journey lookup and harness's record), and the one host-loss record harness assigns has one signal key, initialized by the string literal SIGKILL; and every element access whose key is not a literal is one of the ten the RUNNER_SIGNALS case lists, none in launchClient or piInspectClient.
 * Each positive claim's falsifier: removing or inverting any operand of the && and || chains, at any depth, of the condition of
 * an if statement in assessDetachedReattachJourneys whose branch adds a finding or an unmet condition, or inverting that whole
 * condition, turns a CLEAN, MUTANTS or NOT_REALISED row red; leaving a SCRUB row's planted path unscrubbed, scrubbing it to any
 * other text, or changing any other value of that block turns its SCRUB row red; dropping one requirement check of
 * buildDetachedReattachReceipt turns its REFUSALS row red; a label line (a header line opening with an upper-case label and a
 * colon, at any indentation) duplicated, added or emptied, a table row removed without its frozen-shape entry, every row of
 * one rule, condition, block or requirement removed with or without its entry, or a roster entry removed here turns the
 * header, frozen-shape or roster row red against the module's own rosters; and any change to a spelling count, site,
 * declaration, import, key or literal that the PI_PIN, RUNNER, RUNNER_CALLS or RUNNER_SIGNALS line states (an alias, a
 * shadowing declaration, a helper, a quoted or computed key, a second binding, an element access, a changed literal) turns
 * that line's row red; a comment never satisfies any of them, since each reads a syntax tree.
 * NOT CLAIMED by this census: the live journey's outcome on any machine (it is measured by running the runner, whose receipt this file never reads); a Pi-client exit before the marker (the narrowing above); launch through the registered workflow_detached tool; remote authentication; hostile-same-user isolation; host-crash durability; native executable identity; whether a process the runner starts loads the Pi extension through a module it imports (the compiled host module) or through a name assembled at run time; a member, module or call reached without spelling its name (by iterating an object's values or entries, or through a function received at run time) and the text inside template literals (the sources the runner writes for the host to load); what launchDetachedWorkflow or any function called from the workflow_detached tool object does with the launch, and the launch of any other registered tool (workflow_execute's detached launcher included); removing a conjoined isNumber guard, which only widens its condition, and weakening a comparison rather than removing or inverting it, beyond the rows that plant it; any absolute path but the SCRUB rows' and the three-path SCRUB case's planted ones, so one in an object key, in utc or revision, or of a single segment; a value of another type that buildDetachedReattachReceipt also refuses; removing one row of a rule or condition that keeps another row together with its frozen per-table count (row counts have no source of truth outside this file); the wording of each row's plant description (a row's rule, condition, block or requirement and the per-table counts are pinned, its description is not).
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

/**
 * One row per scrubbed block: the block, what it plants, the exact text the planted value must read as once built, and the
 * plant, which writes each path it plants through `at` - plantedPath (PLANTED/<name>) for the planted input, bareName
 * (<name> alone) for the input whose block the built block must equal.
 */
type Scrub = readonly [block: string, plants: string, scrubbed: string, plant: (input: ReceiptInput, at: (name: string) => string) => object];
const PLANTED = "/tmp/wb-scrub-plant/deep";
const plantedPath = (name: string): string => `${PLANTED}/${name}`;
const bareName = (name: string): string => name;
const SCRUB: readonly Scrub[] = [
  ["tools", "a tool digest names the compiled host module's path", "missing at local-detached.js", (input, at) => ({ ...input, tools: { ...input.tools, hostModuleSha256: `missing at ${at("local-detached.js")}` } })],
  ["host", "the host release names a path", "release-6.12", (input, at) => ({ ...input, host: { ...input.host, release: at("release-6.12") } })],
  ["commands", "the launch command names the runner and request paths", "node detached-reattach-receipt.mjs --client launch request.json", (input, at) => ({ ...input, commands: [`node ${at("detached-reattach-receipt.mjs")} --client launch ${at("request.json")}`, ...input.commands.slice(1)] })],
  ["nativeRefs", "the invocation ref carries a scope path", "invocation-scope", (input, at) => ({ ...input, nativeRefs: [{ ...input.nativeRefs[0], scope: at("invocation-scope") }, ...input.nativeRefs.slice(1)] })],
  ["launchProfile", "the launch profile names its directory path", "workbench-detached", (input, at) => ({ ...input, launchProfile: { ...input.launchProfile, directory: at("workbench-detached") } })],
  ["journeys", "the reattached snapshot's hint names a receipt path", "attached at receipt.json", (input, at) => {
    const observed = clean();
    reattachOf(observed).final.reconcileHint = `attached at ${at("receipt.json")}`;
    return { ...input, journeys: observed.journeys };
  }],
  ["markerCounts", "a marker census value names a path", "marker-note", (input, at) => ({ ...input, markerCounts: { ...input.markerCounts, note: at("marker-note") } })],
  ["findings", "a duplicate-effect detail names a marker key's path", "pi-exit-reattach-copy has 2 markers; the effect must happen exactly once per logical invocation.", (input, at) => ({ ...input, markerCounts: { ...input.markerCounts, [at("pi-exit-reattach-copy")]: 2 } })],
  ["diagnostics", "a diagnostic names its scratch path", "scratch at source", (input, at) => ({ ...input, diagnostics: [`scratch at ${at("source")}`] })],
];
/** The block a SCRUB row's built block must equal: the bare-name input's block, or for findings the one duplicate-effect finding. */
function scrubExpected(block: string, scrubbed: string, plant: Scrub[3]): unknown {
  return block === "findings" ? [{ rule: "duplicate-effect", detail: scrubbed }] : Reflect.get(plant(receiptInput(clean()), bareName), block);
}

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
const INDEX_PATH = "src/index.ts";
const RUNNER_PATH = "qa/workbench/detached-reattach-receipt.mjs";
const LABELS = ["CLEAN", "MUTANTS", "NOT_REALISED", "SHAPE", "SCRUB", "REFUSALS", "PI_PIN", "RUNNER", "RUNNER_CALLS", "RUNNER_SIGNALS"] as const;

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
function dynamicImports(root: ts.Node): ts.CallExpression[] {
  return descendants(root, ts.isCallExpression).filter(call => call.expression.kind === ts.SyntaxKind.ImportKeyword);
}
/** A string literal's text; any other node reads as its source text marked as no literal, so it never equals a literal pin. */
function literal(node: ts.Node | undefined, source: ts.SourceFile): string {
  if (node === undefined) return "(absent)";
  return ts.isStringLiteralLike(node) ? node.text : `${node.getText(source)} (not a string literal)`;
}
/**
 * A property name read statically: identifier, private, string, numeric and template-literal names, and computed
 * names holding such a literal; undefined for any other computed name (and for a bigint name).
 */
function keyOf(name: ts.PropertyName): string | undefined {
  if (ts.isComputedPropertyName(name)) return ts.isStringLiteralLike(name.expression) || ts.isNumericLiteral(name.expression) ? name.expression.text : undefined;
  return ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : undefined;
}
/** The initializer of an object literal's own `key: value` member keyed `name` (as keyOf reads keys), when it is the only own member with that key. */
function initializer(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  const own = object.properties.filter(member => !ts.isSpreadAssignment(member) && keyOf(member.name) === name);
  return own.length === 1 && ts.isPropertyAssignment(own[0]) ? own[0].initializer : undefined;
}
/** The object literals a spread contributes, read through parentheses and conditionals; any other spread is refused. */
function spreadObjects(expression: ts.Expression, source: ts.SourceFile): ts.ObjectLiteralExpression[] {
  if (ts.isParenthesizedExpression(expression)) return spreadObjects(expression.expression, source);
  if (ts.isConditionalExpression(expression)) return [...spreadObjects(expression.whenTrue, source), ...spreadObjects(expression.whenFalse, source)];
  if (ts.isObjectLiteralExpression(expression)) return [expression];
  throw new Error(`a spread this reader cannot resolve: ${expression.getText(source)}`);
}
/** Every key an object literal carries, as keyOf reads it, its own and in the object literals it spreads; undefined marks a key keyOf cannot resolve. */
function propertyKeys(object: ts.ObjectLiteralExpression, source: ts.SourceFile): (string | undefined)[] {
  return object.properties.flatMap(member => (ts.isSpreadAssignment(member) ? spreadObjects(member.expression, source).flatMap(spread => propertyKeys(spread, source)) : [keyOf(member.name)]));
}
/** Every identifier, private name and string literal under `root` spelled exactly `name`, in source order; a comment or template-literal text is never one. */
function spelled(root: ts.Node, name: string): ts.Node[] {
  return descendants(root, (node): node is ts.Node => (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isStringLiteralLike(node)) && node.text === name);
}
/** The name of the function declaration enclosing `node`, or "module" at module scope. */
function ownerOf(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) if (ts.isFunctionDeclaration(at)) return at.name?.text ?? "(anonymous)";
  return "module";
}
/** The call that `node` names as its member, `<receiver>.<node>(...)`, or undefined for any other use of `node`. */
function calledMember(node: ts.Node): ts.CallExpression | undefined {
  const access = node.parent;
  if (!ts.isPropertyAccessExpression(access) || access.name !== node) return undefined;
  return ts.isCallExpression(access.parent) && access.parent.expression === access ? access.parent : undefined;
}
function isAssignment(kind: ts.SyntaxKind): boolean {
  return kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;
}
/** Every name a declaration binds under `root`: variables (destructured ones included), parameters, functions, classes, imports and catch bindings. */
function declaredNames(root: ts.Node): string[] {
  const names: string[] = [];
  const bind = (name: ts.BindingName): void => {
    if (ts.isIdentifier(name)) names.push(name.text);
    else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bind(element.name);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) || ts.isParameter(node)) bind(node.name);
    else if ((ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node)) && node.name) names.push(node.name.text);
    else if (ts.isImportClause(node) && node.name) names.push(node.name.text);
    else if (ts.isNamespaceImport(node) || ts.isImportSpecifier(node)) names.push(node.name.text);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return names;
}
/** The one variable declaration of `name` in `source`, as `<name> = <initializer>`, or how many there are. */
function declarationOf(source: ts.SourceFile, name: string): string {
  const found = descendants(source, ts.isVariableDeclaration).filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === name);
  return found.length === 1 ? `${name} = ${found[0].initializer?.getText(source) ?? "(no initializer)"}` : `${found.length} declarations of ${name}`;
}
/** Each use of the identifier `name` under `root`, in source order: declared, written (with the operator and the written expression) or read (with its parent); member names and keys are not uses. */
function valueUses(root: ts.Node, name: string, source: ts.SourceFile): string[] {
  return descendants(root, ts.isIdentifier)
    .filter(node => node.text === name && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) && !(ts.isPropertyAssignment(node.parent) && node.parent.name === node))
    .map(node => {
      const parent = node.parent;
      if (ts.isVariableDeclaration(parent) && parent.name === node) return "declared";
      if (ts.isBinaryExpression(parent) && parent.left === node && isAssignment(parent.operatorToken.kind)) return `written ${parent.operatorToken.getText(source)} ${parent.right.getText(source)}`;
      return `read: ${parent.getText(source)}`;
    });
}
/** Each import declaration of `source` as `<specifier>: <bound names>`, in source order. */
function importsOf(source: ts.SourceFile): string[] {
  return source.statements.filter(ts.isImportDeclaration).map(statement => {
    const clause = statement.importClause;
    const bindings = clause?.namedBindings;
    const named =
      bindings === undefined ? [] : ts.isNamedImports(bindings) ? bindings.elements.map(element => (element.propertyName ? `${element.propertyName.getText(source)} as ${element.name.text}` : element.name.text)) : [`* as ${bindings.name.text}`];
    return `${literal(statement.moduleSpecifier, source)}: ${[...(clause?.name ? [clause.name.text] : []), ...named].join(", ")}`;
  });
}
/** Every element access under `root` whose key is not a string or numeric literal, as `<owner>:<text>`, in source order. */
function computedAccesses(root: ts.Node, source: ts.SourceFile): string[] {
  return descendants(root, ts.isElementAccessExpression)
    .filter(access => !ts.isStringLiteralLike(access.argumentExpression) && !ts.isNumericLiteral(access.argumentExpression))
    .map(access => `${ownerOf(access)}:${access.getText(source)}`);
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

  it("SCRUB holds one row per block of the module's DETACHED_REATTACH_SCRUBBED, in roster order, with the frozen block:scrubbed-text shapes and distinct plants", () => {
    expect(SCRUB.map(([block]) => block)).toEqual([...DETACHED_REATTACH_SCRUBBED]);
    expect(SCRUB.map(([block, , scrubbed]) => `${block}:${scrubbed}`)).toEqual([
      "tools:missing at local-detached.js",
      "host:release-6.12",
      "commands:node detached-reattach-receipt.mjs --client launch request.json",
      "nativeRefs:invocation-scope",
      "launchProfile:workbench-detached",
      "journeys:attached at receipt.json",
      "markerCounts:marker-note",
      "findings:pi-exit-reattach-copy has 2 markers; the effect must happen exactly once per logical invocation.",
      "diagnostics:scratch at source",
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

  it("the header holds each PINNED label on exactly one line, in order, opening a case title, at any indentation no other label line, its lines name the module's rosters, fields, pins and clean exit and the RUNNER_CALLS and RUNNER_SIGNALS lines their call and signal tokens, and its one NOT CLAIMED sentence names every receipt non-claim", () => {
    const header = censusHeader();
    expect(header.startsWith("/**")).toBe(true);
    const lines = header.split("\n");
    expect(lines.map(line => /^\s*\*\s*([A-Z][A-Z_]*):\s/.exec(line)?.[1]).filter(label => label !== undefined)).toEqual([...LABELS]);
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
    for (const token of ["launchDetachedWorkflow", "tools.get", "PI_TOOL_PERMISSIONS", "the string literal inspect"]) expect(listed("RUNNER_CALLS"), token).toContain(token);
    for (const token of ['process.kill(hostPid, "SIGKILL")', "host-loss", "spawn"]) expect(listed("RUNNER_SIGNALS"), token).toContain(token);
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

  it("the PINNED reader set: this census imports only node:fs, typescript, vitest and the receipt module, holds no dynamic import and no require, and reads source text only through readRepo, of this file, src/index.ts and the receipt module", () => {
    const source = sourceFile(CENSUS_PATH, ts.ScriptKind.TS);
    expect(importsOf(source)).toEqual([
      "node:fs: readFileSync",
      "typescript: ts",
      "vitest: describe, expect, it",
      "../qa/workbench/detached-reattach-receipt.mjs: assessDetachedReattachJourneys, buildDetachedReattachReceipt, DETACHED_REATTACH_CONTRACT, DETACHED_REATTACH_FINDING_RULES, DETACHED_REATTACH_JOURNEYS, DETACHED_REATTACH_REQUIRED, DETACHED_REATTACH_SCRUBBED, DETACHED_REATTACH_UNREALISED, DETACHED_REATTACH_WORDING, exitCodeFor, PI_TOOL_PERMISSIONS, RUNNER_ENTRIES",
    ]);
    // This file names the spellings it looks up as string literals, so its own read counts identifiers only.
    expect(dynamicImports(source).map(call => call.getText(source))).toEqual([]);
    expect(["require", "createRequire", "getBuiltinModule", "eval", "Function"].flatMap(name => spelled(source, name).filter(ts.isIdentifier).map(node => node.getText(source)))).toEqual([]);
    expect(spelled(source, "readFileSync").filter(ts.isIdentifier).map(node => `${ownerOf(node)}:${ts.isImportSpecifier(node.parent) ? "imported" : ts.isCallExpression(node.parent) && node.parent.expression === node ? "called" : "another use"}`)).toEqual(["module:imported", "readRepo:called"]);
    const reads = descendants(source, ts.isCallExpression).filter(call => calleeName(call) === "readRepo" || calleeName(call) === "sourceFile");
    expect([...new Set(reads.map(call => `${calleeName(call)}(${call.arguments[0]?.getText(source)})`))].sort()).toEqual(["readRepo(CENSUS_PATH)", "readRepo(path)", "sourceFile(CENSUS_PATH)", "sourceFile(INDEX_PATH)", "sourceFile(RUNNER_PATH)"]);
    expect(reads.filter(call => call.arguments[0]?.getText(source) === "path").map(ownerOf)).toEqual(["sourceFile"]);
    expect([CENSUS_PATH, INDEX_PATH, RUNNER_PATH]).toEqual(["test/workbench-detached-receipt.test.ts", "src/index.ts", "qa/workbench/detached-reattach-receipt.mjs"]);
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

  it("SCRUB: three absolute paths planted together, in a journey hint, the launch command and a diagnostic, are built exactly as attached at receipt.json, node detached-reattach-receipt.mjs --client launch request.json and scratch at source, with no /tmp/, /home/someone or wb-reattach-abc text left in the receipt", () => {
    const input = receiptInput(clean());
    const observed = clean();
    reattachOf(observed).final.reconcileHint = "attached at /tmp/wb-reattach-abc/agent/workbench-detached/pi-exit-reattach/receipt.json";
    const receipt = buildDetachedReattachReceipt({
      ...input,
      ...observed,
      commands: ["node /home/someone/repo/qa/workbench/detached-reattach-receipt.mjs --client launch /tmp/wb-reattach-abc/request.json", ...input.commands.slice(1)],
      diagnostics: ["scratch at /tmp/wb-reattach-abc/source"],
    });
    expect(JSON.stringify(receipt)).not.toMatch(/\/tmp\/|\/home\/someone|wb-reattach-abc/);
    expect(receipt.journeys["observer-reattach"].final.reconcileHint).toBe("attached at receipt.json");
    expect(receipt.commands).toEqual(["node detached-reattach-receipt.mjs --client launch request.json", ...input.commands.slice(1)]);
    expect(receipt.diagnostics).toEqual(["scratch at source"]);
  });

  it.each(SCRUB.map(([block, plants, scrubbed, plant]) => ({ block, plants, scrubbed, plant })))("SCRUB $block: $plants, built exactly as $scrubbed with the rest of the block unchanged", ({ block, scrubbed, plant }) => {
    const planted = plant(receiptInput(clean()), plantedPath);
    expect(JSON.stringify(planted)).toContain(PLANTED);
    const built = Reflect.get(buildDetachedReattachReceipt(planted), block);
    expect(built).toEqual(scrubExpected(block, scrubbed, plant));
    expect(JSON.stringify(built)).toContain(JSON.stringify(scrubbed));
    expect(JSON.stringify(built)).not.toContain("wb-scrub-plant");
  });

  it.each(REFUSALS.map(([requirement, plants, field, override]) => ({ requirement, plants, field, override })))("REFUSALS $requirement: $plants is refused, naming $field", ({ field, override }) => {
    expect(() => buildDetachedReattachReceipt({ ...receiptInput(clean()), ...override })).toThrow(`buildDetachedReattachReceipt: ${field} `);
  });
});

describe("wb-0kg.3 PI_PIN and the RUNNER lines, read as syntax trees: the spellings, keys and literals of the registered workflow_detached launch, and the runner's entry sites, module loads, calls and signals", () => {
  it("PI_PIN: src/index.ts spells workflow_detached once, as its registered tool object's name, and never spells localProvider or __proto__; that tool object's one launchDetachedWorkflow call passes providers [] and permissions [inspect, execute], its spreads and keys all resolved", () => {
    const source = sourceFile(INDEX_PATH, ts.ScriptKind.TS);
    const names = spelled(source, "workflow_detached");
    expect(names).toHaveLength(1);
    const assignment = names[0].parent;
    const tool = assignment.parent;
    if (!ts.isPropertyAssignment(assignment) || assignment.initializer !== names[0] || keyOf(assignment.name) !== "name" || !ts.isObjectLiteralExpression(tool)) {
      throw new Error(`workflow_detached is not a tool object's name: ${assignment.getText(source)}`);
    }
    const defined = tool.parent;
    const registered = defined.parent;
    expect([
      ts.isCallExpression(defined) && calleeName(defined) === "defineTool" && defined.arguments[0] === tool,
      ts.isCallExpression(registered) && calleeName(registered) === "registerTool" && registered.arguments[0] === defined,
    ]).toEqual([true, true]);
    expect(spelled(source, "localProvider").map(node => node.getText(source))).toEqual([]);
    expect(spelled(source, "__proto__").map(node => node.getText(source))).toEqual([]);
    const launches = spelled(tool, "launchDetachedWorkflow");
    expect(launches).toHaveLength(1);
    const launch = calledMember(launches[0])?.arguments[0];
    if (launch === undefined || !ts.isObjectLiteralExpression(launch)) throw new Error("the workflow_detached launch is not a direct call with an object literal argument");
    const keys = propertyKeys(launch, source);
    expect(keys.filter(key => key === undefined)).toEqual([]);
    expect(keys.filter(key => key === "providers")).toHaveLength(1);
    expect(keys.filter(key => key === "permissions")).toHaveLength(1);
    const providers = initializer(launch, "providers");
    expect(providers !== undefined && ts.isArrayLiteralExpression(providers) ? providers.elements.length : literal(providers, source)).toBe(0);
    const permissions = initializer(launch, "permissions");
    expect(permissions !== undefined && ts.isArrayLiteralExpression(permissions) ? permissions.elements.map(element => literal(element, source)) : literal(permissions, source)).toEqual([...PI_TOOL_PERMISSIONS]);
    expect([...PI_TOOL_PERMISSIONS]).toEqual(["inspect", "execute"]);
  });

  it("RUNNER entries: RUNNER_ENTRIES is declared once and otherwise spelled at its five sites, the runner's own import declarations are the nine listed, it re-exports nothing, and its two dynamic imports are launchClient's of RUNNER_ENTRIES.host and piInspectClient's of RUNNER_ENTRIES.extension", () => {
    const source = sourceFile(RUNNER_PATH, ts.ScriptKind.JS);
    expect(RUNNER_ENTRIES).toEqual({ host: "dist/workbench/hosts/local-detached.js", extension: "dist/index.js" });
    const declared = declaredNames(source);
    expect(["RUNNER_ENTRIES", "ROOT", "SELF", "join", "pathToFileURL"].map(name => `${name}:${declared.filter(other => other === name).length}`)).toEqual([
      "RUNNER_ENTRIES:1",
      "ROOT:1",
      "SELF:1",
      "join:1",
      "pathToFileURL:1",
    ]);
    expect(["SELF", "ROOT"].map(name => declarationOf(source, name))).toEqual(["SELF = fileURLToPath(import.meta.url)", 'ROOT = join(dirname(SELF), "..", "..")']);
    const sites = spelled(source, "RUNNER_ENTRIES").map(node => {
      const parent = node.parent;
      if (ts.isVariableDeclaration(parent) && parent.name === node) return `${ownerOf(node)}:declared`;
      if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return `${ownerOf(node)}:${parent.getText(source)}`;
      if (ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node)) return `${ownerOf(node)}:${parent.getText(source)}`;
      return `${ownerOf(node)}:another use, ${parent.getText(source)}`;
    });
    expect(sites).toEqual([
      "module:declared",
      "launchClient:RUNNER_ENTRIES.host",
      "piInspectClient:RUNNER_ENTRIES.extension",
      "toolVersions:RUNNER_ENTRIES.host",
      "toolVersions:RUNNER_ENTRIES.extension",
      "harness:Object.values(RUNNER_ENTRIES)",
    ]);
    expect(importsOf(source)).toEqual([
      "node:child_process: spawn",
      "node:crypto: createHash",
      "node:fs: existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, unlinkSync, writeFileSync",
      "node:os: hostname, release",
      "node:path: basename, dirname, join",
      "node:url: fileURLToPath, pathToFileURL",
      "./git-stamp.mjs: revisionOf",
      "./local-detached-faults-receipt.mjs: basenameOnly, faultProviderSource",
      "./scratch.mjs: installScratchLeakGuard, makeScratch, removeScratch",
    ]);
    const reexports = source.statements.filter(statement => (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined) || ts.isImportEqualsDeclaration(statement));
    expect(reexports.map(statement => statement.getText(source))).toEqual([]);
    expect(dynamicImports(source).map(call => `${ownerOf(call)}:${call.arguments.map(argument => argument.getText(source)).join(", ")}`)).toEqual([
      "launchClient:pathToFileURL(join(ROOT, RUNNER_ENTRIES.host)).href",
      "piInspectClient:pathToFileURL(join(ROOT, RUNNER_ENTRIES.extension)).href",
    ]);
    expect(["require", "createRequire", "getBuiltinModule", "eval", "Function"].flatMap(name => spelled(source, name).map(node => `${ownerOf(node)}:${node.getText(source)}`))).toEqual([]);
  });

  it("RUNNER_CALLS: launchDetachedWorkflow is called once, on launchClient's host import; workflow_detached is fetched once, by piInspectClient's tools.get; execute is spelled only as the PI_TOOL_PERMISSIONS literal and as one direct call in piInspectClient whose one action key is the literal inspect", () => {
    const source = sourceFile(RUNNER_PATH, ts.ScriptKind.JS);
    const launches = spelled(source, "launchDetachedWorkflow").map(node => `${ownerOf(node)}:${calledMember(node)?.expression.getText(source) ?? `not a direct call, ${node.parent.getText(source)}`}`);
    expect(launches).toEqual(["launchClient:host.launchDetachedWorkflow"]);
    expect(valueUses(functionNamed(source, "launchClient"), "host", source)).toEqual([
      "declared",
      "written = await import(pathToFileURL(join(ROOT, RUNNER_ENTRIES.host)).href)",
      "read: host.launchDetachedWorkflow",
    ]);
    expect(spelled(source, "workflow_detached").map(node => `${ownerOf(node)}:${node.parent.getText(source)}`)).toEqual(['piInspectClient:tools.get("workflow_detached")']);
    const executes = spelled(source, "execute");
    const sites = executes.map(node => `${ownerOf(node)}:${ts.isStringLiteralLike(node) ? `literal in ${node.parent.getText(source)}` : calledMember(node) ? "direct call" : `not a direct call, ${node.parent.getText(source)}`}`);
    expect(sites).toEqual(['module:literal in ["inspect", "execute"]', "piInspectClient:direct call"]);
    expect(declarationOf(source, "PI_TOOL_PERMISSIONS")).toBe('PI_TOOL_PERMISSIONS = Object.freeze(["inspect", "execute"])');
    const calls = executes.map(calledMember).filter((call): call is ts.CallExpression => call !== undefined);
    expect(calls).toHaveLength(1);
    for (const call of calls) {
      const params = call.arguments[1];
      if (params === undefined || !ts.isObjectLiteralExpression(params)) throw new Error(`execute without an object literal: ${call.getText(source)}`);
      expect(params.properties.filter(ts.isSpreadAssignment).map(spread => spread.getText(source)), call.getText(source)).toEqual([]);
      expect(propertyKeys(params, source).filter(key => key === "action" || key === undefined), call.getText(source)).toEqual(["action"]);
      expect(literal(initializer(params, "action"), source), call.getText(source)).toBe("inspect");
    }
  });

  it("RUNNER_SIGNALS: kill is spelled only as four direct SIGKILL calls in harness, process is never declared, assigned or quoted, hostPid is declared once, the one spawn runs process.execPath on this file, the one host-loss record's signal is the literal SIGKILL, and the runner's ten literal-free element accesses are the listed ones", () => {
    const source = sourceFile(RUNNER_PATH, ts.ScriptKind.JS);
    expect(spelled(source, "kill").map(node => `${ownerOf(node)}:${calledMember(node)?.getText(source) ?? `not a direct call, ${node.parent.getText(source)}`}`)).toEqual([
      'harness:child.kill("SIGKILL")',
      'harness:process.kill(hostPid, "SIGKILL")',
      'harness:child.kill("SIGKILL")',
      'harness:process.kill(hostPid, "SIGKILL")',
    ]);
    const declared = declaredNames(source);
    expect(["process", "hostPid", "spawn"].map(name => `${name}:${declared.filter(other => other === name).length}`)).toEqual(["process:0", "hostPid:1", "spawn:1"]);
    const processWrites = descendants(source, ts.isBinaryExpression).filter(binary => isAssignment(binary.operatorToken.kind) && spelled(binary.left, "process").length > 0);
    expect(processWrites.map(binary => binary.getText(source))).toEqual([]);
    expect(spelled(source, "process").filter(ts.isStringLiteralLike).map(node => node.getText(source))).toEqual([]);
    const spawns = spelled(source, "spawn").map(node => {
      const parent = node.parent;
      if (ts.isImportSpecifier(parent)) return `${ownerOf(node)}:imported`;
      if (ts.isCallExpression(parent) && parent.expression === node) return `${ownerOf(node)}:spawn(${parent.arguments.slice(0, 2).map(argument => argument.getText(source)).join(", ")}, ...)`;
      return `${ownerOf(node)}:another use, ${parent.getText(source)}`;
    });
    expect(spawns).toEqual(["module:imported", 'harness:spawn(process.execPath, [SELF, "--client", ...args], ...)']);
    expect(spelled(source, "host-loss").map(node => `${ownerOf(node)}:${node.parent.getText(source)}`)).toEqual([
      'module:["launch-and-exit", "continued-execution", "observer-reattach", "host-loss"]',
      'assessDetachedReattachJourneys:journey("host-loss")',
      'harness:journeys["host-loss"]',
    ]);
    const records = descendants(source, ts.isBinaryExpression).filter(
      binary => binary.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isElementAccessExpression(binary.left) && literal(binary.left.argumentExpression, source) === "host-loss",
    );
    expect(records.map(record => ownerOf(record))).toEqual(["harness"]);
    const record = records[0].right;
    if (!ts.isObjectLiteralExpression(record)) throw new Error("the host-loss record is not an object literal");
    expect(propertyKeys(record, source).filter(key => key === "signal" || key === undefined)).toEqual(["signal"]);
    expect(literal(initializer(record, "signal"), source)).toBe("SIGKILL");
    expect(computedAccesses(source, source)).toEqual([
      "module:b[at]",
      "assessDetachedReattachJourneys:journeys[key]",
      "assessDetachedReattachJourneys:journeys[key]",
      "assessDetachedReattachJourneys:journeys[key]",
      "requiredText:input[field]",
      "requiredFields:input[field]",
      "requiredFields:value[key]",
      "requiredFields:value[key]",
      "harness:counts[id]",
      "harness:counts[id]",
    ]);
  });
});
