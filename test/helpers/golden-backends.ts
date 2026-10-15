/**
 * Shared machinery for the dual-backend golden equivalence suite (wb-cax.7).
 *
 * The same shipped workflow script runs against two hosts that answer from ONE
 * label -> answer table: the upstream stub WorkflowHost (A) and the real
 * createClaudeWorkflowHost over the wb-a2g.2 fixture ClaudeQuery seam (B). Both
 * results go through one normalizer that keeps only fields BOTH contracts
 * define; a field one backend does not emit (SDK session ids, token counts,
 * durations, native observation) is never compared and never asserted.
 *
 * Everything here is a fixture: no live SDK, model, credential or network.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { createClaudeWorkflowHost } from "../../src/workbench/claude-host.js";
import { buildPhaseGroups, collapse } from "../../src/workflow/progress.js";
import {
  runWorkflow,
  type WorkflowHost,
  type WorkflowRunResult,
  type WorkflowSpawnRequest,
} from "../../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkAssistantText, sdkInit, sdkResultSuccess } from "./claude-sdk-stream.js";

export const EXAMPLES_DIR = fileURLToPath(new URL("../../examples/workflows", import.meta.url));
export const LIB_DIR = join(EXAMPLES_DIR, "lib");

/** One script under test. `source` overrides the file for inline negative controls. */
export interface GoldenScript {
  id: string;
  dir: string;
  file: string;
  args: unknown;
  source?: string;
}

/** Args for examples that need them; the same sample args test/workflow-examples.test.ts uses. */
const SAMPLE_ARGS: Record<string, unknown> = {
  "fan-out-audit.js": { root: "src/routes/" },
  "compose.js": { root: "src/" },
};

const listJs = (dir: string) =>
  readdirSync(dir)
    .filter(name => name.endsWith(".js"))
    .sort();

/** Glob-driven, so a newly added example is covered without editing the suite. */
export const goldenScripts: GoldenScript[] = [
  ...listJs(EXAMPLES_DIR).map(file => ({ id: file, dir: EXAMPLES_DIR, file, args: SAMPLE_ARGS[file] })),
  ...listJs(LIB_DIR).map(file => ({ id: `lib/${file}`, dir: LIB_DIR, file, args: { root: "src/" } })),
];

/** Byte-for-byte: no rewriting, no injected globals. */
export const readScript = (script: GoldenScript): string =>
  script.source ?? readFileSync(join(script.dir, script.file), "utf-8");

/* ------------------------------------------------------------------------- *
 * The shared answer table
 * ------------------------------------------------------------------------- */

/** What a fixture agent says. `structured` is the SDK's structured_output for a schema-bearing call. */
export interface Answer {
  text: string;
  structured?: unknown;
}
export type AnswerTable = (label: string, schemaBearing: boolean) => Answer;

const structuredAnswer = (value: unknown): Answer => ({ text: JSON.stringify(value), structured: value });

/** Keyed off the label (the stable name examples give their calls), as test/workflow-examples.test.ts does. */
export const goldenAnswerFor: AnswerTable = (label, schemaBearing) => {
  if (schemaBearing) {
    if (label.startsWith("review:")) {
      return structuredAnswer({ findings: [{ title: `${label} finding`, file: "a.ts", severity: "low" }] });
    }
    if (label.startsWith("verify:")) return structuredAnswer({ isReal: true, why: "reproduced" });
    if (label === "scan") return structuredAnswer({ files: ["a.ts", "b.ts"] });
    // Deliberately invalid for any schema: an unhandled schema-bearing label fails loudly.
    return structuredAnswer({});
  }
  if (label === "discover") return { text: "src/routes/a.ts\nsrc/routes/b.ts" };
  return { text: `ok:${label}` };
};

/* ------------------------------------------------------------------------- *
 * Running
 * ------------------------------------------------------------------------- */

export interface RunOptions {
  answers?: AnswerTable;
  agentCap?: number;
  /** Order in which concurrent calls settle: immediately, call order, or last call first. */
  completion?: "immediate" | "forward" | "reverse";
}

export interface SdkCallRecord {
  sessionId: string;
  tools: unknown;
  model: string | undefined;
  permissionMode: string | undefined;
  effort: string | undefined;
}

export interface BackendRun {
  script: GoldenScript;
  result: WorkflowRunResult;
  /** One entry per query() the Claude backend made; empty under the stub host. */
  sdkCalls: SdkCallRecord[];
  /** How many spawn/resume calls reached the host. */
  hostCalls: number;
}

const delayFor = (completion: RunOptions["completion"], index: number): number => {
  if (completion === "forward") return index * 2;
  if (completion === "reverse") return Math.max(0, 16 - index) * 2;
  return 0;
};
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/** (A) The upstream stub host: the same shape as test/workflow-examples.test.ts, answering from the shared table. */
export async function runUpstream(script: GoldenScript, _cwd: string, options: RunOptions = {}): Promise<BackendRun> {
  const answers = options.answers ?? goldenAnswerFor;
  const labels = new Map<string, string>();
  let hostCalls = 0;
  const host: WorkflowHost = {
    async spawnAgent(request: WorkflowSpawnRequest) {
      hostCalls++;
      labels.set(request.agentId, request.label);
      await sleep(delayFor(options.completion, request.index));
      const answer = answers(request.label, request.schema !== undefined);
      return { ok: true, text: answer.text, outputTokens: 10 };
    },
    abortAgent() {},
    async resumeAgent(_agentId, prompt) {
      hostCalls++;
      return { ok: true, text: `resumed:${prompt.slice(0, 20)}`, outputTokens: 10 };
    },
    async runGate(command) {
      return { ok: true, output: `${command}: ok` };
    },
    loadWorkflow(ref) {
      const name = ref.name;
      if (name === undefined) return { ok: false, message: "only `name` refs are stubbed" };
      const file = listJs(LIB_DIR).find(child => child === `${name}.js`);
      if (file === undefined) return { ok: false, message: `no child workflow "${name}"` };
      return { ok: true, script: readFileSync(join(LIB_DIR, file), "utf-8") };
    },
  };
  const result = await runWorkflow({
    script: readScript(script),
    host,
    args: script.args,
    ...(options.agentCap !== undefined ? { agentCap: options.agentCap } : {}),
  });
  return { script, result, sdkCalls: [], hostCalls };
}

/**
 * (B) The real Claude host over the fixture ClaudeQuery seam.
 *
 * The SDK is never mocked. The fixture sees only a prompt, so a thin observer
 * around spawnAgent remembers which label asked for which prompt; the answer
 * itself still comes from the shared table.
 */
export async function runClaude(script: GoldenScript, cwd: string, options: RunOptions = {}): Promise<BackendRun> {
  const answers = options.answers ?? goldenAnswerFor;
  const labelByPrompt = new Map<string, string>();
  const sessionIds: string[] = [];
  const sdk = new FakeClaudeSdk({
    script: call => {
      const label = labelByPrompt.get(call.prompt);
      if (label === undefined) throw new Error(`Claude fixture saw a prompt no agent() call asked for: ${call.prompt}`);
      const schemaBearing = call.options.outputFormat !== undefined;
      const answer = answers(label, schemaBearing);
      const sessionId = call.options.resume ?? `golden-session-${call.index}`;
      sessionIds[call.index] = sessionId;
      const messages: SDKMessage[] = [
        sdkInit(sessionId),
        sdkAssistantText(sessionId, answer.text),
        schemaBearing && answer.structured !== undefined
          ? ({ ...sdkResultSuccess(sessionId, answer.text), structured_output: answer.structured } as SDKMessage)
          : sdkResultSuccess(sessionId, answer.text),
      ];
      setTimeout(() => {
        call.push(...messages);
        call.end();
      }, delayFor(options.completion, call.index));
    },
  });
  const inner = createClaudeWorkflowHost({
    cwd,
    model: "fixture-model",
    tools: [],
    // A Claude-native role for the Plan agent type review-panel.js names; never a Pi agent config.
    roles: { Plan: { prompt: "Plan the work." } },
    query: sdk.query,
  });
  let hostCalls = 0;
  const host: WorkflowHost = {
    ...inner,
    spawnAgent(request) {
      hostCalls++;
      labelByPrompt.set(request.prompt, request.label);
      return inner.spawnAgent(request);
    },
  };
  const result = await runWorkflow({
    script: readScript(script),
    host,
    args: script.args,
    ...(options.agentCap !== undefined ? { agentCap: options.agentCap } : {}),
  });
  sdk.release();
  const sdkCalls = sdk.calls.map(call => ({
    sessionId: sessionIds[call.index] ?? "",
    tools: call.options.tools,
    model: call.options.model,
    permissionMode: call.options.permissionMode,
    effort: call.options.effort,
  }));
  return { script, result, sdkCalls, hostCalls };
}

/* ------------------------------------------------------------------------- *
 * Normalizing
 * ------------------------------------------------------------------------- */

/** Error classes, fixed up front; anything else keeps a raw prefix so a new divergence shows. */
export function errorClassOf(message: string | undefined): string | undefined {
  if (message === undefined) return undefined;
  if (/exceeded its cap of \d+ agents/.test(message)) return "agent-cap-exceeded";
  if (/cannot run gate commands/.test(message)) return "gate-unsupported";
  if (/is not a recognised option/.test(message)) return "unrecognised-option";
  if (/not JSON|missing structured_output/.test(message)) return "schema-no-structured-output";
  if (/did not match (the requested )?schema|structured output did not match schema/.test(message)) {
    return "schema-mismatch";
  }
  return `other:${message.slice(0, 60)}`;
}

export interface NormalizedRun {
  status: string;
  error: string | undefined;
  value: unknown;
  agentCount: number;
  hostCalls: number;
  replayedCount: number;
  meta: { keys: string[]; name: string; description: string; phases: string[] };
  phases: Array<{
    title: string;
    status: string;
    doneCount: number;
    totalCount: number;
    agents: Array<{ label: string; state: string }>;
  }>;
  logs: string[];
  failures: Array<{ label: string; errorClass: string | undefined }>;
  /** compose.js: what the nested count-child.js resolved to and returned. */
  nested: unknown;
}

/**
 * Only fields both contracts define. Parallel/pipeline value arrays are
 * positional by contract, so they are compared as-is; completion order never
 * enters (agents are listed by label, not by arrival).
 */
export function normalizeRun(run: BackendRun): NormalizedRun {
  const { result } = run;
  const collapsed = collapse(result.progress);
  const json = (value: unknown): unknown => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));
  return {
    status: result.status,
    error: errorClassOf(result.error),
    value: json(result.value),
    agentCount: result.agentCount,
    hostCalls: run.hostCalls,
    replayedCount: result.replayedCount,
    meta: {
      keys: Object.keys(result.meta).sort(),
      name: result.meta.name,
      description: result.meta.description,
      phases: (result.meta.phases ?? []).map(phase => phase.title),
    },
    phases: buildPhaseGroups(result.progress, result.meta.phases).map(group => ({
      title: group.title,
      status: group.status,
      doneCount: group.doneCount,
      totalCount: group.totalCount,
      agents: group.agents.map(agent => ({ label: agent.label, state: agent.state })).sort(byLabel),
    })),
    logs: collapsed.logs,
    failures: collapsed.agents
      .filter(agent => agent.state === "error")
      .map(agent => ({ label: agent.label, errorClass: errorClassOf(agent.error) }))
      .sort(byLabel),
    nested: run.script.file === "compose.js" ? json(result.value) : undefined,
  };
}

function byLabel(a: { label: string }, b: { label: string }): number {
  return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
}

/** The top-level normalized fields on which two runs differ. Empty means equivalent. */
export function diffNormalized(a: NormalizedRun, b: NormalizedRun): string[] {
  return (Object.keys(a) as Array<keyof NormalizedRun>).filter(key => JSON.stringify(a[key]) !== JSON.stringify(b[key]));
}
