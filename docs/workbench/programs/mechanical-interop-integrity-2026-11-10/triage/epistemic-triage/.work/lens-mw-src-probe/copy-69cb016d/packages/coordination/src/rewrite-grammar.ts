/**
 * The restricted v1 rewrite grammar and the immutable mutation record (APO 07; carried by b677.5).
 *
 * The seven rule kinds are typed and finite, and each carries a structural discipline this
 * module enforces over the rule's own L/K/R shape: specialize and factor-duplicate delete
 * nothing, substitute-numerical swaps exactly one non-interface node, add-guard adds exactly
 * one guard node, split-coarsen-view moves only view nodes, insert-delayed-edge adds exactly
 * one delayed edge and no node, retire-policy deletes exactly one policy node and adds
 * nothing. Node kinds are checked per rule (tt8u seat ruling Q1 to Q3): split-coarsen-view reads the
 * kind of an id on EVERY side where it appears (a non-interface id reused across L and R is allowed
 * but its right-side node is checked too, and the detail names the side as `l:<id>` or `r:<id>`),
 * factor-duplicate requires the single added node to be a `computation`, and substitute-numerical
 * requires the single added node to be a `policy` while the deleted node may be any non-interface
 * node. That the factored computation is pure and that the replacement is compatible numerically
 * stay certificate and application properties (checkRewriteApplication and the certificate layer),
 * not grammar properties. Interface preservation and DPO dangling/identification checks stay with
 * checkRewriteApplication (3l61.6); this module carries the grammar's per-kind shape and the
 * 07 mutation record: parent revision, candidate hash, rule/match, changed nodes/ports/edges,
 * read/evidence/resource dependencies, normalized port mapping, checkpoint mapping, private
 * memory migration, required certificates and experiment ids — sealed immutable. The candidate hash
 * must have the repository digest shape `sha256:` plus 64 lowercase hex characters (a blank or
 * shorter-than-12 hash is REWRITE_RECORD_HASH_BLANK; any longer non-digest is
 * REWRITE_RECORD_HASH_MALFORMED), every member must have its declared type (string, array or
 * object; REWRITE_RECORD_MEMBER_MALFORMED names the member and the expected type), and a member the
 * structured clone cannot copy refuses REWRITE_RECORD_MEMBER_UNCLONEABLE instead of throwing
 * (tt8u seat ruling Q4 and Q5).
 */

import type { RewriteRule, RuleMatch } from "./rewrite-application.js";

export type GrammarRefusalCode =
  | "GRAMMAR_RULE_KIND_UNKNOWN"
  | "GRAMMAR_DELETION_FORBIDDEN"
  | "GRAMMAR_ADDITION_MISMATCH"
  | "GRAMMAR_NODE_KIND_MISMATCH"
  | "GRAMMAR_EDGE_DISCIPLINE";

export const V1_GRAMMAR: Readonly<Record<string, string>> = Object.freeze({
  "specialize": "adds specialized nodes; deletes nothing",
  "factor-duplicate": "adds exactly one factored pure computation; deletes nothing",
  "substitute-numerical": "swaps exactly one non-interface node for one compatible numerical policy",
  "add-guard": "adds exactly one versioned non-authoritative guard node",
  "split-coarsen-view": "splits one certified view into several or coarsens several into one; views only",
  "insert-delayed-edge": "adds exactly one delayed edge with declared memory; no node change",
  "retire-policy": "deletes exactly one unused policy node; adds nothing",
});

export interface GrammarValidation {
  readonly schema: "mw.rewrite-grammar.v0";
  readonly ruleId: string;
  readonly kind: string;
  readonly ok: boolean;
  readonly deleted: readonly string[];
  readonly added: readonly string[];
  readonly refusals: ReadonlyArray<{ readonly code: GrammarRefusalCode; readonly subject: string; readonly detail: string }>;
}

const edgeKey = (e: { from: string; to: string; temporal: string }): string => `${e.from}->${e.to}:${e.temporal}`;

/** Enforce the per-kind structural discipline over the rule's own shape. */
export function validateRuleAgainstGrammar(rule: RewriteRule): GrammarValidation {
  const refusals: Array<{ code: GrammarRefusalCode; subject: string; detail: string }> = [];
  const interfaceIds = new Set(rule.interface);
  const deleted = rule.left.nodes.filter((n) => !interfaceIds.has(n.id)).map((n) => n.id);
  const added = rule.right.nodes.filter((n) => !interfaceIds.has(n.id)).map((n) => n.id);
  const kindOf = (side: "left" | "right", id: string): string => rule[side].nodes.find((n) => n.id === id)?.kind ?? "";
  if (!Object.prototype.hasOwnProperty.call(V1_GRAMMAR, rule.kind)) {
    refusals.push({ code: "GRAMMAR_RULE_KIND_UNKNOWN", subject: String(rule.kind), detail: `rule kind ${String(rule.kind)} is outside the restricted v1 grammar` });
    return { schema: "mw.rewrite-grammar.v0", ruleId: rule.ruleId, kind: String(rule.kind), ok: false, deleted, added, refusals };
  }
  if (rule.kind === "specialize" || rule.kind === "factor-duplicate" || rule.kind === "add-guard" || rule.kind === "insert-delayed-edge") {
    for (const id of deleted) refusals.push({ code: "GRAMMAR_DELETION_FORBIDDEN", subject: id, detail: `${rule.kind} deletes nothing, but the rule deletes ${id}` });
  }
  if (rule.kind === "specialize" && added.length < 1) {
    refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: "specialize adds at least one node" });
  }
  if (rule.kind === "factor-duplicate") {
    if (added.length !== 1) {
      refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: `factor-duplicate adds exactly one node, not ${added.length}` });
    } else if (kindOf("right", added[0]!) !== "computation") {
      refusals.push({ code: "GRAMMAR_NODE_KIND_MISMATCH", subject: added[0]!, detail: `factor-duplicate adds a computation node, not ${kindOf("right", added[0]!)}` });
    }
  }
  if (rule.kind === "substitute-numerical") {
    if (deleted.length !== 1 || added.length !== 1) {
      refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: `substitute-numerical swaps exactly one node (${deleted.length} deleted, ${added.length} added)` });
    } else if (kindOf("right", added[0]!) !== "policy") {
      refusals.push({ code: "GRAMMAR_NODE_KIND_MISMATCH", subject: added[0]!, detail: `substitute-numerical adds a policy node, not ${kindOf("right", added[0]!)}` });
    }
  }
  if (rule.kind === "add-guard") {
    if (added.length !== 1) {
      refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: `add-guard adds exactly one node, not ${added.length}` });
    } else if (kindOf("right", added[0]!) !== "guard") {
      refusals.push({ code: "GRAMMAR_NODE_KIND_MISMATCH", subject: added[0]!, detail: `add-guard adds a guard node, not ${kindOf("right", added[0]!)}` });
    }
  }
  if (rule.kind === "split-coarsen-view") {
    const splits = deleted.length === 1 && added.length >= 2;
    const coarsens = deleted.length >= 2 && added.length === 1;
    if (!splits && !coarsens) {
      refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: `split-coarsen-view splits one into several or coarsens several into one (${deleted.length} deleted, ${added.length} added)` });
    }
    const touched: Array<["left" | "right", string]> = [
      ...deleted.map((id): ["left" | "right", string] => ["left", id]),
      ...added.map((id): ["left" | "right", string] => ["right", id]),
    ];
    for (const [side, id] of touched) {
      const kind = kindOf(side, id);
      if (kind !== "view") refusals.push({ code: "GRAMMAR_NODE_KIND_MISMATCH", subject: id, detail: `split-coarsen-view touches only view nodes; ${side === "left" ? "l" : "r"}:${id} is ${kind}` });
    }
  }
  if (rule.kind === "insert-delayed-edge") {
    if (added.length !== 0) refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: "insert-delayed-edge changes no nodes" });
    const leftEdges = new Set(rule.left.edges.map(edgeKey));
    const newEdges = rule.right.edges.filter((e) => !leftEdges.has(edgeKey(e)));
    const rightEdges = new Set(rule.right.edges.map(edgeKey));
    const removedEdges = rule.left.edges.filter((e) => !rightEdges.has(edgeKey(e)));
    if (newEdges.length !== 1 || removedEdges.length !== 0) {
      refusals.push({ code: "GRAMMAR_EDGE_DISCIPLINE", subject: rule.ruleId, detail: `insert-delayed-edge adds exactly one edge and removes none (${newEdges.length} added, ${removedEdges.length} removed)` });
    } else if (newEdges[0]!.temporal !== "delayed") {
      refusals.push({ code: "GRAMMAR_EDGE_DISCIPLINE", subject: edgeKey(newEdges[0]!), detail: "the inserted edge must be delayed; an instant edge can close an instantaneous cycle" });
    }
  }
  if (rule.kind === "retire-policy") {
    if (added.length !== 0 || deleted.length !== 1) {
      refusals.push({ code: "GRAMMAR_ADDITION_MISMATCH", subject: rule.ruleId, detail: `retire-policy deletes exactly one node and adds nothing (${deleted.length} deleted, ${added.length} added)` });
    } else if (kindOf("left", deleted[0]!) !== "policy") {
      refusals.push({ code: "GRAMMAR_NODE_KIND_MISMATCH", subject: deleted[0]!, detail: `retire-policy retires a policy node, not ${kindOf("left", deleted[0]!)}` });
    }
  }
  return { schema: "mw.rewrite-grammar.v0", ruleId: rule.ruleId, kind: rule.kind, ok: refusals.length === 0, deleted, added, refusals };
}

export const MEMORY_MIGRATION_STRATEGIES: readonly string[] = Object.freeze(["reset", "verified-partition", "unchanged-schema-identity"]);

export type MutationRecordRefusalCode =
  | "REWRITE_RECORD_MEMBER_MISSING"
  | "REWRITE_RECORD_HASH_BLANK"
  | "REWRITE_RECORD_HASH_MALFORMED"
  | "REWRITE_RECORD_MEMBER_MALFORMED"
  | "REWRITE_RECORD_MEMBER_UNCLONEABLE"
  | "REWRITE_RECORD_PORT_MAPPING_UNNORMALIZED"
  | "REWRITE_RECORD_MEMORY_STRATEGY_UNKNOWN";

export interface MutationRecord {
  readonly parentRevision: string;
  readonly candidateHash: string;
  readonly ruleId: string;
  readonly match: RuleMatch;
  readonly changedNodes: readonly string[];
  readonly changedPorts: readonly string[];
  readonly changedEdges: readonly string[];
  readonly dependencies: { readonly reads: readonly string[]; readonly evidence: readonly string[]; readonly resources: readonly string[] };
  /** Normalized: sorted by `from`, no duplicate `from`. */
  readonly portMapping: ReadonlyArray<{ readonly from: string; readonly to: string }>;
  readonly checkpointMapping: Readonly<Record<string, string>>;
  readonly memoryMigration: ReadonlyArray<{ readonly nodeId: string; readonly strategy: string }>;
  readonly requiredCertificates: readonly string[];
  readonly experimentIds: readonly string[];
}

export type SealedMutationRecord =
  | { readonly kind: "sealed"; readonly record: MutationRecord }
  | { readonly kind: "refused"; readonly refusals: ReadonlyArray<{ readonly code: MutationRecordRefusalCode; readonly subject: string; readonly detail: string }> };

const CANDIDATE_DIGEST = /^sha256:[0-9a-f]{64}$/;

type MemberShape = "string" | "array" | "object";

const shapeOf = (value: unknown): MemberShape | "other" =>
  typeof value === "string" ? "string" : Array.isArray(value) ? "array" : value !== null && typeof value === "object" ? "object" : "other";

const isRecordLike = (value: unknown): boolean => shapeOf(value) === "object";

/** Validate the 07 record members and seal the record immutable; a sealed record is deep-frozen and side-effect-free. */
export function sealMutationRecord(record: MutationRecord): SealedMutationRecord {
  const refusals: Array<{ code: MutationRecordRefusalCode; subject: string; detail: string }> = [];
  const required: ReadonlyArray<[string, unknown, MemberShape]> = [
    ["parentRevision", record.parentRevision, "string"],
    ["candidateHash", record.candidateHash, "string"],
    ["ruleId", record.ruleId, "string"],
    ["match", record.match, "object"],
    ["changedNodes", record.changedNodes, "array"],
    ["changedPorts", record.changedPorts, "array"],
    ["changedEdges", record.changedEdges, "array"],
    ["dependencies", record.dependencies, "object"],
    ["portMapping", record.portMapping, "array"],
    ["checkpointMapping", record.checkpointMapping, "object"],
    ["memoryMigration", record.memoryMigration, "array"],
    ["requiredCertificates", record.requiredCertificates, "array"],
    ["experimentIds", record.experimentIds, "array"],
  ];
  const malformed = new Set<string>();
  for (const [name, value, expected] of required) {
    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      refusals.push({ code: "REWRITE_RECORD_MEMBER_MISSING", subject: name, detail: `the 07 mutation record names ${name}; it is missing or blank` });
    } else if (shapeOf(value) !== expected) {
      malformed.add(name);
      refusals.push({ code: "REWRITE_RECORD_MEMBER_MALFORMED", subject: name, detail: `the 07 mutation record member ${name} must be ${expected === "array" ? "an array" : `a ${expected}`}` });
    }
  }
  if (typeof record.candidateHash === "string" && record.candidateHash.trim() !== "") {
    if (record.candidateHash.trim().length < 12) {
      refusals.push({ code: "REWRITE_RECORD_HASH_BLANK", subject: "candidateHash", detail: "the candidate hash is too short to identify a candidate" });
    } else if (!CANDIDATE_DIGEST.test(record.candidateHash)) {
      refusals.push({ code: "REWRITE_RECORD_HASH_MALFORMED", subject: "candidateHash", detail: "the candidate hash must be sha256: followed by 64 lowercase hex characters" });
    }
  }
  if (Array.isArray(record.portMapping)) {
    if (record.portMapping.every((m) => isRecordLike(m) && typeof m.from === "string")) {
      const froms = record.portMapping.map((m) => m.from);
      const sorted = [...froms].sort();
      if (new Set(froms).size !== froms.length || JSON.stringify(froms) !== JSON.stringify(sorted)) {
        refusals.push({ code: "REWRITE_RECORD_PORT_MAPPING_UNNORMALIZED", subject: "portMapping", detail: "the port mapping is normalized: sorted by source port with no duplicates" });
      }
    } else {
      refusals.push({ code: "REWRITE_RECORD_MEMBER_MALFORMED", subject: "portMapping", detail: "the 07 mutation record member portMapping must be an array of objects naming a string from" });
    }
  }
  if (Array.isArray(record.memoryMigration)) {
    if (record.memoryMigration.every((m) => isRecordLike(m))) {
      for (const migration of record.memoryMigration) {
        if (!MEMORY_MIGRATION_STRATEGIES.includes(migration.strategy)) {
          refusals.push({ code: "REWRITE_RECORD_MEMORY_STRATEGY_UNKNOWN", subject: migration.nodeId, detail: `${migration.nodeId} declares ${migration.strategy}; only reset, verified-partition and unchanged-schema-identity exist` });
        }
      }
    } else {
      refusals.push({ code: "REWRITE_RECORD_MEMBER_MALFORMED", subject: "memoryMigration", detail: "the 07 mutation record member memoryMigration must be an array of objects" });
    }
  }
  if (refusals.length > 0) return { kind: "refused", refusals };
  let cloned: MutationRecord;
  try {
    cloned = structuredClone(record) as MutationRecord;
  } catch (error) {
    return { kind: "refused", refusals: [{ code: "REWRITE_RECORD_MEMBER_UNCLONEABLE", subject: "record", detail: `the record carries a member the structured clone cannot copy: ${error instanceof Error ? error.message : String(error)}` }] };
  }
  const deepFreeze = <T>(value: T): T => {
    if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
      Object.freeze(value);
      for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    }
    return value;
  };
  return { kind: "sealed", record: deepFreeze(cloned) };
}
