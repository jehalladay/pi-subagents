/**
 * wb-h8f.7 (W16-H/Hw VC-6): the registered workflow_compare Pi tool answers with the bounded reply builder
 * src/workbench/compare-tool.ts (buildWorkflowCompareReply; provenance: the wb-69g.7 cut cf8474a9, adopted into this bead's
 * single cut by R-B767) over today's compareWorkflowRuns result, the grant snapshot from grants(ctx) and the raw native
 * evidence references its own projection read collected. Every case boots the REAL extension in claude mode through
 * test/helpers/boot-extension.ts and drives the registered tool.
 *
 * Spec lines pinned (docs/workbench, read by PCR-SPEC-LINES):
 * - 11 "First public Pi tools (proposed)": "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis
 *   alignment, measured metrics and confidence/coverage limits." -> PCR-C1-BUILDER-OUTPUT, PCR-C1-ALIGNMENT, PCR-DIMENSIONS.
 * - 11 "Comparative experiment protocol": "Decline precise claim if trace coverage insufficient; include raw evidence
 *   references." and "Experimental read-only source tools": "Missing native measured metrics yields unknown, not a claimed
 *   optimization." -> PCR-C2-DECLINED, PCR-C2-NATIVE-REFS, PCR-C2-MISALIGNED.
 * - 12 "Authorization design": "Separate discover, inspect, observe, invoke and control grants." and "Caller identity and scope
 *   bound at workbench entry point; impersonation from script payload prohibited." -> PCR-C3-GRANTS, PCR-C3-SCOPE,
 *   PCR-C3-FORGED, PCR-C3-NO-VERBS.
 * - 15 "Independently assignable packages", row W16: "compact bounded result and ACL" -> PCR-C4-CAP, PCR-C4-HOSTILE-LABEL,
 *   PCR-C4-HOSTILE-ECHO.
 * - 16 "Migration acceptance": "no accidental duplication of tools or permission escalation" -> PCR-C5-SURFACE.
 * - the owner's O23 carry on this bead (SDK-EVIDENCE-DIRECTED-COMPUTATION-R17): numbers in the reply come only from the core's
 *   measured fields, a missing field is a typed declined reply and never a number, and model prose is never presented as a
 *   probability -> PCR-R17-ECHOED, PCR-R17-MISSING, PCR-R17-PROSE.
 *
 * Seams: the native references are real. A stub `rf` first on a PATH scoped to this file answers the workflow's
 * reactivefiber.render.preview node with the full-shape offline envelope (test/helpers/rf-render-fixture.ts), a fresh rfo_
 * operation id per spawn, so the real node pipeline admits a real "reactivefiber" operation node into the session projection,
 * beside the node call's own "pi-workflow" node. Spies on designer.compareWorkflowRuns and ObservationProjection.prototype.query
 * call through to record what the host computed and read, except where a case substitutes the core's result (the R17, cap and
 * echo rows): there the result is the REAL core over fixture receipts, or the real result with one field changed.
 *
 * NOT CLAIMED by this file: the pure builder's own rows (test/workbench-compare-tool.test.ts); native metric sourcing for live
 * runs (the host still passes metrics: [], wb-pno's remainder); a measured comparison over host-built receipts (they carry no
 * model, tools, environment or cache digest, so the core never measures over them today).
 * Every control or invisible code point is built with String.fromCodePoint, and every credential-shaped value is obviously fake.
 */
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import {
  buildWorkflowCompareReply,
  COMPARE_REPLY_DEFAULT_MAX_BYTES,
  COMPARE_REPLY_TRUNCATION_MARKER,
  type CompareCompletedReply,
  type CompareNativeRefInput,
  type CompareRefusalReply,
  type WorkflowCompareReply,
} from "../src/workbench/compare-tool.js";
import * as control from "../src/workbench/control.js";
import type { CompareRun, MeasuredMetric, WorkflowComparison } from "../src/workbench/designer.js";
import * as designer from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { FOREIGN_WORKFLOW_TOOL_NAMES } from "../src/workflow/collisions.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const cp = (code: number): string => String.fromCodePoint(code);
const ESC = cp(0x1b);
const HOSTILE = `${ESC}[31mh8f7red${ESC}[0m ${cp(0x202e)}h8f7evil${cp(0x202c)} ${cp(0x2066)}h8f7bidi${cp(0x2069)} h8f7zero${cp(0x200b)}width`;
/** The visible words of HOSTILE, each spelled nowhere else in a reply. */
const HOSTILE_WORDS = ["h8f7red", "h8f7evil", "h8f7bidi", "h8f7zero"] as const;
const FAKE = "h8f7-obviously-fake-credential-value";
const DENIAL = "Permission denied: design and observe grants required.";
const SCOPE_DENIAL = "Comparison receipt unavailable in this operator/workspace scope.";
const DESIGN = "workbench:design";
const OBSERVE = "workbench:observe";
const GRANTS = [DESIGN, OBSERVE, "reactivefiber:render"] as const;
const RF_NODE = 'await node("reactivefiber.render.preview",{model:"model",task:"task"},{label:"rf"});';
const SOURCE_V1 = `export const meta={name:"compare",description:"h8f7 reference"}; ${RF_NODE} return 1;`;
const SOURCE_V2 = `export const meta={name:"compare",description:"h8f7 candidate"}; ${RF_NODE} return 2;`;
const TIMEOUT = 180_000;
/** The real core and the real projection read, held before any spy replaces them. */
const realCompare = designer.compareWorkflowRuns;
const realQuery = ObservationProjection.prototype.query;
const sha = (text: string): string => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const originalPath = process.env.PATH;

interface Booted {
  readonly pi: ReturnType<typeof makePi>;
  readonly context: ReturnType<typeof ctx>;
  readonly dir: string;
  readonly restore: () => void;
}
type QueryResult = ReturnType<ObservationProjection["query"]>;
interface Read {
  readonly invocationId: string;
  readonly limit: number | undefined;
  readonly scope: unknown;
  readonly refs: readonly CompareNativeRefInput[];
}

const scratch: string[] = [];

function boot(rights: readonly string[]): Booted {
  const sandbox = hermeticDir({ nonRepo: true, settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  return { pi, context: ctx({ cwd: sandbox.dir }), dir: sandbox.dir, restore: sandbox.restore };
}
async function start(booted: Booted): Promise<void> {
  await booted.pi.lifecycle.get("session_start")?.({}, booted.context);
}

/** A stub `rf` first on PATH: records each spawn and prints the full-shape envelope for `root` under a fresh rfo_ id. */
function fakeRf(root: string): string {
  const folder = makeScratch("pi-compare-rf-");
  scratch.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = [
    `#!${process.execPath}`,
    'const fs = require("node:fs");',
    `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
    `const count = fs.readFileSync(${JSON.stringify(log)}, "utf8").trim().split("\\n").length;`,
    `const envelope = ${JSON.stringify(fullShapeRf(root))};`,
    'envelope.operation_id = "rfo_cmp" + String(count).padStart(19, "0");',
    "process.stdout.write(JSON.stringify(envelope));",
    "",
  ].join("\n");
  writeFileSync(join(folder, "rf"), script);
  chmodSync(join(folder, "rf"), 0o700);
  process.env.PATH = `${folder}${delimiter}${originalPath ?? ""}`;
  return log;
}

async function settled(booted: Booted, taskId: string): Promise<void> {
  for (let i = 0; i < 6000; i++) {
    if (booted.pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(taskId))) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error(`workflow ${taskId} did not settle in the test window`);
}

/** Saves `source` at the one script path and runs it to completion through the registered SubagentWorkflow tool. */
async function launch(booted: Booted, source: string, args?: unknown): Promise<string> {
  const scriptPath = join(booted.dir, "compare.js");
  writeFileSync(scriptPath, source);
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("h8f7", { scriptPath, ...(args !== undefined ? { args } : {}) }, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  await settled(booted, taskId);
  return taskId;
}

async function compareText(booted: Booted, params: Record<string, unknown>, context: ReturnType<typeof ctx> = booted.context): Promise<string> {
  const tool = booted.pi.tools.get("workflow_compare");
  expect(tool, "workflow_compare must be registered").toBeDefined();
  return textOf(await tool.execute("h8f7", params, undefined, undefined, context));
}
const parse = (text: string): WorkflowCompareReply => JSON.parse(text) as WorkflowCompareReply;
function completed(text: string): CompareCompletedReply {
  const reply = parse(text);
  if (reply.status === "refused") throw new Error(`unexpected refusal ${reply.error.code}`);
  return reply;
}

/** Call-through spies on the core and the projection read; each returns what the host computed or read, in call order. */
function record() {
  const core = vi.spyOn(designer, "compareWorkflowRuns");
  const query = vi.spyOn(ObservationProjection.prototype, "query");
  return {
    core,
    inputs: (): Array<readonly [readonly CompareRun[], readonly CompareRun[]]> => core.mock.calls.map(([reference, candidate]) => [reference, candidate] as const),
    results: (): WorkflowComparison[] => core.mock.results.map(result => result.value as WorkflowComparison),
    reads: (): Read[] =>
      query.mock.calls.map(([filter], at) => ({
        invocationId: String(filter.invocationId),
        limit: filter.limit,
        scope: filter.scope,
        refs: (query.mock.results[at]?.value as QueryResult).nodes.map(node => node.nativeRef),
      })),
  };
}
const shownRefs = (read: Read): CompareNativeRefInput[] => read.refs.filter(ref => ref.provider !== "pi-workflow");

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
function keysOf(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => [key, ...keysOf(child)]);
  return [];
}
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => [key, ...stringsOf(child)]);
  return [];
}

/** Fixture receipts the real core measures: a matched cohort over one declared source change, metric "elapsed" in ms. */
const D = identityDigest("h8f7-fixture", {});
function fixtureRun(id: string, source: string, elapsed: number): CompareRun {
  const scriptDigest = sha(source);
  const definition = { kind: "script" as const, id: "fixture.js", schemaVersion: "1", artifactDigest: scriptDigest };
  const components = { dependencyDigest: D, hostImplementationDigest: D, runtimeArtifactDigest: D, configurationDigest: D, hostAbiDigest: D, providerContractDigest: D };
  const snapshot: InvocationSnapshot = {
    identity: { logicalInvocationId: id, definition, deploymentDigest: identityDigest("deployment", { definition, ...components }), subjectBasis: D },
    scriptDigest, scriptSource: source, hostArtifacts: [], runtimeArtifacts: [], dependencyArtifacts: [], ...components,
  };
  const ref = { provider: "forge", type: "operation", id };
  const metric: MeasuredMetric = { name: "elapsed", unit: "ms", value: elapsed, source: ref, evidenceRefs: [`forge-operation:${id}:elapsed`], subjectBasis: D, coverage: "complete", freshness: "current" };
  return { snapshot, inputDigest: D, modelDigest: D, toolsDigest: D, environmentDigest: D, cacheDigest: D, workspaceSourceState: "measured", nativeRefs: [ref], metrics: [metric] };
}
function measuredCore(): WorkflowComparison {
  return realCompare([fixtureRun("ra", SOURCE_V1, 10), fixtureRun("rb", SOURCE_V1, 20)], [fixtureRun("rc", SOURCE_V2, 5), fixtureRun("rd", SOURCE_V2, 15)]);
}

describe("wb-h8f.7 workflow_compare: the spec lines", () => {
  it("PCR-SPEC-LINES: docs/workbench carries every quoted spec line exactly once", () => {
    const quoted: ReadonlyArray<readonly [string, readonly string[]]> = [
      ["11-designer-and-operator.md", [
        "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis alignment, measured metrics and confidence/coverage limits.",
        "Decline precise claim if trace coverage insufficient; include raw evidence references.",
        "Missing native measured metrics yields unknown, not a claimed optimization.",
      ]],
      ["12-security.md", ["Separate discover, inspect, observe, invoke and control grants.", "Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited."]],
      ["15-implementation-program.md", ["compact bounded result and ACL"]],
      ["16-repository-refactor.md", ["no accidental duplication of tools or permission escalation"]],
    ];
    for (const [page, lines] of quoted) {
      const doc = readFileSync(new URL(`../docs/workbench/${page}`, import.meta.url), "utf8");
      for (const line of lines) expect(doc.split(line).length - 1, `${page}: ${line}`).toBe(1);
    }
  });
});

describe("wb-h8f.7 workflow_compare: grants and the registered surface (C3, C5)", () => {
  let booted: Booted | undefined;
  afterEach(() => {
    booted?.restore();
    booted = undefined;
    vi.restoreAllMocks();
  });

  it.each([
    ["no grant", []],
    ["workbench:design alone", [DESIGN]],
    ["workbench:observe alone", [OBSERVE]],
    ["near-miss spellings of both", ["workbench:designs", "workbench:observer"]],
  ] as const)("PCR-C3-GRANTS: %s answers today's refusal text byte-identical before any read, core call or dimensions check", async (_label, rights) => {
    booted = boot(rights);
    await start(booted);
    const recorded = record();
    for (const params of [{ referenceTask: "wf_guessed1", candidateTask: "wf_guessed2" }, { referenceTask: "wf_guessed1", candidateTask: "wf_guessed2", dimensions: [""] }]) {
      expect(await compareText(booted, params)).toBe(DENIAL);
    }
    expect(recorded.core).not.toHaveBeenCalled();
    expect(recorded.reads()).toEqual([]);
  }, TIMEOUT);

  it("PCR-C5-SURFACE: the tool keeps its name, is registered once and is not re-registered by a second session_start", async () => {
    booted = boot([DESIGN, OBSERVE]);
    await start(booted);
    const named = (): number => booted?.pi.pi.registerTool.mock.calls.filter(([tool]: [{ name: string }]) => tool.name === "workflow_compare").length ?? -1;
    const tool = booted.pi.tools.get("workflow_compare");
    expect(tool?.name).toBe("workflow_compare");
    expect(named()).toBe(1);
    await start(booted);
    expect(named()).toBe(1);
    expect(booted.pi.tools.get("workflow_compare")).toBe(tool);
    expect(FOREIGN_WORKFLOW_TOOL_NAMES.has("workflow_compare")).toBe(false);
    for (const word of [TOOL_REPLY_CONTRACT_VERSION, DESIGN, OBSERVE, "dimensions"]) expect(tool.description).toContain(word);
    const schema = tool.parameters as { properties: Record<string, unknown>; required?: string[] };
    expect(Object.keys(schema.properties).sort()).toEqual(["candidateTask", "dimensions", "referenceTask"]);
    expect([...(schema.required ?? [])].sort()).toEqual(["candidateTask", "referenceTask"]);
  }, TIMEOUT);
});

describe("wb-h8f.7 workflow_compare over real captured tasks (C1-C4, R17)", () => {
  let booted: Booted;
  /** Same script path: reference source v1, candidate source v2 (the declared change), and v2 again under other args. */
  const ids = { reference: "", candidate: "", otherArgs: "" };
  let spawnLog = "";
  beforeAll(async () => {
    booted = boot(GRANTS);
    spawnLog = fakeRf(realpathSync(booted.dir));
    await start(booted);
    ids.reference = await launch(booted, SOURCE_V1);
    ids.candidate = await launch(booted, SOURCE_V2);
    ids.otherArgs = await launch(booted, SOURCE_V2, { cohort: "other" });
  }, 4 * TIMEOUT);
  afterAll(() => {
    booted.restore();
    if (originalPath === undefined) delete process.env.PATH;
    else process.env.PATH = originalPath;
    removeScratch(...scratch.splice(0));
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const pair = (): Record<string, unknown> => ({ referenceTask: ids.reference, candidateTask: ids.candidate });

  it("PCR-C1-BUILDER-OUTPUT: the reply is byte-for-byte the builder's text over the core result the host computed, its grant snapshot and the refs it read", async () => {
    const recorded = record();
    const text = await compareText(booted, pair());
    expect(recorded.results()).toHaveLength(1);
    const reads = recorded.reads();
    expect(reads.map(read => [read.invocationId, read.limit])).toEqual([[ids.reference, 40], [ids.candidate, 40]]);
    const expected = buildWorkflowCompareReply({ comparison: recorded.results()[0], grants: GRANTS, nativeRefs: { reference: shownRefs(reads[0]), candidate: shownRefs(reads[1]) } });
    expect(text).toBe(expected.text);
    expect(parse(text)).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: true, invoked: false });
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(COMPARE_REPLY_DEFAULT_MAX_BYTES);
  }, TIMEOUT);

  it("PCR-C1-ALIGNMENT: source, config and basis alignment is echoed from the two identity receipts, with explicit coverage limits", async () => {
    const recorded = record();
    const reply = completed(await compareText(booted, pair()));
    const core = recorded.results()[0];
    expect(reply.alignment.sourceDigests).toEqual({ reference: [sha(SOURCE_V1)], candidate: [sha(SOURCE_V2)] });
    expect(reply.alignment.basis.map(row => [row.field, row.status])).toEqual(core.cohort.basis.map(row => [row.field, row.status]));
    expect(new Set(reply.alignment.basis.map(row => row.group))).toEqual(new Set(["source", "config", "basis"]));
    expect(reply.alignment.basis.find(row => row.field === "definitionDigest")).toMatchObject({ status: "declared-change", alignment: "declared-change" });
    expect(reply.alignment.confounds.map(item => [item.field, item.kind])).toEqual(core.cohort.confounds.map(item => [item.field, item.kind]));
    expect(reply.pins.map(pin => pin.pin)).toEqual(["workload", "input revisions", "workspace basis", "code digest", "model config", "SDK versions", "permissions"]);
    expect(reply.limits).toEqual({ claim: "none", causalClaim: false, criticalPath: "unestablished", limitations: core.limitations });
    expect(Object.keys(reply.counts).sort()).toEqual(["diagnostics", "evidenceRefs", "limitations", "metrics", "nativeRefs", "sourceDigests"]);
  }, TIMEOUT);

  it("PCR-C2-DECLINED: today's metrics: [] receipts give the typed declined reply with zero numeric claims", async () => {
    const recorded = record();
    const reply = completed(await compareText(booted, pair()));
    const [[reference], [candidate]] = recorded.inputs()[0];
    expect([reference.metrics, candidate.metrics]).toEqual([[], []]);
    expect(reply).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, metrics: [], limits: { claim: "none", causalClaim: false } });
    expect(reply.alignment.aligned).toBe(false);
    expect(reply.diagnostics.map(item => item.message)).toContain("No measured metrics were supplied.");
    expect(claimedNumbers(reply)).toEqual([]);
  }, TIMEOUT);

  it("PCR-C2-NATIVE-REFS: the decline carries the raw native references the projection read, the pi-workflow node calls left out", async () => {
    const recorded = record();
    const reply = completed(await compareText(booted, pair()));
    const reads = recorded.reads();
    for (const read of reads) {
      expect(read.refs.some(ref => ref.provider === "pi-workflow"), `${read.invocationId} read a pi-workflow node`).toBe(true);
      expect(shownRefs(read).length, `${read.invocationId} read a native node`).toBeGreaterThan(0);
      for (const ref of shownRefs(read)) expect(ref).toMatchObject({ provider: "reactivefiber", type: "operation" });
    }
    expect(reply.nativeRefs).toEqual({ reference: shownRefs(reads[0]), candidate: shownRefs(reads[1]) });
    expect(new Set([...(reply.nativeRefs?.reference ?? []), ...(reply.nativeRefs?.candidate ?? [])].map(ref => ref.id)).size).toBe(shownRefs(reads[0]).length + shownRefs(reads[1]).length);
    const total = shownRefs(reads[0]).length + shownRefs(reads[1]).length;
    expect(reply.counts.nativeRefs).toEqual({ offered: total, returned: total });
    expect(readFileSync(spawnLog, "utf8").trim().split("\n").length).toBeGreaterThanOrEqual(3);
  }, TIMEOUT);

  it("PCR-C2-MISALIGNED: an input digest that differs between the two tasks is echoed misaligned, never reconciled into a match", async () => {
    const reply = completed(await compareText(booted, { referenceTask: ids.candidate, candidateTask: ids.otherArgs }));
    expect(reply.alignment.aligned).toBe(false);
    expect(reply.alignment.basis.find(row => row.field === "inputDigest")).toMatchObject({ status: "mismatched", alignment: "misaligned" });
    expect(reply.alignment.confounds).toContainEqual(expect.objectContaining({ field: "inputDigest", kind: "mismatched" }));
    expect(reply.pins.find(pin => pin.pin === "input revisions")?.alignment).toBe("misaligned");
    expect(reply).toMatchObject({ status: "declined", declined: { code: "misaligned" }, metrics: [] });
    expect(claimedNumbers(reply)).toEqual([]);
  }, TIMEOUT);

  it("PCR-DIMENSIONS: dimensions selects by name, a name today's comparison lacks is listed, and an invalid selection is the builder's typed refusal", async () => {
    const recorded = record();
    const text = await compareText(booted, { ...pair(), dimensions: ["elapsed", "tokens"] });
    const reads = recorded.reads();
    expect(text).toBe(buildWorkflowCompareReply({ comparison: recorded.results()[0], grants: GRANTS, dimensions: ["elapsed", "tokens"], nativeRefs: { reference: shownRefs(reads[0]), candidate: shownRefs(reads[1]) } }).text);
    expect(completed(text)).toMatchObject({ status: "declined", metrics: [], unmatchedDimensions: ["elapsed", "tokens"] });
    const refused = parse(await compareText(booted, { ...pair(), dimensions: [""] })) as CompareRefusalReply;
    expect(refused).toEqual({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_compare", ok: false, invoked: false, status: "refused", error: expect.objectContaining({ code: "INVALID_DIMENSIONS", category: "validation" }) });
  }, TIMEOUT);

  it("PCR-C3-SCOPE: a guessed task, another session's principal and another workspace each answer today's scope refusal before the core runs", async () => {
    const recorded = record();
    expect(await compareText(booted, { referenceTask: "wf_guessed1", candidateTask: "wf_guessed2" })).toBe(SCOPE_DENIAL);
    expect(await compareText(booted, { referenceTask: ids.reference, candidateTask: "wf_guessed2" })).toBe(SCOPE_DENIAL);
    const otherSession = ctx({ cwd: booted.dir, sessionManager: { getSessionId: vi.fn(() => "s2"), getBranch: vi.fn(() => []) } });
    expect(await compareText(booted, pair(), otherSession)).toBe(SCOPE_DENIAL);
    const elsewhere = makeScratch("pi-compare-elsewhere-");
    scratch.push(elsewhere);
    mkdirSync(join(elsewhere, ".pi"), { recursive: true });
    writeFileSync(join(elsewhere, ".pi", "subagents.json"), JSON.stringify({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...GRANTS] } }));
    expect(await compareText(booted, pair(), ctx({ cwd: elsewhere }))).toBe(SCOPE_DENIAL);
    expect(recorded.core).not.toHaveBeenCalled();
  }, TIMEOUT);

  it("PCR-C3-FORGED: grants, principal, workspace and scope in params change nothing; scope is the host's own", async () => {
    const recorded = record();
    const plain = await compareText(booted, pair());
    const forged = { grants: ["*"], principal: "admin", workspace: "/foreign", scope: { workspace: "/foreign", principal: "admin" } };
    expect(await compareText(booted, { ...pair(), ...forged })).toBe(plain);
    expect(await compareText(booted, { referenceTask: "wf_guessed1", candidateTask: "wf_guessed2", ...forged })).toBe(SCOPE_DENIAL);
    const scopes = recorded.reads().map(read => read.scope);
    expect(scopes).toHaveLength(4);
    for (const scope of scopes) expect(scope).toEqual({ workspace: realpathSync(booted.dir), principal: expect.stringMatching(/^local-operator:.+:s1$/) });
  }, TIMEOUT);

  it("PCR-C3-NO-VERBS: a granted compare issues no provider verb, no control decision and no projection write", async () => {
    const recorded = record();
    const verbs = [vi.spyOn(CapabilityRegistry.prototype, "invoke"), vi.spyOn(CapabilityRegistry.prototype, "inspect"), vi.spyOn(control, "decideControl")];
    const writes = (["ingest", "refresh", "markStale", "relate", "disconnect", "reconnect"] as const).map(name => vi.spyOn(ObservationProjection.prototype, name));
    expect(completed(await compareText(booted, pair())).status).toBe("declined");
    for (const spy of [...verbs, ...writes]) expect(spy).not.toHaveBeenCalled();
    expect(recorded.reads()).toHaveLength(2);
  }, TIMEOUT);

  it("PCR-C4-CAP: a comparison too large for the cap is cut under the builder's maxBytes and marked, never silently", async () => {
    const recorded = record();
    const wide = (): WorkflowComparison => {
      const core = measuredCore();
      return {
        ...core,
        diagnostics: Array.from({ length: 80 }, (_, at) => ({ code: "COMPARISON_UNKNOWN", severity: "warning" as const, message: `diagnostic ${at} ${cp(0x4e2d).repeat(100)}` })),
        limitations: [...core.limitations, ...Array.from({ length: 40 }, (_, at) => `limitation ${at} ${cp(0x6587).repeat(100)}`)],
      };
    };
    recorded.core.mockImplementation(() => wide());
    const text = await compareText(booted, pair());
    const reply = completed(text);
    const reads = recorded.reads();
    expect(text).toBe(buildWorkflowCompareReply({ comparison: wide(), grants: GRANTS, nativeRefs: { reference: shownRefs(reads[0]), candidate: shownRefs(reads[1]) } }).text);
    expect(Buffer.byteLength(text)).toBeLessThanOrEqual(COMPARE_REPLY_DEFAULT_MAX_BYTES);
    expect(Buffer.byteLength(text)).toBeGreaterThan(text.length);
    expect(reply.truncation).toEqual({ truncated: true, reason: "byte-cap", marker: COMPARE_REPLY_TRUNCATION_MARKER, maxBytes: COMPARE_REPLY_DEFAULT_MAX_BYTES });
    expect(reply.counts.diagnostics.returned).toBeLessThan(reply.counts.diagnostics.offered);
    expect(reply.status).toBe("measured");
  }, TIMEOUT);

  it("PCR-C4-HOSTILE-LABEL: a task's workspaceSourceState label carrying ANSI, bidi and zero-width units is never echoed", async () => {
    const recorded = record();
    recorded.core.mockImplementation((reference, candidate) =>
      realCompare(
        reference.map(run => ({ ...run, workspaceSourceState: HOSTILE as CompareRun["workspaceSourceState"] })),
        candidate.map(run => ({ ...run, workspaceSourceState: HOSTILE as CompareRun["workspaceSourceState"] })),
      ),
    );
    const text = await compareText(booted, pair());
    const reply = completed(text);
    expect(recorded.inputs()[0][0][0].workspaceSourceState).toBe("unknown");
    expect(reply.alignment.basis.find(row => row.field === "workspaceSourceState")).toMatchObject({ status: "absent", alignment: "unestablished" });
    for (const word of HOSTILE_WORDS) expect(text).not.toContain(word);
    for (const shown of stringsOf(reply)) expect(UNSAFE_DISPLAY.test(shown), JSON.stringify(shown)).toBe(false);
  }, TIMEOUT);

  it("PCR-C4-HOSTILE-ECHO: hostile text the reply does echo (a confound reason, a basis detail, a native reference) renders through the shared sanitizer", async () => {
    const recorded = record();
    const injected = `${HOSTILE} api_key=${FAKE}`;
    recorded.core.mockImplementation((reference, candidate) => {
      const core = realCompare(reference, candidate);
      return {
        ...core,
        cohort: {
          ...core.cohort,
          basis: core.cohort.basis.map(row => (row.field === "workspaceSourceState" ? { ...row, detail: injected } : row)),
          confounds: core.cohort.confounds.map(item => (item.field === "workspaceSourceState" ? { ...item, reason: injected } : item)),
        },
      };
    });
    vi.spyOn(ObservationProjection.prototype, "query").mockImplementation(function (this: ObservationProjection, filter) {
      const read = realQuery.call(this, filter);
      return { ...read, nodes: [...read.nodes, { ...read.nodes[0], nativeRef: { provider: "forge", type: "operation", id: injected } }] };
    });
    const text = await compareText(booted, pair());
    const reply = completed(text);
    const shown = sanitizeWorkbenchText(injected, 320, "text");
    expect(reply.alignment.confounds.find(item => item.field === "workspaceSourceState")?.reason).toBe(shown);
    expect(reply.alignment.basis.find(row => row.field === "workspaceSourceState")?.detail).toBe(shown);
    expect(reply.nativeRefs?.reference.map(ref => ref.id)).toContain(sanitizeWorkbenchText(injected, 512, "text"));
    expect(text).not.toContain(FAKE);
    expect(text).toContain("[REDACTED]");
    for (const word of HOSTILE_WORDS) expect(text).toContain(word);
    for (const value of stringsOf(reply)) expect(UNSAFE_DISPLAY.test(value), JSON.stringify(value)).toBe(false);
  }, TIMEOUT);

  it("PCR-R17-ECHOED: every number the reply claims is a field the core measured, and the confidence limits are its run counts", async () => {
    const recorded = record();
    const core = measuredCore();
    recorded.core.mockImplementation(() => core);
    const reply = completed(await compareText(booted, pair()));
    expect(reply.status).toBe("measured");
    const entry = core.metrics[0];
    const delta = entry.delta;
    if (delta === undefined) throw new Error("the fixture core measures elapsed");
    expect(delta).toBe(-5);
    const echoed = [delta, ...numbers(entry.reference), ...numbers(entry.candidate), entry.reference.count, entry.candidate.count];
    expect([...claimedNumbers(reply)].sort((a, b) => a - b)).toEqual([...echoed].sort((a, b) => a - b));
    const row = reply.metrics[0];
    if (row.kind !== "measured") throw new Error("expected a measured row");
    expect(row.confidence).toEqual({ referenceRuns: entry.reference.count, candidateRuns: entry.candidate.count, dispersion: "measured" });
    expect([row.delta, row.reference, row.candidate]).toEqual([entry.delta, entry.reference, entry.candidate]);
    expect(numbers(reply.alignment).concat(numbers(reply.pins), numbers(reply.limits), numbers(reply.diagnostics), numbers(reply.nativeRefs))).toEqual([]);
  }, TIMEOUT);

  it.each(["delta", "reference", "candidate"] as const)("PCR-R17-MISSING: a measured verdict whose %s the core result lacks is a typed declined reply with no number", async field => {
    const recorded = record();
    recorded.core.mockImplementation(() => {
      const core = measuredCore();
      const { [field]: _dropped, ...rest } = core.metrics[0];
      return { ...core, metrics: [rest as WorkflowComparison["metrics"][number]] };
    });
    const reply = completed(await compareText(booted, pair()));
    expect(reply).toMatchObject({ status: "declined", declined: { code: "insufficient-coverage" }, limits: { claim: "none" } });
    expect(reply.metrics).toMatchObject([{ name: "elapsed", kind: "declined", verdict: "measured" }]);
    expect(claimedNumbers(reply)).toEqual([]);
  }, TIMEOUT);

  it("PCR-R17-PROSE: model prose stating a probability rides as sanitized text only, never as a number or a probability field", async () => {
    const recorded = record();
    const prose = "The model judged a 97% probability that the candidate is faster (confidence 0.97, likelihood high).";
    recorded.core.mockImplementation(() => {
      const core = measuredCore();
      return { ...core, diagnostics: [...core.diagnostics, { code: "COMPARISON_UNKNOWN", severity: "warning" as const, message: prose }], limitations: [...core.limitations, prose] };
    });
    const reply = completed(await compareText(booted, pair()));
    expect(reply.diagnostics.map(item => item.message)).toContain(sanitizeWorkbenchText(prose, 320, "text"));
    expect(reply.limits.limitations).toContain(sanitizeWorkbenchText(prose, 320, "text"));
    expect(claimedNumbers(reply).filter(value => value === 97 || value === 0.97)).toEqual([]);
    expect(keysOf(reply).filter(key => /probab|likelihood|certain|calibrat|score/i.test(key))).toEqual([]);
    const row = reply.metrics[0];
    if (row.kind !== "measured") throw new Error("expected a measured row");
    expect(Object.keys(row.confidence).sort()).toEqual(["candidateRuns", "dispersion", "referenceRuns"]);
  }, TIMEOUT);
});
