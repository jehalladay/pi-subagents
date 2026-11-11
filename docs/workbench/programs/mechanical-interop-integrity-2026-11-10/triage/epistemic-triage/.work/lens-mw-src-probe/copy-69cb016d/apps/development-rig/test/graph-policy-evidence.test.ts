import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateDecisionReceipt } from "@mechanical/workflows-coordination";
import type { SelectBeadOutput } from "../dist/select-bead-cli.js";

// The committed 2026-10-21 live records (qa/integration/2026-10-21-graph-policy-bead-selection.md) must keep the
// invariants the host enforces: gp's choice inside the host support, a validating receipt, the exact gp identities
// of the committed config, and a native claim only on the canary.
const here = dirname(fileURLToPath(import.meta.url));
const evidence = (name: string) => JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence", name), "utf8")) as SelectBeadOutput;
const config = JSON.parse(readFileSync(join(here, "../graph-policy/bead-scorer-v1/config.json"), "utf8")) as { checkpoint: string };

test("the live shadow record kept the host baseline, recorded an in-support gp draw and a validating receipt with a deterministic propensity", () => {
  const shadow = evidence("2026-10-21-gp-shadow-selection.json");
  const s = shadow.selection;
  assert.equal(s.mode, "shadow"); assert.equal(s.readyCount, s.support.length); assert.equal(s.resolved?.source, "host-baseline");
  assert.equal(s.resolved?.beadId, s.baseline?.beadId); assert.equal(shadow.claim, null); assert.equal(shadow.feedback, null);
  assert.equal(s.advice?.kind, "advice");
  if (s.advice?.kind === "advice") {
    assert.ok(s.support.includes(s.advice.chosen)); assert.ok(s.advice.logProb < 0); assert.equal(s.advice.ranking.length, s.support.length);
    assert.equal(s.advice.identities["checkpoint"], config.checkpoint); assert.equal(s.advice.gp.checkpointDigest, config.checkpoint);
    assert.match(s.advice.gp.journalEntry ?? "", /^[0-9a-f]{64}$/);
  }
  assert.deepEqual(validateDecisionReceipt(s.receipt!), { ok: true }); assert.equal(s.receipt?.logProb, 0); assert.equal(s.receipt?.feedback.status, "unknown");
});

test("the live canary record resolved gp's in-support draw, claimed it natively and carries the exact recorded log probability with pending feedback", () => {
  const canary = evidence("2026-10-21-gp-canary-selection.json");
  const s = canary.selection;
  assert.equal(s.mode, "canary"); assert.equal(s.support.length, 5); assert.equal(s.resolved?.source, "graph-policy");
  assert.equal(s.advice?.kind, "advice");
  if (s.advice?.kind === "advice") {
    assert.equal(s.resolved?.beadId, s.advice.chosen); assert.ok(s.support.includes(s.advice.chosen));
    assert.equal(s.receipt?.logProb, s.advice.logProb); assert.ok(s.advice.logProb < 0 && s.advice.logProb > -5);
    assert.equal(s.advice.identities["checkpoint"], config.checkpoint);
  }
  assert.deepEqual(canary.claim, { status: "in_progress" }); assert.equal(s.receipt?.feedback.status, "pending");
  assert.deepEqual(s.receipt?.actions, { proposed: [s.resolved!.beadId], admitted: [s.resolved!.beadId], executed: "unknown" });
  assert.deepEqual(validateDecisionReceipt(s.receipt!), { ok: true });
  const journal = readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-canary-journal.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as { digest: string; prev: string | null; record: { kind: string; decisionDigest?: string; value?: { status: string } } });
  assert.equal(journal.length, 2); assert.equal(journal[0]?.record.kind, "sampled-decision"); assert.equal(journal[1]?.record.kind, "feedback");
  assert.equal(journal[1]?.prev, journal[0]?.digest); assert.equal(journal[1]?.record.decisionDigest, journal[0]?.digest); assert.equal(journal[1]?.record.value?.status, "pending");
  if (s.advice?.kind === "advice") assert.equal(s.advice.gp.journalEntry, journal[0]?.digest);
});

test("the overhead sample reports gp and wall milliseconds per seed and records the one Beads refusal honestly as a missing row", () => {
  const rows = readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-shadow-overhead.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as { seed: number; gp_ms: number; wall_ms: number; kind: string; chosen: string; support: number });
  assert.equal(rows.length, 9); assert.deepEqual(rows.map(r => r.seed), [11, 12, 13, 14, 15, 16, 17, 19, 20]);
  for (const row of rows) { assert.equal(row.kind, "advice"); assert.ok(row.gp_ms > 0 && row.gp_ms < row.wall_ms); assert.ok(row.support >= 58); assert.match(row.chosen, /^MechanicalWorkflows-/); }
});

test("the host's admission of the live canary draw chains to the decision entry in gp's journal and names the selection", () => {
  const journal = readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-canary-journal-admitted.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as { digest: string; prev: string | null; record: { kind: string; decisionDigest?: string; status?: string; host?: { adapter: string; ref: string; scope: string } } });
  assert.equal(journal.length, 3);
  assert.deepEqual(journal.map(e => e.record.kind), ["sampled-decision", "feedback", "host-admission"]);
  assert.equal(journal[2]?.prev, journal[1]?.digest); assert.equal(journal[2]?.record.decisionDigest, journal[0]?.digest); assert.equal(journal[2]?.record.status, "admitted");
  const canary = evidence("2026-10-21-gp-canary-selection.json");
  assert.equal(journal[2]?.record.host?.ref, "mw:bead-selection/" + canary.selection.decisionId + "#canary:graph-policy:claimed");
  assert.equal(journal[2]?.record.host?.scope, "beads://MechanicalWorkflows#" + canary.selection.resolved?.beadId);
  const admission = JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-canary-admission.json"), "utf8")) as { ok: boolean; result: { decision: string; status: string; admission_digest: string; seq: number } };
  assert.equal(admission.ok, true); assert.equal(admission.result.admission_digest, journal[2]?.digest); assert.equal(admission.result.decision, journal[0]?.digest); assert.equal(admission.result.seq, 2);
});

test("the live reconcile credited the canary decision from Beads' closed state: a resolved feedback with scalar one chained onto the admitted journal", () => {
  const reconcile = JSON.parse(readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-reconcile.json"), "utf8")) as { mode: string; examined: number; results: { decisionId: string; beadId: string; outcome: string; scalar: number; status: string; entry: string }[] };
  assert.equal(reconcile.mode, "gp-reconcile"); assert.equal(reconcile.examined, 1); assert.equal(reconcile.results.length, 1);
  const credited = reconcile.results[0]!;
  const canary = evidence("2026-10-21-gp-canary-selection.json");
  assert.equal(credited.decisionId, canary.selection.decisionId); assert.equal(credited.beadId, canary.selection.resolved?.beadId);
  assert.deepEqual([credited.outcome, credited.scalar, credited.status], ["resolved", 1, "closed"]);
  const journal = readFileSync(join(here, "../../../qa/integration/evidence/2026-10-21-gp-canary-journal-resolved.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as { digest: string; prev: string | null; record: { kind: string; decisionDigest?: string; value?: { status: string; scalar?: string }; labelClass?: string; evidence?: { ref: string } } });
  assert.deepEqual(journal.map(e => e.record.kind), ["sampled-decision", "feedback", "host-admission", "feedback"]);
  for (let i = 1; i < journal.length; i++) assert.equal(journal[i]?.prev, journal[i - 1]?.digest);
  const resolved = journal[3]!;
  assert.equal(resolved.digest, credited.entry); assert.equal(resolved.record.decisionDigest, journal[0]?.digest);
  assert.deepEqual(resolved.record.value, { status: "resolved", scalar: "3f800000" }); assert.equal(resolved.record.labelClass, "source-verified");
  assert.equal(resolved.record.evidence?.ref, "bd:" + credited.beadId + "#closed");
  assert.deepEqual(journal[1]?.record.value, { status: "pending" }, "the pending record stays in the chain; nothing was rewritten");
});

// docs/16 must describe the route the host actually takes for the admission write (seat ruling on MechanicalWorkflows-u54e,
// 2026-10-21 12:34Z): gp journal append on GraphPolicyCLI main, capability-gated, GP_UNSUPPORTED on absence, with the
// ratification status of GPR-1173 stated and the retired branch verb named as retired. A prose edit back to the branch
// route, or one that calls GPR-1173 adopted, must fail here.
test("docs/16 names the gp journal append admission route, its capability gate and GPR-1173's ratification status, and retires the branch verb", () => {
  const doc = readFileSync(join(here, "../../../docs/16-graph-policy-bead-selection.md"), "utf8").replace(/\s+/g, " ");
  assert.match(doc, /gp journal append --kind host-admission --record @FILE --journal FILE/);
  assert.match(doc, /capabilities\.commands/);
  assert.match(doc, /GP_UNSUPPORTED/);
  assert.match(doc, /GPR-1173[^.]*pending triage ratification/);
  assert.doesNotMatch(doc, /GPR-1173[^.]*\badopted\b/);
  assert.match(doc, /retired/);
  assert.doesNotMatch(doc, /gp admission add --decision/, "the branch verb is no longer a host route");
  assert.match(doc, /predates this route/, "the hand-written canary admission evidence is labelled as history");
});
