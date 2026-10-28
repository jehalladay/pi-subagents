/**
 * wb-0lf.2 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R2): the tables, the fixture projections, the reference exporter, its
 * mutants and the judge of the GP snapshot-export census, test/workbench-gp-snapshot-export-census.test.ts (its header states
 * the bead, the measured facts and every reading). Everything here is pure over the inputs it is handed: the fixtures are
 * real ObservationProjection instances built through the class's public methods, the reference exporter only reads them,
 * and so do its mutants except the A1 purity members, which write or edit the class on purpose (the judge refuses each
 * one and puts the class back); nothing here starts gp, fakes a GraphPolicyCLI binary, adds a dependency or implements a
 * Pi exporter.
 * The census's own reads compose the landed wb-e66.5 vocabulary reader and listers (test/helpers/gp-mw-coordination-census.ts),
 * the landed wb-gxd7.3 export reader (test/helpers/gp-snapshot-join-census.ts) and the landed docs binding
 * (docsSection/sectionTables of test/helpers/census.ts).
 */
import { isDeepStrictEqual } from "node:util";
import { NATIVE_CONTROL_ACTIONS } from "../../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation, type RelationKind } from "../../src/workbench/observation.js";
import { docsSection, sectionTables } from "./census.js";
import { namedWords } from "./gp-mw-coordination-census.js";
import { exportedNames } from "./gp-snapshot-join-census.js";

// ---- the GraphDataIR spellings this census reads (each one the vendored producer fixture's, asserted by the census) ----

/** The schema namespace of test/fixtures/gp-host-adapter-snapshot.json (schema_ref.namespace). */
export const GRAPH_NAMESPACE = "graphpolicy.data.v1";
/**
 * The M-NAMESPACE mutant's near miss, the next major of the same namespace. It is composed at run time so this file spells
 * no variant schema id: the landed wb-ojm5.1 census (test/workbench-gp-schema-identity-census.test.ts B2) refuses one in Pi
 * text, and assembles its own needles the same way (its R-COMPUTED).
 */
export const NEXT_MAJOR_NAMESPACE = GRAPH_NAMESPACE.replace(/1$/, "2");
/** The vendored fixture's explicit unknown feature: a status and no value member (entity task-3, feature priority). */
export const UNKNOWN_FEATURE = { status: "unknown" } as const;
/** The status a vendored feature carries beside its value. */
export const KNOWN_STATUS = "known";
/** The one feature the census reads on every entity: the node's coverage, known 1 for complete, explicit unknown otherwise. */
export const COVERAGE_FEATURE = "coverage";
/** A complete node's coverage feature (the vendored observation.completeness spells full coverage as the number 1). */
export const COMPLETE_FEATURE = { status: KNOWN_STATUS, value: 1 } as const;

// ---- the fixture projections ----

export type Coverage = "complete" | "partial" | "unknown";
export type Limit = "nodes" | "edges" | "bytes";
export const LIMITS: readonly Limit[] = ["nodes", "edges", "bytes"];

export interface NodeSpec {
  readonly ref: NativeRef;
  readonly type: Presentation["type"];
  readonly tone: Presentation["statusTone"];
  /** NativeSnapshot.coverage; omitted means the snapshot declared none. */
  readonly coverage?: Coverage;
  readonly sourceRevision?: string;
  readonly sourceVersion?: string;
  readonly subjectBasis?: string;
  /** markStale after the refresh (a failed native read). */
  readonly stale?: boolean;
}
export interface EdgeSpec {
  readonly from: NativeRef;
  readonly to: NativeRef;
  readonly kind: RelationKind;
  readonly source: string;
  readonly confirmation?: string;
}
export interface ScopeSpec {
  readonly id: string;
  readonly scope: ObservationScope;
  readonly nodes: readonly NodeSpec[];
  readonly edges: readonly EdgeSpec[];
}

const ref = (provider: string, type: string, id: string, scope?: string): NativeRef => (scope === undefined ? { provider, type, id } : { provider, type, id, scope });
const RUN = ref("furnace", "run", "frn-run-0001");
const ATTEMPT = ref("furnace", "attempt", "frn-atm-0001");
const SESSION = ref("claude-agent-sdk", "session", "sess-0001");
const BUILD = ref("forge", "command", "cmd_0123456789ab");
const DETACHED = ref("local-detached", "command", "det-0001", "host-a");
const ISSUE = ref("beads", "issue", "wb-zz9");
/** Related, never observed: the caller's scope holds an edge to it and no snapshot of it. */
const ARTIFACT = ref("forge", "artifact", "art-0001");
const OTHER_RUN = ref("furnace", "run", "frn-run-0002");

/** The verbatim forms the fixture's revisions and bases carry: padding and mixed case, and a decomposed accent. */
export const PADDED_REVISION = " sess-rev MiXeD ";
/** A provider the fixture holds no node of (the A1 connection members disconnect and reconnect it). */
export const UNHELD_PROVIDER = "hx";
/** A run id the projection refuses as an unsafe identity (U+202E, composed at run time): markStale logs a refusal and changes no node. */
export const UNSAFE_RUN_ID = `frn-run-${String.fromCodePoint(0x202e)}0009`;
export const DECOMPOSED_BASIS = `basis-cafe${String.fromCodePoint(0x301)}`;

/** The caller's scope A, two neighbours that share a native ref with it (B: same workspace; C: same principal) and an empty D. */
export const SCOPES: readonly ScopeSpec[] = [
  {
    id: "A",
    scope: { workspace: "ws-pi", principal: "operator-a" },
    nodes: [
      { ref: RUN, type: "workflow", tone: "active", coverage: "complete", sourceRevision: "frn-rev-0042", subjectBasis: "furnace:run/frn-run-0001@seq 7" },
      { ref: SESSION, type: "agent", tone: "waiting", coverage: "partial", sourceRevision: PADDED_REVISION, subjectBasis: DECOMPOSED_BASIS },
      { ref: BUILD, type: "sdk-operation", tone: "unknown", coverage: "unknown", sourceVersion: "forge-0.9.1", sourceRevision: "forge-rev-unread" },
      { ref: DETACHED, type: "sdk-operation", tone: "success" },
      { ref: ISSUE, type: "group", tone: "success", coverage: "complete", sourceRevision: "bd-export-3f2a", subjectBasis: "wb-zz9@2026-10-28" },
      { ref: ATTEMPT, type: "agent", tone: "failure", coverage: "complete", sourceRevision: "frn-rev-0043", subjectBasis: "furnace:attempt", stale: true },
    ],
    edges: [
      { from: RUN, to: SESSION, kind: "ownership", source: "furnace", confirmation: "frn-own-0001" },
      { from: RUN, to: BUILD, kind: "dependency", source: "furnace" },
      { from: SESSION, to: DETACHED, kind: "grouping", source: "claude-agent-sdk" },
      { from: BUILD, to: ARTIFACT, kind: "causation", source: "forge" },
      { from: ISSUE, to: RUN, kind: "hypothesis", source: "beads" },
    ],
  },
  {
    id: "B",
    scope: { workspace: "ws-pi", principal: "operator-b" },
    nodes: [
      { ref: RUN, type: "workflow", tone: "success", coverage: "complete", sourceRevision: "frn-rev-b-0001", subjectBasis: "furnace:run/b" },
      { ref: OTHER_RUN, type: "workflow", tone: "waiting", coverage: "partial", sourceRevision: "frn-rev-b-0002" },
    ],
    edges: [{ from: RUN, to: OTHER_RUN, kind: "dependency", source: "furnace" }],
  },
  {
    id: "C",
    scope: { workspace: "ws-other", principal: "operator-a" },
    nodes: [{ ref: SESSION, type: "agent", tone: "active", coverage: "complete", sourceRevision: "sess-rev-c", subjectBasis: "claude:c" }],
    edges: [],
  },
  { id: "D", scope: { workspace: "ws-pi", principal: "operator-d" }, nodes: [], edges: [] },
];

export const scopeSpec = (id: string): ScopeSpec => {
  const spec = SCOPES.find(entry => entry.id === id);
  if (spec === undefined) throw new Error(`no fixture scope ${id}`);
  return spec;
};

/** Every fixture read (the census's and the reference exporter's) asks for at most this many rows; the projections allow it. */
export const READ_LIMIT = 10_000;

/** A fresh projection holding every fixture scope, built through the public methods only (refresh, markStale, relate). */
export function buildProjection(): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: READ_LIMIT });
  let second = 0;
  const stamp = (): string => `2026-10-28T00:00:${String(second++).padStart(2, "0")}Z`;
  for (const spec of SCOPES) {
    for (const node of spec.nodes) {
      const at = stamp();
      const applied = projection.refresh({
        source: node.ref,
        scope: spec.scope,
        capturedAt: at,
        observedAt: at,
        node: { title: `${node.ref.type} ${node.ref.id}`, type: node.type, statusText: node.tone, statusTone: node.tone },
        ...(node.coverage === undefined ? {} : { coverage: node.coverage }),
        ...(node.sourceRevision === undefined ? {} : { sourceRevision: node.sourceRevision }),
        ...(node.sourceVersion === undefined ? {} : { sourceVersion: node.sourceVersion }),
        ...(node.subjectBasis === undefined ? {} : { subjectBasis: node.subjectBasis }),
      });
      if (applied !== "applied") throw new Error(`fixture refresh ${node.ref.id} in ${spec.id}: ${applied}`);
      if (node.stale === true) projection.markStale({ scope: spec.scope, ref: node.ref });
    }
    for (const edge of spec.edges) {
      projection.relate({
        scope: spec.scope,
        from: edge.from,
        to: edge.to,
        kind: edge.kind,
        provenance: { source: edge.source, observedAt: stamp(), ...(edge.confirmation === undefined ? {} : { nativeConfirmationRef: edge.confirmation }) },
      });
    }
  }
  return projection;
}

// ---- the truth: what the projection holds for a scope, read back through its own query and relationsPage ----

export interface TruthEntity {
  readonly key: string;
  readonly ref: NativeRef;
  /** false for an endpoint of a relation that no snapshot observed. */
  readonly observed: boolean;
  readonly completeness: Coverage;
  /** ObservedNode.sourceVersion (the projection's home for NativeSnapshot.sourceRevision), or null when it holds none. */
  readonly sourceRevision: string | null;
  readonly subjectBasis: string | null;
}
export interface TruthRelation {
  readonly from: string;
  readonly to: string;
  readonly kind: RelationKind;
}
export interface Truth {
  readonly scope: ObservationScope;
  readonly entities: readonly TruthEntity[];
  readonly relations: readonly TruthRelation[];
}

/** A projection key's parts: [workspace, principal, provider, type, native scope or "", id], or undefined when it is not one. */
export function keyParts(key: string): readonly string[] | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(key);
  } catch {
    return undefined;
  }
  return Array.isArray(parsed) && parsed.length === 6 && parsed.every(part => typeof part === "string") ? (parsed as string[]) : undefined;
}
/** The scope a key encodes. */
export function scopeOfKey(key: string): ObservationScope | undefined {
  const parts = keyParts(key);
  return parts === undefined ? undefined : { workspace: parts[0] ?? "", principal: parts[1] ?? "" };
}
/** The native ref a key encodes (its native scope only when non-empty). */
export function refOfKey(key: string): NativeRef | undefined {
  const parts = keyParts(key);
  return parts === undefined ? undefined : ref(parts[2] ?? "", parts[3] ?? "", parts[5] ?? "", parts[4] === "" ? undefined : parts[4]);
}

/** The scope's observed nodes and relations, and every relation endpoint no node holds, in the projection's read order. */
export function truthOf(projection: ObservationProjection, scope: ObservationScope): Truth {
  const read = projection.query({ scope, limit: READ_LIMIT });
  const page = projection.relationsPage({ scope, limit: READ_LIMIT });
  if (read.truncated || page.truncated) throw new Error("a fixture read was truncated");
  const entities: TruthEntity[] = read.nodes.map(node => ({
    key: node.key,
    ref: { ...node.nativeRef },
    observed: true,
    completeness: node.completeness,
    sourceRevision: node.sourceVersion ?? null,
    subjectBasis: node.subjectBasis ?? null,
  }));
  const relations: TruthRelation[] = page.relations.map(relation => ({ from: relation.from, to: relation.to, kind: relation.kind }));
  for (const relation of relations) {
    for (const key of [relation.from, relation.to]) {
      if (entities.some(entity => entity.key === key)) continue;
      const endpoint = refOfKey(key);
      if (endpoint === undefined) throw new Error(`unreadable relation key ${key}`);
      entities.push({ key, ref: endpoint, observed: false, completeness: "unknown", sourceRevision: null, subjectBasis: null });
    }
  }
  return { scope: { ...scope }, entities, relations };
}

// ---- purity: what a drive may do to the projection it is handed (A1) ----

/**
 * The projection's reads (src/workbench/observation.ts). Every other method a drive calls through its request counts against
 * it: each public write (ingest, refresh, markStale, disconnect, reconnect and relate today; an A1 member calls each one) and
 * any other member, inherited ones included (M-OTHER-CALL calls toString). A pure exporter calls none, not even one that
 * changes nothing.
 */
export const READ_METHODS: readonly string[] = ["aggregate", "aggregateStats", "events", "identityRefusals", "indexOf", "query", "relationRevision", "relations", "relationsPage", "stats", "truncation", "window"];

/** The projection a drive is handed: the fixture itself, behind a view that records each call of a method outside READ_METHODS. */
export function watched(projection: ObservationProjection, writes: string[]): ObservationProjection {
  return new Proxy(projection, {
    get(target, property) {
      const value: unknown = Reflect.get(target, property, target);
      if (typeof value !== "function") return value;
      const name = String(property);
      return (...args: unknown[]): unknown => {
        if (!READ_METHODS.includes(name)) writes.push(name);
        return Reflect.apply(value, target, args);
      };
    },
  });
}

/** The class's own members, its prototype's and its statics': a drive that edits ObservationProjection edits every instance and the twin alike. */
type ClassShape = readonly [PropertyDescriptorMap, PropertyDescriptorMap];
const classShape = (): ClassShape => [Object.getOwnPropertyDescriptors(ObservationProjection.prototype), Object.getOwnPropertyDescriptors(ObservationProjection)];
/** Put the class back as classShape read it (a drive's edit is judged once, never inherited by the next case). */
function restoreClass(shape: ClassShape): void {
  const targets = [ObservationProjection.prototype, ObservationProjection] as const;
  targets.forEach((target, index) => {
    const saved = shape[index] ?? {};
    for (const key of Reflect.ownKeys(target)) if (!Object.hasOwn(saved, key)) Reflect.deleteProperty(target, key);
    for (const key of Reflect.ownKeys(saved)) {
      const descriptor = saved[key];
      if (descriptor !== undefined) Object.defineProperty(target, key, descriptor);
    }
  });
}

// ---- the judged outcome ----

export interface ExportBudget {
  readonly maxNodes: number;
  readonly maxEdges: number;
  readonly maxBytes: number;
}
/** What a registered exporter's drive is handed: the caller's projection, its scope and the declared budget. */
export interface ExportRequest {
  readonly projection: ObservationProjection;
  readonly scope: ObservationScope;
  readonly budget: ExportBudget;
}
export interface TraceEntity {
  readonly key: string;
  readonly ref: NativeRef;
  readonly sourceRevision: string | null;
  readonly subjectBasis: string | null;
}
export interface TraceRelation {
  readonly from: string;
  readonly to: string;
  readonly kind: string;
}
/** The trace a drive reports beside the presented document: each element's projection key, never shown to gp. */
export interface ExportTrace {
  readonly scope: ObservationScope;
  readonly entities: Readonly<Record<string, TraceEntity>>;
  readonly relations: Readonly<Record<string, TraceRelation>>;
}
/** One candidate action the export lists, wherever the presented form carries it. */
export interface Candidate {
  readonly entity: string;
  readonly action: string;
}
export interface Exported {
  readonly ok: true;
  readonly graph: unknown;
  readonly trace: ExportTrace;
  readonly candidates: readonly Candidate[];
}
export const OVER_BUDGET_CODE = "export-over-budget";
/** The typed unavailable: the category is the capability registry's (CapabilityErrorCategory "unavailable"). */
export interface Refused {
  readonly ok: false;
  readonly category: "unavailable";
  readonly code: typeof OVER_BUDGET_CODE;
  readonly limit: Limit;
  readonly declared: number;
  readonly measured: number;
}
export type Drive = (request: ExportRequest) => unknown;

const BUDGET_FIELD: Readonly<Record<Limit, keyof ExportBudget>> = { nodes: "maxNodes", edges: "maxEdges", bytes: "maxBytes" };
const REFUSAL_KEYS = ["category", "code", "declared", "limit", "measured", "ok"];

/** The rules, in report order; a finding is its rule, one space, and what it found. */
export const RULES = [
  "outcome",
  "graphdatair",
  "trace",
  "scope",
  "native-ref",
  "relation",
  "truncated",
  "unknown-absent",
  "unknown-guessed",
  "coverage-known",
  "revision",
  "basis",
  "actions",
  "over-budget",
  "refusal",
  "refused-fitting",
  "impure",
] as const;
export type Rule = (typeof RULES)[number];
export const ruleOf = (finding: string): string => finding.split(" ", 1)[0] ?? "";
/** The distinct rules of a finding list, in RULES order. */
export const rulesOf = (findings: readonly string[]): string[] => RULES.filter(rule => findings.some(finding => ruleOf(finding) === rule));

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
/** The UTF-8 bytes of the presented document: compact JSON.stringify, the bytes an RPC call presents (wb-gxd7.3). */
export const presentedBytes = (graph: unknown): number => Buffer.byteLength(JSON.stringify(graph) ?? "", "utf8");
/** The admissible verbs for a producer: NATIVE_CONTROL_ACTIONS's own entry, none for any other producer. */
export const admissibleActions = (provider: string): readonly string[] => (Object.hasOwn(NATIVE_CONTROL_ACTIONS, provider) ? (NATIVE_CONTROL_ACTIONS[provider] ?? []) : []);

/** A GraphDataIR document in the vendored v1 shape: its namespace, entity and relation lists, one id space, incidences on entities. */
export function graphShapeFindings(graph: unknown): string[] {
  if (!isRecord(graph)) return ["graphdatair the document is not an object"];
  const findings: string[] = [];
  const schema = graph.schema_ref;
  if (!isRecord(schema) || schema.namespace !== GRAPH_NAMESPACE) findings.push(`graphdatair schema_ref.namespace is not ${GRAPH_NAMESPACE}`);
  if (!Array.isArray(graph.entities) || !Array.isArray(graph.relations)) return [...findings, "graphdatair entities and relations are not both lists"];
  const ids = new Map<string, number>();
  const seen = (id: unknown, where: string): void => {
    if (typeof id !== "string" || id === "") {
      findings.push(`graphdatair ${where} has no string id`);
      return;
    }
    ids.set(id, (ids.get(id) ?? 0) + 1);
  };
  const entityIds = new Set<string>();
  graph.entities.forEach((entity: unknown, index: number) => {
    if (!isRecord(entity) || typeof entity.kind !== "string" || !isRecord(entity.features)) findings.push(`graphdatair entities/${index} lacks a kind or a features object`);
    const id = isRecord(entity) ? entity.id : undefined;
    seen(id, `entities/${index}`);
    if (typeof id === "string") entityIds.add(id);
  });
  graph.relations.forEach((relation: unknown, index: number) => {
    if (!isRecord(relation) || typeof relation.kind !== "string" || !isRecord(relation.features) || !Array.isArray(relation.incidences)) {
      findings.push(`graphdatair relations/${index} lacks a kind, a features object or an incidence list`);
      return;
    }
    seen(relation.id, `relations/${index}`);
    (relation.incidences as unknown[]).forEach((incidence: unknown, position: number) => {
      const where = `relations/${index}/incidences/${position}`;
      seen(isRecord(incidence) ? incidence.id : undefined, where);
      if (!isRecord(incidence) || typeof incidence.participant !== "string" || !entityIds.has(incidence.participant)) findings.push(`graphdatair ${where} names no entity`);
    });
  });
  for (const [id, count] of ids) if (count > 1) findings.push(`graphdatair id ${id} is used ${count} times (one id space)`);
  return findings;
}

/** What the judge is handed: the caller's scope and budget, the exceeded limits the case declares, and the projection's truth. */
export interface JudgeCase {
  readonly scope: ObservationScope;
  readonly budget: ExportBudget;
  readonly over: readonly Limit[];
  readonly truth: Truth;
}

/** Judge one drive outcome against the truth; every finding names its rule. */
export function exportFindings(input: JudgeCase, outcome: unknown): string[] {
  if (!isRecord(outcome) || typeof outcome.ok !== "boolean") return ["outcome the drive returned neither an export nor a refusal"];
  if (outcome.ok === false) return refusalFindings(input, outcome);
  const findings: string[] = [];
  const over = new Set<Limit>(input.over);
  const graph = outcome.graph;
  findings.push(...graphShapeFindings(graph));
  if (!isRecord(graph) || !Array.isArray(graph.entities) || !Array.isArray(graph.relations)) return findings;
  const entities = (graph.entities as unknown[]).filter(isRecord);
  const relations = (graph.relations as unknown[]).filter(isRecord);
  if (entities.length > input.budget.maxNodes) over.add("nodes");
  if (relations.length > input.budget.maxEdges) over.add("edges");
  if (presentedBytes(graph) > input.budget.maxBytes) over.add("bytes");
  for (const limit of LIMITS) if (over.has(limit)) findings.push(`over-budget an export was admitted over the declared ${limit} budget`);
  const trace = outcome.trace;
  if (!isRecord(trace) || !isRecord(trace.entities) || !isRecord(trace.relations)) return [...findings, "trace the outcome carries no entity and relation trace"];
  if (!isDeepStrictEqual(trace.scope, input.scope)) findings.push("scope the trace names another scope than the caller's");
  const truthByKey = new Map(input.truth.entities.map(entity => [entity.key, entity] as const));
  const entityOfKey = new Map<string, string>();
  const tracedEntities = trace.entities;
  const tracedRelations = trace.relations;
  const entityIds = entities.map(entity => String(entity.id));
  for (const id of entityIds) if (!Object.hasOwn(tracedEntities, id)) findings.push(`trace entity ${id} has no trace entry`);
  for (const id of Object.keys(tracedEntities)) if (!entityIds.includes(id)) findings.push(`trace the trace entry ${id} names no entity`);
  for (const entity of entities) {
    const id = String(entity.id);
    const traced = tracedEntities[id];
    if (!isRecord(traced)) continue;
    const key = typeof traced.key === "string" ? traced.key : "";
    if (entityOfKey.has(key)) findings.push(`trace entities ${entityOfKey.get(key)} and ${id} trace one key`);
    else entityOfKey.set(key, id);
    const keyScope = scopeOfKey(key);
    const truth = truthByKey.get(key);
    if (keyScope !== undefined && !isDeepStrictEqual(keyScope, input.scope)) findings.push(`scope entity ${id} traces to a key of another scope`);
    else if (truth === undefined) findings.push(`native-ref entity ${id} traces to a key the scope neither observed nor related`);
    if (!isDeepStrictEqual(traced.ref, refOfKey(key))) findings.push(`native-ref entity ${id}'s ref is not the native ref its key encodes`);
    if (truth === undefined) continue;
    const features = isRecord(entity.features) ? entity.features : {};
    const coverage = Object.hasOwn(features, COVERAGE_FEATURE) ? features[COVERAGE_FEATURE] : undefined;
    if (truth.completeness !== "complete") {
      if (coverage === undefined) findings.push(`unknown-absent entity ${id} (${truth.completeness}) carries no ${COVERAGE_FEATURE} feature`);
      else if (!isDeepStrictEqual(coverage, UNKNOWN_FEATURE)) findings.push(`unknown-guessed entity ${id} (${truth.completeness}) carries ${JSON.stringify(coverage)}, not the explicit unknown`);
    } else if (!isDeepStrictEqual(coverage, COMPLETE_FEATURE)) findings.push(`coverage-known entity ${id} (complete) carries ${JSON.stringify(coverage) ?? "nothing"}`);
    if (!Object.hasOwn(traced, "sourceRevision") || traced.sourceRevision !== truth.sourceRevision) findings.push(`revision entity ${id} carries ${JSON.stringify(traced.sourceRevision)}, the projection holds ${JSON.stringify(truth.sourceRevision)}`);
    if (!Object.hasOwn(traced, "subjectBasis") || traced.subjectBasis !== truth.subjectBasis) findings.push(`basis entity ${id} carries ${JSON.stringify(traced.subjectBasis)}, the projection holds ${JSON.stringify(truth.subjectBasis)}`);
  }
  const relationIds = relations.map(relation => String(relation.id));
  for (const id of relationIds) if (!Object.hasOwn(tracedRelations, id)) findings.push(`trace relation ${id} has no trace entry`);
  for (const id of Object.keys(tracedRelations)) if (!relationIds.includes(id)) findings.push(`trace the trace entry ${id} names no relation`);
  const tracedTriples = new Map<string, string>();
  for (const relation of relations) {
    const id = String(relation.id);
    const traced = tracedRelations[id];
    if (!isRecord(traced)) continue;
    const triple = JSON.stringify([traced.from, traced.to, traced.kind]);
    if (tracedTriples.has(triple)) findings.push(`trace relations ${tracedTriples.get(triple)} and ${id} trace one projection relation`);
    else tracedTriples.set(triple, id);
    const from = typeof traced.from === "string" ? traced.from : "";
    const to = typeof traced.to === "string" ? traced.to : "";
    const outside = [from, to].some(key => {
      const keyScope = scopeOfKey(key);
      return keyScope !== undefined && !isDeepStrictEqual(keyScope, input.scope);
    });
    if (outside) findings.push(`scope relation ${id} traces to keys of another scope`);
    else if (!input.truth.relations.some(truth => truth.from === from && truth.to === to && truth.kind === traced.kind)) findings.push(`relation ${id} traces to no relation the projection holds for the scope`);
    const participants = Array.isArray(relation.incidences) ? (relation.incidences as unknown[]).map(incidence => (isRecord(incidence) ? incidence.participant : undefined)) : [];
    if (!outside && !isDeepStrictEqual(participants, [entityOfKey.get(from), entityOfKey.get(to)])) findings.push(`relation ${id}'s incidences are not its traced endpoints, from then to`);
  }
  for (const truth of input.truth.entities) if (!entityOfKey.has(truth.key)) findings.push(`truncated the ${truth.observed ? "observed node" : "related endpoint"} ${truth.ref.provider}/${truth.ref.id} is not exported`);
  for (const truth of input.truth.relations) if (!tracedTriples.has(JSON.stringify([truth.from, truth.to, truth.kind]))) findings.push(`truncated the ${truth.kind} relation ${refOfKey(truth.from)?.id ?? "?"} -> ${refOfKey(truth.to)?.id ?? "?"} is not exported`);
  findings.push(...actionFindings(entities, tracedEntities, truthByKey, outcome.candidates));
  return findings;
}

/** Candidate actions: exactly every exported entity's admissible verbs (NATIVE_CONTROL_ACTIONS by its producer), each once. */
function actionFindings(entities: readonly Record<string, unknown>[], traced: Record<string, unknown>, truthByKey: ReadonlyMap<string, TruthEntity>, candidates: unknown): string[] {
  if (!Array.isArray(candidates)) return ["actions the outcome lists no candidate actions"];
  const findings: string[] = [];
  const expected = new Set<string>();
  for (const entity of entities) {
    const id = String(entity.id);
    const entry = traced[id];
    const key = isRecord(entry) && typeof entry.key === "string" ? entry.key : "";
    const provider = truthByKey.get(key)?.ref.provider ?? (isRecord(entry) && isRecord(entry.ref) ? String(entry.ref.provider) : "");
    for (const action of admissibleActions(provider)) expected.add(JSON.stringify([id, action]));
  }
  const listed = new Set<string>();
  for (const candidate of candidates as unknown[]) {
    const pair = isRecord(candidate) ? JSON.stringify([candidate.entity, candidate.action]) : JSON.stringify(candidate);
    if (listed.has(pair)) findings.push(`actions ${pair} is listed twice`);
    listed.add(pair);
    if (!expected.has(pair)) findings.push(`actions ${pair} is not an admissible candidate`);
  }
  for (const pair of expected) if (!listed.has(pair)) findings.push(`actions ${pair} is admissible and not listed`);
  return findings;
}

/** A refusal: the typed unavailable over a limit the case exceeds, naming the declared budget and a measure past it, and nothing else. */
function refusalFindings(input: JudgeCase, outcome: Record<string, unknown>): string[] {
  const findings: string[] = [];
  if (input.over.length === 0) findings.push("refused-fitting the snapshot fits every declared budget and was refused");
  if (!isDeepStrictEqual(Object.keys(outcome).sort(), REFUSAL_KEYS)) findings.push(`refusal carries ${Object.keys(outcome).sort().join(",")}, not exactly ${REFUSAL_KEYS.join(",")}`);
  if (outcome.category !== "unavailable") findings.push(`refusal category ${String(outcome.category)} is not unavailable`);
  if (outcome.code !== OVER_BUDGET_CODE) findings.push(`refusal code ${String(outcome.code)} is not ${OVER_BUDGET_CODE}`);
  const limit = LIMITS.find(candidate => candidate === outcome.limit);
  if (limit === undefined) findings.push(`refusal limit ${String(outcome.limit)} is not one of ${LIMITS.join(", ")}`);
  else {
    if (input.over.length > 0 && !input.over.includes(limit)) findings.push(`refusal names the ${limit} budget, which the snapshot does not exceed`);
    if (outcome.declared !== input.budget[BUDGET_FIELD[limit]]) findings.push(`refusal declared ${String(outcome.declared)} is not the declared ${limit} budget`);
  }
  if (typeof outcome.measured !== "number" || !Number.isSafeInteger(outcome.measured) || typeof outcome.declared !== "number" || outcome.measured <= outcome.declared) findings.push("refusal measured is not a count past the declared budget");
  return findings;
}

// ---- the cases ----

export interface CaseRow {
  readonly id: string;
  readonly scope: string;
  readonly budget: ExportBudget;
  /** The limits the snapshot exceeds; empty when it fits. */
  readonly over: readonly Limit[];
}
const ROOMY: ExportBudget = { maxNodes: 64, maxEdges: 64, maxBytes: 1_048_576 };
export const CASES: readonly CaseRow[] = [
  { id: "K-FITS", scope: "A", budget: ROOMY, over: [] },
  { id: "K-OTHER-PRINCIPAL", scope: "B", budget: ROOMY, over: [] },
  { id: "K-OTHER-WORKSPACE", scope: "C", budget: ROOMY, over: [] },
  { id: "K-EMPTY", scope: "D", budget: ROOMY, over: [] },
  { id: "K-AT-BUDGET", scope: "A", budget: { maxNodes: 7, maxEdges: 5, maxBytes: 1_048_576 }, over: [] },
  { id: "K-NODES", scope: "A", budget: { maxNodes: 3, maxEdges: 64, maxBytes: 1_048_576 }, over: ["nodes"] },
  { id: "K-EDGES", scope: "A", budget: { maxNodes: 64, maxEdges: 2, maxBytes: 1_048_576 }, over: ["edges"] },
  { id: "K-BYTES", scope: "A", budget: { maxNodes: 64, maxEdges: 64, maxBytes: 256 }, over: ["bytes"] },
  { id: "K-ALL", scope: "A", budget: { maxNodes: 1, maxEdges: 1, maxBytes: 64 }, over: ["nodes", "edges", "bytes"] },
];
export const caseRow = (id: string): CaseRow => {
  const row = CASES.find(entry => entry.id === id);
  if (row === undefined) throw new Error(`no CASES row ${id}`);
  return row;
};
/** A case's judge input: the truth read from a fresh twin projection, never the one the drive is handed. */
export const judgeCaseOf = (row: CaseRow): JudgeCase => {
  const scope = scopeSpec(row.scope).scope;
  return { scope, budget: row.budget, over: row.over, truth: truthOf(buildProjection(), scope) };
};

/**
 * Drive twice, each time on a fresh projection behind watched(), judge the first outcome against the truth, then prove the
 * drive pure on four legs: it called no method outside READ_METHODS; it left the class (prototype and statics) as it was;
 * each projection it read is still deep-equal to a fresh twin (util.isDeepStrictEqual over every own field of the
 * instance, the connection map and the identity-refusal log among them); and the two outcomes are equal.
 */
export async function driveFindings(drive: Drive, row: CaseRow): Promise<string[]> {
  const scope = scopeSpec(row.scope).scope;
  const judged = judgeCaseOf(row);
  const shape = classShape();
  const writes: string[] = [];
  const run = async (target: ObservationProjection): Promise<{ readonly threw: false; readonly value: unknown } | { readonly threw: true; readonly value: string }> => {
    try {
      return { threw: false, value: await drive({ projection: watched(target, writes), scope, budget: row.budget }) };
    } catch (error) {
      return { threw: true, value: error instanceof Error ? error.message : String(error) };
    }
  };
  const read = [buildProjection(), buildProjection()] as const;
  const first = await run(read[0]);
  const second = await run(read[1]);
  const findings = first.threw ? [`outcome the drive threw: ${first.value}`] : exportFindings(judged, first.value);
  for (const name of new Set(writes)) findings.push(`impure the drive called the projection's ${name}, which is no read`);
  if (!isDeepStrictEqual(classShape(), shape)) {
    findings.push("impure a drive edited the ObservationProjection class");
    restoreClass(shape);
  }
  read.forEach((projection, index) => {
    if (!isDeepStrictEqual(projection, buildProjection())) findings.push(`impure drive ${index + 1} left the projection it read unlike a fresh twin`);
  });
  if (!isDeepStrictEqual(first, second)) findings.push("impure two drives over one fixture returned different outcomes");
  return findings;
}

// ---- the reference exporter and its mutants (one recipe field per mutant) ----

export interface Recipe {
  readonly foreignNode?: boolean;
  readonly foreignEdge?: boolean;
  readonly untraced?: boolean;
  readonly ghost?: boolean;
  readonly refSwap?: boolean;
  readonly edgeReversed?: boolean;
  readonly edgeKind?: boolean;
  readonly scopeStamp?: boolean;
  readonly dropNode?: boolean;
  readonly dropEdge?: boolean;
  readonly dropUnknown?: boolean;
  readonly coverageAbsent?: boolean;
  readonly coverageGuess?: "half" | "complete" | "value-null";
  readonly completeAsUnknown?: boolean;
  readonly revision?: "trim" | "lower" | "guess" | "swap";
  readonly basis?: "nfc" | "drop" | "empty";
  readonly actions?: "extra" | "missing" | "universal" | "unlisted" | "duplicate";
  readonly overBudget?: "truncate" | "admit" | "throw" | "untyped" | "wrong-limit" | "declared" | "partial";
  readonly refuseFitting?: boolean;
  readonly namespace?: boolean;
  readonly duplicateId?: boolean;
  readonly dangling?: boolean;
  readonly mutate?: boolean;
  readonly counter?: boolean;
  /** A padding member the judge reads only through the presented bytes. */
  readonly bloat?: boolean;
  /** Calls projection.disconnect on this provider before the reads. */
  readonly disconnect?: string;
  /** Calls projection.reconnect on this provider before the reads. */
  readonly reconnect?: string;
  /** Calls markStale on a run ref whose id is UNSAFE_RUN_ID: the projection logs an identity refusal and changes no node. */
  readonly refuseIdentity?: boolean;
  /** Calls markStale on a ref the caller's scope does not hold: a write that changes nothing. */
  readonly noopWrite?: boolean;
  /** Calls disconnect(UNHELD_PROVIDER) through the class prototype, around the request's view of the projection. */
  readonly bypassWrite?: boolean;
  /** Defines a member on the ObservationProjection prototype, which every instance and the twin share. */
  readonly classPatch?: boolean;
  /** Defines a static member on the ObservationProjection class itself. */
  readonly classStatic?: boolean;
  /** Calls one public write into the empty scope D (refresh a node, relate two refs, ingest an event), so the export is unchanged. */
  readonly writeIntoD?: "refresh" | "relate" | "ingest";
  /** Calls toString on the projection: an inherited member, outside READ_METHODS, that reads nothing and changes nothing. */
  readonly otherCall?: boolean;
  /** A second relation tracing the first one's projection relation. */
  readonly duplicateEdge?: boolean;
}

interface Built {
  readonly entities: { id: string; kind: string; features: Record<string, unknown> }[];
  readonly relations: { id: string; kind: string; features: Record<string, unknown>; incidences: { id: string; participant: string; role: string }[] }[];
  readonly traceEntities: Record<string, TraceEntity>;
  readonly traceRelations: Record<string, TraceRelation>;
  readonly providers: Map<string, string>;
}

const coverageOf = (completeness: Coverage, recipe: Recipe): Record<string, unknown> => {
  if (completeness === "complete") return recipe.completeAsUnknown === true ? { [COVERAGE_FEATURE]: { ...UNKNOWN_FEATURE } } : { [COVERAGE_FEATURE]: { ...COMPLETE_FEATURE } };
  if (recipe.coverageAbsent === true) return {};
  if (recipe.coverageGuess === "half") return { [COVERAGE_FEATURE]: { status: KNOWN_STATUS, value: 0.5 } };
  if (recipe.coverageGuess === "complete") return { [COVERAGE_FEATURE]: { ...COMPLETE_FEATURE } };
  if (recipe.coverageGuess === "value-null") return { [COVERAGE_FEATURE]: { ...UNKNOWN_FEATURE, value: null } };
  return { [COVERAGE_FEATURE]: { ...UNKNOWN_FEATURE } };
};
const revisionOf = (value: string | null, recipe: Recipe): string | null => {
  if (value === null) return recipe.revision === "guess" ? "unknown" : null;
  if (recipe.revision === "trim") return value.trim();
  if (recipe.revision === "lower") return value.toLowerCase();
  return value;
};
const basisOf = (value: string | null, recipe: Recipe): string | null => {
  if (value === null) return recipe.basis === "empty" ? "" : null;
  return recipe.basis === "nfc" ? value.normalize("NFC") : value;
};

/** The reference exporter: pure over the projection's own reads; each recipe field is one mutant's change. */
export function referenceExport(request: ExportRequest, recipe: Recipe = {}, nextId: (prefix: string, index: number) => string = (prefix, index) => `${prefix}${index + 1}`): Exported | Refused {
  const { projection, scope, budget } = request;
  if (recipe.disconnect !== undefined) projection.disconnect(recipe.disconnect);
  if (recipe.reconnect !== undefined) projection.reconnect(recipe.reconnect);
  if (recipe.refuseIdentity === true) projection.markStale({ scope, ref: ref("furnace", "run", UNSAFE_RUN_ID) });
  if (recipe.noopWrite === true) projection.markStale({ scope, ref: ref("furnace", "run", "frn-run-absent") });
  if (recipe.bypassWrite === true) ObservationProjection.prototype.disconnect.call(projection, UNHELD_PROVIDER);
  if (recipe.classPatch === true) Object.defineProperty(ObservationProjection.prototype, "exportedBy", { value: (): string => "pi", configurable: true, writable: true });
  if (recipe.classStatic === true) Object.defineProperty(ObservationProjection, "exportedBy", { value: "pi", configurable: true, writable: true });
  if (recipe.writeIntoD !== undefined) writeInto(projection, scopeSpec("D").scope, recipe.writeIntoD);
  if (recipe.otherCall === true) projection.toString();
  const truth = truthOf(projection, scope);
  let entities: TruthEntity[] = [...truth.entities];
  let relations: TruthRelation[] = [...truth.relations];
  const foreign = truthOf(projection, scopeSpec("B").scope);
  if (recipe.foreignNode === true) entities.push(foreign.entities[0] as TruthEntity);
  if (recipe.foreignEdge === true) {
    const edge = foreign.relations[0] as TruthRelation;
    relations.push(edge);
    for (const key of [edge.from, edge.to]) entities.push(foreign.entities.find(entity => entity.key === key) as TruthEntity);
  }
  if (recipe.dropUnknown === true) entities = entities.filter(entity => entity.completeness === "complete");
  if (recipe.dropNode === true) entities = entities.filter(entity => entity.key !== truth.entities.filter(candidate => candidate.observed).at(-1)?.key);
  if (recipe.dropEdge === true) relations = relations.slice(0, -1);
  const kept = new Set(entities.map(entity => entity.key));
  relations = relations.filter(relation => kept.has(relation.from) && kept.has(relation.to));
  if (recipe.revision === "swap" && entities.length > 1) {
    const [first, second] = [entities[0] as TruthEntity, entities[1] as TruthEntity];
    entities = [{ ...first, sourceRevision: second.sourceRevision }, { ...second, sourceRevision: first.sourceRevision }, ...entities.slice(2)];
  }
  const over = (limit: Limit, measured: number): Refused => ({ ok: false, category: "unavailable", code: OVER_BUDGET_CODE, limit, declared: budget[BUDGET_FIELD[limit]], measured });
  const built = buildGraph(entities, relations, recipe, nextId);
  const graph = graphOf(scope, budget, entities, built, recipe);
  const exceeded: [Limit, number][] = [];
  if (built.entities.length > budget.maxNodes) exceeded.push(["nodes", built.entities.length]);
  if (built.relations.length > budget.maxEdges) exceeded.push(["edges", built.relations.length]);
  if (presentedBytes(graph) > budget.maxBytes) exceeded.push(["bytes", presentedBytes(graph)]);
  const exported = (): Exported => ({ ok: true, graph, trace: { scope: recipe.scopeStamp === true ? { ...scopeSpec("B").scope } : { ...scope }, entities: built.traceEntities, relations: built.traceRelations }, candidates: candidatesOf(built, recipe) });
  const first = exceeded[0];
  let outcome: Exported | Refused;
  if (first === undefined) outcome = recipe.refuseFitting === true ? over("nodes", budget.maxNodes + 1) : exported();
  else if (recipe.overBudget === "admit") outcome = exported();
  else if (recipe.overBudget === "truncate") outcome = truncatedExport(request, recipe, nextId, truth);
  else if (recipe.overBudget === "throw") throw new Error(`the snapshot exceeds the ${first[0]} budget`);
  else if (recipe.overBudget === "untyped") outcome = { ...over(first[0], first[1]), category: "validation" } as unknown as Refused;
  else if (recipe.overBudget === "wrong-limit") outcome = over(LIMITS.find(limit => !exceeded.some(([name]) => name === limit)) ?? "nodes", first[1]);
  else if (recipe.overBudget === "declared") outcome = { ...over(first[0], first[1]), declared: 0 };
  else if (recipe.overBudget === "partial") outcome = { ...over(first[0], first[1]), graph } as unknown as Refused;
  else outcome = over(first[0], first[1]);
  if (recipe.mutate === true) projection.markStale({ scope, ref: (truth.entities[0] as TruthEntity).ref });
  return outcome;
}

/** One public write into a scope the caller does not read (the A1 write members). */
function writeInto(projection: ObservationProjection, scope: ObservationScope, write: "refresh" | "relate" | "ingest"): void {
  const at = "2026-10-28T00:30:00Z";
  const run = ref("furnace", "run", "frn-run-0009");
  if (write === "refresh") projection.refresh({ source: run, scope, capturedAt: at, observedAt: at, node: { title: "run frn-run-0009", type: "workflow", statusText: "active", statusTone: "active" } });
  else if (write === "relate") projection.relate({ scope, from: run, to: ref("forge", "command", "cmd_00000000aaaa"), kind: "dependency", provenance: { source: "furnace", observedAt: at } });
  else projection.ingest({ projectionEventId: "evt-0009", source: run, scope, observedAt: at, kind: "furnace.run.event" });
}

/** The over-budget truncation mutant: the first maxNodes observed nodes and the relations among them, admitted as an export. */
function truncatedExport(request: ExportRequest, recipe: Recipe, nextId: (prefix: string, index: number) => string, truth: Truth): Exported {
  const entities = truth.entities.slice(0, request.budget.maxNodes);
  const kept = new Set(entities.map(entity => entity.key));
  const relations = truth.relations.filter(relation => kept.has(relation.from) && kept.has(relation.to)).slice(0, request.budget.maxEdges);
  const built = buildGraph(entities, relations, recipe, nextId);
  return { ok: true, graph: graphOf(request.scope, request.budget, entities, built, recipe), trace: { scope: { ...request.scope }, entities: built.traceEntities, relations: built.traceRelations }, candidates: candidatesOf(built, recipe) };
}

function buildGraph(entities: readonly TruthEntity[], relations: readonly TruthRelation[], recipe: Recipe, nextId: (prefix: string, index: number) => string): Built {
  const built: Built = { entities: [], relations: [], traceEntities: {}, traceRelations: {}, providers: new Map() };
  const idOfKey = new Map<string, string>();
  entities.forEach((entity, index) => {
    const id = nextId("e", index);
    idOfKey.set(entity.key, id);
    built.entities.push({ id, kind: entity.observed ? "observed" : "related", features: coverageOf(entity.completeness, recipe) });
    const traced: TraceEntity = { key: entity.key, ref: { ...entity.ref }, sourceRevision: revisionOf(entity.sourceRevision, recipe), subjectBasis: basisOf(entity.subjectBasis, recipe) };
    built.traceEntities[id] = recipe.basis === "drop" ? ({ key: traced.key, ref: traced.ref, sourceRevision: traced.sourceRevision } as TraceEntity) : traced;
    built.providers.set(id, entity.ref.provider);
  });
  relations.forEach((relation, index) => {
    const id = nextId("r", index);
    const endpoints = [idOfKey.get(relation.from) ?? "", idOfKey.get(relation.to) ?? ""];
    const ordered = recipe.edgeReversed === true && index === 0 ? [...endpoints].reverse() : endpoints;
    built.relations.push({ id, kind: relation.kind, features: {}, incidences: ordered.map((participant, position) => ({ id: `${id}-${position === 0 ? "s" : "t"}`, participant, role: position === 0 ? "source" : "target" })) });
    built.traceRelations[id] = { from: relation.from, to: relation.to, kind: recipe.edgeKind === true && index === 0 ? (relation.kind === "dependency" ? "causation" : "dependency") : relation.kind };
  });
  const duplicated = built.relations[0];
  if (recipe.duplicateEdge === true && duplicated !== undefined) {
    built.relations.push({ ...duplicated, id: "r-duplicate", incidences: duplicated.incidences.map((incidence, position) => ({ ...incidence, id: `r-duplicate-${position === 0 ? "s" : "t"}` })) });
    built.traceRelations["r-duplicate"] = { ...(built.traceRelations[duplicated.id] as TraceRelation) };
  }
  if (recipe.untraced === true) built.entities.push({ id: "e-untraced", kind: "observed", features: { [COVERAGE_FEATURE]: { ...UNKNOWN_FEATURE } } });
  if (recipe.ghost === true) {
    const key = JSON.stringify(["ws-pi", "operator-a", "furnace", "run", "", "frn-run-ghost"]);
    built.entities.push({ id: "e-ghost", kind: "observed", features: { [COVERAGE_FEATURE]: { ...COMPLETE_FEATURE } } });
    built.traceEntities["e-ghost"] = { key, ref: refOfKey(key) as NativeRef, sourceRevision: null, subjectBasis: null };
    built.providers.set("e-ghost", "furnace");
  }
  const firstEntity = built.entities[0];
  if (recipe.refSwap === true && firstEntity !== undefined) {
    const traced = built.traceEntities[firstEntity.id] as TraceEntity;
    built.traceEntities[firstEntity.id] = { ...traced, ref: { ...traced.ref, provider: traced.ref.provider === "forge" ? "furnace" : "forge" } };
  }
  if (recipe.duplicateId === true && built.relations[0] !== undefined && firstEntity !== undefined) {
    const relation = built.relations[0];
    const traced = built.traceRelations[relation.id] as TraceRelation;
    delete built.traceRelations[relation.id];
    relation.id = firstEntity.id;
    built.traceRelations[firstEntity.id] = traced;
  }
  if (recipe.dangling === true && built.relations[0] !== undefined) {
    const incidence = built.relations[0].incidences[1];
    if (incidence !== undefined) incidence.participant = "e-missing";
  }
  return built;
}

function graphOf(scope: ObservationScope, budget: ExportBudget, entities: readonly TruthEntity[], built: Built, recipe: Recipe): Record<string, unknown> {
  const revisions = [...new Set(entities.map(entity => entity.sourceRevision).filter((value): value is string => value !== null))].sort();
  return {
    schema_ref: { namespace: recipe.namespace === true ? NEXT_MAJOR_NAMESPACE : GRAPH_NAMESPACE, version: "1.0.0" },
    observation: { adapter: "pi.workbench.observation", ...(recipe.bloat === true ? { extraction: { padding: "x".repeat(1_100_000) } } : {}), revisions, scope: `pi://${encodeURIComponent(scope.workspace)}/${encodeURIComponent(scope.principal)}`, budget: { max_entities: budget.maxNodes }, slice: { kind: "snapshot" } },
    entities: built.entities,
    relations: built.relations,
    candidates: {},
  };
}

function candidatesOf(built: Built, recipe: Recipe): Candidate[] {
  const candidates: Candidate[] = [];
  for (const entity of built.entities) {
    const provider = built.providers.get(entity.id) ?? "";
    let actions = [...admissibleActions(provider)];
    if (recipe.actions === "extra" && provider === "furnace") actions = [...actions, "kill"];
    if (recipe.actions === "missing" && provider === "local-detached") actions = actions.filter(action => action !== "shutdown");
    if (recipe.actions === "universal") actions = ["stop", "cancel", "interrupt"];
    if (recipe.actions === "unlisted" && provider === "beads") actions = ["close"];
    if (recipe.actions === "duplicate" && provider === "forge") actions = [...actions, ...actions];
    for (const action of actions) candidates.push({ entity: entity.id, action });
  }
  return candidates;
}

/** A drive over the reference exporter with one recipe; counter ids continue across calls (a non-deterministic exporter). */
export function recipeDrive(recipe: Recipe = {}): Drive {
  let issued = 0;
  const nextId = recipe.counter === true ? (prefix: string): string => `${prefix}${++issued}` : undefined;
  return request => referenceExport(request, recipe, nextId);
}

// ---- the mutants: each one recipe on one case, refused with exactly its rules, the reference conforming on the same case ----

export interface MutantRow {
  readonly id: string;
  /** The pin (QUOTES key) whose clause the mutant breaks. */
  readonly pin: string;
  readonly case: string;
  readonly recipe: Recipe;
  readonly expect: readonly Rule[];
}
export const MUTANTS: readonly MutantRow[] = [
  { id: "M-MUTATES", pin: "A1", case: "K-FITS", recipe: { mutate: true }, expect: ["impure"] },
  { id: "M-COUNTER-IDS", pin: "A1", case: "K-FITS", recipe: { counter: true }, expect: ["impure"] },
  { id: "M-DISCONNECT-UNHELD", pin: "A1", case: "K-FITS", recipe: { disconnect: UNHELD_PROVIDER }, expect: ["impure"] },
  { id: "M-RECONNECT-UNHELD", pin: "A1", case: "K-FITS", recipe: { reconnect: UNHELD_PROVIDER }, expect: ["impure"] },
  { id: "M-IDENTITY-REFUSAL", pin: "A1", case: "K-FITS", recipe: { refuseIdentity: true }, expect: ["impure"] },
  { id: "M-DISCONNECT-HELD", pin: "A1", case: "K-FITS", recipe: { disconnect: "beads" }, expect: ["impure"] },
  { id: "M-WRITE-NOOP", pin: "A1", case: "K-FITS", recipe: { noopWrite: true }, expect: ["impure"] },
  { id: "M-BYPASS-WRITE", pin: "A1", case: "K-FITS", recipe: { bypassWrite: true }, expect: ["impure"] },
  { id: "M-CLASS-PATCH", pin: "A1", case: "K-FITS", recipe: { classPatch: true }, expect: ["impure"] },
  { id: "M-CLASS-STATIC", pin: "A1", case: "K-FITS", recipe: { classStatic: true }, expect: ["impure"] },
  { id: "M-REFRESH-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "refresh" }, expect: ["impure"] },
  { id: "M-RELATE-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "relate" }, expect: ["impure"] },
  { id: "M-INGEST-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "ingest" }, expect: ["impure"] },
  { id: "M-OTHER-CALL", pin: "A1", case: "K-FITS", recipe: { otherCall: true }, expect: ["impure"] },
  { id: "M-NAMESPACE", pin: "A2", case: "K-FITS", recipe: { namespace: true }, expect: ["graphdatair"] },
  { id: "M-DUPLICATE-ID", pin: "A2", case: "K-FITS", recipe: { duplicateId: true }, expect: ["graphdatair"] },
  { id: "M-DANGLING", pin: "A2", case: "K-FITS", recipe: { dangling: true }, expect: ["graphdatair", "relation"] },
  { id: "M-UNTRACED", pin: "A4", case: "K-FITS", recipe: { untraced: true }, expect: ["trace"] },
  { id: "M-GHOST", pin: "A4", case: "K-FITS", recipe: { ghost: true }, expect: ["native-ref"] },
  { id: "M-REF-SWAP", pin: "A4", case: "K-FITS", recipe: { refSwap: true }, expect: ["native-ref"] },
  { id: "M-EDGE-REVERSED", pin: "A4", case: "K-FITS", recipe: { edgeReversed: true }, expect: ["relation"] },
  { id: "M-EDGE-KIND", pin: "A4", case: "K-FITS", recipe: { edgeKind: true }, expect: ["relation", "truncated"] },
  { id: "M-FOREIGN-NODE", pin: "A5", case: "K-FITS", recipe: { foreignNode: true }, expect: ["scope"] },
  { id: "M-FOREIGN-EDGE", pin: "A5", case: "K-FITS", recipe: { foreignEdge: true }, expect: ["scope"] },
  { id: "M-SCOPE-STAMP", pin: "A5", case: "K-FITS", recipe: { scopeStamp: true }, expect: ["scope"] },
  { id: "M-COMPLETE-AS-UNKNOWN", pin: "B1", case: "K-FITS", recipe: { completeAsUnknown: true }, expect: ["coverage-known"] },
  { id: "M-COVERAGE-ABSENT", pin: "B2", case: "K-FITS", recipe: { coverageAbsent: true }, expect: ["unknown-absent"] },
  { id: "M-DROP-UNKNOWN", pin: "B2", case: "K-FITS", recipe: { dropUnknown: true }, expect: ["truncated"] },
  { id: "M-COVERAGE-HALF", pin: "B3", case: "K-FITS", recipe: { coverageGuess: "half" }, expect: ["unknown-guessed"] },
  { id: "M-COVERAGE-COMPLETE", pin: "B3", case: "K-FITS", recipe: { coverageGuess: "complete" }, expect: ["unknown-guessed"] },
  { id: "M-COVERAGE-VALUE-NULL", pin: "B3", case: "K-FITS", recipe: { coverageGuess: "value-null" }, expect: ["unknown-guessed"] },
  { id: "M-REVISION-TRIM", pin: "C1", case: "K-FITS", recipe: { revision: "trim" }, expect: ["revision"] },
  { id: "M-REVISION-LOWER", pin: "C1", case: "K-FITS", recipe: { revision: "lower" }, expect: ["revision"] },
  { id: "M-REVISION-GUESS", pin: "C1", case: "K-FITS", recipe: { revision: "guess" }, expect: ["revision"] },
  { id: "M-REVISION-SWAP", pin: "C1", case: "K-FITS", recipe: { revision: "swap" }, expect: ["revision"] },
  { id: "M-BASIS-NFC", pin: "C2", case: "K-FITS", recipe: { basis: "nfc" }, expect: ["basis"] },
  { id: "M-BASIS-DROP", pin: "C2", case: "K-FITS", recipe: { basis: "drop" }, expect: ["basis"] },
  { id: "M-BASIS-EMPTY", pin: "C2", case: "K-FITS", recipe: { basis: "empty" }, expect: ["basis"] },
  { id: "M-ACTION-EXTRA", pin: "D1", case: "K-FITS", recipe: { actions: "extra" }, expect: ["actions"] },
  { id: "M-ACTION-MISSING", pin: "D1", case: "K-FITS", recipe: { actions: "missing" }, expect: ["actions"] },
  { id: "M-ACTION-UNIVERSAL", pin: "D1", case: "K-FITS", recipe: { actions: "universal" }, expect: ["actions"] },
  { id: "M-ACTION-UNLISTED", pin: "D1", case: "K-FITS", recipe: { actions: "unlisted" }, expect: ["actions"] },
  { id: "M-ACTION-DUPLICATE", pin: "D1", case: "K-FITS", recipe: { actions: "duplicate" }, expect: ["actions"] },
  { id: "M-NODES-TRUNCATE", pin: "E1", case: "K-NODES", recipe: { overBudget: "truncate" }, expect: ["truncated", "over-budget"] },
  { id: "M-NODES-ADMIT", pin: "E1", case: "K-NODES", recipe: { overBudget: "admit" }, expect: ["over-budget"] },
  { id: "M-NODES-OVERFLOW", pin: "E1", case: "K-AT-BUDGET", recipe: { ghost: true, overBudget: "admit" }, expect: ["native-ref", "over-budget"] },
  { id: "M-EDGES-TRUNCATE", pin: "E2", case: "K-EDGES", recipe: { overBudget: "truncate" }, expect: ["truncated", "over-budget"] },
  { id: "M-EDGES-ADMIT", pin: "E2", case: "K-EDGES", recipe: { overBudget: "admit" }, expect: ["over-budget"] },
  { id: "M-EDGES-OVERFLOW", pin: "E2", case: "K-AT-BUDGET", recipe: { duplicateEdge: true, overBudget: "admit" }, expect: ["trace", "over-budget"] },
  { id: "M-BYTES-ADMIT", pin: "E3", case: "K-BYTES", recipe: { overBudget: "admit" }, expect: ["over-budget"] },
  { id: "M-BYTES-BLOAT", pin: "E3", case: "K-FITS", recipe: { bloat: true, overBudget: "admit" }, expect: ["over-budget"] },
  { id: "M-OVER-THROW", pin: "E4", case: "K-NODES", recipe: { overBudget: "throw" }, expect: ["outcome"] },
  { id: "M-OVER-UNTYPED", pin: "E4", case: "K-NODES", recipe: { overBudget: "untyped" }, expect: ["refusal"] },
  { id: "M-OVER-WRONG-LIMIT", pin: "E4", case: "K-NODES", recipe: { overBudget: "wrong-limit" }, expect: ["refusal"] },
  { id: "M-OVER-DECLARED", pin: "E4", case: "K-EDGES", recipe: { overBudget: "declared" }, expect: ["refusal"] },
  { id: "M-OVER-PARTIAL", pin: "E4", case: "K-BYTES", recipe: { overBudget: "partial" }, expect: ["refusal"] },
  { id: "M-REFUSE-FITTING", pin: "E4", case: "K-FITS", recipe: { refuseFitting: true }, expect: ["refused-fitting"] },
  { id: "M-DROP-NODE", pin: "F1", case: "K-FITS", recipe: { dropNode: true }, expect: ["truncated"] },
  { id: "M-DROP-EDGE", pin: "F1", case: "K-FITS", recipe: { dropEdge: true }, expect: ["truncated"] },
];

// ---- the registration of a src exporter (the live leg) ----

/** The landed wb-e66.5 vocabulary words a GraphDataIR exporter names: its V1 and V2. */
export const SITE_WORDS: readonly string[] = ["GraphPolicy", "GraphDataIR"];
export const siteWords = (text: string): string[] => namedWords(text).filter(word => SITE_WORDS.includes(word));

export interface SiteEntry {
  readonly file: string;
  /** The exporter function the module exports. */
  readonly exporter: string;
}
/**
 * Judge the registration of a tree: S-UNREGISTERED (a module naming a site word with no registration), S-DUPLICATE, S-STALE (a
 * registration whose module names no site word) and S-UNEXPORTED (a registration whose module does not export its exporter).
 */
export function siteFindings(sites: readonly SiteEntry[], texts: ReadonlyMap<string, string>): string[] {
  const findings: string[] = [];
  const registered = new Map<string, number>();
  for (const site of sites) registered.set(site.file, (registered.get(site.file) ?? 0) + 1);
  for (const [file, text] of [...texts].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))) {
    const words = siteWords(text);
    if (words.length > 0 && !registered.has(file)) findings.push(`S-UNREGISTERED ${file} names ${words.join(", ")} with no EXPORT_SITES registration`);
  }
  for (const [file, count] of registered) if (count > 1) findings.push(`S-DUPLICATE ${file} is registered ${count} times`);
  for (const site of sites) {
    const text = texts.get(site.file);
    if (text === undefined || siteWords(text).length === 0) findings.push(`S-STALE ${site.file} is registered but names no site word`);
    if (text === undefined || !exportedNames(site.file, text).includes(site.exporter)) findings.push(`S-UNEXPORTED ${site.file} does not export ${site.exporter}`);
  }
  return findings;
}

const PLANTED_EXPORTER = 'export function exportSnapshot(): unknown {\n  return { schema_ref: { namespace: "graphpolicy.data.v1" } };\n}\n';
export interface SiteCase {
  readonly id: string;
  readonly files: Readonly<Record<string, string>>;
  readonly sites: readonly SiteEntry[];
  readonly expect: readonly string[];
}
export const SITE_CASES: readonly SiteCase[] = [
  { id: "S-REGISTERED", files: { "src/workbench/gp-export.ts": PLANTED_EXPORTER }, sites: [{ file: "src/workbench/gp-export.ts", exporter: "exportSnapshot" }], expect: [] },
  { id: "S-UNREGISTERED", files: { "src/workbench/gp-export.ts": PLANTED_EXPORTER }, sites: [], expect: ["S-UNREGISTERED"] },
  { id: "S-STALE", files: { "src/workbench/gp-export.ts": "export function exportSnapshot(): unknown {\n  return {};\n}\n" }, sites: [{ file: "src/workbench/gp-export.ts", exporter: "exportSnapshot" }], expect: ["S-STALE"] },
  {
    id: "S-DUPLICATE",
    files: { "src/workbench/gp-export.ts": PLANTED_EXPORTER },
    sites: [
      { file: "src/workbench/gp-export.ts", exporter: "exportSnapshot" },
      { file: "src/workbench/gp-export.ts", exporter: "exportSnapshot" },
    ],
    expect: ["S-DUPLICATE"],
  },
  { id: "S-UNEXPORTED", files: { "src/workbench/gp-export.ts": PLANTED_EXPORTER }, sites: [{ file: "src/workbench/gp-export.ts", exporter: "exportGraph" }], expect: ["S-UNEXPORTED"] },
];
/** The spellings the composed reader reads as a site word, and Pi words it must not. */
export const SITE_WORD_HITS: readonly string[] = ["GraphDataIR", "graph_data_ir", "graph-data-ir", "graphpolicy.data.v1", "GraphPolicyCLI", "graph-policy-cli", "toGraphDataIR"];
export const SITE_WORD_QUIET: readonly string[] = ["ObservationProjection", "graph", "policy", "GraphQL", "graphDataIndex", "dataflow graph", "MicroPolicy", "mw.training-export"];

// ---- the absence readers of D3 and G2, each proven live by a planted positive read in the same call ----

/** A typed executor request named in a module: "executor request" in any case, joined by nothing, a space, "_" or "-" (D3). */
export const EXECUTOR_REQUEST = /executor[ _-]?request/i;
/** D3's reader: the modules whose text names a typed executor request, in listing order. */
export const executorRequestNamers = (texts: ReadonlyMap<string, string>): string[] => [...texts].filter(([, text]) => EXECUTOR_REQUEST.test(text)).map(([path]) => path);
/** G2's reader: the files whose text names the GraphDataIR namespace, in listing order. */
export const namespaceNamers = (texts: ReadonlyMap<string, string>): string[] => [...texts].filter(([, text]) => text.includes(GRAPH_NAMESPACE)).map(([path]) => path);
/** D3's planted positive: a src module declaring a typed executor request, read after the tracked modules. */
export const PLANTED_EXECUTOR_REQUEST = { path: "src/workbench/zz-executor-request.ts", text: "export interface ExecutorRequest {\n  readonly executor: string;\n}\n" } as const;
/** G2's planted positive: a qa script naming the namespace, read after the tracked files. */
export const PLANTED_NAMESPACE = { path: "qa/zz-gp-namespace.mjs", text: `export const NAMESPACE = "${GRAPH_NAMESPACE}";\n` } as const;
/** The spellings D3's reader reads (each one's match is in D3's witness), and near spellings outside its reading (pinned quiet). */
export const EXECUTOR_REQUEST_HITS: readonly string[] = ["ExecutorRequest", "executor request", "executor_request", "executor-request", "EXECUTOR_REQUEST", "typedExecutorRequests"];
export const EXECUTOR_REQUEST_QUIET: readonly string[] = ["executor.request", "ExecRequest", "executorsRequest", "request executor"];

// ---- docs/workbench/03's two GraphPolicyCLI sentences (G3) ----

/** The page's level-1 title (its em dash composed at run time, so this file stays ASCII): the parent path of both sections. */
export const DOCS_03_TITLE = `03 ${String.fromCodePoint(0x2014)} High-level architecture, module ownership and dataflow`;
export const OWNERSHIP_HEADING = "Ownership boundaries";
export const BOUNDARY_HEADING = "GraphPolicyCLI boundary";
/** The ownership table's owner cell (its second column, "Authoritative owner") on GraphPolicyCLI's row. */
export const GP_OWNER = "GraphPolicyCLI";
/** The first clause ("; "-cut) of that row's third cell ("Workbench may do"). */
export const OWNERSHIP_CELL = "nothing today (no gp seam is registered)";
export const BOUNDARY_SENTENCE = "Pi carries no GraphPolicyCLI (gp) integration today.";

/** What G3 read: the ownership row (how many GraphPolicyCLI rows, the one row's first clause) and the boundary section's opening. */
export interface Docs03Reading {
  readonly ownership: { readonly refused: string | null; readonly rows: number; readonly cell: string | null };
  readonly boundary: { readonly refused: string | null; readonly first: string | null; readonly opening: string | null };
}
/** The docs rules, in report order; a finding is its rule, one space, and what it found. */
export const DOCS_RULES = ["ownership-bound", "ownership-rows", "ownership-cell", "boundary-bound", "boundary-first", "boundary-opening"] as const;

/** A rendered paragraph's first sentence: its text up to the first ". ", or the whole text. */
const firstSentence = (text: string): string => {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
};
/**
 * G3's reading of docs/03 through the landed docs binding (test/helpers/census.ts): ONE binding per heading, each heading once
 * in the rendered view under the page title. The ownership rows are sectionTables' cells of the Ownership boundaries
 * section only (every table row whose owner cell is GraphPolicyCLI); the opening is the first sentence of the boundary
 * section's first rendered block (an HTML block renders nothing, so it is passed over) when that block is a paragraph.
 */
export function docs03Reading(page: string): Docs03Reading {
  const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [DOCS_03_TITLE]);
  const rows = tables.grids.flatMap(grid => grid.slice(1).filter(cells => cells[1] === GP_OWNER));
  const row = rows.length === 1 ? rows[0] : undefined;
  const section = docsSection(page, BOUNDARY_HEADING, 2, [DOCS_03_TITLE]);
  const first = section.blocks.find(block => block.kind !== "html");
  return {
    ownership: { refused: tables.ok ? null : tables.why, rows: rows.length, cell: row === undefined ? null : ((row[2] ?? "").split("; ")[0] ?? "") },
    boundary: { refused: section.ok ? null : section.why, first: first?.kind ?? null, opening: first?.kind === "paragraph" ? firstSentence(first.text) : null },
  };
}

/** Judge a reading: exactly one GraphPolicyCLI ownership row registering no gp seam, and a boundary section opening with the sentence. */
export function docs03Findings(reading: Docs03Reading): string[] {
  const findings: string[] = [];
  const { ownership, boundary } = reading;
  if (ownership.refused !== null) findings.push(`ownership-bound ${ownership.refused}`);
  else if (ownership.rows !== 1) findings.push(`ownership-rows the ${OWNERSHIP_HEADING} section holds ${ownership.rows} ${GP_OWNER} rows, not one`);
  else if (ownership.cell !== OWNERSHIP_CELL) findings.push(`ownership-cell the ${GP_OWNER} row's Workbench cell opens ${JSON.stringify(ownership.cell)}, not ${JSON.stringify(OWNERSHIP_CELL)}`);
  if (boundary.refused !== null) findings.push(`boundary-bound ${boundary.refused}`);
  else if (boundary.first !== "paragraph") findings.push(`boundary-first the ${BOUNDARY_HEADING} section's first rendered block is ${boundary.first ?? "nothing"}, not a paragraph`);
  else if (boundary.opening !== BOUNDARY_SENTENCE) findings.push(`boundary-opening the ${BOUNDARY_HEADING} section opens ${JSON.stringify(boundary.opening)}, not ${JSON.stringify(BOUNDARY_SENTENCE)}`);
  return findings;
}

/** One in-memory edit of the live page, read by the same reader; expect is the docs rules it is refused with, in order. */
export interface DocsPlant {
  readonly id: string;
  readonly edit: (page: string) => string;
  readonly expect: readonly string[];
}
/** Replace the one occurrence of old (a plant needs its anchor exactly once on the page). */
function onceIn(page: string, old: string, replacement: string): string {
  const at = page.indexOf(old);
  if (at === -1 || page.indexOf(old, at + 1) !== -1) throw new Error(`a docs plant needs exactly one ${JSON.stringify(old.slice(0, 60))} on the page`);
  return `${page.slice(0, at)}${replacement}${page.slice(at + old.length)}`;
}
/** Replace the one line containing anchor with the lines of make(line). */
function lineIn(page: string, anchor: string, make: (line: string) => readonly string[]): string {
  const lines = page.split("\n");
  const at = lines.flatMap((line, index) => (line.includes(anchor) ? [index] : []));
  if (at.length !== 1) throw new Error(`a docs plant needs exactly one line holding ${JSON.stringify(anchor.slice(0, 60))}`);
  const index = at[0] ?? 0;
  return [...lines.slice(0, index), ...make(lines[index] ?? ""), ...lines.slice(index + 1)].join("\n");
}
const ROW_ANCHOR = `| ${GP_OWNER} | ${OWNERSHIP_CELL}`;
const SEAM_CELL = `| ${GP_OWNER} | the gp seam at src/workbench/gp-seam.ts`;
const seamRow = (page: string): string => onceIn(page, ROW_ANCHOR, SEAM_CELL);
export const DOCS_PLANTS: readonly DocsPlant[] = [
  // Refusal #1's five falsifiers (U1), each read conforming by the refused cut's raw-line reading.
  { id: "D-MOVE", edit: page => onceIn(onceIn(page, `${BOUNDARY_SENTENCE} `, ""), `\n## ${BOUNDARY_HEADING}\n`, `\n${BOUNDARY_SENTENCE}\n\n## ${BOUNDARY_HEADING}\n`), expect: ["boundary-opening"] },
  { id: "D-LEAD", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\nPi carries a GraphPolicyCLI (gp) seam at src/workbench/gp-seam.ts.\n\n`), expect: ["boundary-opening"] },
  { id: "D-COMMENT", edit: page => lineIn(page, BOUNDARY_SENTENCE, line => ["<!--", line, "-->"]), expect: ["boundary-first"] },
  { id: "D-FENCE", edit: page => lineIn(page, BOUNDARY_SENTENCE, line => ["```", line, "```"]), expect: ["boundary-first"] },
  {
    id: "D-ROW-DUP",
    edit: page => onceIn(seamRow(page), `\n## ${OWNERSHIP_HEADING}\n`, `\n| Legacy concern | Owner | Note |\n| --- | --- | --- |\n| Legacy scores | ${GP_OWNER} | ${OWNERSHIP_CELL} |\n\n## ${OWNERSHIP_HEADING}\n`),
    expect: ["ownership-cell"],
  },
  // Its two controls, in-place edits of what G3 reads.
  { id: "D-CELL-ONLY", edit: seamRow, expect: ["ownership-cell"] },
  { id: "D-SENTENCE-EDIT", edit: page => onceIn(page, BOUNDARY_SENTENCE, "Pi carries no GraphPolicyCLI (gp) integration today, except src/workbench/gp-seam.ts."), expect: ["boundary-opening"] },
  // Same view and heading uniqueness: a decoy row in the same table, a second section under either heading, a re-homed section.
  { id: "D-ROW-SAME-TABLE", edit: page => lineIn(page, ROW_ANCHOR, line => [`| Decoy scores | ${GP_OWNER} | ${OWNERSHIP_CELL} |`, onceIn(line, ROW_ANCHOR, SEAM_CELL)]), expect: ["ownership-rows"] },
  { id: "D-OWNERSHIP-DUP", edit: page => `${page.trimEnd()}\n\n## ${OWNERSHIP_HEADING}\n\n| Concern | Owner | Note |\n| --- | --- | --- |\n| Scores | ${GP_OWNER} | ${OWNERSHIP_CELL} |\n`, expect: ["ownership-bound"] },
  { id: "D-HEADING-DUP", edit: page => `${page.trimEnd()}\n\n## ${BOUNDARY_HEADING}\n\n${BOUNDARY_SENTENCE}\n`, expect: ["boundary-bound"] },
  { id: "D-REHOME", edit: page => onceIn(page, `\n## ${BOUNDARY_HEADING}\n`, `\n# Appendix\n\n## ${BOUNDARY_HEADING}\n`), expect: ["boundary-bound"] },
  // Quiet: an HTML comment block renders nothing, so a reader of the section still meets the sentence first.
  { id: "D-COMMENT-ABOVE", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n<!-- an editor's note -->\n\n`), expect: [] },
];

// ---- the judged rows (rule 16) ----

export interface Row {
  readonly id: string;
  /** An acceptance clause verbatim (A-F), a slice of the statement (G) or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
export const QUOTES: Readonly<Record<string, string>> = {
  A1: "a pure exporter test",
  A2: "builds GraphDataIR",
  A3: "from an ObservationProjection fixture",
  A4: "and asserts every node and edge traces to a native ref",
  A5: "inside the caller's scope",
  B1: "coverage partial/unknown rows export as explicit unknown",
  B2: "never absent",
  B3: "never a guessed value",
  C1: "sourceRevision",
  C2: "subjectBasis",
  C3: "are carried verbatim",
  D1: "candidate actions are exactly the host's admissible set",
  D2: "NATIVE_CONTROL_ACTIONS at control.ts:30-37",
  D3: "or typed executor requests",
  E1: "and a snapshot over the declared node",
  E2: "edge",
  E3: "byte budget",
  E4: "is refused with a typed unavailable",
  F1: "never truncated silently",
  G1: "When Pi exports a request to GraphPolicyCLI",
  G2: "artifact: released GraphDataIR schema",
  G3: "an owner-decided Pi decision point",
  Q1: "R-UNNAMED",
  Q2: "R-COMPOSED",
  Q3: "R-SCHEMA",
  Q4: "R-LABELS",
  Q5: "R-SNAPSHOT-REVISIONS",
};
export const ROWS: readonly Row[] = [
  { id: "A", label: "a pure exporter test builds GraphDataIR from an ObservationProjection fixture and asserts every node and edge traces to a native ref inside the caller's scope", pins: ["A1", "A2", "A3", "A4", "A5"] },
  { id: "B", label: "coverage partial/unknown rows export as explicit unknown (never absent, never a guessed value)", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "sourceRevision/subjectBasis are carried verbatim", pins: ["C1", "C2", "C3"] },
  { id: "D", label: "candidate actions are exactly the host's admissible set (NATIVE_CONTROL_ACTIONS at control.ts:30-37 or typed executor requests)", pins: ["D1", "D2", "D3"] },
  { id: "E", label: "and a snapshot over the declared node/edge/byte budget is refused with a typed unavailable", pins: ["E1", "E2", "E3", "E4"] },
  { id: "F", label: "never truncated silently", pins: ["F1"] },
  { id: "G", label: "When Pi exports a request to GraphPolicyCLI (artifact: released GraphDataIR schema + an owner-decided Pi decision point)", pins: ["G1", "G2", "G3"] },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
];

/** The quotes tile the label in order, with nothing but separators (white space, , ; : ( ) / +) between and around them. */
export function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()/+]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()/+]*$/.test(label.slice(at));
}
/** The owner filing's acceptance: the first "Acceptance: " sentence (to its first ". "), cut at ", " outside parentheses. */
export function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance: ");
  if (start === -1) return [];
  const body = notes.slice(start + "Acceptance: ".length);
  const end = body.indexOf(". ");
  const sentence = end === -1 ? body : body.slice(0, end);
  const clauses: string[] = [];
  let depth = 0;
  let from = 0;
  for (let index = 0; index < sentence.length; index++) {
    const character = sentence[index];
    if (character === "(") depth++;
    else if (character === ")") depth--;
    else if (character === "," && sentence[index + 1] === " " && depth === 0) {
      clauses.push(sentence.slice(from, index));
      from = index + 2;
    }
  }
  clauses.push(sentence.slice(from));
  return clauses;
}

/** The named residual families: what no reading here claims, each member a pinned quiet row. */
export interface SourceResidual {
  readonly kind: "source";
  readonly path: string;
  readonly text: string;
}
export interface OutcomeResidual {
  readonly kind: "outcome";
  readonly id: string;
  /** An edit of the reference's conforming export that the judge does not read. */
  readonly edit: (outcome: Exported) => Exported;
}
export type Residual = SourceResidual | OutcomeResidual;
const withGraph = (outcome: Exported, change: (graph: Record<string, unknown>) => Record<string, unknown>): Exported => ({ ...outcome, graph: change(structuredClone(outcome.graph) as Record<string, unknown>) });
export const RESIDUALS: Readonly<Record<string, readonly Residual[]>> = {
  // A module that builds a GraphDataIR-shaped document without naming a site word is no site: the reader reads words.
  Q1: [
    { kind: "source", path: "src/workbench/q1-shape.ts", text: "export const snapshot = (entities: unknown[]): unknown => ({ schema_ref: { namespace: NAMESPACE }, entities, relations: [] });\ndeclare const NAMESPACE: string;\n" },
    { kind: "source", path: "src/workbench/q1-incidences.ts", text: 'export const edge = (from: string, to: string): unknown => ({ incidences: [{ participant: from, role: "source" }, { participant: to, role: "target" }] });\n' },
  ],
  // A reader's word built at run time or spelled through an escape: every source reader reads source characters only. The
  // joined namespace is G1's site word and G2's namespace, the escape G1's site word, the joined kind D3's executor request.
  Q2: [
    { kind: "source", path: "src/workbench/q2-joined.ts", text: 'export const NAMESPACE = ["graph", "policy"].join("") + ".data.v1";\n' },
    { kind: "source", path: "src/workbench/q2-escape.ts", text: 'export const NAME = "Graph\\u0044ataIR";\n' },
    { kind: "source", path: "src/workbench/q2-request.ts", text: 'export const KIND = ["Executor", "Request"].join("");\n' },
  ],
  // The judge reads the vendored v1 shape, never a GraphDataIR schema document: another feature's status or value is unread.
  Q3: [
    { kind: "outcome", id: "q3-feature-status", edit: outcome => withGraph(outcome, graph => ({ ...graph, entities: (graph.entities as Record<string, unknown>[]).map(entity => ({ ...entity, features: { ...(entity.features as object), tone: { status: "bogus" } } })) })) },
    { kind: "outcome", id: "q3-schema-hash", edit: outcome => withGraph(outcome, graph => ({ ...graph, schema_ref: { ...(graph.schema_ref as object), hash: "sha256:0" } })) },
  ],
  // Entity and relation kinds and incidence roles are unread (kind labels are wb-gxd7.4's).
  Q4: [
    { kind: "outcome", id: "q4-entity-kind", edit: outcome => withGraph(outcome, graph => ({ ...graph, entities: (graph.entities as Record<string, unknown>[]).map(entity => ({ ...entity, kind: "ready-work" })) })) },
    { kind: "outcome", id: "q4-roles", edit: outcome => withGraph(outcome, graph => ({ ...graph, relations: (graph.relations as Record<string, unknown>[]).map(relation => ({ ...relation, incidences: (relation.incidences as Record<string, unknown>[]).map(incidence => ({ ...incidence, role: "member" })) })) })) },
  ],
  // The snapshot-level observation block (revisions, scope string, budget, slice) is unread; the trace carries each revision.
  Q5: [
    { kind: "outcome", id: "q5-revisions-empty", edit: outcome => withGraph(outcome, graph => ({ ...graph, observation: { ...(graph.observation as object), revisions: [] } })) },
    { kind: "outcome", id: "q5-revisions-guessed", edit: outcome => withGraph(outcome, graph => ({ ...graph, observation: { ...(graph.observation as object), revisions: ["unknown"], scope: "pi://elsewhere" } })) },
  ],
};
export const residualId = (member: Residual): string => (member.kind === "source" ? member.path : member.id);
