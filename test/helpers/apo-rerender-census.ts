/**
 * wb-021.5 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7, program-triage-2026-10-18): the instruments and the judged tables of
 * test/workbench-apo-rerender-census.test.ts, the rerender-authority census. The census file states the requirement, its
 * acceptance and what each table pins; this module holds the world every subject renders in, the judge that reads one
 * subject's renders, the syntactic type scan, the checker-based scans (a TypeScript program over src, or over planted
 * modules held in memory: the reach scan projectionReach and, from cut #4, the fail-closed forms judge readForms with its
 * literal roster RESOLVABLE_FORMS), the mention judge and the tables. ROWS digests every case as written for the out-of-file roster
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
  | { readonly plant: "deferred-admit" }
  | { readonly plant: "deferred-effect" }
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
  | { readonly plant: "private-state" }
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
/** A frame whose drift lives in a #private field a method moves: neither encoding reads a private field (R-OPAQUE-STATE). */
class PrivateFrame {
  #frame = 0;
  tick(): number {
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
    case "deferred-admit":
      return world => () => {
        const timer = setTimeout(() => admit(world.projection, "markStale"), 60_000);
        world.cleanups.push(() => clearTimeout(timer));
        return DRAWN;
      };
    case "deferred-effect":
      return world => () => {
        const timer = setTimeout(() => world.record(ACTION_EFFECTS.onKill), 60_000);
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
    case "private-state":
      return () => {
        const frame = new PrivateFrame();
        return () => {
          frame.tick();
          return { frame };
        };
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

/**
 * The marker a key reads as when it resolves to no literal member set over a value that exposes the class's members (a
 * string or symbol key, a type parameter, any other non-literal type): it is no read member, so RENDER TOUCHES and
 * NON-RENDER red on it - the key fails closed.
 */
export const UNRESOLVED_KEY = "<unresolved-key>";
/** How one module reaches the projection class, as the checker resolves its names. */
export interface Reach {
  /** It names the class: an import of any form, an alias, a re-export or a qualified name. */
  readonly names: boolean;
  /**
   * Public class members it references in a value position (sorted): a property access, an element access and a
   * destructuring, binding or assignment. A key is read through the checker's type of it (an identifier key by its name):
   * a string or number literal reads its member, a literal union member by member; any other key over a value that
   * exposes the class's members reads as UNRESOLVED_KEY.
   */
  readonly value: readonly string[];
  /** Public class members it references in a type position (sorted): a typeof query, a statement or result type (Parameters, ReturnType), and an indexed access, its index read as a key is. */
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
/**
 * How far the reach scan unwraps a carrier (a union or intersection part, a container's type argument, an index signature
 * or a call's result, one inside another): the class instance is found inside at most CARRIER_DEPTH + 1 nested wrappers,
 * a typed reader of it inside at most CARRIER_DEPTH; past that the type reads as no carrier (R-DEEP-CARRIER).
 */
export const CARRIER_DEPTH = 3;
function publicProperties(checker: ts.TypeChecker, type: ts.Type): ts.Symbol[] {
  return checker
    .getPropertiesOfType(type)
    .filter(property => !(property.declarations ?? []).some(item => (ts.getCombinedModifierFlags(item) & HIDDEN) !== 0) && !String(property.escapedName).startsWith("__#"));
}
function declarationOf<T extends ts.ClassDeclaration | ts.InterfaceDeclaration>(source: ts.SourceFile | undefined, test: (statement: ts.Statement) => statement is T, name: string): T | undefined {
  return source?.statements.find((statement): statement is T => test(statement) && statement.name?.text === name);
}
/** The member names a key type selects: a string or number literal, or a union of them; undefined when any part is another type. */
function keyNames(key: ts.Type): string[] | undefined {
  const names: string[] = [];
  for (const part of key.isUnion() ? key.types : [key]) {
    if (part.isStringLiteral()) names.push(part.value);
    else if (part.isNumberLiteral()) names.push(String(part.value));
    else return undefined;
  }
  return names;
}
/** The class a scan judges: its checker, its symbol and declaration, its instance type, its public members and the carrier test. */
interface ClassModel {
  readonly checker: ts.TypeChecker;
  readonly symbol: ts.Symbol;
  readonly declaration: ts.ClassDeclaration;
  readonly instance: ts.Type;
  readonly isMember: (candidate: ts.Symbol) => boolean;
  /** The carrier test the reach scan follows (CARRIER_DEPTH): the instance, a reader of it, or a union, container, index signature or call that yields one. */
  readonly carries: (type: ts.Type, depth: number) => boolean;
}
function classModel(program: ts.Program, root: string, classModule: string, className: string): ClassModel {
  const checker = program.getTypeChecker();
  const declaration = declarationOf(program.getSourceFile(join(root, classModule)), ts.isClassDeclaration, className);
  const symbol = declaration?.name ? checker.getSymbolAtLocation(declaration.name) : undefined;
  if (!declaration || !symbol) throw new Error(`no class ${className} in ${classModule}`);
  const instance = checker.getDeclaredTypeOfSymbol(symbol);
  const members = new Set<ts.Declaration>(publicProperties(checker, instance).flatMap(property => property.declarations ?? []));
  const isMember = (candidate: ts.Symbol): boolean => (candidate.declarations ?? []).some(item => members.has(item));
  const carries = (type: ts.Type, depth: number): boolean => {
    if (type === instance) return true;
    if (depth > CARRIER_DEPTH) return false;
    if (type.isUnionOrIntersection()) return type.types.some(part => carries(part, depth + 1));
    if ((type.flags & ts.TypeFlags.Object) === 0) return false;
    const properties = type.getProperties();
    if (properties.length > 0 && properties.every(isMember)) return true;
    const object = type as ts.ObjectType;
    if ((object.objectFlags & ts.ObjectFlags.Reference) !== 0 && checker.getTypeArguments(object as ts.TypeReference).some(argument => carries(argument, depth + 1))) return true;
    if (checker.getIndexInfosOfType(type).some(info => carries(info.type, depth + 1))) return true;
    return type.getCallSignatures().some(signature => carries(signature.getReturnType(), depth + 1));
  };
  return { checker, symbol, declaration, instance, isMember, carries };
}
/**
 * The class-element kinds the scans resolve (cut #5, ruling R-B41: the enumerate-the-resolvable rule over class-element
 * kinds), by declaration name: the pinned typescript's ClassElement union, each kind an interface its declaration file
 * declares extending ClassElement, with the SyntaxKind it declares (CLASS_ELEMENT_SYNTAX; the CLASS ELEMENTS row holds both
 * equal to that file). Every predicate of the scans that classifies a class element reads it through this roster: the
 * class's own module skips a non-static element of a listed kind (classInternal), and a member standing in for a base
 * member is judged by its kind's STAND_IN reading. Static-ness is read both ways: a static block is static by its kind, every
 * other element by the static modifier. A class element of any kind outside the roster is never skipped: both scans read it,
 * and readForms refuses it with an "unlisted-class-element <kind>" row, so the census reds.
 */
export const CLASS_ELEMENT_KINDS = [
  "PropertyDeclaration",
  "MethodDeclaration",
  "GetAccessorDeclaration",
  "SetAccessorDeclaration",
  "ConstructorDeclaration",
  "ClassStaticBlockDeclaration",
  "IndexSignatureDeclaration",
  "SemicolonClassElement",
] as const;
export type ClassElementKind = (typeof CLASS_ELEMENT_KINDS)[number];
/** The SyntaxKind each listed class-element kind declares (its declaration's kind member in the typescript declaration file). */
export const CLASS_ELEMENT_SYNTAX: Readonly<Record<ClassElementKind, ts.SyntaxKind>> = {
  PropertyDeclaration: ts.SyntaxKind.PropertyDeclaration,
  MethodDeclaration: ts.SyntaxKind.MethodDeclaration,
  GetAccessorDeclaration: ts.SyntaxKind.GetAccessor,
  SetAccessorDeclaration: ts.SyntaxKind.SetAccessor,
  ConstructorDeclaration: ts.SyntaxKind.Constructor,
  ClassStaticBlockDeclaration: ts.SyntaxKind.ClassStaticBlockDeclaration,
  IndexSignatureDeclaration: ts.SyntaxKind.IndexSignature,
  SemicolonClassElement: ts.SyntaxKind.SemicolonClassElement,
};
/**
 * How a member of each listed kind stands in for a base member of its name (readForms' judgeStandIn): a method by its own
 * parameters, a setter by its parameter (handed the property's type), and through the checker (cut #6) a field by its own
 * type, declared or inferred, and a getter by the type it returns - the parameters every call signature of that type takes
 * (each union part read on its own, each parameter as instantiated), a type with no call signature failing closed
 * (unresolved-stand-in); a constructor, a static block, an index signature and a semicolon stand in for no named member (a
 * constructor's parameters are judged where it is called).
 */
export const STAND_IN: Readonly<Record<ClassElementKind, "parameters" | "field" | "getter" | "setter" | "none">> = {
  PropertyDeclaration: "field",
  MethodDeclaration: "parameters",
  GetAccessorDeclaration: "getter",
  SetAccessorDeclaration: "setter",
  ConstructorDeclaration: "none",
  ClassStaticBlockDeclaration: "none",
  IndexSignatureDeclaration: "none",
  SemicolonClassElement: "none",
};
/** A stand-in reading that judges something (every reading but "none"). */
type StandInReading = Exclude<(typeof STAND_IN)[ClassElementKind], "none">;
/** A class element's kind among the kinds a scan is given (CLASS_ELEMENT_KINDS unless a case narrows them), or undefined: an unlisted kind. */
const listedKind = (element: ts.Node, kinds: readonly ClassElementKind[]): ClassElementKind | undefined => kinds.find(kind => CLASS_ELEMENT_SYNTAX[kind] === element.kind);
/** Static by syntax (a static block, by its kind) or by the static modifier. */
const isStaticElement = (element: ts.ClassElement): boolean => ts.isClassStaticBlockDeclaration(element) || (ts.getCombinedModifierFlags(element) & ts.ModifierFlags.Static) !== 0;
/** The node as a member of the class-like declaration it sits in (an element of any kind), or undefined. */
const classElementOf = (node: ts.Node): ts.ClassElement | undefined => (ts.isClassLike(node.parent) ? node.parent.members.find(member => member === node) : undefined);
/**
 * The nodes of the class's own module a scan never reads, and what it reads of them: the class's name (nothing), and an
 * instance member - a non-static element of a listed kind: a field, a method, an accessor, the constructor, an index
 * signature or a semicolon - which the REPROJECTION row's runtime reading and the MEMBERS row judge, except the parts of it
 * that run when the class is defined, its decorators and its computed name, which are read like module code (cut #5).
 * undefined for every other node: a static element (a static field, method or accessor, a static index signature, a static
 * block: static by its kind) and an element of an unlisted kind are read like any other module, as is everything outside
 * the class (cut #4 U1(b); cut #5, refusal #4 U1 and ruling R-B41).
 */
function classInternal(model: ClassModel, node: ts.Node, kinds: readonly ClassElementKind[]): readonly ts.Node[] | undefined {
  if (node === model.declaration.name) return [];
  if (node.parent !== model.declaration) return undefined;
  const element = classElementOf(node);
  if (element === undefined || listedKind(element, kinds) === undefined || isStaticElement(element)) return undefined;
  return [...(ts.canHaveDecorators(element) ? (ts.getDecorators(element) ?? []) : []), ...(element.name && ts.isComputedPropertyName(element.name) ? [element.name] : [])];
}
/**
 * Reads, for each given module, how it reaches the class declared in classModule (Reach); modules that reach nothing are
 * absent from the result. The class's own module is read outside the class's name and instance members (classInternal):
 * a module function, a static member or a static block there, and an instance member's decorators and computed name, are
 * read as any module is (kinds narrows the class-element kinds read as listed; CLASS_ELEMENT_KINDS by default). Names resolve through the checker, so an alias, a
 * namespace, a re-export chain and a render model, container, getter or function that carries the projection are all
 * followed, in value and type positions alike. A carrier is followed to the depth bound CARRIER_DEPTH states (the
 * instance inside at most four nested wrappers, a typed reader inside at most three), and an object type whose property
 * holds the projection is no carrier itself: a module that only relays such a value reads as reaching nothing
 * (R-DEEP-CARRIER), while any access through it exposes its holder. Every key - an element access, an indexed access
 * type, a binding or an assignment destructuring under every key form (identifier, string, numeric, computed) - is read
 * through the checker's type of it (keyNames), failing closed as UNRESOLVED_KEY over a value that exposes the class's
 * members. A member reached through an erasing step (a cast from unknown or of a holder, a structural type of the
 * module's own, Reflect, an any, a prototype lookup, an Object property call, a generic accessor or alias over an
 * unconstrained type parameter) is not read here: readForms refuses the erasing step itself, in the module that takes it.
 */
export function projectionReach(
  program: ts.Program,
  root: string,
  classModule: string,
  className: string,
  modules: readonly string[],
  kinds: readonly ClassElementKind[] = CLASS_ELEMENT_KINDS,
): Map<string, Reach> {
  const model = classModel(program, root, classModule, className);
  const { checker, symbol, isMember, carries } = model;
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
    const inClassModule = rel === classModule;
    const source = program.getSourceFile(join(root, rel));
    if (!source) throw new Error(`the program holds no ${rel}`);
    let names = false;
    const value = new Set<string>();
    const type = new Set<string>();
    const holders = new Set<string>();
    const reference = (candidate: ts.Symbol | undefined, inType: boolean): void => {
      if (candidate && isMember(candidate)) (inType ? type : value).add(candidate.name);
    };
    /** A key over a holder type: its literal names read member by member on every part; any other key over a type that exposes the class's members fails closed. */
    const keyed = (holder: ts.Type, names: readonly string[] | undefined, inType: boolean): void => {
      const parts = holder.isUnionOrIntersection() ? holder.types : [holder];
      if (!parts.some(part => checker.getPropertiesOfType(part).some(isMember))) return;
      if (names === undefined) (inType ? type : value).add(UNRESOLVED_KEY);
      else for (const name of names) for (const part of parts) reference(checker.getPropertyOfType(part, name), inType);
    };
    /** The names a property key selects: an identifier, a string or a numeric literal by its text, a computed key through the checker's type of its expression; any other key (a bigint) names no literal and fails closed. */
    const namesOf = (key: ts.PropertyName): string[] | undefined => {
      if (ts.isComputedPropertyName(key)) return keyNames(checker.getTypeAtLocation(key.expression));
      return ts.isIdentifier(key) || ts.isPrivateIdentifier(key) || ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key) || ts.isNumericLiteral(key) ? [key.text] : undefined;
    };
    const visit = (node: ts.Node, inType: boolean): void => {
      const internal = inClassModule ? classInternal(model, node, kinds) : undefined;
      if (internal) {
        for (const part of internal) visit(part, inType);
        return;
      }
      const typed = inType || ts.isTypeNode(node);
      if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        let resolved = checker.getSymbolAtLocation(node);
        if (resolved && (resolved.flags & ts.SymbolFlags.Alias) !== 0) resolved = checker.getAliasedSymbol(resolved);
        if (resolved === symbol) names = true;
        else if (resolved && isMember(resolved)) reference(resolved, typed);
        else if (resolved && isHolder(resolved)) holders.add(resolved.name);
      }
      // A binding element (const { stats } = projection) names the property of the pattern's type, not a symbol of its own: every key form (identifier, string, numeric, computed).
      if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent) && !node.dotDotDotToken) {
        const key = node.propertyName ?? node.name;
        if (!ts.isObjectBindingPattern(key) && !ts.isArrayBindingPattern(key)) keyed(checker.getTypeAtLocation(node.parent), namesOf(key), typed);
      }
      // A property of an assignment pattern (({ [key]: stale } = projection), nested or in a for-of) under every key form, read on the type the pattern destructures.
      if ((ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) && ts.isObjectLiteralExpression(node.parent) && isAssignmentPattern(node.parent)) {
        keyed(checker.getTypeOfAssignmentPattern(node.parent), namesOf(node.name), typed);
      }
      // An element access (projection[key], projection?.[key]) and an indexed access type (Projection[Key]): the key through the checker's type of it.
      if (ts.isElementAccessExpression(node)) keyed(checker.getTypeAtLocation(node.expression), keyNames(checker.getTypeAtLocation(node.argumentExpression)), typed);
      if (ts.isIndexedAccessTypeNode(node)) keyed(checker.getTypeFromTypeNode(node.objectType), keyNames(checker.getTypeFromTypeNode(node.indexType)), true);
      ts.forEachChild(node, child => visit(child, typed));
    };
    visit(source, false);
    if (names || value.size > 0 || type.size > 0 || holders.size > 0) result.set(rel, { names, value: [...value].sort(), type: [...type].sort(), holders: [...holders].sort() });
  }
  return result;
}

/**
 * The resolvable forms (cut #4, the enumerate-the-resolvable form, ruling R-B33): readForms visits every node of a read
 * module whose checker type exposes the projection (exposes: it carries it as the reach scan's carrier test reads it,
 * to CARRIER_DEPTH, or it exposes one of the class's public members, as a subclass or an extending interface does; a
 * type parameter through its constraint) and reads it in exactly one of these forms by its parent, or refuses it. Value
 * side: member (a property access whose name the checker resolves to a class member, or to a property the value's own
 * type declares: an apparent member such as constructor, call or bind refuses); element (an element access keyed to a
 * declared property, an index signature or, over the class's members, any key the reach scan reads); callee (a function
 * that yields the projection, called); argument, initializer, assignment, property, return and cast (a flow, judged
 * against the type it flows into: judgeFlow); array-element and spread-array (an array literal that carries it); wrap
 * (parentheses, a non-null assertion, a conditional branch, the result side of ??, || and && and a comma's right side);
 * test (a condition, a comparison, !, typeof, void, instanceof and switch); iteration (for-of and for-in); await;
 * statement (an expression statement, a comma's left side). Type side: annotation (the written type of a declaration,
 * a cast or a type predicate); type-part (a union or intersection member, a parenthesized, array, tuple, optional, rest
 * or readonly type); keyof; constraint (a type parameter's constraint); heritage (an extends or implements clause);
 * indexed (the object of an indexed access, read through its key); lib-generic (a type argument of a generic
 * TypeScript's default library declares: Pick, Partial, Map, WeakMap, Promise). Every other parent - a generic declared in
 * src or in a package included - and every flow whose target hides the projection is refused with a row naming it.
 */
export const RESOLVABLE_FORMS = [
  "member",
  "element",
  "callee",
  "argument",
  "initializer",
  "assignment",
  "property",
  "return",
  "cast",
  "array-element",
  "spread-array",
  "wrap",
  "test",
  "iteration",
  "await",
  "statement",
  "annotation",
  "type-part",
  "keyof",
  "constraint",
  "heritage",
  "indexed",
  "lib-generic",
] as const;
export type ResolvableForm = (typeof RESOLVABLE_FORMS)[number];
/** How one module's nodes that expose the projection stand: the resolvable forms they stood in (sorted), and every use readForms refused, site by site (sorted, duplicates kept). */
export interface FormsReading {
  readonly forms: readonly ResolvableForm[];
  readonly refused: readonly string[];
}
/** One node's reading: the resolvable form it stands in, or the refusing form (or "unlisted <parent kind>") and the site the row names. */
type Verdict = { readonly form: ResolvableForm } | { readonly refused: string; readonly site: ts.Node };
/** A refusal row: the refusing form (or "unlisted <parent kind>"), then the site's text, whitespace collapsed, at most 200 characters. */
const refusalRow = (kind: string, site: ts.Node): string => `${kind}: ${site.getText().replace(/\s+/g, " ").slice(0, 200)}`;
/** A function-like node's own declared parameters, when it has a parameter list (a signature declaration). */
const parametersOf = (node: ts.Declaration | undefined): readonly ts.ParameterDeclaration[] =>
  node && (ts.isFunctionLike(node) || ts.isJSDocSignature(node)) && "parameters" in node ? (node.parameters as readonly ts.ParameterDeclaration[]) : [];
/** The declared return type node of the function-like a return statement or an arrow body belongs to. */
function returnTypeOf(site: ts.Node): ts.TypeNode | undefined {
  const fn = ts.isArrowFunction(site) ? site : ts.findAncestor(site.parent, ts.isFunctionLike);
  return fn && "type" in fn ? (fn.type as ts.TypeNode | undefined) : undefined;
}
/** True for an identifier in a value position: not a declaration's, a member's, an import's, an export's or a label's name (a shorthand property is judged as a whole), and not a qualified name's part. */
function isValueName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isShorthandPropertyAssignment(parent) || ts.isQualifiedName(parent)) return false;
  if ("name" in parent && parent.name === node) return false;
  if ("propertyName" in parent && parent.propertyName === node) return false;
  if ("label" in parent && parent.label === node) return false;
  return !(ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isNamespaceExport(parent));
}
/**
 * The forms judge (cut #4; ruling R-B33, enumerate the resolvable): for each given module, every node whose checker type
 * exposes the projection, read in one of RESOLVABLE_FORMS or refused (FormsReading); a module with no such node and no
 * refusal is absent. It reads the same modules projectionReach reads (the class's own module outside classInternal). A
 * flow - an argument, an initializer or default under a written type, an assignment, an object property under a
 * contextual type, a return under a written return type, a cast - is judged against the type the value flows into: for a
 * src callee the parameter as the callee's body sees it (an overload's implementation; a type parameter through its
 * constraint, so an unconstrained one hides the projection: a module's own generic accessor, a generic destructuring
 * accessor, a cross-module generic utility); for a library callee the instantiated parameter, and a value that exposes
 * the projection only into a container's own element type in TypeScript's default library (a type parameter of the
 * enclosing interface or class: push, set, get, add, has), never into a library generic's own type parameter, an any,
 * an unknown, an object or a {} (Reflect, Object, JSON, Promise.resolve, call, bind), nor into any package's parameter. The target refuses when it hides the projection (exposesDeclared), when a
 * callback's own parameter hides a path through which the target hands it the projection, or when a value that holds
 * the projection only inside it (heldPaths: a property of a src or anonymous object type, a library generic's type
 * argument, an index signature or a call's result, to CARRIER_DEPTH) meets a target that lacks or hides one of its paths.
 * The arguments object of a function whose parameters hold the projection is refused. Dispatch: a src signature with no
 * body of its own (an interface method, a function type, a call signature) is trusted for no parameter, so a value or a
 * holder it takes is refused; a member standing in for another's signature (a class member overriding or implementing
 * a base or interface member, an object literal's method under a contextual type, a setter for such a property) whose
 * own parameter hides a path the signature hands it is refused at its declaration. Stand-ins are read by class-element
 * kind (cut #5, STAND_IN): a method and a setter by their own parameters, a field (its own type) and a getter (the type it
 * returns) through the checker's call signatures of that type (cut #6; none: unresolved-stand-in), each matched to the base
 * member its symbol names under any name form (an identifier, a string or numeric literal, a computed key, a symbol), an
 * instance element against the base's instance side and the implemented interfaces, a static one against the extended
 * class's static side; an object literal's method, getter and setter alike under a contextual type. A class element of a
 * kind outside the given kinds (CLASS_ELEMENT_KINDS by default) is refused wherever it stands (unlisted-class-element).
 * Type side, a type argument of a
 * generic declared in src (a module's own or another module's alias, interface or class) or in a package is refused: a
 * generic indexed-access alias and an infer-conditional alias included.
 */
export function readForms(
  program: ts.Program,
  root: string,
  classModule: string,
  className: string,
  modules: readonly string[],
  kinds: readonly ClassElementKind[] = CLASS_ELEMENT_KINDS,
): Map<string, FormsReading> {
  const model = classModel(program, root, classModule, className);
  const { checker, isMember, carries } = model;
  const prefix = `${join(root, "src")}/`;
  const isSrc = (node: ts.Node): boolean => node.getSourceFile().fileName.startsWith(prefix);
  /** A declaration of TypeScript's own default library (lib.*.d.ts): the only library whose generics and container parameters the judge trusts. */
  const isDefaultLibrary = (node: ts.Node): boolean => program.isSourceFileDefaultLibrary(node.getSourceFile());
  const objectExposes = (type: ts.Type): boolean => (type.flags & ts.TypeFlags.Object) !== 0 && type.getProperties().some(isMember);
  const constrained = (type: ts.Type): ts.Type => ((type.flags & ts.TypeFlags.TypeParameter) !== 0 ? (checker.getBaseConstraintOfType(type) ?? type) : type);
  /** The projection is visible through the type: it carries it, or exposes a class member (a subclass, an extending interface), or (a type parameter) its constraint does. */
  const exposes = (type: ts.Type): boolean => {
    const seen = constrained(type);
    if (seen === type && (type.flags & ts.TypeFlags.TypeParameter) !== 0) return false;
    if (carries(seen, 0) || objectExposes(seen)) return true;
    return seen.isUnionOrIntersection() && seen.types.some(objectExposes);
  };
  const isSrcType = (type: ts.Type): boolean => {
    const first = type.symbol?.declarations?.[0];
    return first === undefined || isSrc(first);
  };
  const held = new Map<ts.Type, readonly (readonly string[])[]>();
  /** The paths through which a value that does not itself expose the projection holds one (a property, <i> a library generic's type argument, [] an index signature, () a call's result), to CARRIER_DEPTH. */
  const heldPaths = (type: ts.Type, depth: number): readonly (readonly string[])[] => {
    if (exposes(type)) return [[]];
    if (depth > CARRIER_DEPTH) return [];
    const known = depth === 0 ? held.get(type) : undefined;
    if (known) return known;
    const paths: string[][] = [];
    const add = (segment: string, inner: ts.Type): void => {
      for (const rest of heldPaths(inner, depth + 1)) paths.push([segment, ...rest]);
    };
    if (type.isUnionOrIntersection()) for (const part of type.types) for (const path of heldPaths(part, depth + 1)) paths.push([...path]);
    else if ((type.flags & ts.TypeFlags.Object) !== 0) {
      const object = type as ts.ObjectType;
      if ((object.objectFlags & ts.ObjectFlags.Reference) !== 0) for (const [index, argument] of checker.getTypeArguments(object as ts.TypeReference).entries()) add(`<${index}>`, argument);
      if (isSrcType(type)) for (const property of publicProperties(checker, type)) add(property.name, checker.getTypeOfSymbol(property));
      for (const info of checker.getIndexInfosOfType(type)) add("[]", info.type);
      for (const signature of type.getCallSignatures()) add("()", signature.getReturnType());
    }
    if (depth === 0) held.set(type, paths);
    return paths;
  };
  /** The target keeps the projection at the path: each step exists on the target and the end exposes it. */
  const pathKept = (target: ts.Type, path: readonly string[]): boolean => {
    let at = constrained(target);
    for (const segment of path) {
      at = checker.getNonNullableType(at);
      let next: ts.Type | undefined;
      if (segment === "()") next = at.getCallSignatures()[0]?.getReturnType();
      else if (segment === "[]") next = checker.getIndexInfosOfType(at)[0]?.type;
      else if (segment.startsWith("<")) {
        const object = at as ts.ObjectType;
        next =
          (at.flags & ts.TypeFlags.Object) !== 0 && (object.objectFlags & ts.ObjectFlags.Reference) !== 0
            ? checker.getTypeArguments(object as ts.TypeReference)[Number(segment.slice(1, -1))]
            : undefined;
      } else {
        const property = checker.getPropertyOfType(at, segment);
        next = property ? checker.getTypeOfSymbol(property) : undefined;
      }
      if (!next) return false;
      at = constrained(next);
    }
    return exposes(at);
  };
  /**
   * The call signatures a value of the type is called through: every call signature of every part of its type, a union read
   * part by part (never through the union's combined signature, whose parameters intersect its parts'; a part with none,
   * such as undefined, adds none). undefined when the type is absent or no part has a call signature (any, never): the
   * receiving parameters cannot be read.
   */
  const typeReceivers = (type: ts.Type | undefined): readonly ts.Signature[] | undefined => {
    if (type === undefined) return undefined;
    const parts = type.isUnion() ? type.types : [type];
    const signatures = parts.flatMap(part => part.getCallSignatures());
    return signatures.length > 0 ? signatures : undefined;
  };
  /** True when a signature's last parameter is a rest parameter (it takes every argument at and past its own position). */
  const hasRest = (signature: ts.Signature): boolean => {
    const last = signature.getParameters().at(-1)?.valueDeclaration;
    return last !== undefined && ts.isParameter(last) && last.dotDotDotToken !== undefined;
  };
  /** The type a signature's parameter takes at the position, as the checker instantiates it (a rest parameter's element at and past its own position), or undefined past its last parameter: the signature never receives that argument. */
  const receivedAt = (signature: ts.Signature, at: number): ts.Type | undefined =>
    at < signature.getParameters().length || hasRest(signature) ? signature.getTypeParameterAtPosition(at) : undefined;
  /** The positions a base signature hands, each with the type its parameter takes there as the checker instantiates it: every declared position, and a rest parameter's element at and past its own position, as far as the stand-in receives (span). */
  const handedAt = (signature: ts.Signature, span: number): { readonly type: ts.Type; readonly at: number }[] => {
    const count = signature.getParameters().length;
    return Array.from({ length: hasRest(signature) ? Math.max(count, span) : count }, (_, at) => ({ type: signature.getTypeParameterAtPosition(at), at }));
  };
  const result = new Map<string, FormsReading>();
  for (const rel of modules) {
    const inClassModule = rel === classModule;
    const source = program.getSourceFile(join(root, rel));
    if (!source) throw new Error(`the program holds no ${rel}`);
    const forms = new Set<ResolvableForm>();
    const refused: string[] = [];
    const ok = (form: ResolvableForm): void => {
      forms.add(form);
    };
    const refuse = (kind: string, site: ts.Node): void => {
      refused.push(refusalRow(kind, site));
    };
    const record = (verdict: Verdict | undefined): void => {
      if (verdict === undefined) return;
      if ("form" in verdict) ok(verdict.form);
      else refuse(verdict.refused, verdict.site);
    };
    /** A flow of the value at node into target: the projection must stay visible there, a callback's parameters (every call signature of each union part, by position: cut #6) must keep every path the target hands them, and a value's held paths must stay held. A quiet flow (the value itself hides the projection) records no form. */
    const judgeFlow = (form: ResolvableForm, node: ts.Node, target: ts.Type, site: ts.Node, quiet: boolean): void => {
      const sourceType = checker.getTypeAtLocation(node);
      let hidden = exposes(sourceType) && !exposes(target);
      // A callback receives what the target's signatures hand it as a field stand-in does (cut #6): every call signature of each union part, by position.
      const receivers = typeReceivers(sourceType) ?? [];
      const span = Math.max(0, ...receivers.map(own => own.getParameters().length));
      for (const signature of checker.getNonNullableType(constrained(target)).getCallSignatures()) {
        for (const { type, at } of handedAt(signature, span)) {
          const paths = heldPaths(type, 0);
          for (const own of receivers) {
            const received = receivedAt(own, at);
            if (received) for (const path of paths) if (!pathKept(received, path)) hidden = true;
          }
        }
      }
      if (!exposes(sourceType)) for (const path of heldPaths(sourceType, 0)) if (!pathKept(target, path)) hidden = true;
      if (hidden) refuse(form, site);
      else if (!quiet) ok(form);
    };
    /** The type an argument flows into (undefined: no parameter takes it, or the callee is unresolved). */
    const argumentTarget = (call: ts.CallExpression | ts.NewExpression, node: ts.Expression, exposing: boolean): ts.Type | undefined => {
      const passed: readonly ts.Expression[] = call.arguments ?? [];
      const index = passed.indexOf(node);
      const signature = checker.getResolvedSignature(call);
      let declaration = signature?.getDeclaration();
      if (!signature || !declaration) return undefined;
      if (isSrc(declaration) && (ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration)) && !declaration.body && declaration.name) {
        const implementation = (checker.getSymbolAtLocation(declaration.name)?.declarations ?? []).find(item => (ts.isFunctionDeclaration(item) || ts.isMethodDeclaration(item)) && item.body !== undefined);
        if (!implementation) return undefined;
        declaration = implementation as ts.SignatureDeclaration;
      }
      // A src signature with no body of its own (an interface method, a function type, a call signature): the body that runs is an implementation the checker does not resolve here, so no parameter is trusted.
      if (isSrc(declaration) && !hasBody(declaration)) return undefined;
      const parameters = parametersOf(declaration);
      const last = parameters[parameters.length - 1];
      const parameter = parameters[index] ?? (last?.dotDotDotToken ? last : undefined);
      if (!parameter) return undefined;
      const element = (type: ts.Type): ts.Type => (parameter.dotDotDotToken ? (checker.getIndexTypeOfType(type, ts.IndexKind.Number) ?? type) : type);
      const declared = element(checker.getTypeAtLocation(parameter));
      if (isSrc(declaration)) return declared;
      if (exposing) {
        const owner = (declared.flags & ts.TypeFlags.TypeParameter) !== 0 ? declared.symbol?.declarations?.[0]?.parent : undefined;
        if (!isDefaultLibrary(declaration) || !owner || !(ts.isInterfaceDeclaration(owner) || ts.isClassDeclaration(owner))) return undefined;
      }
      const instantiated = signature.getParameters()[Math.min(index, signature.getParameters().length - 1)];
      return instantiated ? element(checker.getTypeOfSymbol(instantiated)) : undefined;
    };
    /** The flow a node in a flow position takes: its form, the type it flows into and the site the row names. */
    const flowOf = (node: ts.Expression, exposing: boolean): { readonly form: ResolvableForm; readonly target: ts.Type | undefined; readonly site: ts.Node } | undefined => {
      const parent = node.parent;
      const passed: readonly ts.Expression[] = (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments ? parent.arguments : [];
      if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && passed.includes(node)) return { form: "argument", target: argumentTarget(parent, node, exposing), site: parent };
      if ((ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) && parent.initializer === node && parent.type) return { form: "initializer", target: checker.getTypeFromTypeNode(parent.type), site: parent };
      if ((ts.isParameter(parent) || ts.isBindingElement(parent)) && parent.initializer === node) return { form: "initializer", target: checker.getTypeAtLocation(parent), site: parent };
      if (ts.isBinaryExpression(parent) && parent.right === node && isAssignment(parent.operatorToken.kind) && !ts.isObjectLiteralExpression(parent.left) && !ts.isArrayLiteralExpression(parent.left)) {
        return { form: "assignment", target: checker.getTypeAtLocation(parent.left), site: parent };
      }
      if (ts.isPropertyAssignment(parent) && parent.initializer === node) {
        const contextual = checker.getContextualType(node);
        return contextual ? { form: "property", target: contextual, site: parent } : undefined;
      }
      if (ts.isReturnStatement(parent) || (ts.isArrowFunction(parent) && parent.body === node)) {
        const written = returnTypeOf(parent);
        return written ? { form: "return", target: checker.getTypeFromTypeNode(written), site: parent } : undefined;
      }
      if (ts.isAsExpression(parent) || ts.isTypeAssertionExpression(parent)) return { form: "cast", target: checker.getTypeFromTypeNode(parent.type), site: parent };
      return undefined;
    };
    /** A value node that exposes the projection, read by its parent. */
    const judgeValue = (node: ts.Expression): Verdict | undefined => {
      const parent = node.parent;
      const flow = flowOf(node, true);
      if (flow) {
        if (!flow.target) return { refused: flow.form, site: flow.site };
        judgeFlow(flow.form, node, flow.target, flow.site, false);
        return undefined;
      }
      const own = checker.getNonNullableType(checker.getTypeAtLocation(node));
      const parts = own.isUnionOrIntersection() ? own.types : [own];
      const declares = (name: string): boolean => parts.some(part => checker.getPropertiesOfType(part).some(property => property.name === name));
      if (ts.isPropertyAccessExpression(parent) && parent.expression === node) {
        const resolved = checker.getSymbolAtLocation(parent.name);
        return (resolved && isMember(resolved)) || declares(parent.name.text) ? { form: "member" } : { refused: "member", site: parent };
      }
      if (ts.isElementAccessExpression(parent) && parent.expression === node) {
        const names = keyNames(checker.getTypeAtLocation(parent.argumentExpression));
        const indexed = parts.some(part => checker.getIndexInfosOfType(part).length > 0);
        const known = names === undefined ? indexed || parts.some(objectExposes) : names.every(name => declares(name) || (indexed && /^\d+$/.test(name)));
        return known ? { form: "element" } : { refused: "element", site: parent };
      }
      if (ts.isCallExpression(parent) && parent.expression === node) return { form: "callee" };
      if ((ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) && parent.initializer === node) return { form: "initializer" };
      if (ts.isPropertyAssignment(parent) && parent.initializer === node) return { form: "property" };
      if (ts.isReturnStatement(parent) || (ts.isArrowFunction(parent) && parent.body === node)) return { form: "return" };
      if (ts.isBinaryExpression(parent)) {
        const operator = parent.operatorToken.kind;
        if (isAssignment(operator)) return { form: "assignment" };
        if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken || operator === ts.SyntaxKind.AmpersandAmpersandToken) return { form: exposes(checker.getTypeAtLocation(parent)) ? "wrap" : "test" };
        if (operator === ts.SyntaxKind.CommaToken) return { form: parent.right === node ? "wrap" : "statement" };
        if (COMPARISONS.has(operator) || (operator === ts.SyntaxKind.InstanceOfKeyword && parent.left === node)) return { form: "test" };
        return { refused: `unlisted ${ts.SyntaxKind[parent.kind]}`, site: parent };
      }
      if (ts.isSatisfiesExpression(parent)) return { form: "cast" };
      if (ts.isArrayLiteralExpression(parent)) return { form: "array-element" };
      if (ts.isSpreadElement(parent) && ts.isArrayLiteralExpression(parent.parent)) return { form: "spread-array" };
      if (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent) || (ts.isConditionalExpression(parent) && parent.condition !== node)) return { form: "wrap" };
      if (ts.isConditionalExpression(parent) || ts.isTypeOfExpression(parent) || ts.isVoidExpression(parent) || (ts.isPrefixUnaryExpression(parent) && parent.operator === ts.SyntaxKind.ExclamationToken)) return { form: "test" };
      if ((ts.isIfStatement(parent) || ts.isWhileStatement(parent) || ts.isDoStatement(parent) || ts.isSwitchStatement(parent) || ts.isCaseClause(parent)) && parent.expression === node) return { form: "test" };
      if (ts.isForStatement(parent) && parent.condition === node) return { form: "test" };
      if ((ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.expression === node) return { form: "iteration" };
      if (ts.isAwaitExpression(parent)) return { form: "await" };
      if (ts.isExpressionStatement(parent)) return { form: "statement" };
      return { refused: `unlisted ${ts.SyntaxKind[parent.kind]}`, site: parent };
    };
    /** A type node whose type exposes the projection, read by its parent. */
    const judgeType = (node: ts.TypeNode): Verdict => {
      const parent = node.parent;
      if ("type" in parent && parent.type === node && (ts.isFunctionLike(parent) || ANNOTATED.has(parent.kind))) return { form: "annotation" };
      if (TYPE_PARTS.has(parent.kind) || (ts.isTypeOperatorNode(parent) && parent.operator === ts.SyntaxKind.ReadonlyKeyword)) return { form: "type-part" };
      if (ts.isTypeOperatorNode(parent) && parent.operator === ts.SyntaxKind.KeyOfKeyword) return { form: "keyof" };
      if (ts.isTypeParameterDeclaration(parent) && parent.constraint === node) return { form: "constraint" };
      if (ts.isHeritageClause(parent)) return { form: "heritage" };
      if (ts.isIndexedAccessTypeNode(parent) && parent.objectType === node) return { form: "indexed" };
      const generic = ts.isTypeReferenceNode(parent) ? parent.typeName : ts.isExpressionWithTypeArguments(parent) || ts.isNewExpression(parent) || ts.isCallExpression(parent) ? parent.expression : undefined;
      if (generic && "typeArguments" in parent && (parent.typeArguments as readonly ts.TypeNode[] | undefined)?.includes(node)) {
        let named = checker.getSymbolAtLocation(ts.isPropertyAccessExpression(generic) ? generic.name : ts.isQualifiedName(generic) ? generic.right : generic);
        if (named && (named.flags & ts.SymbolFlags.Alias) !== 0) named = checker.getAliasedSymbol(named);
        const declarations = named?.declarations ?? [];
        if (declarations.length > 0 && declarations.every(isDefaultLibrary)) return { form: "lib-generic" };
        return { refused: "type-argument", site: parent };
      }
      return { refused: `unlisted-type ${ts.SyntaxKind[parent.kind]}`, site: parent };
    };
    /** The parameters through which a method or a setter stand-in receives what its base member hands it, by its kind's STAND_IN reading: its own declared parameters, read by position (ownAt; a field and a getter receive through their types: standInType). */
    const standInParameters = (member: ts.ClassElement | ts.ObjectLiteralElementLike, reading: StandInReading): readonly ts.ParameterDeclaration[] => {
      if (reading === "field" || reading === "getter") return [];
      return parametersOf(member);
    };
    /** The type a method's or a setter's own declared parameters take at a position the base hands (cut #6): a this parameter skipped (it receives no argument), a rest parameter's element at and past its own position; undefined past the last. */
    const ownAt = (own: readonly ts.ParameterDeclaration[], at: number): ts.Type | undefined => {
      const received = own.filter(parameter => !(ts.isIdentifier(parameter.name) && parameter.name.text === "this"));
      const last = received[received.length - 1];
      const parameter = received[at] ?? (last?.dotDotDotToken ? last : undefined);
      if (!parameter) return undefined;
      const declared = checker.getTypeAtLocation(parameter);
      return parameter.dotDotDotToken ? (checker.getIndexTypeOfType(declared, ts.IndexKind.Number) ?? declared) : declared;
    };
    /** The type through which a field and a getter stand in, read through the checker (cut #6): a field's own, declared or inferred (whatever its initializer, or none), and the type a getter returns; undefined for a method and a setter. */
    const standInType = (member: ts.ClassElement | ts.ObjectLiteralElementLike, reading: StandInReading): ts.Type | undefined => {
      if (reading === "field") return ts.isPropertyDeclaration(member) ? checker.getTypeAtLocation(member) : undefined;
      if (reading === "getter") return ts.isGetAccessorDeclaration(member) ? checker.getSignatureFromDeclaration(member)?.getReturnType() : undefined;
      return undefined;
    };
    /**
     * A member that stands in for another's signature - a class member overriding or implementing a base or interface
     * member, an object literal's member under a contextual type - keeps every path through which that signature hands it
     * the projection, in the parameters its kind's STAND_IN reading names (a setter: the property's type; a field and a
     * getter: the parameters every call signature of their type takes, standInType and typeReceivers, cut #6). The base member
     * is the one the stand-in's symbol names, under any name form; a computed key the checker resolves to no name may stand
     * in for any member of the base, so it is judged against every one of them. A field or a getter whose type has no call
     * signature while its base member hands it the projection is refused (unresolved-stand-in: fail closed).
     */
    const judgeStandIn = (member: ts.ClassElement | ts.ObjectLiteralElementLike, reading: StandInReading, bases: readonly ts.Type[], form: ResolvableForm): void => {
      const symbol = member.name ? checker.getSymbolAtLocation(member.name) : undefined;
      if (symbol === undefined) return;
      const own = standInParameters(member, reading);
      const typed = reading === "field" || reading === "getter";
      const receivers = typed ? typeReceivers(standInType(member, reading)) : undefined;
      // How many positions the stand-in receives: a base's rest parameter is handed that far.
      const span = Math.max(own.length, ...(receivers ?? []).map(signature => signature.getParameters().length));
      let lost = false;
      let unresolved = false;
      for (const base of bases) {
        const properties = checker.getPropertiesOfType(base);
        for (const property of symbol.escapedName === ts.InternalSymbolName.Computed ? properties : properties.filter(item => item.escapedName === symbol.escapedName)) {
          const declared = checker.getTypeOfSymbol(property);
          const handed: { readonly type: ts.Type; readonly at: number }[] =
            reading === "setter"
              ? [{ type: declared, at: 0 }]
              : checker
                  .getNonNullableType(declared)
                  .getCallSignatures()
                  .flatMap(signature => handedAt(signature, span));
          for (const { type, at } of handed) {
            const paths = heldPaths(type, 0);
            if (typed) {
              if (paths.length > 0 && receivers === undefined) unresolved = true;
              for (const signature of receivers ?? []) {
                const received = receivedAt(signature, at);
                if (received) for (const path of paths) if (!pathKept(received, path)) lost = true;
              }
              continue;
            }
            const received = ownAt(own, at);
            if (!received) continue;
            for (const path of paths) if (!pathKept(received, path)) lost = true;
          }
        }
      }
      if (unresolved) refuse("unresolved-stand-in", member);
      if (lost) refuse(form, member);
    };
    /** The base sides a class element stands in for: an instance element the extended class's instance side and every implemented interface, a static one (the static modifier, or a static block) the extended class's static side, its constructor type. */
    const standInBases = (element: ts.ClassElement, owner: ts.ClassLikeDeclaration): ts.Type[] =>
      (owner.heritageClauses ?? []).flatMap(clause => {
        if (!isStaticElement(element)) return clause.types.map(item => checker.getTypeAtLocation(item));
        return clause.token === ts.SyntaxKind.ExtendsKeyword ? clause.types.map(item => checker.getTypeAtLocation(item.expression)) : [];
      });
    const visit = (node: ts.Node, inType: boolean): void => {
      const internal = inClassModule ? classInternal(model, node, kinds) : undefined;
      if (internal) {
        for (const part of internal) visit(part, inType);
        return;
      }
      const typed = inType || ts.isTypeNode(node);
      const element = classElementOf(node);
      if (element && ts.isClassLike(element.parent)) {
        // Every class element is read by its kind: an unlisted kind is refused (fail closed), a listed one stands in by its STAND_IN reading.
        const kind = listedKind(element, kinds);
        const reading = kind === undefined ? undefined : STAND_IN[kind];
        if (reading === undefined) refuse(`unlisted-class-element ${ts.SyntaxKind[element.kind]}`, element);
        else if (reading !== "none") {
          const bases = standInBases(element, element.parent);
          if (bases.length > 0) judgeStandIn(element, reading, bases, "heritage");
        }
      } else if (ts.isObjectLiteralElementLike(node) && ts.isObjectLiteralExpression(node.parent)) {
        // An object literal's method, getter and setter stand in for its contextual type's member by the same readings (its other elements are flows: property).
        const kind = listedKind(node, CLASS_ELEMENT_KINDS);
        const reading = kind === undefined ? "none" : STAND_IN[kind];
        const contextual = reading === "none" ? undefined : checker.getContextualType(node.parent);
        if (contextual && reading !== "none") judgeStandIn(node, reading, [contextual], "property");
      }
      if (ts.isTypeNode(node)) {
        if (exposes(checker.getTypeFromTypeNode(node))) record(judgeType(node));
      } else if (!typed && ts.isIdentifier(node) && node.text === "arguments" && isValueName(node) && checker.getSymbolAtLocation(node)?.declarations === undefined) {
        const owner = ts.findAncestor(node.parent, item => ts.isFunctionLike(item) && !ts.isArrowFunction(item));
        if (owner && parametersOf(owner as ts.SignatureDeclaration).some(parameter => heldPaths(checker.getTypeAtLocation(parameter), 0).length > 0)) refuse("arguments", node.parent);
      } else if (!typed && ts.isShorthandPropertyAssignment(node)) {
        const contextual = checker.getContextualType(node.parent);
        const property = contextual ? checker.getPropertyOfType(contextual, node.name.text) : undefined;
        const exposing = exposes(checker.getTypeAtLocation(node.name));
        if (property) judgeFlow("property", node.name, checker.getTypeOfSymbol(property), node, !exposing);
        else if (exposing) ok("property");
      } else if (!typed && ts.isExpression(node) && (!ts.isIdentifier(node) || isValueName(node))) {
        if (exposes(checker.getTypeAtLocation(node))) record(judgeValue(node));
        else {
          const flow = flowOf(node, false);
          if (flow?.target) judgeFlow(flow.form, node, flow.target, flow.site, true);
          else if (flow && heldPaths(checker.getTypeAtLocation(node), 0).length > 0) refuse(flow.form, flow.site);
        }
      }
      ts.forEachChild(node, child => visit(child, typed));
    };
    visit(source, false);
    if (forms.size > 0 || refused.length > 0) result.set(rel, { forms: [...forms].sort(), refused: refused.sort() });
  }
  return result;
}
/** True for a declaration that carries its own body (a function, a method, an accessor, a constructor, an arrow, a function expression). */
const hasBody = (declaration: ts.Declaration): boolean => "body" in declaration && declaration.body !== undefined;
const isAssignment = (operator: ts.SyntaxKind): boolean =>
  operator === ts.SyntaxKind.EqualsToken || operator === ts.SyntaxKind.QuestionQuestionEqualsToken || operator === ts.SyntaxKind.BarBarEqualsToken || operator === ts.SyntaxKind.AmpersandAmpersandEqualsToken;
const COMPARISONS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
/** Declarations and expressions whose written type is an annotation (a function-like's return type is one too). */
const ANNOTATED: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.Parameter,
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.IndexSignature,
  ts.SyntaxKind.AsExpression,
  ts.SyntaxKind.TypeAssertionExpression,
  ts.SyntaxKind.SatisfiesExpression,
  ts.SyntaxKind.TypePredicate,
]);
const TYPE_PARTS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.UnionType,
  ts.SyntaxKind.IntersectionType,
  ts.SyntaxKind.ParenthesizedType,
  ts.SyntaxKind.ArrayType,
  ts.SyntaxKind.TupleType,
  ts.SyntaxKind.NamedTupleMember,
  ts.SyntaxKind.OptionalType,
  ts.SyntaxKind.RestType,
]);

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
      label: "residual: an invocation, an admission or a host effect a render schedules past the judge's settle window reads quiet",
      cases: [
        { subject: { plant: "deferred-invoke" }, expect: QUIET },
        { subject: { plant: "deferred-admit" }, expect: QUIET },
        { subject: { plant: "deferred-effect" }, expect: QUIET },
      ],
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
      label:
        "residual: drift held where neither encoding reads - behind a getter neither invokes (a prototype accessor, a non-enumerable own accessor), in a closure's captured state, in a #private field a method moves - reads quiet",
      cases: [
        { subject: { plant: "getter-state" }, expect: QUIET },
        { subject: { plant: "closure-state" }, expect: QUIET },
        { subject: { plant: "accessor-state" }, expect: QUIET },
        { subject: { plant: "private-state" }, expect: QUIET },
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
  /** Its forms as readForms reads them, or null where no node of it exposes the projection (cut #4; absent on the rows cut #3 pinned, whose cases are unchanged). */
  readonly forms?: FormsReading | null;
  /** The class's own module for this case, when the case plants one (CLASS-MODULE); absent, the real src/workbench/observation.ts. */
  readonly classModule?: string;
  /** The class-element kinds both scans are given for this case, when it narrows them (CLASS-ELEMENT-KINDS' fail-closed cases, cut #5); absent, CLASS_ELEMENT_KINDS. */
  readonly kinds?: readonly ClassElementKind[];
}
const reached = (names: boolean, value: readonly string[], type: readonly string[], holders: readonly string[]): Reach => ({ names, value, type, holders });
const reach = (module: string, text: string, expect: Reach | null, also: Readonly<Record<string, string>> = {}): ReachItem => ({ plants: { ...also, [module]: text }, module, expect });
const formsRead = (forms: readonly ResolvableForm[], refused: readonly string[]): FormsReading => ({ forms, refused });
/** A cut #4 case: its reach and its forms, each pinned; a CLASS-MODULE case names the planted class module it reads, and a cut #5 fail-closed case the class-element kinds it narrows the scans to. */
const reachForms = (
  module: string,
  text: string,
  expect: Reach | null,
  forms: FormsReading | null,
  also: Readonly<Record<string, string>> = {},
  classModule?: string,
  kinds?: readonly ClassElementKind[],
): ReachItem => ({
  plants: { ...also, [module]: text },
  module,
  expect,
  forms,
  ...(classModule ? { classModule } : {}),
  ...(kinds ? { kinds } : {}),
});
/** A cut #5 case over a planted class module of its own (CLASS-MODULE, CLASS-ELEMENT-KINDS): the module is the class's own module. */
const classCase = (module: string, text: string, expect: Reach | null, forms: FormsReading | null, kinds?: readonly ClassElementKind[]): ReachItem => reachForms(module, text, expect, forms, {}, module, kinds);
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
        "a module that never names the class but holds it through what carries it - a render model's member call, a pass-through, an optional chain, a call's result, a container (an array, a keyed map), a function or a getter that yields it, the instance four wrappers deep and a typed reader three deep (the depth bound's inside) - reaches the projection",
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
        reach("src/ui/census-reach-deep4.ts", 'import type { Deep4 } from "./census-reach-deep4-type.js";\nexport const relayDeep4 = (views: Deep4) => views;\n', reached(false, [], [], ["views"]), {
          "src/ui/census-reach-deep4-type.ts": `${OBS_UI}export type Deep4 = ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ObservationProjection>>>>;\n`,
        }),
        reach("src/ui/census-reach-reader3.ts", 'import type { Reader3 } from "./census-reach-reader3-type.js";\nexport const relayReader3 = (views: Reader3) => views;\n', reached(false, [], [], ["views"]), {
          "src/ui/census-reach-reader3-type.ts": `${OBS_UI}export type Reader3 = ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, Pick<ObservationProjection, "query">>>>;\n`,
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
      id: "KEY-FORMS",
      label:
        "an element access or a destructuring keyed by what the checker types as a literal - a const identifier, a for-of variable over an as-const tuple, a parenthesized, as-cast or template literal, an enum member, an optional access on a possibly-undefined holder, a computed binding (literal or const), a string binding, an assignment pattern's computed or string key, a conditional key, a keyof key - reads its member, a literal union member by member",
      cases: [
        reach("src/ui/census-reach-key-const.ts", `${OBS_UI}const FORGET = "markStale" as const;\nexport const forget = (projection: ObservationProjection): unknown => projection[FORGET];\n`, reached(true, ["markStale"], [], ["projection"])),
        reach(
          "src/ui/census-reach-key-loop.ts",
          `${OBS_UI}export function drop(projection: ObservationProjection): void {\n  for (const member of ["disconnect", "reconnect"] as const) void projection[member];\n}\n`,
          reached(true, ["disconnect", "reconnect"], [], ["projection"]),
        ),
        reach("src/ui/census-reach-key-paren.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => projection[("markStale")];\n`, reached(true, ["markStale"], [], ["projection"])),
        reach("src/ui/census-reach-key-cast.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => projection["markStale" as const];\n`, reached(true, ["markStale"], [], ["projection"])),
        reach(
          "src/ui/census-reach-key-template.ts",
          `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => projection[\`mark\${"Stale"}\` as const];\n`,
          reached(true, ["markStale"], [], ["projection"]),
        ),
        reach("src/ui/census-reach-key-plain-template.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => projection[\`markStale\`];\n`, reached(true, ["markStale"], [], ["projection"])),
        reach(
          "src/ui/census-reach-key-enum.ts",
          `${OBS_UI}enum Member {\n  Drop = "disconnect",\n}\nexport const drop = (projection: ObservationProjection): unknown => projection[Member.Drop];\n`,
          reached(true, ["disconnect"], [], ["projection"]),
        ),
        reach("src/ui/census-reach-key-optional.ts", `${OBS_UI}export const forget = (projection: ObservationProjection | undefined): unknown => projection?.["markStale"];\n`, reached(true, ["markStale"], [], ["projection"])),
        reach(
          "src/ui/census-reach-key-bind-literal.ts",
          `${OBS_UI}export function link(projection: ObservationProjection): unknown {\n  const { ["relate"]: relate } = projection;\n  return relate;\n}\n`,
          reached(true, ["relate"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-bind-const.ts",
          `${OBS_UI}const ADMIT = "ingest" as const;\nexport function admit(projection: ObservationProjection): unknown {\n  const { [ADMIT]: ingest } = projection;\n  return ingest;\n}\n`,
          reached(true, ["ingest"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-bind-string.ts",
          `${OBS_UI}export function stale(projection: ObservationProjection): unknown {\n  const { "markStale": forget } = projection;\n  return forget;\n}\n`,
          reached(true, ["markStale"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-assign-const.ts",
          `${OBS_UI}const VERDICT = "refresh" as const;\nexport function verdict(projection: ObservationProjection): unknown {\n  let refresh: unknown;\n  ({ [VERDICT]: refresh } = projection);\n  return refresh;\n}\n`,
          reached(true, ["refresh"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-assign-string.ts",
          `${OBS_UI}export function peek(projection: ObservationProjection): unknown {\n  let events: unknown;\n  ({ "events": events } = projection);\n  return events;\n}\n`,
          reached(true, ["events"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-conditional.ts",
          `${OBS_UI}export const either = (projection: ObservationProjection, wide: boolean): unknown => projection[wide ? "stats" : "ingest"];\n`,
          reached(true, ["ingest", "stats"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-keyof.ts",
          `${OBS_UI}export const call = (projection: ObservationProjection, member: keyof ObservationProjection): unknown => projection[member];\n`,
          reached(true, [...READ_MEMBERS, ...ADMISSION_MEMBERS].sort(), [], ["projection"]),
        ),
      ],
    },
    {
      id: "KEY-HOLDERS",
      label:
        "a literal key over each holder shape - a render model's projection, a nested binding or assignment pattern through it, an intersection, a generic holder, a for-of binding over a container, a parameter binding - and in a type position (an indexed access through an aliased class and key, a typeof query indexed by a typeof key) reads its member",
      cases: [
        reach("src/ui/census-reach-key-model.ts", `${MODEL}const FORGET = "markStale" as const;\nexport const forget = (model: InspectorModel): unknown => model.projection[FORGET];\n`, reached(false, ["markStale"], [], ["projection"])),
        reach(
          "src/ui/census-reach-key-nested-bind.ts",
          `${MODEL}const FORGET = "markStale" as const;\nexport function nested(model: InspectorModel): unknown {\n  const { projection: { [FORGET]: stale } } = model;\n  return stale;\n}\n`,
          reached(false, ["markStale"], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-key-nested-assign.ts",
          `${MODEL}const FORGET = "markStale" as const;\nexport function nested(model: InspectorModel): unknown {\n  let stale: unknown;\n  ({ projection: { [FORGET]: stale } } = model);\n  return stale;\n}\n`,
          reached(false, ["markStale"], [], []),
        ),
        reach(
          "src/ui/census-reach-key-intersection.ts",
          `${OBS_UI}const FORGET = "markStale" as const;\nexport const forget = (holder: ObservationProjection & { tag: string }): unknown => holder[FORGET];\n`,
          reached(true, ["markStale"], [], ["holder"]),
        ),
        reach(
          "src/ui/census-reach-key-generic.ts",
          `${OBS_UI}const FORGET = "markStale" as const;\nexport const forget = <T extends ObservationProjection>(holder: T): unknown => holder[FORGET];\n`,
          reached(true, ["markStale"], [], []),
        ),
        reach(
          "src/ui/census-reach-key-forof-bind.ts",
          `${OBS_UI}const FORGET = "markStale" as const;\nexport function each(views: readonly ObservationProjection[]): void {\n  for (const { [FORGET]: stale } of views) void stale;\n}\n`,
          reached(true, ["markStale"], [], ["views"]),
        ),
        reach(
          "src/ui/census-reach-key-param-bind.ts",
          `${OBS_UI}const FORGET = "markStale" as const;\nexport const forget = ({ [FORGET]: stale }: ObservationProjection): unknown => stale;\n`,
          reached(true, ["markStale"], [], []),
        ),
        reach("src/ui/census-reach-key-type-alias.ts", `${OBS_UI}type View = ObservationProjection;\ntype Sinks = "relate";\nexport type Sink = View[Sinks];\n`, reached(true, [], ["relate"], [])),
        reach(
          "src/ui/census-reach-key-typeof.ts",
          `${OBS_UI}const FORGET = "markStale" as const;\ndeclare const projection: ObservationProjection;\nexport type Forget = (typeof projection)[typeof FORGET];\n`,
          reached(true, [], ["markStale"], ["projection"]),
        ),
      ],
    },
    {
      id: "UNRESOLVED-KEYS",
      label: `a key that resolves to no literal member set over a value that exposes the class's members - a type parameter, a string parameter, a widened let, a string key over a union holder or a typed reader, a symbol, a concatenation, a for-in variable, a mapped type's key - fails closed as ${UNRESOLVED_KEY}`,
      cases: [
        reach(
          "src/ui/census-reach-unresolved-type-parameter.ts",
          `${OBS_UI}export const pick = <K extends keyof ObservationProjection>(projection: ObservationProjection, member: K): unknown => projection[member];\n`,
          reached(true, [UNRESOLVED_KEY], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-unresolved-string.ts",
          `${OBS_UI}export const named = (projection: ObservationProjection, member: string): unknown => projection[member];\n`,
          reached(true, [UNRESOLVED_KEY], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-unresolved-let.ts",
          `${OBS_UI}let member = "markStale";\nexport const forget = (projection: ObservationProjection): unknown => projection[member];\n`,
          reached(true, [UNRESOLVED_KEY], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-unresolved-union.ts",
          `${OBS_UI}export const pick = (holder: ObservationProjection | { other(): void }, member: string): unknown => holder[member];\n`,
          reached(true, [UNRESOLVED_KEY], [], ["holder"]),
        ),
        reach(
          "src/ui/census-reach-unresolved-reader.ts",
          `${OBS_UI}export const named = (reader: Pick<ObservationProjection, "query">, member: string): unknown => reader[member];\n`,
          reached(true, [UNRESOLVED_KEY], [], ["reader"]),
        ),
        reach("src/ui/census-reach-unresolved-symbol.ts", `${OBS_UI}export const iterate = (projection: ObservationProjection): unknown => projection[Symbol.iterator];\n`, reached(true, [UNRESOLVED_KEY], [], ["projection"])),
        reach("src/ui/census-reach-unresolved-concat.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => projection["mark" + "Stale"];\n`, reached(true, [UNRESOLVED_KEY], [], ["projection"])),
        reach(
          "src/ui/census-reach-unresolved-for-in.ts",
          `${OBS_UI}export function each(projection: ObservationProjection): void {\n  for (const key in projection) void projection[key];\n}\n`,
          reached(true, [UNRESOLVED_KEY], [], ["projection"]),
        ),
        reach(
          "src/ui/census-reach-unresolved-mapped.ts",
          `${OBS_UI}export type Every = { [K in keyof ObservationProjection]: ObservationProjection[K] };\n`,
          reached(true, [], [UNRESOLVED_KEY], []),
        ),
      ],
    },
    {
      id: "R-ERASED-ACCESS",
      label:
        "residual: a module that reaches the projection only through an erased or structural type - a cast from unknown, a structural interface of its own, Reflect, an any - reads as reaching nothing (no node of it exposes the projection, so readForms reads nothing there either; the erasure is refused in the module that erased it: ERASING-FLOWS, LIBRARY-FLOWS), and a typed holder's member reached through Reflect, a cast through unknown, a cast to any, a prototype lookup or an Object property call reads as the holder alone to projectionReach, while readForms refuses the erasing step itself (ERASING-FLOWS, LIBRARY-FLOWS)",
      cases: [
        reach("src/ui/census-reach-cast.ts", "export const forget = (value: unknown): void => (value as { markStale(input: unknown): void }).markStale({});\n", null),
        reach("src/ui/census-reach-structural.ts", "interface Counts {\n  stats(): { nodes: number };\n}\nexport const nodes = (source: Counts): number => source.stats().nodes;\n", null),
        reach("src/ui/census-reach-reflect.ts", 'export const admit = (value: object): unknown => Reflect.get(value, "refresh");\n', null),
        reach("src/ui/census-reach-any.ts", "export const stale = (value: any): void => value.markStale({});\n", null),
        reach("src/ui/census-reach-erased-reflect.ts", `${OBS_UI}export const admit = (projection: ObservationProjection): unknown => Reflect.get(projection, "refresh");\n`, reached(true, [], [], ["projection"])),
        reach(
          "src/ui/census-reach-erased-cast.ts",
          `${OBS_UI}export const forget = (projection: ObservationProjection): void => (projection as unknown as { markStale(input: unknown): void }).markStale({});\n`,
          reached(true, [], [], ["projection"]),
        ),
        reach("src/ui/census-reach-erased-any.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): void => (projection as any).markStale({});\n`, reached(true, [], [], ["projection"])),
        reach("src/ui/census-reach-erased-prototype.ts", `${OBS_UI}export const forget = (projection: ObservationProjection): unknown => Object.getPrototypeOf(projection).markStale;\n`, reached(true, [], [], ["projection"])),
        reach(
          "src/ui/census-reach-erased-define.ts",
          `${OBS_UI}export const patch = (projection: ObservationProjection): unknown => Object.defineProperty(projection, "refresh", { value: () => "applied" });\n`,
          reached(true, [], [], ["projection"]),
        ),
      ],
    },
    {
      id: "R-DEEP-CARRIER",
      label: `residual: a module that only relays a value whose carrier nests past the depth bound (the instance five wrappers deep, a typed reader four deep; CARRIER_DEPTH ${CARRIER_DEPTH}) or an object type whose property holds the projection reads as reaching nothing to projectionReach; readForms follows such a holder through at most CARRIER_DEPTH + 1 held-path steps, each ending at a carrier the reach scan's test reads (RELAYS judges the five-deep relay), and judges no flow past that (a relay of the instance nine wrappers deep into unknown reads no form)`,
      cases: [
        reach("src/ui/census-reach-deep5.ts", 'import type { Deep5 } from "./census-reach-deep5-type.js";\nexport const relayDeep5 = (views: Deep5) => views;\n', null, {
          "src/ui/census-reach-deep5-type.ts": `${OBS_UI}export type Deep5 = ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ObservationProjection>>>>>;\n`,
        }),
        reach("src/ui/census-reach-reader4.ts", 'import type { Reader4 } from "./census-reach-reader4-type.js";\nexport const relayReader4 = (views: Reader4) => views;\n', null, {
          "src/ui/census-reach-reader4-type.ts": `${OBS_UI}export type Reader4 = ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, Pick<ObservationProjection, "query">>>>>;\n`,
        }),
        reach("src/ui/census-reach-box.ts", 'import type { Box } from "./census-reach-box-type.js";\nexport const relayBox = (box: Box) => box;\n', null, {
          "src/ui/census-reach-box-type.ts": `${OBS_UI}export interface Box {\n  readonly inner: { readonly projection: ObservationProjection };\n}\n`,
        }),
        reachForms("src/ui/census-forms-deep9-relay.ts", 'import type { Deep9 } from "./census-forms-deep9-type.js";\nexport const relayDeep9 = (views: Deep9): unknown => views;\n', null, null, {
          "src/ui/census-forms-deep9-type.ts": `${OBS_UI}type Map3<T> = ReadonlyMap<string, ReadonlyMap<string, ReadonlyMap<string, T>>>;\nexport type Deep9 = Map3<Map3<Map3<ObservationProjection>>>;\n`,
        }),
      ],
    },
    {
      id: "RESOLVABLE-FORMS",
      label:
        "quiet: a node that exposes the projection in each resolvable form - a member, an element, a callee, an argument to a typed src parameter and to a container's own element, an initializer, an assignment, an object property, a return, a satisfies, an array element and spread, a wrapper (parentheses, a non-null assertion, a conditional branch, ??), a test (a condition, a comparison, typeof, !, switch), an iteration, an await, a statement, and on the type side an annotation, a union, array and readonly part, keyof, a constraint, a heritage clause, an indexed access and a library generic's type argument - is read and refused nowhere",
      cases: [
        reachForms("src/ui/census-forms-member.ts", `${OBS_UI}export const revision = (projection: ObservationProjection): number => projection.relationRevision() + projection["relationRevision"]();\n`, reached(true, ["relationRevision"], [], ["projection"]), formsRead(["annotation", "element", "member"], [])),
        reachForms(
          "src/ui/census-forms-callee.ts",
          `${OBS_UI}export function nodes(source: () => ObservationProjection): number {\n  const projection = source();\n  return projection.stats().nodes;\n}\n`, reached(true, ["stats"], [], ["projection", "source"]), formsRead(["annotation", "callee", "initializer", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-argument.ts",
          `${OBS_UI}const count = (all: readonly ObservationProjection[]): number => all.length;\nexport function collect(projection: ObservationProjection): number {\n  const views: ObservationProjection[] = [];\n  views.push(projection);\n  return count(views);\n}\n`, reached(true, [], [], ["all", "projection", "views"]), formsRead(["annotation", "argument", "member", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-assignment.ts",
          `${OBS_UI}export function hold(projection: ObservationProjection): number {\n  let held: ObservationProjection | undefined;\n  held = projection;\n  if (held === undefined) return 0;\n  return (held ?? projection).stats().nodes;\n}\n`, reached(true, ["stats"], [], ["held", "projection"]), formsRead(["annotation", "assignment", "member", "statement", "test", "type-part", "wrap"], []),
        ),
        reachForms(
          "src/ui/census-forms-property.ts",
          `${OBS_UI}export const pick = (projection: ObservationProjection): ObservationProjection => projection;\nexport function bundle(projection: ObservationProjection): { readonly views: readonly ObservationProjection[] } {\n  const views = [projection, ...[projection]];\n  return { views: views satisfies readonly ObservationProjection[] };\n}\n`, reached(true, [], [], ["pick", "projection", "views"]), formsRead(["annotation", "array-element", "cast", "initializer", "property", "return", "spread-array", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-iteration.ts",
          `${OBS_UI}export async function each(views: readonly ObservationProjection[], later: Promise<ObservationProjection>): Promise<number> {\n  let total = 0;\n  for (const view of views) total += view.stats().nodes;\n  const settled = await later;\n  return total + (typeof settled === "object" && !settled ? 0 : settled.stats().edges);\n}\n`, reached(true, ["stats"], [], ["later", "settled", "view", "views"]), formsRead(["annotation", "await", "initializer", "iteration", "lib-generic", "member", "test", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-wrap.ts",
          `${OBS_UI}export function touch(projection: ObservationProjection | undefined, other: ObservationProjection): number {\n  projection;\n  const chosen = projection ? projection : other;\n  switch (chosen) {\n    case other:\n      return (void 0, chosen)!.stats().nodes;\n    default:\n      return 0;\n  }\n}\n`, reached(true, ["stats"], [], ["chosen", "other", "projection"]), formsRead(["annotation", "initializer", "member", "statement", "test", "type-part", "wrap"], []),
        ),
        reachForms(
          "src/ui/census-forms-types.ts",
          `${OBS_UI}export type Key = keyof ObservationProjection;\nexport type Revision = ObservationProjection["relationRevision"];\nexport const first = <T extends ObservationProjection>(holder: T): number => holder.stats().nodes;\nexport interface Lens extends Pick<ObservationProjection, "window"> {\n  readonly tag: string;\n}\nexport type Maybe = ObservationProjection | undefined;\n`, reached(true, ["stats"], ["relationRevision"], []), formsRead(["annotation", "constraint", "heritage", "indexed", "keyof", "lib-generic", "member", "type-part"], []),
        ),
      ],
    },
    {
      id: "GENERIC-ACCESSORS",
      label:
        "a value that exposes the projection handed to a generic over an unconstrained type parameter - a module's own generic accessor (in a render module and through a non-render reader's deps), a generic destructuring accessor, a cross-module generic utility, an explicit type argument, a src generic class - is refused at the call",
      cases: [
        reachForms(
          "src/ui/census-forms-generic-own.ts",
          `${OBS_UI}function memberOf<T, K extends keyof T>(target: T, key: K): T[K] {\n  return target[key];\n}\nexport function forget(reader: ObservationProjection, input: Parameters<ObservationProjection["markStale"]>[0]): void {\n  memberOf(reader, "markStale").call(reader, input);\n}\n`, reached(true, [], ["markStale"], ["reader"]), formsRead(["annotation", "indexed"], ["argument: memberOf(reader, \"markStale\")", "argument: memberOf(reader, \"markStale\").call(reader, input)"]),
        ),
        reachForms(
          "src/workbench/census-forms-generic-deps.ts",
          `import type { ObservationProjection, ObservationScope } from "./observation.js";\nfunction peekOf<T, K extends keyof T>(target: T, key: K): T[K] {\n  return target[key];\n}\nexport function peek(deps: { readonly projection: ObservationProjection }, scope: ObservationScope): number {\n  return peekOf(deps.projection, "events")({ scope, limit: 1 }).events.length;\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["argument: peekOf(deps.projection, \"events\")"]),
        ),
        reachForms(
          "src/ui/census-forms-generic-destructure.ts",
          `${OBS_UI}function take<T, K extends keyof T>(target: T, key: K): T[K] {\n  const { [key]: value } = target;\n  return value;\n}\nexport const forget = (reader: ObservationProjection): unknown => take(reader, "markStale");\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: take(reader, \"markStale\")"]),
        ),
        reachForms("src/ui/census-forms-generic-util.ts", `${OBS_UI}import { memberAt } from "./census-forms-generic-util-at.js";\nexport const forget = (reader: ObservationProjection): unknown => memberAt(reader, "markStale");\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: memberAt(reader, \"markStale\")"]), {
          "src/ui/census-forms-generic-util-at.ts": "export function memberAt<T, K extends keyof T>(target: T, key: K): T[K] {\n  return target[key];\n}\n",
        }),
        reachForms("src/ui/census-forms-generic-explicit.ts", `${OBS_UI}function same<T>(value: T): T {\n  return value;\n}\nexport const keep = (reader: ObservationProjection): ObservationProjection => same<ObservationProjection>(reader);\n`, reached(true, [], [], ["keep", "reader"]), formsRead(["annotation", "initializer", "return"], ["argument: same<ObservationProjection>(reader)", "type-argument: same<ObservationProjection>(reader)"])),
        reachForms("src/ui/census-forms-generic-class.ts", `${OBS_UI}class Box<T> {\n  constructor(readonly held: T) {}\n}\nexport const box = (reader: ObservationProjection): Box<ObservationProjection> => new Box(reader);\n`, reached(true, [], [], ["box", "reader"]), formsRead(["annotation", "initializer", "return"], ["argument: new Box(reader)", "type-argument: Box<ObservationProjection>"])),
      ],
    },
    {
      id: "GENERIC-ALIASES",
      label: "the projection as a type argument of a generic declared in src - a generic indexed-access alias, an infer-conditional alias, a src generic interface - and a conditional type over it are refused",
      cases: [
        reachForms("src/ui/census-forms-alias-indexed.ts", `${OBS_UI}type MemberType<T, K extends keyof T> = T[K];\nexport type RelateSink = MemberType<ObservationProjection, "relate">;\n`, reached(true, [], [], []), formsRead([], ["type-argument: MemberType<ObservationProjection, \"relate\">"])),
        reachForms("src/ui/census-forms-alias-infer.ts", `${OBS_UI}type InferStale<T> = T extends { markStale: infer F } ? F : never;\nexport type Stale = InferStale<ObservationProjection>;\n`, reached(true, [], [], []), formsRead([], ["type-argument: InferStale<ObservationProjection>"])),
        reachForms("src/ui/census-forms-alias-interface.ts", `${OBS_UI}interface Holder<T> {\n  readonly held: T;\n}\nexport type Held = Holder<ObservationProjection>;\n`, reached(true, [], [], []), formsRead(["annotation"], ["type-argument: Holder<ObservationProjection>"])),
        reachForms("src/ui/census-forms-alias-conditional.ts", `${OBS_UI}export type Stale = ObservationProjection extends { markStale: infer F } ? F : never;\n`, reached(true, [], [], []), formsRead([], ["unlisted-type ConditionalType: ObservationProjection extends { markStale: infer F } ? F : never"])),
      ],
    },
    {
      id: "CLASS-MODULE",
      label:
        "the class's own module is read outside the class's instance members: a module function, a public static member and a static block (static by its kind) that admit through the projection are read and a static block's erasing cast is refused, an instance member's decorator and computed name (they run when the class is defined) are read, and the class's instance members' own code (judged by REPROJECTION and MEMBERS) is not",
      cases: [
        reachForms(
          "src/workbench/census-forms-class-function.ts",
          "export class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n}\nexport function forget(projection: ObservationProjection, input: unknown): void {\n  projection.markStale(input);\n}\n", reached(true, ["markStale"], [], ["projection"]), formsRead(["annotation", "member"], []),
          {},
          "src/workbench/census-forms-class-function.ts",
        ),
        reachForms(
          "src/workbench/census-forms-class-static.ts",
          "export class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  static forget(projection: ObservationProjection, input: unknown): void {\n    projection.markStale(input);\n  }\n}\n", reached(true, ["markStale"], [], ["projection"]), formsRead(["annotation", "member"], []),
          {},
          "src/workbench/census-forms-class-static.ts",
        ),
        reachForms(
          "src/workbench/census-forms-class-internal.ts",
          "export class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  refresh(): void {\n    this.markStale(0);\n  }\n}\n", null, null,
          {},
          "src/workbench/census-forms-class-internal.ts",
        ),
        classCase(
          "src/workbench/census-forms-class-static-block.ts",
          "export class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  static forget: ((projection: ObservationProjection, input: unknown) => void) | undefined;\n  static {\n    ObservationProjection.forget = (projection, input) => projection.markStale(input);\n  }\n}\n",
          reached(true, ["markStale"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        classCase(
          "src/workbench/census-forms-class-static-block-cast.ts",
          "export class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  static erase: ((projection: ObservationProjection) => unknown) | undefined;\n  static {\n    ObservationProjection.erase = projection => projection as unknown;\n  }\n}\n",
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["cast: projection as unknown"]),
        ),
        classCase(
          "src/workbench/census-forms-class-decorator.ts",
          "const track =\n  (sink: (projection: ObservationProjection) => void) =>\n  <T>(value: T, context: ClassMethodDecoratorContext): T => {\n    void sink;\n    void context;\n    return value;\n  };\nexport class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  @track(projection => projection.markStale({}))\n  refresh(): void {}\n}\n",
          reached(true, ["markStale"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        classCase(
          "src/workbench/census-forms-class-computed.ts",
          "const held: { projection?: ObservationProjection } = {};\nexport class ObservationProjection {\n  markStale(input: unknown): void {\n    void input;\n  }\n  [String(held.projection?.markStale({}))](): void {}\n}\n",
          reached(true, ["markStale"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "ERASING-FLOWS",
      label:
        "a value that exposes the projection flowing into a type that hides it - a structural seam of the module's own, a cast to any or through unknown, an unknown variable, assignment, field or default, a return into unknown, an overload whose implementation takes unknown - is refused",
      cases: [
        reachForms(
          "src/ui/census-forms-erase-seam.ts",
          `${OBS_UI}interface StaleSeam {\n  markStale(input: unknown): void;\n}\nconst forgetVia = (seam: StaleSeam, input: unknown): void => seam.markStale(input);\nexport const forget = (reader: ObservationProjection, input: unknown): void => forgetVia(reader, input);\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: forgetVia(reader, input)"]),
        ),
        reachForms("src/ui/census-forms-erase-any.ts", `${OBS_UI}export const forget = (reader: ObservationProjection): unknown => (reader as any).markStale({});\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["cast: reader as any"])),
        reachForms("src/ui/census-forms-erase-unknown.ts", `${OBS_UI}export const forget = (reader: ObservationProjection): void => (reader as unknown as { markStale(input: unknown): void }).markStale({});\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["cast: reader as unknown"])),
        reachForms("src/ui/census-forms-erase-variable.ts", `${OBS_UI}export function relay(reader: ObservationProjection): unknown {\n  const held: unknown = reader;\n  return held;\n}\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["initializer: held: unknown = reader"])),
        reachForms("src/ui/census-forms-erase-assign.ts", `${OBS_UI}let held: unknown;\nexport function relay(reader: ObservationProjection): void {\n  held = reader;\n}\nexport const last = (): unknown => held;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation", "statement"], ["assignment: held = reader"])),
        reachForms("src/ui/census-forms-erase-field.ts", `${OBS_UI}export class Relay {\n  held: unknown;\n  constructor(reader: ObservationProjection) {\n    this.held = reader;\n  }\n}\n`, reached(true, [], [], ["reader"]), formsRead(["annotation", "statement"], ["assignment: this.held = reader"])),
        reachForms("src/ui/census-forms-erase-default.ts", `${OBS_UI}export const relay = (reader: ObservationProjection, held: unknown = reader): unknown => held;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["initializer: held: unknown = reader"])),
        reachForms("src/ui/census-forms-erase-return.ts", `${OBS_UI}export const relay = (reader: ObservationProjection): unknown => reader;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["return: (reader: ObservationProjection): unknown => reader"])),
        reachForms(
          "src/ui/census-forms-erase-overload.ts",
          `${OBS_UI}function sink(reader: ObservationProjection): void;\nfunction sink(reader: unknown): void {\n  (reader as { markStale(input: unknown): void }).markStale({});\n}\nexport const forget = (reader: ObservationProjection): void => sink(reader);\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: sink(reader)"]),
        ),
      ],
    },
    {
      id: "LIBRARY-FLOWS",
      label:
        "a value that exposes the projection handed to a library parameter other than a container's own element type - Reflect.get, Object.getPrototypeOf, Object.defineProperty, Object.values, JSON.stringify, Promise.resolve, a call's or a bind's this argument - is refused",
      cases: [
        reachForms("src/ui/census-forms-lib-reflect.ts", `${OBS_UI}export const admit = (reader: ObservationProjection): unknown => Reflect.get(reader, "refresh");\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: Reflect.get(reader, \"refresh\")"])),
        reachForms("src/ui/census-forms-lib-prototype.ts", `${OBS_UI}export const stale = (reader: ObservationProjection): unknown => Object.getPrototypeOf(reader).markStale;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: Object.getPrototypeOf(reader)"])),
        reachForms("src/ui/census-forms-lib-define.ts", `${OBS_UI}export function patch(reader: ObservationProjection): void {\n  Object.defineProperty(reader, "refresh", { value: () => "applied" });\n}\n`, reached(true, [], [], ["reader"]), formsRead(["annotation", "statement"], ["argument: Object.defineProperty(reader, \"refresh\", { value: () => \"applied\" })"])),
        reachForms("src/ui/census-forms-lib-values.ts", `${OBS_UI}export const members = (reader: ObservationProjection): unknown => Object.values(reader);\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: Object.values(reader)"])),
        reachForms("src/ui/census-forms-lib-json.ts", `${OBS_UI}export const text = (reader: ObservationProjection): string => JSON.stringify(reader);\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["argument: JSON.stringify(reader)"])),
        reachForms("src/ui/census-forms-lib-promise.ts", `${OBS_UI}export const later = (reader: ObservationProjection): Promise<ObservationProjection> => Promise.resolve(reader);\n`, reached(true, [], [], ["later", "reader"]), formsRead(["annotation", "initializer", "lib-generic", "return"], ["argument: Promise.resolve(reader)"])),
        reachForms("src/ui/census-forms-lib-call.ts", `${OBS_UI}export const forget = (reader: ObservationProjection, input: Parameters<ObservationProjection["markStale"]>[0]): void => reader.markStale.call(reader, input);\n`, reached(true, ["markStale"], ["markStale"], ["reader"]), formsRead(["annotation", "indexed", "member"], ["argument: reader.markStale.call(reader, input)"])),
        reachForms("src/ui/census-forms-lib-bind.ts", `${OBS_UI}export const forgetter = (reader: ObservationProjection): unknown => reader.markStale.bind(reader);\n`, reached(true, ["markStale"], [], ["reader"]), formsRead(["annotation", "member"], ["argument: reader.markStale.bind(reader)"])),
      ],
    },
    {
      id: "RELAYS",
      label:
        "a callback or a holder that hands the projection on into a type that hides it - a callback whose own parameter is a structural seam or a generic, an annotated arrow, a promise's then, an object holding the projection (built first, written inline, in an array, a class instance, a getter, a record, a map), a carrier nested past the reach scan's bound (five deep) and a function returning a holder - is refused",
      cases: [
        reachForms(
          "src/ui/census-forms-relay-callback.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nconst forget = (seam: Seam): void => seam.markStale({});\nexport const forgetAll = (views: readonly ObservationProjection[]): void => views.forEach(forget);\n`, reached(true, [], [], ["views"]), formsRead(["annotation", "member", "type-part"], ["argument: views.forEach(forget)"]),
        ),
        reachForms("src/ui/census-forms-relay-generic.ts", `${OBS_UI}const same = <T>(value: T): T => value;\nexport const keep = (views: readonly ObservationProjection[]): readonly ObservationProjection[] => views.map(same);\n`, reached(true, [], [], ["keep", "views"]), formsRead(["annotation", "initializer", "member", "return", "type-part"], ["argument: views.map(same)"])),
        reachForms(
          "src/ui/census-forms-relay-arrow.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nexport const forgetAll = (views: readonly ObservationProjection[]): void => views.forEach((seam: Seam) => seam.markStale({}));\n`, reached(true, [], [], ["views"]), formsRead(["annotation", "member", "type-part"], ["argument: views.forEach((seam: Seam) => seam.markStale({}))"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-then.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nexport const later = (pending: Promise<ObservationProjection>): Promise<void> => pending.then((seam: Seam) => seam.markStale({}));\n`, reached(true, [], [], ["pending"]), formsRead(["annotation", "lib-generic", "member"], ["argument: pending.then((seam: Seam) => seam.markStale({}))"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-deps.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nconst forgetVia = (deps: { readonly projection: Seam }): void => deps.projection.markStale({});\nexport function forget(projection: ObservationProjection): void {\n  const deps = { projection };\n  forgetVia(deps);\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "property"], ["argument: forgetVia(deps)"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-literal.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nconst forgetVia = (deps: { readonly projection: Seam }): void => deps.projection.markStale({});\nexport const forget = (projection: ObservationProjection): void => forgetVia({ projection: projection });\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["argument: forgetVia({ projection: projection })", "property: projection: projection"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-array.ts",
          `${OBS_UI}const count = (all: readonly unknown[]): number => all.length;\nexport function relay(projection: ObservationProjection): number {\n  const deps = { projection };\n  return count([deps]);\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "property"], ["argument: count([deps])"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-instance.ts",
          `${OBS_UI}interface Seam {\n  markStale(input: unknown): void;\n}\nclass Holder {\n  constructor(readonly projection: ObservationProjection) {}\n}\nconst forgetVia = (deps: { readonly projection: Seam }): void => deps.projection.markStale({});\nexport const forget = (projection: ObservationProjection): void => forgetVia(new Holder(projection));\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "argument"], ["argument: forgetVia(new Holder(projection))"]),
        ),
        reachForms(
          "src/ui/census-forms-relay-getter.ts",
          `${OBS_UI}const relayAll = (deps: object): object => deps;\nexport function relay(projection: ObservationProjection): object {\n  const deps = {\n    get current() {\n      return projection;\n    },\n  };\n  return relayAll(deps);\n}\n`, reached(true, [], [], ["current", "projection"]), formsRead(["annotation", "return"], ["argument: relayAll(deps)"]),
        ),
        reachForms("src/ui/census-forms-relay-record.ts", `${OBS_UI}const relayAll = (all: Readonly<Record<string, unknown>>): number => Object.keys(all).length;\nexport const relay = (projection: ObservationProjection): number => relayAll({ only: projection });\n`, reached(true, [], [], ["only", "projection"]), formsRead(["annotation"], ["argument: relayAll({ only: projection })", "property: only: projection"])),
        reachForms("src/ui/census-forms-relay-map.ts", `${OBS_UI}const size = (all: ReadonlyMap<string, unknown>): number => all.size;\nexport const relay = (projection: ObservationProjection): number => size(new Map([["only", { projection }]]));\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "property"], ["argument: new Map([[\"only\", { projection }]])", "argument: size(new Map([[\"only\", { projection }]]))"])),
        reachForms("src/ui/census-forms-relay-deep5.ts", 'import type { Deep5 } from "./census-reach-deep5-type.js";\nexport const relayDeep5 = (views: Deep5): unknown => views;\n', null, formsRead([], ["return: (views: Deep5): unknown => views"])),
        reachForms("src/ui/census-forms-relay-function.ts", `${OBS_UI}export function relay(projection: ObservationProjection): unknown {\n  const later: () => unknown = () => ({ projection });\n  return later;\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "property"], ["initializer: later: () => unknown = () => ({ projection })"])),
      ],
    },
    {
      id: "DISPATCH",
      label:
        "a flow the checker resolves to a signature whose body is not the one that runs - a call through an interface method or a function type (a value and a holder), a member overriding or implementing one with a parameter that hides the projection, an object literal's method and a setter doing so - is refused, while an override and a literal method that keep the projection read quiet",
      cases: [
        reachForms("src/ui/census-forms-dispatch-interface.ts", `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nexport const run = (api: Api, projection: ObservationProjection): void => api.forget(projection);\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["argument: api.forget(projection)"])),
        reachForms("src/ui/census-forms-dispatch-function-type.ts", `${OBS_UI}export const run = (sink: (projection: ObservationProjection) => void, projection: ObservationProjection): void => sink(projection);\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["argument: sink(projection)"])),
        reachForms("src/ui/census-forms-dispatch-held.ts", `${OBS_UI}interface Api {\n  take(deps: { readonly projection: ObservationProjection }): void;\n}\nexport const run = (api: Api, projection: ObservationProjection): void => api.take({ projection });\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "property"], ["argument: api.take({ projection })"])),
        reachForms("src/ui/census-forms-dispatch-override.ts", `${OBS_UI}export class Base {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport class Sub extends Base {\n  override forget(projection: unknown): void {\n    (projection as { markStale(input: unknown): void }).markStale({});\n  }\n}\n`, reached(true, ["stats"], [], ["projection"]), formsRead(["annotation", "member"], ["heritage: override forget(projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"])),
        reachForms("src/ui/census-forms-dispatch-implements.ts", `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nexport class Impl implements Api {\n  forget(projection: unknown): void {\n    (projection as { markStale(input: unknown): void }).markStale({});\n  }\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["heritage: forget(projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"])),
        reachForms("src/ui/census-forms-dispatch-literal.ts", `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nexport const api: Api = {\n  forget(projection: unknown): void {\n    (projection as { markStale(input: unknown): void }).markStale({});\n  },\n};\n`, reached(true, [], [], ["projection"]), formsRead(["annotation"], ["property: forget(projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"])),
        reachForms("src/ui/census-forms-dispatch-setter.ts", `${OBS_UI}interface Slot {\n  projection: ObservationProjection;\n}\nexport class Holder implements Slot {\n  #held: unknown;\n  get projection(): ObservationProjection {\n    return this.#held as ObservationProjection;\n  }\n  set projection(value: unknown) {\n    this.#held = value;\n  }\n}\n`, reached(true, [], [], ["projection"]), formsRead(["annotation", "return"], ["heritage: set projection(value: unknown) { this.#held = value; }"])),
        reachForms("src/ui/census-forms-dispatch-quiet-override.ts", `${OBS_UI}export class Base {\n  read(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\nexport class Sub extends Base {\n  override read(projection: ObservationProjection): number {\n    return projection.stats().edges;\n  }\n}\n`, reached(true, ["stats"], [], ["projection"]), formsRead(["annotation", "member"], [])),
        reachForms("src/ui/census-forms-dispatch-quiet-literal.ts", `${OBS_UI}interface Api {\n  read(projection: ObservationProjection): number;\n}\nexport const api: Api = {\n  read(projection) {\n    return projection.stats().nodes;\n  },\n};\n`, reached(true, ["stats"], [], ["projection"]), formsRead(["annotation", "member"], [])),
      ],
    },
    {
      id: "UNLISTED-FORMS",
      label:
        "a node that exposes the projection in a parent no resolvable form names - an apparent member (constructor, a callable carrier's call), an undeclared element key, the arguments object, an object spread, a template, a yield, a throw, an export default, an in test - is refused",
      cases: [
        reachForms("src/ui/census-forms-unlisted-constructor.ts", `${OBS_UI}export const kind = (reader: ObservationProjection): unknown => reader.constructor;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["member: reader.constructor"])),
        reachForms("src/ui/census-forms-unlisted-call.ts", `${OBS_UI}export const current = (source: { readonly current: () => ObservationProjection }): unknown => source.current.call(undefined);\n`, reached(true, [], [], ["current"]), formsRead(["annotation"], ["member: source.current.call", "return: (source: { readonly current: () => ObservationProjection }): unknown => source.current.call(undefined)"])),
        reachForms("src/ui/census-forms-unlisted-element.ts", `${OBS_UI}export const current = (source: { readonly current: () => ObservationProjection }): unknown => source.current["call"](undefined);\n`, reached(true, [], [], ["current"]), formsRead(["annotation"], ["element: source.current[\"call\"]", "return: (source: { readonly current: () => ObservationProjection }): unknown => source.current[\"call\"](undefined)"])),
        reachForms(
          "src/ui/census-forms-unlisted-arguments.ts",
          `${OBS_UI}export function forget(reader: ObservationProjection): void {\n  void reader;\n  (arguments[0] as { markStale(input: unknown): void }).markStale({});\n}\n`, reached(true, [], [], ["reader"]), formsRead(["annotation", "test"], ["arguments: arguments[0]"]),
        ),
        reachForms("src/ui/census-forms-unlisted-spread.ts", `${OBS_UI}export const copy = (reader: ObservationProjection): object => ({ ...reader });\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["unlisted SpreadAssignment: ...reader"])),
        reachForms("src/ui/census-forms-unlisted-template.ts", `${OBS_UI}export const text = (reader: ObservationProjection): string => \`\${reader}\`;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["unlisted TemplateSpan: reader}`"])),
        reachForms("src/ui/census-forms-unlisted-yield.ts", `${OBS_UI}export function* each(reader: ObservationProjection): Generator<ObservationProjection> {\n  yield reader;\n}\n`, reached(true, [], [], ["each", "reader"]), formsRead(["annotation", "lib-generic"], ["unlisted YieldExpression: yield reader"])),
        reachForms("src/ui/census-forms-unlisted-throw.ts", `${OBS_UI}export function fail(reader: ObservationProjection): never {\n  throw reader;\n}\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["unlisted ThrowStatement: throw reader;"])),
        reachForms("src/ui/census-forms-unlisted-default.ts", `${OBS_UI}declare const reader: ObservationProjection;\nexport default reader;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["unlisted ExportAssignment: export default reader;"])),
        reachForms("src/ui/census-forms-unlisted-in.ts", `${OBS_UI}export const stale = (reader: ObservationProjection): boolean => "markStale" in reader;\n`, reached(true, [], [], ["reader"]), formsRead(["annotation"], ["unlisted BinaryExpression: \"markStale\" in reader"])),
      ],
    },
    {
      id: "CLASS-ELEMENT-KINDS",
      label:
        "every class element is read by its kind, the pinned typescript's ClassElement union (CLASS_ELEMENT_KINDS): in a planted class module an instance element of each kind - an index signature, a field, the constructor, a getter, a setter, a semicolon, a method - reads nothing, a static one of each kind that can be static - an index signature, a field, a method, a getter, a setter and a static block, static by its kind - reads its own member reference, and an element of a kind outside the kinds a scan is given is read by both scans and refused (unlisted-class-element)",
      cases: [
        classCase(
          "src/workbench/census-kinds-instance.ts",
          "export class ObservationProjection {\n  [key: string]: ObservationProjection[\"relate\"] | unknown;\n  revision = this.disconnect();\n  constructor() {\n    this.ingest();\n  }\n  get size(): number {\n    this.markStale();\n    return 0;\n  }\n  set size(value: number) {\n    this.reconnect(value);\n  }\n  ;\n  disconnect(): void {}\n  ingest(): void {}\n  markStale(): void {}\n  reconnect(value: number): void {\n    void value;\n  }\n  refresh(): void {\n    this.refresh();\n  }\n  relate(): void {}\n}\n",
          null,
          null,
        ),
        classCase(
          "src/workbench/census-kinds-static.ts",
          "export class ObservationProjection {\n  static [key: string]: ObservationProjection[\"relate\"] | unknown;\n  static held: ObservationProjection | undefined;\n  static revision = (projection: ObservationProjection): void => projection.disconnect();\n  static forget(projection: ObservationProjection): void {\n    projection.ingest();\n  }\n  static get size(): number {\n    ObservationProjection.held?.markStale();\n    return 0;\n  }\n  static set size(value: number) {\n    ObservationProjection.held?.reconnect(value);\n  }\n  static {\n    ObservationProjection.held?.refresh();\n  }\n  disconnect(): void {}\n  ingest(): void {}\n  markStale(): void {}\n  reconnect(value: number): void {\n    void value;\n  }\n  refresh(): void {}\n  relate(): void {}\n}\n",
          reached(true, ["disconnect", "ingest", "markStale", "reconnect", "refresh"], ["relate"], ["held", "projection"]),
          formsRead(["annotation", "indexed", "member", "type-part"], []),
        ),
        classCase(
          "src/workbench/census-kinds-unlisted-method.ts",
          "export class ObservationProjection {\n  markStale(): void {}\n  refresh(): void {\n    this.markStale();\n  }\n}\n",
          reached(false, ["markStale", "refresh"], [], []),
          formsRead(["member"], ["unlisted-class-element MethodDeclaration: markStale(): void {}", "unlisted-class-element MethodDeclaration: refresh(): void { this.markStale(); }"]), CLASS_ELEMENT_KINDS.filter(kind => kind !== "MethodDeclaration"),
        ),
        classCase(
          "src/workbench/census-kinds-unlisted-block.ts",
          "export class ObservationProjection {\n  static held: ObservationProjection | undefined;\n  static {\n    ObservationProjection.held?.refresh();\n  }\n  refresh(): void {}\n}\n",
          reached(true, ["refresh"], [], ["held"]),
          formsRead(["annotation", "member", "type-part"], ["unlisted-class-element ClassStaticBlockDeclaration: static { ObservationProjection.held?.refresh(); }"]), CLASS_ELEMENT_KINDS.filter(kind => kind !== "ClassStaticBlockDeclaration"),
        ),
      ],
    },
    {
      id: "STAND-IN-KINDS",
      label:
        "a class element stands in for a base member by its kind (STAND_IN): a getter returning a function whose parameter hides the projection, a static member overriding the extended class's static member with such a parameter, a member named by a computed key (a constant one, and one the checker resolves to no name, judged against every base member) and an object literal's getter doing so are refused, while a getter and a static override that keep the projection, and a class whose index signature, static block, constructor and semicolon stand in for no named member, read quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-stand-in-getter.ts",
          `${OBS_UI}interface Api {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Api {\n  get forget(): (projection: unknown) => void {\n    return projection => (projection as { markStale(input: unknown): void }).markStale({});\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: get forget(): (projection: unknown) => void { return projection => (projection as { markStale(input: unknown): void }).markStale({}); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-static.ts",
          `${OBS_UI}export class Base {\n  static take(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport class Sub extends Base {\n  static override take(projection: unknown): void {\n    (projection as { markStale(input: unknown): void }).markStale({});\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["heritage: static override take(projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-computed.ts",
          `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nconst FORGET = "forget";\nexport class Impl implements Api {\n  [FORGET](projection: unknown): void {\n    (projection as { markStale(input: unknown): void }).markStale({});\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: [FORGET](projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-dynamic.ts",
          `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nexport const make = (key: string): Api =>\n  new (class implements Api {\n    forget(projection: ObservationProjection): void {\n      void projection.stats();\n    }\n    [key](projection: unknown): void {\n      (projection as { markStale(input: unknown): void }).markStale({});\n    }\n  })();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["heritage: [key](projection: unknown): void { (projection as { markStale(input: unknown): void }).markStale({}); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-literal-getter.ts",
          `${OBS_UI}interface Api {\n  forget: (projection: ObservationProjection) => void;\n}\nexport const api: Api = {\n  get forget(): (projection: unknown) => void {\n    return projection => (projection as { markStale(input: unknown): void }).markStale({});\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return projection => (projection as { markStale(input: unknown): void }).markStale({}); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-quiet-getter.ts",
          `${OBS_UI}interface Api {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Api {\n  get forget(): (projection: ObservationProjection) => void {\n    return projection => void projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-quiet-static.ts",
          `${OBS_UI}export class Base {\n  static take(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\nexport class Sub extends Base {\n  static override take(projection: ObservationProjection): number {\n    return projection.stats().edges;\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-none.ts",
          `${OBS_UI}interface Api {\n  forget(projection: ObservationProjection): void;\n}\nexport class Impl implements Api {\n  [key: string]: unknown;\n  static {\n    void 0;\n  }\n  constructor(readonly held: unknown) {}\n  ;\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "STAND-IN-RECEIVERS",
      label:
        "a stand-in receives what its base member hands it position by position, read through the checker (cut #6): a field through its own type, declared or inferred, and a getter through the type it returns - every call signature of each union part, each parameter as instantiated - and a method by its own declared parameters, a this parameter skipped; a rest parameter, the stand-in's or the base's, is read as its element at and past its own position: a field initialized by a bare, a parenthesized or a cast arrow, by a function's name or by a call's result, an ambient annotated field, a static field override by name, a field typed by an overload set or a union and a getter returning a union one of whose signatures hides the projection, a field's and a method's rest parameter that hides it past its position, a method's and a field's parameter that hides it where the base's rest parameter hands it, and a method with a this parameter that hides it are refused; a field and a getter typed any (no call signature) while the base hands the projection fail closed (unresolved-stand-in); a field that keeps the projection (a library generic's instantiation included), a method with a this parameter that keeps it, rests of holders that keep it (a method's, a field's and a base's), a method and a field that never receive it, and an any-typed field the base hands no projection read quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-stand-in-type-arrow.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = (projection: unknown): void => void projection;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-paren.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget = ((projection: unknown): void => void projection);\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = ((projection: unknown): void => void projection);"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-cast.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget = ((projection: unknown): void => void projection) as (projection: unknown) => void;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = ((projection: unknown): void => void projection) as (projection: unknown) => void;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-name.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nconst hide = (projection: unknown): void => void projection;\nexport class Impl implements Sink {\n  forget = hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-call.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nconst make = (): ((projection: unknown) => void) => projection => void projection;\nexport class Impl implements Sink {\n  forget = make();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = make();"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-declare.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  declare forget: (projection: unknown) => void;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: declare forget: (projection: unknown) => void;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-static.ts",
          `${OBS_UI}export class Base {\n  static take = (_projection: ObservationProjection): void => undefined;\n}\nconst drop = (projection: unknown): void => void projection;\nexport class Sub extends Base {\n  static override take = drop;\n}\n`,
          reached(true, [], [], ["_projection"]),
          formsRead(["annotation"], ["heritage: static override take = drop;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-overloads.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  declare forget: { (projection: ObservationProjection): void; (projection: unknown): void };\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: declare forget: { (projection: ObservationProjection): void; (projection: unknown): void };"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-union.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  declare forget: ((projection: ObservationProjection) => void) | ((projection: unknown) => void);\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: declare forget: ((projection: ObservationProjection) => void) | ((projection: unknown) => void);"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-getter-union.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  get forget(): ((projection: ObservationProjection) => void) | ((projection: unknown) => void) {\n    return (projection: unknown): void => void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: get forget(): ((projection: ObservationProjection) => void) | ((projection: unknown) => void) { return (projection: unknown): void => void projection; }", "return: return (projection: unknown): void => void projection;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-rest.ts",
          `${OBS_UI}interface Relay {\n  forget: (note: string, projection: ObservationProjection) => void;\n}\nexport class Impl implements Relay {\n  forget = (...parts: unknown[]): void => void parts;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = (...parts: unknown[]): void => void parts;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-method-rest.ts",
          `${OBS_UI}interface Relay {\n  forget: (note: string, projection: ObservationProjection) => void;\n}\nexport class Impl implements Relay {\n  forget(...parts: unknown[]): void {\n    void parts;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget(...parts: unknown[]): void { void parts; }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-base-rest.ts",
          `${OBS_UI}export class Base {\n  forget(...views: ObservationProjection[]): void {\n    void views.length;\n  }\n}\nexport class Sub extends Base {\n  override forget(first: ObservationProjection, second: unknown): void {\n    void first.stats();\n    void second;\n  }\n}\n`,
          reached(true, ["stats"], [], ["first", "views"]),
          formsRead(["annotation", "member", "type-part"], ["heritage: override forget(first: ObservationProjection, second: unknown): void { void first.stats(); void second; }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-field-base-rest.ts",
          `${OBS_UI}interface Relay {\n  forget: (...views: ObservationProjection[]) => void;\n}\nexport class Impl implements Relay {\n  forget = (first: ObservationProjection, second: unknown): void => void [first.stats(), second];\n}\n`,
          reached(true, ["stats"], [], ["first", "views"]),
          formsRead(["annotation", "member", "type-part"], ["heritage: forget = (first: ObservationProjection, second: unknown): void => void [first.stats(), second];"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-method-this.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget(this: Impl, projection: unknown): void {\n    void this;\n    void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget(this: Impl, projection: unknown): void { void this; void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-any.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  declare forget: any;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unresolved-stand-in: declare forget: any;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-getter-any.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  get forget(): any {\n    return undefined;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unresolved-stand-in: get forget(): any { return undefined; }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget = (projection: ObservationProjection): void => void projection.stats();\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet-library.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  declare forget: Array<ObservationProjection>["push"];\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "indexed", "lib-generic"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet-method-this.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Sink {\n  forget(this: Impl, projection: ObservationProjection): void {\n    void this;\n    void projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet-rest-holders.ts",
          `${OBS_UI}interface Relay {\n  forget: (holder: { readonly projection: ObservationProjection }) => void;\n}\nexport class ByMethod implements Relay {\n  forget(...holders: { readonly projection: ObservationProjection }[]): void {\n    void holders.length;\n  }\n}\nexport class ByField implements Relay {\n  forget = (...holders: { readonly projection: ObservationProjection }[]): void => void holders.length;\n}\nexport class Base {\n  forget(...holders: { readonly projection: ObservationProjection }[]): void {\n    void holders.length;\n  }\n}\nexport class Sub extends Base {\n  override forget(holder: { readonly projection: ObservationProjection }): void {\n    void holder.projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet-unreceived.ts",
          `${OBS_UI}interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\nexport class ByMethod implements Sink {\n  forget(): void {}\n}\nexport class ByField implements Sink {\n  forget = (): void => undefined;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-type-quiet-any-unhanded.ts",
          `${OBS_UI}interface Labelled {\n  label: (text: string) => void;\n  read: (projection: ObservationProjection) => number;\n}\nexport class Impl implements Labelled {\n  declare label: any;\n  read = (projection: ObservationProjection): number => projection.stats().nodes;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "CALLBACK-RECEIVERS",
      label:
        "a callback flowing into a type that hands it the projection receives it as a stand-in does (cut #6): every call signature of each union part, by position, a this parameter receiving nothing - a callback typed by a union or an overload set one of whose signatures hides the projection, and one whose rest parameter hides it past its position (a map's key), are refused, as a plain hiding callback is; a callback typed by a union whose parts keep it, and one with a this parameter that keeps it, read quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-callback-union.ts",
          `${OBS_UI}export const each = (views: readonly ObservationProjection[], visit: ((projection: ObservationProjection) => void) | ((projection: unknown) => void)): void => views.forEach(visit);\n`,
          reached(true, [], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], ["argument: views.forEach(visit)"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-overloads.ts",
          `${OBS_UI}export const each = (views: readonly ObservationProjection[], visit: { (projection: ObservationProjection): void; (projection: unknown): void }): void => views.forEach(visit);\n`,
          reached(true, [], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], ["argument: views.forEach(visit)"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-rest.ts",
          `${OBS_UI}export const each = (keyed: ReadonlyMap<ObservationProjection, number>): void => keyed.forEach((...parts: unknown[]): void => void parts);\n`,
          reached(true, [], [], ["keyed"]),
          formsRead(["annotation", "lib-generic", "member"], ["argument: keyed.forEach((...parts: unknown[]): void => void parts)"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-plain.ts",
          `${OBS_UI}const hide = (projection: unknown): void => void projection;\nexport const each = (views: readonly ObservationProjection[]): void => views.forEach(hide);\n`,
          reached(true, [], [], ["views"]),
          formsRead(["annotation", "member", "type-part"], ["argument: views.forEach(hide)"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-quiet-union.ts",
          `${OBS_UI}export const each = (views: readonly ObservationProjection[], visit: ((projection: ObservationProjection) => void) | ((projection: ObservationProjection, index: number) => void)): void => views.forEach(visit);\n`,
          reached(true, [], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-quiet-this.ts",
          `${OBS_UI}const visit = function (this: void, projection: ObservationProjection): void {\n  void projection.stats();\n};\nexport const each = (views: readonly ObservationProjection[]): void => views.forEach(visit);\n`,
          reached(true, ["stats"], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], []),
        ),
      ],
    },
    {
      id: "R-NARROWED-BRANCH",
      label:
        "residual: a callback or a holder that does not itself expose the projection, chosen by a conditional or a ?? operand, is judged by that expression's type, which subtype reduction narrows to the branch that keeps the projection - a conditional or a ?? choosing a callback that hides it reads quiet to the forms judge (the hiding callback's own flow is refused: CALLBACK-RECEIVERS)",
      cases: [
        reachForms(
          "src/ui/census-forms-callback-branch.ts",
          `${OBS_UI}const hide = (projection: unknown): void => void projection;\nconst keep = (projection: ObservationProjection): void => void projection.stats();\nexport const each = (views: readonly ObservationProjection[], flag: boolean): void => views.forEach(flag ? keep : hide);\n`,
          reached(true, ["stats"], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-branch-nullish.ts",
          `${OBS_UI}const hide = (projection: unknown): void => void projection;\nexport const each = (views: readonly ObservationProjection[], visit: ((projection: ObservationProjection) => void) | undefined): void => views.forEach(visit ?? hide);\n`,
          reached(true, [], [], ["projection", "views"]),
          formsRead(["annotation", "member", "type-part"], []),
        ),
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
      id: "CLASS-MEMBER-SHAPES",
      label:
        "a public member is read in each declaration shape planted here - a declared field, an optional method, an overloaded method, an abstract member a base declares, a setter alone, a getter alone, an auto-accessor, an override, a readonly field, a computed accessor",
      cases: [
        klass("declare", "  declare rewind: () => void;\n", ["query", "rewind"]),
        klass("optional", "  rewind?(): void;\n", ["query", "rewind"]),
        klass("overload", "  rewind(): void;\n  rewind(steps?: number): void {\n    void steps;\n  }\n", ["query", "rewind"]),
        named("abstract", "class", "abstract class Base {\n  abstract rewind(): void;\n}\nexport abstract class ObservationProjection extends Base {\n  query(): void {}\n}\n", ["query", "rewind"]),
        klass("setter", "  set rewind(value: number) {\n    void value;\n  }\n", ["query", "rewind"]),
        klass("getter", "  get rewind(): number {\n    return 0;\n  }\n", ["query", "rewind"]),
        klass("auto-accessor", "  accessor rewind = 0;\n", ["query", "rewind"]),
        klass("override", "  override rewind(): void {}\n", ["query", "rewind"], "class Base {\n  rewind(): void {}\n}\n", " extends Base"),
        klass("readonly", "  readonly rewind: number = 0;\n", ["query", "rewind"]),
        klass("computed-accessor", '  get ["rewind"](): number {\n    return 0;\n  }\n', ["query", "rewind"]),
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
      id: "INTERFACE-HERITAGE",
      label: "an actions member is read through each heritage and signature shape planted here - a generic base, an Omit base, a type-alias base, a getter signature, a readonly property",
      cases: [
        actions("actions-generic", "", ["onArchive", "onKill"], "interface Extra<T> {\n  onArchive?(value: T): void;\n}\n", " extends Extra<string>"),
        actions("actions-omit", "", ["onArchive", "onKill"], "interface All {\n  onKill?(): void;\n  onArchive?(): void;\n}\n", " extends Omit<All, never>"),
        actions("actions-alias", "", ["onArchive", "onKill"], "type Archive = { onArchive?(): void };\n", " extends Archive"),
        actions("actions-getter", "  get onArchive(): () => void;\n", ["onArchive", "onKill"]),
        actions("actions-readonly", "  readonly onArchive?: () => void;\n", ["onArchive", "onKill"]),
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
  /** The uses readForms refuses in it, site by site, as readForms writes them (sorted, duplicates kept); absent, none. */
  readonly refused?: readonly string[];
  /** The admission members its typed readers keep (a Pick or Omit over the class, as scanReaders reads it), in scan order; absent, none. READER WALK holds src's typed writers to exactly these (cut #6). */
  readonly writers?: readonly string[];
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
  "src/workbench/collective-event.ts": {
    value: ["ingest"],
    type: ["ingest", "relate"],
    reason:
      "the MechanicalWorkflows collective-event boundary (wb-4ap.15): ingestCollectiveEvent admits an accepted collective.event.v1 envelope through its sink's ingest - a typed writer, Pick<ObservationProjection, \"ingest\">, the one READER WALK names - and returns the hypothesis statements its caller applies with relate, whose type and ingest's result type it spells; no src module imports it",
    writers: ["ingest"],
  },
  "src/workbench/control-tool.ts": { value: ["ingest", "query"], type: [], reason: "the control tool's receipt recorder: on a control call it reads the target node and records the receipt phase as an event of it" },
  "src/workbench/control.ts": { value: ["query", "relations"], type: [], reason: "decideControl: the decision a control request runs, reading the target node and its relations" },
  "src/workbench/detached-control.ts": {
    value: [],
    type: [],
    reason:
      "the detached control seam: it holds the projection in its deps type and references no member the reach scan reads; its wiring check probes the deps' projection for its query and relations methods by reflection (method: Reflect.get over unknown) and type-tests the input and its deps (plain over unknown) - four erasing flows readForms refuses, named site by site",
    refused: ['argument: method(input.deps.projection, "query")', 'argument: method(input.deps.projection, "relations")', "argument: plain(input)", "argument: plain(input.deps)"],
  },
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
  "R-DEEP-CARRIER": ["REACH R-DEEP-CARRIER"],
  "R-RUNTIME-MEMBER": ["NAMES R-RUNTIME-MEMBER"],
  "R-NARROWED-BRANCH": ["REACH R-NARROWED-BRANCH"],
};

/** Every table's name, quote and its source in the export row, in census order: the anchor row holds each quote to exactly one occurrence in its source. */
export const TABLE_QUOTES: readonly { readonly table: string; readonly source: "title" | "filing"; readonly quote: string }[] = [SURFACES, ...PLANT_TABLES, READERS, ABSENCE, REACH, NAMES].map(table => ({
  table: table.name,
  source: table.source,
  quote: table.quote,
}));
