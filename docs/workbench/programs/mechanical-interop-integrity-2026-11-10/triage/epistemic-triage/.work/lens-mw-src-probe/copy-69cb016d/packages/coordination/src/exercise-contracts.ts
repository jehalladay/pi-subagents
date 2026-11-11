/**
 * Composed exercise contracts derived from the coordination combinators (TW program,
 * tw-exercise-contracts-from-six-combinators). A contract is a pure structural derivation
 * from a composition tree: it reports exactly the id and revision the really composed
 * policy would report, the leaf policies in evaluation order, and the mandatory global
 * validation every exercise is subject to — what reconcile() implements at HEAD. The five
 * tree-composable combinators (sequential, parallel, guarded, alternative, inhibit) form
 * tree nodes; `repeated` composes only as a wrapper around the whole tree and is refused
 * as a node. Derivation consults no policy and proposes nothing.
 */

/** A leaf names an existing policy by its declared identity. */
export interface ExerciseLeaf {
  readonly kind: "leaf";
  readonly policyId: string;
  readonly revision: string;
}

/** The declared identity of a guard or selector participating in a composition's revision. */
export interface ExercisePartIdentity {
  readonly id: string;
  readonly revision: string;
}

export interface ExerciseSequentialNode {
  readonly kind: "sequential";
  readonly first: ExerciseComposition;
  readonly second: ExerciseComposition;
}

export interface ExerciseParallelNode {
  readonly kind: "parallel";
  readonly first: ExerciseComposition;
  readonly second: ExerciseComposition;
}

export interface ExerciseGuardedNode {
  readonly kind: "guarded";
  readonly first: ExerciseComposition;
  readonly guard: ExercisePartIdentity;
  readonly second: ExerciseComposition;
}

export interface ExerciseAlternativeNode {
  readonly kind: "alternative";
  readonly first: ExerciseComposition;
  readonly second: ExerciseComposition;
  readonly selector: ExercisePartIdentity;
}

export interface ExerciseInhibitNode {
  readonly kind: "inhibit";
  readonly first: ExerciseComposition;
  readonly second: ExerciseComposition;
}

export type ExerciseNode =
  | ExerciseSequentialNode
  | ExerciseParallelNode
  | ExerciseGuardedNode
  | ExerciseAlternativeNode
  | ExerciseInhibitNode;

export type ExerciseComposition = ExerciseLeaf | ExerciseNode;

/** `repeated` composes only as a wrapper; its spec identity participates in the revision. */
export interface ExerciseWrapper {
  readonly kind: "repeated";
  readonly specId: string;
  readonly specRevision: string;
}

/**
 * Global validation is mandatory and local policy success is insufficient: every exercise's
 * proposals meet reconcile(), whose checks at HEAD are exactly the resolver's rejection codes.
 */
export interface ExerciseValidation {
  readonly globalValidationMandatory: true;
  readonly resolvedBy: "reconcile";
  readonly checks: readonly string[];
}

export interface ExerciseContract {
  readonly exerciseId: string;
  readonly revision: string;
  readonly leafPolicyIds: readonly string[];
  readonly combinators: readonly string[];
  readonly depth: number;
  readonly wrapped: boolean;
  readonly validation: ExerciseValidation;
}

const OPERATOR: Readonly<Record<ExerciseNode["kind"], string>> = {
  sequential: ";",
  parallel: "||",
  guarded: ">",
  alternative: "+",
  inhibit: "-|",
};

const RESOLVER_CHECKS: readonly string[] = [
  "INTENT_AUTHORITY_EXCEEDED",
  "INTENT_BASIS_STALE",
  "INTENT_BUDGET_EXCEEDED",
  "INTENT_DUPLICATE",
  "INTENT_SCOPE_PROTECTED",
  "INTENT_WRITE_CONFLICT",
];

function assertNode(tree: ExerciseComposition): asserts tree is ExerciseComposition {
  const kind = (tree as { readonly kind: string }).kind;
  if (kind === "repeated") {
    throw new Error("EXERCISE_REPEATED_NOT_A_NODE: repeated composes only as a wrapper and is excluded from composition trees");
  }
  if (kind !== "leaf" && !Object.hasOwn(OPERATOR, kind)) {
    throw new Error(`EXERCISE_UNKNOWN_COMBINATOR: ${kind}`);
  }
}

function idOf(tree: ExerciseComposition): string {
  assertNode(tree);
  if (tree.kind === "leaf") return tree.policyId;
  return `${idOf(tree.first)}${OPERATOR[tree.kind]}${idOf(tree.second)}`;
}

function revisionOf(tree: ExerciseComposition): string {
  assertNode(tree);
  if (tree.kind === "leaf") return tree.revision;
  const first = `${idOf(tree.first)}@${revisionOf(tree.first)}`;
  const second = `${idOf(tree.second)}@${revisionOf(tree.second)}`;
  if (tree.kind === "guarded") return `${first};${tree.guard.id}@${tree.guard.revision};${second}`;
  if (tree.kind === "alternative") return `${first};${second};${tree.selector.id}@${tree.selector.revision}`;
  return `${first};${second}`;
}

function collect(tree: ExerciseComposition, leaves: string[], kinds: Set<string>): number {
  assertNode(tree);
  if (tree.kind === "leaf") {
    leaves.push(tree.policyId);
    return 0;
  }
  kinds.add(tree.kind);
  const left = collect(tree.first, leaves, kinds);
  const right = collect(tree.second, leaves, kinds);
  return 1 + Math.max(left, right);
}

/** Derive the composed exercise contract for a composition tree, optionally wrapped by `repeated`. */
export function exerciseContractOf(tree: ExerciseComposition, wrapper?: ExerciseWrapper): ExerciseContract {
  const leaves: string[] = [];
  const kinds = new Set<string>();
  const depth = collect(tree, leaves, kinds);
  const innerId = idOf(tree);
  const innerRevision = revisionOf(tree);
  let exerciseId = innerId;
  let revision = innerRevision;
  if (wrapper !== undefined) {
    kinds.add("repeated");
    exerciseId = `${innerId}*`;
    revision = `${innerId}@${innerRevision};${wrapper.specId}@${wrapper.specRevision}`;
  }
  return {
    exerciseId,
    revision,
    leafPolicyIds: leaves,
    combinators: [...kinds].sort((a, b) => a.localeCompare(b)),
    depth,
    wrapped: wrapper !== undefined,
    validation: {
      globalValidationMandatory: true,
      resolvedBy: "reconcile",
      checks: RESOLVER_CHECKS,
    },
  };
}
