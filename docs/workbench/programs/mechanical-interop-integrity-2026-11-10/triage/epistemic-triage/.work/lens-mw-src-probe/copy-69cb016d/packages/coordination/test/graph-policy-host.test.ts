// MechanicalWorkflows-8oy5 (GPC-EAT-R005): when GraphPolicy is absent, unavailable, over budget,
// abstains or answers with a non-conforming body, the host adapter returns the configured
// fallback policy's proposal unchanged and records the fallback reason; every existing fixture
// runs identically with GraphPolicy unconfigured. No GraphPolicyCLI exists: the client is a stub
// of the program's proposed consumed envelope.
import test from "node:test";
import assert from "node:assert/strict";
import {
  graphPolicyHost, digest,
  runLandingQueue, restackFirst, fifoLanding,
  runCompactionInheritance, provenanceChecked,
  runColonyResilience, receiptChecked,
  runArtifactRecovery, resumeFromSnapshot,
  runQuorumEvidence, independentTestFirst,
} from "../dist/index.js";
import type { Policy, Intent, PolicyContext, GraphPolicyFallbackReason } from "../dist/index.js";

interface Seen<O> { readonly observation: O; readonly memory: number; readonly context: PolicyContext }
interface Probe<O> {
  readonly label: string;
  readonly policy: Policy<O, Intent, number>;
  readonly seen: readonly Seen<O>[];
  readonly fallbackHash: string;
  readonly hostHash: string;
  /** Build an unconfigured host over this probe's fallback and assert digest equality on every recorded (observation, memory, context). */
  checkUnconfigured(): void;
}

/** Run one fixture twice — once through a recording copy of the fallback, once through the unconfigured host — and keep every (observation, memory, context) the policy saw. */
function probe<O>(label: string, policy: Policy<O, Intent, number>, run: (policy: Policy<O, Intent, number>) => string): Probe<O> {
  const seen: Seen<O>[] = [];
  const recording: Policy<O, Intent, number> = {
    id: policy.id, revision: policy.revision,
    propose(observation, memory, context) { seen.push({ observation, memory, context }); return policy.propose(observation, memory, context); },
  };
  const fallbackHash = run(recording);
  const hostHash = run(graphPolicyHost({ fallback: policy }));
  return {
    label, policy, seen, fallbackHash, hostHash,
    checkUnconfigured(): void {
      assert.ok(seen.length > 0, `${label}: the fixture consulted the policy`);
      const host = graphPolicyHost({ fallback: policy });
      assert.deepEqual(host.configuration, { graphPolicy: "absent", fallback: { id: policy.id, revision: policy.revision }, reason: "GP_UNCONFIGURED" }, label);
      assert.equal(host.revision, policy.revision, label);
      for (const { observation, memory, context } of seen) {
        assert.equal(digest(host.propose(observation, memory, context)), digest(policy.propose(observation, memory, context)), `${label} step ${memory}`);
      }
    },
  };
}

const landing = probe("landing-queue seed 7 restack-first", restackFirst, policy => runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy }).finalHash);
const probes = [
  landing,
  probe("landing-queue seed 3 fifo", fifoLanding, policy => runLandingQueue({ seed: 3, candidates: 4, lanes: 1, steps: 12, policy }).finalHash),
  probe("compaction-inheritance seed 7", provenanceChecked, policy => runCompactionInheritance({ seed: 7, tasks: 8, policy }).finalHash),
  probe("colony-resilience seed 3", receiptChecked, policy => runColonyResilience({ seed: 3, workers: 4, compute: 4, steps: 16, policy }).finalHash),
  probe("artifact-recovery seed 7 treatment", resumeFromSnapshot, policy => runArtifactRecovery({ seed: 7, work: 10, steps: 14, arm: "treatment", policy }).finalHash),
  probe("quorum-evidence seed 7 independent-test-first", independentTestFirst, policy => runQuorumEvidence({ seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "authoritative", policy }).finalHash),
] as const;

test("with GraphPolicy unconfigured every proposal equals the fallback's, digest for digest, on every pinned fixture observation and seed", () => {
  for (const p of probes) p.checkUnconfigured();
});

test("negative control: every fixture episode re-run through the unconfigured host reproduces the fallback run's finalHash — no fixture depends on GraphPolicy", () => {
  for (const { label, fallbackHash, hostHash } of probes) assert.equal(hostHash, fallbackHash, label);
});

const first = landing.seen[0]!;
const base = landing.policy.propose(first.observation, first.memory, first.context);

/** The same intent with both scope lists removed, as a client omitting the members would send it. */
function omitScopes(intent: Intent): Record<string, unknown> {
  const { writeScopes: _write, readScopes: _read, ...rest } = intent;
  return rest;
}

test("a configured client that abstains, times out, exhausts its budget, throws or returns a malformed body yields the fallback proposal plus one gp-fallback trace line naming the reason with logProb unknown", () => {
  const stubs: [string, () => unknown, GraphPolicyFallbackReason, RegExp][] = [
    ["abstain", () => ({ status: "abstain" }), "GP_ABSTAIN", /abstained/],
    ["timeout", () => ({ status: "timeout" }), "GP_UNAVAILABLE", /timed out/],
    ["budget-exhausted", () => ({ status: "budget-exhausted" }), "GP_BUDGET_EXHAUSTED", /budget exhausted/],
    ["thrown transport error", () => { throw new Error("socket closed"); }, "GP_UNAVAILABLE", /socket closed/],
    ["proposal envelope without intents", () => ({ status: "proposal" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["non-object body", () => "garbage", "GP_RESPONSE_MALFORMED", /envelope/],
    ["authorized-effect intent", () => ({ status: "proposal", intents: [{ ...base.intents[0], authority: "authorized-effect" }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["non-finite logProb", () => ({ status: "proposal", intents: [...base.intents], logProb: Number.NaN }), "GP_RESPONSE_MALFORMED", /logProb/],
    // MechanicalWorkflows-1g2u: four conformance laws the rows above leave unpinned.
    ["observation-only authority intent (allowlist, not a single-literal denylist)", () => ({ status: "proposal", intents: [{ ...base.intents[0], authority: "observation-only" }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["admin authority intent (allowlist, not a single-literal denylist)", () => ({ status: "proposal", intents: [{ ...base.intents[0], authority: "admin" }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["negative claim dimension", () => ({ status: "proposal", intents: [{ ...base.intents[0], claim: { ...base.intents[0]!.claim, workers: -2 } }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["positive-infinity logProb", () => ({ status: "proposal", intents: [...base.intents], logProb: Number.POSITIVE_INFINITY }), "GP_RESPONSE_MALFORMED", /logProb/],
    ["negative-infinity logProb", () => ({ status: "proposal", intents: [...base.intents], logProb: Number.NEGATIVE_INFINITY }), "GP_RESPONSE_MALFORMED", /logProb/],
    ["intent without writeScopes and readScopes", () => ({ status: "proposal", intents: [omitScopes(base.intents[0]!)], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["intent with a blank write scope string", () => ({ status: "proposal", intents: [{ ...base.intents[0], writeScopes: ["  "] }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["intent with a blank read scope string", () => ({ status: "proposal", intents: [{ ...base.intents[0], readScopes: [""] }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    // MechanicalWorkflows-sx5o: the claim law on every dimension, not only workers.
    ["negative compute claim", () => ({ status: "proposal", intents: [{ ...base.intents[0], claim: { ...base.intents[0]!.claim, compute: -1 } }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["negative queue claim", () => ({ status: "proposal", intents: [{ ...base.intents[0], claim: { ...base.intents[0]!.claim, queue: -1 } }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["negative latencyMs claim", () => ({ status: "proposal", intents: [{ ...base.intents[0], claim: { ...base.intents[0]!.claim, latencyMs: -1 } }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
    ["non-finite compute claim", () => ({ status: "proposal", intents: [{ ...base.intents[0], claim: { ...base.intents[0]!.claim, compute: Number.POSITIVE_INFINITY } }], logProb: "unknown" }), "GP_RESPONSE_MALFORMED", /intent list/],
  ];
  for (const [label, client, reason, pattern] of stubs) {
    const host = graphPolicyHost({ fallback: landing.policy, client });
    assert.deepEqual(host.configuration, { graphPolicy: "configured", fallback: { id: landing.policy.id, revision: landing.policy.revision }, reason: "unknown" }, label);
    const proposal = host.propose(first.observation, first.memory, first.context);
    assert.deepEqual(proposal.intents, base.intents, `${label}: intents unchanged`);
    assert.equal(proposal.memory, base.memory, `${label}: memory unchanged`);
    assert.equal(digest({ intents: proposal.intents, memory: proposal.memory }), digest({ intents: base.intents, memory: base.memory }), label);
    assert.deepEqual(proposal.trace.slice(0, base.trace.length), base.trace, `${label}: the fallback trace is kept verbatim`);
    assert.equal(proposal.trace.length, base.trace.length + 1, `${label}: exactly one line appended`);
    const event = proposal.trace[proposal.trace.length - 1]!;
    assert.equal(event.kind, "gp-fallback", label);
    assert.equal(event.policyId, host.id, label);
    assert.ok(event.detail.startsWith(`${reason}: `), `${label}: ${event.detail}`);
    assert.match(event.detail, pattern, label);
    assert.match(event.detail, /logProb=unknown/, label);
    assert.match(event.detail, new RegExp(`fallback ${landing.policy.id}@${landing.policy.revision}`), label);
  }
});

test("a non-conforming response is treated as unavailable, never as a signal: an abstain-looking body outside the exact envelope falls back as malformed", () => {
  for (const body of [{ status: "ABSTAIN" }, { status: "Abstain" }, { status: " abstain" }, { abstain: true }, ["abstain"], null, 42]) {
    const host = graphPolicyHost({ fallback: landing.policy, client: () => body });
    const event = host.propose(first.observation, first.memory, first.context).trace.at(-1)!;
    assert.equal(event.kind, "gp-fallback", JSON.stringify(body));
    assert.ok(event.detail.startsWith("GP_RESPONSE_MALFORMED: "), `${JSON.stringify(body)}: ${event.detail}`);
    assert.doesNotMatch(event.detail, /^GP_ABSTAIN/, JSON.stringify(body));
  }
});

test("an exact proposal envelope of propose-only intents is forwarded with the fallback's memory and one gp-proposal trace line carrying the logProb", () => {
  const proposed: Intent = { ...base.intents[0]!, intentId: "gp:proposed:1", policyId: "graph-policy-stub", effect: "pause" };
  for (const logProb of [-0.25, "unknown"] as const) {
    const host = graphPolicyHost({ fallback: landing.policy, client: () => ({ status: "proposal", intents: [proposed], logProb }), id: "gp-host-under-test" });
    const proposal = host.propose(first.observation, first.memory, first.context);
    assert.deepEqual(proposal.intents, [proposed]);
    assert.equal(proposal.memory, base.memory, "memory stays the fallback's");
    assert.deepEqual(proposal.trace.slice(0, base.trace.length), base.trace);
    const event = proposal.trace.at(-1)!;
    assert.equal(event.kind, "gp-proposal");
    assert.equal(event.policyId, "gp-host-under-test");
    assert.match(event.detail, new RegExp(`logProb=${String(logProb)}`));
  }
  // MechanicalWorkflows-sx5o: a zero claim on a dimension is legal (the law is at least 0, not strictly above 0).
  const zeroClaim: Intent = { ...proposed, intentId: "gp:proposed:zero", claim: { ...proposed.claim, latencyMs: 0 } };
  const zeroed = graphPolicyHost({ fallback: landing.policy, client: () => ({ status: "proposal", intents: [zeroClaim], logProb: "unknown" }) }).propose(first.observation, first.memory, first.context);
  assert.deepEqual(zeroed.intents, [zeroClaim], "a zero latencyMs claim is forwarded unchanged");
  assert.equal(zeroed.trace.at(-1)!.kind, "gp-proposal");
  const empty = graphPolicyHost({ fallback: landing.policy, client: () => ({ status: "proposal", intents: [], logProb: "unknown" }) }).propose(first.observation, first.memory, first.context);
  assert.deepEqual(empty.intents, [], "an empty propose-only list is a conforming do-nothing proposal");
  assert.equal(empty.trace.at(-1)!.kind, "gp-proposal");
});

// MechanicalWorkflows-mzvd.1 (GPC deliverable): shadow mode. GraphPolicy runs host-side, its proposal
// is RECORDED in the mw.decision-receipt.v1 sidecar and never applied; the fallback's proposal is
// what executes. Fixture grade: the client is a stub of the program's proposed consumed envelope.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateDecisionReceipt } from "../dist/index.js";
import type { GraphPolicyShadowRecord } from "../dist/index.js";

const shadowSchemaPath = join(dirname(fileURLToPath(import.meta.url)), "../schema/decision-receipt.v1.schema.json");
const differing: Intent = { ...base.intents[0]!, intentId: "gp:shadow:1", policyId: "graph-policy-stub", effect: "pause" };

function shadowRun(client: (() => unknown) | undefined, mode: "shadow" | "forward" = "shadow") {
  const records: GraphPolicyShadowRecord[] = [];
  const host = graphPolicyHost({ fallback: landing.policy, client, mode, onShadow: record => records.push(record) });
  const proposal = host.propose(first.observation, first.memory, first.context);
  return { host, proposal, records };
}

test("B1: a conforming GraphPolicy proposal in shadow mode returns the fallback's intents and memory unchanged, with one gp-shadow line, while the sidecar records the GP proposal and its logProb", () => {
  const { host, proposal, records } = shadowRun(() => ({ status: "proposal", intents: [differing], logProb: -0.5 }));
  assert.deepEqual(proposal.intents, base.intents);
  assert.equal(proposal.memory, base.memory);
  assert.equal(digest({ intents: proposal.intents, memory: proposal.memory }), digest({ intents: base.intents, memory: base.memory }));
  assert.deepEqual(proposal.trace.slice(0, base.trace.length), base.trace);
  assert.equal(proposal.trace.length, base.trace.length + 1);
  assert.equal(proposal.trace.at(-1)!.kind, "gp-shadow");
  assert.match(proposal.trace.at(-1)!.detail, /logProb=-0\.5/);
  assert.deepEqual(host.configuration, { graphPolicy: "configured", fallback: { id: landing.policy.id, revision: landing.policy.revision }, reason: "unknown", shadow: true });
  assert.equal(records.length, 1);
  const [record] = records;
  assert.equal(record!.applied, false);
  assert.equal(record!.outcome, "proposal");
  assert.deepEqual(record!.gpIntents, [differing]);
  assert.equal(record!.receipt.logProb, -0.5);
  assert.deepEqual(record!.receipt.actions.proposed, ["gp:shadow:1"]);
});

test("B2 negative control: a differing conforming GP proposal is not forwarded in shadow mode, yet the non-shadow host forwards that same proposal on identical input", () => {
  const client = () => ({ status: "proposal", intents: [differing], logProb: "unknown" });
  const shadow = shadowRun(client).proposal;
  const forward = shadowRun(client, "forward").proposal;
  assert.notDeepEqual(base.intents, [differing], "the stub genuinely differs from the fallback");
  assert.deepEqual(shadow.intents, base.intents);
  assert.deepEqual(forward.intents, [differing]);
  assert.notEqual(digest(shadow.intents), digest(forward.intents), "the two modes diverge on identical input");
  assert.equal(JSON.stringify(shadow).includes("gp:shadow:1"), false, "the GP intent id never reaches the returned proposal");
  assert.equal(shadowRun(client, "forward").records.length, 0, "forward mode never writes the shadow sink");
});

test("B3: absent, unavailable, over-budget, abstain, malformed and thrown outcomes keep their named GP_* reason with logProb unknown in shadow mode, in the trace and in the sidecar", () => {
  const cases: [string, (() => unknown) | undefined, GraphPolicyFallbackReason][] = [
    ["abstain", () => ({ status: "abstain" }), "GP_ABSTAIN"],
    ["timeout", () => ({ status: "timeout" }), "GP_UNAVAILABLE"],
    ["budget", () => ({ status: "budget-exhausted" }), "GP_BUDGET_EXHAUSTED"],
    ["thrown", () => { throw new Error("socket closed"); }, "GP_UNAVAILABLE"],
    ["malformed", () => "garbage", "GP_RESPONSE_MALFORMED"],
    ["authorized-effect", () => ({ status: "proposal", intents: [{ ...differing, authority: "authorized-effect" }], logProb: -1 }), "GP_RESPONSE_MALFORMED"],
  ];
  for (const [label, client, reason] of cases) {
    const { proposal, records } = shadowRun(client);
    assert.deepEqual(proposal.intents, base.intents, label);
    assert.equal(proposal.trace.at(-1)!.kind, "gp-fallback", label);
    assert.ok(proposal.trace.at(-1)!.detail.startsWith(`${reason}: `), label);
    assert.match(proposal.trace.at(-1)!.detail, /logProb=unknown/, label);
    assert.equal(records.length, 1, label);
    assert.equal(records[0]!.outcome, "fallback", label);
    assert.equal(records[0]!.reason, reason, label);
    assert.deepEqual(records[0]!.gpIntents, [], label);
    assert.equal(records[0]!.receipt.logProb, "unknown", label);
    assert.deepEqual(records[0]!.receipt.actions.proposed, [], label);
  }
  const absent = shadowRun(undefined);
  assert.equal(digest(absent.proposal), digest(base), "shadow with no client is the fallback proposal, digest for digest");
  assert.equal(absent.records.length, 0, "nothing to record without a client");
  assert.deepEqual(absent.host.configuration.reason, "GP_UNCONFIGURED");
});

test("B4: every shadow sidecar validates against the single schema home, carries exactly its keys, never admits a mask, and leaves non-GP members unknown", () => {
  const schema = JSON.parse(readFileSync(shadowSchemaPath, "utf8")) as { required: string[] };
  const outcomes = [
    shadowRun(() => ({ status: "proposal", intents: [differing], logProb: -0.25 })),
    shadowRun(() => ({ status: "proposal", intents: [differing], logProb: "unknown" })),
    shadowRun(() => ({ status: "abstain" })),
  ];
  for (const { records } of outcomes) {
    const { receipt } = records[0]!;
    assert.deepEqual(validateDecisionReceipt(receipt), { ok: true });
    assert.deepEqual(Object.keys(receipt).sort(), [...schema.required].sort());
    assert.equal(receipt.schema, "mw.decision-receipt.v1");
    assert.equal(receipt.support, "unknown", "no pre-sampling support producer exists; a post-admission mask is never support");
    assert.equal(receipt.actions.admitted, "unknown");
    assert.equal(receipt.actions.executed, "unknown");
    assert.deepEqual(receipt.feedback, { status: "unknown" });
    assert.equal(receipt.decisionId, `${first.context.episodeId}:${first.context.observationDigest}`);
    assert.deepEqual(receipt.actor, { id: first.context.actorId, revision: landing.policy.revision });
  }
});

test("shadow mode over every pinned fixture with a differing conforming GP client reproduces the fallback run's finalHash: GraphPolicy output changes no episode", () => {
  const stub = (policy: Policy<never, Intent, number>) => graphPolicyHost({ fallback: policy, client: () => ({ status: "proposal", intents: [differing], logProb: -1 }), mode: "shadow" });
  const hash = runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: stub(landing.policy as Policy<never, Intent, number>) as never }).finalHash;
  assert.equal(hash, landing.fallbackHash);
});

// MechanicalWorkflows-t2qk (follow-up to mzvd.1, test-only): seven shadow-sidecar and gp-shadow trace laws
// the B1-B4 tests above leave open. Each assertion below fails under a named one-line mutant of
// src/graph-policy-host.ts (receipts in the t2qk lane evidence directory).
const shadowId = "gp-host-shadow-under-test";
const shadowClients: [string, () => unknown][] = [
  ["proposal with a logProb", () => ({ status: "proposal", intents: [differing], logProb: -0.25 })],
  ["proposal with logProb unknown", () => ({ status: "proposal", intents: [differing], logProb: "unknown" })],
  ["abstain", () => ({ status: "abstain" })],
  ["thrown transport error", () => { throw new Error("socket closed"); }],
];

function namedShadowRun(client: () => unknown, id: string | undefined) {
  const records: GraphPolicyShadowRecord[] = [];
  const host = graphPolicyHost({ fallback: landing.policy, client, mode: "shadow", ...(id === undefined ? {} : { id }), onShadow: record => records.push(record) });
  const proposal = host.propose(first.observation, first.memory, first.context);
  return { host, proposal, records };
}

test("T1 (G01): a conforming GraphPolicy proposal records reason unknown in the shadow sidecar, never a fallback reason", () => {
  for (const logProb of [-0.5, "unknown"] as const) {
    const { records } = shadowRun(() => ({ status: "proposal", intents: [differing], logProb }));
    assert.equal(records.length, 1, String(logProb));
    assert.equal(records[0]!.outcome, "proposal", String(logProb));
    assert.equal(records[0]!.reason, "unknown", String(logProb));
  }
});

test("T2 (G02-G04): every shadow sidecar names the host id and fallback revision as selector and writes the literal unknown for every member no producer exists for", () => {
  for (const id of [undefined, shadowId]) {
    for (const [label, client] of shadowClients) {
      const { host, records } = namedShadowRun(client, id);
      const where = `${label} / id ${String(id)}`;
      assert.equal(records.length, 1, where);
      const { receipt } = records[0]!;
      assert.equal(host.id, id ?? `gp-host:${landing.policy.id}`, where);
      assert.deepEqual(receipt.selector, { id: host.id, revision: landing.policy.revision }, where);
      assert.notEqual(receipt.selector.id, landing.policy.id, `${where}: the selector names the host, not the fallback`);
      assert.deepEqual(receipt.gp, { graphHash: "unknown", programHash: "unknown", checkpointHash: "unknown", snapshotHash: "unknown" }, where);
      assert.equal(receipt.featureProjectionDigest, "unknown", where);
      for (const member of ["completeness", "sourceReceipt", "resolverVerdict", "verifierOutcome"] as const) {
        assert.equal(receipt[member], "unknown", `${where}: ${member}`);
      }
    }
  }
});

test("T3 (G05, G07): the gp-shadow trace line carries the host policy id and names the fallback and that the proposal was recorded and not applied", () => {
  for (const id of [undefined, shadowId]) {
    const { host, proposal } = namedShadowRun(() => ({ status: "proposal", intents: [differing], logProb: -0.5 }), id);
    const event = proposal.trace.at(-1)!;
    assert.equal(event.kind, "gp-shadow", String(id));
    assert.equal(event.policyId, host.id, String(id));
    assert.notEqual(event.policyId, landing.policy.id, `${String(id)}: the trace names the host, not the fallback`);
    assert.match(event.detail, new RegExp(`fallback ${landing.policy.id}@${landing.policy.revision} proposal returned unchanged`), String(id));
    assert.match(event.detail, /recorded and not applied/, String(id));
    assert.match(event.detail, /1 intent\(s\) in shadow mode/, String(id));
  }
});

test("T4 (G06): a throwing onShadow sink propagates out of propose in shadow mode instead of being swallowed", () => {
  for (const [label, client] of shadowClients) {
    const host = graphPolicyHost({ fallback: landing.policy, client, mode: "shadow", onShadow: () => { throw new Error("sink down"); } });
    assert.throws(() => host.propose(first.observation, first.memory, first.context), /sink down/, label);
  }
});

// MechanicalWorkflows-y4co (follow-up to t2qk, test-only): the intent-count and logProb text of the
// gp-shadow and gp-proposal trace details. Each assertion fails under a named one-line mutant of
// src/graph-policy-host.ts (mutation receipt in the y4co lane evidence directory).
const secondProposed: Intent = { ...differing, intentId: "gp:shadow:2" };

function lastDetail(intents: readonly Intent[], logProb: number | "unknown", mode: "shadow" | "forward"): string {
  const host = graphPolicyHost({ fallback: landing.policy, client: () => ({ status: "proposal", intents, logProb }), mode });
  return host.propose(first.observation, first.memory, first.context).trace.at(-1)!.detail;
}

test("W1 (V01): the gp-shadow detail counts the GraphPolicy intents, never the fallback's", () => {
  assert.equal(base.intents.length, 1, "fixture: the fallback proposes exactly one intent at the first landing observation");
  assert.match(lastDetail([differing, secondProposed], -0.5, "shadow"), /^GraphPolicy proposed 2 intent\(s\) in shadow mode/);
  assert.match(lastDetail([], -0.5, "shadow"), /^GraphPolicy proposed 0 intent\(s\) in shadow mode/);
});

test("W2 (V02): the forward gp-proposal detail counts the GraphPolicy intents, never the fallback's", () => {
  assert.equal(lastDetail([differing, secondProposed], -0.25, "forward"), "GraphPolicy proposed 2 intent(s); logProb=-0.25");
  assert.equal(lastDetail([], "unknown", "forward"), "GraphPolicy proposed 0 intent(s); logProb=unknown");
});

test("W3 (V03): a literal unknown logProb prints as unknown in the gp-shadow detail, as it does in the forward detail", () => {
  assert.match(lastDetail([differing], "unknown", "shadow"), /; logProb=unknown$/);
  assert.match(lastDetail([differing], -0.5, "shadow"), /; logProb=-0\.5$/);
});

// MechanicalWorkflows-u78w (y4co follow-up): the logProb precision and the repeated-intent count.
test("W4 (K1): the forward gp-proposal detail prints the logProb verbatim, never rounded to two decimals", () => {
  assert.equal(lastDetail([differing], -0.123456789, "forward"), "GraphPolicy proposed 1 intent(s); logProb=-0.123456789");
});

test("W5 (K2): the gp-shadow detail prints the logProb verbatim, never rounded to one decimal", () => {
  assert.match(lastDetail([differing], -0.123456789, "shadow"), /; logProb=-0\.123456789$/);
});

test("W6 (K3): the gp-shadow detail counts a repeated conforming intent once per occurrence, never once per distinct intentId", () => {
  assert.match(lastDetail([differing, differing], -0.5, "shadow"), /^GraphPolicy proposed 2 intent\(s\) in shadow mode/);
});

// MechanicalWorkflows-i3z7 (u78w follow-up): the logProb printed past nine decimals and the forward repeated-intent count.
// The only runtime producer (vertical-cut landingGpClient: best.score - max - Math.log(total)) emits full-width doubles.
test("W7 (F1): the forward gp-proposal detail prints a seventeen-digit logProb verbatim, never rounded to nine decimals or fifteen significant digits", () => {
  assert.equal(lastDetail([differing], -(0.1 + 0.2), "forward"), "GraphPolicy proposed 1 intent(s); logProb=-0.30000000000000004");
});

test("W8 (F1): the gp-shadow detail prints a seventeen-digit logProb verbatim, never rounded to nine decimals", () => {
  assert.match(lastDetail([differing], -(0.1 + 0.2), "shadow"), /; logProb=-0\.30000000000000004$/);
});

test("W9 (F2): the forward gp-proposal detail counts a repeated conforming intent once per occurrence, never once per distinct intentId", () => {
  assert.equal(lastDetail([differing, differing], -0.5, "forward"), "GraphPolicy proposed 2 intent(s); logProb=-0.5");
});

// MechanicalWorkflows-1e93 (i3z7 follow-up): the logProb printed below 0.1 and in exponent form.
// W7/W8 witness "verbatim" at magnitude 0.3, where seventeen decimals and seventeen significant digits coincide; these values come from the
// vertical-cut landingGpClient log-softmax (3 on-head, 1 stale candidates; 12 on-head, 3 stale candidates), where a fixed-decimal rounding drops digits.
test("W10 (G1): the forward gp-proposal detail prints a sub-0.1 seventeen-digit logProb verbatim, never rounded to seventeen decimals", () => {
  assert.equal(String(-0.029750418272620652), "-0.029750418272620652", "fixture: seventeen significant digits need eighteen decimals here");
  assert.equal(lastDetail([differing], -0.029750418272620652, "forward"), "GraphPolicy proposed 1 intent(s); logProb=-0.029750418272620652");
});

test("W11 (G1): the gp-shadow detail prints a sub-0.1 seventeen-digit logProb verbatim, never rounded to seventeen decimals", () => {
  assert.match(lastDetail([differing], -0.029750418272620652, "shadow"), /; logProb=-0\.029750418272620652$/);
});

test("W12 (G2): the forward gp-proposal detail prints an exponent-form logProb verbatim, never rounded to twenty decimals", () => {
  assert.equal(String(-3.0590227379725525e-7), "-3.0590227379725525e-7", "fixture: below 1e-6 the shortest round-trip text is exponent form");
  assert.equal(lastDetail([differing], -3.0590227379725525e-7, "forward"), "GraphPolicy proposed 1 intent(s); logProb=-3.0590227379725525e-7");
});

test("W13 (G2): the gp-shadow detail prints an exponent-form logProb verbatim, never rounded to twenty decimals", () => {
  assert.match(lastDetail([differing], -3.0590227379725525e-7, "shadow"), /; logProb=-3\.0590227379725525e-7$/);
});
