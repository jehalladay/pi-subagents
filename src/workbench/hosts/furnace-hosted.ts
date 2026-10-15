/**
 * Optional Furnace-hosted execution adapter (wb-zmd, W18-C).
 *
 * A Pi process registers ONE deterministic workflow callback as a Furnace
 * ExecutorApp executor, opens an EmbeddedHost for ONE Run, writes the Run's
 * extension-driver config, and starts the Run with the public Furnace client.
 * Furnace reaches the host through its bridge: every Attempt is its own bridge
 * connection and therefore its own host session with its own instance id and
 * admission receipt. This module adds no scheduler, no retry and no checkpoint.
 *
 * Verified protocol only (@furnace/sdk 0.1.0, furnace.executor.v1):
 *  - Only the result `status` word is mapped; failure_class and data are never read.
 *  - failure and indeterminate PARK the Run for the manual operator ladder.
 *    Furnace never retries an Attempt on its own, and neither does this adapter.
 *  - Cancel is a request: the callback's AbortSignal is aborted and the workflow
 *    must stop cooperatively. A workflow that ignores it is reported
 *    indeterminate after a bounded grace, never cancelled.
 *  - Observe is unsupported by the resident session and is stated, not faked.
 *
 * Disclosed limits (also carried on every receipt as `limits`):
 *  - No crash durability. Death of this process or of the controller leaves the
 *    Run's running Attempts needing operator recovery; nothing here resumes them.
 *  - No host-side reply bound. A workflow that never settles keeps its Attempt
 *    running until a Cancel arrives or close() is called; `runs.start` can hang
 *    behind it. Bound the call with `startTimeoutMs`, which turns a timeout into
 *    an uncertain start that is never blindly repeated.
 *  - Transport success is never domain verification: a terminal `success` only
 *    says the workflow callback returned success.
 *
 * The SDK exposes EmbeddedHost and ResidentSession only through deep imports
 * (no index re-export, no exports map). Nothing imports this module from the
 * extension entry point, so the SDK is not loaded at startup.
 */
import { AsyncLocalStorage } from "node:async_hooks";
import type { CallbackContext, ExecutionContext, FurnaceOptions, RunDto, RunStartRequest } from "@furnace/sdk";
import { decodeContextValue, ExecutionResult, ExecutorApp, Furnace } from "@furnace/sdk";
import { EmbeddedHost } from "@furnace/sdk/dist/src/embedded.js";
import { ResidentSession } from "@furnace/sdk/dist/src/resident_session.js";
import { CapabilityError } from "../capability-registry.js";
import { sanitizeWorkbenchText } from "../redaction.js";

export const FURNACE_HOSTED_CONTRACT = "workbench.furnace-hosted/v1";
export const HOSTED_TEXT_LIMIT = 400;
export const DEFAULT_CANCEL_GRACE_MS = 5000;
export const DEFAULT_CLOSE_TIMEOUT_MS = 5000;

/** The SDK classes this adapter needs, taken from ONE loaded copy so instanceof checks agree. */
export interface FurnaceSdk {
  readonly ExecutorApp: typeof ExecutorApp;
  readonly ExecutionResult: typeof ExecutionResult;
  readonly EmbeddedHost: typeof EmbeddedHost;
  readonly ResidentSession: typeof ResidentSession;
  readonly Furnace: typeof Furnace;
  readonly decodeContextValue: typeof decodeContextValue;
}
export const SHIPPED_FURNACE_SDK: FurnaceSdk = { ExecutorApp, ExecutionResult, EmbeddedHost, ResidentSession, Furnace, decodeContextValue };

export type HostedStatus = "success" | "failure" | "indeterminate" | "cancelled";
const HOSTED_STATUSES: readonly string[] = ["success", "failure", "indeterminate", "cancelled"];
export interface HostedOutcome {
  readonly status: HostedStatus;
  readonly summary?: string;
}
/** Identifiers only; Work text is untrusted Beads content and is not handed to the workflow. */
export interface HostedAttemptIdentity {
  readonly runId: string;
  readonly beadsRunId: string;
  readonly workId: string;
  readonly attemptId: string;
  readonly ordinal: number;
  readonly deadline: string | null;
  readonly workspaceRoot: string;
  /** The bridge host session that admitted this Attempt (ResidentSession.instanceId). */
  readonly sessionInstanceId: string;
}
export interface HostedAttemptInvocation {
  readonly identity: HostedAttemptIdentity;
  /** Aborted by a Furnace Cancel (reason as sent) or by close() with reason host_closed. */
  readonly signal: AbortSignal;
}
export type HostedWorkflow = (invocation: HostedAttemptInvocation) => HostedOutcome | Promise<HostedOutcome>;

export interface HostedAttemptReceipt {
  readonly invocation: number;
  readonly attemptId: string;
  readonly ordinal: number;
  readonly workId: string;
  readonly runId: string;
  readonly beadsRunId: string;
  readonly sessionInstanceId: string;
  terminal: HostedStatus | "pending";
  summary?: string;
  cancel: { requested: boolean; reason?: string };
  /** True when the abort fired and the workflow did not settle within the grace. */
  unsettledAfterCancel: boolean;
  /** What a workflow that outlived its reported terminal finally returned. */
  lateSettlement?: HostedStatus;
}
export type HostedState = "idle" | "starting" | "started" | "start-uncertain" | "failed" | "closed";
export interface HostedReceipt {
  readonly contract: typeof FURNACE_HOSTED_CONTRACT;
  readonly executor: string;
  readonly state: HostedState;
  readonly run?: { readonly runId: string; readonly beadsRunId: string; readonly requestId: string };
  readonly limits: {
    readonly crashDurability: "none";
    readonly observe: "unsupported";
    readonly identity: "per-attempt";
    readonly replyBounds: "none";
    readonly retry: "furnace-parks-never-retries";
  };
  readonly attempts: readonly HostedAttemptReceipt[];
  readonly identityViolations: readonly string[];
}
const LIMITS: HostedReceipt["limits"] = { crashDurability: "none", observe: "unsupported", identity: "per-attempt", replyBounds: "none", retry: "furnace-parks-never-retries" };

/** The slice of the SDK client this adapter calls; injectable so tests never spawn Furnace. */
export interface FurnaceHostedClient {
  readonly runs: { start(request: RunStartRequest, call?: { timeoutMs?: number | undefined; requestId?: string | undefined }): Promise<{ readonly record: Pick<RunDto, "run_id" | "beads_run_id">; readonly requestId: string }> };
}
export type FurnaceHostedClientOptions = Omit<FurnaceOptions, "config">;
export interface FurnaceHostedOptions {
  /** The registered executor name: becomes [execution].executor and [executors.<name>]. */
  readonly executor: string;
  readonly workflow: HostedWorkflow;
  readonly furnace?: FurnaceHostedClientOptions;
  /** Bound on the `run start` call (ms). Absent means no bound: a hung workflow can hang the call. */
  readonly startTimeoutMs?: number;
  /** How long a cancelled workflow may take to settle before the Attempt is reported indeterminate. */
  readonly cancelGraceMs?: number;
  /** Bound on waiting for open bridge connections to end during close() (ms). */
  readonly closeTimeoutMs?: number;
  /** The client's own config file text is inherited first; it must not define the executor. */
  readonly inheritConfig?: string;
  readonly sdk?: FurnaceSdk;
  readonly createClient?: (options: FurnaceOptions) => FurnaceHostedClient;
}
export interface HostedStartRequest {
  readonly formula: string;
  readonly vars?: Readonly<Record<string, string>>;
  readonly requestId?: string;
}
export interface HostedStart {
  readonly runId: string;
  readonly beadsRunId: string;
  readonly requestId: string;
}

const EXECUTOR_NAME = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const ZERO_WIDTH = /[​-‏⁠﻿]/g;
/** Strip, then redact-and-strip: untrusted text bound for a receipt or a wire result. */
function safeText(value: unknown): string {
  const text = typeof value === "string" ? value : String(value);
  return sanitizeWorkbenchText(sanitizeWorkbenchText(text.replace(ZERO_WIDTH, ""), HOSTED_TEXT_LIMIT), HOSTED_TEXT_LIMIT);
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
function hasCancellation(context: ExecutionContext): context is CallbackContext {
  return "cancellation" in context && isRecord(context) && context.cancellation instanceof AbortSignal;
}
const CANONICAL_CONTEXT = {
  context_version: 1,
  run: { furnace_run_id: "frn-run-preflight", beads_run_id: "bd-preflight", formula: null },
  work: { beads_work_id: "bd-work-preflight", title: null, description: null, acceptance_criteria: null },
  attempt: { attempt_id: "frn-atm-preflight", ordinal: 1, deadline: null },
  workspace: { root: "/" },
};

type Settlement = { kind: "outcome"; value: unknown } | { kind: "error"; error: unknown };
interface SessionFrame {
  readonly sessionInstanceId: string;
}

export class FurnaceHostedExecutor {
  private readonly sdk: FurnaceSdk;
  private readonly app: ExecutorApp;
  private readonly frames = new AsyncLocalStorage<SessionFrame>();
  private readonly closing = new AbortController();
  private readonly attempts: HostedAttemptReceipt[] = [];
  private readonly violations: string[] = [];
  private readonly perSession = new Map<string, string[]>();
  private host: EmbeddedHost | undefined;
  private run: HostedReceipt["run"];
  private state: HostedState = "idle";

  constructor(private readonly options: FurnaceHostedOptions) {
    if (!EXECUTOR_NAME.test(options.executor)) throw new CapabilityError("validation", "Furnace-hosted executor name must be a bare identifier (letters, digits, '_' and '-').");
    if (typeof options.workflow !== "function") throw new CapabilityError("validation", "Furnace-hosted adapter requires a workflow callback.");
    this.sdk = options.sdk ?? SHIPPED_FURNACE_SDK;
    this.app = new this.sdk.ExecutorApp();
    this.app.executor(options.executor, (context) => this.execute(context));
  }

  /** A deep copy: callers cannot mutate adapter state through it. */
  receipt(): HostedReceipt {
    return structuredClone({
      contract: FURNACE_HOSTED_CONTRACT,
      executor: this.options.executor,
      state: this.state,
      ...(this.run ? { run: this.run } : {}),
      limits: LIMITS,
      attempts: this.attempts,
      identityViolations: this.violations,
    });
  }

  async start(request: HostedStartRequest): Promise<HostedStart> {
    if (this.state === "start-uncertain") throw new CapabilityError("uncertain-effect", "A previous Furnace run start was uncertain; reconcile with Furnace (run list/status) before any further start. This adapter never starts a second Run blindly.");
    if (this.state !== "idle") throw new CapabilityError("validation", `Furnace-hosted adapter hosts exactly one Run and is ${this.state}.`);
    if (typeof request?.formula !== "string" || request.formula.trim() === "") throw new CapabilityError("validation", "Furnace-hosted start requires a formula name.");
    for (const [key, value] of Object.entries(request.vars ?? {})) if (typeof value !== "string") throw new CapabilityError("validation", `Furnace-hosted start variable ${safeText(key)} must be a string.`);
    this.preflightContractDecoding();
    this.state = "starting";
    const host = this.openHost();
    this.host = host;
    try {
      await host.open();
      const config = host.writeConfig(this.options.executor, this.options.inheritConfig);
      const clientOptions: FurnaceOptions = { ...this.options.furnace, config };
      const client = this.options.createClient ? this.options.createClient(clientOptions) : (new this.sdk.Furnace(clientOptions) as FurnaceHostedClient);
      const startRequest: RunStartRequest = { formula: request.formula, ...(request.vars ? { vars: { ...request.vars } } : {}) };
      const call = { ...(this.options.startTimeoutMs !== undefined ? { timeoutMs: this.options.startTimeoutMs } : {}), ...(request.requestId !== undefined ? { requestId: request.requestId } : {}) };
      const started = await client.runs.start(startRequest, call);
      this.run = { runId: started.record.run_id, beadsRunId: started.record.beads_run_id, requestId: started.requestId };
      this.state = "started";
      return { ...this.run };
    } catch (error) {
      const uncertain = !isRecord(error) || error.kind !== "command_error";
      this.state = uncertain ? "start-uncertain" : "failed";
      await this.releaseHost();
      throw this.startFailure(error, uncertain);
    }
  }

  /** Aborts every running workflow with reason host_closed, then removes the socket and config. Idempotent. */
  async close(): Promise<void> {
    if (this.state === "closed") return;
    this.state = "closed";
    this.closing.abort("host_closed");
    await this.settleOpenAttempts();
    await this.releaseHost();
  }

  private preflightContractDecoding(): void {
    try {
      this.sdk.decodeContextValue(CANONICAL_CONTEXT);
    } catch (error) {
      const name = isRecord(error) && typeof error.name === "string" ? error.name : "Error";
      throw new CapabilityError("unavailable", `The Furnace SDK cannot decode execution contexts (${safeText(name)}: ${safeText(isRecord(error) ? error.message : error)}); no Attempt could run through the bridge, so no host or Run was started.`);
    }
  }

  private startFailure(error: unknown, uncertain: boolean): CapabilityError {
    const code = isRecord(error) && typeof error.code === "string" ? safeText(error.code) : isRecord(error) && typeof error.kind === "string" ? safeText(error.kind) : "unknown";
    if (uncertain) return new CapabilityError("uncertain-effect", `Furnace run start did not return a readable answer (${code}); a Run may or may not exist. Reconcile with Furnace before retrying; the host was closed.`);
    return new CapabilityError("unavailable", `Furnace refused the run start (${code}); no Run was started.`);
  }

  private openHost(): EmbeddedHost {
    const frames = this.frames;
    const onOpen = (instanceId: string): void => void this.perSession.set(instanceId, []);
    const Recording = class extends this.sdk.ResidentSession {
      constructor(app: ExecutorApp, served: readonly string[], write?: (line: string) => void) {
        super(app, served, write);
        onOpen(this.instanceId);
      }
      override handle(raw: string): Promise<void> {
        return frames.run({ sessionInstanceId: this.instanceId }, () => super.handle(raw));
      }
    };
    return new (class extends this.sdk.EmbeddedHost {
      override readonly sessionClass: typeof ResidentSession = Recording;
    })(this.app, [this.options.executor]);
  }

  /**
   * EmbeddedHost.close() waits for every open bridge connection to end. A bridge that never
   * ends would hang close() forever, so the wait is bounded and an unconfirmed release is a
   * recorded violation: the socket directory stays until the bridge process exits.
   */
  private async releaseHost(): Promise<void> {
    const host = this.host;
    this.host = undefined;
    if (!host) return;
    const bound = this.options.closeTimeoutMs ?? DEFAULT_CLOSE_TIMEOUT_MS;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const confirmed = await Promise.race([
      host.close().then(() => true),
      new Promise<boolean>((resolve) => {
        timer = setTimeout(() => resolve(false), bound);
      }),
    ]);
    if (timer) clearTimeout(timer);
    if (!confirmed) this.violations.push(`host close not confirmed within ${bound} ms: a bridge connection is still open and the socket directory remains`);
  }

  private async settleOpenAttempts(): Promise<void> {
    const grace = (this.options.cancelGraceMs ?? DEFAULT_CANCEL_GRACE_MS) + 50;
    const deadline = Date.now() + grace;
    while (this.attempts.some((a) => a.terminal === "pending") && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 5));
  }

  private record(context: ExecutionContext): HostedAttemptReceipt {
    const sessionInstanceId = this.frames.getStore()?.sessionInstanceId ?? "unknown";
    const attemptId = context.attempt.attempt_id;
    const served = this.perSession.get(sessionInstanceId) ?? [];
    served.push(attemptId);
    this.perSession.set(sessionInstanceId, served);
    if (sessionInstanceId === "unknown") this.violations.push(`attempt ${attemptId} ran outside a bridge session frame`);
    if (served.length > 1) this.violations.push(`session ${sessionInstanceId} served ${served.length} attempts`);
    const prior = this.attempts.filter((a) => a.attemptId === attemptId).length;
    if (prior > 0) this.violations.push(`attempt ${attemptId} executed ${prior + 1} times`);
    const receipt: HostedAttemptReceipt = {
      invocation: this.attempts.length + 1,
      attemptId,
      ordinal: context.attempt.ordinal,
      workId: context.work.beads_work_id,
      runId: context.run.furnace_run_id,
      beadsRunId: context.run.beads_run_id,
      sessionInstanceId,
      terminal: "pending",
      cancel: { requested: false },
      unsettledAfterCancel: false,
    };
    this.attempts.push(receipt);
    return receipt;
  }

  private async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const receipt = this.record(context);
    const furnaceSignal = hasCancellation(context) ? context.cancellation : new AbortController().signal;
    const signal = AbortSignal.any([furnaceSignal, this.closing.signal]);
    const noteCancel = (): void => {
      receipt.cancel = { requested: true, reason: safeText(typeof signal.reason === "string" ? signal.reason : "cancel requested") };
    };
    if (signal.aborted) noteCancel();
    else signal.addEventListener("abort", noteCancel, { once: true });
    const identity: HostedAttemptIdentity = {
      runId: receipt.runId,
      beadsRunId: receipt.beadsRunId,
      workId: receipt.workId,
      attemptId: receipt.attemptId,
      ordinal: receipt.ordinal,
      deadline: context.attempt.deadline,
      workspaceRoot: context.workspace.root,
      sessionInstanceId: receipt.sessionInstanceId,
    };
    const run: Promise<Settlement> = Promise.resolve()
      .then(() => this.options.workflow({ identity, signal }))
      .then(
        (value): Settlement => ({ kind: "outcome", value }),
        (error: unknown): Settlement => ({ kind: "error", error }),
      );
    let timer: ReturnType<typeof setTimeout> | undefined;
    const grace = new Promise<"grace">((resolve) => {
      const arm = (): void => {
        timer = setTimeout(() => resolve("grace"), this.options.cancelGraceMs ?? DEFAULT_CANCEL_GRACE_MS);
      };
      if (signal.aborted) arm();
      else signal.addEventListener("abort", arm, { once: true });
    });
    const first = await Promise.race([run, grace]);
    if (timer) clearTimeout(timer);
    if (first === "grace") {
      receipt.unsettledAfterCancel = true;
      receipt.terminal = "indeterminate";
      receipt.summary = "workflow did not stop within the cancel grace; its effects are unverified";
      void run.then((late) => {
        receipt.lateSettlement = this.interpret(late, signal).status;
      });
      return this.sdk.ExecutionResult.indeterminate(receipt.summary);
    }
    const mapped = this.interpret(first, signal);
    receipt.terminal = mapped.status;
    if (mapped.summary !== undefined) receipt.summary = mapped.summary;
    return this.toResult(mapped);
  }

  /** Workflow settlement to the four-word status. Anything not established is indeterminate. */
  private interpret(settlement: Settlement, signal: AbortSignal): { status: HostedStatus; summary?: string } {
    if (settlement.kind === "error") {
      const error = settlement.error;
      const message = safeText(isRecord(error) && typeof error.message === "string" ? error.message : "workflow threw");
      if (isRecord(error) && error.category === "uncertain-effect") return { status: "indeterminate", summary: message };
      if (signal.aborted) return { status: "cancelled", summary: message };
      return { status: "failure", summary: message };
    }
    const value = settlement.value;
    const status = isRecord(value) ? value.status : undefined;
    if (typeof status !== "string" || !HOSTED_STATUSES.includes(status)) return { status: "indeterminate", summary: "workflow returned an unrecognized outcome" };
    const summary = isRecord(value) && typeof value.summary === "string" ? safeText(value.summary) : undefined;
    if (status === "cancelled" && !signal.aborted) return { status: "indeterminate", summary: "workflow reported cancelled without a cancel request" };
    return { status: status as HostedStatus, ...(summary !== undefined ? { summary } : {}) };
  }

  private toResult(mapped: { status: HostedStatus; summary?: string }): ExecutionResult {
    const result = this.sdk.ExecutionResult;
    switch (mapped.status) {
      case "success":
        return result.success(mapped.summary !== undefined ? { summary: mapped.summary } : {});
      case "failure":
        return result.failure(mapped.summary ?? "workflow failed", { failure_class: "task" });
      case "cancelled":
        return result.cancelled(mapped.summary ?? "workflow cancelled");
      case "indeterminate":
        return result.indeterminate(mapped.summary ?? "workflow outcome not established");
    }
  }
}
