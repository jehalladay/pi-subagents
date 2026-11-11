/**
 * Typed rewrite application for the v1 fragment (APO-013, ADR A08; 07 "Restricted v1 grammar"): every rule is one
 * of seven typed kinds with an explicit L <- K -> R interface, and applying it to a host graph passes DPO-style
 * checks only — the dangling condition (a deleted node may carry no host edge the rule did not match) and the
 * identification condition (two rule nodes may share one host node only when both are preserved) — plus a typed,
 * total match (every L node has an existing host image of the same kind, every L edge an existing host edge) and a
 * preserved interface (K sits in both L and R with the same kinds; added R nodes get fresh host ids
 * that collide with nothing). `deriveRewriteCandidate` builds the derived manifest and the structural change list the
 * rewrite boundary consumes; a derived manifest the graph validator refuses is a refused rewrite carrying the graph
 * code. No generic DPO kernel, no proof object: pure records over manifests; the seven rule bodies and their match
 * guards are the grammar deliverable (b677.5), not this module.
 */
import type { PolicyGraphEdge, PolicyGraphManifest, PolicyGraphNode } from "./policy-graph.js";
import { validatePolicyGraph } from "./policy-graph.js";
import type { RewriteChange } from "./rewrite-boundary.js";

export type V1RuleKind = "specialize" | "factor-duplicate" | "substitute-numerical" | "add-guard" | "split-coarsen-view" | "insert-delayed-edge" | "retire-policy";

export const V1_RULE_KINDS: readonly V1RuleKind[] = Object.freeze(["specialize", "factor-duplicate", "substitute-numerical", "add-guard", "split-coarsen-view", "insert-delayed-edge", "retire-policy"] as const);

/** A rule-side graph over rule-local node ids. */
export interface RuleGraph {
  readonly nodes: readonly PolicyGraphNode[];
  readonly edges: readonly PolicyGraphEdge[];
}

export interface RewriteRule {
  readonly ruleId: string;
  readonly kind: V1RuleKind;
  readonly left: RuleGraph;
  /** K: rule-local node ids preserved from L into R. */
  readonly interface: readonly string[];
  readonly right: RuleGraph;
}

export interface RuleMatch {
  /** L-local node id -> host node id. */
  readonly nodes: Readonly<Record<string, string>>;
  /** (R \ K)-local node id -> fresh host node id. */
  readonly fresh: Readonly<Record<string, string>>;
}

export type RewriteApplicationRefusalCode =
  | "REWRITE_RULE_KIND_UNKNOWN"
  | "REWRITE_INTERFACE_UNPRESERVED"
  | "REWRITE_INTERFACE_RETYPED"
  | "REWRITE_MATCH_INCOMPLETE"
  | "REWRITE_MATCH_TARGET_MISSING"
  | "REWRITE_MATCH_KIND_MISMATCH"
  | "REWRITE_MATCH_EDGE_MISSING"
  | "REWRITE_IDENTIFICATION_VIOLATED"
  | "REWRITE_DANGLING_EDGE"
  | "REWRITE_FRESH_ID_MISSING"
  | "REWRITE_FRESH_ID_COLLISION"
  | "REWRITE_RESULT_INVALID";

export interface RewriteApplicationRefusal {
  readonly code: RewriteApplicationRefusalCode;
  /** A rule-local id, host id, edge key `from->to:temporal`, rule kind or rule id. */
  readonly subject: string;
  readonly detail: string;
}

export interface RewriteApplicationCheck {
  readonly schema: "mw.rewrite-application.v0";
  readonly ruleId: string;
  readonly ok: boolean;
  /** Host node ids the rule deletes (L \ K images). */
  readonly deleted: readonly string[];
  /** Host node ids the rule preserves (K images). */
  readonly preserved: readonly string[];
  /** Fresh host node ids the rule adds (R \ K). */
  readonly added: readonly string[];
  readonly refusals: readonly RewriteApplicationRefusal[];
}

export type RewriteDerivation =
  | { readonly kind: "candidate"; readonly check: RewriteApplicationCheck; readonly manifest: PolicyGraphManifest; readonly changes: readonly RewriteChange[] }
  | { readonly kind: "refused"; readonly check: RewriteApplicationCheck };

export const edgeKey = (edge: PolicyGraphEdge): string => `${edge.from}->${edge.to}:${edge.temporal}`;

const result = (ruleId: string, deleted: readonly string[], preserved: readonly string[], added: readonly string[], refusals: readonly RewriteApplicationRefusal[]): RewriteApplicationCheck =>
  ({ schema: "mw.rewrite-application.v0", ruleId, ok: refusals.length === 0, deleted, preserved, added, refusals });

export function checkRewriteApplication(host: PolicyGraphManifest, rule: RewriteRule, match: RuleMatch): RewriteApplicationCheck {
  const refusals: RewriteApplicationRefusal[] = [];
  if (!V1_RULE_KINDS.includes(rule.kind)) {
    return result(rule.ruleId, [], [], [], [{ code: "REWRITE_RULE_KIND_UNKNOWN", subject: rule.kind, detail: `${rule.kind} is not one of the seven v1 rule kinds` }]);
  }
  const hostNodes = new Map(host.nodes.map(node => [node.id, node]));
  const hostEdges = new Set(host.edges.map(edgeKey));
  const leftNodes = new Map(rule.left.nodes.map(node => [node.id, node]));
  const rightNodes = new Map(rule.right.nodes.map(node => [node.id, node]));
  const preservedLocal = new Set(rule.interface);

  for (const id of rule.interface) {
    const left = leftNodes.get(id);
    const right = rightNodes.get(id);
    if (left === undefined || right === undefined) {
      refusals.push({ code: "REWRITE_INTERFACE_UNPRESERVED", subject: id, detail: `interface node ${id} must appear in both L and R` });
    } else if (left.kind !== right.kind) {
      refusals.push({ code: "REWRITE_INTERFACE_RETYPED", subject: id, detail: `interface node ${id} is ${left.kind} in L and ${right.kind} in R` });
    }
  }

  const images = new Map<string, string>();
  for (const node of rule.left.nodes) {
    const image = match.nodes[node.id];
    if (image === undefined) {
      refusals.push({ code: "REWRITE_MATCH_INCOMPLETE", subject: node.id, detail: `rule node ${node.id} has no host image` });
      continue;
    }
    const target = hostNodes.get(image);
    if (target === undefined) {
      refusals.push({ code: "REWRITE_MATCH_TARGET_MISSING", subject: image, detail: `rule node ${node.id} maps to ${image}, which the host graph does not contain` });
      continue;
    }
    if (target.kind !== node.kind) {
      refusals.push({ code: "REWRITE_MATCH_KIND_MISMATCH", subject: image, detail: `rule node ${node.id} is ${node.kind} but its image ${image} is ${target.kind}` });
    }
    images.set(node.id, image);
  }
  const matchedEdges = new Set<string>();
  for (const edge of rule.left.edges) {
    const from = images.get(edge.from);
    const to = images.get(edge.to);
    if (from === undefined || to === undefined) continue;
    const key = edgeKey({ from, to, temporal: edge.temporal });
    if (!hostEdges.has(key)) refusals.push({ code: "REWRITE_MATCH_EDGE_MISSING", subject: key, detail: `rule edge ${edgeKey(edge)} maps to ${key}, which the host graph does not contain` });
    else matchedEdges.add(key);
  }

  const total = !refusals.some(r => r.code === "REWRITE_MATCH_INCOMPLETE" || r.code === "REWRITE_MATCH_TARGET_MISSING");
  const byImage = new Map<string, string[]>();
  for (const [local, image] of images) byImage.set(image, [...(byImage.get(image) ?? []), local]);
  for (const [image, locals] of byImage) {
    if (total && locals.length > 1 && locals.some(local => !preservedLocal.has(local))) {
      refusals.push({ code: "REWRITE_IDENTIFICATION_VIOLATED", subject: image, detail: `host node ${image} is the image of ${locals.join(", ")} and at least one of them is deleted` });
    }
  }

  const deleted = [...new Set([...images].filter(([local]) => !preservedLocal.has(local)).map(([, image]) => image))].sort();
  const preserved = [...new Set([...images].filter(([local]) => preservedLocal.has(local)).map(([, image]) => image))].sort();
  const deletedSet = new Set(deleted);
  for (const edge of total ? host.edges : []) {
    if (!deletedSet.has(edge.from) && !deletedSet.has(edge.to)) continue;
    const key = edgeKey(edge);
    if (!matchedEdges.has(key)) refusals.push({ code: "REWRITE_DANGLING_EDGE", subject: key, detail: `host edge ${key} touches a deleted node and the rule did not match it` });
  }

  const added: string[] = [];
  const taken = new Set(hostNodes.keys());
  for (const node of rule.right.nodes) {
    if (preservedLocal.has(node.id)) continue;
    const fresh = match.fresh[node.id];
    if (fresh === undefined) {
      refusals.push({ code: "REWRITE_FRESH_ID_MISSING", subject: node.id, detail: `added node ${node.id} has no fresh host id` });
      continue;
    }
    if (taken.has(fresh)) {
      refusals.push({ code: "REWRITE_FRESH_ID_COLLISION", subject: fresh, detail: `fresh id ${fresh} for added node ${node.id} is already a host node` });
      continue;
    }
    taken.add(fresh);
    added.push(fresh);
  }
  return result(rule.ruleId, deleted, preserved, added, refusals);
}

export function deriveRewriteCandidate(host: PolicyGraphManifest, rule: RewriteRule, match: RuleMatch, revision: string): RewriteDerivation {
  const check = checkRewriteApplication(host, rule, match);
  if (!check.ok) return { kind: "refused", check };

  const preservedLocal = new Set(rule.interface);
  const hostOf = (local: string): string => (preservedLocal.has(local) ? match.nodes[local]! : match.fresh[local]!);
  const leftEdges = new Set(rule.left.edges.map(edge => edgeKey({ from: match.nodes[edge.from]!, to: match.nodes[edge.to]!, temporal: edge.temporal })));
  const rightEdges = rule.right.edges.map(edge => ({ ...edge, from: hostOf(edge.from), to: hostOf(edge.to) }));
  const rightKeys = new Set(rightEdges.map(edgeKey));

  const nodes: PolicyGraphNode[] = [
    ...host.nodes.filter(node => !check.deleted.includes(node.id)),
    ...rule.right.nodes.filter(node => !preservedLocal.has(node.id)).map(node => ({ id: match.fresh[node.id]!, kind: node.kind })),
  ];
  // Every host edge at a deleted node is a matched L edge (the dangling check) and R never references a deleted node, so
  // dropping the L edges R does not keep removes them too; no separate endpoint filter is needed.
  const survivingEdges = host.edges.filter(edge => !leftEdges.has(edgeKey(edge)) || rightKeys.has(edgeKey(edge)));
  const survivingKeys = new Set(survivingEdges.map(edgeKey));
  const edges: PolicyGraphEdge[] = [...survivingEdges, ...rightEdges.filter(edge => !survivingKeys.has(edgeKey(edge)))];

  const manifest: PolicyGraphManifest = { ...host, revision, parentRevision: host.revision, nodes, edges };
  const validation = validatePolicyGraph(manifest);
  if (!validation.ok) {
    const refusal: RewriteApplicationRefusal = { code: "REWRITE_RESULT_INVALID", subject: rule.ruleId, detail: `${rule.ruleId} derives a manifest the graph validator refuses: ${validation.code} ${validation.detail}` };
    return { kind: "refused", check: { ...check, ok: false, refusals: [refusal] } };
  }

  const changes: RewriteChange[] = [
    ...check.deleted.map(id => ({ kind: "node" as const, id, op: "remove" as const })),
    ...check.added.map(id => ({ kind: "node" as const, id, op: "add" as const })),
    ...host.edges.filter(edge => !survivingKeys.has(edgeKey(edge))).map(edge => ({ kind: "edge" as const, id: edgeKey(edge), op: "remove" as const })),
    ...edges.filter(edge => !hostEdges(host).has(edgeKey(edge))).map(edge => ({ kind: "edge" as const, id: edgeKey(edge), op: "add" as const })),
  ];
  return { kind: "candidate", check, manifest, changes };
}

const hostEdges = (host: PolicyGraphManifest): Set<string> => new Set(host.edges.map(edgeKey));
