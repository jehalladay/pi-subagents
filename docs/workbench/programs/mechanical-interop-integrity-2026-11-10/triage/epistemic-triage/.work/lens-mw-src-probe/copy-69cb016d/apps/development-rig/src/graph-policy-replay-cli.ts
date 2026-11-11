/**
 * `--gp-replay`: the controlled replay experiment. Rebuilds every real past work-selection decision
 * from an exported Beads history (`bd list --all --json --limit 0`), splits by time, scores each
 * context with θ₀ and K seeded perturbations through ONE `gp rpc --stdio` session (evaluate per
 * context, program and theta sent verbatim), measures top-1 / MRR / mean log-likelihood of the bead
 * that was actually chosen against the host's deterministic baselines, selects the best theta on
 * the TRAIN split only, and writes a report plus that theta's `graphpolicy.checkpoint.v1` document
 * for gp to identify. Promotion is a separate explicit act (gp promote / a config commit); this
 * command never writes a checkpoint into the live config.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadGpConfig } from "./graph-policy-advice.js";
import { toWord32 } from "./graph-policy-cli.js";
import { BASELINES, buildDecisionContexts, contextMetrics, parseHistory, perturbTheta, singleUnitProbes, summarize, type ArmSummary, type ContextMetrics, type DecisionContext, type Theta } from "./graph-policy-replay.js";
import { GpRpcSession, spawnGpRpc, type RpcTransportFactory } from "./graph-policy-rpc.js";
import { buildBeadSnapshot, sha256Canonical } from "./graph-policy-snapshot.js";

export interface ReplayArgs { history: string; config: string; entry: string | undefined; out: string; splitAt: string; thetas: number; seed: number; limit: number | undefined; scale: number }
const VALUED = ["--history", "--gp-config", "--gp-entry", "--out", "--split", "--thetas", "--seed", "--limit", "--scale"];
export function parseReplayArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>>): ReplayArgs {
  const out: ReplayArgs = { history: "", config: env["MW_GP_CONFIG"] ?? "", entry: env["MW_GP_ENTRY"], out: "", splitAt: "2026-10-20T00:00:00Z", thetas: 24, seed: 1, limit: undefined, scale: 1 };
  for (let i = 0; i < args.length; i++) {
    const key = args[i]; const value = args[++i];
    if (!VALUED.includes(key ?? "")) throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    if (!value || value.startsWith("--")) throw new Error("INVALID_ARGUMENT: " + key + " requires a value");
    if (key === "--history") out.history = value; else if (key === "--gp-config") out.config = value; else if (key === "--gp-entry") out.entry = value; else if (key === "--out") out.out = value; else if (key === "--split") out.splitAt = value;
    else if (key === "--scale") { if (!/^\d+(\.\d+)?$/.test(value) || !(Number(value) > 0)) throw new Error("INVALID_ARGUMENT: --scale must be a positive number"); out.scale = Number(value); }
    else { if (!/^\d+$/.test(value)) throw new Error("INVALID_ARGUMENT: " + key + " must be a non-negative integer"); if (key === "--thetas") out.thetas = Number(value); else if (key === "--seed") out.seed = Number(value); else out.limit = Number(value); }
  }
  if (!out.history || !out.out) throw new Error("MISSING_ARGUMENT: --history and --out are required");
  if (!out.config) throw new Error("GP_CONFIG_REQUIRED: --gp-config (or MW_GP_CONFIG) is required");
  if (!out.entry) throw new Error("GP_ENTRY_REQUIRED: --gp-entry (or MW_GP_ENTRY) must name the built GraphPolicyCLI entry");
  if (!Number.isFinite(Date.parse(out.splitAt))) throw new Error("GP_REPLAY_INVALID: --split must be an ISO-8601 instant");
  return out;
}
export interface ReplaySeams { readonly transport?: RpcTransportFactory | undefined; readonly env?: Readonly<Record<string, string | undefined>> | undefined; readonly readFile?: ((path: string) => string) | undefined; readonly writeFile?: ((path: string, text: string) => void) | undefined; readonly now?: (() => string) | undefined }
export const PERTURBATION_SCALES: Readonly<Record<string, number>> = { Ws: 0.3, b0: 0.1, W0: 0.1, Wu: 0.05, Wm: 0.05 };
interface ArmResult { readonly arm: string; readonly theta: Theta | null; readonly train: ArmSummary; readonly test: ArmSummary }
/** Run the experiment; the report (mw.graph-policy-replay-report.v1) is the deliverable, the selected theta a candidate. */
export async function gpReplayCli(args: readonly string[], seams: ReplaySeams = {}): Promise<number> {
  const parsed = parseReplayArgs(args, seams.env ?? process.env);
  const read = seams.readFile ?? ((path: string) => readFileSync(path, "utf8"));
  const write = seams.writeFile ?? ((path: string, text: string) => { mkdirSync(join(path, ".."), { recursive: true }); writeFileSync(path, text); });
  const config = loadGpConfig(parsed.config, read);
  const program: unknown = JSON.parse(read(config.program));
  const theta0 = (JSON.parse(read(config.theta)) as { parameters: Theta }).parameters;
  const history = parseHistory(JSON.parse(read(parsed.history)));
  const built = buildDecisionContexts(history, { splitAt: parsed.splitAt });
  const contexts: DecisionContext[] = parsed.limit === undefined ? built.contexts : built.contexts.slice(0, parsed.limit);
  const historyDigest = sha256Canonical(history.map(issue => [issue.id, issue.status, issue.started_at, issue.closed_at]));
  const snapshots = contexts.map(context => {
    const { snapshot } = buildBeadSnapshot({ ready: context.ready, support: context.support, now: context.at, store: "history-replay", readyDigest: historyDigest, extraRevisions: ["context:" + context.id] });
    return { snapshot, candidates: { [config.candidateType]: context.support } };
  });
  const arms: ArmResult[] = [];
  const perContext = (metricsFor: (context: DecisionContext, index: number) => ContextMetrics): { train: ContextMetrics[]; test: ContextMetrics[] } => {
    const train: ContextMetrics[] = []; const test: ContextMetrics[] = [];
    contexts.forEach((context, index) => { (context.split === "train" ? train : test).push(metricsFor(context, index)); });
    return { train, test };
  };
  for (const [name, rule] of Object.entries(BASELINES)) {
    const rows = perContext(context => contextMetrics(rule(context.ready), context.chosen, context.support));
    arms.push({ arm: "baseline:" + name, theta: null, train: summarize("baseline:" + name, rows.train, { probabilistic: false }), test: summarize("baseline:" + name, rows.test, { probabilistic: false }) });
  }
  const session = new GpRpcSession(seams.transport ?? spawnGpRpc(parsed.entry as string));
  let evaluations = 0; let gpMs = 0;
  const started = Date.now();
  let programDigestHex = "";
  try {
    await session.hello();
    // The program identity gp itself computes (rpc compile), so the written checkpoint document binds to the real program.
    const compiled = await session.call("compile", { program: program as Record<string, unknown> });
    const digestValue = compiled.ok && compiled.result ? compiled.result["programDigest"] : undefined;
    if (typeof digestValue !== "string" || !/^[0-9a-f]{64}$/.test(digestValue)) throw new Error("GP_RPC_COMPILE_REFUSED: " + JSON.stringify(compiled.error ?? compiled.result ?? {}).slice(0, 300));
    programDigestHex = digestValue;
    const candidates: { readonly arm: string; readonly theta: Theta }[] = [{ arm: "theta0", theta: theta0 }, ...singleUnitProbes(theta0)];
    const scales = Object.fromEntries(Object.entries(PERTURBATION_SCALES).map(([block, scale]) => [block, scale * parsed.scale]));
    for (let k = 1; k <= parsed.thetas; k++) candidates.push({ arm: "theta-seed" + (parsed.seed * 1000 + k), theta: perturbTheta(theta0, parsed.seed * 1000 + k, scales) });
    for (const candidate of candidates) {
      const metrics: ContextMetrics[] = [];
      for (let index = 0; index < contexts.length; index++) {
        const context = contexts[index]!; const files = snapshots[index]!;
        const evaluated = await session.evaluate({ program, theta: candidate.theta, graph: files.snapshot, candidates: files.candidates }, config.port);
        evaluations += 1; gpMs += Math.max(0, evaluated.durationMs);
        metrics.push(contextMetrics(new Map(evaluated.rows.map(row => [row.id, row.score])), context.chosen, context.support));
      }
      const train = metrics.filter((_, index) => contexts[index]!.split === "train"); const test = metrics.filter((_, index) => contexts[index]!.split === "test");
      arms.push({ arm: candidate.arm, theta: candidate.theta, train: summarize(candidate.arm, train), test: summarize(candidate.arm, test) });
    }
  } finally { await session.close(); }
  const learned = arms.filter(arm => arm.theta !== null);
  const ll = (arm: ArmResult): number => arm.train.meanLogLikelihood ?? Number.NEGATIVE_INFINITY;
  const best = [...learned].sort((a, b) => ll(b) - ll(a) || (a.arm < b.arm ? -1 : 1))[0]!;
  const theta0Arm = learned.find(arm => arm.arm === "theta0")!;
  const programDigest = "graphpolicy.program.c1:" + programDigestHex;
  const checkpointDoc = { schema: "graphpolicy.checkpoint.v1", program_digest: programDigestHex, cells: Object.fromEntries(Object.entries(best.theta!).map(([name, cells]) => [name, { shape: (((program as Record<string, unknown>)["parameters"] as Record<string, { shape: number[] }>)[name]?.shape) ?? [cells.length, 1], words: cells.map(toWord32) }])) };
  const report = {
    schema: "mw.graph-policy-replay-report.v1", at: (seams.now ?? (() => new Date().toISOString()))(), history: parsed.history, historyDigest, program: programDigest, programId: String((program as Record<string, unknown>)["id"] ?? ""), config: config.id, baselineCheckpoint: config.checkpoint,
    splitAt: parsed.splitAt, contexts: { total: contexts.length, train: contexts.filter(c => c.split === "train").length, test: contexts.filter(c => c.split === "test").length, dropped: built.dropped, meanSupportTrain: mean(contexts.filter(c => c.split === "train").map(c => c.support.length)), meanSupportTest: mean(contexts.filter(c => c.split === "test").map(c => c.support.length)) },
    selection: { rule: "max train meanLogLikelihood over theta0, the single-unit probes and the perturbations; test metrics reported, never used for selection", best: best.arm, theta0: theta0Arm.arm, perturbationScale: parsed.scale, perturbations: parsed.thetas, probes: singleUnitProbes(theta0).length },
    arms: arms.map(arm => ({ arm: arm.arm, train: arm.train, test: arm.test })),
    gp: { evaluations, gpReportedMs: gpMs, wallMs: Date.now() - started, transport: "gp rpc --stdio (one session)" },
    outputs: { bestTheta: "best-theta.json", bestCheckpointDocument: "best-checkpoint.v1.json" },
  };
  write(join(parsed.out, "report.json"), JSON.stringify(report, null, 1) + "\n");
  write(join(parsed.out, "best-theta.json"), JSON.stringify({ parameters: best.theta }, null, 1) + "\n");
  write(join(parsed.out, "best-checkpoint.v1.json"), JSON.stringify(checkpointDoc) + "\n");
  process.stdout.write(JSON.stringify({ mode: "gp-replay", report: { contexts: report.contexts, best: best.arm, bestTest: best.test, theta0Test: theta0Arm.test, baselinesTest: arms.filter(a => a.theta === null).map(a => a.test), gp: report.gp } }) + "\n");
  return existsSync(parsed.out) ? 0 : 0;
}
function mean(values: readonly number[]): number { return values.length === 0 ? Number.NaN : values.reduce((a, b) => a + b, 0) / values.length; }
