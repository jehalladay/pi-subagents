/**
 * Isolated live read-only observation adapters and one authorized gate-run flow (collective-adaptation M2-B, MWCOL-004 live half).
 *
 * Nothing here is a new client or engine: Forge is reached through the existing live-gate verification, Beads through the existing
 * BdExecutor seam (show only), Furnace through an injected reader, HyperUnix through the existing task-scope adapter. An
 * observation is labelled `live` only when a native receipt with at least one native id travels with it; an absent tool, an
 * unreadable record or an incomplete answer is an explicit `unknown` observation, never a pass and never a failure dressed as one.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { digest, reconcile, UNKNOWN } from "@mechanical/workflows-coordination";
import type { Basis, Budget, EpisodeEvent, Intent, JsonValue, Unknown } from "@mechanical/workflows-coordination";
import type { DevelopmentRequest } from "@mechanical/workflows-development";
import type { BdExecutor } from "./beads-host.js";
import type { GateObservation } from "./live-gate.js";
import { discoverTaskScope } from "./hx-scope.js";
import type { HxExecute } from "./hx-scope.js";

export type ObservationMode = "fixture" | "replay" | "live";
export type NativeSystem = "forge" | "beads" | "furnace" | "hx";
const RANK: Readonly<Record<string, number>> = { unknown: -1, fixture: 0, replay: 1, live: 2 };

export interface ReceiptInit { readonly system: NativeSystem; readonly ids: Readonly<Record<string, string>>; readonly raw: unknown }
/** The native evidence kept verbatim: the ids the tool minted, the raw answer and its digest. */
export interface NativeReceipt extends ReceiptInit { readonly rawDigest: string }

export type Observation<T> =
  | { readonly mode: ObservationMode; readonly system: NativeSystem; readonly outcome: "observed"; readonly value: T; readonly receipt: NativeReceipt | null }
  | { readonly mode: ObservationMode | "unknown"; readonly system: NativeSystem; readonly outcome: "unknown"; readonly value: Unknown; readonly reason: string; readonly receipt: NativeReceipt | null };

export type ObservationInit<T> =
  | { readonly mode: ObservationMode; readonly system: NativeSystem; readonly outcome: "observed"; readonly value: T; readonly receipt: ReceiptInit | null }
  | { readonly mode: ObservationMode | "unknown"; readonly system: NativeSystem; readonly outcome: "unknown"; readonly reason: string; readonly receipt: ReceiptInit | null };

function object(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function text(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}
function jsonSafe(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value ?? null)) as JsonValue;
}
function makeReceipt(init: ReceiptInit): NativeReceipt {
  const ids: Record<string, string> = {};
  for (const key of Object.keys(init.ids).sort()) { const id = text(init.ids[key]); if (id !== null) ids[key] = id; }
  const raw = jsonSafe(init.raw);
  return { system: init.system, ids, raw, rawDigest: digest(raw) };
}
const hasNativeId = (receipt: NativeReceipt | null): receipt is NativeReceipt => receipt !== null && Object.keys(receipt.ids).length > 0;

/** Build an observation. A `live` label needs an observed outcome and a receipt that retains at least one native id. */
export function makeObservation<T>(init: ObservationInit<T>): Observation<T> {
  const receipt = init.receipt === null ? null : makeReceipt(init.receipt);
  if (init.mode === "live" && (init.outcome !== "observed" || !hasNativeId(receipt))) {
    throw new Error(`LIVE_LABEL_WITHOUT_NATIVE_ID: a live ${init.system} observation must retain a native receipt id`);
  }
  if (init.outcome === "unknown") return { mode: init.mode, system: init.system, outcome: "unknown", value: UNKNOWN, reason: init.reason, receipt };
  return { mode: init.mode, system: init.system, outcome: "observed", value: init.value, receipt };
}

/** Relabel an observation. Keeping or lowering the label is allowed; an upgrade, a label outside the closed enum and any label on an unknown outcome is refused. */
export function labelObservation<T>(observation: Observation<T>, mode: string): Observation<T> {
  const known = (key: string): boolean => Object.prototype.hasOwnProperty.call(RANK, key);
  const target = known(mode) ? RANK[mode]! : undefined;
  if (target === undefined || mode === "unknown" || !known(observation.mode) || target > RANK[observation.mode]!) {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: an observation labelled ${observation.mode} cannot be labelled ${mode}`);
  }
  return { ...observation, mode: mode as ObservationMode };
}

/** A recorded native receipt replayed offline: it keeps its ids and is labelled replay, which can never become live. */
export function replayObservation<T>(recorded: { readonly system: NativeSystem; readonly value: T; readonly receipt: ReceiptInit | null }): Observation<T> {
  return makeObservation({ mode: "replay", system: recorded.system, outcome: "observed", value: recorded.value, receipt: recorded.receipt });
}

function unknownOf<T>(system: NativeSystem, reason: string, receipt: ReceiptInit | null = null): Observation<T> {
  return makeObservation<T>({ mode: "unknown", system, outcome: "unknown", reason, receipt });
}
function liveOf<T>(system: NativeSystem, value: T, receipt: ReceiptInit): Observation<T> {
  return makeObservation({ mode: "live", system, outcome: "observed", value, receipt });
}

/**
 * What the independent read of a Forge gate returns: the operation Forge logged for the gate, keyed by the command id the
 * receipt named. A one-shot `forge build` also writes a `commands.jsonl` row (verdict, gated commit and tree); a served
 * `gate.run` (App Server, forge 0.2.1 f897f3619fa9) writes none, so for it `commit`, `tree` and `verdict` stay null — nothing
 * on disk states them and nothing here invents them. `operationId` is the operation the receipt named; `buildOperationId`
 * is the inner build operation Forge keyed its own records by (they differ for a served gate; `commandId` links them).
 */
export interface ForgeGateRecord {
  readonly operationId: string;
  readonly buildOperationId: string;
  readonly commandId: string;
  readonly traceId: string | null;
  readonly commit: string | null;
  readonly tree: string | null;
  readonly verdict: string | null;
  readonly terminalStatus: string | null;
  readonly closedAt: string;
}
/** The ids the command receipt named; the observation is keyed by them, never by "whatever ran last". */
export interface ForgeExpectation { readonly operationId: string; readonly commandId: string }
/** `operation`: forge/operation-log/1; `command`: the commands.jsonl row or null; `record`: forge/operation-record/1 or null. */
export interface ForgeNativeRecords { readonly operation: unknown; readonly command: unknown; readonly record?: unknown }
export type ForgeRecordReader = (root: string, expect: ForgeExpectation) => Promise<ForgeNativeRecords>;
/** The operation log closes at the moment its command row (or operation record) is stamped; a wider gap means the two records do not describe one gate. */
const OPERATION_COMMAND_LINK_MS = 5_000;
const SAFE_OPERATION_ID = /^[A-Za-z0-9_-]+$/;

async function readJson(path: string): Promise<unknown> { return JSON.parse(await readFile(path, "utf8")) as unknown; }
async function readCommandRow(root: string, commandId: string): Promise<unknown> {
  let command: unknown = null;
  let rows: string;
  try { rows = await readFile(join(root, ".forge", "logs", "commands.jsonl"), "utf8"); } catch { return null; }
  for (const line of rows.split("\n")) {
    if (line.trim() === "") continue;
    let row: unknown;
    try { row = JSON.parse(line); } catch { continue; }
    if (object(row)?.["command_id"] === commandId) command = row;
  }
  return command;
}

/**
 * Forge's own per-gate records in the gated root. The operation log `.forge/logs/operations/<op>.json` (schema
 * forge/operation-log/1) is found by the operation id the receipt named or, when Forge keyed it by its inner build
 * operation instead (a served gate.run), by the `command_id` it carries; the operation record
 * `.forge/state/operations/<op>.json` (forge/operation-record/1) and the `commands.jsonl` row are read when present.
 * `.forge/last-run.json` is the pytest fix-verify manifest (no operation id); a gate never writes it, so it is not read.
 */
const readNativeRecords: ForgeRecordReader = async (root, expect) => {
  if (!SAFE_OPERATION_ID.test(expect.operationId)) throw new Error("unsafe operation id");
  const logs = join(root, ".forge", "logs", "operations");
  let operation: unknown = null;
  try { operation = await readJson(join(logs, `${expect.operationId}.json`)); } catch { operation = null; }
  if (operation === null) {
    let names: string[] = [];
    try { names = (await readdir(logs)).filter(name => name.endsWith(".json") && SAFE_OPERATION_ID.test(name.slice(0, -5))); } catch { names = []; }
    let latest = "";
    for (const name of names.sort()) {
      let candidate: unknown;
      try { candidate = await readJson(join(logs, name)); } catch { continue; }
      const row = object(candidate);
      if (row?.["command_id"] !== expect.commandId) continue;
      const closed = text(row["closed_at"]) ?? "";
      if (operation === null || closed >= latest) { operation = candidate; latest = closed; }
    }
  }
  if (operation === null) throw new Error("no operation log for the named operation or command id");
  const buildOperationId = text(object(operation)?.["operation_id"]);
  let record: unknown = null;
  if (buildOperationId !== null && SAFE_OPERATION_ID.test(buildOperationId)) {
    try { record = await readJson(join(root, ".forge", "state", "operations", `${buildOperationId}.json`)); } catch { record = null; }
  }
  const command = await readCommandRow(root, expect.commandId);
  if (command === null && record === null) throw new Error("neither a command row nor an operation record for the named command id");
  return { operation, command, record };
};

/** Read-only Forge observation from the operation log plus the command row or operation record Forge wrote for the named command. */
export async function observeForgeGate(root: string, expect: ForgeExpectation, read: ForgeRecordReader = readNativeRecords): Promise<Observation<ForgeGateRecord>> {
  let raw: ForgeNativeRecords;
  try { raw = await read(root, expect); } catch { return unknownOf("forge", "FORGE_RECORD_UNREADABLE"); }
  const operation = object(raw.operation);
  const row = object(raw.command);
  const record = object(raw.record);
  const buildOperationId = text(operation?.["operation_id"]);
  const closedAt = text(operation?.["closed_at"]);
  const unlinked = { system: "forge" as const, ids: {}, raw };
  if (operation === null || buildOperationId === null || closedAt === null || operation["complete"] !== true) {
    return unknownOf("forge", "FORGE_OPERATION_LOG_INCOMPLETE", unlinked);
  }
  const operationCommand = text(operation["command_id"]);
  if (operationCommand !== null && operationCommand !== expect.commandId) return unknownOf("forge", "FORGE_COMMAND_ROW_MISMATCH", unlinked);
  // An operation log keyed by another operation and carrying no command id names a different gate than the receipt did.
  if (buildOperationId !== expect.operationId && operationCommand === null) return unknownOf("forge", "FORGE_OBSERVED_OPERATION_MISMATCH", unlinked);
  const linked = (stamp: string | null): boolean => { const gap = Math.abs(Date.parse(closedAt) - Date.parse(stamp ?? "")); return gap <= OPERATION_COMMAND_LINK_MS; };
  const traceId = text(operation["trace_id"]);
  if (row !== null) {
    const commandId = text(row["command_id"]);
    const commit = text(row["gated_commit"]);
    const verdict = text(row["gate_verdict"]);
    if (commandId === null || commit === null || verdict === null) return unknownOf("forge", "FORGE_RECORD_INCOMPLETE", unlinked);
    if (commandId !== expect.commandId) return unknownOf("forge", "FORGE_COMMAND_ROW_MISMATCH", unlinked);
    if (!linked(text(row["timestamp"]))) return unknownOf("forge", "FORGE_OPERATION_COMMAND_UNLINKED", unlinked);
    const value: ForgeGateRecord = {
      operationId: expect.operationId, buildOperationId, commandId, traceId: text(row["trace_id"]) ?? traceId, commit, tree: text(row["gated_tree"]),
      verdict, terminalStatus: text(row["status"]), closedAt,
    };
    return liveOf("forge", value, { system: "forge", ids: { operationId: expect.operationId, buildOperationId, commandId, traceId: value.traceId ?? "", sha: commit, tree: value.tree ?? "" }, raw });
  }
  if (record === null) return unknownOf("forge", "FORGE_RECORD_UNREADABLE", unlinked);
  const recordCommand = text(record["command_id"]);
  if (recordCommand !== expect.commandId) return unknownOf("forge", "FORGE_COMMAND_ROW_MISMATCH", unlinked);
  const terminal = object(record["terminal"]);
  const terminalStatus = text(terminal?.["status"]);
  const terminalAt = text(record["terminal_at"]);
  if (record["state"] !== "TERMINAL" || terminal === null || terminalStatus === null || terminalAt === null) return unknownOf("forge", "FORGE_OPERATION_RECORD_INCOMPLETE", unlinked);
  if (text(record["operation_id"]) !== buildOperationId || !linked(terminalAt) || (traceId !== null && text(record["trace_id"]) !== traceId)) {
    return unknownOf("forge", "FORGE_OPERATION_COMMAND_UNLINKED", unlinked);
  }
  const value: ForgeGateRecord = { operationId: expect.operationId, buildOperationId, commandId: expect.commandId, traceId: traceId ?? text(record["trace_id"]), commit: null, tree: null, verdict: null, terminalStatus, closedAt };
  return liveOf("forge", value, { system: "forge", ids: { operationId: expect.operationId, buildOperationId, commandId: expect.commandId, traceId: value.traceId ?? "" }, raw });
}

export interface BeadsClaimObservation { readonly issueId: string; readonly state: "claimed" | "unclaimed"; readonly status: string; readonly assignee: string | null; readonly dependencies: readonly string[] }

/** Read-only Beads observation from `bd show` alone: a claim is whatever the issue row says, never what a command's success implied. */
export async function observeBeads(directory: string, issueId: string, execute: BdExecutor): Promise<Observation<BeadsClaimObservation>> {
  let answer: { readonly stdout: string; readonly exitCode: number };
  try { answer = await execute(["--readonly", "--directory", directory, "show", issueId, "--json"], directory); } catch { return unknownOf("beads", "BEADS_SHOW_UNAVAILABLE"); }
  if (answer.exitCode !== 0) return unknownOf("beads", "BEADS_SHOW_UNAVAILABLE");
  let parsed: unknown;
  try { parsed = JSON.parse(answer.stdout); } catch { return unknownOf("beads", "BEADS_SHOW_UNREADABLE", { system: "beads", ids: {}, raw: answer.stdout }); }
  const rows = Array.isArray(parsed) ? parsed : [parsed];
  const row = rows.length === 1 ? object(rows[0]) : null;
  const status = text(row?.["status"]);
  if (row === null || status === null) return unknownOf("beads", "BEADS_SHOW_UNREADABLE", { system: "beads", ids: {}, raw: answer.stdout });
  if (row["id"] !== issueId) return unknownOf("beads", "BEADS_SHOW_ISSUE_MISMATCH", { system: "beads", ids: {}, raw: answer.stdout });
  const assignee = text(row["assignee"]);
  const dependencies = (Array.isArray(row["dependencies"]) ? row["dependencies"] : []).flatMap(entry => { const id = text(entry) ?? text(object(entry)?.["id"]); return id === null ? [] : [id]; });
  const value: BeadsClaimObservation = { issueId, state: status === "in_progress" && assignee !== null ? "claimed" : "unclaimed", status, assignee, dependencies };
  return liveOf("beads", value, { system: "beads", ids: { issueId, updatedAt: text(row["updated_at"]) ?? "" }, raw: answer.stdout });
}

export interface FurnaceRunObservation { readonly runId: string; readonly state: string; readonly attempts: number | Unknown }
export type FurnaceReader = () => Promise<unknown>;

/** Read-only Furnace observation: lifecycle stays in Furnace; a record without a run id or a state is incomplete and stays unknown. */
export async function observeFurnace(read: FurnaceReader): Promise<Observation<FurnaceRunObservation>> {
  let raw: unknown;
  try { raw = await read(); } catch { return unknownOf("furnace", "FURNACE_READ_FAILED"); }
  const top = object(raw);
  const row = object(top?.["data"]) ?? top;
  const runId = text(row?.["run_id"]);
  const state = text(row?.["state"]) ?? text(row?.["status"]);
  if (row === null || runId === null || state === null) return unknownOf("furnace", "FURNACE_EVIDENCE_INCOMPLETE", { system: "furnace", ids: {}, raw });
  const attempts = Array.isArray(row["attempts"]) ? row["attempts"].length : UNKNOWN;
  return liveOf("furnace", { runId, state, attempts }, { system: "furnace", ids: { runId }, raw });
}

export interface HxScopeObservation { readonly files: readonly string[] }

/** Read-only HyperUnix observation through the existing task-scope adapter: only complete coverage with a query digest is observed. */
export async function observeHx(request: DevelopmentRequest, execute: HxExecute): Promise<Observation<HxScopeObservation>> {
  const scope = await discoverTaskScope(request, execute);
  const queryDigest = scope.coverage === "complete" ? text(scope.evidence?.id) : null;
  if (scope.coverage !== "complete" || queryDigest === null) return unknownOf("hx", scope.coverage === "partial" ? "HX_COVERAGE_PARTIAL" : "HX_COVERAGE_UNKNOWN");
  return liveOf("hx", { files: scope.files }, { system: "hx", ids: { queryDigest }, raw: { files: scope.files, evidence: scope.evidence } });
}

/** An Episode event for a live observation; refused for anything that is not live with a retained native id. */
export interface LiveEpisodeEvent extends EpisodeEvent { readonly mode: "live"; readonly receiptDigest: string }
export function liveEvent<T>(step: number, observation: Observation<T>): LiveEpisodeEvent {
  const receipt = observation.receipt;
  if (observation.mode !== "live" || observation.outcome !== "observed" || !hasNativeId(receipt)) {
    throw new Error(`LIVE_LABEL_WITHOUT_NATIVE_ID: only a live observation with a native receipt becomes a live episode event`);
  }
  const subject = receipt.ids["operationId"] ?? receipt.ids["runId"] ?? receipt.ids["issueId"] ?? receipt.ids["queryDigest"] ?? Object.values(receipt.ids)[0] ?? UNKNOWN;
  return { step, kind: `${observation.system}.observed`, subject, detail: "outcome=observed", mode: "live", receiptDigest: receipt.rawDigest };
}

export interface GateFlowInput {
  readonly intent: Intent;
  readonly basis: Basis;
  readonly budget: Budget;
  readonly protectedScopes: readonly string[];
  readonly root: string;
  /** The existing Forge verification (live-gate verifyExistingCandidate); the only effect this flow performs. */
  readonly verify: (root: string) => Promise<GateObservation>;
  /** The independent read of the outcome (observeForgeGate), keyed by the operation and command ids the command receipt named. */
  readonly observe: (root: string, expect: ForgeExpectation) => Promise<Observation<ForgeGateRecord>>;
}
export interface GateObserved { readonly kind: GateObservation["kind"]; readonly operationId: string; readonly buildOperationId: string; readonly commit: string; readonly verdict: string | null }
export interface GateFlowResult {
  readonly effect: "none" | "executed";
  /** The resolver's rejection code, or a flow refusal code; null when the intent ran. */
  readonly code: string | null;
  readonly command: NativeReceipt | null;
  readonly observation: Observation<GateObserved>;
  readonly events: readonly LiveEpisodeEvent[];
}

const refused = (code: string): GateFlowResult => ({ effect: "none", code, command: null, observation: unknownOf("forge", code), events: [] });

/**
 * The single authorized flow. A gate-run Intent is admitted by `reconcile` against the pinned basis, protected scopes and
 * budget before any effect; the admitted intent runs through the existing Forge client; the result keeps the command
 * receipt and the independently observed outcome, and is live only when both name the same native operation and commit.
 */
export async function runAuthorizedGateFlow(input: GateFlowInput): Promise<GateFlowResult> {
  const resolution = reconcile({ basis: input.basis, budget: input.budget, protectedScopes: input.protectedScopes, proposals: [{ intents: [input.intent], memory: null, trace: [] }] });
  const rejection = resolution.rejected.find(entry => entry.intent.intentId === input.intent.intentId);
  if (rejection !== undefined) return refused(rejection.code);
  if (input.intent.effect !== "gate.run") return refused("GATE_FLOW_EFFECT_UNSUPPORTED");
  const gate = await input.verify(input.root);
  const operationId = text(gate.operationId);
  if (operationId === null) return { ...refused("FORGE_COMMAND_RECEIPT_ABSENT"), effect: "executed" };
  const commandId = text(object(object(gate.native)?.["ids"])?.["command_id"]);
  const command = makeReceipt({ system: "forge", ids: { operationId, commandId: commandId ?? "", sha: gate.basis.commit }, raw: gate.native });
  const fail = (reason: string): GateFlowResult => ({ effect: "executed", code: null, command, observation: unknownOf("forge", reason, { system: "forge", ids: {}, raw: gate.native }), events: [] });
  if (commandId === null) return fail("FORGE_COMMAND_ID_ABSENT");
  const seen = await input.observe(input.root, { operationId, commandId });
  if (seen.outcome === "unknown") return fail(seen.reason);
  const record = seen.value;
  if (record.operationId !== operationId) return fail("FORGE_OBSERVED_OPERATION_MISMATCH");
  if (record.commit !== null && record.commit !== gate.basis.commit) return fail("FORGE_OBSERVED_COMMIT_MISMATCH");
  if (record.tree !== null && record.tree !== gate.basis.tree) return fail("FORGE_OBSERVED_TREE_MISMATCH");
  // A served gate writes no on-disk verdict; only a recorded verdict can contradict the receipt.
  if (record.verdict !== null && ((gate.kind === "passed" && record.verdict !== "PASS") || (gate.kind === "failed" && record.verdict === "PASS"))) return fail("FORGE_OBSERVED_OUTCOME_CONTRADICTED");
  const observation = liveOf<GateObserved>("forge", { kind: gate.kind, operationId, buildOperationId: record.buildOperationId, commit: record.commit ?? gate.basis.commit, verdict: record.verdict }, {
    system: "forge", ids: { operationId, buildOperationId: record.buildOperationId, commandId: record.commandId, traceId: record.traceId ?? "", sha: record.commit ?? gate.basis.commit },
    raw: { command: gate.native, observed: seen.receipt?.raw ?? null },
  });
  return { effect: "executed", code: null, command, observation, events: [liveEvent(1, observation)] };
}

export interface LiveFlowUnknownRecord { readonly status: "UNKNOWN"; readonly pass: false; readonly reason: string }
export function liveFlowUnknownRecord(reason: string): LiveFlowUnknownRecord { return { status: "UNKNOWN", pass: false, reason }; }

/** The opt-in gate for the one live test: an explicit flag, an explicit scratch root, and a present forge; otherwise an UNKNOWN record. */
export function liveFlowPreconditions(env: Readonly<Record<string, string | undefined>>, forgeFound: boolean):
  { readonly run: true; readonly root: string } | { readonly run: false; readonly record: LiveFlowUnknownRecord } {
  if (env["MW_LIVE_FORGE_FLOW"] !== "1") return { run: false, record: liveFlowUnknownRecord("LIVE_FLOW_NOT_ENABLED") };
  const root = text(env["MW_LIVE_FORGE_ROOT"]);
  if (root === null) return { run: false, record: liveFlowUnknownRecord("LIVE_FLOW_ROOT_UNSET") };
  if (!forgeFound) return { run: false, record: liveFlowUnknownRecord("LIVE_FLOW_FORGE_ABSENT") };
  return { run: true, root };
}
