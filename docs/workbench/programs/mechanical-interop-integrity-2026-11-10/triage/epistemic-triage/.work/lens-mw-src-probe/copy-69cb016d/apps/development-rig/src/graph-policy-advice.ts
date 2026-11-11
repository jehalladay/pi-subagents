/**
 * GraphPolicy advice for the host's bead choice, kept outside every pure `Policy.propose` and
 * outside every authority: Beads owns readiness and claims, the host owns the pre-sampling legal
 * support and the resolution rule, gp only scores and draws. Two stages: (1) `gp sample` over the
 * host's support returns a chosen candidate with its exact behavior log probability and a decision
 * receipt; (2) `resolveSelection` applies the mode — off/shadow keep the deterministic host
 * baseline (advice is recorded, never acted on), canary takes gp's choice when it lies inside the
 * support and falls back to the baseline, naming the reason, whenever gp is absent, times out,
 * refuses, answers malformed or names a bead outside the support. The per-decision record
 * (mw.bead-selection.v1) embeds an mw.decision-receipt.v1 sidecar; every value no source reported
 * stays the literal "unknown".
 */
import { dirname, isAbsolute, resolve } from "node:path";
import { validateDecisionReceipt, type DecisionReceipt } from "@mechanical/workflows-coordination";
import { beadSchemaDigest, buildBeadSnapshot, sha256Bytes, sha256Canonical, type ReadyBead, type SnapshotStats } from "./graph-policy-snapshot.js";
import { gpObservationAppend, gpSample, type GpExecutor, type GpFailureCode, type GpSampleResult } from "./graph-policy-cli.js";

export type GpMode = "off" | "shadow" | "canary";
export const GP_MODES: readonly GpMode[] = ["off", "shadow", "canary"];
export interface GpConfig {
  readonly id: string;
  readonly program: string;
  readonly theta: string;
  readonly checkpoint: string;
  readonly graphSchema: string;
  readonly port: string;
  readonly candidateType: string;
  readonly temperature: number;
  readonly timeoutMs: number;
  /** sha256 of the exact program/theta bytes the host hands gp (the receipt's verifiable hashes). */
  readonly programBytesDigest: string;
  readonly thetaBytesDigest: string;
}
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const CHECKPOINT = /^graphpolicy\.checkpoint\.c1:[0-9a-f]{64}$/;
/** Load and validate an mw.graph-policy-config.v1 document; relative artifact paths resolve against the config's directory. */
export function loadGpConfig(path: string, read: (file: string) => string): GpConfig {
  let document: unknown;
  try { document = JSON.parse(read(path)); } catch (error) { throw new Error("GP_CONFIG_INVALID: " + path + " is not JSON (" + (error instanceof Error ? error.message : String(error)) + ")"); }
  if (!isRecord(document) || document["schema"] !== "mw.graph-policy-config.v1") throw new Error("GP_CONFIG_INVALID: schema must be mw.graph-policy-config.v1");
  const base = dirname(path);
  const file = (key: string): string => {
    const value = document[key];
    if (typeof value !== "string" || !value.trim()) throw new Error("GP_CONFIG_INVALID: " + key + " must name a file");
    return isAbsolute(value) ? value : resolve(base, value);
  };
  const str = (key: string): string => { const value = document[key]; if (typeof value !== "string" || !value.trim()) throw new Error("GP_CONFIG_INVALID: " + key + " must be a non-empty string"); return value; };
  const checkpoint = str("checkpoint");
  if (!CHECKPOINT.test(checkpoint)) throw new Error("GP_CONFIG_INVALID: checkpoint must be a graphpolicy.checkpoint.c1 digest");
  const temperature = document["temperature"] ?? 1;
  if (typeof temperature !== "number" || !(temperature > 0) || !Number.isFinite(temperature)) throw new Error("GP_CONFIG_INVALID: temperature must be a positive finite number");
  const timeoutMs = document["timeoutMs"] ?? 20_000;
  if (!Number.isInteger(timeoutMs) || (timeoutMs as number) < 1000) throw new Error("GP_CONFIG_INVALID: timeoutMs must be an integer >= 1000");
  const program = file("program"); const theta = file("theta");
  return { id: str("id"), program, theta, checkpoint, graphSchema: file("graphSchema"), port: str("port"), candidateType: str("candidateType"), temperature, timeoutMs: timeoutMs as number,
    programBytesDigest: sha256Bytes(read(program)), thetaBytesDigest: sha256Bytes(read(theta)) };
}
export interface Baseline { readonly beadId: string; readonly rule: "priority-then-oldest-then-id" }
/** The deterministic host heuristic: lowest priority number, then earliest created_at, then id. Null without support. */
export function hostBaseline(ready: readonly ReadyBead[], support: readonly string[]): Baseline | null {
  const byId = new Map(ready.map(bead => [bead.id, bead] as const));
  const members = support.map(id => byId.get(id)).filter((bead): bead is ReadyBead => bead !== undefined);
  if (members.length === 0) return null;
  const sorted = [...members].sort((a, b) => {
    const pa = a.priority ?? Number.POSITIVE_INFINITY; const pb = b.priority ?? Number.POSITIVE_INFINITY;
    if (pa !== pb) return pa - pb;
    const ca = a.created_at ?? "￿"; const cb = b.created_at ?? "￿";
    if (ca !== cb) return ca < cb ? -1 : 1;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return { beadId: sorted[0]!.id, rule: "priority-then-oldest-then-id" };
}
/** GP_OBSERVATION_MISSING: the observation entry could not be journaled, so no draw was taken; GP_STORE_REQUIRED: a journaled draw needs the receipt store directory and none was named. */
export type AdviceReason = GpFailureCode | "GP_SUPPORT_EMPTY" | "GP_CHOICE_OUTSIDE_SUPPORT" | "GP_OBSERVATION_MISSING" | "GP_STORE_REQUIRED";
export type BeadAdvice =
  | { readonly kind: "advice"; readonly chosen: string; readonly logProb: number; readonly ranking: readonly { readonly id: string; readonly score: number; readonly probability: number }[]; readonly gp: GpSampleResult; readonly identities: Readonly<Record<string, string>>; readonly elapsedMs: number; readonly snapshotDigest: string; readonly stats: SnapshotStats; /** The observation entry journaled before the draw; absent when the draw ran without a journal. */ readonly observation?: { readonly digest: string; readonly seq: number } | undefined }
  | { readonly kind: "abstain"; readonly reason: AdviceReason; readonly detail: string; readonly elapsedMs: number; readonly snapshotDigest: string | null; readonly stats: SnapshotStats | null; /** Present when gp did draw (and journal it) but the host refused the draw: the host still owes gp's journal a denial. */ readonly gp?: GpSampleResult | undefined };
export interface Workdir { readonly write: (name: string, content: string) => Promise<string> | string }
export interface AdviceInput {
  readonly ready: readonly ReadyBead[];
  readonly support: readonly string[];
  readonly config: GpConfig;
  readonly seed: string;
  readonly now: string;
  readonly store: string;
  readonly readyDigest: string;
  readonly extraRevisions?: readonly string[] | undefined;
  readonly execute: GpExecutor;
  readonly workdir: Workdir;
  readonly journal?: string | undefined;
  /** The gp store directory the decision receipt is written into (`--store DIR --store-receipt`); required whenever `journal` is set. */
  readonly receiptStore?: string | undefined;
  /** The host's attested position of this observation; recorded on the snapshot's observation.revision_order. */
  readonly revisionOrder?: { readonly attestedBy: string; readonly ordinal: number } | undefined;
}
/** Observe → gp sample → verify the choice lies in the host support. Never claims, never writes Beads. */
export async function adviseBead(input: AdviceInput): Promise<BeadAdvice> {
  if (input.support.length === 0) return { kind: "abstain", reason: "GP_SUPPORT_EMPTY", detail: "no legal candidate; gp is not consulted", elapsedMs: 0, snapshotDigest: null, stats: null };
  const { snapshot, stats } = buildBeadSnapshot({ ready: input.ready, support: input.support, now: input.now, store: input.store, readyDigest: input.readyDigest, extraRevisions: input.extraRevisions, revisionOrder: input.revisionOrder });
  const snapshotBytes = JSON.stringify(snapshot);
  const snapshotDigest = sha256Bytes(snapshotBytes);
  const graph = await input.workdir.write("snapshot.json", snapshotBytes);
  const candidates = await input.workdir.write("candidates.json", JSON.stringify({ [input.config.candidateType]: input.support }));
  // A journaled draw is only useful to gp train if its observation and receipt exist: the host refuses the draw, spawning no sample, when either is absent.
  let observation: { digest: string; seq: number } | undefined;
  if (input.journal !== undefined) {
    if (!input.receiptStore) return { kind: "abstain", reason: "GP_STORE_REQUIRED", detail: "a journaled draw must run with --store DIR --store-receipt; no store directory was named, so gp was not asked to sample", elapsedMs: 0, snapshotDigest, stats };
    const appended = await gpObservationAppend(input.execute, { journal: input.journal, schemaDigest: beadSchemaDigest().replace(/^sha256:/, ""), snapshotDigest: snapshotDigest.replace(/^sha256:/, ""),
      provenance: { adapter: snapshot.observation.adapter, revision: snapshot.observation.revisions[0] as string, scope: snapshot.observation.scope, ref: "mw:bead-snapshot/" + snapshotDigest.replace(/^sha256:/, "") },
      writeRecord: document => input.workdir.write("observation.json", document) });
    if (!appended.ok) return { kind: "abstain", reason: "GP_OBSERVATION_MISSING", detail: appended.code + ": " + appended.detail, elapsedMs: appended.elapsedMs, snapshotDigest, stats };
    observation = appended.result;
  }
  const outcome = await gpSample(input.execute, { program: input.config.program, theta: input.config.theta, checkpoint: input.config.checkpoint, graph, candidates, seed: input.seed, port: input.config.port, temperature: input.config.temperature, journal: input.journal, store: input.receiptStore });
  if (!outcome.ok) return { kind: "abstain", reason: outcome.code, detail: outcome.detail, elapsedMs: outcome.elapsedMs, snapshotDigest, stats };
  const result = outcome.result;
  const supportSet = new Set(input.support);
  if (!supportSet.has(result.chosen) || result.candidates.length !== input.support.length || !result.candidates.every(candidate => supportSet.has(candidate.id))) {
    return { kind: "abstain", reason: "GP_CHOICE_OUTSIDE_SUPPORT", detail: "gp named " + result.chosen + " or a candidate list outside the host support", elapsedMs: outcome.elapsedMs, snapshotDigest, stats, gp: result };
  }
  const ranking = [...result.candidates].map(candidate => ({ id: candidate.id, score: candidate.score, probability: candidate.probability })).sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : 1));
  return { kind: "advice", chosen: result.chosen, logProb: result.logProbability, ranking, gp: result, identities: outcome.identities, elapsedMs: outcome.elapsedMs, snapshotDigest, stats, observation };
}
export type ResolutionSource = "host-baseline" | "graph-policy" | "host-fallback";
export interface BeadSelection {
  readonly schema: "mw.bead-selection.v1";
  readonly version: 1;
  readonly decisionId: string;
  readonly at: string;
  readonly mode: GpMode;
  readonly store: string;
  readonly readyDigest: string;
  readonly readyCount: number;
  readonly support: readonly string[];
  readonly baseline: Baseline | null;
  readonly advice: BeadAdvice | null;
  readonly resolved: { readonly beadId: string; readonly source: ResolutionSource; readonly fallbackReason?: AdviceReason } | null;
  readonly config: { readonly id: string; readonly checkpoint: string; readonly temperature: number; readonly seed: string } | null;
  readonly receipt: DecisionReceipt | null;
}
export interface ResolveInput { readonly mode: GpMode; readonly now: string; readonly store: string; readonly readyDigest: string; readonly readyCount: number; readonly support: readonly string[]; readonly baseline: Baseline | null; readonly advice: BeadAdvice | null; readonly config: GpConfig | null; readonly seed: string }
/** The host's legal resolution of advice and baseline into one selection record with its receipt. Pure. */
export function resolveSelection(input: ResolveInput): BeadSelection {
  const decisionId = "sel:" + sha256Canonical({ readyDigest: input.readyDigest, support: input.support, seed: input.seed, mode: input.mode, at: input.now }).slice(7, 7 + 24);
  const advice = input.advice;
  let resolved: BeadSelection["resolved"] = null;
  if (input.mode === "canary" && advice?.kind === "advice") resolved = { beadId: advice.chosen, source: "graph-policy" };
  else if (input.baseline !== null) {
    resolved = input.mode === "canary" && advice !== null && advice.kind === "abstain" ? { beadId: input.baseline.beadId, source: "host-fallback", fallbackReason: advice.reason } : { beadId: input.baseline.beadId, source: "host-baseline" };
  }
  const config = input.config === null ? null : { id: input.config.id, checkpoint: input.config.checkpoint, temperature: input.config.temperature, seed: input.seed };
  let receipt: DecisionReceipt | null = null;
  if (resolved !== null) {
    const gpOk = advice?.kind === "advice" ? advice : null;
    const completeness = gpOk === null ? "unknown" : "depends_on coverage=" + gpOk.stats.relationsKept + "/" + gpOk.stats.relationsTotal + (gpOk.stats.relationsKept === gpOk.stats.relationsTotal ? " complete" : " partial");
    receipt = {
      schema: "mw.decision-receipt.v1", version: 1, decisionId,
      gp: { graphHash: gpOk === null ? "unknown" : gpOk.snapshotDigest, programHash: input.config === null ? "unknown" : input.config.programBytesDigest, checkpointHash: input.config === null ? "unknown" : input.config.thetaBytesDigest, snapshotHash: input.readyDigest },
      featureProjectionDigest: "unknown",
      actor: { id: "development-rig:select-bead", revision: input.config?.id ?? "no-config" },
      selector: resolved.source === "graph-policy" ? { id: "gp-sample", revision: input.config?.checkpoint ?? "unknown" } : { id: "host-baseline", revision: input.baseline?.rule ?? "unknown" },
      support: [...input.support],
      // A deterministic host rule selects its bead with probability one (log 0); gp's draw carries its exact recorded log probability.
      logProb: resolved.source === "graph-policy" && gpOk !== null ? gpOk.logProb : 0,
      completeness,
      actions: { proposed: [gpOk === null ? resolved.beadId : gpOk.chosen], admitted: [resolved.beadId], executed: "unknown" },
      sourceReceipt: "unknown",
      resolverVerdict: "support=" + input.support.length + ";mode=" + input.mode + ";source=" + resolved.source + (resolved.fallbackReason ? ";fallback=" + resolved.fallbackReason : ""),
      verifierOutcome: "unknown",
      feedback: { status: resolved.source === "graph-policy" && gpOk?.gp.journalEntry ? "pending" : "unknown" },
    };
    const check = validateDecisionReceipt(receipt);
    if (!check.ok) throw new Error("GP_RECEIPT_INVALID: " + check.detail);
  }
  return { schema: "mw.bead-selection.v1", version: 1, decisionId, at: input.now, mode: input.mode, store: input.store, readyDigest: input.readyDigest, readyCount: input.readyCount, support: [...input.support], baseline: input.baseline, advice, resolved, config, receipt };
}
/** One experience row (mw.decision-experience.v1): the training-facing projection of a selection, propensities only where a draw produced them. */
export function experienceRow(selection: BeadSelection, outcome: { readonly claim: string | null } = { claim: null }): Record<string, unknown> {
  const advice = selection.advice;
  return {
    schema: "mw.decision-experience.v1", decisionId: selection.decisionId, at: selection.at, mode: selection.mode, store: selection.store, readyDigest: selection.readyDigest,
    support: selection.support, baseline: selection.baseline?.beadId ?? null,
    gp: advice === null ? null : advice.kind === "advice"
      ? { chosen: advice.chosen, logProb: advice.logProb, logProbWord: advice.gp.logProbabilityWord, ranking: advice.ranking, programDigest: advice.gp.programDigest, checkpointDigest: advice.gp.checkpointDigest, graphDigest: advice.gp.graphDigest, decisionDigest: advice.gp.decisionDigest, journalEntry: advice.gp.journalEntry, seed: advice.gp.seed, temperature: advice.gp.temperature, elapsedMs: advice.elapsedMs }
      : { abstain: advice.reason, detail: advice.detail, elapsedMs: advice.elapsedMs, journalEntry: advice.gp?.journalEntry ?? null, decisionDigest: advice.gp?.decisionDigest ?? null },
    resolved: selection.resolved, propensity: selection.receipt === null ? "unknown" : selection.receipt.logProb, claim: outcome.claim,
  };
}
