/** Pure forge-operation evidence reader (docs/workbench/20 § Producer mapping, row "forge operation").
 *
 * It resolves a `forge-operation:<operation_id>` reference by re-reading through an injected seam shaped like the
 * registered forge read capability (the value readForgeGateStatus returns, contract forge.gate.status/v1). It never
 * calls a control verb, never retains the raw payload and never fabricates a reading. A failed or partial domain
 * verdict is a legitimate loaded result carrying its own status; a package without authoritative_current === true is
 * history, never current verification; transport success never implies verification.
 *
 * The EvidenceLoader/EvidenceStore wrapper (wb-g1g.1) consumes this reader; it is deliberately not implemented here.
 */
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { forgeGateTopology } from "./forge-observer.js";
import { nativeEvidence } from "./native-evidence.js";
import type { ObservationScope } from "./observation.js";
import { sanitizeWorkbenchText, stripUnsafeText } from "./redaction.js";

export const FORGE_EVIDENCE_GRANT = "forge:inspect";
const REF_PREFIX = "forge-operation:";
const MAX_ID_BYTES = 256;
const MAX_LINE = 200;
const MAX_LINES = 40;
const DEFAULT_MAX_BYTES = 4096;
const MIN_MAX_BYTES = 64;
const MAX_MAX_BYTES = 65_536;
const MARKER = "[truncated]";
const ZERO_WIDTH = /[\u200b-\u200f\u2060\ufeff]/g;

export type ForgeEvidenceFreshness = "current" | "stale";
/** The host's view of the owning source: anything but "current" labels the loaded evidence stale. */
export type ForgeEvidenceOwner = "current" | "stale" | "disconnected";

export interface ForgeEvidenceDeps {
  /** The live grant set, re-read on every load so a revocation takes effect mid-view. */
  readonly grants: () => Iterable<string>;
  readonly scope: ObservationScope;
  /** The read target handed to the seam. */
  readonly target: string;
  /** One read through the registered forge read capability; the only channel to the producer. */
  readonly read: (request: { readonly target: string; readonly signal: AbortSignal | undefined }) => Promise<JsonValue>;
  /** The host clock; the capture time is never taken from producer data. */
  readonly now: () => string;
  readonly maxBytes?: number;
  readonly signal?: AbortSignal;
  readonly owner?: ForgeEvidenceOwner;
}

export interface ForgeOperationEvidence {
  readonly kind: "forge-operation";
  readonly provider: "forge";
  readonly capturedAt: string;
  /** Bytes of the complete sanitized preview, before the budget was applied. */
  readonly bytes: number;
  readonly truncated: boolean;
  readonly preview: readonly string[];
  readonly sourceBasis?: string;
  readonly freshness: ForgeEvidenceFreshness;
  /** The verdict as the producer stated it, never upgraded to "verified". */
  readonly statusText: string;
  readonly producerReceipt: { readonly requestedOperationId: string; readonly readOperationId: string; readonly sameOperation: true };
}

/** A typed refusal; a failed read against a source that is not current additionally carries freshness "stale". */
export class ForgeEvidenceError extends CapabilityError {
  constructor(category: "validation" | "authorization" | "transport", message: string, readonly freshness?: "stale") {
    super(category, message);
    this.name = "ForgeEvidenceError";
  }
}

const record = (value: JsonValue | undefined): Record<string, JsonValue> | undefined =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;
const instant = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));

/** A validated id: bounded, one displayable token, exactly as the observer would list it. */
function operationIdOf(ref: string): string | undefined {
  if (!ref.startsWith(REF_PREFIX)) return undefined;
  const id = ref.slice(REF_PREFIX.length);
  if (id.length === 0 || Buffer.byteLength(id) > MAX_ID_BYTES || /\s/.test(id)) return undefined;
  return stripUnsafeText(id) === id && sanitizeWorkbenchText(id, MAX_LINE) === id ? id : undefined;
}

function display(line: string): string {
  return sanitizeWorkbenchText(stripUnsafeText(line, " ").replace(ZERO_WIDTH, "").replace(/\s+/g, " ").trim(), MAX_LINE);
}

/** Within the line and byte budgets: whole lines only, then one marker line that itself fits the budget. */
function bounded(lines: readonly string[], maxBytes: number): { preview: string[]; bytes: number; truncated: boolean } {
  const size = (items: readonly string[]) => Buffer.byteLength(items.join("\n"));
  const bytes = size(lines);
  if (lines.length <= MAX_LINES && bytes <= maxBytes) return { preview: [...lines], bytes, truncated: false };
  const preview: string[] = [];
  let used = Buffer.byteLength(MARKER);
  for (const line of lines) {
    const cost = Buffer.byteLength(line) + 1;
    if (preview.length >= MAX_LINES - 1 || used + cost > maxBytes) break;
    preview.push(line);
    used += cost;
  }
  preview.push(MARKER);
  return { preview, bytes, truncated: true };
}

export async function readForgeOperationEvidence(ref: string, deps: ForgeEvidenceDeps): Promise<ForgeOperationEvidence> {
  const requested = operationIdOf(ref);
  if (requested === undefined) throw new ForgeEvidenceError("validation", "Not a validated forge-operation:<operation_id> reference.");
  // Exact string match against the live grant set: wildcards, prefixes and case variants never qualify.
  let granted = false;
  for (const grant of deps.grants()) if (grant === FORGE_EVIDENCE_GRANT) granted = true;
  if (!granted) throw new ForgeEvidenceError("authorization", `Forge operation evidence requires the exact ${FORGE_EVIDENCE_GRANT} grant.`);
  const maxBytes = deps.maxBytes ?? DEFAULT_MAX_BYTES;
  if (!Number.isInteger(maxBytes) || maxBytes < MIN_MAX_BYTES || maxBytes > MAX_MAX_BYTES) {
    throw new ForgeEvidenceError("validation", `The preview budget must be an integer of ${MIN_MAX_BYTES}..${MAX_MAX_BYTES} bytes.`);
  }
  const capturedAt = deps.now();
  if (!instant(capturedAt)) throw new ForgeEvidenceError("validation", "The host capture time must be a timezone-qualified instant.");
  const freshness: ForgeEvidenceFreshness = deps.owner === undefined || deps.owner === "current" ? "current" : "stale";
  const staleness = freshness === "stale" ? "stale" : undefined;
  if (deps.signal?.aborted) throw new ForgeEvidenceError("transport", "The forge evidence read was cancelled before it started.", staleness);

  let result: JsonValue;
  try {
    result = await deps.read({ target: deps.target, signal: deps.signal });
  } catch (error) {
    // The seam's own text never enters an error; an authorization refusal from the capability stays one.
    if (error instanceof CapabilityError && error.category === "authorization") {
      throw new ForgeEvidenceError("authorization", "The forge read capability denied the evidence read.");
    }
    throw new ForgeEvidenceError("transport", "The forge read capability could not be read.", staleness);
  }

  const native = nativeEvidence("forge.gate.status", result);
  const source = record(record(result)?.source);
  if (native.provider !== "forge" || !source || !Array.isArray(record(source.data)?.packages)) {
    throw new ForgeEvidenceError("transport", "The forge read capability returned something other than a forge.gate.status/v1 reading.", staleness);
  }
  // A reading that names no operation, or another one, is never presented as evidence for the requested operation.
  if (native.nativeId !== requested) {
    throw new ForgeEvidenceError("validation", "The forge reading does not name the requested operation.");
  }

  let snapshots: ReturnType<typeof forgeGateTopology>["snapshots"];
  try {
    snapshots = forgeGateTopology(result, { scope: deps.scope, target: deps.target, capturedAt, observedAt: capturedAt }).snapshots;
  } catch {
    throw new ForgeEvidenceError("transport", "The forge reading is not a well-formed gate.status result.", staleness);
  }
  const workspace = snapshots[0];
  if (!workspace) throw new ForgeEvidenceError("transport", "The forge reading carries no workspace status.", staleness);

  // Any package without authoritative_current === true is history: label it so the status can never read as current.
  const packages = record(source.data)?.packages;
  const historical = Array.isArray(packages) && packages.some(pkg => record(pkg)?.authoritative_current !== true);
  const statusText = display(historical ? `${workspace.node.statusText} (historical; not current verification)` : workspace.node.statusText);
  const lines = [
    display(`${REF_PREFIX}${requested}`),
    display(`status: ${statusText}`),
    ...snapshots.slice(1).map(snapshot => display(`${snapshot.node.title}: ${snapshot.node.statusText}`)),
  ];
  const { preview, bytes, truncated } = bounded(lines, maxBytes);
  return {
    kind: "forge-operation",
    provider: "forge",
    capturedAt,
    bytes,
    truncated,
    preview,
    ...(native.sourceBasis !== undefined ? { sourceBasis: native.sourceBasis } : {}),
    freshness,
    statusText,
    producerReceipt: { requestedOperationId: requested, readOperationId: native.nativeId, sameOperation: true },
  };
}
