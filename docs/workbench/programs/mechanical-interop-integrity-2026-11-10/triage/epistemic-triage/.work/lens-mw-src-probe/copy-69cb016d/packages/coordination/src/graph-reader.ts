/**
 * Fail-closed graph reader (APO program, 13 "Compatibility"; additive evolution per APO-EAT-R004): the original
 * mw.episode.v1 and mw.training-export.v1 bytes stay valid and are read as legacy records whose behaviour support is
 * unknown — never a defaulted graph or an invented zero log probability — while the graph sidecar mw.policy-graph.v1
 * is read only when its schema family and major version are supported. An unknown schema family, a major the reader
 * does not implement, a node kind outside the nine of 05 "Graph LLD" or an edge temporal operator outside
 * instant/delayed fails closed with the path of the construct, rather than guessing. Members the reader does not know
 * are additive: they are kept out of the interpretation and reported by path in `unread`, never silently dropped and
 * never interpreted. Pure: nothing here loads an implementation ref or executes anything.
 */
import { UNKNOWN } from "./episode.js";
import type { Maybe } from "./episode.js";

export const GRAPH_NODE_KINDS: readonly string[] = Object.freeze(["observation", "pure-transform", "numeric-policy", "deterministic-policy", "conditional-selector", "guard", "bounded-option", "composition", "output"] as const);

/** Schema family -> the one major version this reader implements. */
export const READER_SUPPORTED: Readonly<Record<string, number>> = Object.freeze({ "mw.policy-graph": 1, "mw.episode": 1, "mw.training-export": 1 });

const GRAPH_MEMBERS: ReadonlySet<string> = new Set(["schema", "graphId", "revision", "parentRevision", "exactBasisPolicy", "requiredContracts", "implementationRefs", "nodes", "edges"]);
const NODE_MEMBERS: ReadonlySet<string> = new Set(["id", "kind"]);
const EDGE_MEMBERS: ReadonlySet<string> = new Set(["from", "to", "temporal", "memory"]);
const TEMPORAL: ReadonlySet<string> = new Set(["instant", "delayed"]);

export type ReaderRefusalCode = "READER_NOT_A_RECORD" | "READER_SCHEMA_UNKNOWN" | "READER_MAJOR_UNSUPPORTED" | "READER_CONSTRUCT_UNKNOWN" | "READER_OPCODE_UNKNOWN";

export interface GraphReadNode {
  readonly id: string;
  readonly kind: string;
}

export type GraphRead =
  | {
      readonly ok: true;
      readonly schema: "mw.graph-read.v0";
      readonly family: string;
      readonly major: number;
      /** The graph constructs when the record is a graph sidecar; unknown for a legacy record. */
      readonly nodes: Maybe<readonly GraphReadNode[]>;
      /** Behaviour support of the record: the graph for a sidecar, unknown for a legacy record — never zero, never defaulted. */
      readonly support: Maybe<"graph">;
      /** Paths of additive members the reader kept out of its interpretation, sorted. */
      readonly unread: readonly string[];
    }
  | { readonly ok: false; readonly schema: "mw.graph-read.v0"; readonly code: ReaderRefusalCode; readonly path: string; readonly detail: string };

const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const refuse = (code: ReaderRefusalCode, path: string, detail: string): GraphRead => ({ ok: false, schema: "mw.graph-read.v0", code, path, detail });

export function readGraphRecord(value: unknown): GraphRead {
  if (!record(value)) return refuse("READER_NOT_A_RECORD", "", "the value is not a record");
  const schema = value["schema"];
  const match = typeof schema === "string" ? /^(.+)\.v(\d+)$/.exec(schema) : null;
  if (match === null) return refuse("READER_SCHEMA_UNKNOWN", "schema", `schema ${String(schema)} is not a versioned family the reader knows`);
  const family = match[1]!;
  const major = Number(match[2]);
  const supported = READER_SUPPORTED[family];
  if (supported === undefined) return refuse("READER_SCHEMA_UNKNOWN", "schema", `schema family ${family} is not one the reader implements`);
  if (major !== supported) return refuse("READER_MAJOR_UNSUPPORTED", "schema", `${family} major ${major} is not implemented; this reader implements major ${supported} and does not guess at others`);

  if (family !== "mw.policy-graph") {
    return { ok: true, schema: "mw.graph-read.v0", family, major, nodes: UNKNOWN, support: UNKNOWN, unread: [] };
  }

  const unread: string[] = [];
  for (const key of Object.keys(value)) if (!GRAPH_MEMBERS.has(key)) unread.push(key);
  const nodes: GraphReadNode[] = [];
  const rawNodes = value["nodes"];
  if (!Array.isArray(rawNodes)) return refuse("READER_CONSTRUCT_UNKNOWN", "nodes", rawNodes === undefined ? "nodes is absent; an empty graph is nodes: [] with edges: []" : `nodes is ${rawNodes === null ? "null" : typeof rawNodes}, not an array`);
  const rawEdges = value["edges"];
  if (!Array.isArray(rawEdges)) return refuse("READER_CONSTRUCT_UNKNOWN", "edges", rawEdges === undefined ? "edges is absent; an empty graph is nodes: [] with edges: []" : `edges is ${rawEdges === null ? "null" : typeof rawEdges}, not an array`);
  for (const [index, node] of rawNodes.entries()) {
    if (!record(node)) return refuse("READER_CONSTRUCT_UNKNOWN", `nodes.${index}`, `node ${index} is not a record`);
    const kind = node["kind"];
    if (typeof kind !== "string" || !GRAPH_NODE_KINDS.includes(kind)) return refuse("READER_CONSTRUCT_UNKNOWN", `nodes.${index}.kind`, `node kind ${String(kind)} is outside the nine kinds the reader implements`);
    for (const key of Object.keys(node)) if (!NODE_MEMBERS.has(key)) unread.push(`nodes.${index}.${key}`);
    const id = node["id"];
    if (typeof id !== "string") return refuse("READER_CONSTRUCT_UNKNOWN", `nodes.${index}.id`, id === undefined ? `node ${index} id is absent` : `node ${index} id is ${id === null ? "null" : typeof id}, not a string`);
    nodes.push({ id, kind });
  }
  for (const [index, edge] of rawEdges.entries()) {
    if (!record(edge)) return refuse("READER_OPCODE_UNKNOWN", `edges.${index}`, `edge ${index} is not a record`);
    const temporal = edge["temporal"];
    if (typeof temporal !== "string" || !TEMPORAL.has(temporal)) return refuse("READER_OPCODE_UNKNOWN", `edges.${index}.temporal`, `edge temporal operator ${String(temporal)} is outside instant/delayed`);
    for (const key of Object.keys(edge)) if (!EDGE_MEMBERS.has(key)) unread.push(`edges.${index}.${key}`);
  }
  return { ok: true, schema: "mw.graph-read.v0", family, major, nodes, support: "graph", unread: unread.sort() };
}
