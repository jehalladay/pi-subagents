/**
 * Opt-in step-level reference fixture (TW-EAT-R014, MechanicalWorkflows-9om3). Boundary criterion,
 * stated in docs/programs/trainingworks-2026-10-18/README.md and enforced here with the same
 * words: step surfaces exist only over sources with real step semantics, and no generic
 * environment registry, reward engine or scheduler is introduced. A step source must DECLARE
 * capability "step" AND implement reset/step/observe/verify as functions; an mw.episode.v1
 * record, any whole-episode-only object, or a declared-but-unimplemented source is refused at
 * construction with STEP_SEMANTICS_UNSUPPORTED. This is new surface, not a wrap of existing
 * engines (no in-repo source supports step semantics at HEAD). Fixture evidence stays fixture:
 * the verify leg admits only the label "fixture" and refuses anything PASS-shaped
 * (STEP_VERIFY_LABEL_FORBIDDEN) — never advertise native PASS on fixture-only state.
 */

export interface StepResult<O> {
  readonly observation: O;
  readonly done: boolean;
}

export interface StepVerification {
  readonly label: "fixture";
  readonly verdict: string;
}

/** A source with REAL step semantics: declared capability and implemented reset/step/observe/verify. */
export interface StepSource<O, A, S> {
  readonly capability: "step";
  readonly sourceId: string;
  reset(seed: number): S;
  step(action: A): StepResult<O>;
  observe(): O;
  verify(): StepVerification;
}

export interface StepFixture<O, A, S> {
  readonly mode: "fixture";
  readonly sourceId: string;
  reset(seed: number): S;
  step(action: A): StepResult<O>;
  observe(): O;
  verify(): StepVerification;
}

const CRITERION = "step surfaces exist only over sources with real step semantics, and no generic environment registry, reward engine or scheduler is introduced";
const MEMBERS = ["reset", "step", "observe", "verify"] as const;
const refuse = (detail: string): never => {
  throw new RangeError(`STEP_SEMANTICS_UNSUPPORTED: ${detail}; ${CRITERION}`);
};

function isStepSource(value: unknown): value is StepSource<unknown, unknown, unknown> {
  if (value === null || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (record.capability !== "step") return false;
  return MEMBERS.every(member => typeof record[member] === "function");
}

/**
 * Construct the fixture over a source with real step semantics; everything else is refused.
 * The fixture adds nothing to the source but the fixture label and the verify-label guard.
 */
export function stepFixture<O, A, S>(source: StepSource<O, A, S>): StepFixture<O, A, S> {
  if (!isStepSource(source)) {
    const record = source as Record<string, unknown> | null;
    const what = record === null || typeof source !== "object"
      ? `a ${source === null ? "null" : typeof source} value`
      : record["capability"] !== "step"
        ? `a source without a declared step capability (schema ${String(record["schema"] ?? "none")})`
        : `a source declaring step capability without implementing ${MEMBERS.filter(member => typeof record[member] !== "function").join("/")}`;
    refuse(`${what} has no real step semantics`);
  }
  if (source.sourceId.trim().length === 0) refuse("a blank sourceId names no source");
  return {
    mode: "fixture",
    sourceId: source.sourceId,
    reset: seed => source.reset(seed),
    step: action => source.step(action),
    observe: () => source.observe(),
    verify: () => {
      const verified = source.verify();
      if (verified.label !== "fixture") {
        throw new RangeError(`STEP_VERIFY_LABEL_FORBIDDEN: the source labelled its evidence ${String(verified.label)}; fixture-only state never advertises a native PASS`);
      }
      return verified;
    },
  };
}
