/**
 * wb-h8f.7 (W16-H/Hw VC-6): the registered workflow_compare Pi tool answers with the bounded reply builder
 * src/workbench/compare-tool.ts (buildWorkflowCompareReply; provenance: the wb-69g.7 cut cf8474a9, adopted into this bead's
 * single cut by R-B767) over today's compareWorkflowRuns result, the grant snapshot from grants(ctx) and the raw native
 * evidence references its own projection read collected. Every case boots the REAL extension in claude mode through
 * test/helpers/boot-extension.ts and drives the registered tool.
 *
 * Spec lines pinned (docs/workbench, read by PCR-SPEC-LINES on the rendered view of the named section, as described below):
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
 * The docs reading (wb-h8f.7 refusal #1, U2 and U3): PCR-SPEC-LINES reads each quote above on the shared rendered view
 * (docsSection and sectionTables, test/helpers/census.ts) of the level-2 section it names, under its page's title, in the
 * quote's form: a whole bullet (a list item reading exactly the quote rendered and in its source), a clause inside one
 * paragraph (docs/11's unknown-metrics sentence, docs/16's migration clause), or one table cell (docs/15's W16 Acceptance
 * cell). The section holds no HTML block and no subsection heading, exactly one rendered unit of it shows the quote, and
 * each raw quote still occurs exactly once in its page. PCR-SPEC-PROBE plants sixteen shapes in memory (the gate's P1, P1b
 * and P2, five more of the same classes carried to the clause and cell quotes, and eight that each turn one part of the
 * reading red alone), and each is refused for the quote it hollows.
 * Section-wide HTML absence in docs/11 "First public Pi tools (proposed)" is NOT CLAIMED by this file: the landed
 * workflow_reconcile bullet there spells reconcile:<producer>.<action>, two inline HTML tags, so that section is held to
 * no HTML block and to the tool bullet's own source, and PCR-SPEC-LINES holds the exemption to that cause; every other
 * quoted section carries no HTML at all.
 *
 * Seams: the native references are real. A stub `rf` first on a PATH scoped to this file answers the workflow's
 * reactivefiber.render.preview node with the full-shape offline envelope (test/helpers/rf-render-fixture.ts), a fresh rfo_
 * operation id per spawn, so the real node pipeline admits a real "reactivefiber" operation node into the session projection,
 * beside the node call's own "pi-workflow" node; since wb-79k.3 wired the RF node() reading into the live projection at the
 * Claude host seam, the RF observer adds a "context-preview" reference to the same operation, scoped to the workspace, so a
 * read holds exactly that reactivefiber pair (PCR-C2-NATIVE-REFS; wb-x1b9). Spies on designer.compareWorkflowRuns and ObservationProjection.prototype.query
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
import { docsSection, type RenderedBlock, sectionTables } from "./helpers/census.js";
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

/** The docs/workbench pages the header quotes, each with the page title its level-2 sections sit under. */
const PAGE_TITLES: Readonly<Record<string, string>> = {
  "11-designer-and-operator.md": "11 — Pi designer, operator tools and closed-loop experimentation",
  "12-security.md": "12 — Trust model, authorization, isolation and sensitive data",
  "15-implementation-program.md": "15 — Full implementation program and vertical-cut acceptance",
  "16-repository-refactor.md": "16 — Fork implementation refactor map and upstream compatibility",
};
/**
 * One quoted spec text and where the header attributes it: a page, its level-2 section, and the form the quote takes
 * there - a whole bullet, a clause inside one paragraph, or one table cell (named by its row's first cell and its column).
 */
interface SpecQuote {
  readonly page: string;
  readonly section: string;
  readonly form: "bullet" | "paragraph" | "cell";
  readonly text: string;
  readonly row?: string;
  readonly column?: string;
}
const TOOL_LINE = "workflow_compare(referenceRun,candidateRun,dimensions?): source/config/basis alignment, measured metrics and confidence/coverage limits.";
const DECLINE_LINE = "Decline precise claim if trace coverage insufficient; include raw evidence references.";
const UNKNOWN_LINE = "Missing native measured metrics yields unknown, not a claimed optimization.";
const GRANTS_LINE = "Separate discover, inspect, observe, invoke and control grants.";
const SCOPE_LINE = "Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.";
const W16_CELL = "compact bounded result and ACL";
const MIGRATION_CLAUSE = "no accidental duplication of tools or permission escalation";
const OBSERVE_BULLET = "- workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event window, aggregates, freshness, anomaly evidence.";
const SPEC_QUOTES: readonly SpecQuote[] = [
  { page: "11-designer-and-operator.md", section: "First public Pi tools (proposed)", form: "bullet", text: TOOL_LINE },
  { page: "11-designer-and-operator.md", section: "Comparative experiment protocol", form: "bullet", text: DECLINE_LINE },
  { page: "11-designer-and-operator.md", section: "Experimental read-only source tools", form: "paragraph", text: UNKNOWN_LINE },
  { page: "12-security.md", section: "Authorization design", form: "bullet", text: GRANTS_LINE },
  { page: "12-security.md", section: "Authorization design", form: "bullet", text: SCOPE_LINE },
  { page: "15-implementation-program.md", section: "Independently assignable packages", form: "cell", text: W16_CELL, row: "W16", column: "Acceptance" },
  { page: "16-repository-refactor.md", section: "Migration acceptance", form: "paragraph", text: MIGRATION_CLAUSE },
];
/**
 * The one section exempt from the no-HTML floor: docs/11's landed workflow_reconcile bullet spells its grant as
 * reconcile:<producer>.<action>, which renders as two inline HTML tags. PCR-SPEC-LINES holds the exemption to that cause.
 */
const INLINE_HTML_SECTIONS: ReadonlySet<string> = new Set(["11-designer-and-operator.md#First public Pi tools (proposed)"]);
const pageText = (page: string): string => readFileSync(new URL(`../docs/workbench/${page}`, import.meta.url), "utf8");

/** One unit of a rendered section as a reader sees it (each list item, each other block), beside its source. */
interface RenderedUnit {
  readonly kind: string;
  readonly text: string;
  readonly source: string;
}
function unitsOf(blocks: readonly RenderedBlock[]): RenderedUnit[] {
  return blocks.flatMap((block): RenderedUnit[] => {
    if (block.kind === "list") return block.items.map(item => ({ kind: "list item", text: item.text, source: item.markdown }));
    if (block.kind === "paragraph") return [{ kind: "paragraph", text: block.text, source: block.markdown }];
    if (block.kind === "html") return [{ kind: "html", text: "", source: block.raw }];
    return [{ kind: block.kind === "other" ? block.type : block.kind, text: block.text, source: block.text }];
  });
}
/** The cell form: across the section's tables, the one row whose first cell is quote.row reads exactly the quote under quote.column. */
function cellFindings(markdown: string, quote: SpecQuote, where: string, parents: readonly string[]): string[] {
  const tables = sectionTables(markdown, quote.section, 2, parents);
  if (!tables.ok) return [`${where}: ${tables.why}`];
  const cells = tables.grids.flatMap(grid => {
    const column = (grid[0] ?? []).indexOf(quote.column ?? "");
    return column < 0 ? [] : grid.slice(1).flatMap(row => (row[0] === quote.row ? [row[column] ?? ""] : []));
  });
  return cells.length === 1 && cells[0] === quote.text ? [] : [`${where}: the ${quote.row} row's ${quote.column} cells read ${JSON.stringify(cells)}, not exactly the quote`];
}
/**
 * U2/U3 of wb-h8f.7 refusal #1: a quote is judged on the rendered view of the section its header names, never on the raw
 * page. docsSection binds the unique level-2 heading under the page title (a heading inside a comment or a fence is no
 * heading). The section holds no HTML block and no subsection heading, and exactly one rendered unit of it shows the quote
 * (in its rendered text or its source). By form: a bullet is a list item whose source is exactly the quote; a paragraph
 * clause occurs once in one paragraph's source; a cell is the one cell of its row and column (sectionTables, the same
 * binding) and reads exactly the quote. Each quote is plain text, so a bullet whose source is the quote renders as the
 * quote, and in a section with no HTML a clause once in the source renders once: the rendered-text checks kept beside the
 * source checks are equivalent to them for these quotes. Outside INLINE_HTML_SECTIONS the section carries no HTML at all.
 * [] means the quote is live where the header says it is.
 */
function quoteFindings(markdown: string, quote: SpecQuote): string[] {
  const where = `${quote.page} § ${quote.section}`;
  const parents = [PAGE_TITLES[quote.page] ?? ""];
  const bound = docsSection(markdown, quote.section, 2, parents);
  if (!bound.ok) return [`${where}: ${bound.why}`];
  const out: string[] = [];
  if (bound.hasHtml && !INLINE_HTML_SECTIONS.has(`${quote.page}#${quote.section}`)) out.push(`${where}: the section carries HTML`);
  for (const block of bound.blocks) if (block.kind === "html" || block.kind === "heading") out.push(`${where}: the section holds a ${block.kind} block`);
  const showing = unitsOf(bound.blocks).filter(unit => unit.text.includes(quote.text) || unit.source.includes(quote.text));
  if (showing.length !== 1) out.push(`${where}: ${showing.length} rendered units show the quote, not 1`);
  for (const unit of showing) {
    if (quote.form === "bullet" && (unit.kind !== "list item" || unit.text !== quote.text || unit.source !== quote.text)) out.push(`${where}: the ${unit.kind} showing the quote reads ${JSON.stringify(unit.source)}, not the whole bullet`);
    if (quote.form === "paragraph" && (unit.kind !== "paragraph" || unit.text.split(quote.text).length !== 2 || unit.source.split(quote.text).length !== 2)) out.push(`${where}: the ${unit.kind} showing the quote does not render it once in its text and once in its source`);
  }
  if (quote.form === "cell") out.push(...cellFindings(markdown, quote, where, parents));
  return out;
}

/** `markdown` with its one occurrence of `target` replaced; a target found other than once throws, so no probe row is vacuous. */
function replaceOnce(markdown: string, target: string, replacement: string): string {
  const at = markdown.indexOf(target);
  if (at < 0 || markdown.indexOf(target, at + 1) >= 0) throw new Error(`probe target must occur exactly once: ${JSON.stringify(target)}`);
  return markdown.slice(0, at) + replacement + markdown.slice(at + target.length);
}
/**
 * Docs probes, each one edit of a live page in memory, naming the quote it hollows. P1, P1b and P2 are the gate's probes of
 * wb-h8f.7 refusal #1 (archived patches 08-10; P3-P5 hollow the pin bullet, CMP-SPEC-PROBE's). UNKNOWN-MOVED through
 * MIGRATION-FENCED carry the same classes to the paragraph and cell quotes; AUTH-HTML, GRANTS-WITHDRAWN, SCOPE-DEMOTED,
 * TOOL-TAG, UNKNOWN-MARKUP, TOOL-HIDDEN-COPY, W16-TWICE and W16-COLUMN each turn one part of the reading red alone (the
 * no-HTML floor, the no-subsection rule, the bullet form, the bullet's source, the clause's source, a copy hidden in another
 * bullet's source, the one row, the column). A reader blind to a shape still finds the quote, so the row reds.
 */
const PCR_PROBES: readonly { readonly id: string; readonly shape: string; readonly text: string; readonly edit: (markdown: string) => string }[] = [
  { id: "P1", shape: "the docs/11 decline bullet wrapped in an inline HTML comment", text: DECLINE_LINE, edit: doc => replaceOnce(doc, `- ${DECLINE_LINE}`, `- <!-- ${DECLINE_LINE} -->`) },
  { id: "P1b", shape: "the docs/12 grants bullet wrapped in an inline HTML comment", text: GRANTS_LINE, edit: doc => replaceOnce(doc, `- ${GRANTS_LINE}`, `- <!-- ${GRANTS_LINE} -->`) },
  { id: "P2", shape: "the docs/11 tool bullet moved out of its section to an EOF appendix", text: TOOL_LINE, edit: doc => `${replaceOnce(doc, `- ${TOOL_LINE}\n`, "")}\n## Appendix (probe)\n\n- ${TOOL_LINE}\n` },
  { id: "UNKNOWN-MOVED", shape: "the docs/11 unknown-metrics sentence moved to the acceptance journeys", text: UNKNOWN_LINE, edit: doc => replaceOnce(replaceOnce(doc, ` ${UNKNOWN_LINE}`, ""), "## Acceptance journeys\n\n", `## Acceptance journeys\n\n${UNKNOWN_LINE}\n\n`) },
  { id: "UNKNOWN-COMMENT", shape: "the docs/11 unknown-metrics sentence inside an inline HTML comment", text: UNKNOWN_LINE, edit: doc => replaceOnce(doc, UNKNOWN_LINE, `<!-- ${UNKNOWN_LINE} -->`) },
  { id: "W16-COMMENT", shape: "the docs/15 W16 acceptance cell inside an inline HTML comment", text: W16_CELL, edit: doc => replaceOnce(doc, `| ${W16_CELL} |`, `| <!-- ${W16_CELL} --> |`) },
  { id: "W16-MOVED", shape: "the docs/15 W16 acceptance cell emptied and its text moved to the gating policy", text: W16_CELL, edit: doc => replaceOnce(replaceOnce(doc, `| ${W16_CELL} |`, "| pending |"), "## Gating policy\n\n", `## Gating policy\n\n${W16_CELL}\n\n`) },
  { id: "MIGRATION-FENCED", shape: "the docs/16 migration clause moved into a fenced block of its own section", text: MIGRATION_CLAUSE, edit: doc => replaceOnce(replaceOnce(doc, `; ${MIGRATION_CLAUSE}.`, "."), "## Migration acceptance\n\n", `## Migration acceptance\n\n\`\`\`text\n${MIGRATION_CLAUSE}\n\`\`\`\n\n`) },
  { id: "AUTH-HTML", shape: "an inline HTML comment in another bullet of the docs/12 authorization section", text: GRANTS_LINE, edit: doc => replaceOnce(doc, "- Treat unknown permission data as deny.", "- Treat unknown permission data <!-- probe --> as deny.") },
  { id: "GRANTS-WITHDRAWN", shape: "the docs/12 grants bullet kept under a withdrawn subsection of its own section", text: GRANTS_LINE, edit: doc => replaceOnce(doc, `- ${GRANTS_LINE}`, `\n### Withdrawn\n\n- ${GRANTS_LINE}`) },
  { id: "SCOPE-DEMOTED", shape: "the docs/12 scope bullet turned into a paragraph of its own section", text: SCOPE_LINE, edit: doc => replaceOnce(doc, `- ${SCOPE_LINE}\n`, `${SCOPE_LINE}\n\n`) },
  { id: "TOOL-TAG", shape: "the docs/11 tool bullet's text inside an inline tag a browser hides", text: TOOL_LINE, edit: doc => replaceOnce(doc, `- ${TOOL_LINE}`, `- <span hidden>${TOOL_LINE}</span>`) },
  {
    id: "UNKNOWN-MARKUP",
    shape: "the docs/11 unknown-metrics sentence split by inline emphasis in its source",
    text: UNKNOWN_LINE,
    edit: doc => replaceOnce(doc, UNKNOWN_LINE, UNKNOWN_LINE.replace("measured", "*measured*")),
  },
  { id: "W16-TWICE", shape: "a second docs/15 W16 row carrying the same acceptance cell", text: W16_CELL, edit: doc => replaceOnce(doc, `| W16 | W13 | Pi catalog/inspect/observe/control tools | ${W16_CELL} |`, `| W16 | W13 | Pi catalog/inspect/observe/control tools | ${W16_CELL} |\n| W16 | W13 | Pi catalog tools | ${W16_CELL} |`) },
  { id: "TOOL-HIDDEN-COPY", shape: "a copy of the docs/11 tool line in an inline comment of another tools bullet", text: TOOL_LINE, edit: doc => replaceOnce(doc, OBSERVE_BULLET, `${OBSERVE_BULLET} <!-- ${TOOL_LINE} -->`) },
  {
    id: "W16-COLUMN",
    shape: "the docs/15 W16 acceptance text swapped into the row's scope column",
    text: W16_CELL,
    edit: doc => replaceOnce(doc, `| W16 | W13 | Pi catalog/inspect/observe/control tools | ${W16_CELL} |`, `| W16 | W13 | ${W16_CELL} | Pi catalog/inspect/observe/control tools |`),
  },
];

describe("wb-h8f.7 workflow_compare: the spec lines", () => {
  it("PCR-SPEC-LINES: docs/workbench carries every quoted spec text exactly once, in the form and section the header names, read the same rendered and in its source", () => {
    for (const quote of SPEC_QUOTES) {
      const doc = pageText(quote.page);
      expect(doc.split(quote.text).length - 1, `${quote.page}: ${quote.text}`).toBe(1);
      expect(quoteFindings(doc, quote), `${quote.page}: ${quote.text}`).toEqual([]);
    }
    for (const key of INLINE_HTML_SECTIONS) {
      const [page = "", section = ""] = key.split("#");
      expect(docsSection(pageText(page), section, 2, [PAGE_TITLES[page] ?? ""]).hasHtml, `${key} is exempt only while it carries inline HTML`).toBe(true);
    }
  });

  it.each(PCR_PROBES.map(probe => [probe.id, probe.shape, probe] as const))("PCR-SPEC-PROBE %s: %s is refused for the quote it hollows", (_id, _shape, { text, edit }) => {
    const quote = SPEC_QUOTES.find(candidate => candidate.text === text);
    if (quote === undefined) throw new Error(`no quoted text ${text}`);
    const doc = pageText(quote.page);
    expect(quoteFindings(doc, quote)).toEqual([]);
    const edited = edit(doc);
    expect(edited).not.toBe(doc);
    expect(quoteFindings(edited, quote)).not.toEqual([]);
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
    const workspace = realpathSync(booted.dir);
    for (const read of reads) {
      expect(read.refs.some(ref => ref.provider === "pi-workflow"), `${read.invocationId} read a pi-workflow node`).toBe(true);
      expect(shownRefs(read).length, `${read.invocationId} read a native node`).toBeGreaterThan(0);
      // wb-x1b9 (trunk cure): since wb-79k.3 wired the RF node() reading into the live projection at the Claude host seam, a read
      // holds its node's one rf operation twice - the node pipeline's operation reference and the RF observer's context-preview
      // reference, scoped to the workspace - and no other native reference.
      const operation = shownRefs(read).find(ref => ref.type === "operation")?.id ?? "";
      expect(operation, `${read.invocationId} read its node's rf operation`).toMatch(/^rfo_/);
      expect([...shownRefs(read)].sort((a, b) => a.type.localeCompare(b.type)), `${read.invocationId} read exactly the operation pair`).toEqual([
        { provider: "reactivefiber", type: "context-preview", id: operation, scope: workspace },
        { provider: "reactivefiber", type: "operation", id: operation },
      ]);
    }
    expect(reply.nativeRefs).toEqual({ reference: shownRefs(reads[0]), candidate: shownRefs(reads[1]) });
    const returned = [...(reply.nativeRefs?.reference ?? []), ...(reply.nativeRefs?.candidate ?? [])];
    expect(new Set(returned.map(ref => `${ref.type}/${ref.id}`)).size, "no reference repeats").toBe(shownRefs(reads[0]).length + shownRefs(reads[1]).length);
    expect(new Set(returned.map(ref => ref.id)).size, "the two reads name two operations").toBe(reads.length);
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
