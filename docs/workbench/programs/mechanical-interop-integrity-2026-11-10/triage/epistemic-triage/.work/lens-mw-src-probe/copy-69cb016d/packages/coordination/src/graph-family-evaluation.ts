/**
 * Per-graph-family evaluator (GPC-EAT-R010, MechanicalWorkflows-btlg). ADDITIVE: a new function
 * over mw.episode.v1 episodes; `evaluateEpisodes` and the whole of evaluation.ts are unchanged.
 * One block per task family (sorted), each arm row carrying regret against a supplied
 * exact-oracle arm (the literal "unknown" when none is supplied — never a fabricated 0),
 * constraint-violation and invalid-proposal counts from the resolver's own rejection codes,
 * verified throughput (admitted intents per step) and p95 wall-clock cost from an INJECTED
 * per-episode clock, so the evaluator stays a pure function (C020). `certified` is the literal
 * false everywhere: nothing here is a promotion claim.
 *
 * Code-class split, documented once: a rejection is a CONSTRAINT violation when the world
 * refused the proposal (INTENT_BUDGET_EXCEEDED, INTENT_WRITE_CONFLICT, INTENT_SCOPE_PROTECTED)
 * and an INVALID proposal when the proposal itself was defective (INTENT_BASIS_STALE,
 * INTENT_DUPLICATE, INTENT_AUTHORITY_EXCEEDED). An unrecognized code counts as invalid.
 */
import type { Episode, Maybe } from "./episode.js";
import { digest } from "./canonical.js";

export interface GraphFamilyArm {
  readonly armId: string;
  readonly episodes: readonly Episode[];
  /** Injected wall-clock cost per episode, micro units, index-aligned with `episodes` (purity: no clock is read here). */
  readonly wallClockMicro: readonly number[];
}

export interface GraphFamilyEvaluationInput {
  readonly arms: readonly GraphFamilyArm[];
  /** The exact-oracle arm regret is measured against; absent means every regret is the literal "unknown". */
  readonly oracleArmId?: string | undefined;
}

export interface GraphFamilyArmResult {
  readonly armId: string;
  readonly n: number;
  /** meanStepsMicro(arm) - meanStepsMicro(oracle) within this family; "unknown" without an oracle arm present in the family. */
  readonly regretMicro: Maybe<number>;
  readonly constraintViolations: number;
  readonly invalidProposals: number;
  /** Admitted intents per step, micro units, averaged over the arm's episodes of this family. */
  readonly throughputMicro: number;
  readonly p95WallClockMicro: number;
  readonly meanStepsMicro: number;
  readonly certified: false;
}

export interface GraphFamilyBlock {
  readonly family: string;
  readonly arms: readonly GraphFamilyArmResult[];
  readonly certified: false;
}

export interface GraphFamilyReport {
  readonly schema: "mw.graph-family-evaluation.v1";
  readonly oracleArm: Maybe<string>;
  readonly families: readonly GraphFamilyBlock[];
  readonly certified: false;
  readonly reportDigest: string;
}

const CONSTRAINT_CODES: ReadonlySet<string> = new Set(["INTENT_BUDGET_EXCEEDED", "INTENT_WRITE_CONFLICT", "INTENT_SCOPE_PROTECTED"]);
const MICRO = 1_000_000;
const fail = (detail: string): never => { throw new RangeError(`GRAPH_EVALUATION_INVALID: ${detail}`); };
const mean = (values: readonly number[]): number => (values.length === 0 ? 0 : Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));

/** Nearest-rank p95 (same convention as evaluation.ts, reimplemented locally so that module stays untouched). */
function nearestRank95(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(0.95 * sorted.length) - 1))]!;
}

interface Row { readonly family: string; readonly armId: string; readonly steps: number; readonly admitted: number; readonly constraints: number; readonly invalid: number; readonly wallClockMicro: number }

function rowsOf(arm: GraphFamilyArm): Row[] {
  if (arm.armId.trim().length === 0) fail("blank arm id");
  if (arm.episodes.length === 0) fail(`arm ${arm.armId} carries no episode`);
  if (arm.wallClockMicro.length !== arm.episodes.length) fail(`arm ${arm.armId} injects ${arm.wallClockMicro.length} wall-clock costs for ${arm.episodes.length} episodes`);
  for (const cost of arm.wallClockMicro) if (!Number.isFinite(cost) || cost < 0) fail(`arm ${arm.armId} injects a non-finite or negative wall-clock cost`);
  return arm.episodes.map((episode, index) => {
    if (episode.schema !== "mw.episode.v1") fail(`arm ${arm.armId} episode ${index} has schema ${String(episode.schema)}`);
    let admitted = 0, constraints = 0, invalid = 0;
    for (const decision of episode.decisions) {
      admitted += decision.eligibility.admitted.length;
      for (const rejection of decision.eligibility.rejected) {
        if (CONSTRAINT_CODES.has(rejection.code)) constraints += 1; else invalid += 1;
      }
    }
    return { family: episode.task.family, armId: arm.armId, steps: episode.cost.steps, admitted, constraints, invalid, wallClockMicro: arm.wallClockMicro[index]! };
  });
}

/** Evaluate arms of mw.episode.v1 episodes into per-family blocks. Additive beside evaluateEpisodes, which is unchanged. */
export function evaluateGraphFamilies(input: GraphFamilyEvaluationInput): GraphFamilyReport {
  if (input.arms.length === 0) fail("no arms");
  const ids = input.arms.map(arm => arm.armId);
  if (new Set(ids).size !== ids.length) fail(`duplicate arm ids ${ids.join(",")}`);
  const oracleArmId = input.oracleArmId;
  if (oracleArmId !== undefined && !ids.includes(oracleArmId)) fail(`oracle arm ${oracleArmId} is not an arm (${ids.join(",")})`);
  const rows = input.arms.flatMap(rowsOf);
  const families = [...new Set(rows.map(row => row.family))].sort();
  const blocks: GraphFamilyBlock[] = families.map(family => {
    const ofFamily = rows.filter(row => row.family === family);
    const oracleRows = oracleArmId === undefined ? [] : ofFamily.filter(row => row.armId === oracleArmId);
    const oracleMeanSteps = oracleRows.length === 0 ? undefined : mean(oracleRows.map(row => row.steps * MICRO));
    const arms: GraphFamilyArmResult[] = [...new Set(ofFamily.map(row => row.armId))].sort().map(armId => {
      const own = ofFamily.filter(row => row.armId === armId);
      const meanStepsMicro = mean(own.map(row => row.steps * MICRO));
      return {
        armId, n: own.length,
        regretMicro: oracleMeanSteps === undefined ? "unknown" : meanStepsMicro - oracleMeanSteps,
        constraintViolations: own.reduce((sum, row) => sum + row.constraints, 0),
        invalidProposals: own.reduce((sum, row) => sum + row.invalid, 0),
        throughputMicro: mean(own.map(row => (row.steps === 0 ? 0 : Math.round((row.admitted * MICRO) / row.steps)))),
        p95WallClockMicro: nearestRank95(own.map(row => row.wallClockMicro)),
        meanStepsMicro,
        certified: false as const,
      };
    });
    return { family, arms, certified: false as const };
  });
  const body = { schema: "mw.graph-family-evaluation.v1" as const, oracleArm: oracleArmId === undefined ? ("unknown" as const) : oracleArmId, families: blocks, certified: false as const };
  return { ...body, reportDigest: digest(body) };
}
