/**
 * The GraphPolicyCLI process seam. gp is reached only through its real one-shot CLI (`node
 * <GraphPolicyCLI>/ts/dist/main.js <verb> ... --json`), the integration the GraphPolicy program
 * supports; no GraphPolicy numerics live here. Every call is bounded by a timeout and classified
 * into a closed outcome: ok with the parsed envelope result, or a named failure the caller falls
 * back on (GP_ABSENT: the entry cannot be spawned; GP_TIMEOUT; GP_REFUSED: gp exited nonzero with
 * its own typed error code carried verbatim; GP_RESPONSE_MALFORMED: not a graphpolicy.cli.v1
 * envelope; GP_UNSUPPORTED: the verb is absent from the capabilities.commands gp declared, so nothing was spawned). Scores, probabilities and log probabilities arrive as binary32 words (8 hex digits);
 * `word32` decodes them for reporting only — the recorded words stay authoritative.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
export interface GpExecResult { readonly stdout: string; readonly stderr: string; readonly exitCode: number; readonly timedOut?: boolean; readonly spawnError?: string }
export type GpExecutor = (argv: readonly string[]) => Promise<GpExecResult> | GpExecResult;
export type GpFailureCode = "GP_ABSENT" | "GP_TIMEOUT" | "GP_REFUSED" | "GP_RESPONSE_MALFORMED" | "GP_UNSUPPORTED";
export type GpOutcome<T> =
  | { readonly ok: true; readonly result: T; readonly identities: Readonly<Record<string, string>>; readonly elapsedMs: number; /** The envelope's capabilities.commands when gp declared that list; absent otherwise. */ readonly commands?: readonly string[] }
  | { readonly ok: false; readonly code: GpFailureCode; readonly detail: string; readonly gpCode?: string; readonly exitCode?: number; readonly elapsedMs: number };

/** Spawn the built gp entry (a .js file run by this Node, or an executable) with a wall-clock bound. */
export function gpEntryExecutor(entry: string, timeoutMs: number): GpExecutor {
  const viaNode = entry.endsWith(".js") || entry.endsWith(".mjs");
  return async argv => {
    try {
      const { stdout, stderr } = await execFileAsync(viaNode ? process.execPath : entry, viaNode ? [entry, ...argv] : [...argv],
        { encoding: "utf8", timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 });
      return { stdout, stderr, exitCode: 0 };
    } catch (error) {
      const failure = error as NodeJS.ErrnoException & { stdout?: string; stderr?: string; code?: string | number; killed?: boolean; signal?: string };
      if (failure.code === "ENOENT") return { stdout: "", stderr: failure.message, exitCode: -1, spawnError: "ENOENT" };
      if (failure.killed === true || failure.signal === "SIGTERM") return { stdout: failure.stdout ?? "", stderr: failure.stderr ?? "", exitCode: -1, timedOut: true };
      return { stdout: failure.stdout ?? "", stderr: failure.stderr ?? failure.message, exitCode: typeof failure.code === "number" ? failure.code : 1 };
    }
  };
}
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
function identitiesOf(envelope: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  const identities = envelope["identities"];
  if (isRecord(identities)) for (const [key, value] of Object.entries(identities)) if (typeof value === "string") out[key] = value;
  return out;
}
/** One gp call with --json: the envelope's result on ok, else a classified failure. */
export async function gpCall(execute: GpExecutor, argv: readonly string[], now: () => number = () => performance.now()): Promise<GpOutcome<Record<string, unknown>>> {
  const start = now();
  const run = await execute([...argv, "--json"]);
  const elapsedMs = Math.max(0, Math.round(now() - start));
  if (run.spawnError !== undefined) return { ok: false, code: "GP_ABSENT", detail: "gp entry could not be spawned: " + run.spawnError, elapsedMs };
  if (run.timedOut === true) return { ok: false, code: "GP_TIMEOUT", detail: "gp exceeded the wall-clock bound", elapsedMs };
  let parsed: unknown = null;
  try { parsed = run.stdout.trim() ? JSON.parse(run.stdout) : null; } catch { parsed = null; }
  if (!isRecord(parsed) || parsed["schema"] !== "graphpolicy.cli.v1") {
    return { ok: false, code: run.exitCode === 0 ? "GP_RESPONSE_MALFORMED" : "GP_REFUSED", detail: run.exitCode === 0 ? "stdout is not a graphpolicy.cli.v1 envelope" : "gp exited " + run.exitCode + " without an envelope: " + run.stderr.trim().slice(0, 400), exitCode: run.exitCode, elapsedMs };
  }
  if (parsed["ok"] !== true || !isRecord(parsed["result"])) {
    const error = isRecord(parsed["error"]) ? parsed["error"] : {};
    const gpCode = typeof error["code"] === "string" ? error["code"] : "unknown";
    const details = isRecord(error["details"]) ? error["details"] : {};
    const message = typeof details["message"] === "string" ? details["message"] : JSON.stringify(details).slice(0, 300);
    const stderr = run.stderr.trim().slice(0, 300);
    return { ok: false, code: "GP_REFUSED", detail: gpCode + (message ? ": " + message : "") + (stderr ? " | stderr: " + stderr : ""), gpCode, exitCode: run.exitCode, elapsedMs };
  }
  const capabilities = isRecord(parsed["capabilities"]) ? parsed["capabilities"] : {};
  const declared = capabilities["commands"];
  const commands = Array.isArray(declared) && declared.every(entry => typeof entry === "string") ? (declared as string[]) : null;
  return { ok: true, result: parsed["result"], identities: identitiesOf(parsed), elapsedMs, ...(commands === null ? {} : { commands }) };
}
/** Decode a binary32 word (8 hex digits, big-endian IEEE-754) to a number; NaN for a malformed word. */
export function word32(word: unknown): number {
  if (typeof word !== "string" || !/^[0-9a-f]{8}$/i.test(word)) return Number.NaN;
  const view = new DataView(new ArrayBuffer(4));
  view.setUint32(0, Number.parseInt(word, 16), false);
  return view.getFloat32(0, false);
}
export interface GpModelFiles { readonly program: string; readonly theta: string; readonly checkpoint: string }
export interface GpSampleRequest extends GpModelFiles {
  readonly graph: string; readonly candidates: string; readonly seed: string; readonly port: string; readonly temperature: number; readonly journal?: string | undefined;
  /** When set, the draw runs with `--store DIR --store-receipt` so gp writes the decision receipt once, write-once, into DIR (gp train reads it from there). */
  readonly store?: string | undefined;
}
export interface GpSampleResult {
  readonly chosen: string;
  readonly logProbability: number;
  readonly logProbabilityWord: string;
  /** gp's candidate list in its recorded support order, with scores and probabilities decoded from the recorded words. */
  readonly candidates: readonly { readonly id: string; readonly score: number; readonly probability: number; readonly logProbability: number }[];
  readonly decisionDigest: string;
  readonly journalEntry: string | null;
  /** The blob digest gp's `result.receipt_store` named when the draw ran with `--store-receipt`; null otherwise. */
  readonly receiptBlob: string | null;
  readonly programDigest: string;
  readonly checkpointDigest: string;
  readonly graphDigest: string;
  readonly backend: string;
  readonly temperature: number;
  readonly seed: string;
  /** The capabilities.commands of the gp envelope that carried this draw; null when gp declared none (an older gp). */
  readonly capabilityCommands: readonly string[] | null;
}
const text = (value: unknown): string => (typeof value === "string" ? value : "");
export async function gpSample(execute: GpExecutor, request: GpSampleRequest): Promise<GpOutcome<GpSampleResult>> {
  const argv = ["sample", "--program", request.program, "--theta", request.theta, "--checkpoint", request.checkpoint, "--graph", request.graph,
    "--candidates", request.candidates, "--seed", request.seed, "--port", request.port, "--temperature", String(request.temperature),
    ...(request.journal ? ["--journal", request.journal] : []), ...(request.store ? ["--store", request.store, "--store-receipt"] : [])];
  const outcome = await gpCall(execute, argv);
  if (!outcome.ok) return outcome;
  const result = outcome.result;
  const decision = isRecord(result["decision"]) ? result["decision"] : null;
  const ids = decision && Array.isArray(decision["candidates"]) ? decision["candidates"] : null;
  const scores = decision && Array.isArray(decision["scores"]) ? decision["scores"] : null;
  const probabilities = decision && Array.isArray(decision["probabilities"]) ? decision["probabilities"] : null;
  const logs = decision && Array.isArray(decision["log_probabilities"]) ? decision["log_probabilities"] : null;
  if (!decision || !ids || !scores || !probabilities || !logs || typeof result["chosen"] !== "string" || typeof result["log_probability"] !== "string" || !ids.every(id => typeof id === "string")) {
    return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "sample result lacks chosen/log_probability/decision rows", elapsedMs: outcome.elapsedMs };
  }
  const stored = isRecord(result["receipt_store"]) ? result["receipt_store"] : null;
  const receiptBlob = stored !== null && typeof stored["blob"] === "string" && stored["blob"] !== "" ? stored["blob"] : null;
  if (request.store && receiptBlob === null) return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "sample result lacks receipt_store.blob although --store-receipt was requested", elapsedMs: outcome.elapsedMs };
  const logProbability = word32(result["log_probability"]);
  if (!Number.isFinite(logProbability)) return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "log_probability is not a finite binary32 word", elapsedMs: outcome.elapsedMs };
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: {
    chosen: result["chosen"], logProbability, logProbabilityWord: result["log_probability"],
    candidates: (ids as string[]).map((id, index) => ({ id, score: word32(scores[index]), probability: word32(probabilities[index]), logProbability: word32(logs[index]) })),
    decisionDigest: text(result["decision_digest"]), journalEntry: typeof result["journal_entry"] === "string" ? result["journal_entry"] : null, receiptBlob,
    programDigest: text(decision["program_digest"]), checkpointDigest: text(decision["checkpoint_digest"]), graphDigest: text(decision["graph_digest"]),
    backend: text(decision["backend_id"]), temperature: word32(decision["temperature"]), seed: text(result["seed"]),
    capabilityCommands: outcome.commands ?? null,
  } };
}
export interface GpEvalRequest extends GpModelFiles { readonly graph: string; readonly candidates: string; readonly port: string }
export interface GpEvalResult { readonly rows: readonly { readonly id: string; readonly score: number }[]; readonly programDigest: string; readonly checkpointDigest: string; readonly inputSnapshot: string; readonly gpDurationMs: number; readonly completeness: string }
export async function gpEval(execute: GpExecutor, request: GpEvalRequest): Promise<GpOutcome<GpEvalResult>> {
  const outcome = await gpCall(execute, ["eval", "--program", request.program, "--theta", request.theta, "--checkpoint", request.checkpoint, "--graph", request.graph, "--candidates", request.candidates, "--outputs", request.port]);
  if (!outcome.ok) return outcome;
  const y = isRecord(outcome.result["Y"]) ? outcome.result["Y"][request.port] : null;
  const rows = isRecord(y) && Array.isArray(y["rows"]) ? y["rows"] : null;
  const receipt = isRecord(outcome.result["receipt"]) ? outcome.result["receipt"] : {};
  if (!rows || !rows.every(row => Array.isArray(row) && typeof row[0] === "string" && Array.isArray(row[1]) && typeof row[1][0] === "number")) {
    return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "eval result lacks " + request.port + " rows of [id,[score]]", elapsedMs: outcome.elapsedMs };
  }
  const basis = isRecord(receipt["basis"]) ? receipt["basis"] : {};
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: {
    rows: (rows as [string, [number]][]).map(([id, [score]]) => ({ id, score })),
    programDigest: text(receipt["program_digest"]), checkpointDigest: text(receipt["checkpoint_digest"]), inputSnapshot: text(receipt["input_snapshot"]),
    gpDurationMs: typeof receipt["duration_ms"] === "number" ? receipt["duration_ms"] : -1, completeness: text(basis["completeness"]),
  } };
}
/** Doc-09 feedback: label class and evidence link are closed/opaque; a scalar exists only on a resolved value. */
export type GpFeedbackValue = { readonly status: "resolved"; readonly scalar: number } | { readonly status: "pending" | "unknown" | "unavailable" } | { readonly status: "error"; readonly code: string };
export interface GpFeedbackRequest {
  readonly journal: string;
  /** The sampled-decision JOURNAL ENTRY digest (the sample result's journal_entry), not the receipt digest. */
  readonly entry: string;
  /**
   * When set, the value is a CORRECTION of this earlier feedback entry (the pending root): `gp feedback add --supersedes DIGEST`
   * replaces `--decision` and the evidence document carries `reason: "evidence-revised"`, so the journal holds one root
   * whose latest link is the resolved value instead of a second independent root (GPR-1189).
   */
  readonly supersedes?: string | undefined;
  readonly labelClass: "source-verified" | "synthetic" | "model-generated" | "inferred-counterfactual";
  readonly evidence: { readonly adapter: string; readonly revision: string; readonly scope: string; readonly ref: string };
  readonly value: GpFeedbackValue;
  /** Writes the evidence document and returns its path (gp reads it as @FILE). */
  readonly writeEvidence: (document: string) => Promise<string> | string;
}
/** A finite number as the big-endian binary32 word gp's feedback value carries. */
export function toWord32(value: number): string {
  const view = new DataView(new ArrayBuffer(4));
  view.setFloat32(0, value, false);
  return view.getUint32(0, false).toString(16).padStart(8, "0");
}
export async function gpFeedbackAdd(execute: GpExecutor, request: GpFeedbackRequest): Promise<GpOutcome<{ readonly entry: string }>> {
  const value = request.value.status === "resolved" ? { status: "resolved", scalar: toWord32(request.value.scalar) } : request.value;
  const document = { ...(request.supersedes === undefined ? {} : { reason: "evidence-revised" }), labelClass: request.labelClass, evidence: request.evidence, value };
  const path = await request.writeEvidence(JSON.stringify(document));
  const target = request.supersedes === undefined ? ["--decision", request.entry] : ["--supersedes", request.supersedes];
  const outcome = await gpCall(execute, ["feedback", "add", ...target, "--evidence", "@" + path, "--journal", request.journal]);
  if (!outcome.ok) return outcome;
  // gp answers {decision, feedback_digest, seq} for a root and {supersedes, correction_digest, seq} for a correction: the appended entry's digest.
  const digestKey = request.supersedes === undefined ? "feedback_digest" : "correction_digest";
  const entry = outcome.result[digestKey];
  if (typeof entry !== "string" || !/^[0-9a-f]{64}$/.test(entry)) return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "feedback add result lacks " + digestKey, elapsedMs: outcome.elapsedMs };
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: { entry } };
}
/** Doc-09 host-admission statuses gp's journal accepts (ADMISSION_STATUSES). */
export type GpAdmissionStatus = "admitted" | "denied" | "modified" | "pending" | "unknown" | "error" | "unavailable";
export interface GpAdmissionRequest {
  readonly journal: string;
  /** The sampled-decision JOURNAL ENTRY digest the admission names. */
  readonly entry: string;
  readonly status: GpAdmissionStatus;
  /** capabilities.commands of the gp envelope that carried the draw (GpSampleResult.capabilityCommands); null when gp declared none. */
  readonly commands: readonly string[] | null;
  readonly host: { readonly adapter: string; readonly revision: string; readonly scope: string; readonly ref: string };
  readonly writeHost: (document: string) => Promise<string> | string;
}
/** The one verb the host writes its admission through: `gp journal append` on GraphPolicyCLI main (GPR-1173, pending triage ratification). */
export const GP_JOURNAL_APPEND = "journal append";
/**
 * `gp journal append --kind host-admission --record @FILE --journal FILE` (GraphPolicyCLI main a173f611, IMPL-10211,
 * GPR-1173, status pending triage ratification): the host's admission of a draw, beside the decision in gp's own
 * journal. The route is capability-gated: `commands` is the capabilities.commands of the gp envelope that carried the
 * draw, and when it does not list `journal append` the host spawns nothing and returns GP_UNSUPPORTED (GP_REFUSED
 * keeps its meaning of a spawned gp exiting nonzero). The record body is the doc-09 host-admission record
 * (`decisionDigest`, `status`, `host`); gp admits it through admitDecision and answers {kind, decision, digest, seq, prev}.
 * Recorded by the caller, never retried, never faked.
 */
export async function gpAdmissionAppend(execute: GpExecutor, request: GpAdmissionRequest): Promise<GpOutcome<{ readonly digest: string; readonly seq: number }>> {
  if (request.commands === null || !request.commands.includes(GP_JOURNAL_APPEND)) {
    return { ok: false, code: "GP_UNSUPPORTED", detail: "verb absent from capabilities.commands: " + GP_JOURNAL_APPEND, elapsedMs: 0 };
  }
  const path = await request.writeHost(JSON.stringify({ kind: "host-admission", decisionDigest: request.entry, status: request.status, host: request.host }));
  const outcome = await gpCall(execute, ["journal", "append", "--kind", "host-admission", "--record", "@" + path, "--journal", request.journal]);
  if (!outcome.ok) return outcome;
  const digest = outcome.result["digest"]; const seq = outcome.result["seq"];
  if (typeof digest !== "string" || !/^[0-9a-f]{64}$/.test(digest) || typeof seq !== "number") return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "journal append result lacks digest/seq", elapsedMs: outcome.elapsedMs };
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: { digest, seq } };
}

export interface GpObservationRequest {
  readonly journal: string;
  /** The graph schema digest as 64 hex digits (no `sha256:` prefix). */
  readonly schemaDigest: string;
  /** The digest over the exact snapshot bytes gp samples over, as 64 hex digits (no `sha256:` prefix). */
  readonly snapshotDigest: string;
  readonly provenance: { readonly adapter: string; readonly revision: string; readonly scope: string; readonly ref: string };
  readonly writeRecord: (document: string) => Promise<string> | string;
}
/**
 * `gp journal append --kind observation --record @FILE --journal FILE`: the host's record of the observation it is about to
 * have gp sample over (doc-09 `observation`: schemaDigest, snapshotDigest, provenance link), written to gp's own journal so
 * `gp experience materialize` can join each sampled decision to its source. Recorded by the caller, never retried, never faked.
 */
export async function gpObservationAppend(execute: GpExecutor, request: GpObservationRequest): Promise<GpOutcome<{ readonly digest: string; readonly seq: number }>> {
  const path = await request.writeRecord(JSON.stringify({ kind: "observation", schemaDigest: request.schemaDigest, snapshotDigest: request.snapshotDigest, provenance: request.provenance }));
  const outcome = await gpCall(execute, ["journal", "append", "--kind", "observation", "--record", "@" + path, "--journal", request.journal]);
  if (!outcome.ok) return outcome;
  const digest = outcome.result["digest"]; const seq = outcome.result["seq"];
  if (typeof digest !== "string" || !/^[0-9a-f]{64}$/.test(digest) || typeof seq !== "number") return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "journal append result lacks digest/seq", elapsedMs: outcome.elapsedMs };
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: { digest, seq } };
}

export interface GpEffectOutcomeRequest {
  readonly journal: string;
  /** The digest of the host-admission journal entry this outcome joins (the `gp journal append --kind host-admission` answer's digest). */
  readonly admissionDigest: string;
  readonly outcome: "succeeded" | "failed";
  readonly effect: { readonly adapter: string; readonly revision: string; readonly scope: string; readonly ref: string };
  readonly writeRecord: (document: string) => Promise<string> | string;
}
/**
 * `gp journal append --kind effect-outcome-reference --record @FILE --journal FILE`: the host's record of what became of an
 * admitted draw (doc-09 `effect-outcome-reference`: `admissionDigest`, `outcome` succeeded|failed, `effect` link), written to
 * gp's own journal so the census fold joins the effect to the admission instead of reporting outcome-unlinked. gp checks that
 * `admissionDigest` names a host-admission entry of the same journal. Recorded by the caller, never retried, never faked.
 */
export async function gpEffectOutcomeAppend(execute: GpExecutor, request: GpEffectOutcomeRequest): Promise<GpOutcome<{ readonly digest: string; readonly seq: number }>> {
  const path = await request.writeRecord(JSON.stringify({ kind: "effect-outcome-reference", admissionDigest: request.admissionDigest, outcome: request.outcome, effect: request.effect }));
  const outcome = await gpCall(execute, ["journal", "append", "--kind", "effect-outcome-reference", "--record", "@" + path, "--journal", request.journal]);
  if (!outcome.ok) return outcome;
  const digest = outcome.result["digest"]; const seq = outcome.result["seq"];
  if (typeof digest !== "string" || !/^[0-9a-f]{64}$/.test(digest) || typeof seq !== "number") return { ok: false, code: "GP_RESPONSE_MALFORMED", detail: "journal append result lacks digest/seq", elapsedMs: outcome.elapsedMs };
  return { ok: true, identities: outcome.identities, elapsedMs: outcome.elapsedMs, result: { digest, seq } };
}
