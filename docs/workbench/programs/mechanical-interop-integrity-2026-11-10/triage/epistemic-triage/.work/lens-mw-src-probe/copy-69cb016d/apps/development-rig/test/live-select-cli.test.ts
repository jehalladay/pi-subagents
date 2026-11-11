import test from "node:test";
import assert from "node:assert/strict";
import { selectCli } from "../dist/live-select-cli.js";
import type { SelectionReport } from "../dist/candidate-selection.js";

// selectCli maps SelectionReport.outcome.kind to the process exit after it writes the
// {mode:"live-select", report} stdout envelope. The selection itself arrives through an injectable
// seam, so each leg runs on a canned report without a Claude session, a worktree or Forge.
type Select = NonNullable<Parameters<typeof selectCli>[1]>;
type SelectArgs = Parameters<Select>;

const basis = { workspaceId: "w", revision: "a".repeat(40) };
const candidate = { basis: { workspaceId: "w", revision: "b".repeat(40) }, evidence: { system: "git", kind: "commit", id: "b".repeat(40) } };
const review = { verdict: "approve" };
const verification = { kind: "passed" };
function report(outcome: unknown, integration: unknown = null): SelectionReport {
  return { basis, plan: { candidates: [] }, excluded: [], choice: null, outcome, integration } as unknown as SelectionReport;
}
const reviewed = { kind: "reviewed_candidate", candidate, review, verification };

async function run(args: readonly string[], rep: SelectionReport): Promise<{ code: number; lines: string[]; calls: SelectArgs[] }> {
  const calls: SelectArgs[] = [];
  const select: Select = async (...a: SelectArgs) => { calls.push(a); return rep; };
  const written: string[] = [];
  const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  let code: number;
  try { code = await selectCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...args], select); }
  finally { process.stdout.write = original; }
  return { code, lines: written.join("").split("\n").filter((l) => l !== ""), calls };
}

test("reviewed_candidate without --integrate exits 0 even when no integration report exists", async () => {
  const r = await run([], report(reviewed, null));
  assert.equal(r.code, 0);
});

test("reviewed_candidate without --integrate ignores an unverified integration report", async () => {
  const r = await run([], report(reviewed, { verified: false }));
  assert.equal(r.code, 0);
});

test("reviewed_candidate with --integrate exits 0 only when integration.verified is true", async () => {
  const r = await run(["--integrate"], report(reviewed, { verified: true }));
  assert.equal(r.code, 0);
});

test("reviewed_candidate with --integrate and unverified integration exits 3", async () => {
  const r = await run(["--integrate"], report(reviewed, { verified: false }));
  assert.equal(r.code, 3);
});

test("reviewed_candidate with --integrate and a null integration exits 3", async () => {
  const r = await run(["--integrate"], report(reviewed, null));
  assert.equal(r.code, 3);
});

test("verification_failed exits 1", async () => {
  const r = await run([], report({ kind: "verification_failed", candidate, review, verification: { kind: "failed" } }));
  assert.equal(r.code, 1);
});

test("review_rejected exits 1", async () => {
  const r = await run([], report({ kind: "review_rejected", candidate, review: { verdict: "reject" } }));
  assert.equal(r.code, 1);
});

test("needs_candidates takes the default leg and exits 3", async () => {
  const r = await run([], report({ kind: "needs_candidates", reason: "NO_PLANNED_CANDIDATES" }));
  assert.equal(r.code, 3);
});

test("indeterminate takes the default leg and exits 3", async () => {
  const r = await run([], report({ kind: "indeterminate", reason: "SELECTION_UNDETERMINED" }));
  assert.equal(r.code, 3);
});

test("an unknown outcome kind also exits 3 rather than success", async () => {
  const r = await run([], report({ kind: "future_kind" }));
  assert.equal(r.code, 3);
});

test("stdout carries exactly one live-select envelope line holding the report, written before the exit decision", async () => {
  const rep = report({ kind: "review_rejected", candidate, review: { verdict: "reject" } });
  const r = await run([], rep);
  assert.equal(r.lines.length, 1);
  assert.deepEqual(JSON.parse(r.lines[0] ?? ""), { mode: "live-select", report: JSON.parse(JSON.stringify(rep)) });
});

test("the seam receives the root and task with default options when no flag overrides them", async () => {
  const r = await run([], report(reviewed));
  assert.equal(r.calls.length, 1);
  assert.deepEqual(r.calls[0], ["/ws", "t", { candidates: 2, forgeExecutable: "forge", integrate: false }]);
});

test("the seam receives every flag override, including --integrate and --model", async () => {
  const r = await run(["--candidates", "5", "--model", "m1", "--forge-bin", "/bin/f", "--integrate"], report(reviewed, { verified: true }));
  assert.deepEqual(r.calls[0], ["/ws", "t", { candidates: 5, forgeExecutable: "/bin/f", integrate: true, model: "m1" }]);
});

test("refusals thrown before the switch never reach the seam", async () => {
  const calls: SelectArgs[] = [];
  const select: Select = async (...a: SelectArgs) => { calls.push(a); return report(reviewed); };
  await assert.rejects(selectCli(["--workspace", "/ws", "--task", "t"], select), /^Error: WRITE_OPT_IN_REQUIRED/);
  await assert.rejects(selectCli(["--workspace", "/ws", "--allow-writes"], select), /^Error: MISSING_ARGUMENT/);
  assert.equal(calls.length, 0);
});
