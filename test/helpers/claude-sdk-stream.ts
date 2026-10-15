/**
 * A controllable stand-in for the Claude Agent SDK `query()` stream.
 *
 * It plugs into the one documented fixture seam, `ClaudeWorkflowHostOptions.query`
 * ("SDK query injection exists for the fixture integration suite, not a fallback
 * backend"), and nothing else: the SDK module is never mocked, no process is
 * spawned, nothing touches the network. Every message the host sees is a fixture
 * the test hands over, so each fault location is reached on purpose rather than
 * by timing.
 *
 * Each call keeps the AbortController the host handed it and watches that
 * controller's signal from inside the stream. That is what lets a test tell
 * "the host asked the SDK to stop" apart from "the host reported a stop".
 */
import {
  AbortError,
  type ModelUsage,
  type Options,
  type SDKMessage,
  type SDKResultSuccess,
  type SDKSystemMessage,
} from "@anthropic-ai/claude-agent-sdk";
import type { ClaudeQuery } from "../../src/workbench/claude-host.js";

/** What a stream does once the host aborts the AbortController it was handed. */
export type AbortPolicy =
  /** The pending read throws the SDK's AbortError, as the SDK's own abort path does. */
  | "reject"
  /** The stream closes without a result message. */
  | "end"
  /** The stream carries on; the test decides what, if anything, comes next. */
  | "ignore";

type Step = { readonly kind: "message"; readonly message: SDKMessage } | { readonly kind: "end" };

interface PendingRead {
  resolve(step: Step): void;
  reject(error: Error): void;
}

/** One `query()` invocation the host made. */
export class FakeSdkCall {
  /** Messages the host has pulled from this stream, in order. */
  readonly delivered: SDKMessage[] = [];
  /** How many times the controller's abort event reached this stream. */
  abortEvents = 0;
  /** Clock reading when the abort event first reached this stream. */
  abortEventAt: number | undefined;
  /** `signal.aborted` as the stream itself read it while closing; undefined while open. */
  abortedAtClose: boolean | undefined;
  closed = false;
  /** The AbortController the host handed this call in `options.abortController`. */
  readonly controller: AbortController;

  private readonly queue: Step[] = [];
  private pending: PendingRead | undefined;
  private failNext: Error | undefined;
  private parkedAt: number | undefined;
  private readonly parkWaiters: Array<{ count: number; resolve(): void }> = [];

  constructor(
    readonly index: number,
    readonly prompt: string,
    readonly options: Options,
    /** Consulted when the abort lands, so a test may change it after the call starts. */
    public policy: AbortPolicy,
    private readonly clock: (() => number) | undefined,
  ) {
    const controller = options.abortController;
    if (controller === undefined) throw new Error("query() was handed no options.abortController.");
    this.controller = controller;
    // Never removed: an abort that reaches a closed stream is evidence as well.
    controller.signal.addEventListener("abort", () => this.onAbort());
  }

  /** Hand the host its next messages. */
  push(...messages: SDKMessage[]): void {
    for (const message of messages) this.offer({ kind: "message", message });
  }

  /** Close the stream normally after anything already pushed. A no-op once closed. */
  end(): void {
    if (!this.closed) this.offer({ kind: "end" });
  }

  /**
   * Resolves once the host has handled exactly `count` messages and is waiting
   * for the next one, so everything it does with message `count` has happened.
   */
  parked(count: number): Promise<void> {
    if (this.pending !== undefined && this.parkedAt === count) return Promise.resolve();
    return new Promise<void>(resolve => {
      this.parkWaiters.push({ count, resolve });
    });
  }

  async *stream(): AsyncGenerator<SDKMessage, void, undefined> {
    try {
      for (;;) {
        const step = await this.read();
        if (step.kind === "end") return;
        this.delivered.push(step.message);
        yield step.message;
      }
    } finally {
      this.abortedAtClose = this.controller.signal.aborted;
      this.closed = true;
    }
  }

  private read(): Promise<Step> {
    const failure = this.failNext;
    if (failure !== undefined) {
      this.failNext = undefined;
      return Promise.reject(failure);
    }
    const next = this.queue.shift();
    if (next !== undefined) return Promise.resolve(next);
    return new Promise<Step>((resolve, reject) => {
      this.pending = { resolve, reject };
      const count = this.delivered.length;
      this.parkedAt = count;
      for (const waiter of this.parkWaiters.filter(entry => entry.count === count)) {
        this.parkWaiters.splice(this.parkWaiters.indexOf(waiter), 1);
        waiter.resolve();
      }
    });
  }

  private take(): PendingRead | undefined {
    const pending = this.pending;
    this.pending = undefined;
    this.parkedAt = undefined;
    return pending;
  }

  private offer(step: Step): void {
    const pending = this.take();
    if (pending !== undefined) pending.resolve(step);
    else this.queue.push(step);
  }

  private onAbort(): void {
    this.abortEvents++;
    this.abortEventAt ??= this.clock?.();
    if (this.closed || this.policy === "ignore") return;
    // An SDK that honours the abort hands over nothing it had not yet sent.
    this.queue.length = 0;
    if (this.policy === "end") {
      this.offer({ kind: "end" });
      return;
    }
    const error = new AbortError("Claude Code process aborted by user");
    const pending = this.take();
    if (pending !== undefined) pending.reject(error);
    else this.failNext = error;
  }
}

export interface FakeClaudeSdkOptions {
  /** Abort policy each new call starts with. Default "reject". */
  policy?: AbortPolicy;
  /** Runs synchronously inside `query()`, so a call can be loaded with its whole script up front. */
  script?: (call: FakeSdkCall) => void;
  /** Monotonic clock stamped into `abortEventAt`. */
  clock?: () => number;
}

/** Records every `query()` the host makes; `query` is what the host is handed. */
export class FakeClaudeSdk {
  readonly calls: FakeSdkCall[] = [];
  private readonly callWaiters: Array<{ index: number; resolve(call: FakeSdkCall): void }> = [];
  private readonly settings: FakeClaudeSdkOptions;

  constructor(settings: FakeClaudeSdkOptions = {}) {
    this.settings = settings;
  }

  readonly query: ClaudeQuery = ({ prompt, options }) => {
    const call = new FakeSdkCall(this.calls.length, prompt, options, this.settings.policy ?? "reject", this.settings.clock);
    this.calls.push(call);
    this.settings.script?.(call);
    for (const waiter of this.callWaiters.filter(entry => entry.index === call.index)) {
      this.callWaiters.splice(this.callWaiters.indexOf(waiter), 1);
      waiter.resolve(call);
    }
    return call.stream();
  };

  /** Resolves with the `index`th `query()` call once the host has made it. */
  call(index: number): Promise<FakeSdkCall> {
    const existing = this.calls[index];
    if (existing !== undefined) return Promise.resolve(existing);
    return new Promise<FakeSdkCall>(resolve => {
      this.callWaiters.push({ index, resolve });
    });
  }

  /** Close every stream still open, so no fixture outlives its test. */
  release(): void {
    for (const call of this.calls) call.end();
  }
}

/*
 * Fixture messages carry only the fields the host reads. Each field is checked
 * against the SDK's own type (a Partial of the member, or a cast the compiler
 * accepts only when every field written overlaps the real one); the rest are
 * absent rather than invented.
 */
const MODEL = "claude-opus-5-5";

export function sdkInit(sessionId: string): SDKMessage {
  const init: Partial<SDKSystemMessage> = { type: "system", subtype: "init", session_id: sessionId, model: MODEL, permissionMode: "dontAsk", tools: [] };
  return init as SDKMessage;
}

/** A partial-message frame, as `includePartialMessages: true` streams output tokens. */
export function sdkTextDelta(sessionId: string, text: string): SDKMessage {
  return {
    type: "stream_event", session_id: sessionId, parent_tool_use_id: null,
    event: { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } },
  } as SDKMessage;
}

export function sdkAssistantText(sessionId: string, text: string): SDKMessage {
  return {
    type: "assistant", session_id: sessionId, parent_tool_use_id: null,
    message: { id: `msg-${sessionId}`, role: "assistant", model: MODEL, content: [{ type: "text", text }] },
  } as SDKMessage;
}

/** An assistant turn that hands a tool call to the SDK; its user tool_result comes later, or never. */
export function sdkAssistantToolUse(sessionId: string, toolUseId: string, name: string, input: Record<string, unknown>): SDKMessage {
  return {
    type: "assistant", session_id: sessionId, parent_tool_use_id: null,
    message: { id: `msg-${toolUseId}`, role: "assistant", model: MODEL, content: [{ type: "tool_use", id: toolUseId, name, input }] },
  } as SDKMessage;
}

/** A successful terminal result: 7 tokens in total, 3 of them output. */
export function sdkResultSuccess(sessionId: string, text: string): SDKMessage {
  const usage: ModelUsage = {
    inputTokens: 4, outputTokens: 3, cacheReadInputTokens: 0, cacheCreationInputTokens: 0,
    webSearchRequests: 0, costUSD: 0.01, contextWindow: 200_000, maxOutputTokens: 32_000,
  };
  const result: Partial<SDKResultSuccess> = {
    type: "result", subtype: "success", session_id: sessionId, is_error: false, result: text, num_turns: 1,
    stop_reason: "end_turn", total_cost_usd: 0.01, modelUsage: { [MODEL]: usage }, permission_denials: [],
  };
  return result as SDKMessage;
}

/** init, then the answer, then a success result: a call that simply completes. */
export function sdkSuccess(sessionId: string, text: string): SDKMessage[] {
  return [sdkInit(sessionId), sdkAssistantText(sessionId, text), sdkResultSuccess(sessionId, text)];
}
