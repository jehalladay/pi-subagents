/**
 * wb-752.13: a counting fake CLI and fixture documents for the furnace_observe reply suite
 * (test/workbench-furnace-observe-reply.test.ts).
 *
 * installCountingCli(name) writes an executable `name` script into a scratch directory (test/helpers/scratch.ts) and puts that
 * directory first on PATH until restore(). Each invocation appends its argv (one JSON line) to calls.jsonl, then answers from
 * answers.json: the first key that equals two adjacent arguments ("run status", "attempt list", "logs <run id>") names the
 * answer, whose stdout and stderr are written and whose exit code is returned (0 when absent); an invocation that names no
 * answer exits 2 with nothing on stdout. Never a real Furnace: the suite asserts the fake is first on PATH.
 */
import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import type { FurnaceObserverClient } from "../../src/workbench/furnace-observer.js";
import { makeScratch, removeScratch } from "./scratch.js";

export interface FakeAnswer {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exit?: number;
}
export type FakeAnswers = Readonly<Record<string, FakeAnswer>>;

export interface CountingCli {
  readonly binary: string;
  play(answers: FakeAnswers): void;
  /** Every invocation's argv so far, in order. */
  calls(): string[][];
  restore(): void;
}

const script = (node: string): string =>
  [
    `#!${node}`,
    '"use strict";',
    "// wb-752.13 counting fake CLI: records argv, answers from answers.json beside this file.",
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const argv = process.argv.slice(2);",
    'fs.appendFileSync(path.join(__dirname, "calls.jsonl"), JSON.stringify(argv) + "\\n");',
    'const answers = JSON.parse(fs.readFileSync(path.join(__dirname, "answers.json"), "utf8"));',
    "let answer;",
    "for (let i = 0; i + 1 < argv.length && answer === undefined; i++) {",
    '  const key = argv[i] + " " + argv[i + 1];',
    "  if (Object.hasOwn(answers, key)) answer = answers[key];",
    "}",
    'if (answer === undefined) { process.stderr.write("counting fake: no answer for this command\\n"); process.exit(2); }',
    'if (typeof answer.stdout === "string") process.stdout.write(answer.stdout);',
    'if (typeof answer.stderr === "string") process.stderr.write(answer.stderr);',
    'process.exitCode = typeof answer.exit === "number" ? answer.exit : 0;',
    "",
  ].join("\n");

export function installCountingCli(name: string): CountingCli {
  const dir = makeScratch(`furnace-observe-fake-${name}-`);
  const binary = join(dir, name);
  writeFileSync(binary, script(process.execPath));
  chmodSync(binary, 0o755);
  writeFileSync(join(dir, "answers.json"), "{}");
  const previous = process.env.PATH;
  process.env.PATH = previous === undefined ? dir : `${dir}${delimiter}${previous}`;
  const log = join(dir, "calls.jsonl");
  return {
    binary,
    play: answers => writeFileSync(join(dir, "answers.json"), JSON.stringify(answers)),
    calls: () =>
      existsSync(log)
        ? readFileSync(log, "utf8")
            .split("\n")
            .filter(line => line !== "")
            .map(line => JSON.parse(line) as string[])
        : [],
    restore: () => {
      if (previous === undefined) delete process.env.PATH;
      else process.env.PATH = previous;
      removeScratch(dir);
    },
  };
}

/** One Attempt row of a fixture Run (the CLI's attempt_list item). */
export interface FixtureAttempt {
  readonly attempt_id: string;
  readonly work_id: string;
  readonly state: string;
  readonly executor?: string;
  readonly outcome?: string;
  readonly started_at?: string;
}

/** A fixture Run's documents. */
export interface FixtureRun {
  readonly runId: string;
  readonly workspace: string;
  readonly state?: string;
  readonly beadsRunId?: string;
  readonly furnaceVersion?: string;
  readonly attempts?: readonly FixtureAttempt[];
  readonly logCursor?: string | null;
  readonly unreadable?: number;
}

/** The fixture Run's run_status document. */
export function runStatusDocument(run: FixtureRun): Record<string, unknown> {
  return {
    run_id: run.runId,
    beads_run_id: run.beadsRunId ?? "bd-fixture-run",
    workspace: run.workspace,
    state: run.state ?? "active",
    mode: "ephemeral_wisp",
    furnace_version: run.furnaceVersion ?? "0.1.0",
    state_since: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    active: [],
    failed: [],
    attention: [],
    unreadable: Array.from({ length: run.unreadable ?? 0 }, (_, index) => ({ path: `attempts/frn-atm-unreadable-${index}.json`, class: "unreadable", detail: "HYPOTHETICAL" })),
    corrupt_events: [],
    conflicts: [],
    failed_total: 0,
    corrupt_events_total: 0,
  };
}

/** The fixture Run's attempt_list document. */
export function attemptListDocument(run: FixtureRun): Record<string, unknown> {
  const attempts = (run.attempts ?? []).map((attempt, index) => ({
    attempt_id: attempt.attempt_id,
    run_id: run.runId,
    work_id: attempt.work_id,
    ordinal: index + 1,
    executor: attempt.executor ?? "runner",
    state: attempt.state,
    ...(attempt.outcome === undefined ? {} : { outcome: attempt.outcome }),
    created_at: "2026-01-01T00:00:00Z",
    ...(attempt.started_at === undefined ? {} : { started_at: attempt.started_at }),
  }));
  return { run_id: run.runId, beads_run_id: run.beadsRunId ?? "bd-fixture-run", attempts, unreadable: [], returned: attempts.length, complete: true, next_cursor: null };
}

/** The fixture Run's logs_read document for its last Attempt. */
export function logsDocument(run: FixtureRun): Record<string, unknown> | undefined {
  const last = run.attempts?.at(-1);
  if (last === undefined) return undefined;
  return { run_id: run.runId, attempt_id: last.attempt_id, stream: "stdout", complete: true, lossy: false, returned: 0, next_cursor: run.logCursor ?? null, lines: [] };
}

const envelope = (kind: string, requestId: string, data: unknown): string => JSON.stringify({ protocol_version: 1, ok: true, request_id: requestId, kind, data });

/** The counting fake furnace's answers for a fixture Run. */
export function furnaceAnswers(run: FixtureRun): FakeAnswers {
  const logs = logsDocument(run);
  return {
    "run status": { stdout: envelope("run_status", "fixture-status", runStatusDocument(run)) },
    "attempt list": { stdout: envelope("attempt_list", "fixture-attempts", attemptListDocument(run)) },
    ...(logs === undefined ? {} : { [`logs ${run.runId}`]: { stdout: envelope("logs_read", "fixture-logs", logs) } }),
  };
}

/** The counting fake furnace's answer for a Run that is not found (run status exits 1). */
export function furnaceMissing(): FakeAnswers {
  const error = { code: "run_not_found", message: "HYPOTHETICAL: the fixture Run does not exist", retryable: false };
  return { "run status": { exit: 1, stderr: `${JSON.stringify({ protocol_version: 1, ok: false, request_id: "fixture-error", kind: "run_status", error })}\n` } };
}

/** An in-memory FurnaceObserverClient over a fixture Run's documents (no process); `fail` makes the status read reject. */
export function memoryFurnace(run: FixtureRun, fail?: () => Error): FurnaceObserverClient {
  const exit = { code: 0, signal: null };
  const client = {
    runs: {
      get: () => ({
        status: async () => {
          if (fail !== undefined) throw fail();
          return { kind: "run_status", requestId: "memory-status", exit, data: runStatusDocument(run) };
        },
      }),
    },
    attempts: { list: async () => ({ kind: "attempt_list", requestId: "memory-attempts", exit, data: attemptListDocument(run) }) },
    logs: { read: async () => ({ kind: "logs_read", requestId: "memory-logs", exit, data: logsDocument(run) }) },
  };
  return client as unknown as FurnaceObserverClient;
}
