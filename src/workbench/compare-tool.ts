/**
 * compare-tool.ts - the pure bounded workflow_compare reply builder over the landed W17 comparison core (wb-69g.7,
 * W16-H/VC-6). docs/workbench/11-designer-and-operator.md, "First public Pi tools (proposed)":
 * "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis alignment, measured metrics and
 * confidence/coverage limits."; "Comparative experiment protocol": "Pin workload, input revisions, workspace basis, code
 * digest, model config, SDK versions and permissions." and its trace-coverage rule: a claim the trace coverage cannot carry
 * is declined, with the raw evidence references.
 *
 * The builder RENDERS one supplied compareWorkflowRuns result (src/workbench/designer.ts) under the grant snapshot the
 * host bound to the call. It never compares, never re-decides a basis status or a metric verdict, never reads a receipt,
 * never invokes a provider verb and never registers a Pi tool (the registered workflow_compare in src/index.ts is not
 * touched). What it does, in order:
 * - authorization: the snapshot must be a list of strings holding both exact grants the registered tool requires,
 *   workbench:design and workbench:observe (deny by default); a refusal carries a fixed typed reason, never caller text,
 *   and renders nothing of the comparison. The capabilityGrants grammar is not parsed here: settings.ts admits the list.
 * - alignment: every cohort basis field of the result in its own order, grouped source / config / basis, its status echoed
 *   from the core's closed vocabulary beside one alignment word read off that status alone (matched = aligned,
 *   declared-change = declared-change, mismatched = misaligned, absent and unverified = unestablished); every confound the
 *   core named; the reference and candidate source digests. `aligned` holds only when the core's cohort.matched is true
 *   AND no confound and no row says otherwise, so a result whose parts disagree is never reconciled into an aligned one.
 * - pins: the protocol's seven pins, each with the core basis fields that carry it; a pin is aligned only when every one
 *   of its fields is reported and aligned (or the declared change), misaligned when one is misaligned, else unestablished.
 *   The pins describe; they never change a metric verdict.
 * - metrics: a metric the core measured, in an aligned cohort with an association claim and a finite delta and finite
 *   summaries, carries its numbers with confidence limits (each cohort's run count, whether dispersion was measured) and
 *   the coverage the core requires before it measures (complete, current); every other metric is a declined row with the
 *   core's reasons and the raw evidence references the core carried for it, and no number. `dimensions`, when supplied,
 *   selects metric rows by name; it never narrows the alignment, the confounds or the pins, and a requested name the
 *   result does not carry is listed, never invented.
 * - status: "measured" when a selected metric row is measured, else the typed "declined" reply, whose only numbers are
 *   the bookkeeping counts and the byte cap.
 * Every string taken from the result passes sanitizeWorkbenchText with the named "text" layout and a bound, and the whole
 * reply is serialized by sanitizeWorkbenchJsonText. Under the byte cap the reply drops evidence references first, then
 * diagnostics, then limitations, then metric rows (declined rows before measured ones), then source digests, and never an
 * alignment row, a confound or a pin; each drop is counted and the truncation marker is set.
 */
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import type { MetricSummary, WorkflowComparison } from "./designer.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "./tool-replies.js";

/** The two exact grants the registered workflow_compare requires (src/index.ts), matched as exact strings. */
export const COMPARE_REPLY_GRANTS: readonly string[] = Object.freeze(["workbench:design", "workbench:observe"]);
export const COMPARE_REPLY_MIN_BYTES = 8192;
export const COMPARE_REPLY_DEFAULT_MAX_BYTES = 16384;
export const COMPARE_REPLY_MAX_BYTES = 262144;
export const COMPARE_REPLY_TRUNCATION_MARKER = "[truncated: reply byte cap reached]";
export const COMPARE_REPLY_MAX_DIMENSIONS = 32;

const FIELD_CHARS = 64;
const NAME_CHARS = 128;
const REASON_CHARS = 320;
const REF_CHARS = 512;

export type CompareGroup = "source" | "config" | "basis" | "unclassified";
export type CompareAlignment = "aligned" | "declared-change" | "misaligned" | "unestablished";
export type CompareBasisStatus = "matched" | "declared-change" | "mismatched" | "absent" | "unverified" | "unrecognized";
export type CompareConfoundKind = "absent" | "mismatched" | "refused" | "unverified" | "unrecognized";
export type CompareDeclineCode = "schema-refused" | "misaligned" | "insufficient-coverage";
export type CompareRefusalCode = "UNKNOWN_PERMISSION_DATA" | "MISSING_DESIGN_GRANT" | "MISSING_OBSERVE_GRANT" | "INVALID_DIMENSIONS" | "MALFORMED_COMPARISON";

/** Which docs/11 alignment heading each core basis field reports under; a field outside the table is "unclassified", never dropped. */
export const COMPARE_BASIS_GROUPS: ReadonlyMap<string, Exclude<CompareGroup, "unclassified">> = new Map([
  ["definition", "source"],
  ["schemaVersion", "source"],
  ["definitionDigest", "source"],
  ["deploymentDigest", "source"],
  ["configurationDigest", "config"],
  ["modelDigest", "config"],
  ["toolsDigest", "config"],
  ["dependencyDigest", "config"],
  ["runtimeArtifactDigest", "config"],
  ["hostImplementationDigest", "config"],
  ["hostAbiDigest", "config"],
  ["providerContractDigest", "config"],
  ["inputDigest", "basis"],
  ["subjectBasis", "basis"],
  ["workspaceSourceState", "basis"],
  ["environmentDigest", "basis"],
  ["cacheDigest", "basis"],
]);

export interface CompareProtocolPin {
  readonly pin: string;
  readonly fields: readonly string[];
}
/**
 * The protocol's pins in the order docs/11 names them, each with the core basis fields whose digests carry it. The
 * builder reads only those fields' echoed statuses; it never opens a digest. Model config and permissions both read
 * configurationDigest: the hosts compose the effective configuration digest from the model, permission mode, tools and
 * capability grants (src/index.ts invocationInput).
 */
export const COMPARE_PROTOCOL_PINS: readonly CompareProtocolPin[] = Object.freeze([
  Object.freeze({ pin: "workload", fields: Object.freeze(["definition", "schemaVersion"]) }),
  Object.freeze({ pin: "input revisions", fields: Object.freeze(["inputDigest"]) }),
  Object.freeze({ pin: "workspace basis", fields: Object.freeze(["subjectBasis", "workspaceSourceState"]) }),
  Object.freeze({ pin: "code digest", fields: Object.freeze(["definitionDigest", "deploymentDigest"]) }),
  Object.freeze({ pin: "model config", fields: Object.freeze(["modelDigest", "configurationDigest"]) }),
  Object.freeze({ pin: "SDK versions", fields: Object.freeze(["dependencyDigest", "runtimeArtifactDigest", "hostImplementationDigest", "hostAbiDigest", "providerContractDigest"]) }),
  Object.freeze({ pin: "permissions", fields: Object.freeze(["toolsDigest", "configurationDigest"]) }),
]);

const STATUS_ALIGNMENT: ReadonlyMap<string, CompareAlignment> = new Map([
  ["matched", "aligned"],
  ["declared-change", "declared-change"],
  ["mismatched", "misaligned"],
  ["absent", "unestablished"],
  ["unverified", "unestablished"],
]);
const CONFOUND_KINDS: readonly string[] = Object.freeze(["absent", "mismatched", "refused", "unverified"]);
const CORE_STATUSES: readonly string[] = Object.freeze(["comparable", "confounded", "unknown"]);
const SEVERITIES: readonly string[] = Object.freeze(["error", "warning"]);
/** The one reason the builder adds itself: a measured verdict the rest of the result does not carry is never rendered as a number. */
const UNCARRIED_MEASURED =
  "The supplied comparison does not carry this measured verdict consistently (aligned cohort, association claim, finite delta and summaries); no number is rendered.";

export interface BuildWorkflowCompareReplyInput {
  /** The landed W17 core's result (compareWorkflowRuns) the host computed for this call; the builder never computes one. */
  readonly comparison: WorkflowComparison;
  /** The grant snapshot the host bound to this call. Every authorization decision derives from it alone. */
  readonly grants: readonly string[] | undefined;
  /** Optional metric-name selection (the tool's dimensions?). Never narrows alignment, confounds or pins. */
  readonly dimensions?: readonly string[];
  /** Host-set byte cap of the model-facing text. */
  readonly maxBytes?: number;
}

export interface CompareRefusalReply {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: "workflow_compare";
  readonly ok: false;
  readonly invoked: false;
  readonly status: "refused";
  readonly error: { readonly code: CompareRefusalCode; readonly category: CapabilityErrorCategory; readonly message: string };
}
export interface CompareBasisRow {
  readonly field: string;
  readonly group: CompareGroup;
  readonly status: CompareBasisStatus;
  readonly alignment: CompareAlignment;
  readonly detail?: string;
}
export interface CompareConfoundRow {
  readonly field: string;
  readonly kind: CompareConfoundKind;
  readonly reason: string;
}
export interface ComparePinRow {
  readonly pin: string;
  readonly fields: readonly string[];
  readonly notReported: readonly string[];
  readonly alignment: CompareAlignment;
}
export interface CompareMeasuredRow {
  readonly name: string;
  readonly unit: string;
  readonly kind: "measured";
  readonly delta: number;
  readonly reference: MetricSummary;
  readonly candidate: MetricSummary;
  readonly confidence: { readonly referenceRuns: number; readonly candidateRuns: number; readonly dispersion: "measured" | "unmeasured" };
  /** What the core requires of every receipt before it measures (designer.ts compareWorkflowRuns). */
  readonly coverage: "complete";
  readonly freshness: "current";
  readonly evidenceRefs: readonly string[];
}
export interface CompareDeclinedRow {
  readonly name: string;
  readonly unit: string;
  readonly kind: "declined";
  readonly verdict: "measured" | "unknown" | "unrecognized";
  readonly reasons: readonly string[];
  readonly evidenceRefs: readonly string[];
}
export type CompareMetricRow = CompareMeasuredRow | CompareDeclinedRow;
export interface CompareCount {
  readonly offered: number;
  readonly returned: number;
}
export interface CompareDiagnosticRow {
  readonly code: string;
  readonly severity: "error" | "warning" | "unrecognized";
  readonly dimension?: string;
  readonly message: string;
}
export interface CompareCompletedReply {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: "workflow_compare";
  readonly ok: true;
  readonly invoked: false;
  readonly status: "measured" | "declined";
  readonly coreStatus: "comparable" | "confounded" | "unknown" | "unrecognized";
  readonly alignment: {
    readonly aligned: boolean;
    readonly sourceDigests: { readonly reference: readonly string[]; readonly candidate: readonly string[] };
    readonly basis: readonly CompareBasisRow[];
    readonly confounds: readonly CompareConfoundRow[];
  };
  readonly pins: readonly ComparePinRow[];
  readonly metrics: readonly CompareMetricRow[];
  readonly unmatchedDimensions?: readonly string[];
  readonly declined?: { readonly code: CompareDeclineCode };
  readonly diagnostics: readonly CompareDiagnosticRow[];
  readonly limits: { readonly claim: "association" | "none"; readonly causalClaim: false; readonly criticalPath: "unestablished"; readonly limitations: readonly string[] };
  readonly counts: {
    readonly metrics: CompareCount;
    readonly evidenceRefs: CompareCount;
    readonly diagnostics: CompareCount;
    readonly limitations: CompareCount;
    readonly sourceDigests: CompareCount;
  };
  readonly truncation?: { readonly truncated: true; readonly reason: "byte-cap"; readonly marker: string; readonly maxBytes: number };
}
export type WorkflowCompareReply = CompareRefusalReply | CompareCompletedReply;

export interface BuiltWorkflowCompareReply {
  /** Compact sanitized JSON, at most the byte cap. */
  readonly text: string;
  readonly reply: WorkflowCompareReply;
  readonly bytes: number;
  readonly truncated: boolean;
}

const REFUSALS: Readonly<Record<CompareRefusalCode, { readonly category: CapabilityErrorCategory; readonly message: string }>> = Object.freeze({
  UNKNOWN_PERMISSION_DATA: { category: "authorization", message: "unknown permission data" },
  MISSING_DESIGN_GRANT: { category: "authorization", message: "missing exact grant workbench:design" },
  MISSING_OBSERVE_GRANT: { category: "authorization", message: "missing exact grant workbench:observe" },
  INVALID_DIMENSIONS: { category: "validation", message: `dimensions must name 1 to ${COMPARE_REPLY_MAX_DIMENSIONS} metrics, each 1 to ${NAME_CHARS} characters` },
  MALFORMED_COMPARISON: { category: "validation", message: "the supplied comparison is not a comparison core result" },
});

/** Every display string the builder takes from its input, bounded, in the model-facing text layout. */
function display(value: unknown, limit: number): string {
  return sanitize(typeof value === "string" ? value : String(value), limit);
}
function sanitize(value: string, limit: number): string {
  return sanitizeWorkbenchText(value, limit, "text");
}
function refuse(code: CompareRefusalCode): CompareRefusalReply {
  const { category, message } = REFUSALS[code];
  return Object.freeze({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: false, invoked: false, status: "refused", error: Object.freeze({ code, category, message }) });
}
function checkedCap(value: number | undefined): number {
  const cap = value ?? COMPARE_REPLY_DEFAULT_MAX_BYTES;
  if (!Number.isSafeInteger(cap) || cap < COMPARE_REPLY_MIN_BYTES || cap > COMPARE_REPLY_MAX_BYTES) {
    throw new CapabilityError("validation", `maxBytes must be an integer from ${COMPARE_REPLY_MIN_BYTES} to ${COMPARE_REPLY_MAX_BYTES}.`);
  }
  return cap;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function records(value: unknown): value is readonly Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isRecord);
}
function wellFormed(comparison: unknown): comparison is WorkflowComparison {
  if (!isRecord(comparison) || !isRecord(comparison.cohort) || !isRecord(comparison.sourceDigests)) return false;
  const { cohort, sourceDigests } = comparison;
  return records(comparison.perMetric) && records(comparison.metrics) && records(comparison.diagnostics) && Array.isArray(comparison.limitations)
    && records(cohort.basis) && records(cohort.confounds) && Array.isArray(sourceDigests.reference) && Array.isArray(sourceDigests.candidate);
}
function validDimensions(dimensions: unknown): dimensions is readonly string[] {
  return Array.isArray(dimensions) && dimensions.length >= 1 && dimensions.length <= COMPARE_REPLY_MAX_DIMENSIONS
    && dimensions.every(name => typeof name === "string" && name.length >= 1 && name.length <= NAME_CHARS);
}
/** Authorization first, so a caller without both grants learns nothing about the comparison; the first refusal wins. */
function refusalFor(input: BuildWorkflowCompareReplyInput): CompareRefusalReply | undefined {
  const grants: unknown = input.grants;
  if (!Array.isArray(grants) || !grants.every(grant => typeof grant === "string")) return refuse("UNKNOWN_PERMISSION_DATA");
  if (!grants.includes(COMPARE_REPLY_GRANTS[0])) return refuse("MISSING_DESIGN_GRANT");
  if (!grants.includes(COMPARE_REPLY_GRANTS[1])) return refuse("MISSING_OBSERVE_GRANT");
  if (input.dimensions !== undefined && !validDimensions(input.dimensions)) return refuse("INVALID_DIMENSIONS");
  if (!wellFormed(input.comparison)) return refuse("MALFORMED_COMPARISON");
  return undefined;
}

function basisRow(row: Record<string, unknown>): CompareBasisRow {
  const field = display(row.field, FIELD_CHARS);
  const known = typeof row.status === "string" ? STATUS_ALIGNMENT.get(row.status) : undefined;
  const status: CompareBasisStatus = known !== undefined ? (row.status as CompareBasisStatus) : "unrecognized";
  return {
    field,
    group: (typeof row.field === "string" ? COMPARE_BASIS_GROUPS.get(row.field) : undefined) ?? "unclassified",
    status,
    alignment: known ?? "unestablished",
    ...(row.detail !== undefined ? { detail: display(row.detail, REASON_CHARS) } : {}),
  };
}
function confoundRow(row: Record<string, unknown>): CompareConfoundRow {
  const kind: CompareConfoundKind = typeof row.kind === "string" && CONFOUND_KINDS.includes(row.kind) ? (row.kind as CompareConfoundKind) : "unrecognized";
  return { field: display(row.field, FIELD_CHARS), kind, reason: display(row.reason, REASON_CHARS) };
}
function pinRow(pin: CompareProtocolPin, basis: readonly Record<string, unknown>[], rows: readonly CompareBasisRow[]): ComparePinRow {
  const carried = rows.filter((_, at) => typeof basis[at].field === "string" && pin.fields.includes(basis[at].field as string));
  const notReported = pin.fields.filter(field => !basis.some(row => row.field === field));
  const alignment: CompareAlignment = carried.some(row => row.alignment === "misaligned")
    ? "misaligned"
    : notReported.length > 0 || carried.some(row => row.alignment === "unestablished")
      ? "unestablished"
      : carried.some(row => row.alignment === "declared-change")
        ? "declared-change"
        : "aligned";
  return { pin: pin.pin, fields: [...pin.fields], notReported, alignment };
}
function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
/** A core summary rendered member by member, or undefined when any member is not the finite number the core emits. */
function summaryOf(value: unknown): MetricSummary | undefined {
  if (!isRecord(value)) return undefined;
  const { count, mean, median, min, max, standardDeviation } = value;
  if (!Number.isSafeInteger(count) || (count as number) < 1 || !finite(mean) || !finite(median) || !finite(min) || !finite(max)) return undefined;
  if (standardDeviation !== undefined && !finite(standardDeviation)) return undefined;
  return { count: count as number, mean, median, min, max, ...(standardDeviation !== undefined ? { standardDeviation } : {}) };
}
function refsOf(entry: Record<string, unknown> | undefined): string[] {
  if (!entry || !Array.isArray(entry.evidenceRefs)) return [];
  return [...new Set(entry.evidenceRefs.map(ref => display(ref, REF_CHARS)))];
}

interface Parts {
  readonly coreStatus: CompareCompletedReply["coreStatus"];
  readonly alignment: { aligned: boolean; reference: string[]; candidate: string[]; basis: CompareBasisRow[]; confounds: CompareConfoundRow[] };
  readonly pins: ComparePinRow[];
  readonly metrics: CompareMetricRow[];
  readonly unmatchedDimensions?: string[];
  readonly diagnostics: CompareDiagnosticRow[];
  readonly limitations: string[];
}

function metricRows(comparison: WorkflowComparison, aligned: boolean, dimensions: readonly string[] | undefined): CompareMetricRow[] {
  const verdicts = (comparison.perMetric as unknown as readonly Record<string, unknown>[]).filter(item => dimensions === undefined || dimensions.includes(item.name as string));
  const entries = comparison.metrics as unknown as readonly Record<string, unknown>[];
  const measured: CompareMeasuredRow[] = [];
  const declined: CompareDeclinedRow[] = [];
  for (const verdict of verdicts) {
    const entry = entries.find(item => item.name === verdict.name && item.unit === verdict.unit);
    const name = display(verdict.name, NAME_CHARS);
    const unit = display(verdict.unit, NAME_CHARS);
    const evidenceRefs = refsOf(entry);
    const reference = summaryOf(entry?.reference);
    const candidate = summaryOf(entry?.candidate);
    if (verdict.verdict === "measured" && aligned && comparison.claim === "association" && entry !== undefined && finite(entry.delta) && reference && candidate) {
      const dispersion = finite(reference.standardDeviation) && finite(candidate.standardDeviation) ? "measured" : "unmeasured";
      measured.push({
        name, unit, kind: "measured", delta: entry.delta, reference, candidate,
        confidence: { referenceRuns: reference.count, candidateRuns: candidate.count, dispersion }, coverage: "complete", freshness: "current", evidenceRefs,
      });
      continue;
    }
    const reasons = (Array.isArray(verdict.reasons) ? verdict.reasons : []).map(reason => display(reason, REASON_CHARS));
    if (verdict.verdict === "measured") reasons.push(UNCARRIED_MEASURED);
    const shown = verdict.verdict === "measured" || verdict.verdict === "unknown" ? verdict.verdict : "unrecognized";
    declined.push({ name, unit, kind: "declined", verdict: shown, reasons: [...new Set(reasons)], evidenceRefs });
  }
  // Measured rows first, so a tight cap drops declined rows before any measured number.
  return [...measured, ...declined];
}

function assemble(comparison: WorkflowComparison, dimensions: readonly string[] | undefined): Parts {
  const basisInput = comparison.cohort.basis as unknown as readonly Record<string, unknown>[];
  const basis = basisInput.map(basisRow);
  const confounds = (comparison.cohort.confounds as unknown as readonly Record<string, unknown>[]).map(confoundRow);
  const aligned = comparison.cohort.matched === true && confounds.length === 0 && basis.every(row => row.alignment === "aligned" || row.alignment === "declared-change");
  const names = new Set((comparison.perMetric as unknown as readonly Record<string, unknown>[]).map(item => item.name));
  return {
    coreStatus: typeof comparison.status === "string" && CORE_STATUSES.includes(comparison.status) ? comparison.status : "unrecognized",
    alignment: {
      aligned,
      reference: comparison.sourceDigests.reference.map(digest => display(digest, REF_CHARS)),
      candidate: comparison.sourceDigests.candidate.map(digest => display(digest, REF_CHARS)),
      basis,
      confounds,
    },
    pins: COMPARE_PROTOCOL_PINS.map(pin => pinRow(pin, basisInput, basis)),
    metrics: metricRows(comparison, aligned, dimensions),
    ...(dimensions !== undefined ? { unmatchedDimensions: [...new Set(dimensions.filter(name => !names.has(name)).map(name => sanitize(name, NAME_CHARS)))] } : {}),
    diagnostics: (comparison.diagnostics as unknown as readonly Record<string, unknown>[]).map(item => ({
      code: display(item.code, FIELD_CHARS),
      severity: typeof item.severity === "string" && SEVERITIES.includes(item.severity) ? (item.severity as "error" | "warning") : "unrecognized",
      ...(item.dimension !== undefined ? { dimension: display(item.dimension, FIELD_CHARS) } : {}),
      message: display(item.message, REASON_CHARS),
    })),
    limitations: comparison.limitations.map(item => display(item, REASON_CHARS)),
  };
}

function declineCode(parts: Parts): CompareDeclineCode {
  const { basis, confounds } = parts.alignment;
  if (confounds.some(item => item.kind === "refused")) return "schema-refused";
  if (basis.some(row => row.alignment === "misaligned") || confounds.some(item => item.kind === "mismatched")) return "misaligned";
  return "insufficient-coverage";
}

interface Keep {
  refs: number;
  diagnostics: number;
  limitations: number;
  metrics: number;
  digests: number;
}

function render(parts: Parts, keep: Keep, maxBytes: number): CompareCompletedReply {
  const measured = parts.metrics.some(row => row.kind === "measured");
  const rows = parts.metrics.slice(0, keep.metrics).map(row => ({ ...row, evidenceRefs: row.evidenceRefs.slice(0, keep.refs) }));
  const offeredRefs = parts.metrics.reduce((total, row) => total + row.evidenceRefs.length, 0);
  const returnedRefs = rows.reduce((total, row) => total + row.evidenceRefs.length, 0);
  const offeredDigests = parts.alignment.reference.length + parts.alignment.candidate.length;
  const reference = parts.alignment.reference.slice(0, keep.digests);
  const candidate = parts.alignment.candidate.slice(0, keep.digests);
  const returnedDigests = reference.length + candidate.length;
  const truncated = rows.length < parts.metrics.length || returnedRefs < offeredRefs || keep.diagnostics < parts.diagnostics.length
    || keep.limitations < parts.limitations.length || returnedDigests < offeredDigests;
  return {
    contract: TOOL_REPLY_CONTRACT_VERSION,
    tool: "workflow_compare",
    ok: true,
    invoked: false,
    status: measured ? "measured" : "declined",
    coreStatus: parts.coreStatus,
    alignment: { aligned: parts.alignment.aligned, sourceDigests: { reference, candidate }, basis: parts.alignment.basis, confounds: parts.alignment.confounds },
    pins: parts.pins,
    metrics: rows,
    ...(parts.unmatchedDimensions !== undefined ? { unmatchedDimensions: parts.unmatchedDimensions } : {}),
    ...(measured ? {} : { declined: { code: declineCode(parts) } }),
    diagnostics: parts.diagnostics.slice(0, keep.diagnostics),
    limits: { claim: measured ? "association" : "none", causalClaim: false, criticalPath: "unestablished", limitations: parts.limitations.slice(0, keep.limitations) },
    counts: {
      metrics: { offered: parts.metrics.length, returned: rows.length },
      evidenceRefs: { offered: offeredRefs, returned: returnedRefs },
      diagnostics: { offered: parts.diagnostics.length, returned: Math.min(keep.diagnostics, parts.diagnostics.length) },
      limitations: { offered: parts.limitations.length, returned: Math.min(keep.limitations, parts.limitations.length) },
      sourceDigests: { offered: offeredDigests, returned: returnedDigests },
    },
    ...(truncated ? { truncation: { truncated: true as const, reason: "byte-cap" as const, marker: COMPARE_REPLY_TRUNCATION_MARKER, maxBytes } } : {}),
  };
}
function size(text: string): number {
  return Buffer.byteLength(text);
}

/** Keeps the longest prefix of each droppable list that fits, in the drop order the module header states. */
function fitToCap(parts: Parts, maxBytes: number): { reply: CompareCompletedReply; text: string } {
  const keep: Keep = {
    refs: parts.metrics.reduce((most, row) => Math.max(most, row.evidenceRefs.length), 0),
    diagnostics: parts.diagnostics.length,
    limitations: parts.limitations.length,
    metrics: parts.metrics.length,
    digests: Math.max(parts.alignment.reference.length, parts.alignment.candidate.length),
  };
  const attempt = (): { reply: CompareCompletedReply; text: string } => {
    const reply = render(parts, keep, maxBytes);
    return { reply, text: sanitizeWorkbenchJsonText(reply) };
  };
  let current = attempt();
  for (const field of ["refs", "diagnostics", "limitations", "metrics", "digests"] as const) {
    if (size(current.text) <= maxBytes) return current;
    let low = 0;
    let high = keep[field] - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      keep[field] = middle;
      if (size(attempt().text) <= maxBytes) low = middle;
      else high = middle - 1;
    }
    keep[field] = Math.max(0, low);
    current = attempt();
  }
  if (size(current.text) > maxBytes) throw new CapabilityError("validation", "The byte cap cannot hold the minimal comparison reply.");
  return current;
}

/**
 * Synchronous and side-effect free: a pure function of the supplied comparison result, grant snapshot, metric selection
 * and cap. Rules apply in order and the first refusal wins; a refusal never echoes caller text and renders no comparison.
 */
export function buildWorkflowCompareReply(input: BuildWorkflowCompareReplyInput): BuiltWorkflowCompareReply {
  const maxBytes = checkedCap(input.maxBytes);
  const refusal = refusalFor(input);
  if (refusal) {
    const text = sanitizeWorkbenchJsonText(refusal);
    return Object.freeze({ text, reply: refusal, bytes: size(text), truncated: false });
  }
  const { reply, text } = fitToCap(assemble(input.comparison, input.dimensions), maxBytes);
  return Object.freeze({ text, reply, bytes: size(text), truncated: reply.truncation !== undefined });
}
