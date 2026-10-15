/**
 * Pure, digest-pinned workflow patch proposal (designer-cycle steps C, D and H).
 *
 * A proposal is plain frozen data describing a CANDIDATE source against a pinned
 * BASE source: a bounded redacted line diff, the designer's static validation of
 * the candidate bytes, the pinned invocations that remain on the base digest, the
 * experiment pins a later comparison must hold, and a promotion slot only an
 * operator can fill. Nothing here reads or writes the filesystem, executes a
 * candidate, or replaces a running invocation: design-time edits occur against
 * versioned source, execution against immutable digest.
 */
import { createHash } from "node:crypto";
import { safeWorkflowTerminalText } from "../ui/workflow-card.js";
import type { CapabilityRegistry } from "./capability-registry.js";
import { validateWorkflowSource, type WorkflowSource, type WorkflowValidation } from "./designer.js";
import { type DefinitionRef, type InvocationSnapshot, identityDigest } from "./identity.js";
import { redactWorkbenchText } from "./redaction.js";

export const PATCH_PROPOSAL_CONTRACT = "workbench.patch-proposal/v1";

export type PatchProposalErrorCode = "SOURCE_DIGEST_MISMATCH" | "CANDIDATE_TOO_LARGE" | "PROMOTION_PRECONDITION" | "VALIDATION";
export class PatchProposalError extends Error {
  readonly code: PatchProposalErrorCode;
  constructor(code: PatchProposalErrorCode, message: string) {
    super(message);
    this.name = "PatchProposalError";
    this.code = code;
  }
}

export interface PatchHunk {
  readonly op: "context" | "add" | "remove";
  readonly baseLine?: number;
  readonly candidateLine?: number;
  readonly text: string;
}
export interface PatchProposalHypothesisInput {
  readonly metric: string;
  readonly direction: "lower" | "higher";
  readonly groundedIn: readonly string[];
}
export interface PatchProposalHypothesis extends PatchProposalHypothesisInput {
  readonly grounding: "grounded" | "ungrounded";
}
export interface PatchProposalLimits {
  readonly maxDiffLines?: number;
  readonly maxPreviewBytes?: number;
}
export interface PatchProposalInput {
  readonly base: WorkflowSource;
  readonly candidateSource: string;
  readonly rationale: string;
  readonly hypothesis?: PatchProposalHypothesisInput;
  readonly pinnedInvocations?: readonly InvocationSnapshot[];
  readonly registry?: CapabilityRegistry;
  readonly grants?: readonly string[];
  readonly limits?: PatchProposalLimits;
}
export interface AffectedPinnedInvocation {
  readonly logicalInvocationId: string;
  readonly scriptDigest: string;
  readonly action: "unchanged";
  readonly note: string;
}
export type PatchProposalStatus = "valid" | "invalid" | "uncertain" | "no-change";
export interface WorkflowPatchProposal {
  readonly contractVersion: typeof PATCH_PROPOSAL_CONTRACT;
  readonly status: PatchProposalStatus;
  readonly base: { readonly definition: DefinitionRef; readonly sourceRef: string };
  readonly candidate: { readonly definition: DefinitionRef; readonly sourceRef: string };
  readonly rationale: string;
  readonly hypothesis?: PatchProposalHypothesis;
  readonly validation: WorkflowValidation;
  readonly diff: {
    readonly hunks: readonly PatchHunk[];
    readonly truncated: boolean;
    readonly summary: { readonly added: number; readonly removed: number; readonly unchanged: number };
    readonly limits: { readonly maxDiffLines: number; readonly maxPreviewBytes: number };
  };
  readonly affectedPinnedInvocations: readonly AffectedPinnedInvocation[];
  readonly unrelatedInvocations: number;
  readonly promotion: { readonly state: "proposed"; readonly requires: "operator"; readonly applied: false };
  readonly experiment: {
    readonly independentVariable: "source";
    readonly referenceDigest: string;
    readonly candidateDigest: string;
    readonly mustHold: readonly ["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"];
  };
  readonly causalClaim: false;
  readonly proposalDigest: string;
}

export interface PromotionDecisionInput {
  readonly decision: "promoted" | "rejected" | "deferred";
  readonly principal: { readonly id: string; readonly role?: string };
  readonly at: string;
  readonly reason: string;
}
export interface PromotionReceipt {
  readonly contractVersion: typeof PATCH_PROPOSAL_CONTRACT;
  readonly proposalDigest: string;
  readonly decision: PromotionDecisionInput["decision"];
  readonly principal: { readonly id: string; readonly role?: string };
  readonly at: string;
  readonly reason: string;
  readonly appliesTo: "versioned-source";
  readonly appliedByWorkbench: false;
  readonly pinnedInvocationsChanged: 0;
}

const DEFAULT_MAX_DIFF_LINES = 400;
const DEFAULT_MAX_PREVIEW_BYTES = 65_536;
const CEILING_MAX_DIFF_LINES = 5_000;
const CEILING_MAX_PREVIEW_BYTES = 262_144;
/** Hard bound on candidate bytes, matching the designer's bounded-regular-file rule (4 x the runtime script limit). */
const MAX_CANDIDATE_BYTES = 524_288 * 4;
/** Hard bound on the diff table so a pathological pair cannot exhaust memory. */
const MAX_DIFF_CELLS = 4_000_000;
const CONTEXT_RADIUS = 3;
const PIN_NOTE = "remains pinned to the base digest; the candidate requires a new logical invocation";
const MUST_HOLD = ["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"] as const;

function sourceDigest(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

/** Redact, strip terminal and bidi controls, then redact again so a credential split by a control sequence is still caught. */
function displayText(value: string): string {
  return redactWorkbenchText(safeWorkflowTerminalText(redactWorkbenchText(value)));
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function boundedInteger(value: number | undefined, fallback: number, ceiling: number, name: string): number {
  if (value === undefined) return fallback;
  if (!Number.isInteger(value) || value < 1) throw new PatchProposalError("VALIDATION", `${name} must be a positive integer.`);
  return Math.min(value, ceiling);
}

function requiredText(value: unknown, name: string): string {
  if (typeof value !== "string") throw new PatchProposalError("VALIDATION", `${name} must be a string.`);
  const text = displayText(value).trim();
  if (!text) throw new PatchProposalError("VALIDATION", `${name} must not be empty.`);
  return text;
}

type DiffOp = { op: "context" | "add" | "remove"; baseLine?: number; candidateLine?: number; line: string };

/** Deterministic LCS line diff over the region between the common prefix and suffix; removals precede additions. */
function diffLines(base: readonly string[], candidate: readonly string[]): DiffOp[] {
  let prefix = 0;
  while (prefix < base.length && prefix < candidate.length && base[prefix] === candidate[prefix]) prefix++;
  let suffix = 0;
  while (suffix < base.length - prefix && suffix < candidate.length - prefix && base[base.length - 1 - suffix] === candidate[candidate.length - 1 - suffix]) suffix++;
  const a = base.slice(prefix, base.length - suffix);
  const b = candidate.slice(prefix, candidate.length - suffix);
  const width = b.length + 1;
  if ((a.length + 1) * width > MAX_DIFF_CELLS) throw new PatchProposalError("CANDIDATE_TOO_LARGE", "Candidate differs from the base too widely to diff within the bound.");
  const table = new Uint32Array((a.length + 1) * width);
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i * width + j] = a[i] === b[j] ? table[(i + 1) * width + j + 1] + 1 : Math.max(table[(i + 1) * width + j], table[i * width + j + 1]);
    }
  }
  const ops: DiffOp[] = [];
  for (let index = 0; index < prefix; index++) ops.push({ op: "context", baseLine: index + 1, candidateLine: index + 1, line: base[index] });
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    const baseLine = prefix + i + 1;
    const candidateLine = prefix + j + 1;
    if (i < a.length && j < b.length && a[i] === b[j]) {
      ops.push({ op: "context", baseLine, candidateLine, line: a[i] });
      i++;
      j++;
    } else if (i < a.length && (j >= b.length || table[(i + 1) * width + j] >= table[i * width + j + 1])) {
      ops.push({ op: "remove", baseLine, line: a[i] });
      i++;
    } else {
      ops.push({ op: "add", candidateLine, line: b[j] });
      j++;
    }
  }
  for (let index = 0; index < suffix; index++) {
    const baseIndex = base.length - suffix + index;
    const candidateIndex = candidate.length - suffix + index;
    ops.push({ op: "context", baseLine: baseIndex + 1, candidateLine: candidateIndex + 1, line: base[baseIndex] });
  }
  return ops;
}

function buildDiff(baseSource: string, candidateSource: string, maxDiffLines: number, maxPreviewBytes: number): WorkflowPatchProposal["diff"] {
  const ops = diffLines(baseSource.split("\n"), candidateSource.split("\n"));
  const summary = { added: 0, removed: 0, unchanged: 0 };
  const show = new Array<boolean>(ops.length).fill(false);
  ops.forEach((entry, index) => {
    if (entry.op === "context") { summary.unchanged++; return; }
    if (entry.op === "add") summary.added++; else summary.removed++;
    for (let near = Math.max(0, index - CONTEXT_RADIUS); near <= Math.min(ops.length - 1, index + CONTEXT_RADIUS); near++) show[near] = true;
  });
  const hunks: PatchHunk[] = [];
  let bytes = 2;
  let truncated = false;
  for (let index = 0; index < ops.length; index++) {
    if (!show[index]) continue;
    const entry = ops[index];
    const hunk: PatchHunk = {
      op: entry.op,
      ...(entry.baseLine === undefined ? {} : { baseLine: entry.baseLine }),
      ...(entry.candidateLine === undefined ? {} : { candidateLine: entry.candidateLine }),
      text: displayText(entry.line),
    };
    const cost = Buffer.byteLength(JSON.stringify(hunk), "utf8") + (hunks.length > 0 ? 1 : 0);
    if (hunks.length >= maxDiffLines || bytes + cost > maxPreviewBytes) { truncated = true; break; }
    bytes += cost;
    hunks.push(hunk);
  }
  return { hunks, truncated, summary, limits: { maxDiffLines, maxPreviewBytes } };
}

function digestBody(body: Omit<WorkflowPatchProposal, "proposalDigest">): string {
  try {
    return identityDigest("patch-proposal", body);
  } catch (error) {
    throw new PatchProposalError("CANDIDATE_TOO_LARGE", `Proposal exceeds the identity bound: ${error instanceof Error ? error.message : "unknown"}`);
  }
}

export function proposeWorkflowPatch(input: PatchProposalInput): WorkflowPatchProposal {
  if (typeof input.candidateSource !== "string") throw new PatchProposalError("VALIDATION", "candidateSource must be a string.");
  const rationale = requiredText(input.rationale, "rationale");
  const maxDiffLines = boundedInteger(input.limits?.maxDiffLines, DEFAULT_MAX_DIFF_LINES, CEILING_MAX_DIFF_LINES, "maxDiffLines");
  const maxPreviewBytes = boundedInteger(input.limits?.maxPreviewBytes, DEFAULT_MAX_PREVIEW_BYTES, CEILING_MAX_PREVIEW_BYTES, "maxPreviewBytes");
  const { base, candidateSource } = input;
  if (base.definition.artifactDigest !== sourceDigest(base.source)) {
    throw new PatchProposalError("SOURCE_DIGEST_MISMATCH", "Base source bytes do not match their pinned artifact digest.");
  }
  if (Buffer.byteLength(candidateSource, "utf8") > MAX_CANDIDATE_BYTES) throw new PatchProposalError("CANDIDATE_TOO_LARGE", "Candidate source exceeds the hard size bound.");
  let hypothesis: PatchProposalHypothesis | undefined;
  if (input.hypothesis) {
    const groundedIn = input.hypothesis.groundedIn.map(ref => displayText(ref));
    hypothesis = {
      metric: requiredText(input.hypothesis.metric, "hypothesis.metric"),
      direction: input.hypothesis.direction === "higher" ? "higher" : "lower",
      groundedIn,
      grounding: groundedIn.length === 0 ? "ungrounded" : "grounded",
    };
  }
  const candidateDigest = sourceDigest(candidateSource);
  const candidateDefinition: DefinitionRef = { ...base.definition, artifactDigest: candidateDigest };
  const validation = toPlain(validateWorkflowSource({ definition: candidateDefinition, sourceRef: base.sourceRef, source: candidateSource }, { registry: input.registry, grants: input.grants }));
  const diff = buildDiff(base.source, candidateSource, maxDiffLines, maxPreviewBytes);
  const pinned = input.pinnedInvocations ?? [];
  const affected = pinned
    .filter(entry => entry.scriptDigest === base.definition.artifactDigest)
    .map((entry): AffectedPinnedInvocation => ({ logicalInvocationId: displayText(entry.identity.logicalInvocationId), scriptDigest: entry.scriptDigest, action: "unchanged", note: PIN_NOTE }));
  const sourceRef = displayText(base.sourceRef);
  const body: Omit<WorkflowPatchProposal, "proposalDigest"> = toPlain({
    contractVersion: PATCH_PROPOSAL_CONTRACT,
    status: candidateDigest === base.definition.artifactDigest ? "no-change" : validation.status,
    base: { definition: base.definition, sourceRef },
    candidate: { definition: candidateDefinition, sourceRef },
    rationale,
    ...(hypothesis ? { hypothesis } : {}),
    validation,
    diff,
    affectedPinnedInvocations: affected,
    unrelatedInvocations: pinned.length - affected.length,
    promotion: { state: "proposed", requires: "operator", applied: false },
    experiment: { independentVariable: "source", referenceDigest: base.definition.artifactDigest, candidateDigest, mustHold: [...MUST_HOLD] },
    causalClaim: false,
  } satisfies Omit<WorkflowPatchProposal, "proposalDigest">);
  return deepFreeze({ ...body, proposalDigest: digestBody(body) });
}

/** Record the operator's decision as a receipt. The workbench never applies a promotion itself. */
export function recordPromotionDecision(proposal: WorkflowPatchProposal, decision: PromotionDecisionInput): PromotionReceipt {
  const { proposalDigest, ...body } = proposal;
  if (proposal.contractVersion !== PATCH_PROPOSAL_CONTRACT || digestBody(body) !== proposalDigest) {
    throw new PatchProposalError("PROMOTION_PRECONDITION", "Proposal digest does not match its content.");
  }
  if (decision.decision !== "promoted" && decision.decision !== "rejected" && decision.decision !== "deferred") {
    throw new PatchProposalError("VALIDATION", "decision must be promoted, rejected or deferred.");
  }
  if (!decision.principal || typeof decision.principal !== "object") throw new PatchProposalError("VALIDATION", "principal is required.");
  const id = requiredText(decision.principal.id, "principal.id");
  const role = decision.principal.role === undefined ? undefined : requiredText(decision.principal.role, "principal.role");
  const reason = requiredText(decision.reason, "reason");
  if (typeof decision.at !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(decision.at) || !Number.isFinite(Date.parse(decision.at))) {
    throw new PatchProposalError("VALIDATION", "at must be an ISO-8601 timestamp.");
  }
  if (decision.decision === "promoted" && proposal.status !== "valid") {
    throw new PatchProposalError("PROMOTION_PRECONDITION", `A ${proposal.status} proposal cannot be promoted.`);
  }
  return deepFreeze({
    contractVersion: PATCH_PROPOSAL_CONTRACT,
    proposalDigest,
    decision: decision.decision,
    principal: role === undefined ? { id } : { id, role },
    at: decision.at,
    reason,
    appliesTo: "versioned-source",
    appliedByWorkbench: false,
    pinnedInvocationsChanged: 0,
  });
}

