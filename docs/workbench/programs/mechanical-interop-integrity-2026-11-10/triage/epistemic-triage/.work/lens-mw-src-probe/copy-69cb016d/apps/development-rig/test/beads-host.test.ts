import test from "node:test";
import assert from "node:assert/strict";
import { readBeadsRequest } from "../dist/beads-host.js";
import type { BdExecutor } from "../dist/beads-host.js";
type Exec={stdout:string;stderr:string;exitCode:number};
import { chmodSync, mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = mkdtempSync(join(tmpdir(), "mw-beads-host-test-"));
process.on("exit", () => rmSync(root, { recursive: true, force: true }));
const basis = "a".repeat(40);
const issue = { id: "MW-1", title: "Fix parser", description: "Check bounds", status: "open" };
function executor(argv:readonly string[]):Exec{
  if (argv.includes("ready")) return { stdout: JSON.stringify([issue]), stderr: "", exitCode: 0 };
  if (argv.includes("show")) return { stdout: JSON.stringify([issue]), stderr: "", exitCode: 0 };
  throw Error("must be read-only");
}
test("Beads native ready/show results yield a bounded read-only development request", async () => {
  const r = await readBeadsRequest(root, "MW-1", basis, executor);
  assert.equal(r.beadsIssueId, "MW-1");
  assert.equal(r.task, "Fix parser\n\nCheck bounds");
  assert.equal(r.workspaceId, root);
});
test("ready omission refuses even if show reports status open", async () => {
  const exec:BdExecutor = argv => argv.includes("ready")
    ? { stdout: "[]", stderr: "", exitCode: 0 } : executor(argv);
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis, exec), /BEADS_WORK_NOT_READY/);
});
test("Beads query failure and wrong response shape never become ready work", async () => {
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis,
    () => ({ stdout: "[]", stderr: "read failed", exitCode: 1 })), /BEADS_QUERY_UNESTABLISHED/);
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis,
    () => ({ stdout: '{"ok":true}', stderr: "", exitCode: 0 })), /BEADS_RESPONSE_INVALID/);
});
test("host issues only read-only Beads commands in the pinned directory", async () => {
  const seen: {argv:readonly string[];cwd:string}[] = [];
  await readBeadsRequest(root, "MW-1", basis, async (argv, cwd) => {
    seen.push({ argv, cwd }); return executor(argv);
  });
  assert.deepEqual(seen.map(x => x.argv), [
    ["--readonly", "--directory", root, "ready", "--json"],
    ["--readonly", "--directory", root, "show", "MW-1", "--json"],
  ]);
  assert.ok(seen.every(x => x.cwd === root));
});
test("blank directory, issue id or revision refuses with BEADS_WORK_INVALID before any bd call", async () => {
  let calls = 0;
  const exec: BdExecutor = argv => { calls++; return executor(argv); };
  await assert.rejects(() => readBeadsRequest("", "MW-1", basis, exec), /^Error: BEADS_WORK_INVALID: directory, issue id and revision required$/);
  await assert.rejects(() => readBeadsRequest(root, "  ", basis, exec), /^Error: BEADS_WORK_INVALID: directory, issue id and revision required$/);
  await assert.rejects(() => readBeadsRequest(root, "MW-1", "  ", exec), /^Error: BEADS_WORK_INVALID: directory, issue id and revision required$/);
  assert.equal(calls, 0);
});
test("non-JSON ready stdout refuses with the exact did-not-return-JSON message", async () => {
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis,
    () => ({ stdout: "not json", stderr: "", exitCode: 0 })),
  err => err instanceof Error && err.message === "BEADS_RESPONSE_INVALID: ready did not return JSON");
});
test("ready arrays holding null or an array element refuse with the issue-array message", async () => {
  for (const stdout of ["[null]", "[[]]"]) {
    await assert.rejects(() => readBeadsRequest(root, "MW-1", basis,
      () => ({ stdout, stderr: "", exitCode: 0 })),
    err => err instanceof Error && err.message === "BEADS_RESPONSE_INVALID: ready must return an issue array");
  }
});
test("show returning two issues or a different id refuses as not uniquely identifying the issue", async () => {
  const message = "BEADS_RESPONSE_INVALID: native show did not uniquely identify the requested issue";
  for (const shown of [[issue, { ...issue, id: "MW-2" }], [{ ...issue, id: "MW-2" }]]) {
    const exec: BdExecutor = argv => argv.includes("show")
      ? { stdout: JSON.stringify(shown), stderr: "", exitCode: 0 } : executor(argv);
    await assert.rejects(() => readBeadsRequest(root, "MW-1", basis, exec),
      err => err instanceof Error && err.message === message);
  }
});
test("a symlinked directory resolves to its realpath in workspaceId and both argv --directory values", async () => {
  const real = join(root, "real-workspace");
  const link = join(root, "link-workspace");
  mkdirSync(real);
  symlinkSync(real, link);
  const resolved = realpathSync(real);
  const seen: { argv: readonly string[]; cwd: string }[] = [];
  const r = await readBeadsRequest(link, "MW-1", basis, async (argv, cwd) => {
    seen.push({ argv, cwd }); return executor(argv);
  });
  assert.notEqual(resolved, link);
  assert.equal(r.workspaceId, resolved);
  assert.deepEqual(seen.map(x => x.argv), [
    ["--readonly", "--directory", resolved, "ready", "--json"],
    ["--readonly", "--directory", resolved, "show", "MW-1", "--json"],
  ]);
  assert.ok(seen.every(x => x.cwd === resolved));
});
test("host's own ready refusal answers its exact absent-from-ready message, not the intake not-ready message", async () => {
  const exec: BdExecutor = argv => argv.includes("ready")
    ? { stdout: JSON.stringify([{ id: "MW-2" }, { id: 7 }]), stderr: "", exitCode: 0 } : executor(argv);
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis, exec),
    err => err instanceof Error && err.message === "BEADS_WORK_NOT_READY: issue absent from native ready result");
});
test("empty zero-exit stdout refuses with the did-not-return-JSON message for ready and for show", async () => {
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis,
    () => ({ stdout: "", stderr: "", exitCode: 0 })),
  err => err instanceof Error && err.message === "BEADS_RESPONSE_INVALID: ready did not return JSON");
  const exec: BdExecutor = argv => argv.includes("show")
    ? { stdout: "", stderr: "", exitCode: 0 } : executor(argv);
  await assert.rejects(() => readBeadsRequest(root, "MW-1", basis, exec),
    err => err instanceof Error && err.message === "BEADS_RESPONSE_INVALID: show did not return JSON");
});
async function withBdOnPath<T>(dir: string, body: () => Promise<T>): Promise<T> {
  const saved = process.env["PATH"];
  process.env["PATH"] = dir;
  try { return await body(); }
  finally { if (saved === undefined) delete process.env["PATH"]; else process.env["PATH"] = saved; }
}
test("default native executor maps a spawn failure to exit 1 and surfaces its reason in the query refusal", async () => {
  const empty = join(root, "path-without-bd");
  mkdirSync(empty);
  await withBdOnPath(empty, () => assert.rejects(() => readBeadsRequest(root, "MW-1", basis),
    err => err instanceof Error && err.message.startsWith("BEADS_QUERY_UNESTABLISHED: ready exited nonzero: ") &&
      err.message.includes("ENOENT")));
});
test("default native executor maps a nonzero bd exit to exit 1 carrying the command and stderr", async () => {
  const dir = join(root, "path-with-failing-bd");
  mkdirSync(dir);
  writeFileSync(join(dir, "bd"), "#!/bin/sh\nprintf 'boom from bd\\n' >&2\nexit 3\n");
  chmodSync(join(dir, "bd"), 0o755);
  await withBdOnPath(dir, () => assert.rejects(() => readBeadsRequest(root, "MW-1", basis),
    err => err instanceof Error && err.message.startsWith("BEADS_QUERY_UNESTABLISHED: ready exited nonzero: Command failed: bd ") &&
      err.message.includes("boom from bd")));
});
test("default native executor maps a zero-exit bd to exit 0 and its stdout drives a request", async () => {
  const dir = join(root, "path-with-working-bd");
  mkdirSync(dir);
  const body = JSON.stringify([issue]);
  writeFileSync(join(dir, "bd"), "#!/bin/sh\ncase \"$4\" in\n  ready|show) printf '%s' '" + body + "';;\n  *) exit 9;;\nesac\n");
  chmodSync(join(dir, "bd"), 0o755);
  const r = await withBdOnPath(dir, () => readBeadsRequest(root, "MW-1", basis));
  assert.equal(r.beadsIssueId, "MW-1");
  assert.equal(r.workspaceId, root);
});
