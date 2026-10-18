/**
 * forge-control-retention.ts — the retained-connection registry the workflow_control forge leg executes over (wb-cra.1).
 *
 * Forge operation ids are per session (forge-control.ts ForgeControlDeps: "the connection that started the operation"),
 * so a cancel can only travel on the issuing connection. The Pi host retains that connection HERE, keyed by operation id,
 * for operations a Pi surface starts or observes over a connection it owns: the launching surface calls
 * retainForgeOperation and disposes on the operation's terminal; the registered workflow_control tool's forge executor
 * looks the target up and hands executeForgeControl the retained seams. An operation nobody retained stays the typed
 * unavailable no-retained-connection refusal — the truthful answer, never a guess (wb-cra.1 scoping note at 069ba7c).
 *
 * Bounds: an entry expires after RETENTION_TTL_MS (the lifetime bound) and the registry holds at most
 * MAX_RETAINED_FORGE_CONNECTIONS entries; registration past the cap is refused loudly rather than evicting a live
 * connection behind its owner's back. Release on terminal is the owner's disposer, which drops only the entry it made.
 */
import { CapabilityError } from "./capability-registry.js";
import type { ControlExecutionSummary, ControlExecutor } from "./control-tool.js";
import { executeForgeControl, type ForgeCancelOperations, type ForgeCapabilitySource } from "./forge-control.js";

export interface RetainedForgeConnection {
  /** The vendored operation client over the connection that started the operation. */
  readonly operations: ForgeCancelOperations;
  /** The same connection's negotiated capability statement. */
  readonly connection: ForgeCapabilitySource;
  /** The workspace the connection serves. */
  readonly workspaceRoot: string;
}

/** Lifetime bound on a retention: a connection nobody released within the bound stops being offered. */
export const RETENTION_TTL_MS = 15 * 60_000;
/** The registry never holds more than this many live retentions. */
export const MAX_RETAINED_FORGE_CONNECTIONS = 64;

interface RetentionEntry {
  readonly retained: RetainedForgeConnection;
  readonly expiresAt: number;
}
const retentions = new Map<string, RetentionEntry>();

function sweep(at: number): void {
  for (const [id, entry] of retentions) {
    if (entry.expiresAt <= at) retentions.delete(id);
  }
}

/**
 * Retains the issuing connection for one operation id and returns its release. Re-retaining an id replaces the entry
 * (the newest issuer wins), and a release disposes only the entry it created, so a stale disposer never drops a
 * successor. Registration past the cap throws rather than evicting a live retention.
 */
export function retainForgeOperation(
  operationId: string,
  connection: RetainedForgeConnection,
  options: { readonly ttlMs?: number; readonly at?: number } = {},
): () => void {
  const at = options.at ?? Date.now();
  sweep(at);
  if (!retentions.has(operationId) && retentions.size >= MAX_RETAINED_FORGE_CONNECTIONS) {
    throw new CapabilityError(
      "validation",
      `The Forge retention registry is full (${MAX_RETAINED_FORGE_CONNECTIONS} live entries); release a terminal operation before retaining another.`,
    );
  }
  const entry: RetentionEntry = { retained: connection, expiresAt: at + (options.ttlMs ?? RETENTION_TTL_MS) };
  retentions.set(operationId, entry);
  return () => {
    if (retentions.get(operationId) === entry) retentions.delete(operationId);
  };
}

/** The live retention for an operation id, or undefined once released or expired. */
export function lookupForgeOperation(operationId: string, at = Date.now()): RetainedForgeConnection | undefined {
  sweep(at);
  return retentions.get(operationId)?.retained;
}

/** Releases an id regardless of which retention holds it (operator-side cleanup); true when something was dropped. */
export function releaseForgeOperation(operationId: string): boolean {
  return retentions.delete(operationId);
}

/**
 * The workflow_control forge executor: cancel travels only over the retained issuing connection. An unretained target
 * stays the typed unavailable refusal; a retained one reaches executeForgeControl, whose own refusal and uncertainty
 * vocabulary passes through unchanged (the control tool keeps a CapabilityError's category and own code).
 */
export function createRetainedForgeControlExecutor(now: () => string): ControlExecutor {
  return async (decision, request, signal): Promise<ControlExecutionSummary> => {
    const live = lookupForgeOperation(request.target.id);
    if (live === undefined) {
      throw Object.assign(
        new CapabilityError(
          "unavailable",
          "Forge cancel needs the connection that issued the operation; this process retains none for the target operation, so the Forge control leg is unavailable for it.",
        ),
        { code: "no-retained-connection" },
      );
    }
    const execution = await executeForgeControl(decision, {
      operations: live.operations,
      connection: live.connection,
      workspaceRoot: live.workspaceRoot,
      now,
      timeoutMs: 10_000,
      ...(signal !== undefined ? { signal } : {}),
    });
    return { receipt: execution.receipt, status: execution.status };
  };
}
