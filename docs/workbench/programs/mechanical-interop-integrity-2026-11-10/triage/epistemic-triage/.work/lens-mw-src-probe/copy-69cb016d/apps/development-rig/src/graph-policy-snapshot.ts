/**
 * Pure projection of a native `bd ready --json` result into a GraphPolicyCLI GraphDataIR snapshot
 * (graphpolicy.data.v1). Beads stays the readiness/claim authority: this module reads one native
 * ready list, never a second DAG, and never infers readiness. The pre-sampling legal support is the
 * host's (`legalSupport`): ready ∩ status open ∩ an optional operator allowlist ∩ optional issue
 * types, in native ready order. Every feature a bead does not report is the literal status
 * "unknown" — a value nobody reported is never written as 0. Dependency edges whose other end is
 * outside the ready set are dropped and the drop is declared in observation.completeness.
 */
import { createHash } from "node:crypto";

export interface BeadDependency { readonly issue_id: string; readonly depends_on_id: string; readonly type?: string | null }
/** The consumed subset of one `bd ready --json` row. */
export interface ReadyBead {
  readonly id: string;
  readonly status: string;
  readonly issue_type?: string | null;
  readonly priority?: number | null;
  readonly created_at?: string | null;
  readonly dependency_count?: number | null;
  readonly dependent_count?: number | null;
  readonly comment_count?: number | null;
  readonly dependencies?: readonly BeadDependency[] | null;
}
export interface SupportFilter { readonly allow?: readonly string[] | undefined; readonly types?: readonly string[] | undefined }

type FeatureValue = { readonly status: "known"; readonly value: number } | { readonly status: "unknown" };
interface Entity { readonly id: string; readonly kind: "bead"; readonly features: Readonly<Record<string, FeatureValue>> }
interface Incidence { readonly id: string; readonly participant: string; readonly role: "dependent" | "prerequisite" }
interface Relation { readonly id: string; readonly kind: "depends_on"; readonly features: Readonly<Record<string, FeatureValue>>; readonly incidences: readonly Incidence[] }
export interface BeadSnapshot {
  readonly schema_ref: { readonly namespace: "graphpolicy.data.v1"; readonly hash: string; readonly version: "1.0.0" };
  readonly observation: {
    readonly adapter: "mechanicalworkflows.development-rig.beads";
    readonly revisions: readonly string[];
    /** Adapter-attested revision order (ADR-GP-017): present only when the host attests one; gp never derives it from timestamps. */
    readonly revision_order?: { readonly attested_by: string; readonly ordinal: number; readonly covers: readonly string[] };
    readonly scope: string;
    readonly extraction: Readonly<Record<string, string>>;
    readonly timestamp: string;
    readonly budget: { readonly max_entities: number };
    readonly completeness: { readonly depends_on: { readonly coverage: number; readonly complete: boolean } };
    readonly slice: { readonly kind: "snapshot" };
  };
  readonly entities: readonly Entity[];
  readonly relations: readonly Relation[];
  readonly candidates: { readonly beads: { readonly type: "beads"; readonly members: readonly string[] } };
}
export interface SnapshotInput {
  readonly ready: readonly ReadyBead[];
  /** The host's pre-sampling legal support (legalSupport); every member must be a ready bead. */
  readonly support: readonly string[];
  /** ISO-8601 instant the host read Beads at; ages derive from it, never from a clock read here. */
  readonly now: string;
  readonly store: string;
  /** sha256 over the exact native ready bytes; the first observation revision. */
  readonly readyDigest: string;
  readonly extraRevisions?: readonly string[] | undefined;
  /** The host's attested position of this observation in its own sequence; covers every revision the snapshot carries. */
  readonly revisionOrder?: { readonly attestedBy: string; readonly ordinal: number } | undefined;
}
export interface SnapshotStats { readonly entities: number; readonly relationsKept: number; readonly relationsTotal: number; readonly support: number }

const SLOT = { kind: "scalar", dimension: 1, representation: "binary32", statuses: ["known", "unknown"] } as const;
/** The schema document gp reads (`gp graph check --schema`); schema.json in graph-policy/bead-scorer-v1 pins it with its digest. */
export const BEAD_GRAPH_SCHEMA = {
  schema: "graphpolicy.data.v1",
  version: "1.0.0",
  entityKinds: { bead: { features: { priority: SLOT, dependency_count: SLOT, dependent_count: SLOT, age_days: SLOT, is_task: SLOT, comment_count: SLOT } } },
  relationKinds: { depends_on: {
    features: { blocks: { kind: "scalar", dimension: 1, representation: "binary32", statuses: ["known"] } },
    roles: { dependent: { participantKinds: ["bead"], min: 1, max: 1 }, prerequisite: { participantKinds: ["bead"], min: 1, max: 1 } },
  } },
  candidateTypes: { beads: { kind: "entity-set", entityKind: "bead" } },
} as const;
export const BEAD_FEATURES = "priority,dependency_count,dependent_count,age_days,is_task,comment_count";

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value !== null && typeof value === "object") {
    return "{" + Object.keys(value as Record<string, unknown>).sort().map(key => JSON.stringify(key) + ":" + canonical((value as Record<string, unknown>)[key])).join(",") + "}";
  }
  return JSON.stringify(value);
}
/** `sha256:<hex>` over sorted-key JSON; the schema digest is over the document without its own `digest` member. */
export function sha256Canonical(value: unknown): string { return "sha256:" + createHash("sha256").update(canonical(value)).digest("hex"); }
export function sha256Bytes(bytes: string | Uint8Array): string { return "sha256:" + createHash("sha256").update(bytes).digest("hex"); }
export function beadSchemaDigest(): string { return sha256Canonical(BEAD_GRAPH_SCHEMA); }

const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
/** Narrow a parsed `bd ready --json` document to the consumed rows; anything else is BEADS_RESPONSE_INVALID. */
export function parseReadyBeads(document: unknown): ReadyBead[] {
  if (!Array.isArray(document)) throw new Error("BEADS_RESPONSE_INVALID: ready must return an issue array");
  const seen = new Set<string>();
  return document.map((row, index) => {
    if (!isRecord(row) || typeof row["id"] !== "string" || !row["id"].trim() || typeof row["status"] !== "string") {
      throw new Error("BEADS_RESPONSE_INVALID: ready row " + index + " lacks a string id and status");
    }
    if (seen.has(row["id"])) throw new Error("BEADS_RESPONSE_INVALID: duplicate ready id " + row["id"]);
    seen.add(row["id"]);
    const deps = row["dependencies"];
    return {
      id: row["id"], status: row["status"],
      issue_type: typeof row["issue_type"] === "string" ? row["issue_type"] : null,
      priority: typeof row["priority"] === "number" ? row["priority"] : null,
      created_at: typeof row["created_at"] === "string" ? row["created_at"] : null,
      dependency_count: typeof row["dependency_count"] === "number" ? row["dependency_count"] : null,
      dependent_count: typeof row["dependent_count"] === "number" ? row["dependent_count"] : null,
      comment_count: typeof row["comment_count"] === "number" ? row["comment_count"] : null,
      dependencies: Array.isArray(deps) ? deps.filter(isRecord).filter(d => typeof d["issue_id"] === "string" && typeof d["depends_on_id"] === "string")
        .map(d => ({ issue_id: d["issue_id"] as string, depends_on_id: d["depends_on_id"] as string, type: typeof d["type"] === "string" ? d["type"] : null })) : null,
    };
  });
}
/** The host mask: native-ready, status open, inside the operator allowlist and issue types when given. Order is native ready order. */
export function legalSupport(ready: readonly ReadyBead[], filter: SupportFilter = {}): string[] {
  const allow = filter.allow === undefined ? null : new Set(filter.allow);
  const types = filter.types === undefined ? null : new Set(filter.types);
  return ready
    .filter(bead => bead.status === "open")
    .filter(bead => allow === null || allow.has(bead.id))
    .filter(bead => types === null || (typeof bead.issue_type === "string" && types.has(bead.issue_type)))
    .map(bead => bead.id);
}
const known = (value: number): FeatureValue => ({ status: "known", value });
const UNKNOWN: FeatureValue = { status: "unknown" };
function finite(value: number | null | undefined): FeatureValue { return typeof value === "number" && Number.isFinite(value) ? known(value) : UNKNOWN; }
function ageDays(createdAt: string | null | undefined, now: string): FeatureValue {
  if (typeof createdAt !== "string") return UNKNOWN;
  const created = Date.parse(createdAt); const at = Date.parse(now);
  if (!Number.isFinite(created) || !Number.isFinite(at)) return UNKNOWN;
  return known(Math.max(0, Math.round(((at - created) / 86_400_000) * 1000) / 1000));
}
/** Build the snapshot. Throws GP_SUPPORT_OUTSIDE_SNAPSHOT when a support member is not a ready bead: legality never comes from this projection. */
export function buildBeadSnapshot(input: SnapshotInput): { readonly snapshot: BeadSnapshot; readonly stats: SnapshotStats } {
  if (!Number.isFinite(Date.parse(input.now))) throw new Error("GP_SNAPSHOT_INVALID: now must be an ISO-8601 instant");
  const ids = new Set(input.ready.map(bead => bead.id));
  for (const member of input.support) if (!ids.has(member)) throw new Error("GP_SUPPORT_OUTSIDE_SNAPSHOT: " + member + " is not a ready bead");
  if (new Set(input.support).size !== input.support.length) throw new Error("GP_SUPPORT_OUTSIDE_SNAPSHOT: duplicate support member");
  const entities: Entity[] = input.ready.map(bead => ({
    id: bead.id, kind: "bead",
    features: {
      priority: finite(bead.priority),
      dependency_count: finite(bead.dependency_count),
      dependent_count: finite(bead.dependent_count),
      age_days: ageDays(bead.created_at, input.now),
      is_task: typeof bead.issue_type === "string" ? known(bead.issue_type === "task" ? 1 : 0) : UNKNOWN,
      comment_count: finite(bead.comment_count),
    },
  }));
  const relations: Relation[] = []; let total = 0;
  for (const bead of input.ready) {
    for (const dep of bead.dependencies ?? []) {
      total += 1;
      if (!ids.has(dep.depends_on_id) || dep.issue_id !== bead.id) continue;
      const id = "dep:" + dep.issue_id + "->" + dep.depends_on_id;
      if (relations.some(relation => relation.id === id)) continue;
      relations.push({ id, kind: "depends_on", features: { blocks: known(dep.type === "blocks" ? 1 : 0) },
        incidences: [{ id: id + "#d", participant: dep.issue_id, role: "dependent" }, { id: id + "#p", participant: dep.depends_on_id, role: "prerequisite" }] });
    }
  }
  const revisions = ["bd-ready:" + input.readyDigest, ...(input.extraRevisions ?? [])];
  const snapshot: BeadSnapshot = {
    schema_ref: { namespace: "graphpolicy.data.v1", hash: beadSchemaDigest(), version: "1.0.0" },
    observation: {
      adapter: "mechanicalworkflows.development-rig.beads",
      revisions,
      ...(input.revisionOrder === undefined ? {} : { revision_order: { attested_by: input.revisionOrder.attestedBy, ordinal: input.revisionOrder.ordinal, covers: [...revisions] } }),
      scope: "beads://" + input.store + "#ready",
      extraction: { command: "bd --readonly --directory <store> ready --json --limit 0", features: BEAD_FEATURES, builder: "apps/development-rig/src/graph-policy-snapshot.ts" },
      timestamp: input.now,
      budget: { max_entities: 512 },
      completeness: { depends_on: { coverage: total === 0 ? 1 : relations.length / total, complete: relations.length === total } },
      slice: { kind: "snapshot" },
    },
    entities, relations,
    candidates: { beads: { type: "beads", members: [...input.support] } },
  };
  return { snapshot, stats: { entities: entities.length, relationsKept: relations.length, relationsTotal: total, support: input.support.length } };
}
