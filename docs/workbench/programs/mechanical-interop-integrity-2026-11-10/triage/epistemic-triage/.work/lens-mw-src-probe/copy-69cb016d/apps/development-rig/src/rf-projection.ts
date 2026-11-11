/** Consumer-side guard: an rf projection that still carries an unkeyed task digest discloses the task label. */
import { createHash } from "node:crypto";

/** Keys whose value is sha256 of the task text. `task_blob_digest` equals `task_digest` on the installed rf `show` record. */
const TASK_LABEL_KEYS: ReadonlySet<string> = new Set(["task_digest", "task_blob_digest"]);

export interface RedactionClassification {
  readonly disclosesTaskLabel: boolean;
  /** JSON-pointer paths (sorted) of every member that carries a task digest. */
  readonly paths: readonly string[];
}
export interface UntrustedProjection {
  readonly projection: unknown;
  /** JSON-pointer paths (sorted) removed from the copy. */
  readonly removed: readonly string[];
}

/** The unkeyed digest rf records for a task: `sha256:` + hex over the exact UTF-8 bytes of the task text. */
export function taskDigestOf(taskText: string): string {
  if (typeof taskText !== "string") throw new TypeError("RF_PROJECTION_INPUT_INVALID: task text must be a string");
  return "sha256:" + createHash("sha256").update(taskText, "utf8").digest("hex");
}

function pointerToken(key: string): string { return key.replaceAll("~", "~0").replaceAll("/", "~1"); }

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function scan(value: unknown, path: string, found: string[], strip: boolean): unknown {
  if (Array.isArray(value)) return value.map((member, index) => scan(member, `${path}/${index}`, found, strip));
  if (!isObject(value)) return value;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value)) {
    const here = `${path}/${pointerToken(key)}`;
    if (TASK_LABEL_KEYS.has(key)) { found.push(here); if (strip) continue; }
    // Defined, never assigned: an own "__proto__" member from JSON.parse stays a plain member.
    Object.defineProperty(out, key, { value: scan(value[key], here, found, strip), enumerable: true, writable: true, configurable: true });
  }
  return out;
}

function requireEnvelope(envelope: unknown): void {
  if (envelope === null || typeof envelope !== "object")
    throw new TypeError("RF_PROJECTION_INPUT_INVALID: an rf envelope must be a JSON object or array");
}

/** Reports every member, at any depth and inside arrays, whose key names a task digest. Never alters its input. */
export function classifyRedaction(envelope: unknown): RedactionClassification {
  requireEnvelope(envelope);
  const found: string[] = [];
  scan(envelope, "", found, false);
  found.sort();
  return { disclosesTaskLabel: found.length > 0, paths: found };
}

/** A deep copy without task-digest members, plus the removed paths. Identity digests (final_document_digest, output.digest, graph_revision_id) stay. */
export function projectForUntrustedSurface(envelope: unknown): UntrustedProjection {
  requireEnvelope(envelope);
  const removed: string[] = [];
  const projection = scan(envelope, "", removed, true);
  removed.sort();
  return { projection, removed };
}

/** Fail closed: refuse an envelope that is labelled redacted while it still discloses the task label. */
export function assertRedactedProjection(envelope: unknown): void {
  const { disclosesTaskLabel, paths } = classifyRedaction(envelope);
  if (disclosesTaskLabel)
    throw new Error(`RF_REDACTION_DISCLOSES_TASK_LABEL: redacted projection still carries an unkeyed task digest at ${paths.join(", ")}`);
}
