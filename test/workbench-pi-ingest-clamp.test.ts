/**
 * wb-zo9 SITE 25: the SubagentWorkflow ingest clamp in src/index.ts (runWorkflowTask), the one door a script's node label and
 * status have into the observation projection, executed through the REGISTERED tools only: SubagentWorkflow launches the
 * script and workflow_observe reads the projection back, as the model does. Quoted from the bead (owner-ordered filing on the
 * wb-752.9 R1=(a) ruling):
 * - DEFECT: "the launch-path ingest clamp at src/index.ts ~:2711 runs stripUnsafeText(value, " ").slice(0, 120) BEFORE any
 *   redaction, turning every separator into a space, so later passes ... read "pass word=" / split tokens and miss both the
 *   split keyword and the glue tail. 32/32 corpus probes visible through the REGISTERED workflow_observe ... (4 templates
 *   {password=, Bearer, sk-ant-, api_key:} x 4 gap classes {U+FEFF, BEL, ESC[0m, U+200B} x 2 split positions; unsplit
 *   password= redacted; plain controls visible - non-vacuous)".
 * - CURE: "redact before strip, or strip WITHOUT inserting a separator - the wb-bau recorded form
 *   sanitizeWorkbenchText(value, 120, "label"). GATE-STEER1 APPLIES: producer text must never pick which reading wins; judge the
 *   fix against the steered-reading attack shape."
 * - RED-FIRST: "the 32-probe set executed through the REGISTERED tool (public entry point), delivered as a SITES corpus row".
 * The row keeps the SITES contract (the site's public entry driven, its display strings returned, failures named never shown)
 * in a file of its own: every node dispatch on this path re-verifies the invocation identity (about 150 ms each, measured), so
 * the 756 shapes of the SITES loops would cost close to two minutes there. The routing pin below ties every real-path title to
 * sanitizeWorkbenchText(raw, 120, "label"), the layout the SITES label row of test/workbench-sanitizer-corpus.test.ts runs over
 * CORPUS and ACCEPTANCE. Measured here, of the two cures the bead names: stripping with no separator leaks the separating dual
 * and GATE-STEER1, and the recorded form alone wedges the run on a label that sanitizes to nothing (the projection refuses an
 * empty title), hence its placeholder. Seat rule F11: every control or invisible code point is built with String.fromCodePoint.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const cp = (code: number): string => String.fromCodePoint(code);
const BEL = cp(0x07);
const ESC = cp(0x1b);
const ZWSP = cp(0x200b);
const BOM = cp(0xfeff);

/** Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates. */
const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}

/** The wb-752.9 gate F1 gap classes, one unit each. */
const GAPS: readonly (readonly [name: string, unit: string])[] = [
  ["U+FEFF", BOM],
  ["BEL", BEL],
  ["ESC[0m", `${ESC}[0m`],
  ["U+200B", ZWSP],
];
type Split = (gap: string, first: string, second: string) => string;
/** Each credential template, split by a gap inside its keyword and inside its value. */
const TEMPLATES: readonly (readonly [name: string, keyword: Split, value: Split])[] = [
  ["password=", (gap, a, b) => `pass${gap}word=${a}${b}`, (gap, a, b) => `password=${a}${gap}${b}`],
  ["Bearer", (gap, a, b) => `Bea${gap}rer ${a}${b}`, (gap, a, b) => `Bearer ${a}${gap}${b}`],
  ["sk-ant-", (gap, a, b) => `sk-${gap}ant-${a}${b}`, (gap, a, b) => `sk-ant-${a}${gap}${b}`],
  ["api_key:", (gap, a, b) => `api${gap}_key: ${a}${b}`, (gap, a, b) => `api_key: ${a}${gap}${b}`],
];

/** The measured 32-probe set: every half is unique, and either half visible is a leak. Each one needs the GLUED reading. */
const SPLIT: readonly Probe[] = TEMPLATES.flatMap(([template, keyword, value], t) =>
  GAPS.flatMap(([gapName, gap], g) =>
    (
      [
        ["keyword", keyword],
        ["value", value],
      ] as const
    ).map(([position, shape], p) => {
      const first = `ZOT${t}G${g}P${p}FIRSTHALF`;
      const second = `ZOT${t}G${g}P${p}SECONDHALF`;
      return { id: `${template} split inside the ${position} by ${gapName}`, raw: shape(gap, first, second), secrets: [first, second] };
    }),
  ),
);

/** The dual of the set above: the same gap classes where only the SEPARATING reading exposes the credential. */
const SEPARATING: readonly Probe[] = GAPS.flatMap(([gapName, gap], g) => [
  { id: `${gapName} as the space after Bearer`, raw: `Authorization: Bearer${gap}ZOSEP${g}AFTERSCHEME`, secrets: [`ZOSEP${g}AFTERSCHEME`] },
  { id: `${gapName} as the boundary before sk-ant-`, raw: `key${gap}sk-ant-ZOSEP${g}BEFOREPREFIX`, secrets: [`ZOSEP${g}BEFOREPREFIX`] },
]);

/** The gate's steered-reading probes (wb-6ze.32 gate-3, 08:01Z), verbatim: planted marker text, the tie class, a mix. */
const GATE_PROBES: readonly Probe[] = [
  { id: "GATE-STEER1 count-steered deletion reading", raw: `Bearer${ZWSP}STEERSECRETONE [REDAC${ZWSP}TED] [REDAC${ZWSP}TED]`, secrets: ["STEERSECRETONE"] },
  { id: "GATE-TIE1 ZWSP inside an sk-ant- key (tie)", raw: `sk-ant-aaaa${ZWSP}TIETAILONE`, secrets: ["TIETAILONE"] },
  { id: "GATE-MIX1 tie key plus in-token scheme", raw: `sk-ant-AAA${ZWSP}MIXTAILONE x${ZWSP}Bea${ZWSP}rer MIXBEARERONE`, secrets: ["MIXTAILONE", "MIXBEARERONE"] },
];

/** Non-vacuous controls: text the path must show, a credential every tree redacts, the clamp's bound and its placeholder. */
const CONTROLS = {
  plain: "wb-zo9 plain control VISIBLEONE",
  assignment: "label=VISIBLETWO",
  unsplit: "password=UNSPLITCONTROLSECRET",
  spaced: `gap${BEL}between${ESC}[0mwords`,
  long: `long-control-${"x".repeat(150)}`,
  invisibleOnly: ZWSP,
  controlOnly: BEL,
} as const;

const PROBES: readonly Probe[] = [...SPLIT, ...SEPARATING, ...GATE_PROBES];
const LABELS: readonly string[] = [...PROBES.map(probe => probe.raw), ...Object.values(CONTROLS)];
/** Labels per launched run, within workflow_observe's default page of twenty nodes. */
const PAGE = 20;
const SETTLE_MS = 60_000;
const TIMEOUT = 180_000;

interface ToolResult {
  readonly content: Array<{ type: string; text: string }>;
  readonly details?: unknown;
}
/** A tool as the extension registers it with pi. */
interface RegisteredTool {
  execute(id: string, params: Record<string, unknown>, signal: undefined, update: undefined, context: ExtensionContext): Promise<ToolResult>;
}
/** One node label as the registered workflow_observe reply shows it. */
interface Reading {
  readonly call: number;
  readonly title: string;
  readonly statusText: string;
  /** Every string leaf of the reply node, keys included. */
  readonly texts: readonly string[];
}

const record = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;

/** Every string leaf of a value, keys included. */
function strings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) for (const item of value) strings(item, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      into.push(key);
      strings(item, into);
    }
  }
  return into;
}

/** The run's node-call nodes wherever the reply carries them, in call order. */
function nodeReadings(reply: unknown, taskId: string): Reading[] {
  const found: Reading[] = [];
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    const node = record(value);
    if (node === undefined) return;
    const ref = record(node.nativeRef);
    const presentation = record(node.presentation);
    const id = ref?.id;
    const title = presentation?.title;
    const statusText = presentation?.statusText;
    if (ref?.provider === "pi-workflow" && ref.type === "node-call" && typeof id === "string" && id.startsWith(`${taskId}:`) && typeof title === "string" && typeof statusText === "string") {
      found.push({ call: Number(id.slice(taskId.length + 1)), title, statusText, texts: strings(node) });
      return;
    }
    for (const child of Object.values(node)) visit(child);
  };
  visit(reply);
  return found.sort((left, right) => left.call - right.call);
}

/** Reads the run back until it leaves "running"; a run that never settles is a harness failure, never a pass. */
async function settledReply(observe: RegisteredTool, context: ExtensionContext, taskId: string, limit: number): Promise<Record<string, unknown>> {
  const deadline = Date.now() + SETTLE_MS;
  for (;;) {
    const reply = record(JSON.parse(textOf(await observe.execute("wb-zo9-observe", { taskId, limit }, undefined, undefined, context))));
    if (reply === undefined) throw new Error("workflow_observe returned no JSON object");
    if (reply.status !== "running") return reply;
    if (Date.now() > deadline) throw new Error(`workflow ${taskId} did not settle within ${SETTLE_MS} ms`);
    await new Promise(resolve => setTimeout(resolve, 25));
  }
}

/**
 * The public entry point: boots the REAL extension in a hermetic directory with only workbench:observe, launches each page of
 * labels as one script through the registered SubagentWorkflow, and reads it back through the registered workflow_observe.
 * No capability is granted, so every node() is refused at dispatch after its label entered the projection; the script catches
 * each refusal so one run carries a page. Nothing stubs a producer or decides an outcome.
 */
async function throughRegisteredTools(labels: readonly string[]): Promise<ReadonlyMap<string, Reading>> {
  if (new Set(labels).size !== labels.length) throw new Error("public-entry labels must be unique");
  const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:observe"] } } });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context: ExtensionContext = ctx({ cwd: sandbox.dir });
    await booted.lifecycle.get("session_start")?.({}, context);
    const launch: RegisteredTool | undefined = booted.tools.get("SubagentWorkflow");
    const observe: RegisteredTool | undefined = booted.tools.get("workflow_observe");
    if (launch === undefined || observe === undefined) throw new Error("SubagentWorkflow and workflow_observe must both be registered");
    const shown = new Map<string, Reading>();
    for (let start = 0; start < labels.length; start += PAGE) {
      const page = labels.slice(start, start + PAGE);
      const script = `export const meta={name:"wb-zo9-site-25",description:"public-entry label corpus"}; for (const label of ${JSON.stringify(page)}) { try { await node("forge.gate.status", {}, { label }); } catch {} }`;
      const launched = await launch.execute(`wb-zo9-${start}`, { script }, undefined, undefined, context);
      const taskId = record(launched.details)?.taskId;
      if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
      const reply = await settledReply(observe, context, taskId, page.length);
      if (reply.status !== "completed") throw new Error(`a page run ended ${String(reply.status)}, not completed`);
      const nodes = nodeReadings(reply, taskId);
      if (nodes.length !== page.length || new Set(nodes.map(node => node.call)).size !== page.length) {
        throw new Error(`workflow_observe showed ${nodes.length} node labels of ${page.length}`);
      }
      for (const [index, node] of nodes.entries()) shown.set(page[index], node);
    }
    return shown;
  } finally {
    sandbox.restore();
  }
}

let publicEntry: Promise<ReadonlyMap<string, Reading>> | undefined;
/** One measurement for every case below, taken by whichever case runs first. */
const readings = (): Promise<ReadonlyMap<string, Reading>> => {
  publicEntry ??= throughRegisteredTools(LABELS);
  return publicEntry;
};

/** Names only: which probes show a secret, or keep an unsafe code point, on the real path. The text itself is never printed. */
function failures(probes: readonly Probe[], shown: ReadonlyMap<string, Reading>): string[] {
  const failed: string[] = [];
  for (const probe of probes) {
    const observed = shown.get(probe.raw);
    if (observed === undefined) {
      failed.push(`${probe.id}: not observed`);
      continue;
    }
    if (observed.texts.some(text => probe.secrets.some(secret => text.includes(secret)))) failed.push(`${probe.id}: leaked`);
    if (observed.texts.some(text => UNSAFE_DISPLAY.test(text))) failed.push(`${probe.id}: kept an unsafe code point`);
  }
  return failed;
}

function reading(shown: ReadonlyMap<string, Reading>, label: string): Reading {
  const found = shown.get(label);
  if (found === undefined) throw new Error("a control label was not observed");
  return found;
}

describe("wb-zo9 site 25: the SubagentWorkflow ingest clamp through the REGISTERED workflow_observe (public entry point)", () => {
  it(
    "shows no half of any of the 32 split credentials the wb-752.9 gate F1 measured",
    async () => {
      expect(SPLIT).toHaveLength(32);
      expect(failures(SPLIT, await readings())).toEqual([]);
    },
    TIMEOUT,
  );

  it(
    "GATE-STEER1: neither reading of a gap is the producer's to pick (separating dual, planted markers, tie and mix)",
    async () => {
      expect(SEPARATING).toHaveLength(8);
      expect(failures([...SEPARATING, ...GATE_PROBES], await readings())).toEqual([]);
    },
    TIMEOUT,
  );

  it(
    "is live and non-vacuous: every label observed once with its refused dispatch; controls shown, redacted, bounded or placeholder-shown",
    async () => {
      const shown = await readings();
      expect(shown.size).toBe(LABELS.length);
      // Names only: the call positions whose dispatch was not the honest refusal.
      expect([...shown.values()].filter(observed => observed.statusText !== "error").map(observed => observed.call)).toEqual([]);
      expect(reading(shown, CONTROLS.plain).title).toBe(CONTROLS.plain);
      expect(reading(shown, CONTROLS.assignment).title).toBe(CONTROLS.assignment);
      const unsplit = reading(shown, CONTROLS.unsplit);
      expect(unsplit.texts.some(text => text.includes("UNSPLITCONTROLSECRET")), "unsplit password= control leaked").toBe(false);
      expect(unsplit.title === "password=[REDACTED]", "unsplit password= control is not the redacted assignment").toBe(true);
      // The label layout shows a control and an escape sequence as one space each.
      expect(reading(shown, CONTROLS.spaced).title).toBe("gap between words");
      // Over the clamp's 120: cut with the helper's visible marker.
      expect(reading(shown, CONTROLS.long).title).toBe(`${CONTROLS.long.slice(0, 100)} [truncated]`);
      // Text that sanitizes to nothing: the placeholder, since the projection refuses an empty title.
      expect(reading(shown, CONTROLS.invisibleOnly).title).toBe("unknown");
      expect(reading(shown, CONTROLS.controlOnly).title).toBe("unknown");
    },
    TIMEOUT,
  );

  it(
    "routes every label through the one helper's label layout at the clamp's bound, as the reply serializes it (routing pin)",
    async () => {
      const shown = await readings();
      const expected = (raw: string): unknown => record(JSON.parse(sanitizeWorkbenchJsonText({ title: sanitizeWorkbenchText(raw, 120, "label") || "unknown" })))?.title;
      const ids = new Map<string, string>([...PROBES.map(probe => [probe.raw, probe.id] as const), ...Object.entries(CONTROLS).map(([name, raw]) => [raw, `control ${name}`] as const)]);
      expect(LABELS.filter(label => reading(shown, label).title !== expected(label)).map(label => ids.get(label))).toEqual([]);
    },
    TIMEOUT,
  );
});
