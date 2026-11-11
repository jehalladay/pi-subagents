import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { basename } from "node:path";
import { gpReconcileCli, parseSelectBeadArgs, selectBeadCli } from "../dist/select-bead-cli.js";
const require_basename = (path: string): string => basename(path);
import type { SelectBeadOutput, SelectBeadSeams } from "../dist/select-bead-cli.js";
import type { BdExecutor } from "../dist/beads-host.js";
import type { GpExecutor } from "../dist/graph-policy-cli.js";

// Every directory this file creates under tmpdir() is removed when the file's tests finish; tmpdir-hygiene.test.ts pins the residue.
const scratchDirs: string[] = [];
const scratchDir = (prefix: string): string => { const dir = mkdtempSync(join(tmpdir(), prefix)); scratchDirs.push(dir); return dir; };
after(() => { for (const dir of scratchDirs) rmSync(dir, { recursive: true, force: true }); });

// selectBeadCli reads Beads through the BdExecutor seam, gp through the GpExecutor seam and claims through the
// claim seam, so every leg runs on canned results without a store, a gp process or a claim. Records go through
// the writeFile seam and are inspected in memory.
const CK = "graphpolicy.checkpoint.c1:" + "c".repeat(64);
const store = realpathSync(scratchDir("mw-store-"));
const configDir = scratchDir("mw-gp-cfg-");
for (const name of ["program.json", "theta.json", "schema.json"]) writeFileSync(join(configDir, name), "{}");
writeFileSync(join(configDir, "config.json"), JSON.stringify({ schema: "mw.graph-policy-config.v1", id: "t1", program: "program.json", theta: "theta.json", checkpoint: CK, graphSchema: "schema.json", port: "beadScore", candidateType: "beads", temperature: 1, timeoutMs: 5000 }));
const configPath = join(configDir, "config.json");
const ready = [
  { id: "A", status: "open", issue_type: "task", priority: 2, created_at: "2026-10-20T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0, dependencies: [] },
  { id: "B", status: "open", issue_type: "task", priority: 1, created_at: "2026-10-20T01:00:00Z", dependency_count: 0, dependent_count: 1, comment_count: 0, dependencies: [] },
  { id: "C", status: "in_progress", issue_type: "task", priority: 1, created_at: "2026-10-19T00:00:00Z", dependency_count: 0, dependent_count: 0, comment_count: 0, dependencies: [] },
];
const bdReady: BdExecutor = argv => argv.includes("ready") ? { stdout: JSON.stringify(ready), stderr: "", exitCode: 0 } : { stdout: "", stderr: "unexpected " + argv.join(" "), exitCode: 1 };
const GP_COMMANDS = ["sample", "feedback add", "journal append"];
const sampleEnvelope = (chosen: string, commands: readonly string[] | null = GP_COMMANDS) => JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: { checkpoint: CK }, ...(commands === null ? {} : { capabilities: { commands } }), result: { chosen, log_probability: "bf000000", seed: "7", decision_digest: "sha256:" + "d".repeat(64), journal_entry: "e".repeat(64), receipt_store: { blob: "r".repeat(64), deduplicated: false },
  decision: { candidates: ["A", "B"], scores: ["3f800000", "40000000"], probabilities: ["3e800000", "3f400000"], log_probabilities: ["bf800000", "bf000000"], program_digest: "p", checkpoint_digest: CK, graph_digest: "sha256:" + "a".repeat(64), backend_id: "reference", temperature: "3f800000" } } });
const feedbackEnvelope = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: { decision: "e".repeat(64), feedback_digest: "f".repeat(64), correction_digest: "f".repeat(64), seq: 1 } });
const effectEnvelope = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: { kind: "effect-outcome-reference", digest: "9".repeat(64), seq: 3, prev: "a".repeat(64) } });
const admissionEnvelope = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: { kind: "host-admission", decision: "e".repeat(64), digest: "a".repeat(64), seq: 2, prev: "b".repeat(64) } });
const observationEnvelope = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: true, identities: {}, result: { kind: "observation", digest: "9".repeat(64), seq: 0, prev: null } });
const appendRefusal = JSON.stringify({ schema: "graphpolicy.cli.v1", ok: false, identities: {}, error: { code: "GP_CLI_DECISION_INVALID", category: "invalid-input", retryable: false, details: { message: "decisionDigest must name a sampled-decision entry of this journal" } } });
interface Run { code: number; out: SelectBeadOutput; files: Map<string, string>; gpArgv: string[][]; claims: string[] }
async function run(args: readonly string[], seams: Partial<SelectBeadSeams> & { gpChosen?: string; claimFails?: boolean; gpCommands?: readonly string[] | null; appendRefused?: boolean; observationRefused?: boolean } = {}): Promise<Run> {
  const files = new Map<string, string>(); const gpArgv: string[][] = []; const claims: string[] = [];
  const gp: GpExecutor = argv => { gpArgv.push([...argv]); if (argv[0] === "journal" && ((argv[3] === "host-admission" && seams.appendRefused) || (argv[3] === "observation" && seams.observationRefused))) return { stdout: appendRefusal, stderr: "", exitCode: 2 };
    return { stdout: argv[0] === "feedback" ? feedbackEnvelope : argv[0] === "journal" ? (argv[3] === "observation" ? observationEnvelope : admissionEnvelope) : sampleEnvelope(seams.gpChosen ?? "B", seams.gpCommands === undefined ? GP_COMMANDS : seams.gpCommands), stderr: "", exitCode: 0 }; };
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  let code: number;
  try {
    code = await selectBeadCli(["--beads-directory", store, ...args], {
      bd: seams.bd ?? bdReady, gp, env: {}, now: () => "2026-10-21T07:00:00.000Z", workdir: () => ({ write: (name, content) => { files.set("work/" + name, content); return "/w/" + name; } }),
      writeFile: (path, text, append) => files.set(path, append ? (files.get(path) ?? "") + text : text), ensureDir: path => files.set("dir:" + path, ""),
      claim: async (_dir, id) => { claims.push(id); if (seams.claimFails) throw new Error("BEADS_CLAIM_UNCERTAIN: another actor owns it"); return { issueId: id, status: "in_progress" as const }; },
    });
  } finally { process.stdout.write = original; }
  return { code, out: JSON.parse(written.join("")) as SelectBeadOutput, files, gpArgv, claims };
}

test("argument parsing: required directory, closed mode vocabulary, config/entry/records required outside off, seed shape, env fallbacks", () => {
  assert.throws(() => parseSelectBeadArgs([], {}), /MISSING_ARGUMENT/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--bogus"], {}), /UNKNOWN_ARGUMENT/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory"], {}), /INVALID_ARGUMENT/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--gp-mode", "adaptive"], {}), /GP_MODE_INVALID/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--gp-mode", "shadow"], {}), /GP_CONFIG_REQUIRED/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--gp-mode", "shadow", "--gp-config", "c"], {}), /GP_ENTRY_REQUIRED/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--gp-mode", "shadow", "--gp-config", "c", "--gp-entry", "e"], {}), /GP_RECORDS_REQUIRED/);
  assert.throws(() => parseSelectBeadArgs(["--beads-directory", "/s", "--seed", "x1"], {}), /INVALID_ARGUMENT: --seed/);
  const parsed = parseSelectBeadArgs(["--beads-directory", "/s", "--support", "A, B", "--types", "task", "--seed", "42", "--claim"], { MW_GP_MODE: "canary", MW_GP_CONFIG: "/c.json", MW_GP_ENTRY: "/gp.js", MW_GP_RECORDS: "/r" });
  assert.deepEqual(parsed, { directory: "/s", mode: "canary", config: "/c.json", entry: "/gp.js", records: "/r", allow: ["A", "B"], types: ["task"], seed: "42", claim: true });
  assert.equal(parseSelectBeadArgs(["--beads-directory", "/s", "--gp-mode", "off"], { MW_GP_MODE: "canary" }).mode, "off");
});

test("off mode: the host baseline is resolved from Beads' native ready list, gp is never spawned, no claim without --claim", async () => {
  const r = await run([]);
  assert.equal(r.code, 0); assert.equal(r.out.mode, "select-bead");
  assert.deepEqual(r.out.selection.support, ["A", "B"]); assert.equal(r.out.selection.readyCount, 3);
  assert.deepEqual(r.out.selection.resolved, { beadId: "B", source: "host-baseline" }); assert.equal(r.out.selection.advice, null); assert.equal(r.out.claim, null);
  assert.equal(r.gpArgv.length, 0); assert.equal(r.claims.length, 0); assert.equal(r.files.size, 0); assert.equal(r.out.admission, null);
  const none = await run(["--support", "zzz"]);
  assert.equal(none.code, 3); assert.equal(none.out.selection.resolved, null);
});

test("Beads failures are refusals, never an empty ready set", async () => {
  await assert.rejects(() => run([], { bd: () => ({ stdout: "", stderr: "boom", exitCode: 1 }) }), /BEADS_QUERY_UNESTABLISHED/);
  await assert.rejects(() => run([], { bd: () => ({ stdout: "nope", stderr: "", exitCode: 0 }) }), /BEADS_RESPONSE_INVALID/);
});

test("shadow mode: gp draws over exactly the host support, the baseline is still resolved, records and the gp journal path are written", async () => {
  const r = await run(["--gp-mode", "shadow", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7"]);
  assert.equal(r.code, 0);
  assert.deepEqual(r.out.selection.resolved, { beadId: "B", source: "host-baseline" });
  assert.equal(r.out.selection.advice?.kind, "advice"); if (r.out.selection.advice?.kind === "advice") assert.equal(r.out.selection.advice.chosen, "B");
  assert.equal(r.out.selection.receipt?.logProb, 0); assert.equal(r.out.selection.receipt?.feedback.status, "unknown");
  assert.deepEqual(r.gpArgv.map(a => a[0]), ["journal", "sample", "journal"], "observation, then the draw, then the admission"); assert.equal(r.gpArgv[0]?.[3], "observation"); assert.ok(r.gpArgv[1]?.includes("--journal") && r.gpArgv[1]?.includes("/rec/gp-journal.jsonl")); assert.ok(r.files.has("dir:/rec"), "records directory ensured before the draw");
  // A shadow draw was not acted on: the host records its admission as denied beside gp's decision.
  const admission = r.gpArgv[2] ?? []; assert.deepEqual(admission.slice(0, 5), ["journal", "append", "--kind", "host-admission", "--record"]); assert.equal(admission.at(-3), "--journal"); assert.equal(admission.at(-2), "/rec/gp-journal.jsonl"); assert.equal(admission.at(-1), "--json");
  assert.deepEqual(r.out.admission, { status: "denied", digest: "a".repeat(64) });
  const record = JSON.parse(r.files.get("work/host-admission.json") ?? "") as { kind: string; decisionDigest: string; status: string; host: { adapter: string; ref: string; scope: string } };
  assert.equal(record.kind, "host-admission"); assert.equal(record.decisionDigest, "e".repeat(64)); assert.equal(record.status, "denied"); assert.equal(admission[5], "@/w/host-admission.json");
  const link = record.host;
  assert.equal(link.adapter, "mechanicalworkflows.development-rig.select-bead"); assert.equal(link.ref, "mw:bead-selection/" + r.out.selection.decisionId + "#shadow:host-baseline"); assert.equal(link.scope, "beads://" + require_basename(store) + "#B");
  assert.deepEqual(JSON.parse(r.files.get("work/candidates.json") ?? ""), { beads: ["A", "B"] });
  const selectionFile = [...r.files.keys()].find(k => k.startsWith("/rec/selections/sel:"));
  assert.ok(selectionFile, "selection record written"); assert.equal((JSON.parse(r.files.get(selectionFile!) ?? "") as SelectBeadOutput).selection.decisionId, r.out.selection.decisionId);
  const experience = (r.files.get("/rec/experience.jsonl") ?? "").trim().split("\n").map(l => JSON.parse(l) as Record<string, unknown>);
  assert.equal(experience.length, 1); assert.equal(experience[0]?.["schema"], "mw.decision-experience.v1"); assert.equal(experience[0]?.["claim"], null); assert.equal(experience[0]?.["propensity"], 0);
  assert.equal(r.claims.length, 0);
});

test("canary mode with --claim: gp's in-support choice is claimed through the native claim seam and earns one pending feedback record", async () => {
  const r = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7", "--claim"], { gpChosen: "A" });
  assert.equal(r.code, 0);
  assert.deepEqual(r.out.selection.resolved, { beadId: "A", source: "graph-policy" }); assert.deepEqual(r.claims, ["A"]);
  assert.deepEqual(r.out.claim, { status: "in_progress" }); assert.deepEqual(r.out.feedback, { entry: "f".repeat(64) });
  assert.equal(r.out.selection.receipt?.logProb, -0.5); assert.equal(r.out.selection.receipt?.feedback.status, "pending");
  const feedback = r.gpArgv.find(a => a[0] === "feedback"); assert.ok(feedback); assert.ok(feedback?.includes("e".repeat(64)));
  assert.equal(r.gpArgv.filter(a => a[0] === "admission").length, 0, "the retired admission add verb is never spawned");
  const admitted = r.gpArgv.find(a => a[0] === "journal" && a[3] === "host-admission"); assert.ok(admitted); assert.equal((JSON.parse(r.files.get("work/host-admission.json") ?? "") as { status: string }).status, "admitted"); assert.deepEqual(r.out.admission, { status: "admitted", digest: "a".repeat(64) });
  const evidence = JSON.parse(r.files.get("work/feedback-pending.json") ?? "") as { labelClass: string; value: { status: string }; evidence: { ref: string } };
  assert.equal(evidence.labelClass, "source-verified"); assert.equal(evidence.value.status, "pending"); assert.equal(evidence.evidence.ref, "mw:bead-selection/" + r.out.selection.decisionId);
  const experience = (r.files.get("/rec/experience.jsonl") ?? "").trim().split("\n").map(l => JSON.parse(l) as Record<string, unknown>);
  assert.equal(experience[0]?.["claim"], "in_progress"); assert.equal(experience[0]?.["propensity"], -0.5);
});

test("canary mode: a gp choice outside the support falls back to the baseline with the reason, and a refused claim exits 1 without feedback", async () => {
  const outside = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--claim"], { gpChosen: "C" });
  assert.deepEqual(outside.out.selection.resolved, { beadId: "B", source: "host-fallback", fallbackReason: "GP_CHOICE_OUTSIDE_SUPPORT" });
  assert.deepEqual(outside.claims, ["B"]); assert.equal(outside.out.feedback, null); assert.equal(outside.code, 0);
  assert.deepEqual(outside.out.admission, { status: "denied", digest: "a".repeat(64) }, "the fallback denies gp's out-of-support draw in gp's journal");
  const refused = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--claim"], { gpChosen: "A", claimFails: true });
  assert.equal(refused.code, 1); assert.match((refused.out.claim as { refused: string }).refused, /BEADS_CLAIM_UNCERTAIN/); assert.equal(refused.out.feedback, null);
  assert.equal(refused.gpArgv.filter(a => a[0] === "feedback").length, 0);
  const experience = (refused.files.get("/rec/experience.jsonl") ?? "").trim().split("\n").map(l => JSON.parse(l) as Record<string, unknown>);
  assert.equal(experience[0]?.["claim"], "refused");
});

test("canary mode: a gp whose capabilities omit journal append is never asked to append; the admission is recorded once as GP_UNSUPPORTED and the selection stands", async () => {
  for (const gpCommands of [["sample", "feedback add"], null]) {
    const r = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7", "--claim"], { gpChosen: "A", gpCommands });
    assert.equal(r.code, 0); assert.deepEqual(r.out.selection.resolved, { beadId: "A", source: "graph-policy" }); assert.deepEqual(r.claims, ["A"]);
    assert.equal(r.gpArgv.filter(a => (a[0] === "journal" && a[3] === "host-admission") || a[0] === "admission").length, 0, "nothing is spawned for the admission");
    assert.deepEqual(r.out.admission, { status: "admitted", failed: "GP_UNSUPPORTED: verb absent from capabilities.commands: journal append" });
    assert.equal(r.files.has("work/host-admission.json"), false, "no record file is written");
  }
});

test("canary mode: a refused journal append is recorded once with gp's own code and is never retried; shadow denies once", async () => {
  const canary = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7"], { gpChosen: "A", appendRefused: true });
  assert.equal(canary.gpArgv.filter(a => a[0] === "journal" && a[3] === "host-admission").length, 1, "one spawn, no retry");
  assert.equal(canary.out.admission && "failed" in canary.out.admission ? canary.out.admission.failed.startsWith("GP_REFUSED: GP_CLI_DECISION_INVALID") : false, true);
  assert.equal(canary.out.admission?.status, "admitted");
  const shadow = await run(["--gp-mode", "shadow", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7"], { gpChosen: "A", appendRefused: true });
  assert.equal(shadow.gpArgv.filter(a => a[0] === "journal" && a[3] === "host-admission").length, 1);
  assert.equal(shadow.out.admission?.status, "denied"); assert.deepEqual(shadow.out.selection.resolved, { beadId: "B", source: "host-baseline" });
});

test("shadow and canary journal the observation before the draw and sample with the receipt store: argv, record, and the attested revision order from prior experience rows", async () => {
  const records = scratchDir("mw-gp-obs-");
  writeFileSync(join(records, "experience.jsonl"), '{"n":1}\n{"n":2}\n');
  const r = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", records, "--seed", "7", "--claim"], { gpChosen: "A" });
  assert.equal(r.code, 0);
  const sample = r.gpArgv.find(a => a[0] === "sample") ?? [];
  assert.deepEqual(sample.slice(sample.indexOf("--journal"), sample.indexOf("--journal") + 5), ["--journal", join(records, "gp-journal.jsonl"), "--store", join(records, "gp-store"), "--store-receipt"]);
  assert.ok(r.files.has("dir:" + join(records, "gp-store")), "the receipt store directory is ensured before the draw");
  const observation = JSON.parse(r.files.get("work/observation.json") ?? "") as { kind: string; snapshotDigest: string; provenance: { adapter: string; scope: string } };
  assert.equal(observation.kind, "observation"); assert.match(observation.snapshotDigest, /^[0-9a-f]{64}$/); assert.equal(observation.provenance.scope, "beads://" + require_basename(store) + "#ready");
  const snapshot = JSON.parse(r.files.get("work/snapshot.json") ?? "") as { observation: { revisions: string[]; revision_order: { attested_by: string; ordinal: number; covers: string[] } } };
  assert.deepEqual(snapshot.observation.revision_order, { attested_by: "mechanicalworkflows.development-rig.select-bead", ordinal: 3, covers: snapshot.observation.revisions });
  assert.equal(r.out.selection.advice?.kind === "advice" ? r.out.selection.advice.observation?.digest : null, "9".repeat(64));
  assert.equal(r.out.selection.advice?.kind === "advice" ? r.out.selection.advice.gp.receiptBlob : null, "r".repeat(64));
});

test("canary mode: an observation gp refuses to journal means no draw is taken: gp is never asked to sample, the baseline resolves with GP_OBSERVATION_MISSING, nothing is owed in the journal", async () => {
  const r = await run(["--gp-mode", "canary", "--gp-config", configPath, "--gp-entry", "/gp/main.js", "--records", "/rec", "--seed", "7", "--claim"], { gpChosen: "A", observationRefused: true });
  assert.equal(r.code, 0);
  assert.deepEqual(r.out.selection.resolved, { beadId: "B", source: "host-fallback", fallbackReason: "GP_OBSERVATION_MISSING" }); assert.deepEqual(r.claims, ["B"]);
  assert.deepEqual(r.gpArgv.map(a => a[0]), ["journal"], "one observation attempt, no sample, no admission, no feedback");
  assert.equal(r.out.admission, null); assert.equal(r.out.feedback, null);
  assert.equal(r.out.selection.advice?.kind === "abstain" ? r.out.selection.advice.reason : null, "GP_OBSERVATION_MISSING");
  assert.match(r.out.selection.advice?.kind === "abstain" ? r.out.selection.advice.detail : "", /^GP_REFUSED: GP_CLI_DECISION_INVALID/);
});

test("gp-reconcile resolves pending feedback only from Beads' authoritative state: closed → 1, released → 0, in progress stays pending", async () => {
  const records = scratchDir("mw-gp-rec-");
  const row = (id: string, bead: string, claim: string | null, source = "graph-policy") => JSON.stringify({ schema: "mw.decision-experience.v1", decisionId: id, gp: { journalEntry: "e".repeat(64) }, resolved: { beadId: bead, source }, claim });
  writeFileSync(join(records, "experience.jsonl"), [row("sel:1", "A", "in_progress"), row("sel:2", "B", "in_progress"), row("sel:3", "C", "in_progress"), row("sel:4", "D", null), row("sel:5", "E", "in_progress", "host-baseline")].join("\n") + "\n");
  mkdirSync(join(records, "selections"), { recursive: true });
  for (const [id, root] of [["sel:1", "1"], ["sel:2", "2"], ["sel:3", "3"]] as const) writeFileSync(join(records, "selections", id + ".json"), JSON.stringify({ feedback: { entry: root.repeat(64) }, admission: { status: "admitted", digest: root.repeat(32) + "a".repeat(32) } }));
  const shows: Record<string, unknown> = { A: { id: "A", status: "closed", assignee: "x" }, B: { id: "B", status: "open", assignee: "" }, C: { id: "C", status: "in_progress", assignee: "x" } };
  const bd: BdExecutor = argv => argv.includes("show") ? { stdout: JSON.stringify([shows[argv[argv.indexOf("show") + 1] ?? ""]]), stderr: "", exitCode: 0 } : { stdout: "", stderr: "", exitCode: 1 };
  const evidence: string[] = []; const gpArgv: string[][] = [];
  const gp: GpExecutor = argv => { gpArgv.push([...argv]); return { stdout: argv[0] === "journal" ? effectEnvelope : feedbackEnvelope, stderr: "", exitCode: 0 }; };
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  let code: number; const files = new Map<string, string>();
  try { code = await gpReconcileCli(["--beads-directory", store, "--records", records, "--gp-config", configPath, "--gp-entry", "/gp/main.js"], { bd, gp, env: {}, workdir: () => ({ write: (_n, c) => { evidence.push(c); return "/w/f.json"; } }), writeFile: (path, text) => files.set(path, text) }); }
  finally { process.stdout.write = original; }
  assert.equal(code, 0);
  const out = JSON.parse(written.join("")) as { examined: number; results: Record<string, unknown>[] };
  assert.equal(out.examined, 5);
  assert.deepEqual(out.results.map(r => [r["decisionId"], r["outcome"], r["scalar"] ?? null]), [["sel:1", "resolved", 1], ["sel:2", "resolved", 0], ["sel:3", "pending", null]]);
  assert.equal(gpArgv.length, 4, "one feedback correction and one effect-outcome-reference per resolved decision, none for the pending one");
  assert.deepEqual(gpArgv.map(a => a.slice(0, 4)), [["feedback", "add", "--supersedes", "1".repeat(64)], ["journal", "append", "--kind", "effect-outcome-reference"], ["feedback", "add", "--supersedes", "2".repeat(64)], ["journal", "append", "--kind", "effect-outcome-reference"]]);
  assert.ok(gpArgv.every(a => !a.includes("--decision")), "the resolved value supersedes the pending root and never appends a second root");
  const feedbackDocs = [evidence[0], evidence[2]]; const effectDocs = [evidence[1], evidence[3]];
  assert.deepEqual(feedbackDocs.map(e => (JSON.parse(e ?? "") as { reason: string }).reason), ["evidence-revised", "evidence-revised"]);
  assert.deepEqual(feedbackDocs.map(e => (JSON.parse(e ?? "") as { value: { scalar: string } }).value.scalar), ["3f800000", "00000000"]);
  assert.deepEqual(feedbackDocs.map(e => (JSON.parse(e ?? "") as { evidence: { ref: string } }).evidence.ref), ["bd:A#closed", "bd:B#open"]);
  // The effect-outcome-reference joins the host-admission digest select-bead recorded; closed -> succeeded, released -> failed.
  assert.deepEqual(effectDocs.map(e => (JSON.parse(e ?? "") as { kind: string; admissionDigest: string; outcome: string }).admissionDigest), ["1".repeat(32) + "a".repeat(32), "2".repeat(32) + "a".repeat(32)]);
  assert.deepEqual(effectDocs.map(e => (JSON.parse(e ?? "") as { outcome: string }).outcome), ["succeeded", "failed"]);
  assert.deepEqual(effectDocs.map(e => (JSON.parse(e ?? "") as { effect: { adapter: string; scope: string; ref: string } }).effect.ref), ["bd:A#closed", "bd:B#open"]);
  assert.deepEqual((JSON.parse(effectDocs[0] ?? "") as { effect: { adapter: string; scope: string } }).effect.scope, "beads://" + basename(store) + "#A");
  assert.deepEqual(out.results.map(r => (r["effectOutcome"] as { entry?: string } | undefined)?.entry ?? null), ["9".repeat(64), "9".repeat(64), null]);
  const state = JSON.parse(files.get(join(records, "feedback-state.json")) ?? "{}") as Record<string, { status: string; scalar: number; entry: string; supersedes: string }>;
  assert.deepEqual(Object.keys(state).sort(), ["sel:1", "sel:2"]); assert.equal(state["sel:2"]?.scalar, 0);
  assert.deepEqual(state["sel:1"], { status: "resolved", scalar: 1, entry: "f".repeat(64), supersedes: "1".repeat(64), admission: "1".repeat(32) + "a".repeat(32), effectOutcome: "9".repeat(64) });
  await assert.rejects(() => gpReconcileCli(["--records", records], { env: {} }), /MISSING_ARGUMENT/);
  await assert.rejects(() => gpReconcileCli(["--beads-directory", store], { env: {} }), /GP_RECORDS_REQUIRED/);
  await assert.rejects(() => gpReconcileCli(["--beads-directory", store, "--records", records], { env: {} }), /GP_CONFIG_REQUIRED/);
  await assert.rejects(() => gpReconcileCli(["--beads-directory", store, "--records", records, "--gp-config", configPath], { env: {} }), /GP_ENTRY_REQUIRED/);
  await assert.rejects(() => gpReconcileCli(["--beads-directory", store, "--nope", "x"], { env: {} }), /UNKNOWN_ARGUMENT/);
});

test("gp-reconcile refuses to write a second root when the pending record holds no stored root entry: named condition, no gp call, no state row", async () => {
  const records = scratchDir("mw-gp-rec-noroot-");
  const row = (id: string, bead: string) => JSON.stringify({ schema: "mw.decision-experience.v1", decisionId: id, gp: { journalEntry: "e".repeat(64) }, resolved: { beadId: bead, source: "graph-policy" }, claim: "in_progress" });
  writeFileSync(join(records, "experience.jsonl"), [row("sel:1", "A"), row("sel:2", "B")].join("\n") + "\n");
  mkdirSync(join(records, "selections"), { recursive: true });
  writeFileSync(join(records, "selections", "sel:2.json"), JSON.stringify({ feedback: { failed: "GP_REFUSED: x" } }));
  const bd: BdExecutor = argv => ({ stdout: JSON.stringify([{ id: argv[argv.indexOf("show") + 1], status: "closed", assignee: "x" }]), stderr: "", exitCode: 0 });
  const gpArgv: string[][] = []; const files = new Map<string, string>();
  const gp: GpExecutor = argv => { gpArgv.push([...argv]); return { stdout: feedbackEnvelope, stderr: "", exitCode: 0 }; };
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  try { await gpReconcileCli(["--beads-directory", store, "--records", records, "--gp-config", configPath, "--gp-entry", "/gp/main.js"], { bd, gp, env: {}, workdir: () => ({ write: () => "/w/f.json" }), writeFile: (path, text) => files.set(path, text) }); }
  finally { process.stdout.write = original; }
  const out = JSON.parse(written.join("")) as { results: Record<string, unknown>[] };
  assert.deepEqual(out.results.map(r => [r["decisionId"], r["outcome"]]), [["sel:1", "GP_FEEDBACK_ROOT_MISSING"], ["sel:2", "GP_FEEDBACK_ROOT_MISSING"]]);
  assert.equal(gpArgv.length, 0, "no feedback add of any shape is spawned");
  assert.deepEqual(JSON.parse(files.get(join(records, "feedback-state.json")) ?? "{}"), {});
});

test("gp-reconcile refuses a resolved decision whose selection record holds no host-admission digest: named condition, no gp call, no state row", async () => {
  const records = scratchDir("mw-gp-rec-noadm-");
  const row = (id: string, bead: string) => JSON.stringify({ schema: "mw.decision-experience.v1", decisionId: id, gp: { journalEntry: "e".repeat(64) }, resolved: { beadId: bead, source: "graph-policy" }, claim: "in_progress" });
  writeFileSync(join(records, "experience.jsonl"), [row("sel:1", "A"), row("sel:2", "B")].join("\n") + "\n");
  mkdirSync(join(records, "selections"), { recursive: true });
  writeFileSync(join(records, "selections", "sel:1.json"), JSON.stringify({ feedback: { entry: "1".repeat(64) }, admission: null }));
  writeFileSync(join(records, "selections", "sel:2.json"), JSON.stringify({ feedback: { entry: "2".repeat(64) }, admission: { status: "admitted", failed: "GP_UNSUPPORTED: verb absent" } }));
  const bd: BdExecutor = argv => ({ stdout: JSON.stringify([{ id: argv[argv.indexOf("show") + 1], status: "closed", assignee: "x" }]), stderr: "", exitCode: 0 });
  const gpArgv: string[][] = []; const files = new Map<string, string>();
  const gp: GpExecutor = argv => { gpArgv.push([...argv]); return { stdout: feedbackEnvelope, stderr: "", exitCode: 0 }; };
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  try { await gpReconcileCli(["--beads-directory", store, "--records", records, "--gp-config", configPath, "--gp-entry", "/gp/main.js"], { bd, gp, env: {}, workdir: () => ({ write: () => "/w/f.json" }), writeFile: (path, text) => files.set(path, text) }); }
  finally { process.stdout.write = original; }
  const out = JSON.parse(written.join("")) as { results: Record<string, unknown>[] };
  assert.deepEqual(out.results.map(r => [r["decisionId"], r["outcome"]]), [["sel:1", "GP_ADMISSION_DIGEST_MISSING"], ["sel:2", "GP_ADMISSION_DIGEST_MISSING"]]);
  assert.equal(gpArgv.length, 0, "neither a feedback correction nor an effect-outcome-reference is spawned");
  assert.deepEqual(JSON.parse(files.get(join(records, "feedback-state.json")) ?? "{}"), {});
});

test("gp-reconcile records a failed effect-outcome-reference append beside the resolved feedback without retrying it", async () => {
  const records = scratchDir("mw-gp-rec-effectfail-");
  writeFileSync(join(records, "experience.jsonl"), JSON.stringify({ schema: "mw.decision-experience.v1", decisionId: "sel:1", gp: { journalEntry: "e".repeat(64) }, resolved: { beadId: "A", source: "graph-policy" }, claim: "in_progress" }) + "\n");
  mkdirSync(join(records, "selections"), { recursive: true });
  writeFileSync(join(records, "selections", "sel:1.json"), JSON.stringify({ feedback: { entry: "1".repeat(64) }, admission: { status: "admitted", digest: "5".repeat(64) } }));
  const bd: BdExecutor = argv => ({ stdout: JSON.stringify([{ id: argv[argv.indexOf("show") + 1], status: "closed", assignee: "x" }]), stderr: "", exitCode: 0 });
  const gpArgv: string[][] = []; const files = new Map<string, string>();
  const gp: GpExecutor = argv => { gpArgv.push([...argv]); return argv[0] === "journal" ? { stdout: appendRefusal, stderr: "", exitCode: 2 } : { stdout: feedbackEnvelope, stderr: "", exitCode: 0 }; };
  const written: string[] = []; const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  try { await gpReconcileCli(["--beads-directory", store, "--records", records, "--gp-config", configPath, "--gp-entry", "/gp/main.js"], { bd, gp, env: {}, workdir: () => ({ write: () => "/w/f.json" }), writeFile: (path, text) => files.set(path, text) }); }
  finally { process.stdout.write = original; }
  const out = JSON.parse(written.join("")) as { results: Record<string, unknown>[] };
  assert.equal(out.results[0]?.["outcome"], "resolved");
  assert.match(String((out.results[0]?.["effectOutcome"] as { failed: string }).failed), /^GP_REFUSED: /);
  assert.deepEqual(gpArgv.map(a => a[0]), ["feedback", "journal"], "exactly one attempt of each");
  const state = JSON.parse(files.get(join(records, "feedback-state.json")) ?? "{}") as Record<string, Record<string, unknown>>;
  assert.equal(state["sel:1"]?.["status"], "resolved"); assert.equal(state["sel:1"]?.["effectOutcome"], undefined);
});
