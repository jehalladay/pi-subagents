import test, { after } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateDecisionReceipt } from "@mechanical/workflows-coordination";
import { adviseBead, experienceRow, hostBaseline, loadGpConfig, resolveSelection } from "../dist/graph-policy-advice.js";
import type { BeadAdvice, GpConfig, Workdir } from "../dist/graph-policy-advice.js";
import type { GpExecutor } from "../dist/graph-policy-cli.js";
import { beadSchemaDigest, parseReadyBeads } from "../dist/graph-policy-snapshot.js";

// Every directory this file creates under tmpdir() is removed when the file's tests finish; tmpdir-hygiene.test.ts pins the residue.
const scratchDirs: string[] = [];
const scratchDir = (prefix: string): string => { const dir = mkdtempSync(join(tmpdir(), prefix)); scratchDirs.push(dir); return dir; };
after(() => { for (const dir of scratchDirs) rmSync(dir, { recursive: true, force: true }); });

const CK = "graphpolicy.checkpoint.c1:" + "c".repeat(64);
function configDir(overrides: Record<string, unknown> = {}): string {
  const dir = scratchDir("mw-gp-config-");
  writeFileSync(join(dir, "program.json"), "{\"schema\":\"graphpolicy.function.v1\"}");
  writeFileSync(join(dir, "theta.json"), "{\"parameters\":{}}");
  writeFileSync(join(dir, "schema.json"), "{}");
  writeFileSync(join(dir, "config.json"), JSON.stringify({ schema: "mw.graph-policy-config.v1", id: "t1", program: "program.json", theta: "theta.json", checkpoint: CK, graphSchema: "schema.json", port: "beadScore", candidateType: "beads", temperature: 0.5, timeoutMs: 5000, ...overrides }));
  return dir;
}
const read = (path: string): string => readFileSync(path, "utf8");
const ready = parseReadyBeads([
  { id: "A", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-20T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0 },
  { id: "B", status: "open", issue_type: "task", priority: 1, created_at: "2026-10-20T01:00:00Z", dependency_count: 0, dependent_count: 2, comment_count: 0 },
  { id: "C", status: "open", issue_type: "bug", priority: 1, created_at: "2026-10-19T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0 },
]);
const sampleEnvelope = (chosen: string, candidates: string[] = ["A", "B", "C"]) => JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: { program: "graphpolicy.program.c1:" + "1".repeat(64), checkpoint: CK }, result: {
  chosen, log_probability: "bf000000", seed: "9", decision_digest: "sha256:" + "d".repeat(64), journal_entry: "e".repeat(64), receipt_store: { blob: "r".repeat(64), deduplicated: false },
  decision: { candidates, scores: candidates.map((_, i) => ["3f800000", "40000000", "3f000000"][i] ?? "00000000"), probabilities: candidates.map(() => "3eaaaaab"), log_probabilities: candidates.map(() => "bf000000"), program_digest: "graphpolicy.program.c1:" + "1".repeat(64), checkpoint_digest: CK, graph_digest: "sha256:" + "a".repeat(64), backend_id: "reference", temperature: "3f000000" } } });
function workdir(): Workdir & { files: Record<string, string> } { const files: Record<string, string> = {}; return { files, write: (name, content) => { files[name] = content; return "/w/" + name; } }; }
const observationEnvelope = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: { kind: "observation", digest: "9".repeat(64), seq: 0, prev: null } });
// Journal appends (the observation) answer a canned envelope; every other verb reaches the executor under test.
const withObservation = (execute: GpExecutor): GpExecutor => argv => argv[0] === "journal" ? { stdout: observationEnvelope, stderr: "", exitCode: 0 } : execute(argv);
const baseRaw = (config: GpConfig, execute: GpExecutor, support: readonly string[] = ["A", "B", "C"]) => ({ ready, support, config, seed: "9", now: "2026-10-21T00:00:00Z", store: "MW", readyDigest: "sha256:" + "0".repeat(64), execute, workdir: workdir(), journal: "/records/gp-journal.jsonl", receiptStore: "/records/gp-store" });
const base = (config: GpConfig, execute: GpExecutor, support: readonly string[] = ["A", "B", "C"]) => baseRaw(config, withObservation(execute), support);

test("loadGpConfig resolves artifact paths against the config directory, digests the exact bytes and refuses malformed documents", () => {
  const dir = configDir();
  const config = loadGpConfig(join(dir, "config.json"), read);
  assert.equal(config.program, join(dir, "program.json")); assert.equal(config.checkpoint, CK); assert.equal(config.temperature, 0.5); assert.equal(config.timeoutMs, 5000);
  assert.match(config.programBytesDigest, /^sha256:[0-9a-f]{64}$/); assert.notEqual(config.programBytesDigest, config.thetaBytesDigest);
  for (const bad of [{ schema: "other" }, { checkpoint: "sha256:" + "c".repeat(64) }, { temperature: 0 }, { timeoutMs: 10 }, { timeoutMs: 1500.5 }, { program: "" }, { port: 3 }]) {
    assert.throws(() => loadGpConfig(join(configDir(bad), "config.json"), read), /GP_CONFIG_INVALID/, JSON.stringify(bad));
  }
  const dirty = configDir(); writeFileSync(join(dirty, "config.json"), "{not json");
  assert.throws(() => loadGpConfig(join(dirty, "config.json"), read), /GP_CONFIG_INVALID/);
});

test("hostBaseline is lowest priority, then earliest created_at, then id, over the support only", () => {
  assert.deepEqual(hostBaseline(ready, ["A", "B", "C"]), { beadId: "C", rule: "priority-then-oldest-then-id" });
  assert.deepEqual(hostBaseline(ready, ["A", "B"]), { beadId: "B", rule: "priority-then-oldest-then-id" });
  assert.equal(hostBaseline(ready, []), null);
  assert.equal(hostBaseline(ready, ["nope"]), null);
});

test("hostBaseline breaks a tie on both priority and created_at by the lower id, whatever order the support lists them", () => {
  const tied = parseReadyBeads([
    { id: "D", status: "open", issue_type: "task", priority: 1, created_at: "2026-10-20T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0 },
    { id: "E", status: "open", issue_type: "task", priority: 1, created_at: "2026-10-20T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0 },
  ]);
  assert.deepEqual(hostBaseline(tied, ["D", "E"]), { beadId: "D", rule: "priority-then-oldest-then-id" });
  assert.deepEqual(hostBaseline(tied, ["E", "D"]), { beadId: "D", rule: "priority-then-oldest-then-id" });
});

test("adviseBead writes the snapshot and the host support for gp, returns ranked advice when gp's choice lies in the support, and abstains otherwise", async () => {
  const config = loadGpConfig(join(configDir(), "config.json"), read);
  const argv: string[][] = [];
  const input = base(config, a => { argv.push([...a]); return { stdout: sampleEnvelope("B"), stderr: "", exitCode: 0 }; });
  const advice = await adviseBead(input);
  assert.equal(advice.kind, "advice");
  if (advice.kind === "advice") {
    assert.equal(advice.chosen, "B"); assert.equal(advice.logProb, -0.5);
    assert.deepEqual(advice.ranking.map(r => r.id), ["B", "A", "C"]);
    assert.deepEqual(advice.stats, { entities: 3, relationsKept: 0, relationsTotal: 0, support: 3 });
    assert.match(advice.snapshotDigest, /^sha256:/); assert.equal(advice.identities["checkpoint"], CK);
  }
  const files = (input.workdir as ReturnType<typeof workdir>).files;
  assert.deepEqual(JSON.parse(files["candidates.json"] ?? ""), { beads: ["A", "B", "C"] });
  assert.deepEqual(JSON.parse(files["snapshot.json"] ?? "").candidates.beads.members, ["A", "B", "C"]);
  for (const expected of ["sample", "--checkpoint", CK, "--graph", "/w/snapshot.json", "--candidates", "/w/candidates.json", "--journal", "/records/gp-journal.jsonl", "--store", "/records/gp-store", "--store-receipt", "--port", "beadScore"]) assert.ok((argv[0] ?? []).includes(expected), expected);
  const outside = await adviseBead(base(config, () => ({ stdout: sampleEnvelope("Z", ["A", "B", "Z"]), stderr: "", exitCode: 0 })));
  assert.equal(outside.kind, "abstain"); if (outside.kind === "abstain") { assert.equal(outside.reason, "GP_CHOICE_OUTSIDE_SUPPORT"); assert.equal(outside.gp?.journalEntry, "e".repeat(64), "the refused draw keeps its journal entry so the host can deny it in gp's journal"); }
  const foreignId = await adviseBead(base(config, () => ({ stdout: sampleEnvelope("A", ["A", "B", "Z"]), stderr: "", exitCode: 0 })));
  assert.equal(foreignId.kind, "abstain"); if (foreignId.kind === "abstain") assert.equal(foreignId.reason, "GP_CHOICE_OUTSIDE_SUPPORT");
  const shrunk = await adviseBead(base(config, () => ({ stdout: sampleEnvelope("A", ["A", "B"]), stderr: "", exitCode: 0 })));
  assert.equal(shrunk.kind, "abstain"); if (shrunk.kind === "abstain") assert.equal(shrunk.reason, "GP_CHOICE_OUTSIDE_SUPPORT");
  const timedOut = await adviseBead(base(config, () => ({ stdout: "", stderr: "", exitCode: -1, timedOut: true })));
  assert.equal(timedOut.kind, "abstain"); if (timedOut.kind === "abstain") { assert.equal(timedOut.reason, "GP_TIMEOUT"); assert.ok(timedOut.snapshotDigest); assert.equal(timedOut.gp, undefined); }
  let calls = 0;
  const empty = await adviseBead(base(config, () => { calls += 1; return { stdout: sampleEnvelope("A"), stderr: "", exitCode: 0 }; }, []));
  assert.equal(empty.kind, "abstain"); if (empty.kind === "abstain") assert.equal(empty.reason, "GP_SUPPORT_EMPTY");
  assert.equal(calls, 0, "gp is never consulted without a legal candidate");
});

const advice: BeadAdvice = { kind: "advice", chosen: "A", logProb: -0.25, ranking: [{ id: "A", score: 2, probability: 0.7 }, { id: "C", score: 1, probability: 0.3 }], elapsedMs: 12, snapshotDigest: "sha256:" + "a".repeat(64), stats: { entities: 3, relationsKept: 1, relationsTotal: 2, support: 3 },
  identities: {}, gp: { chosen: "A", logProbability: -0.25, logProbabilityWord: "be800000", candidates: [], decisionDigest: "sha256:" + "d".repeat(64), journalEntry: "e".repeat(64), receiptBlob: null, programDigest: "p", checkpointDigest: CK, graphDigest: "sha256:" + "a".repeat(64), backend: "reference", temperature: 0.5, seed: "9", capabilityCommands: null } };
const abstain: BeadAdvice = { kind: "abstain", reason: "GP_TIMEOUT", detail: "slow", elapsedMs: 5000, snapshotDigest: null, stats: null };
const baseline = { beadId: "C", rule: "priority-then-oldest-then-id" as const };
const config = loadGpConfig(join(configDir(), "config.json"), read);
const resolveInput = { now: "2026-10-21T00:00:00Z", store: "MW", readyDigest: "sha256:" + "0".repeat(64), readyCount: 3, support: ["A", "B", "C"], baseline, config, seed: "9" };

test("resolveSelection: off and shadow keep the host baseline and only record advice; canary takes an in-support gp choice and falls back with a named reason", () => {
  const shadow = resolveSelection({ ...resolveInput, mode: "shadow", advice });
  assert.deepEqual(shadow.resolved, { beadId: "C", source: "host-baseline" });
  assert.equal(shadow.advice, advice); assert.equal(shadow.receipt?.logProb, 0); assert.deepEqual(shadow.receipt?.selector, { id: "host-baseline", revision: "priority-then-oldest-then-id" });
  assert.deepEqual(shadow.receipt?.actions, { proposed: ["A"], admitted: ["C"], executed: "unknown" }); assert.equal(shadow.receipt?.feedback.status, "unknown");
  const off = resolveSelection({ ...resolveInput, mode: "off", advice: null, config: null });
  assert.deepEqual(off.resolved, { beadId: "C", source: "host-baseline" }); assert.equal(off.receipt?.gp.programHash, "unknown"); assert.equal(off.config, null);
  const canary = resolveSelection({ ...resolveInput, mode: "canary", advice });
  assert.deepEqual(canary.resolved, { beadId: "A", source: "graph-policy" });
  assert.equal(canary.receipt?.logProb, -0.25); assert.deepEqual(canary.receipt?.selector, { id: "gp-sample", revision: CK }); assert.equal(canary.receipt?.feedback.status, "pending");
  assert.equal(canary.receipt?.gp.graphHash, "sha256:" + "a".repeat(64)); assert.equal(canary.receipt?.gp.programHash, config.programBytesDigest); assert.equal(canary.receipt?.gp.snapshotHash, resolveInput.readyDigest);
  assert.equal(canary.receipt?.completeness, "depends_on coverage=1/2 partial");
  const fallback = resolveSelection({ ...resolveInput, mode: "canary", advice: abstain });
  assert.deepEqual(fallback.resolved, { beadId: "C", source: "host-fallback", fallbackReason: "GP_TIMEOUT" });
  assert.match(fallback.receipt?.resolverVerdict ?? "", /fallback=GP_TIMEOUT/); assert.equal(fallback.receipt?.feedback.status, "unknown");
  const none = resolveSelection({ ...resolveInput, mode: "canary", advice: null, baseline: null, support: [] });
  assert.equal(none.resolved, null); assert.equal(none.receipt, null);
  for (const selection of [shadow, off, canary, fallback]) assert.deepEqual(validateDecisionReceipt(selection.receipt!), { ok: true });
  assert.notEqual(shadow.decisionId, canary.decisionId);
  assert.equal(resolveSelection({ ...resolveInput, mode: "shadow", advice }).decisionId, shadow.decisionId, "the decision id is a function of ready digest, support, seed, mode and instant");
  assert.notEqual(resolveSelection({ ...resolveInput, mode: "shadow", advice, seed: "10" }).decisionId, shadow.decisionId, "a different seed alone changes the decision id");
});

test("a receipt that would not validate is refused rather than written (GP_RECEIPT_INVALID)", () => {
  assert.throws(() => resolveSelection({ ...resolveInput, mode: "shadow", advice: null, support: ["A", ""], baseline: { beadId: "A", rule: "priority-then-oldest-then-id" } }), /GP_RECEIPT_INVALID/);
});

test("experienceRow carries the propensity only from a recorded draw and names the claim outcome", () => {
  const canary = resolveSelection({ ...resolveInput, mode: "canary", advice });
  const row = experienceRow(canary, { claim: "in_progress" });
  assert.equal(row["schema"], "mw.decision-experience.v1"); assert.equal(row["propensity"], -0.25); assert.equal(row["claim"], "in_progress");
  assert.deepEqual((row["gp"] as Record<string, unknown>)["journalEntry"], "e".repeat(64));
  const shadowRow = experienceRow(resolveSelection({ ...resolveInput, mode: "shadow", advice: abstain }));
  assert.equal(shadowRow["propensity"], 0); assert.deepEqual((shadowRow["gp"] as Record<string, unknown>)["abstain"], "GP_TIMEOUT"); assert.equal(shadowRow["claim"], null);
  assert.equal(shadowRow["baseline"], "C", "the experience row records the host baseline bead id");
  assert.equal(experienceRow(resolveSelection({ ...resolveInput, mode: "shadow", advice: null, baseline: null, support: [] }))["baseline"], null);
});

test("adviseBead journals the observation BEFORE the draw (schemaDigest, snapshotDigest over the exact sampled bytes, provenance) and samples with --store --store-receipt", async () => {
  const config = loadGpConfig(join(configDir(), "config.json"), read);
  const calls: string[][] = [];
  const input = { ...baseRaw(config, argv => { calls.push([...argv]); return { stdout: argv[0] === "journal" ? observationEnvelope : sampleEnvelope("B"), stderr: "", exitCode: 0 }; }), revisionOrder: { attestedBy: "mw-seq", ordinal: 4 } };
  const advice = await adviseBead(input);
  assert.deepEqual(calls.map(c => c[0]), ["journal", "sample"], "the observation append precedes the draw");
  assert.deepEqual(calls[0]?.slice(0, 5), ["journal", "append", "--kind", "observation", "--record"]); assert.equal(calls[0]?.[5], "@/w/observation.json"); assert.deepEqual(calls[0]?.slice(6), ["--journal", "/records/gp-journal.jsonl", "--json"]);
  const files = input.workdir.files;
  const record = JSON.parse(files["observation.json"] ?? "") as { kind: string; schemaDigest: string; snapshotDigest: string; provenance: Record<string, string> };
  assert.equal(record.kind, "observation");
  assert.equal(record.snapshotDigest, createHash("sha256").update(files["snapshot.json"] ?? "").digest("hex"), "the digest binds the exact bytes gp samples over, as bare hex64");
  assert.match(record.schemaDigest, /^[0-9a-f]{64}$/); assert.equal(record.schemaDigest, beadSchemaDigest().slice("sha256:".length));
  const snapshot = JSON.parse(files["snapshot.json"] ?? "") as { observation: { adapter: string; revisions: string[]; scope: string; revision_order: unknown } };
  assert.deepEqual(record.provenance, { adapter: snapshot.observation.adapter, revision: snapshot.observation.revisions[0], scope: snapshot.observation.scope, ref: "mw:bead-snapshot/" + record.snapshotDigest });
  assert.deepEqual(snapshot.observation.revision_order, { attested_by: "mw-seq", ordinal: 4, covers: snapshot.observation.revisions }, "the snapshot carries the host-attested revision order covering every revision");
  assert.equal(advice.kind, "advice"); if (advice.kind === "advice") { assert.deepEqual(advice.observation, { digest: "9".repeat(64), seq: 0 }); assert.equal(advice.gp.receiptBlob, "r".repeat(64)); }
  assert.ok((calls[1] ?? []).join(" ").includes("--store /records/gp-store --store-receipt"));
  const unattested = baseRaw(config, withObservation(() => ({ stdout: sampleEnvelope("B"), stderr: "", exitCode: 0 })));
  await adviseBead(unattested);
  assert.equal("revision_order" in (JSON.parse(unattested.workdir.files["snapshot.json"] ?? "") as { observation: object }).observation, false, "no attestation is invented when the host supplies none");
});

test("adviseBead refuses the draw at the host when the observation cannot be journaled or no receipt store is named: gp never samples", async () => {
  const config = loadGpConfig(join(configDir(), "config.json"), read);
  const calls: string[][] = [];
  const refusal = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, identities: {}, error: { code: "GP_CLI_JOURNAL_INVALID", category: "invalid-input", retryable: false, details: { message: "journal write conflict" } } });
  const refused = await adviseBead(baseRaw(config, argv => { calls.push([...argv]); return { stdout: refusal, stderr: "", exitCode: 2 }; }));
  assert.equal(refused.kind, "abstain"); if (refused.kind === "abstain") { assert.equal(refused.reason, "GP_OBSERVATION_MISSING"); assert.match(refused.detail, /^GP_REFUSED: GP_CLI_JOURNAL_INVALID/); assert.equal(refused.gp, undefined); assert.ok(refused.snapshotDigest); }
  assert.deepEqual(calls.map(c => c[0]), ["journal"], "one append attempt, no retry, no sample");
  const malformed = await adviseBead(baseRaw(config, () => ({ stdout: JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: {} }), stderr: "", exitCode: 0 })));
  assert.equal(malformed.kind, "abstain"); if (malformed.kind === "abstain") assert.equal(malformed.reason, "GP_OBSERVATION_MISSING");
  const none: string[][] = [];
  const noStore = await adviseBead({ ...baseRaw(config, argv => { none.push([...argv]); return { stdout: sampleEnvelope("B"), stderr: "", exitCode: 0 }; }), receiptStore: undefined });
  assert.equal(noStore.kind, "abstain"); if (noStore.kind === "abstain") { assert.equal(noStore.reason, "GP_STORE_REQUIRED"); assert.match(noStore.detail, /--store DIR --store-receipt/); }
  assert.equal(none.length, 0, "nothing is spawned without a receipt store");
  const lost = await adviseBead(baseRaw(config, argv => ({ stdout: argv[0] === "journal" ? observationEnvelope : JSON.stringify(JSON.parse(sampleEnvelope("B"), (k, v) => (k === "receipt_store" ? undefined : v))), stderr: "", exitCode: 0 })));
  assert.equal(lost.kind, "abstain"); if (lost.kind === "abstain") { assert.equal(lost.reason, "GP_RESPONSE_MALFORMED"); assert.match(lost.detail, /receipt_store/); }
});
