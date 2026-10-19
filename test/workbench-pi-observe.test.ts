/**
 * wb-752.9 (W16-Bw/VC-4): the registered workflow_observe Pi tool adopts the wb-752.2 reply builder
 * (observeInvocation). Each case boots the REAL extension in claude mode and observes a deterministic
 * workflow through the registered tool, quoting the docs/workbench text it pins. No module is replaced:
 * the still-running node of B2 is an honest hang through a real seam (a blocking `furnace` executable
 * first on a test-scoped PATH, spawned by the real @furnace/sdk), and the F3 reader spy calls through.
 */
import { chmodSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { OBSERVE_MAX_LIMIT, OBSERVE_MAX_MAX_BYTES, OBSERVE_MIN_MAX_BYTES, type ObserveReply } from "../src/workbench/observe-query.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

/** The registered tool's reply: the task-level envelope beside the builder's ObserveReply. */
interface ObservedReply extends ObserveReply {
  readonly taskId: string;
  readonly status: string;
  readonly envelopeOmitted?: readonly string[];
}

const originalPath = process.env.PATH;
const scratch: string[] = [];
const releases: Array<() => void> = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  for (const release of releases.splice(0)) release();
  if (originalPath === undefined) delete process.env.PATH;
  else process.env.PATH = originalPath;
  sandbox?.restore();
  sandbox = undefined;
  removeScratch(...scratch.splice(0));
  vi.restoreAllMocks();
});

async function boot(rights: string[] = ["workbench:observe", "furnace:inspect"]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: rights } } });
  const pi = makePi(); subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context };
}

async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 600; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("workflow did not settle in the test window");
}

type Booted = Awaited<ReturnType<typeof boot>>;

/** Launch one script through the registered SubagentWorkflow and return its task id. */
async function launch(booted: Booted, script: string): Promise<string> {
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  return taskId;
}

/** Run `count` failing-but-journaled forge nodes (tone "failure", kind "native.node") to completion. */
async function runNodes(booted: Booted, count: number): Promise<string> {
  const script = `export const meta={name:"many",description:"local"}; for (let i=0;i<${count};i++) { try { await node("forge.gate.status",{}, {label:"n"+i}); } catch (e) {} }`;
  const id = await launch(booted, script);
  await waitFor(() => booted.pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(id)));
  return id;
}

async function observeText(booted: Booted, params: Record<string, unknown>): Promise<string> {
  const tool = booted.pi.tools.get("workflow_observe");
  return textOf(await tool.execute("o", params, undefined, undefined, booted.context as ExtensionContext));
}

async function observe(booted: Booted, params: Record<string, unknown>): Promise<ObservedReply> {
  return JSON.parse(await observeText(booted, params)) as ObservedReply;
}

/** Reads the run back until it leaves "running"; a run that never settles fails the case, never passes it. */
async function settledReply(booted: Booted, taskId: string): Promise<ObservedReply> {
  for (let i = 0; i < 600; i++) {
    const reply = await observe(booted, { taskId });
    if (reply.status !== "running") return reply;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}

/**
 * U1 (gate verdict 2026-10-16T14:44Z; owner ruling: "a blocking executable first on a test-scoped PATH is a real
 * seam; a factory is not"): a `furnace` executable first on a PATH scoped to the case, holding until the case
 * releases it. The real @furnace/sdk resolves and spawns it by name exactly as it spawns the installed CLI, so the
 * node it serves is honestly in flight; nothing replaces the SDK or answers for it. It marks that it was spawned
 * (the seam is measured live, not assumed) and holds while its hold file exists, so releasing the case, removing
 * the scratch directory, or its own bound of about 30 s (the SDK's inspect timeout) ends it. It then exits 75 with
 * no envelope, which the real SDK reports, and the run settles failed.
 */
function blockingFurnaceOnPath(): { readonly spawned: string; readonly release: () => void } {
  const dir = makeScratch("pi-observe-furnace-");
  scratch.push(dir);
  if (dir.includes("'")) throw new Error("the scratch directory must not contain a single quote");
  const spawned = join(dir, "spawned");
  const hold = join(dir, "hold");
  writeFileSync(hold, "");
  writeFileSync(join(dir, "furnace"), `#!/bin/sh
: > '${spawned}'
i=0
while [ -e '${hold}' ] && [ "$i" -lt 600 ]; do sleep 0.05; i=$((i + 1)); done
echo 'released by test/workbench-pi-observe.test.ts' >&2
exit 75
`);
  chmodSync(join(dir, "furnace"), 0o700);
  process.env.PATH = `${dir}${delimiter}${originalPath ?? ""}`;
  const release = (): void => rmSync(hold, { force: true });
  releases.push(release);
  return { spawned, release };
}

const cp = (code: number): string => String.fromCodePoint(code);
/** The wb-752.9 gate F1 gap classes, one unit each, every one built from its code point (seat rule F11). */
const GAPS: readonly (readonly [name: string, unit: string])[] = [
  ["U+FEFF", cp(0xfeff)],
  ["BEL", cp(0x07)],
  ["ESC[0m", `${cp(0x1b)}[0m`],
  ["U+200B", cp(0x200b)],
];
type Split = (gap: string, first: string, second: string) => string;
/** The four credential templates of the gate F1 corpus, each split by a gap inside its keyword and inside its value. */
const TEMPLATES: readonly (readonly [name: string, keyword: Split, value: Split])[] = [
  ["password=", (gap, a, b) => `pass${gap}word=${a}${b}`, (gap, a, b) => `password=${a}${gap}${b}`],
  ["Bearer", (gap, a, b) => `Bea${gap}rer ${a}${b}`, (gap, a, b) => `Bearer ${a}${gap}${b}`],
  ["sk-ant-", (gap, a, b) => `sk-${gap}ant-${a}${b}`, (gap, a, b) => `sk-ant-${a}${gap}${b}`],
  ["api_key:", (gap, a, b) => `api${gap}_key: ${a}${b}`, (gap, a, b) => `api_key: ${a}${gap}${b}`],
];
interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}
/** 4 templates x 4 gaps x 2 split positions: every half is unique, and either half visible is a leak. */
const SPLIT: readonly Probe[] = TEMPLATES.flatMap(([template, keyword, value], t) =>
  GAPS.flatMap(([gapName, gap], g) =>
    (
      [
        ["keyword", keyword],
        ["value", value],
      ] as const
    ).map(([position, shape], p) => {
      const first = `OBS${t}G${g}P${p}FIRSTHALF`;
      const second = `OBS${t}G${g}P${p}SECONDHALF`;
      return { id: `${template} split inside the ${position} by ${gapName}`, raw: shape(gap, first, second), secrets: [first, second] };
    }),
  ),
);
const DEFAULT_IGNORABLE = /\p{Default_Ignorable_Code_Point}/u;
/** True when display text keeps a C0/C1 control, a line or paragraph separator, or a default-ignorable unit. */
function keepsUnsafeUnit(text: string): boolean {
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (code < 0x20 || (code >= 0x7f && code <= 0x9f) || code === 0x2028 || code === 0x2029 || DEFAULT_IGNORABLE.test(char)) return true;
  }
  return false;
}

const TIMEOUT = 60_000;
/** The B3/F5 envelope sweep spans this many maxBytes up from the floor: several node widths of a 30-node page. */
const ENVELOPE_SWEEP_BYTES = 1_200;
/** Its step: narrower than either task envelope, so every slack window an envelope needs is sampled. */
const ENVELOPE_SWEEP_STEP = 7;

describe("workflow_observe adopts the workbench.observe/v1 reply builder (wb-752.9)", () => {
  it("B1/F1: cursor paging over a >limit workflow round-trips and the union of pages equals the window; a foreign or malformed cursor is refused typed", async () => {
    // docs/workbench/11-designer-and-operator.md § "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event window, aggregates, freshness, anomaly evidence."
    const booted = await boot();
    const id = await runNodes(booted, 25);
    const seen: string[] = [];
    let cursor: string | null = null;
    let pages = 0;
    do {
      const reply = await observe(booted, { taskId: id, limit: 10, ...(cursor === null ? {} : { cursor }) });
      expect(reply.contract).toBe("workbench.observe/v1");
      expect(reply.taskId).toBe(id);
      expect(reply.window.limit).toBe(10);
      for (const node of reply.nodes) seen.push(node.nativeRef.id);
      cursor = reply.window.nextCursor;
      pages += 1;
    } while (cursor !== null && pages < 10);
    expect(pages).toBe(3);
    expect(new Set(seen).size).toBe(25);
    expect(seen).toEqual(Array.from({ length: 25 }, (_unused, index) => `${id}:${index + 1}`));

    const first = await observe(booted, { taskId: id, limit: 10 });
    const other = await runNodes(booted, 12);
    const foreign = await observeText(booted, { taskId: other, limit: 10, cursor: first.window.nextCursor });
    expect(foreign).toMatch(/^Invalid observe request: /);
    expect(foreign).not.toMatch(/\bat .*\.ts:\d+/);
    expect(await observeText(booted, { taskId: id, cursor: "not-a-cursor" })).toMatch(/^Invalid observe request: /);
    expect(await observeText(booted, { taskId: id, cursor: "x".repeat(300) })).toMatch(/^Invalid observe request: /);
  }, TIMEOUT);

  it("F2: kind and tone selectors return only matching nodes and window.scanned explains the page", async () => {
    const booted = await boot();
    const id = await runNodes(booted, 8);
    const failure = await observe(booted, { taskId: id, limit: 5, selectors: { tone: "failure", kind: "native.node" } });
    expect(failure.nodes).toHaveLength(5);
    const none = await observe(booted, { taskId: id, limit: 5, selectors: { tone: "success" } });
    expect(none.nodes).toEqual([]);
    expect(none.window).toMatchObject({ scanned: 5, returned: 0, total: 8 });
    expect(none.window.nextCursor).toEqual(expect.any(String));
    const wrongKind = await observe(booted, { taskId: id, selectors: { kind: "workflow.group" } });
    expect(wrongKind.nodes).toEqual([]);
    expect(wrongKind.window.scanned).toBe(8);
  }, TIMEOUT);

  it("F3: selectors.relations counts relations reading at most one page per returned node", async () => {
    const booted = await boot();
    const id = await runNodes(booted, 6);
    const spy = vi.spyOn(ObservationProjection.prototype, "relations");
    const reply = await observe(booted, { taskId: id, limit: 4, selectors: { relations: true } });
    expect(reply.nodes).toHaveLength(4);
    expect(reply.relations?.perNode).toHaveLength(4);
    expect(reply.relations?.basis).toBe("returned-window-only");
    expect(spy).toHaveBeenCalledTimes(4);
    for (const [request] of spy.mock.calls) expect(request.limit).toBeLessThanOrEqual(40);
  }, TIMEOUT);

  it("B2/F4: a node left running reports last-known-running + stale in the freshness summary and no node is current", async () => {
    // docs/workbench/09-observation-and-provenance.md § "Freshness and ambiguity": "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance."
    const booted = await boot();
    const furnace = blockingFurnaceOnPath();
    const script = 'export const meta={name:"hang",description:"local"}; await node("furnace.run.inspect",{runId:"frn-run-r1"},{label:"hang"}); return 1;';
    const id = await launch(booted, script);
    try {
      // The real SDK spawned the stand-in and waits on it: the node is in flight, its outcome undecided.
      await waitFor(() => existsSync(furnace.spawned));
      let reply = await observe(booted, { taskId: id });
      for (let i = 0; i < 200 && reply.nodes.length === 0; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        reply = await observe(booted, { taskId: id });
      }
      expect(reply.status).toBe("running");
      expect(reply.nodes[0].presentation.statusTone).toBe("active");
      expect(reply.freshness.summary).toContain("last-known-running + stale");
      expect(reply.freshness.lastKnownRunningStale).toBe(1);
      expect(reply.freshness.current).toBe(0);
    } finally {
      furnace.release();
    }
    // Released, the stand-in exits 75 with no envelope: the real SDK reports that and the run leaves "running".
    const settled = await settledReply(booted, id);
    expect(settled.status).toBe("failed");
    expect(settled.nodes[0].presentation.statusTone).toBe("failure");
  }, TIMEOUT);

  it("B3/F5: the whole reply never exceeds the requested maxBytes; truncation is reported, never silent", async () => {
    // docs/workbench/15-implementation-program.md § "Independently assignable packages" W16 row: "compact bounded result and ACL".
    const booted = await boot();
    const id = await runNodes(booted, 30);
    const unbounded = await observeText(booted, { taskId: id, limit: 40 });
    expect(Buffer.byteLength(unbounded, "utf8")).toBeLessThanOrEqual(16_384);
    for (const maxBytes of [2_048, 4_096, 8_192]) {
      const text = await observeText(booted, { taskId: id, limit: 40, maxBytes });
      expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(maxBytes);
      const reply = JSON.parse(text) as ObservedReply;
      expect(reply.truncatedForBytes).toBe(true);
      expect(reply.droppedForBytes.nodes).toBeGreaterThan(0);
      expect(reply.window.nextCursor).toEqual(expect.any(String));
    }
    // At the schema floor the task envelope leaves under OBSERVE_MIN_MAX_BYTES for the reply: a typed refusal names the smallest maxBytes that fits, and that size is honored.
    const floor = await observeText(booted, { taskId: id, limit: 40, maxBytes: 1_024 });
    expect(Buffer.byteLength(floor, "utf8")).toBeLessThanOrEqual(1_024);
    const needed = Number(/at least (\d+) needed/.exec(floor)?.[1]);
    expect(floor).toMatch(/^Invalid observe request: maxBytes 1024 leaves under 1024 bytes/);
    expect(needed).toBeGreaterThan(1_024);
    const atFloor = await observeText(booted, { taskId: id, limit: 40, maxBytes: needed });
    expect(Buffer.byteLength(atFloor, "utf8")).toBeLessThanOrEqual(needed);
    expect(JSON.parse(atFloor)).toMatchObject({ contract: "workbench.observe/v1", truncatedForBytes: true, envelopeOmitted: expect.any(Array) });
    expect(await observeText(booted, { taskId: id, maxBytes: 512 })).toMatch(/^Invalid observe request: /);
    expect(await observeText(booted, { taskId: id, maxBytes: 70_000 })).toMatch(/^Invalid observe request: /);
  }, TIMEOUT);

  it("B3/F5 envelope exactness: from the floor the refusal names, every maxBytes answers within itself and never refuses, and once a size carries the full task envelope every larger size does (the builder is given maxBytes minus the measured envelope)", async () => {
    // The node-granular slack the builder leaves under its cap can hide an envelope the builder was never told about, so
    // the sweep steps more finely than either envelope across several node widths: every slack window is sampled.
    const booted = await boot();
    const id = await runNodes(booted, 30);
    const refusal = await observeText(booted, { taskId: id, limit: OBSERVE_MAX_LIMIT, maxBytes: OBSERVE_MIN_MAX_BYTES });
    const needed = Number(/at least (\d+) needed/.exec(refusal)?.[1]);
    expect(needed).toBeGreaterThan(OBSERVE_MIN_MAX_BYTES);
    const failures: string[] = [];
    let fullFrom: number | undefined;
    for (let maxBytes = needed; maxBytes < needed + ENVELOPE_SWEEP_BYTES; maxBytes += ENVELOPE_SWEEP_STEP) {
      const text = await observeText(booted, { taskId: id, limit: OBSERVE_MAX_LIMIT, maxBytes });
      const bytes = Buffer.byteLength(text, "utf8");
      if (bytes > maxBytes) failures.push(`${maxBytes}: ${bytes} bytes`);
      if (!text.startsWith("{")) {
        failures.push(`${maxBytes}: refused`);
        continue;
      }
      const full = (JSON.parse(text) as ObservedReply).envelopeOmitted === undefined;
      if (full && fullFrom === undefined) fullFrom = maxBytes;
      if (!full && fullFrom !== undefined) failures.push(`${maxBytes}: envelope omitted after ${fullFrom} carried it`);
    }
    expect(failures).toEqual([]);
    // Non-vacuous: the sweep starts in the omitted-envelope range and crosses into the full-envelope range.
    expect(fullFrom).toBeGreaterThan(needed);
    expect(fullFrom).toBeLessThan(needed + ENVELOPE_SWEEP_BYTES);
  }, TIMEOUT);

  it("F2 bound (gate 2026-10-16T14:44Z, folded by the owner ruling): a maxBytes outside OBSERVE_MIN_MAX_BYTES..OBSERVE_MAX_MAX_BYTES is refused typed before the task envelope is subtracted", async () => {
    // The gate measured 65537..66000 answered at execute: the envelope was subtracted first, so the builder never saw the out-of-range request.
    const booted = await boot();
    const id = await runNodes(booted, 3);
    const refusal = `Invalid observe request: maxBytes must be a safe integer ${OBSERVE_MIN_MAX_BYTES}..${OBSERVE_MAX_MAX_BYTES}.`;
    expect(OBSERVE_MAX_MAX_BYTES + 1).toBe(65_537);
    for (const maxBytes of [65_537, 66_000, OBSERVE_MIN_MAX_BYTES - 1, 4_096.5, "4096"]) expect(await observeText(booted, { taskId: id, maxBytes })).toBe(refusal);
    // The bound is inclusive: the schema maximum is answered within itself.
    const top = await observeText(booted, { taskId: id, maxBytes: OBSERVE_MAX_MAX_BYTES });
    expect(Buffer.byteLength(top, "utf8")).toBeLessThanOrEqual(OBSERVE_MAX_MAX_BYTES);
    expect(JSON.parse(top)).toMatchObject({ contract: "workbench.observe/v1", taskId: id, truncatedForBytes: false });
  }, TIMEOUT);

  it("C2: the typed refusal path (named text layout) shows no half of the gate F1 32-probe split-credential corpus; names only", async () => {
    // Display-path rule: the builder's validation reason reaches the tool text through sanitizeWorkbenchText(reason, WORKBENCH_TEXT_LIMIT, "text").
    // An unknown selectors field is the reason that echoes caller text, so each probe is sent as one.
    const booted = await boot();
    const id = await runNodes(booted, 1);
    const refusalFor = (field: string) => observeText(booted, { taskId: id, selectors: { [field]: true } });
    // Non-vacuous: the path shows an unknown field name, and redacts an unsplit credential sent the same way.
    const shown = await refusalFor("VISIBLECONTROLFIELD");
    expect(shown).toMatch(/^Invalid observe request: /);
    expect(shown).toContain("VISIBLECONTROLFIELD");
    const unsplit = await refusalFor("password=UNSPLITCONTROLSECRET");
    expect(unsplit).toMatch(/^Invalid observe request: /);
    expect(unsplit).not.toContain("UNSPLITCONTROLSECRET");
    expect(SPLIT).toHaveLength(32);
    const failures: string[] = [];
    for (const probe of SPLIT) {
      const text = await refusalFor(probe.raw);
      if (!text.startsWith("Invalid observe request: ")) failures.push(`${probe.id}: not refused typed`);
      if (probe.secrets.some(secret => text.includes(secret))) failures.push(`${probe.id}: leaked`);
      if (keepsUnsafeUnit(text)) failures.push(`${probe.id}: kept an unsafe code point`);
    }
    expect(failures).toEqual([]);
  }, TIMEOUT);

  it("B4/F6: the three legacy refusal texts are byte-identical and evaluated in today's order before any projection read", async () => {
    // docs/workbench/12-security.md § "Authorization design": "Separate discover, inspect, observe, invoke and control grants."
    const denied = await boot([]);
    expect(await observeText(denied, { taskId: "bogus", cursor: "x", selectors: { kind: "k" } })).toBe("Permission denied: workbench:observe grant required.");
    sandbox?.restore();
    const booted = await boot();
    expect(await observeText(booted, { taskId: "bogus", cursor: "x" })).toBe("Invalid workflow task ID.");
    expect(await observeText(booted, { taskId: "wf_abcdef123456", cursor: "x" })).toBe("Workflow unavailable in this local operator/session/workspace scope.");
    expect(await observeText(booted, { taskId: "wf_abcdef123456", limit: 41 })).toBe("Invalid observation limit (1..40).");
  }, TIMEOUT);

  it("B3/F7: no spelled 20, 40, 16384 or 256 literal in the registration; the bounds derive from the exported OBSERVE_* constants", () => {
    const source = readFileSync(join(__dirname, "..", "src", "index.ts"), "utf8");
    const start = source.indexOf('name: "workflow_observe"');
    const end = source.indexOf("createWorkflowReconcileTool({", start);
    expect(start).toBeGreaterThan(0);
    expect(end).toBeGreaterThan(start);
    const block = source.slice(start, end);
    // A bound spelled anywhere in the block counts, a range like "1..40" and a sentence-final "40." included; only a
    // decimal such as 0.40 is not a spelled bound.
    expect(block).not.toMatch(/(?<!\w)(?<!\d\.)(?:20|40|256|16_?384|1_?024|65_?536)(?!\w|\.\d)/);
    for (const name of ["OBSERVE_MAX_LIMIT", "OBSERVE_CURSOR_MAX_BYTES", "OBSERVE_MIN_MAX_BYTES", "OBSERVE_MAX_MAX_BYTES", "OBSERVE_DEFAULT_MAX_BYTES", "observeInvocation"]) expect(block).toContain(name);
  });
});
