/**
 * wb-5xdi (DX P04), EAT-R334 "Control refusals MUST teach the next call" (docs/workbench/programs/pi-system-dx-triage-2026-11-11,
 * requirements/.work/req-r-lx.md at 0a5ac3a3; audited basis C188 ESTABLISHED). Statement, quoted: "workflow_control refusals MUST
 * carry the data that makes the next call succeed: allowedActions for the target's provider on unknown-action, the required grant
 * on observer-only, and a confirmation hint spelled as the tool's own schema parameter." Acceptance criteria, quoted:
 *   1. "Assert via `probes/observe` b-registered B6 that unknown-action replies carry allowedActions for the target's provider, and
 *      observer-only replies carry requiredGrant."
 *   2. "Assert the confirmation hint reads as the tool's own parameter ("set confirmed: true"), `confirmed` is required-or-described
 *      in the schema, and following the hint verbatim succeeds (loop test)."
 *   3. "Assert the provider control grants are listed in docs/workflows.md and the tool description (census oracle)."
 * Preserved (C196): every reply stays the single workbench.tool-reply/v1 dialect with the typed error member and invoked:false.
 *
 * Pinned reader set (case id: assertion target -> result at the cut):
 *   N1 registered workflow_control (booted extension, B6 shape), unknown-action on six targets -> control.allowedActions equals the
 *      provider's verbs from the core's table, [] for pi-workflow (a provider the table has no verb for); and unknown-action on the
 *      13 near-miss spellings (below) of every provider key of the table -> allowedActions [] and no requiredGrant
 *   N2 registered workflow_control, observer-only grants -> control.requiredGrant names control:<provider>.<verb> for an allowlisted
 *      pair spelled exactly as the table spells it; an unlisted pair carries allowedActions instead and no requiredGrant, pinned for
 *      furnace:pause and pi-workflow:stop, for the 13 near-miss spellings of every provider key with that key's first verb
 *      (allowedActions []), and for the 13 near-miss spellings of every verb of the table under its own provider (that provider's
 *      verbs)
 *   N3 registered workflow_control, caller text that is not a table key (marker, escape, prototype names) on the observer-only
 *      and unknown-action paths -> no caller text in the reply and no teaching member beyond the table's own strings
 *   N4 registered schema -> confirmed is a top-level boolean parameter with a description; no params member exists
 *   N5 census (criterion 3) -> every control:<provider>.<verb> the core's table admits is named in the registered description and
 *      in docs/workflows.md, and the description's control:<provider>.<verb> tokens are exactly the table's grants in table order;
 *      the rows are frozen below and anchored to the table
 *   N6 production factory over a real projection -> the operator-confirmation hint is the exact corrected text and every
 *      requiredParams key is a top-level schema property
 *   N7 production factory over a real projection -> following the refusal verbatim (requiredParams, and the hint read literally)
 *      turns it into a permitted, executed action: the loop closes
 *   N0 judged set -> the collected cases of this file are exactly the pinned titles below, in collection order
 * NEAR-MISS FAMILIES (N1, N2), in order: capital, upper, lead, trail, prefix, suffix, inner, extend, outer, hyphen, underscore, width, accent.
 * Near-miss spellings (N1, N2; U1 and U2 of refusal #1): for one word w of the core's table (a provider key or a verb), one spelling
 * per family, none a key or a verb of the table (each provider spelling passes the core's request check: N1 reads unknown-action
 * for it): capital and upper (case), lead and trail (one space of padding), prefix and suffix (the first and the second half of w),
 * inner (w without its first and last character), extend (w with -run for a provider key, s for a verb), outer (my-w), hyphen and
 * underscore (w's hyphens removed or turned to underscores, else one inserted at the half), width (the fullwidth forms, NFKC-equal
 * to w) and accent (w with a combining acute). Each is the input a looser comparison than the core's exact one (case folding,
 * trimming, prefix, suffix, substring or superstring matching, separator folding, NFKC or accent-insensitive collation) would
 * resolve to w. Refusal #1's gate witnesses (GP189-WIT-PROVIDER: Furnace, FURNACE, furnace-run, Forge; GP189-WIT-ACTION: STOP,
 * Stop, " stop", st, can) are among them.
 * NOT CLAIMED by this file: a booted-extension operator-confirmation loop (it needs a native-owned target in the session projection;
 * N6/N7 run the factory src/index.ts registers, the c-control C1 oracle's tier); descriptions for the other workflow_control
 * parameters (EAT-R332); EAT-R328..R333, R335 and R336. A provider or verb spelling outside the six N1 rows, the N2 and N3 rows and
 * the 13 near-miss families is NOT CLAIMED by this census. The order of the grants in docs/workflows.md, the paragraph that names
 * them, and every description or docs sentence beyond the grant names (the teaching-member sentences, the absence of any other verb
 * list) are NOT CLAIMED by this census.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, type RunnerTask, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { acknowledge, type ControlDecision, NATIVE_CONTROL_ACTIONS, settle } from "../src/workbench/control.js";
import { type ControlExecutionSummary, createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { docsSection } from "./helpers/census.js";

/** docs/workflows.md, read from this file's own location (the boot below moves the process cwd into a sandbox). */
const DOCS_WORKFLOWS = readFileSync(fileURLToPath(new URL("../docs/workflows.md", import.meta.url)), "utf8");

interface ControlReply {
  contract: string;
  tool: string;
  ok: boolean;
  invoked: boolean;
  status: string;
  control: Record<string, unknown>;
  error?: { code: string; category: string; message: string };
}
interface SchemaProperty {
  type?: string;
  description?: string;
}
interface RegisteredTool {
  description: string;
  parameters: { properties: Record<string, SchemaProperty> };
  execute(id: string, params: unknown, signal: undefined, onUpdate: undefined, context: unknown): Promise<unknown>;
}

const ALL_CONTROL = [
  "workbench:observe",
  "control:claude-agent-sdk.interrupt",
  "control:forge.cancel",
  "control:furnace.stop",
  "control:local-detached.cancel",
  "control:local-detached.shutdown",
];
const OBSERVER = ["workbench:observe", "furnace:inspect"];
const MARKER = "caller-supplied-marker";
const ESC = String.fromCodePoint(0x1b);
const CORRECTED_HINT = "Set confirmed: true (explicit operator confirmation) and request the action again.";
/** The booted cases N1 and N2 drive 58 and 124 registered calls; their own bound keeps a loaded host from cutting them short. */
const NEAR_MISS_CASE_TIMEOUT_MS = 120_000;

/** The near-miss families of the header, in order (frozen: an added, dropped or reordered family reds N1 and N2). */
const NEAR_MISS_FAMILIES = ["capital", "upper", "lead", "trail", "prefix", "suffix", "inner", "extend", "outer", "hyphen", "underscore", "width", "accent"] as const;
type NearMissFamily = (typeof NEAR_MISS_FAMILIES)[number];
const ACUTE = String.fromCodePoint(0x301);
const FULLWIDTH_OFFSET = 0xfee0;
const half = (word: string) => Math.ceil(word.length / 2);
/** One near-miss spelling of a table word per family (the header names each family). */
const NEAR_MISS: Readonly<Record<NearMissFamily, (word: string, extension: string) => string>> = {
  capital: word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`,
  upper: word => word.toUpperCase(),
  lead: word => ` ${word}`,
  trail: word => `${word} `,
  prefix: word => word.slice(0, half(word)),
  suffix: word => word.slice(half(word)),
  inner: word => word.slice(1, -1),
  extend: (word, extension) => `${word}${extension}`,
  outer: word => `my-${word}`,
  hyphen: word => (word.includes("-") ? word.replaceAll("-", "") : `${word.slice(0, half(word))}-${word.slice(half(word))}`),
  underscore: word => (word.includes("-") ? word.replaceAll("-", "_") : `${word.slice(0, half(word))}_${word.slice(half(word))}`),
  width: word => Array.from(word, char => String.fromCodePoint((char.codePointAt(0) ?? 0) + FULLWIDTH_OFFSET)).join(""),
  accent: word => `${word}${ACUTE}`,
};
/**
 * Each-liveness of a near-miss row, judged without NEAR_MISS: the spelling is its family's near miss of the word, so a row swapped
 * for an unrelated spelling, or for the word itself, reds.
 */
const FAMILY_HOLDS: Readonly<Record<NearMissFamily, (spelling: string, word: string) => boolean>> = {
  capital: (spelling, word) => spelling !== word && spelling.toLowerCase() === word && spelling.slice(1) === word.slice(1),
  upper: (spelling, word) => spelling !== word && spelling === word.toUpperCase(),
  lead: (spelling, word) => spelling === ` ${word}`,
  trail: (spelling, word) => spelling === `${word} `,
  prefix: (spelling, word) => spelling.length > 0 && spelling.length < word.length && word.startsWith(spelling),
  suffix: (spelling, word) => spelling.length > 0 && spelling.length < word.length && word.endsWith(spelling),
  inner: (spelling, word) => spelling.length > 0 && word.includes(spelling) && !word.startsWith(spelling) && !word.endsWith(spelling),
  extend: (spelling, word) => spelling.length > word.length && spelling.startsWith(word),
  outer: (spelling, word) => spelling.length > word.length && spelling.endsWith(word) && !spelling.startsWith(word),
  hyphen: (spelling, word) => spelling !== word && spelling.split("-").join("") === word.split("-").join(""),
  underscore: (spelling, word) => spelling.includes("_") && spelling.split("_").join(word.includes("-") ? "-" : "") === word,
  width: (spelling, word) => spelling !== word && spelling.normalize("NFKC") === word,
  accent: (spelling, word) => spelling !== word && spelling.normalize("NFD").replace(/\p{M}/gu, "") === word,
};
interface NearMissRow {
  readonly provider: string;
  readonly verb: string;
  readonly family: NearMissFamily;
  readonly spelling: string;
}
/** The 13 near-miss spellings of every provider key of the core's table, each carrying that key's first verb (N1, N2). */
const PROVIDER_NEAR_MISSES: readonly NearMissRow[] = Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, verbs]) =>
  NEAR_MISS_FAMILIES.map(family => ({ provider, verb: verbs[0], family, spelling: NEAR_MISS[family](provider, "-run") })));
/** The 13 near-miss spellings of every verb of the core's table, each under its own provider (N2). */
const VERB_NEAR_MISSES: readonly NearMissRow[] = Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, verbs]) =>
  verbs.flatMap(verb => NEAR_MISS_FAMILIES.map(family => ({ provider, verb, family, spelling: NEAR_MISS[family](verb, "s") }))));

/** The near-miss families this file's header names, in order: the claim words the frozen family list is anchored to. */
function headerFamilies(): string[] {
  const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const header = text.slice(0, text.indexOf("*/"));
  const lead = " * NEAR-MISS FAMILIES (N1, N2), in order: ";
  const line = header.split("\n").find(row => row.startsWith(lead));
  return line === undefined ? [] : line.slice(lead.length).replace(/\.$/, "").split(", ");
}

/**
 * Row-set and each-liveness pins of one near-miss table: the frozen families, equal to the families the header names and counted
 * by the N1 and N2 titles, one row per family for every word of the core's table (the anchor outside this file), each row its
 * family's near miss of that word, and no row a key or verb of the table.
 */
function expectNearMissRows(rows: readonly NearMissRow[], idOf: (row: NearMissRow) => string, ids: readonly string[], wordOf: (row: NearMissRow) => string, exact: (row: NearMissRow) => boolean) {
  expect(NEAR_MISS_FAMILIES).toEqual(["capital", "upper", "lead", "trail", "prefix", "suffix", "inner", "extend", "outer", "hyphen", "underscore", "width", "accent"]);
  expect(headerFamilies(), "the header's near-miss families").toEqual([...NEAR_MISS_FAMILIES]);
  expect(PINNED_TITLES.filter(title => title.includes(` the ${NEAR_MISS_FAMILIES.length} near-miss spellings of every table provider`)), "titles counting the families").toHaveLength(2);
  expect(rows.map(row => `${idOf(row)}:${row.family}`)).toEqual(ids.flatMap(id => NEAR_MISS_FAMILIES.map(family => `${id}:${family}`)));
  for (const row of rows) expect(FAMILY_HOLDS[row.family](row.spelling, wordOf(row)), `${idOf(row)} ${row.family} ${JSON.stringify(row.spelling)}`).toBe(true);
  expect(rows.filter(exact).map(row => row.spelling)).toEqual([]);
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
});

/** Boots the REAL extension in claude mode (the b-registered probe's boot) and returns its registered workflow_control. */
async function bootControl(rights: readonly string[]) {
  // One booted extension per case at a time: a case that boots twice restores the first sandbox before the second.
  sandbox?.restore();
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  await booted.lifecycle.get("session_start")?.({}, context);
  const tool: RegisteredTool | undefined = booted.tools.get("workflow_control");
  if (tool === undefined) throw new Error("workflow_control is not registered in claude mode");
  const call = async (params: Record<string, unknown>) => {
    const text = textOf(await tool.execute("next-call", params, undefined, undefined, context));
    return { text, reply: JSON.parse(text) as ControlReply };
  };
  return { tool, call };
}

/** The refusal envelope every case keeps (C196): tool-reply/v1, nothing invoked, the typed error code beside the control body. */
function expectRefused(reply: ControlReply, policy: string, label?: string) {
  expect(reply, label).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_control", ok: false, invoked: false, status: "refused" });
  expect(reply.error?.code, label).toBe(policy);
  expect(reply.control.policy, label).toBe(policy);
}

describe("EAT-R334 criterion 1: refusals through the registered tool name what the next call needs (B6 shape)", () => {
  it("N1 unknown-action names the target provider's own verbs as allowedActions, and [] for pi-workflow and the 13 near-miss spellings of every table provider", async () => {
    const control = await bootControl(ALL_CONTROL);
    const rows: ReadonlyArray<{ target: NativeRef; action: string; allowed: readonly string[] }> = [
      { target: { provider: "claude-agent-sdk", type: "session", id: "0199a8f2-7c3e-7bb1-9d2e-000000000000" }, action: "stop", allowed: ["interrupt"] },
      { target: { provider: "furnace", type: "run", id: "frn-run-abc" }, action: "pause", allowed: ["stop"] },
      { target: { provider: "forge", type: "operation", id: "op-3e2a40bee18342559f255771bd11c4a5" }, action: "stop", allowed: ["cancel"] },
      { target: { provider: "local-detached", type: "invocation", id: "wf_detached1" }, action: "stop", allowed: ["cancel", "shutdown"] },
      { target: { provider: "pi-workflow", type: "node-call", id: "wf_bf713df5e3c4:1" }, action: "cancel", allowed: [] },
      { target: { provider: "pi-workflow", type: "task", id: "wf_bf713df5e3c4" }, action: "stop", allowed: [] },
    ];
    // Row-set and each-liveness pins: the table is frozen (an emptied or shortened table reds), it covers every provider of
    // the core's verb table (the anchor outside this file), and it keeps a provider the table has no verb for.
    expect(rows.map(row => `${row.target.provider}/${row.target.type}:${row.action}`)).toEqual([
      "claude-agent-sdk/session:stop",
      "furnace/run:pause",
      "forge/operation:stop",
      "local-detached/invocation:stop",
      "pi-workflow/node-call:cancel",
      "pi-workflow/task:stop",
    ]);
    expect(Object.keys(NATIVE_CONTROL_ACTIONS).filter(provider => !rows.some(row => row.target.provider === provider))).toEqual([]);
    expect(rows.some(row => !Object.hasOwn(NATIVE_CONTROL_ACTIONS, row.target.provider))).toBe(true);
    for (const row of rows) {
      const { reply } = await control.call({ target: row.target, action: row.action, confirmed: true });
      expectRefused(reply, "unknown-action");
      expect(reply.control.allowedActions, `${row.target.provider} ${row.action}`).toEqual(row.allowed);
      expect(reply.control, `${row.target.provider} ${row.action}`).not.toHaveProperty("requiredGrant");
    }
    // U1 of refusal #1: no near-miss spelling of a provider key is a key, so each names no verb and no grant.
    expectNearMissRows(PROVIDER_NEAR_MISSES, row => row.provider, Object.keys(NATIVE_CONTROL_ACTIONS), row => row.provider, row => Object.hasOwn(NATIVE_CONTROL_ACTIONS, row.spelling));
    expect(PROVIDER_NEAR_MISSES.map(row => row.spelling)).toEqual(expect.arrayContaining(["Furnace", "FURNACE", "furnace-run", "Forge"]));
    for (const row of PROVIDER_NEAR_MISSES) {
      const label = `${row.provider} ${row.family} ${JSON.stringify(row.spelling)}`;
      const { reply } = await control.call({ target: { provider: row.spelling, type: "run", id: "frn-run-abc" }, action: row.verb, confirmed: true });
      expectRefused(reply, "unknown-action", label);
      expect(reply.control.allowedActions, label).toEqual([]);
      expect(reply.control, label).not.toHaveProperty("requiredGrant");
    }
  }, NEAR_MISS_CASE_TIMEOUT_MS);

  it("N2 observer-only names the exact grant for an allowlisted provider.verb, and the provider's verbs for furnace:pause, pi-workflow:stop and the 13 near-miss spellings of every table provider and verb", async () => {
    const control = await bootControl(OBSERVER);
    const granted: ReadonlyArray<{ target: NativeRef; action: string; grant: string }> = [
      { target: { provider: "furnace", type: "run", id: "frn-run-abc" }, action: "stop", grant: "control:furnace.stop" },
      { target: { provider: "claude-agent-sdk", type: "session", id: "0199a8f2-7c3e-7bb1-9d2e-000000000000" }, action: "interrupt", grant: "control:claude-agent-sdk.interrupt" },
      { target: { provider: "forge", type: "operation", id: "op-3e2a40bee18342559f255771bd11c4a5" }, action: "cancel", grant: "control:forge.cancel" },
      { target: { provider: "local-detached", type: "invocation", id: "wf_detached1" }, action: "cancel", grant: "control:local-detached.cancel" },
      { target: { provider: "local-detached", type: "invocation", id: "wf_detached1" }, action: "shutdown", grant: "control:local-detached.shutdown" },
    ];
    // Row-set pin anchored outside this file: one row per allowlisted provider.verb of the core's table, in table order.
    expect(granted.map(row => row.grant)).toEqual(Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, verbs]) => verbs.map(verb => `control:${provider}.${verb}`)));
    expect(granted.every(row => row.grant === `control:${row.target.provider}.${row.action}`)).toBe(true);
    for (const row of granted) {
      const { reply } = await control.call({ target: row.target, action: row.action });
      expectRefused(reply, "observer-only");
      expect(reply.control.requiredGrant, row.grant).toBe(row.grant);
      expect(reply.control, row.grant).not.toHaveProperty("allowedActions");
    }
    const unlisted: ReadonlyArray<{ target: NativeRef; action: string; allowed: readonly string[] }> = [
      { target: { provider: "furnace", type: "run", id: "frn-run-abc" }, action: "pause", allowed: ["stop"] },
      { target: { provider: "pi-workflow", type: "task", id: "wf_bf713df5e3c4" }, action: "stop", allowed: [] },
    ];
    expect(unlisted.map(row => `${row.target.provider}:${row.action}`)).toEqual(["furnace:pause", "pi-workflow:stop"]);
    for (const row of unlisted) {
      const { reply } = await control.call({ target: row.target, action: row.action });
      expectRefused(reply, "observer-only");
      expect(reply.control, `${row.target.provider} ${row.action}`).not.toHaveProperty("requiredGrant");
      expect(reply.control.allowedActions, `${row.target.provider} ${row.action}`).toEqual(row.allowed);
    }
    // U1 and U2 of refusal #1: a near-miss provider with its key's verb, or a near-miss verb under its own provider, is a pair the
    // table does not list, so it names that provider's verbs ([] for a near-miss provider) and no grant.
    expectNearMissRows(PROVIDER_NEAR_MISSES, row => row.provider, Object.keys(NATIVE_CONTROL_ACTIONS), row => row.provider, row => Object.hasOwn(NATIVE_CONTROL_ACTIONS, row.spelling));
    const pairs = Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, verbs]) => verbs.map(verb => `${provider}.${verb}`));
    expectNearMissRows(VERB_NEAR_MISSES, row => `${row.provider}.${row.verb}`, pairs, row => row.verb, row => NATIVE_CONTROL_ACTIONS[row.provider].includes(row.spelling));
    expect(VERB_NEAR_MISSES.filter(row => row.provider === "furnace").map(row => row.spelling)).toEqual(expect.arrayContaining(["STOP", "Stop", " stop", "st"]));
    expect(VERB_NEAR_MISSES.filter(row => row.provider === "forge").map(row => row.spelling)).toContain("can");
    const nearMisses: ReadonlyArray<{ row: NearMissRow; provider: string; action: string; allowed: readonly string[] }> = [
      ...PROVIDER_NEAR_MISSES.map(row => ({ row, provider: row.spelling, action: row.verb, allowed: [] })),
      ...VERB_NEAR_MISSES.map(row => ({ row, provider: row.provider, action: row.spelling, allowed: NATIVE_CONTROL_ACTIONS[row.provider] })),
    ];
    expect(nearMisses.length).toBe(PROVIDER_NEAR_MISSES.length + VERB_NEAR_MISSES.length);
    for (const { row, provider, action, allowed } of nearMisses) {
      const label = `${row.provider}.${row.verb} ${row.family} ${JSON.stringify(row.spelling)}`;
      const { reply } = await control.call({ target: { provider, type: "run", id: "frn-run-abc" }, action });
      expectRefused(reply, "observer-only", label);
      expect(reply.control, label).not.toHaveProperty("requiredGrant");
      expect(reply.control.allowedActions, label).toEqual(allowed);
    }
  }, NEAR_MISS_CASE_TIMEOUT_MS);

  it("N3 caller text that is no table key never reaches the reply: only the table's own strings teach", async () => {
    const control = await bootControl(OBSERVER);
    const hostile = `evil${ESC}[31m ${MARKER}`;
    const rows: ReadonlyArray<{ label: string; provider: string; action: string; allowed: readonly string[] }> = [
      { label: "escape and marker in the provider", provider: hostile, action: "stop", allowed: [] },
      { label: "escape and marker in the action", provider: "furnace", action: `stop${ESC}]0;${MARKER}`, allowed: ["stop"] },
      { label: "__proto__ provider", provider: "__proto__", action: "stop", allowed: [] },
      { label: "constructor provider, toString action", provider: "constructor", action: "toString", allowed: [] },
      { label: "constructor action", provider: "forge", action: "constructor", allowed: ["cancel"] },
    ];
    // Row-set and liveness pins: five frozen rows, two carrying the marker and an escape, every row an unlisted pair.
    expect(rows.map(row => row.label)).toEqual([
      "escape and marker in the provider",
      "escape and marker in the action",
      "__proto__ provider",
      "constructor provider, toString action",
      "constructor action",
    ]);
    expect(rows.filter(row => `${row.provider}${row.action}`.includes(MARKER) && `${row.provider}${row.action}`.includes(ESC)).length).toBe(2);
    expect(rows.every(row => !Object.hasOwn(NATIVE_CONTROL_ACTIONS, row.provider) || !NATIVE_CONTROL_ACTIONS[row.provider].includes(row.action))).toBe(true);
    for (const row of rows) {
      const { text, reply } = await control.call({ target: { provider: row.provider, type: "run", id: "frn-run-abc" }, action: row.action });
      expectRefused(reply, "observer-only");
      expect(text).not.toContain(MARKER);
      expect(text).not.toContain("evil");
      expect(text).not.toContain(ESC);
      expect(reply.control, row.label).not.toHaveProperty("requiredGrant");
      expect(reply.control.allowedActions, row.label).toEqual(row.allowed);
    }
    // The same claim on the unknown-action path: clean caller text that passes the core's request check but is no table key.
    const granted = await bootControl(ALL_CONTROL);
    const unknown: ReadonlyArray<{ label: string; provider: string; action: string; allowed: readonly string[] }> = [
      { label: "marker as the provider", provider: MARKER, action: "stop", allowed: [] },
      { label: "marker as the action", provider: "furnace", action: MARKER, allowed: ["stop"] },
    ];
    expect(unknown.map(row => row.label)).toEqual(["marker as the provider", "marker as the action"]);
    for (const row of unknown) {
      const { text, reply } = await granted.call({ target: { provider: row.provider, type: "run", id: "frn-run-abc" }, action: row.action, confirmed: true });
      expectRefused(reply, "unknown-action");
      expect(text, row.label).not.toContain(MARKER);
      expect(reply.control, row.label).not.toHaveProperty("requiredGrant");
      expect(reply.control.allowedActions, row.label).toEqual(row.allowed);
    }
  });
});

describe("EAT-R334 criterion 2: the confirmation is the tool's own parameter, and following the refusal succeeds", () => {
  it("N4 the registered schema carries confirmed as a top-level described boolean and has no params member", async () => {
    const { tool } = await bootControl(ALL_CONTROL);
    const properties = tool.parameters.properties;
    expect(Object.keys(properties).sort()).toEqual(["action", "confirmed", "target"]);
    expect(properties.confirmed?.type).toBe("boolean");
    expect(typeof properties.confirmed?.description).toBe("string");
    expect(properties.confirmed?.description?.trim().length ?? 0).toBeGreaterThan(0);
    expect(properties).not.toHaveProperty("params");
  });

  const SCOPE: ObservationScope = { workspace: "/ws", principal: "local-operator:1000:s1" };
  const AT = "2026-11-11T09:00:00Z";
  const OWNER = "wf_owner00001";
  const TARGET: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };

  /** The production factory over a real projection holding one owned furnace run (the c-control C1 oracle's tier). */
  function factory() {
    const projection = new ObservationProjection();
    const child: NativeRef = { provider: "furnace", type: "child", id: "frn-run-r1-child", scope: SCOPE.workspace };
    for (const source of [TARGET, child]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.run.snapshot", trace: { invocationId: OWNER },
        node: { title: `furnace ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: TARGET, to: child, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" } });
    const executed: ControlDecision[] = [];
    const executor = vi.fn(async (decision: ControlDecision): Promise<ControlExecutionSummary> => {
      executed.push(decision);
      if (decision.decision !== "permitted") throw new Error("the executor only ever receives a permit");
      const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: AT, nativeAckRef: "ack-native-1" });
      return { receipt: settle(acknowledged, { outcome: "completed", nativeResultRef: "result-native-1", settledAt: AT }), status: "settled" };
    });
    const deps: WorkflowControlDeps = {
      grants: () => ["control:furnace.stop"],
      observerScope: () => ({ ...SCOPE }),
      localPrincipal: () => SCOPE.principal,
      sessionIdOf: () => "s1",
      projection,
      tasks: new Map<string, WorkflowTask>([[OWNER, { id: OWNER } as unknown as WorkflowTask]]),
      now: () => AT,
      executors: { furnace: executor },
    };
    const tool = createWorkflowControlTool(deps);
    const context = { cwd: "/ws", sessionManager: { getSessionId: () => "s1" } };
    const call = async (params: Record<string, unknown>, callId: string) => {
      const result = await tool.execute(callId, params as never, undefined, undefined, context as never);
      const text = result.content[0]?.type === "text" ? result.content[0].text : "";
      return JSON.parse(text) as ControlReply;
    };
    return { tool, call, executor, executed };
  }

  it("N6 the operator-confirmation hint is spelled as the tool's own parameter, and requiredParams names only top-level properties", async () => {
    const { tool, call, executor } = factory();
    const refused = await call({ target: { ...TARGET }, action: "stop" }, "call-unconfirmed");
    expectRefused(refused, "operator-confirmation");
    expect(refused.control.hint).toBe(CORRECTED_HINT);
    expect(String(refused.control.hint)).not.toContain("params.");
    expect(refused.control.requiredParams).toEqual({ confirmed: true });
    const topLevel = Object.keys((tool.parameters as unknown as RegisteredTool["parameters"]).properties);
    for (const key of Object.keys(refused.control.requiredParams as Record<string, unknown>)) expect(topLevel, key).toContain(key);
    expect(executor).not.toHaveBeenCalled();
  });

  it("N7 following the refusal verbatim succeeds: requiredParams merged as given, and the hint read literally, each permit one executed action", async () => {
    const { call, executor, executed } = factory();
    const first = { target: { ...TARGET }, action: "stop" };
    const refused = await call(first, "call-loop-0");
    expectRefused(refused, "operator-confirmation");
    const merged = await call({ ...first, ...(refused.control.requiredParams as Record<string, unknown>) }, "call-loop-1");
    expect(merged).toMatchObject({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_control", ok: true, invoked: true, status: "settled" });
    const literal = /^Set ([a-z][A-Za-z]*): (true|false) /.exec(String(refused.control.hint));
    expect(literal, "the hint names one parameter and its value").not.toBeNull();
    const [, name, value] = literal ?? [];
    const read = await call({ ...first, [String(name)]: value === "true" }, "call-loop-2");
    expect(read).toMatchObject({ ok: true, invoked: true, status: "settled" });
    expect(executor).toHaveBeenCalledTimes(2);
    expect(executed.every(decision => decision.decision === "permitted")).toBe(true);
  });
});

/**
 * N5 census (criterion 3): one row per exact control grant the core's verb table admits, each judged on both surfaces the
 * criterion names. FROZEN SHAPE (rule 16): the row/surface literal below pins every row and its two pins, and the rows are
 * anchored OUTSIDE this census to the src table (NATIVE_CONTROL_ACTIONS), so dropping, shortening or swapping a row or a pin
 * reds here, and a coordinated removal from every literal reds on the table anchor. The registered description is also read as
 * a sequence: its control:<provider>.<verb> tokens, in order, equal the table's grants in table order (U3 of refusal #1).
 */
const GRANT_ROWS: ReadonlyArray<{ grant: string; surfaces: readonly ("description" | "docs/workflows.md")[] }> = [
  { grant: "control:furnace.stop", surfaces: ["description", "docs/workflows.md"] },
  { grant: "control:claude-agent-sdk.interrupt", surfaces: ["description", "docs/workflows.md"] },
  { grant: "control:forge.cancel", surfaces: ["description", "docs/workflows.md"] },
  { grant: "control:local-detached.cancel", surfaces: ["description", "docs/workflows.md"] },
  { grant: "control:local-detached.shutdown", surfaces: ["description", "docs/workflows.md"] },
];

/**
 * What a reader sees of docs/workflows.md's "Workbench verification commands" section: its rendered paragraphs, read through
 * the shared parse-aware reader (HTML comments, html blocks and code fences are not paragraph text), so a grant hidden from
 * the rendered page never counts as listed.
 */
function docsParagraphs(): string {
  const section = docsSection(DOCS_WORKFLOWS, "Workbench verification commands", 2, ["Scripted workflows"]);
  if (!section.ok) throw new Error(`docs/workflows.md section is not readable: ${section.why}`);
  return section.blocks.flatMap(block => (block.kind === "paragraph" ? [block.text] : [])).join("\n");
}

/** A whole grant token, never a prefix of a longer one (control:local-detached.cancel is not control:local-detached.cancelled). */
function namesGrant(text: string, grant: string): boolean {
  const escaped = grant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9:._-])${escaped}(?![A-Za-z0-9_-]|\\.[A-Za-z0-9])`).test(text);
}

describe("EAT-R334 criterion 3: the provider control grants are listed where an agent reads them (census)", () => {
  it("N5 every control grant of the core's table is named in the registered description, in table order, and in docs/workflows.md", async () => {
    expect(GRANT_ROWS.map(row => `${row.grant}:${row.surfaces.join("+")}`)).toEqual([
      "control:furnace.stop:description+docs/workflows.md",
      "control:claude-agent-sdk.interrupt:description+docs/workflows.md",
      "control:forge.cancel:description+docs/workflows.md",
      "control:local-detached.cancel:description+docs/workflows.md",
      "control:local-detached.shutdown:description+docs/workflows.md",
    ]);
    const table = Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, verbs]) => verbs.map(verb => `control:${provider}.${verb}`));
    expect(GRANT_ROWS.map(row => row.grant)).toEqual(table);
    const { tool } = await bootControl(ALL_CONTROL);
    const surfaces: Readonly<Record<string, string>> = { description: tool.description, "docs/workflows.md": docsParagraphs() };
    for (const row of GRANT_ROWS) {
      for (const surface of row.surfaces) expect(namesGrant(surfaces[surface] ?? "", row.grant), `${row.grant} on ${surface}`).toBe(true);
    }
    // U3 of refusal #1, "in table order" (CONTROL_GRANTS, src/workbench/control-tool.ts): the description's grant tokens, in the
    // order it names them, are exactly the table's grants, so a reversed, sorted, shortened or extended list reds.
    expect(tool.description.match(/control:[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*/g) ?? [], "the description's grant tokens, in order").toEqual(table);
  });
});

/** Every collected test title of this file, in collection order, read from the vitest task tree. */
function collectedTitles(tasks: readonly RunnerTask[]): string[] {
  return tasks.flatMap(child => (child.type === "test" ? [child.name] : child.type === "suite" ? collectedTitles(child.tasks) : []));
}

/** The pinned reader set by title (claim form): the header's cases, in collection order, this judged-set case last. */
const PINNED_TITLES: readonly string[] = [
  "N1 unknown-action names the target provider's own verbs as allowedActions, and [] for pi-workflow and the 13 near-miss spellings of every table provider",
  "N2 observer-only names the exact grant for an allowlisted provider.verb, and the provider's verbs for furnace:pause, pi-workflow:stop and the 13 near-miss spellings of every table provider and verb",
  "N3 caller text that is no table key never reaches the reply: only the table's own strings teach",
  "N4 the registered schema carries confirmed as a top-level described boolean and has no params member",
  "N6 the operator-confirmation hint is spelled as the tool's own parameter, and requiredParams names only top-level properties",
  "N7 following the refusal verbatim succeeds: requiredParams merged as given, and the hint read literally, each permit one executed action",
  "N5 every control grant of the core's table is named in the registered description, in table order, and in docs/workflows.md",
  "N0 the pinned reader set is exactly this file's collected cases, by title",
];

describe("EAT-R334 judged set: the pinned reader set is the file's own cases", () => {
  it("N0 the pinned reader set is exactly this file's collected cases, by title", ({ task }) => {
    expect(collectedTitles(task.file.tasks)).toEqual(PINNED_TITLES);
  });
});
