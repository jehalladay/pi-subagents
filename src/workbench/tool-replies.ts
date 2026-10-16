/**
 * Pure reply builders for the read-only Pi tools workflow_catalog and workflow_inspect
 * (docs/workbench/11 § "First public Pi tools", docs/workbench/06 § "Current experimental policy surface").
 *
 * Both builders are deterministic functions of a caller-supplied registry snapshot and grant set. They perform no
 * invocation, no provider inspection and no RPC: discovery never implies invoke. Access is exact-string and
 * deny-by-default (`discover:<id>` for the catalog, `inspect:<id>` plus an advertised, implemented inspect mode for
 * inspect). Every string in a reply routes through the shared sanitizers in redaction.ts and every reply is bounded
 * by a byte cap that is reported, never silent. Pi tool registration lives with the host wiring, not here.
 */
import { type CapabilityDescriptor, type CapabilityProvider, type JsonValue, validatedCapabilityJson } from "./capability-registry.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchText } from "./redaction.js";

export const TOOL_REPLY_CONTRACT_VERSION = "workbench.tool-reply/v1";
export const TOOL_REPLY_DEFAULT_MAX_BYTES = 16 * 1024;
export const TOOL_REPLY_MIN_MAX_BYTES = 1024;
export const TOOL_REPLY_DEFAULT_LIMIT = 20;
export const TOOL_REPLY_MAX_LIMIT = 100;
const TEXT_LIMIT = 200;
const FILTER_LIMIT = 64;

/** One registry entry as the builders see it. `inspectImplemented` records that the provider has an inspect function. */
export interface CapabilityCatalogEntry {
  readonly descriptor: CapabilityDescriptor;
  readonly inspectImplemented: boolean;
}

/** Host-set bounds. The model never supplies these. */
export interface ToolReplyBounds { readonly maxBytes?: number }

export interface WorkflowCatalogQuery {
  readonly filter?: string;
  readonly limit?: number;
  readonly cursor?: string;
}

export type CatalogErrorCode = "invalid-filter" | "invalid-limit" | "invalid-cursor";
export type InspectErrorCode = "invalid-target" | "unknown-view" | "unavailable" | "unknown-target" | "invalid-descriptor";
export type InspectUnavailableReason = "not-granted" | "inspect-not-advertised" | "inspect-not-implemented";
export type InspectView = "definition" | "schema" | "operations";
export const INSPECT_VIEWS: readonly InspectView[] = Object.freeze(["definition", "schema", "operations"]);

export interface ToolReplyError<Tool extends string, Code extends string> {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: Tool;
  readonly ok: false;
  readonly invoked: false;
  readonly error: { readonly code: Code; readonly reason?: string; readonly message: string };
}

export interface CatalogRow {
  readonly id: string;
  readonly version: string;
  readonly description: string;
  readonly effectClass: string;
  readonly modes: readonly string[];
  readonly contractSource?: string;
}

export interface ByteCapMarker { readonly reason: "byte-cap"; readonly maxBytes: number }

export interface WorkflowCatalogReply {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: "workflow_catalog";
  readonly ok: true;
  readonly invoked: false;
  readonly filter?: string;
  readonly limit: number;
  /** Discoverable rows matching the filter, before the cursor. */
  readonly matched: number;
  /** Discoverable rows matching the filter at or after the cursor, before the page and byte cap. */
  readonly offered: number;
  readonly returned: number;
  readonly rows: readonly CatalogRow[];
  readonly nextCursor?: string;
  readonly truncated?: ByteCapMarker;
}

export interface WorkflowInspectReply {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: "workflow_inspect";
  readonly ok: true;
  readonly invoked: false;
  readonly target: string;
  readonly view: InspectView;
  readonly data: JsonValue;
  readonly truncated?: ByteCapMarker;
}

export type WorkflowCatalogResult = WorkflowCatalogReply | ToolReplyError<"workflow_catalog", CatalogErrorCode>;
export type WorkflowInspectResult = WorkflowInspectReply | ToolReplyError<"workflow_inspect", InspectErrorCode>;

/** Snapshot a provider set. Pure: only reads descriptors and whether `inspect` exists; never calls a provider. */
export function capabilityCatalogEntries(providers: Iterable<CapabilityProvider>): CapabilityCatalogEntry[] {
  return [...providers].map(({ descriptor, inspect }) => ({
    descriptor: {
      ...descriptor,
      inputSchema: structuredClone(descriptor.inputSchema),
      ...(descriptor.outputSchema ? { outputSchema: structuredClone(descriptor.outputSchema) } : {}),
      permissions: [...descriptor.permissions],
      supportedModes: [...descriptor.supportedModes],
    },
    inspectImplemented: typeof inspect === "function",
  }));
}

function grantSet(grants: readonly string[] | undefined): ReadonlySet<string> {
  return new Set(Array.isArray(grants) ? grants.filter((grant): grant is string => typeof grant === "string") : []);
}

function effectiveMaxBytes(bounds: ToolReplyBounds | undefined): number {
  const requested = bounds?.maxBytes;
  if (typeof requested !== "number" || !Number.isFinite(requested)) return TOOL_REPLY_DEFAULT_MAX_BYTES;
  return Math.min(TOOL_REPLY_DEFAULT_MAX_BYTES, Math.max(TOOL_REPLY_MIN_MAX_BYTES, Math.floor(requested)));
}

function byteLength(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}

function catalogError(code: CatalogErrorCode, message: string): ToolReplyError<"workflow_catalog", CatalogErrorCode> {
  return { contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_catalog", ok: false, invoked: false, error: { code, message } };
}

function inspectError(code: InspectErrorCode, message: string, reason?: InspectUnavailableReason): ToolReplyError<"workflow_inspect", InspectErrorCode> {
  return { contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_inspect", ok: false, invoked: false, error: { code, ...(reason ? { reason } : {}), message } };
}

function encodeCursor(id: string): string {
  return Buffer.from(id, "utf8").toString("base64url");
}

/** Strict decode: anything that does not round-trip is malformed, so a typo is never treated as a position. */
function decodeCursor(cursor: string): string | undefined {
  const id = Buffer.from(cursor, "base64url").toString("utf8");
  return encodeCursor(id) === cursor ? id : undefined;
}

function sanitizedRow({ descriptor }: CapabilityCatalogEntry): CatalogRow {
  return {
    id: sanitizeWorkbenchText(descriptor.id, TEXT_LIMIT),
    version: sanitizeWorkbenchText(descriptor.version, TEXT_LIMIT),
    description: sanitizeWorkbenchText(descriptor.description, TEXT_LIMIT),
    effectClass: sanitizeWorkbenchText(descriptor.effectClass, TEXT_LIMIT),
    modes: descriptor.supportedModes.map(mode => sanitizeWorkbenchText(mode, TEXT_LIMIT)),
    ...(descriptor.contractSource ? { contractSource: sanitizeWorkbenchText(descriptor.contractSource, TEXT_LIMIT) } : {}),
  };
}

/**
 * workflow_catalog: discoverable capabilities only. A capability without exact `discover:<id>` is absent (not an
 * error row, not counted). Rows are sorted by id; the cursor is the last returned id, so pagination is stable under
 * inserts and removals and a cursor past the end is an empty page.
 */
export function buildWorkflowCatalogReply(
  snapshot: readonly CapabilityCatalogEntry[],
  grants: readonly string[] | undefined,
  query: WorkflowCatalogQuery = {},
  bounds?: ToolReplyBounds,
): WorkflowCatalogResult {
  const { filter, limit, cursor } = query;
  if (filter !== undefined && typeof filter !== "string") return catalogError("invalid-filter", "filter must be a string.");
  if (limit !== undefined && (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1)) return catalogError("invalid-limit", "limit must be a positive integer.");
  if (cursor !== undefined && typeof cursor !== "string") return catalogError("invalid-cursor", "cursor must be a string.");
  let after: string | undefined;
  if (cursor) {
    after = decodeCursor(cursor);
    if (after === undefined) return catalogError("invalid-cursor", "cursor is not a catalog cursor.");
  }
  const granted = grantSet(grants);
  const echoedFilter = filter ? sanitizeWorkbenchText(filter, FILTER_LIMIT) : undefined;
  const needle = echoedFilter?.toLowerCase() ?? "";
  const matchedEntries = snapshot
    .filter(({ descriptor }) => granted.has(`discover:${descriptor.id}`))
    .filter(({ descriptor }) => needle === "" || descriptor.id.toLowerCase().includes(needle) || descriptor.description.toLowerCase().includes(needle))
    .sort((a, b) => (a.descriptor.id < b.descriptor.id ? -1 : a.descriptor.id > b.descriptor.id ? 1 : 0));
  const remaining = after === undefined ? matchedEntries : matchedEntries.filter(({ descriptor }) => descriptor.id > after);
  const effectiveLimit = Math.min(limit ?? TOOL_REPLY_DEFAULT_LIMIT, TOOL_REPLY_MAX_LIMIT);
  const maxBytes = effectiveMaxBytes(bounds);
  const pageEntries = remaining.slice(0, effectiveLimit);
  const pageRows = pageEntries.map(sanitizedRow);

  const assemble = (rows: readonly CatalogRow[], more: boolean, truncated: boolean): WorkflowCatalogReply => {
    const last = rows.length > 0 ? pageEntries[rows.length - 1]?.descriptor.id : undefined;
    return {
      contract: TOOL_REPLY_CONTRACT_VERSION,
      tool: "workflow_catalog",
      ok: true,
      invoked: false,
      ...(echoedFilter ? { filter: echoedFilter } : {}),
      limit: effectiveLimit,
      matched: matchedEntries.length,
      offered: remaining.length,
      returned: rows.length,
      rows,
      ...(more && last !== undefined ? { nextCursor: encodeCursor(last) } : {}),
      ...(truncated ? { truncated: { reason: "byte-cap", maxBytes } } : {}),
    };
  };

  const fullPage = assemble(pageRows, remaining.length > pageRows.length, false);
  if (byteLength(fullPage) <= maxBytes) return fullPage;
  // Over the cap: keep the longest prefix whose worst-case envelope (marker and cursor present) still fits.
  let fit = 0;
  while (fit < pageRows.length && byteLength(assemble(pageRows.slice(0, fit + 1), true, true)) <= maxBytes) fit += 1;
  return assemble(pageRows.slice(0, fit), true, true);
}

function viewData(entry: CapabilityCatalogEntry, view: InspectView): JsonValue | undefined {
  const { descriptor } = entry;
  if (view === "definition") {
    return sanitizeWorkbenchJson({
      id: descriptor.id,
      version: descriptor.version,
      description: descriptor.description,
      effectClass: descriptor.effectClass,
      supportedModes: [...descriptor.supportedModes],
      ...(descriptor.contractSource ? { contractSource: descriptor.contractSource } : {}),
    }, TEXT_LIMIT);
  }
  if (view === "operations") {
    return sanitizeWorkbenchJson({
      id: descriptor.id,
      effectClass: descriptor.effectClass,
      supportedModes: [...descriptor.supportedModes],
      discoverGrant: `discover:${descriptor.id}`,
      inspectGrant: `inspect:${descriptor.id}`,
      invokeRequires: descriptor.permissions.length > 0 ? [...descriptor.permissions] : [`invoke:${descriptor.id}`],
    }, TEXT_LIMIT);
  }
  try {
    const inputSchema = validatedCapabilityJson(descriptor.inputSchema, `capability ${descriptor.id} inputSchema`);
    const outputSchema = descriptor.outputSchema ? validatedCapabilityJson(descriptor.outputSchema, `capability ${descriptor.id} outputSchema`) : undefined;
    return sanitizeWorkbenchJson({
      id: descriptor.id,
      version: descriptor.version,
      inputSchema,
      ...(outputSchema ? { outputSchema } : {}),
    }, TEXT_LIMIT);
  } catch {
    return undefined;
  }
}

/**
 * workflow_inspect: a bounded static projection of one capability descriptor. Requires exact `inspect:<id>` and an
 * advertised, implemented inspect mode, else a typed unavailable. A target without the inspect grant is reported
 * identically whether or not it exists, so the reply cannot be used to probe the registry. Never invokes anything.
 */
export function buildWorkflowInspectReply(
  snapshot: readonly CapabilityCatalogEntry[],
  grants: readonly string[] | undefined,
  target: string,
  view?: string,
  bounds?: ToolReplyBounds,
): WorkflowInspectResult {
  if (typeof target !== "string" || target === "") return inspectError("invalid-target", "target must be a non-empty capability id.");
  if (view !== undefined && !INSPECT_VIEWS.includes(view as InspectView)) return inspectError("unknown-view", `view must be one of ${INSPECT_VIEWS.join(", ")}.`);
  const selected: InspectView = (view as InspectView | undefined) ?? "definition";
  if (!grantSet(grants).has(`inspect:${target}`)) return inspectError("unavailable", "Inspection is not available for this target.", "not-granted");
  const entry = snapshot.find(({ descriptor }) => descriptor.id === target);
  if (!entry) return inspectError("unknown-target", "No such capability.");
  if (!entry.descriptor.supportedModes.includes("inspect")) return inspectError("unavailable", "The capability does not advertise an inspect mode.", "inspect-not-advertised");
  if (!entry.inspectImplemented) return inspectError("unavailable", "The capability advertises inspect but does not implement it.", "inspect-not-implemented");
  const data = viewData(entry, selected);
  if (data === undefined) return inspectError("invalid-descriptor", "The capability descriptor is not valid JSON.");
  const maxBytes = effectiveMaxBytes(bounds);
  const assemble = (payload: JsonValue, truncated: boolean): WorkflowInspectReply => ({
    contract: TOOL_REPLY_CONTRACT_VERSION,
    tool: "workflow_inspect",
    ok: true,
    invoked: false,
    target: sanitizeWorkbenchText(target, TEXT_LIMIT),
    view: selected,
    data: payload,
    ...(truncated ? { truncated: { reason: "byte-cap", maxBytes } } : {}),
  });
  const reply = assemble(data, false);
  if (byteLength(reply) <= maxBytes) return reply;
  const record = data as Record<string, JsonValue>;
  const bounded: Record<string, JsonValue> = {};
  for (const [key, value] of Object.entries(record)) {
    bounded[key] = value !== null && typeof value === "object" && byteLength(value) > maxBytes / 4 ? { truncated: true, bytes: byteLength(value) } : value;
  }
  const markerFor = (value: JsonValue): JsonValue => ({ truncated: true, bytes: byteLength(value) });
  let result = assemble(bounded, true);
  // The per-value share above cannot bound long strings, so re-measure and shrink the largest values first until the
  // reply fits; the byte-cap marker is always present. The cap holds for registry-admitted ids; the sanitized target echo is never shortened.
  const bySize = Object.entries(bounded).sort(([, left], [, right]) => byteLength(right) - byteLength(left));
  for (const [key, value] of bySize) {
    if (byteLength(result) <= maxBytes) break;
    bounded[key] = markerFor(value);
    result = assemble(bounded, true);
  }
  return result;
}
