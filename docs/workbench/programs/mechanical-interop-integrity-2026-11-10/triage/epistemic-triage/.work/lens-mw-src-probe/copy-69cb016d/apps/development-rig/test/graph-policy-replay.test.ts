import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { BASELINES, buildDecisionContexts, contextMetrics, mulberry32, parseHistory, perturbTheta, singleUnitProbes, summarize } from "../dist/graph-policy-replay.js";
import { GpRpcSession, HELLO_PARAMS } from "../dist/graph-policy-rpc.js";
import type { RpcTransport } from "../dist/graph-policy-rpc.js";
import { gpReplayCli, parseReplayArgs } from "../dist/graph-policy-replay-cli.js";

// Every directory this file creates under tmpdir() is removed when the file's tests finish; tmpdir-hygiene.test.ts pins the residue.
const scratchDirs: string[] = [];
const scratchDir = (prefix: string): string => { const dir = mkdtempSync(join(tmpdir(), prefix)); scratchDirs.push(dir); return dir; };
after(() => { for (const dir of scratchDirs) rmSync(dir, { recursive: true, force: true }); });

// A six-issue history: A,B created first; C blocked by A until A closes; D created later; E never started; F an epic
// started at the same instant as B.
const H = [
  { id: "A", status: "closed", issue_type: "task", priority: 1, created_at: "2026-10-01T00:00:00Z", started_at: "2026-10-01T01:00:00Z", closed_at: "2026-10-01T02:00:00Z", assignee: "x", dependencies: [] },
  { id: "B", status: "closed", issue_type: "task", priority: 2, created_at: "2026-10-01T00:30:00Z", started_at: "2026-10-01T03:00:00Z", closed_at: "2026-10-01T04:00:00Z", assignee: "y", dependencies: [] },
  { id: "C", status: "closed", issue_type: "bug", priority: 0, created_at: "2026-10-01T00:40:00Z", started_at: "2026-10-01T05:00:00Z", closed_at: "2026-10-01T06:00:00Z", assignee: "x", dependencies: [{ issue_id: "C", depends_on_id: "A", type: "blocks", created_at: "2026-10-01T00:41:00Z" }] },
  { id: "D", status: "open", issue_type: "task", priority: 3, created_at: "2026-10-01T02:30:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [{ issue_id: "D", depends_on_id: "B", type: "discovered-from", created_at: "2026-10-01T02:31:00Z" }] },
  { id: "E", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-01T00:00:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [] },
  { id: "F", status: "in_progress", issue_type: "epic", priority: 1, created_at: "2026-10-01T00:10:00Z", started_at: "2026-10-01T03:00:00Z", closed_at: null, assignee: "y", dependencies: [] },
];

test("parseHistory narrows rows and refuses non-arrays or rows without id/status/created_at", () => {
  assert.equal(parseHistory(H).length, 6);
  assert.throws(() => parseHistory({}), /BEADS_RESPONSE_INVALID/);
  assert.throws(() => parseHistory([{ id: "x", status: "open" }]), /BEADS_RESPONSE_INVALID/);
});

test("buildDecisionContexts rebuilds each claim as of its instant: no future beads, no claimed or closed beads, blocked beads excluded, features time-resolved", () => {
  const { contexts, dropped } = buildDecisionContexts(parseHistory(H), { splitAt: "2026-10-01T04:30:00Z" });
  assert.deepEqual(contexts.map(c => [c.chosen, c.at, c.split]), [["A", "2026-10-01T01:00:00Z", "train"], ["B", "2026-10-01T03:00:00Z", "train"], ["F", "2026-10-01T03:00:00Z", "train"], ["C", "2026-10-01T05:00:00Z", "test"]]);
  const a = contexts[0]!;
  assert.deepEqual(a.support, ["A", "E", "F", "B"], "C is blocked by open A and D is not yet created");
  assert.ok(a.support.includes(a.chosen));
  const b = contexts[1]!;
  assert.deepEqual(b.support, ["E", "F", "B", "C", "D"], "A closed at 02:00 so C is unblocked and still unclaimed; D exists by 03:00; A is gone");
  const f = contexts[2]!;
  assert.deepEqual(f.support, b.support, "two claims at the same instant see the same candidates, each including itself");
  const c = contexts[3]!;
  assert.deepEqual(c.support, ["E", "C", "D"], "F is already in progress since 03:00 and stays out of a later claim's support; A and B are closed by 05:00");
  assert.deepEqual(dropped, []);
});

test("the chosen bead's features are measured at the instant: dependency counts count only edges created by then and comment_count stays unknown", () => {
  const { contexts } = buildDecisionContexts(parseHistory(H), { splitAt: "2026-10-02T00:00:00Z" });
  const c = contexts.find(ctx => ctx.chosen === "C")!;
  const row = c.ready.find(r => r.id === "C")!;
  assert.equal(row.dependency_count, 1); assert.equal(row.comment_count, null); assert.deepEqual(row.dependencies, [], "A is closed, so the edge has no in-support other end");
  const d = c.ready.find(r => r.id === "D")!;
  assert.equal(d.dependency_count, 1); assert.equal(c.ready.find(r => r.id === "B"), undefined, "B is closed at 05:00");
  assert.throws(() => buildDecisionContexts(parseHistory(H), { splitAt: "soon" }), /GP_REPLAY_INVALID/);
});

// A claim-instant fixture (MechanicalWorkflows-woyn): Y claimed at 01:00; Q has a discovered-from edge to Y created exactly at 01:00 and a second edge to R created at 02:00; N is created exactly at 01:00 and never started; Z is claimed at 03:00.
const AT = [
  { id: "Y", status: "closed", issue_type: "task", priority: 1, created_at: "2026-10-02T00:00:00Z", started_at: "2026-10-02T01:00:00Z", closed_at: "2026-10-02T01:30:00Z", assignee: "x", dependencies: [] },
  { id: "R", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-02T00:10:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [] },
  { id: "Q", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-02T00:20:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [{ issue_id: "Q", depends_on_id: "Y", type: "discovered-from", created_at: "2026-10-02T01:00:00Z" }, { issue_id: "Q", depends_on_id: "R", type: "discovered-from", created_at: "2026-10-02T02:00:00Z" }] },
  { id: "Z", status: "closed", issue_type: "task", priority: 2, created_at: "2026-10-02T00:30:00Z", started_at: "2026-10-02T03:00:00Z", closed_at: "2026-10-02T04:00:00Z", assignee: "y", dependencies: [] },
  { id: "N", status: "open", issue_type: "task", priority: 3, created_at: "2026-10-02T01:00:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [] },
];

test("a bead created exactly at a claim instant is in that claim's support (created_at <= t is inclusive)", () => {
  const { contexts } = buildDecisionContexts(parseHistory(AT), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts.map(c => c.chosen), ["Y", "Z"]);
  assert.deepEqual(contexts[0]!.support, ["Y", "R", "Q", "Z", "N"], "N was created at 01:00 sharp, never started, and counts at Y's 01:00 claim");
  assert.deepEqual(contexts[1]!.support, ["R", "Q", "Z", "N"], "Y has been in progress since 01:00 and stays out of the later claim");
});

test("a dependency edge created exactly at a claim instant counts toward dependency_count at that claim, and a later edge does not until its own instant", () => {
  const { contexts } = buildDecisionContexts(parseHistory(AT), { splitAt: "2026-10-03T00:00:00Z" });
  const countAt = (index: number, id: string) => contexts[index]!.ready.find(r => r.id === id)!.dependency_count;
  assert.equal(countAt(0, "Q"), 1, "the Q->Y edge is created at 01:00 sharp and counts; the Q->R edge at 02:00 does not");
  assert.equal(countAt(1, "Q"), 2, "both Q edges exist by Z's 03:00 claim");
});

test("dependent_count counts only edges that exist by the claim instant, and the same edge counts for a later claim", () => {
  const { contexts } = buildDecisionContexts(parseHistory(AT), { splitAt: "2026-10-03T00:00:00Z" });
  const dependentsAt = (index: number, id: string) => contexts[index]!.ready.find(r => r.id === id)!.dependent_count;
  assert.equal(dependentsAt(0, "R"), 0, "the Q->R edge is created at 02:00, after Y's 01:00 claim");
  assert.equal(dependentsAt(1, "R"), 1, "the same edge counts at Z's 03:00 claim");
  assert.equal(dependentsAt(0, "Y"), 1, "the Q->Y edge created exactly at the claim instant counts for Y itself");
});

test("contextMetrics ranks the chosen bead with tie sharing and a log-softmax over the support", () => {
  const scores = new Map([["A", 2], ["B", 1], ["C", 2]]);
  const m = contextMetrics(scores, "A", ["A", "B", "C"]);
  assert.equal(m.top1, 0.5); assert.equal(m.reciprocalRank, 1 / 1.5); assert.ok(m.logLikelihood < 0 && m.logLikelihood > -1);
  const low = contextMetrics(scores, "B", ["A", "B", "C"]);
  assert.equal(low.top1, 0); assert.equal(low.reciprocalRank, 1 / 3);
  const missing = contextMetrics(new Map([["A", 1]]), "B", ["A", "B"]);
  assert.equal(missing.top1, 0); assert.equal(missing.logLikelihood, Number.NEGATIVE_INFINITY);
  const s = summarize("x", [m, low]);
  assert.equal(s.n, 2); assert.equal(s.top1, 0.25); assert.equal(s.expectedRandomTop1, 1 / 3);
});

test("baselines are the host's deterministic rules and uniform is an all-tie", () => {
  const ready = [{ id: "A", status: "open", priority: 2, created_at: "2026-10-01T00:00:00Z", dependent_count: 0 }, { id: "B", status: "open", priority: 1, created_at: "2026-10-01T01:00:00Z", dependent_count: 3 }];
  const top = (name: string) => { const scores = BASELINES[name]!(ready); return [...scores.entries()].sort((x, y) => y[1] - x[1])[0]![0]; };
  assert.equal(top("priority-first"), "B"); assert.equal(top("oldest-first"), "A"); assert.equal(top("newest-first"), "B"); assert.equal(top("most-dependents-first"), "B");
  assert.equal(contextMetrics(BASELINES["uniform"]!(ready), "A", ["A", "B"]).top1, 0.5);
});

test("perturbTheta is a deterministic seeded Gaussian step scaled per block; mulberry32 is reproducible", () => {
  const theta0 = { Ws: [1, 0, -1], Wm: [0, 0] };
  const a = perturbTheta(theta0, 7, { Ws: 0.5 }); const b = perturbTheta(theta0, 7, { Ws: 0.5 }); const c = perturbTheta(theta0, 8, { Ws: 0.5 });
  assert.deepEqual(a, b); assert.notDeepEqual(a, c); assert.deepEqual(a["Wm"], [0, 0], "an unscaled block is untouched");
  assert.ok(a["Ws"]!.every(v => Number.isFinite(v) && Math.fround(v) === v));
  const r1 = mulberry32(42); const r2 = mulberry32(42); assert.equal(r1(), r2()); assert.ok(r1() < 1 && r1() >= 0);
  const probes = singleUnitProbes({ Ws: [0.5, -0.5, 0], Wm: [1] });
  assert.deepEqual(probes.map(p => p.arm), ["theta-unit0+", "theta-unit0-", "theta-unit1+", "theta-unit1-", "theta-unit2+", "theta-unit2-"]);
  assert.deepEqual(probes[3]!.theta, { Ws: [0, -1, 0], Wm: [1] }); assert.deepEqual(singleUnitProbes({ Wm: [1] }), []);
  assert.equal(summarize("b", [contextMetrics(new Map([["A", 1]]), "A", ["A"])], { probabilistic: false }).meanLogLikelihood, null);
});

function fakeTransport(script: (request: { id: string; method: string; params: Record<string, unknown> }) => Record<string, unknown> | null): RpcTransport & { requests: string[] } {
  const requests: string[] = [];
  let push: ((line: string | null) => void) | null = null;
  const queue: (string | null)[] = [];
  const lines: AsyncIterable<string> = { [Symbol.asyncIterator]() { return { next: () => new Promise(resolve => { const emit = (line: string | null) => resolve(line === null ? { value: undefined as unknown as string, done: true } : { value: line, done: false }); if (queue.length) emit(queue.shift()!); else push = emit; }) }; } };
  const deliver = (line: string | null) => { if (push) { const p = push; push = null; p(line); } else queue.push(line); };
  return { requests, lines, write: line => { requests.push(line); const request = JSON.parse(line) as { id: string; method: string; params: Record<string, unknown> }; const reply = script(request); if (reply) deliver(JSON.stringify({ schema: "gp.rpc.reply/v1", id: request.id, ...reply })); }, end: () => deliver(null) };
}

test("GpRpcSession speaks the graphpolicy.rpc.v1 frames: hello, correlated evaluate replies parsed to [id,score] rows, refusals surfaced, close", async () => {
  const t = fakeTransport(req => req.method === "hello" ? { ok: true, result: { protocol: "graphpolicy.rpc.v1" } }
    : req.method === "evaluate" ? { ok: true, result: { valid: true, Y: { beadScore: { rows: [["A", [0.5]], ["B", [-1]]] } }, receipt: { duration_ms: 3 } } }
    : req.method === "close" ? { ok: true, result: {} } : { ok: false, error: { code: "GP_RPC_METHOD_UNKNOWN" } });
  const session = new GpRpcSession(() => t);
  await session.hello();
  const first = JSON.parse(t.requests[0]!) as { method: string; params: Record<string, unknown> };
  assert.equal(first.method, "hello"); assert.equal(first.params["protocol"], HELLO_PARAMS.protocol); assert.deepEqual(first.params["ops"], [...HELLO_PARAMS.ops]);
  const out = await session.evaluate({ program: {}, theta: { Ws: [1] }, graph: {}, candidates: { beads: ["A", "B"] } }, "beadScore");
  assert.deepEqual(out.rows, [{ id: "A", score: 0.5 }, { id: "B", score: -1 }]); assert.equal(out.durationMs, 3);
  await assert.rejects(() => session.evaluate({ program: {}, theta: {}, graph: {}, candidates: {} }, "other"), /GP_RPC_EVALUATE_MALFORMED/);
  await assert.rejects(() => session.call("bogus", {}).then(r => { if (!r.ok) throw new Error("GP_RPC_EVALUATE_REFUSED: " + JSON.stringify(r.error)); }), /GP_RPC_EVALUATE_REFUSED/);
  await session.close();
  await assert.rejects(() => session.call("evaluate", {}), /GP_RPC_SESSION_CLOSED/);
  const refusing = new GpRpcSession(() => fakeTransport(() => ({ ok: false, error: { code: "GP_RPC_HELLO_REFUSED" } })));
  await assert.rejects(() => refusing.hello(), /GP_RPC_HELLO_REFUSED/);
  await refusing.close();
});

test("gpReplayCli: argument contract, then a full run on a fake session writes the report, the best theta and its checkpoint document and never selects on the test split", async () => {
  assert.throws(() => parseReplayArgs([], {}), /MISSING_ARGUMENT/);
  assert.throws(() => parseReplayArgs(["--history", "h", "--out", "o"], {}), /GP_CONFIG_REQUIRED/);
  assert.throws(() => parseReplayArgs(["--history", "h", "--out", "o", "--gp-config", "c"], {}), /GP_ENTRY_REQUIRED/);
  assert.throws(() => parseReplayArgs(["--history", "h", "--out", "o", "--gp-config", "c", "--gp-entry", "e", "--split", "x"], {}), /GP_REPLAY_INVALID/);
  assert.throws(() => parseReplayArgs(["--history", "h", "--out", "o", "--gp-config", "c", "--gp-entry", "e", "--thetas", "-1"], {}), /INVALID_ARGUMENT/);
  assert.throws(() => parseReplayArgs(["--bogus", "1"], {}), /UNKNOWN_ARGUMENT/);
  const dir = scratchDir("mw-replay-");
  const CK = "graphpolicy.checkpoint.c1:" + "c".repeat(64);
  writeFileSync(join(dir, "program.json"), JSON.stringify({ id: "p", parameters: { Ws: { shape: [2, 1] } } }));
  writeFileSync(join(dir, "theta.json"), JSON.stringify({ parameters: { Ws: [1, 0] } }));
  writeFileSync(join(dir, "schema.json"), "{}");
  writeFileSync(join(dir, "config.json"), JSON.stringify({ schema: "mw.graph-policy-config.v1", id: "t", program: "program.json", theta: "theta.json", checkpoint: CK, graphSchema: "schema.json", port: "beadScore", candidateType: "beads", temperature: 1, timeoutMs: 5000 }));
  writeFileSync(join(dir, "history.json"), JSON.stringify(H));
  const files = new Map<string, string>();
  // The fake scorer prefers the oldest candidate for theta0 and the chosen bead for every perturbation, so the best arm is never theta0.
  const transport = fakeTransport(req => {
    if (req.method === "hello" || req.method === "close") return { ok: true, result: {} };
    if (req.method === "compile") return { ok: true, result: { valid: true, programDigest: "7".repeat(64) } };
    const theta = req.params["theta"] as { Ws: number[] }; const graph = req.params["graph"] as { candidates: { beads: { members: string[] } }; observation: { revisions: string[] } };
    const members = graph.candidates.beads.members; const chosen = graph.observation.revisions[1]!.replace("context:", "").split("@")[0]!;
    const rows = members.map((id, index) => [id, [theta.Ws[0] === 1 && theta.Ws[1] === 0 ? -index : id === chosen ? 1 : 0]]);
    return { ok: true, result: { valid: true, Y: { beadScore: { rows } }, receipt: { duration_ms: 1 } } };
  });
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  let code: number;
  try { code = await gpReplayCli(["--history", join(dir, "history.json"), "--gp-config", join(dir, "config.json"), "--gp-entry", "/gp.js", "--out", "/out", "--split", "2026-10-01T04:30:00Z", "--thetas", "2", "--seed", "3"], { transport: () => transport, env: {}, writeFile: (path, text) => files.set(path, text), now: () => "2026-10-21T00:00:00Z" }); }
  finally { process.stdout.write = original; }
  assert.equal(code, 0);
  const report = JSON.parse(files.get("/out/report.json") ?? "{}") as { schema: string; contexts: { total: number; train: number; test: number }; selection: { best: string }; arms: { arm: string; train: { top1: number }; test: { top1: number } }[]; gp: { evaluations: number } };
  assert.equal(report.schema, "mw.graph-policy-replay-report.v1"); assert.deepEqual([report.contexts.total, report.contexts.train, report.contexts.test], [4, 3, 1]);
  // theta0 plus four single-unit probes (±2 cells) plus two perturbations, each evaluated on the four contexts.
  assert.match(report.selection.best, /^theta-(seed300[12]|unit)/); assert.equal(report.gp.evaluations, 4 * 7, "one evaluate per context per arm; compile is not an evaluation");
  assert.equal((report.selection as unknown as { probes: number }).probes, 4);
  const theta0 = report.arms.find(a => a.arm === "theta0")!; const best = report.arms.find(a => a.arm === report.selection.best)!;
  assert.ok(best.train.top1 > theta0.train.top1); assert.equal(best.test.top1, 1);
  assert.ok(report.arms.some(a => a.arm === "baseline:priority-first") && report.arms.some(a => a.arm === "baseline:uniform"));
  assert.equal((report.arms.find(a => a.arm === "baseline:uniform") as unknown as { train: { meanLogLikelihood: number | null } }).train.meanLogLikelihood, null, "a deterministic rule has no log-likelihood");
  assert.ok(report.arms.some(a => a.arm === "theta-unit0-") && report.arms.some(a => a.arm === "theta-unit1+"));
  const bestTheta = JSON.parse(files.get("/out/best-theta.json") ?? "{}") as { parameters: { Ws: number[] } };
  assert.equal(bestTheta.parameters.Ws.length, 2); assert.notDeepEqual(bestTheta.parameters.Ws, [1, 0], "theta0 itself is never the best arm under this fake");
  const ck = JSON.parse(files.get("/out/best-checkpoint.v1.json") ?? "{}") as { schema: string; program_digest: string; cells: { Ws: { shape: number[]; words: string[] } } };
  assert.equal(ck.schema, "graphpolicy.checkpoint.v1"); assert.equal(ck.program_digest, "7".repeat(64), "the program identity comes from gp's own compile reply");
  assert.equal((report as unknown as { program: string }).program, "graphpolicy.program.c1:" + "7".repeat(64)); assert.deepEqual(ck.cells.Ws.shape, [2, 1]); assert.ok(ck.cells.Ws.words.every(w => /^[0-9a-f]{8}$/.test(w)));
  assert.match(written.join(""), /"mode":"gp-replay"/);
  assert.ok(readFileSync(join(dir, "history.json"), "utf8").length > 0);
  // A worker that refuses compile stops the run before any evaluation: no report is written.
  const refusing = fakeTransport(req => req.method === "compile" ? { ok: false, error: { code: "GP_RPC_PARAMS_MALFORMED" } } : { ok: true, result: {} });
  const unwritten = new Map<string, string>();
  const silent = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  try {
    await assert.rejects(() => gpReplayCli(["--history", join(dir, "history.json"), "--gp-config", join(dir, "config.json"), "--gp-entry", "/gp.js", "--out", "/out2", "--thetas", "1"], { transport: () => refusing, env: {}, writeFile: (path, text) => unwritten.set(path, text) }), /GP_RPC_COMPILE_REFUSED/);
  } finally { process.stdout.write = silent; }
  assert.equal(unwritten.size, 0);
});

test("gpReplayCli selects the best arm on the train split when the train and test winners are opposed", async () => {
  const dir = scratchDir("mw-replay-opposed-");
  writeFileSync(join(dir, "program.json"), JSON.stringify({ id: "p", parameters: { Ws: { shape: [2, 1] } } }));
  // theta0 [0.25, 0.25] differs from every single-unit probe (+-1 on one cell), so the arm names stay unambiguous.
  writeFileSync(join(dir, "theta.json"), JSON.stringify({ parameters: { Ws: [0.25, 0.25] } }));
  writeFileSync(join(dir, "schema.json"), "{}");
  writeFileSync(join(dir, "config.json"), JSON.stringify({ schema: "mw.graph-policy-config.v1", id: "t", program: "program.json", theta: "theta.json", checkpoint: "graphpolicy.checkpoint.c1:" + "c".repeat(64), graphSchema: "schema.json", port: "beadScore", candidateType: "beads", temperature: 1, timeoutMs: 5000 }));
  writeFileSync(join(dir, "history.json"), JSON.stringify(H));
  // The chosen bead scores Ws[0] on a train context (A, B, F) and -Ws[0] on the lone test context (C); every other bead scores 0.
  // So theta-unit0+ wins the train split and loses the test split, theta-unit0- does the opposite.
  const transport = fakeTransport(req => {
    if (req.method === "hello" || req.method === "close") return { ok: true, result: {} };
    if (req.method === "compile") return { ok: true, result: { valid: true, programDigest: "7".repeat(64) } };
    const theta = req.params["theta"] as { Ws: number[] }; const graph = req.params["graph"] as { candidates: { beads: { members: string[] } }; observation: { revisions: string[] } };
    const chosen = graph.observation.revisions[1]!.replace("context:", "").split("@")[0]!;
    const rows = graph.candidates.beads.members.map(id => [id, [id === chosen ? (chosen === "C" ? -theta.Ws[0]! : theta.Ws[0]!) : 0]]);
    return { ok: true, result: { valid: true, Y: { beadScore: { rows } }, receipt: { duration_ms: 1 } } };
  });
  const files = new Map<string, string>();
  const original = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  let code: number;
  try { code = await gpReplayCli(["--history", join(dir, "history.json"), "--gp-config", join(dir, "config.json"), "--gp-entry", "/gp.js", "--out", "/out", "--split", "2026-10-01T04:30:00Z", "--thetas", "0"], { transport: () => transport, env: {}, writeFile: (path, text) => files.set(path, text), now: () => "2026-10-21T00:00:00Z" }); }
  finally { process.stdout.write = original; }
  assert.equal(code, 0);
  const report = JSON.parse(files.get("/out/report.json") ?? "{}") as { selection: { best: string }; arms: { arm: string; train: { meanLogLikelihood: number | null; top1: number }; test: { meanLogLikelihood: number | null; top1: number } }[] };
  const arm = (name: string) => report.arms.find(a => a.arm === name)!;
  // The fixture must separate the splits, otherwise a test-split selector would pass for the wrong reason.
  assert.equal(arm("theta-unit0+").train.top1, 1); assert.equal(arm("theta-unit0+").test.top1, 0);
  assert.equal(arm("theta-unit0-").train.top1, 0); assert.equal(arm("theta-unit0-").test.top1, 1);
  assert.ok(arm("theta-unit0-").test.meanLogLikelihood! > arm("theta-unit0+").test.meanLogLikelihood!, "the test-split winner is theta-unit0-");
  assert.equal(report.selection.best, "theta-unit0+", "selection follows the train split; the arm that wins only the test split is not selected");
  assert.notEqual(report.selection.best, "theta-unit0-");
  const bestTheta = JSON.parse(files.get("/out/best-theta.json") ?? "{}") as { parameters: { Ws: number[] } };
  assert.deepEqual(bestTheta.parameters.Ws, [1, 0], "the written best theta is the train winner");
});

const issue = (id: string, fields: Record<string, unknown> = {}) => ({ id, status: "open", issue_type: "task", priority: 2, created_at: "2026-10-02T00:00:00Z", started_at: null, closed_at: null, assignee: null, dependencies: [], ...fields });

test("a bead closed exactly at a claim instant is closed at that instant: it leaves that claim's support and no longer blocks a bead it blocked", () => {
  const issues = [
    issue("X", { status: "closed", closed_at: "2026-10-02T03:00:00Z" }),
    issue("W", { dependencies: [{ issue_id: "W", depends_on_id: "X", type: "blocks", created_at: "2026-10-02T00:30:00Z" }] }),
    issue("Y", { started_at: "2026-10-02T03:00:00Z", status: "in_progress", assignee: "x" }),
    issue("Z"),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.equal(contexts.length, 1); assert.deepEqual(dropped, []);
  assert.deepEqual(contexts[0]!.support, ["W", "Y", "Z"], "X closes at the claim instant so it is not a candidate, and W (blocked by X until then) is unblocked at that same instant");
});

test("dependency_count counts only the edges created by the claim instant: a later edge leaves the earlier claim's count unchanged and raises the later claim's", () => {
  const issues = [
    issue("Q", { dependencies: [{ issue_id: "Q", depends_on_id: "R", type: "related", created_at: "2026-10-02T02:00:00Z" }] }),
    issue("R", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
    issue("S", { status: "in_progress", started_at: "2026-10-02T03:00:00Z", assignee: "y" }),
  ];
  const { contexts } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts.map(c => c.chosen), ["R", "S"]);
  const countAt = (chosen: string): number | null | undefined => contexts.find(c => c.chosen === chosen)!.ready.find(r => r.id === "Q")!.dependency_count;
  assert.equal(countAt("R"), 0, "the Q->R edge is created at 02:00, after the 01:00 claim");
  assert.equal(countAt("S"), 1, "the same edge counts at the 03:00 claim");
});

test("gpReplayCli breaks a tie on the train log-likelihood by the lexicographically smaller arm name", async () => {
  const dir = scratchDir("mw-replay-tie-");
  writeFileSync(join(dir, "program.json"), JSON.stringify({ id: "p", parameters: { Ws: { shape: [2, 1] } } }));
  writeFileSync(join(dir, "theta.json"), JSON.stringify({ parameters: { Ws: [0.25, 0.25] } }));
  writeFileSync(join(dir, "schema.json"), "{}");
  writeFileSync(join(dir, "config.json"), JSON.stringify({ schema: "mw.graph-policy-config.v1", id: "t", program: "program.json", theta: "theta.json", checkpoint: "graphpolicy.checkpoint.c1:" + "c".repeat(64), graphSchema: "schema.json", port: "beadScore", candidateType: "beads", temperature: 1, timeoutMs: 5000 }));
  writeFileSync(join(dir, "history.json"), JSON.stringify(H));
  // Every arm scores every candidate 0, so all five learned arms tie exactly; the name order decides: "theta-unit0+" < "theta-unit0-" < "theta-unit1+" < "theta-unit1-" < "theta0".
  const transport = fakeTransport(req => {
    if (req.method === "hello" || req.method === "close") return { ok: true, result: {} };
    if (req.method === "compile") return { ok: true, result: { valid: true, programDigest: "7".repeat(64) } };
    const graph = req.params["graph"] as { candidates: { beads: { members: string[] } } };
    return { ok: true, result: { valid: true, Y: { beadScore: { rows: graph.candidates.beads.members.map(id => [id, [0]]) } }, receipt: { duration_ms: 1 } } };
  });
  const files = new Map<string, string>();
  const original = process.stdout.write;
  process.stdout.write = (() => true) as typeof process.stdout.write;
  let code: number;
  try { code = await gpReplayCli(["--history", join(dir, "history.json"), "--gp-config", join(dir, "config.json"), "--gp-entry", "/gp.js", "--out", "/out", "--split", "2026-10-01T04:30:00Z", "--thetas", "0"], { transport: () => transport, env: {}, writeFile: (path, text) => files.set(path, text), now: () => "2026-10-21T00:00:00Z" }); }
  finally { process.stdout.write = original; }
  assert.equal(code, 0);
  const report = JSON.parse(files.get("/out/report.json") ?? "{}") as { selection: { best: string }; arms: { arm: string; train: { meanLogLikelihood: number | null } }[] };
  const learned = report.arms.filter(a => a.arm.startsWith("theta"));
  assert.deepEqual(learned.map(a => a.arm), ["theta0", "theta-unit0+", "theta-unit0-", "theta-unit1+", "theta-unit1-"]);
  assert.equal(new Set(learned.map(a => a.train.meanLogLikelihood)).size, 1, "the fixture must tie every learned arm exactly, otherwise the name order is not what decides");
  assert.equal(report.selection.best, "theta-unit0+", "the lexicographically smallest tied arm wins");
  const bestTheta = JSON.parse(files.get("/out/best-theta.json") ?? "{}") as { parameters: { Ws: number[] } };
  assert.deepEqual(bestTheta.parameters.Ws, [1, 0]);
});

test("a blocks edge created exactly at a claim instant blocks at that instant (edge visibility is created_at <= t, inclusive)", () => {
  const issues = [
    issue("B"),
    issue("K", { dependencies: [{ issue_id: "K", depends_on_id: "B", type: "blocks", created_at: "2026-10-02T01:00:00Z" }] }),
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.equal(contexts.length, 1); assert.deepEqual(dropped, []);
  assert.deepEqual(contexts[0]!.support, ["B", "Y"], "K's blocks edge to open B is created at 01:00 sharp, so K is blocked at Y's 01:00 claim");
});

test("a claim exactly at the split instant belongs to the test split and train is strictly before it", () => {
  const { contexts } = buildDecisionContexts(parseHistory(AT), { splitAt: "2026-10-02T03:00:00Z" });
  assert.deepEqual(contexts.map(c => [c.chosen, c.split]), [["Y", "train"], ["Z", "test"]], "Z's 03:00 claim is at the split instant");
});

test("a ready row's dependencies project only the edges that exist by the claim instant, including one created exactly at it", () => {
  const { contexts } = buildDecisionContexts(parseHistory(AT), { splitAt: "2026-10-03T00:00:00Z" });
  const depsAt = (index: number) => contexts[index]!.ready.find(r => r.id === "Q")!.dependencies;
  assert.deepEqual(depsAt(0), [{ issue_id: "Q", depends_on_id: "Y", type: "discovered-from" }], "at Y's 01:00 claim the Q->Y edge (01:00 sharp) is projected and the Q->R edge (02:00) is not yet");
  assert.deepEqual(depsAt(1), [{ issue_id: "Q", depends_on_id: "R", type: "discovered-from" }], "at Z's 03:00 claim Y is out of the support and the Q->R edge exists");
});

test("an edge without created_at counts at every claim instant: dependency_count, dependent_count and the projected dependencies", () => {
  const issues = [
    issue("Q", { dependencies: [{ issue_id: "Q", depends_on_id: "R", type: "related", created_at: null }] }),
    issue("R", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
  ];
  const { contexts } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts.map(c => c.support), [["Q", "R"]]);
  const row = (id: string) => contexts[0]!.ready.find(r => r.id === id)!;
  assert.equal(row("Q").dependency_count, 1, "an undated edge is treated as existing at the claim instant");
  assert.equal(row("R").dependent_count, 1);
  assert.deepEqual(row("Q").dependencies, [{ issue_id: "Q", depends_on_id: "R", type: "related" }]);
});

test("a blocks edge created after the claim instant does not block at that claim: K stays in the 01:00 support although its edge to open B arrives at 02:00", () => {
  const issues = [
    issue("B"),
    issue("K", { dependencies: [{ issue_id: "K", depends_on_id: "B", type: "blocks", created_at: "2026-10-02T02:00:00Z" }] }),
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.equal(contexts.length, 1); assert.deepEqual(dropped, []);
  assert.deepEqual(contexts[0]!.support, ["B", "K", "Y"], "the K->B edge does not exist yet at 01:00, so K is unblocked and a candidate");
});

test("a blocks edge without created_at blocks at every claim instant, like any other undated edge", () => {
  const issues = [
    issue("B"),
    issue("K", { dependencies: [{ issue_id: "K", depends_on_id: "B", type: "blocks", created_at: null }] }),
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.equal(contexts.length, 1); assert.deepEqual(dropped, []);
  assert.deepEqual(contexts[0]!.support, ["B", "Y"], "an undated K->B blocks edge is treated as existing at 01:00 and B is still open, so K is blocked");
});

test("a claim whose chosen bead is blocked at its own start instant is dropped and counted, not turned into a context", () => {
  const issues = [
    issue("B"),
    issue("K", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x", dependencies: [{ issue_id: "K", depends_on_id: "B", type: "blocks", created_at: "2026-10-02T00:30:00Z" }] }),
    issue("Z"),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts, [], "B and Z would make two candidates, but K was claimed while blocked by open B (edge 00:30)");
  assert.deepEqual(dropped, [{ reason: "chosen fails its own candidate predicate at its start instant", count: 1 }]);
});

test("a claim with fewer than two candidates is dropped and counted under the default minSupport of 2", () => {
  const issues = [issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" })];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts, [], "Y is the only candidate at its own claim");
  assert.deepEqual(dropped, [{ reason: "fewer than 2 candidates", count: 1 }]);
});

test("a chosen bead whose own blocks edge to open B is created after its claim instant is kept: the self-check applies the same created_at rule as the candidate predicate", () => {
  const issues = [
    issue("B"),
    issue("K", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x", dependencies: [{ issue_id: "K", depends_on_id: "B", type: "blocks", created_at: "2026-10-02T02:00:00Z" }] }),
    issue("Z"),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(dropped, [], "K's K->B edge arrives at 02:00, after K's 01:00 claim, so K was not blocked when it was claimed");
  assert.equal(contexts.length, 1);
  assert.equal(contexts[0]!.chosen, "K");
  assert.deepEqual(contexts[0]!.support, ["B", "K", "Z"], "K stays in its own support next to B and Z");
});

test("an undated blocks edge does not block when its blocker closed before the claim instant or was created after it", () => {
  const closedBefore = [
    issue("X", { status: "closed", closed_at: "2026-10-02T00:30:00Z" }),
    issue("K", { dependencies: [{ issue_id: "K", depends_on_id: "X", type: "blocks", created_at: null }] }),
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
    issue("Z"),
  ];
  const a = buildDecisionContexts(parseHistory(closedBefore), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(a.dropped, []);
  assert.deepEqual(a.contexts.map(c => c.support), [["K", "Y", "Z"]], "X closed at 00:30, before the 01:00 claim, so the undated K->X edge no longer blocks K and X itself is not a candidate");
  const createdAfter = [
    issue("W", { created_at: "2026-10-02T02:00:00Z" }),
    issue("K", { dependencies: [{ issue_id: "K", depends_on_id: "W", type: "blocks", created_at: null }] }),
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
  ];
  const b = buildDecisionContexts(parseHistory(createdAfter), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(b.dropped, []);
  assert.deepEqual(b.contexts.map(c => c.support), [["K", "Y"]], "W is created at 02:00, after the 01:00 claim, so it is not open at the claim and the undated K->W edge does not block K");
});

test("repeated drops under one reason accumulate into one count under the default minSupport of 2", () => {
  const issues = [
    issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
    issue("V", { status: "in_progress", created_at: "2026-10-02T02:00:00Z", started_at: "2026-10-02T03:00:00Z", assignee: "y" }),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-04T00:00:00Z" });
  assert.deepEqual(contexts, [], "V does not exist at Y's 01:00 claim and Y is already claimed at V's 03:00 claim, so each claim has one candidate");
  assert.deepEqual(dropped, [{ reason: "fewer than 2 candidates", count: 2 }], "two sole-candidate claims make one reason with count 2");
});

test("an explicit minSupport of 3 drops a two-candidate claim and names 3 in the reason", () => {
  const issues = [issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" }), issue("Z")];
  const dflt = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(dflt.contexts.map(c => c.support), [["Y", "Z"]], "control: under the default minSupport of 2 the two-candidate claim is a context");
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z", minSupport: 3 });
  assert.deepEqual(contexts, []);
  assert.deepEqual(dropped, [{ reason: "fewer than 3 candidates", count: 1 }]);
});

test("an explicit minSupport of 1 admits a sole-candidate claim as a context", () => {
  const issues = [issue("Y", { status: "in_progress", started_at: "2026-10-02T01:00:00Z", assignee: "x" })];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z", minSupport: 1 });
  assert.deepEqual(dropped, []);
  assert.deepEqual(contexts.map(c => [c.chosen, c.support]), [["Y", ["Y"]]], "the lower threshold is honoured rather than raised to 2");
});

test("a chosen bead created after its own start instant is dropped by the self-check, not turned into a context", () => {
  const issues = [
    issue("B"),
    issue("K", { status: "in_progress", created_at: "2026-10-02T02:00:00Z", started_at: "2026-10-02T01:00:00Z", assignee: "x" }),
    issue("Z"),
  ];
  const { contexts, dropped } = buildDecisionContexts(parseHistory(issues), { splitAt: "2026-10-03T00:00:00Z" });
  assert.deepEqual(contexts, [], "K is created at 02:00 but started at 01:00 (a data gap), although B and Z would make two candidates");
  assert.deepEqual(dropped, [{ reason: "chosen fails its own candidate predicate at its start instant", count: 1 }]);
});
