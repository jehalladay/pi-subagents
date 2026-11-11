import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join as joinPath } from "node:path";
import { gpAdmissionAppend, gpCall, gpEffectOutcomeAppend, gpEntryExecutor, gpEval, gpFeedbackAdd, gpObservationAppend, gpSample, toWord32, word32 } from "../dist/graph-policy-cli.js";
import type { GpExecutor } from "../dist/graph-policy-cli.js";

const envelope = (result: unknown, identities: Record<string, string> = {}, commands?: readonly string[]) => JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, result, identities, capabilities: commands === undefined ? {} : { commands } });
const refusal = (code: string, message: string) => JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, error: { code, category: "invalid-input", retryable: false, details: { message } }, identities: {} });
const SAMPLE = {
  status: "ok", kind: "proposal", port: "beadScore", seed: "7", chosen: "B", log_probability: "bf000000",
  decision: { schema: "graphpolicy.receipt.decision.v1", kind: "sampled-decision", graph_digest: "sha256:" + "a".repeat(64), program_digest: "graphpolicy.program.c1:" + "b".repeat(64), checkpoint_digest: "graphpolicy.checkpoint.c1:" + "c".repeat(64), backend_id: "reference",
    candidates: ["A", "B"], scores: ["3f800000", "40000000"], probabilities: ["3e800000", "3f400000"], log_probabilities: ["bf800000", "bf000000"], temperature: "3f800000" },
  decision_digest: "sha256:" + "d".repeat(64), journal_entry: "e".repeat(64), admission: "pending", admission_record: null,
};
const seen: string[][] = [];
const exec = (stdout: string, exitCode = 0): GpExecutor => argv => { seen.push([...argv]); return { stdout, stderr: "", exitCode }; };

test("binary32 words decode and encode exactly", () => {
  assert.equal(word32("3f800000"), 1); assert.equal(word32("40000000"), 2); assert.equal(word32("00000000"), 0);
  assert.ok(Math.abs(word32("bf5e8cf0") - -0.8693) < 1e-4);
  assert.ok(Number.isNaN(word32("zz"))); assert.ok(Number.isNaN(word32(12)));
  assert.equal(toWord32(1), "3f800000"); assert.equal(toWord32(0), "00000000"); assert.equal(word32(toWord32(0.3)), Math.fround(0.3));
});

test("gpCall classifies spawn failure, timeout, typed refusal, non-envelope output and success; --json is always appended", async () => {
  seen.length = 0;
  const absent = await gpCall(() => ({ stdout: "", stderr: "spawn ENOENT", exitCode: -1, spawnError: "ENOENT" }), ["eval"]);
  assert.equal(absent.ok, false); if (!absent.ok) assert.equal(absent.code, "GP_ABSENT");
  const slow = await gpCall(() => ({ stdout: "", stderr: "", exitCode: -1, timedOut: true }), ["eval"]);
  assert.equal(slow.ok, false); if (!slow.ok) assert.equal(slow.code, "GP_TIMEOUT");
  const refused = await gpCall(exec(refusal("GP_E_INVALID_CANDIDATE", "unknown candidate"), 2), ["sample"]);
  assert.equal(refused.ok, false); if (!refused.ok) { assert.equal(refused.code, "GP_REFUSED"); assert.equal(refused.gpCode, "GP_E_INVALID_CANDIDATE"); assert.match(refused.detail, /unknown candidate/); assert.equal(refused.exitCode, 2); }
  const bare = await gpCall(exec("usage: gp ...", 2), ["sample"]);
  assert.equal(bare.ok, false); if (!bare.ok) assert.equal(bare.code, "GP_REFUSED");
  const garbage = await gpCall(exec("not json"), ["eval"]);
  assert.equal(garbage.ok, false); if (!garbage.ok) assert.equal(garbage.code, "GP_RESPONSE_MALFORMED");
  const foreign = await gpCall(exec(JSON.stringify({ ok: true, result: {} })), ["eval"]);
  assert.equal(foreign.ok, false); if (!foreign.ok) assert.equal(foreign.code, "GP_RESPONSE_MALFORMED");
  const ok = await gpCall(exec(envelope({ a: 1 }, { program: "p" })), ["eval", "--x", "1"]);
  assert.equal(ok.ok, true); if (ok.ok) { assert.deepEqual(ok.result, { a: 1 }); assert.deepEqual(ok.identities, { program: "p" }); assert.ok(ok.elapsedMs >= 0); }
  assert.deepEqual(seen.at(-1), ["eval", "--x", "1", "--json"]);
});

test("gpSample parses the decision receipt, decodes words and passes port, temperature, seed and journal", async () => {
  seen.length = 0;
  const out = await gpSample(exec(envelope(SAMPLE, { checkpoint: "graphpolicy.checkpoint.c1:" + "c".repeat(64) })), { program: "p.json", theta: "t.json", checkpoint: "graphpolicy.checkpoint.c1:" + "c".repeat(64), graph: "g.json", candidates: "c.json", seed: "7", port: "beadScore", temperature: 0.5, journal: "j.jsonl" });
  assert.equal(out.ok, true);
  if (out.ok) {
    assert.equal(out.result.chosen, "B"); assert.equal(out.result.logProbability, -0.5); assert.equal(out.result.logProbabilityWord, "bf000000");
    assert.deepEqual(out.result.candidates, [{ id: "A", score: 1, probability: 0.25, logProbability: -1 }, { id: "B", score: 2, probability: 0.75, logProbability: -0.5 }]);
    assert.equal(out.result.journalEntry, "e".repeat(64)); assert.equal(out.result.decisionDigest, "sha256:" + "d".repeat(64));
    assert.equal(out.result.graphDigest, "sha256:" + "a".repeat(64)); assert.equal(out.result.backend, "reference"); assert.equal(out.result.temperature, 1); assert.equal(out.result.seed, "7");
  }
  const argv = seen[0] ?? [];
  for (const expected of ["sample", "--port", "beadScore", "--temperature", "0.5", "--seed", "7", "--journal", "j.jsonl", "--candidates", "c.json", "--json"]) assert.ok(argv.includes(expected), expected);
  const malformed = await gpSample(exec(envelope({ chosen: "B" })), { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c", seed: "1", port: "beadScore", temperature: 1 });
  assert.equal(malformed.ok, false); if (!malformed.ok) assert.equal(malformed.code, "GP_RESPONSE_MALFORMED");
  const badWord = await gpSample(exec(envelope({ ...SAMPLE, log_probability: "nope" })), { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c", seed: "1", port: "beadScore", temperature: 1 });
  assert.equal(badWord.ok, false); if (!badWord.ok) assert.equal(badWord.code, "GP_RESPONSE_MALFORMED");
});

test("gpEval returns [id,score] rows with the receipt identities and refuses other shapes", async () => {
  const result = { Y: { beadScore: { kind: "candidate", rows: [["A", [0.5]], ["B", [-1.25]]] } }, receipt: { program_digest: "P", checkpoint_digest: "C", input_snapshot: "sha256:x", duration_ms: 3, basis: { completeness: "partial" } } };
  const out = await gpEval(exec(envelope(result)), { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c", port: "beadScore" });
  assert.equal(out.ok, true);
  if (out.ok) { assert.deepEqual(out.result.rows, [{ id: "A", score: 0.5 }, { id: "B", score: -1.25 }]); assert.equal(out.result.programDigest, "P"); assert.equal(out.result.gpDurationMs, 3); assert.equal(out.result.completeness, "partial"); }
  const wrongPort = await gpEval(exec(envelope(result)), { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c", port: "other" });
  assert.equal(wrongPort.ok, false); if (!wrongPort.ok) assert.equal(wrongPort.code, "GP_RESPONSE_MALFORMED");
});

test("gpFeedbackAdd writes the evidence document (scalar as a binary32 word only when resolved) and binds to the journal entry", async () => {
  seen.length = 0;
  const written: string[] = [];
  const write = (document: string) => { written.push(document); return "/tmp/evidence.json"; };
  const base = { journal: "j.jsonl", entry: "e".repeat(64), labelClass: "source-verified" as const, evidence: { adapter: "a", revision: "r", scope: "s", ref: "x" }, writeEvidence: write };
  const pending = await gpFeedbackAdd(exec(envelope({ decision: "e".repeat(64), feedback_digest: "f".repeat(64), seq: 1 })), { ...base, value: { status: "pending" } });
  assert.equal(pending.ok, true); if (pending.ok) assert.equal(pending.result.entry, "f".repeat(64));
  assert.deepEqual(JSON.parse(written[0] ?? ""), { labelClass: "source-verified", evidence: { adapter: "a", revision: "r", scope: "s", ref: "x" }, value: { status: "pending" } });
  const noDigest = await gpFeedbackAdd(exec(envelope({})), { ...base, value: { status: "resolved", scalar: 1 } });
  assert.equal(noDigest.ok, false); if (!noDigest.ok) assert.equal(noDigest.code, "GP_RESPONSE_MALFORMED");
  assert.deepEqual(JSON.parse(written[1] ?? "").value, { status: "resolved", scalar: "3f800000" });
  for (const expected of ["feedback", "add", "--decision", "e".repeat(64), "--evidence", "@/tmp/evidence.json", "--journal", "j.jsonl"]) assert.ok((seen[0] ?? []).includes(expected), expected);
  const rejected = await gpFeedbackAdd(exec(refusal("GP_CLI_FEEDBACK_INVALID", "rejected"), 2), { ...base, value: { status: "unknown" } });
  assert.equal(rejected.ok, false); if (!rejected.ok) assert.equal(rejected.gpCode, "GP_CLI_FEEDBACK_INVALID");
});

test("gpFeedbackAdd with supersedes appends a correction through --supersedes (reason evidence-revised, never --decision) and reads the correction digest", async () => {
  seen.length = 0;
  const written: string[] = [];
  const base = { journal: "j.jsonl", entry: "e".repeat(64), supersedes: "a".repeat(64), labelClass: "source-verified" as const, evidence: { adapter: "a", revision: "r", scope: "s", ref: "x" }, value: { status: "resolved" as const, scalar: 1 }, writeEvidence: (document: string) => { written.push(document); return "/tmp/correction.json"; } };
  const corrected = await gpFeedbackAdd(exec(envelope({ supersedes: "a".repeat(64), correction_digest: "c".repeat(64), seq: 4 })), base);
  assert.equal(corrected.ok, true); if (corrected.ok) assert.equal(corrected.result.entry, "c".repeat(64));
  const argv = seen[0] ?? [];
  assert.deepEqual(argv.slice(0, 5), ["feedback", "add", "--supersedes", "a".repeat(64), "--evidence"]);
  assert.ok(!argv.includes("--decision"), "a correction never carries --decision");
  assert.deepEqual(JSON.parse(written[0] ?? ""), { reason: "evidence-revised", labelClass: "source-verified", evidence: { adapter: "a", revision: "r", scope: "s", ref: "x" }, value: { status: "resolved", scalar: "3f800000" } });
  const missing = await gpFeedbackAdd(exec(envelope({ supersedes: "a".repeat(64), seq: 4 })), base);
  assert.equal(missing.ok, false); if (!missing.ok) assert.equal(missing.code, "GP_RESPONSE_MALFORMED");
  const forked = await gpFeedbackAdd(exec(refusal("GP_CLI_FEEDBACK_FORKED", "already superseded"), 3), base);
  assert.equal(forked.ok, false); if (!forked.ok) assert.equal(forked.gpCode, "GP_CLI_FEEDBACK_FORKED");
});

const JOURNAL_APPEND_COMMANDS = ["sample", "feedback add", "journal append"];
const admissionBase = () => {
  const written: string[] = [];
  return { written, base: { journal: "j.jsonl", entry: "e".repeat(64), host: { adapter: "a", revision: "r", scope: "s", ref: "x" }, commands: JOURNAL_APPEND_COMMANDS, writeHost: (document: string) => { written.push(document); return "/tmp/host.json"; } } };
};
const appended = { kind: "host-admission", decision: "e".repeat(64), digest: "9".repeat(64), seq: 2, prev: "8".repeat(64) };

test("gpAdmissionAppend spawns exactly gp journal append --kind host-admission with the doc-09 record body and reads back the admission digest", async () => {
  seen.length = 0;
  const { written, base } = admissionBase();
  const ok = await gpAdmissionAppend(exec(envelope(appended, {}, JOURNAL_APPEND_COMMANDS)), { ...base, status: "admitted" });
  assert.equal(ok.ok, true); if (ok.ok) assert.deepEqual(ok.result, { digest: "9".repeat(64), seq: 2 });
  assert.equal(seen.length, 1);
  assert.deepEqual(seen[0], ["journal", "append", "--kind", "host-admission", "--record", "@/tmp/host.json", "--journal", "j.jsonl", "--json"]);
  assert.deepEqual(JSON.parse(written[0] ?? ""), { kind: "host-admission", decisionDigest: "e".repeat(64), status: "admitted", host: { adapter: "a", revision: "r", scope: "s", ref: "x" } });
  assert.equal(seen.some(argv => argv.includes("admission")), false, "the retired admission add verb is never spawned");
});

test("gpAdmissionAppend spawns nothing and answers GP_UNSUPPORTED when capabilities.commands omits journal append or gp declared none", async () => {
  for (const commands of [["sample", "feedback add"], [], null]) {
    seen.length = 0;
    const { written, base } = admissionBase();
    const out = await gpAdmissionAppend(exec(envelope(appended)), { ...base, commands, status: "denied" });
    assert.equal(out.ok, false);
    if (!out.ok) { assert.equal(out.code, "GP_UNSUPPORTED"); assert.match(out.detail, /journal append/); assert.equal(out.gpCode, undefined); }
    assert.equal(seen.length, 0, "no gp process is spawned");
    assert.equal(written.length, 0, "no record file is written");
  }
});

test("gpAdmissionAppend answers GP_RESPONSE_MALFORMED on a result without the entry digest or seq, and GP_REFUSED with gp's own code on a nonzero exit", async () => {
  const { base } = admissionBase();
  for (const result of [{}, { ...appended, digest: undefined }, { ...appended, digest: "nothex" }, { ...appended, seq: "2" }, { ...appended, seq: undefined }]) {
    const malformed = await gpAdmissionAppend(exec(envelope(result, {}, JOURNAL_APPEND_COMMANDS)), { ...base, status: "denied" });
    assert.equal(malformed.ok, false, JSON.stringify(result)); if (!malformed.ok) assert.equal(malformed.code, "GP_RESPONSE_MALFORMED");
  }
  const refused = await gpAdmissionAppend(exec(refusal("GP_CLI_DECISION_INVALID", "decisionDigest must name a sampled-decision entry"), 2), { ...base, status: "denied" });
  assert.equal(refused.ok, false); if (!refused.ok) { assert.equal(refused.code, "GP_REFUSED"); assert.equal(refused.gpCode, "GP_CLI_DECISION_INVALID"); assert.equal(refused.exitCode, 2); }
});

test("gpCall surfaces the envelope's capabilities.commands only when gp declared a string list", async () => {
  const declared = await gpCall(exec(envelope({ a: 1 }, {}, ["sample", "journal append"])), ["sample"]);
  assert.equal(declared.ok, true); if (declared.ok) assert.deepEqual(declared.commands, ["sample", "journal append"]);
  for (const stdout of [envelope({ a: 1 }), JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, result: { a: 1 }, identities: {} }), JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, result: { a: 1 }, identities: {}, capabilities: { commands: ["x", 3] } })]) {
    const none = await gpCall(exec(stdout), ["sample"]);
    assert.equal(none.ok, true); if (none.ok) assert.equal("commands" in none, false);
  }
});

test("gpSample carries the draw envelope's capability commands for the admission gate", async () => {
  const request = { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c", seed: "7", port: "beadScore", temperature: 1 };
  const withList = await gpSample(exec(envelope(SAMPLE, {}, JOURNAL_APPEND_COMMANDS)), request);
  assert.equal(withList.ok, true); if (withList.ok) assert.deepEqual(withList.result.capabilityCommands, JOURNAL_APPEND_COMMANDS);
  const without = await gpSample(exec(envelope(SAMPLE)), request);
  assert.equal(without.ok, true); if (without.ok) assert.equal(without.result.capabilityCommands, null);
});


const ENTRY_ARGS = { program: "p", theta: "t", checkpoint: "c", graph: "g", candidates: "c" };

test("gpCall reports elapsedMs 0 when an injected clock runs backwards, never negative (CL11)", async () => {
  const readings = [100, 40];
  const out = await gpCall(exec(envelope({ a: 1 })), ["eval"], () => readings.shift() ?? 0);
  assert.equal(out.ok, true); if (out.ok) assert.equal(out.elapsedMs, 0);
  const forward = [10, 17.6];
  const later = await gpCall(exec(envelope({ a: 1 })), ["eval"], () => forward.shift() ?? 0);
  assert.equal(later.ok, true); if (later.ok) assert.equal(later.elapsedMs, 8);
});

test("gpSample refuses a decision whose candidate id is not a string (CL12)", async () => {
  const request = { ...ENTRY_ARGS, seed: "1", port: "beadScore", temperature: 1 };
  const out = await gpSample(exec(envelope({ ...SAMPLE, decision: { ...SAMPLE.decision, candidates: ["A", 7] } })), request);
  assert.equal(out.ok, false); if (!out.ok) { assert.equal(out.code, "GP_RESPONSE_MALFORMED"); assert.match(out.detail, /sample result lacks/); }
});

test("gpEval refuses a row whose id is not a string and carries the receipt checkpoint digest (CL17, CL19)", async () => {
  const request = { ...ENTRY_ARGS, port: "beadScore" };
  const bad = await gpEval(exec(envelope({ Y: { beadScore: { kind: "candidate", rows: [["A", [0.5]], [9, [1]]] } }, receipt: {} })), request);
  assert.equal(bad.ok, false); if (!bad.ok) assert.equal(bad.code, "GP_RESPONSE_MALFORMED");
  const good = await gpEval(exec(envelope({ Y: { beadScore: { kind: "candidate", rows: [["A", [0.5]]] } }, receipt: { program_digest: "P", checkpoint_digest: "graphpolicy.checkpoint.c1:" + "c".repeat(64), input_snapshot: "sha256:x", duration_ms: 1, basis: {} } })), request);
  assert.equal(good.ok, true);
  if (good.ok) { assert.equal(good.result.checkpointDigest, "graphpolicy.checkpoint.c1:" + "c".repeat(64)); assert.equal(good.result.programDigest, "P"); }
});

test("gpFeedbackAdd refuses a feedback_digest string that is not 64 lowercase hex digits (CL21)", async () => {
  const base = { journal: "j.jsonl", entry: "e".repeat(64), labelClass: "source-verified" as const, evidence: { adapter: "a", revision: "r", scope: "s", ref: "x" }, writeEvidence: () => "/tmp/evidence.json", value: { status: "pending" as const } };
  for (const digest of ["abc", "f".repeat(63), "f".repeat(65), "g".repeat(64), "F".repeat(64), 7]) {
    const out = await gpFeedbackAdd(exec(envelope({ decision: "e".repeat(64), feedback_digest: digest, seq: 1 })), base);
    assert.equal(out.ok, false, String(digest)); if (!out.ok) assert.equal(out.code, "GP_RESPONSE_MALFORMED");
  }
  const good = await gpFeedbackAdd(exec(envelope({ decision: "e".repeat(64), feedback_digest: "0123456789abcdef".repeat(4), seq: 1 })), base);
  assert.equal(good.ok, true);
});

test("gpEntryExecutor runs a .js entry through this node, and a missing .js entry exits 1 from node while a missing binary is a spawn ENOENT (CL23)", async () => {
  const dir = mkdtempSync(joinPath(tmpdir(), "gp-entry-"));
  try {
    const entry = joinPath(dir, "gp.js");
    writeFileSync(entry, "process.stdout.write(JSON.stringify(process.argv.slice(2)));\n");
    const ran = await gpEntryExecutor(entry, 20_000)(["eval", "--json"]);
    assert.equal(ran.exitCode, 0); assert.equal(ran.stdout, JSON.stringify(["eval", "--json"])); assert.equal(ran.spawnError, undefined);
    const mjs = joinPath(dir, "gp.mjs");
    writeFileSync(mjs, "process.stdout.write('mjs-ok');\n");
    assert.equal((await gpEntryExecutor(mjs, 20_000)([])).stdout, "mjs-ok");
    const missingJs = await gpEntryExecutor(joinPath(dir, "absent.js"), 20_000)(["eval"]);
    assert.equal(missingJs.exitCode, 1); assert.equal(missingJs.spawnError, undefined);
    const missingBinary = await gpEntryExecutor(joinPath(dir, "absent-binary"), 20_000)(["eval"]);
    assert.equal(missingBinary.spawnError, "ENOENT"); assert.equal(missingBinary.exitCode, -1);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("gpSample with a store appends --store DIR --store-receipt, decodes receipt_store.blob and refuses a draw whose envelope lacks it", async () => {
  seen.length = 0;
  const request = { ...ENTRY_ARGS, seed: "7", port: "beadScore", temperature: 1, journal: "j.jsonl", store: "/rec/gp-store" };
  const stored = await gpSample(exec(envelope({ ...SAMPLE, receipt_store: { blob: "r".repeat(64), deduplicated: false } })), request);
  assert.equal(stored.ok, true); if (stored.ok) assert.equal(stored.result.receiptBlob, "r".repeat(64));
  assert.deepEqual((seen[0] ?? []).slice(-4), ["--store", "/rec/gp-store", "--store-receipt", "--json"]);
  const missing = await gpSample(exec(envelope(SAMPLE)), request);
  assert.equal(missing.ok, false); if (!missing.ok) { assert.equal(missing.code, "GP_RESPONSE_MALFORMED"); assert.match(missing.detail, /receipt_store/); }
  seen.length = 0;
  const plain = await gpSample(exec(envelope(SAMPLE)), { ...request, store: undefined });
  assert.equal(plain.ok, true); if (plain.ok) assert.equal(plain.result.receiptBlob, null);
  assert.equal((seen[0] ?? []).includes("--store") || (seen[0] ?? []).includes("--store-receipt"), false, "no store flags without a store");
});

test("gpObservationAppend writes the doc-09 observation record through journal append and types the answer", async () => {
  seen.length = 0;
  const written: string[] = [];
  const request = { journal: "j.jsonl", schemaDigest: "5".repeat(64), snapshotDigest: "6".repeat(64), provenance: { adapter: "a", revision: "r", scope: "s", ref: "x" }, writeRecord: (document: string) => { written.push(document); return "/w/observation.json"; } };
  const answer = { kind: "observation", digest: "9".repeat(64), seq: 3, prev: "8".repeat(64) };
  const out = await gpObservationAppend(exec(envelope(answer)), request);
  assert.equal(out.ok, true); if (out.ok) assert.deepEqual(out.result, { digest: "9".repeat(64), seq: 3 });
  assert.deepEqual(seen[0], ["journal", "append", "--kind", "observation", "--record", "@/w/observation.json", "--journal", "j.jsonl", "--json"]);
  assert.deepEqual(JSON.parse(written[0] ?? ""), { kind: "observation", schemaDigest: "5".repeat(64), snapshotDigest: "6".repeat(64), provenance: { adapter: "a", revision: "r", scope: "s", ref: "x" } });
  for (const result of [{}, { ...answer, digest: "nothex" }, { ...answer, seq: "3" }]) {
    const bad = await gpObservationAppend(exec(envelope(result)), request);
    assert.equal(bad.ok, false); if (!bad.ok) assert.equal(bad.code, "GP_RESPONSE_MALFORMED");
  }
  const refused = await gpObservationAppend(exec(refusal("GP_CLI_JOURNAL_INVALID", "bad record"), 2), request);
  assert.equal(refused.ok, false); if (!refused.ok) { assert.equal(refused.code, "GP_REFUSED"); assert.equal(refused.gpCode, "GP_CLI_JOURNAL_INVALID"); }
});

test("gpEffectOutcomeAppend writes the doc-09 effect-outcome-reference record joined to the admission digest and types the answer", async () => {
  seen.length = 0;
  const written: string[] = [];
  const request = { journal: "j.jsonl", admissionDigest: "7".repeat(64), outcome: "succeeded" as const, effect: { adapter: "a", revision: "r", scope: "s", ref: "x" }, writeRecord: (document: string) => { written.push(document); return "/w/effect.json"; } };
  const answer = { kind: "effect-outcome-reference", digest: "9".repeat(64), seq: 4, prev: "8".repeat(64) };
  const out = await gpEffectOutcomeAppend(exec(envelope(answer)), request);
  assert.equal(out.ok, true); if (out.ok) assert.deepEqual(out.result, { digest: "9".repeat(64), seq: 4 });
  assert.deepEqual(seen[0], ["journal", "append", "--kind", "effect-outcome-reference", "--record", "@/w/effect.json", "--journal", "j.jsonl", "--json"]);
  assert.deepEqual(JSON.parse(written[0] ?? ""), { kind: "effect-outcome-reference", admissionDigest: "7".repeat(64), outcome: "succeeded", effect: { adapter: "a", revision: "r", scope: "s", ref: "x" } });
  await gpEffectOutcomeAppend(exec(envelope(answer)), { ...request, outcome: "failed" });
  assert.equal((JSON.parse(written[1] ?? "") as { outcome: string }).outcome, "failed");
  for (const result of [{}, { ...answer, digest: "nothex" }, { ...answer, seq: "4" }]) {
    const bad = await gpEffectOutcomeAppend(exec(envelope(result)), request);
    assert.equal(bad.ok, false); if (!bad.ok) assert.equal(bad.code, "GP_RESPONSE_MALFORMED");
  }
  const refused = await gpEffectOutcomeAppend(exec(refusal("GP_CLI_DECISION_INVALID", "admissionDigest must name a host-admission entry"), 2), request);
  assert.equal(refused.ok, false); if (!refused.ok) { assert.equal(refused.code, "GP_REFUSED"); assert.equal(refused.gpCode, "GP_CLI_DECISION_INVALID"); }
});
