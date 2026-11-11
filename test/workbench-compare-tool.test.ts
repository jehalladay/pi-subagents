/**
 * wb-69g.7 (W16-H/VC-6): the pure bounded workflow_compare reply builder, src/workbench/compare-tool.ts, over the landed
 * W17 comparison core (src/workbench/designer.ts compareWorkflowRuns, read here and never edited).
 *
 * Spec lines pinned (docs/workbench/11-designer-and-operator.md, read by CMP-SPEC-LINES):
 * - "First public Pi tools (proposed)": "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis
 *   alignment, measured metrics and confidence/coverage limits." -> CMP-ALIGN-ECHO, CMP-GROUPS, CMP-MEASURED-LIMITS,
 *   CMP-SINGLE-RUN, CMP-MIXED, CMP-DIMENSIONS-SELECT, CMP-DIMENSIONS-UNMATCHED, CMP-DIMENSIONS-INVALID.
 * - "Comparative experiment protocol": "Pin workload, input revisions, workspace basis, code digest, model config, SDK
 *   versions and permissions." -> CMP-PINS-DOC, CMP-PINS-STATUS.
 * - same section: "Decline precise claim if trace coverage insufficient; include raw evidence references." ->
 *   CMP-COVERAGE-WITHHELD, CMP-BASIS-UNESTABLISHED, CMP-NO-METRICS, CMP-SCHEMA-REFUSED.
 * Bead falsifiers: insufficient coverage is a typed declined-precision reply carrying zero numeric claims
 * (CMP-COVERAGE-WITHHELD, CMP-BASIS-UNESTABLISHED, CMP-NO-METRICS); a basis/digest mismatch is echoed as misaligned and
 * never silently reconciled (CMP-MISALIGNED, CMP-NEVER-RECONCILED, CMP-CAP-NEVER-ALIGNMENT); every string routes through
 * the shared sanitizers (CMP-SANITIZED, CMP-ENUMS-CLOSED); byte-capped compact JSON (CMP-CAP-COMPACT, CMP-CAP-DROP-ORDER,
 * CMP-CAP-BOUNDS); the builder never invokes a provider verb (CMP-PURE-IMPORTS, CMP-PURE-INPUT). Authorization from the
 * grant snapshot alone: CMP-GRANTS, CMP-GRANTS-EXACT, CMP-MALFORMED.
 *
 * wb-h8f.7 (this file's adopting bead; the wb-69g.7 cut cf8474a9 is its provenance) adds the input the registered tool
 * supplies beside the comparison: the raw native evidence references its projection read collected for each task. The same
 * docs/11 sentence, "Decline precise claim if trace coverage insufficient; include raw evidence references.", is pinned for
 * them by CMP-NATIVE-ECHO (a declined reply over receipts without metrics still carries them), CMP-NATIVE-NEUTRAL (they change
 * no status, verdict, alignment, pin or number), CMP-NATIVE-SANITIZED, CMP-NATIVE-MALFORMED and CMP-NATIVE-CAP.
 * NOT CLAIMED by this file: the registered workflow_compare tool in src/index.ts (its parameters, its receipt lookup and its
 * call of this builder are pinned through the real extension by test/workbench-pi-compare-reply.test.ts); native metric
 * sourcing for live runs (wb-pno's open item); evidence references for a metric the core withheld before aggregation (the
 * core result carries none, so the builder has none to echo; CMP-COVERAGE-WITHHELD pins that the row's list is empty, never
 * invented).
 * The typed declined-precision reply is the reply whose status is "declined": its metric rows are kind "declined" and carry
 * no number. (The module spells neither "precision" nor an inconsistency word: the src vocabulary censuses
 * test/workbench-edc-demand-channel-census.test.ts and test/workbench-rf-federation-refusal-codes-census.test.ts pin their
 * live sets, so the words live here and in the bead, not in src.)
 * Hostile display inputs are built with String.fromCodePoint and the credential-shaped value is an obviously fake marker.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type BuildWorkflowCompareReplyInput,
  buildWorkflowCompareReply,
  COMPARE_BASIS_GROUPS,
  COMPARE_PROTOCOL_PINS,
  COMPARE_REPLY_DEFAULT_MAX_BYTES,
  COMPARE_REPLY_MAX_BYTES,
  COMPARE_REPLY_MIN_BYTES,
  COMPARE_REPLY_TRUNCATION_MARKER,
  type CompareCompletedReply,
  type CompareNativeRefInput,
  type CompareRefusalReply,
  type WorkflowCompareReply,
} from "../src/workbench/compare-tool.js";
import { type CompareRun, compareWorkflowRuns, type MeasuredMetric, type WorkflowComparison } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const GRANTS = ["workbench:design", "workbench:observe"] as const;
const SOURCES = {
  reference: 'export const meta = { name: "fixture", description: "d" }; return 1;',
  candidate: 'export const meta = { name: "fixture", description: "d" }; return 2;',
} as const;
const sha = (text: string): string => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const D = identityDigest("fixture", {});
const OTHER = identityDigest("other", {});
const cp = (code: number): string => String.fromCodePoint(code);
const UNITS: Readonly<Record<string, string>> = { elapsed: "ms", tokens: "count" };

interface ReceiptOptions {
  source?: string;
  workspaceSourceState?: "measured" | "unknown";
  coverage?: Readonly<Record<string, MeasuredMetric["coverage"]>>;
  schemaVersion?: string;
  pinned?: Partial<Pick<InvocationSnapshot, "configurationDigest" | "dependencyDigest">>;
  changes?: Partial<CompareRun>;
}
/** One internally consistent receipt the landed core accepts: its deployment digest is re-pinned from its own components. */
function receipt(id: string, values: Readonly<Record<string, number>>, options: ReceiptOptions = {}): CompareRun {
  const scriptSource = options.source ?? SOURCES.reference;
  const scriptDigest = sha(scriptSource);
  const definition = { kind: "script" as const, id: "fixture.js", schemaVersion: options.schemaVersion ?? "1", artifactDigest: scriptDigest };
  const components = { dependencyDigest: D, hostImplementationDigest: D, runtimeArtifactDigest: D, configurationDigest: D, hostAbiDigest: D, providerContractDigest: D, ...options.pinned };
  const snapshot: InvocationSnapshot = {
    identity: { logicalInvocationId: id, definition, deploymentDigest: identityDigest("deployment", { definition, ...components }), subjectBasis: D },
    scriptDigest, scriptSource, hostArtifacts: [], runtimeArtifacts: [], dependencyArtifacts: [], ...components,
  };
  const ref = { provider: "forge", type: "operation", id };
  const metrics: MeasuredMetric[] = Object.entries(values).map(([name, value]) => ({
    name, unit: UNITS[name] ?? "ms", value, source: ref, evidenceRefs: [`forge-operation:${id}:${name}`], subjectBasis: D,
    coverage: options.coverage?.[name] ?? "complete", freshness: "current",
  }));
  return {
    snapshot, inputDigest: D, modelDigest: D, toolsDigest: D, environmentDigest: D, cacheDigest: D, nativeRefs: [ref], metrics,
    ...(options.workspaceSourceState !== undefined ? { workspaceSourceState: options.workspaceSourceState } : {}), ...options.changes,
  };
}
const measuredState = { workspaceSourceState: "measured" } as const;
const candidateState = { source: SOURCES.candidate, workspaceSourceState: "measured" } as const;
/** Two-run cohorts over a declared source change, both metrics complete: the landed core measures both. */
function measuredCore(): WorkflowComparison {
  return compareWorkflowRuns(
    [receipt("a", { elapsed: 10, tokens: 100 }, measuredState), receipt("b", { elapsed: 20, tokens: 120 }, measuredState)],
    [receipt("c", { elapsed: 5, tokens: 90 }, candidateState), receipt("d", { elapsed: 15, tokens: 110 }, candidateState)],
  );
}
function build(comparison: WorkflowComparison, extra: { grants?: readonly string[] | undefined; dimensions?: readonly string[]; maxBytes?: number } = {}) {
  return buildWorkflowCompareReply({ comparison, grants: "grants" in extra ? extra.grants : GRANTS, ...(extra.dimensions ? { dimensions: extra.dimensions } : {}), ...(extra.maxBytes !== undefined ? { maxBytes: extra.maxBytes } : {}) });
}
function parse(text: string): WorkflowCompareReply {
  return JSON.parse(text) as WorkflowCompareReply;
}
function completed(comparison: WorkflowComparison, extra: Parameters<typeof build>[1] = {}): CompareCompletedReply {
  const reply = parse(build(comparison, extra).text);
  if (reply.status === "refused") throw new Error(`unexpected refusal ${reply.error.code}`);
  return reply;
}
function refused(comparison: unknown, extra: Parameters<typeof build>[1] = {}): CompareRefusalReply {
  const reply = parse(build(comparison as WorkflowComparison, extra).text);
  if (reply.status !== "refused") throw new Error(`expected a refusal, got ${reply.status}`);
  return reply;
}
function numbers(value: unknown): number[] {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numbers);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(numbers);
  return [];
}
/** Every number outside the byte-cap bookkeeping (counts, truncation): a metric value, a delta or a summary statistic. */
function claimedNumbers(reply: CompareCompletedReply): number[] {
  const { counts: _counts, truncation: _truncation, ...rest } = reply;
  return numbers(rest);
}
const fieldsOf = (comparison: WorkflowComparison): string[] => comparison.cohort.basis.map(row => row.field);

describe("wb-69g.7 workflow_compare reply: spec lines and the measured, aligned comparison", () => {
  it("CMP-SPEC-LINES: docs/11 carries each quoted spec line exactly once", () => {
    const doc = readFileSync(new URL("../docs/workbench/11-designer-and-operator.md", import.meta.url), "utf8");
    for (const line of [
      "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis alignment, measured metrics and confidence/coverage limits.",
      "Pin workload, input revisions, workspace basis, code digest, model config, SDK versions and permissions.",
      "Decline precise claim if trace coverage insufficient; include raw evidence references.",
    ]) {
      expect(doc.split(line).length - 1, line).toBe(1);
    }
  });

  it("CMP-ENVELOPE: a measured comparison is a workbench.tool-reply/v1 workflow_compare reply, ok, never invoked, within the default cap", () => {
    const built = build(measuredCore());
    const reply = parse(built.text);
    expect(reply).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: true, invoked: false, status: "measured", coreStatus: "comparable" });
    expect(Object.keys(reply).sort()).toEqual(["alignment", "contract", "coreStatus", "counts", "diagnostics", "invoked", "limits", "metrics", "ok", "pins", "status", "tool"]);
    expect(built.bytes).toBe(Buffer.byteLength(built.text));
    expect(built.bytes).toBeLessThanOrEqual(COMPARE_REPLY_DEFAULT_MAX_BYTES);
    expect(built.truncated).toBe(false);
    expect(built.reply).toEqual(reply);
  });

  it("CMP-ALIGN-ECHO: every core basis row is echoed in order with its status and the alignment word that status alone gives, beside the core's source digests and matched cohort", () => {
    const core = measuredCore();
    const reply = completed(core);
    const word: Readonly<Record<string, string>> = { matched: "aligned", "declared-change": "declared-change", mismatched: "misaligned", absent: "unestablished", unverified: "unestablished" };
    expect(reply.alignment.basis.map(row => [row.field, row.status, row.alignment, row.detail])).toEqual(core.cohort.basis.map(row => [row.field, row.status, word[row.status], row.detail]));
    expect(reply.alignment.basis.filter(row => row.status === "declared-change").map(row => row.field)).toEqual(["definitionDigest", "deploymentDigest"]);
    expect(reply.alignment.sourceDigests).toEqual({ reference: [sha(SOURCES.reference)], candidate: [sha(SOURCES.candidate)] });
    expect(core.cohort.matched).toBe(true);
    expect(reply.alignment.aligned).toBe(true);
    expect(reply.alignment.confounds).toEqual([]);
  });

  it("CMP-GROUPS: the group table classifies exactly the basis fields the landed core emits, under source, config and basis", () => {
    expect([...COMPARE_BASIS_GROUPS.keys()].sort()).toEqual(fieldsOf(measuredCore()).sort());
    expect([...COMPARE_BASIS_GROUPS.entries()].map(([field, group]) => `${field}:${group}`)).toEqual([
      "definition:source", "schemaVersion:source", "definitionDigest:source", "deploymentDigest:source", "configurationDigest:config", "modelDigest:config",
      "toolsDigest:config", "dependencyDigest:config", "runtimeArtifactDigest:config", "hostImplementationDigest:config", "hostAbiDigest:config",
      "providerContractDigest:config", "inputDigest:basis", "subjectBasis:basis", "workspaceSourceState:basis", "environmentDigest:basis", "cacheDigest:basis",
    ]);
    const reply = completed(measuredCore());
    expect(reply.alignment.basis.map(row => row.group)).toEqual(reply.alignment.basis.map(row => COMPARE_BASIS_GROUPS.get(row.field)));
    expect(new Set(reply.alignment.basis.map(row => row.group))).toEqual(new Set(["source", "config", "basis"]));
  });

  it("CMP-MEASURED-LIMITS: a measured metric carries the core's delta and both cohort summaries, run counts with measured dispersion, complete current coverage and its evidence references", () => {
    const core = measuredCore();
    const reply = completed(core);
    expect(reply.metrics).toEqual(core.metrics.map(metric => ({
      name: metric.name, unit: metric.unit, kind: "measured", delta: metric.delta, reference: metric.reference, candidate: metric.candidate,
      confidence: { referenceRuns: 2, candidateRuns: 2, dispersion: "measured" }, coverage: "complete", freshness: "current", evidenceRefs: metric.evidenceRefs,
    })));
    expect(reply.metrics.map(row => (row.kind === "measured" ? row.delta : undefined))).toEqual([-5, -10]);
    expect(reply.limits).toEqual({ claim: "association", causalClaim: false, criticalPath: "unestablished", limitations: core.limitations });
    expect(reply).not.toHaveProperty("declined");
    expect(numbers(reply.alignment).concat(numbers(reply.pins), numbers(reply.limits), numbers(reply.diagnostics))).toEqual([]);
  });

  it("CMP-SINGLE-RUN: a single-run cohort's measured metric reads dispersion unmeasured beside the core's single-run limitation", () => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, candidateState)]);
    const reply = completed(core);
    expect(reply.metrics).toMatchObject([{ name: "elapsed", kind: "measured", delta: -5, confidence: { referenceRuns: 1, candidateRuns: 1, dispersion: "unmeasured" } }]);
    expect(reply.limits.limitations).toContain("Single-run cohort: stochastic dispersion is unmeasured.");
  });

  it("CMP-MIXED: beside a measured metric, a metric the core withheld is a declined row with no number, after the measured rows", () => {
    const partial = { coverage: { tokens: "partial" } } as const;
    const core = compareWorkflowRuns(
      [receipt("a", { elapsed: 10, tokens: 100 }, { ...measuredState, ...partial }), receipt("b", { elapsed: 20, tokens: 120 }, measuredState)],
      [receipt("c", { elapsed: 5, tokens: 90 }, candidateState), receipt("d", { elapsed: 15, tokens: 110 }, candidateState)],
    );
    expect(core.claim).toBe("association");
    const reply = completed(core);
    expect(reply.status).toBe("measured");
    expect(reply.metrics.map(row => [row.name, row.kind])).toEqual([["elapsed", "measured"], ["tokens", "declined"]]);
    const tokens = reply.metrics[1];
    expect(tokens).toEqual({ name: "tokens", unit: "count", kind: "declined", verdict: "unknown", reasons: core.perMetric[1].reasons, evidenceRefs: [] });
    expect(numbers(tokens)).toEqual([]);
  });
});

describe("wb-69g.7 workflow_compare reply: misaligned and declined comparisons", () => {
  it.each([
    ["modelDigest", { changes: { modelDigest: OTHER } }],
    ["inputDigest", { changes: { inputDigest: OTHER } }],
    ["configurationDigest", { pinned: { configurationDigest: OTHER } }],
    ["dependencyDigest", { pinned: { dependencyDigest: OTHER } }],
  ] as const)("CMP-MISALIGNED: a %s mismatch between the cohorts is echoed misaligned with its confound and declines every number", (field, options) => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, ...options })]);
    const reply = completed(core);
    expect(reply.alignment.aligned).toBe(false);
    expect(reply.alignment.basis.find(row => row.field === field)).toMatchObject({ status: "mismatched", alignment: "misaligned" });
    expect(reply.alignment.confounds).toContainEqual(expect.objectContaining({ field, kind: "mismatched" }));
    expect(reply).toMatchObject({ status: "declined", declined: { code: "misaligned" }, limits: { claim: "none" } });
    expect(reply.metrics).toEqual([{ name: "elapsed", unit: "ms", kind: "declined", verdict: "unknown", reasons: core.perMetric[0].reasons, evidenceRefs: core.metrics[0].evidenceRefs }]);
    expect(claimedNumbers(reply)).toEqual([]);
  });

  it("CMP-NEVER-RECONCILED: a supplied result that says matched while a row, a confound or the cohort flag disagrees is never rendered aligned or measured", () => {
    const core = measuredCore();
    const variants: WorkflowComparison[] = [
      { ...core, cohort: { ...core.cohort, basis: core.cohort.basis.map(row => (row.field === "modelDigest" ? { ...row, status: "mismatched" as const } : row)) } },
      { ...core, cohort: { ...core.cohort, confounds: [{ field: "toolsDigest", kind: "mismatched", reason: "toolsDigest differs." }] } },
      { ...core, cohort: { ...core.cohort, matched: false } },
      { ...core, cohort: { ...core.cohort, basis: core.cohort.basis.map(row => (row.field === "cacheDigest" ? { ...row, status: "absent" as const } : row)) } },
    ];
    for (const [at, variant] of variants.entries()) {
      const reply = completed(variant);
      expect(reply.alignment.aligned, `variant ${at}`).toBe(false);
      expect(reply.status, `variant ${at}`).toBe("declined");
      expect(reply.metrics.map(row => row.kind), `variant ${at}`).toEqual(["declined", "declined"]);
      for (const row of reply.metrics) expect(row.kind === "declined" && row.reasons.at(-1), `variant ${at}`).toMatch(/does not carry this measured verdict consistently/);
      expect(claimedNumbers(reply), `variant ${at}`).toEqual([]);
    }
    const flipped = completed(variants[0]);
    expect(flipped.alignment.basis.find(row => row.field === "modelDigest")).toMatchObject({ status: "mismatched", alignment: "misaligned" });
    expect(flipped.declined).toEqual({ code: "misaligned" });
    expect(completed(variants[3]).declined).toEqual({ code: "insufficient-coverage" });
    const noClaim = completed({ ...core, claim: "none" });
    expect([noClaim.alignment.aligned, noClaim.status, noClaim.limits.claim]).toEqual([true, "declined", "none"]);
    for (const row of noClaim.metrics) expect(row.kind === "declined" && row.reasons.at(-1)).toMatch(/does not carry this measured verdict consistently/);
    expect(claimedNumbers(noClaim)).toEqual([]);
    const nonFinite = completed({ ...core, metrics: core.metrics.map((metric, at) => (at === 0 ? { ...metric, delta: Number.NaN } : at === 1 ? { ...metric, reference: { ...metric.reference, mean: Number.POSITIVE_INFINITY } } : metric)) });
    expect(nonFinite.metrics.map(row => [row.name, row.kind])).toEqual([["elapsed", "declined"], ["tokens", "declined"]]);
    expect(claimedNumbers(nonFinite)).toEqual([]);
    const oneFinite = completed({ ...core, metrics: core.metrics.map((metric, at) => (at === 0 ? { ...metric, candidate: { ...metric.candidate, count: 0 } } : metric)) });
    expect(oneFinite.metrics.map(row => [row.name, row.kind])).toEqual([["tokens", "measured"], ["elapsed", "declined"]]);
  });

  it("CMP-COVERAGE-WITHHELD: partial coverage is a typed declined-precision reply with the core's reason, an empty evidence list and zero numeric claims", () => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, { ...measuredState, coverage: { elapsed: "partial" } })], [receipt("c", { elapsed: 5 }, candidateState)]);
    expect(core.metrics).toEqual([]);
    const reply = completed(core);
    expect(reply).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, alignment: { aligned: true }, limits: { claim: "none" } });
    expect(reply.metrics).toEqual([{ name: "elapsed", unit: "ms", kind: "declined", verdict: "unknown", reasons: ["elapsed/ms lacks finite, complete, current, receipt-bound native evidence."], evidenceRefs: [] }]);
    expect(claimedNumbers(reply)).toEqual([]);
  });

  it("CMP-BASIS-UNESTABLISHED: a basis field not established by every receipt declines precision, drops the core's summaries and keeps its raw evidence references", () => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, changes: { modelDigest: undefined } })]);
    expect(core.metrics[0]).toMatchObject({ reference: { mean: 10 }, candidate: { mean: 5 } });
    const reply = completed(core);
    expect(reply).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, alignment: { aligned: false } });
    expect(reply.alignment.basis.find(row => row.field === "modelDigest")).toMatchObject({ status: "absent", alignment: "unestablished" });
    expect(reply.metrics).toEqual([{ name: "elapsed", unit: "ms", kind: "declined", verdict: "unknown", reasons: core.perMetric[0].reasons, evidenceRefs: ["forge-operation:a:elapsed", "forge-operation:c:elapsed"] }]);
    expect(claimedNumbers(reply)).toEqual([]);
  });

  it("CMP-NO-METRICS: receipts that carry no metric are a declined-precision reply naming the core's diagnostic, with no metric row", () => {
    const core = compareWorkflowRuns([receipt("a", {}, measuredState)], [receipt("c", {}, candidateState)]);
    const reply = completed(core);
    expect(reply).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, metrics: [] });
    expect(reply.diagnostics).toContainEqual({ code: "COMPARISON_UNKNOWN", severity: "warning", message: "No measured metrics were supplied." });
    expect(claimedNumbers(reply)).toEqual([]);
  });

  it("CMP-SCHEMA-REFUSED: receipts of different schemas decline as schema-refused with the core's refused confound", () => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, { ...measuredState, schemaVersion: "1" })], [receipt("c", { elapsed: 5 }, { ...candidateState, schemaVersion: "2" })]);
    const reply = completed(core);
    expect(reply).toMatchObject({ status: "declined", declined: { code: "schema-refused" }, coreStatus: "confounded" });
    expect(reply.alignment.confounds).toContainEqual(expect.objectContaining({ field: "schemaVersion", kind: "refused" }));
    expect(reply.diagnostics).toContainEqual(expect.objectContaining({ code: "SCHEMA_MISMATCH", severity: "error", dimension: "schemaVersion" }));
    expect(claimedNumbers(reply)).toEqual([]);
  });
});

describe("wb-69g.7 workflow_compare reply: the comparative experiment protocol's pins", () => {
  it("CMP-PINS-DOC: the pins are the protocol sentence's seven, in its order, each over basis fields the landed core emits (frozen shape)", () => {
    const doc = readFileSync(new URL("../docs/workbench/11-designer-and-operator.md", import.meta.url), "utf8");
    const sentence = doc.split("\n").find(line => line.startsWith("- Pin ")) ?? "";
    const named = sentence.replace(/^- Pin /, "").replace(/\.$/, "").split(/, | and /);
    expect(COMPARE_PROTOCOL_PINS.map(pin => pin.pin)).toEqual(named);
    expect(COMPARE_PROTOCOL_PINS.map(pin => `${pin.pin}:${pin.fields.join(",")}`)).toEqual([
      "workload:definition,schemaVersion",
      "input revisions:inputDigest",
      "workspace basis:subjectBasis,workspaceSourceState",
      "code digest:definitionDigest,deploymentDigest",
      "model config:modelDigest,configurationDigest",
      "SDK versions:dependencyDigest,runtimeArtifactDigest,hostImplementationDigest,hostAbiDigest,providerContractDigest",
      "permissions:toolsDigest,configurationDigest",
    ]);
    const emitted = new Set(fieldsOf(measuredCore()));
    expect(COMPARE_PROTOCOL_PINS.flatMap(pin => pin.fields).filter(field => !emitted.has(field))).toEqual([]);
  });

  it("CMP-PINS-STATUS: a pin reads aligned, declared-change, misaligned or unestablished from its own fields' echoed rows", () => {
    const pins = (reply: CompareCompletedReply): Record<string, string> => Object.fromEntries(reply.pins.map(pin => [pin.pin, pin.alignment]));
    expect(pins(completed(measuredCore()))).toEqual({
      workload: "aligned", "input revisions": "aligned", "workspace basis": "aligned", "code digest": "declared-change", "model config": "aligned", "SDK versions": "aligned", permissions: "aligned",
    });
    const unsupplied = completed(compareWorkflowRuns([receipt("a", { elapsed: 10 })], [receipt("c", { elapsed: 5 }, { source: SOURCES.candidate })]));
    expect(unsupplied.status).toBe("measured");
    expect(unsupplied.pins.find(pin => pin.pin === "workspace basis")).toEqual({ pin: "workspace basis", fields: ["subjectBasis", "workspaceSourceState"], notReported: ["workspaceSourceState"], alignment: "unestablished" });
    const mismatched = completed(compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, pinned: { configurationDigest: OTHER } })]));
    expect(pins(mismatched)).toMatchObject({ "model config": "misaligned", permissions: "misaligned", workload: "aligned" });
    const absent = completed(compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, changes: { toolsDigest: undefined } })]));
    expect(pins(absent)).toMatchObject({ permissions: "unestablished", "model config": "aligned" });
    const both = completed(compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, pinned: { configurationDigest: OTHER }, changes: { modelDigest: undefined } })]));
    expect(both.alignment.basis.filter(row => row.field === "modelDigest" || row.field === "configurationDigest").map(row => row.alignment)).toEqual(["unestablished", "misaligned"]);
    expect(pins(both)["model config"]).toBe("misaligned");
  });
});

describe("wb-69g.7 workflow_compare reply: the dimensions? metric selection", () => {
  it("CMP-DIMENSIONS-SELECT: dimensions selects metric rows by name and never narrows the alignment, the confounds or the pins", () => {
    const core = measuredCore();
    const whole = completed(core);
    const selected = completed(core, { dimensions: ["tokens"] });
    expect(selected.metrics.map(row => row.name)).toEqual(["tokens"]);
    expect(selected.unmatchedDimensions).toEqual([]);
    expect([selected.alignment, selected.pins, selected.status]).toEqual([whole.alignment, whole.pins, "measured"]);
    expect(whole).not.toHaveProperty("unmatchedDimensions");
  });

  it("CMP-DIMENSIONS-UNMATCHED: a requested name the comparison does not carry is listed, never invented, and no selected row is measured", () => {
    const reply = completed(measuredCore(), { dimensions: ["elapsed", "cost", "cost"] });
    expect(reply.metrics.map(row => row.name)).toEqual(["elapsed"]);
    expect(reply.unmatchedDimensions).toEqual(["cost"]);
    const none = completed(measuredCore(), { dimensions: ["cost"] });
    expect(none).toMatchObject({ status: "declined", metrics: [], unmatchedDimensions: ["cost"], declined: { code: "insufficient-coverage" } });
  });

  it.each([
    ["an empty list", []],
    ["33 names", Array.from({ length: 33 }, (_, at) => `m${at}`)],
    ["an empty name", [""]],
    ["a 129-character name", ["n".repeat(129)]],
    ["a non-string name", [7]],
    ["a non-list", "elapsed"],
  ] as const)("CMP-DIMENSIONS-INVALID: %s is the typed INVALID_DIMENSIONS refusal and renders nothing of the comparison", (_label, dimensions) => {
    const built = build(measuredCore(), { dimensions: dimensions as unknown as readonly string[] });
    expect(parse(built.text)).toEqual({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: false, invoked: false, status: "refused", error: { code: "INVALID_DIMENSIONS", category: "validation", message: "dimensions must name 1 to 32 metrics, each 1 to 128 characters" } });
    expect(built.text).not.toContain(sha(SOURCES.reference));
  });

  it("CMP-DIMENSIONS-EDGES: 32 names of 128 characters are accepted", () => {
    const reply = completed(measuredCore(), { dimensions: Array.from({ length: 32 }, (_, at) => `${at}`.padEnd(128, "d")) });
    expect(reply.unmatchedDimensions).toHaveLength(32);
  });
});

describe("wb-69g.7 workflow_compare reply: the grant snapshot and the supplied result's shape", () => {
  it.each([
    ["no snapshot", undefined, "UNKNOWN_PERMISSION_DATA"],
    ["a string", "workbench:design", "UNKNOWN_PERMISSION_DATA"],
    ["a non-string grant", ["workbench:design", "workbench:observe", 1], "UNKNOWN_PERMISSION_DATA"],
    ["an empty list", [], "MISSING_DESIGN_GRANT"],
    ["observe alone", ["workbench:observe"], "MISSING_DESIGN_GRANT"],
    ["design alone", ["workbench:design"], "MISSING_OBSERVE_GRANT"],
  ] as const)("CMP-GRANTS: %s is the typed authorization refusal before any comparison content", (_label, grants, code) => {
    const built = build(measuredCore(), { grants: grants as unknown as readonly string[] });
    const message = { UNKNOWN_PERMISSION_DATA: "unknown permission data", MISSING_DESIGN_GRANT: "missing exact grant workbench:design", MISSING_OBSERVE_GRANT: "missing exact grant workbench:observe" }[code];
    expect(parse(built.text)).toEqual({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: false, invoked: false, status: "refused", error: { code, category: "authorization", message } });
    expect(built.text).not.toMatch(/elapsed|forge-operation|sha256:/);
    expect(built).toMatchObject({ truncated: false, bytes: Buffer.byteLength(built.text) });
  });

  it("CMP-GRANTS-EXACT: a near-miss spelling of either grant is no grant, and authorization is decided before the dimensions and the result's shape", () => {
    for (const near of ["Workbench:design", " workbench:design", "workbench:design ", "workbench:*", "workbench:designs", "workbench"]) {
      expect(refused(measuredCore(), { grants: [near, "workbench:observe"] }).error.code, near).toBe("MISSING_DESIGN_GRANT");
    }
    for (const near of ["workbench:Observe", "workbench:observe\n", "workbench:observer", "*"]) {
      expect(refused(measuredCore(), { grants: ["workbench:design", near] }).error.code, near).toBe("MISSING_OBSERVE_GRANT");
    }
    expect(refused({}, { grants: ["workbench:design"], dimensions: [] as unknown as readonly string[] }).error.code).toBe("MISSING_OBSERVE_GRANT");
    expect(refused({}, { dimensions: [] as unknown as readonly string[] }).error.code).toBe("INVALID_DIMENSIONS");
    expect(completed(measuredCore(), { grants: ["forge:inspect", "workbench:observe", "workbench:design"] }).status).toBe("measured");
  });

  it("CMP-MALFORMED: a supplied result that is not a comparison core result is the typed MALFORMED_COMPARISON refusal", () => {
    const core = measuredCore();
    const shapes: unknown[] = [
      null, "comparison", [], {}, { ...core, perMetric: undefined }, { ...core, metrics: [null] }, { ...core, diagnostics: "none" }, { ...core, limitations: undefined },
      { ...core, cohort: undefined }, { ...core, cohort: { ...core.cohort, basis: [1] } }, { ...core, cohort: { ...core.cohort, confounds: undefined } },
      { ...core, sourceDigests: { reference: [] } }, { ...core, sourceDigests: { candidate: [] } },
    ];
    for (const [at, shape] of shapes.entries()) {
      expect(refused(shape).error, `shape ${at}`).toEqual({ code: "MALFORMED_COMPARISON", category: "validation", message: "the supplied comparison is not a comparison core result" });
    }
  });
});

describe("wb-69g.7 workflow_compare reply: display hygiene through the shared sanitizers", () => {
  const FAKE = "FAKE-NOT-A-SECRET-69g7";
  /** The escape glued between two letters reads "ab" in the text layout and "a b" in the label layout, so the layout is pinned by output. */
  const hostile = (tag: string): string => `${tag}a${cp(0x1b)}[31mb${cp(0x202e)}${cp(0x200b)}${cp(0xfff9)}${cp(0x2066)}${cp(0xfeff)} api_key=${FAKE}`;
  const text = (value: string, limit: number): string => sanitizeWorkbenchText(value, limit, "text");

  it("CMP-SANITIZED: every string the reply takes from the supplied result is that string through sanitizeWorkbenchText in the text layout, and the text carries no unsafe unit or credential-shaped value", () => {
    const core = measuredCore();
    const entry = core.metrics[0];
    const supplied: WorkflowComparison = {
      ...core,
      diagnostics: [{ code: hostile("c"), message: hostile("msg"), severity: "warning", dimension: hostile("dim") }],
      sourceDigests: { reference: [hostile("ref")], candidate: [hostile("cand")] },
      metrics: [{ ...entry, name: hostile("name"), unit: hostile("unit"), evidenceRefs: [hostile("ev")] }],
      perMetric: [{ name: hostile("name"), unit: hostile("unit"), verdict: "unknown", reasons: [hostile("why")] }],
      limitations: [hostile("lim")],
      cohort: { matched: false, basis: [{ field: hostile("f"), status: "matched", detail: hostile("detail") }], confounds: [{ field: hostile("cf"), kind: "absent", reason: hostile("because") }] },
    };
    const built = build(supplied, { dimensions: [hostile("name"), hostile("dim")] });
    const reply = parse(built.text) as CompareCompletedReply;
    expect(reply.diagnostics).toEqual([{ code: text(hostile("c"), 64), severity: "warning", dimension: text(hostile("dim"), 64), message: text(hostile("msg"), 320) }]);
    expect(reply.alignment.sourceDigests).toEqual({ reference: [text(hostile("ref"), 512)], candidate: [text(hostile("cand"), 512)] });
    expect(reply.alignment.basis).toEqual([{ field: text(hostile("f"), 64), group: "unclassified", status: "matched", alignment: "aligned", detail: text(hostile("detail"), 320) }]);
    expect(reply.alignment.confounds).toEqual([{ field: text(hostile("cf"), 64), kind: "absent", reason: text(hostile("because"), 320) }]);
    expect(reply.metrics).toEqual([{ name: text(hostile("name"), 128), unit: text(hostile("unit"), 128), kind: "declined", verdict: "unknown", reasons: [text(hostile("why"), 320)], evidenceRefs: [text(hostile("ev"), 512)] }]);
    expect(reply.unmatchedDimensions).toEqual([text(hostile("dim"), 128)]);
    expect(reply.limits.limitations).toEqual([text(hostile("lim"), 320)]);
    expect(built.text).not.toMatch(UNSAFE_DISPLAY);
    expect(built.text).not.toContain(FAKE);
    expect(reply.limits.limitations[0]).toBe("limab api_key=[REDACTED]");
    // Fifteen supplied strings reach the reply (diagnostic code, dimension and message; both source digests; the basis field
    // and detail; the confound field and reason; the metric name, unit, reason and evidence reference; the unmatched
    // dimension; the limitation), and each one's fake value becomes one redaction marker.
    expect(built.text.split("[REDACTED]").length - 1).toBe(15);
  });

  it("CMP-SANITIZED-BOUNDS: a long supplied string is cut at its class bound by the same sanitizer call, field 64, name 128, reason 320, reference 512", () => {
    const long = (tag: string): string => `${tag} api_key=${FAKE} ${"w".repeat(700)}`;
    const core = measuredCore();
    const entry = core.metrics[0];
    const supplied: WorkflowComparison = {
      ...core,
      metrics: [{ ...entry, name: long("name"), evidenceRefs: [long("ref")] }],
      perMetric: [{ name: long("name"), unit: entry.unit, verdict: "unknown", reasons: [long("why")] }],
      cohort: { matched: false, basis: [{ field: long("field"), status: "absent", detail: long("detail") }], confounds: [{ field: long("cf"), kind: "absent", reason: long("because") }] },
    };
    const reply = completed(supplied);
    const row = reply.metrics[0];
    expect([row.name, row.kind === "declined" ? row.reasons[0] : "", row.evidenceRefs[0]]).toEqual([text(long("name"), 128), text(long("why"), 320), text(long("ref"), 512)]);
    expect(reply.alignment.basis[0]).toMatchObject({ field: text(long("field"), 64), detail: text(long("detail"), 320) });
    expect(reply.alignment.confounds[0]).toMatchObject({ field: text(long("cf"), 64), reason: text(long("because"), 320) });
    for (const [value, bound] of [[row.name, 128], [row.evidenceRefs[0], 512], [reply.alignment.basis[0].field, 64], [reply.alignment.confounds[0].reason, 320]] as const) {
      expect(value.length).toBeLessThanOrEqual(bound);
      expect(value.length).toBeGreaterThan(bound / 2);
    }
    expect(JSON.stringify(reply)).not.toContain(FAKE);
  });

  it("CMP-ENUMS-CLOSED: a status, kind, verdict, severity or core status outside the core's vocabulary is rendered unrecognized, never echoed", () => {
    const core = measuredCore();
    const supplied = {
      ...core,
      status: hostile("status"),
      diagnostics: [{ code: "X", message: "m", severity: hostile("sev") }],
      perMetric: [{ name: "elapsed", unit: "ms", verdict: hostile("verdict"), reasons: [] }],
      cohort: { matched: true, basis: [{ field: "constructor", status: "constructor" }, { field: "modelDigest", status: hostile("st") }], confounds: [{ field: "x", kind: "__proto__", reason: "r" }] },
    } as unknown as WorkflowComparison;
    const built = build(supplied);
    const reply = parse(built.text) as CompareCompletedReply;
    expect(reply.coreStatus).toBe("unrecognized");
    expect(reply.diagnostics[0].severity).toBe("unrecognized");
    expect(reply.metrics[0]).toMatchObject({ kind: "declined", verdict: "unrecognized" });
    expect(reply.alignment.basis).toEqual([
      { field: "constructor", group: "unclassified", status: "unrecognized", alignment: "unestablished" },
      { field: "modelDigest", group: "config", status: "unrecognized", alignment: "unestablished" },
    ]);
    expect(reply.alignment.confounds).toEqual([{ field: "x", kind: "unrecognized", reason: "r" }]);
    expect(reply.alignment.aligned).toBe(false);
    expect(built.text).not.toContain(FAKE);
  });
});

describe("wb-69g.7 workflow_compare reply: byte-capped compact JSON", () => {
  /** A matched cohort with many metrics, each carrying many evidence references, plus many diagnostics and limitations. */
  function large(): WorkflowComparison {
    const core = measuredCore();
    const summary = core.metrics[0].reference;
    const metrics = Array.from({ length: 24 }, (_, at) => ({ name: `metric-${at}`, unit: "ms", reference: summary, candidate: summary, delta: at % 2 ? 0 : 1, evidenceRefs: Array.from({ length: 8 }, (_, ref) => `forge-operation:large-${at}-${ref}-${"e".repeat(40)}`) }));
    return {
      ...core,
      status: "unknown",
      metrics,
      perMetric: metrics.map((metric, at) => ({ name: metric.name, unit: metric.unit, verdict: at % 2 ? "unknown" : "measured", reasons: at % 2 ? [`withheld ${at}`] : [] })),
      diagnostics: Array.from({ length: 30 }, (_, at) => ({ code: "COMPARISON_UNKNOWN", severity: "warning" as const, message: `diagnostic ${at} ${"d".repeat(120)}` })),
      limitations: [...core.limitations, ...Array.from({ length: 30 }, (_, at) => `limitation ${at} ${"l".repeat(120)}`)],
      sourceDigests: { reference: Array.from({ length: 60 }, (_, at) => identityDigest("ref", { at })), candidate: Array.from({ length: 60 }, (_, at) => identityDigest("cand", { at })) },
    };
  }
  const full = (): CompareCompletedReply => completed(large(), { maxBytes: COMPARE_REPLY_MAX_BYTES });
  const caps = (): number[] => {
    const size = Buffer.byteLength(build(large(), { maxBytes: COMPARE_REPLY_MAX_BYTES }).text);
    return Array.from({ length: 41 }, (_, at) => Math.round(COMPARE_REPLY_MIN_BYTES + ((size - COMPARE_REPLY_MIN_BYTES) * at) / 40));
  };

  it("CMP-CAP-COMPACT: every reply is compact JSON whose byte length is reported and at most its cap", () => {
    for (const cap of [COMPARE_REPLY_MIN_BYTES, COMPARE_REPLY_DEFAULT_MAX_BYTES, COMPARE_REPLY_MAX_BYTES]) {
      for (const comparison of [measuredCore(), large()]) {
        const built = build(comparison, { maxBytes: cap });
        expect(built.text).toBe(JSON.stringify(JSON.parse(built.text)));
        expect(built.bytes).toBe(Buffer.byteLength(built.text));
        expect(built.bytes).toBeLessThanOrEqual(cap);
      }
    }
    const fitted = build(large());
    expect(fitted.bytes).toBeLessThanOrEqual(COMPARE_REPLY_DEFAULT_MAX_BYTES);
    expect(fitted.truncated).toBe(true);
    expect(parse(fitted.text)).toMatchObject({ truncation: { truncated: true, reason: "byte-cap", marker: COMPARE_REPLY_TRUNCATION_MARKER, maxBytes: COMPARE_REPLY_DEFAULT_MAX_BYTES } });
    expect(full()).not.toHaveProperty("truncation");
  });

  it("CMP-CAP-DROP-ORDER: under every cap the reply drops evidence references, then diagnostics, then limitations, then metric rows with declined rows first, then source digests", () => {
    const whole = full();
    const limitations = large().limitations.length;
    expect(whole.counts).toEqual({ metrics: { offered: 24, returned: 24 }, evidenceRefs: { offered: 192, returned: 192 }, diagnostics: { offered: 30, returned: 30 }, limitations: { offered: limitations, returned: limitations }, sourceDigests: { offered: 120, returned: 120 } });
    const seen = new Set<string>();
    for (const cap of caps()) {
      const built = build(large(), { maxBytes: cap });
      const reply = parse(built.text) as CompareCompletedReply;
      const { counts } = reply;
      const cut = (count: { offered: number; returned: number }): boolean => count.returned < count.offered;
      if (cut(counts.diagnostics)) expect(counts.evidenceRefs.returned, `cap ${cap}`).toBe(0);
      if (cut(counts.limitations)) expect([counts.evidenceRefs.returned, counts.diagnostics.returned], `cap ${cap}`).toEqual([0, 0]);
      if (cut(counts.metrics)) expect([counts.evidenceRefs.returned, counts.diagnostics.returned, counts.limitations.returned], `cap ${cap}`).toEqual([0, 0, 0]);
      if (cut(counts.sourceDigests)) expect(counts.metrics.returned, `cap ${cap}`).toBe(0);
      const kept = reply.metrics.map(row => row.kind);
      if (kept.length < 12) expect(kept.every(kind => kind === "measured"), `cap ${cap}`).toBe(true);
      expect(reply.metrics.map(row => row.name), `cap ${cap}`).toEqual(whole.metrics.slice(0, kept.length).map(row => row.name));
      expect(reply.diagnostics, `cap ${cap}`).toEqual(whole.diagnostics.slice(0, counts.diagnostics.returned));
      expect(reply.limits.limitations, `cap ${cap}`).toEqual(whole.limits.limitations.slice(0, counts.limitations.returned));
      expect(built.truncated, `cap ${cap}`).toBe(Object.values(counts).some(cut));
      for (const [name, count] of Object.entries(counts)) if (cut(count)) seen.add(name);
    }
    expect([...seen].sort()).toEqual(["diagnostics", "evidenceRefs", "limitations", "metrics", "sourceDigests"]);
  });

  it("CMP-CAP-NEVER-ALIGNMENT: no cap trims an alignment row, a confound, a pin or the status", () => {
    const core = compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, changes: { modelDigest: OTHER } })]);
    const misaligned: WorkflowComparison = { ...large(), cohort: core.cohort };
    const whole = completed(misaligned, { maxBytes: COMPARE_REPLY_MAX_BYTES });
    for (const cap of [COMPARE_REPLY_MIN_BYTES, COMPARE_REPLY_MIN_BYTES + 512, COMPARE_REPLY_DEFAULT_MAX_BYTES]) {
      const reply = completed(misaligned, { maxBytes: cap });
      expect(reply.truncation, `cap ${cap}`).toBeDefined();
      expect([reply.status, reply.alignment.aligned, reply.alignment.basis, reply.alignment.confounds, reply.pins, reply.declined], `cap ${cap}`).toEqual([
        "declined", false, whole.alignment.basis, whole.alignment.confounds, whole.pins, { code: "misaligned" },
      ]);
      expect(reply.alignment.basis.find(row => row.field === "modelDigest")?.alignment, `cap ${cap}`).toBe("misaligned");
    }
  });

  it("CMP-CAP-BOUNDS: the host cap is an integer from the minimum to the maximum, and a minimal reply that cannot fit is a typed error", () => {
    for (const cap of [COMPARE_REPLY_MIN_BYTES - 1, COMPARE_REPLY_MAX_BYTES + 1, COMPARE_REPLY_MIN_BYTES + 0.5, Number.NaN]) {
      expect(() => build(measuredCore(), { maxBytes: cap }), `cap ${cap}`).toThrow(CapabilityError);
    }
    expect([COMPARE_REPLY_MIN_BYTES, COMPARE_REPLY_DEFAULT_MAX_BYTES, COMPARE_REPLY_MAX_BYTES]).toEqual([8192, 16384, 262144]);
    for (const cap of [COMPARE_REPLY_MIN_BYTES, COMPARE_REPLY_MAX_BYTES]) expect(build(measuredCore(), { maxBytes: cap }).bytes).toBeLessThanOrEqual(cap);
    const confounds = Array.from({ length: 40 }, (_, at) => ({ field: `field-${at}`, kind: "absent" as const, reason: "r".repeat(400) }));
    const unfit = { ...measuredCore(), cohort: { matched: false, basis: [], confounds } };
    try {
      build(unfit, { maxBytes: COMPARE_REPLY_MIN_BYTES });
      expect.unreachable("a minimal reply over the cap must throw");
    } catch (error) {
      expect(error).toBeInstanceOf(CapabilityError);
      expect(error).toMatchObject({ category: "validation", message: "The byte cap cannot hold the minimal comparison reply." });
    }
  });
});

describe("wb-69g.7 workflow_compare reply: purity", () => {
  const source = readFileSync(new URL("../src/workbench/compare-tool.ts", import.meta.url), "utf8");

  it("CMP-PURE-IMPORTS: the builder imports the capability error, the core's types, the shared sanitizers and the tool-reply contract, and nothing that compares, registers or reaches a provider", () => {
    const specifiers = [...source.matchAll(/^import\s[^;]*?from\s+["']([^"']+)["'];$/gm)].map(match => match[1]);
    expect(specifiers.sort()).toEqual(["./capability-registry.js", "./designer.js", "./redaction.js", "./tool-replies.js"]);
    expect(source).toMatch(/^import type \{ MetricSummary, WorkflowComparison \} from "\.\/designer\.js";$/m);
    expect(source).toMatch(/^import \{ sanitizeWorkbenchJsonText, sanitizeWorkbenchText \} from "\.\/redaction\.js";$/m);
    expect(source).not.toMatch(/\bimport\s*\(|require\(|@furnace|@anthropic|@forge|@hyperunix|providers\/|\.\.\/index|\.\.\/ui\/|\.\.\/workflow\/|node:/);
    expect(source).not.toMatch(/compareWorkflowRuns\s*\(|defineTool|registerTool|fetch\(|\bawait\b|Date\.now|new Date|process\./);
    expect(source).not.toMatch(/stripUnsafeText|redactWorkbenchText|\.replace\(/);
    expect(source).toContain('sanitizeWorkbenchText(value, limit, "text")');
  });

  it("CMP-PURE-INPUT: the builder reads a deep-frozen input without changing it and returns the same text every time", () => {
    const freeze = <T>(value: T): T => {
      if (value !== null && typeof value === "object") {
        for (const child of Object.values(value)) freeze(child);
        Object.freeze(value);
      }
      return value;
    };
    const comparison = freeze(measuredCore());
    const before = JSON.stringify(comparison);
    const grants = freeze([...GRANTS]);
    const dimensions = freeze(["elapsed"]);
    const first = buildWorkflowCompareReply({ comparison, grants, dimensions });
    const second = buildWorkflowCompareReply({ comparison, grants, dimensions });
    expect(second.text).toBe(first.text);
    expect(JSON.stringify(comparison)).toBe(before);
    expect([...grants, ...dimensions]).toEqual(["workbench:design", "workbench:observe", "elapsed"]);
    expect(Object.isFrozen(first)).toBe(true);
  });
});

describe("wb-h8f.7 workflow_compare reply: the raw native evidence references the host supplies", () => {
  const FAKE = "FAKE-NOT-A-SECRET-h8f7";
  const text = (value: string, limit: number): string => sanitizeWorkbenchText(value, limit, "text");
  type NativeRefs = NonNullable<BuildWorkflowCompareReplyInput["nativeRefs"]>;
  const REFS: NativeRefs = {
    reference: [
      { provider: "reactivefiber", type: "operation", id: "rfo_cmp0000000000000000001" },
      { provider: "claude-agent-sdk", type: "session", id: "session-h8f7", scope: "/workspace/h8f7" },
    ],
    candidate: [{ provider: "reactivefiber", type: "operation", id: "rfo_cmp0000000000000000002" }],
  };
  function withRefs(comparison: unknown, nativeRefs: unknown, extra: { grants?: readonly string[]; dimensions?: readonly string[]; maxBytes?: number } = {}) {
    return buildWorkflowCompareReply({
      comparison: comparison as WorkflowComparison,
      grants: extra.grants ?? GRANTS,
      nativeRefs: nativeRefs as NativeRefs,
      ...(extra.dimensions ? { dimensions: extra.dimensions } : {}),
      ...(extra.maxBytes !== undefined ? { maxBytes: extra.maxBytes } : {}),
    });
  }
  /** Receipts that carry no metric: the core declines every number, as the registered tool's receipts do today. */
  const unmeasuredCore = (): WorkflowComparison => compareWorkflowRuns([receipt("a", {}, measuredState)], [receipt("c", {}, candidateState)]);
  const misalignedCore = (): WorkflowComparison => compareWorkflowRuns([receipt("a", { elapsed: 10 }, measuredState)], [receipt("c", { elapsed: 5 }, { ...candidateState, changes: { modelDigest: OTHER } })]);

  it("CMP-NATIVE-ECHO: the supplied references ride a measured and a declined reply alike, per cohort and in order, deduplicated, with their own counts", () => {
    const declined = parse(withRefs(unmeasuredCore(), REFS).text) as CompareCompletedReply;
    expect(declined).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, metrics: [] });
    for (const reply of [declined, parse(withRefs(measuredCore(), REFS).text) as CompareCompletedReply]) {
      expect(reply.nativeRefs).toEqual(REFS);
      expect(reply.counts.nativeRefs).toEqual({ offered: 3, returned: 3 });
      expect(reply).not.toHaveProperty("truncation");
    }
    const doubled = parse(withRefs(unmeasuredCore(), { reference: [...REFS.reference, { ...REFS.reference[0] }], candidate: [...REFS.candidate, ...REFS.candidate] }).text) as CompareCompletedReply;
    expect(doubled.nativeRefs).toEqual(REFS);
    expect(doubled.counts.nativeRefs).toEqual({ offered: 3, returned: 3 });
    // The cohorts are read independently: a candidate holding more references than the reference keeps every one of them.
    const reversed = parse(withRefs(unmeasuredCore(), { reference: REFS.candidate, candidate: REFS.reference }).text) as CompareCompletedReply;
    expect(reversed.nativeRefs).toEqual({ reference: REFS.candidate, candidate: REFS.reference });
    expect(reversed).not.toHaveProperty("truncation");
    const bare = completed(unmeasuredCore());
    expect(bare).not.toHaveProperty("nativeRefs");
    expect(bare.counts).not.toHaveProperty("nativeRefs");
    expect(parse(withRefs(unmeasuredCore(), { reference: [], candidate: [] }).text)).toMatchObject({ nativeRefs: { reference: [], candidate: [] }, counts: { nativeRefs: { offered: 0, returned: 0 } } });
  });

  it("CMP-NATIVE-NEUTRAL: the references change no status, verdict, alignment, pin, metric row or number of the reply", () => {
    for (const core of [measuredCore(), unmeasuredCore(), misalignedCore()]) {
      const bare = completed(core);
      const { nativeRefs, counts, ...rest } = parse(withRefs(core, REFS).text) as CompareCompletedReply;
      const { nativeRefs: shownCount, ...otherCounts } = counts;
      expect(shownCount).toEqual({ offered: 3, returned: 3 });
      expect({ ...rest, counts: otherCounts }).toEqual(bare);
      expect(numbers(nativeRefs)).toEqual([]);
    }
  });

  it("CMP-NATIVE-SANITIZED: each reference member is that member through sanitizeWorkbenchText in the text layout, provider and type at 64, id and scope at 512", () => {
    const hostile = (tag: string): string => `${tag}a${cp(0x1b)}[31mb${cp(0x202e)}${cp(0x200b)}${cp(0x2066)} api_key=${FAKE} ${"w".repeat(700)}`;
    const built = withRefs(unmeasuredCore(), { reference: [{ provider: hostile("p"), type: hostile("t"), id: hostile("i"), scope: hostile("s") }], candidate: [] });
    const reply = parse(built.text) as CompareCompletedReply;
    expect(reply.nativeRefs).toEqual({ reference: [{ provider: text(hostile("p"), 64), type: text(hostile("t"), 64), id: text(hostile("i"), 512), scope: text(hostile("s"), 512) }], candidate: [] });
    const [shown] = reply.nativeRefs?.reference ?? [];
    for (const [value, bound] of [[shown.provider, 64], [shown.type, 64], [shown.id, 512], [shown.scope ?? "", 512]] as const) {
      expect(value.length).toBeLessThanOrEqual(bound);
      expect(value.length).toBeGreaterThan(bound / 2);
    }
    expect(built.text).not.toMatch(UNSAFE_DISPLAY);
    expect(built.text).not.toContain(FAKE);
    expect(shown.provider.startsWith("pab api_key=[REDACTED]")).toBe(true);
  });

  it.each([
    ["a string", "refs"],
    ["a list", []],
    ["a cohort that is not a list", { reference: "rfo", candidate: [] }],
    ["a missing cohort", { reference: [] }],
    ["an entry without an id", { reference: [{ provider: "forge", type: "operation" }], candidate: [] }],
    ["a number id", { reference: [{ provider: "forge", type: "operation", id: 7 }], candidate: [] }],
    ["a scope that is not text", { reference: [], candidate: [{ provider: "forge", type: "operation", id: "op", scope: 1 }] }],
    ["an entry that is a list", { reference: [["forge", "operation", "op"]], candidate: [] }],
  ] as const)("CMP-NATIVE-MALFORMED: %s is the typed MALFORMED_NATIVE_REFS refusal, after authorization, dimensions and the result's shape", (_label, refs) => {
    const reply = parse(withRefs(measuredCore(), refs).text) as CompareRefusalReply;
    expect(reply).toEqual({
      contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: false, invoked: false, status: "refused",
      error: { code: "MALFORMED_NATIVE_REFS", category: "validation", message: "the supplied native references are not provider, type and id strings" },
    });
    expect((parse(withRefs(measuredCore(), refs, { grants: ["workbench:observe"] }).text) as CompareRefusalReply).error.code).toBe("MISSING_DESIGN_GRANT");
    expect((parse(withRefs(measuredCore(), refs, { dimensions: [""] }).text) as CompareRefusalReply).error.code).toBe("INVALID_DIMENSIONS");
    expect((parse(withRefs({ status: "unknown" }, refs).text) as CompareRefusalReply).error.code).toBe("MALFORMED_COMPARISON");
  });

  it("CMP-NATIVE-CAP: under every cap the native references drop after the metric evidence references and before the diagnostics, and every cut is marked", () => {
    const crowded = (): WorkflowComparison => {
      const core = measuredCore();
      const summary = core.metrics[0].reference;
      const metrics = Array.from({ length: 6 }, (_, at) => ({ name: `metric-${at}`, unit: "ms", reference: summary, candidate: summary, delta: 1, evidenceRefs: Array.from({ length: 6 }, (_, ref) => `forge-operation:crowded-${at}-${ref}-${"e".repeat(40)}`) }));
      return {
        ...core,
        metrics,
        perMetric: metrics.map(metric => ({ name: metric.name, unit: metric.unit, verdict: "measured" as const, reasons: [] })),
        diagnostics: Array.from({ length: 30 }, (_, at) => ({ code: "COMPARISON_UNKNOWN", severity: "warning" as const, message: `diagnostic ${at} ${"d".repeat(120)}` })),
      };
    };
    const refs = (cohort: string): CompareNativeRefInput[] => Array.from({ length: 40 }, (_, at) => ({ provider: "reactivefiber", type: "operation", id: `rfo_${cohort}${String(at).padStart(19, "0")}`, scope: `/workspace/${"s".repeat(60)}` }));
    const many: NativeRefs = { reference: refs("ref"), candidate: refs("cnd") };
    const whole = parse(withRefs(crowded(), many, { maxBytes: COMPARE_REPLY_MAX_BYTES }).text) as CompareCompletedReply;
    expect(whole).not.toHaveProperty("truncation");
    expect(whole.counts.nativeRefs).toEqual({ offered: 80, returned: 80 });
    const size = Buffer.byteLength(withRefs(crowded(), many, { maxBytes: COMPARE_REPLY_MAX_BYTES }).text);
    const seen = new Set<string>();
    for (let at = 0; at <= 40; at++) {
      const cap = Math.round(COMPARE_REPLY_MIN_BYTES + ((size - COMPARE_REPLY_MIN_BYTES) * at) / 40);
      const built = withRefs(crowded(), many, { maxBytes: cap });
      const reply = parse(built.text) as CompareCompletedReply;
      const counts = reply.counts;
      const native = counts.nativeRefs ?? { offered: -1, returned: -1 };
      const cut = (count: { offered: number; returned: number }): boolean => count.returned < count.offered;
      expect(built.bytes, `cap ${cap}`).toBeLessThanOrEqual(cap);
      if (cut(native)) expect(counts.evidenceRefs.returned, `cap ${cap}`).toBe(0);
      if (cut(counts.diagnostics) || cut(counts.limitations) || cut(counts.metrics) || cut(counts.sourceDigests)) expect(native.returned, `cap ${cap}`).toBe(0);
      expect(reply.nativeRefs?.reference, `cap ${cap}`).toEqual(whole.nativeRefs?.reference.slice(0, reply.nativeRefs?.reference.length));
      expect(reply.nativeRefs?.candidate, `cap ${cap}`).toEqual(whole.nativeRefs?.candidate.slice(0, reply.nativeRefs?.candidate.length));
      expect(native.returned, `cap ${cap}`).toBe((reply.nativeRefs?.reference.length ?? 0) + (reply.nativeRefs?.candidate.length ?? 0));
      expect(built.truncated, `cap ${cap}`).toBe(Object.values(counts).some(cut));
      if (built.truncated) expect(reply.truncation, `cap ${cap}`).toEqual({ truncated: true, reason: "byte-cap", marker: COMPARE_REPLY_TRUNCATION_MARKER, maxBytes: cap });
      expect([reply.alignment.basis, reply.alignment.confounds, reply.pins], `cap ${cap}`).toEqual([whole.alignment.basis, whole.alignment.confounds, whole.pins]);
      for (const [name, count] of Object.entries(counts)) if (cut(count)) seen.add(name);
    }
    expect(["evidenceRefs", "nativeRefs", "diagnostics"].every(name => seen.has(name)), [...seen].join(",")).toBe(true);
    // A declined core carries no metric evidence reference, so there the native references are the first thing a cap cuts:
    // a cut that drops only native references is still marked.
    const declinedSize = Buffer.byteLength(withRefs(unmeasuredCore(), many, { maxBytes: COMPARE_REPLY_MAX_BYTES }).text);
    let nativeOnly = 0;
    for (let at = 0; at <= 20; at++) {
      const cap = Math.round(COMPARE_REPLY_MIN_BYTES + ((declinedSize - COMPARE_REPLY_MIN_BYTES) * at) / 20);
      const built = withRefs(unmeasuredCore(), many, { maxBytes: cap });
      const reply = parse(built.text) as CompareCompletedReply;
      const native = reply.counts.nativeRefs ?? { offered: -1, returned: -1 };
      const others = [reply.counts.metrics, reply.counts.evidenceRefs, reply.counts.diagnostics, reply.counts.limitations, reply.counts.sourceDigests];
      const nativeCut = native.returned < native.offered;
      if (nativeCut && others.every(count => count.returned === count.offered)) nativeOnly++;
      expect(built.bytes, `declined cap ${cap}`).toBeLessThanOrEqual(cap);
      expect(built.truncated, `declined cap ${cap}`).toBe(nativeCut || others.some(count => count.returned < count.offered));
      if (built.truncated) expect(reply.truncation?.marker, `declined cap ${cap}`).toBe(COMPARE_REPLY_TRUNCATION_MARKER);
    }
    expect(nativeOnly).toBeGreaterThan(0);
  });
});
