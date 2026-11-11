/**
 * mw.policy-graph.v1 validation and compilation guard (APO 05 D1 scope,
 * MechanicalWorkflows-nymi). The validator rejects cycles made only of instantaneous edges
 * and delayed cycles lacking an explicit bounded memory; the compiler refuses any manifest
 * carrying a delayed edge — a typed delayed-edge operator does not exist in combinators.ts
 * yet, so compilation of delayed semantics would be an untyped lie. Node kinds come from the
 * closed nine-kind tuple, typed ports must resolve and join compatibly, and implementation refs
 * must resolve in a registry the caller supplies (MechanicalWorkflows-3l61.1.1, APO-003).
 * Implementation refs are opaque and resolve only via that trusted registry, never as code from
 * JSON; this module neither loads nor executes them.
 */

/** The nine node kinds of APO 05 L4; a node whose kind lies outside this tuple is refused (APO-003). */
export const POLICY_GRAPH_NODE_KINDS = [
  "observation",
  "pure-transform",
  "numeric-policy",
  "deterministic-policy",
  "conditional-selector",
  "guard-inhibitor",
  "bounded-option",
  "composition",
  "output",
] as const;

export type PolicyGraphNodeKind = (typeof POLICY_GRAPH_NODE_KINDS)[number];

/** One typed port of a node: an opaque schema reference plus its temporal class. */
export interface PolicyGraphPort {
  readonly id: string;
  readonly schemaRef: string;
  readonly temporal: "instant" | "delayed";
}

export interface PolicyGraphNode {
  readonly id: string;
  readonly kind: string;
  /** Optional typed ports; an edge may name them through fromPort and toPort. */
  readonly ports?: readonly PolicyGraphPort[] | undefined;
}

/** Optional validation inputs; implementationRegistry is the trusted, application-local set of opaque names. */
export interface PolicyGraphValidationOptions {
  readonly implementationRegistry?: ReadonlySet<string> | undefined;
}

export interface PolicyGraphEdge {
  readonly from: string;
  readonly to: string;
  readonly temporal: "instant" | "delayed";
  /** Optional port id on the `from` node that this edge leaves. */
  readonly fromPort?: string | undefined;
  /** Optional port id on the `to` node that this edge enters. */
  readonly toPort?: string | undefined;
  /** Required for a delayed edge that closes a cycle: the explicit bounded memory. */
  readonly memory?: { readonly boundedSteps: number } | undefined;
}

export interface PolicyGraphManifest {
  readonly schema: "mw.policy-graph.v1";
  readonly graphId: string;
  readonly revision: string;
  readonly parentRevision: string;
  readonly exactBasisPolicy: string;
  readonly requiredContracts: readonly string[];
  readonly implementationRefs: readonly string[];
  readonly nodes: readonly PolicyGraphNode[];
  readonly edges: readonly PolicyGraphEdge[];
}

type PolicyGraphRefusalCode =
  | "GRAPH_MANIFEST_MALFORMED"
  | "GRAPH_INSTANTANEOUS_CYCLE"
  | "GRAPH_DELAYED_CYCLE_UNBOUNDED"
  | "GRAPH_NODE_KIND_UNKNOWN"
  | "GRAPH_PORT_ID_DUPLICATE"
  | "GRAPH_PORT_UNRESOLVED"
  | "GRAPH_PORT_SCHEMA_INCOMPATIBLE"
  | "GRAPH_IMPLEMENTATION_UNRESOLVED";

export type PolicyGraphValidation =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: PolicyGraphRefusalCode; readonly detail: string };

export type PolicyGraphPlan =
  | { readonly ok: true; readonly order: readonly string[] }
  | { readonly ok: false; readonly code: PolicyGraphRefusalCode | "GRAPH_UNSUPPORTED_EDGE"; readonly detail: string };

const refuse = (code: PolicyGraphRefusalCode, detail: string): PolicyGraphValidation => ({ ok: false, code, detail });
const KNOWN_KINDS: ReadonlySet<string> = new Set(POLICY_GRAPH_NODE_KINDS);
const nonblank = (value: string): boolean => value.trim().length > 0;

/** The first cycle in the subgraph of the given edges, as the node list, or null. Iterative so a very deep chain cannot overflow the call stack. */
function findCycle(nodeIds: readonly string[], edges: readonly PolicyGraphEdge[]): string[] | null {
  const out = new Map<string, string[]>(nodeIds.map(id => [id, []]));
  for (const edge of edges) out.get(edge.from)!.push(edge.to);
  const state = new Map<string, "visiting" | "done">();
  const stack: string[] = [];
  const cursor: number[] = [];
  for (const root of nodeIds) {
    if (state.get(root) !== undefined) continue;
    state.set(root, "visiting"); stack.push(root); cursor.push(0);
    while (stack.length > 0) {
      const top = stack.length - 1;
      const id = stack[top]!;
      const nexts = out.get(id)!;
      const at = cursor[top]!;
      if (at >= nexts.length) { state.set(id, "done"); stack.pop(); cursor.pop(); continue; }
      cursor[top] = at + 1;
      const next = nexts[at]!;
      const seen = state.get(next);
      if (seen === "visiting") return [...stack.slice(stack.indexOf(next)), next];
      if (seen === undefined) { state.set(next, "visiting"); stack.push(next); cursor.push(0); }
    }
  }
  return null;
}

/** Whether `from` is reachable from `to` over all edges (so the edge closes a cycle). */
function closesCycle(edge: PolicyGraphEdge, edges: readonly PolicyGraphEdge[]): boolean {
  const out = new Map<string, string[]>();
  for (const e of edges) { if (!out.has(e.from)) out.set(e.from, []); out.get(e.from)!.push(e.to); }
  const seen = new Set<string>([edge.to]);
  const queue = [edge.to];
  while (queue.length > 0) {
    const id = queue.shift()!;
    if (id === edge.from) return true;
    for (const next of out.get(id) ?? []) if (!seen.has(next)) { seen.add(next); queue.push(next); }
  }
  return false;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** Validate one mw.policy-graph.v1 manifest (structure, node kinds, typed ports, implementation refs, instantaneous cycles, delayed-cycle bounds). Member shapes are checked before use, so a hostile JSON manifest returns a typed refusal and never throws. The ref check runs only when options.implementationRegistry is supplied. */
export function validatePolicyGraph(manifest: PolicyGraphManifest, options: PolicyGraphValidationOptions = {}): PolicyGraphValidation {
  const input: unknown = manifest;
  if (!isRecord(input)) return refuse("GRAPH_MANIFEST_MALFORMED", "manifest is not an object");
  if (input["schema"] !== "mw.policy-graph.v1") return refuse("GRAPH_MANIFEST_MALFORMED", `unsupported schema ${String(input["schema"])}`);
  if (typeof input["graphId"] !== "string" || !nonblank(input["graphId"])) return refuse("GRAPH_MANIFEST_MALFORMED", "graphId is not a non-blank string");
  if (typeof input["revision"] !== "string" || !nonblank(input["revision"])) return refuse("GRAPH_MANIFEST_MALFORMED", "revision is not a non-blank string");
  if (!Array.isArray(input["nodes"])) return refuse("GRAPH_MANIFEST_MALFORMED", "nodes is not an array");
  if (!Array.isArray(input["edges"])) return refuse("GRAPH_MANIFEST_MALFORMED", "edges is not an array");
  if (input["nodes"].length === 0) return refuse("GRAPH_MANIFEST_MALFORMED", "nodes is empty");
  const ids = new Set<string>();
  for (const node of input["nodes"] as unknown[]) {
    if (!isRecord(node) || typeof node["id"] !== "string" || typeof node["kind"] !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", "node is not an object with a string id and kind");
    if (!nonblank(node["id"]) || !nonblank(node["kind"])) return refuse("GRAPH_MANIFEST_MALFORMED", "blank node id or kind");
    if (ids.has(node["id"])) return refuse("GRAPH_MANIFEST_MALFORMED", `duplicate node id ${node["id"]}`);
    ids.add(node["id"]);
    if (!KNOWN_KINDS.has(node["kind"])) return refuse("GRAPH_NODE_KIND_UNKNOWN", `node ${node["id"]} has unknown kind ${node["kind"]}`);
    if (node["ports"] !== undefined) {
      if (!Array.isArray(node["ports"])) return refuse("GRAPH_MANIFEST_MALFORMED", `node ${node["id"]} ports is not an array`);
      for (const port of node["ports"] as unknown[]) {
        if (!isRecord(port) || typeof port["id"] !== "string" || typeof port["schemaRef"] !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", `node ${node["id"]} has a port that is not an object with a string id and schemaRef`);
        if (port["temporal"] !== "instant" && port["temporal"] !== "delayed") return refuse("GRAPH_MANIFEST_MALFORMED", `node ${node["id"]} port ${port["id"]} temporal outside the closed enum: ${String(port["temporal"])}`);
      }
    }
  }
  for (const edge of input["edges"] as unknown[]) {
    if (!isRecord(edge) || typeof edge["from"] !== "string" || typeof edge["to"] !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", "edge is not an object with string from and to");
    if (!ids.has(edge["from"]) || !ids.has(edge["to"])) return refuse("GRAPH_MANIFEST_MALFORMED", `edge names an unknown node: ${edge["from"]} -> ${edge["to"]}`);
    if (edge["temporal"] !== "instant" && edge["temporal"] !== "delayed") return refuse("GRAPH_MANIFEST_MALFORMED", `edge temporal outside the closed enum: ${String(edge["temporal"])}`);
    if (edge["fromPort"] !== undefined && typeof edge["fromPort"] !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", `edge ${edge["from"]} -> ${edge["to"]} fromPort is not a string`);
    if (edge["toPort"] !== undefined && typeof edge["toPort"] !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", `edge ${edge["from"]} -> ${edge["to"]} toPort is not a string`);
  }
  const portsByNode = new Map<string, Map<string, PolicyGraphPort>>();
  for (const node of manifest.nodes) {
    const ports = new Map<string, PolicyGraphPort>();
    for (const port of node.ports ?? []) {
      if (ports.has(port.id)) return refuse("GRAPH_PORT_ID_DUPLICATE", `node ${node.id} declares port ${port.id} more than once`);
      ports.set(port.id, port);
    }
    portsByNode.set(node.id, ports);
  }
  for (const edge of manifest.edges) {
    const source = edge.fromPort === undefined ? undefined : portsByNode.get(edge.from)!.get(edge.fromPort);
    if (edge.fromPort !== undefined && source === undefined) return refuse("GRAPH_PORT_UNRESOLVED", `edge ${edge.from} -> ${edge.to} names port ${edge.fromPort} that node ${edge.from} does not declare`);
    const target = edge.toPort === undefined ? undefined : portsByNode.get(edge.to)!.get(edge.toPort);
    if (edge.toPort !== undefined && target === undefined) return refuse("GRAPH_PORT_UNRESOLVED", `edge ${edge.from} -> ${edge.to} names port ${edge.toPort} that node ${edge.to} does not declare`);
    if (source !== undefined && target !== undefined && (source.schemaRef !== target.schemaRef || source.temporal !== target.temporal)) {
      return refuse("GRAPH_PORT_SCHEMA_INCOMPATIBLE", `edge ${edge.from}.${source.id} -> ${edge.to}.${target.id} joins ${source.schemaRef}/${source.temporal} to ${target.schemaRef}/${target.temporal}`);
    }
  }
  const registry = options.implementationRegistry;
  if (registry !== undefined) {
    const refs = input["implementationRefs"];
    if (!Array.isArray(refs)) return refuse("GRAPH_MANIFEST_MALFORMED", "implementationRefs is not an array");
    for (const ref of refs as unknown[]) {
      if (typeof ref !== "string") return refuse("GRAPH_MANIFEST_MALFORMED", "implementationRefs holds a member that is not a string");
      if (!registry.has(ref)) return refuse("GRAPH_IMPLEMENTATION_UNRESOLVED", `implementation ref ${ref} is absent from the supplied registry`);
    }
  }
  const nodeIds = manifest.nodes.map(node => node.id);
  const instantCycle = findCycle(nodeIds, manifest.edges.filter(edge => edge.temporal === "instant"));
  if (instantCycle !== null) return refuse("GRAPH_INSTANTANEOUS_CYCLE", `cycle of instantaneous edges: ${instantCycle.join(" -> ")}`);
  for (const edge of manifest.edges) {
    if (edge.temporal !== "delayed") continue;
    if (!closesCycle(edge, manifest.edges)) continue;
    const bound = edge.memory?.boundedSteps;
    if (bound === undefined || !Number.isInteger(bound) || bound < 1) {
      return refuse("GRAPH_DELAYED_CYCLE_UNBOUNDED", `delayed edge ${edge.from} -> ${edge.to} closes a cycle without an explicit bounded memory (boundedSteps >= 1)`);
    }
  }
  return { ok: true };
}

/** Compile an accepted manifest into an evaluation order. Delayed edges refuse: the typed delayed-edge operator is TARGET and combinators.ts ships none. */
export function compilePolicyGraph(manifest: PolicyGraphManifest, options: PolicyGraphValidationOptions = {}): PolicyGraphPlan {
  const valid = validatePolicyGraph(manifest, options);
  if (!valid.ok) return { ok: false, code: valid.code, detail: valid.detail };
  const delayed = manifest.edges.find(edge => edge.temporal === "delayed");
  if (delayed !== undefined) {
    return { ok: false, code: "GRAPH_UNSUPPORTED_EDGE", detail: `delayed edge ${delayed.from} -> ${delayed.to}: no typed delayed-edge operator exists yet; compilation refuses rather than lowering untyped semantics` };
  }
  const incoming = new Map<string, number>(manifest.nodes.map(node => [node.id, 0]));
  for (const edge of manifest.edges) incoming.set(edge.to, incoming.get(edge.to)! + 1);
  const ready = manifest.nodes.map(node => node.id).filter(id => incoming.get(id) === 0);
  const order: string[] = [];
  while (ready.length > 0) {
    const id = ready.shift()!;
    order.push(id);
    for (const edge of manifest.edges) if (edge.from === id) {
      const left = incoming.get(edge.to)! - 1;
      incoming.set(edge.to, left);
      if (left === 0) ready.push(edge.to);
    }
  }
  return { ok: true, order };
}
