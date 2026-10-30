/**
 * wb-0lf.2 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R2): the tables, the fixture projections, the reference exporter, its
 * mutants and the judge of the GP snapshot-export census, test/workbench-gp-snapshot-export-census.test.ts (its header states
 * the bead, the measured facts and every reading). Everything here is pure over the inputs it is handed: the fixtures are
 * real ObservationProjection instances built through the class's public methods, the reference exporter only reads them,
 * and so do its mutants except the A1 purity members, which write to the projection, edit its objects or edit the class on
 * purpose (the judge refuses each one and puts the class back), and the drive residuals of Q6, Q7 and Q8, which the drive
 * observer (driveEffects) also runs on fixture projections of its own to read what each one does; nothing here starts gp, fakes
 * a GraphPolicyCLI binary, adds a dependency or implements a Pi exporter. The read proof (readProof) is pure over
 * the git blob ids the census hands it (git hash-object, read in the census file).
 * The census's own reads compose the landed wb-e66.5 vocabulary reader and listers (test/helpers/gp-mw-coordination-census.ts),
 * the landed wb-gxd7.3 export reader (test/helpers/gp-snapshot-join-census.ts) and the landed docs binding
 * (docsSection/sectionTables of test/helpers/census.ts); a table cell's shown text follows the landed binding's own rendering
 * rule (inlineText, copied verbatim as the landed control-loop audit's test/helpers/gp-control-loop-audit.ts copies it).
 * The last section (wb-0lf.8, the rule-19 structural-exit child ruling R-B73 filed) holds the full surface: the forms its
 * tables list, each outside the R-B73 fail-closed core's G1, D3, G3 and S2 pinned sets and each a pinned falsifier through the
 * claim's own reader (a form outside these tables is outside every claim, where the fail-closed readers refuse it), and the
 * code reader (codeShapeKeysOf, codeComposedOf: the TypeScript parse of a residual source member) that reads S2's
 * liveness from code, never from a comment or a string's content.
 */
import { createHash } from "node:crypto";
import { isDeepStrictEqual, types } from "node:util";
import { Lexer, type Links, marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { NATIVE_CONTROL_ACTIONS } from "../../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation, type RelationKind } from "../../src/workbench/observation.js";
import { docsSection, sectionTables } from "./census.js";
import { namedWords, VOCABULARY } from "./gp-mw-coordination-census.js";
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
/** A provider the fixture holds no node of (the A1 connection members disconnect and reconnect it; A1 asserts it is unheld). */
export const UNHELD_PROVIDER = "hx";
/** A provider the fixture holds nodes of (the M-DISCONNECT-HELD control; A1 asserts it is held). */
export const HELD_PROVIDER = "beads";
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

/**
 * The class's own members (its prototype's and its statics') and both prototypes, kept to put the class back: a drive that
 * edits ObservationProjection edits every instance and the twin alike. The class leg reads the class through structureOf.
 */
interface ClassShape {
  readonly members: readonly [PropertyDescriptorMap, PropertyDescriptorMap];
  readonly prototypes: readonly [object | null, object | null];
}
const CLASS_ROOTS = (): readonly [object, object] => [ObservationProjection.prototype, ObservationProjection];
const classShape = (): ClassShape => {
  const [prototype, statics] = CLASS_ROOTS();
  return { members: [Object.getOwnPropertyDescriptors(prototype), Object.getOwnPropertyDescriptors(statics)], prototypes: [Object.getPrototypeOf(prototype), Object.getPrototypeOf(statics)] };
};
/** Put the class back as classShape read it (a drive's edit is judged once, never inherited by the next case). */
function restoreClass(shape: ClassShape): void {
  CLASS_ROOTS().forEach((target, index) => {
    const saved = shape.members[index] ?? {};
    for (const key of Reflect.ownKeys(target)) if (!Object.hasOwn(saved, key)) Reflect.deleteProperty(target, key);
    for (const key of Reflect.ownKeys(saved)) {
      const descriptor = saved[key];
      if (descriptor !== undefined) Object.defineProperty(target, key, descriptor);
    }
    const prototype = shape.prototypes[index] ?? null;
    if (Object.getPrototypeOf(target) !== prototype) Object.setPrototypeOf(target, prototype);
  });
}

// ---- the strict structural reading the purity legs compare (refusal #2's U2: class (b) of its CLASS-LEVEL GUARD) ----

/** The facets the walk reads on one object, in its reading order; a drift names the facet of its first difference. */
export const FACETS = ["kind", "prototype", "integrity", "keys", "attributes", "value", "get", "set", "size", "time", "same"] as const;
export type FacetName = (typeof FACETS)[number];
/** One reading of the walk: where (a path from its root), which facet, and the value read there. */
export interface Facet {
  readonly at: string;
  readonly facet: FacetName;
  readonly value: unknown;
}
/**
 * The kinds the walk tells apart, each by an internal-slot brand check that runs no code of the object's own (node:util
 * types): a Proxy is a leaf (its traps are never called, so a Proxy reads unlike any twin's object), a function met below a
 * root is a leaf read by identity, an array, map, set and date are entered with their entries or time, and an opaque object
 * (a WeakMap, WeakSet, Promise, RegExp, typed array, buffer or boxed primitive) is read by its own properties only, its
 * internal state unread. A1 holds the fixture projection's walk to the entered kinds (WALKED_KINDS).
 */
export const KINDS = ["proxy", "function", "array", "map", "set", "date", "opaque", "object"] as const;
export type Kind = (typeof KINDS)[number];
/** The kinds a fixture projection's walk meets: A1 asserts it meets no proxy, opaque object or function below its root. */
export const WALKED_KINDS: readonly Kind[] = ["array", "map", "object", "set"];
const kindOf = (value: object): Kind => {
  if (types.isProxy(value)) return "proxy";
  if (typeof value === "function") return "function";
  if (Array.isArray(value)) return "array";
  if (types.isMap(value)) return "map";
  if (types.isSet(value)) return "set";
  if (types.isDate(value)) return "date";
  if (types.isWeakMap(value) || types.isWeakSet(value) || types.isPromise(value) || types.isRegExp(value) || types.isTypedArray(value) || types.isAnyArrayBuffer(value) || types.isBoxedPrimitive(value)) return "opaque";
  return "object";
};

/**
 * Everything reachable from the roots, read in a fixed order and never through an accessor: per object its kind, its
 * prototype (by identity), its integrity level (extensible, sealed, frozen), its own keys in order (Reflect.ownKeys: string and
 * symbol keys, enumerable or not) and, per key, the descriptor's attributes (enumerable, configurable, writable or accessor)
 * with its value, entered in turn, or its get and set functions (by identity); then a map's size and its entries in insertion
 * order (keys and values entered), a set's size and members in order, a date's time. An object met again reads as the path it
 * was first met at, so shared and cyclic references compare by shape; a primitive reads by Object.is. Roots that are
 * functions (the class's constructor) are entered; a function met below them is a leaf.
 */
export function structureOf(roots: readonly unknown[]): Facet[] {
  const facets: Facet[] = [];
  const first = new Map<object, string>();
  const enter = (value: unknown, at: string, root: boolean): void => {
    if (value === null || (typeof value !== "object" && typeof value !== "function")) {
      facets.push({ at, facet: "value", value });
      return;
    }
    const kind = kindOf(value);
    if (kind === "proxy" || (kind === "function" && !root)) {
      facets.push({ at, facet: "kind", value: kind });
      facets.push({ at, facet: "value", value });
      return;
    }
    const met = first.get(value);
    if (met !== undefined) {
      facets.push({ at, facet: "same", value: met });
      return;
    }
    first.set(value, at);
    facets.push({ at, facet: "kind", value: kind });
    facets.push({ at, facet: "prototype", value: Object.getPrototypeOf(value) });
    facets.push({ at, facet: "integrity", value: [Object.isExtensible(value), Object.isSealed(value), Object.isFrozen(value)] });
    const keys = Reflect.ownKeys(value);
    facets.push({ at, facet: "keys", value: keys });
    for (const key of keys) {
      const where = `${at}.${String(key)}`;
      const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined) continue;
      const data = Object.hasOwn(descriptor, "value");
      facets.push({ at: where, facet: "attributes", value: [descriptor.enumerable === true, descriptor.configurable === true, data ? descriptor.writable === true : "accessor"] });
      if (data) enter(descriptor.value, where, false);
      else {
        facets.push({ at: where, facet: "get", value: descriptor.get });
        facets.push({ at: where, facet: "set", value: descriptor.set });
      }
    }
    if (kind === "map") {
      const entries = [...(Reflect.apply(Map.prototype.entries, value, []) as IterableIterator<[unknown, unknown]>)];
      facets.push({ at, facet: "size", value: entries.length });
      entries.forEach(([key, entry], index) => {
        enter(key, `${at}<key ${index}>`, false);
        enter(entry, `${at}<value ${index}>`, false);
      });
    } else if (kind === "set") {
      const members = [...(Reflect.apply(Set.prototype.values, value, []) as IterableIterator<unknown>)];
      facets.push({ at, facet: "size", value: members.length });
      for (const [index, member] of members.entries()) enter(member, `${at}<member ${index}>`, false);
    } else if (kind === "date") facets.push({ at, facet: "time", value: Reflect.apply(Date.prototype.getTime, value, []) });
  };
  for (const [index, root] of roots.entries()) enter(root, `#${index}`, true);
  return facets;
}
const sameReading = (left: unknown, right: unknown): boolean =>
  Array.isArray(left) && Array.isArray(right) ? left.length === right.length && left.every((item, index) => Object.is(item, right[index])) : Object.is(left, right);
/** Where two walks first differ, path and facet (the left walk's reading where it has one), or undefined when they agree. */
export function driftOf(left: readonly Facet[], right: readonly Facet[]): { readonly at: string; readonly facet: FacetName } | undefined {
  for (let index = 0; index < Math.max(left.length, right.length); index++) {
    const [a, b] = [left[index], right[index]];
    if (a !== undefined && b !== undefined && a.at === b.at && a.facet === b.facet && sameReading(a.value, b.value)) continue;
    const reading = a ?? b;
    return reading === undefined ? undefined : { at: reading.at, facet: reading.facet };
  }
  return undefined;
}
/** The facet two walks first differ in, or undefined: what the purity findings name (never a private field's name). */
export const facetDrift = (left: readonly Facet[], right: readonly Facet[]): FacetName | undefined => driftOf(left, right)?.facet;
/** The class as the class leg reads it: its prototype and its constructor, entered as two roots. */
const classStructure = (): Facet[] => structureOf(CLASS_ROOTS());

/** Two values built alike, for the walk's own controls (STRUCTURE_PROBES): plain fields, a nested object, a map, a set, a date,
 * a shared reference and an accessor whose getter is one module-level function (so two values built alike read alike). */
export interface ProbeValue {
  a: number;
  nested: { x: number };
  map: Map<string, number>;
  set: Set<string>;
  when: Date;
  shared: { y: number };
  again: { y: number };
}
const PROBE_GETTER = (): number => 1;
export const probeValue = (): ProbeValue => {
  const shared = { y: 1 };
  const value: ProbeValue = { a: 0, nested: { x: 1 }, map: new Map([["k1", 1], ["k2", 2]]), set: new Set(["s1", "s2"]), when: new Date(0), shared, again: shared };
  Object.defineProperty(value, "total", { get: PROBE_GETTER, enumerable: true, configurable: true });
  return value;
};
/** Each control edits one of two equal values; expect is the facet the walk's drift names ("" when they still agree). */
export interface StructureProbe {
  readonly id: string;
  readonly edit: (value: ProbeValue) => void;
  readonly expect: FacetName | "";
}
export const STRUCTURE_PROBES: readonly StructureProbe[] = [
  { id: "S-EQUAL", edit: () => undefined, expect: "" },
  { id: "S-VALUE", edit: value => { value.a = 1; }, expect: "value" },
  { id: "S-NEGATIVE-ZERO", edit: value => { value.a = -0; }, expect: "value" },
  { id: "S-NONENUMERABLE", edit: value => { Object.defineProperty(value, "hidden", { value: 1 }); }, expect: "keys" },
  { id: "S-SYMBOL", edit: value => { Object.defineProperty(value, Symbol("probe"), { value: 1 }); }, expect: "keys" },
  { id: "S-ATTRIBUTE", edit: value => { Object.defineProperty(value, "a", { writable: false }); }, expect: "attributes" },
  { id: "S-ACCESSOR", edit: value => { Object.defineProperty(value, "a", { get: (): number => 0 }); }, expect: "attributes" },
  { id: "S-GETTER", edit: value => { Object.defineProperty(value, "total", { get: (): number => 1 }); }, expect: "get" },
  { id: "S-SETTER", edit: value => { Object.defineProperty(value, "total", { set: (): void => undefined }); }, expect: "set" },
  { id: "S-PROTOTYPE", edit: value => { Object.setPrototypeOf(value, Object.create(Object.prototype)); }, expect: "prototype" },
  { id: "S-EXTENSIBLE", edit: value => { Object.preventExtensions(value); }, expect: "integrity" },
  { id: "S-NESTED-FROZEN", edit: value => { Object.freeze(value.nested); }, expect: "integrity" },
  { id: "S-MAP-ORDER", edit: value => { value.map.delete("k1"); value.map.set("k1", 1); }, expect: "value" },
  { id: "S-MAP-SIZE", edit: value => { value.map.set("k3", 3); }, expect: "size" },
  { id: "S-MAP-OWN", edit: value => { Object.defineProperty(value.map, "get", { value: (): number => 0 }); }, expect: "keys" },
  { id: "S-SET-ORDER", edit: value => { value.set.delete("s1"); value.set.add("s1"); }, expect: "value" },
  { id: "S-DATE", edit: value => { value.when.setTime(1); }, expect: "time" },
  { id: "S-UNSHARED", edit: value => { value.again = { y: 1 }; }, expect: "kind" },
  { id: "S-RESHARED", edit: value => { value.again = value.nested as unknown as { y: number }; }, expect: "same" },
  { id: "S-PROXY", edit: value => { value.nested = new Proxy(value.nested, {}); }, expect: "kind" },
];

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
 * Drive twice, each time on a fresh projection behind watched() with fresh copies of the scope and budget, judge the first
 * outcome against the truth, then, once both drives have settled, prove the drive pure on five legs, each read by the strict
 * walk (structureOf) where it compares: it
 * called no method outside READ_METHODS through its view; the class (its prototype and its constructor, walked as two roots)
 * reads as it did before the drives; each projection it read reads as a fresh twin (the walk from the instance: every own
 * property, enumerable or not, string- or symbol-keyed, with its attributes, the prototype, the integrity level, and every
 * object reachable from it, the connection map, the indexes and the identity-refusal log among them, maps and sets in
 * order); the scope and the budget object it handed each drive read as fresh copies (refusal #3's U2: the judge keeps the
 * two objects it hands each drive in its own record and walks those, never the request's fields as read after the drives,
 * so a drive that edits a handed object and rebinds the request's field to a fresh copy is read; the request object itself,
 * its field bindings, keys and integrity, is unread: R-REQUEST, Q8); and its two outcomes read alike. Each impure finding
 * names the facet of its first difference.
 */
export async function driveFindings(drive: Drive, row: CaseRow): Promise<string[]> {
  const scope = scopeSpec(row.scope).scope;
  const judged = judgeCaseOf(row);
  const shape = classShape();
  const before = classStructure();
  const writes: string[] = [];
  /** The scope and budget objects handed to each drive, held here and never re-read from the request (refusal #3's U2). */
  const handed: { readonly scope: ObservationScope; readonly budget: ExportBudget }[] = [];
  const run = async (target: ObservationProjection): Promise<{ readonly threw: false; readonly value: unknown } | { readonly threw: true; readonly value: string }> => {
    const objects = { scope: { ...scope }, budget: { ...row.budget } };
    handed.push(objects);
    const request = { projection: watched(target, writes), scope: objects.scope, budget: objects.budget };
    try {
      return { threw: false, value: await drive(request) };
    } catch (error) {
      return { threw: true, value: error instanceof Error ? error.message : String(error) };
    }
  };
  const read = [buildProjection(), buildProjection()] as const;
  const first = await run(read[0]);
  const second = await run(read[1]);
  const findings = first.threw ? [`outcome the drive threw: ${first.value}`] : exportFindings(judged, first.value);
  for (const name of new Set(writes)) findings.push(`impure the drive called the projection's ${name}, which is no read`);
  const edited = facetDrift(before, classStructure());
  if (edited !== undefined) {
    findings.push(`impure a drive edited the ObservationProjection class (${edited})`);
    restoreClass(shape);
  }
  read.forEach((projection, index) => {
    const drift = facetDrift(structureOf([projection]), structureOf([buildProjection()]));
    if (drift !== undefined) findings.push(`impure drive ${index + 1} left the projection it read unlike a fresh twin (${drift})`);
  });
  handed.forEach((objects, index) => {
    const drift = facetDrift(structureOf([objects.scope, objects.budget]), structureOf([{ ...scope }, { ...row.budget }]));
    if (drift !== undefined) findings.push(`impure drive ${index + 1} edited the scope or budget of its request (${drift})`);
  });
  const differs = facetDrift(structureOf([first]), structureOf([second]));
  if (differs !== undefined) findings.push(`impure two drives over one fixture returned different outcomes (${differs})`);
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
  /** After the export, defines a non-enumerable own query on the projection answering the export's own read (the gate's P-NONENUM-MEMO). */
  readonly memoQuery?: boolean;
  /** After the export, fixes the projection's integrity level: freeze it (the gate's P-FREEZE) or only prevent extensions. */
  readonly integrity?: "freeze" | "prevent";
  /** After the export, defines a non-enumerable symbol-keyed own property on the projection. */
  readonly symbolField?: boolean;
  /** After the export, makes the projection's revision non-writable, its value unchanged (a later write to it throws). */
  readonly fixRevision?: boolean;
  /** After the export, redefines the projection's revision as an accessor answering the same value and dropping writes. */
  readonly revisionAccessor?: boolean;
  /** After the export, sets the projection's prototype to a child of ObservationProjection.prototype whose stats answers zeros. */
  readonly protoSwap?: boolean;
  /** After the export, freezes the first node object the projection stores (read through the view's nodes field). */
  readonly freezeNode?: boolean;
  /** After the export, moves the first key of the first scope index set to its end, so a later query reads another order. */
  readonly reorderScope?: boolean;
  /** After the export, shadows get on the projection's own connection map (non-enumerable), answering disconnected. */
  readonly shadowConnections?: boolean;
  /** The drive's second call presents the graph with its keys in reverse order: equal by util.isDeepStrictEqual, not in its bytes. */
  readonly keyOrder?: boolean;
  /** Sets the prototype of ObservationProjection.prototype to an object carrying an extra member, so every instance inherits it. */
  readonly classProto?: boolean;
  /** Before the reads, calls every READ_METHODS method once (an equivalence control: reads change nothing). */
  readonly everyRead?: boolean;
  /** After the export, edits the query and relationsPage results it read (an equivalence control: the reads hand out copies). */
  readonly editReads?: boolean;
  /** After the export, edits the request it was handed: its budget's node limit, or its scope's principal. */
  readonly editRequest?: "budget" | "scope";
  /**
   * After the export, makes M-BUDGET-EDIT's or M-SCOPE-EDIT's edit of the handed object, then rebinds the request's field to
   * a fresh equal copy taken before the edit: by assignment, through Reflect.set, or as an accessor answering a fresh copy
   * (refusal #3's U2 members, the gate's P-REBIND-BUDGET, P-REBIND-BUDGET-REFLECT, P-REBIND-SCOPE, P-REBIND-SCOPE-ACCESSOR).
   */
  readonly rebindRequest?: "budget" | "budget-reflect" | "scope" | "scope-accessor";
}

/** One call of each READ_METHODS method over a scope, its arguments valid (E-EVERY-READ; A1 holds the names to READ_METHODS). */
export const READ_CALLS: Readonly<Record<string, (projection: ObservationProjection, scope: ObservationScope, key: string) => unknown>> = {
  aggregate: (projection, scope, key) => projection.aggregate({ scope, key }),
  aggregateStats: projection => projection.aggregateStats(),
  events: (projection, scope) => projection.events({ scope, limit: READ_LIMIT }),
  identityRefusals: (projection, scope) => projection.identityRefusals({ scope, limit: READ_LIMIT }),
  indexOf: (projection, scope, key) => projection.indexOf({ scope, invocationId: "inv-0001", key }),
  query: (projection, scope) => projection.query({ scope, limit: READ_LIMIT }),
  relationRevision: projection => projection.relationRevision(),
  relations: (projection, scope) => projection.relations({ scope }),
  relationsPage: (projection, scope) => projection.relationsPage({ scope }),
  stats: projection => projection.stats(),
  truncation: (projection, scope) => projection.truncation({ scope }),
  window: (projection, scope) => projection.window({ scope, invocationId: "inv-0001", offset: 0, limit: 10 }),
};
/** The objects a drive reaches through its view's own fields (a pure exporter never does; the A1 object members do). */
const fieldOf = (projection: ObservationProjection, name: string): unknown => Reflect.get(projection, name);

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
  if (recipe.classProto === true) Object.setPrototypeOf(ObservationProjection.prototype, Object.create(Object.prototype, { exportedBy: { value: (): string => "pi", configurable: true, writable: true } }));
  if (recipe.everyRead === true) {
    const key = projection.query({ scope, limit: READ_LIMIT }).nodes[0]?.key ?? "";
    for (const call of Object.values(READ_CALLS)) call(projection, scope, key);
  }
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
  afterExport(projection, scope, recipe);
  if (recipe.editRequest === "budget") Reflect.set(budget, "maxNodes", 0);
  if (recipe.editRequest === "scope") Reflect.set(scope, "principal", "operator-z");
  if (recipe.rebindRequest !== undefined) rebindRequest(request, recipe.rebindRequest);
  return outcome;
}

/** The A1 rebind members: the handed object edited as M-BUDGET-EDIT or M-SCOPE-EDIT edits it, the request's field then rebound. */
function rebindRequest(request: ExportRequest, form: NonNullable<Recipe["rebindRequest"]>): void {
  if (form === "budget" || form === "budget-reflect") {
    const handed = request.budget;
    const copy = { ...handed };
    Reflect.set(handed, "maxNodes", 0);
    if (form === "budget") (request as { budget: ExportBudget }).budget = copy;
    else Reflect.set(request, "budget", copy);
    return;
  }
  const handed = request.scope;
  const copy = { ...handed };
  Reflect.set(handed, "principal", "operator-z");
  if (form === "scope") (request as { scope: ObservationScope }).scope = copy;
  else Object.defineProperty(request, "scope", { get: (): ObservationScope => ({ ...copy }), configurable: true, enumerable: true });
}

/** The A1 members that edit the projection's objects after the export (and the read-result equivalence control). */
function afterExport(projection: ObservationProjection, scope: ObservationScope, recipe: Recipe): void {
  if (recipe.memoQuery === true) {
    const cached = projection.query({ scope, limit: READ_LIMIT });
    Object.defineProperty(projection, "query", { value: (): typeof cached => cached, configurable: true, writable: true, enumerable: false });
  }
  if (recipe.integrity === "freeze") Object.freeze(projection);
  if (recipe.integrity === "prevent") Object.preventExtensions(projection);
  if (recipe.symbolField === true) Object.defineProperty(projection, Symbol("exported"), { value: true });
  if (recipe.fixRevision === true) Object.defineProperty(projection, "revision", { writable: false });
  if (recipe.revisionAccessor === true) {
    const revision: unknown = fieldOf(projection, "revision");
    Object.defineProperty(projection, "revision", { get: (): unknown => revision, set: (): void => undefined, configurable: true, enumerable: true });
  }
  if (recipe.protoSwap === true) Object.setPrototypeOf(projection, Object.create(ObservationProjection.prototype, { stats: { value: (): { nodes: number; events: number; edges: number } => ({ nodes: 0, events: 0, edges: 0 }) } }));
  if (recipe.freezeNode === true) {
    const nodes = fieldOf(projection, "nodes");
    if (nodes instanceof Map) Object.freeze(nodes.values().next().value);
  }
  if (recipe.reorderScope === true) {
    const scopes = fieldOf(projection, "scopes");
    const index: unknown = scopes instanceof Map ? scopes.values().next().value : undefined;
    if (index instanceof Set) {
      const moved: unknown = index.values().next().value;
      index.delete(moved);
      index.add(moved);
    }
  }
  if (recipe.shadowConnections === true) {
    const connections = fieldOf(projection, "connections");
    if (connections instanceof Map) Object.defineProperty(connections, "get", { value: (): string => "disconnected", configurable: true, writable: true });
  }
  if (recipe.editReads === true) {
    const read = projection.query({ scope, limit: READ_LIMIT });
    const node = read.nodes[0];
    if (node !== undefined) Reflect.set(node.presentation, "title", "rewritten by the drive");
    read.nodes.length = 0;
    const page = projection.relationsPage({ scope, limit: READ_LIMIT });
    const relation = page.relations[0];
    if (relation !== undefined) Reflect.set(relation, "kind", "hypothesis");
  }
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

/** A drive over the reference exporter with one recipe; counter ids continue across calls, and keyOrder changes the second call. */
export function recipeDrive(recipe: Recipe = {}): Drive {
  let issued = 0;
  let calls = 0;
  const nextId = recipe.counter === true ? (prefix: string): string => `${prefix}${++issued}` : undefined;
  return request => {
    calls++;
    const outcome = referenceExport(request, recipe, nextId);
    return recipe.keyOrder === true && calls === 2 && outcome.ok && isRecord(outcome.graph) ? { ...outcome, graph: Object.fromEntries(Object.entries(outcome.graph).reverse()) } : outcome;
  };
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
  { id: "M-DISCONNECT-HELD", pin: "A1", case: "K-FITS", recipe: { disconnect: HELD_PROVIDER }, expect: ["impure"] },
  { id: "M-WRITE-NOOP", pin: "A1", case: "K-FITS", recipe: { noopWrite: true }, expect: ["impure"] },
  { id: "M-BYPASS-WRITE", pin: "A1", case: "K-FITS", recipe: { bypassWrite: true }, expect: ["impure"] },
  { id: "M-CLASS-PATCH", pin: "A1", case: "K-FITS", recipe: { classPatch: true }, expect: ["impure"] },
  { id: "M-CLASS-STATIC", pin: "A1", case: "K-FITS", recipe: { classStatic: true }, expect: ["impure"] },
  { id: "M-REFRESH-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "refresh" }, expect: ["impure"] },
  { id: "M-RELATE-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "relate" }, expect: ["impure"] },
  { id: "M-INGEST-WRITE", pin: "A1", case: "K-FITS", recipe: { writeIntoD: "ingest" }, expect: ["impure"] },
  { id: "M-OTHER-CALL", pin: "A1", case: "K-FITS", recipe: { otherCall: true }, expect: ["impure"] },
  // Refusal #2's U2 members and the other forms of their class (b): edits util.isDeepStrictEqual does not see.
  { id: "M-NONENUM-MEMO", pin: "A1", case: "K-FITS", recipe: { memoQuery: true }, expect: ["impure"] },
  { id: "M-FREEZE", pin: "A1", case: "K-FITS", recipe: { integrity: "freeze" }, expect: ["impure"] },
  { id: "M-PREVENT-EXTENSIONS", pin: "A1", case: "K-FITS", recipe: { integrity: "prevent" }, expect: ["impure"] },
  { id: "M-SYMBOL-FIELD", pin: "A1", case: "K-FITS", recipe: { symbolField: true }, expect: ["impure"] },
  { id: "M-FIXED-REVISION", pin: "A1", case: "K-FITS", recipe: { fixRevision: true }, expect: ["impure"] },
  { id: "M-REVISION-ACCESSOR", pin: "A1", case: "K-FITS", recipe: { revisionAccessor: true }, expect: ["impure"] },
  { id: "M-PROTO-SWAP", pin: "A1", case: "K-FITS", recipe: { protoSwap: true }, expect: ["impure"] },
  { id: "M-FROZEN-NODE", pin: "A1", case: "K-FITS", recipe: { freezeNode: true }, expect: ["impure"] },
  { id: "M-SCOPE-REORDER", pin: "A1", case: "K-FITS", recipe: { reorderScope: true }, expect: ["impure"] },
  { id: "M-SHADOW-CONNECTIONS", pin: "A1", case: "K-FITS", recipe: { shadowConnections: true }, expect: ["impure"] },
  { id: "M-KEY-ORDER", pin: "A1", case: "K-FITS", recipe: { keyOrder: true }, expect: ["impure"] },
  { id: "M-CLASS-PROTO", pin: "A1", case: "K-FITS", recipe: { classProto: true }, expect: ["impure"] },
  { id: "M-BUDGET-EDIT", pin: "A1", case: "K-FITS", recipe: { editRequest: "budget" }, expect: ["impure"] },
  { id: "M-SCOPE-EDIT", pin: "A1", case: "K-FITS", recipe: { editRequest: "scope" }, expect: ["impure"] },
  // Refusal #3's U2 members (class (b), the request leg): the handed object edited, the request's field rebound to a fresh copy.
  { id: "M-REBIND-BUDGET", pin: "A1", case: "K-FITS", recipe: { rebindRequest: "budget" }, expect: ["impure"] },
  { id: "M-REBIND-BUDGET-REFLECT", pin: "A1", case: "K-FITS", recipe: { rebindRequest: "budget-reflect" }, expect: ["impure"] },
  { id: "M-REBIND-SCOPE", pin: "A1", case: "K-FITS", recipe: { rebindRequest: "scope" }, expect: ["impure"] },
  { id: "M-REBIND-SCOPE-ACCESSOR", pin: "A1", case: "K-FITS", recipe: { rebindRequest: "scope-accessor" }, expect: ["impure"] },
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
/** The purity legs' equivalence controls: each recipe reads more or edits only copies, and is judged pure (A1). */
export const PURE_RECIPES: readonly { readonly id: string; readonly recipe: Recipe }[] = [
  { id: "E-EVERY-READ", recipe: { everyRead: true } },
  { id: "E-READ-RESULT-EDIT", recipe: { editReads: true } },
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
/**
 * G1's planted positive per site word (refusal #3's U1): one src module per SITE_WORDS member naming that word only, read
 * after the tracked modules in the same siteFindings call, so G1's reader is proven on every word it claims (the planted
 * exporter above names graphpolicy.data.v1, which reads as GraphPolicy alone). The GraphDataIR text is the gate's plant.
 */
export const PLANTED_WORD_SITES: readonly { readonly word: string; readonly path: string; readonly text: string }[] = [
  { word: "GraphPolicy", path: "src/workbench/zz-gp-site-policy.ts", text: "export type GraphPolicyRequest = Readonly<Record<string, unknown>>;\n" },
  { word: "GraphDataIR", path: "src/workbench/zz-gp-site-data-ir.ts", text: "export type GraphDataIR = Readonly<Record<string, unknown>>;\n" },
];
/**
 * The spellings the composed reader reads as a site word, and near spellings it must not: Pi words, and (refusal #4's U1) a word
 * whose parts a character outside the joiner class or a line break separates.
 */
export const SITE_WORD_HITS: readonly string[] = ["GraphDataIR", "graph_data_ir", "graph-data-ir", "graphpolicy.data.v1", "GraphPolicyCLI", "graph-policy-cli", "toGraphDataIR"];
export const SITE_WORD_QUIET: readonly string[] = ["ObservationProjection", "graph", "policy", "GraphQL", "graphDataIndex", "dataflow graph", "MicroPolicy", "mw.training-export", "Graph/Policy", "Graph:Data:IR", "graph\npolicy"];

// ---- the absence readers of D3 and G2, each proven live by a planted positive read in the same call ----

/**
 * D3's pattern, a typed executor request named in a module: "executor request", case folded (flag i), joined by nothing or by
 * one space, "_" or "-"; D3 claims EXECUTOR_REQUEST_SPELLINGS' 12 (lower, upper and written case), a match in another case
 * form is refused by unpinnedExecutorRequestFindings (R-B73), and a tab, a dot or a run of two or more joiners between the
 * parts is outside the pattern (EXECUTOR_REQUEST_OUTSIDE, pinned quiet).
 */
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

// ---- the spellings each word reader claims (refusal #4's U1, R-B66 (2) in its second form: every spelling a pinned falsifier) ----

/**
 * What a pattern reads between a word's parts, from its source: the parts (the text between its character classes), each
 * character of its first class (an escape such as \t read as the character it names), the quantifier after that class,
 * whether every class between the parts is that one, and its flags. The census holds each spelling table to a live pattern
 * this way: G1's and G3's to the landed vocabulary's VOCABULARY patterns, D3's to EXECUTOR_REQUEST.
 */
export function readPattern(pattern: RegExp): { readonly parts: readonly string[]; readonly chars: readonly string[]; readonly quantifier: string; readonly flags: string; readonly uniform: boolean } {
  const classes = [...pattern.source.matchAll(/\[((?:\\.|[^\]\\])*)\]([*+?]?)/g)];
  const first = classes[0];
  const chars = [...(first?.[1] ?? "").matchAll(/\\(.)|([^\\])/g)].map(part => (part[1] === undefined ? (part[2] ?? "") : part[1] === "t" ? "\t" : part[1]));
  return {
    parts: pattern.source.split(/\[(?:\\.|[^\]\\])*\][*+?]?/),
    chars,
    quantifier: first?.[2] ?? "",
    flags: pattern.flags,
    uniform: classes.every(entry => entry[0] === first?.[0]),
  };
}
/**
 * The joiners a spelling table puts between a word's parts: none, each character of the landed vocabulary's joiner class alone
 * (namedWords joins a word's parts by that class repeated any number of times: space, tab, dot, underscore, hyphen), a repeated
 * run of one of them and a mixed run of several.
 */
export const WORD_JOINERS: readonly { readonly id: string; readonly text: string }[] = [
  { id: "none", text: "" },
  { id: "space", text: " " },
  { id: "tab", text: "\t" },
  { id: "dot", text: "." },
  { id: "underscore", text: "_" },
  { id: "hyphen", text: "-" },
  { id: "repeated", text: ".." },
  { id: "mixed", text: " - " },
];
/** The case forms a spelling table writes each part in: lower case, upper case, and as the bead text writes it. */
export const WORD_CASES: readonly { readonly id: string; readonly of: (part: string) => string }[] = [
  { id: "lower", of: part => part.toLowerCase() },
  { id: "upper", of: part => part.toUpperCase() },
  { id: "written", of: part => part },
];
/** Each spelled word's parts as the bead text writes it (the census holds them, lower-cased, to the word's live pattern). */
export const WORD_PARTS: Readonly<Record<string, readonly string[]>> = { GraphPolicy: ["Graph", "Policy"], GraphDataIR: ["Graph", "Data", "IR"], ExecutorRequest: ["Executor", "Request"] };
export interface Spelling {
  /** word/joiner/case. */
  readonly id: string;
  readonly word: string;
  readonly spelling: string;
}
/** A word's spellings over the given joiners: each of WORD_CASES' case forms of each joiner in turn. */
export const spellingsOf = (word: string, joiners: readonly { readonly id: string; readonly text: string }[]): Spelling[] =>
  joiners.flatMap(joiner => WORD_CASES.map(form => ({ id: `${word}/${joiner.id}/${form.id}`, word, spelling: (WORD_PARTS[word] ?? []).map(form.of).join(joiner.text) })));
/** A spelling's joiner and case form, as a plant id names it ("space-lower"). */
export const spellingTag = (entry: Spelling): string => entry.id.split("/").slice(1).join("-");
/** G1's spellings, its claim (R-B73): each site word's parts over every WORD_JOINERS joiner in each WORD_CASES case form (2 x 8 x 3), each read by G1's one reader. */
export const SITE_WORD_SPELLINGS: readonly Spelling[] = SITE_WORDS.flatMap(word => spellingsOf(word, WORD_JOINERS));
/** A planted src module naming one spelling in a string literal, the index-th of its table (read after the tracked modules). */
export const spellingSite = (entry: Spelling, index: number): { readonly path: string; readonly text: string } => ({
  path: `src/workbench/zz-spelling-${String(index).padStart(2, "0")}.ts`,
  text: `export const LABEL = "${entry.spelling}";\n`,
});
/** D3's joiners: none and each character of EXECUTOR_REQUEST's class alone (its quantifier admits none or one). */
export const EXECUTOR_JOINERS: readonly { readonly id: string; readonly text: string }[] = WORD_JOINERS.filter(joiner => ["none", "space", "underscore", "hyphen"].includes(joiner.id));
/** D3's spellings, its claim (R-B73): "executor request" over its joiners in each WORD_CASES case form (4 x 3), each read by executorRequestNamers. */
export const EXECUTOR_REQUEST_SPELLINGS: readonly Spelling[] = spellingsOf("ExecutorRequest", EXECUTOR_JOINERS);
/** The spellings outside D3's pattern: the other joiners (a tab, a dot, a repeated run, a mixed run) in each WORD_CASES case form, each pinned quiet. */
export const EXECUTOR_REQUEST_OUTSIDE: readonly Spelling[] = spellingsOf(
  "ExecutorRequest",
  WORD_JOINERS.filter(joiner => !EXECUTOR_JOINERS.includes(joiner)),
);
/** G3's owner-cell spellings: G3's word is the vocabulary's GraphPolicy, so its spellings are G1's GraphPolicy spellings. */
export const OWNER_SPELLINGS: readonly Spelling[] = spellingsOf("GraphPolicy", WORD_JOINERS);
/**
 * The places a module names a word in (R-B66 (3): each source reader is proven on every place, beside the read proof's bare
 * line): a line, a block and a doc comment, a double-quoted, a single-quoted and a template string, and code (a declared name,
 * for a word that is a name).
 */
export const WORD_PLACES: readonly { readonly id: string; readonly wrap: (word: string) => string }[] = [
  { id: "line-comment", wrap: word => `// ${word}\nexport const placed = 1;\n` },
  { id: "block-comment", wrap: word => `/* ${word} */\nexport const placed = 1;\n` },
  { id: "doc-comment", wrap: word => `/**\n * ${word}\n */\nexport const placed = 1;\n` },
  { id: "double-quoted", wrap: word => `export const placed = "${word}";\n` },
  { id: "single-quoted", wrap: word => `export const placed = '${word}';\n` },
  { id: "template", wrap: word => `export const placed = \`${word}\`;\n` },
  { id: "code", wrap: word => `export const ${word}Placed = 1;\n` },
];
/** One planted src module per place a word can sit in (code only for a word that is a name), in place order, read after the tracked modules. */
export const placedSites = (prefix: string, word: string): { readonly id: string; readonly path: string; readonly text: string }[] =>
  WORD_PLACES.filter(place => place.id !== "code" || /^[A-Za-z_$][\w$]*$/.test(word)).map(place => ({ id: place.id, path: `src/workbench/zz-place-${prefix}-${place.id}.ts`, text: place.wrap(word) }));
/**
 * G1's reader as the read proof drives it: the files siteFindings names unregistered, with no registration (every site word is
 * a hit). G1 runs its read proof once per SITE_WORDS member through this reader, and SITE_WORD_HITS and SITE_WORD_QUIET read
 * through it as well as through siteWords (refusal #3's U1: a word siteFindings stops reading reds G1).
 */
export const sitePaths = (texts: ReadonlyMap<string, string>): string[] => siteFindings([], texts).flatMap(finding => (finding.startsWith("S-UNREGISTERED ") ? [finding.slice("S-UNREGISTERED ".length).split(" names ", 1)[0] ?? ""] : []));

// ---- the absence readers' read proof (G1, G2, D3; refusal #2's U1: class (a) of its CLASS-LEVEL GUARD) ----

/** The git blob id of a text read as UTF-8: what git hash-object prints for a file holding exactly its bytes (sha1, or sha256 for a 64-hex id). */
export const blobIdOf = (text: string, id = ""): string => createHash(id.length === 64 ? "sha256" : "sha1").update(`blob ${Buffer.byteLength(text, "utf8")}\0`).update(text, "utf8").digest("hex");
/** Where the read proof writes a reader's word into every listed text, each time on a line of its own. */
export const PLACES = ["start", "middle", "end"] as const;
export type Place = (typeof PLACES)[number];
export const withWordAt = (text: string, word: string, place: Place): string => {
  const at = place === "start" ? 0 : place === "end" ? text.length : Math.floor(text.length / 2);
  return `${text.slice(0, at)}\n${word}\n${text.slice(at)}`;
};
/** A reader: the paths of a read map it names. */
export type Reader = (texts: ReadonlyMap<string, string>) => readonly string[];
/**
 * One reader's read proof over the listing its claim covers. unread: every listed path the read map lacks, or holds a text for
 * that is not git's reading of the file (ids: git's blob id per path, from git hash-object in the census); extra: every path the
 * read map holds outside the listing; missed, per place: every listed path the reader does not name when each listed text of the
 * read map carries the reader's word at that place (its start, its middle, its end). So a read map that drops, blanks or
 * shortens a listed file names it in unread, and a reader that skips an entry, or reads only part of a text, names it in missed.
 */
export interface ReadProof {
  readonly unread: readonly string[];
  readonly extra: readonly string[];
  readonly missed: Readonly<Record<Place, readonly string[]>>;
}
export const FULL_READ: ReadProof = { unread: [], extra: [], missed: { start: [], middle: [], end: [] } };
/** The listed paths a read map lacks, or holds a text for that is not git's reading of the file (readProof's unread). */
export const unreadOf = (listing: readonly string[], texts: ReadonlyMap<string, string>, ids: ReadonlyMap<string, string>): string[] =>
  listing.filter(path => {
    const text = texts.get(path);
    const id = ids.get(path);
    return text === undefined || id === undefined || blobIdOf(text, id) !== id;
  });
export function readProof(listing: readonly string[], texts: ReadonlyMap<string, string>, ids: ReadonlyMap<string, string>, word: string, reader: Reader): ReadProof {
  const listed = new Set(listing);
  const unread = unreadOf(listing, texts, ids);
  const extra = [...texts.keys()].filter(path => !listed.has(path));
  const missedAt = (place: Place): string[] => {
    const marked = new Map(listing.flatMap(path => {
      const text = texts.get(path);
      return text === undefined ? [] : [[path, withWordAt(text, word, place)] as const];
    }));
    const named = new Set(reader(marked));
    return listing.filter(path => !named.has(path));
  };
  return { unread, extra, missed: { start: missedAt("start"), middle: missedAt("middle"), end: missedAt("end") } };
}
/** The read proof's own controls: a fixed three-file listing (each text 400 characters, so its middle is far from both ends). */
export const PROOF_LISTING: readonly string[] = ["src/workbench/zz-proof-a.ts", "src/workbench/zz-proof-b.ts", "src/workbench/zz-proof-c.ts"];
export const PROOF_WORD = "ProofWord";
const PROOF_TEXT = `${"// filler line of a listed file\n".repeat(12)}${"x".repeat(400 - 12 * 32)}`;
const proofTexts = (): Map<string, string> => new Map(PROOF_LISTING.map(path => [path, PROOF_TEXT] as const));
const wholeReader: Reader = texts => [...texts].filter(([, text]) => text.includes(PROOF_WORD)).map(([path]) => path);
/** Each control is a read map edit or a hollow reader; expect is the proof it must give (the whole reader and map give FULL_READ). */
export interface ProofControl {
  readonly id: string;
  readonly texts: (texts: Map<string, string>) => Map<string, string>;
  readonly reader: Reader;
  readonly expect: ReadProof;
}
const [PA, PB, PC] = PROOF_LISTING as readonly [string, string, string];
const missedEverywhere = (paths: readonly string[]): Record<Place, readonly string[]> => ({ start: paths, middle: paths, end: paths });
export const PROOF_CONTROLS: readonly ProofControl[] = [
  { id: "P-WHOLE", texts: texts => texts, reader: wholeReader, expect: FULL_READ },
  { id: "P-MAP-BLANK", texts: texts => new Map([...texts].map(([path, text]) => [path, path === PB ? "" : text] as const)), reader: wholeReader, expect: { ...FULL_READ, unread: [PB] } },
  { id: "P-MAP-SHORT", texts: texts => new Map([...texts].map(([path, text]) => [path, path === PC ? text.slice(0, -1) : text] as const)), reader: wholeReader, expect: { ...FULL_READ, unread: [PC] } },
  { id: "P-MAP-DROP", texts: texts => new Map([...texts].filter(([path]) => path !== PA)), reader: wholeReader, expect: { unread: [PA], extra: [], missed: missedEverywhere([PA]) } },
  { id: "P-MAP-EXTRA", texts: texts => new Map([...texts, ["src/workbench/zz-proof-unlisted.ts", PROOF_TEXT]]), reader: wholeReader, expect: { ...FULL_READ, extra: ["src/workbench/zz-proof-unlisted.ts"] } },
  { id: "P-READER-LAST", texts: texts => texts, reader: texts => wholeReader(new Map([...texts].slice(-1))), expect: { ...FULL_READ, missed: missedEverywhere([PA, PB]) } },
  { id: "P-READER-FIRST", texts: texts => texts, reader: texts => wholeReader(new Map([...texts].slice(0, 1))), expect: { ...FULL_READ, missed: missedEverywhere([PB, PC]) } },
  { id: "P-READER-HEAD", texts: texts => texts, reader: texts => wholeReader(new Map([...texts].map(([path, text]) => [path, text.slice(0, 64)] as const))), expect: { ...FULL_READ, missed: { start: [], middle: [PA, PB, PC], end: [PA, PB, PC] } } },
  { id: "P-READER-TAIL", texts: texts => texts, reader: texts => wholeReader(new Map([...texts].map(([path, text]) => [path, text.slice(-64)] as const))), expect: { ...FULL_READ, missed: { start: [PA, PB, PC], middle: [PA, PB, PC], end: [] } } },
  { id: "P-READER-BLANK", texts: texts => texts, reader: texts => wholeReader(new Map([...texts].map(([path]) => [path, ""] as const))), expect: { ...FULL_READ, missed: missedEverywhere([PA, PB, PC]) } },
];
/** A control's proof: git's ids stand in as the ids of the unedited texts. */
export const controlProof = (control: ProofControl): ReadProof => {
  const texts = proofTexts();
  const ids = new Map([...texts].map(([path, text]) => [path, blobIdOf(text)] as const));
  return readProof(PROOF_LISTING, control.texts(proofTexts()), ids, PROOF_WORD, control.reader);
};

// ---- docs/workbench/03's two GraphPolicyCLI sentences (G3) ----

/** The page's level-1 title (its em dash composed at run time, so this file stays ASCII): the parent path of both sections. */
export const DOCS_03_TITLE = `03 ${String.fromCodePoint(0x2014)} High-level architecture, module ownership and dataflow`;
export const OWNERSHIP_HEADING = "Ownership boundaries";
export const BOUNDARY_HEADING = "GraphPolicyCLI boundary";
/**
 * The ownership table's owner cell (its second column, "Authoritative owner") on GraphPolicyCLI's row: a row counts as a
 * GraphPolicyCLI row when its owner cell, as it shows in the document, names GraphPolicy (namesGraphPolicy), and the one such
 * row's owner cell source must be exactly this (ownership-owner, refusal #3's U3).
 */
export const GP_OWNER = "GraphPolicyCLI";
/** The first clause ("; "-cut) of that row's third cell ("Workbench may do"). */
export const OWNERSHIP_CELL = "nothing today (no gp seam is registered)";
/** The header of the table holding that row: the owner cell is read under its second column and the clause under its third. */
export const OWNERSHIP_HEADER: readonly string[] = ["Concern", "Authoritative owner", "Workbench may do"];
/** The heading after the Ownership boundaries section (an anchor of the D-SECOND-TABLE plant). */
export const NEXT_HEADING = "Package dependency direction";
export const BOUNDARY_SENTENCE = "Pi carries no GraphPolicyCLI (gp) integration today.";

/** What G3 read: the ownership row (how many GraphPolicyCLI rows, the one row's owner cell and first clause) and the boundary section's opening. */
export interface Docs03Reading {
  /**
   * rows: the body rows whose owner cell, as it shows in the document, names GraphPolicy; owner: the one such row's owner cell
   * source; other: the kinds of the section's blocks outside its tables that name GraphPolicyCLI (a row in a quoted or an HTML
   * table among them).
   */
  readonly ownership: { readonly refused: string | null; readonly rows: number; readonly owner: string | null; readonly header: readonly string[] | null; readonly cell: string | null; readonly other: readonly string[] };
  /** The opening's first sentence as rendered (inline marks removed) and in its markdown source (marks kept). */
  readonly boundary: { readonly refused: string | null; readonly first: string | null; readonly opening: string | null; readonly source: string | null };
}
/** The docs rules, in report order; a finding is its rule, one space, and what it found. */
export const DOCS_RULES = ["ownership-bound", "ownership-rows", "ownership-owner", "ownership-header", "ownership-cell", "ownership-other", "boundary-bound", "boundary-first", "boundary-opening"] as const;

/** An HTML block whose source is HTML comments only: it renders nothing, so the reading passes over it (any other HTML block renders). */
export const commentOnly = (raw: string): boolean => /^(?:\s*<!--[\s\S]*?-->)+\s*$/.test(raw);
/**
 * The type and markdown source of each top-level block of a level-2 section, from marked's own tokens (the parser the landed
 * binding lexes with), sliced at the section's heading up to the next heading of level 1 or 2: the binding's own bounding, read
 * only once the binding has bound the section. A table nested in a blockquote or a list renders no text in the binding's
 * blocks, so the Ownership check reads each block's source.
 */
export function sectionSources(page: string, heading: string): { readonly type: string; readonly raw: string }[] {
  const tokens = marked.lexer(page);
  const isHeading = (token: (typeof tokens)[number]): token is Tokens.Heading => token.type === "heading";
  const at = tokens.findIndex(token => isHeading(token) && token.depth === 2 && token.text === heading);
  const sources: { readonly type: string; readonly raw: string }[] = [];
  if (at === -1) return sources;
  for (const token of tokens.slice(at + 1)) {
    if (isHeading(token) && token.depth <= 2) break;
    if (token.type !== "space") sources.push({ type: token.type, raw: token.raw });
  }
  return sources;
}

// ---- what a table cell shows (refusal #3's U3: G3 reads the owner cell as it shows, not only its source) ----

const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const ENTITIES: Readonly<Record<string, string>> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&nbsp;": " " };
const decode = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, entity => ENTITIES[entity] ?? entity);
const clean = (text: string): string => text.replace(/\s+/g, " ").trim();
/** What a reader sees of inline tokens: the landed census rendering rule (test/helpers/census.ts inlineText), verbatim. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += "\n";
    else if (token.type === "codespan" || token.type === "escape") out += decode(textOf(token));
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token));
    else out += decode(textOf(token));
  }
  return out;
}
/**
 * What a table cell shows in the document: its source (sectionTables' grid cell) lexed inline with the document's link
 * reference definitions (as marked's lexer records them over the whole page), the way the binding's own lex of the page
 * renders the bound section's cells, read by the binding's rendering rule (markup and HTML show no text of their own),
 * whitespace collapsed: the landed control-loop audit's shownIn (test/helpers/gp-control-loop-audit.ts).
 */
export function shownIn(links: Links): (cell: string) => string {
  return cell => {
    const lexer = new Lexer();
    lexer.tokens.links = links;
    return clean(inlineText(lexer.inlineTokens(cell)));
  };
}
/**
 * A text names GraphPolicy when the landed vocabulary's V1 live pattern matches it (namedWords: case folded, any run of space,
 * tab, dot, underscore or hyphen between graph and policy, or none); G3 claims exactly OWNER_SPELLINGS' 24 spellings, each
 * pinned (R-B73); G3 hands it a cell's shown text, which collapses white space, so a tab or a run of spaces in a cell's source
 * reaches it as one space.
 */
export const namesGraphPolicy = (text: string): boolean => namedWords(text).includes("GraphPolicy");
/** A body row of a top-level table of the Ownership boundaries section, its owner cell (the second cell) in both views. */
export interface OwnerCell {
  readonly header: readonly string[];
  readonly row: readonly string[];
  /** The owner cell's source: the binding's grid cell (marked's cell text, inline markup kept). */
  readonly source: string;
  /** What the owner cell shows in the document (shownIn). */
  readonly shown: string;
}
/** Every body row's owner cell of the Ownership boundaries section's top-level tables as the landed binding bounds them (sectionTables), in both views. */
export function ownerCells(page: string): { readonly ok: boolean; readonly why: string; readonly cells: readonly OwnerCell[] } {
  const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [DOCS_03_TITLE]);
  const shown = shownIn(marked.lexer(page).links);
  return { ok: tables.ok, why: tables.why, cells: tables.grids.flatMap(grid => grid.slice(1).map(row => ({ header: grid[0] ?? [], row, source: row[1] ?? "", shown: shown(row[1] ?? "") }))) };
}
/**
 * The anchor that holds shownIn to the binding's own rendering: each top-level table of the Ownership boundaries section as
 * the binding renders it (docsSection's table blocks: its inlineText over the cells its own lex of the page made), beside the
 * same tables' cells as a renderer (shownIn unless a control hands another) renders them from sectionTables' sources, joined
 * the binding's way. G3 holds the two equal on the live page and on every plant, so a shownIn that stops rendering as the
 * binding renders reds G3, and holds a control renderer that shows each cell's source unequal on the live page (its GraphPolicyCLI
 * row's third cell carries a code span), so the comparison itself is live.
 */
export function tableViews(page: string, renderer: (links: Links) => (cell: string) => string = shownIn): { readonly bound: readonly string[]; readonly shown: readonly string[] } {
  const section = docsSection(page, OWNERSHIP_HEADING, 2, [DOCS_03_TITLE]);
  const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [DOCS_03_TITLE]);
  const shown = renderer(marked.lexer(page).links);
  return { bound: section.blocks.flatMap(block => (block.kind === "other" && block.type === "table" ? [block.text] : [])), shown: tables.grids.map(grid => clean(grid.flat().map(shown).join(" "))) };
}

/** A rendered paragraph's first sentence: its text up to the first ". ", or the whole text. */
const firstSentence = (text: string): string => {
  const end = text.indexOf(". ");
  return end === -1 ? text : text.slice(0, end + 1);
};
/**
 * G3's reading of docs/03 through the landed docs binding (test/helpers/census.ts): ONE binding per heading, each heading once
 * in the rendered view under the page title. The ownership rows are the body rows of the Ownership boundaries section's
 * top-level tables (sectionTables) whose owner cell, the second cell, names GraphPolicy as it shows in the document (shownIn,
 * then namesGraphPolicy: bold, code, link, HTML or escaped markup, or other words beside it as in "GraphPolicyCLI (gp)", all
 * count, refusal #3's U3); the one such row's owner cell source must be exactly GraphPolicyCLI (ownership-owner); its table's
 * header is read (refusal #2's header-rename falsifier: the cell is read under the header that names it), its third cell's
 * source is read up to its first "; "; rows are counted by the owner cell only (a row naming GraphPolicyCLI in another cell,
 * a header row, or an owner cell that shows gp by a spelling namedWords does not read, is R-OWNER-CELL, Q9); and every other block of that section whose
 * source holds the text GraphPolicyCLI (sectionSources: a row in a quoted, listed or HTML table renders as a row the top-level
 * grids never hold; a block of HTML comments only is passed over);
 * the opening is the first sentence of the boundary section's first block in the binding's view that is not an HTML block of
 * comments only (such a block renders nothing, so it is passed over; any other HTML block renders and is that first block)
 * when that block is a paragraph,
 * read twice: as rendered (the binding's text, inline marks removed) and in its source (the binding's markdown, marks kept),
 * so a struck "no" (~~no~~ or <del>no</del>, refusal #2's strike falsifier), which renders the same characters, is read.
 */
export function docs03Reading(page: string): Docs03Reading {
  const tables = ownerCells(page);
  const held = tables.cells.filter(cell => namesGraphPolicy(cell.shown));
  const one = held.length === 1 ? held[0] : undefined;
  const row = one?.row;
  const other = tables.ok
    ? sectionSources(page, OWNERSHIP_HEADING)
        .filter(block => block.type !== "table" && !(block.type === "html" && commentOnly(block.raw)) && block.raw.includes(GP_OWNER))
        .map(block => block.type)
    : [];
  const section = docsSection(page, BOUNDARY_HEADING, 2, [DOCS_03_TITLE]);
  const first = section.blocks.find(block => !(block.kind === "html" && commentOnly(block.raw)));
  return {
    ownership: { refused: tables.ok ? null : tables.why, rows: held.length, owner: one === undefined ? null : one.source, header: one === undefined ? null : [...one.header], cell: row === undefined ? null : ((row[2] ?? "").split("; ")[0] ?? ""), other },
    boundary: { refused: section.ok ? null : section.why, first: first?.kind ?? null, opening: first?.kind === "paragraph" ? firstSentence(first.text) : null, source: first?.kind === "paragraph" ? firstSentence(first.markdown) : null },
  };
}

/** Judge a reading: exactly one GraphPolicyCLI ownership row registering no gp seam, and a boundary section opening with the sentence. */
export function docs03Findings(reading: Docs03Reading): string[] {
  const findings: string[] = [];
  const { ownership, boundary } = reading;
  if (ownership.refused !== null) findings.push(`ownership-bound ${ownership.refused}`);
  else if (ownership.rows !== 1) findings.push(`ownership-rows the ${OWNERSHIP_HEADING} section holds ${ownership.rows} ${GP_OWNER} rows, not one`);
  else if (ownership.owner !== GP_OWNER) findings.push(`ownership-owner the ${GP_OWNER} row's owner cell reads ${JSON.stringify(ownership.owner)} in its source, not exactly ${JSON.stringify(GP_OWNER)}`);
  else if (!isDeepStrictEqual(ownership.header, OWNERSHIP_HEADER)) findings.push(`ownership-header the table holding the ${GP_OWNER} row is headed ${JSON.stringify(ownership.header)}, not ${JSON.stringify(OWNERSHIP_HEADER)}`);
  else if (ownership.cell !== OWNERSHIP_CELL) findings.push(`ownership-cell the ${GP_OWNER} row's Workbench cell opens ${JSON.stringify(ownership.cell)}, not ${JSON.stringify(OWNERSHIP_CELL)}`);
  if (ownership.other.length > 0) findings.push(`ownership-other the ${OWNERSHIP_HEADING} section names ${GP_OWNER} outside its tables, in ${ownership.other.join(", ")}`);
  if (boundary.refused !== null) findings.push(`boundary-bound ${boundary.refused}`);
  else if (boundary.first !== "paragraph") findings.push(`boundary-first the ${BOUNDARY_HEADING} section's first rendered block is ${boundary.first ?? "nothing"}, not a paragraph`);
  else if (boundary.opening !== BOUNDARY_SENTENCE || boundary.source !== BOUNDARY_SENTENCE) findings.push(`boundary-opening the ${BOUNDARY_HEADING} section opens ${JSON.stringify(boundary.opening)} (source ${JSON.stringify(boundary.source)}), not ${JSON.stringify(BOUNDARY_SENTENCE)}`);
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
/** A second row in the GraphPolicyCLI row's own table, right after it, registering a gp seam under the given owner cell (refusal #3's U3 plants). */
const seamRowOwnedBy = (owner: string): string => `| Policy decision seams | ${owner} | the gp seam at src/workbench/gp-seam.ts |`;
const afterGpRow = (page: string, row: string): string => lineIn(page, ROW_ANCHOR, line => [line, row]);
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
  // Refusal #2's gate-authored docs falsifiers (its LEG 2), the header rename that stayed green among them.
  { id: "D-HEADER-SWAP", edit: page => onceIn(page, `| ${OWNERSHIP_HEADER.join(" | ")} |`, `| Concern | Authoritative owner | Workbench must never do |`), expect: ["ownership-header"] },
  { id: "D-BLOCKQUOTE", edit: page => lineIn(page, BOUNDARY_SENTENCE, line => [`> ${line}`]), expect: ["boundary-first"] },
  { id: "D-LIST-LEAD", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n- Pi carries a gp seam at src/workbench/gp-seam.ts.\n\n`), expect: ["boundary-first"] },
  { id: "D-SECOND-TABLE", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n| Added concern | Owner | Workbench may do |\n| --- | --- | --- |\n| Policy scores | ${GP_OWNER} | the gp seam at src/workbench/gp-seam.ts |\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-rows"] },
  { id: "D-STRIKE", edit: page => onceIn(page, BOUNDARY_SENTENCE, "Pi carries ~~no~~ GraphPolicyCLI (gp) integration today."), expect: ["boundary-opening"] },
  { id: "D-STRIKE-HTML", edit: page => onceIn(page, BOUNDARY_SENTENCE, "Pi carries <del>no</del> GraphPolicyCLI (gp) integration today."), expect: ["boundary-opening"] },
  { id: "D-SETEXT-DUP", edit: page => `${page.trimEnd()}\n\n${BOUNDARY_HEADING}\n${"-".repeat(BOUNDARY_HEADING.length)}\n\n${BOUNDARY_SENTENCE}\n`, expect: ["boundary-bound"] },
  { id: "D-CELL-STRIKE", edit: page => onceIn(page, ROW_ANCHOR, `| ${GP_OWNER} | ~~${OWNERSHIP_CELL}~~`), expect: ["ownership-cell"] },
  // Rendered blocks the grids and the opening would pass over: a visible HTML block leading the section, a row in a quoted table, a row in an HTML table.
  { id: "D-HTML-LEAD", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n<p>Pi carries a GraphPolicyCLI (gp) seam at src/workbench/gp-seam.ts.</p>\n\n`), expect: ["boundary-first"] },
  { id: "D-QUOTED-ROW", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n> | Quoted concern | Owner | Workbench may do |\n> | --- | --- | --- |\n> | Policy scores | ${GP_OWNER} | the gp seam at src/workbench/gp-seam.ts |\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  { id: "D-HTML-ROW", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n<table><tr><td>Policy scores</td><td>${GP_OWNER}</td><td>the gp seam at src/workbench/gp-seam.ts</td></tr></table>\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  { id: "D-LISTED-ROW", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n- | Listed concern | Owner | Workbench may do |\n  | --- | --- | --- |\n  | Policy scores | ${GP_OWNER} | the gp seam at src/workbench/gp-seam.ts |\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  // Quiet: an HTML comment naming GraphPolicyCLI in the Ownership section renders nothing.
  { id: "D-OWNER-COMMENT", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n<!-- ${GP_OWNER}: an editor's note -->\n\n## ${NEXT_HEADING}\n`), expect: [] },
  // Refusal #3's U3 members: a second row of the same table whose owner cell shows GraphPolicyCLI through markup or beside an alias.
  { id: "D-GP-BOLD-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`**${GP_OWNER}**`)), expect: ["ownership-rows"] },
  { id: "D-GP-CODE-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`\`${GP_OWNER}\``)), expect: ["ownership-rows"] },
  { id: "D-GP-LINK-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`[${GP_OWNER}](#graphpolicycli-boundary)`)), expect: ["ownership-rows"] },
  { id: "D-GP-ALIAS-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`${GP_OWNER} (gp)`)), expect: ["ownership-rows"] },
  // Further shapes of the same class: HTML markup, and an escape only the shown view reads (the source names no vocabulary word).
  { id: "D-GP-HTML-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`<b>${GP_OWNER}</b>`)), expect: ["ownership-rows"] },
  { id: "D-GP-ESCAPE-ROW", edit: page => afterGpRow(page, seamRowOwnedBy("Graph\\_PolicyCLI")), expect: ["ownership-rows"] },
  // A reference-style link whose definition sits at the page's end: the cell shows its link text only through the page's link
  // definitions, so a shownIn that drops them shows the brackets and reds tableViews' same-view hold.
  { id: "D-GP-REFLINK-ROW", edit: page => `${afterGpRow(page, seamRowOwnedBy(`[${GP_OWNER}][gp-boundary]`)).trimEnd()}\n\n[gp-boundary]: #graphpolicycli-boundary\n`, expect: ["ownership-rows"] },
  // The one GraphPolicyCLI row's owner cell must be exactly GraphPolicyCLI in its source.
  { id: "D-OWNER-BOLD", edit: page => onceIn(page, ROW_ANCHOR, `| **${GP_OWNER}** | ${OWNERSHIP_CELL}`), expect: ["ownership-owner"] },
  { id: "D-OWNER-ALIAS", edit: page => onceIn(page, ROW_ANCHOR, `| ${GP_OWNER} (gp) | ${OWNERSHIP_CELL}`), expect: ["ownership-owner"] },
  // Quiet: an HTML comment naming GraphPolicyCLI inside another row's owner cell shows nothing, so that row shows Pi's.
  { id: "D-OWNER-CELL-COMMENT", edit: page => afterGpRow(page, `| Editor notes | <!-- ${GP_OWNER} -->Pi | register commands/tools/components |`), expect: [] },
  // Refusal #4's U1 under R-B66 (3): a second row of the same table owned by each GraphPolicy spelling (OWNER_SPELLINGS: each
  // joiner of the class alone, none, a repeated and a mixed run, in each case form), each one counted.
  ...OWNER_SPELLINGS.map(entry => ({ id: `D-GP-SPELLED-${spellingTag(entry)}`, edit: (page: string): string => afterGpRow(page, seamRowOwnedBy(entry.spelling)), expect: ["ownership-rows"] })),
  // R-B66 (3): the rendering rule's other inline forms in a second row, each held to the binding's rendering by tableViews:
  // emphasis, a strike, a no-break space entity, entity references in text and in a code span (marked hands both texts over as
  // their source, so the rule's decode is what turns each reference into its character), and escaped punctuation (an escape
  // token's text is the one character it escapes, which shows as itself).
  { id: "D-GP-EMPH-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`_${GP_OWNER}_`)), expect: ["ownership-rows"] },
  { id: "D-GP-STRIKE-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`~~${GP_OWNER}~~`)), expect: ["ownership-rows"] },
  { id: "D-GP-NBSP-ROW", edit: page => afterGpRow(page, seamRowOwnedBy("Graph&nbsp;PolicyCLI")), expect: ["ownership-rows"] },
  { id: "D-GP-ENTITY-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`${GP_OWNER} &amp; &lt;gp&gt; &quot;gp&quot; &#39;gp&#39; &#x27;gp&#x27;`)), expect: ["ownership-rows"] },
  { id: "D-GP-CODE-ENTITY-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`\`${GP_OWNER} &amp; &lt;gp&gt; &quot;gp&quot;\``)), expect: ["ownership-rows"] },
  { id: "D-GP-ESCAPE-ENTITY-ROW", edit: page => afterGpRow(page, seamRowOwnedBy(`${GP_OWNER} \\& \\<gp\\>`)), expect: ["ownership-rows"] },
  // R-B66 (3): every further block type the section's other blocks are read in (a paragraph, a fenced code block, a lower
  // heading, and a link reference definition, which marked emits as a def block; the blockquote, the list and the HTML block
  // are the plants above).
  { id: "D-OTHER-PARAGRAPH", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n${GP_OWNER} decides policy scores through the gp seam at src/workbench/gp-seam.ts.\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  { id: "D-OTHER-CODE", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n\`\`\`\n${GP_OWNER} decides policy scores\n\`\`\`\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  { id: "D-OTHER-HEADING", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n### ${GP_OWNER} seams\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  { id: "D-OTHER-DEF", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n[gp-note]: #graphpolicycli-boundary "${GP_OWNER}"\n\n## ${NEXT_HEADING}\n`), expect: ["ownership-other"] },
  // R-B66 (3): the header, the cell clause and the opening sentence are each compared exactly, case included, cell by cell.
  { id: "D-HEADER-SWAP-FIRST", edit: page => onceIn(page, `| ${OWNERSHIP_HEADER.join(" | ")} |`, "| Area | Authoritative owner | Workbench may do |"), expect: ["ownership-header"] },
  { id: "D-HEADER-SWAP-SECOND", edit: page => onceIn(page, `| ${OWNERSHIP_HEADER.join(" | ")} |`, "| Concern | Owner | Workbench may do |"), expect: ["ownership-header"] },
  { id: "D-CELL-CASE", edit: page => onceIn(page, ROW_ANCHOR, `| ${GP_OWNER} | Nothing today (no gp seam is registered)`), expect: ["ownership-cell"] },
  { id: "D-SENTENCE-CASE", edit: page => onceIn(page, BOUNDARY_SENTENCE, "Pi carries no GraphPolicyCLI (gp) integration TODAY."), expect: ["boundary-opening"] },
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
  Q6: "R-DEFERRED",
  Q7: "R-OUTSIDE",
  Q8: "R-REQUEST",
  Q9: "R-OWNER-CELL",
};
export const ROWS: readonly Row[] = [
  { id: "A", label: "a pure exporter test builds GraphDataIR from an ObservationProjection fixture and asserts every node and edge traces to a native ref inside the caller's scope", pins: ["A1", "A2", "A3", "A4", "A5"] },
  { id: "B", label: "coverage partial/unknown rows export as explicit unknown (never absent, never a guessed value)", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "sourceRevision/subjectBasis are carried verbatim", pins: ["C1", "C2", "C3"] },
  { id: "D", label: "candidate actions are exactly the host's admissible set (NATIVE_CONTROL_ACTIONS at control.ts:30-37 or typed executor requests)", pins: ["D1", "D2", "D3"] },
  { id: "E", label: "and a snapshot over the declared node/edge/byte budget is refused with a typed unavailable", pins: ["E1", "E2", "E3", "E4"] },
  { id: "F", label: "never truncated silently", pins: ["F1"] },
  { id: "G", label: "When Pi exports a request to GraphPolicyCLI (artifact: released GraphDataIR schema + an owner-decided Pi decision point)", pins: ["G1", "G2", "G3"] },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"] },
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
  /** The static reading that holds the member live: "shape" (its raw text names a key of the vendored v1 document before a colon, shapeKeysOf) or "composed" (its double-quoted literals, decoded and joined, are read by a source reader, composedOf), either over a text holding no comment opener (R-COMMENTED). */
  readonly live: "shape" | "composed";
}
export interface OutcomeResidual {
  readonly kind: "outcome";
  readonly id: string;
  /** An edit of the reference's conforming export that the judge does not read. */
  readonly edit: (outcome: Exported) => Exported;
}
export interface DriveResidual {
  readonly kind: "drive";
  readonly id: string;
  /** A fresh drive for each row run (a member may count its own calls), judged by driveFindings on K-FITS. */
  readonly drive: () => Drive;
  /** Undo what the member leaves outside the projection, once its row has judged it. */
  readonly after?: () => void;
  /** What the member does, as driveEffects reads it; every effect it does not name reads as NO_EFFECTS'. */
  readonly effect: Partial<DriveEffects>;
}
export interface DocsResidual {
  readonly kind: "docs";
  readonly id: string;
  /** An in-memory edit of the live docs/03 that G3's reading does not count, read by docs03Reading and judged by docs03Findings. */
  readonly edit: (page: string) => string;
}
export type Residual = SourceResidual | OutcomeResidual | DriveResidual | DocsResidual;
/** The global mark of the q7-global-write member (a registered symbol on globalThis, removed by its row). */
export const GLOBAL_MARK = Symbol.for("wb-0lf.2 R-OUTSIDE");
/** The module record of the q7-module-record member: a drive's own state outside the projection. */
const DRIVE_RECORD = new WeakMap<object, number>();
/** The module record q7-module-record keeps of a view (driveEffects reads it back). */
export const moduleRecordOf = (projection: object): number | undefined => DRIVE_RECORD.get(projection);
/** What a drive does that the five legs do not read, as driveEffects observes it (each drive residual's liveness; NO_EFFECTS is the reference drive's). */
export interface DriveEffects {
  /** The projection methods the drive called through its view after its calls had returned (its timers run), by name. */
  readonly deferredCalls: readonly string[];
  /** The projection its first call was handed reads frozen once its timers have run. */
  readonly projectionFrozen: boolean;
  /** GLOBAL_MARK reads true on globalThis right after its first call. */
  readonly globalMark: boolean;
  /** It left a module record of the view its first call was handed (moduleRecordOf). */
  readonly moduleRecord: boolean;
  /** The symbol-keyed properties it read through its views, as String(symbol). */
  readonly symbolReads: readonly string[];
  /** The fields of its first request bound to another object than the one it was handed. */
  readonly rebound: readonly string[];
  /** The keys it added to its first request. */
  readonly addedKeys: readonly string[];
  /** Its first request reads frozen after the calls. */
  readonly requestFrozen: boolean;
  /** Its third call's outcome reads unlike its first's (isDeepStrictEqual). */
  readonly thirdDiffers: boolean;
}
export const NO_EFFECTS: DriveEffects = { deferredCalls: [], projectionFrozen: false, globalMark: false, moduleRecord: false, symbolReads: [], rebound: [], addedKeys: [], requestFrozen: false, thirdDiffers: false };
const REQUEST_FIELDS = ["projection", "scope", "budget"] as const;
/**
 * Observe a drive on fixture projections of its own, never driveFindings' (R-B66 and rule 19's residual definition: a quiet row
 * reds when its member is silenced): one drive from make(), called three times on K-FITS, each call on a fresh fixture
 * projection behind a view that hands out every property and records each symbol-keyed read, and each method call made once
 * the calls have returned, with a fresh request (fresh scope and budget copies). after() runs before the first call and once
 * the calls' timers have run; the first call's request, view and projection are read back then.
 */
export async function driveEffects(make: () => Drive, after: () => void = () => undefined): Promise<DriveEffects> {
  const row = caseRow("K-FITS");
  const scope = scopeSpec(row.scope).scope;
  const drive = make();
  const deferred = new Set<string>();
  const symbols = new Set<string>();
  let returned = false;
  const calls: { readonly target: ObservationProjection; readonly view: ObservationProjection; readonly handed: { readonly projection: ObservationProjection; readonly scope: ObservationScope; readonly budget: ExportBudget }; readonly request: ExportRequest; readonly outcome: unknown }[] = [];
  let globalMark = false;
  after();
  try {
    for (let call = 0; call < 3; call++) {
      const target = buildProjection();
      const view = new Proxy(target, {
        get(inner, property) {
          if (typeof property === "symbol") symbols.add(String(property));
          const value: unknown = Reflect.get(inner, property, inner);
          if (typeof value !== "function") return value;
          return (...args: unknown[]): unknown => {
            if (returned) deferred.add(String(property));
            return Reflect.apply(value, inner, args);
          };
        },
      });
      const handed = { projection: view, scope: { ...scope }, budget: { ...row.budget } };
      const request: ExportRequest = { ...handed };
      const outcome = await drive(request);
      if (call === 0) globalMark = Reflect.get(globalThis, GLOBAL_MARK) === true;
      calls.push({ target, view, handed, request, outcome });
    }
    returned = true;
    await new Promise(resolve => setTimeout(resolve, 20));
  } finally {
    after();
  }
  const first = calls[0];
  return {
    deferredCalls: [...deferred].sort(),
    projectionFrozen: first !== undefined && Object.isFrozen(first.target),
    globalMark,
    moduleRecord: first !== undefined && moduleRecordOf(first.view) !== undefined,
    symbolReads: [...symbols].sort(),
    rebound: first === undefined ? [] : REQUEST_FIELDS.filter(field => Reflect.get(first.request, field) !== first.handed[field]),
    addedKeys: first === undefined ? [] : Reflect.ownKeys(first.request).filter(key => !(REQUEST_FIELDS as readonly PropertyKey[]).includes(key)).map(String),
    requestFrozen: first !== undefined && Object.isFrozen(first.request),
    thirdDiffers: calls.length === 3 && !isDeepStrictEqual(calls[2]?.outcome, calls[0]?.outcome),
  };
}
/** A source member's double-quoted string literals, each decoded as JSON decodes it, joined in order: the word R-COMPOSED's member builds at run time, read over its raw text, comments included (so R-COMMENTED refuses a comment opener). */
export const composedOf = (text: string): string =>
  [...text.matchAll(/"((?:[^"\\\n]|\\.)*)"/g)]
    .map(match => {
      try {
        const decoded: unknown = JSON.parse(`"${match[1] ?? ""}"`);
        return typeof decoded === "string" ? decoded : "";
      } catch {
        return "";
      }
    })
    .join("");
/** The object keys a source member's text names (an identifier before a colon) that are keys of the given document: R-UNNAMED's static reading of a GraphDataIR-shaped value, over its raw text, comments included (so R-COMMENTED refuses a comment opener). */
export const shapeKeysOf = (text: string, keys: ReadonlySet<string>): string[] => [...new Set([...text.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\s*:/g)].map(match => match[1] ?? "").filter(key => keys.has(key)))];
const withGraph = (outcome: Exported, change: (graph: Record<string, unknown>) => Record<string, unknown>): Exported => ({ ...outcome, graph: change(structuredClone(outcome.graph) as Record<string, unknown>) });
export const RESIDUALS: Readonly<Record<string, readonly Residual[]>> = {
  // A module that builds a GraphDataIR-shaped document without naming a site word is no site: the reader reads words.
  Q1: [
    { kind: "source", path: "src/workbench/q1-shape.ts", live: "shape", text: "export const snapshot = (entities: unknown[]): unknown => ({ schema_ref: { namespace: NAMESPACE }, entities, relations: [] });\ndeclare const NAMESPACE: string;\n" },
    { kind: "source", path: "src/workbench/q1-incidences.ts", live: "shape", text: 'export const edge = (from: string, to: string): unknown => ({ incidences: [{ participant: from, role: "source" }, { participant: to, role: "target" }] });\n' },
  ],
  // A reader's word built at run time or spelled through an escape: every source reader reads source characters only. The
  // joined namespace is G1's site word and G2's namespace, the escape G1's site word, the joined kind D3's executor request.
  Q2: [
    { kind: "source", path: "src/workbench/q2-joined.ts", live: "composed", text: 'export const NAMESPACE = ["graph", "policy"].join("") + ".data.v1";\n' },
    { kind: "source", path: "src/workbench/q2-escape.ts", live: "composed", text: 'export const NAME = "Graph\\u0044ataIR";\n' },
    { kind: "source", path: "src/workbench/q2-request.ts", live: "composed", text: 'export const KIND = ["Executor", "Request"].join("");\n' },
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
  // A write the drive defers past its own settlement (a timer, refusal #2's F4 P-DEFERRED-WRITE): every leg reads once both
  // drives have settled, so neither the write leg nor the state leg sees it.
  Q6: [
    {
      kind: "drive",
      id: "q6-timer-write",
      effect: { deferredCalls: ["disconnect"] },
      drive: () => request => {
        const view = request.projection;
        setTimeout(() => view.disconnect(UNHELD_PROVIDER), 0);
        return referenceExport(request);
      },
    },
    {
      kind: "drive",
      id: "q6-timer-freeze",
      effect: { projectionFrozen: true },
      drive: () => request => {
        const view = request.projection;
        setTimeout(() => Object.freeze(view), 0);
        return referenceExport(request);
      },
    },
  ],
  // What a drive does outside what the five legs read (global and module state, and calls the view never hands out), read only
  // through the outcomes of two drives: a global mark, a module record of the projection, an outcome that changes from the third
  // call on (refusal #1's F4), and an effect-free inherited call reached past the view (refusal #3's F4): the view records only the
  // calls it hands out through its get trap, so Object.prototype.toString.call(view) is never recorded and changes nothing.
  Q7: [
    {
      kind: "drive",
      id: "q7-global-write",
      effect: { globalMark: true },
      drive: () => request => {
        Reflect.set(globalThis, GLOBAL_MARK, true);
        return referenceExport(request);
      },
      after: () => {
        Reflect.deleteProperty(globalThis, GLOBAL_MARK);
      },
    },
    {
      kind: "drive",
      id: "q7-module-record",
      effect: { moduleRecord: true },
      drive: () => request => {
        DRIVE_RECORD.set(request.projection, (DRIVE_RECORD.get(request.projection) ?? 0) + 1);
        return referenceExport(request);
      },
    },
    {
      kind: "drive",
      id: "q7-third-call",
      effect: { thirdDiffers: true },
      drive: () => {
        let calls = 0;
        return request => {
          calls++;
          const outcome = referenceExport(request);
          return calls >= 3 && outcome.ok ? { ...outcome, candidates: [] } : outcome;
        };
      },
    },
    {
      kind: "drive",
      id: "q7-past-view-call",
      effect: { symbolReads: ["Symbol(Symbol.toStringTag)"] },
      drive: () => request => {
        Object.prototype.toString.call(request.projection);
        return referenceExport(request);
      },
    },
  ],
  // The request object itself (refusal #3's U2 cure reads the scope and budget objects the judge handed, never the request's
  // fields after the drives): a field rebound to an equal fresh copy with no edit (the gate's CTRL-REBIND-ONLY), a key added to
  // the request, the request frozen, and its projection field rebound to another object after the export (refusal #4's F4
  // L2-REQUEST-PROJECTION-REBIND: the state leg walks the projections the judge built, never the request's field), each
  // leaving both handed objects fresh copies, read pure.
  Q8: [
    {
      kind: "drive",
      id: "q8-rebind-equal",
      effect: { rebound: ["budget"] },
      drive: () => request => {
        const outcome = referenceExport(request);
        Reflect.set(request, "budget", { ...request.budget });
        return outcome;
      },
    },
    {
      kind: "drive",
      id: "q8-request-key",
      effect: { addedKeys: ["exportedBy"] },
      drive: () => request => {
        const outcome = referenceExport(request);
        Reflect.set(request, "exportedBy", "pi");
        return outcome;
      },
    },
    {
      kind: "drive",
      id: "q8-request-freeze",
      effect: { requestFrozen: true },
      drive: () => request => {
        const outcome = referenceExport(request);
        Object.freeze(request);
        return outcome;
      },
    },
    {
      kind: "drive",
      id: "q8-projection-rebind",
      effect: { rebound: ["projection"] },
      drive: () => request => {
        const outcome = referenceExport(request);
        Reflect.set(request, "projection", {});
        return outcome;
      },
    },
  ],
  // G3 counts GraphPolicyCLI rows by each body row's second cell as it shows, through the vocabulary's GraphPolicy word: a row
  // naming GraphPolicyCLI only in another cell (the gate's D-GP-CONCERN-ROW in its Concern cell, its Workbench cell, or the first
  // cell of a table whose header moves the owner column there), a header row (a table of one header row naming it in its second
  // cell), and a second cell that shows gp by a spelling the word does not read (the binary's name, a character reference the
  // binding's rendering rule leaves undecoded: decimal, hexadecimal (refusal #4's F5 L2-GP-HEXREF-ROW) or named (its
  // L2-GP-SHY-ROW, &shy;), an invisible or a confusable character inside the word) are not counted. Each member lands in the
  // section's tables (the census holds the binding's rendered tables to differ).
  Q9: [
    { kind: "docs", id: "q9-concern-cell", edit: page => afterGpRow(page, `| ${GP_OWNER} decision seams | Pi | the gp seam at src/workbench/gp-seam.ts |`) },
    { kind: "docs", id: "q9-workbench-cell", edit: page => afterGpRow(page, `| Policy decision seams | Pi | delegates to ${GP_OWNER} through the gp seam at src/workbench/gp-seam.ts |`) },
    {
      kind: "docs",
      id: "q9-owner-column-moved",
      edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n| Authoritative owner | Concern | Workbench may do |\n| --- | --- | --- |\n| ${GP_OWNER} | Policy decision seams | the gp seam at src/workbench/gp-seam.ts |\n\n## ${NEXT_HEADING}\n`),
    },
    { kind: "docs", id: "q9-header-row", edit: page => onceIn(page, `\n## ${NEXT_HEADING}\n`, `\n${seamRowOwnedBy(GP_OWNER)}\n| --- | --- | --- |\n\n## ${NEXT_HEADING}\n`) },
    { kind: "docs", id: "q9-owner-gp", edit: page => afterGpRow(page, seamRowOwnedBy("gp")) },
    { kind: "docs", id: "q9-owner-reference", edit: page => afterGpRow(page, seamRowOwnedBy("&#71;raphPolicyCLI")) },
    { kind: "docs", id: "q9-owner-invisible", edit: page => afterGpRow(page, seamRowOwnedBy(`Graph${String.fromCodePoint(0x200b)}PolicyCLI`)) },
    { kind: "docs", id: "q9-owner-confusable", edit: page => afterGpRow(page, seamRowOwnedBy(`Gr${String.fromCodePoint(0x430)}phPolicyCLI`)) },
    { kind: "docs", id: "q9-owner-hexref", edit: page => afterGpRow(page, seamRowOwnedBy("&#x47;raphPolicyCLI")) },
    { kind: "docs", id: "q9-owner-named-reference", edit: page => afterGpRow(page, seamRowOwnedBy("Graph&shy;PolicyCLI")) },
  ],
};
export const residualId = (member: Residual): string => (member.kind === "source" ? member.path : member.id);

// ---- the fail-closed core (R-B73, the final cut; R-B67's form): outside each pinned set the census refuses, typed ----

/** Texts in path order (the order siteFindings reads them in). */
const inPathOrder = (texts: ReadonlyMap<string, string>): (readonly [string, string])[] => [...texts].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
/** A pattern read globally (every match, left to right), its own flags kept; a fresh object per call, so no lastIndex is shared. */
const globally = (pattern: RegExp): RegExp => new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
/**
 * G1's fail-closed reader (R-B73): each text in path order, each site word's live pattern (the VOCABULARY pattern namedWords
 * tests) read globally over it, and every match whose text is not one of that word's 24 pinned spellings (SITE_WORD_SPELLINGS)
 * refused, S-UNPINNED, naming the match; a site word with no live pattern is refused too. It runs its own loop over the texts,
 * so an edit of siteFindings that stops reading a match leaves this reader refusing it, and an edit of this reader that stops
 * refusing a match leaves siteFindings reading it (S-UNREGISTERED).
 */
export function unpinnedSiteFindings(texts: ReadonlyMap<string, string>): string[] {
  const findings: string[] = [];
  for (const [file, text] of inPathOrder(texts)) {
    for (const word of SITE_WORDS) {
      const live = VOCABULARY.find(entry => entry.spelling === word)?.pattern;
      if (live === undefined) {
        findings.push(`S-UNPINNED ${file} names ${word}, a site word with no live pattern in the landed vocabulary`);
        continue;
      }
      const pinned = new Set(SITE_WORD_SPELLINGS.filter(entry => entry.word === word).map(entry => entry.spelling));
      for (const match of text.matchAll(globally(live))) if (!pinned.has(match[0])) findings.push(`S-UNPINNED ${file} names ${word} as ${JSON.stringify(match[0])}, a spelling outside G1's pinned set`);
    }
  }
  return findings;
}
/**
 * D3's fail-closed reader (R-B73): each text in path order, D3's pattern (EXECUTOR_REQUEST) read globally over it, and every
 * match whose text is not one of its 12 pinned spellings (EXECUTOR_REQUEST_SPELLINGS) refused, D3-UNPINNED, naming the match.
 * Its own loop, as G1's: an edit of either D3 reader alone leaves the other reading the match.
 */
export function unpinnedExecutorRequestFindings(texts: ReadonlyMap<string, string>): string[] {
  const pinned = new Set(EXECUTOR_REQUEST_SPELLINGS.map(entry => entry.spelling));
  const findings: string[] = [];
  for (const [file, text] of inPathOrder(texts)) for (const match of text.matchAll(globally(EXECUTOR_REQUEST))) if (!pinned.has(match[0])) findings.push(`D3-UNPINNED ${file} names a typed executor request as ${JSON.stringify(match[0])}, a spelling outside D3's pinned set`);
  return findings;
}
/**
 * The comment openers (// and /*) a residual source member's raw text holds, inside its string literals too: the static
 * liveness proxies (shapeKeysOf, composedOf) read raw text and cannot tell a comment from code.
 */
export const commentOpeners = (text: string): number => [...text.matchAll(/\/[/*]/g)].length;
/** S2's fail-closed refusal (R-B73): a residual source member whose text holds a comment opener is refused, R-COMMENTED. */
export const commentFindings = (path: string, text: string): string[] => {
  const openers = commentOpeners(text);
  return openers === 0 ? [] : [`R-COMMENTED ${path} holds ${openers} comment opener${openers === 1 ? "" : "s"} (// or /*), so its static liveness proxy could read a comment as code`];
};
/** The paths a fail-closed reader's findings name (each finding's second word), each once in order: the reader its read proof drives. */
export const findingPaths = (findings: readonly string[]): string[] => [...new Set(findings.map(finding => finding.split(" ", 2)[1] ?? ""))];
/** A form outside G1's or D3's pinned spellings: a src module read after the tracked modules. */
export interface FailClosedSource {
  readonly kind: "source";
  readonly id: string;
  readonly claim: "G1" | "D3";
  readonly path: string;
  readonly text: string;
  /** The words the claim's word reader names in the form (siteFindings' words for G1, ExecutorRequest for D3). */
  readonly words: readonly string[];
  /** Each match the claim's fail-closed reader refuses, in order: its word and its text. */
  readonly unpinned: readonly { readonly word: string; readonly match: string }[];
}
/** A form outside G3's pinned plants: an in-memory edit of the live docs/03, read by docs03Reading and judged by docs03Findings. */
export interface FailClosedDocs {
  readonly kind: "docs";
  readonly id: string;
  readonly claim: "G3";
  readonly edit: (page: string) => string;
  /** The docs rules it is refused with, in order. */
  readonly expect: readonly string[];
}
/** A form outside S2's liveness reading: a residual source member's text edited. */
export interface FailClosedMember {
  readonly kind: "member";
  readonly id: string;
  readonly claim: "S2";
  /** The residual source member's path (RESIDUALS). */
  readonly member: string;
  readonly edit: (text: string) => string;
}
export type FailClosedForm = FailClosedSource | FailClosedDocs | FailClosedMember;
/** Every non-empty line behind a line comment: the member defines nothing (refusal #5's S2-Q1-COMMENTED and S2-Q2-COMMENTED). */
const commentedOut = (text: string): string =>
  text
    .split("\n")
    .map(line => (line === "" ? line : `// ${line}`))
    .join("\n");
/**
 * The fail-closed row (R-B73, R-B67's one pinned row proving that a form outside the pinned set refuses): refusal #5's twelve
 * plants, one per member of its U1-U5, each outside its claim's pinned set and each refused with exactly its typed refusals.
 * G1's five (U1): a lower-first camelCase word, a sentence-case word, a run of four joiners, a run of three of one joiner and a
 * GraphDataIR spelling whose two gaps differ; D3's two (U2): camelCase and sentence case; G3's three (U3, U4): a lower heading
 * and a thematic break leading the boundary section, and a paragraph holding GraphPolicyCLI between the Ownership boundaries
 * heading and its table; S2's two (U5): q1-shape and q2-joined commented out. And two of this cut's own, FC-G1-EVERY-MATCH and
 * FC-D3-EVERY-MATCH: an unpinned spelling after a pinned one in one module (G1's for each of its two words), so each
 * fail-closed reader is proven on every match and every word, never only the first.
 */
export const FAIL_CLOSED: readonly FailClosedForm[] = [
  { kind: "source", id: "FC-G1-CAMEL", claim: "G1", path: "src/workbench/zz-fc-g1-camel.ts", text: 'export const graphPolicyLabel = "seam";\n', words: ["GraphPolicy"], unpinned: [{ word: "GraphPolicy", match: "graphPolicy" }] },
  { kind: "source", id: "FC-G1-SENTENCE", claim: "G1", path: "src/workbench/zz-fc-g1-sentence.ts", text: "// Graph policy decision seam\nexport const placed = 1;\n", words: ["GraphPolicy"], unpinned: [{ word: "GraphPolicy", match: "Graph policy" }] },
  { kind: "source", id: "FC-G1-RUN-LONG", claim: "G1", path: "src/workbench/zz-fc-g1-run-long.ts", text: 'export const LABEL = "graph -- policy";\n', words: ["GraphPolicy"], unpinned: [{ word: "GraphPolicy", match: "graph -- policy" }] },
  { kind: "source", id: "FC-G1-RUN3-SAME", claim: "G1", path: "src/workbench/zz-fc-g1-run3-same.ts", text: 'export const LABEL = "graph___policy";\n', words: ["GraphPolicy"], unpinned: [{ word: "GraphPolicy", match: "graph___policy" }] },
  { kind: "source", id: "FC-G1-UNEVEN", claim: "G1", path: "src/workbench/zz-fc-g1-uneven.ts", text: 'export const GRAPH_DATAIR = "v1";\n', words: ["GraphDataIR"], unpinned: [{ word: "GraphDataIR", match: "GRAPH_DATAIR" }] },
  {
    kind: "source",
    id: "FC-G1-EVERY-MATCH",
    claim: "G1",
    path: "src/workbench/zz-fc-g1-every-match.ts",
    text: 'export const LABELS = ["GraphPolicy", "graphPolicy", "GraphDataIR", "GRAPH_DATAIR"];\n',
    words: ["GraphPolicy", "GraphDataIR"],
    unpinned: [
      { word: "GraphPolicy", match: "graphPolicy" },
      { word: "GraphDataIR", match: "GRAPH_DATAIR" },
    ],
  },
  { kind: "source", id: "FC-D3-CAMEL", claim: "D3", path: "src/workbench/zz-fc-d3-camel.ts", text: 'export const executorRequest = { executor: "furnace" };\n', words: ["ExecutorRequest"], unpinned: [{ word: "ExecutorRequest", match: "executorRequest" }] },
  { kind: "source", id: "FC-D3-SENTENCE", claim: "D3", path: "src/workbench/zz-fc-d3-sentence.ts", text: "// Executor request shape\nexport const placed = 1;\n", words: ["ExecutorRequest"], unpinned: [{ word: "ExecutorRequest", match: "Executor request" }] },
  { kind: "source", id: "FC-D3-EVERY-MATCH", claim: "D3", path: "src/workbench/zz-fc-d3-every-match.ts", text: 'export const KINDS = ["ExecutorRequest", "executorRequest"];\n', words: ["ExecutorRequest"], unpinned: [{ word: "ExecutorRequest", match: "executorRequest" }] },
  { kind: "docs", id: "FC-G3-LEAD-HEADING", claim: "G3", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n### Status\n\n`), expect: ["boundary-first"] },
  { kind: "docs", id: "FC-G3-LEAD-BREAK", claim: "G3", edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n---\n\n`), expect: ["boundary-first"] },
  {
    kind: "docs",
    id: "FC-G3-OTHER-LEAD",
    claim: "G3",
    edit: page => onceIn(page, `## ${OWNERSHIP_HEADING}\n\n`, `## ${OWNERSHIP_HEADING}\n\n${GP_OWNER} decides policy scores through the gp seam at src/workbench/gp-seam.ts.\n\n`),
    expect: ["ownership-other"],
  },
  { kind: "member", id: "FC-S2-Q1-COMMENTED", claim: "S2", member: "src/workbench/q1-shape.ts", edit: commentedOut },
  { kind: "member", id: "FC-S2-Q2-COMMENTED", claim: "S2", member: "src/workbench/q2-joined.ts", edit: commentedOut },
];

// ---- the full surface (wb-0lf.8, the rule-19 structural-exit child R-B73 filed): the forms these tables list, each outside
// R-B73's pinned sets and pinned through the claim's own reader in the full-surface row; no form outside them is claimed ----

/** The bead whose row in the tracker export enumerates the full surface: its description's U1-U5 lines. */
export const SURFACE_BEAD = "wb-0lf.8";
/** A bead's description in the tracker export (one JSON row per line), or undefined when no row of that id carries one. */
export function descriptionOf(exportText: string, bead: string): string | undefined {
  for (const line of exportText.split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const { id, description } = row as { readonly id?: unknown; readonly description?: unknown };
    if (id === bead && typeof description === "string") return description;
  }
  return undefined;
}
/** Each "- U<n> " line of a description, in order, with the hollowings (RH-...) and the residual families (Q<n>) it names. */
export const surfaceItems = (description: string): Record<string, readonly string[]> =>
  Object.fromEntries([...description.matchAll(/^- (U\d+) (.*)$/gm)].map(match => [match[1] ?? "", [...(match[2] ?? "").matchAll(/\b(?:RH-[A-Z0-9-]+|Q\d)\b/g)].map(found => found[0])]));
/** A full-surface spelling: outside its claim's R-B73 pinned set, the wb-0lf.8 item it belongs to and the hollowing it kills. */
export interface SurfaceSpelling extends Spelling {
  readonly item: "U1" | "U2";
  /** Refusal #5's reader hollowing (wb-0lf.8's member name) that this spelling is a pinned falsifier of, or the item itself (U1, U2) where wb-0lf.8's row names no hollowing for its family (the per-part case mixes). */
  readonly answers: string;
}
/** U1's and U2's case forms: lower-first camelCase (the first part lower case, the others as written) and sentence case (the first part capitalized, the others lower case). */
export const SURFACE_CASES: readonly { readonly id: string; readonly of: (part: string, index: number) => string }[] = [
  { id: "camel", of: (part, index) => (index === 0 ? part.toLowerCase() : part) },
  { id: "sentence", of: (part, index) => (index === 0 ? `${part.slice(0, 1).toUpperCase()}${part.slice(1).toLowerCase()}` : part.toLowerCase()) },
];
/** WORD_JOINERS' joiners of one character: the characters of the landed vocabulary's joiner class, which the census reads back from the live patterns. */
const CLASS_JOINERS = WORD_JOINERS.filter(joiner => joiner.text.length === 1);
/** U1's long runs' lengths (RH-RUN-LONG, stated bound): four to eight of one class character; a run of three is RH-RUN3-SAME's. */
export const SURFACE_RUN_LENGTHS: readonly number[] = [4, 5, 6, 7, 8];
/** U1's runs: three of one class character (each character in turn), each SURFACE_RUN_LENGTHS length of one, and mixed runs of four and of eight characters. */
export const SURFACE_RUNS: readonly { readonly id: string; readonly answers: string; readonly text: string }[] = [
  ...CLASS_JOINERS.map(joiner => ({ id: `${joiner.id}x3`, answers: "RH-RUN3-SAME", text: joiner.text.repeat(3) })),
  ...SURFACE_RUN_LENGTHS.flatMap(length => CLASS_JOINERS.map(joiner => ({ id: `${joiner.id}x${length}`, answers: "RH-RUN-LONG", text: joiner.text.repeat(length) }))),
  { id: "mixed4", answers: "RH-RUN-LONG", text: " -- " },
  { id: "mixed8", answers: "RH-RUN-LONG", text: " .-_\t_-." },
];
/** U1's uneven gaps: GraphDataIR's two gaps filled by two different WORD_JOINERS joiners (none, a class character, the repeated run or the mixed run), every ordered pair. */
export const SURFACE_GAPS: readonly { readonly id: string; readonly first: string; readonly second: string }[] = WORD_JOINERS.flatMap(first =>
  WORD_JOINERS.filter(second => second !== first).map(second => ({ id: `${first.id}+${second.id}`, first: first.text, second: second.text })),
);
/** A word's parts in one case form, the gap before the index-th part (from the second on) taken from gaps. */
const spelledWith = (word: string, form: { readonly of: (part: string, index: number) => string }, gaps: readonly string[]): string =>
  (WORD_PARTS[word] ?? []).map((part, index) => `${index === 0 ? "" : (gaps[index - 1] ?? "")}${form.of(part, index)}`).join("");
/** Every assignment of one WORD_CASES case form to each of count parts, the first part's form varying slowest. */
const caseAssignments = (count: number): (typeof WORD_CASES)[number][][] => (count <= 0 ? [[]] : caseAssignments(count - 1).flatMap(prefix => WORD_CASES.map(form => [...prefix, form])));
/**
 * U1's and U2's per-part case mixes: a word's parts each in its own WORD_CASES form (every assignment, caseAssignments' order),
 * joined by one joiner in every gap, less every spelling a uniform WORD_CASES form or a SURFACE_CASES form already spells over
 * that joiner, each spelling once (the first assignment that spells it names it): GRAPHpolicy, graphDATAir, EXECUTORrequest.
 */
export const caseMixesOf = (word: string, joiner: { readonly id: string; readonly text: string }): { readonly id: string; readonly spelling: string }[] => {
  const parts = WORD_PARTS[word] ?? [];
  const gaps = parts.map(() => joiner.text);
  const spelled = new Set([...WORD_CASES, ...SURFACE_CASES].map(form => spelledWith(word, form, gaps)));
  return caseAssignments(parts.length).flatMap(forms => {
    const spelling = spelledWith(word, { of: (part, index) => forms[index]?.of(part) ?? part }, gaps);
    if (spelled.has(spelling)) return [];
    spelled.add(spelling);
    return [{ id: `${word}/${joiner.id}/${forms.map(form => form.id).join("+")}`, spelling }];
  });
};
/**
 * G1's full surface (U1): each site word's parts in SURFACE_CASES' two forms over every WORD_JOINERS joiner (RH-CAMEL,
 * RH-SENTENCE), in WORD_CASES' three forms over every SURFACE_RUNS run (RH-RUN3-SAME, RH-RUN-LONG), GraphDataIR's parts in
 * WORD_CASES' three forms over every SURFACE_GAPS pair (RH-UNEVEN), and each site word's per-part case mixes over every
 * WORD_JOINERS joiner (caseMixesOf, answering U1): 32 + 192 + 168 + 136 spellings, none of them SITE_WORD_SPELLINGS'.
 */
export const SURFACE_SITE_SPELLINGS: readonly SurfaceSpelling[] = [
  ...SITE_WORDS.flatMap(word =>
    WORD_JOINERS.flatMap(joiner => SURFACE_CASES.map(form => ({ id: `${word}/${joiner.id}/${form.id}`, word, spelling: spelledWith(word, form, [joiner.text, joiner.text]), item: "U1" as const, answers: form.id === "camel" ? "RH-CAMEL" : "RH-SENTENCE" }))),
  ),
  ...SITE_WORDS.flatMap(word => SURFACE_RUNS.flatMap(run => WORD_CASES.map(form => ({ id: `${word}/${run.id}/${form.id}`, word, spelling: spelledWith(word, form, [run.text, run.text]), item: "U1" as const, answers: run.answers })))),
  ...SURFACE_GAPS.flatMap(gap => WORD_CASES.map(form => ({ id: `GraphDataIR/${gap.id}/${form.id}`, word: "GraphDataIR", spelling: spelledWith("GraphDataIR", form, [gap.first, gap.second]), item: "U1" as const, answers: "RH-UNEVEN" }))),
  ...SITE_WORDS.flatMap(word => WORD_JOINERS.flatMap(joiner => caseMixesOf(word, joiner).map(mix => ({ ...mix, word, item: "U1" as const, answers: "U1" })))),
];
/**
 * D3's full surface (U2): "executor request" in SURFACE_CASES' two forms over each EXECUTOR_JOINERS joiner (RH-D3-CAMEL,
 * RH-D3-SENTENCE), and its per-part case mixes over each of them (caseMixesOf, answering U2): 8 + 16 spellings.
 */
export const SURFACE_REQUEST_SPELLINGS: readonly SurfaceSpelling[] = [
  ...EXECUTOR_JOINERS.flatMap(joiner =>
    SURFACE_CASES.map(form => ({ id: `ExecutorRequest/${joiner.id}/${form.id}`, word: "ExecutorRequest", spelling: spelledWith("ExecutorRequest", form, [joiner.text]), item: "U2" as const, answers: form.id === "camel" ? "RH-D3-CAMEL" : "RH-D3-SENTENCE" })),
  ),
  ...EXECUTOR_JOINERS.flatMap(joiner => caseMixesOf("ExecutorRequest", joiner).map(mix => ({ ...mix, word: "ExecutorRequest", item: "U2" as const, answers: "U2" }))),
];
/**
 * G3's owner-cell analog of U1's case forms (refusal #5's F5, pinned for symmetry with U1): GraphPolicy in SURFACE_CASES' two
 * forms over every WORD_JOINERS joiner, each the owner cell of a second row of the GraphPolicyCLI table (the D-GP-SPELLED form),
 * read by namesGraphPolicy and counted beside the GraphPolicyCLI row (ownership-rows).
 */
export const SURFACE_OWNERS: readonly (SurfaceSpelling & { readonly edit: (page: string) => string })[] = SURFACE_SITE_SPELLINGS.filter(
  entry => entry.word === "GraphPolicy" && (entry.answers === "RH-CAMEL" || entry.answers === "RH-SENTENCE"),
).map(entry => ({ ...entry, id: `G3-OWNER-${spellingTag(entry)}`, answers: "U1", edit: (page: string): string => afterGpRow(page, seamRowOwnedBy(entry.spelling)) }));
/** A planted src module naming one full-surface spelling in a string literal, the index-th of its table (three digits, so path order is table order). */
export const surfaceSite = (table: string, entry: Spelling, index: number): { readonly path: string; readonly text: string } => ({
  path: `src/workbench/zz-surface-${table}-${String(index).padStart(3, "0")}.ts`,
  text: `export const LABEL = "${entry.spelling}";\n`,
});
/**
 * R-NON-ASCII-PART (G1's named residual, refusal #5's F6, pinned quiet in the full-surface row): a site word with one part's
 * ASCII letter written as a letter outside ASCII, another script's look-alike (a Cyrillic a, a Greek omicron) or a fullwidth
 * compatibility form of the same Latin letter; the live patterns match ASCII letters only, so neither G1 reader reads it.
 * Each is built through String.fromCodePoint, so these files stay ASCII.
 */
export const NON_ASCII_PARTS: readonly { readonly id: string; readonly word: string; readonly spelling: string; readonly latin: string }[] = [
  { id: "cyrillic-a-in-graph", word: "GraphPolicy", spelling: `Gr${String.fromCodePoint(0x430)}phPolicy`, latin: "a" },
  { id: "greek-omicron-in-policy", word: "GraphPolicy", spelling: `GraphP${String.fromCodePoint(0x3bf)}licy`, latin: "o" },
  { id: "cyrillic-a-in-data", word: "GraphDataIR", spelling: `GraphD${String.fromCodePoint(0x430)}taIR`, latin: "a" },
  { id: "fullwidth-p-in-policy", word: "GraphPolicy", spelling: `Graph${String.fromCodePoint(0xff30)}olicy`, latin: "P" },
];
/** A NON_ASCII_PARTS spelling with its one letter outside ASCII written as the Latin letter it stands for: the site word it is near. */
export const latinOf = (entry: (typeof NON_ASCII_PARTS)[number]): string => entry.spelling.replace(/[^\x00-\x7f]/gu, entry.latin);

/** The keys of marked's gfm block grammar (Lexer.rules.block.gfm), the lexer the landed binding reads docs/03 with, in sorted order. */
export const gfmBlockRules = (): string[] => Object.keys(Lexer.rules.block.gfm).sort();
/** The gfm rules no boundary lead is pinned by: newline (a blank line, no block), paragraph (the lead the claim admits) and text (a list item's own line). */
export const LEAD_RULES_OUTSIDE: readonly string[] = ["newline", "paragraph", "text"];
/**
 * The gfm rules no ownership-other block is pinned by: hr (a thematic break holds no text), lheading (a setext heading is of
 * level 1 or 2, so it ends the section rather than sitting in it), newline, table (a top-level table's body rows are
 * ownership-rows') and text.
 */
export const OTHER_RULES_OUTSIDE: readonly string[] = ["hr", "lheading", "newline", "table", "text"];
/** The gfm rule that lexes a block: its first token's type, a heading split into heading (ATX) and lheading (setext), code into code (indented) and fences. */
export function gfmRuleOf(block: string): string {
  const token = marked.lexer(block).find(entry => entry.type !== "space");
  if (token === undefined) return "none";
  if (token.type === "heading") return token.raw.trimStart().startsWith("#") ? "heading" : "lheading";
  if (token.type === "code") return (token as Tokens.Code).codeBlockStyle === "indented" ? "code" : "fences";
  return token.type;
}
/** The boundary section's first block in the binding's view, a block of HTML comments only passed over (docs03Reading's own rule): its kind, an other block's type after a colon, or nothing. */
export function boundaryLead(page: string): string {
  const lead = docsSection(page, BOUNDARY_HEADING, 2, [DOCS_03_TITLE]).blocks.find(block => block.kind !== "html" || !commentOnly(block.raw));
  return lead === undefined ? "nothing" : lead.kind === "other" ? `other:${lead.type}` : lead.kind;
}
/** A full-surface docs form: an in-memory edit of the live docs/03 by one planted block, the gfm rule that lexes it, how the binding reads it and the docs rules it is refused with. */
export interface SurfaceDocs {
  readonly id: string;
  readonly item: "U3" | "U4";
  /** Refusal #5's reader hollowing it kills, or the item itself where wb-0lf.8's row names no hollowing for the form. */
  readonly answers: string;
  /** The key of marked's gfm block rules that lexes the planted block. */
  readonly rule: string;
  /** A boundary lead: boundaryLead's reading; an ownership block: its token type in sectionSources. */
  readonly reads: string;
  /** An ownership block's place among the section's top-level tables (U4). */
  readonly position?: (typeof SURFACE_POSITIONS)[number];
  readonly block: string;
  readonly edit: (page: string) => string;
  readonly expect: readonly string[];
}
/** U3's leads: a block of each gfm rule but LEAD_RULES_OUTSIDE planted first in the boundary section, each in the syntax forms marked lexes it by, an empty fenced code block of each fence marker among them. */
const LEAD_BLOCKS: readonly { readonly id: string; readonly answers: string; readonly rule: string; readonly reads: string; readonly block: string }[] = [
  { id: "L-HEADING-3", answers: "RH-FIRST-HEADING", rule: "heading", reads: "heading", block: "### Status" },
  { id: "L-HEADING-4", answers: "RH-FIRST-HEADING", rule: "heading", reads: "heading", block: "#### Status" },
  { id: "L-HEADING-5", answers: "RH-FIRST-HEADING", rule: "heading", reads: "heading", block: "##### Status" },
  { id: "L-HEADING-6", answers: "RH-FIRST-HEADING", rule: "heading", reads: "heading", block: "###### Status" },
  { id: "L-BREAK-DASHES", answers: "RH-FIRST-HR", rule: "hr", reads: "other:hr", block: "---" },
  { id: "L-BREAK-STARS", answers: "RH-FIRST-HR", rule: "hr", reads: "other:hr", block: "***" },
  { id: "L-BREAK-UNDERSCORES", answers: "RH-FIRST-HR", rule: "hr", reads: "other:hr", block: "___" },
  { id: "L-SETEXT-2", answers: "U3", rule: "lheading", reads: "nothing", block: "Status\n------" },
  { id: "L-SETEXT-1", answers: "U3", rule: "lheading", reads: "nothing", block: "Status\n======" },
  { id: "L-CODE-INDENTED", answers: "U3", rule: "code", reads: "code", block: "    Status: no exporter" },
  { id: "L-FENCE-BACKTICKS", answers: "U3", rule: "fences", reads: "code", block: "```\nStatus: no exporter\n```" },
  { id: "L-FENCE-TILDES", answers: "U3", rule: "fences", reads: "code", block: "~~~\nStatus: no exporter\n~~~" },
  { id: "L-FENCE-EMPTY-BACKTICKS", answers: "U3", rule: "fences", reads: "code", block: "```\n```" },
  { id: "L-FENCE-EMPTY-TILDES", answers: "U3", rule: "fences", reads: "code", block: "~~~\n~~~" },
  { id: "L-BLOCKQUOTE", answers: "U3", rule: "blockquote", reads: "other:blockquote", block: "> Status: no exporter" },
  { id: "L-LIST-DASH", answers: "U3", rule: "list", reads: "list", block: "- Status: no exporter" },
  { id: "L-LIST-STAR", answers: "U3", rule: "list", reads: "list", block: "* Status: no exporter" },
  { id: "L-LIST-PLUS", answers: "U3", rule: "list", reads: "list", block: "+ Status: no exporter" },
  { id: "L-LIST-ORDERED", answers: "U3", rule: "list", reads: "list", block: "1. Status: no exporter" },
  { id: "L-HTML", answers: "U3", rule: "html", reads: "html", block: "<div>Status: no exporter</div>" },
  { id: "L-HTML-EMPTY", answers: "U3", rule: "html", reads: "html", block: "<div></div>" },
  { id: "L-TABLE", answers: "U3", rule: "table", reads: "other:table", block: "| Field | Value |\n| --- | --- |\n| status | none |" },
  { id: "L-DEF", answers: "U3", rule: "def", reads: "other:def", block: "[gp-status]: #graphpolicycli-boundary" },
];
export const SURFACE_LEADS: readonly SurfaceDocs[] = LEAD_BLOCKS.map(lead => ({
  ...lead,
  item: "U3",
  edit: page => onceIn(page, `## ${BOUNDARY_HEADING}\n\n`, `## ${BOUNDARY_HEADING}\n\n${lead.block}\n\n`),
  expect: ["boundary-first"],
}));
/** U4's blocks: one holding GraphPolicyCLI for each gfm rule but OTHER_RULES_OUTSIDE, with the token type sectionSources reads it as. */
const OTHER_BLOCKS: readonly { readonly rule: string; readonly reads: string; readonly block: string }[] = [
  { rule: "blockquote", reads: "blockquote", block: `> ${GP_OWNER} decides policy scores` },
  { rule: "code", reads: "code", block: `    ${GP_OWNER} decides policy scores` },
  { rule: "def", reads: "def", block: `[gp-note]: #graphpolicycli-boundary "${GP_OWNER}"` },
  { rule: "fences", reads: "code", block: `\`\`\`\n${GP_OWNER} decides policy scores\n\`\`\`` },
  { rule: "heading", reads: "heading", block: `### ${GP_OWNER} seams` },
  { rule: "html", reads: "html", block: `<p>${GP_OWNER} decides policy scores</p>` },
  { rule: "list", reads: "list", block: `- ${GP_OWNER} decides policy scores` },
  { rule: "paragraph", reads: "paragraph", block: `${GP_OWNER} decides policy scores through the gp seam at src/workbench/gp-seam.ts.` },
];
/**
 * The places an ownership-other block is planted at: between the section's heading and its table, between its table and a
 * second top-level table, after its one table, and after a second top-level table that follows its table (after-second).
 */
export const SURFACE_POSITIONS = ["before", "between", "after", "after-second"] as const;
/** The second top-level table a between plant adds after its block and an after-second plant before it: no body row's second cell names GraphPolicy. */
const SECOND_TABLE = "| Added concern | Owner | Workbench may do |\n| --- | --- | --- |\n| Status reports | Workbench | none |";
const otherAt = (page: string, position: (typeof SURFACE_POSITIONS)[number], block: string): string =>
  position === "before"
    ? onceIn(page, `## ${OWNERSHIP_HEADING}\n\n`, `## ${OWNERSHIP_HEADING}\n\n${block}\n\n`)
    : onceIn(
        page,
        `\n## ${NEXT_HEADING}\n`,
        position === "after" ? `\n${block}\n\n## ${NEXT_HEADING}\n` : position === "between" ? `\n${block}\n\n${SECOND_TABLE}\n\n## ${NEXT_HEADING}\n` : `\n${SECOND_TABLE}\n\n${block}\n\n## ${NEXT_HEADING}\n`,
      );
export const SURFACE_OTHERS: readonly SurfaceDocs[] = SURFACE_POSITIONS.flatMap(position =>
  OTHER_BLOCKS.map(other => ({
    id: `O-${position.toUpperCase()}-${other.rule.toUpperCase()}`,
    item: "U4" as const,
    answers: position === "before" ? "RH-OTHER-LEAD" : "U4",
    rule: other.rule,
    reads: other.reads,
    position,
    block: other.block,
    edit: (page: string) => otherAt(page, position, other.block),
    expect: ["ownership-other"],
  })),
);
/** The top-level block types sectionSources reads for a planted ownership block at its place: the section's one table, the block, and a between or after-second plant's second table. */
export const otherBlocks = (form: SurfaceDocs): string[] =>
  form.position === "before" ? [form.reads, "table"] : form.position === "after" ? ["table", form.reads] : form.position === "between" ? ["table", form.reads, "table"] : ["table", "table", form.reads];

/** A residual source member's code as TypeScript parses it (wb-0lf.8 U5): a comment is trivia and a string's content is no code. */
const memberCode = (text: string): ts.SourceFile => ts.createSourceFile("member.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const eachNode = (node: ts.Node, visit: (node: ts.Node) => void): void => {
  visit(node);
  ts.forEachChild(node, child => eachNode(child, visit));
};
/** R-UNNAMED's liveness read from code (wb-0lf.8 U5): the names of the properties the member's object literals assign that are keys of the given document, each once in order. */
export const codeShapeKeysOf = (text: string, keys: ReadonlySet<string>): string[] => {
  const named: string[] = [];
  eachNode(memberCode(text), node => {
    if ((ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) && ts.isIdentifier(node.name)) named.push(node.name.text);
  });
  return [...new Set(named.filter(key => keys.has(key)))];
};
/** R-COMPOSED's liveness read from code (wb-0lf.8 U5): the member's double-quoted string literals, each as TypeScript decodes it, joined in order. */
export const codeComposedOf = (text: string): string => {
  const source = memberCode(text);
  const parts: string[] = [];
  eachNode(source, node => {
    if (ts.isStringLiteral(node) && source.text.charAt(node.getStart(source)) === '"') parts.push(node.text);
  });
  return parts.join("");
};
/**
 * U5's silencings: a residual source member's whole text written where no code runs, in each WORD_PLACES place but code (a
 * line, a block and a doc comment, a double-quoted, a single-quoted and a template string) and in a regular expression
 * literal; the code reader reads each as defining nothing.
 */
export const SILENCINGS: readonly { readonly id: string; readonly silence: (text: string) => string }[] = [
  { id: "line-comment", silence: commentedOut },
  { id: "block-comment", silence: text => `/*\n${text}*/\n` },
  { id: "doc-comment", silence: text => `/**\n${text
    .split("\n")
    .map(line => (line === "" ? line : ` * ${line}`))
    .join("\n")}*/\n` },
  { id: "double-quoted", silence: text => `export const silenced = ${JSON.stringify(text)};\n` },
  { id: "single-quoted", silence: text => `export const silenced = '${text.replace(/[\\']/g, character => `\\${character}`).replace(/\n/g, "\\n")}';\n` },
  { id: "template", silence: text => `export const silenced = \`${text.replace(/[\\`$]/g, character => `\\${character}`)}\`;\n` },
  { id: "regex", silence: text => `export const silenced = /${text.replace(/[\\^$.*+?()[\]{}|/]/g, character => `\\${character}`).replace(/\n/g, "\\n")}/;\n` },
];
/** R-UNREACHABLE (S2's named residual, pinned quiet in the full-surface row): the member placed after a top-level throw never runs, yet its code reads as before - the code reader reads syntax, not reachability. */
export const unreachable = (text: string): string => `throw 0;\n${text}`;
