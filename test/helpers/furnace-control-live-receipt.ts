/**
 * wb-752.7 (VC-4/W16 residual): the pure receipt module of the live external Furnace adverse cancellation journey
 * (test/workbench-furnace-control-live.test.ts). It imports nothing and reads no I/O, clock or random source: the live
 * suite gathers the evidence while attached to Runs the tier launcher (qa/workbench/live-furnace-vc4-launch.mjs) started
 * in disposable /tmp workspaces, and the offline suite (test/workbench-furnace-control-live-receipt.test.ts) hands this
 * module hand-built evidence; either way only the evidence is judged.
 *
 * Judged (bead wb-752.7 acceptance 1-5): exactly one stop verb per journey at the counted seam and in the process argv
 * (AC4), denials that never reach the seam (AC2), acknowledged and result phases echoing Furnace's own run_stop envelope
 * and stopped record, never minted (AC3), an observer close and a sibling Run that stay unchanged (AC1, AC4), an
 * uncertain outcome parked after one verb and never retried (AC4), and a receipt bound to a committed tree with typed
 * fields beside every capped text (AC5; wb-6hb.12). Unrealised steps pre-empt findings: an unmeasured claim is never
 * graded. The receipt refuses input carrying a credential-shaped value (plain input hygiene, as the vc4 receipt does) and
 * a furnace identity not copied from the inspect envelope's version block.
 */

export const CONTRACT = "workbench.furnace-control-live/v1";
/** Never "fixture": every journey here ran against the installed furnace binary and a real bd store. */
export const EVIDENCE_CLASS = "live";
export const LAUNCHER = "qa/workbench/live-furnace-vc4-launch.mjs";
export const LAUNCHER_CONTRACT = "workbench.furnace-vc4-fixture/v1";
export const LAUNCHER_RECORD = "launcher/fixture.json";
export const FIXTURE_ROOT_PREFIX = "/tmp/pi-external-furnace-realbd.";
export const FIXTURE_ROOT_PATTERN = /^\/tmp\/pi-external-furnace-realbd\.[^/]+$/;
export const RUN_ID_PATTERN = /^frn-run-[A-Za-z0-9_-]{1,100}$/;
export const FORMULA = "vc4-external";
export const GRANT = "control:furnace.stop";
export const INSPECT_CONTRACT = "furnace.run.inspect/v1";
/** The binary identity is copied from nativeFurnaceRunInspect's version block, never parsed from text. */
export const BINARY_IDENTITY_SOURCE = "furnace.run.inspect/v1#version";
export const STOP_KIND = "run_stop";
export const SETTLED_STATE = "stopped";
export const CONTROL_VERB = "run stop";
export const TEXT_CAP = 400;
/** The one text cap: a capped text in a receipt always sits beside typed fields or a typed record. */
export const capped = (text: string): string => text.slice(0, TEXT_CAP);
/** The verbs the attach and the observer speak; equal to the vc4 receipt module's list (drift-pinned offline). */
export const READ_ONLY_VERBS: readonly string[] = Object.freeze(["version", "run inspect", "run status", "attempt list", "logs"]);
export const READ_ONLY_METHODS: readonly string[] = Object.freeze(["runs.status", "attempts.list", "logs.read"]);
/** Verbs the harness itself speaks outside the control seam: one sibling launch per declared sibling, and listing. */
export const HARNESS_VERBS: readonly string[] = Object.freeze(["run start", "run list"]);
export const PHASES = Object.freeze(["requested", "acknowledged", "result", "denied", "uncertain", "observer-close", "sibling"] as const);
export type Phase = (typeof PHASES)[number];
export const SCENARIOS = Object.freeze({
  adverse: "adverse-stop-mid-flight",
  denied: "denied-without-grant",
  observer: "observer-close-stops-nothing",
  sibling: "sibling-unaffected",
  completed: "stop-of-completed-parks-uncertain",
  ambiguous: "ambiguous-stop-parks-uncertain",
  strictBooted: "strict-booted-tool-reading",
} as const);
/** Every scenario a realised receipt must have measured; the strict booted-tool reading is recorded unrealised by design. */
export const REQUIRED_SCENARIOS: readonly string[] = Object.freeze([
  SCENARIOS.adverse, SCENARIOS.denied, SCENARIOS.observer, SCENARIOS.sibling, SCENARIOS.completed, SCENARIOS.ambiguous,
]);
/** Scenarios whose stop is issued against a Run that must still be active under a live controller. */
export const ACTIVE_STOP_SCENARIOS: readonly string[] = Object.freeze([SCENARIOS.adverse, SCENARIOS.sibling, SCENARIOS.ambiguous]);
/** The decision core's denial vocabulary (src/workbench/control.ts ControlDenyPolicy), spelled out because this module imports nothing. */
export const DENY_POLICIES: readonly string[] = Object.freeze([
  "unknown-permission-data", "observer-only", "malformed-request", "unknown-action", "missing-exact-grant", "cross-scope", "no-confirmed-ownership", "operator-confirmation",
]);
/** Measured violations, in the order assess reports them. */
export const FINDING_RULES = Object.freeze([
  "stop-verb-count",
  "control-call-on-observer-close",
  "denial-reached-seam",
  "acknowledged-not-echoed",
  "result-without-native-echo",
  "uncertain-retried",
  "sibling-changed",
  "run-changed-on-close",
  "phase-fields-missing",
  "uncommitted-tree",
  "controller-outlived-hold",
  "label-mismatch",
] as const);
export type FindingRule = (typeof FINDING_RULES)[number];
/** Steps that did not run to the claimed measurement, in the order assess checks them. */
export const UNREALISED_STEPS = Object.freeze([
  "furnace-unavailable",
  "launcher-failed",
  "fixture-root-refused",
  "attach-failed",
  "run-not-active-at-stop",
  "controller-not-live-at-stop",
  "scenario-unrealised",
] as const);
export type UnrealisedStep = (typeof UNREALISED_STEPS)[number];
/** docs/workbench/14 "Truth labels and release gates" vocabulary: a live pass is distinct from a fixture pass. */
export type TruthLabel = "live SDK pass" | "live run with findings" | "not realised";

export interface NativeRef { provider: string; type: string; id: string; scope?: string }
/** One independent `run status` + `attempt list` read, summarised (the vc4 runner's independentRead shape plus state_since). */
export interface RunSummary {
  state: string;
  stateSince: string;
  updatedAt: string;
  controllerLive: boolean | null;
  controllerSessionId: string | null;
  attemptIds: string[];
  cancelledAttemptIds: string[];
  attemptStates: Record<string, string>;
}
/** Furnace's answer as the adapter observed it (FurnaceControlEcho). */
export interface ControlEcho { kind?: string; requestId?: string; id?: string; state?: string }
export type PhaseFields =
  | { phase: "requested"; requestId: string; grant: string; policy: string; ownershipConfirmationRef: string; target: NativeRef; decidedAt: string; runStateBefore: string; controllerLiveBefore: string }
  | { phase: "acknowledged"; status: string; requestId: string; nativeAckRef: string; acknowledgedAt: string; echo: ControlEcho }
  | { phase: "result"; requestId: string; targetId: string; outcome: string; nativeResultRef: string; settledAt: string; stateSince: string; seamCalls: number; nativeStateAfter: string; nativeStateSinceAfter: string; echo: ControlEcho }
  | { phase: "denied"; policy: string; category: string; status: string; invoked: boolean; seamCalls: number; processControlVerbs: number }
  | { phase: "uncertain"; requestId: string; status: string; reason: string; failure?: { kind: string; code?: string }; seamCalls: number; retried: boolean; nativeStateAfter: string }
  | { phase: "observer-close"; observerCalls: string[]; controlCalls: number; argv: string[][]; runBefore: RunSummary; runAfter: RunSummary; closedAt: string; storesEqual: boolean | null }
  | { phase: "sibling"; siblingRunId: string; targetRunId: string; stateBefore: string; stateAfter: string; controllerLiveAfter: boolean | null; attemptStateAfter: string; siblingSeamCalls: number; argvNamingSibling: number; listed: string[] };
/** One phase of one journey: a capped text for the eye and typed fields for the assessor, always together (wb-6hb.12). */
export interface PhaseRecord { scenario: string; phase: Phase; at: string; text: string; fields: PhaseFields }

export interface LauncherRecord {
  contract: string; root: string; runId: string; requestId: string; formula: string; launcherPid: number; controllerPid: number | null;
  holdSeconds: number; launchedAt: string; runningAt: string; attemptId: string;
}
/** What the harness looked at before anything spoke to a furnace inside the root (the vc4 fixture gate). */
export interface FixtureFacts {
  root: string;
  realRoot: string | null;
  runId: string;
  repoRoot: string;
  beadsStore: boolean;
  runRecord: boolean;
  launcher: LauncherRecord | null;
}
export interface Sibling { runId: string; requestId: string; controllerPid: number | null; launchedBy: "harness-detached-spawn" | "launcher-second-workspace"; attemptId: string }
export interface Fixture extends FixtureFacts { pattern: string; formula: string; holdSeconds: number; sibling?: Sibling }
export interface Attach {
  via: "nativeFurnaceRunInspect";
  contract: string;
  kind: string;
  requestId: string;
  run: { runId: string; beadsRunId: string; workspace: string; formula?: string; state: string; stateSince: string; creatingRequestId?: string };
  observation: { contract: string; requestIds: { status: string; attempts: string; logs: string[] }; attemptIds: string[]; completeness: string; controllerLive: string };
  projection: { nodes: string[]; ownershipEdges: Array<{ from: string; to: string; nativeConfirmationRef: string }> };
}
export type ControllerExit = "observed" | "forced-kill" | "unknown";
export interface Cleanup {
  root: string;
  controllerPid: number | null;
  controllerExit: ControllerExit;
  removed: boolean;
  siblingControllerExit?: ControllerExit;
  /** The launcher-made controller's own last words (launcher/controller.stdout and .stderr), capped: actual output. */
  controllerOutput?: { stdout: string; stderr: string };
}
export interface Journey {
  scenario: string;
  fixture: Fixture;
  scope: { workspace: string; principal: string; sessionId: string; owningInvocation: string };
  attach: Attach | null;
  cleanup: Cleanup | null;
}
/** VersionDto fields copied verbatim from the inspect envelope, under the source that names where they came from. */
export interface FurnaceIdentity {
  source: string;
  furnace_version: string;
  protocol_version: number;
  supported_state_schema: number;
  binary_revision: string;
  binary_path?: string;
  binary_digest?: string;
  beads_version?: string;
  beads_probe_dir: string;
}
export interface NativeReferences {
  runIds: string[]; attemptIds: string[]; beadsRunIds: string[]; furnaceRequestIds: string[]; controlRequestIds: string[];
  nativeAckRefs: string[]; nativeResultRefs: string[]; ownershipConfirmationRefs: string[];
}
export interface ArgvSummary { total: number; verbs: string[]; controlCapable: string[]; readOnly: number }
export interface VerbCounts {
  seam: { "runs.stop": number; "runs.pause": number; "runs.resume": number; "attempts.stop": number };
  reads: { "runs.status": number; "attempts.list": number; "logs.read": number };
  /** Every furnace process the suite caused, from the PATH shim log, with its classification. */
  processArgv: ArgvSummary & { rows: string[][] };
}
export interface Finding { rule: FindingRule; detail: string }
export interface Unrealised { step: UnrealisedStep; diagnostic: string }
/** Everything the live suite records; buildReceipt adds the judgement. */
export interface ReceiptEvidence {
  utc: string;
  command: string;
  revision: string;
  dirty: boolean | null;
  sources: Record<string, string>;
  toolchain: { node: string; vitest: string; sdk: string; furnace: FurnaceIdentity | null };
  host: { platform: string; arch: string; release: string; hostname: string; pid: number };
  grants: { permitted: string[]; denied: string[][] };
  journeys: Journey[];
  scenarios: Record<string, { realised: boolean; detail: string }>;
  phases: PhaseRecord[];
  nativeReferences: NativeReferences;
  verbCounts: VerbCounts;
  /** The exact tool-reply/v1 text the model would read: actual output. */
  replies: Array<{ scenario: string; raw: string }>;
  /** Independent run status reads around each control: actual output. */
  runRecords: Array<{ scenario: string; before: RunSummary; after: RunSummary }>;
  unrealised: Unrealised[];
}
export interface Receipt extends ReceiptEvidence {
  contract: typeof CONTRACT;
  evidenceClass: typeof EVIDENCE_CLASS;
  truthLabel: TruthLabel;
  findings: Finding[];
  realised: boolean;
  pass: boolean;
}
export interface Assessment { findings: Finding[]; unrealised: Unrealised[] }

const GLOBAL_VALUE_FLAGS = new Set(["-C", "--directory", "--state-dir", "--config", "--request-id"]);
const TWO_WORD_COMMANDS = new Set(["run", "attempt", "work", "config", "executor", "skill"]);
const HALTED_RUN_STATES = new Set(["stopped", "paused"]);
/** Furnace's RFC 3339 instant (nanosecond fraction, offset-qualified). */
const NATIVE_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;
// Input hygiene (plain): a scheme and a token, a vendor key prefix, or a secret-named assignment or field, anywhere in the
// JSON text, in a value or in a key. Nothing it reads is displayed, so an over-refusal costs an honest throw, never a leak.
const CREDENTIAL = /(?<![a-z0-9])(?:bearer|basic)\s+[^\s,;"']{6,}|(?:sk-ant-|sk-proj-|ghp_|github_pat_)[a-z0-9_-]|(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)["']?\s*[:=]/i;
const SECRET_FIELD = /^(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)$/i;

const finding = (rule: FindingRule, detail: string): Finding => ({ rule, detail });
const unrealised = (step: UnrealisedStep, diagnostic: string): Unrealised => ({ step, diagnostic });
const isInstant = (value: unknown): value is string => typeof value === "string" && NATIVE_INSTANT.test(value) && Number.isFinite(Date.parse(value));

/** Every string in the value, as raw text: the values, and the keys (which are also judged as field names). */
function credentialTexts(value: unknown, out: { values: string[]; keys: string[] } = { values: [], keys: [] }): { values: string[]; keys: string[] } {
  if (typeof value === "string") out.values.push(value);
  else if (Array.isArray(value)) for (const item of value) credentialTexts(item, out);
  else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      out.keys.push(key);
      credentialTexts(item, out);
    }
  }
  return out;
}
function carriesCredential(input: unknown): boolean {
  const { values, keys } = credentialTexts(input);
  return [JSON.stringify(input), ...values, ...keys].some(text => CREDENTIAL.test(text)) || keys.some(key => SECRET_FIELD.test(key));
}

/** The Furnace verb of a recorded argv, found after the global flags and their values (the vc4 module's reading). */
export function verbOf(argv: readonly string[]): string {
  const words: string[] = [];
  for (let index = 0; index < argv.length; index++) {
    const token = String(argv[index]);
    if (GLOBAL_VALUE_FLAGS.has(token)) {
      index++;
      continue;
    }
    if (token.startsWith("-")) continue;
    words.push(token);
    if (words.length === 1 && !TWO_WORD_COMMANDS.has(token)) break;
    if (words.length === 2) break;
  }
  return words.join(" ");
}
/** Every recorded argv row classified: the read-only verbs counted, everything else listed as control-capable in order. */
export function classifyArgv(rows: readonly (readonly string[])[]): ArgvSummary {
  const verbs = rows.map(row => verbOf(row));
  const controlCapable = verbs.filter(verb => !READ_ONLY_VERBS.includes(verb));
  return { total: rows.length, verbs, controlCapable, readOnly: verbs.length - controlCapable.length };
}

/** The launcher's record as parsed from launcher/fixture.json, or null when its shape is not the launcher's. */
export function launcherRecordOf(value: unknown): LauncherRecord | null {
  if (value === null || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const text = (key: string): string | null => (typeof record[key] === "string" ? (record[key] as string) : null);
  const contract = text("contract");
  const root = text("root");
  const runId = text("runId");
  const requestId = text("requestId");
  const formula = text("formula");
  const launchedAt = text("launchedAt");
  const runningAt = text("runningAt");
  const attemptId = text("attemptId");
  if (contract === null || root === null || runId === null || requestId === null || formula === null || launchedAt === null || runningAt === null || attemptId === null) return null;
  if (!Number.isInteger(record.launcherPid) || !Number.isInteger(record.holdSeconds)) return null;
  const controllerPid = Number.isInteger(record.controllerPid) ? (record.controllerPid as number) : null;
  return { contract, root, runId, requestId, formula, launcherPid: record.launcherPid as number, controllerPid, holdSeconds: record.holdSeconds as number, launchedAt, runningAt, attemptId };
}

/**
 * Why a fixture cannot be attached to, or null: the same rules as the vc4 receipt's fixtureRootRefusal. The harness asks
 * before speaking to any furnace inside a root; the assessor asks again, so a harness that skipped the question cannot pass.
 */
export function fixtureRefusal(fixture: FixtureFacts): string | null {
  const realRoot = fixture.realRoot;
  if (typeof realRoot !== "string" || realRoot === "") return "the fixture root does not resolve to an existing directory";
  if (!FIXTURE_ROOT_PATTERN.test(realRoot)) return `root ${realRoot} is not a disposable ${FIXTURE_ROOT_PREFIX}* workspace`;
  const repoRoot = fixture.repoRoot.trim();
  if (repoRoot && (realRoot === repoRoot || realRoot.startsWith(`${repoRoot}/`) || repoRoot.startsWith(`${realRoot}/`))) return `root ${realRoot} overlaps this repository at ${repoRoot}`;
  if (!RUN_ID_PATTERN.test(fixture.runId)) return `${fixture.runId} is not a native Furnace Run identity`;
  if (fixture.beadsStore !== true) return `root ${realRoot} has no real bd store at .beads/embeddeddolt`;
  if (fixture.runRecord !== true) return `root ${realRoot} has no Run record at .furnace/runs/${fixture.runId}/run.json`;
  const launcher = fixture.launcher;
  if (launcher === null) return `root ${realRoot} has no ${LAUNCHER_RECORD} launcher record; the Run must come from ${LAUNCHER}`;
  const problems: string[] = [];
  if (launcher.contract !== LAUNCHER_CONTRACT) problems.push(`contract ${launcher.contract}`);
  if (launcher.root !== realRoot) problems.push(`root ${launcher.root}`);
  if (launcher.runId !== fixture.runId) problems.push(`Run ${launcher.runId}`);
  if (launcher.requestId.trim() === "") problems.push("no creating request id");
  if (launcher.formula !== FORMULA) problems.push(`formula ${launcher.formula}`);
  return problems.length > 0 ? `the ${LAUNCHER_RECORD} launcher record does not name this fixture: ${problems.join(", ")}` : null;
}

/** What the Run itself changed between two summaries. Only a field both state is compared: absence is never progress. */
export function progressOf(start: RunSummary, end: RunSummary): string[] {
  const changes: string[] = [];
  for (const field of ["state", "updatedAt", "controllerSessionId"] as const) {
    if (start[field] !== null && end[field] !== null && start[field] !== end[field]) changes.push(`${field} ${String(start[field])} -> ${String(end[field])}`);
  }
  const ids = (summary: RunSummary): string => [...summary.attemptIds].sort().join(",");
  if (ids(start) !== ids(end)) changes.push(`attempts ${ids(start)} -> ${ids(end)}`);
  for (const id of Object.keys(start.attemptStates)) {
    const after = end.attemptStates[id];
    if (after !== undefined && after !== start.attemptStates[id]) changes.push(`attempt ${id} ${start.attemptStates[id]} -> ${after}`);
  }
  return changes;
}
/** What a view close must never explain: the vc4 receipt's assessClose rules. */
function closeProblems(before: RunSummary, after: RunSummary): string[] {
  const problems: string[] = [];
  if (HALTED_RUN_STATES.has(after.state) && after.state !== before.state) problems.push(`Run state ${before.state} -> ${after.state}`);
  if (after.cancelledAttemptIds.some(id => !before.cancelledAttemptIds.includes(id))) problems.push("an Attempt was cancelled");
  if (before.controllerSessionId && after.controllerSessionId && before.controllerSessionId !== after.controllerSessionId) problems.push("the controller session changed");
  if (before.controllerLive === true && after.controllerLive === false && after.state === "active") problems.push("the controller let go of a Run that still records active");
  if (before.attemptIds.some(id => !after.attemptIds.includes(id))) problems.push("a recorded Attempt disappeared");
  return problems;
}

type FieldsOf<P extends Phase> = Extract<PhaseFields, { phase: P }>;
function phasesOf<P extends Phase>(record: ReceiptEvidence, phase: P): Array<PhaseRecord & { fields: FieldsOf<P> }> {
  const out: Array<PhaseRecord & { fields: FieldsOf<P> }> = [];
  for (const entry of record.phases) {
    if (entry.phase === phase && entry.fields !== undefined && entry.fields !== null && entry.fields.phase === phase) out.push(entry as PhaseRecord & { fields: FieldsOf<P> });
  }
  return out;
}
const requestedOf = (record: ReceiptEvidence, scenario: string): FieldsOf<"requested"> | undefined => phasesOf(record, "requested").find(entry => entry.scenario === scenario)?.fields;

function assessStopVerbs(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  const stops = [...phasesOf(record, "result"), ...phasesOf(record, "uncertain")];
  for (const entry of stops) if (entry.fields.seamCalls !== 1) problems.push(`${entry.scenario} ${entry.phase} phase records ${entry.fields.seamCalls} seam calls`);
  const seam = record.verbCounts.seam;
  if (seam["runs.stop"] !== stops.length) problems.push(`seam runs.stop ${seam["runs.stop"]} for ${stops.length} stop journeys`);
  for (const name of ["runs.pause", "runs.resume", "attempts.stop"] as const) if (seam[name] !== 0) problems.push(`seam ${name} ${seam[name]}`);
  const summary = classifyArgv(record.verbCounts.processArgv.rows);
  const recorded = record.verbCounts.processArgv.controlCapable;
  if (recorded.length !== summary.controlCapable.length || recorded.some((verb, index) => verb !== summary.controlCapable[index])) problems.push("the recorded argv classification differs from the rows");
  const stopRows = summary.controlCapable.filter(verb => verb === CONTROL_VERB).length;
  if (stopRows !== stops.length) problems.push(`${stopRows} run stop processes for ${stops.length} stop journeys`);
  const siblings = record.journeys.filter(journey => journey.fixture.sibling !== undefined).length;
  const starts = summary.controlCapable.filter(verb => verb === "run start").length;
  if (starts !== siblings) problems.push(`${starts} run start processes for ${siblings} declared siblings`);
  const stray = summary.controlCapable.filter(verb => verb !== CONTROL_VERB && !HARNESS_VERBS.includes(verb));
  if (stray.length > 0) problems.push(`control-capable verbs outside the journey: ${stray.join(", ")}`);
  if (problems.length > 0) findings.push(finding("stop-verb-count", problems.join("; ")));
}
function assessObserverClose(record: ReceiptEvidence, findings: Finding[]): void {
  const control: string[] = [];
  const changed: string[] = [];
  for (const { fields } of phasesOf(record, "observer-close")) {
    if (fields.controlCalls !== 0) control.push(`${fields.controlCalls} control calls counted`);
    const methods = fields.observerCalls.filter(method => !READ_ONLY_METHODS.includes(method));
    if (methods.length > 0) control.push(`methods ${methods.join(", ")}`);
    const verbs = fields.argv.map(row => verbOf(row)).filter(verb => !READ_ONLY_VERBS.includes(verb));
    if (verbs.length > 0) control.push(`verbs ${verbs.join(", ")}`);
    changed.push(...closeProblems(fields.runBefore, fields.runAfter));
    if (fields.storesEqual === false && progressOf(fields.runBefore, fields.runAfter).length === 0) changed.push(".beads/.furnace bytes changed with no Run progress across the close");
  }
  if (control.length > 0) findings.push(finding("control-call-on-observer-close", control.join("; ")));
  if (changed.length > 0) findings.push(finding("run-changed-on-close", changed.join("; ")));
}
function assessDenials(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const { fields } of phasesOf(record, "denied")) {
    if (fields.seamCalls !== 0) problems.push(`${fields.policy}: ${fields.seamCalls} seam calls`);
    if (fields.processControlVerbs !== 0) problems.push(`${fields.policy}: ${fields.processControlVerbs} control-capable processes`);
    if (fields.invoked !== false) problems.push(`${fields.policy}: invoked ${String(fields.invoked)}`);
    if (fields.status !== "refused") problems.push(`${fields.policy}: status ${fields.status}`);
    if (!DENY_POLICIES.includes(fields.policy)) problems.push(`policy ${fields.policy} is not the core's`);
  }
  if (problems.length > 0) findings.push(finding("denial-reached-seam", problems.join("; ")));
}
function assessAcknowledged(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const entry of phasesOf(record, "acknowledged")) {
    const requested = requestedOf(record, entry.scenario);
    const { fields } = entry;
    if (requested === undefined) {
      problems.push(`${entry.scenario}: acknowledged without a requested phase`);
      continue;
    }
    if (fields.requestId !== requested.requestId) problems.push(`${entry.scenario}: request ${fields.requestId} is not ${requested.requestId}`);
    if (fields.nativeAckRef !== `${STOP_KIND}:${requested.requestId}`) problems.push(`${entry.scenario}: nativeAckRef ${fields.nativeAckRef}`);
    if (fields.echo.kind !== STOP_KIND || fields.echo.requestId !== requested.requestId || fields.echo.id !== requested.target.id) {
      problems.push(`${entry.scenario}: echo ${JSON.stringify(fields.echo)} is not Furnace's ${STOP_KIND} envelope for ${requested.requestId} on ${requested.target.id}`);
    }
  }
  if (problems.length > 0) findings.push(finding("acknowledged-not-echoed", problems.join("; ")));
}
function assessResults(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  const acknowledged = new Set(phasesOf(record, "acknowledged").map(entry => entry.scenario));
  for (const entry of phasesOf(record, "result")) {
    const requested = requestedOf(record, entry.scenario);
    const { fields } = entry;
    if (requested === undefined) {
      problems.push(`${entry.scenario}: result without a requested phase`);
      continue;
    }
    if (!acknowledged.has(entry.scenario)) problems.push(`${entry.scenario}: result without a distinct acknowledged phase`);
    if (fields.requestId !== requested.requestId || fields.targetId !== requested.target.id) problems.push(`${entry.scenario}: result names ${fields.requestId} on ${fields.targetId}`);
    if (fields.outcome !== "completed") problems.push(`${entry.scenario}: outcome ${fields.outcome}`);
    if (!isInstant(fields.stateSince)) problems.push(`${entry.scenario}: state_since ${fields.stateSince} is not a native instant`);
    if (fields.nativeResultRef !== `furnace-run:${requested.target.id}:${SETTLED_STATE}@${fields.stateSince}`) problems.push(`${entry.scenario}: nativeResultRef ${fields.nativeResultRef}`);
    if (fields.nativeStateAfter !== SETTLED_STATE) problems.push(`${entry.scenario}: the record read ${fields.nativeStateAfter} after the stop`);
    if (fields.nativeStateSinceAfter !== fields.stateSince) problems.push(`${entry.scenario}: the record's state_since ${fields.nativeStateSinceAfter} is not the echoed ${fields.stateSince}`);
    if (fields.echo.state !== SETTLED_STATE || fields.echo.id !== requested.target.id) problems.push(`${entry.scenario}: echo ${JSON.stringify(fields.echo)} does not settle ${requested.target.id}`);
  }
  if (problems.length > 0) findings.push(finding("result-without-native-echo", problems.join("; ")));
}
function assessUncertain(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const entry of phasesOf(record, "uncertain")) {
    const { fields } = entry;
    if (requestedOf(record, entry.scenario) === undefined) problems.push(`${entry.scenario}: uncertain without a requested phase`);
    if (fields.retried !== false) problems.push(`${entry.scenario}: retried ${String(fields.retried)}`);
    if (fields.seamCalls !== 1) problems.push(`${entry.scenario}: ${fields.seamCalls} seam calls`);
    if (fields.status !== "uncertain") problems.push(`${entry.scenario}: status ${fields.status}`);
  }
  if (problems.length > 0) findings.push(finding("uncertain-retried", problems.join("; ")));
}
function assessSibling(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const { fields } of phasesOf(record, "sibling")) {
    if (fields.stateAfter !== fields.stateBefore) problems.push(`${fields.siblingRunId} ${fields.stateBefore} -> ${fields.stateAfter}`);
    if (fields.controllerLiveAfter !== true) problems.push(`${fields.siblingRunId} controller live ${String(fields.controllerLiveAfter)}`);
    if (fields.attemptStateAfter !== "running") problems.push(`${fields.siblingRunId} attempt ${fields.attemptStateAfter}`);
    if (fields.siblingSeamCalls !== 0) problems.push(`${fields.siblingSeamCalls} seam calls named ${fields.siblingRunId}`);
    if (fields.argvNamingSibling !== 0) problems.push(`${fields.argvNamingSibling} control-capable processes named ${fields.siblingRunId}`);
    if (!fields.listed.includes(fields.siblingRunId) || !fields.listed.includes(fields.targetRunId)) problems.push(`run list did not list both ${fields.targetRunId} and ${fields.siblingRunId}`);
    const naming = record.verbCounts.processArgv.rows.filter(row => !READ_ONLY_VERBS.includes(verbOf(row)) && row.includes(fields.siblingRunId));
    if (naming.length > 0) problems.push(`${naming.length} control-capable argv rows name ${fields.siblingRunId}`);
  }
  if (problems.length > 0) findings.push(finding("sibling-changed", problems.join("; ")));
}
function assessCleanup(record: ReceiptEvidence, findings: Finding[]): void {
  const problems: string[] = [];
  for (const journey of record.journeys) {
    const cleanup = journey.cleanup;
    if (cleanup === null) {
      problems.push(`${journey.scenario}: no cleanup recorded`);
      continue;
    }
    if (cleanup.controllerExit !== "observed") problems.push(`${journey.scenario}: controller exit ${cleanup.controllerExit}`);
    if (cleanup.siblingControllerExit !== undefined && cleanup.siblingControllerExit !== "observed") problems.push(`${journey.scenario}: sibling controller exit ${cleanup.siblingControllerExit}`);
    if (cleanup.removed !== true) problems.push(`${journey.scenario}: root ${cleanup.root} not removed`);
  }
  if (problems.length > 0) findings.push(finding("controller-outlived-hold", problems.join("; ")));
}

/** Judge one evidence record. Unrealised steps pre-empt findings: an unmeasured claim is never graded. */
export function assess(record: ReceiptEvidence & { truthLabel?: string }): Assessment {
  const stop = (step: UnrealisedStep, diagnostic: string): Assessment => ({ findings: [], unrealised: [unrealised(step, diagnostic)] });
  if (record.unrealised.length > 0) return { findings: [], unrealised: record.unrealised.map(entry => ({ ...entry })) };
  const identity = record.toolchain.furnace;
  if (identity === null) return stop("attach-failed", "no furnace identity was copied from an inspect envelope");
  if (identity.source !== BINARY_IDENTITY_SOURCE) return stop("attach-failed", `the furnace identity source is ${identity.source}, not ${BINARY_IDENTITY_SOURCE}`);
  if (!FIXTURE_ROOT_PATTERN.test(identity.beads_probe_dir)) return stop("attach-failed", `the version probe ran in ${identity.beads_probe_dir}, not a disposable fixture root`);
  for (const journey of record.journeys) {
    const refusal = fixtureRefusal(journey.fixture);
    if (refusal !== null) return stop("fixture-root-refused", `${journey.scenario}: ${refusal}`);
    const attach = journey.attach;
    if (attach === null) return stop("attach-failed", `${journey.scenario}: no inspect envelope was recorded`);
    if (attach.via !== "nativeFurnaceRunInspect" || attach.contract !== INSPECT_CONTRACT || attach.kind !== "run_inspect") {
      return stop("attach-failed", `${journey.scenario}: attached via ${attach.via} with envelope ${attach.contract} kind ${attach.kind}`);
    }
    if (attach.run.runId !== journey.fixture.runId || attach.run.workspace !== journey.fixture.realRoot) {
      return stop("attach-failed", `${journey.scenario}: the envelope names Run ${attach.run.runId} in ${attach.run.workspace}`);
    }
  }
  for (const name of REQUIRED_SCENARIOS) {
    const scenario = record.scenarios[name];
    if (scenario === undefined || scenario.realised !== true) return stop("scenario-unrealised", `${name}: ${scenario?.detail ?? "not recorded"}`);
  }
  for (const entry of phasesOf(record, "requested")) {
    if (!ACTIVE_STOP_SCENARIOS.includes(entry.scenario)) continue;
    if (entry.fields.runStateBefore !== "active") return stop("run-not-active-at-stop", `${entry.scenario}: the Run read ${entry.fields.runStateBefore} before the stop`);
    if (entry.fields.controllerLiveBefore !== "yes") return stop("controller-not-live-at-stop", `${entry.scenario}: controller live ${entry.fields.controllerLiveBefore} before the stop`);
  }
  const findings: Finding[] = [];
  const untyped = record.phases.filter(entry => entry.fields === undefined || entry.fields === null || entry.fields.phase !== entry.phase);
  if (untyped.length > 0) findings.push(finding("phase-fields-missing", untyped.map(entry => `${entry.scenario} ${entry.phase}`).join(", ")));
  assessStopVerbs(record, findings);
  assessObserverClose(record, findings);
  assessDenials(record, findings);
  assessAcknowledged(record, findings);
  assessResults(record, findings);
  assessUncertain(record, findings);
  assessSibling(record, findings);
  if (record.dirty !== false) findings.push(finding("uncommitted-tree", record.dirty === null ? "the tree's status could not be read" : "the receipt was produced from a tree with uncommitted changes"));
  assessCleanup(record, findings);
  if (record.truthLabel !== undefined && record.truthLabel !== truthLabelOf({ realised: true, pass: findings.length === 0 })) {
    findings.push(finding("label-mismatch", `labelled ${record.truthLabel} with ${findings.length} findings`));
  }
  findings.sort((left, right) => FINDING_RULES.indexOf(left.rule) - FINDING_RULES.indexOf(right.rule));
  return { findings, unrealised: [] };
}

export function truthLabelOf(receipt: { realised: boolean; pass: boolean }): TruthLabel {
  if (!receipt.realised) return "not realised";
  return receipt.pass ? "live SDK pass" : "live run with findings";
}

/** Build the evidence-grade receipt. Refuses (throws, without echoing the value) input carrying a credential-shaped value. */
export function buildReceipt(input: ReceiptEvidence): Receipt {
  if (carriesCredential(input)) throw new Error("receipt input carries a credential-shaped value; refusing to record it");
  if (input.toolchain.furnace !== null && input.toolchain.furnace.source !== BINARY_IDENTITY_SOURCE) {
    throw new Error("the furnace identity comes from the inspect envelope's version block (nativeFurnaceRunInspect), never from prose");
  }
  const assessment = assess(input);
  const realised = assessment.unrealised.length === 0;
  const pass = realised && assessment.findings.length === 0;
  return {
    contract: CONTRACT,
    evidenceClass: EVIDENCE_CLASS,
    truthLabel: truthLabelOf({ realised, pass }),
    ...input,
    findings: assessment.findings,
    unrealised: assessment.unrealised,
    realised,
    pass,
  };
}
