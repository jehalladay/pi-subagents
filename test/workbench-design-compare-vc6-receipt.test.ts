/**
 * wb-h8f.2 (VC-6 residual): the live Pi design/compare loop acceptance receipt judges what it claims.
 *
 * Offline, no network, no SDK and no host: the pure assessor (qa/workbench/live-design-compare-vc6-receipt.mjs) is driven
 * with an evidence record that satisfies every criterion and with one mutant per guarantee, so an assessor that returned
 * a constant, ignored a field or let the runner write its own report would fail here. The live runner
 * (qa/workbench/live-design-compare-vc6.mjs) is read as text only; it is never executed by this file.
 *
 * Criteria quoted (bead wb-h8f.2 acceptance; docs/workbench in the rig):
 * - C1 docs/15 VC-6: "Pi reads source and capability catalog; proposes patch; validates against pinned artifact; executes
 *   comparison with real native evidence; reports gains/confounders."
 * - C2 docs/11 "Comparative experiment protocol": "Pin workload, input revisions, workspace basis, code digest, model
 *   config, SDK versions and permissions." and "Capture cold/warm cache state and environment differences."
 * - C3 docs/11: "Decline precise claim if trace coverage insufficient; include raw evidence references." and "Missing
 *   native measured metrics yields unknown, not a claimed optimization."
 * - C4 docs/15 VC-6: "No automatic live implementation replacement." docs/11: "No automatic rewrite of live pinned scripts."
 * - C5 the cross-schema refusal invariant: SCHEMA_MISMATCH plus a refused confound and no side-by-side summary.
 * - C6 docs/14: "Every test evidence artifact includes revision, tool versions, commands, timestamp, host, native
 *   references and actual output."
 *
 * NOT CLAIMED by this file: that the live journey realises on any host (only the runner's own receipt measures that),
 * that the compiled core or the registered reply builder behave as the hand-built replies here (their own suites pin
 * them), and a census of this file's own case set.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessJourney,
  buildReceipt,
  CACHE_STATES,
  COHORT_SIZE,
  exitCodeFor,
  FINDING_RULES,
  HOST_PROVIDER,
  nativeRefsOf,
  PROPOSAL_CONTRACT,
  PROTOCOL_PINS,
  RECEIPT_CONTRACT,
  REQUIRED_TOOLS,
  reportOf,
  STAGES,
  UNREALISED_STEPS,
} from "../qa/workbench/live-design-compare-vc6-receipt.mjs";
import { COMPARE_PROTOCOL_PINS } from "../src/workbench/compare-tool.js";
import { PATCH_PROPOSAL_CONTRACT } from "../src/workbench/patch-proposal.js";

/**
 * The cases this delivery's claim check names, written out in full (rule 16 frozen shape): each must be registered in
 * this file exactly once and in run mode (an it.each template once per mutant), so a claimed case renamed, dropped,
 * skipped or reworded reds the self-pin case below.
 */
const CLAIMED_CASES: readonly string[] = [
  "C3: a comparison that does not measure declines precision and cites the raw native references of both cohorts",
  "C2: an unmeasured or divergent cache state is a confounder that withholds every measured gain, never averaged",
  "C4 falsifier: a live script whose digest changed across the journey, or is not the pinned source, is live-script-replaced",
  "C5 falsifier: a cross-schema pair without SCHEMA_MISMATCH, without a refused confound, with summaries or a measured reply is cross-schema-not-refused",
  "mutant $index: $step is not realised, exit 2, with a diagnostic and no finding list",
  "registers the VC-6 runner as one additive Forge command outside the default gate, leaving the gate byte-for-byte unchanged",
];

interface Ref {
  provider: string;
  type: string;
  id: string;
}
interface Run {
  taskId: string;
  status: string;
  scriptDigest: string;
  cache: string;
  nativeRefs: Ref[];
  output: string;
  error?: string;
}
interface PinRow {
  pin: string;
  fields: string[];
  notReported: string[];
  alignment: string;
}
interface Confound {
  field: string;
  kind: string;
  reason: string;
}
interface MetricRow {
  name: string;
  unit: string;
  kind: "measured" | "declined";
  delta?: number;
  verdict?: string;
  reasons?: string[];
  confidence?: { referenceRuns: number; candidateRuns: number; dispersion: string };
  evidenceRefs: string[];
}
interface Reply {
  contract: string;
  tool: string;
  ok: boolean;
  status: string;
  declined?: { code: string };
  alignment: { aligned: boolean; sourceDigests: { reference: string[]; candidate: string[] }; confounds: Confound[] };
  pins: PinRow[];
  metrics: MetricRow[];
  nativeRefs: { reference: Ref[]; candidate: Ref[] };
  diagnostics: { code: string; severity: string; message: string }[];
  limits: { claim: string; causalClaim: boolean; criticalPath: string; limitations: string[] };
}
interface Comparison {
  referenceTask: string;
  candidateTask: string;
  reply: Reply;
}
interface Evidence {
  host: { loaded: boolean; tools: string[]; diagnostic?: string };
  catalog?: { entries: { name: string; sourceRef: string; artifactDigest: string }[]; catalogDigest: string; capabilities: { ok: boolean; ids: string[] } };
  source?: { name: string; sourceRef: string; artifactDigest: string };
  proposal?: {
    contractVersion: string;
    status: string;
    proposalDigest: string;
    baseDigest: string;
    candidateDigest: string;
    referenceDigest: string;
    experimentCandidateDigest: string;
    promotion: { state: string; requires: string; applied: boolean };
    causalClaim: boolean;
    diff: { added: number; removed: number; unchanged: number; truncated: boolean };
  };
  candidate?: { path: string; artifactDigest: string };
  validation?: { ok: boolean; status: string; artifactDigest: string; executed: boolean };
  liveScript?: { path: string; before: string; after: string };
  cohorts?: { reference: Run[]; candidate: Run[] };
  comparisons?: Comparison[];
  falsifiers?: {
    crossSchema?: { diagnostics: { code: string }[]; confounds: Confound[]; metrics: unknown[]; reply: { status: string; declined?: { code: string }; metrics: MetricRow[] } };
    missingMetric?: { metric: string; perMetric: { name: string; verdict: string }[]; metrics: { name: string; delta?: number }[]; claim: string };
  };
  measurementError?: string;
}

const digest = (char: string): string => `sha256:${char.repeat(64)}`;
const BASE = digest("a");
const CANDIDATE = digest("b");
const PROPOSAL = digest("c");
const CATALOG = digest("d");
const session = (id: string): Ref => ({ provider: "claude-agent-sdk", type: "session", id });
const hostNode = (id: string): Ref => ({ provider: HOST_PROVIDER, type: "agent-call", id });
const run = (taskId: string, scriptDigest: string, ref: string): Run => ({ taskId, status: "completed", scriptDigest, cache: "unmeasured", nativeRefs: [session(ref), hostNode(`${taskId}:0`)], output: '{"first":"OK"}' });
const pins = (alignment = "aligned"): PinRow[] =>
  PROTOCOL_PINS.map(pin => ({ pin, fields: [pin], notReported: [], alignment: pin === "code digest" ? "declared-change" : alignment }));

/** Today's registered reply: the host pins no model/tools/environment/cache digest and its projection holds no workflow root, so it declines. */
function declinedReply(index: number): Reply {
  return {
    contract: "workbench.tool-reply/v1",
    tool: "workflow_compare",
    ok: true,
    status: "declined",
    declined: { code: "insufficient-coverage" },
    alignment: { aligned: false, sourceDigests: { reference: [BASE], candidate: [CANDIDATE] }, confounds: [{ field: "modelDigest", kind: "absent", reason: "modelDigest is not established by every receipt." }] },
    pins: pins("unestablished"),
    metrics: [],
    nativeRefs: { reference: [session(`r${index}`)], candidate: [session(`c${index}`)] },
    diagnostics: [{ code: "COMPARISON_UNKNOWN", severity: "warning", message: "No measured metrics were supplied." }],
    limits: { claim: "none", causalClaim: false, criticalPath: "unestablished", limitations: ["Descriptive cohort statistics are not a causal improvement claim."] },
  };
}

/** A matched reply: every pin held, no confound, one measured native row carrying its evidence references. */
function measuredReply(index: number): Reply {
  return {
    ...declinedReply(index),
    status: "measured",
    declined: undefined,
    alignment: { aligned: true, sourceDigests: { reference: [BASE], candidate: [CANDIDATE] }, confounds: [] },
    pins: pins(),
    metrics: [{ name: "latency.model.busyMs", unit: "ms", kind: "measured", delta: -20_000, confidence: { referenceRuns: 1, candidateRuns: 1, dispersion: "unmeasured" }, evidenceRefs: [`ev:r${index}`, `ev:c${index}`] }],
    diagnostics: [],
    limits: { claim: "association", causalClaim: false, criticalPath: "unestablished", limitations: ["Measured deltas are associations within the matched cohort, not causal attributions."] },
  };
}

function healthy(): Evidence {
  const reference = [run("wf_ref000", BASE, "r0"), run("wf_ref001", BASE, "r1")];
  const candidate = [run("wf_cand00", CANDIDATE, "c0"), run("wf_cand01", CANDIDATE, "c1")];
  return {
    host: { loaded: true, tools: [...REQUIRED_TOOLS] },
    catalog: { entries: [{ name: "vc6-redundant", sourceRef: ".pi/workflows/vc6-redundant.js", artifactDigest: BASE }], catalogDigest: CATALOG, capabilities: { ok: true, ids: ["forge.gate.status"] } },
    source: { name: "vc6-redundant", sourceRef: ".pi/workflows/vc6-redundant.js", artifactDigest: BASE },
    proposal: {
      contractVersion: PATCH_PROPOSAL_CONTRACT,
      status: "valid",
      proposalDigest: PROPOSAL,
      baseDigest: BASE,
      candidateDigest: CANDIDATE,
      referenceDigest: BASE,
      experimentCandidateDigest: CANDIDATE,
      promotion: { state: "proposed", requires: "operator", applied: false },
      causalClaim: false,
      diff: { added: 1, removed: 2, unchanged: 3, truncated: false },
    },
    candidate: { path: ".pi/workflows/vc6-redundant-candidate.js", artifactDigest: CANDIDATE },
    validation: { ok: true, status: "valid", artifactDigest: CANDIDATE, executed: false },
    liveScript: { path: ".pi/workflows/vc6-redundant.js", before: BASE, after: BASE },
    cohorts: { reference, candidate },
    comparisons: [0, 1].map(index => ({ referenceTask: reference[index].taskId, candidateTask: candidate[index].taskId, reply: declinedReply(index) })),
    falsifiers: {
      crossSchema: {
        diagnostics: [{ code: "SCHEMA_MISMATCH" }],
        confounds: [{ field: "schemaVersion", kind: "refused", reason: "Receipt schemaVersion differs; receipts of different schemas are refused, not coerced." }],
        metrics: [],
        reply: { status: "declined", declined: { code: "schema-refused" }, metrics: [{ name: "latency.wall.ms", unit: "ms", kind: "declined", verdict: "unknown", reasons: ["refused"], evidenceRefs: [] }] },
      },
      missingMetric: { metric: "latency.wall.ms", perMetric: [{ name: "latency.wall.ms", verdict: "unknown" }], metrics: [], claim: "none" },
    },
  };
}

/** A matched journey: measured replies and cold-state runs, so no confounder stands. */
function matched(): Evidence {
  const evidence = healthy();
  for (const entry of [...(evidence.cohorts?.reference ?? []), ...(evidence.cohorts?.candidate ?? [])]) entry.cache = "cold";
  evidence.comparisons = (evidence.comparisons ?? []).map((entry, index) => ({ ...entry, reply: measuredReply(index) }));
  return evidence;
}

const STAMP = {
  utc: "2026-11-12T07:00:00.000Z",
  revision: "9c38ac37a02af2fb7b0e6469be1d411cece70a12",
  dirty: false,
  sources: { "qa/workbench/live-design-compare-vc6.mjs": digest("e") },
  command: "node qa/workbench/live-design-compare-vc6.mjs",
  node: "v22.0.0",
  arch: "x64",
  platform: "linux",
  host: { release: "6.12", cpus: 64 },
  toolchain: { "@anthropic-ai/claude-agent-sdk": "0.0.0" },
  model: { requested: "claude-haiku-4-5" },
};
const judge = (evidence: Evidence) => buildReceipt({ ...STAMP, evidence });
const rules = (evidence: Evidence): string[] => assessJourney(evidence).findings.map((entry: { rule: string }) => entry.rule);
const stepOf = (evidence: Evidence): string | undefined => assessJourney(evidence).unrealised[0]?.step;
/** A deep copy the mutant edits, so no case can leak into another. */
const copy = (evidence: Evidence): Evidence => structuredClone(evidence);
function must<T>(value: T | undefined, name: string): T {
  if (value === undefined) throw new Error(`the healthy evidence has no ${name}`);
  return value;
}

describe("wb-h8f.2 VC-6 design/compare receipt: assessor", () => {
  it("passes a realised journey whose comparison declines: realised, no findings, exit 0", () => {
    const receipt = judge(healthy());
    expect(receipt.unrealised).toEqual([]);
    expect(receipt.findings).toEqual([]);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(true);
    expect(exitCodeFor(receipt)).toBe(0);
  });

  it("C3: a comparison that does not measure declines precision and cites the raw native references of both cohorts", () => {
    const report = reportOf(healthy());
    expect(report.precision).toBe("declined");
    expect(report.gains).toEqual([]);
    expect(report.reasons).toEqual(["declined: insufficient-coverage", "No measured metrics were supplied.", "the comparison carries no native measured metric row"]);
    expect(report.evidenceRefs).toEqual([
      { referenceTask: "wf_ref000", candidateTask: "wf_cand00", reference: [session("r0")], candidate: [session("c0")] },
      { referenceTask: "wf_ref001", candidateTask: "wf_cand01", reference: [session("r1")], candidate: [session("c1")] },
    ]);
    expect(report.confounders.map((row: Confound) => `${row.field}:${row.kind}`)).toEqual(["modelDigest:absent", "cacheState:unverified"]);
  });

  it("C3: a matched comparison reports each measured gain with its evidence references and the dispersion it carries", () => {
    const report = reportOf(matched());
    expect(report.precision).toBe("measured");
    expect(report.confounders).toEqual([]);
    expect(report.reasons).toEqual([]);
    expect(report.gains).toEqual([0, 1].map(pair => ({ pair, name: "latency.model.busyMs", unit: "ms", delta: -20_000, dispersion: "unmeasured", referenceRuns: 1, candidateRuns: 1, evidenceRefs: [`ev:r${pair}`, `ev:c${pair}`] })));
    expect(exitCodeFor(judge(matched()))).toBe(0);
  });

  it("C2: an unmeasured or divergent cache state is a confounder that withholds every measured gain, never averaged", () => {
    const unmeasured = matched();
    must(unmeasured.cohorts, "cohorts").candidate[1].cache = "unmeasured";
    const withheld = reportOf(unmeasured);
    expect(withheld.precision).toBe("declined");
    expect(withheld.gains).toEqual([]);
    expect(withheld.confounders).toEqual([{ field: "cacheState", kind: "unverified", reason: "the cold/warm cache state of a run is unmeasured or unrecorded" }]);
    expect(withheld.reasons).toEqual(["measured rows withheld beside confounders: cacheState"]);
    const divergent = matched();
    must(divergent.cohorts, "cohorts").candidate[1].cache = "warm";
    expect(reportOf(divergent).confounders).toEqual([{ field: "cacheState", kind: "mismatched", reason: "cache states differ: reference cold,cold vs candidate cold,warm" }]);
    expect(reportOf(divergent).gains).toEqual([]);
  });

  it("C2 falsifier: a measured row beside a confound or an unheld protocol pin is confounded-measurement and exits 1", () => {
    const confound = matched();
    must(confound.comparisons, "comparisons")[0].reply.alignment.confounds = [{ field: "toolsDigest", kind: "mismatched", reason: "toolsDigest differs." }];
    expect(rules(confound)).toEqual(["confounded-measurement", "comparison-not-reproducible"]);
    const pin = matched();
    for (const entry of must(pin.comparisons, "comparisons")) entry.reply.pins[4].alignment = "misaligned";
    expect(rules(pin)).toEqual(["confounded-measurement"]);
    expect(exitCodeFor(judge(pin))).toBe(1);
  });

  it("C2 falsifier: a reply that drops a docs/11 protocol pin is pin-unreported", () => {
    const evidence = healthy();
    for (const entry of must(evidence.comparisons, "comparisons")) entry.reply.pins = entry.reply.pins.filter(row => row.pin !== "SDK versions");
    expect(rules(evidence)).toEqual(["pin-unreported"]);
    expect(assessJourney(evidence).findings[0]?.detail).toContain("SDK versions");
  });

  it("C2 falsifier: a run whose cache state is not cold, warm or unmeasured is cache-state-unrecorded", () => {
    const evidence = healthy();
    must(evidence.cohorts, "cohorts").reference[0].cache = "";
    expect(rules(evidence)).toEqual(["cache-state-unrecorded"]);
  });

  it("C2 falsifier: pair replies that disagree on verdict, decline code or confound set are comparison-not-reproducible", () => {
    const evidence = healthy();
    must(evidence.comparisons, "comparisons")[1].reply.declined = { code: "misaligned" };
    expect(rules(evidence)).toEqual(["comparison-not-reproducible"]);
    const confounds = healthy();
    must(confounds.comparisons, "comparisons")[1].reply.alignment.confounds.push({ field: "inputDigest", kind: "absent", reason: "inputDigest is not established by every receipt." });
    expect(rules(confounds)).toEqual(["comparison-not-reproducible"]);
  });

  it("C3 falsifier: a measured row without evidence references is measured-without-evidence and is never reported as a gain", () => {
    const evidence = matched();
    for (const entry of must(evidence.comparisons, "comparisons")) entry.reply.metrics[0].evidenceRefs = [];
    expect(rules(evidence)).toEqual(["measured-without-evidence"]);
    expect(reportOf(evidence).gains).toEqual([]);
    expect(reportOf(evidence).precision).toBe("declined");
  });

  it("C3 falsifier: a missing native metric that reads measured, carries a delta or claims association is unknown-claimed", () => {
    for (const mutate of [
      (falsifier: NonNullable<NonNullable<Evidence["falsifiers"]>["missingMetric"]>) => {
        falsifier.perMetric[0].verdict = "measured";
      },
      (falsifier: NonNullable<NonNullable<Evidence["falsifiers"]>["missingMetric"]>) => {
        falsifier.metrics = [{ name: "latency.wall.ms", delta: -1 }];
      },
      (falsifier: NonNullable<NonNullable<Evidence["falsifiers"]>["missingMetric"]>) => {
        falsifier.claim = "association";
      },
    ]) {
      const evidence = healthy();
      mutate(must(must(evidence.falsifiers, "falsifiers").missingMetric, "missingMetric"));
      expect(rules(evidence)).toEqual(["unknown-claimed"]);
    }
  });

  it("C4 falsifier: a live script whose digest changed across the journey, or is not the pinned source, is live-script-replaced", () => {
    const changed = healthy();
    must(changed.liveScript, "liveScript").after = CANDIDATE;
    expect(rules(changed)).toEqual(["live-script-replaced"]);
    expect(exitCodeFor(judge(changed))).toBe(1);
    const foreign = healthy();
    const live = must(foreign.liveScript, "liveScript");
    live.before = digest("f");
    live.after = digest("f");
    expect(rules(foreign)).toEqual(["live-script-replaced"]);
  });

  it("C4 falsifier: a promotion that is applied, decided or not operator-only is promotion-not-operator-only", () => {
    for (const promotion of [
      { state: "promoted", requires: "operator", applied: false },
      { state: "proposed", requires: "operator", applied: true },
      { state: "proposed", requires: "model", applied: false },
    ]) {
      const evidence = healthy();
      must(evidence.proposal, "proposal").promotion = promotion;
      expect(rules(evidence)).toEqual(["promotion-not-operator-only"]);
    }
    expect(reportOf(healthy()).recommendation).toEqual({ promotion: "operator-only", applied: false, proposalDigest: PROPOSAL });
  });

  it("C5 falsifier: a cross-schema pair without SCHEMA_MISMATCH, without a refused confound, with summaries or a measured reply is cross-schema-not-refused", () => {
    type Cross = NonNullable<NonNullable<Evidence["falsifiers"]>["crossSchema"]>;
    const mutants: ((cross: Cross) => void)[] = [
      cross => {
        cross.diagnostics = [];
      },
      cross => {
        cross.confounds = [{ field: "schemaVersion", kind: "mismatched", reason: "differs" }];
      },
      cross => {
        cross.metrics = [{ name: "latency.wall.ms" }];
      },
      cross => {
        cross.reply.status = "measured";
      },
      cross => {
        cross.reply.declined = { code: "insufficient-coverage" };
      },
      cross => {
        cross.reply.metrics = [{ name: "latency.wall.ms", unit: "ms", kind: "measured", delta: 1, evidenceRefs: ["ev:x"] }];
      },
    ];
    for (const mutate of mutants) {
      const evidence = healthy();
      mutate(must(must(evidence.falsifiers, "falsifiers").crossSchema, "crossSchema"));
      expect(rules(evidence)).toEqual(["cross-schema-not-refused"]);
    }
  });

  it("C1 falsifier: a catalog entry that is not the pinned source read is catalog-digest-mismatch", () => {
    const evidence = healthy();
    must(evidence.catalog, "catalog").entries[0].artifactDigest = CANDIDATE;
    expect(rules(evidence)).toEqual(["catalog-digest-mismatch"]);
  });

  it("C1 falsifier: a proposal off the pinned base, without its digest, of another contract, or whose candidate is not the file run is proposal-not-pinned", () => {
    type Proposal = NonNullable<Evidence["proposal"]>;
    const mutants: ((proposal: Proposal, evidence: Evidence) => void)[] = [
      proposal => {
        proposal.baseDigest = digest("f");
      },
      proposal => {
        proposal.referenceDigest = digest("f");
      },
      proposal => {
        proposal.proposalDigest = "sha256:short";
      },
      proposal => {
        proposal.contractVersion = "workbench.patch-proposal/v0";
      },
      proposal => {
        proposal.experimentCandidateDigest = digest("f");
      },
      (_proposal, evidence) => {
        must(evidence.candidate, "candidate").artifactDigest = digest("f");
      },
    ];
    for (const mutate of mutants) {
      const evidence = healthy();
      mutate(must(evidence.proposal, "proposal"), evidence);
      expect(rules(evidence)).toEqual(["proposal-not-pinned"]);
    }
  });

  it("C1 falsifier: an invalid, refused, executed or other-digest validation is candidate-not-validated", () => {
    type Validation = NonNullable<Evidence["validation"]>;
    const mutants: ((validation: Validation, evidence: Evidence) => void)[] = [
      validation => {
        validation.status = "uncertain";
      },
      validation => {
        validation.ok = false;
      },
      validation => {
        validation.executed = true;
      },
      validation => {
        validation.artifactDigest = BASE;
      },
      (_validation, evidence) => {
        must(evidence.proposal, "proposal").status = "invalid";
      },
    ];
    for (const mutate of mutants) {
      const evidence = healthy();
      mutate(must(evidence.validation, "validation"), evidence);
      expect(rules(evidence)).toEqual(["candidate-not-validated"]);
    }
  });

  it("C1 falsifier: a run of the wrong digest is cohort-digest-mismatch; a reply pairing other tasks or digests is comparison-unpaired", () => {
    const digests = healthy();
    must(digests.cohorts, "cohorts").candidate[0].scriptDigest = BASE;
    expect(rules(digests)).toEqual(["cohort-digest-mismatch"]);
    const tasks = healthy();
    must(tasks.comparisons, "comparisons")[1].candidateTask = "wf_cand00";
    expect(rules(tasks)).toEqual(["comparison-unpaired"]);
    const sources = healthy();
    for (const entry of must(sources.comparisons, "comparisons")) entry.reply.alignment.sourceDigests.candidate = [BASE];
    expect(rules(sources)).toEqual(["comparison-unpaired"]);
  });

  it("C1 falsifier: a comparison reply that omits a run's observed native reference is native-evidence-uncited", () => {
    const evidence = healthy();
    must(evidence.comparisons, "comparisons")[0].reply.nativeRefs.candidate = [];
    expect(rules(evidence)).toEqual(["native-evidence-uncited"]);
    expect(assessJourney(evidence).findings[0]?.detail).toBe("pair 0 candidate reply omits claude-agent-sdk|session|c0");
  });

  it("a causal claim from a reply or the proposal is causal-claim", () => {
    const reply = healthy();
    must(reply.comparisons, "comparisons")[0].reply.limits.causalClaim = true;
    expect(rules(reply)).toEqual(["causal-claim"]);
    const proposal = healthy();
    must(proposal.proposal, "proposal").causalClaim = true;
    expect(rules(proposal)).toEqual(["causal-claim"]);
  });

  it("host nodes are never native evidence: nativeRefsOf keeps only non-host references with an id", () => {
    expect(nativeRefsOf([session("s"), hostNode("h"), { provider: "forge", type: "operation", id: "" }, null])).toEqual([session("s")]);
    expect(nativeRefsOf(undefined)).toEqual([]);
  });
});

type Mutant = { step: string; mutate: (evidence: Evidence) => void };
const MUTANTS: readonly Mutant[] = [
  { step: "host-unavailable", mutate: evidence => { evidence.host = { loaded: false, tools: [], diagnostic: "dist/index.js missing" }; } },
  { step: "host-unavailable", mutate: evidence => { evidence.host.tools = evidence.host.tools.filter(tool => tool !== "workflow_compare"); } },
  { step: "measurement-error", mutate: evidence => { evidence.measurementError = "the harness threw"; } },
  { step: "catalog-unread", mutate: evidence => { must(evidence.catalog, "catalog").entries = []; } },
  { step: "catalog-unread", mutate: evidence => { must(evidence.catalog, "catalog").capabilities.ok = false; } },
  { step: "proposal-absent", mutate: evidence => { delete evidence.proposal; } },
  { step: "validation-absent", mutate: evidence => { delete evidence.validation; } },
  { step: "live-digest-unrecorded", mutate: evidence => { must(evidence.liveScript, "liveScript").after = ""; } },
  { step: "cohort-not-executed", mutate: evidence => { const runs = must(evidence.cohorts, "cohorts").candidate; runs[1].status = "error"; runs[1].error = "Claude SDK unavailable"; } },
  { step: "cohort-not-executed", mutate: evidence => { must(evidence.cohorts, "cohorts").reference.pop(); } },
  { step: "native-evidence-absent", mutate: evidence => { must(evidence.cohorts, "cohorts").reference[1].nativeRefs = [hostNode("wf_ref001:0")]; } },
  { step: "comparison-absent", mutate: evidence => { must(evidence.comparisons, "comparisons").pop(); } },
  { step: "comparison-absent", mutate: evidence => { must(evidence.comparisons, "comparisons")[0].reply.ok = false; } },
  { step: "falsifier-unrun", mutate: evidence => { delete must(evidence.falsifiers, "falsifiers").crossSchema; } },
];

describe("wb-h8f.2 VC-6 design/compare receipt: not realised is exit 2, never a pass", () => {
  it.each(MUTANTS.map((entry, index) => ({ ...entry, index })))("mutant $index: $step is not realised, exit 2, with a diagnostic and no finding list", ({ step, mutate }) => {
    const evidence = copy(healthy());
    mutate(evidence);
    const receipt = judge(evidence);
    expect(stepOf(evidence)).toBe(step);
    expect(receipt.unrealised).toHaveLength(1);
    expect(String(receipt.unrealised[0]?.diagnostic ?? "").length).toBeGreaterThan(0);
    expect(receipt.findings).toEqual([]);
    expect(receipt.realised).toBe(false);
    expect(receipt.pass).toBe(false);
    expect(exitCodeFor(receipt)).toBe(2);
  });

  it("names the failed runs in the cohort-not-executed diagnostic", () => {
    const evidence = healthy();
    const runs = must(evidence.cohorts, "cohorts").reference;
    runs[0].status = "error";
    runs[0].error = "gateway unavailable";
    expect(assessJourney(evidence).unrealised[0]?.diagnostic).toBe(`the reference cohort completed 1 of ${COHORT_SIZE} runs: wf_ref000:error (gateway unavailable), wf_ref001:completed`);
  });

  it("an unrealised step wins over findings: exit 2 even when a violation was also measured", () => {
    const evidence = healthy();
    must(evidence.liveScript, "liveScript").after = CANDIDATE;
    must(evidence.comparisons, "comparisons").pop();
    const receipt = judge(evidence);
    expect(receipt.findings).toEqual([]);
    expect(receipt.unrealised.map((entry: { step: string }) => entry.step)).toEqual(["comparison-absent"]);
    expect(exitCodeFor(receipt)).toBe(2);
  });
});

describe("wb-h8f.2 VC-6 design/compare receipt: evidence-grade fields and vocabulary", () => {
  it("C6: the receipt carries contract, timestamp, revision, toolchain, command, host, native references and actual output", () => {
    const receipt = judge(healthy());
    expect(receipt.contract).toBe(RECEIPT_CONTRACT);
    expect(receipt.contract).toBe("workbench.design-compare-vc6/v1");
    expect([receipt.utc, receipt.revision, receipt.command, receipt.node, receipt.arch, receipt.platform]).toEqual([STAMP.utc, STAMP.revision, STAMP.command, STAMP.node, STAMP.arch, STAMP.platform]);
    expect(receipt.dirty).toBe(false);
    expect(receipt.sources).toEqual(STAMP.sources);
    expect(receipt.host).toEqual(STAMP.host);
    expect(receipt.toolchain).toEqual(STAMP.toolchain);
    expect(receipt.model).toEqual(STAMP.model);
    expect(receipt.stages).toEqual([...STAGES]);
    expect(receipt.journey.cohorts.reference.map((entry: Run) => entry.output)).toEqual(['{"first":"OK"}', '{"first":"OK"}']);
    expect(receipt.journey.comparisons).toHaveLength(COHORT_SIZE);
    expect(receipt.report.evidenceRefs.flatMap((pair: { reference: Ref[]; candidate: Ref[] }) => [...pair.reference, ...pair.candidate]).map((ref: Ref) => ref.id)).toEqual(["r0", "c0", "r1", "c1"]);
  });

  it("the report is derived from the evidence: a report the runner supplies is never read", () => {
    const evidence = { ...healthy(), report: { precision: "measured", gains: [{ name: "invented" }] } };
    expect(buildReceipt({ ...STAMP, evidence }).report.precision).toBe("declined");
    expect(buildReceipt({ ...STAMP, evidence }).report.gains).toEqual([]);
  });

  it("names the contract rules, steps, stages, tools and pins exactly, so a quiet rename is caught", () => {
    expect(FINDING_RULES).toEqual([
      "catalog-digest-mismatch",
      "proposal-not-pinned",
      "candidate-not-validated",
      "promotion-not-operator-only",
      "live-script-replaced",
      "cohort-digest-mismatch",
      "cache-state-unrecorded",
      "comparison-unpaired",
      "native-evidence-uncited",
      "pin-unreported",
      "confounded-measurement",
      "measured-without-evidence",
      "comparison-not-reproducible",
      "causal-claim",
      "unknown-claimed",
      "cross-schema-not-refused",
    ]);
    expect(UNREALISED_STEPS).toEqual([
      "host-unavailable",
      "measurement-error",
      "catalog-unread",
      "proposal-absent",
      "validation-absent",
      "live-digest-unrecorded",
      "cohort-not-executed",
      "native-evidence-absent",
      "comparison-absent",
      "falsifier-unrun",
    ]);
    expect(STAGES).toEqual(["catalog", "proposal", "validation", "execution", "comparison", "report"]);
    expect(REQUIRED_TOOLS).toEqual(["workflow_catalog", "workbench_catalog", "workflow_validate", "SubagentWorkflow", "workflow_observe", "workflow_compare"]);
    expect(CACHE_STATES).toEqual(["cold", "warm", "unmeasured"]);
    expect(COHORT_SIZE).toBe(2);
    expect(HOST_PROVIDER).toBe("pi-workflow");
  });

  it("anchors the protocol pins and the proposal contract to the shipped modules, not to this module's own literals", () => {
    expect(PROTOCOL_PINS).toEqual(COMPARE_PROTOCOL_PINS.map(row => row.pin));
    expect(PROPOSAL_CONTRACT).toBe(PATCH_PROPOSAL_CONTRACT);
  });

  it("every finding rule and every unrealised step is reachable by a mutant of the healthy evidence", () => {
    const reached = new Set<string>();
    const tries: ((evidence: Evidence) => void)[] = [
      evidence => { must(evidence.catalog, "catalog").entries[0].artifactDigest = CANDIDATE; },
      evidence => { must(evidence.proposal, "proposal").baseDigest = digest("f"); },
      evidence => { must(evidence.validation, "validation").status = "invalid"; },
      evidence => { must(evidence.proposal, "proposal").promotion.applied = true; },
      evidence => { must(evidence.liveScript, "liveScript").after = CANDIDATE; },
      evidence => { must(evidence.cohorts, "cohorts").reference[0].scriptDigest = CANDIDATE; },
      evidence => { must(evidence.cohorts, "cohorts").reference[0].cache = "hot"; },
      evidence => { must(evidence.comparisons, "comparisons")[0].referenceTask = "wf_other0"; },
      evidence => { must(evidence.comparisons, "comparisons")[0].reply.nativeRefs.reference = []; },
      evidence => { for (const entry of must(evidence.comparisons, "comparisons")) entry.reply.pins = []; },
      evidence => { for (const entry of must(evidence.comparisons, "comparisons")) entry.reply.metrics = [{ name: "m", unit: "ms", kind: "measured", delta: 1, evidenceRefs: [] }]; },
      evidence => { must(evidence.comparisons, "comparisons")[1].reply.status = "measured"; },
      evidence => { must(evidence.proposal, "proposal").causalClaim = true; },
      evidence => { must(must(evidence.falsifiers, "falsifiers").missingMetric, "missingMetric").claim = "association"; },
      evidence => { must(must(evidence.falsifiers, "falsifiers").crossSchema, "crossSchema").diagnostics = []; },
    ];
    for (const mutate of tries) {
      const evidence = healthy();
      mutate(evidence);
      for (const rule of rules(evidence)) reached.add(rule);
    }
    expect([...reached].sort()).toEqual([...FINDING_RULES].sort());
  });

  it("the claimed cases are registered exactly once each, in run mode, and every mutant renders its own case", ({ task }) => {
    const registered: { name: string; mode: string }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    for (const claimed of CLAIMED_CASES) {
      const escaped = claimed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // vitest renders $index as a number (index 0 as +0) and a string $step single-quoted.
      const pattern = new RegExp(`^${escaped.replace("\\$index", "\\+?\\d+").replace("\\$step", "'[a-z-]+'")}$`);
      const hits = registered.filter(entry => pattern.test(entry.name));
      expect(hits.length, claimed).toBe(claimed.includes("$index") ? MUTANTS.length : 1);
      expect(hits.every(entry => entry.mode === "run"), claimed).toBe(true);
    }
  });
});

describe("wb-h8f.2 VC-6 design/compare receipt: placement and runner shape", () => {
  const sourceOf = (path: string): string => readFileSync(new URL(path, import.meta.url), "utf8");
  const receiptModule = sourceOf("../qa/workbench/live-design-compare-vc6-receipt.mjs");
  const runner = sourceOf("../qa/workbench/live-design-compare-vc6.mjs");

  it("keeps the receipt module pure: no imports, no dynamic load, no wall clock, random source or process access", () => {
    expect(receiptModule).not.toMatch(/^\s*import\s/m);
    expect(receiptModule).not.toMatch(/\bimport\(|\brequire\(/);
    expect(receiptModule).not.toMatch(/Date\.now|new Date|Math\.random|performance\.|process\./);
  });

  it("drives the compiled modules and the booted extension only: no src import, scratch through the qa helper, the report built by the assessor", () => {
    const imports = [...runner.matchAll(/^import .* from '([^']+)';$/gm)].map(match => match[1]);
    expect(imports.filter(path => path.startsWith("../../src/"))).toEqual([]);
    expect(imports).toEqual(expect.arrayContaining(["../../dist/workbench/designer.js", "../../dist/workbench/patch-proposal.js", "./live-design-compare-vc6-receipt.mjs", "./scratch.mjs"]));
    expect(runner).toContain("dist/index.js");
    expect(runner).toMatch(/makeScratch\(/);
    expect(runner).not.toMatch(/mkdtemp|tmpdir\(/);
    expect(runner).toMatch(/buildReceipt\(/);
    expect(runner).not.toMatch(/reportOf\(/);
    expect(runner).toMatch(/process\.exitCode = exitCodeFor\(receipt\);/);
  });

  it("registers the VC-6 runner as one additive Forge command outside the default gate, leaving the gate byte-for-byte unchanged", () => {
    const forge = sourceOf("../forge.toml");
    expect(forge).toContain('[build.commands.design-compare-vc6-live]\ncommand = "node qa/workbench/live-design-compare-vc6.mjs"\ntimeout = 900\n');
    expect(forge.match(/\[build\.commands\.design-compare-vc6-live\]/g)).toHaveLength(1);
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[0];
    expect(gate).toBe('gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]');
  });
});
