/**
 * wb-021.5 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7, program-triage-2026-10-18): the instruments and the judged tables of
 * test/workbench-apo-rerender-census.test.ts, the rerender-authority census. The census file states the requirement, its
 * acceptance and what each table pins; this module holds the world every subject renders in, the judge that reads one
 * subject's renders, the syntactic type scan, the checker-based scans (a TypeScript program over src, or over planted
 * modules held in memory), the mention judge and the tables. ROWS digests every case as written for the out-of-file roster
 * (test/fixtures/apo-rerender-roster.json); RESIDUAL_FAMILIES names the residuals, each with its pinned quiet row.
 *
 * Display paths added: none (test-only; src is read and run, never edited). Scratch: none (every world and every planted
 * module is in memory).
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { inspect } from "node:util";
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import type { WorkflowDialog } from "../../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorView, initialInspectorState, layoutInspector } from "../../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../../src/ui/workflow-menu.js";
import { selectAttention } from "../../src/workbench/attention.js";
import { type CapabilityDescriptor, type CapabilityProvider, CapabilityRegistry, type InvocationContext, type JsonValue } from "../../src/workbench/capability-registry.js";
import { type EvidenceLoader, EvidenceStore } from "../../src/workbench/evidence-loader.js";
import { buildGraphView, createGraphViewBuilder } from "../../src/workbench/graph-view.js";
import { selectLatencyDecomposition } from "../../src/workbench/latency.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation, type RelationKind } from "../../src/workbench/observation.js";
import { observeInvocation } from "../../src/workbench/observe-query.js";
import { buildOperationsTelemetry } from "../../src/workbench/telemetry.js";
import { buildTimelineLanes } from "../../src/workbench/timeline.js";
import { selectLinkedTopology } from "../../src/workbench/topology-slice.js";
import { createWorkflowTask } from "../../src/workflow/task.js";

// ---------------------------------------------------------------------------------------------------------------------
// The world: one recorded projection, one registry, one evidence store and the host's action recorders.

export const SCOPE: ObservationScope = { workspace: "/workspace/rerender-census", principal: "local-operator:1000:rerender" };
export const RUN = "wf_rerendercensus1";
/** Renders per judged subject: the acceptance's "refresh N times", at N = 4. */
export const RENDERS = 4;
const T0 = "2026-10-27T06:00:00.000Z";
const NOW = "2026-10-27T06:00:30.000Z";
const GRANT = "census:rerender";
/** The projection's read cap and every page a subject reads, as src/index.ts builds the session projection (maxQuery 40). */
const PAGE = 40;
const COLUMNS = 48;
const WIDTH = 120;
const TALL = 40;

/** The projection's read members: each returns a copy and changes nothing. */
export const READ_MEMBERS = ["aggregate", "aggregateStats", "events", "identityRefusals", "indexOf", "query", "relationRevision", "relations", "relationsPage", "stats", "truncation", "window"] as const;
/** The projection's admission members: each admits a native event, snapshot, freshness or relation into it. */
export const ADMISSION_MEMBERS = ["disconnect", "ingest", "markStale", "reconnect", "refresh", "relate"] as const;
export type ReadMember = (typeof READ_MEMBERS)[number];
export type AdmissionMember = (typeof ADMISSION_MEMBERS)[number];
const READ = new Set<string>(READ_MEMBERS);
/** The registry's members that admit nothing: every other registry call a subject makes is an invocation attempt. */
const REGISTRY_READS = new Set(["admission", "catalogSnapshot", "discover", "effectClassOf"]);
/** The registry's declared effect classes; one fixture capability is registered per class. */
export const EFFECT_CLASSES = ["read", "write", "external", "unknown"] as const;
export type EffectClass = (typeof EFFECT_CLASSES)[number];
/** Each WorkflowDialogActions member (src/ui/workflow-dialog.ts) and the host effect the dialog seam performs for it. */
export const ACTION_EFFECTS = {
  onKill: "task:abort",
  onPause: "control:pause",
  onResume: "control:resume",
  onSkipAgent: "control:skip",
  onRetryAgent: "control:retry",
  onOpenAgent: "deps:viewAgentConversation",
} as const;
export type DialogAction = keyof typeof ACTION_EFFECTS;
export const INSPECTOR_VIEWS: readonly InspectorView[] = ["overview", "graph", "timeline", "details"];

const node = (provider: string, type: string, id: string): NativeRef => ({ provider, type, id });
export const REFS = {
  F: node("furnace", "operation", "F"),
  U: node("furnace", "operation", "U"),
  D: node("forge", "operation", "D"),
  O: node("forge", "operation", "O"),
  C: node("claude-agent-sdk", "session", "C"),
  H: node("hyperunix", "query", "H"),
} as const;
export type FixtureNode = keyof typeof REFS;
/** The projection's key for a fixture node (ObservationProjection's key shape: scope, provider, type, native scope, id). */
export const keyOf = (id: FixtureNode): string => {
  const ref: NativeRef = REFS[id];
  return JSON.stringify([SCOPE.workspace, SCOPE.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
};
const presentation = (title: string, statusTone: Presentation["statusTone"]): Presentation => ({ title, type: "sdk-operation", statusText: statusTone, statusTone });
const at = (seconds: number): string => new Date(Date.parse(T0) + seconds * 1000).toISOString();
/** The recorded observations: five snapshots, one event-only node, five typed relations (one of each kind, a cycle among them). */
const SNAPSHOTS: readonly { id: FixtureNode; title: string; tone: Presentation["statusTone"]; start: number; end?: number; evidence?: readonly string[] }[] = [
  { id: "F", title: "Furnace attempt F", tone: "active", start: 0, evidence: ["evidence://F/log", "evidence://F/receipt"] },
  { id: "U", title: "Upstream build U", tone: "success", start: 1, end: 3 },
  { id: "D", title: "Forge gate D", tone: "waiting", start: 2 },
  { id: "O", title: "Owning run O", tone: "success", start: 0, end: 9 },
  { id: "C", title: "Claude session C", tone: "failure", start: 4, end: 6 },
];
const RELATIONS: readonly { from: FixtureNode; to: FixtureNode; kind: RelationKind; confirmation?: string }[] = [
  { from: "U", to: "F", kind: "dependency" },
  { from: "F", to: "D", kind: "causation" },
  { from: "O", to: "F", kind: "ownership", confirmation: "forge:operation/O" },
  { from: "O", to: "C", kind: "grouping" },
  { from: "D", to: "U", kind: "hypothesis" },
];

export function recordedProjection(): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: PAGE });
  const applied = (verdict: string, what: string): void => {
    if (verdict !== "applied") throw new Error(`the recorded fixture was not admitted: ${what} read ${verdict}`);
  };
  for (const item of SNAPSHOTS) {
    applied(
      projection.refresh({
        source: REFS[item.id], scope: SCOPE, capturedAt: at(item.start), observedAt: at(item.start), kind: "fixture.snapshot",
        node: presentation(item.title, item.tone), trace: { invocationId: RUN },
        interval: item.end === undefined ? { startedAt: at(item.start) } : { startedAt: at(item.start), endedAt: at(item.end) },
        ...(item.evidence ? { evidenceRefs: item.evidence } : {}),
      }),
      `snapshot ${item.id}`,
    );
  }
  applied(
    projection.ingest({
      projectionEventId: "ev-H-1", source: REFS.H, scope: SCOPE, sourceSequence: 1, observedAt: at(5), kind: "hyperunix.query.answered",
      node: { presentation: presentation("HyperUnix query H", "success") }, trace: { invocationId: RUN }, interval: { startedAt: at(5), endedAt: at(7) },
    }),
    "event H",
  );
  for (const item of RELATIONS) {
    projection.relate({
      scope: SCOPE, from: REFS[item.from], to: REFS[item.to], kind: item.kind,
      // An ownership edge is the owner's own statement: its source is the owning node's provider, with the native confirmation.
      provenance: { source: item.confirmation ? REFS[item.from].provider : "recorded fixture", observedAt: T0, ...(item.confirmation ? { nativeConfirmationRef: item.confirmation } : {}) },
    });
  }
  return projection;
}

/** Everything the projection would show a reader, read on the real object: a write any surface makes moves it. */
export function stateDigest(raw: ObservationProjection): string {
  return JSON.stringify({
    stats: raw.stats(),
    aggregates: raw.aggregateStats(),
    topology: raw.relationRevision(),
    window: raw.window({ scope: SCOPE, invocationId: RUN, offset: 0, limit: 100 }),
    nodes: raw.query({ scope: SCOPE, limit: PAGE }),
    events: raw.events({ scope: SCOPE, limit: PAGE }),
    relations: raw.relations({ scope: SCOPE, limit: PAGE }),
    truncation: raw.truncation({ scope: SCOPE }),
    refusals: raw.identityRefusals({ scope: SCOPE, limit: PAGE }),
  });
}

interface WorldLog {
  /** Members called on the projection tap. */
  readonly called: string[];
  /** Properties written, defined or deleted through the projection tap. */
  readonly writes: string[];
  /** Registry calls other than its read members, as member:capability. */
  readonly attempts: string[];
  /** Provider calls, as capability:mode. */
  readonly provider: string[];
  /** Members called on the evidence store tap. */
  readonly evidence: string[];
  /** Host effects: the dialog seam's actions and notices. */
  readonly host: string[];
  /** A channel no detector reads (R-SIDE-CHANNEL). */
  readonly untracked: string[];
}
export interface World {
  /** The recorded projection behind the recording tap: what every subject renders from. */
  readonly projection: ObservationProjection;
  /** The same projection without the tap: the state digest reads it, and a plant may write through it. */
  readonly raw: ObservationProjection;
  readonly registry: CapabilityRegistry;
  readonly evidence: EvidenceStore;
  readonly record: (effect: string) => void;
  readonly log: WorldLog;
  readonly cleanups: (() => void)[];
  /** The raw registry, whose admission counts the judge reads. */
  readonly counts: CapabilityRegistry;
}

/** A recording proxy: each member call reaches `onCall` (name and arguments) and each write reaches `onWrite`, then runs on the target. */
function tap<T extends object>(target: T, onCall: (name: string, args: readonly unknown[]) => void, onWrite: (name: string) => void): T {
  return new Proxy(target, {
    get(object, property) {
      const value: unknown = Reflect.get(object, property, object);
      if (typeof value !== "function" || typeof property !== "string") return value;
      return (...args: unknown[]): unknown => {
        onCall(property, args);
        return Reflect.apply(value, object, args);
      };
    },
    set(object, property, value) {
      onWrite(String(property));
      return Reflect.set(object, property, value, object);
    },
    defineProperty(object, property, descriptor) {
      onWrite(String(property));
      return Reflect.defineProperty(object, property, descriptor);
    },
    deleteProperty(object, property) {
      onWrite(String(property));
      return Reflect.deleteProperty(object, property);
    },
  });
}

export const capabilityId = (effectClass: EffectClass): string => `census.rerender-${effectClass}`;
/** The host's grants for one call: the fixture permission, plus an inspect grant where a plant inspects. */
const invocationContext = (signal: AbortSignal = new AbortController().signal, extra: readonly string[] = []): InvocationContext => ({ grants: [GRANT, ...extra], signal });

function fixtureProvider(effectClass: EffectClass, log: string[]): CapabilityProvider {
  const descriptor: CapabilityDescriptor = {
    id: capabilityId(effectClass),
    version: "1.0.0",
    description: `rerender census fixture capability (${effectClass})`,
    inputSchema: { type: "object" },
    effectClass,
    permissions: [GRANT],
    supportedModes: ["invoke", "inspect"],
  };
  return {
    descriptor,
    invoke: async (): Promise<JsonValue> => {
      log.push(`${descriptor.id}:invoke`);
      return { ok: true };
    },
    inspect: async (): Promise<JsonValue> => {
      log.push(`${descriptor.id}:inspect`);
      return { ok: true };
    },
  };
}

export function createWorld(): World {
  const log: WorldLog = { called: [], writes: [], attempts: [], provider: [], evidence: [], host: [], untracked: [] };
  const raw = recordedProjection();
  const projection = tap(raw, name => log.called.push(name), name => log.writes.push(name));
  const counts = new CapabilityRegistry();
  for (const effectClass of EFFECT_CLASSES) counts.register(fixtureProvider(effectClass, log.provider));
  const registry = tap(
    counts,
    (name, args) => {
      if (!REGISTRY_READS.has(name)) log.attempts.push(`${name}:${String(args[0])}`);
    },
    name => log.attempts.push(`set:${name}`),
  );
  const loader: EvidenceLoader = {
    provider: "furnace",
    requiredGrant: GRANT,
    canLoad: evidenceRef => evidenceRef.startsWith("evidence://"),
    load: async request => {
      await registry.invoke(capabilityId("read"), { evidenceRef: request.evidenceRef }, invocationContext(request.signal));
      return { kind: "log", provider: "furnace", capturedAt: T0, bytes: 2, truncated: false, preview: ["ok"], freshness: "current" };
    },
  };
  const store = new EvidenceStore({ loaders: [loader], maxEntries: 8, maxBytes: 4096, timeoutMs: 5000, scope: SCOPE });
  const evidence = tap(store, name => log.evidence.push(name), name => log.evidence.push(`set:${name}`));
  return { projection, raw, registry, evidence, record: effect => log.host.push(effect), log, cleanups: [], counts };
}

// ---------------------------------------------------------------------------------------------------------------------
// The judge.

export type Draw = () => unknown;
export type Subject = (world: World) => Draw | Promise<Draw>;
export interface Reading {
  /** Admission members called through the tap, and set:<name> for each property written through it. */
  readonly admissions: readonly string[];
  /** The registry's own admission count (admitted plus refused) gained during the renders. */
  readonly admitted: number;
  /** Registry invocation attempts (attempt:<member>:<capability>) and provider calls (provider:<capability>:<mode>). */
  readonly invoked: readonly string[];
  /** Evidence store calls other than get (evidence.<member>) and host effects. */
  readonly effects: readonly string[];
  /** Every render encoded to the same JSON bytes and the same structure (encodeRender). */
  readonly identical: boolean;
  /** The projection's state digest moved. */
  readonly stateChanged: boolean;
}
export interface Judged {
  readonly reading: Reading;
  /** The read members the renders called, sorted: the subject's liveness. */
  readonly reads: readonly string[];
  /** The JSON bytes of the first render. */
  readonly first: string;
}
/** What every view refresh must read: nothing admitted, nothing invoked, no effect, the same bytes, the same state. */
export const QUIET: Reading = { admissions: [], admitted: 0, invoked: [], effects: [], identical: true, stateChanged: false };

const unique = (values: readonly string[]): string[] => [...new Set(values)].sort();
/** A render's JSON bytes; a value JSON cannot encode (a bigint, a cycle) reads as its error's name, never as a throw. */
function jsonBytes(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch (error) {
    return `<unserializable: ${error instanceof Error ? error.name : "thrown"}>`;
  }
}
/**
 * The structural encoding the identity reading compares beside the JSON bytes (node:util inspect): Map, Set and WeakMap
 * entries, symbol-keyed and non-enumerable properties, undefined fields, -0, NaN, bigints and class names are encoded,
 * depth and lengths unbounded; no getter is invoked and no custom inspect hook runs.
 */
const STRUCTURE = {
  showHidden: true, depth: Number.POSITIVE_INFINITY, maxArrayLength: Number.POSITIVE_INFINITY, maxStringLength: Number.POSITIVE_INFINITY,
  breakLength: Number.POSITIVE_INFINITY, compact: true, sorted: false, getters: false, customInspect: false,
} as const;
export interface Encoded {
  readonly json: string;
  readonly structure: string;
}
/** One render, encoded the two ways the identity reading compares. */
export const encodeRender = (value: unknown): Encoded => ({ json: jsonBytes(value), structure: inspect(value, STRUCTURE) });
const admittedTotal = (registry: CapabilityRegistry): number => {
  const admission = registry.admission();
  return admission.admitted + admission.refused;
};
/** Flushes microtasks and immediate callbacks three times: an effect a render starts synchronously is settled before reading. */
async function settle(): Promise<void> {
  for (let round = 0; round < 3; round++) await new Promise<void>(resolve => setImmediate(resolve));
}

/**
 * Prepares one subject in a fresh world, marks every log after preparation, renders it RENDERS times, settles, and reads
 * what the renders alone did. Two independent detectors read admission: the tap (a call or write through it) and the
 * state digest (a write by any route, the tap bypassed included).
 */
export async function judgeRerender(subject: Subject, renders: number = RENDERS): Promise<Judged> {
  const world = createWorld();
  try {
    const draw = await subject(world);
    await settle();
    const { log } = world;
    const mark = {
      called: log.called.length, writes: log.writes.length, attempts: log.attempts.length, provider: log.provider.length,
      evidence: log.evidence.length, host: log.host.length, admitted: admittedTotal(world.counts), digest: stateDigest(world.raw),
    };
    const outputs: Encoded[] = [];
    for (let index = 0; index < renders; index++) outputs.push(encodeRender(draw()));
    await settle();
    const called = log.called.slice(mark.called);
    const reading: Reading = {
      admissions: unique([...called.filter(name => !READ.has(name)), ...log.writes.slice(mark.writes).map(name => `set:${name}`)]),
      admitted: admittedTotal(world.counts) - mark.admitted,
      invoked: unique([...log.attempts.slice(mark.attempts).map(entry => `attempt:${entry}`), ...log.provider.slice(mark.provider).map(entry => `provider:${entry}`)]),
      effects: unique([...log.evidence.slice(mark.evidence).filter(name => name !== "get").map(name => `evidence.${name}`), ...log.host.slice(mark.host)]),
      identical: outputs.every(output => output.json === outputs[0]?.json && output.structure === outputs[0]?.structure),
      stateChanged: stateDigest(world.raw) !== mark.digest,
    };
    return { reading, reads: unique(called.filter(name => READ.has(name))), first: outputs[0]?.json ?? "" };
  } finally {
    for (const cleanup of world.cleanups.splice(0)) cleanup();
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The real surfaces.

export type SurfaceCase =
  | { readonly surface: "graph.build"; readonly focus?: FixtureNode }
  | { readonly surface: "graph.builder" }
  | { readonly surface: "timeline.lanes"; readonly zoom: number; readonly pan: number }
  | { readonly surface: "observe.invocation"; readonly relations: boolean; readonly events: number }
  | { readonly surface: "topology.slice"; readonly focus: FixtureNode }
  | { readonly surface: "attention.select"; readonly bottlenecks: number }
  | { readonly surface: "latency.decompose" }
  | { readonly surface: "telemetry.operations" }
  | { readonly surface: "inspector.layout"; readonly view: InspectorView }
  | { readonly surface: "dialog.redraw"; readonly view: InspectorView }
  | { readonly surface: "projection.read"; readonly member: ReadMember };

/** Calls one read member with fixed arguments over the recorded fixture. */
export function readMember(projection: ObservationProjection, member: ReadMember): unknown {
  switch (member) {
    case "aggregate":
      return projection.aggregate({ scope: SCOPE, key: keyOf("O") });
    case "aggregateStats":
      return projection.aggregateStats();
    case "events":
      return projection.events({ scope: SCOPE, limit: PAGE });
    case "identityRefusals":
      return projection.identityRefusals({ scope: SCOPE, limit: PAGE });
    case "indexOf":
      return projection.indexOf({ scope: SCOPE, invocationId: RUN, key: keyOf("U") });
    case "query":
      return projection.query({ scope: SCOPE, limit: PAGE });
    case "relationRevision":
      return projection.relationRevision();
    case "relations":
      return projection.relations({ scope: SCOPE, limit: PAGE });
    case "relationsPage":
      return projection.relationsPage({ scope: SCOPE, limit: PAGE });
    case "stats":
      return projection.stats();
    case "truncation":
      return projection.truncation({ scope: SCOPE, invocationId: RUN });
    case "window":
      return projection.window({ scope: SCOPE, invocationId: RUN, offset: 0, limit: PAGE });
  }
}

const graphRequest = (focus?: FixtureNode) => ({
  scope: SCOPE, invocationId: RUN, viewport: { offset: 0, limit: PAGE }, caps: { maxNodes: PAGE, relationLimit: PAGE }, ...(focus ? { focus: keyOf(focus) } : {}),
});
const timelineRequest = (zoom: number, pan: number) => ({ scope: SCOPE, invocationId: RUN, offset: 0, limit: PAGE, zoom, pan, columns: COLUMNS, relationLimit: PAGE });

/** The inspector model a host builds per redraw for one view, over the tapped projection and the tapped evidence store. */
function inspectorModel(world: World, view: InspectorView): InspectorModel {
  const base: InspectorModel = {
    projection: world.projection, scope: SCOPE, invocationId: RUN, title: "rerender census", status: "running", evidence: world.evidence,
    topology: item => selectLinkedTopology({ scope: SCOPE, relations: world.projection }, item.key, { relationPage: PAGE }),
  };
  if (view === "graph") return { ...base, graph: buildGraphView(world.projection, graphRequest()) };
  if (view === "timeline") return { ...base, timeline: buildTimelineLanes(world.projection, timelineRequest(1, 0)) };
  if (view === "overview") return { ...base, attention: selectAttention(world.projection, { scope: SCOPE, invocationId: RUN, now: NOW, limit: PAGE, bottlenecks: 5 }) };
  return base;
}

type DialogFactory = (tui: unknown, theme: unknown, keybindings: unknown, done: (result: undefined) => void) => WorkflowDialog;
/**
 * Opens the run through the real host seam (showWorkflowDialog, as /agents -> Workflows does) over the tapped projection and
 * evidence store, with every host action wired to a recorder, presses tab to reach `view`, and hands back the dialog's redraw.
 */
async function openDialog(world: World, view: InspectorView): Promise<Draw> {
  const task = createWorkflowTask({ id: RUN, script: "return 1;", meta: { name: "rerender census", description: "fixture run" } });
  task.observationScope = { ...SCOPE, sessionId: "session-rerender" };
  task.control = {
    pause: () => world.record(ACTION_EFFECTS.onPause),
    resume: () => world.record(ACTION_EFFECTS.onResume),
    isPaused: () => false,
    skip: () => {
      world.record(ACTION_EFFECTS.onSkipAgent);
      return true;
    },
    retry: () => {
      world.record(ACTION_EFFECTS.onRetryAgent);
      return true;
    },
  };
  task.abortController.signal.addEventListener("abort", () => world.record(ACTION_EFFECTS.onKill));
  const deps: WorkflowMenuDeps = {
    tasks: new Map(),
    observation: {
      projection: world.projection, scope: () => SCOPE, evidence: world.evidence, relationPage: PAGE, timelineColumns: COLUMNS,
      attention: { now: () => NOW, bottlenecks: 5 },
    },
    getRecord: () => undefined,
    viewAgentConversation: async () => world.record(ACTION_EFFECTS.onOpenAgent),
    viewClaudeTranscript: async () => world.record("deps:viewClaudeTranscript"),
    getCtx: () => undefined,
  };
  let opened: (dialog: WorkflowDialog) => void = () => undefined;
  const ready = new Promise<WorkflowDialog>(resolve => {
    opened = resolve;
  });
  const tui = { requestRender: () => undefined, terminal: { columns: WIDTH, rows: TALL } };
  const theme = { fg: (_color: string, text: string) => text, bold: (text: string) => text };
  const ui = {
    notify: () => world.record("ui:notify"),
    custom: (factory: DialogFactory): Promise<undefined> =>
      new Promise<undefined>(done => {
        opened(factory(tui, theme, undefined, done));
      }),
  };
  void showWorkflowDialog({ ui } as unknown as ExtensionCommandContext, task, deps);
  const dialog = await ready;
  world.cleanups.push(() => dialog.dispose());
  for (let index = 0; index < INSPECTOR_VIEWS.indexOf(view); index++) dialog.handleInput("\t");
  return () => dialog.render(WIDTH);
}

export function surfaceSubject(item: SurfaceCase): Subject {
  switch (item.surface) {
    case "graph.build":
      return world => () => buildGraphView(world.projection, graphRequest(item.focus));
    case "graph.builder":
      return world => {
        const builder = createGraphViewBuilder(world.projection);
        return () => builder.build(graphRequest());
      };
    case "timeline.lanes":
      return world => () => buildTimelineLanes(world.projection, timelineRequest(item.zoom, item.pan));
    case "observe.invocation":
      return world => () =>
        observeInvocation(world.projection, { scope: SCOPE, invocationId: RUN, selectors: { relations: item.relations, ...(item.events > 0 ? { events: { limit: item.events } } : {}) } });
    case "topology.slice":
      return world => () => selectLinkedTopology({ scope: SCOPE, relations: world.projection }, keyOf(item.focus), { relationPage: PAGE });
    case "attention.select":
      return world => () => selectAttention(world.projection, { scope: SCOPE, invocationId: RUN, now: NOW, limit: PAGE, bottlenecks: item.bottlenecks });
    case "latency.decompose":
      return world => () => selectLatencyDecomposition(world.projection, { scope: SCOPE, invocationId: RUN, limit: PAGE });
    case "telemetry.operations":
      return world => () => buildOperationsTelemetry(world.projection, { scope: SCOPE, invocationId: RUN, now: NOW, limit: PAGE });
    case "inspector.layout":
      return world => {
        const model = inspectorModel(world, item.view);
        const state = { ...initialInspectorState(), view: item.view };
        return () => layoutInspector(model, state, { width: WIDTH, rows: TALL, panes: true });
      };
    case "dialog.redraw":
      return world => openDialog(world, item.view);
    case "projection.read":
      return world => () => readMember(world.projection, item.member);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The plants: synthetic subjects in the same world, each judged by the same call as the real surfaces.

export type PlantCase =
  | { readonly plant: "admit"; readonly member: AdmissionMember }
  | { readonly plant: "assign" }
  | { readonly plant: "raw-write" }
  | { readonly plant: "invoke"; readonly effectClass: EffectClass }
  | { readonly plant: "inspect" }
  | { readonly plant: "invoke-unregistered" }
  | { readonly plant: "load-evidence" }
  | { readonly plant: "immediate-invoke" }
  | { readonly plant: "deferred-invoke" }
  | { readonly plant: "abort-evidence"; readonly all: boolean }
  | { readonly plant: "action"; readonly action: DialogAction }
  | { readonly plant: "side-channel" }
  | { readonly plant: "counter" }
  | { readonly plant: "reorder" }
  | { readonly plant: "random" }
  | { readonly plant: "late-drift" }
  | { readonly plant: "map-tick" }
  | { readonly plant: "set-tick" }
  | { readonly plant: "weak-tick" }
  | { readonly plant: "symbol-tick" }
  | { readonly plant: "hidden-tick" }
  | { readonly plant: "undefined-flip" }
  | { readonly plant: "negzero-flip" }
  | { readonly plant: "nan-flip" }
  | { readonly plant: "bigint-tick" }
  | { readonly plant: "class-swap" }
  | { readonly plant: "getter-state" }
  | { readonly plant: "closure-state" }
  | { readonly plant: "accessor-state" }
  | { readonly plant: "pure" }
  | { readonly plant: "read-window" }
  | { readonly plant: "read-all" };

const DRAWN = { drawn: "the same frame" };
/** Two empty frame classes: JSON reads both as {}, the structural encoding by their names. */
class LaneFrame {}
class RowFrame {}
/** A frame whose drift lives behind a prototype getter: neither encoding invokes it (R-OPAQUE-STATE). */
class CountingFrame {
  #frame = 0;
  get frame(): number {
    return this.#frame++;
  }
}
/** Calls one admission member with a fixed, admissible input. */
function admit(projection: ObservationProjection, member: AdmissionMember): void {
  switch (member) {
    case "disconnect":
      projection.disconnect("furnace");
      return;
    case "ingest":
      projection.ingest({ projectionEventId: "ev-H-plant", source: REFS.H, scope: SCOPE, sourceSequence: 2, observedAt: at(8), kind: "hyperunix.query.answered" });
      return;
    case "markStale":
      projection.markStale({ scope: SCOPE, ref: REFS.U });
      return;
    case "reconnect":
      projection.reconnect("furnace");
      return;
    case "refresh":
      projection.refresh({ source: REFS.D, scope: SCOPE, capturedAt: at(20), observedAt: at(20), node: presentation("Forge gate D", "failure"), trace: { invocationId: RUN } });
      return;
    case "relate":
      projection.relate({ scope: SCOPE, from: REFS.C, to: REFS.D, kind: "dependency", provenance: { source: "plant" } });
      return;
  }
}

const quietly = (pending: Promise<unknown>): void => {
  pending.catch(() => undefined);
};

export function plantSubject(item: PlantCase): Subject {
  switch (item.plant) {
    case "admit":
      return world => () => {
        admit(world.projection, item.member);
        return DRAWN;
      };
    case "assign":
      return world => () => {
        Reflect.set(world.projection, "censusPlant", true);
        return DRAWN;
      };
    case "raw-write":
      return world => () => {
        world.raw.markStale({ scope: SCOPE, ref: REFS.U });
        return DRAWN;
      };
    case "invoke":
      return world => () => {
        quietly(world.registry.invoke(capabilityId(item.effectClass), {}, invocationContext()));
        return DRAWN;
      };
    case "inspect":
      return world => () => {
        quietly(world.registry.inspect(capabilityId("read"), {}, invocationContext(undefined, [`inspect:${capabilityId("read")}`])));
        return DRAWN;
      };
    case "invoke-unregistered":
      return world => () => {
        quietly(world.registry.invoke("census.rerender-absent", {}, invocationContext()));
        return DRAWN;
      };
    case "load-evidence":
      return world => () => {
        quietly(world.evidence.request(SCOPE, REFS.F, "evidence://F/log"));
        return DRAWN;
      };
    case "immediate-invoke":
      return world => () => {
        setImmediate(() => quietly(world.registry.invoke(capabilityId("write"), {}, invocationContext())));
        return DRAWN;
      };
    case "deferred-invoke":
      return world => () => {
        const timer = setTimeout(() => quietly(world.registry.invoke(capabilityId("write"), {}, invocationContext())), 60_000);
        world.cleanups.push(() => clearTimeout(timer));
        return DRAWN;
      };
    case "abort-evidence":
      return world => () => {
        if (item.all) world.evidence.abortAll();
        else world.evidence.abort(SCOPE, REFS.F, "evidence://F/log");
        return DRAWN;
      };
    case "action":
      return world => () => {
        world.record(ACTION_EFFECTS[item.action]);
        return DRAWN;
      };
    case "side-channel":
      return world => () => {
        world.log.untracked.push("an effect no detector reads");
        return DRAWN;
      };
    case "counter":
      return () => {
        let frame = 0;
        return () => ({ frame: frame++ });
      };
    case "reorder":
      return () => {
        let frame = 0;
        return () => (frame++ % 2 === 0 ? { left: 1, right: 2 } : { right: 2, left: 1 });
      };
    case "random":
      return () => () => ({ token: Math.random() });
    case "late-drift":
      return () => {
        let frame = 0;
        return () => ({ frame: frame++ < RENDERS ? 0 : 1 });
      };
    case "map-tick":
      return () => {
        let frame = 0;
        return () => ({ ticks: new Map([["frame", frame++]]) });
      };
    case "set-tick":
      return () => {
        let frame = 0;
        return () => ({ ticks: new Set([frame++]) });
      };
    case "weak-tick":
      return () => {
        let frame = 0;
        const key = {};
        const ticks = new WeakMap<object, number>();
        return () => {
          ticks.set(key, frame++);
          return { ticks };
        };
      };
    case "symbol-tick":
      return () => {
        let frame = 0;
        return () => ({ [Symbol.for("rerender-census.frame")]: frame++ });
      };
    case "hidden-tick":
      return () => {
        let frame = 0;
        return () => Object.defineProperty({}, "frame", { value: frame++, enumerable: false });
      };
    case "undefined-flip":
      return () => {
        let frame = 0;
        return () => (frame++ % 2 === 0 ? { note: undefined } : {});
      };
    case "negzero-flip":
      return () => {
        let frame = 0;
        return () => ({ offset: frame++ % 2 === 0 ? -0 : 0 });
      };
    case "nan-flip":
      return () => {
        let frame = 0;
        return () => ({ ratio: frame++ % 2 === 0 ? Number.NaN : null });
      };
    case "bigint-tick":
      return () => {
        let frame = 0;
        return () => ({ sequence: BigInt(frame++) });
      };
    case "class-swap":
      return () => {
        let frame = 0;
        return () => (frame++ % 2 === 0 ? new LaneFrame() : new RowFrame());
      };
    case "getter-state":
      return () => {
        const frame = new CountingFrame();
        return () => frame;
      };
    case "closure-state":
      return () => {
        let frame = 0;
        const next = (): number => frame++;
        return () => {
          next();
          return { next };
        };
      };
    case "accessor-state":
      return () => {
        let frame = 0;
        const view = Object.defineProperty({}, "frame", { get: () => frame++, enumerable: false });
        return () => view;
      };
    case "pure":
      return () => () => DRAWN;
    case "read-window":
      return world => () => readMember(world.projection, "window");
    case "read-all":
      return world => () => READ_MEMBERS.map(member => readMember(world.projection, member));
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The syntactic scans: the type half (typed readers) and the class property scan.

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}
const typeNameText = (name: ts.EntityName): string => (ts.isIdentifier(name) ? name.text : name.right.text);
/** The string-literal members of a key type (one literal or a union of them), or undefined when any member is not one. */
function literalKeys(node: ts.TypeNode): string[] | undefined {
  const parts = ts.isUnionTypeNode(node) ? node.types : [node];
  const keys: string[] = [];
  for (const part of parts) {
    if (!ts.isLiteralTypeNode(part) || !ts.isStringLiteral(part.literal)) return undefined;
    keys.push(part.literal.text);
  }
  return keys;
}
const PROJECTION_MEMBERS: readonly string[] = [...READ_MEMBERS, ...ADMISSION_MEMBERS];
const CLASS_NAME = "ObservationProjection";
/** Utility types whose result is a member's statement or result type, never the member: an indexed access inside one keeps nothing. */
const DATA_EXTRACTORS: ReadonlySet<string> = new Set(["Parameters", "ReturnType"]);
/** True when a type node is the projection class: by name, through parentheses or an import type, or as a member of an intersection or a union. */
function isClassType(node: ts.TypeNode): boolean {
  if (ts.isParenthesizedTypeNode(node)) return isClassType(node.type);
  if (ts.isTypeReferenceNode(node)) return typeNameText(node.typeName) === CLASS_NAME;
  if (ts.isImportTypeNode(node)) return node.qualifier !== undefined && typeNameText(node.qualifier) === CLASS_NAME;
  if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) return node.types.some(isClassType);
  return false;
}
/** The utility a type reference or a heritage clause names (Pick, Omit, ...), or undefined for any other node. */
function utilityOf(node: ts.Node): string | undefined {
  if (ts.isTypeReferenceNode(node)) return typeNameText(node.typeName);
  if (ts.isExpressionWithTypeArguments(node)) {
    if (ts.isIdentifier(node.expression)) return node.expression.text;
    if (ts.isPropertyAccessExpression(node.expression)) return node.expression.name.text;
  }
  return undefined;
}

export interface ReaderScan {
  /** Each typed reader over the class, as the members it keeps (sorted, comma-joined; <unresolved> when its keys are not literals). */
  readonly readers: readonly string[];
  /** Kept members that are not read members, sorted and unique. */
  readonly writers: readonly string[];
}
/**
 * Reads every typed reader over ObservationProjection in a module by the TypeScript AST: a Pick or an Omit, as a type
 * reference or in a heritage clause, whose target is the class (by name, through parentheses or an import type, or inside an
 * intersection or a union), and an indexed access into the class, except as the argument of Parameters or ReturnType (a
 * member's statement or result type keeps no member). Keys that are not string literals fail closed as <unresolved>.
 */
export function scanReaders(fileName: string, text: string): ReaderScan {
  const readers: string[] = [];
  const writers: string[] = [];
  const keep = (kept: readonly string[]): void => {
    readers.push([...kept].sort().join(","));
    writers.push(...kept.filter(member => !READ.has(member)));
  };
  const visit = (current: ts.Node): void => {
    const utility = utilityOf(current);
    if ((utility === "Pick" || utility === "Omit") && (ts.isTypeReferenceNode(current) || ts.isExpressionWithTypeArguments(current))) {
      const [target, keysNode] = current.typeArguments ?? [];
      if (target && keysNode && isClassType(target)) {
        const keys = literalKeys(keysNode);
        keep(keys === undefined ? ["<unresolved>"] : utility === "Pick" ? keys : PROJECTION_MEMBERS.filter(member => !keys.includes(member)));
      }
    }
    if (ts.isIndexedAccessTypeNode(current) && isClassType(current.objectType)) {
      const parent = current.parent;
      const extracted = ts.isTypeReferenceNode(parent) && DATA_EXTRACTORS.has(typeNameText(parent.typeName)) && parent.typeArguments?.[0] === current;
      if (!extracted) keep(literalKeys(current.indexType) ?? ["<unresolved>"]);
    }
    ts.forEachChild(current, visit);
  };
  visit(parse(fileName, text));
  return { readers, writers: unique(writers) };
}

/** The string literals of one property's union type inside an interface (CapabilityDescriptor.effectClass and the like); any other shape reads none. */
export function propertyLiterals(fileName: string, text: string, interfaceName: string, property: string): string[] {
  const source = parse(fileName, text);
  for (const statement of source.statements) {
    if (!ts.isInterfaceDeclaration(statement) || statement.name.text !== interfaceName) continue;
    for (const member of statement.members) {
      if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name) && member.name.text === property && member.type) return literalKeys(member.type) ?? [];
    }
  }
  return [];
}

// ---------------------------------------------------------------------------------------------------------------------
// The checker-based scans: a TypeScript program over src modules (or over planted modules held in memory).

/** The repository's compiler options (tsconfig.json), emit off. */
function compilerOptions(root: string): ts.CompilerOptions {
  const config = ts.readConfigFile(join(root, "tsconfig.json"), ts.sys.readFile);
  if (config.error) throw new Error(`tsconfig.json: ${ts.flattenDiagnosticMessageText(config.error.messageText, " ")}`);
  return { ...ts.parseJsonConfigFileContent(config.config, ts.sys, root).options, noEmit: true };
}
/** Parsed files shared by every program this module builds: lib files and real modules parse once per test file. */
const SOURCES = new Map<string, ts.SourceFile>();
/**
 * A program over repo-relative modules plus planted modules (repo-relative path to text) that exist only in memory: the
 * host serves each plant and never writes one to disk, and a plant path that exists on disk is refused.
 */
export function sourceProgram(root: string, modules: readonly string[], plants: Readonly<Record<string, string>> = {}): ts.Program {
  const options = compilerOptions(root);
  const planted = new Map<string, string>();
  for (const [rel, text] of Object.entries(plants)) {
    if (existsSync(join(root, rel))) throw new Error(`a planted module would shadow ${rel}`);
    planted.set(join(root, rel), text);
  }
  const host = ts.createCompilerHost(options, true);
  const parseFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion) => {
    const text = planted.get(fileName);
    if (text !== undefined) return ts.createSourceFile(fileName, text, languageVersion, true);
    const cached = SOURCES.get(fileName);
    if (cached) return cached;
    const parsed = parseFile(fileName, languageVersion);
    if (parsed) SOURCES.set(fileName, parsed);
    return parsed;
  };
  const exists = host.fileExists.bind(host);
  host.fileExists = fileName => planted.has(fileName) || exists(fileName);
  const readFile = host.readFile.bind(host);
  host.readFile = fileName => planted.get(fileName) ?? readFile(fileName);
  return ts.createProgram({ rootNames: [...modules.map(rel => join(root, rel)), ...planted.keys()], options, host });
}

/** How one module reaches the projection class, as the checker resolves its names. */
export interface Reach {
  /** It names the class: an import of any form, an alias, a re-export or a qualified name. */
  readonly names: boolean;
  /** Public class members it references in a value position: a call, an access, an element access, a destructuring (sorted). */
  readonly value: readonly string[];
  /** Public class members it references in a type position: an indexed access, a typeof query, a statement or result type (Parameters, ReturnType) (sorted). */
  readonly type: readonly string[];
  /**
   * Declarations that carry the projection, that it declares or references, by name (sorted): a property, variable,
   * parameter, getter, method or function whose type is the class, a reader whose every member is the class's, or a type
   * that yields one - a union or intersection member, a container's type argument or index signature, a function's result.
   */
  readonly holders: readonly string[];
}
/** A member is hidden when any of its declarations is private or protected (a #private name is hidden by its escaped name). */
const HIDDEN = ts.ModifierFlags.Private | ts.ModifierFlags.Protected;
/** The symbols a holder can be: a value (property, variable, parameter), an accessor, a method or a function. */
const HOLDER_FLAGS = ts.SymbolFlags.Property | ts.SymbolFlags.Variable | ts.SymbolFlags.Accessor | ts.SymbolFlags.Method | ts.SymbolFlags.Function;
function publicProperties(checker: ts.TypeChecker, type: ts.Type): ts.Symbol[] {
  return checker
    .getPropertiesOfType(type)
    .filter(property => !(property.declarations ?? []).some(item => (ts.getCombinedModifierFlags(item) & HIDDEN) !== 0) && !String(property.escapedName).startsWith("__#"));
}
function declarationOf<T extends ts.ClassDeclaration | ts.InterfaceDeclaration>(source: ts.SourceFile | undefined, test: (statement: ts.Statement) => statement is T, name: string): T | undefined {
  return source?.statements.find((statement): statement is T => test(statement) && statement.name?.text === name);
}
/**
 * Reads, for each given module, how it reaches the class declared in classModule (Reach); modules that reach nothing are
 * absent from the result, and the class's own module is never read. Names resolve through the checker, so an alias, a
 * namespace, a re-export chain and a render model, container, getter or function that carries the projection are all
 * followed, in value and type positions alike; a value whose type was erased (a cast from unknown, a structural type of the
 * module's own, Reflect, an any) is not (the R-ERASED-ACCESS residual).
 */
export function projectionReach(program: ts.Program, root: string, classModule: string, className: string, modules: readonly string[]): Map<string, Reach> {
  const checker = program.getTypeChecker();
  const declaration = declarationOf(program.getSourceFile(join(root, classModule)), ts.isClassDeclaration, className);
  const symbol = declaration?.name ? checker.getSymbolAtLocation(declaration.name) : undefined;
  if (!symbol) throw new Error(`no class ${className} in ${classModule}`);
  const instance = checker.getDeclaredTypeOfSymbol(symbol);
  const members = new Set<ts.Declaration>(publicProperties(checker, instance).flatMap(property => property.declarations ?? []));
  const isMember = (candidate: ts.Symbol): boolean => (candidate.declarations ?? []).some(item => members.has(item));
  const carries = (type: ts.Type, depth: number): boolean => {
    if (type === instance) return true;
    if (depth > 3) return false;
    if (type.isUnionOrIntersection()) return type.types.some(part => carries(part, depth + 1));
    if ((type.flags & ts.TypeFlags.Object) === 0) return false;
    const properties = type.getProperties();
    if (properties.length > 0 && properties.every(isMember)) return true;
    const object = type as ts.ObjectType;
    if ((object.objectFlags & ts.ObjectFlags.Reference) !== 0 && checker.getTypeArguments(object as ts.TypeReference).some(argument => carries(argument, depth + 1))) return true;
    if (checker.getIndexInfosOfType(type).some(info => carries(info.type, depth + 1))) return true;
    return type.getCallSignatures().some(signature => carries(signature.getReturnType(), depth + 1));
  };
  const holderOf = new Map<ts.Symbol, boolean>();
  const isHolder = (candidate: ts.Symbol): boolean => {
    const known = holderOf.get(candidate);
    if (known !== undefined) return known;
    const typed = (candidate.flags & HOLDER_FLAGS) !== 0 && carries(checker.getTypeOfSymbol(candidate), 0);
    holderOf.set(candidate, typed);
    return typed;
  };
  const result = new Map<string, Reach>();
  for (const rel of modules) {
    if (rel === classModule) continue;
    const source = program.getSourceFile(join(root, rel));
    if (!source) throw new Error(`the program holds no ${rel}`);
    let names = false;
    const value = new Set<string>();
    const type = new Set<string>();
    const holders = new Set<string>();
    const reference = (candidate: ts.Symbol | undefined, inType: boolean): void => {
      if (candidate && isMember(candidate)) (inType ? type : value).add(candidate.name);
    };
    const visit = (node: ts.Node, inType: boolean): void => {
      const typed = inType || ts.isTypeNode(node);
      if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        let resolved = checker.getSymbolAtLocation(node);
        if (resolved && (resolved.flags & ts.SymbolFlags.Alias) !== 0) resolved = checker.getAliasedSymbol(resolved);
        if (resolved === symbol) names = true;
        else if (resolved && isMember(resolved)) reference(resolved, typed);
        else if (resolved && isHolder(resolved)) holders.add(resolved.name);
        // A destructuring assignment target (({ stats } = projection), nested or in a for-of) names its property only through the checker's own lookup.
        if (
          ts.isIdentifier(node) &&
          (ts.isShorthandPropertyAssignment(node.parent) || ts.isPropertyAssignment(node.parent)) &&
          node.parent.name === node &&
          ts.isObjectLiteralExpression(node.parent.parent) &&
          isAssignmentPattern(node.parent.parent)
        ) {
          reference(checker.getPropertySymbolOfDestructuringAssignment(node), typed);
        }
      }
      // A binding element (const { stats } = projection) names the property of the pattern's type, not a symbol of its own.
      if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
        const key = node.propertyName ?? node.name;
        if (ts.isIdentifier(key) || ts.isStringLiteral(key)) reference(checker.getTypeAtLocation(node.parent).getProperty(key.text), typed);
      }
      ts.forEachChild(node, child => visit(child, typed));
    };
    visit(source, false);
    if (names || value.size > 0 || type.size > 0 || holders.size > 0) result.set(rel, { names, value: [...value].sort(), type: [...type].sort(), holders: [...holders].sort() });
  }
  return result;
}

/** True when an object or array literal is an assignment pattern: the left of an =, a for-of target, or nested inside one. */
function isAssignmentPattern(node: ts.Node): boolean {
  const parent = node.parent;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === node;
  if (ts.isForOfStatement(parent)) return parent.initializer === node;
  if (ts.isPropertyAssignment(parent)) return parent.initializer === node && isAssignmentPattern(parent.parent);
  if (ts.isArrayLiteralExpression(parent)) return isAssignmentPattern(parent);
  return false;
}
/** True when an import or an export declaration runs its module: a type-only one, or one whose every named binding is type-only, runs nothing. */
function runsModule(statement: ts.ImportDeclaration | ts.ExportDeclaration): boolean {
  if (ts.isImportDeclaration(statement)) {
    const clause = statement.importClause;
    if (!clause) return true;
    if (clause.isTypeOnly) return false;
    if (clause.name) return true;
    const bindings = clause.namedBindings;
    if (!bindings || ts.isNamespaceImport(bindings)) return true;
    return bindings.elements.length === 0 || bindings.elements.some(element => !element.isTypeOnly);
  }
  if (statement.isTypeOnly) return false;
  const clause = statement.exportClause;
  return !clause || ts.isNamespaceExport(clause) || clause.elements.length === 0 || clause.elements.some(element => !element.isTypeOnly);
}
/**
 * The src modules a set of root modules reaches, transitively, through imports and re-exports resolved by the compiler and
 * through literal dynamic import() calls: with types false only the edges that run a module (what executes when a root runs),
 * with types true every edge. Sorted, roots included.
 */
export function moduleClosure(program: ts.Program, root: string, roots: readonly string[], types: boolean): string[] {
  const options = program.getCompilerOptions();
  const prefix = `${join(root, "src")}/`;
  const seen = new Set<string>();
  const pending = [...roots];
  for (let rel = pending.pop(); rel !== undefined; rel = pending.pop()) {
    if (seen.has(rel)) continue;
    seen.add(rel);
    const fileName = join(root, rel);
    const source = program.getSourceFile(fileName);
    if (!source) throw new Error(`the program holds no ${rel}`);
    const specifiers: string[] = [];
    const visit = (node: ts.Node): void => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier) && (types || runsModule(node))) {
        specifiers.push(node.moduleSpecifier.text);
      }
      const [first] = ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword ? node.arguments : [];
      if (first && ts.isStringLiteralLike(first)) specifiers.push(first.text);
      ts.forEachChild(node, visit);
    };
    visit(source);
    for (const specifier of specifiers) {
      const resolved = ts.resolveModuleName(specifier, fileName, options, ts.sys).resolvedModule?.resolvedFileName;
      if (resolved?.startsWith(prefix) && !resolved.endsWith(".d.ts")) pending.push(resolved.slice(root.length + 1));
    }
  }
  return [...seen].sort();
}

/** A member's name as the checker reads it; a symbol-keyed member reads as its bracketed name ([Symbol.iterator]). */
function memberName(checker: ts.TypeChecker, property: ts.Symbol): string {
  return String(property.escapedName).startsWith("__@") ? checker.symbolToString(property) : property.name;
}
/** The signatures a type carries that are no named member, each failing closed as its own marker. */
function signatureMarkers(checker: ts.TypeChecker, type: ts.Type): string[] {
  return [
    ...(checker.getIndexInfosOfType(type).length > 0 ? ["<index-signature>"] : []),
    ...(type.getCallSignatures().length > 0 ? ["<call-signature>"] : []),
    ...(type.getConstructSignatures().length > 0 ? ["<construct-signature>"] : []),
  ];
}
function membersOf(program: ts.Program, symbol: ts.Symbol | undefined, missing: string): string[] {
  if (!symbol) return [missing];
  const checker = program.getTypeChecker();
  const type = checker.getDeclaredTypeOfSymbol(symbol);
  return [...publicProperties(checker, type).map(property => memberName(checker, property)), ...signatureMarkers(checker, type)].sort();
}
/**
 * The public instance members of a class, as the checker reads it (sorted): methods, properties (arrow functions and
 * fields), accessors and parameter properties under any name form (an identifier, a string or numeric literal, a computed
 * literal, template or constant, a symbol), inherited, merged and augmented members included; private, protected, #private
 * and static members and the constructor excluded; an index signature fails closed as <index-signature>.
 */
export function classMembers(program: ts.Program, root: string, module: string, className: string): string[] {
  const declaration = declarationOf(program.getSourceFile(join(root, module)), ts.isClassDeclaration, className);
  return membersOf(program, declaration?.name ? program.getTypeChecker().getSymbolAtLocation(declaration.name) : undefined, `<no class ${className}>`);
}
/**
 * The members of an interface, as the checker reads it (sorted): every property and method signature under any name form,
 * inherited (extends) and merged declarations included; a call, a construct and an index signature each fail closed as a
 * marker (<call-signature>, <construct-signature>, <index-signature>).
 */
export function interfaceMembers(program: ts.Program, root: string, module: string, interfaceName: string): string[] {
  const declaration = declarationOf(program.getSourceFile(join(root, module)), ts.isInterfaceDeclaration, interfaceName);
  return membersOf(program, declaration ? program.getTypeChecker().getSymbolAtLocation(declaration.name) : undefined, `<no interface ${interfaceName}>`);
}

// ---------------------------------------------------------------------------------------------------------------------
// The mention judge.

/** A text's words: runs of letters and digits, split at a case change and at a letter-digit boundary, lower-cased. */
export function wordsOf(text: string): string[] {
  const runs = text.match(/[A-Za-z0-9]+/g) ?? [];
  return runs.flatMap(run => run.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[A-Za-z])(?=[0-9])|(?<=[0-9])(?=[A-Za-z])/).map(word => word.toLowerCase()));
}
/** The program's mentions in a text: its abbreviation as a word, or its slug's three words in order (adaptive; policy or policies; organization or organisation, either number). */
export function mentions(text: string): string[] {
  const words = wordsOf(text);
  const found: string[] = [];
  words.forEach((word, index) => {
    if (word === "apo") found.push("apo");
    const next = words[index + 1] ?? "";
    const last = words[index + 2] ?? "";
    if (word === "adaptive" && /^polic(?:y|ies)$/.test(next) && /^organi[sz]ations?$/.test(last)) found.push(`${word} ${next} ${last}`);
  });
  return found;
}

// ---------------------------------------------------------------------------------------------------------------------
// The judged tables.

export interface TableRow<C> {
  readonly id: string;
  readonly label: string;
  readonly cases: readonly C[];
}
export interface Table<C> {
  readonly name: string;
  /** Where the quote stands in the bead's export row: its title, or the owner filing (the notes' first two paragraphs). */
  readonly source: "title" | "filing";
  /** The bead's own words this table pins, verbatim, standing exactly once in its source. */
  readonly quote: string;
  readonly rows: readonly TableRow<C>[];
}
export interface SurfaceRow extends TableRow<SurfaceCase> {
  /** The src modules whose render the row judges (the dialog row: the host seam and the dialog it opens). */
  readonly modules: readonly string[];
}
export interface PlantItem {
  readonly subject: PlantCase;
  readonly expect: Reading;
}
export interface ReaderItem {
  readonly text: string;
  readonly expect: { readonly readers: number; readonly writers: readonly string[] };
}
export interface MentionItem {
  readonly text: string;
  readonly expect: readonly string[];
}

const view = (surface: "inspector.layout" | "dialog.redraw"): SurfaceCase[] => INSPECTOR_VIEWS.map(item => ({ surface, view: item }));
export const SURFACES: { readonly name: "SURFACES"; readonly source: "title"; readonly quote: string; readonly rows: readonly SurfaceRow[] } = {
  name: "SURFACES",
  source: "title",
  quote: "a Pi view refresh or observation re-projection",
  rows: [
    {
      id: "GRAPH-VIEW",
      modules: ["src/workbench/graph-view.ts"],
      label: "the graph-view model, built and rebuilt by its cached builder, reads quiet over N refreshes",
      cases: [{ surface: "graph.build" }, { surface: "graph.build", focus: "F" }, { surface: "graph.builder" }],
    },
    {
      id: "TIMELINE",
      modules: ["src/workbench/timeline.ts"],
      label: "the timeline lanes at two zoom and pan settings read quiet over N refreshes",
      cases: [
        { surface: "timeline.lanes", zoom: 1, pan: 0 },
        { surface: "timeline.lanes", zoom: 4, pan: 2 },
      ],
    },
    {
      id: "OBSERVE",
      modules: ["src/workbench/observe-query.ts"],
      label: "the model-facing observe reply, bare and with relations and events, reads quiet over N refreshes",
      cases: [
        { surface: "observe.invocation", relations: false, events: 0 },
        { surface: "observe.invocation", relations: true, events: 10 },
      ],
    },
    {
      id: "TOPOLOGY",
      modules: ["src/workbench/topology-slice.ts"],
      label: "the linked topology slice of two focused nodes reads quiet over N refreshes",
      cases: [
        { surface: "topology.slice", focus: "F" },
        { surface: "topology.slice", focus: "U" },
      ],
    },
    {
      id: "ATTENTION",
      modules: ["src/workbench/attention.ts"],
      label: "the attention report at two bottleneck caps reads quiet over N refreshes",
      cases: [
        { surface: "attention.select", bottlenecks: 5 },
        { surface: "attention.select", bottlenecks: 1 },
      ],
    },
    { id: "LATENCY", modules: ["src/workbench/latency.ts"], label: "the latency decomposition reads quiet over N refreshes", cases: [{ surface: "latency.decompose" }] },
    { id: "TELEMETRY", modules: ["src/workbench/telemetry.ts"], label: "the operations telemetry report reads quiet over N refreshes", cases: [{ surface: "telemetry.operations" }] },
    { id: "INSPECTOR", modules: ["src/ui/workflow-inspector.ts"], label: "the inspector layout of each of the four views reads quiet over N redraws", cases: view("inspector.layout") },
    {
      id: "DIALOG",
      modules: ["src/ui/workflow-menu.ts", "src/ui/workflow-dialog.ts"],
      label: "the real host seam's dialog redraw of each of the four views, its per-redraw model builders included, reads quiet over N redraws",
      cases: view("dialog.redraw"),
    },
    {
      id: "REPROJECTION",
      modules: ["src/workbench/observation.ts"],
      label: "each read member of the projection itself reads quiet over N re-projections",
      cases: READ_MEMBERS.map(member => ({ surface: "projection.read", member })),
    },
  ],
};

const reading = (patch: Partial<Reading>): Reading => ({ ...QUIET, ...patch });
const admitted = (member: AdmissionMember, stateChanged: boolean): PlantItem => ({ subject: { plant: "admit", member }, expect: reading({ admissions: [member], stateChanged }) });
const invocation = (effectClass: EffectClass): PlantItem => ({
  subject: { plant: "invoke", effectClass },
  expect: reading({ admitted: RENDERS, invoked: [`attempt:invoke:${capabilityId(effectClass)}`, `provider:${capabilityId(effectClass)}:invoke`] }),
});
const action = (name: DialogAction): PlantItem => ({ subject: { plant: "action", action: name }, expect: reading({ effects: [ACTION_EFFECTS[name]] }) });

export const ADMISSION: Table<PlantItem> = {
  name: "ADMISSION",
  source: "title",
  quote: "re-rendering recorded observations issues no event admission",
  rows: [
    {
      id: "EVERY-ADMISSION-MEMBER",
      label: "a render that calls any admission member of the projection is read by the tap and by the state digest",
      cases: [admitted("disconnect", true), admitted("ingest", true), admitted("markStale", true), admitted("reconnect", true), admitted("refresh", true), admitted("relate", true)],
    },
    {
      id: "WRITE-ANY-ROUTE",
      label: "a property written through the tap, and a write that bypasses the tap, are each read",
      cases: [
        { subject: { plant: "assign" }, expect: reading({ admissions: ["set:censusPlant"] }) },
        { subject: { plant: "raw-write" }, expect: reading({ stateChanged: true }) },
      ],
    },
  ],
};

export const INVOCATION: Table<PlantItem> = {
  name: "INVOCATION",
  source: "title",
  quote: "and no invocation",
  rows: [
    {
      id: "EVERY-EFFECT-CLASS",
      label: "a render that invokes a capability of any effect class is read as an attempt, a provider call and a registry admission",
      cases: EFFECT_CLASSES.map(invocation),
    },
    {
      id: "OTHER-ROUTES",
      label: "an inspect, an invoke of an unregistered capability, an evidence load and an invoke deferred to the next immediate, each started by a render, are read",
      cases: [
        {
          subject: { plant: "inspect" },
          expect: reading({ admitted: RENDERS, invoked: [`attempt:inspect:${capabilityId("read")}`, `provider:${capabilityId("read")}:inspect`] }),
        },
        { subject: { plant: "invoke-unregistered" }, expect: reading({ invoked: ["attempt:invoke:census.rerender-absent"] }) },
        {
          subject: { plant: "load-evidence" },
          expect: reading({ admitted: 1, invoked: [`attempt:invoke:${capabilityId("read")}`, `provider:${capabilityId("read")}:invoke`], effects: ["evidence.request"] }),
        },
        {
          subject: { plant: "immediate-invoke" },
          expect: reading({ admitted: RENDERS, invoked: [`attempt:invoke:${capabilityId("write")}`, `provider:${capabilityId("write")}:invoke`] }),
        },
      ],
    },
    {
      id: "R-DEFERRED-EFFECT",
      label: "residual: an invocation a render schedules past the judge's settle window reads quiet",
      cases: [{ subject: { plant: "deferred-invoke" }, expect: QUIET }],
    },
  ],
};

export const EFFECT: Table<PlantItem> = {
  name: "EFFECT",
  source: "title",
  quote: "shall never be treated as authorization to trigger a decision or effect",
  rows: [
    {
      id: "EVERY-DIALOG-ACTION",
      label: "a render that performs the host effect of any dialog action is read",
      cases: (Object.keys(ACTION_EFFECTS) as DialogAction[]).map(action),
    },
    {
      id: "EVIDENCE-ABORTS",
      label: "a render that aborts one evidence load or every load is read",
      cases: [
        { subject: { plant: "abort-evidence", all: false }, expect: reading({ effects: ["evidence.abort"] }) },
        { subject: { plant: "abort-evidence", all: true }, expect: reading({ effects: ["evidence.abortAll"] }) },
      ],
    },
    {
      id: "R-SIDE-CHANNEL",
      label: "residual: an effect through a channel the world does not hold reads quiet",
      cases: [{ subject: { plant: "side-channel" }, expect: QUIET }],
    },
  ],
};

export const IDENTITY: Table<PlantItem> = {
  name: "IDENTITY",
  source: "filing",
  quote: "and byte-identical projection reads",
  rows: [
    {
      id: "DRIFT-FOUND",
      label: "renders that carry a frame counter, reorder their keys or carry a random token are read as not byte-identical",
      cases: [
        { subject: { plant: "counter" }, expect: reading({ identical: false }) },
        { subject: { plant: "reorder" }, expect: reading({ identical: false }) },
        { subject: { plant: "random" }, expect: reading({ identical: false }) },
      ],
    },
    {
      id: "HIDDEN-DRIFT",
      label:
        "renders whose drift JSON does not encode - a Map, a Set, a WeakMap, a symbol-keyed or non-enumerable counter, an undefined field that comes and goes, a -0, a NaN, a bigint counter, a swapped class - are read as not byte-identical",
      cases: (["map-tick", "set-tick", "weak-tick", "symbol-tick", "hidden-tick", "undefined-flip", "negzero-flip", "nan-flip", "bigint-tick", "class-swap"] as const).map(plant => ({
        subject: { plant },
        expect: reading({ identical: false }),
      })),
    },
    {
      id: "R-LATE-DRIFT",
      label: "residual: drift that first appears after N renders reads quiet",
      cases: [{ subject: { plant: "late-drift" }, expect: QUIET }],
    },
    {
      id: "R-OPAQUE-STATE",
      label: "residual: drift held where neither encoding reads - behind a getter neither invokes (a prototype accessor, a non-enumerable own accessor), in a closure's captured state - reads quiet",
      cases: [
        { subject: { plant: "getter-state" }, expect: QUIET },
        { subject: { plant: "closure-state" }, expect: QUIET },
        { subject: { plant: "accessor-state" }, expect: QUIET },
      ],
    },
  ],
};

export const QUIETS: Table<PlantItem> = {
  name: "QUIET",
  source: "filing",
  quote: "refresh N times yields zero invocations/admissions",
  rows: [
    {
      id: "READ-ONLY-RENDERS",
      label: "a constant render, a window read and a render that calls every read member read quiet",
      cases: [
        { subject: { plant: "pure" }, expect: QUIET },
        { subject: { plant: "read-window" }, expect: QUIET },
        { subject: { plant: "read-all" }, expect: QUIET },
      ],
    },
  ],
};

export const READERS: Table<ReaderItem> = {
  name: "READERS",
  source: "title",
  quote: "Rerender is not effect authorization",
  rows: [
    {
      id: "READ-ONLY-PICKS",
      label: "a typed reader that picks read members only, alone, partial or intersected, reads no writer",
      cases: [
        { text: 'type R = Pick<ObservationProjection, "window" | "relationsPage">;', expect: { readers: 1, writers: [] } },
        { text: 'interface D { projection: Pick<ObservationProjection, "query"> }', expect: { readers: 1, writers: [] } },
        { text: 'type R = Pick<ObservationProjection, "query"> & Partial<Pick<ObservationProjection, "relationsPage">>;', expect: { readers: 2, writers: [] } },
      ],
    },
    {
      id: "WRITER-PICKS",
      label: "a typed reader that keeps an admission member is read as a writer, through Partial, an interface or a qualified name",
      cases: [
        { text: 'type R = Pick<ObservationProjection, "query" | "ingest">;', expect: { readers: 1, writers: ["ingest"] } },
        { text: 'type R = Partial<Pick<ObservationProjection, "relate">>;', expect: { readers: 1, writers: ["relate"] } },
        { text: 'interface D { reader: Pick<ObservationProjection, "window" | "refresh"> }', expect: { readers: 1, writers: ["refresh"] } },
        { text: 'type R = Pick<observation.ObservationProjection, "markStale">;', expect: { readers: 1, writers: ["markStale"] } },
      ],
    },
    {
      id: "OMIT-AND-UNRESOLVED",
      label: "an Omit keeps every admission member it does not name, and keys that are not literals fail closed",
      cases: [
        { text: 'type R = Omit<ObservationProjection, "ingest">;', expect: { readers: 1, writers: ["disconnect", "markStale", "reconnect", "refresh", "relate"] } },
        { text: "type R = Pick<ObservationProjection, keyof Reads>;", expect: { readers: 1, writers: ["<unresolved>"] } },
        { text: "type R = Pick<ObservationProjection, Members>;", expect: { readers: 1, writers: ["<unresolved>"] } },
      ],
    },
    {
      id: "INDEXED-ACCESS",
      label:
        "an indexed access into the class keeps the members it names (an admission member read as a writer, a read member as a reader, a non-literal key closed), and a member's statement or result type (Parameters, ReturnType) keeps none",
      cases: [
        { text: 'type Sink = { admit: ObservationProjection["refresh"] };', expect: { readers: 1, writers: ["refresh"] } },
        { text: 'type Q = ObservationProjection["query" | "ingest"];', expect: { readers: 1, writers: ["ingest"] } },
        { text: 'type W = ObservationProjection["window"];', expect: { readers: 1, writers: [] } },
        { text: 'type S = Parameters<ObservationProjection["relate"]>[0]; type T = ReturnType<ObservationProjection["refresh"]>;', expect: { readers: 0, writers: [] } },
        { text: "type M = { [K in keyof ObservationProjection]: ObservationProjection[K] };", expect: { readers: 1, writers: ["<unresolved>"] } },
      ],
    },
    {
      id: "HERITAGE-AND-WRAPPED",
      label: "a Pick in a heritage clause, and a Pick over the class through parentheses, an import type or an intersection, are read",
      cases: [
        { text: 'interface Sink extends Pick<ObservationProjection, "relate"> {}', expect: { readers: 1, writers: ["relate"] } },
        { text: 'class Reader implements Pick<ObservationProjection, "query"> { query = (): never => { throw new Error("plant"); }; }', expect: { readers: 1, writers: [] } },
        { text: 'type R = Pick<(ObservationProjection), "ingest">;', expect: { readers: 1, writers: ["ingest"] } },
        { text: 'type R = Pick<import("./observation.js").ObservationProjection, "markStale">;', expect: { readers: 1, writers: ["markStale"] } },
        { text: 'type R = Pick<ObservationProjection & { extra: true }, "disconnect">;', expect: { readers: 1, writers: ["disconnect"] } },
      ],
    },
    {
      id: "R-FULL-TYPE",
      label: "residual: a parameter typed as the whole projection, or a typeof query over a value that holds it, is not a typed reader to this scan",
      cases: [
        { text: "function draw(projection: ObservationProjection): void {}", expect: { readers: 0, writers: [] } },
        { text: "declare const projection: ObservationProjection; type Admit = typeof projection.ingest;", expect: { readers: 0, writers: [] } },
      ],
    },
    {
      id: "R-ALIASED-CLASS",
      label: "residual: a Pick over an alias of the projection class, over its instance type, or through an alias of the utility is not read",
      cases: [
        { text: 'type P = ObservationProjection; type R = Pick<P, "ingest">;', expect: { readers: 0, writers: [] } },
        { text: 'type R = Pick<InstanceType<typeof ObservationProjection>, "ingest">;', expect: { readers: 0, writers: [] } },
        { text: 'type Keep<T, K extends keyof T> = Pick<T, K>; type R = Keep<ObservationProjection, "ingest">;', expect: { readers: 0, writers: [] } },
      ],
    },
  ],
};

export const ABSENCE: Table<MentionItem> = {
  name: "ABSENCE",
  source: "title",
  quote: "of APO/native state",
  rows: [
    {
      id: "MENTION-FOUND",
      label: "the abbreviation as a word, inside an identifier or before a digit, and the slug in any case or separator, are mentions",
      cases: [
        { text: "an APO view", expect: ["apo"] },
        { text: "renderApoGraph()", expect: ["apo"] },
        { text: "APO2 export", expect: ["apo"] },
        { text: "adaptive-policy-organizations-2026-10-18", expect: ["adaptive policy organizations"] },
        { text: "class AdaptivePolicyOrganization {}", expect: ["adaptive policy organization"] },
        { text: "adaptive_policies_organisations", expect: ["adaptive policies organisations"] },
      ],
    },
    {
      id: "NOT-MENTIONS",
      label: "words that only contain the letters, and the slug's words incomplete or out of order, are not mentions",
      cases: [
        { text: "apology, capo and apollo", expect: [] },
        { text: "an adaptive policy", expect: [] },
        { text: "organizations of adaptive policy", expect: [] },
      ],
    },
    {
      id: "R-PARAPHRASE",
      label: "residual: a paraphrase of the program and the abbreviation spelled with separators are not mentions",
      cases: [
        { text: "the policy organization that adapts", expect: [] },
        { text: "A.P.O.", expect: [] },
      ],
    },
  ],
};

export interface ReachItem {
  /** The planted modules (repo-relative path to text): held in memory, served by the plant program, never written to disk. */
  readonly plants: Readonly<Record<string, string>>;
  /** The planted module whose reach is read. */
  readonly module: string;
  /** Its reach as projectionReach reads it, or null where the scan reads it as reaching nothing. */
  readonly expect: Reach | null;
}
const reached = (names: boolean, value: readonly string[], type: readonly string[], holders: readonly string[]): Reach => ({ names, value, type, holders });
const reach = (module: string, text: string, expect: Reach | null, also: Readonly<Record<string, string>> = {}): ReachItem => ({ plants: { ...also, [module]: text }, module, expect });
const OBS_UI = 'import type { ObservationProjection } from "../workbench/observation.js";\n';
const MODEL = 'import type { InspectorModel } from "./workflow-inspector.js";\n';
export const REACH: Table<ReachItem> = {
  name: "REACH",
  source: "title",
  quote: "observation re-projection of APO/native state",
  rows: [
    {
      id: "IMPORT-FORMS",
      label: "a module that names the class through a namespace import, an aliased import, a re-export chain or a plain import reaches the projection",
      cases: [
        reach(
          "src/ui/census-reach-namespace.ts",
          'import type * as obs from "../workbench/observation.js";\nexport function laneCount(projection: obs.ObservationProjection, scope: obs.ObservationScope): number {\n  return projection.query({ scope, limit: 1 }).examined;\n}\n',
          reached(true, ["query"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-alias.ts",
          'import type { ObservationProjection as View } from "../workbench/observation.js";\nexport const revision = (view: View): number => view.relationRevision();\n',
          reached(true, ["relationRevision"], [], ["view"]),
        ),
        reach(
          "src/workbench/census-reach-consumer.ts",
          'import type { Projected } from "./census-reach-reexport.js";\nexport const edges = (projected: Projected): number => projected.stats().edges;\n',
          reached(true, ["stats"], [], ["projected"]),
          { "src/workbench/census-reach-reexport.ts": 'export type { ObservationProjection as Projected } from "./observation.js";\n' },
        ),
        reach(
          "src/workbench/census-reach-whole.ts",
          'import type { ObservationProjection } from "./observation.js";\nexport const nodes = (projection: ObservationProjection): number => projection.stats().nodes;\n',
          reached(true, ["stats"], [], ["projection"]),
        ),
      ],
    },
    {
      id: "RENDER-MODELS",
      label:
        "a module that never names the class but holds it through what carries it - a render model's member call, a pass-through, an optional chain, a call's result, a container (an array, a keyed map), a function or a getter that yields it - reaches the projection",
      cases: [
        reach("src/ui/census-reach-pane.ts", `${MODEL}export const paneRevision = (model: InspectorModel): number => model.projection.relationRevision();\n`, reached(false, ["relationRevision"], [], ["projection"])),
        reach("src/ui/census-reach-relay.ts", `${MODEL}export const relay = (model: InspectorModel) => model.projection;\n`, reached(false, [], [], ["projection", "relay"])),
        reach(
          "src/ui/census-reach-optional.ts",
          `${MODEL}export const latest = (model?: InspectorModel) => (model ? model.projection?.events({ scope: model.scope, limit: 1 }) : undefined);\n`,
          reached(false, ["events"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-result.ts",
          `${MODEL}const projectionOf = (model: InspectorModel) => model.projection;\nexport const examined = (model: InspectorModel): number => projectionOf(model).query({ scope: model.scope, limit: 1 }).examined;\n`,
          reached(false, ["query"], [], ["projection", "projectionOf"]),
        ),
        reach("src/ui/census-reach-container.ts", 'import type { Lanes } from "./census-reach-lanes.js";\nexport const relayViews = (lanes: Lanes) => lanes.views;\n', reached(false, [], [], ["relayViews", "views"]), {
          "src/ui/census-reach-lanes.ts": `${OBS_UI}export interface Lanes {\n  readonly views: readonly ObservationProjection[];\n}\n`,
        }),
        reach("src/ui/census-reach-keyed.ts", 'import type { Registry } from "./census-reach-registry.js";\nexport const relayRegistry = (registry: Registry) => registry.byRun;\n', reached(false, [], [], ["byRun", "relayRegistry"]), {
          "src/ui/census-reach-registry.ts": `${OBS_UI}export interface Registry {\n  readonly byRun: ReadonlyMap<string, ObservationProjection>;\n}\n`,
        }),
        reach("src/ui/census-reach-callable.ts", 'import type { Source } from "./census-reach-source.js";\nexport const relayCurrent = (source: Source) => source.current;\n', reached(false, [], [], ["current", "relayCurrent"]), {
          "src/ui/census-reach-source.ts": `${OBS_UI}export interface Source {\n  readonly current: () => ObservationProjection;\n}\n`,
        }),
        reach("src/ui/census-reach-getter.ts", 'import type { Lens } from "./census-reach-lens.js";\nexport const relayLens = (lens: Lens) => lens.current;\n', reached(false, [], [], ["current", "relayLens"]), {
          "src/ui/census-reach-lens.ts": `${OBS_UI}export class Lens {\n  constructor(private readonly source: ObservationProjection) {}\n  get current(): ObservationProjection {\n    return this.source;\n  }\n}\n`,
        }),
      ],
    },
    {
      id: "ACCESS-FORMS",
      label:
        "a destructured member (a binding or an assignment pattern), an element access, a typeof query, an indexed access and a member's statement or result type (Parameters, ReturnType) each reach the projection",
      cases: [
        reach("src/ui/census-reach-destructure.ts", `${OBS_UI}export function counts(projection: ObservationProjection): unknown {\n  const { stats } = projection;\n  return stats;\n}\n`, reached(true, ["stats"], [], ["projection"])),
        reach(
          "src/ui/census-reach-assign.ts",
          `${OBS_UI}export function revision(projection: ObservationProjection): unknown {\n  let relationRevision: unknown;\n  ({ relationRevision } = projection);\n  return relationRevision;\n}\n`,
          reached(true, ["relationRevision"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-element.ts",
          `${OBS_UI}export const forget = (projection: ObservationProjection, input: Parameters<ObservationProjection["markStale"]>[0]): void => projection["markStale"](input);\n`,
          reached(true, ["markStale"], ["markStale"], ["projection"]),
        ),
        reach("src/ui/census-reach-typeof.ts", `${OBS_UI}declare const projection: ObservationProjection;\nexport type Admit = typeof projection.ingest;\n`, reached(true, [], ["ingest"], ["projection"])),
        reach("src/ui/census-reach-indexed.ts", `${OBS_UI}export type Relate = ObservationProjection["relate"];\n`, reached(true, [], ["relate"], [])),
        reach(
          "src/ui/census-reach-statement.ts",
          `${OBS_UI}export type Statement = Parameters<ObservationProjection["relate"]>[0];\nexport type Verdict = ReturnType<ObservationProjection["refresh"]>;\n`,
          reached(true, [], ["refresh", "relate"], []),
        ),
      ],
    },
    {
      id: "R-ERASED-ACCESS",
      label: "residual: a module that reaches the projection only through an erased or structural type - a cast from unknown, a structural interface of its own, Reflect, an any - reads as reaching nothing",
      cases: [
        reach("src/ui/census-reach-cast.ts", "export const forget = (value: unknown): void => (value as { markStale(input: unknown): void }).markStale({});\n", null),
        reach("src/ui/census-reach-structural.ts", "interface Counts {\n  stats(): { nodes: number };\n}\nexport const nodes = (source: Counts): number => source.stats().nodes;\n", null),
        reach("src/ui/census-reach-reflect.ts", 'export const admit = (value: object): unknown => Reflect.get(value, "refresh");\n', null),
        reach("src/ui/census-reach-any.ts", "export const stale = (value: any): void => value.markStale({});\n", null),
      ],
    },
  ],
};

export interface NameItem {
  /** The planted modules (repo-relative path to text), held in memory like the REACH plants. */
  readonly plants: Readonly<Record<string, string>>;
  readonly module: string;
  /** Which reader judges the module: classMembers over ObservationProjection or interfaceMembers over WorkflowDialogActions. */
  readonly kind: "class" | "interface";
  readonly expect: readonly string[];
}
const NAMES_DIR = "src/workbench/census-names-";
const named = (id: string, kind: NameItem["kind"], text: string, expect: readonly string[], also: Readonly<Record<string, string>> = {}): NameItem => ({
  plants: { ...also, [`${NAMES_DIR}${id}.ts`]: text },
  module: `${NAMES_DIR}${id}.ts`,
  kind,
  expect,
});
const klass = (id: string, body: string, expect: readonly string[], before = "", heritage = ""): NameItem =>
  named(id, "class", `${before}export class ObservationProjection${heritage} {\n  query(): void {}\n${body}}\n`, expect);
const actions = (id: string, body: string, expect: readonly string[], before = "", heritage = ""): NameItem =>
  named(id, "interface", `${before}export interface WorkflowDialogActions${heritage} {\n  onKill?(): void;\n${body}}\n`, expect);
export const NAMES: Table<NameItem> = {
  name: "NAMES",
  source: "title",
  quote: "issues no event admission and no invocation",
  rows: [
    {
      id: "CLASS-NAME-FORMS",
      label: "a public member of the class is read under any name form - a string or numeric literal, a computed literal, template or constant, a symbol",
      cases: [
        klass("string", '  "rewind"(): void {}\n', ["query", "rewind"]),
        klass("numeric", "  0(): void {}\n", ["0", "query"]),
        klass("computed", '  ["rewind"](): void {}\n', ["query", "rewind"]),
        klass("template", "  [`rewind`](): void {}\n", ["query", "rewind"]),
        klass("constant", "  [KEY](): void {}\n", ["query", "rewind"], 'const KEY = "rewind";\n'),
        klass("symbol", "  [Symbol.iterator](): Iterator<number> {\n    return [0].values();\n  }\n", ["[Symbol.iterator]", "query"]),
      ],
    },
    {
      id: "CLASS-MEMBER-KINDS",
      label:
        "every public instance member kind is read - an arrow property, a field, an accessor pair, a parameter property, a merged, an inherited and an augmented member - private, protected, #private and static members are not, and an index signature fails closed",
      cases: [
        klass("hidden", "  private hidden(): void {}\n  protected guarded(): void {}\n  static make(): void {}\n  #secret(): void {}\n", ["query"]),
        klass("arrow", "  rewind = (): void => {};\n", ["query", "rewind"]),
        klass("field", "  revision = 0;\n", ["query", "revision"]),
        klass("accessors", "  get size(): number {\n    return 0;\n  }\n  set size(value: number) {\n    void value;\n  }\n", ["query", "size"]),
        klass("parameter", "  constructor(\n    public readonly limit: number,\n    private readonly hidden: number,\n  ) {\n    void this.hidden;\n  }\n", ["limit", "query"]),
        klass("merged", "", ["query", "rewind"], "export interface ObservationProjection {\n  rewind(): void;\n}\n"),
        klass("inherited", "", ["query", "rewind"], "class Base {\n  rewind(): void {}\n}\n", " extends Base"),
        named("augmented", "class", "export class ObservationProjection {\n  query(): void {}\n}\n", ["query", "rewind"], {
          [`${NAMES_DIR}augmented-patch.ts`]: 'declare module "./census-names-augmented.js" {\n  interface ObservationProjection {\n    rewind(): void;\n  }\n}\nexport {};\n',
        }),
        klass("index", "  [key: string]: unknown;\n", ["<index-signature>", "query"]),
      ],
    },
    {
      id: "INTERFACE-FORMS",
      label: "every member of the actions interface is read under any name form, inherited and merged members included, and a call, construct or index signature fails closed",
      cases: [
        actions("actions-base", "", ["onKill"]),
        actions("actions-string", '  "onArchive"?(): void;\n', ["onArchive", "onKill"]),
        actions("actions-property", '  "onArchive"?: () => void;\n', ["onArchive", "onKill"]),
        actions("actions-computed", '  ["onArchive"]?(): void;\n', ["onArchive", "onKill"]),
        actions("actions-numeric", "  0?(): void;\n", ["0", "onKill"]),
        actions("actions-inherited", "", ["onArchive", "onKill"], "interface ArchiveActions {\n  onArchive?(): void;\n}\n", " extends ArchiveActions"),
        actions("actions-merged", "", ["onArchive", "onKill"], "export interface WorkflowDialogActions {\n  onArchive?(): void;\n}\n"),
        actions("actions-call", "  (): void;\n", ["<call-signature>", "onKill"]),
        actions("actions-construct", "  new (): object;\n", ["<construct-signature>", "onKill"]),
        actions("actions-index", "  [action: string]: (() => void) | undefined;\n", ["<index-signature>", "onKill"]),
      ],
    },
    {
      id: "R-RUNTIME-MEMBER",
      label: "residual: a member patched onto the class's prototype at run time is not read - the readers read the declared class and interface",
      cases: [named("runtime", "class", 'export class ObservationProjection {\n  query(): void {}\n}\nObject.defineProperty(ObservationProjection.prototype, "rewind", { value(): void {} });\n', ["query"])],
    },
  ],
};

export const PLANT_TABLES: readonly Table<PlantItem>[] = [ADMISSION, INVOCATION, EFFECT, IDENTITY, QUIETS];

export interface NonRenderReader {
  /** The class members the module references in value positions, as projectionReach reads them (sorted). */
  readonly value: readonly string[];
  /** The class members it references in type positions, as projectionReach reads them (sorted). */
  readonly type: readonly string[];
  /** Why the module never reads the projection on a redraw. */
  readonly reason: string;
}
const STATES_RELATE = "it references the class only in the statement type relate accepts (Parameters<ObservationProjection['relate']>[0]), never in a value position; the host admits what it states";
/**
 * The source modules that reach the projection but never on a redraw, each with the member references projectionReach
 * measures in it and its reason. No SURFACES module reaches one through an import that runs (the NON-RENDER row computes
 * that runtime closure), so a redraw can run its code only through a callback the host injects, an effect the census world
 * does not hold (R-SIDE-CHANNEL). Every other module that reaches the projection is a SURFACES module.
 */
export const NON_RENDER: Readonly<Record<string, NonRenderReader>> = {
  "src/index.ts": {
    value: ["ingest", "markStale", "query", "refresh"],
    type: [],
    reason: "the extension entry: it builds the session projection, admits observations in tool handlers and in its workflow-lifecycle emitter, reads it in a tool handler (workflow_compare) and hands the dialog seam its deps",
  },
  "src/workbench/beads-observer.ts": { value: [], type: ["relate"], reason: `the Beads adapter: ${STATES_RELATE}` },
  "src/workbench/claude-control-observer.ts": { value: ["query", "relate"], type: [], reason: "the Claude control observer: on an SDK init it reads the session node and states the session's ownership" },
  "src/workbench/claude-topology.ts": { value: [], type: ["relate"], reason: `the Claude topology adapter: ${STATES_RELATE}` },
  "src/workbench/control-tool.ts": { value: ["ingest", "query"], type: [], reason: "the control tool's receipt recorder: on a control call it reads the target node and records the receipt phase as an event of it" },
  "src/workbench/control.ts": { value: ["query", "relations"], type: [], reason: "decideControl: the decision a control request runs, reading the target node and its relations" },
  "src/workbench/detached-control.ts": { value: [], type: [], reason: "the detached control seam: it holds the projection in its deps type and references no member" },
  "src/workbench/detached-observer.ts": {
    value: ["markStale", "refresh", "relate"],
    type: ["refresh", "relate"],
    reason: "the detached-run observer: applyDetachedReading admits a detached run's reading, whose statement and verdict types it spells from relate and refresh",
  },
  "src/workbench/evidence-wiring.ts": {
    value: ["query"],
    type: [],
    reason: "the evidence producer wiring: its query reader runs inside a loader, on the explicit load-evidence action the host performs, never on a redraw",
  },
  "src/workbench/forge-observer.ts": { value: [], type: ["relate"], reason: `the Forge adapter: ${STATES_RELATE}` },
  "src/workbench/forge-operation-observer.ts": { value: ["markStale", "refresh", "relate"], type: [], reason: "the Forge operation observer: as an operation starts and settles it admits its snapshots, its relation and its staleness" },
  "src/workbench/furnace-observer.ts": { value: [], type: ["relate"], reason: `the Furnace adapter: ${STATES_RELATE}` },
  "src/workbench/hyperunix-observer.ts": { value: [], type: ["relate"], reason: `the HyperUnix adapter: ${STATES_RELATE}` },
  "src/workbench/reactivefiber-observer.ts": { value: [], type: ["relate"], reason: `the ReactiveFiber adapter: ${STATES_RELATE}` },
};

export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  /** SHA-256 of each case as written (JSON of the case: its input and its expected reading). */
  readonly pins: readonly string[];
  /** The test this row registers. */
  readonly test: string;
}
const digest = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const judged = <C>(table: string, entry: TableRow<C>): JudgedRow => ({ table, id: entry.id, label: entry.label, pins: entry.cases.map(digest), test: `${table} ${entry.id}` });

export const ROWS: readonly JudgedRow[] = [
  ...SURFACES.rows.map(entry => judged(SURFACES.name, entry)),
  ...PLANT_TABLES.flatMap(table => table.rows.map(entry => judged(table.name, entry))),
  ...READERS.rows.map(entry => judged(READERS.name, entry)),
  ...ABSENCE.rows.map(entry => judged(ABSENCE.name, entry)),
  ...REACH.rows.map(entry => judged(REACH.name, entry)),
  ...NAMES.rows.map(entry => judged(NAMES.name, entry)),
];

/** The named residual families, each with its pinned quiet row (the row's registered test). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "R-DEFERRED-EFFECT": ["INVOCATION R-DEFERRED-EFFECT"],
  "R-SIDE-CHANNEL": ["EFFECT R-SIDE-CHANNEL"],
  "R-LATE-DRIFT": ["IDENTITY R-LATE-DRIFT"],
  "R-OPAQUE-STATE": ["IDENTITY R-OPAQUE-STATE"],
  "R-FULL-TYPE": ["READERS R-FULL-TYPE"],
  "R-ALIASED-CLASS": ["READERS R-ALIASED-CLASS"],
  "R-PARAPHRASE": ["ABSENCE R-PARAPHRASE"],
  "R-ERASED-ACCESS": ["REACH R-ERASED-ACCESS"],
  "R-RUNTIME-MEMBER": ["NAMES R-RUNTIME-MEMBER"],
};

/** Every table's name, quote and its source in the export row, in census order: the anchor row holds each quote to exactly one occurrence in its source. */
export const TABLE_QUOTES: readonly { readonly table: string; readonly source: "title" | "filing"; readonly quote: string }[] = [SURFACES, ...PLANT_TABLES, READERS, ABSENCE, REACH, NAMES].map(table => ({
  table: table.name,
  source: table.source,
  quote: table.quote,
}));
