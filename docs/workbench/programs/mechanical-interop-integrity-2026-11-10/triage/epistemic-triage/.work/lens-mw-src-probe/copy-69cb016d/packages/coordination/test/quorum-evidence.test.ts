import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runQuorumEvidence, majorityVote, independentTestFirst, oracleQuorum, quorumStateHash, labelQuorumEpisode, digest, canonicalJson } from "../dist/index.js";
import type { QuorumEvidenceEpisode, QuorumEvidenceState, QuorumObservation, QuorumEvidenceRun } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const base = { candidates: 6, reviewers: 5, steps: 30, budget: 24 };

/** Mirror of the statement-anchored matcher exported by package-placement.test.ts (stripComments, IMPORT_CLAUSE, importsOf).
 * It is mirrored, not imported: importing a sibling *.test.ts re-registers that file's tests inside this one. */
const stripComments = (source: string): string => {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i]!;
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 2;
      out += " ";
    } else if (ch === '"' || ch === "'" || ch === "`") {
      out += ch;
      i++;
      while (i < source.length && source[i] !== ch) {
        if (source[i] === "\\") { out += source[i]!; i++; }
        if (i < source.length) { out += source[i]!; i++; }
      }
      if (i < source.length) { out += ch; i++; }
    } else {
      out += ch;
      i++;
    }
  }
  return out;
};
const IMPORT_CLAUSE = /(?:^|[;{}])[ \t]*(?:import|export)\b[^;"'`]*?\bfrom\s*(["'])([^"'\n]+)\1|(?:^|[;{}])[ \t]*import\s*(["'])([^"'\n]+)\3|\bimport\s*\(\s*(["'])([^"'\n]+)\5/gm;
const importsOf = (source: string): string[] =>
  [...stripComments(source).matchAll(IMPORT_CLAUSE)].map(match => match[2] ?? match[4] ?? match[6]!);

/** Source fixtures for the statement-anchored import-specifier matcher: none of these names a module. */
const NON_SPECIFIER_FIXTURES: Readonly<Record<string, string>> = {
  "quoted from property key": 'const edge = { "from": "a", to: "b" };\nconst pair = ["from", "to"];\nconst x = edge["from"];\n',
  "from inside a line comment": '// copied from "elsewhere"\nconst x = 1;\n',
  "from inside a block comment": '/* import y from "elsewhere" */\nconst x = 1;\n',
  "from inside a string literal": 'const m = \'value came from "unknown"\';\nconst t = `read from "${m}"`;\n',
  "multi-line block comment whose inner line starts with an import": '/*\nimport y from "./elsewhere.js";\n*/\nconst x = 1;\n',
  "line comment naming a dynamic import": '// import("./elsewhere.js")\nconst x = 1;\n',
  "string literal holding a whole from-clause": 'const s = \'import y from "./elsewhere.js"\';\n',
  "string literal holding a side-effect import": 'const s = \'import "./elsewhere.js"\';\n'
};
/** Source fixtures that each name exactly ./a.js as a module specifier. */
const SPECIFIER_FIXTURES: Readonly<Record<string, string>> = {
  "static default import": 'import a from "./a.js";\n',
  "single-quoted import": "import a from './a.js';\n",
  "type-only import": 'import type { A } from "./a.js";\n',
  "export-from": 'export { a } from "./a.js";\n',
  "side-effect import": 'import "./a.js";\n',
  "dynamic import": 'const m = await import("./a.js");\n',
  "side-effect import after a string holding a url": 'const u = "http://x.test"; import "./a.js";\n',
  "type re-export after a closing brace": 'function f() { return 1 } export type { S } from "./a.js";\n',
  "value re-export after a closing brace": 'function f() { return 1 } export { a } from "./a.js";\n',
  "side-effect import after a closing brace": 'function f() { return 1 } import "./a.js";\n',
  "from-clause re-export after an opening brace in an ambient module body": 'declare module "m" { export * from "./a.js"; }\n',
  "side-effect import after an opening brace in an ambient module body": 'declare module "m" { import "./a.js"; }\n',
  "from-clause re-export after a semicolon on the same line": 'const a = 1; export { b } from "./a.js";\n',
  "from-clause default import after a semicolon on the same line": "const a = 1; import b from './a.js';\n"
};
/** A seed under which the correlated-vote world contains a bad patch every reviewer approves. */
const CORRELATED_SEED = 0;
const SEEDS = Array.from({ length: 16 }, (_, index) => index + 1);
const policies = { "majority-vote": majorityVote, "independent-test-first": independentTestFirst } as const;

function run(seed: number, gate: "authoritative" | "ablated", name: keyof typeof policies, overrides: Partial<QuorumEvidenceRun> = {}): QuorumEvidenceEpisode {
  return runQuorumEvidence({ ...base, seed, gate, policy: policies[name], ...overrides });
}

test("correlated votes are reproduced: with the gate ablated, majorityVote commits a bad patch that every reviewer approved, and the false positive is in the event history, the penalty ledger and the independent oracle", () => {
  const episode = run(CORRELATED_SEED, "ablated", "majority-vote");
  assert.ok(episode.final.falsePositives >= 1, "no false positive under the correlated seed");
  const bad = episode.final.candidates.filter(c => c.decision === "committed" && c.quality === "bad");
  assert.equal(bad.length, episode.final.falsePositives);
  for (const candidate of bad) {
    assert.ok(candidate.votes.filter(v => v === "approve").length * 2 > base.reviewers, `${candidate.id} was committed without a voting majority`);
    assert.ok(episode.final.events.some(e => e.kind === "committed" && e.candidate === candidate.id && /false positive/.test(e.detail)));
  }
  const unanimous = bad.filter(candidate => candidate.correlated);
  assert.ok(unanimous.length >= 1, "no false positive came from the shared noise term");
  for (const candidate of unanimous) assert.equal(candidate.votes.filter(v => v === "approve").length, base.reviewers);
  const oracle = oracleQuorum({ ...base, seed: CORRELATED_SEED, gate: "ablated", policy: "majority-vote" });
  assert.equal(oracle.falsePositives, episode.final.falsePositives);
  assert.ok(episode.final.penalty >= 10 * episode.final.falsePositives, "the false-positive penalty was not charged");
});

test("independentTestFirst never commits without a gate receipt, in either gate mode, on any seed, and never commits a bad patch", () => {
  for (const seed of SEEDS) for (const gate of ["authoritative", "ablated"] as const) {
    const episode = run(seed, gate, "independent-test-first");
    for (const candidate of episode.final.candidates.filter(c => c.decision === "committed")) {
      assert.equal(candidate.receipt, true, `seed ${seed} ${gate}: ${candidate.id} committed without a receipt`);
      assert.equal(candidate.quality, "good");
    }
    assert.equal(episode.final.falsePositives, 0);
  }
});

test("a commit intent without a gate receipt is refused by the resolver with INTENT_SCOPE_PROTECTED, recorded in the history, while the uncalibrated attempt is still charged", () => {
  const episode = run(CORRELATED_SEED, "authoritative", "majority-vote");
  assert.equal(episode.final.falsePositives, 0, "the authoritative gate let a receipt-less commit through");
  assert.equal(episode.final.candidates.filter(c => c.decision === "committed").length, 0);
  const refused = episode.steps.flatMap(step => step.resolution.rejected);
  assert.ok(refused.length > 0);
  assert.ok(refused.every(r => r.code === "INTENT_SCOPE_PROTECTED" && r.intent.effect === "commit"));
  assert.ok(episode.final.events.some(e => e.kind === "refused" && /INTENT_SCOPE_PROTECTED/.test(e.detail)));
  assert.equal(episode.final.uncalibrated, refused.length);
  assert.ok(episode.final.penalty >= 2 * refused.length);
});

test("budget exhaustion surfaces as INTENT_BUDGET_EXCEEDED in the history, the policy then abstains, and spend never crosses the budget", () => {
  const episode = run(3, "authoritative", "independent-test-first", { budget: 4 });
  const codes = episode.steps.flatMap(step => step.resolution.rejected.map(r => r.code));
  assert.ok(codes.includes("INTENT_BUDGET_EXCEEDED"));
  assert.ok(episode.final.events.some(e => e.kind === "refused" && /INTENT_BUDGET_EXCEEDED/.test(e.detail)));
  assert.ok(episode.final.spent <= 4, `spent ${episode.final.spent}`);
  assert.ok(episode.final.candidates.some(c => c.decision === "abstained" && c.tested === null), "no candidate was abstained untested after the refusal");
  assert.equal(episode.final.candidates.filter(c => c.decision === "committed" && c.receipt === false).length, 0);
});

test("the harness agrees with the independent oracle on sixteen seeds, both policies and both gate modes: decisions, false positives, spend and penalty", () => {
  for (const seed of SEEDS) for (const gate of ["authoritative", "ablated"] as const) for (const name of Object.keys(policies) as (keyof typeof policies)[]) {
    const episode = run(seed, gate, name);
    const oracle = oracleQuorum({ ...base, seed, gate, policy: name });
    const label = `seed ${seed} ${gate} ${name}`;
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "committed").map(c => c.id), oracle.committed, label);
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "abstained").map(c => c.id), oracle.abstained, label);
    assert.equal(episode.final.falsePositives, oracle.falsePositives, label);
    assert.equal(episode.final.spent, oracle.spent, label);
    assert.equal(episode.final.penalty, oracle.penalty, label);
    assert.deepEqual(episode.final.candidates.map(c => c.quality), oracle.quality, label);
  }
});

test("the harness agrees with the oracle at every tight budget, where a claim exactly equal to the remaining budget is admitted and one unit more is refused", () => {
  for (const budget of [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 12]) for (const seed of SEEDS.slice(0, 8)) for (const name of Object.keys(policies) as (keyof typeof policies)[]) {
    const episode = run(seed, "authoritative", name, { budget });
    const oracle = oracleQuorum({ ...base, budget, seed, gate: "authoritative", policy: name });
    const label = `budget ${budget} seed ${seed} ${name}`;
    assert.equal(episode.final.spent, oracle.spent, label);
    assert.ok(episode.final.spent <= budget, label);
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "committed").map(c => c.id), oracle.committed, label);
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "abstained").map(c => c.id), oracle.abstained, label);
    assert.equal(episode.final.penalty, oracle.penalty, label);
  }
});

test("a challenge intent costs two units, reveals whether the votes were unanimous, and is visible in the history", () => {
  const challenger = { id: "challenger", revision: "t-1", propose: (observation: QuorumObservation, memory: number) => ({
    intents: observation.step === 0 ? [{
      intentId: "challenger:challenge:c1", policyId: "challenger", target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: observation.basis.revision,
      effect: "challenge", claim: { compute: 2, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["cand:c1"], readScopes: [],
    }] : [], memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 5, gate: "authoritative", steps: 2, policy: challenger });
  const c1 = episode.final.candidates[0]!;
  assert.equal(episode.final.spent, 2);
  assert.equal(typeof c1.unanimous, "boolean");
  assert.equal(c1.unanimous, c1.votes.every(v => v === c1.votes[0]));
  assert.ok(episode.final.events.some(e => e.kind === "challenged" && e.candidate === "c1"));
});

test("policies are pure: the same observation, memory and context give identical proposals, and the observation is not mutated or widened with hidden truth", () => {
  const episode = run(7, "authoritative", "majority-vote", { steps: 1 });
  const observation: QuorumObservation = { step: 0, basis: { workspaceId: "fixture:quorum-evidence", revision: "quorum-0" }, remaining: 24, reviewers: 5, lastRefusals: [],
    candidates: [{ id: "c1", revealed: false, approvals: null, unanimous: null, tested: null, receipt: false, decision: null }] };
  const context = { episodeId: "t", actorId: "t", observationDigest: digest(observation), budget: { compute: 24, workers: 1, queue: 1, latencyMs: 1000 }, authority: "propose-only" as const, policyRevision: "x", seed: 7 };
  const before = canonicalJson(observation);
  for (const policy of Object.values(policies)) assert.equal(canonicalJson(policy.propose(observation, 0, context)), canonicalJson(policy.propose(observation, 0, context)));
  assert.equal(canonicalJson(observation), before);
  assert.equal(episode.steps[0]!.observationDigest.startsWith("sha256:"), true);
  // A spy policy records every real observation the world builds; none may carry hidden truth.
  const seen: string[] = [];
  const spy = { id: "spy", revision: "t-1", propose: (o: QuorumObservation, memory: number) => { seen.push(canonicalJson(o)); return majorityVote.propose(o, memory, context); } };
  const spied = runQuorumEvidence({ ...base, seed: 7, gate: "authoritative", steps: 8, policy: spy });
  assert.equal(seen.length, 8);
  for (const text of seen) assert.ok(!/"(quality|votes|flake|correlated)"/.test(text), text);
  assert.equal(spied.steps[0]!.observationDigest, digest(JSON.parse(seen[0]!)));
});

test("the fixture is deterministic and hash-stable: one seed gives byte-identical episodes, another seed changes the final hash, and the state hash is the digest of the state", () => {
  const a = run(7, "authoritative", "independent-test-first");
  const b = run(7, "authoritative", "independent-test-first");
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.finalHash, quorumStateHash(a.final));
  assert.match(a.finalHash, /^sha256:[0-9a-f]{64}$/);
  assert.notEqual(run(8, "authoritative", "independent-test-first").finalHash, a.finalHash);
  assert.notEqual(run(7, "ablated", "independent-test-first").finalHash, a.finalHash, "the gate mode must be part of the hashed state");
  assert.equal(a.mode, "fixture");
  assert.equal(a.schema, "mw.quorum-evidence.fixture.v1");
});

test("a quorum fixture episode refuses any relabelling with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const episode = run(7, "authoritative", "majority-vote");
  assert.equal(labelQuorumEpisode(episode, "fixture").mode, "fixture");
  for (const mode of ["live", "replay", "live-verified"]) {
    assert.throws(() => labelQuorumEpisode(episode, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*${mode}`));
  }
});

test("the module reaches no process, network or QuorumCLI: its source names none of them", () => {
  const source = readFileSync(join(here, "../src/quorum-evidence.ts"), "utf8");
  assert.ok(!/child_process|node:net|node:http|fetch\(|spawn|execFile|process\.env/.test(source));
  assert.ok(!/QuorumCLI\s*\(|new QuorumCLI/.test(source));
});

test("the committed cross-language fixtures equal the regenerated episodes byte for byte, and each final hash is the digest of its final state", () => {
  for (const [file, name, gate, seed] of [["quorum-evidence-majority-ablated-seed0.json", "majority-vote", "ablated", 0], ["quorum-evidence-independent-seed7.json", "independent-test-first", "authoritative", 7]] as const) {
    const committed = readFileSync(join(fixtureDir, file), "utf8");
    assert.equal(committed.trimEnd(), canonicalJson(run(seed, gate, name)), file);
    const parsed = JSON.parse(committed) as QuorumEvidenceEpisode;
    assert.equal(parsed.finalHash, digest(parsed.final as QuorumEvidenceState));
  }
});

// ---- z9i: the world prices evidence (COST[effect]) and refuses re-decision; probes q1-q3 and pins e1-e5 ----
function oneShot(id: string, effect: string, compute: number, scope: string, steps: number[]) {
  return { id, revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: steps.includes(o.step) ? [{ intentId: `${id}:${effect}:${o.step}`, policyId: id, target: { kind: "candidate", uri: scope.replace(/^commit:/, "cand:") }, expectedRevision: o.basis.revision,
      effect, claim: { compute, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [scope], readScopes: [] }] : [],
    memory: memory + 1, trace: [] }) };
}

test("probe q1a: an independent test is charged its price even when the proposing policy declares a zero claim", () => {
  const episode = runQuorumEvidence({ ...base, seed: 7, gate: "authoritative", steps: 1, policy: oneShot("cheap", "test", 0, "cand:c1", [0]) });
  assert.notEqual(episode.final.candidates[0]!.tested, null, "the zero-claim test did not run at all");
  assert.equal(episode.final.spent, 3, `a zero-claim independent test was charged ${episode.final.spent}`);
});

test("probe q1b: with a zero budget an independent test is refused, whatever claim the policy declares", () => {
  const episode = runQuorumEvidence({ ...base, seed: 7, gate: "authoritative", steps: 1, budget: 0, policy: oneShot("cheap", "test", 0, "cand:c1", [0]) });
  assert.equal(episode.final.candidates[0]!.tested, null, `a zero-budget run bought an independent test (${episode.final.candidates[0]!.tested}, receipt ${episode.final.candidates[0]!.receipt})`);
});

test("probe q2: one bad patch committed twice counts one false positive", () => {
  const bad = run(0, "ablated", "majority-vote").final.candidates.find(c => c.quality === "bad");
  assert.ok(bad !== undefined, "no bad patch at seed 0");
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 2, policy: oneShot("twice", "commit", 0, `commit:${bad.id}`, [0, 1]) });
  assert.equal(episode.final.falsePositives, 1, `one bad patch counted ${episode.final.falsePositives} false positives`);
});

test("probe q3: an abstain cannot overwrite a recorded commit", () => {
  const flip = { id: "flip", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step < 2 ? [{ intentId: `flip:${o.step}`, policyId: "flip", target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: o.basis.revision,
      effect: o.step === 0 ? "commit" : "abstain", claim: { compute: 0, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [o.step === 0 ? "commit:c1" : "cand:c1"], readScopes: [] }] : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 2, policy: flip });
  assert.equal(episode.final.candidates[0]!.decision, "committed", `the commit was overwritten to ${episode.final.candidates[0]!.decision}`);
});

test("probe q1c: with a zero budget no candidate reaches a gate-authorized commit", () => {
  const free = { id: "free", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step < 2 ? [{ intentId: `free:${o.step}`, policyId: "free", target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: o.basis.revision,
      effect: o.step === 0 ? "test" : "commit", claim: { compute: 0, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [o.step === 0 ? "cand:c1" : "commit:c1"], readScopes: [] }] : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 7, gate: "authoritative", steps: 2, budget: 0, policy: free });
  const c1 = episode.final.candidates[0]!;
  assert.notEqual(c1.decision, "committed", `zero budget, spent ${episode.final.spent}: c1 committed under the authoritative gate (receipt ${c1.receipt}, tested ${c1.tested}, rejected ${episode.steps.flatMap(s => s.resolution.rejected.map(r => r.code)).join(",") || "none"})`);
});

test("pin e1: no observation reveals approvals for a candidate that has not been inspected", () => {
  for (const seed of SEEDS) for (const name of Object.keys(policies) as (keyof typeof policies)[]) for (const gate of ["authoritative", "ablated"] as const) {
    const inner = policies[name];
    const seen: QuorumObservation[] = [];
    const spy = { id: inner.id, revision: inner.revision, propose: (o: QuorumObservation, memory: number, context: Parameters<typeof majorityVote.propose>[2]) => { seen.push(o); return inner.propose(o, memory, context); } };
    runQuorumEvidence({ ...base, seed, gate, policy: spy });
    assert.ok(seen.length > 0);
    for (const o of seen) for (const c of o.candidates) if (!c.revealed) assert.equal(c.approvals, null, `seed ${seed} ${gate} ${name} step ${o.step} ${c.id}`);
  }
});

test("pin e2: a passing independent test issues exactly one receipt event, and every commit under the authoritative gate follows its receipt event", () => {
  let commits = 0;
  for (const seed of SEEDS) {
    const episode = run(seed, "authoritative", "independent-test-first");
    const events = episode.final.events;
    for (const c of episode.final.candidates) {
      assert.equal(events.filter(e => e.kind === "receipt" && e.candidate === c.id).length, c.receipt ? 1 : 0, `seed ${seed} ${c.id} receipt events`);
      assert.equal(events.filter(e => e.kind === "tested" && e.candidate === c.id && / pass$/.test(e.detail)).length, c.tested === "pass" ? 1 : 0, `seed ${seed} ${c.id} pass events`);
      if (c.decision === "committed") {
        commits += 1;
        const at = events.findIndex(e => e.kind === "committed" && e.candidate === c.id);
        const receipt = events.findIndex(e => e.kind === "receipt" && e.candidate === c.id);
        assert.ok(receipt >= 0 && receipt < at, `seed ${seed} ${c.id} committed without a prior receipt event`);
      }
    }
  }
  assert.ok(commits > 0, "no commit happened, so the ordering clause is vacuous");
});

test("pin e3: the world prices one inspect at one unit and one independent test at three, so testing costs more than inspecting", () => {
  const inspected = run(7, "authoritative", "majority-vote", { steps: 1 });
  const tested = run(7, "authoritative", "independent-test-first", { steps: 1 });
  assert.deepEqual(inspected.steps[0]!.resolution.admitted.map(intent => intent.effect), ["inspect"]);
  assert.deepEqual(tested.steps[0]!.resolution.admitted.map(intent => intent.effect), ["test"]);
  assert.equal(inspected.final.spent, 1);
  assert.equal(tested.final.spent, 3);
  assert.ok(inspected.final.spent < tested.final.spent);
});

test("pin e4: the module imports only its sibling coordination modules, under any specifier form", () => {
  const source = readFileSync(join(here, "../src/quorum-evidence.ts"), "utf8");
  const specifiers = importsOf(source);
  assert.deepEqual([...new Set(specifiers)].sort(), ["./canonical.js", "./contracts.js", "./landing-queue.js", "./resolver.js"]);
});

test("pin e5: with an even reviewer count a tied vote is no majority, and the harness still agrees with the oracle", () => {
  let ties = 0;
  for (const reviewers of [4, 6]) for (const seed of SEEDS) for (const gate of ["authoritative", "ablated"] as const) {
    const episode = runQuorumEvidence({ ...base, reviewers, seed, gate, policy: majorityVote });
    const oracle = oracleQuorum({ ...base, reviewers, seed, gate, policy: "majority-vote" });
    const label = `reviewers ${reviewers} seed ${seed} ${gate}`;
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "committed").map(c => c.id), oracle.committed, label);
    assert.deepEqual(episode.final.candidates.filter(c => c.decision === "abstained").map(c => c.id), oracle.abstained, label);
    assert.equal(episode.final.penalty, oracle.penalty, label);
    if (gate === "ablated") for (const c of episode.final.candidates) if (c.revealed && c.votes.filter(v => v === "approve").length * 2 === reviewers) { ties += 1; assert.equal(c.decision, "abstained", `${label} ${c.id} tie`); }
  }
  assert.ok(ties > 0, "no tied vote occurred, so the tie clause is vacuous");
});

test("an intent on an already decided candidate is refused with CANDIDATE_ALREADY_DECIDED in the event history and the next observation's refusals, and it spends nothing", () => {
  const bad = run(0, "ablated", "majority-vote").final.candidates.find(c => c.quality === "bad");
  assert.ok(bad !== undefined, "no bad patch at seed 0");
  const again = { id: "again", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step < 2 ? [{ intentId: `again:${o.step}`, policyId: "again", target: { kind: "candidate", uri: `cand:${bad.id}` }, expectedRevision: o.basis.revision,
      effect: o.step === 0 ? "commit" : "inspect", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [o.step === 0 ? `commit:${bad.id}` : `cand:${bad.id}`], readScopes: [] }] : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 2, policy: again });
  const refused = episode.final.events.filter(e => e.kind === "refused");
  assert.equal(refused.length, 1);
  assert.match(refused[0]!.detail, /^CANDIDATE_ALREADY_DECIDED: inspect on /);
  assert.deepEqual(episode.final.lastRefusals, [{ candidate: bad.id, code: "CANDIDATE_ALREADY_DECIDED" }]);
  assert.equal(episode.final.spent, 0, "the refused inspect must not be charged");
  assert.equal(episode.final.falsePositives, 1);
});

test("two decisions on one candidate in one batch: the first stands and the second is refused", () => {
  const both = { id: "both", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ["commit", "abstain"].map(effect => ({ intentId: `both:${effect}`, policyId: "both", target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`${effect}:c1`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: both });
  assert.equal(episode.final.candidates[0]!.decision, "committed");
  assert.match(episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|"), /CANDIDATE_ALREADY_DECIDED: abstain on c1/);
});

test("the world reprices an inflated claim down to COST[effect]: an inspect that declares nine units is charged one", () => {
  const inflated = oneShot("fat", "inspect", 9, "cand:c1", [0]);
  assert.equal(runQuorumEvidence({ ...base, seed: 7, gate: "authoritative", steps: 1, policy: inflated }).final.spent, 1);
});

// ---- qs6: settle() closes a candidate only on commit|abstain, and a set-aside re-decision stays uncharged ----
test("pin c3 p1: an inspect earlier in a batch does not close its candidate, so a same-batch commit still stands", () => {
  const pair = { id: "pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ["inspect", "commit"].map(effect => ({ intentId: `pair:${effect}`, policyId: "pair", target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? "commit:c1" : "cand:c1"], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const c1 = episode.final.candidates[0]!;
  assert.equal(c1.revealed, true, "the same-batch inspect was not admitted");
  assert.equal(c1.decision, "committed", `the same-batch commit after an inspect was refused: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

test("pin c3 p2: a commit refused as already decided is not counted as an uncalibrated attempt", () => {
  const bad = run(0, "ablated", "majority-vote").final.candidates.find(c => c.quality === "bad");
  assert.ok(bad !== undefined, "no bad patch at seed 0");
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 2, policy: oneShot("twice", "commit", 0, `commit:${bad.id}`, [0, 1]) });
  assert.equal(episode.final.uncalibrated, 1, `the refused re-decision was counted: uncalibrated ${episode.final.uncalibrated}`);
  assert.equal(episode.final.penalty, 10 + 2);
});

// ---- czk pins q1-q3 (czk): settle() closes a candidate on commit or abstain, and on nothing else ----
function sameBatch(id: string, effects: readonly string[]) {
  return { id, revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? effects.map(effect => ({ intentId: `${id}:${effect}`, policyId: id, target: { kind: "candidate", uri: "cand:c1" }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? "commit:c1" : "cand:c1"], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
}

test("pin c5 q1: an abstain earlier in a batch closes its candidate, so a same-batch commit is set aside uncharged", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("abstain-commit", ["abstain", "commit"]) });
  const c1 = episode.final.candidates[0]!;
  assert.equal(c1.decision, "abstained", `the same-batch commit after an abstain re-decided c1 to ${c1.decision}`);
  assert.match(episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|"), /CANDIDATE_ALREADY_DECIDED: commit on c1/);
  assert.equal(episode.final.uncalibrated, 0, `the set-aside commit was charged as an uncalibrated attempt: ${episode.final.uncalibrated}`);
});

test("pin c5 q2: an independent test earlier in a batch does not close its candidate, so a same-batch commit still stands", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("test-commit", ["test", "commit"]) });
  const c1 = episode.final.candidates[0]!;
  assert.notEqual(c1.tested, null, "the same-batch independent test was not admitted");
  assert.equal(c1.decision, "committed", `the same-batch commit after a test was refused: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

test("pin c5 q3: a challenge earlier in a batch does not close its candidate, so a same-batch commit still stands", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("challenge-commit", ["challenge", "commit"]) });
  const c1 = episode.final.candidates[0]!;
  assert.notEqual(c1.unanimous, null, "the same-batch challenge was not admitted");
  assert.equal(c1.decision, "committed", `the same-batch commit after a challenge was refused: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

// ---- 9uu pins r1-r2: a same-batch closure sets aside every later intent on its candidate, and only on its candidate ----
test("pin 9uu r1: a commit earlier in a batch sets aside a same-batch independent test on its candidate, refused and uncharged", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("commit-test", ["commit", "test"]) });
  const c1 = episode.final.candidates[0]!;
  assert.equal(c1.decision, "committed");
  assert.equal(c1.tested, null, "the same-batch test after the commit was admitted");
  assert.match(episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|"), /CANDIDATE_ALREADY_DECIDED: test on c1/);
  assert.equal(episode.final.spent, 0, `the set-aside test was charged: spent ${episode.final.spent}`);
});

test("pin 9uu r2: a decision on one candidate does not close another candidate in the same batch", () => {
  const two = { id: "two", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "commit"], ["c2", "inspect"]] as const).map(([c, effect]) => ({ intentId: `two:${c}:${effect}`, policyId: "two", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? `commit:${c}` : `cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: two });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "committed");
  assert.equal(c2!.revealed, true, `the same-batch inspect of c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

// ---- vf5 pin d1: an abstain closes its candidate for every later same-batch intent, not only a commit ----
test("pin vf5 d1: an abstain earlier in a batch sets aside a same-batch independent test on its candidate, refused and uncharged", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("abstain-test", ["abstain", "test"]) });
  const c1 = episode.final.candidates[0]!;
  assert.equal(c1.decision, "abstained", `the same-batch test after an abstain displaced the abstain: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(c1.tested, null, "the same-batch test after the abstain was admitted");
  assert.match(episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|"), /CANDIDATE_ALREADY_DECIDED: test on c1/);
  assert.equal(episode.final.spent, 0, `the set-aside test was charged: spent ${episode.final.spent}`);
});

// ---- ooqn pins r1-r2: an abstain closes only its own candidate in a batch, and a test set aside behind it reaches lastRefusals ----
test("pin ooqn r1: an abstain on one candidate does not close another candidate in the same batch", () => {
  const pair = { id: "abstain-pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "abstain"], ["c2", "inspect"]] as const).map(([c, effect]) => ({ intentId: `abstain-pair:${c}:${effect}`, policyId: "abstain-pair", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "abstained");
  assert.equal(c2!.revealed, true, `the same-batch inspect of c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

test("pin ooqn r2: a test set aside behind a same-batch abstain reaches lastRefusals as CANDIDATE_ALREADY_DECIDED", () => {
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: sameBatch("abstain-test-lastrefusals", ["abstain", "test"]) });
  assert.deepEqual(episode.final.lastRefusals, [{ candidate: "c1", code: "CANDIDATE_ALREADY_DECIDED" }]);
});

// ---- ab8w pin d1: an in-batch abstain on one candidate leaves another candidate's same-batch commit standing ----
test("pin ab8w d1: an abstain on one candidate does not set aside a same-batch commit on another candidate", () => {
  const pair = { id: "abstain-commit-pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "abstain"], ["c2", "commit"]] as const).map(([c, effect]) => ({ intentId: `abstain-commit-pair:${c}:${effect}`, policyId: "abstain-commit-pair", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? `commit:${c}` : `cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "abstained");
  assert.equal(c2!.decision, "committed", `the same-batch commit on c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

// ---- 6rei pins e1-e3: a same-batch decision on one candidate leaves every other candidate's same-batch decision standing (the three decision cells ab8w d1 leaves open) ----
test("pin 6rei e1: a commit on one candidate does not set aside a same-batch commit on another candidate", () => {
  const pair = { id: "commit-commit-pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "commit"], ["c2", "commit"]] as const).map(([c, effect]) => ({ intentId: `commit-commit-pair:${c}:${effect}`, policyId: "commit-commit-pair", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`commit:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "committed");
  assert.equal(c2!.decision, "committed", `the same-batch commit on c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

test("pin 6rei e2: a commit on one candidate does not set aside a same-batch abstain on another candidate", () => {
  const pair = { id: "commit-abstain-pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "commit"], ["c2", "abstain"]] as const).map(([c, effect]) => ({ intentId: `commit-abstain-pair:${c}:${effect}`, policyId: "commit-abstain-pair", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? `commit:${c}` : `cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "committed");
  assert.equal(c2!.decision, "abstained", `the same-batch abstain on c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

test("pin 6rei e3: an abstain on one candidate does not set aside a same-batch abstain on another candidate", () => {
  const pair = { id: "abstain-abstain-pair", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "abstain"], ["c2", "abstain"]] as const).map(([c, effect]) => ({ intentId: `abstain-abstain-pair:${c}:${effect}`, policyId: "abstain-abstain-pair", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: pair });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "abstained");
  assert.equal(c2!.decision, "abstained", `the same-batch abstain on c2 was set aside: ${episode.final.events.filter(e => e.kind === "refused").map(e => e.detail).join("|")}`);
  assert.equal(episode.final.events.filter(e => e.kind === "refused").length, 0);
});

// ---- s233 pin f1: a candidate decided earlier in a batch stays closed after a same-batch decision on another candidate ----
test("pin s233 f1: a commit on another candidate between two decisions on one candidate leaves the first decision standing and refuses the second", () => {
  const triple = { id: "commit-commit-abstain-triple", revision: "t-1", propose: (o: QuorumObservation, memory: number) => ({
    intents: o.step === 0 ? ([["c1", "commit"], ["c2", "commit"], ["c1", "abstain"]] as const).map(([c, effect], index) => ({ intentId: `commit-commit-abstain-triple:${index}:${c}:${effect}`, policyId: "commit-commit-abstain-triple", target: { kind: "candidate", uri: `cand:${c}` }, expectedRevision: o.basis.revision,
      effect, claim: { compute: 0, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? `commit:${c}` : `cand:${c}`], readScopes: [] })) : [],
    memory: memory + 1, trace: [] }) };
  const episode = runQuorumEvidence({ ...base, seed: 0, gate: "ablated", steps: 1, policy: triple });
  const [c1, c2] = episode.final.candidates;
  assert.equal(c1!.decision, "committed", `the in-batch commit on c1 was reopened: ${episode.final.events.map(e => `${e.kind}:${e.detail}`).join("|")}`);
  assert.equal(c2!.decision, "committed");
  const refused = episode.final.events.filter(e => e.kind === "refused");
  assert.deepEqual(refused.map(e => e.candidate), ["c1"]);
  assert.match(refused[0]!.detail, /^CANDIDATE_ALREADY_DECIDED: abstain on c1/);
});

test("pin e4b matcher: no specifier for a quoted from key, a comment or a string literal, and ./a.js for every real import form", () => {
  for (const [name, source] of Object.entries(NON_SPECIFIER_FIXTURES)) assert.deepEqual(importsOf(source), [], name);
  for (const [name, source] of Object.entries(SPECIFIER_FIXTURES)) assert.deepEqual(importsOf(source), ["./a.js"], name);
});

test("pin W7 matcher drift: the mirrored stripComments, IMPORT_CLAUSE and importsOf equal the package-placement export line for line", () => {
  const matcherLines = (file: string): string[] => {
    const lines = readFileSync(join(here, file), "utf8").split("\n").map(line => line.replace(/^export /, "")).filter(line => line.trim() !== "" && !/^\s*(\/\*\*|\*|\/\/)/.test(line));
    const start = lines.findIndex(line => line.startsWith("const stripComments"));
    const end = lines.findIndex(line => line.startsWith("const importsOf"));
    assert.ok(start >= 0 && end > start, `matcher block not found in ${file}`);
    return lines.slice(start, end + 2);
  };
  assert.deepEqual(matcherLines("quorum-evidence.test.ts"), matcherLines("package-placement.test.ts"));
});
