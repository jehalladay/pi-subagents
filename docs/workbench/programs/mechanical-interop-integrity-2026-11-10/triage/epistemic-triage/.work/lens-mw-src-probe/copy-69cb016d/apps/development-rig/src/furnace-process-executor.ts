/**
 * Furnace PROCESS-driver executor (no @furnace/sdk): any executable is an executor.
 * Furnace starts this program once per Attempt with the stdin-json ExecutionContext and reads
 * exactly one bit back, the exit status. The native Forge/agent evidence therefore lives in the
 * receipt this program writes, never in the exit status alone:
 *   exit 0  only when the Forge gate PASSED (or developLive reached verified_candidate)
 *   exit 1  Forge FAIL / verification_failed          (Furnace: work_failure)
 *   exit 3  indeterminate / needs_evidence            (Furnace: work_failure, never a verdict)
 *   exit 64 unusable invocation or context, 66 refused Work tag or missing task, 70 a thrown service
 * Furnace keeps Run/Work/Attempt, supervision, retries and reconciliation; this file owns none of them.
 * Dispatch is a leading [tag] in the Work title, the convention Furnace's own reference executor uses.
 */
import { mkdirSync, writeFileSync, readSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { verifyExistingCandidate } from "./live-gate.js";
import type { GateObservation } from "./live-gate.js";
import { developLive } from "./live-development.js";
import type { LiveDevelopmentResult } from "./live-development.js";
import { receiptOf } from "./receipt.js";
import type { DevelopmentReceipt } from "./receipt.js";

export interface ExecutionContextV0 {
  readonly run: { readonly furnace_run_id: string; readonly beads_run_id: string | null; readonly formula: string | null };
  readonly work: { readonly beads_work_id: string; readonly title: string | null; readonly description: string | null; readonly acceptance_criteria: string | null };
  readonly attempt: { readonly attempt_id: string; readonly ordinal: number };
  readonly workspace: { readonly root: string };
}
export interface ProcessExecutorServices {
  readonly gate: (root: string) => Promise<GateObservation>;
  readonly develop: (root: string, task: string) => Promise<LiveDevelopmentResult>;
}
export interface ProcessExecutorReceipt {
  readonly schema: "mechanical-workflows/furnace-process-receipt/v1";
  readonly host: "furnace-process-driver";
  readonly guarantee: "Furnace reads only this Attempt's exit status; the native Forge/agent evidence is in this receipt and in the producing tools' own records";
  readonly furnace: { readonly runId: string; readonly beadsRunId: string | null; readonly formula: string | null; readonly workId: string; readonly attemptId: string; readonly ordinal: number; readonly workspaceRoot: string };
  readonly tag: string | null;
  readonly executorVerdict: "success" | "work_failure" | "refused";
  readonly exitCode: number;
  readonly forge: { readonly kind: GateObservation["kind"]; readonly reason: string; readonly basis: GateObservation["basis"]; readonly operationId: string | null } | null;
  readonly development: DevelopmentReceipt | null;
  readonly error?: string;
}
export interface ExecuteOptions { readonly receiptsDir?: string }

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}
function text(value: unknown, path: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`FURNACE_CONTEXT_INVALID: ${path} must be a non-empty string`);
  return value;
}
function optionalText(value: unknown, path: string): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") throw new Error(`FURNACE_CONTEXT_INVALID: ${path} must be a string or null`);
  return value;
}

/** Strict decode of Furnace's stdin-json ExecutionContext (the four groups, nothing invented). */
export function parseExecutionContext(input: string): ExecutionContextV0 {
  let parsed: unknown;
  try { parsed = JSON.parse(input); } catch { throw new Error("FURNACE_CONTEXT_INVALID: stdin is not JSON"); }
  const root = object(parsed);
  if (!root) throw new Error("FURNACE_CONTEXT_INVALID: context must be an object");
  const run = object(root["run"]); const work = object(root["work"]); const attempt = object(root["attempt"]); const workspace = object(root["workspace"]);
  if (!run || !work || !attempt || !workspace) throw new Error("FURNACE_CONTEXT_INVALID: run, work, attempt and workspace groups are required");
  const ordinal = attempt["ordinal"];
  if (typeof ordinal !== "number" || !Number.isInteger(ordinal) || ordinal < 1) throw new Error("FURNACE_CONTEXT_INVALID: attempt.ordinal must be a positive integer");
  return {
    run: { furnace_run_id: text(run["furnace_run_id"], "run.furnace_run_id"), beads_run_id: optionalText(run["beads_run_id"], "run.beads_run_id"), formula: optionalText(run["formula"], "run.formula") },
    work: { beads_work_id: text(work["beads_work_id"], "work.beads_work_id"), title: optionalText(work["title"], "work.title"), description: optionalText(work["description"], "work.description"), acceptance_criteria: optionalText(work["acceptance_criteria"], "work.acceptance_criteria") },
    attempt: { attempt_id: text(attempt["attempt_id"], "attempt.attempt_id"), ordinal },
    workspace: { root: text(workspace["root"], "workspace.root") },
  };
}

export function tagOf(title: string | null): string | null {
  const match = title?.match(/^\[([a-z0-9-]+)\]/);
  return match?.[1] ?? null;
}

function gateExit(kind: GateObservation["kind"]): number { return kind === "passed" ? 0 : kind === "failed" ? 1 : 3; }
function developExit(kind: LiveDevelopmentResult["workflow"]["kind"]): number { return kind === "verified_candidate" ? 0 : kind === "verification_failed" ? 1 : 3; }

function writeReceipt(receipt: ProcessExecutorReceipt, options: ExecuteOptions): void {
  const dir = options.receiptsDir ?? join(receipt.furnace.workspaceRoot, ".furnace", "mw-receipts");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, receipt.furnace.attemptId + ".json"), JSON.stringify(receipt, null, 1) + "\n");
}

/** Pure dispatch over an already-read context: returns the exit status Furnace will read and the receipt it rests on. */
export async function executeProcessContext(contextText: string, services: ProcessExecutorServices, options: ExecuteOptions = {}): Promise<{ exitCode: number; receipt: ProcessExecutorReceipt }> {
  const ctx = parseExecutionContext(contextText);
  const tag = tagOf(ctx.work.title);
  const base = {
    schema: "mechanical-workflows/furnace-process-receipt/v1" as const,
    host: "furnace-process-driver" as const,
    guarantee: "Furnace reads only this Attempt's exit status; the native Forge/agent evidence is in this receipt and in the producing tools' own records" as const,
    furnace: { runId: ctx.run.furnace_run_id, beadsRunId: ctx.run.beads_run_id, formula: ctx.run.formula, workId: ctx.work.beads_work_id, attemptId: ctx.attempt.attempt_id, ordinal: ctx.attempt.ordinal, workspaceRoot: ctx.workspace.root },
    tag,
  };
  const finish = (receipt: ProcessExecutorReceipt): { exitCode: number; receipt: ProcessExecutorReceipt } => { writeReceipt(receipt, options); return { exitCode: receipt.exitCode, receipt }; };
  try {
    if (tag === "gate") {
      const gate = await services.gate(ctx.workspace.root);
      const exitCode = gateExit(gate.kind);
      return finish({ ...base, executorVerdict: exitCode === 0 ? "success" : "work_failure", exitCode, forge: { kind: gate.kind, reason: gate.reason, basis: gate.basis, operationId: gate.operationId }, development: null });
    }
    if (tag === "develop") {
      const task = ctx.work.description?.trim() ?? "";
      if (task.length === 0) return finish({ ...base, executorVerdict: "refused", exitCode: 66, forge: null, development: null, error: "FURNACE_WORK_TASK_MISSING: [develop] needs the task in the Work description" });
      const result = await services.develop(ctx.workspace.root, task);
      const exitCode = developExit(result.workflow.kind);
      return finish({ ...base, executorVerdict: exitCode === 0 ? "success" : "work_failure", exitCode, forge: null, development: receiptOf(result) });
    }
    return finish({ ...base, executorVerdict: "refused", exitCode: 66, forge: null, development: null, error: `FURNACE_WORK_TAG_REFUSED: expected a leading [gate] or [develop] in the Work title, saw ${JSON.stringify(ctx.work.title)}` });
  } catch (error) {
    return finish({ ...base, executorVerdict: "work_failure", exitCode: 70, forge: null, development: null, error: error instanceof Error ? error.message : String(error) });
  }
}

export const nativeServices: ProcessExecutorServices = {
  gate: root => verifyExistingCandidate(root, process.env["MECHANICAL_FORGE_BINARY"] ?? "forge"),
  develop: (root, task) => developLive(root, task, { forgeExecutable: process.env["MECHANICAL_FORGE_BINARY"] ?? "forge" }),
};

/** Bounded retries (5 ms apart, about 10 s) for a stdin read that reports EAGAIN on a not-yet-written pipe. */
export const STDIN_EAGAIN_RETRIES = 2000;
export interface StdinSeam {
  readonly readSync: (fd: number, buffer: Buffer) => number;
  readonly sleep: (ms: number) => void;
}
const nativeStdinSeam: StdinSeam = {
  readSync: (fd, buffer) => readSync(fd, buffer, 0, buffer.length, null),
  sleep: ms => { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms); },
};
/**
 * Read all of stdin synchronously. A transient EAGAIN (the context pipe has no bytes yet) waits and
 * retries while keeping every byte already read; EOF ends the input; any other read error, or an EAGAIN
 * that outlasts the retry bound, throws a named FURNACE_CONTEXT_INVALID error and never becomes the
 * empty-stdin refusal, which stays reserved for a stream that genuinely ended with no bytes.
 */
export function readStdinText(seam: StdinSeam = nativeStdinSeam): string {
  const chunks: Buffer[] = [];
  const buffer = Buffer.alloc(65536);
  let waits = 0;
  for (;;) {
    let count: number;
    try { count = seam.readSync(0, buffer); } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "EOF") break;
      if (code === "EAGAIN") {
        if (waits >= STDIN_EAGAIN_RETRIES) throw new Error(`FURNACE_CONTEXT_INVALID: stdin read stayed EAGAIN after ${STDIN_EAGAIN_RETRIES} waits`);
        waits += 1; seam.sleep(5); continue;
      }
      throw new Error(`FURNACE_CONTEXT_INVALID: stdin read failed (${code ?? "unknown"}): ${error instanceof Error ? error.message : String(error)}`);
    }
    if (count === 0) break;
    chunks.push(Buffer.from(buffer.subarray(0, count)));
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function main(): Promise<number> {
  if (process.argv.length > 2) { process.stderr.write(`FURNACE_EXECUTOR_ARGV_REFUSED: ${process.argv.slice(2).join(" ")}\n`); return 64; }
  if (process.stdin.isTTY) { process.stderr.write("FURNACE_CONTEXT_INVALID: no stdin-json context\n"); return 64; }
  let input = "";
  try { input = readStdinText(); } catch (error) { process.stderr.write((error instanceof Error ? error.message : String(error)) + "\n"); return 64; }
  if (input.trim().length === 0) { process.stderr.write("FURNACE_CONTEXT_INVALID: empty stdin\n"); return 64; }
  try { parseExecutionContext(input); } catch (error) { process.stderr.write((error instanceof Error ? error.message : String(error)) + "\n"); return 64; }
  const receiptsDir = process.env["MW_FURNACE_RECEIPTS"];
  const out = await executeProcessContext(input, nativeServices, receiptsDir ? { receiptsDir } : {});
  process.stdout.write(JSON.stringify(out.receipt) + "\n");
  return out.exitCode;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then(code => { process.exitCode = code; }, error => { process.stderr.write(String(error) + "\n"); process.exitCode = 70; });
}
