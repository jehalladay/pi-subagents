/**
 * Pure rf workload observation (RFCA-MWX04-R001). Reads facts out of rf envelopes the caller already
 * holds and names them. It issues no rf command, sleeps, polls, retries or reads a clock, and it never
 * decides when to render or back off: observed, not regulated.
 */
export type Unknown = "unknown";
export type PressureClass = "workload_pressure" | "currentness_conflict" | "storage_unavailable" | "none" | "unclassified";

export interface RenderWorkloadObservation {
  readonly wallMs: number | Unknown;
  readonly attempts: number | Unknown;
  readonly retried: boolean | Unknown;
  readonly supersededTransactionIds: readonly string[] | Unknown;
  readonly commitSeq: number | Unknown;
  readonly status: string | Unknown;
  readonly committed: boolean | Unknown;
}

export interface PressureVerdict { readonly pressure: PressureClass; readonly code: string | null }
export interface WorkloadSample { readonly observation: RenderWorkloadObservation; readonly pressure: PressureClass }

export interface WorkloadSummary {
  readonly samples: number;
  readonly committedRenders: number;
  readonly observedWallMs: number | Unknown;
  readonly usefulCommitsPerSecond: number | Unknown;
  readonly retryRatio: number | Unknown;
  readonly supersededRounds: number;
  readonly maxWallMs: number | Unknown;
  readonly medianWallMs: number | Unknown;
  readonly pressure: Readonly<Record<PressureClass, number>>;
}

const UNKNOWN: Unknown = "unknown";
const PRESSURE_CODES: ReadonlySet<string> = new Set(["RF_STORAGE_LOCK_TIMEOUT", "RF_STORAGE_NETWORK_TIMEOUT"]);
const CONFLICT_CODES: ReadonlySet<string> = new Set([
  "RF_CURRENTNESS_CONFLICT", "RF_PUBLICATION_HEAD_CONFLICT", "RF_IDEMPOTENCY_KEY_CONFLICT",
]);
const REVISION_CONFLICT = /^RF_[A-Z]+(?:_[A-Z]+)*_REVISION_CONFLICT$/;
const STORAGE_FAMILY = /^RF_STORAGE_/;
const STORAGE_EXIT = 6;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function count(value: unknown, minimum: number): number | Unknown {
  return typeof value === "number" && Number.isInteger(value) && value >= minimum ? value : UNKNOWN;
}

export function observeRenderWorkload(envelope: unknown): RenderWorkloadObservation {
  const doc = record(envelope);
  if (!doc) throw new Error("RF_WORKLOAD_ENVELOPE_INVALID: envelope is not an object");
  const result = record(doc["result"]);
  if (!result && doc["ok"] !== false) throw new Error("RF_WORKLOAD_ENVELOPE_INVALID: ok envelope carries no result object");
  if (!result)
    return { wallMs: UNKNOWN, attempts: UNKNOWN, retried: UNKNOWN, supersededTransactionIds: UNKNOWN,
      commitSeq: UNKNOWN, status: UNKNOWN, committed: false };
  const wall = result["wall_ms"];
  const wallMs = typeof wall === "number" && Number.isFinite(wall) && wall >= 0 ? wall : UNKNOWN;
  const attempts = count(result["attempts"], 1);
  const rounds = result["superseded_transaction_ids"];
  const superseded = Array.isArray(rounds) && rounds.every(id => typeof id === "string") ? [...rounds as string[]] : UNKNOWN;
  const status = typeof result["status"] === "string" && result["status"] !== "" ? result["status"] : UNKNOWN;
  return {
    wallMs, attempts, retried: attempts === UNKNOWN ? UNKNOWN : attempts > 1, supersededTransactionIds: superseded,
    commitSeq: count(result["commit_seq"], 0), status, committed: status === UNKNOWN ? UNKNOWN : status === "success",
  };
}

/** Classifies by diagnostic code, never by message text and never by exit code alone (exit 4 covers both lock and currentness). */
export function classifyRenderPressure(exitCode: number, diagnostics: readonly unknown[]): PressureVerdict {
  if (!Number.isInteger(exitCode) || exitCode < 0) throw new Error("RF_WORKLOAD_ENVELOPE_INVALID: exit code is not a non-negative integer");
  if (!Array.isArray(diagnostics)) throw new Error("RF_WORKLOAD_ENVELOPE_INVALID: diagnostics is not an array");
  if (exitCode === 0) return { pressure: "none", code: null };
  const codes: string[] = [];
  for (const entry of diagnostics) {
    const code = record(entry)?.["code"];
    if (typeof code === "string" && code !== "") codes.push(code);
  }
  const conflict = codes.find(code => CONFLICT_CODES.has(code) || REVISION_CONFLICT.test(code));
  if (conflict !== undefined) return { pressure: "currentness_conflict", code: conflict };
  const storage = codes.find(code => exitCode === STORAGE_EXIT && STORAGE_FAMILY.test(code) && !PRESSURE_CODES.has(code));
  if (storage !== undefined) return { pressure: "storage_unavailable", code: storage };
  const busy = codes.find(code => PRESSURE_CODES.has(code));
  if (busy !== undefined) return { pressure: "workload_pressure", code: busy };
  return { pressure: "unclassified", code: codes[0] ?? null };
}

function numbers(values: readonly (number | Unknown)[]): number[] {
  return values.filter((value): value is number => typeof value === "number");
}

export function summarizeWorkload(input: readonly WorkloadSample[]): WorkloadSummary {
  const window: readonly WorkloadSample[] = Array.isArray(input) ? input : [];
  if (window.length === 0) throw new Error("RF_WORKLOAD_WINDOW_EMPTY: no observations to summarize");
  const walls = numbers(window.map(sample => sample.observation.wallMs)).sort((a, b) => a - b);
  const attempts = numbers(window.map(sample => sample.observation.attempts));
  const committed = window.filter(sample => sample.observation.committed === true).length;
  const observedWallMs = walls.length === 0 ? UNKNOWN : walls.reduce((sum, ms) => sum + ms, 0);
  const middle = Math.floor(walls.length / 2);
  const pressure: Record<PressureClass, number> = {
    none: 0, workload_pressure: 0, currentness_conflict: 0, storage_unavailable: 0, unclassified: 0,
  };
  let supersededRounds = 0;
  for (const sample of window) {
    pressure[sample.pressure] += 1;
    const ids = sample.observation.supersededTransactionIds;
    if (ids !== UNKNOWN) supersededRounds += ids.length;
  }
  return {
    samples: window.length,
    committedRenders: committed,
    observedWallMs,
    usefulCommitsPerSecond: observedWallMs === UNKNOWN || observedWallMs === 0 ? UNKNOWN : committed / (observedWallMs / 1000),
    retryRatio: attempts.length === 0 ? UNKNOWN : attempts.filter(n => n > 1).length / attempts.length,
    supersededRounds,
    maxWallMs: walls.length === 0 ? UNKNOWN : walls[walls.length - 1] as number,
    medianWallMs: walls.length === 0 ? UNKNOWN : walls.length % 2 === 1 ? walls[middle] as number : ((walls[middle - 1] as number) + (walls[middle] as number)) / 2,
    pressure,
  };
}
