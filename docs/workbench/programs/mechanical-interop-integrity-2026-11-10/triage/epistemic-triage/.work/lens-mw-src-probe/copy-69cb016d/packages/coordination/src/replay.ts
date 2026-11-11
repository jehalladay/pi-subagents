import { canonicalJson, digest } from "./canonical.js";
import type { JsonValue } from "./canonical.js";
import { UNKNOWN, sanitizeValue } from "./episode.js";
import type { Episode, EpisodeEvent, Maybe } from "./episode.js";

/**
 * The replay adapter (collective-adaptation M2, MWCOL-004 replay half). A tape is JSON: captured native receipts
 * from Forge, Beads, Furnace and HyperUnix, each retained verbatim beside its projection. Replaying is pure: the
 * module has no effect surface, so an entry that recorded an irreversible effect is projected as an observation
 * of the recorded outcome and nothing runs again. A native failure stays a failure, a dirty candidate stays
 * dirty and unknown HyperUnix coverage stays unknown. The result is labelled mode `replay` and the label cannot
 * be upgraded.
 */

export type ReplaySystem = "forge" | "beads" | "furnace" | "hx";
export interface ReplayEffect { readonly kind: string; readonly reversible: boolean }

export interface ReplayEntry {
  readonly id: string;
  readonly system: ReplaySystem;
  readonly subject: string;
  readonly revision: number;
  readonly kind: string;
  /** The native receipt payload exactly as captured: Forge result record, `bd --json` record, Furnace envelope or HyperUnix summary. */
  readonly native: JsonValue;
  readonly effect?: ReplayEffect;
}

export interface ReplayTape {
  readonly schema: "mw.replay-tape.v1";
  readonly version: 1;
  readonly tapeId: string;
  readonly seed: number;
  readonly basis?: { readonly workspaceId: string; readonly revision: string };
  readonly entries: readonly ReplayEntry[];
}

export interface ReplayObservation {
  readonly entryId: string;
  readonly system: ReplaySystem;
  readonly subject: string;
  readonly revision: number;
  readonly kind: string;
  /** Forge: PASS, FAIL or COULD_NOT_JUDGE. HyperUnix: the recorded coverage. Beads: the issue status. Furnace: the run state. */
  readonly status: string;
  /** Forge: the receipt's own cleanliness flag; every other system: unknown. */
  readonly clean: boolean | "unknown";
  /** True only when the receipt itself supports certification: a clean Forge PASS, complete HyperUnix coverage, an ok completed Furnace run. */
  readonly certified: boolean;
  readonly recordedOnly: boolean;
  readonly effectReexecuted: false;
  readonly native: JsonValue;
  readonly nativeDigest: string;
}

export type ReplayConflictCode = "REPLAY_CONFLICT_STALE_REVISION" | "REPLAY_CONFLICT_DUPLICATE_MISMATCH";
export interface ReplayConflict { readonly code: ReplayConflictCode; readonly entryId: string; readonly subject: string; readonly detail: string }

export interface ReplayResult {
  readonly mode: "replay";
  readonly tapeId: string;
  readonly tapeDigest: string;
  readonly observations: readonly ReplayObservation[];
  readonly conflicts: readonly ReplayConflict[];
  readonly episode: Episode;
}

const SYSTEMS: readonly string[] = ["forge", "beads", "furnace", "hx"];
const HX_COVERAGE: readonly string[] = ["complete", "incomplete", "unknown"];
const FORGE_VERDICT: Readonly<Record<string, string>> = { passed: "PASS", failed: "FAIL", indeterminate: "COULD_NOT_JUDGE" };

function unsupported(detail: string): Error {
  return new Error(`REPLAY_TAPE_UNSUPPORTED: ${detail}`);
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

interface Projection { readonly status: string; readonly clean: boolean | "unknown"; readonly certified: boolean }

function projectForge(native: unknown): Projection {
  if (!isRecord(native) || typeof native.kind !== "string" || !Object.prototype.hasOwnProperty.call(FORGE_VERDICT, native.kind)) throw unsupported("forge receipt kind is not passed, failed or indeterminate");
  const status = FORGE_VERDICT[native.kind]!;
  const basis = native.basis;
  const clean = isRecord(basis) && typeof basis.clean === "boolean" ? basis.clean : UNKNOWN;
  return { status, clean, certified: status === "PASS" && clean === true };
}

function projectHx(native: unknown): Projection {
  if (!isRecord(native)) throw unsupported("hx receipt is not an object");
  const coverage = native.coverage === undefined ? UNKNOWN : native.coverage;
  if (typeof coverage !== "string" || !HX_COVERAGE.includes(coverage)) throw unsupported("hx coverage is not complete, incomplete or unknown");
  return { status: coverage, clean: UNKNOWN, certified: coverage === "complete" && native.exit === 0 };
}

function projectBeads(native: unknown): Projection {
  if (!isRecord(native) || typeof native.status !== "string" || native.status === "") throw unsupported("beads record has no status");
  return { status: native.status, clean: UNKNOWN, certified: false };
}

function projectFurnace(native: unknown): Projection {
  if (!isRecord(native) || native.protocol_version !== 1) throw unsupported("furnace envelope protocol_version is not 1");
  const data = native.data;
  const state = isRecord(data) && typeof data.state === "string" ? data.state : null;
  if (typeof native.ok !== "boolean" || state === null) throw unsupported("furnace envelope lacks ok or data.state");
  return { status: state, clean: UNKNOWN, certified: native.ok && state === "completed" };
}

function project(entry: ReplayEntry): Projection {
  switch (entry.system) {
    case "forge": return projectForge(entry.native);
    case "hx": return projectHx(entry.native);
    case "beads": return projectBeads(entry.native);
    case "furnace": return projectFurnace(entry.native);
  }
}

function checkShape(tape: ReplayTape): void {
  if (!isRecord(tape) || tape.schema !== "mw.replay-tape.v1" || tape.version !== 1) throw unsupported("tape schema or version is not mw.replay-tape.v1 / 1");
  if (typeof tape.tapeId !== "string" || tape.tapeId === "" || !Number.isInteger(tape.seed) || !Array.isArray(tape.entries)) throw unsupported("tape lacks tapeId, integer seed or entries");
  for (const candidate of tape.entries as readonly unknown[]) {
    if (!isRecord(candidate) || typeof candidate.id !== "string" || candidate.id === "" || typeof candidate.system !== "string" || !SYSTEMS.includes(candidate.system)) throw unsupported("tape entry has no id or an unrecognised system");
    const revision = candidate.revision;
    if (typeof candidate.subject !== "string" || typeof candidate.kind !== "string" || typeof revision !== "number" || !Number.isInteger(revision) || revision < 0) throw unsupported(`tape entry ${candidate.id} lacks subject, kind or a non-negative integer revision`);
  }
}

/**
 * Replay a captured tape. Entries apply in tape order. An entry byte-identical to one already applied is dropped
 * (idempotent); an entry that reuses an id with different content, or that carries a lower revision than its
 * subject has already reached, becomes a conflict and is not applied. Unrecognised systems, receipt shapes and
 * envelope versions throw `REPLAY_TAPE_UNSUPPORTED`. The input tape is read, never altered.
 */
export function replayTape(tape: ReplayTape): ReplayResult {
  checkShape(tape);
  const seen = new Map<string, string>();
  const latest = new Map<string, number>();
  const observations: ReplayObservation[] = [];
  const conflicts: ReplayConflict[] = [];
  for (const entry of tape.entries) {
    const bytes = canonicalJson(entry);
    const prior = seen.get(entry.id);
    if (prior !== undefined) {
      if (prior !== bytes) conflicts.push({ code: "REPLAY_CONFLICT_DUPLICATE_MISMATCH", entryId: entry.id, subject: entry.subject, detail: `entry id ${entry.id} reappears with different content` });
      continue;
    }
    const key = `${entry.system}:${entry.subject}`;
    const reached = latest.get(key);
    if (reached !== undefined && entry.revision < reached) {
      conflicts.push({ code: "REPLAY_CONFLICT_STALE_REVISION", entryId: entry.id, subject: entry.subject, detail: `revision ${entry.revision} is below ${reached} already replayed for ${key}` });
      continue;
    }
    const projection = project(entry);
    seen.set(entry.id, bytes);
    latest.set(key, entry.revision);
    observations.push({
      entryId: entry.id, system: entry.system, subject: entry.subject, revision: entry.revision, kind: entry.kind,
      status: projection.status, clean: projection.clean, certified: projection.certified,
      recordedOnly: entry.effect !== undefined, effectReexecuted: false,
      native: entry.native, nativeDigest: digest(entry.native),
    });
  }
  const tapeDigest = digest(tape);
  return { mode: "replay", tapeId: tape.tapeId, tapeDigest, observations, conflicts, episode: replayEpisode(tape, tapeDigest, observations, conflicts) };
}

function replayEpisode(tape: ReplayTape, tapeDigest: string, observations: readonly ReplayObservation[], conflicts: readonly ReplayConflict[]): Episode {
  let chain = digest({ tape: tape.tapeId });
  const checkpoints = observations.map(observation => (chain = digest({ prev: chain, entry: observation.entryId, native: observation.nativeDigest })));
  const events: EpisodeEvent[] = observations.map((observation, index) => ({
    step: index, kind: `${observation.system}.${observation.kind}`, subject: observation.subject,
    detail: `status=${observation.status} certified=${observation.certified} native=${observation.nativeDigest}`,
  }));
  const basis: Maybe<string> = tape.basis === undefined ? UNKNOWN : `${tape.basis.workspaceId}@${tape.basis.revision}`;
  const body = {
    schema: "mw.episode.v1" as const, version: 1 as const, mode: "replay" as const,
    episodeId: `replay:native-replay:${tape.seed}:${tape.tapeId}`,
    environment: "native-replay" as const, source: { schema: tape.schema, seed: tape.seed },
    task: { basis, family: "native-replay" },
    policy: { id: "replay-adapter", revision: "1", configHash: digest({ policies: ["replay-adapter@1"] }) },
    roles: ["adapter"],
    initialCheckpoint: UNKNOWN,
    checkpoints,
    decisions: [],
    events,
    artifacts: { created: UNKNOWN, consumed: UNKNOWN },
    attempts: UNKNOWN,
    cost: { steps: observations.length, budgetSpent: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, environmentCost: UNKNOWN },
    verifier: { label: "replay" as const, receiptDigest: tapeDigest, verdict: `applied=${observations.length},conflicts=${conflicts.length}` },
    arms: { controlId: UNKNOWN, treatmentId: UNKNOWN },
  };
  const clean = sanitizeValue(body);
  return { ...clean.value, sanitize: { ran: true, removed: clean.removed } };
}
