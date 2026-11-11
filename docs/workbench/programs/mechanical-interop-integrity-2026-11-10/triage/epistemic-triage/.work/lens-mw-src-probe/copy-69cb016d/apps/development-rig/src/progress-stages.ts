/**
 * Structured progress vocabulary for the live development flow (EAT-R015; MechanicalWorkflows-loexn.8).
 * The program names seven lifecycle stages; the rig receipt reports a different, older set. This module defines both and the
 * one mapping between them, so a host (Pi or any other) learns where a run stands without parsing text. Observation only:
 * a progress event never grants authority, replays an effect or settles anything.
 */

/** The seven lifecycle stages a host sees, in the only order a run emits them. */
export const PROGRAM_STAGES = ["discovery", "context", "sdk_startup", "first_edit", "commit", "gate_dispatch", "settlement"] as const;
export type ProgramStage = typeof PROGRAM_STAGES[number];

/** The stage names DevelopmentReceipt.stages already exposes today. */
export const RIG_RECEIPT_STAGES = ["discovery", "context", "agent", "review", "candidate", "verification", "furnace"] as const;
export type RigReceiptStage = typeof RIG_RECEIPT_STAGES[number];

/** Committed mapping from the program's stage names to the receipt's. The table in docs/06 repeats it and a test compares the two. */
export const STAGE_MAP: Readonly<Record<ProgramStage, RigReceiptStage>> = {
  discovery: "discovery",
  context: "context",
  sdk_startup: "agent",
  first_edit: "agent",
  commit: "candidate",
  gate_dispatch: "verification",
  settlement: "verification",
};

/**
 * What the host knows about side effects at a stage. "none": nothing has been dispatched that could have written.
 * "uncertain": the writer was dispatched and the outcome is not yet settled. "settled": the gate answered for exactly the
 * committed candidate. Never inferred from a text status.
 */
export type ProgressDisposition = "none" | "uncertain" | "settled";

/** Latest native refs known when the stage was reached; null means not yet observed, never fabricated. */
export interface ProgressRefs {
  readonly baseCommit: string;
  readonly contextRenderId: string | null;
  readonly agentSessionId: string | null;
  readonly candidateCommit: string | null;
  readonly candidateTree: string | null;
  readonly forgeOperationId: string | null;
}

export interface ProgressEvent {
  readonly stage: ProgramStage;
  /** The receipt stage this program stage reports under (STAGE_MAP). */
  readonly rigStage: RigReceiptStage;
  readonly disposition: ProgressDisposition;
  readonly refs: ProgressRefs;
  /** Present on first_edit only: whether the agent stream reported the edit or the host saw it in the committed Git diff. */
  readonly observedVia?: "agent-stream" | "host-git-diff";
}
/** Observer only: a callback that throws or rejects never changes the development outcome. */
export type ProgressCallback = (event: ProgressEvent) => void | Promise<void>;

/** Refuses, by name, any stage that belongs to neither vocabulary or that is a receipt name alone. */
export function assertKnownProgressStage(stage: string): asserts stage is ProgramStage {
  if ((PROGRAM_STAGES as readonly string[]).includes(stage)) return;
  const receiptOnly = (RIG_RECEIPT_STAGES as readonly string[]).includes(stage);
  throw new Error("PROGRESS_STAGE_UNKNOWN: " + stage + (receiptOnly
    ? " is a rig receipt stage name only; progress events emit program stages and carry the receipt name as rigStage"
    : " is in neither the program nor the rig receipt vocabulary"));
}
