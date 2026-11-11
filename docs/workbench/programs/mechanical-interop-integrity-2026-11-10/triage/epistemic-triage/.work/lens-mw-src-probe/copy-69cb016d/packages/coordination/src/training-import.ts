/**
 * Import/validation entry point for adapter-format mw.training-export.v1 records
 * (TW-EAT-R005, MechanicalWorkflows-bu7x). An external value claiming to be a training
 * export is admitted only through here: structural members are checked, every step must
 * CARRY a logProb member — the explicit literal "unknown" is accepted, absence is the
 * missing-logprob negative control and its own typed rejection — and the record's digest
 * must recompute from its other members. When a credits member is present it must satisfy the laws
 * attachPerActorCredit enforces on the way in (MechanicalWorkflows-eu94). The input is read, never altered.
 */
import { digest } from "./canonical.js";
import { sanitizeValue, UNKNOWN } from "./episode.js";
import type { TrainingExport } from "./training-export.js";

export type TrainingImportOutcome =
  | { readonly ok: true; readonly record: TrainingExport }
  | { readonly ok: false; readonly code: "TRAINING_LOGPROB_ABSENT" | "TRAINING_IMPORT_MALFORMED"; readonly detail: string };

const reject = (code: Extract<TrainingImportOutcome, { ok: false }>["code"], detail: string): TrainingImportOutcome => ({ ok: false, code, detail });
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const nonblank = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

const DERIVATION_KINDS: ReadonlySet<string> = new Set(["intervention", "counterfactual"]);
/** The members attachPerActorCredit keeps on a row and on its derivation (training-export.ts); anything else cannot come from the writer. */
const ROW_MEMBERS: ReadonlySet<string> = new Set(["actorId", "valueMicro", "derivation"]);
const DERIVATION_MEMBERS: ReadonlySet<string> = new Set(["kind", "reference"]);

/** The first violated credit law of a present credits member, or null: the same laws attachPerActorCredit enforces, so a forged record cannot reach the admitted set around the writer. */
function creditDefect(credits: unknown, steps: readonly unknown[]): string | null {
  if (!Array.isArray(credits) || credits.length === 0) return "credits member must be a non-empty array of per-actor credit rows";
  // Guard the member before the unbounded credential scan: a cycle or an over-deep nest anywhere in credits is a typed rejection, never a throw out of the recursion (JYZA-D1).
  const nonJson = nonJsonDetail(credits, "credits", []);
  if (nonJson !== undefined) return nonJson;
  const removed = sanitizeValue(credits).removed;
  if (removed.length > 0) return `credits carry credential-shaped content at ${removed.join(", ")}`;
  const actors = new Set<string>();
  for (const step of steps) {
    const actorId = (step as Record<string, unknown>)["actorId"];
    if (typeof actorId === "string" && actorId !== UNKNOWN) actors.add(actorId);
  }
  for (const [index, row] of credits.entries()) {
    if (!record(row)) return `credit ${index} is not an object`;
    const extraRow = Object.keys(row).find(key => !ROW_MEMBERS.has(key));
    if (extraRow !== undefined) return `credit ${index} carries a member outside the writer projection: ${extraRow}`;
    const derivation = row["derivation"];
    const extraDerivation = record(derivation) ? Object.keys(derivation).find(key => !DERIVATION_MEMBERS.has(key)) : undefined;
    if (extraDerivation !== undefined) return `credit ${index} derivation carries a member outside the writer projection: ${extraDerivation}`;
    const kind = record(derivation) ? derivation["kind"] : undefined;
    if (typeof kind !== "string" || !DERIVATION_KINDS.has(kind)) return `credit ${index} derives from no intervention or counterfactual (derivation kind outside the closed enum); a global team outcome alone never attributes per-actor benefit`;
    if (!nonblank((derivation as Record<string, unknown>)["reference"])) return `credit ${index} names no derivation reference`;
    const actorId = row["actorId"];
    if (!nonblank(actorId)) return `credit ${index} needs a named actor`;
    if (!Number.isSafeInteger(row["valueMicro"])) return `credit ${index} valueMicro must be a safe integer (Python reads larger ones as float)`;
    if (!actors.has(actorId)) return `credit ${index} names ${actorId}, which no step of this record attributes a decision to`;
  }
  return null;
}

const MAX_MEMBER_DEPTH = 256;

/**
 * Walk one member and name the first thing JSON cannot carry: a non-finite number, a value that is not a
 * plain object, array or primitive (a Date, a Map, undefined, a function), a cycle, or nesting deeper than
 * MAX_MEMBER_DEPTH. The importer calls this before the digest recompute so a hostile in-process value
 * becomes a typed rejection instead of a throw out of canonical serialisation.
 */
function nonJsonDetail(value: unknown, path: string, ancestors: readonly object[]): string | undefined {
  if (value === null || typeof value === "string" || typeof value === "boolean") return undefined;
  if (typeof value === "number") return Number.isFinite(value) ? undefined : `member ${path} holds the non-finite number ${String(value)}`;
  if (typeof value !== "object") return `member ${path} holds a ${typeof value}, which JSON cannot carry`;
  if (ancestors.includes(value)) return `member ${path} closes a cycle`;
  if (ancestors.length >= MAX_MEMBER_DEPTH) return `member ${path} nests deeper than depth ${MAX_MEMBER_DEPTH}`;
  const isArray = Array.isArray(value);
  const prototype = Object.getPrototypeOf(value);
  if (!isArray && prototype !== Object.prototype && prototype !== null) return `member ${path} is not a plain object or array`;
  const next = [...ancestors, value];
  if (isArray) {
    for (const [index, item] of (value as unknown[]).entries()) {
      const found = nonJsonDetail(item, `${path}[${index}]`, next);
      if (found !== undefined) return found;
    }
    return undefined;
  }
  for (const [key, item] of Object.entries(value)) {
    const found = nonJsonDetail(item, path === "" ? key : `${path}.${key}`, next);
    if (found !== undefined) return found;
  }
  return undefined;
}

/** Validate one external value as a mw.training-export.v1 record. */
export function importTrainingExport(value: unknown): TrainingImportOutcome {
  if (!record(value)) return reject("TRAINING_IMPORT_MALFORMED", "not an object");
  if (value["schema"] !== "mw.training-export.v1") return reject("TRAINING_IMPORT_MALFORMED", `unsupported schema ${String(value["schema"])}`);
  if (value["version"] !== 1) return reject("TRAINING_IMPORT_MALFORMED", `unsupported version ${String(value["version"])}`);
  if (value["mode"] !== "fixture" && value["mode"] !== "replay" && value["mode"] !== "live") return reject("TRAINING_IMPORT_MALFORMED", `mode outside the closed enum: ${String(value["mode"])}`);
  if (!nonblank(value["episodeId"]) || !nonblank(value["environment"])) return reject("TRAINING_IMPORT_MALFORMED", "blank episodeId or environment");
  const steps = value["steps"];
  if (!Array.isArray(steps)) return reject("TRAINING_IMPORT_MALFORMED", "steps member absent or not an array");
  for (const [index, step] of steps.entries()) {
    if (!record(step)) return reject("TRAINING_IMPORT_MALFORMED", `step ${index} is not an object`);
    if (!("logProb" in step)) return reject("TRAINING_LOGPROB_ABSENT", `step ${index} carries no logProb member; a value nobody recorded must be the explicit literal "unknown"`);
    const logProb = step["logProb"];
    if (logProb !== "unknown" && !(typeof logProb === "number" && Number.isFinite(logProb))) {
      return reject("TRAINING_IMPORT_MALFORMED", `step ${index} logProb must be a finite number or the literal "unknown", got ${JSON.stringify(logProb)}`);
    }
  }
  for (const member of ["verifier", "lineage", "sanitize"] as const) {
    if (!record(value[member])) return reject("TRAINING_IMPORT_MALFORMED", `${member} member absent or not an object`);
  }
  if (Object.prototype.hasOwnProperty.call(value, "credits")) {
    const defect = creditDefect(value["credits"], steps);
    if (defect !== null) return reject("TRAINING_IMPORT_MALFORMED", defect);
  }
  if (!nonblank(value["digest"])) return reject("TRAINING_IMPORT_MALFORMED", "digest member absent or blank");
  const { digest: claimed, ...rest } = value as { digest: string } & Record<string, unknown>;
  const nonJson = nonJsonDetail(rest, "", []);
  if (nonJson !== undefined) return reject("TRAINING_IMPORT_MALFORMED", nonJson);
  const recomputed = digest(rest);
  if (recomputed !== claimed) return reject("TRAINING_IMPORT_MALFORMED", `digest does not recompute: claimed ${claimed}, members hash to ${recomputed}`);
  return { ok: true, record: value as unknown as TrainingExport };
}
