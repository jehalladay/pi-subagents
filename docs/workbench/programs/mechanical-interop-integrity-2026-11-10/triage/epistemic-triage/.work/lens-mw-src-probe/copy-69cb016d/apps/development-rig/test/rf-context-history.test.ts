import test from "node:test";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { RfRenderRefusal, RfTransportUnacknowledged, renderTaskContext, resolveRenderHandoff } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";

// RFCA-MWX03-R001: history/explain choose a recorded render; the executor is injected and answers from captured-shape
// fixtures, so nothing here counts as a native rf PASS.
const root = "/tmp/mw-rf-history", task = "Fix parser", base = "a".repeat(40), model = "claude-opus-5", session = "rfs_sess1";
const sourceText = "Task: " + task + "\nSource revision: " + base;
const digestOf = (text: string) => "sha256:" + createHash("sha256").update(text, "utf8").digest("hex");
const graph = "sha256:" + "c".repeat(64), outDigest = "sha256:" + "b".repeat(64);
const shownText = sourceText + "\n";
const envelope = (command: string, result: unknown) => ({ schema: "reactive-fiber.cli/v1", ok: true, command, workspace: { root, id: "rfw-1" }, result, diagnostics: [] });
const renderResult = (renderId: string, text = shownText) => ({
  render_id: renderId, session_id: session, workspace_id: "rfw_1", actor: "agent:camshaft-oe", output: { text, digest: outDigest },
  budget: { capability_snapshot: { model_id: model, verified: true }, formula_terms: { available_context_tokens: 512 } },
  provenance: { graph_revision_id: graph },
});
// context show keeps the whole record and carries no provenance wrapper (ADR-RFC-057 sub-decision b).
const showResult = (renderId: string, text = shownText) => {
  const { provenance: _drop, ...rest } = renderResult(renderId, text);
  return { ...rest, record: { render_id: renderId, graph_revision_id: graph, cli_version: "0.1.700", sdk_versions: { fiber: "0.1.0" } } };
};
const row = (renderId: string, patch: Record<string, unknown> = {}) => ({
  id: renderId, render_id: renderId, session_id: session, status: "success", requested_model_id: model,
  replayability: "replayable_exact", task_digest: digestOf(sourceText), ...patch,
});
const explain = (renderId: string, digest = digestOf(sourceText), replayability = "replayable_exact") =>
  envelope("context.explain", { render_id: renderId, judge_context: { task_digest: digest }, report: { trace_completeness: { replayability } } });
const ok = (doc: unknown) => ({ stdout: JSON.stringify(doc), stderr: "", exitCode: 0 });
const verb = (argv: readonly string[]) => argv[0] + " " + argv[1];
const valueOf = (argv: readonly string[], flag: string) => argv[argv.indexOf(flag) + 1];

const versionReply = ok({ schema: "reactive-fiber.cli/v1", ok: true, command: "version", result: { version: "0.1.883", sdk_versions: { fiber: "0.1.0" } } });
interface Script { history?: unknown; explains?: Record<string, unknown>; show?: Record<string, unknown>; render?: unknown }
function recorder(script: Script) {
  const calls: string[][] = [], versionCalls: string[][] = [];
  const exec: RfExecutor = async argv => {
    if (argv[0] === "--json" && argv[1] === "--version") { versionCalls.push([...argv]); return versionReply; }
    calls.push([...argv]);
    const v = verb(argv);
    if (v === "context history") return script.history as never;
    if (v === "context explain") return (script.explains ?? {})[argv[2]!] as never;
    if (v === "context show") return (script.show ?? {})[argv[2]!] as never;
    if (v === "context render") return script.render as never;
    throw new Error("unscripted rf verb " + v);
  };
  return { calls, versionCalls, exec };
}
const freshRender = ok(envelope("context render", renderResult("rfr-fresh")));

test("(a) with a carried session the first call is context history --session --limit N --json --workspace, limit explicit", async () => {
  const r = recorder({ history: ok(envelope("context.history", { items: [] })), render: freshRender });
  await renderTaskContext(root, task, base, model, r.exec, { sessionId: session, historyLimit: 7 });
  const first = r.calls[0]!;
  assert.deepEqual(first.slice(0, 2), ["context", "history"]);
  assert.equal(valueOf(first, "--session"), session);
  assert.equal(valueOf(first, "--limit"), "7");
  assert.ok(first.includes("--json"));
  assert.equal(valueOf(first, "--workspace"), root);
  assert.ok(!first.includes("--yes"), "a read-only lookup never carries --yes");
  const defaulted = recorder({ history: ok(envelope("context.history", { items: [] })), render: freshRender });
  await renderTaskContext(root, task, base, model, defaulted.exec, { sessionId: session });
  assert.equal(valueOf(defaulted.calls[0]!, "--limit"), "50", "the default is still an explicit argv value");
});

test("(b) an explained digest equal to sha256 of the exact task bytes reuses via exactly one show and zero renders", async () => {
  const r = recorder({
    history: ok(envelope("context.history", { items: [row("rfr-old")] })),
    explains: { "rfr-old": ok(explain("rfr-old")) },
    show: { "rfr-old": ok(envelope("context show", showResult("rfr-old"))) },
  });
  const out = await renderTaskContext(root, task, base, model, r.exec, { sessionId: session });
  assert.equal(r.calls.filter(c => verb(c) === "context show").length, 1);
  assert.equal(r.calls.filter(c => verb(c) === "context render").length, 0);
  assert.deepEqual(r.calls.find(c => verb(c) === "context show")!.slice(0, 3), ["context", "show", "rfr-old"]);
  assert.ok(!r.calls.some(c => c.includes("--yes")));
  assert.equal(out.source, "reused");
  assert.equal(out.evidence?.id, "rfr-old");
  assert.equal(out.sessionId, session);
  assert.equal(out.graphRevision, graph, "graph revision read from result.record on the show form");
  assert.equal(out.text, shownText);
});

test("(c) a one-byte task difference skips the candidate and renders once with --audience model and --session", async () => {
  const r = recorder({
    history: ok(envelope("context.history", { items: [row("rfr-old")] })),
    explains: { "rfr-old": ok(explain("rfr-old", digestOf(sourceText + " "))) },
    render: freshRender,
  });
  const out = await renderTaskContext(root, task, base, model, r.exec, { sessionId: session });
  const renders = r.calls.filter(c => verb(c) === "context render");
  assert.equal(renders.length, 1);
  assert.equal(valueOf(renders[0]!, "--audience"), "model");
  assert.equal(valueOf(renders[0]!, "--session"), session);
  assert.equal(r.calls.filter(c => verb(c) === "context show").length, 0);
  assert.equal(out.source, "rendered");
  assert.equal(out.evidence?.id, "rfr-fresh");
  assert.equal(out.sessionId, session);
});

test("a candidate with another model, a non-success status or non-exact replayability is skipped without an explain; first match wins", async () => {
  const r = recorder({
    history: ok(envelope("context.history", { items: [
      row("rfr-model", { requested_model_id: "other" }),
      row("rfr-failed", { status: "failed" }),
      row("rfr-lossy", { replayability: "replayable_partial" }),
      row("rfr-explain-lossy"),
      row("rfr-win"),
      row("rfr-after"),
    ] })),
    explains: { "rfr-explain-lossy": ok(explain("rfr-explain-lossy", digestOf(sourceText), "not_replayable")), "rfr-win": ok(explain("rfr-win")) },
    show: { "rfr-win": ok(envelope("context show", showResult("rfr-win"))) },
  });
  const out = await renderTaskContext(root, task, base, model, r.exec, { sessionId: session });
  const explained = r.calls.filter(c => verb(c) === "context explain").map(c => c[2]);
  assert.deepEqual(explained, ["rfr-explain-lossy", "rfr-win"], "at most one explain per remaining candidate, stopping at the first match");
  assert.equal(out.evidence?.id, "rfr-win");
  assert.equal(out.source, "reused");
});

test("(d) without a session id no history lookup is attempted, the render names --audience model and no --session, the fresh session is reported", async () => {
  const r = recorder({ render: freshRender });
  const out = await renderTaskContext(root, task, base, model, r.exec);
  assert.equal(r.calls.length, 1);
  assert.equal(verb(r.calls[0]!), "context render");
  assert.equal(valueOf(r.calls[0]!, "--audience"), "model");
  assert.ok(!r.calls[0]!.includes("--session"));
  assert.equal(out.source, "rendered");
  assert.equal(out.sessionId, session);
});

test("(e) a history transport failure surfaces as the transport class with zero renders; an exit-3 envelope falls through to one render", async () => {
  const lost = recorder({ history: { stdout: "", stderr: "timed out", exitCode: 1, transport: "ETIMEDOUT" }, render: freshRender });
  await assert.rejects(() => renderTaskContext(root, task, base, model, lost.exec, { sessionId: session }),
    (e: unknown) => e instanceof RfTransportUnacknowledged && e.transport === "ETIMEDOUT");
  assert.equal(lost.calls.filter(c => verb(c) === "context render").length, 0);
  assert.equal(lost.calls.length, 1, "no re-issue of a read-only lookup into a render");
  const notFound = recorder({
    history: { stdout: JSON.stringify({ schema: "reactive-fiber.cli/v1", ok: false, diagnostics: [{ code: "RF_NOT_FOUND" }] }), stderr: "", exitCode: 3 },
    render: freshRender,
  });
  const out = await renderTaskContext(root, task, base, model, notFound.exec, { sessionId: session });
  assert.equal(notFound.calls.filter(c => verb(c) === "context render").length, 1);
  assert.equal(out.source, "rendered");
  const refused = recorder({ history: { stdout: "", stderr: "storage down", exitCode: 6 }, render: freshRender });
  await assert.rejects(() => renderTaskContext(root, task, base, model, refused.exec, { sessionId: session }),
    (e: unknown) => e instanceof RfRenderRefusal && e.exitCode === 6);
  assert.equal(refused.calls.filter(c => verb(c) === "context render").length, 0);
});

test("an explain transport failure also surfaces and never falls through to a render", async () => {
  const r = recorder({
    history: ok(envelope("context.history", { items: [row("rfr-old")] })),
    explains: { "rfr-old": { stdout: "", stderr: "", exitCode: 1, transport: "killed" } },
    render: freshRender,
  });
  await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), RfTransportUnacknowledged);
  assert.equal(r.calls.filter(c => verb(c) === "context render").length, 0);
});

test("(f) a reused render whose shown text lacks the task or revision literal is refused, not silently re-rendered", async () => {
  for (const text of ["Task: Fix parser\n", "Source revision: " + base + "\n", "unrelated\n"]) {
    const r = recorder({
      history: ok(envelope("context.history", { items: [row("rfr-old")] })),
      explains: { "rfr-old": ok(explain("rfr-old")) },
      show: { "rfr-old": ok(envelope("context show", showResult("rfr-old", text))) },
      render: freshRender,
    });
    await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), /RF_CONTEXT_UNESTABLISHED/);
    assert.equal(r.calls.filter(c => verb(c) === "context render").length, 0);
  }
});

test("a show envelope with no record graph revision is refused on the reuse arm", async () => {
  const bad = showResult("rfr-old") as { record?: unknown };
  delete bad.record;
  const r = recorder({
    history: ok(envelope("context.history", { items: [row("rfr-old")] })),
    explains: { "rfr-old": ok(explain("rfr-old")) },
    show: { "rfr-old": ok(envelope("context show", bad)) },
  });
  await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), /RF_CONTEXT_UNESTABLISHED/);
});

test("a malformed or unsuccessful history envelope is refused rather than treated as empty", async () => {
  for (const history of [{ stdout: "not json", stderr: "", exitCode: 0 }, ok({ schema: "reactive-fiber.cli/v1", ok: false, result: { items: [] } }), ok(envelope("context.history", { rows: [] }))]) {
    const r = recorder({ history, render: freshRender });
    await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), /RF_RENDER_UNESTABLISHED/);
    assert.equal(r.calls.filter(c => verb(c) === "context render").length, 0);
  }
});

test("invalid session id or history limit refuses before any rf call", async () => {
  for (const options of [{ sessionId: " " }, { sessionId: session, historyLimit: 0 }, { sessionId: session, historyLimit: 501 }, { sessionId: session, historyLimit: 1.5 }]) {
    const r = recorder({ render: freshRender });
    await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, options), /RF_CONTEXT_INPUT_INVALID/);
    assert.equal(r.calls.length, 0);
  }
});

test("(g) the handoff resolves an id through show and re-runs the grounding checks, never trusting carried text", async () => {
  const r = recorder({ show: { "rfr-old": ok(envelope("context show", showResult("rfr-old"))) } });
  const out = await resolveRenderHandoff(root, { renderId: "rfr-old", sessionId: session }, task, base, model, r.exec);
  assert.deepEqual(r.calls.map(verb), ["context show"]);
  assert.equal(out.source, "reused");
  assert.equal(out.evidence?.id, "rfr-old");
  const stale = recorder({ show: { "rfr-old": ok(envelope("context show", showResult("rfr-old", "Task: other\nSource revision: " + base))) } });
  await assert.rejects(() => resolveRenderHandoff(root, { renderId: "rfr-old" }, task, base, model, stale.exec), /RF_CONTEXT_UNESTABLISHED/);
  await assert.rejects(() => resolveRenderHandoff(root, { renderId: " " }, task, base, model, r.exec), /RF_CONTEXT_INPUT_INVALID/);
});

test("(identity) a reused render reports the recorded actor, workspace id and CLI with zero rf --version calls; a fresh render asks the installed CLI once", async () => {
  const reused = recorder({ history: ok(envelope("context.history", { items: [row("rfr-old")] })), explains: { "rfr-old": ok(explain("rfr-old")) }, show: { "rfr-old": ok(envelope("context.show", showResult("rfr-old"))) } });
  const got = await renderTaskContext(root, task, base, model, reused.exec, { sessionId: session, actor: "agent:someone-else" });
  assert.equal(got.source, "reused");
  assert.equal(got.rfWorkspaceId, "rfw_1");
  assert.equal(got.actor, "agent:camshaft-oe", "the recorded actor, not the requested one");
  assert.deepEqual(got.cli, { version: "0.1.700", sdkVersions: { fiber: "0.1.0" } });
  assert.equal(reused.versionCalls.length, 0);
  const fresh = recorder({ history: ok(envelope("context.history", { items: [] })), render: freshRender });
  const made = await renderTaskContext(root, task, base, model, fresh.exec, { sessionId: session });
  assert.equal(made.source, "rendered");
  assert.deepEqual(made.cli, { version: "0.1.883", sdkVersions: { fiber: "0.1.0" } });
  assert.equal(fresh.versionCalls.length, 1);
});
test("(identity) a recorded render without cli_version provenance is refused as RF_CONTEXT_UNESTABLISHED", async () => {
  const noCli = (renderId: string) => { const r = showResult(renderId) as { record: Record<string, unknown> }; delete r.record["cli_version"]; return r; };
  const r = recorder({ history: ok(envelope("context.history", { items: [row("rfr-old")] })), explains: { "rfr-old": ok(explain("rfr-old")) }, show: { "rfr-old": ok(envelope("context.show", noCli("rfr-old"))) } });
  await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), /RF_CONTEXT_UNESTABLISHED: recorded render carries no rf CLI version provenance/);
});
test("(identity) a handoff resolves to the recorded identity and a record missing workspace_id is refused", async () => {
  const good = recorder({ show: { "rfr-h": ok(envelope("context.show", showResult("rfr-h"))) } });
  const got = await resolveRenderHandoff(root, { renderId: "rfr-h" }, task, base, model, good.exec);
  assert.equal(got.actor, "agent:camshaft-oe");
  assert.equal(got.cli.version, "0.1.700");
  const bare = showResult("rfr-h") as Record<string, unknown>; delete bare["workspace_id"];
  const bad = recorder({ show: { "rfr-h": ok(envelope("context.show", bare)) } });
  await assert.rejects(() => resolveRenderHandoff(root, { renderId: "rfr-h" }, task, base, model, bad.exec), /RF_CONTEXT_UNESTABLISHED: missing RF workspace id or actor identity/);
});
// The record shape of a real `rf context show` (rf 0.1.883 over rfr_owzmjh2polnkkq7ssasft6tvde): sdk_versions values are
// {contract_fingerprint, distribution_version} objects beside the string fiber_optics_wire_format.
const realSdkVersions = {
  fiber_optics: { contract_fingerprint: "sha256:" + "5".repeat(64), distribution_version: "0.1.0.20261014202847" },
  fiber_optics_wire_format: "2",
  reactive_components: { contract_fingerprint: "sha256:" + "6".repeat(64), distribution_version: "0.1.1.20261018083200" },
  reactive_inference: { contract_fingerprint: "sha256:" + "7".repeat(64), distribution_version: "0.2.57.20261018093000" },
  reactive_lenses: { contract_fingerprint: "sha256:" + "8".repeat(64), distribution_version: "0.1.1.20261018.4" },
};
const showWith = (renderId: string, sdk: unknown) => {
  const r = showResult(renderId) as { record: Record<string, unknown> };
  r.record["cli_version"] = "0.1.768"; r.record["sdk_versions"] = sdk;
  return r;
};
test("(identity) a real recorded sdk_versions shape reuses and projects each object value to its distribution_version string", async () => {
  const projected = { fiber_optics: "0.1.0.20261014202847", fiber_optics_wire_format: "2", reactive_components: "0.1.1.20261018083200", reactive_inference: "0.2.57.20261018093000", reactive_lenses: "0.1.1.20261018.4" };
  const reused = recorder({ history: ok(envelope("context.history", { items: [row("rfr-real")] })), explains: { "rfr-real": ok(explain("rfr-real")) }, show: { "rfr-real": ok(envelope("context.show", showWith("rfr-real", realSdkVersions))) } });
  const got = await renderTaskContext(root, task, base, model, reused.exec, { sessionId: session });
  assert.equal(got.source, "reused");
  assert.deepEqual(got.cli, { version: "0.1.768", sdkVersions: projected });
  assert.equal(reused.versionCalls.length, 0);
  const handoff = recorder({ show: { "rfr-real": ok(envelope("context.show", showWith("rfr-real", realSdkVersions))) } });
  const out = await resolveRenderHandoff(root, { renderId: "rfr-real" }, task, base, model, handoff.exec);
  assert.deepEqual(out.cli, { version: "0.1.768", sdkVersions: projected });
});
test("(identity) a recorded sdk_versions value that is neither a string nor an object with a string distribution_version is refused", async () => {
  for (const bad of [{ fiber: 1 }, { fiber: { contract_fingerprint: "x" } }, { fiber: { distribution_version: " " } }, { fiber: { distribution_version: 3 } }, { fiber: null }, { fiber: ["0.1.0"] }]) {
    const r = recorder({ history: ok(envelope("context.history", { items: [row("rfr-bad")] })), explains: { "rfr-bad": ok(explain("rfr-bad")) }, show: { "rfr-bad": ok(envelope("context.show", showWith("rfr-bad", bad))) } });
    await assert.rejects(() => renderTaskContext(root, task, base, model, r.exec, { sessionId: session }), /RF_CONTEXT_UNESTABLISHED: recorded render carries no rf CLI version provenance/);
  }
});
