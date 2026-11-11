/**
 * Replay experiment over Beads' own history (pure parts). Every `started_at` in an exported issue
 * list is one real past work-selection decision: at that instant the actor claimed `chosen` out of
 * the beads that were created, unclaimed, unclosed and unblocked at that instant. The experiment
 * rebuilds each context with features AS OF the instant (dependency counts from edge creation
 * times, age from creation; comment counts are not time-resolved and stay unknown), splits by time
 * (train before the split instant, test from it on), and measures how well a scorer ranks the
 * actually-chosen bead: top-1 hit, mean reciprocal rank and mean log-softmax of the chosen bead
 * (a metric over gp's scores, not a re-implementation of gp). Baselines are the host's own
 * deterministic rules. A perturbed theta is a seeded Gaussian step from θ₀ — a search candidate,
 * never a promotion. Nothing here reads a clock or a store.
 */
import type { ReadyBead } from "./graph-policy-snapshot.js";

export interface HistoryIssue {
  readonly id: string;
  readonly status: string;
  readonly issue_type: string | null;
  readonly priority: number | null;
  readonly created_at: string;
  readonly started_at: string | null;
  readonly closed_at: string | null;
  readonly assignee: string | null;
  readonly dependencies: readonly { readonly issue_id: string; readonly depends_on_id: string; readonly type: string | null; readonly created_at: string | null }[];
}
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown): string | null => (typeof value === "string" && value.trim() ? value : null);
/** Narrow a `bd list --all --json` document to the consumed history rows. */
export function parseHistory(document: unknown): HistoryIssue[] {
  if (!Array.isArray(document)) throw new Error("BEADS_RESPONSE_INVALID: history must be an issue array");
  return document.map((row, index) => {
    if (!isRecord(row) || typeof row["id"] !== "string" || typeof row["status"] !== "string" || typeof row["created_at"] !== "string") throw new Error("BEADS_RESPONSE_INVALID: history row " + index + " lacks id/status/created_at");
    const deps = Array.isArray(row["dependencies"]) ? row["dependencies"].filter(isRecord) : [];
    return {
      id: row["id"], status: row["status"], issue_type: text(row["issue_type"]), priority: typeof row["priority"] === "number" ? row["priority"] : null,
      created_at: row["created_at"], started_at: text(row["started_at"]), closed_at: text(row["closed_at"]), assignee: text(row["assignee"]),
      dependencies: deps.filter(d => typeof d["issue_id"] === "string" && typeof d["depends_on_id"] === "string").map(d => ({ issue_id: d["issue_id"] as string, depends_on_id: d["depends_on_id"] as string, type: text(d["type"]), created_at: text(d["created_at"]) })),
    };
  });
}
export interface DecisionContext {
  readonly id: string;
  readonly at: string;
  readonly actor: string | null;
  readonly chosen: string;
  /** Candidates as of the instant, oldest first then id; the chosen bead is always a member. */
  readonly support: readonly string[];
  /** The candidates projected as ready rows with features as of the instant (comment_count unknown). */
  readonly ready: readonly ReadyBead[];
  readonly split: "train" | "test";
}
const ms = (iso: string | null): number => (iso === null ? Number.NaN : Date.parse(iso));
/**
 * One context per claim event with at least `minSupport` candidates. A bead is a candidate at t when it
 * was created at or before t, not started before t, not closed at or before t, and no `blocks` edge
 * created at or before t points at a bead still open at t. Events whose chosen bead fails its own
 * predicate (data gaps) are dropped and counted.
 */
export function buildDecisionContexts(issues: readonly HistoryIssue[], options: { readonly splitAt: string; readonly minSupport?: number }): { readonly contexts: DecisionContext[]; readonly dropped: { readonly reason: string; readonly count: number }[] } {
  const minSupport = options.minSupport ?? 2;
  const splitMs = ms(options.splitAt);
  if (!Number.isFinite(splitMs)) throw new Error("GP_REPLAY_INVALID: splitAt must be an ISO-8601 instant");
  const byId = new Map(issues.map(issue => [issue.id, issue] as const));
  const dependents = new Map<string, { readonly issue_id: string; readonly created_at: string | null; readonly type: string | null }[]>();
  for (const issue of issues) for (const dep of issue.dependencies) {
    const list = dependents.get(dep.depends_on_id) ?? []; list.push({ issue_id: dep.issue_id, created_at: dep.created_at, type: dep.type }); dependents.set(dep.depends_on_id, list);
  }
  const edgeAt = (created: string | null, t: number): boolean => created === null || ms(created) <= t;
  const openAt = (issue: HistoryIssue, t: number): boolean => ms(issue.created_at) <= t && !(issue.closed_at !== null && ms(issue.closed_at) <= t);
  const blockedAt = (issue: HistoryIssue, t: number): boolean => issue.dependencies.some(dep => dep.type === "blocks" && edgeAt(dep.created_at, t) && (() => { const other = byId.get(dep.depends_on_id); return other !== undefined && openAt(other, t); })());
  const candidateAt = (issue: HistoryIssue, t: number, chosenId: string): boolean =>
    openAt(issue, t) && (issue.id === chosenId || issue.started_at === null || ms(issue.started_at) >= t) && !blockedAt(issue, t);
  const dropped = new Map<string, number>();
  const drop = (reason: string): void => { dropped.set(reason, (dropped.get(reason) ?? 0) + 1); };
  const events = issues.filter(issue => issue.started_at !== null && Number.isFinite(ms(issue.started_at))).sort((a, b) => ms(a.started_at) - ms(b.started_at) || (a.id < b.id ? -1 : 1));
  const contexts: DecisionContext[] = [];
  for (const event of events) {
    const t = ms(event.started_at);
    if (!candidateAt(event, t, event.id)) { drop("chosen fails its own candidate predicate at its start instant"); continue; }
    const members = issues.filter(issue => candidateAt(issue, t, event.id)).sort((a, b) => ms(a.created_at) - ms(b.created_at) || (a.id < b.id ? -1 : 1));
    if (members.length < minSupport) { drop("fewer than " + minSupport + " candidates"); continue; }
    const ids = new Set(members.map(member => member.id));
    const ready: ReadyBead[] = members.map(member => ({
      id: member.id, status: "open", issue_type: member.issue_type, priority: member.priority, created_at: member.created_at,
      dependency_count: member.dependencies.filter(dep => edgeAt(dep.created_at, t)).length,
      dependent_count: (dependents.get(member.id) ?? []).filter(dep => edgeAt(dep.created_at, t)).length,
      comment_count: null,
      dependencies: member.dependencies.filter(dep => edgeAt(dep.created_at, t) && ids.has(dep.depends_on_id)).map(dep => ({ issue_id: dep.issue_id, depends_on_id: dep.depends_on_id, type: dep.type })),
    }));
    contexts.push({ id: event.id + "@" + event.started_at, at: event.started_at as string, actor: event.assignee, chosen: event.id, support: members.map(member => member.id), ready, split: t < splitMs ? "train" : "test" });
  }
  return { contexts, dropped: [...dropped.entries()].map(([reason, count]) => ({ reason, count })) };
}
export type Scores = ReadonlyMap<string, number>;
export interface ContextMetrics { readonly top1: number; readonly reciprocalRank: number; readonly logLikelihood: number; readonly support: number }
/** Rank-based metrics of the chosen bead under a score map; ties share credit (a k-way tie at the top scores 1/k). */
export function contextMetrics(scores: Scores, chosen: string, support: readonly string[]): ContextMetrics {
  const own = scores.get(chosen);
  if (own === undefined || !Number.isFinite(own)) return { top1: 0, reciprocalRank: 0, logLikelihood: Number.NEGATIVE_INFINITY, support: support.length };
  let greater = 0; let equal = 0; let max = Number.NEGATIVE_INFINITY;
  const values: number[] = [];
  for (const id of support) {
    const value = scores.get(id); if (value === undefined || !Number.isFinite(value)) continue;
    values.push(value); if (value > max) max = value;
    if (id !== chosen) { if (value > own) greater += 1; else if (value === own) equal += 1; }
  }
  const rank = 1 + greater + equal / 2;
  const top1 = greater > 0 ? 0 : 1 / (1 + equal);
  const logSumExp = max + Math.log(values.reduce((sum, value) => sum + Math.exp(value - max), 0));
  return { top1, reciprocalRank: 1 / rank, logLikelihood: own - logSumExp, support: support.length };
}
export interface ArmSummary { readonly arm: string; readonly n: number; readonly top1: number; readonly mrr: number; /** null for a rule whose scores are not logits (the deterministic baselines). */ readonly meanLogLikelihood: number | null; readonly expectedRandomTop1: number }
export function summarize(arm: string, rows: readonly ContextMetrics[], options: { readonly probabilistic?: boolean } = {}): ArmSummary {
  const n = rows.length; const mean = (pick: (row: ContextMetrics) => number): number => (n === 0 ? Number.NaN : rows.reduce((sum, row) => sum + pick(row), 0) / n);
  return { arm, n, top1: mean(row => row.top1), mrr: mean(row => row.reciprocalRank), meanLogLikelihood: options.probabilistic === false ? null : mean(row => row.logLikelihood), expectedRandomTop1: mean(row => 1 / row.support) };
}
/**
 * Single-unit probes: for every final-layer cell of θ₀, the theta that scores exactly ±that hidden unit (all other
 * final weights zero, every other block as θ₀). Under θ₀'s pass-through hidden layer each probe ranks by one
 * feature, so a probe that reproduces a host baseline (e.g. recency) is a conformance check of the whole gp path.
 */
export function singleUnitProbes(theta0: Theta, scoringBlock = "Ws"): readonly { readonly arm: string; readonly theta: Theta }[] {
  const cells = theta0[scoringBlock]; if (cells === undefined) return [];
  const probes: { arm: string; theta: Theta }[] = [];
  cells.forEach((_, index) => {
    for (const sign of [1, -1] as const) probes.push({ arm: "theta-unit" + index + (sign > 0 ? "+" : "-"), theta: { ...theta0, [scoringBlock]: cells.map((__, j) => (j === index ? sign : 0)) } });
  });
  return probes;
}
/** The host's deterministic rules as score maps (higher is preferred); ties are genuine ties. */
export const BASELINES: Readonly<Record<string, (ready: readonly ReadyBead[]) => Scores>> = {
  "priority-first": ready => new Map(ready.map(bead => [bead.id, -(bead.priority ?? 99) * 1_000_000 + (bead.created_at ? -Date.parse(bead.created_at) / 1_000 : 0)])),
  "oldest-first": ready => new Map(ready.map(bead => [bead.id, bead.created_at ? -Date.parse(bead.created_at) : 0])),
  "newest-first": ready => new Map(ready.map(bead => [bead.id, bead.created_at ? Date.parse(bead.created_at) : 0])),
  "most-dependents-first": ready => new Map(ready.map(bead => [bead.id, bead.dependent_count ?? 0])),
  "uniform": ready => new Map(ready.map(bead => [bead.id, 0])),
};
/** Deterministic 32-bit PRNG (mulberry32) so a perturbation is a function of (θ₀, seed, scale). */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => { state = (state + 0x6d2b79f5) >>> 0; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export type Theta = Readonly<Record<string, readonly number[]>>;
/** θ₀ plus a seeded Gaussian step per cell, scaled per parameter block; values stay finite binary32. */
export function perturbTheta(theta0: Theta, seed: number, scales: Readonly<Record<string, number>>): Theta {
  const random = mulberry32(seed);
  const gaussian = (): number => { const u = Math.max(random(), 1e-12); const v = random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const out: Record<string, number[]> = {};
  for (const [name, cells] of Object.entries(theta0)) {
    const scale = scales[name] ?? 0;
    out[name] = cells.map(cell => Math.fround(cell + scale * gaussian()));
  }
  return out;
}
