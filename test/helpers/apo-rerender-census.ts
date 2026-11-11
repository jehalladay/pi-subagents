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
 * (unresolved-stand-in), and a type whose call signatures are a src overload set's read through the signatures that run (the
 * set's implementation, wb-021.7; cut #7, ruling R-B60, failed it closed, and a set with no single implementation still fails
 * closed: overload); a constructor, a static block, an index signature and a semicolon stand in for no named member (a
 * constructor's parameters are judged where it is called), but a constructor's parameter property declares one, and it is read
 * as a field is (wb-021.7; cut #7 failed it closed). A member is matched to the base member of its name: one a base names only
 * through an index signature is matched to none (R-INDEX-STAND-IN, a named residual).
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
/**
 * The shapes whose running body the stand-in and flow readings never read (cut #7, ruling R-B60: narrow the claim, never
 * widen the reader), each by the typed row readForms writes, failing closed where the projection is handed, and the REACH
 * row that plants it refused beside a quiet page: a field or a getter typed with no call signature (unresolved-stand-in, cut
 * #6), a src overload set's visible signatures read for a stand-in or a callback (overload), a constructor parameter property
 * standing in for a base member (parameter-property) and a class instance flowing into an object type its class does not
 * declare (structural-stand-in). The last three are the named residual families R-OVERLOADS, R-PARAMETER-PROPERTIES and
 * R-STRUCTURAL-STAND-IN. Cut #8 (ruling R-B67, the fail-closed core) closes the roster: an async function's return and a
 * generator's yield or return under a written type that holds a type handing the projection (async-return, generator-yield),
 * a member the implementing class inherits (inherited-implementation), an object literal not written where it flows
 * (context-less-literal), a spread supplying a handing member (spread), what a callback or a stand-in hands back where it is not
 * the target's own type (callback-return, stand-in-return) and a value of any type the readings do not list (unlisted-stand-in),
 * each with the row that plants it; these rows are no residual families: each shape refuses, and bead wb-021.7 is the home of
 * their readings. wb-021.7 reads three of the shapes and retires two kinds: a constructor parameter property is read as a field
 * is (parameter-property retired; R-PARAMETER-PROPERTIES pins the reading), a src overload set through its implementation
 * (overload kept for a set with no single implementation; R-OVERLOADS pins both), and an async function's return that is no
 * generator's against its written promise's awaited type (async-return retired; ASYNC-RETURNS pins the reading). R-OVERLOADS
 * and R-PARAMETER-PROPERTIES are no residual families any more; their rows keep their ids. The census holds this roster, each
 * kind with its row and in order, and the two kinds wb-021.7 retires (RETIRED, each with the row that pins its reading), in
 * the enumeration's order, equal to the enumeration the cut #8 delivery record in the bead's export row holds (wb-vgri,
 * landing 672 F8; wb-021.7 cut #5): an anchor outside this module, the census and the roster for every kind, so a kind
 * hollowed from every literal together reds there. A call to a src callee that declares an explicit this parameter is read
 * by bead wb-021.10's landed reading (argumentTarget, THIS-PARAMETER-ARGUMENTS), so wb-021.7 cut #4's fail-closed kind for
 * it (this-parameter) is not carried (wb-021.7 cut #5, the re-cut over the landed carrier).
 */
export const FAIL_CLOSED: Readonly<Record<string, string>> = {
  "unresolved-stand-in": "STAND-IN-RECEIVERS",
  overload: "R-OVERLOADS",
  "structural-stand-in": "R-STRUCTURAL-STAND-IN",
  "generator-yield": "GENERATOR-YIELDS",
  "inherited-implementation": "INHERITED-IMPLEMENTATIONS",
  "context-less-literal": "CONTEXT-LESS-LITERALS",
  spread: "SPREADS",
  "callback-return": "CALLBACK-RETURNS",
  "stand-in-return": "STAND-IN-RETURNS",
  "unlisted-stand-in": "UNLISTED-STAND-INS",
};
/** The fail-closed kinds of the cut #8 enumeration wb-021.7 reads instead (cut #1; restated over the landed carrier at cut #5), each with the row that pins its reading: no reading refuses under either. */
export const RETIRED: Readonly<Record<string, string>> = {
  "parameter-property": "R-PARAMETER-PROPERTIES",
  "async-return": "ASYNC-RETURNS",
};
/** A stand-in reading that judges something (every reading but "none"). */
type StandInReading = Exclude<(typeof STAND_IN)[ClassElementKind], "none">;
/** A declaration a stand-in reading judges: a class element, an object literal's element, or a constructor's parameter property (read as a field, wb-021.7). */
type StandInMember = ts.ClassElement | ts.ObjectLiteralElementLike | ts.ParameterPropertyDeclaration;
/** An async function-like: the async modifier (wb-021.7; cut #8's async test). */
const isAsyncFunction = (fn: ts.SignatureDeclaration): boolean => ts.canHaveModifiers(fn) && (ts.getModifiers(fn) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword);
/** A generator function-like: the asterisk token (cut #8's generator test). */
const isGeneratorFunction = (fn: ts.SignatureDeclaration): boolean => "asteriskToken" in fn && fn.asteriskToken !== undefined;
/** The type flags of a part that holds no object a stand-in could be (wb-021.7, provenReturn): null, undefined, never and the primitive types with their literals. */
const HOLDS_NO_OBJECT =
  ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Never | ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike | ts.TypeFlags.BooleanLike | ts.TypeFlags.BigIntLike | ts.TypeFlags.ESSymbolLike | ts.TypeFlags.EnumLike;
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
/** True for a declared this parameter (TypeScript's explicit this): it receives no argument, the checker binds the call's this to it. */
const isThisParameter = (parameter: ts.ParameterDeclaration): boolean => ts.isIdentifier(parameter.name) && parameter.name.text === "this";
/** The tagged template a node is a substitution of - a template span's expression in a tagged template's template - or undefined (wb-021.10). */
const substitutionOf = (node: ts.Node): ts.TaggedTemplateExpression | undefined => {
  const span = node.parent;
  if (span === undefined || !ts.isTemplateSpan(span) || span.expression !== node) return undefined;
  const template = span.parent;
  return ts.isTaggedTemplateExpression(template.parent) && template.parent.template === template ? template.parent : undefined;
};
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
 * flow - an argument (a call's or a new expression's written argument, and, in the cells TAGGED-TEMPLATE-ARGUMENTS names
 * (each a tag form - its declaration and the spelling of its tag expression -, a substitution position and a value with
 * the spelling of its expression), a tagged template's substitution, the argument at its index among the substitutions
 * plus one: wb-021.10; any other tag form, position, value or spelling is NOT CLAIMED, respin 3), an initializer or
 * default under a written type, an
 * assignment, an object property under a contextual type, a return under a written return type, a cast - is judged against
 * the type the value flows into: for a src callee the parameter as the callee's body sees it (an overload's
 * implementation; a declared this parameter skipped, since it receives no argument: wb-021.10, pinned in the cells
 * THIS-PARAMETER-ARGUMENTS names, any other callee form, position, value or spelling NOT CLAIMED; a type parameter through its
 * constraint, so an unconstrained one hides the projection: a module's own generic accessor, a generic destructuring
 * accessor, a cross-module generic utility - the flow's own readings; the members of an object literal written at it are the
 * literal reading's, literalBases below: wb-021.10 named that reading R-INFERRED-LITERAL, a residual, and wb-021.7 cut #5 reads
 * its pinned pages through this parameter's constraint); for a library callee the instantiated parameter, and a value that exposes
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
 * kind outside the given kinds (CLASS_ELEMENT_KINDS by default) is refused wherever it stands (unlisted-class-element). Cut #7
 * (ruling R-B60: narrow the claim, never widen the reader): a call through a class's own method is judged by that method's
 * declaration alone, and the stand-ins the heritage and literal readings do not read fail closed where the projection is
 * handed, each with its typed row (FAIL_CLOSED): a field or a getter typed, and a callback flowing, with a src overload set's
 * visible signatures (overload: the implementation that runs is never read through them), a constructor parameter property
 * standing in for a base member of its name (parameter-property), and a class instance, or a class's static side, flowing
 * into an object type its class does not declare, itself or through its extends and implements clauses transitively
 * (structural-stand-in: a member read through a type it does not declare). Cut #8 (ruling R-B67, the fail-closed core: the
 * readings are not widened, the roster is closed): a stand-in is read in exactly that roster - a class element the class
 * declares itself, against its own class's heritage clauses; an object literal's own member under the contextual type of the
 * flow it is written at; a callback by its own call signatures' parameters; a value flowing into a type it is or declares - at
 * the flows above, a return only under the written type of a function that is neither async nor a generator; every other
 * stand-in the judge meets fails closed with its typed row (FAIL_CLOSED): async-return and generator-yield (a return or a
 * yield under a written type holding a type that hands the projection), inherited-implementation (at the class),
 * context-less-literal, spread, callback-return and stand-in-return (what a callback or a stand-in hands back where it is not
 * the target's own type), and unlisted-stand-in (an erased value, or any other value type the readings do not list).
 * wb-021.7 (the home of the forms the core refuses) reads three of them: a src overload set's visible signatures through the
 * set's implementation (runningSignature, runningReceivers: a set with no single implementation still fails closed, overload,
 * and an implementation's arguments object is read through every declaration of its set), a constructor parameter property as
 * a field is (judgeParameterProperties), and the return of an async function that is no generator against its written
 * promise's awaited type, the value as awaited (flowOf, judgeFlow; async-return is retired). What a callback or a stand-in
 * hands back proves the target's type only part by part, as an object that is it or declares it or as a value that holds no
 * object or an intersection of objects that are it or declare it (provenReturn: a part with no object part that holds an object -
 * an any, an unknown, an object type - proves nothing).
 * wb-021.7 cut #2 (refusal #1 U1, U2): an object literal's method, getter, setter and shorthand property are read against the
 * member of their name in each part of the literal's contextual type, and of the declared target of the flow it is written at,
 * that declares one (contextualParts and literalBases: a union part by part, a type parameter through its constraint, a src
 * callee's generic parameter as declared, which the checker's contextual type instantiates with what the call infers from the
 * literal itself, for a literal that is the argument itself of a call resolved to a src declaration with a body: cut #3 narrows
 * the claim to that position, and a literal written inside such an argument, or passed to a src signature with no body, is read
 * against that inferred instantiation alone and reads quiet, R-INFERRED-INSTANTIATION; cut #4 narrowed it to a declaration that
 * declares no explicit this parameter, failing a call to one closed (this-parameter), and cut #5, the re-cut over the landed
 * carrier wb-021.10, withdraws that kind: argumentTarget skips such a declaration's own this parameter and reads a tagged
 * template's substitution as its call's argument, so the parameter it reads is the declared target there too, pinned in
 * R-INFERRED-LITERAL's restated pages alone - and names as
 * R-INFERRED-INSTANTIATION's further members, at the argument itself, a property assignment's value and a spread (flowOf and
 * judgeSpread read the contextual type alone), a .call relay and an overload set whose implementation's parameter declares
 * none of the literal's members), never against the union's own members, which are only those every part declares -
 * so under a union written at the flow (an undefined or an object part beside the type) and under an async function's return,
 * whose contextual type is the awaited type united with a PromiseLike of it, each member is judged as its twin under the type
 * alone is, a shorthand property with one row per kind at its site.
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
  /**
   * True for a call signature a src function or method declares with more than one signature - an overload set (cut #7, ruling
   * R-B60): the body that runs is the set's implementation, which a reading through the visible signatures never sees.
   */
  const isOverloadSignature = (signature: ts.Signature): boolean => {
    const declaration = signature.getDeclaration();
    if (!declaration || !isSrc(declaration) || !(ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration)) || declaration.name === undefined) return false;
    const declarations = checker.getSymbolAtLocation(declaration.name)?.declarations ?? [];
    return declarations.filter(item => ts.isFunctionDeclaration(item) || ts.isMethodDeclaration(item)).length > 1;
  };
  /**
   * The signature whose body runs for a call through the signature (wb-021.7, resolving cut #7's overload shape): a src overload
   * set's visible signature (isOverloadSignature) is read through the set's implementation - the one declaration of the set
   * that has a body, by its own declared parameters and its declared return, as declared (a type parameter through its
   * constraint) - and any other signature is itself. undefined for a set with no single implementation (an ambient or an
   * abstract set): the body that runs is never read, so the reading fails closed (overload).
   */
  const runningSignature = (signature: ts.Signature): ts.Signature | undefined => {
    if (!isOverloadSignature(signature)) return signature;
    const declaration = signature.getDeclaration();
    const named = (ts.isFunctionDeclaration(declaration) || ts.isMethodDeclaration(declaration)) && declaration.name ? checker.getSymbolAtLocation(declaration.name) : undefined;
    const bodies = (named?.declarations ?? []).filter((item): item is ts.FunctionDeclaration | ts.MethodDeclaration => (ts.isFunctionDeclaration(item) || ts.isMethodDeclaration(item)) && item.body !== undefined);
    return bodies.length === 1 ? checker.getSignatureFromDeclaration(bodies[0]) : undefined;
  };
  /**
   * The signatures that run when a value of the type is called (wb-021.7): typeReceivers, each through runningSignature, an
   * overload set's implementation once however many of its visible signatures the type carries. A visible signature of a set
   * with no single implementation is kept as it is and marks the reading unread (it fails closed: overload, cut #7).
   * signatures is undefined where typeReceivers is.
   */
  const runningReceivers = (type: ts.Type | undefined): { readonly signatures: readonly ts.Signature[] | undefined; readonly unread: boolean } => {
    const visible = typeReceivers(type);
    if (visible === undefined) return { signatures: undefined, unread: false };
    const signatures: ts.Signature[] = [];
    let unread = false;
    for (const signature of visible) {
      const running = runningSignature(signature);
      if (running === undefined) unread = true;
      const read = running ?? signature;
      if (!signatures.includes(read)) signatures.push(read);
    }
    return { signatures, unread };
  };
  /** True when a call signature of the type hands the projection, or a value holding it, at a position its parameters declare (handedAt): what a base member hands its stand-in and a flow target its callback (cut #7). */
  const handsProjection = (type: ts.Type): boolean =>
    checker
      .getNonNullableType(constrained(type))
      .getCallSignatures()
      .some(signature => handedAt(signature, 0).some(item => heldPaths(item.type, 0).length > 0));
  /** The symbols a class or an interface declares itself to be: itself, and every type its extends and implements clauses name, transitively, a union or an intersection part by part (cut #7). */
  const declaredSupertypes = (symbol: ts.Symbol): ReadonlySet<ts.Symbol> => {
    const found = new Set<ts.Symbol>();
    const add = (next: ts.Symbol | undefined): void => {
      if (next === undefined || found.has(next)) return;
      found.add(next);
      for (const declaration of next.declarations ?? []) {
        if (!ts.isClassLike(declaration) && !ts.isInterfaceDeclaration(declaration)) continue;
        for (const clause of declaration.heritageClauses ?? []) {
          for (const item of clause.types) {
            const named = checker.getTypeAtLocation(item);
            for (const part of named.isUnionOrIntersection() ? named.types : [named]) add(part.symbol);
          }
        }
      }
    };
    add(symbol);
    return found;
  };
  /**
   * A class instance (or a class's static side) flowing into an object type its class does not declare stands in for that
   * type's members structurally - a member read through a type it does not declare (cut #7, ruling R-B60; cut #8: declared as
   * declaresGoal reads it, a generic's instantiation only as that instantiation and a static side only as its own or its
   * extends chain's). True when a member of such a target part, which the source also has, hands the projection: that
   * stand-in is never read, so the flow fails closed.
   */
  const structuralStandIn = (source: ts.Type, target: ts.Type): boolean => {
    const own = checker.getNonNullableType(source);
    const classes = (own.isUnionOrIntersection() ? own.types : [own]).filter(part => part.symbol !== undefined && (part.symbol.flags & ts.SymbolFlags.Class) !== 0);
    if (classes.length === 0) return false;
    const into = checker.getNonNullableType(constrained(target));
    const goals = (into.isUnionOrIntersection() ? into.types : [into]).filter(part => (part.flags & ts.TypeFlags.Object) !== 0);
    return classes.some(part =>
      goals.some(
        goal => !declaresGoal(part, goal) && checker.getPropertiesOfType(goal).some(member => checker.getPropertyOfType(part, member.name) !== undefined && handsProjection(checker.getTypeOfSymbol(member))),
      ),
    );
  };
  /** The object parts of a type: each part of a union or an intersection, null and undefined dropped (cut #8). */
  const objectParts = (type: ts.Type): readonly ts.Type[] => {
    const own = checker.getNonNullableType(type);
    return (own.isUnionOrIntersection() ? own.types : [own]).filter(part => (part.flags & ts.TypeFlags.Object) !== 0);
  };
  /**
   * The parts of an object literal's contextual type its own members are read against (wb-021.7 cut #2, refusal #1 U1 and U2):
   * each part of a union, a type parameter through its constraint (a constraint that is a union part by part); any other type is
   * one part. A union's own members are only those every part declares, so a literal's method, getter, setter or shorthand
   * property is matched against each part that declares a member of its name, as TypeScript types the member contextually: under
   * a union written at the flow (Sink | undefined, an object part beside it) and under an async function's return, whose
   * contextual type is the awaited type united with a PromiseLike of it.
   */
  const contextualParts = (type: ts.Type): readonly ts.Type[] =>
    (type.isUnion() ? type.types : [type]).flatMap(part => {
      const seen = constrained(part);
      return seen.isUnion() ? seen.types : [seen];
    });
  /**
   * The members of a target part, declared in src, that hand the projection (the structural goal test, cut #7): a library
   * container's own members (push, set, add) hand it into the container, the element-type flow the judge trusts (cut #8).
   */
  const handingMembers = (goal: ts.Type): readonly ts.Symbol[] =>
    checker.getPropertiesOfType(goal).filter(member => (member.declarations ?? []).some(isSrc) && handsProjection(checker.getTypeOfSymbol(member)));
  /** True for a type that hands the projection: through a call signature (a callback type) or through a member (an object type whose member does) (cut #8). */
  const hands = (type: ts.Type): boolean => handsProjection(type) || objectParts(constrained(type)).some(part => handingMembers(part).length > 0);
  const holding = new Map<ts.Type, boolean>();
  /**
   * True when the type, or a type it holds - a union or intersection part, a library or src generic's type argument, a property
   * of a src or anonymous object type, an index signature or a call's result - to CARRIER_DEPTH, hands the projection: a
   * value converted into it may stand in for what that type hands (cut #8).
   */
  const holdsHanding = (type: ts.Type, depth: number): boolean => {
    if (hands(type)) return true;
    if (depth >= CARRIER_DEPTH) return false;
    const known = depth === 0 ? holding.get(type) : undefined;
    if (known !== undefined) return known;
    const seen = constrained(type);
    let found = false;
    if (seen.isUnionOrIntersection()) found = seen.types.some(part => holdsHanding(part, depth + 1));
    else if ((seen.flags & ts.TypeFlags.Object) !== 0) {
      const object = seen as ts.ObjectType;
      found =
        ((object.objectFlags & ts.ObjectFlags.Reference) !== 0 && checker.getTypeArguments(object as ts.TypeReference).some(argument => holdsHanding(argument, depth + 1))) ||
        (isSrcType(seen) && publicProperties(checker, seen).some(property => holdsHanding(checker.getTypeOfSymbol(property), depth + 1))) ||
        checker.getIndexInfosOfType(seen).some(info => holdsHanding(info.type, depth + 1)) ||
        seen.getCallSignatures().some(signature => holdsHanding(signature.getReturnType(), depth + 1));
    }
    if (depth === 0) holding.set(type, found);
    return found;
  };
  /** The instantiated types a class or an interface names in its own heritage clauses and in those of every type it declares itself to be, each part of a union or an intersection (cut #8). */
  const declaredTypes = (symbol: ts.Symbol): ReadonlySet<ts.Type> => {
    const found = new Set<ts.Type>();
    for (const next of declaredSupertypes(symbol)) {
      for (const declaration of next.declarations ?? []) {
        if (!ts.isClassLike(declaration) && !ts.isInterfaceDeclaration(declaration)) continue;
        for (const clause of declaration.heritageClauses ?? []) {
          for (const item of clause.types) {
            const named = checker.getTypeAtLocation(item);
            for (const part of named.isUnionOrIntersection() ? named.types : [named]) found.add(part);
          }
        }
      }
    }
    return found;
  };
  /** The static sides a class's static side declares itself to be: its own, and those its extends clauses name, transitively - never an implemented type (cut #8). */
  const declaredStatics = (symbol: ts.Symbol): ReadonlySet<ts.Symbol> => {
    const found = new Set<ts.Symbol>();
    const add = (next: ts.Symbol | undefined): void => {
      if (next === undefined || found.has(next)) return;
      found.add(next);
      for (const declaration of next.declarations ?? []) {
        if (!ts.isClassLike(declaration)) continue;
        for (const clause of declaration.heritageClauses ?? []) {
          if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue;
          for (const item of clause.types) add(checker.getTypeAtLocation(item.expression).symbol);
        }
      }
    };
    add(symbol);
    return found;
  };
  /** True for the same instantiation: one type, or two references to one generic whose declared type arguments are each the same type (a heritage clause's reference also carries the class's this type, cut #8). */
  const sameInstantiation = (named: ts.Type, goal: ts.Type): boolean => {
    if (named === goal) return true;
    if (named.symbol !== goal.symbol || (named.flags & goal.flags & ts.TypeFlags.Object) === 0) return false;
    const left = named as ts.ObjectType;
    const right = goal as ts.ObjectType;
    if ((left.objectFlags & right.objectFlags & ts.ObjectFlags.Reference) === 0) return false;
    const target = (left as ts.TypeReference).target;
    if (target !== (right as ts.TypeReference).target) return false;
    const count = target.typeParameters?.length ?? 0;
    const ours = checker.getTypeArguments(left as ts.TypeReference);
    const theirs = checker.getTypeArguments(right as ts.TypeReference);
    return count > 0 && Array.from({ length: count }, (_, at) => ours[at] === theirs[at]).every(Boolean);
  };
  /**
   * True when a part of a value's type declares a target part (cut #8): it is that type, or it names it in a heritage clause of
   * its own or of a type it declares itself to be - by symbol for a class or an interface declared with no type parameter, by
   * the instantiated type for any other target (a generic's instantiation, a type literal, an alias); a class's static side
   * declares only its own static side and those its extends clauses name.
   */
  const declaresGoal = (part: ts.Type, goal: ts.Type): boolean => {
    if (part === goal) return true;
    if (part.symbol === undefined || goal.symbol === undefined) return false;
    if ((part.symbol.flags & ts.SymbolFlags.Class) !== 0 && part.getConstructSignatures().length > 0) return goal.getConstructSignatures().length > 0 && declaredStatics(part.symbol).has(goal.symbol);
    const nominal =
      (goal.symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) !== 0 &&
      !(goal.symbol.declarations ?? []).some(item => (ts.isClassLike(item) || ts.isInterfaceDeclaration(item)) && (item.typeParameters?.length ?? 0) > 0);
    return nominal ? declaredSupertypes(part.symbol).has(goal.symbol) : [...declaredTypes(part.symbol)].some(named => sameInstantiation(named, goal));
  };
  /** True when an object literal declaration is the value at node itself, reached through parentheses, a satisfies, a non-null, a conditional's branch or a ??, || or && operand (written where it flows: its contextual type is the target's) (cut #8). */
  const writtenAt = (declaration: ts.Node, node: ts.Node): boolean => {
    let at: ts.Node = declaration;
    while (at !== node) {
      const up: ts.Node | undefined = at.parent;
      if (up === undefined) return false;
      const operand =
        ts.isBinaryExpression(up) &&
        (up.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken || up.operatorToken.kind === ts.SyntaxKind.BarBarToken || up.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken);
      if (!(ts.isParenthesizedExpression(up) || ts.isSatisfiesExpression(up) || ts.isNonNullExpression(up) || (ts.isConditionalExpression(up) && up.condition !== at) || operand)) return false;
      at = up;
    }
    return true;
  };
  /**
   * The typed row of a stand-in no reading reads (cut #8, ruling R-B67: the fail-closed core), for a value that is no class
   * instance and no class's static side (structuralStandIn reads those) and no callback (the receivers' reading), flowing into
   * an object type whose member, which the value also has, hands the projection, where the value's type does not declare that
   * type: an object literal not written where it flows (context-less-literal), an erased value (an any or an unknown, a cast
   * through one) and any other type - a type literal, a mapped type such as a frozen value's, an interface or a generic
   * instantiation it does not declare (unlisted-stand-in). undefined: read.
   */
  const unreadStandIn = (node: ts.Node, source: ts.Type, target: ts.Type): string | undefined => {
    const goals = objectParts(constrained(target)).filter(goal => handingMembers(goal).length > 0);
    if (goals.length === 0) return undefined;
    if ((source.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) !== 0) return "unlisted-stand-in";
    for (const part of objectParts(source)) {
      if (part.symbol !== undefined && (part.symbol.flags & ts.SymbolFlags.Class) !== 0) continue;
      const open = goals.filter(goal => !declaresGoal(part, goal) && handingMembers(goal).some(member => checker.getPropertyOfType(part, member.name) !== undefined));
      if (open.length === 0) continue;
      if (part.symbol !== undefined && (part.symbol.flags & ts.SymbolFlags.ObjectLiteral) !== 0) {
        if ((part.symbol.declarations ?? []).some(declaration => writtenAt(declaration, node))) continue;
        return "context-less-literal";
      }
      return "unlisted-stand-in";
    }
    return undefined;
  };
  /**
   * True when what a callback or a stand-in hands back is the goal's own (cut #8): every part of the returned type - a union part
   * by part, a type parameter through its constraint - is a value that holds no object (null, undefined, never, or a primitive:
   * a string, number, boolean, bigint, symbol or enum type or a literal of one), or an object or an intersection whose object
   * parts are each a part of the goal type or declare one (declaresGoal). A part with no object part that holds an object proves
   * nothing (wb-021.7: cut #8 read it as vacuously proven), so what is handed back through it fails closed: an any, an unknown
   * and an object type are pinned (CALLBACK-RETURNS, STAND-IN-RETURNS, R-OVERLOADS), as an unconstrained type parameter was
   * already (its non-nullable form, T & {}, holds an object part that declares nothing).
   */
  const provenReturn = (returned: ts.Type, goal: ts.Type): boolean => {
    const goals = objectParts(goal);
    const proven = (type: ts.Type, depth: number): boolean => {
      const part = constrained(type);
      if (part.isUnion()) return depth < CARRIER_DEPTH && part.types.every(item => proven(item, depth + 1));
      if ((part.flags & HOLDS_NO_OBJECT) !== 0) return true;
      if ((part.flags & (ts.TypeFlags.Object | ts.TypeFlags.Intersection)) === 0) return false;
      const objects = objectParts(part);
      return objects.length > 0 && objects.every(object => goals.some(item => declaresGoal(object, item)));
    };
    return proven(returned, 0);
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
    const judgeFlow = (form: ResolvableForm, node: ts.Node, target: ts.Type, site: ts.Node, quiet: boolean, awaited = false): void => {
      // An async function's return flows as awaited (wb-021.7): the value the promise settles to, never the promise; a value with no awaited type fails closed.
      const written = checker.getTypeAtLocation(node);
      const sourceType = awaited ? checker.getAwaitedType(written) : written;
      if (sourceType === undefined) {
        refuse(form, site);
        return;
      }
      let hidden = exposes(sourceType) && !exposes(target);
      // A callback whose call signatures are a src overload set's is read through the set's implementation (wb-021.7: runningReceivers); a set with no single implementation fails closed where the target hands the projection (overload, cut #7).
      const running = runningReceivers(sourceType);
      if (running.unread && handsProjection(target)) refuse("overload", site);
      // Fail closed (cut #7, ruling R-B60): a class instance flowing into an object type its class does not declare, where that type hands the projection.
      if (structuralStandIn(sourceType, target)) refuse("structural-stand-in", site);
      // Fail closed (cut #8, ruling R-B67): a stand-in no reading reads - an object literal not written where it flows, a value of any other unlisted type - and a callback that hands back a value its target's return does not declare, where that return holds a handing type.
      const unread = unreadStandIn(node, sourceType, target);
      if (unread) refuse(unread, site);
      // A callback receives what the target's signatures hand it as a field stand-in does (cut #6): every call signature of each union part, by position.
      const receivers = running.signatures ?? [];
      const returning = objectParts(constrained(target)).flatMap(part => part.getCallSignatures());
      if (receivers.length > 0 && returning.some(signature => holdsHanding(signature.getReturnType(), 0) && receivers.some(own => !provenReturn(own.getReturnType(), signature.getReturnType())))) {
        refuse("callback-return", site);
      }
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
    /**
     * The position the checker reads a written argument at (wb-97ah, refusal #3's CURE route (b)): a spread of a value the
     * checker types as a tuple stands for that tuple's elements - the empty tuple's for none - and any other written argument,
     * a spread of any other type included, for one, as the checker's own effective arguments count them. The census pins it
     * for the this argument R-THIS-BINDING reads; at any other argument it is NOT CLAIMED (the census header's NOT CLAIMED).
     */
    const effectivePosition = (passed: readonly ts.Expression[], node: ts.Expression): number => {
      let position = 0;
      for (const item of passed) {
        if (item === node) return position;
        const spread = ts.isSpreadElement(item) ? checker.getTypeAtLocation(item.expression) : undefined;
        position += spread !== undefined && checker.isTupleType(spread) ? (spread as ts.TupleTypeReference).target.elementFlags.length : 1;
      }
      return -1;
    };
    /**
     * The type a resolved signature hands the argument at an effective position (wb-97ah): its own parameter's there, or, at
     * or past its rest parameter - the instantiated parameter itself read, never the declaration's at the written index - that
     * rest's element: a tuple's own element at an offset inside its leading fixed elements, its element type past them where it
     * has a variable element, an array's element type; undefined where no parameter takes the position. The census pins the
     * rest's leading element for the this argument R-THIS-BINDING reads (a tuple's, also before a variable tail, and an
     * array's element type); a later offset and a tuple's variable part are NOT CLAIMED.
     */
    const instantiatedAt = (signature: ts.Signature, position: number): ts.Type | undefined => {
      const parameters = signature.getParameters();
      const last = parameters.length - 1;
      const restDeclaration = parameters[last]?.valueDeclaration;
      const restAt = restDeclaration && ts.isParameter(restDeclaration) && restDeclaration.dotDotDotToken ? last : undefined;
      if (restAt === undefined || position < restAt) {
        const own = parameters[position];
        return own ? checker.getTypeOfSymbol(own) : undefined;
      }
      const rest = checker.getTypeOfSymbol(parameters[restAt]);
      if (!checker.isTupleType(rest)) return checker.getIndexTypeOfType(rest, ts.IndexKind.Number) ?? rest;
      const tuple = (rest as ts.TupleTypeReference).target;
      const offset = position - restAt;
      if (offset < tuple.fixedLength) return checker.getTypeArguments(rest as ts.TypeReference)[offset];
      return (tuple.combinedFlags & ts.ElementFlags.Variable) !== 0 ? (checker.getIndexTypeOfType(rest, ts.IndexKind.Number) ?? rest) : undefined;
    };
    /**
     * The type an argument flows into (undefined: no parameter takes it, or the callee is unresolved). A call's or a new
     * expression's argument is read at its effective position (wb-97ah; pinned for R-THIS-BINDING's this argument), and a
     * tagged template's substitution at its index among the template's substitutions plus one, the template strings array
     * taking the first (wb-021.10; pinned in the cells TAGGED-TEMPLATE-ARGUMENTS names, each a tag form - its declaration
     * and the spelling of its tag expression -, a substitution position and a value with the spelling of its expression;
     * any other tag form, position, value or spelling NOT CLAIMED, respin 3). A src declaration's own declared this
     * parameter receives no argument and is skipped, as ownAt skips it (wb-021.10), so an argument that is no spread and
     * has none written before it is read against the declared parameter the checker binds it to (pinned in the cells
     * THIS-PARAMETER-ARGUMENTS names, each a callee form - its declaration, its this parameter's written type and the
     * spelling of its callee expression -, an argument position and a value with the spelling of its expression; any
     * other callee form, position, value or spelling NOT CLAIMED, respin 3); a library declaration's
     * own this parameter is NOT CLAIMED (R-THIS-BINDING keeps Function.prototype's call, apply and bind pinned).
     */
    const argumentTarget = (call: ts.CallExpression | ts.NewExpression | ts.TaggedTemplateExpression, node: ts.Expression, exposing: boolean): ts.Type | undefined => {
      const tagged = ts.isTaggedTemplateExpression(call);
      const passed: readonly ts.Expression[] = tagged ? (ts.isTemplateExpression(call.template) ? call.template.templateSpans.map(span => span.expression) : []) : (call.arguments ?? []);
      const written = passed.indexOf(node);
      if (written < 0) return undefined;
      const index = tagged ? written + 1 : effectivePosition(passed, node);
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
      const parameters = isSrc(declaration) ? parametersOf(declaration).filter(parameter => !isThisParameter(parameter)) : parametersOf(declaration);
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
      return instantiatedAt(signature, index);
    };
    /** The flow a node in a flow position takes: its form, the type it flows into and the site the row names. */
    const flowOf = (node: ts.Expression, exposing: boolean): { readonly form: ResolvableForm; readonly target: ts.Type | undefined; readonly site: ts.Node; readonly awaited?: true } | undefined => {
      const parent = node.parent;
      const passed: readonly ts.Expression[] = (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments ? parent.arguments : [];
      if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && passed.includes(node)) return { form: "argument", target: argumentTarget(parent, node, exposing), site: parent };
      // A tagged template's substitution is an argument of the call its tag makes (wb-021.10): read at its position, the tagged template the site (pinned in the cells TAGGED-TEMPLATE-ARGUMENTS names, each a tag form - its declaration and the spelling of its tag expression -, a substitution position and a value with the spelling of its expression; any other NOT CLAIMED, respin 3).
      const tagged = substitutionOf(node);
      if (tagged) return { form: "argument", target: argumentTarget(tagged, node, exposing), site: tagged };
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
        if (!written) return undefined;
        const type = checker.getTypeFromTypeNode(written);
        // An async function that is no generator (wb-021.7, resolving cut #8's async-return shape): its return converts into the written promise's awaited type, the value as awaited (judgeFlow).
        const fn = ts.isArrowFunction(parent) ? parent : ts.findAncestor(parent.parent, ts.isFunctionLike);
        if (fn !== undefined && isAsyncFunction(fn) && !isGeneratorFunction(fn)) return { form: "return", target: checker.getAwaitedType(type), site: parent, awaited: true };
        return { form: "return", target: type, site: parent };
      }
      if (ts.isAsExpression(parent) || ts.isTypeAssertionExpression(parent)) return { form: "cast", target: checker.getTypeFromTypeNode(parent.type), site: parent };
      return undefined;
    };
    /**
     * The types an object literal's own members are read against (wb-021.7 cut #2, refusal #1 U1 and U2): each part of the
     * literal's contextual type (contextualParts) and each part of the declared target (flowOf) of the flow the literal is written
     * at - the outermost expression at which writtenAt reads the literal as written where it flows (cut #8's walk) - a src
     * callee's parameter as declared included, a type parameter whose instantiation the checker's contextual type takes from the
     * literal itself, so a literal passed as the argument itself to a type parameter is read through its constraint; each type
     * once. A literal written inside such an argument (flowOf reads a property's value through its contextual type and an array's
     * or a tuple's element not at all), or passed to a src signature with no body (argumentTarget trusts none of its parameters),
     * is read against the instantiation the call infers from the literal itself alone (R-INFERRED-INSTANTIATION, wb-021.7 cut #3).
     * A callee that declares an explicit this parameter, and a tagged template's tag, give the declared target through the
     * parameter argumentTarget reads (wb-021.10's landed reading: the this parameter skipped, a substitution read as its call's
     * argument), pinned in R-INFERRED-LITERAL's restated pages alone (wb-021.7 cut #5, which withdraws cut #4's this-parameter
     * kind: cut #4 trusted no parameter of such a callee and failed a call to it closed).
     */
    const literalBases = (literal: ts.ObjectLiteralExpression): readonly ts.Type[] => {
      const contextual = checker.getContextualType(literal);
      let at: ts.Node = literal;
      while (at.parent !== undefined && writtenAt(literal, at.parent)) at = at.parent;
      const target = ts.isExpression(at) ? flowOf(at, false)?.target : undefined;
      return [...new Set([...(contextual ? contextualParts(contextual) : []), ...(target ? contextualParts(target) : [])])];
    };
    /** A value node that exposes the projection, read by its parent. */
    const judgeValue = (node: ts.Expression): Verdict | undefined => {
      const parent = node.parent;
      const flow = flowOf(node, true);
      if (flow) {
        if (!flow.target) return { refused: flow.form, site: flow.site };
        judgeFlow(flow.form, node, flow.target, flow.site, false, flow.awaited === true);
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
    const standInParameters = (member: StandInMember, reading: StandInReading): readonly ts.ParameterDeclaration[] => {
      if (reading === "field" || reading === "getter") return [];
      return parametersOf(member);
    };
    /** The type a method's or a setter's own declared parameters take at a position the base hands (cut #6): a this parameter skipped (it receives no argument), a rest parameter's element at and past its own position; undefined past the last. */
    const ownAt = (own: readonly ts.ParameterDeclaration[], at: number): ts.Type | undefined => {
      const received = own.filter(parameter => !isThisParameter(parameter));
      const last = received[received.length - 1];
      const parameter = received[at] ?? (last?.dotDotDotToken ? last : undefined);
      if (!parameter) return undefined;
      const declared = checker.getTypeAtLocation(parameter);
      return parameter.dotDotDotToken ? (checker.getIndexTypeOfType(declared, ts.IndexKind.Number) ?? declared) : declared;
    };
    /** The type through which a field and a getter stand in, read through the checker (cut #6): a field's own, declared or inferred (whatever its initializer, or none), a constructor parameter property's own the same way (wb-021.7), and the type a getter returns; undefined for a method and a setter. */
    const standInType = (member: StandInMember, reading: StandInReading): ts.Type | undefined => {
      if (reading === "field") return ts.isPropertyDeclaration(member) || ts.isParameter(member) ? checker.getTypeAtLocation(member) : undefined;
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
    const judgeStandIn = (member: StandInMember, reading: StandInReading, bases: readonly ts.Type[], form: ResolvableForm): void => {
      const symbol = member.name ? checker.getSymbolAtLocation(member.name) : undefined;
      if (symbol === undefined) return;
      const own = standInParameters(member, reading);
      const typed = reading === "field" || reading === "getter";
      // A field's or a getter's type is read through the signatures that run (wb-021.7): an overload set's through its implementation, a set with no single implementation failing closed (overload).
      const running = typed ? runningReceivers(standInType(member, reading)) : undefined;
      const receivers = running?.signatures;
      // How many positions the stand-in receives: a base's rest parameter is handed that far.
      const span = Math.max(own.length, ...(receivers ?? []).map(signature => signature.getParameters().length));
      let lost = false;
      let unresolved = false;
      let handedProjection = false;
      let handsBack = false;
      // What the stand-in hands back (cut #8, ruling R-B67): a method's return, the result of every call signature of a field's or a getter's type, or, for a property that is no callback, the field's value or the getter's result.
      const backs: readonly ts.Type[] =
        reading === "parameters"
          ? [checker.getSignatureFromDeclaration(member as ts.SignatureDeclaration)?.getReturnType()].filter((item): item is ts.Type => item !== undefined)
          : typed
            ? (receivers ?? []).map(signature => signature.getReturnType())
            : [];
      const ownValue = typed ? standInType(member, reading) : undefined;
      for (const base of bases) {
        const properties = checker.getPropertiesOfType(base);
        for (const property of symbol.escapedName === ts.InternalSymbolName.Computed ? properties : properties.filter(item => item.escapedName === symbol.escapedName)) {
          const declared = checker.getTypeOfSymbol(property);
          const goals = checker.getNonNullableType(declared).getCallSignatures();
          if (goals.length > 0) {
            if (goals.some(signature => holdsHanding(signature.getReturnType(), 0) && backs.some(back => !provenReturn(back, signature.getReturnType())))) handsBack = true;
          } else if (ownValue !== undefined && reading !== "parameters" && holdsHanding(declared, 0) && !provenReturn(ownValue, declared)) handsBack = true;
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
              if (paths.length > 0) handedProjection = true;
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
      if (handedProjection && running?.unread === true) refuse("overload", member);
      if (unresolved) refuse("unresolved-stand-in", member);
      if (handsBack) refuse("stand-in-return", member);
      if (lost) refuse(form, member);
    };
    /**
     * A value a generator yields or returns (an async generator's included) under a written type that holds a handing type
     * (cut #8, ruling R-B67): the value converts into the yielded or the returned type, while the flow reading reads the written
     * generator, so it is never read and it fails closed at the return or the yield, whatever the value (generator-yield, a
     * generator's return included). An async function that is no generator is read by its flow instead (wb-021.7: flowOf
     * judges its return against the written promise's awaited type).
     */
    const judgeWrapped = (site: ts.Node): void => {
      const fn = ts.isArrowFunction(site) ? site : ts.findAncestor(site.parent, ts.isFunctionLike);
      if (fn === undefined || !("type" in fn) || fn.type === undefined) return;
      if (isGeneratorFunction(fn) && holdsHanding(checker.getTypeFromTypeNode(fn.type as ts.TypeNode), 0)) refuse("generator-yield", site);
    };
    /** The instance type a class-like declaration declares. */
    const instanceOf = (owner: ts.ClassLikeDeclaration): ts.Type | undefined => {
      const named = owner.name ? checker.getSymbolAtLocation(owner.name) : undefined;
      return named ? checker.getDeclaredTypeOfSymbol(named) : checker.getTypeAtLocation(owner).getConstructSignatures()[0]?.getReturnType();
    };
    /**
     * A class whose implements clause names a type with a member that hands the projection, where the member that runs is one
     * the class inherits rather than declares - an ancestor's method, field, accessor or constructor parameter property, or
     * one a declare field of a class with an extends clause only re-types (cut #8, ruling R-B67): the stand-in reading reads the class's own
     * elements only, so the inherited implementation fails closed at the class (inherited-implementation), whether it hides the
     * projection or keeps it.
     */
    const judgeInherited = (owner: ts.ClassLikeDeclaration): void => {
      const implemented = (owner.heritageClauses ?? []).filter(clause => clause.token === ts.SyntaxKind.ImplementsKeyword).flatMap(clause => clause.types.map(item => checker.getTypeAtLocation(item)));
      const instance = implemented.length > 0 ? instanceOf(owner) : undefined;
      if (instance === undefined) return;
      const extending = (owner.heritageClauses ?? []).some(clause => clause.token === ts.SyntaxKind.ExtendsKeyword);
      const inherited = implemented.some(base =>
        objectParts(base).some(part =>
          handingMembers(part).some(member => {
            const declarations = checker.getPropertyOfType(instance, member.name)?.declarations ?? [];
            // A declare field emits nothing: in a class with an extends clause the member that runs is still the inherited one.
            const retyped = (item: ts.Declaration): boolean => extending && ts.canHaveModifiers(item) && (ts.getModifiers(item) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword);
            const own = (item: ts.Declaration): boolean => (item.parent === owner && !retyped(item)) || (ts.isParameter(item) && item.parent.parent === owner);
            return declarations.length > 0 && !declarations.some(own);
          }),
        ),
      );
      if (inherited) refuse("inherited-implementation", owner);
    };
    /** A spread into an object literal whose contextual type has a member that hands the projection, which the spread value supplies (cut #8, ruling R-B67): the literal reading reads the literal's own members only, so the spread fails closed (spread). */
    const judgeSpread = (spread: ts.SpreadAssignment): void => {
      const contextual = ts.isObjectLiteralExpression(spread.parent) ? checker.getContextualType(spread.parent) : undefined;
      if (contextual === undefined) return;
      const supplied = objectParts(checker.getTypeAtLocation(spread.expression));
      if (objectParts(constrained(contextual)).some(goal => handingMembers(goal).some(member => supplied.some(part => checker.getPropertyOfType(part, member.name) !== undefined)))) refuse("spread", spread);
    };
    /** The base sides a class element stands in for: an instance element the extended class's instance side and every implemented interface, a static one (the static modifier, or a static block) the extended class's static side, its constructor type. */
    const standInBases = (element: ts.ClassElement, owner: ts.ClassLikeDeclaration): ts.Type[] =>
      (owner.heritageClauses ?? []).flatMap(clause => {
        if (!isStaticElement(element)) return clause.types.map(item => checker.getTypeAtLocation(item));
        return clause.token === ts.SyntaxKind.ExtendsKeyword ? clause.types.map(item => checker.getTypeAtLocation(item.expression)) : [];
      });
    /**
     * A constructor's parameter properties (wb-021.7, resolving cut #7's parameter-property shape): each declares the member that
     * stands in for a base member of its name on the constructor's class's heritage (the instance side: the extended class's
     * instance side and the implemented interfaces), and it is read as a field is - through its own type, declared or inferred,
     * by STAND_IN's field reading (judgeStandIn: the parameters every call signature of that type takes, the signatures that
     * run, unresolved-stand-in, stand-in-return), refused at the parameter under the heritage form.
     */
    const judgeParameterProperties = (declaration: ts.ConstructorDeclaration, owner: ts.ClassLikeDeclaration): void => {
      const bases = standInBases(declaration, owner);
      if (bases.length === 0) return;
      for (const parameter of declaration.parameters) if (ts.isParameterPropertyDeclaration(parameter, declaration)) judgeStandIn(parameter, "field", bases, "heritage");
    };
    /**
     * The parameter lists through which a function-like's arguments object receives values: its own, and for a src overload
     * set's implementation every declaration of the set (wb-021.7: the implementation now stands in through the set, and its
     * arguments object receives what the visible signatures take, so an implementation that declares fewer parameters than
     * they do and reads its arguments object is refused, as a function whose own parameters hold the projection is).
     */
    const declaredParameterLists = (owner: ts.SignatureDeclaration): readonly (readonly ts.ParameterDeclaration[])[] => {
      if (!(ts.isFunctionDeclaration(owner) || ts.isMethodDeclaration(owner)) || owner.body === undefined || owner.name === undefined || !isSrc(owner)) return [parametersOf(owner)];
      const declarations = (checker.getSymbolAtLocation(owner.name)?.declarations ?? []).filter(item => ts.isFunctionDeclaration(item) || ts.isMethodDeclaration(item));
      return declarations.length > 1 ? declarations.map(item => parametersOf(item)) : [parametersOf(owner)];
    };
    const visit = (node: ts.Node, inType: boolean): void => {
      const internal = inClassModule ? classInternal(model, node, kinds) : undefined;
      if (internal) {
        for (const part of internal) visit(part, inType);
        return;
      }
      const typed = inType || ts.isTypeNode(node);
      // The fail-closed core's syntax-level shapes (cut #8, ruling R-B67): a class's inherited implementation, a spread under a handing contextual type, and a return or a yield of an async function or a generator under a written type that holds a handing type.
      if (!typed && ts.isClassLike(node)) judgeInherited(node);
      if (!typed && ts.isSpreadAssignment(node)) judgeSpread(node);
      if (!typed && ts.isExpression(node) && ((ts.isReturnStatement(node.parent) && node.parent.expression === node) || (ts.isArrowFunction(node.parent) && node.parent.body === node))) judgeWrapped(node.parent);
      if (!typed && ts.isYieldExpression(node)) judgeWrapped(node);
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
        // A constructor of a listed kind: its parameter properties stand in by name and fail closed where a base member hands the projection (cut #7).
        if (kind !== undefined && ts.isConstructorDeclaration(element)) judgeParameterProperties(element, element.parent);
      } else if (ts.isObjectLiteralElementLike(node) && ts.isObjectLiteralExpression(node.parent)) {
        // An object literal's method, getter and setter stand in for its contextual type's member by the same readings (its other elements are flows: property), each part of the contextual type and of the declared flow target that declares a member of its name read (wb-021.7 cut #2: literalBases).
        const kind = listedKind(node, CLASS_ELEMENT_KINDS);
        const reading = kind === undefined ? "none" : STAND_IN[kind];
        const bases = reading === "none" ? [] : literalBases(node.parent);
        if (bases.length > 0 && reading !== "none") judgeStandIn(node, reading, bases, "property");
      }
      if (ts.isTypeNode(node)) {
        if (exposes(checker.getTypeFromTypeNode(node))) record(judgeType(node));
      } else if (!typed && ts.isIdentifier(node) && node.text === "arguments" && isValueName(node) && checker.getSymbolAtLocation(node)?.declarations === undefined) {
        const owner = ts.findAncestor(node.parent, item => ts.isFunctionLike(item) && !ts.isArrowFunction(item));
        if (owner && declaredParameterLists(owner as ts.SignatureDeclaration).some(list => list.some(parameter => heldPaths(checker.getTypeAtLocation(parameter), 0).length > 0))) refuse("arguments", node.parent);
      } else if (!typed && ts.isShorthandPropertyAssignment(node)) {
        // A shorthand property flows into the member of its name in each part of the literal's contextual type and declared flow target that declares one (wb-021.7 cut #2: literalBases), one row per kind at its site however many parts declare it.
        const properties = literalBases(node.parent)
          .map(part => checker.getPropertyOfType(part, node.name.text))
          .filter((item): item is ts.Symbol => item !== undefined);
        const exposing = exposes(checker.getTypeAtLocation(node.name));
        const from = refused.length;
        for (const property of properties) judgeFlow("property", node.name, checker.getTypeOfSymbol(property), node, !exposing);
        refused.splice(from, refused.length - from, ...new Set(refused.slice(from)));
        if (properties.length === 0 && exposing) ok("property");
      } else if (!typed && ts.isExpression(node) && (!ts.isIdentifier(node) || isValueName(node))) {
        if (exposes(checker.getTypeAtLocation(node))) record(judgeValue(node));
        else {
          const flow = flowOf(node, false);
          if (flow?.target) judgeFlow(flow.form, node, flow.target, flow.site, true, flow.awaited === true);
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
/** cut #7 plant fragments: an interface whose member hands the projection, a function declared with overloads whose visible signature keeps the projection (its implementation, the body that runs, hides it or keeps it), and a base class whose method is handed it. */
const SINK_UI = "interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\n";
const OVERLOADED_HIDE = "function hideOverloaded(projection: ObservationProjection): void;\nfunction hideOverloaded(projection: unknown): void {\n  void projection;\n}\n";
const OVERLOADED_KEEP = "function keepOverloaded(projection: ObservationProjection): void;\nfunction keepOverloaded(projection: ObservationProjection): void {\n  void projection.stats();\n}\n";
const BASE_TAKE = "export class Base {\n  take(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\n";
/** cut #8 plant fragments: a class with no heritage clause whose field hides the projection, a base class with no heritage clause whose method hides it, and a module function whose parameter hides it. */
const HOLDER_UI = "class Holder {\n  forget = (projection: unknown): void => void projection;\n}\n";
const MID_UI = "class Mid {\n  forget(projection: unknown): void {\n    void projection;\n  }\n}\n";
const HIDE_UI = "const hide = (projection: unknown): void => void projection;\n";
/** wb-vgri plant fragments (landing 672 F5-F7): an object literal not written where it flows whose member hides the projection, the callback type a Sink member hands it to, a function whose this parameter is a Sink, a class whose field keeps the projection, and a second class whose field hides it. */
const IMPL_UI = "const impl = { forget: (projection: unknown): void => void projection };\n";
const TAKER = "(projection: ObservationProjection) => void";
const USE_THIS_UI = "function use(this: Sink): number {\n  void this;\n  return 0;\n}\n";
const KEEPER_UI = "class Keeper {\n  forget = (projection: ObservationProjection): void => void projection.stats();\n}\n";
const HOLDER2_UI = "class Holder2 {\n  forget = (projection: unknown): void => void projection;\n}\n";
/** wb-vgri respin 1 plant fragments (refusal #1 U1, F1, F2): a function whose this parameter is a Sink and which takes an argument, a class whose method of that kind takes one, a function whose this parameter is the callback type, a second context-less literal, and a class whose static field hides the projection. */
const USE2_UI = "function use2(this: Sink, n: number): number {\n  void this;\n  return n;\n}\n";
const TOOL2_UI = "export class Tool {\n  count2(this: Sink, n: number): number {\n    void this;\n    return n;\n  }\n}\n";
const USE_TAKER_UI = `function useTaker(this: ${TAKER}): number {\n  void this;\n  return 0;\n}\n`;
const IMPL2_UI = "const impl2 = { forget: (projection: unknown): void => void projection };\n";
const STATIC_HOLDER_UI = "class StaticHolder {\n  static forget = (projection: unknown): void => void projection;\n}\n";
/** wb-021.10 plant fragments: a class that declares the Sink type it flows into (its member keeps the projection), and a template strings array the call-expression twins of the tagged-template pages pass as their first argument. */
const DECLARED_KEEPER_UI = "class Keeper implements Sink {\n  forget = (projection: ObservationProjection): void => void projection.stats();\n}\n";
const TEXTS_UI = "declare const texts: TemplateStringsArray;\n";
/**
 * wb-021.10 respin 3 plant fragments (refusal #3 U1-U4): a const object literal that holds the tag in a shorthand property,
 * the exported Sink type a namespace import's tag module declares (each such page plants its own tag module: a plant path
 * is one case's), and a class instance, and a declaring one, held by a const's name.
 */
const TAG_HOLDER_UI = "const tags = { tag };\n";
const EXPORTED_SINK_UI = "export interface Sink {\n  forget: (projection: ObservationProjection) => void;\n}\n";
const HELD_UI = "const held = new Holder();\n";
const HELD_KEEPER_UI = "const held = new Keeper();\n";
/** wb-021.7 cut #2 plant fragments: an interface whose property is the projection beside the module variable its setter stand-ins store into, a class that declares Sink and keeps the projection, an interface that redeclares Sink's handing member with a type that hides it beside a class implementing it (R-INTERFACE-REDECLARATION), and an interface whose string index signature types a handing member (R-INDEX-STAND-IN). */
const SLOT_UI = "interface Slot {\n  projection: ObservationProjection;\n}\nlet held: unknown;\n";
const KEEPER_METHOD_UI = "class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\n";
const SNEAKY_UI = "interface Sneaky extends Sink {\n  forget: (projection: unknown) => void;\n}\nclass Quiet implements Sneaky {\n  forget = (projection: unknown): void => void projection;\n}\n";
const BAG_UI = "interface Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n}\n";
/** wb-021.7 cut #2: a second interface that declares Sink's member name, its projection at the second position. */
const TWIN_UI = "interface Twin {\n  forget: (first: number, projection: ObservationProjection) => void;\n}\n";
/** wb-021.7 cut #2: a second interface that declares Sink's member name, its projection at the first position (a shorthand hiding it is refused under both parts: one row). */
const PAIR_UI = "interface Pair {\n  forget: (projection: ObservationProjection, at: number) => void;\n}\n";
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
        "residual: a module that reaches the projection only through an erased or structural type - a cast from unknown, a structural interface of its own, Reflect, an any - reads as reaching nothing (no node of it exposes the projection, so readForms reads nothing there either; the erasure is refused in the module that erased it: ERASING-FLOWS, LIBRARY-FLOWS), and a typed holder's member reached through Reflect, a cast through unknown, a cast to any, a prototype lookup or an Object property call reads as the holder alone to projectionReach, while readForms refuses the erasing step itself (ERASING-FLOWS, LIBRARY-FLOWS); and an arguments object read by a function whose own parameters hold no projection while its base member hands one (a method stand-in that declares no parameter, reading arguments[0]) reads quiet: the element is an any, and readForms refuses the arguments object only in a function whose own parameters hold the projection - an overload set's implementation through every declaration of its set (wb-021.7, R-OVERLOADS) - (cut #7, refusal #6 F8)",
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
        reachForms(
          "src/ui/census-reach-erased-arguments.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget(): void {\n    void arguments[0];\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
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
        "a call through a src signature with no body of its own - an interface method or a function type (a value and a holder) - is refused, and a member declared to stand in for a base or interface member is read in exactly the roster the stand-in readings implement (cut #8, ruling R-B67): a class element the class declares itself, by its kind's STAND_IN reading against its own class's heritage clauses (an override, an implementation), a constructor parameter property as a field is (wb-021.7, R-PARAMETER-PROPERTIES), an object literal's own method, getter, setter or shorthand property under the contextual type of the flow it is written at, against the member of its name in each part of that type, and of the declared target of that flow, that declares one (a union part by part - an undefined or an object part beside the type, an argument's union parameter, and an async function's return, whose contextual type is the awaited type united with a PromiseLike of it - and a type parameter through its constraint, a src callee's generic parameter included where the literal is the argument itself, as writtenAt reads it, of a call the checker resolves to a src declaration with a body (argumentTarget's declared parameter), whose instantiation the checker's contextual type takes from the literal itself: wb-021.7 cut #2, refusal #1 U1 and U2, narrowed to that position at cut #3, refusal #2 U1, ruling R-B155, and to a declaration that declares no explicit this parameter at cut #4, refusal #3 U1, ruling R-B199; at cut #5, riding the landed carrier wb-021.10's argumentTarget, which skips a src declaration's own this parameter and reads a tagged template's substitution as its call's argument, it is read for an explicit-this callee and a tag only in the pages R-INFERRED-LITERAL pins - a literal's method at the argument itself of a function, of a function whose type parameter a union constrains, of a class's method, at a parameter after another, of a function expression and of a static method, and at a tag's substitution, each declaring an explicit this parameter, refused as each twin without one is - and any other member, position, callee or tag form under an explicit-this callee or a tag is NOT CLAIMED; the twin of each R-INFERRED-INSTANTIATION page under a parameter typed without a type parameter - a property's value, its getter, a shorthand, an array's and a tuple's element, two levels down, a method's and a constructor's nested argument, and a function-typed parameter's and an interface method's argument and an interface method's nested argument - is read against its contextual type, that position's declared member, and refused, and so is a setter inside a src callee's generic-parameter argument whose literal's own getter types the property as the projection, the literal's own type handing it: cut #3; a property assignment's value and a spread are read against the contextual type alone, and the twin of each page cut #4 adds to R-INFERRED-INSTANTIATION - an arrow's, a function expression's and an identifier's assigned value and a spread, each under a parameter typed without a type parameter, the direct call of the function a .call relay names, and an overload set's plain visible signature over an implementation that takes unknown - is read against its contextual type and refused (property; the spread fails closed, spread): cut #4), and a field, a getter or a callback typed by a src overload set read through the set's implementation (wb-021.7, R-OVERLOADS) - one whose own parameter hides a path that member hands it is refused at its declaration, while an override and a literal member that keep the projection read quiet, under a union contextual type too; a call through a class's own method is judged by that method's declaration alone; a stand-in outside that roster which the readings meet at a flow, a class or a literal is no dispatch reading and fails closed with the typed row the FAIL_CLOSED roster names - a field, a getter or a callback typed by an overload set with no single implementation (overload), a class instance or a class's static side flowing into a type its own class does not declare (structural-stand-in), a member the implementing class inherits (inherited-implementation), an object literal not written where it flows (context-less-literal), a spread (spread), what a callback or a stand-in hands back (callback-return, stand-in-return), a generator's written-type return (generator-yield; an async function's is read against the awaited type, wb-021.7, ASYNC-RETURNS) and a value of any other type (unlisted-stand-in) - except the named residuals' quiet pages (a class instance held inside another value, R-STRUCTURAL-STAND-IN; an object literal or a callback held as an array's or a tuple's element or as a library generic's type argument, R-HELD-VALUE; a value bound as a function's this into a type it is - by a function's own call or apply, by bind resolved to its second overload, by Reflect.apply resolved to its first, or by the call that hands the untyped Function interface's bind, call or apply, read off Function.prototype, the function and the value with no type argument written - or into any by Reflect.apply's second overload or by those members applied or called themselves with no type argument written (wb-py8n, landing 770 F6), and a member call's receiver, R-THIS-BINDING (final cut #4 also excepted the values its hole pinned, which the checker types by the function's this parameter's type - a value written after spreads, and one handed to those members with type arguments written - and wb-97ah reads each at its effective position and refuses it); a branch a conditional, a ?? or a || narrows, R-NARROWED-BRANCH; wb-vgri, landing 672 F5-F7, respin 1, respin 2 and final cut #4; wb-97ah; a member a base names only through an index signature, R-INDEX-STAND-IN; a member an extending interface redeclares with a type that hides the projection, R-INTERFACE-REDECLARATION; a literal's member matched against the instantiation a call infers from the literal itself, R-INFERRED-INSTANTIATION), and any other stand-in shape is outside this claim",
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
        reachForms(
          "src/ui/census-forms-dispatch-union-undefined.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink | undefined = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-object.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink | { readonly other: number } = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-argument.ts",
          `${OBS_UI}${SINK_UI}const take = (sink: Sink | undefined): void => void sink;\ntake({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-getter.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink | undefined = {\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return (projection: unknown): void => void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-setter.ts",
          `${OBS_UI}${SLOT_UI}export const slot: Slot | undefined = {\n  get projection(): ObservationProjection {\n    return held as ObservationProjection;\n  },\n  set projection(value: unknown) {\n    held = value;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "return"], ["property: set projection(value: unknown) { held = value; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nexport const sink: Sink | undefined = { forget };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-keeps.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink | undefined = {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  },\n};\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-literal-getter.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink = {\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return (projection: unknown): void => void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-literal-setter.ts",
          `${OBS_UI}${SLOT_UI}export const slot: Slot = {\n  get projection(): ObservationProjection {\n    return held as ObservationProjection;\n  },\n  set projection(value: unknown) {\n    held = value;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "return"], ["property: set projection(value: unknown) { held = value; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-literal-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nexport const sink: Sink = { forget };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-both-first.ts",
          `${OBS_UI}${SINK_UI}${TWIN_UI}export const sink: Sink | Twin = {\n  forget(first: unknown, projection?: ObservationProjection): void {\n    void first;\n    void projection?.stats();\n  },\n};\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["property: forget(first: unknown, projection?: ObservationProjection): void { void first; void projection?.stats(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-both-second.ts",
          `${OBS_UI}${SINK_UI}${TWIN_UI}export const sink: Sink | Twin = {\n  forget(projection: ObservationProjection | number, second?: unknown): void {\n    void projection;\n    void second;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "test", "type-part"], ["property: forget(projection: ObservationProjection | number, second?: unknown): void { void projection; void second; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-shorthand-both.ts",
          `${OBS_UI}${SINK_UI}${TWIN_UI}const forget = (projection: unknown): void => void projection;\nexport const sink: Sink | Twin = { forget };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-shorthand-both-hide.ts",
          `${OBS_UI}${SINK_UI}${PAIR_UI}const forget = (projection: unknown): void => void projection;\nexport const sink: Sink | Pair = { forget };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-union-constrained.ts",
          `${OBS_UI}${SINK_UI}export const make = <T extends Sink | undefined>(): T =>\n  ({\n    forget(projection: unknown): void {\n      void projection;\n    },\n  }) as T;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-union-argument.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink | undefined>(value: T): T => value;\nexport const kept = keep({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-argument.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: T): T => value;\nexport const kept = keep({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nconst keep = <T extends Sink>(value: T): T => value;\nexport const kept = keep({ forget });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-method.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  put<T extends Sink>(value: T): T {\n    return value;\n  }\n}\nexport const kept = new Box().put({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-constructor.ts",
          `${OBS_UI}${SINK_UI}class Box<T extends Sink> {\n  constructor(readonly value: T) {}\n}\nexport const box = new Box({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-branch.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink | undefined>(value: T): T => value;\nexport const pick = (ready: boolean): Sink | undefined =>\n  keep(\n    ready\n      ? {\n          forget(projection: unknown): void {\n            void projection;\n          },\n        }\n      : undefined,\n  );\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: (ready: boolean): Sink | undefined => keep( ready ? { forget(projection: unknown): void { void projection; }, } : undefined, )", "property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-parenthesized.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: T): T => value;\nexport const kept = keep(({\n  forget(projection: unknown): void {\n    void projection;\n  },\n}));\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-keeps.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: T): T => value;\nexport const kept = keep({\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  },\n});\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-property.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: { readonly sink: Sink }): Sink => value.sink;\nexport const kept = keep({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-union.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: { readonly sink: Sink | undefined }): Sink | undefined => value.sink;\nexport const kept = keep({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-getter.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: { readonly sink: Sink }): Sink => value.sink;\nexport const kept = keep({\n  sink: {\n    get forget(): (projection: unknown) => void {\n      return (projection: unknown): void => void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return (projection: unknown): void => void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nconst keep = (value: { readonly sink: Sink }): Sink => value.sink;\nexport const kept = keep({ sink: { forget } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-array-element.ts",
          `${OBS_UI}${SINK_UI}const keepAll = (values: readonly Sink[]): readonly Sink[] => values;\nexport const kept = keepAll([\n  {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-tuple-element.ts",
          `${OBS_UI}${SINK_UI}const keepPair = (pair: readonly [number, Sink]): readonly [number, Sink] => pair;\nexport const kept = keepPair([\n  1,\n  {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-two-levels.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: { readonly outer: { readonly sink: Sink } }): Sink => value.outer.sink;\nexport const kept = keep({\n  outer: {\n    sink: {\n      forget(projection: unknown): void {\n        void projection;\n      },\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-method.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  put(value: { readonly sink: Sink }): Sink {\n    return value.sink;\n  }\n}\nexport const kept = new Box().put({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-nested-constructor.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  constructor(readonly value: { readonly sink: Sink }) {}\n}\nexport const box = new Box({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-function-type-parameter.ts",
          `${OBS_UI}${SINK_UI}export const run = (keep: (value: Sink) => Sink): void => {\n  keep({\n    forget(projection: unknown): void {\n      void projection;\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-interface-method-literal.ts",
          `${OBS_UI}${SINK_UI}interface Api {\n  put(value: Sink): Sink;\n}\nexport const run = (api: Api): void => {\n  api.put({\n    forget(projection: unknown): void {\n      void projection;\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-interface-method-nested.ts",
          `${OBS_UI}${SINK_UI}interface Api {\n  put(value: { readonly sink: Sink }): Sink;\n}\nexport const run = (api: Api): void => {\n  api.put({\n    sink: {\n      forget(projection: unknown): void {\n        void projection;\n      },\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-generic-nested-setter.ts",
          `${OBS_UI}${SLOT_UI}const keep = <T extends Slot>(value: { readonly slot: T }): T => value.slot;\nexport const kept = keep({\n  slot: {\n    get projection(): ObservationProjection {\n      return held as ObservationProjection;\n    },\n    set projection(value: unknown) {\n      held = value;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "return"], ["property: set projection(value: unknown) { held = value; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-property-arrow.ts",
          `${OBS_UI}${SINK_UI}function keep(value: Sink): Sink {\n  return value;\n}\nexport const kept = keep({ forget: (projection: unknown): void => void projection });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: (projection: unknown): void => void projection"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-property-function.ts",
          `${OBS_UI}${SINK_UI}function keep(value: Sink): Sink {\n  return value;\n}\nexport const kept = keep({\n  forget: function (projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: function (projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-property-identifier.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nfunction keep(value: Sink): Sink {\n  return value;\n}\nexport const kept = keep({ forget: hide });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: hide"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-spread.ts",
          `${OBS_UI}${SINK_UI}const impl = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\nfunction keep(value: Sink): Sink {\n  return value;\n}\nexport const kept = keep({ ...impl });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["spread: ...impl"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-call-direct.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: Sink): Sink => value;\nexport const kept = keep({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-dispatch-overload-plain.ts",
          `${OBS_UI}${SINK_UI}function keep(value: Sink): Sink;\nfunction keep(value: unknown): unknown {\n  return value;\n}\nexport const kept = keep({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
      ],
    },
    {
      id: "UNLISTED-FORMS",
      label:
        "a node that exposes the projection in a parent no resolvable form names - an apparent member (constructor, a callable carrier's call), an undeclared element key, the arguments object, an object spread, a template with no tag (a tagged template's substitution is read as an argument in the cells TAGGED-TEMPLATE-ARGUMENTS names: wb-021.10), a yield, a throw, an export default, an in test - is refused",
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
        "a class element the class declares itself stands in for a base member of its own class's heritage clauses by its kind (STAND_IN; a member the class inherits fails closed instead, INHERITED-IMPLEMENTATIONS, and what it hands back, where its base member's type holds a type handing the projection, fails closed unless it is that type, STAND-IN-RETURNS, cut #8): a getter returning a function whose parameter hides the projection, a static member overriding the extended class's static member with such a parameter, a member named by a computed key (a constant one, and one the checker resolves to no name, judged against every base member) and an object literal's getter doing so are refused, while a getter and a static override that keep the projection, and a class whose index signature, static block, constructor (its parameter property naming no base member) and semicolon stand in for no named member, read quiet; a constructor's parameter property that names a base member is read as a field is (R-PARAMETER-PROPERTIES, wb-021.7; cut #7 failed it closed)",
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
        "a stand-in receives what its base member hands it position by position, read through the checker (cut #6): a field through its own type, declared or inferred, and a getter through the type it returns - every call signature of each union part, each parameter as instantiated - and a method by its own declared parameters, a this parameter skipped; a rest parameter, the stand-in's or the base's, is read as its element at and past its own position: a field initialized by a bare, a parenthesized or a cast arrow, by a function's name or by a call's result, an ambient annotated field, a static field override by name (a function declared with one signature; a field, a getter or a static override typed by a src overload set's visible signatures is read through the set's implementation, R-OVERLOADS, wb-021.7), a field typed by an overload set or a union and a getter returning a union one of whose signatures hides the projection, a field's and a method's rest parameter that hides it past its position, a method's and a field's parameter that hides it where the base's rest parameter hands it, and a method with a this parameter that hides it are refused; a field and a getter typed any (no call signature) while the base hands the projection fail closed (unresolved-stand-in); a field that keeps the projection (a library generic's instantiation included), a method with a this parameter that keeps it, rests of holders that keep it (a method's, a field's and a base's), a method and a field that never receive it, and an any-typed field the base hands no projection read quiet",
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
        "a callback flowing into a type that hands it the projection, at a flow the flow reading reads (an argument, an annotated initializer or default, an assignment, an object literal's property, a return under the written type of a function that is no generator - an async function's against the written promise's awaited type, ASYNC-RETURNS, wb-021.7 - a cast; a generator's written-type return fails closed instead, GENERATOR-YIELDS, cut #8), receives it as a stand-in does (cut #6): every call signature of each union part, by position, a this parameter receiving nothing - a callback typed by a union or an overload set one of whose signatures hides the projection, and one whose rest parameter hides it past its position (a map's key), are refused, as a plain hiding callback is; a callback typed by a union whose parts keep it, and one with a this parameter that keeps it, read quiet; what a callback hands back, where its target's return holds a type handing the projection, fails closed unless it is that type (CALLBACK-RETURNS, cut #8)",
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
        "residual: a callback or a holder that does not itself expose the projection, chosen by a conditional or a ?? operand, is judged by that expression's type, which subtype reduction narrows to the branch that keeps the projection - a conditional or a ?? choosing a callback that hides it reads quiet to the forms judge (the hiding callback's own flow is refused: CALLBACK-RECEIVERS); so does a field or a getter stand-in whose function is so chosen (cut #7): a field initialized by a conditional or a ?? and a getter whose inferred return is a conditional, choosing a function that hides the projection, read quiet; and so does a class instance whose class does not declare the type it flows into, chosen against a value of that type (wb-vgri, landing 672 F6): a ?? at a return, at an annotated initializer and at an argument, a conditional at a return, and a || at an assignment and at a return each read quiet where the instance's member hides the projection, a keeping instance chosen by a ?? at a return reads quiet too, and so does an object literal not written where it flows chosen against a value of that type by a ??, a || or a conditional at a return (respin 1, refusal #1 F2); a choice with no branch of the target type makes no such narrowing - a conditional between two such instances, and a && whose right operand is the instance (its type keeps the instance's own beside the left operand's falsy part) - so the instance is read there and refused (structural-stand-in), and so is the literal: a conditional between two such literals and a && whose right operand is the literal are refused (context-less-literal)",
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
        reachForms(
          "src/ui/census-forms-stand-in-branch.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nconst keep = (projection: ObservationProjection): void => void projection.stats();\nconst flag = Date.now() > 0;\nexport class Impl implements Sink {\n  forget = flag ? hide : keep;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-branch-getter.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nconst keep = (projection: ObservationProjection): void => void projection.stats();\nconst flag = Date.now() > 0;\nexport class Impl implements Sink {\n  get forget() {\n    return flag ? hide : keep;\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-branch-nullish.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nconst maybe: ((projection: ObservationProjection) => void) | undefined = undefined;\nexport class Impl implements Sink {\n  forget = maybe ?? hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-nullish-return.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const pick = (maybe: Sink | undefined): Sink => maybe ?? new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-nullish-initializer.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = (maybe: Sink | undefined): Sink => {\n  const sink: Sink = maybe ?? new Holder();\n  return sink;\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-nullish-argument.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const use = (sink: Sink): Sink => sink;\nexport const wired = (maybe: Sink | undefined): Sink => use(maybe ?? new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-conditional.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const pick = (flag: boolean, kept: Sink): Sink => (flag ? kept : new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-or-assignment.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}let held: Sink | undefined;\nexport const set = (maybe: Sink | undefined): void => {\n  held = maybe || new Holder();\n};\nexport const get = (): Sink | undefined => held;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-or-return.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const pick = (maybe: Sink | undefined): Sink => maybe || new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}export const pick = (maybe: Sink | undefined): Sink => maybe ?? new Keeper();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-literal-branch-nullish.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const pick = (maybe: Sink | undefined): Sink => maybe ?? impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-and-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const pick = (maybe: Sink | undefined): Sink | undefined => maybe && new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (maybe: Sink | undefined): Sink | undefined => maybe && new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-instance-branch-conditional-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${HOLDER2_UI}export const pick = (flag: boolean): Sink => (flag ? new Holder() : new Holder2());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (flag: boolean): Sink => (flag ? new Holder() : new Holder2())"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-branch-or-return.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const pick = (maybe: Sink | undefined): Sink => maybe || impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-literal-branch-conditional-kept.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const pick = (flag: boolean, kept: Sink): Sink => (flag ? kept : impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-literal-branch-and-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const pick = (maybe: Sink | undefined): Sink | undefined => maybe && impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: (maybe: Sink | undefined): Sink | undefined => maybe && impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-branch-conditional-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${IMPL2_UI}export const pick = (flag: boolean): Sink => (flag ? impl : impl2);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: (flag: boolean): Sink => (flag ? impl : impl2)"]),
        ),
      ],
    },
    {
      id: "R-OVERLOADS",
      label:
        "read (wb-021.7; cut #7 named this a residual, and the row keeps its id): the body behind a src overload set's visible signatures (a function or a method declared with more than one signature - a function declaration or a class's method declaration, ambient and abstract ones included, as isOverloadSignature reads them; an interface's method signatures are no such set, and a field typed by them is read through its visible signatures: wb-021.7 cut #2, refusal #1 F6) is read through the set's implementation - the one declaration of the set with a body, by its own declared parameters and its declared return, as declared (a type parameter through its constraint) - wherever a stand-in or a callback is typed by such a set: a field or a getter stand-in whose type's call signatures are the set's (a field by an overloaded function's name, a bound, an imported or a destructured one, a static or another instance's overloaded method, a static override by one, a getter whose inferred return is one; a constructor parameter property typed by one, R-PARAMETER-PROPERTIES) and such a set flowing as a callback into a type that hands it the projection (an argument, a library container's callback included, an object literal's property, an annotated initializer, a getter's or a function's return under its written type, an async function's return: ASYNC-RETURNS; a value typed by the set's own type is read through the same implementation where it flows, and the set flowing into its own type is judged against the visible signatures that hand it) are refused under the reading's own form (heritage, argument, property, initializer, return) where the implementation hides a path the target hands it (an unknown parameter, a rest of unknowns, an unconstrained type parameter) and fail closed with a stand-in-return row where it hands back a type that proves nothing the target's return declares (an unknown, an object), while one that keeps the projection (its own parameter, a union with it, a type parameter constrained to it) reads quiet; the arguments object of an implementation is read through every declaration of its set (a set of two or of three declarations, the visible signature that hands it the projection first or second: wb-021.7 cut #2, refusal #1 U3), so one that declares fewer parameters than the visible signature that hands it the projection and reads its arguments object is refused (arguments), a function or a method alike; a set with no single implementation (an ambient or an abstract set) is never read and fails closed with an overload row where the projection is handed; a call is read through the implementation (argument), a method stand-in declared with overloads by each of its declarations' own parameters (heritage) and a plain function's name through its one signature; such a set standing in, or flowing as a callback, where nothing hands it the projection reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-overload-field.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  forget = hideOverloaded;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hideOverloaded;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-field-keeps.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_KEEP}export class Impl implements Sink {\n  forget = keepOverloaded;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-getter.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  get forget(): (projection: ObservationProjection) => void {\n    return hideOverloaded;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: return hideOverloaded;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-getter-inferred.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  get forget() {\n    return hideOverloaded;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: get forget() { return hideOverloaded; }"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-static.ts",
          `${OBS_UI}export class Base {\n  static take = (projection: ObservationProjection): void => void projection;\n}\n${OVERLOADED_HIDE}export class Sub extends Base {\n  static override take = hideOverloaded;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "test"], ["heritage: static override take = hideOverloaded;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-method-value.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  hide(projection: ObservationProjection): void;\n  hide(projection: unknown): void {\n    void projection;\n  }\n}\nconst helper = new Helper();\nexport class Impl implements Sink {\n  forget = helper.hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = helper.hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-literal.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export const sink: Sink = { forget: hideOverloaded };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-callback.ts",
          `${OBS_UI}${OVERLOADED_HIDE}const register = (callback: (projection: ObservationProjection) => void): void => void callback;\nexport const wire = (): void => register(hideOverloaded);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: register(hideOverloaded)"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-annotated.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  forget: (projection: ObservationProjection) => void = hideOverloaded;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["initializer: forget: (projection: ObservationProjection) => void = hideOverloaded;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-call.ts",
          `${OBS_UI}${OVERLOADED_HIDE}export const call = (projection: ObservationProjection): void => hideOverloaded(projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: hideOverloaded(projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-method.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget(projection: ObservationProjection): void;\n  forget(projection: unknown): void {\n    void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-plain-twin.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nexport class Impl implements Sink {\n  forget = hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-quiet-plain.ts",
          `${OBS_UI}${SINK_UI}function keepPlain(projection: ObservationProjection): void {\n  void projection.stats();\n}\nexport class Impl implements Sink {\n  forget = keepPlain;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-quiet-unhanded.ts",
          `${OBS_UI}interface Labelled {\n  label: (text: string) => void;\n  read: (projection: ObservationProjection) => number;\n}\nfunction describe(text: string): void;\nfunction describe(text: unknown): void {\n  void text;\n}\nconst register = (callback: (text: string) => void): void => void callback;\nexport const wire = (): void => register(describe);\nexport class Impl implements Labelled {\n  label = describe;\n  read = (projection: ObservationProjection): number => projection.stats().nodes;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-function-return.ts",
          `${OBS_UI}${OVERLOADED_HIDE}export const make = (): ((projection: ObservationProjection) => void) => hideOverloaded;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: (): ((projection: ObservationProjection) => void) => hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-ambient.ts",
          `${OBS_UI}const register = (callback: (projection: ObservationProjection) => void): void => void callback;\ndeclare function keepAmbient(projection: ObservationProjection): void;\ndeclare function keepAmbient(projection: ObservationProjection, label: string): void;\nexport const wire = (): void => register(keepAmbient);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["overload: register(keepAmbient)"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-abstract.ts",
          `${OBS_UI}${SINK_UI}abstract class Hider {\n  abstract hide(projection: ObservationProjection): void;\n  abstract hide(projection: ObservationProjection, label: string): void;\n}\ndeclare const hider: Hider;\nexport class Impl implements Sink {\n  forget = hider.hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["overload: forget = hider.hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-rest.ts",
          `${OBS_UI}${SINK_UI}function hideRest(projection: ObservationProjection): void;\nfunction hideRest(...values: unknown[]): void {\n  void values;\n}\nexport class Impl implements Sink {\n  forget = hideRest;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hideRest;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-union-keeps.ts",
          `${OBS_UI}${SINK_UI}function keepUnion(projection: ObservationProjection): void;\nfunction keepUnion(projection: ObservationProjection | string): void {\n  void projection;\n}\nexport class Impl implements Sink {\n  forget = keepUnion;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "test", "type-part"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-generic-hides.ts",
          `${OBS_UI}${SINK_UI}function hideGeneric(projection: ObservationProjection): void;\nfunction hideGeneric<T>(projection: T): void {\n  void projection;\n}\nexport class Impl implements Sink {\n  forget = hideGeneric;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hideGeneric;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-constrained-keeps.ts",
          `${OBS_UI}${SINK_UI}function keepConstrained(projection: ObservationProjection): void;\nfunction keepConstrained<T extends ObservationProjection>(projection: T): void {\n  void projection.stats();\n}\nexport class Impl implements Sink {\n  forget = keepConstrained;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "constraint", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-alias.ts",
          `${OBS_UI}${OVERLOADED_HIDE}const register = (callback: (projection: ObservationProjection) => void): void => void callback;\nconst alias: typeof hideOverloaded = hideOverloaded;\nexport const wire = (): void => register(alias);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: register(alias)", "initializer: alias: typeof hideOverloaded = hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-implementation-return.ts",
          `${OBS_UI}${SINK_UI}interface Factory {\n  make(): Sink;\n}\nfunction makeLoose(): Sink;\nfunction makeLoose(): unknown {\n  return undefined;\n}\nexport class Impl implements Factory {\n  make = makeLoose;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: make = makeLoose;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-object-return.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Sink;\n}\nfunction makeObject(): Sink;\nfunction makeObject(): object {\n  return new Holder();\n}\nexport class Impl implements Factory {\n  make = makeObject;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: make = makeObject;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-bound.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  forget = hideOverloaded.bind(undefined);\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hideOverloaded.bind(undefined);"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-imported.ts",
          `${OBS_UI}${SINK_UI}import { hideElsewhere } from "./census-forms-overload-imported-set.js";\nexport class Impl implements Sink {\n  forget = hideElsewhere;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hideElsewhere;"]),
          { "src/ui/census-forms-overload-imported-set.ts": `${OBS_UI}export function hideElsewhere(projection: ObservationProjection): void;\nexport function hideElsewhere(projection: unknown): void {\n  void projection;\n}\n` },
        ),
        reachForms(
          "src/ui/census-forms-overload-static-method.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  static hide(projection: ObservationProjection): void;\n  static hide(projection: unknown): void {\n    void projection;\n  }\n}\nexport class Impl implements Sink {\n  forget = Helper.hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = Helper.hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-destructured.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  hide(projection: ObservationProjection): void;\n  hide(projection: unknown): void {\n    void projection;\n  }\n}\nconst { hide } = new Helper();\nexport class Impl implements Sink {\n  forget = hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = hide;"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-library-callback.ts",
          `${OBS_UI}${OVERLOADED_HIDE}export const each = (projection: ObservationProjection): void => [projection].forEach(hideOverloaded);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "array-element", "member"], ["argument: [projection].forEach(hideOverloaded)"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-arguments.ts",
          `${OBS_UI}${SINK_UI}function hideArgs(projection: ObservationProjection): void;\nfunction hideArgs(): void {\n  void arguments[0];\n}\nexport class Impl implements Sink {\n  forget = hideArgs;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-method-arguments.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  hide(projection: ObservationProjection): void;\n  hide(): void {\n    void arguments[0];\n  }\n}\nexport class Impl implements Sink {\n  forget = new Helper().hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-arguments-quiet.ts",
          `${OBS_UI}function countArgs(label: string): number;\nfunction countArgs(): number {\n  return arguments.length;\n}\nexport const counted = (projection: ObservationProjection): number => countArgs("label") + projection.stats().nodes;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-overload-arguments-first-of-three.ts",
          `${OBS_UI}${SINK_UI}function hideFirst(projection: ObservationProjection): void;\nfunction hideFirst(label: string): void;\nfunction hideFirst(): void {\n  void arguments[0];\n}\nexport class Impl implements Sink {\n  forget = hideFirst;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-arguments-second-of-three.ts",
          `${OBS_UI}${SINK_UI}function hideSecond(label: string): void;\nfunction hideSecond(projection: ObservationProjection): void;\nfunction hideSecond(): void {\n  void arguments[0];\n}\nexport class Impl implements Sink {\n  forget = hideSecond;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-method-arguments-first-of-three.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  hide(projection: ObservationProjection): void;\n  hide(label: string): void;\n  hide(): void {\n    void arguments[0];\n  }\n}\nexport class Impl implements Sink {\n  forget = new Helper().hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-method-arguments-second-of-three.ts",
          `${OBS_UI}${SINK_UI}class Helper {\n  hide(label: string): void;\n  hide(projection: ObservationProjection): void;\n  hide(): void {\n    void arguments[0];\n  }\n}\nexport class Impl implements Sink {\n  forget = new Helper().hide;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["arguments: arguments[0]"]),
        ),
        reachForms(
          "src/ui/census-forms-overload-interface-signatures.ts",
          `${OBS_UI}${SINK_UI}interface Pair {\n  take(projection: ObservationProjection): void;\n  take(label: string): void;\n}\ndeclare const pair: Pair;\nexport class Impl implements Sink {\n  forget = pair.take;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget = pair.take;"]),
        ),
      ],
    },
    {
      id: "R-PARAMETER-PROPERTIES",
      label:
        "read (wb-021.7; cut #7 named this a residual, and the row keeps its id): a constructor parameter property declares the member that stands in for a member of its name on the class's heritage (the extended class's instance side, an implemented interface), and it is read as a field is (STAND_IN's field reading) - through its own type, declared or inferred from its default: the parameters every call signature of that type takes, through the signatures that run (an overload set's implementation, R-OVERLOADS) - so in each form planted here (public, readonly, protected, override, optional, a class expression's) one whose type hides a path the base member hands it (an unknown parameter, a held path, a function its default infers, an overload set whose implementation hides it) is refused at the parameter under heritage, as the same member declared as a field is (heritage), one typed any fails closed (unresolved-stand-in) and one that hands back a type the base's does not declare fails closed (stand-in-return), while one that keeps the projection reads quiet; a parameter property standing in for no member of its name, or for one that hands no projection, reads quiet (one a base names only through an index signature: R-INDEX-STAND-IN)",
      cases: [
        reachForms(
          "src/ui/census-forms-param-prop-public.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  constructor(public forget: (projection: unknown) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public forget: (projection: unknown) => void"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-readonly.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  constructor(readonly forget: (projection: unknown) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: readonly forget: (projection: unknown) => void"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-override.ts",
          `${OBS_UI}export class Base {\n  take = (projection: ObservationProjection): number => projection.stats().nodes;\n}\nexport class Sub extends Base {\n  constructor(public override take: (projection: unknown) => number) {\n    super();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["heritage: public override take: (projection: unknown) => number"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-protected.ts",
          `${OBS_UI}export class Base {\n  protected take = (projection: ObservationProjection): number => projection.stats().nodes;\n}\nexport class Sub extends Base {\n  constructor(protected override take: (projection: unknown) => number) {\n    super();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["heritage: protected override take: (projection: unknown) => number"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-keeps.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  constructor(public forget: (projection: ObservationProjection) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-field-twin.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget: (projection: unknown) => void;\n  constructor(forget: (projection: unknown) => void) {\n    this.forget = forget;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget: (projection: unknown) => void;"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-quiet-unmatched.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  constructor(readonly label: string) {}\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-quiet-unhanded.ts",
          `${OBS_UI}interface Labelled {\n  label: (text: string) => void;\n  read: (projection: ObservationProjection) => number;\n}\nexport class Impl implements Labelled {\n  constructor(public label: (text: unknown) => void) {}\n  read = (projection: ObservationProjection): number => projection.stats().nodes;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-optional.ts",
          `${OBS_UI}interface MaybeSink {\n  forget?: (projection: ObservationProjection) => void;\n}\nexport class Impl implements MaybeSink {\n  constructor(public forget?: (projection: unknown) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public forget?: (projection: unknown) => void"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-default.ts",
          `${OBS_UI}${SINK_UI}${HIDE_UI}export class Impl implements Sink {\n  constructor(public forget = hide) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public forget = hide"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-any.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  constructor(public forget: any) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unresolved-stand-in: public forget: any"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-overload.ts",
          `${OBS_UI}${SINK_UI}${OVERLOADED_HIDE}export class Impl implements Sink {\n  constructor(public forget: typeof hideOverloaded) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public forget: typeof hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-hand-back.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  constructor(readonly sink: Holder) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: readonly sink: Holder"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-class-expression.ts",
          `${OBS_UI}${SINK_UI}export const Impl = class implements Sink {\n  constructor(public forget: (projection: unknown) => void) {}\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public forget: (projection: unknown) => void"]),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-override-keeps.ts",
          `${OBS_UI}export class Base {\n  take = (projection: ObservationProjection): number => projection.stats().nodes;\n}\nexport class Sub extends Base {\n  constructor(public override take: (projection: ObservationProjection) => number) {\n    super();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-param-prop-held-path.ts",
          `${OBS_UI}interface Taker {\n  take: (holder: { readonly projection: ObservationProjection }) => void;\n}\nexport class Impl implements Taker {\n  constructor(public take: (holder: { readonly projection: unknown }) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: public take: (holder: { readonly projection: unknown }) => void"]),
        ),
      ],
    },
    {
      id: "R-STRUCTURAL-STAND-IN",
      label:
        "residual: a class instance, or a class's static side, flowing directly (an argument, an annotated initializer, an object literal's property, a return under the written type of a function that is no generator - an async function's against the written promise's awaited type, ASYNC-RETURNS, wb-021.7 - a cast; a generator's written-type return fails closed instead, GENERATOR-YIELDS, cut #8) into an object type (each part of a union or an intersection) - a class, an interface or a type literal - that its class does not declare (itself, or through its extends and implements clauses, transitively; a generic's instantiation only as that same instantiation, and a class's static side only as its own or its extends chain's static side, cut #8) stands in for that type's members structurally, and it is never read as a stand-in (cut #7, ruling R-B60): where a member of that type which the instance also has hands the projection it fails closed with a structural-stand-in row whether the instance's member hides the projection or keeps it, while a class that declares the type is read through its heritage and an object literal through its contextual type; such a flow into a type whose members hand no projection, and a class instance held inside another value (an array's element, a library generic's type argument: the array Array.of builds, the promise Promise.resolve settles; cut #8, refusal #7 F10) entering such a type, read quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-structural-base.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const base: Base = new Impl();\nexport const count = (projection: ObservationProjection): number => base.take(projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], ["structural-stand-in: base: Base = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-interface.ts",
          `${OBS_UI}${SINK_UI}export class Impl {\n  forget = (projection: unknown): void => void projection;\n}\nexport const sink: Sink = new Impl();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: sink: Sink = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-literal-type.ts",
          `${OBS_UI}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const port: { take(projection: ObservationProjection): number } = new Impl();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: port: { take(projection: ObservationProjection): number } = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-return.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const make = (): Base => new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: (): Base => new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-argument.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nconst use = (base: Base, projection: ObservationProjection): number => base.take(projection);\nexport const run = (projection: ObservationProjection): number => use(new Impl(), projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], ["structural-stand-in: use(new Impl(), projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-property.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const deps: { readonly base: Base } = { base: new Impl() };\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: base: new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-cast.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const base = new Impl() as Base;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: new Impl() as Base"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-root.ts",
          `${OBS_UI}${BASE_TAKE}class Root {}\nexport class Impl extends Root {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const base: Base = new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: base: Base = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-keeps.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: ObservationProjection): number {\n    return projection.stats().edges;\n  }\n}\nexport const base: Base = new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: base: Base = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-heritage-twin.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl extends Base {\n  override take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const base: Base = new Impl();\nexport const count = (projection: ObservationProjection): number => base.take(projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], ["heritage: override take(projection: unknown): number { void projection; return 0; }"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-object-literal.ts",
          `${OBS_UI}${BASE_TAKE}export const base: Base = {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  },\n};\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["property: take(projection: unknown): number { void projection; return 0; }"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-union.ts",
          `${OBS_UI}${BASE_TAKE}interface Labelled {\n  label(text: string): void;\n}\nexport class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const either: Base | Labelled = new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: either: Base | Labelled = new Impl()"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-static.ts",
          `${OBS_UI}export class Impl {\n  static take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const port: { take(projection: ObservationProjection): number } = Impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: port: { take(projection: ObservationProjection): number } = Impl"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-quiet-transitive.ts",
          `${OBS_UI}${SINK_UI}export class Mid implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport class Impl extends Mid {}\nexport const sink: Sink = new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-structural-quiet-unmatched.ts",
          `${OBS_UI}interface Port {\n  take?(projection: ObservationProjection): number;\n  label(text: string): void;\n}\nexport class Impl {\n  label(text: string): void {\n    void text;\n  }\n}\nexport const port: Port = new Impl();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-structural-quiet-unhanded.ts",
          `${OBS_UI}interface Labelled {\n  label(text: string): void;\n}\nexport class Impl {\n  label(text: unknown): void {\n    void text;\n  }\n  read(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\nexport const labelled: Labelled = new Impl();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-structural-quiet-held.ts",
          `${OBS_UI}${BASE_TAKE}export class Impl {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport const bases: Base[] = [new Impl()];\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-structural-static-implements.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n  static forget(projection: unknown): void {\n    void projection;\n  }\n}\nexport const sink: Sink = Impl;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: sink: Sink = Impl"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-generic-instance.ts",
          `${OBS_UI}interface Port<T> {\n  take(projection: T): number;\n}\nexport class Impl<T> implements Port<T> {\n  take(projection: T): number {\n    void projection;\n    return 0;\n  }\n}\nexport const port: Port<ObservationProjection> = new Impl<unknown>();\n`,
          reached(true, [], [], ["port"]),
          formsRead(["annotation"], ["structural-stand-in: port: Port<ObservationProjection> = new Impl<unknown>()", "type-argument: Port<ObservationProjection>"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-generic-declared.ts",
          `${OBS_UI}interface Port<T> {\n  take(projection: T): number;\n}\nexport class Impl implements Port<ObservationProjection> {\n  take(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\nexport const port: Port<ObservationProjection> = new Impl();\n`,
          reached(true, ["stats"], [], ["port", "projection"]),
          formsRead(["annotation", "heritage", "member"], ["type-argument: Port<ObservationProjection>", "type-argument: Port<ObservationProjection>"]),
        ),
        reachForms(
          "src/ui/census-forms-structural-promise-held.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sink: Promise<Sink> = Promise.resolve(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-structural-array-of-held.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sinks: readonly Sink[] = Array.of(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
      ],
    },
    {
      id: "R-HELD-VALUE",
      label:
        "residual: a stand-in held inside another value is never judged at the element (wb-vgri, landing 672 F5) - the flow reading judges the flows the closed claim lists (an argument, an annotated initializer, a return under a written type, and the rest) by the holder's type there, an array's, a tuple's or a library generic's whose type argument the checker infers from the held value, never by the held element - so an object literal not written where it flows (refused where it flows itself: CONTEXT-LESS-LITERALS) and a callback that hides the projection (refused where it flows itself: CALLBACK-RECEIVERS, and the annotated initializer's twin below) read quiet held as an array's element at an annotated initializer, an argument and a return, as a tuple's element (a callback also in a tuple argument), as the argument of Array.of or Promise.resolve, as a Map's entry and as a Set's element, while an object literal's property is a flow the reading reads (the same literal held there is refused, context-less-literal) and a library generic given its type argument explicitly judges the argument against it (Promise.resolve<Sink> of the literal is refused, context-less-literal, and of the callback, argument); a class instance so held is R-STRUCTURAL-STAND-IN's held value",
      cases: [
        reachForms(
          "src/ui/census-forms-held-literal-array.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const sinks: Sink[] = [impl];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-argument.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}const use = (sinks: readonly Sink[]): number => sinks.length;\nexport const used = use([impl]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-return.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const make = (): Sink[] => [impl];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-tuple.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const pair: [Sink, number] = [impl, 0];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-array-of.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const sinks: readonly Sink[] = Array.of(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-promise.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const sink: Promise<Sink> = Promise.resolve(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-map.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const byName: Map<string, Sink> = new Map([["a", impl]]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-set.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const sinks: Set<Sink> = new Set([impl]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-property-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const deps: { readonly sink: Sink } = { sink: impl };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: sink: impl"]),
        ),
        reachForms(
          "src/ui/census-forms-held-literal-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}export const sink: Promise<Sink> = Promise.resolve<Sink>(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: Promise.resolve<Sink>(impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-array.ts",
          `${OBS_UI}${HIDE_UI}export const takers: (${TAKER})[] = [hide];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-argument.ts",
          `${OBS_UI}${HIDE_UI}const use = (takers: readonly (${TAKER})[]): number => takers.length;\nexport const used = use([hide]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-return.ts",
          `${OBS_UI}${HIDE_UI}export const make = (): (${TAKER})[] => [hide];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-tuple.ts",
          `${OBS_UI}${HIDE_UI}export const pair: [${TAKER}, number] = [hide, 0];\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-tuple-argument.ts",
          `${OBS_UI}${HIDE_UI}const use = (pair: readonly [${TAKER}, number]): number => pair[1];\nexport const used = use([hide, 0]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-array-of.ts",
          `${OBS_UI}${HIDE_UI}export const takers: readonly (${TAKER})[] = Array.of(hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-promise.ts",
          `${OBS_UI}${HIDE_UI}export const taker: Promise<${TAKER}> = Promise.resolve(hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-map.ts",
          `${OBS_UI}${HIDE_UI}export const byName: Map<string, ${TAKER}> = new Map([["a", hide]]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-set.ts",
          `${OBS_UI}${HIDE_UI}export const takers: Set<${TAKER}> = new Set([hide]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-direct-twin.ts",
          `${OBS_UI}${HIDE_UI}export const taker: ${TAKER} = hide;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["initializer: taker: (projection: ObservationProjection) => void = hide"]),
        ),
        reachForms(
          "src/ui/census-forms-held-callback-explicit-twin.ts",
          `${OBS_UI}${HIDE_UI}export const taker: Promise<${TAKER}> = Promise.resolve<${TAKER}>(hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: Promise.resolve<(projection: ObservationProjection) => void>(hide)"]),
        ),
      ],
    },
    {
      id: "R-THIS-BINDING",
      label:
        "residual: a stand-in bound as a function's this (wb-vgri, landing 672 F7; respin 1: refusal #1 U1 and F1; respin 2: refusal #2 U1 and F3, the enumerate-the-resolvable cut ruling R-B165 binds; final cut #4: refusal #3 U1, the fail-closed core ruling R-B207 binds; wb-97ah: refusal #3's CURE route (b), the reader coverage R-B207 deferred to that bead - each claim of this row is narrowed to the pages it pins) - a value that neither exposes the projection nor holds a path to it (a class instance or a class's static side whose class does not declare the type, an object literal, a callback), bound where a function's or a method's this parameter is typed by a type a member of which hands the projection - is judged, as the this argument of a function's own call, apply or bind or of Reflect.apply, at its effective position among the call's arguments (wb-97ah: each spread written before it of a value the checker types as a tuple counts that tuple's elements, and each argument written before it that is no spread counts one), against the type the checker resolves for that library parameter; the this parameter is read only where that type is it. A function's own call and apply (as in use.call), bind resolved to its second overload and Reflect.apply resolved to its first type that parameter by a type parameter inferred from the value (the checker took the value's own type at every value measured), so with no type argument written the value flows into a type it is and reads quiet whatever its member does - pinned: a hiding instance bound by call, by apply, by a method's call, by bind given an argument (a function's and a method's, called, and a function's held at an annotated initializer) and by Reflect.apply, a keeping instance bound by call and by bind given an argument, a class's static side, an object literal not written where it flows and a hiding callback each bound by call, and a call given the instance's own class as its type argument; Reflect.apply resolved to its second overload (an argument list the first refuses) types it any, which hands nothing, and reads quiet too. A member call binds its receiver as this, which no flow reads: a function held as a class instance's field or as an object literal's property and called through it, and a method whose this parameter its own class does not declare, read quiet. Where that parameter's type is the this parameter's - bind resolved to its first overload, whose this argument the checker types as the function's this parameter, or a type argument written as the this parameter's type - the value is read there as at any flow into that type (final cut #4 read it there only with no spread written before it; wb-97ah: at its effective position, below) - pinned with no spread written before it: bind given its this argument alone (a function's, a method's and a class's static side; a keeping instance, final cut #4) and a call (a function's and, final cut #4, a method's), an apply (final cut #4), a bind given an argument and a Reflect.apply given the this parameter's type as their type argument refuse the instance, the keeping instance or the static side (structural-stand-in), and bind given its this argument alone refuses an object literal not written where it flows (context-less-literal) and a hiding callback (argument). Which of bind's overloads resolves is the checker's (respin 2; TypeScript's lib.es5.d.ts declares bind<T>(this: T, thisArg: ThisParameterType<T>) first and bind<T, A extends any[], B extends any[], R>(this: (this: T, ...args: [...A, ...B]) => R, thisArg: T, ...args: A) second), measured page by page with its this argument written first: the first where it stands alone or is followed only by spreads of a value the checker types as the empty tuple itself, and the second where an argument or a spread of any other type measured follows it - pinned refused (the first overload): a spread of the literal [] (refusal #2's twin), of a value typed [] (bound to a function, through an optional call, followed by a spread of the literal [], held at an annotated initializer and bound to a method; a keeping instance; a class's static side) and of a value typed readonly [], of [] as [], [] as readonly [] and [] as const, and of a rest parameter typed [] refuse the instance, the keeping instance or the static side (structural-stand-in), and a spread of a value typed [] refuses an object literal not written where it flows (context-less-literal) and a hiding callback (argument); pinned quiet (the second overload with no type argument written, a hole: the function's this parameter is never read there, so each value pinned here, which the first overload refuses at the twins above, reads quiet): an argument (above), a spread of a value typed [number], and a spread of a never[] value (a hiding instance bound to a function, through an element access, through an optional call, through a variable typed by the function's type, to a generic function whose this parameter is constrained to the type, held at an annotated initializer and bound to a method; a keeping instance; a class's static side, bound to a function and to a method; an object literal not written where it flows; a hiding callback), of two never[] values, of a never[] value followed by [] as [], of a readonly never[] value, of a never[] rest parameter, of [] as never[], of Array<never>(), of an empty number[] value, of an unknown[] value, of a value typed any, of a value typed never, of the arguments object, and of a rest parameter whose type is a type parameter constrained to [] (a hiding instance and a class's static side). Into any (respin 2, refusal #2 F3; narrowed at final cut #4; restated at wb-py8n, landing 770 F6): the untyped Function interface's bind, call and apply, read off Function.prototype itself, declare their this argument and their arguments any (thisArg: any, argArray: any[]), and handed the function and the value with no type argument written each value pinned here reads quiet - pinned typed any (where that member is itself applied or called, the call the checker instantiates types the value any, which hands nothing): Function.prototype.bind by apply (the instance in its argument array), Function.prototype.call bound to the function by bind and called with the instance, and Reflect.apply given Function.prototype.bind, the function and the instance in its argument array; pinned typed by its own type (where that member is handed the function and the value by call, that call infers its rest parameter from the value, so the value flows into a type it is, as at a function's own call): Function.prototype.bind handed them by call (a hiding instance, called and not, followed by an argument, and bound to a method; a keeping instance; a class's static side; an object literal not written where it flows; a hiding callback), and Function.prototype.call and Function.prototype.apply each handed them by call. Final cut #4's hole is closed (wb-97ah: refusal #3 U1's members and the further members the final cut #4 seat and the landing-770 gate measured quiet): where spreads are written before the value, or type arguments are written where Function.prototype's bind, call and apply are handed it by call, the checker types the value by the function's this parameter's type, and the value, read at its effective position and - where those members are handed it by call - against the leading element of the rest parameter that call is instantiated with (a tuple's own leading element, also before a variable tail; an array's element type), is read there as at any flow into that type - pinned refused: bind resolved to its first overload given two spreads of the literal [] before its this argument (a hiding instance bound to a function and to a method, a keeping instance and a class's static side, structural-stand-in; an object literal not written where it flows, context-less-literal; a hiding callback, argument), given three (a hiding instance), given two spreads of a value typed [] (a hiding and a keeping instance) and given two of a value typed readonly [], of [] as [] and of [] as const (a hiding instance); a call given the this parameter's type as its type argument after one spread of the literal [] (a hiding instance bound to a function and to a method, a keeping instance and a class's static side, structural-stand-in; an object literal not written where it flows, context-less-literal; a hiding callback, argument), after two (a function's and a method's) and after three (a function's), an apply and a bind given an argument so typed after one spread of the literal [] and after two, and a Reflect.apply so typed after one spread of [] as [] before the function and after two (a hiding instance, structural-stand-in); Function.prototype.bind, Function.prototype.call and Function.prototype.apply each handed the function and a hiding instance by call with the function's type, a tuple of the this parameter's type (for apply, followed by the empty tuple) and unknown written as type arguments (structural-stand-in), Function.prototype.bind so handed an object literal not written where it flows (context-less-literal) and a hiding callback (argument), Function.prototype.call so handed a class's static side and Function.prototype.apply so handed a keeping instance (structural-stand-in), Function.prototype.call so handed a hiding instance after one spread of a one-element tuple holding the function, Function.prototype.bind so handed one after a spread of the literal [] written between the function and the value (refused before wb-97ah too), and Function.prototype.call handed the function and a hiding instance by call with an array of the this parameter's type, or a tuple of it followed by a variable tail of the instance's class, written as its rest type argument (structural-stand-in); pinned quiet beside them: Function.prototype.call handed the function and a hiding instance by call with a tuple of the instance's own class followed by a variable tail of the this parameter's type written as its rest type argument (the leading element is read there, not the tail), and a call given no type argument after one spread of the literal [] (its type parameter inferred from the value, the value's own type) - and the twins that refused before wb-97ah still refuse: the no-spread twins above, and bind resolved to its first overload given one spread of the literal [] before a hiding instance (bound to a function and to a method) or one spread of [] as [] (bound to a function), structural-stand-in. Any other way of binding a value as this is outside this claim",
      cases: [
        reachForms(
          "src/ui/census-forms-this-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-apply.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.apply(new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-method-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.call(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = use.call(new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.call<Sink, [], number>(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = use2.bind(new Holder(), 1)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-argument.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TOOL2_UI}export const used = new Tool().count2.bind(new Holder(), 1)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE2_UI}export const used = use2.bind(new Keeper(), 1)();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument-held.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const bound: () => number = use2.bind(new Holder(), 1);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-apply.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Reflect.apply(use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-apply-untyped.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = Reflect.apply(use2, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-own-class.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call<Holder, [], number>(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = use.call(StaticHolder);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = use.call(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = useTaker.call(hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-receiver-field.ts",
          `${OBS_UI}${SINK_UI}${USE_THIS_UI}class Runner {\n  forget = (projection: unknown): void => void projection;\n  run = use;\n}\nexport const used = new Runner().run();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-receiver-literal.ts",
          `${OBS_UI}${SINK_UI}${HIDE_UI}${USE_THIS_UI}const runner = { forget: hide, run: use };\nexport const used = runner.run();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-receiver-method.ts",
          `${OBS_UI}${SINK_UI}class Runner {\n  forget = (projection: unknown): void => void projection;\n  run(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Runner().run();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.bind(new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.bind(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...[])();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...[])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-static-twin.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = use.bind(StaticHolder)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(StaticHolder)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = use2.bind<Sink, [number], [], number>(new Holder(), 1)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use2.bind<Sink, [number], [], number>(new Holder(), 1)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Reflect.apply<Sink, [], number>(use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Reflect.apply<Sink, [], number>(use, new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-literal-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = use.bind(impl)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: use.bind(impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-callback-twin.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = useTaker.bind(hide)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: useTaker.bind(hide)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-element.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use["bind"](new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-optional.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind?.(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-typed-variable.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nconst f: (this: Sink) => number = use;\nexport const used = f.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-generic-this.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function useG<T extends Sink>(this: T): number {\n  void this;\n  return 0;\n}\nconst none: never[] = [];\nexport const used = useG.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-held.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const bound: () => number = use.bind(new Holder(), ...none);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-never-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nconst none: never[] = [];\nexport const used = new Tool().count.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(new Keeper(), ...none)();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(StaticHolder, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-never-spread-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nconst none: never[] = [];\nexport const used = new Tool().count.bind(StaticHolder, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(impl, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-spread-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}const none: never[] = [];\nexport const used = useTaker.bind(hide, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-never-spreads.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(new Holder(), ...none, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-then-tuple-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: never[] = [];\nexport const used = use.bind(new Holder(), ...none, ...([] as []))();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-readonly-never-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: readonly never[] = [];\nexport const used = use.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-rest.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const wrap = (...rest: never[]): number => use.bind(new Holder(), ...rest)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-cast-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...([] as never[]))();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-array-call-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...Array<never>())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-number-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const nums: number[] = [];\nexport const used = use.bind(new Holder(), ...nums)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-unknown-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const nothing: unknown[] = [];\nexport const used = use.bind(new Holder(), ...nothing)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-any-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const nothing: any = [];\nexport const used = use.bind(new Holder(), ...nothing)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-never-typed-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const nothing = [] as never;\nexport const used = use.bind(new Holder(), ...nothing)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-arguments-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export function wrap(): number {\n  return use.bind(new Holder(), ...arguments)();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-generic-rest.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const wrap = <T extends []>(rest: T): number => use.bind(new Holder(), ...rest)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-generic-rest-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const wrap = <T extends []>(rest: T): number => use.bind(StaticHolder, ...rest)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-argument-spread.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}const args: [number] = [1];\nexport const used = use2.bind(new Holder(), ...args)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-optional-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind?.(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind?.(new Holder(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-tuple-spreads-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(new Holder(), ...none, ...[])();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...none, ...[])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-held-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const bound: () => number = use.bind(new Holder(), ...none);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-tuple-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nconst none: [] = [];\nexport const used = new Tool().count.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.bind(new Holder(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-keeps-twin.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(new Keeper(), ...none)();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: use.bind(new Keeper(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-static-twin.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(StaticHolder, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(StaticHolder, ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-readonly-tuple-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: readonly [] = [];\nexport const used = use.bind(new Holder(), ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-cast-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...([] as []))();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...([] as []))"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-readonly-tuple-cast-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...([] as readonly []))();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...([] as readonly []))"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-const-spread-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(new Holder(), ...([] as const))();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...([] as const))"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-rest-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const wrap = (...rest: []): number => use.bind(new Holder(), ...rest)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(new Holder(), ...rest)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-literal-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(impl, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: use.bind(impl, ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-spread-callback-twin.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}const none: [] = [];\nexport const used = useTaker.bind(hide, ...none)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: useTaker.bind(hide, ...none)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-called.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call(use, new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-argument.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = Function.prototype.bind.call(use2, new Holder(), 1);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = Function.prototype.bind.call(new Tool().count, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call(use, new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call(use, StaticHolder);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call(use, impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = Function.prototype.bind.call(useTaker, hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-apply.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.apply(use, [new Holder()]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-apply-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.apply.call(use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-bind.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.bind(use)(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-function-bind.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Reflect.apply(Function.prototype.bind, use, [new Holder()]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...[], ...[], new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.bind(...[], ...[], new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.bind(...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-spreads-before-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = use.bind(...[], ...[], new Keeper())();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: use.bind(...[], ...[], new Keeper())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-spreads-before-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...[], ...[], StaticHolder)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...[], ...[], StaticHolder)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-spreads-before-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = use.bind(...[], ...[], impl)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: use.bind(...[], ...[], impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-spreads-before-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = useTaker.bind(...[], ...[], hide)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: useTaker.bind(...[], ...[], hide)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-tuple-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(...none, ...none, new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...none, ...none, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.call<Sink, [], number>(...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-call-explicit-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.call<Sink, [], number>(...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.call<Sink, [], number>(...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-apply-explicit-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.apply<Sink, [], number>(...[], new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.apply<Sink, [], number>(...[], new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-explicit-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Reflect.apply<Sink, [], number>(...([] as []), use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Reflect.apply<Sink, [], number>(...([] as []), use, new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument-explicit-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = use2.bind<Sink, [number], [], number>(...[], new Holder(), 1)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use2.bind<Sink, [number], [], number>(...[], new Holder(), 1)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-explicit.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call<typeof use, [Sink], unknown>(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.bind.call<typeof use, [Sink], unknown>(use, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-explicit.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, [Sink], unknown>(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.call.call<typeof use, [Sink], unknown>(use, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-apply-call-explicit.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.apply.call<typeof use, [Sink, []], unknown>(use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.apply.call<typeof use, [Sink, []], unknown>(use, new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-spread-before-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...[], new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-bind-spread-before-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.bind(...[], new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.bind(...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-tuple-cast-spread-before-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...([] as []), new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...([] as []), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-keeps-twin.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = use.bind(new Keeper())();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: use.bind(new Keeper())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-call-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.call<Sink, [], number>(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.call<Sink, [], number>(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-apply-explicit-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.apply<Sink, [], number>(new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.apply<Sink, [], number>(new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-three-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...[], ...[], ...[], new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...[], ...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-cast-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...([] as []), ...([] as []), new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...([] as []), ...([] as []), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-readonly-tuple-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}const none: readonly [] = [];\nexport const used = use.bind(...none, ...none, new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...none, ...none, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-const-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.bind(...([] as const), ...([] as const), new Holder())();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.bind(...([] as const), ...([] as const), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-two-tuple-spreads-before-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}const none: [] = [];\nexport const used = use.bind(...none, ...none, new Keeper())();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: use.bind(...none, ...none, new Keeper())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], ...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.call<Sink, [], number>(...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-three-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], ...[], ...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.call<Sink, [], number>(...[], ...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-method-call-explicit-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Tool {\n  count(this: Sink): number {\n    void this;\n    return 0;\n  }\n}\nexport const used = new Tool().count.call<Sink, [], number>(...[], ...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Tool().count.call<Sink, [], number>(...[], ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-spread-before-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: use.call<Sink, [], number>(...[], new Keeper())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-spread-before-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], StaticHolder);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.call<Sink, [], number>(...[], StaticHolder)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-spread-before-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = use.call<Sink, [], number>(...[], impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: use.call<Sink, [], number>(...[], impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-call-explicit-spread-before-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = useTaker.call<${TAKER}, [], number>(...[], hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: useTaker.call<(projection: ObservationProjection) => void, [], number>(...[], hide)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-apply-explicit-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.apply<Sink, [], number>(...[], ...[], new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use.apply<Sink, [], number>(...[], ...[], new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-bind-argument-explicit-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE2_UI}export const used = use2.bind<Sink, [number], [], number>(...[], ...[], new Holder(), 1)();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: use2.bind<Sink, [number], [], number>(...[], ...[], new Holder(), 1)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-reflect-explicit-two-spreads-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Reflect.apply<Sink, [], number>(...([] as []), ...([] as []), use, new Holder(), []);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Reflect.apply<Sink, [], number>(...([] as []), ...([] as []), use, new Holder(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-explicit-literal.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call<typeof use, [Sink], unknown>(use, impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: Function.prototype.bind.call<typeof use, [Sink], unknown>(use, impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-explicit-callback.ts",
          `${OBS_UI}${HIDE_UI}${USE_TAKER_UI}export const used = Function.prototype.bind.call<typeof useTaker, [${TAKER}], unknown>(useTaker, hide);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: Function.prototype.bind.call<typeof useTaker, [(projection: ObservationProjection) => void], unknown>(useTaker, hide)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-explicit-static.ts",
          `${OBS_UI}${SINK_UI}${STATIC_HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, [Sink], unknown>(use, StaticHolder);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.call.call<typeof use, [Sink], unknown>(use, StaticHolder)"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-apply-call-explicit-keeps.ts",
          `${OBS_UI}${SINK_UI}${KEEPER_UI}${USE_THIS_UI}export const used = Function.prototype.apply.call<typeof use, [Sink, []], unknown>(use, new Keeper(), []);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: Function.prototype.apply.call<typeof use, [Sink, []], unknown>(use, new Keeper(), [])"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-explicit-tuple-spread-before.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, [Sink], unknown>(...([use] as [typeof use]), new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.call.call<typeof use, [Sink], unknown>(...([use] as [typeof use]), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-bind-call-explicit-spread-between.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.bind.call<typeof use, [Sink], unknown>(use, ...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.bind.call<typeof use, [Sink], unknown>(use, ...[], new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-explicit-array-rest.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, Sink[], unknown>(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.call.call<typeof use, Sink[], unknown>(use, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-explicit-variable-tail.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, [Sink, ...Holder[]], unknown>(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Function.prototype.call.call<typeof use, [Sink, ...Holder[]], unknown>(use, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-this-function-call-call-own-class-variable-tail.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = Function.prototype.call.call<typeof use, [Holder, ...Sink[]], unknown>(use, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-this-call-spread-before-inferred.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${USE_THIS_UI}export const used = use.call(...[], new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
      ],
    },
    {
      id: "ASYNC-RETURNS",
      label:
        "read (wb-021.7): a value an async function that is no generator returns (an arrow's body, a return statement of a function declaration, a function expression, a method or an object literal's method) under a written type (an alias of one included) is judged against that promise's awaited type, as its awaited value (a promise's, a then chain's or a thenable's settled value, each part of a union awaited), exactly as the same return of a function that is not async is judged against its written type: a class instance whose class does not declare the type fails closed (structural-stand-in), a hiding callback (one that exposes the projection through its own return included, its sync twin's reading: wb-021.7 cut #2, refusal #1 U4) or an overload set whose implementation hides the projection, awaited or not, and an exposing value returned into a promise of unknown are refused (return), an object literal written there is read by its own members - a property assignment through the checker's contextual type of its value, and a method, a getter, a setter and a shorthand property each against the member of its name in each part of the literal's contextual type, the awaited type united with a PromiseLike of it (a union's own members are only those every part declares: wb-021.7 cut #2, refusal #1 U1) - exactly as its sync twin's members are (property), and a value of an unconstrained type parameter is refused as its sync twin is (return), while a keeping instance, awaited or not, a literal whose own members keep the projection, a value of a type parameter constrained to the type, an exposing value it keeps, an undefined and a return under a type that hands nothing read quiet; a generator's return or yield, an async generator's included, is no async function's return here: GENERATOR-YIELDS reads it, never awaited (failing closed under a written type that holds a handing type), so a thenable an async generator returns under a written type that hands nothing is read as it is (its resolver's call refused as a call through a signature with no body: argument)",
      cases: [
        reachForms(
          "src/ui/census-forms-async-arrow.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async (): Promise<Sink> => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: async (): Promise<Sink> => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-async-function.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export async function make(): Promise<Sink> {\n  return new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-async-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Factory {\n  async make(): Promise<Sink> {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-async-function-expression.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async function (): Promise<Sink> {\n  return new Holder();\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-async-callback.ts",
          `${OBS_UI}${HIDE_UI}export const make = async (): Promise<(projection: ObservationProjection) => void> => hide;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: async (): Promise<(projection: ObservationProjection) => void> => hide"]),
        ),
        reachForms(
          "src/ui/census-forms-async-overload.ts",
          `${OBS_UI}${OVERLOADED_HIDE}export const make = async (): Promise<(projection: ObservationProjection) => void> => hideOverloaded;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: async (): Promise<(projection: ObservationProjection) => void> => hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal.ts",
          `${OBS_UI}${SINK_UI}export const make = async (): Promise<Sink> => ({ forget: (projection: unknown): void => void projection });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: (projection: unknown): void => void projection"]),
        ),
        reachForms(
          "src/ui/census-forms-async-awaited-block.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async (ready: boolean): Promise<Sink | undefined> => {\n  if (!ready) return undefined;\n  return await Promise.resolve(new Holder());\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return await Promise.resolve(new Holder());"]),
        ),
        reachForms(
          "src/ui/census-forms-async-keeper.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make = async (): Promise<Sink> => new Keeper();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = (): Sink => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (): Sink => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-callback.ts",
          `${OBS_UI}${HIDE_UI}export const make = (): ((projection: ObservationProjection) => void) => hide;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: (): ((projection: ObservationProjection) => void) => hide"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-overload.ts",
          `${OBS_UI}${OVERLOADED_HIDE}export const make = (): ((projection: ObservationProjection) => void) => hideOverloaded;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: (): ((projection: ObservationProjection) => void) => hideOverloaded"]),
        ),
        reachForms(
          "src/ui/census-forms-async-quiet.ts",
          `${OBS_UI}export const count = async (projection: ObservationProjection): Promise<number> => projection.stats().nodes;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-exposing-unknown.ts",
          `${OBS_UI}export const make = async (projection: ObservationProjection): Promise<unknown> => projection;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: async (projection: ObservationProjection): Promise<unknown> => projection"]),
        ),
        reachForms(
          "src/ui/census-forms-async-promise-value.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async (): Promise<Sink> => Promise.resolve(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: async (): Promise<Sink> => Promise.resolve(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-async-promise-keeper.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make = async (): Promise<Sink> => Promise.resolve(new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-awaited-callback.ts",
          `${OBS_UI}${HIDE_UI}export const make = async (): Promise<(projection: ObservationProjection) => void> => {\n  return await Promise.resolve(hide);\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["return: return await Promise.resolve(hide);"]),
        ),
        reachForms(
          "src/ui/census-forms-async-promise-exposing-unknown.ts",
          `${OBS_UI}export const make = async (projection: ObservationProjection): Promise<unknown> => Promise.resolve(projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: Promise.resolve(projection)", "return: async (projection: ObservationProjection): Promise<unknown> => Promise.resolve(projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-async-keeps-exposing.ts",
          `${OBS_UI}export const make = async (projection: ObservationProjection): Promise<ObservationProjection> => projection;\n`,
          reached(true, [], [], ["make", "projection"]),
          formsRead(["annotation", "initializer", "lib-generic", "return"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Promise<Sink>;\n}\nexport const factory: Factory = {\n  async make(): Promise<Sink> {\n    return new Holder();\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-async-generic-keeps.ts",
          `${OBS_UI}${SINK_UI}export async function make<T extends Sink>(build: () => T): Promise<T> {\n  return build();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-generic-hides.ts",
          `${OBS_UI}export async function hold<T>(projection: ObservationProjection & T): Promise<T> {\n  return projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "type-part"], ["return: return projection;"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-generic.ts",
          `${OBS_UI}export function hold<T>(projection: ObservationProjection & T): T {\n  return projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "type-part"], ["return: return projection;"]),
        ),
        reachForms(
          "src/ui/census-forms-async-union-promise.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make = async (ok: boolean): Promise<Sink> => (ok ? new Keeper() : Promise.resolve(new Holder()));\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["structural-stand-in: async (ok: boolean): Promise<Sink> => (ok ? new Keeper() : Promise.resolve(new Holder()))"]),
        ),
        reachForms(
          "src/ui/census-forms-async-thenable.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async (): Promise<Sink> => ({ then: (resolve: (value: Holder) => void): void => resolve(new Holder()) });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: async (): Promise<Sink> => ({ then: (resolve: (value: Holder) => void): void => resolve(new Holder()) })"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-callback.ts",
          `${OBS_UI}${HIDE_UI}export const make = async (): Promise<{ take: (projection: ObservationProjection) => void }> => ({ take: hide });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: take: hide"]),
        ),
        reachForms(
          "src/ui/census-forms-async-alias.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}type Later = Promise<Sink>;\nexport const make = async (): Later => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: async (): Later => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-async-then-chain.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = async (): Promise<Sink> => Promise.resolve(1).then(() => new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: async (): Promise<Sink> => Promise.resolve(1).then(() => new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-async-generator-boundary.ts",
          `${OBS_UI}export async function* hold(projection: ObservationProjection): AsyncGenerator<number, unknown> {\n  yield 1;\n  return { then: (resolve: (value: ObservationProjection) => void): void => resolve(projection) };\n}\n`,
          reached(true, [], [], ["projection", "value"]),
          formsRead(["annotation"], ["argument: resolve(projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-method.ts",
          `${OBS_UI}${SINK_UI}export const make = async (): Promise<Sink> => ({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-function.ts",
          `${OBS_UI}${SINK_UI}export async function make(): Promise<Sink> {\n  return {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  };\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-class-method.ts",
          `${OBS_UI}${SINK_UI}export class Factory {\n  async make(): Promise<Sink> {\n    return {\n      forget(projection: unknown): void {\n        void projection;\n      },\n    };\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-alias.ts",
          `${OBS_UI}${SINK_UI}type Later = Promise<Sink>;\nexport const make = async (): Later => ({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-argument.ts",
          `${OBS_UI}${SINK_UI}const build = (factory: () => Promise<Sink>): Promise<Sink> => factory();\nexport const built = build(async () => ({\n  forget(projection: unknown): void {\n    void projection;\n  },\n}));\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: build(async () => ({ forget(projection: unknown): void { void projection; }, }))", "property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-undefined-branch.ts",
          `${OBS_UI}${SINK_UI}export const make = async (ready: boolean): Promise<Sink | undefined> => {\n  if (!ready) return undefined;\n  return {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  };\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-getter.ts",
          `${OBS_UI}${SINK_UI}export const make = async (): Promise<Sink> => ({\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return (projection: unknown): void => void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-setter.ts",
          `${OBS_UI}${SLOT_UI}export const make = async (): Promise<Slot> => ({\n  get projection(): ObservationProjection {\n    return held as ObservationProjection;\n  },\n  set projection(value: unknown) {\n    held = value;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "return"], ["property: set projection(value: unknown) { held = value; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nexport const make = async (): Promise<Sink> => ({ forget });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-async-literal-member-keeps.ts",
          `${OBS_UI}${SINK_UI}export const make = async (): Promise<Sink> => ({\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  },\n});\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-literal-method.ts",
          `${OBS_UI}${SINK_UI}export const make = (): Sink => ({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-literal-getter.ts",
          `${OBS_UI}${SINK_UI}export const make = (): Sink => ({\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: get forget(): (projection: unknown) => void { return (projection: unknown): void => void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-literal-setter.ts",
          `${OBS_UI}${SLOT_UI}export const make = (): Slot => ({\n  get projection(): ObservationProjection {\n    return held as ObservationProjection;\n  },\n  set projection(value: unknown) {\n    held = value;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "return"], ["property: set projection(value: unknown) { held = value; }"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-literal-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nexport const make = (): Sink => ({ forget });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget"]),
        ),
        reachForms(
          "src/ui/census-forms-async-exposing-callback.ts",
          `${OBS_UI}const take = (projection: unknown): ObservationProjection => projection as ObservationProjection;\nexport const make = async (): Promise<(projection: ObservationProjection) => ObservationProjection> => Promise.resolve(take);\n`,
          reached(true, [], [], ["make", "projection", "take"]),
          formsRead(["annotation", "initializer", "lib-generic", "return"], ["argument: Promise.resolve(take)", "return: async (): Promise<(projection: ObservationProjection) => ObservationProjection> => Promise.resolve(take)"]),
        ),
        reachForms(
          "src/ui/census-forms-async-sync-twin-exposing-callback.ts",
          `${OBS_UI}const take = (projection: unknown): ObservationProjection => projection as ObservationProjection;\nexport const make = (): ((projection: ObservationProjection) => ObservationProjection) => take;\n`,
          reached(true, [], [], ["make", "projection", "take"]),
          formsRead(["annotation", "initializer", "return", "type-part"], ["return: (): ((projection: ObservationProjection) => ObservationProjection) => take"]),
        ),
      ],
    },
    {
      id: "GENERATOR-YIELDS",
      label:
        "a value a generator yields, delegates or returns (a function declaration's, an async generator's, a method's) under a written type that holds a type handing the projection is never read: it converts into the yielded or the returned type while the flow reading reads the written generator, so it fails closed with a generator-yield row at each yield and return whatever the value (cut #8, ruling R-B67; refusal #7 F9); a generator whose written type hands nothing reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-generator-yield.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export function* make(): Generator<Sink> {\n  yield new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["generator-yield: yield new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-generator-return.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export function* make(): Generator<number, Sink> {\n  yield 1;\n  return new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["generator-yield: return new Holder();", "generator-yield: yield 1"]),
        ),
        reachForms(
          "src/ui/census-forms-generator-delegate.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function* inner(): Generator<Holder> {\n  yield new Holder();\n}\nexport function* make(): Generator<Sink> {\n  yield* inner();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["generator-yield: yield* inner()"]),
        ),
        reachForms(
          "src/ui/census-forms-generator-async.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export async function* make(): AsyncGenerator<Sink> {\n  yield new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["generator-yield: yield new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-generator-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Source {\n  *each(): Generator<Sink> {\n    yield new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["generator-yield: yield new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-generator-quiet.ts",
          `${OBS_UI}export function* sizes(projection: ObservationProjection): Generator<number> {\n  yield projection.stats().nodes;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "INHERITED-IMPLEMENTATIONS",
      label:
        "a class whose implements clause names a type with a member that hands the projection, where the member that runs is one the class inherits rather than declares - an ancestor's method, field, getter or constructor parameter property, through one extends clause or a chain of them, in a class declaration or a class expression, or one a declare field of the class only re-types - is never read (the stand-in reading reads the class's own elements only): it fails closed at the class with an inherited-implementation row whether the inherited member hides the projection or keeps it, and whether or not a value of the class flows into the type (cut #8, ruling R-B67; refusal #7 U2(a)), while the hiding member declared in the implementing class is read (heritage), the keeping one reads quiet, a subclass with no implements clause of its own of a class that declares the type reads quiet, and an implemented type whose members hand no projection reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-inherited-method.ts",
          `${OBS_UI}${SINK_UI}${MID_UI}export class Impl extends Mid implements Sink {}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-field.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Impl extends Holder implements Sink {}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Holder implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-parameter-property.ts",
          `${OBS_UI}${SINK_UI}class Mid {\n  constructor(public forget: (projection: unknown) => void) {}\n}\nexport class Impl extends Mid implements Sink {}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-flows.ts",
          `${OBS_UI}${SINK_UI}${MID_UI}export class Impl extends Mid implements Sink {}\nexport const sink: Sink = new Impl();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-class-target.ts",
          `${OBS_UI}${BASE_TAKE}class Mid {\n  take(projection: unknown): number {\n    void projection;\n    return 0;\n  }\n}\nexport class Impl extends Mid implements Base {}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["inherited-implementation: export class Impl extends Mid implements Base {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-keeper.ts",
          `${OBS_UI}${SINK_UI}class Mid {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport class Impl extends Mid implements Sink {}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["inherited-implementation: export class Impl extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-chain.ts",
          `${OBS_UI}${SINK_UI}${MID_UI}class Middle extends Mid {}\nexport class Impl extends Middle implements Sink {}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Middle implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-getter.ts",
          `${OBS_UI}${SINK_UI}class Mid {\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  }\n}\nexport class Impl extends Mid implements Sink {}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-class-expression.ts",
          `${OBS_UI}${SINK_UI}${MID_UI}export const Impl = class extends Mid implements Sink {};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: class extends Mid implements Sink {}"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-declare-field.ts",
          `${OBS_UI}${SINK_UI}${MID_UI}export class Impl extends Mid implements Sink {\n  declare forget: (projection: ObservationProjection) => void;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["inherited-implementation: export class Impl extends Mid implements Sink { declare forget: (projection: ObservationProjection) => void; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-declared-twin.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget(projection: unknown): void {\n    void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["heritage: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inherited-declared-keeper.ts",
          `${OBS_UI}${SINK_UI}export class Impl implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-inherited-subclass-of-declarer.ts",
          `${OBS_UI}${SINK_UI}export class Mid implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport class Impl extends Mid {}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-inherited-no-handing.ts",
          `${OBS_UI}interface Labelled {\n  label(text: string): void;\n}\nclass Mid {\n  label(text: unknown): void {\n    void text;\n  }\n}\nexport class Impl extends Mid implements Labelled {\n  read(projection: ObservationProjection): number {\n    return projection.stats().nodes;\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "CONTEXT-LESS-LITERALS",
      label:
        "an object literal not written where it flows - created elsewhere (a variable's initializer, a function's inferred return, a property of another literal) and flowing later into a type with a member that hands the projection, which the literal also has (an annotated initializer, an argument, a return under its written type) - is never read (the literal reading reads a literal under the contextual type of the flow it is written at, through parentheses, a satisfies, a non-null, a conditional's branches and a ??, || or && operand): it fails closed with a context-less-literal row whether its member hides the projection or keeps it (cut #8, ruling R-B67; refusal #7 U2(b)), while the literal written at the flow is read (property), the keeping one reads quiet, through a conditional's branches included, and a late flow into a type whose members hand no projection reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-literal-late-initializer.ts",
          `${OBS_UI}${SINK_UI}const impl = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\nexport const sink: Sink = impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: sink: Sink = impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-late-argument.ts",
          `${OBS_UI}${SINK_UI}const impl = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\nconst use = (sink: Sink): Sink => sink;\nexport const wired = use(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: use(impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-late-arrow-property.ts",
          `${OBS_UI}${SINK_UI}const impl = { forget: (projection: unknown): void => void projection };\nexport const sink: Sink = impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: sink: Sink = impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-late-return.ts",
          `${OBS_UI}${SINK_UI}const impl = { forget: (projection: unknown): void => void projection };\nexport const make = (): Sink => impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: (): Sink => impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-returned.ts",
          `${OBS_UI}${SINK_UI}const make = () => ({ forget: (projection: unknown): void => void projection });\nexport const sink: Sink = make();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: sink: Sink = make()"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-held.ts",
          `${OBS_UI}${SINK_UI}const box = { impl: { forget: (projection: unknown): void => void projection } };\nexport const sink: Sink = box.impl;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: sink: Sink = box.impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-late-keeper.ts",
          `${OBS_UI}${SINK_UI}const impl = { forget: (projection: ObservationProjection): void => void projection.stats() };\nexport const sink: Sink = impl;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["context-less-literal: sink: Sink = impl"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-written-twin.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-written-arrow-twin.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink = { forget: (projection: unknown): void => void projection };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: (projection: unknown): void => void projection"]),
        ),
        reachForms(
          "src/ui/census-forms-literal-written-keeper.ts",
          `${OBS_UI}${SINK_UI}export const sink: Sink = { forget: (projection: ObservationProjection): void => void projection.stats() };\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-literal-written-branch.ts",
          `${OBS_UI}${SINK_UI}export const pick = (fast: boolean): Sink =>\n  fast ? { forget: (projection: ObservationProjection): void => void projection.stats() } : { forget: (projection: ObservationProjection): void => void projection.relationRevision() };\n`,
          reached(true, ["relationRevision", "stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-literal-late-no-handing.ts",
          `${OBS_UI}interface Labelled {\n  label(text: string): void;\n}\nconst impl = { label: (text: unknown): void => void text };\nexport const labelled: Labelled = impl;\nexport const count = (projection: ObservationProjection): number => projection.stats().nodes;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "SPREADS",
      label:
        "a spread in an object literal whose contextual type has a member that hands the projection, where the spread value supplies that member (a class instance, another literal; at an annotated initializer, an argument or a return), is never read (the literal reading reads the literal's own members only): it fails closed with a spread row whether the supplied member hides the projection or keeps it (cut #8, ruling R-B67; refusal #7 U2(c)), while the instance itself flowing into the type is a structural stand-in, and a spread that supplies only members handing no projection reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-spread-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sink: Sink = { ...new Holder() };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["spread: ...new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-literal.ts",
          `${OBS_UI}${SINK_UI}const impl = { forget: (projection: unknown): void => void projection };\nexport const sink: Sink = { ...impl };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["spread: ...impl"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-argument.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const use = (sink: Sink): Sink => sink;\nexport const wired = use({ ...new Holder() });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["spread: ...new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-returned.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make = (): Sink => ({ ...new Holder() });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["spread: ...new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-keeper.ts",
          `${OBS_UI}${SINK_UI}const impl = { forget: (projection: ObservationProjection): void => void projection.stats() };\nexport const sink: Sink = { ...impl };\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["spread: ...impl"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-direct-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sink: Sink = new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: sink: Sink = new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-spread-no-handing.ts",
          `${OBS_UI}${SINK_UI}const extra = { label: "sink" };\nexport const sink: Sink & { readonly label: string } = { ...extra, forget: (projection: ObservationProjection): void => void projection.stats() };\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "CALLBACK-RETURNS",
      label:
        "a callback flowing into a type whose call signature returns a type that holds a type handing the projection, where the callback's own return is not that type or a type declaring it (an instance of a class that does not declare it, an object literal's type, a hiding function, an async function's inferred promise; with no written return type, at an annotated initializer or an argument; a written return of a type that proves nothing - an any (wb-021.7), a void (wb-021.7 cut #2, refusal #1 F5: a value typed void may be a function's result of any type), or a generic's unconstrained type parameter: a part of what is handed back - a union part by part, a type parameter through its constraint - proves the target's type only as a value that holds no object, null, undefined or a primitive, or as an object or an intersection whose object parts are each that type or declare it (wb-021.7; an intersection with an object part that neither is that type nor declares it proves nothing, cut #2, refusal #1 U5)), hands back a value no reading reads: it fails closed with a callback-return row whether that value hides the projection or keeps it (cut #8, ruling R-B67; refusal #7 F8), while a return written under the target's type is read by its flow (structural-stand-in), and a callback returning an instance of a class that declares the type (an undefined part beside it included, a type parameter constrained to the type, an intersection with it), or flowing into a type whose return hands nothing (a number), reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-callback-return-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make: () => Sink = () => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: () => Sink = () => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-argument.ts",
          `${OBS_UI}${SINK_UI}class MethodHolder {\n  forget(projection: unknown): void {\n    void projection;\n  }\n}\nconst build = (factory: () => Sink): Sink => factory();\nexport const built = build(() => new MethodHolder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: build(() => new MethodHolder())"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-async.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make: () => Promise<Sink> = async () => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: () => Promise<Sink> = async () => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-callback.ts",
          `${OBS_UI}${HIDE_UI}export const make: () => (projection: ObservationProjection) => void = () => hide;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: () => (projection: ObservationProjection) => void = () => hide"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-literal-keeper.ts",
          `${OBS_UI}${SINK_UI}const keep = { forget: (projection: ObservationProjection): void => void projection.stats() };\nexport const make: () => Sink = () => keep;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["callback-return: make: () => Sink = () => keep"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-written-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make: () => Sink = (): Sink => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (): Sink => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-declared.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make: () => Sink = () => new Keeper();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-no-handing.ts",
          `${OBS_UI}export const reader: (projection: ObservationProjection) => number = projection => projection.stats().nodes;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-any.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const make: () => Sink = (): any => new Holder();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: () => Sink = (): any => new Holder()"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-type-parameter.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const same = <T>(value: T): T => value;\nexport const make: (holder: Holder) => Sink = same;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: (holder: Holder) => Sink = same"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-undefined-part.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make: () => Sink | undefined = (): Keeper | undefined => undefined;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-constrained.ts",
          `${OBS_UI}${SINK_UI}export const wrap = <T extends Sink>(make: () => T): (() => Sink) => make;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-intersection.ts",
          `${OBS_UI}${SINK_UI}export const wrap = <T,>(make: () => T & Sink): (() => Sink) => make;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-union-part.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\nexport const make: () => Sink = (): Keeper | { forget(projection: unknown): void } => new Keeper();\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["callback-return: make: () => Sink = (): Keeper | { forget(projection: unknown): void } => new Keeper()"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-intersection-part.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${KEEPER_METHOD_UI}declare function makeBoth(): Keeper & Holder;\nexport const make: () => Sink = makeBoth;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["callback-return: make: () => Sink = makeBoth"]),
        ),
        reachForms(
          "src/ui/census-forms-callback-return-void.ts",
          `${OBS_UI}${SINK_UI}export const make: () => Sink | void = (): void => undefined;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["callback-return: make: () => Sink | void = (): void => undefined"]),
        ),
      ],
    },
    {
      id: "STAND-IN-RETURNS",
      label:
        "a stand-in that hands back what its base member's type returns - a method's return (an async method's and an override's included), the result of a field's or a getter's call signature, or, for a property that is no callback, the field's value or the getter's result - in a type that holds a type handing the projection, where what it hands back is not that type or a type declaring it (an inferred return or value; an intersection with an object part that neither is that type nor declares it, as a field's call-signature result and as a field's value alike, wb-021.7 cut #2, refusal #1 U5; wb-021.7: a written return or an annotated field of a type that proves nothing, an any, as CALLBACK-RETURNS reads it; a constructor parameter property's value and an overload set's implementation's return alike, R-PARAMETER-PROPERTIES and R-OVERLOADS), is never read: it fails closed with a stand-in-return row, a class's and an object literal's member alike, whether that value hides the projection or keeps it (cut #8, ruling R-B67), while a return written under the base's type is read by its flow (structural-stand-in), and a written return or an annotated field of the base's type holding an instance of a class that declares it reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-stand-in-return-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Sink;\n}\nexport class Impl implements Factory {\n  make() {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: make() { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-literal-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Sink;\n}\nexport const factory: Factory = {\n  make() {\n    return new Holder();\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: make() { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-getter.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  get sink() {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: get sink() { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-field.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  readonly sink = new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: readonly sink = new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-async-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Promise<Sink>;\n}\nexport class Impl implements Factory {\n  async make() {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: async make() { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-override.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export class Base {\n  make(): Sink {\n    return { forget: (projection: ObservationProjection): void => void projection.stats() };\n  }\n}\nexport class Impl extends Base {\n  override make() {\n    return new Holder();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["stand-in-return: override make() { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-written-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Sink;\n}\nexport class Impl implements Factory {\n  make(): Sink {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: return new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-declared.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\ninterface Factory {\n  make(): Sink;\n}\nexport class Impl implements Factory {\n  make(): Sink {\n    return new Keeper();\n  }\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-annotated-field.ts",
          `${OBS_UI}${SINK_UI}class Keeper implements Sink {\n  forget(projection: ObservationProjection): void {\n    void projection.stats();\n  }\n}\ninterface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  readonly sink: Sink = new Keeper();\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-any-field.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  readonly sink: any = new Holder();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: readonly sink: any = new Holder();"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-any-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}interface Factory {\n  make(): Sink;\n}\nexport class Impl implements Factory {\n  make(): any {\n    return new Holder();\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["stand-in-return: make(): any { return new Holder(); }"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-intersection-part.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${KEEPER_METHOD_UI}declare function makeBoth(): Keeper & Holder;\ninterface Factory {\n  make(): Sink;\n}\nexport class Impl implements Factory {\n  make = makeBoth;\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["stand-in-return: make = makeBoth;"]),
        ),
        reachForms(
          "src/ui/census-forms-stand-in-return-intersection-value.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${KEEPER_METHOD_UI}declare function makeBoth(): Keeper & Holder;\ninterface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  readonly sink = makeBoth();\n}\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], ["stand-in-return: readonly sink = makeBoth();"]),
        ),
      ],
    },
    {
      id: "UNLISTED-STAND-INS",
      label:
        "the fail-closed core's pinned exclusion (cut #8, ruling R-B67): a value of a type other than a class instance's, a class's static side's or an object literal's - a mapped type such as a frozen instance's, a type literal, an interface or an intersection that does not declare the target, another instantiation of a generic - flowing into a type with a member that hands the projection, which the value also has and its own type does not declare, and an erased value (a cast through unknown, an any) flowing into such a type, are refused with an unlisted-stand-in row whether the member hides the projection or keeps it, so a stand-in whose type the readings do not list is never read as unreachable; a value of the type itself, or of an interface that extends it, reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-frozen.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sink: Sink = Object.freeze(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: sink: Sink = Object.freeze(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-type-literal.ts",
          `${OBS_UI}${SINK_UI}export const wire = (port: { forget(projection: unknown): void }): Sink => port;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: (port: { forget(projection: unknown): void }): Sink => port"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-interface.ts",
          `${OBS_UI}${SINK_UI}interface Other {\n  forget(projection: unknown): void;\n}\nexport const wire = (other: Other): Sink => other;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: (other: Other): Sink => other"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-generic.ts",
          `${OBS_UI}interface Port<T> {\n  take(projection: T): number;\n}\nexport const wire = (port: Port<unknown>): Port<ObservationProjection> => port;\n`,
          reached(true, [], [], ["wire"]),
          formsRead(["annotation", "initializer"], ["type-argument: Port<ObservationProjection>", "unlisted-stand-in: (port: Port<unknown>): Port<ObservationProjection> => port"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-intersection.ts",
          `${OBS_UI}${SINK_UI}interface Other {\n  forget(projection: unknown): void;\n}\nexport const wire = (other: Other & { readonly label: string }): Sink => other;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: (other: Other & { readonly label: string }): Sink => other"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-keeper.ts",
          `${OBS_UI}${SINK_UI}interface Other {\n  forget(projection: ObservationProjection): void;\n}\nexport const wire = (other: Other): Sink => other;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: (other: Other): Sink => other"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-cast-unknown.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const sink: Sink = new Holder() as unknown as Sink;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: new Holder() as unknown as Sink"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-any.ts",
          `${OBS_UI}${SINK_UI}declare const loose: any;\nexport const sink: Sink = loose;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["unlisted-stand-in: sink: Sink = loose"]),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-declared.ts",
          `${OBS_UI}${SINK_UI}interface Sub extends Sink {\n  readonly label: string;\n}\nexport const wire = (sub: Sub): Sink => sub;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-unlisted-stand-in-same.ts",
          `${OBS_UI}${SINK_UI}export const wire = (sink: Sink): Sink => sink;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
      ],
    },
    {
      id: "THIS-PARAMETER-ARGUMENTS",
      label:
        "an argument of a call - not itself a spread, and with no spread written before it among the call's arguments - whose callee resolves to a src declaration that declares an explicit this parameter (a declaration with a body, or the implementation that runs behind an overload set's visible signatures) is read against the declared parameter the checker binds it to: the this parameter receives no argument, and argumentTarget skips it as ownAt skips it for a stand-in (wb-021.10) - read and pinned only in the cells below (restated as cells at respin 3, refusal #3 U3 and U4: ruling R-B386), each a callee form (the callee's declaration, the type its this parameter is written with and the spelling of the call's callee expression), an argument position and a value (its kind and the spelling of its expression) with its reading, every other callee form, position and value NOT CLAIMED (a position or a value no cell names with a callee form is NOT CLAIMED for that form). Each paired page reads as its twin, the same callee declared with no this parameter, reads. Each cell's this parameter is written void, except where a cell names another type, and its callee is spelled by the name its declaration binds (a function declaration's own name, an overload set's shared name, and, for the function expression, the const's name), a class's method as a property access on a new expression of its class, its static method as a property access on the class's name and an object literal's method as a property access on the const that holds the literal, except where a cell names another spelling of its callee; and each value is spelled, except where a cell names another spelling of it: a value that exposes the projection, or that its parameter keeps, as the name of the parameter that holds it; a class instance as a new expression of its class; a callback as an arrow function written at the argument; an object literal not written where it flows as the name of the const that holds it; an object literal written at the argument as itself; and each argument beside the judged one as its page writes it (null! before the hidden value, a number literal before the second of two). Every other type of the this parameter and every other spelling of a callee or of a value (among them a call's result, a conditional, a cast, a non-null or a satisfies expression, a comma expression, an alias, a let or a var binding, a property or an element access on a receiver no cell names, parentheses no cell names, and an optional call) is NOT CLAIMED for every cell that does not name it, and each page's other text (its names and the types it writes, the judged parameter's own type included) is as the page writes it. Through a function declaration: a value that exposes the projection as the only argument, into a parameter that keeps it (argument), and as the second of two, after null!, into one that hides it, refused (argument); and, as the only argument, a class instance flowing into a type its class does not declare, refused (structural-stand-in), and one whose class declares that type, quiet; a callback whose own parameter hides what the parameter's type hands it, refused (argument); an object literal not written where it flows, refused (context-less-literal); and an object literal written at the argument, read under its contextual type, its hiding member refused (property). Such a class instance, refused (structural-stand-in): as the only argument through a function expression bound to a const, a class's method (its this parameter written as its class) and static method (written as typeof its class), an object literal's method, an overload set's implementation (behind a visible signature that declares no this parameter), a generic function's parameter (typed by a type parameter, read through its constraint), an optional parameter, an async function and a function declaration whose this parameter is written unknown; through a function declaration as the second of two, after a number literal; and through a function declaration at and past a rest parameter's position (both of two). Through a function declaration, as the only argument (respin 3): its callee spelled as its own name in parentheses, such a class instance, refused (structural-stand-in); and a class instance spelled as the name of a const its new expression initializes, refused (structural-stand-in), and one whose class declares that type, so spelled, quiet. An overload set whose visible signature declares a this parameter while its implementation declares none is read through the implementation: such a class instance as the only argument, refused (structural-stand-in). A tagged template's substitution under a tag that declares one is read the same way in the cells TAGGED-TEMPLATE-ARGUMENTS names (such a class instance as the only substitution and as the first of two); a call through a src signature with no body of its own is outside this row (DISPATCH reads it), and so are a spread argument and an argument written after one (the written-index mapping, NOT CLAIMED: bead wb-97ah)",
      cases: [
        reachForms(
          "src/ui/census-forms-thisarg-value-hidden.ts",
          `${OBS_UI}function take(this: void, kept: ObservationProjection, held: unknown): void {\n  void kept;\n  void held;\n}\nexport const run = (projection: ObservationProjection): void => take(null!, projection);\n`,
          reached(true, [], [], ["kept", "projection"]),
          formsRead(["annotation", "test"], ["argument: take(null!, projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-value-hidden-twin.ts",
          `${OBS_UI}function take(kept: ObservationProjection, held: unknown): void {\n  void kept;\n  void held;\n}\nexport const run = (projection: ObservationProjection): void => take(null!, projection);\n`,
          reached(true, [], [], ["kept", "projection"]),
          formsRead(["annotation", "test"], ["argument: take(null!, projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-value-kept.ts",
          `${OBS_UI}function keep(this: void, projection: ObservationProjection): number {\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => keep(projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-value-kept-twin.ts",
          `${OBS_UI}function keep(projection: ObservationProjection): number {\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => keep(projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-instance-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-declared-instance.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-declared-instance-twin.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-callback.ts",
          `${OBS_UI}function run(this: void, sink: (projection: ObservationProjection) => void): void {\n  void sink;\n}\nexport const go = (): void => run((projection: unknown): void => void projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: run((projection: unknown): void => void projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-callback-twin.ts",
          `${OBS_UI}function run(sink: (projection: ObservationProjection) => void): void {\n  void sink;\n}\nexport const go = (): void => run((projection: unknown): void => void projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: run((projection: unknown): void => void projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-context-less.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: take(impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-context-less-twin.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: take(impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-literal.ts",
          `${OBS_UI}${SINK_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-literal-twin.ts",
          `${OBS_UI}${SINK_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-function-expression.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const take = function (this: void, sink: Sink): void {\n  void sink;\n};\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-function-expression-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const take = function (sink: Sink): void {\n  void sink;\n};\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}class Box {\n  put(this: Box, sink: Sink): void {\n    void sink;\n  }\n}\nexport const run = (): void => new Box().put(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Box().put(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-method-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}class Box {\n  put(sink: Sink): void {\n    void sink;\n  }\n}\nexport const run = (): void => new Box().put(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: new Box().put(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-static.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}class Box {\n  static put(this: typeof Box, sink: Sink): void {\n    void sink;\n  }\n}\nexport const run = (): void => Box.put(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Box.put(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-static-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}class Box {\n  static put(sink: Sink): void {\n    void sink;\n  }\n}\nexport const run = (): void => Box.put(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Box.put(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-literal-method.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const api = {\n  take(this: void, sink: Sink): void {\n    void sink;\n  },\n};\nexport const run = (): void => api.take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: api.take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-literal-method-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const api = {\n  take(sink: Sink): void {\n    void sink;\n  },\n};\nexport const run = (): void => api.take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: api.take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-overload.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void;\nfunction take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-overload-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void;\nfunction take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-generic.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function keep<T extends Sink>(this: void, value: T): T {\n  return value;\n}\nexport const kept = keep(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: keep(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-generic-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: keep(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-rest.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, ...sinks: Sink[]): void {\n  void sinks;\n}\nexport const run = (): void => take(new Holder(), new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder(), new Holder())", "structural-stand-in: take(new Holder(), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-rest-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(...sinks: Sink[]): void {\n  void sinks;\n}\nexport const run = (): void => take(new Holder(), new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder(), new Holder())", "structural-stand-in: take(new Holder(), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-second.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, count: number, sink: Sink): void {\n  void count;\n  void sink;\n}\nexport const run = (): void => take(1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-second-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(count: number, sink: Sink): void {\n  void count;\n  void sink;\n}\nexport const run = (): void => take(1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-optional.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, sink?: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-optional-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink?: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-async.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}async function take(this: void, sink: Sink): Promise<void> {\n  void sink;\n}\nexport const run = (): Promise<void> => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-async-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}async function take(sink: Sink): Promise<void> {\n  void sink;\n}\nexport const run = (): Promise<void> => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-unknown-this.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: unknown, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-unknown-this-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-overload-visible.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, sink: Sink): void;\nfunction take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => take(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(new Holder())"]),
        ),
        // wb-021.10 respin 3 (refusal #3 U3 and U4, THIS-PARAMETER-ARGUMENTS at rung 1, ruling R-B386): through a function declaration, its callee spelled
        // as its own name in parentheses, and a class instance, and a declaring one, held by a const's name, each as the only argument, beside twins.
        reachForms(
          "src/ui/census-forms-thisarg-parenthesized-callee.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => (take)(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (take)(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-parenthesized-callee-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void {\n  void sink;\n}\nexport const run = (): void => (take)(new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (take)(new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-held-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\n${HELD_UI}export const run = (): void => take(held);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(held)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-held-instance-twin.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function take(sink: Sink): void {\n  void sink;\n}\n${HELD_UI}export const run = (): void => take(held);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: take(held)"]),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-held-declared-instance.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function take(this: void, sink: Sink): void {\n  void sink;\n}\n${HELD_KEEPER_UI}export const run = (): void => take(held);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-thisarg-held-declared-instance-twin.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function take(sink: Sink): void {\n  void sink;\n}\n${HELD_KEEPER_UI}export const run = (): void => take(held);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "TAGGED-TEMPLATE-ARGUMENTS",
      label:
        "a tagged template's substitution is an argument of the call its tag makes, and the flow reading reads it as a written argument (wb-021.10), the tagged template the site the row names, at its index among the template's substitutions plus one, the template strings array taking the first - read and pinned only in the cells below, each a tag form (the tag's declaration and the spelling of its tag expression), a substitution position and a value (its kind and the spelling of its expression) with its reading, every other tag form, position and value NOT CLAIMED (a position or a value no cell names with a tag form is NOT CLAIMED for that form; respin 3, the enumerate-the-resolvable cut ruling R-B386 binds: each cell claims its pages as they are written). Each cell's tag is spelled by the name its declaration binds (a function declaration's own name; the const's name for the const arrow function, the function expression and the declared tag that exposes the projection), String.raw and Object.assign (with the type arguments its cell names) as so written, an object literal's method as a property access on the const that holds the literal and the map's set as a property access on the const that holds the map, except where a cell names another spelling of its tag; and each value is spelled, except where a cell names another spelling of it: a value that exposes the projection, or that its parameter keeps, as the name of the parameter that holds it; a class instance as a new expression of its class; a callback as an arrow function written at the substitution; an object literal not written where it flows as the name of the const that holds it; an object literal written at the substitution as itself; and each substitution beside the judged ones as a number literal. Every other spelling of a tag or of a value (among them a call's result, a conditional, a cast, a non-null or a satisfies expression, a comma expression, an alias, a let or a var binding, a property or an element access on a holder no cell names, an element access on a namespace import, and parentheses no cell names) is NOT CLAIMED for every cell that does not name it, and each page's other text (its template's literal parts, its names and the types it writes, the judged parameter's own type included) is as the page writes it. Each paired page reads as its twin, the same tag, so spelled, called with its strings argument (a template strings array; for String.raw and the raw object, { raw: [] }) and the same values written as arguments, reads (the map's set and Object.assign's exposing value apart, named below). Under a src function declaration whose strings parameter is written TemplateStringsArray: as the only substitution, a value that exposes the projection into a parameter that keeps it (argument) and, refused (argument), into one that hides it; a class instance flowing into a type its class does not declare, refused (structural-stand-in), also parenthesized, and one whose class declares that type, quiet; a callback whose own parameter hides what the parameter's type hands it, refused (argument); an object literal not written where it flows, refused (context-less-literal); and an object literal written at the substitution, read under its contextual type, its hiding member refused (property); as the first of two substitutions, such a class instance, refused (structural-stand-in), a value its parameter keeps (argument) and a hiding callback, refused (argument); and such a class instance as the second of two, as the second and as the third of three, and at and past a rest parameter's position (both of two), refused (structural-stand-in). Under an object literal's method and under a function declaration that declares an explicit this parameter written void (skipped, as THIS-PARAMETER-ARGUMENTS reads it), each with its strings parameter written TemplateStringsArray, and under a src function declaration with it written { readonly raw: readonly string[] }: such a class instance as the only substitution and as the first of two, refused (structural-stand-in). Under a src function declaration whose strings parameter is written readonly string[]: such a class instance as the only substitution, as the first of two and as the second of two after a parameter typed unknown, which the strings array is assignable to, refused (structural-stand-in); and, as the only substitution, a hiding callback, refused (argument), and a value its parameter keeps (argument). Under a const arrow function and a function expression bound to a const, each with its strings parameter written TemplateStringsArray: such a class instance as the only substitution, refused (structural-stand-in). Under String.raw, whose rest parameter types its substitutions any, as the only substitution: a value that exposes the projection, refused (argument), and a class instance, quiet. Under Object.assign given the type arguments TemplateStringsArray and a sink type (the interface Sink for a class instance, the callback type (projection: ObservationProjection) => void for a callback), its only substitution read against its instantiated second parameter, the sink type: such a class instance, refused (structural-stand-in), a hiding callback, refused (argument), and a class instance whose class declares the sink type, quiet; and, the sink type written ObservationProjection, a value that exposes the projection, flowing into Object.assign's own type parameter, refused (argument) as its twin refuses it, where the type argument written on the tag fails closed (unlisted-type TaggedTemplateExpression) and the twin's is read (lib-generic), and each page's return into unknown is refused (return). Under the set of a Map<TemplateStringsArray, ObservationProjection>, as the only substitution: a value that exposes the projection, kept by the map's own element type (argument), where the tag itself, which exposes the projection, fails closed (unlisted TaggedTemplateExpression) and the twin's callee is read (callee). Under a src function declaration whose strings parameter is written TemplateStringsArray, its tag spelled four further ways (respin 3, refusal #3 U1) - as a property access and as an element access with a string literal key on a const object literal that holds the declaration in a shorthand property, as a property access on a namespace import of a src module that exports the declaration, and as its own name in parentheses: such a class instance as the only substitution and as the second of two, refused (structural-stand-in). Under such a declaration, its tag spelled by its own name, a class instance spelled as the name of a const its new expression initializes (respin 3, refusal #3 U2): as the only substitution and as the second of two, refused (structural-stand-in), and one whose class declares that type, so spelled, as the only substitution, quiet. The tag is no argument: a tag that exposes the projection still fails closed (unlisted TaggedTemplateExpression), and a template with no tag makes no call, so a class instance in its substitution is read by no flow (a substitution there that exposes the projection is refused, UNLISTED-FORMS)",
      cases: [
        reachForms(
          "src/ui/census-forms-tagged-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-declared-instance.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${new Keeper()}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-declared-instance-call.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-callback.ts",
          `${OBS_UI}function tag(strings: TemplateStringsArray, sink: (projection: ObservationProjection) => void): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${(projection: unknown): void => void projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: tag\`x\${(projection: unknown): void => void projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-callback-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: (projection: ObservationProjection) => void): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, (projection: unknown): void => void projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: tag(texts, (projection: unknown): void => void projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-context-less.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${impl}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`context-less-literal: tag\`x\${impl}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-context-less-call.ts",
          `${OBS_UI}${SINK_UI}${IMPL_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, impl);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["context-less-literal: tag(texts, impl)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-literal.ts",
          `${OBS_UI}${SINK_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${{ forget(projection: unknown): void { void projection; } }}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-literal-call.ts",
          `${OBS_UI}${SINK_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, { forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-value-kept.ts",
          `${OBS_UI}function tag(strings: TemplateStringsArray, projection: ObservationProjection): number {\n  void strings;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag\`x\${projection}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-value-kept-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, projection: ObservationProjection): number {\n  void strings;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag(texts, projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-value-hidden.ts",
          `${OBS_UI}function tag(strings: TemplateStringsArray, held: unknown): void {\n  void strings;\n  void held;\n}\nexport const run = (projection: ObservationProjection): void => tag\`x\${projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: tag\`x\${projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-value-hidden-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, held: unknown): void {\n  void strings;\n  void held;\n}\nexport const run = (projection: ObservationProjection): void => tag(texts, projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: tag(texts, projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-second.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\nexport const run = (): void => tag\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${1}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-second-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\nexport const run = (): void => tag(texts, 1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, 1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-rest.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, ...sinks: Sink[]): void {\n  void strings;\n  void sinks;\n}\nexport const run = (): void => tag\`a\${new Holder()}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${new Holder()}b\${new Holder()}c\``, `structural-stand-in: tag\`a\${new Holder()}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-rest-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, ...sinks: Sink[]): void {\n  void strings;\n  void sinks;\n}\nexport const run = (): void => tag(texts, new Holder(), new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder(), new Holder())", "structural-stand-in: tag(texts, new Holder(), new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${(new Holder())}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${(new Holder())}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, (new Holder()));\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, (new Holder()))"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-method-tag.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const api = {\n  tag(strings: TemplateStringsArray, sink: Sink): void {\n    void strings;\n    void sink;\n  },\n};\nexport const run = (): void => api.tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: api.tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-method-tag-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}const api = {\n  tag(strings: TemplateStringsArray, sink: Sink): void {\n    void strings;\n    void sink;\n  },\n};\nexport const run = (): void => api.tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: api.tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-this-tag.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(this: void, strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-this-tag-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(this: void, strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-value.ts",
          `${OBS_UI}export const run = (projection: ObservationProjection): string => String.raw\`x\${projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: String.raw\`x\${projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-value-call.ts",
          `${OBS_UI}export const run = (projection: ObservationProjection): string => String.raw({ raw: [] }, projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: String.raw({ raw: [] }, projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-instance.ts",
          `${OBS_UI}${HOLDER_UI}export const run = (): string => String.raw\`x\${new Holder()}\`;\n`,
          reached(true, [], [], []),
          null,
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-instance-call.ts",
          `${OBS_UI}${HOLDER_UI}export const run = (): string => String.raw({ raw: [] }, new Holder());\n`,
          reached(true, [], [], []),
          null,
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}export const run = (): void => void Object.assign<TemplateStringsArray, Sink>\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: Object.assign<TemplateStringsArray, Sink>\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}export const run = (): void => void Object.assign<TemplateStringsArray, Sink>(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: Object.assign<TemplateStringsArray, Sink>(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-callback.ts",
          `${OBS_UI}export const run = (): void => void Object.assign<TemplateStringsArray, (projection: ObservationProjection) => void>\`x\${(projection: unknown): void => void projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: Object.assign<TemplateStringsArray, (projection: ObservationProjection) => void>\`x\${(projection: unknown): void => void projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-callback-call.ts",
          `${OBS_UI}${TEXTS_UI}export const run = (): void => void Object.assign<TemplateStringsArray, (projection: ObservationProjection) => void>(texts, (projection: unknown): void => void projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: Object.assign<TemplateStringsArray, (projection: ObservationProjection) => void>(texts, (projection: unknown): void => void projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-declared-instance.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}export const run = (): void => void Object.assign<TemplateStringsArray, Sink>\`x\${new Keeper()}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-declared-instance-call.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}${TEXTS_UI}export const run = (): void => void Object.assign<TemplateStringsArray, Sink>(texts, new Keeper());\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-map-set-value.ts",
          `${OBS_UI}const kept = new Map<TemplateStringsArray, ObservationProjection>();\nexport const run = (projection: ObservationProjection): void => {\n  kept.set\`x\${projection}\`;\n};\n`,
          reached(true, [], [], ["kept", "projection", "set"]),
          formsRead(["annotation", "argument", "initializer", "lib-generic", "member", "statement"], [`unlisted TaggedTemplateExpression: kept.set\`x\${projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-map-set-value-call.ts",
          `${OBS_UI}${TEXTS_UI}const kept = new Map<TemplateStringsArray, ObservationProjection>();\nexport const run = (projection: ObservationProjection): void => {\n  kept.set(texts, projection);\n};\n`,
          reached(true, [], [], ["kept", "projection", "set"]),
          formsRead(["annotation", "argument", "callee", "initializer", "lib-generic", "member", "statement"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: readonly string[], sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: readonly string[], sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-callback.ts",
          `${OBS_UI}function tag(strings: readonly string[], sink: (projection: ObservationProjection) => void): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag\`x\${(projection: unknown): void => void projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: tag\`x\${(projection: unknown): void => void projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-callback-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: readonly string[], sink: (projection: ObservationProjection) => void): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => tag(texts, (projection: unknown): void => void projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: tag(texts, (projection: unknown): void => void projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-value-kept.ts",
          `${OBS_UI}function tag(strings: readonly string[], projection: ObservationProjection): number {\n  void strings;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag\`x\${projection}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-value-kept-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: readonly string[], projection: ObservationProjection): number {\n  void strings;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag(texts, projection);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-object-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(template: { readonly raw: readonly string[] }, sink: Sink): void {\n  void template;\n  void sink;\n}\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-object-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(template: { readonly raw: readonly string[] }, sink: Sink): void {\n  void template;\n  void sink;\n}\nexport const run = (): void => tag({ raw: [] }, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag({ raw: [] }, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-second.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: readonly string[], held: unknown, sink: Sink): void {\n  void strings;\n  void held;\n  void sink;\n}\nexport const run = (): void => tag\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${1}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-second-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: readonly string[], held: unknown, sink: Sink): void {\n  void strings;\n  void held;\n  void sink;\n}\nexport const run = (): void => tag(texts, 1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, 1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag\`a\${new Holder()}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${new Holder()}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag(texts, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-kept.ts",
          `${OBS_UI}function tag(strings: TemplateStringsArray, projection: ObservationProjection, held: unknown): number {\n  void strings;\n  void held;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag\`a\${projection}b\${0}c\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-kept-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, projection: ObservationProjection, held: unknown): number {\n  void strings;\n  void held;\n  return projection.stats().nodes;\n}\nexport const run = (projection: ObservationProjection): number => tag(texts, projection, 0);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "argument", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-callback.ts",
          `${OBS_UI}function tag(strings: TemplateStringsArray, sink: (projection: ObservationProjection) => void, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag\`a\${(projection: unknown): void => void projection}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: tag\`a\${(projection: unknown): void => void projection}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-first-of-two-callback-call.ts",
          `${OBS_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: (projection: ObservationProjection) => void, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag(texts, (projection: unknown): void => void projection, 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["argument: tag(texts, (projection: unknown): void => void projection, 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-middle-of-three-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, first: unknown, sink: Sink, last: unknown): void {\n  void strings;\n  void first;\n  void sink;\n  void last;\n}\nexport const run = (): void => tag\`a\${0}b\${new Holder()}c\${0}d\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${0}b\${new Holder()}c\${0}d\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-middle-of-three-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, first: unknown, sink: Sink, last: unknown): void {\n  void strings;\n  void first;\n  void sink;\n  void last;\n}\nexport const run = (): void => tag(texts, 0, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, 0, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-last-of-three-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, first: unknown, second: unknown, sink: Sink): void {\n  void strings;\n  void first;\n  void second;\n  void sink;\n}\nexport const run = (): void => tag\`a\${0}b\${0}c\${new Holder()}d\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${0}b\${0}c\${new Holder()}d\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-last-of-three-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, first: unknown, second: unknown, sink: Sink): void {\n  void strings;\n  void first;\n  void second;\n  void sink;\n}\nexport const run = (): void => tag(texts, 0, 0, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, 0, 0, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-first-of-two-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: readonly string[], sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag\`a\${new Holder()}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${new Holder()}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-readonly-strings-first-of-two-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: readonly string[], sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag(texts, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-object-first-of-two-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(template: { readonly raw: readonly string[] }, sink: Sink, held: unknown): void {\n  void template;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag\`a\${new Holder()}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${new Holder()}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-raw-object-first-of-two-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(template: { readonly raw: readonly string[] }, sink: Sink, held: unknown): void {\n  void template;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag({ raw: [] }, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag({ raw: [] }, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-method-tag-first-of-two-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const api = {\n  tag(strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n    void strings;\n    void sink;\n    void held;\n  },\n};\nexport const run = (): void => api.tag\`a\${new Holder()}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: api.tag\`a\${new Holder()}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-method-tag-first-of-two-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}const api = {\n  tag(strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n    void strings;\n    void sink;\n    void held;\n  },\n};\nexport const run = (): void => api.tag(texts, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: api.tag(texts, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-this-tag-first-of-two-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(this: void, strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag\`a\${new Holder()}b\${0}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${new Holder()}b\${0}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-this-tag-first-of-two-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(this: void, strings: TemplateStringsArray, sink: Sink, held: unknown): void {\n  void strings;\n  void sink;\n  void held;\n}\nexport const run = (): void => tag(texts, new Holder(), 0);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder(), 0)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-arrow-tag-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const tag = (strings: TemplateStringsArray, sink: Sink): void => {\n  void strings;\n  void sink;\n};\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-arrow-tag-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}const tag = (strings: TemplateStringsArray, sink: Sink): void => {\n  void strings;\n  void sink;\n};\nexport const run = (): void => tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-function-expression-tag-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}const tag = function (strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n};\nexport const run = (): void => tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-function-expression-tag-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}const tag = function (strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n};\nexport const run = (): void => tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-exposing-value.ts",
          `${OBS_UI}export const run = (projection: ObservationProjection): unknown => Object.assign<TemplateStringsArray, ObservationProjection>\`x\${projection}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`argument: Object.assign<TemplateStringsArray, ObservationProjection>\`x\${projection}\``, `return: (projection: ObservationProjection): unknown => Object.assign<TemplateStringsArray, ObservationProjection>\`x\${projection}\``, `unlisted-type TaggedTemplateExpression: Object.assign<TemplateStringsArray, ObservationProjection>\`x\${projection}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-assign-exposing-value-call.ts",
          `${OBS_UI}${TEXTS_UI}export const run = (projection: ObservationProjection): unknown => Object.assign<TemplateStringsArray, ObservationProjection>(texts, projection);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation", "lib-generic"], ["argument: Object.assign<TemplateStringsArray, ObservationProjection>(texts, projection)", "return: (projection: ObservationProjection): unknown => Object.assign<TemplateStringsArray, ObservationProjection>(texts, projection)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-exposing-tag.ts",
          `${OBS_UI}${TEXTS_UI}declare const make: (strings: TemplateStringsArray) => ObservationProjection;\nexport const run = (): unknown => make\`x\`;\n`,
          reached(true, [], [], ["make"]),
          formsRead(["annotation"], ["return: (): unknown => make`x`", "unlisted TaggedTemplateExpression: make`x`"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-untagged-instance.ts",
          `${OBS_UI}${HOLDER_UI}export const run = (): string => \`x\${new Holder()}\`;\n`,
          reached(true, [], [], []),
          null,
        ),
        // wb-021.10 respin 3 (refusal #3 U1, the frozen TAGGED-TEMPLATE-ARGUMENTS class, ruling R-B386): a src function declaration's tag spelled four
        // further ways - a property access and an element access with a string literal key on a const object literal that holds it in a
        // shorthand property, a property access on a namespace import of a src module that exports it, and its own name in parentheses -
        // each given a class instance as the only substitution and as the second of two, beside its call twin.
        reachForms(
          "src/ui/census-forms-tagged-holder-property-tag-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags.tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tags.tag\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-property-tag-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags.tag(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tags.tag(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-property-tag-second-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags.tag\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tags.tag\`a\${1}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-property-tag-second-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags.tag(texts, 1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tags.tag(texts, 1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-element-tag-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags["tag"]\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tags["tag"]\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-element-tag-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags["tag"](texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tags[\"tag\"](texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-element-tag-second-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags["tag"]\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tags["tag"]\`a\${1}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-holder-element-tag-second-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${TAG_HOLDER_UI}export const run = (): void => tags["tag"](texts, 1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tags[\"tag\"](texts, 1, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-namespace-tag-instance.ts",
          `${OBS_UI}import * as tags from "./census-forms-tagged-namespace-tag-instance-tags.js";\n${HOLDER_UI}export const run = (): void => tags.tag\`x\${new Holder()}\`;\n`,
          reached(true, [], [], []),
          formsRead([], [`structural-stand-in: tags.tag\`x\${new Holder()}\``]),
          { "src/ui/census-forms-tagged-namespace-tag-instance-tags.ts": `${OBS_UI}${EXPORTED_SINK_UI}export function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n` },
        ),
        reachForms(
          "src/ui/census-forms-tagged-namespace-tag-instance-call.ts",
          `${OBS_UI}import * as tags from "./census-forms-tagged-namespace-tag-instance-call-tags.js";\n${HOLDER_UI}${TEXTS_UI}export const run = (): void => tags.tag(texts, new Holder());\n`,
          reached(true, [], [], []),
          formsRead([], ["structural-stand-in: tags.tag(texts, new Holder())"]),
          { "src/ui/census-forms-tagged-namespace-tag-instance-call-tags.ts": `${OBS_UI}${EXPORTED_SINK_UI}export function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n` },
        ),
        reachForms(
          "src/ui/census-forms-tagged-namespace-tag-second-instance.ts",
          `${OBS_UI}import * as tags from "./census-forms-tagged-namespace-tag-second-instance-tags.js";\n${HOLDER_UI}export const run = (): void => tags.tag\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], []),
          formsRead([], [`structural-stand-in: tags.tag\`a\${1}b\${new Holder()}c\``]),
          { "src/ui/census-forms-tagged-namespace-tag-second-instance-tags.ts": `${OBS_UI}${EXPORTED_SINK_UI}export function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n` },
        ),
        reachForms(
          "src/ui/census-forms-tagged-namespace-tag-second-instance-call.ts",
          `${OBS_UI}import * as tags from "./census-forms-tagged-namespace-tag-second-instance-call-tags.js";\n${HOLDER_UI}${TEXTS_UI}export const run = (): void => tags.tag(texts, 1, new Holder());\n`,
          reached(true, [], [], []),
          formsRead([], ["structural-stand-in: tags.tag(texts, 1, new Holder())"]),
          { "src/ui/census-forms-tagged-namespace-tag-second-instance-call-tags.ts": `${OBS_UI}${EXPORTED_SINK_UI}export function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n` },
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized-tag-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => (tag)\`x\${new Holder()}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: (tag)\`x\${new Holder()}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized-tag-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\nexport const run = (): void => (tag)(texts, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (tag)(texts, new Holder())"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized-tag-second-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\nexport const run = (): void => (tag)\`a\${1}b\${new Holder()}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: (tag)\`a\${1}b\${new Holder()}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-parenthesized-tag-second-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\nexport const run = (): void => (tag)(texts, 1, new Holder());\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: (tag)(texts, 1, new Holder())"]),
        ),
        // wb-021.10 respin 3 (refusal #3 U2, the frozen class): under a src function declaration spelled by its own name, a class instance held by a
        // const's name as the only substitution and as the second of two, and a declaring one so held as the only substitution, beside call twins.
        reachForms(
          "src/ui/census-forms-tagged-held-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${HELD_UI}export const run = (): void => tag\`x\${held}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`x\${held}\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-held-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${HELD_UI}export const run = (): void => tag(texts, held);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, held)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-held-second-instance.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${HELD_UI}export const run = (): void => tag\`a\${1}b\${held}c\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], [`structural-stand-in: tag\`a\${1}b\${held}c\``]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-held-second-instance-call.ts",
          `${OBS_UI}${SINK_UI}${HOLDER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, count: number, sink: Sink): void {\n  void strings;\n  void count;\n  void sink;\n}\n${HELD_UI}export const run = (): void => tag(texts, 1, held);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["structural-stand-in: tag(texts, 1, held)"]),
        ),
        reachForms(
          "src/ui/census-forms-tagged-held-declared-instance.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${HELD_KEEPER_UI}export const run = (): void => tag\`x\${held}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-tagged-held-declared-instance-call.ts",
          `${OBS_UI}${SINK_UI}${DECLARED_KEEPER_UI}${TEXTS_UI}function tag(strings: TemplateStringsArray, sink: Sink): void {\n  void strings;\n  void sink;\n}\n${HELD_KEEPER_UI}export const run = (): void => tag(texts, held);\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "R-INFERRED-LITERAL",
      label:
        "read (wb-021.7 cut #5, the re-cut over the landed carrier: wb-021.10 pinned these pages quiet as a residual and named bead wb-021.7 the home of a reading through the constraint): an object literal written as the argument itself of a call to a src generic declaration with a body, or as the substitution of a tagged template under such a tag, at a parameter typed by a type parameter the call infers from that literal, is read against the member of its name in each part of the declared target of the flow it is written at (literalBases: the parameter argumentTarget reads, the type parameter through its constraint), so each pinned page's hiding member (a method that takes the projection as unknown) is refused (property), whether or not the callee declares an explicit this parameter (wb-021.7 refusal #3's this1-this5 shapes - a function, a function whose type parameter a union constrains, a class's method, a parameter after another, a function expression and a static method - and refusal #4's LTT1 shape, a tag, each pinned with a this parameter and without), as the same literal at a parameter typed by the constraint's type itself, and under a type argument written as that type, is (property), and a keeping literal reads quiet",
      cases: [
        reachForms(
          "src/ui/census-forms-inferred-function-this.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(this: void, value: T): T {\n  return value;\n}\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-function.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-union-this.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink | undefined>(this: void, value: T): T {\n  return value;\n}\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-union.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink | undefined>(value: T): T {\n  return value;\n}\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-method-this.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  put<T extends Sink>(this: Box, value: T): T {\n    return value;\n  }\n}\nexport const kept = new Box().put({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-method.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  put<T extends Sink>(value: T): T {\n    return value;\n  }\n}\nexport const kept = new Box().put({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-second-this.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(this: void, first: number, value: T): T {\n  void first;\n  return value;\n}\nexport const kept = keep(1, { forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-second.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(first: number, value: T): T {\n  void first;\n  return value;\n}\nexport const kept = keep(1, { forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-function-expression-this.ts",
          `${OBS_UI}${SINK_UI}const keep = function <T extends Sink>(this: void, value: T): T {\n  return value;\n};\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-function-expression.ts",
          `${OBS_UI}${SINK_UI}const keep = function <T extends Sink>(value: T): T {\n  return value;\n};\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-static-this.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  static put<T extends Sink>(this: typeof Box, value: T): T {\n    return value;\n  }\n}\nexport const kept = Box.put({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-static.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  static put<T extends Sink>(value: T): T {\n    return value;\n  }\n}\nexport const kept = Box.put({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-tag-this.ts",
          `${OBS_UI}${SINK_UI}function tag<T extends Sink>(this: void, strings: TemplateStringsArray, sink: T): T {\n  void strings;\n  return sink;\n}\nexport const kept = tag\`x\${{ forget(projection: unknown): void { void projection; } }}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-tag.ts",
          `${OBS_UI}${SINK_UI}function tag<T extends Sink>(strings: TemplateStringsArray, sink: T): T {\n  void strings;\n  return sink;\n}\nexport const kept = tag\`x\${{ forget(projection: unknown): void { void projection; } }}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-constraint-type-this.ts",
          `${OBS_UI}${SINK_UI}function keep(this: void, value: Sink): Sink {\n  return value;\n}\nexport const kept = keep({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-constraint-type-tag-this.ts",
          `${OBS_UI}${SINK_UI}function tag(this: void, strings: TemplateStringsArray, sink: Sink): Sink {\n  void strings;\n  return sink;\n}\nexport const kept = tag\`x\${{ forget(projection: unknown): void { void projection; } }}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-type-argument-this.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(this: void, value: T): T {\n  return value;\n}\nexport const kept = keep<Sink>({ forget(projection: unknown): void { void projection; } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-type-argument-tag-this.ts",
          `${OBS_UI}${SINK_UI}function tag<T extends Sink>(this: void, strings: TemplateStringsArray, sink: T): T {\n  void strings;\n  return sink;\n}\nexport const kept = tag<Sink>\`x\${{ forget(projection: unknown): void { void projection; } }}\`;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget(projection: unknown): void { void projection; }"]),
        ),
        reachForms(
          "src/ui/census-forms-inferred-keeping-this.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(this: void, value: T): T {\n  return value;\n}\nexport const kept = keep({ forget(projection: ObservationProjection): void { void projection.stats(); } });\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-keeping-tag-this.ts",
          `${OBS_UI}${SINK_UI}function tag<T extends Sink>(this: void, strings: TemplateStringsArray, sink: T): T {\n  void strings;\n  return sink;\n}\nexport const kept = tag\`x\${{ forget(projection: ObservationProjection): void { void projection.stats(); } }}\`;\n`,
          reached(true, ["stats"], [], ["projection"]),
          formsRead(["annotation", "member"], []),
        ),
      ],
    },
    {
      id: "R-INDEX-STAND-IN",
      label:
        "residual (wb-021.7, found at its cut #1; a residual-list addition under ruling R-B67 (4); its further shapes pinned at cut #2, refusal #1 F3): the stand-in readings match a base member by its name (STAND-IN-KINDS), so a member whose name a base types only through an index signature - an implemented interface's string index signature, which the class's own index signature repeats, a number index signature (a numeric member), a template-pattern index signature, an extended class's index signature, an implemented interface's that extends a Record, and an object literal's contextual type that types it only through an index signature (an interface's, a Record) - is matched to no base member: a field, a method, a getter and a constructor parameter property standing in for it, and an object literal's method, read quiet whether they hide the projection or keep it (each page plants one that hides it), while an object literal's property there is read by its flow (property)",
      cases: [
        reachForms(
          "src/ui/census-forms-index-stand-in-field.ts",
          `${OBS_UI}interface Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n  forget = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-method.ts",
          `${OBS_UI}interface Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n  forget(projection: unknown): void {\n    void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-param-prop.ts",
          `${OBS_UI}interface Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n  constructor(public forget: (projection: unknown) => void) {}\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-number.ts",
          `${OBS_UI}interface Bag {\n  [key: number]: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Bag {\n  [key: number]: (projection: ObservationProjection) => void;\n  0 = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-template.ts",
          `${OBS_UI}interface Bag {\n  [key: \`on\${string}\`]: (projection: ObservationProjection) => void;\n}\nexport class Impl implements Bag {\n  [key: \`on\${string}\`]: (projection: ObservationProjection) => void;\n  onForget = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-extended.ts",
          `${OBS_UI}class Base {\n  [key: string]: (projection: ObservationProjection) => void;\n}\nexport class Impl extends Base {\n  forget = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-record.ts",
          `${OBS_UI}interface Bag extends Record<string, (projection: ObservationProjection) => void> {}\nexport class Impl implements Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n  forget = (projection: unknown): void => void projection;\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-getter.ts",
          `${OBS_UI}${BAG_UI}export class Impl implements Bag {\n  [key: string]: (projection: ObservationProjection) => void;\n  get forget(): (projection: unknown) => void {\n    return (projection: unknown): void => void projection;\n  }\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-literal-method.ts",
          `${OBS_UI}${BAG_UI}export const bag: Bag = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-literal-record.ts",
          `${OBS_UI}export const bag: Record<string, (projection: ObservationProjection) => void> = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-index-stand-in-literal-property.ts",
          `${OBS_UI}${BAG_UI}export const bag: Bag = { forget: (projection: unknown): void => void projection };\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], ["property: forget: (projection: unknown): void => void projection"]),
        ),
      ],
    },
    {
      id: "R-INTERFACE-REDECLARATION",
      label:
        "residual (wb-021.7 cut #2, refusal #1 F4: a residual-list addition, pre-existing in the landed core): an interface that extends a type whose member hands the projection and redeclares that member with a type that hides it (legal by parameter contravariance) is read as declaring the extended type (declaresGoal), and no reading judges an interface's member as a stand-in, so a class implementing the redeclaring interface is judged against the redeclared member, which hands nothing: its instance reads quiet handed back under the redeclaring type into a callback typed by the extended type, held by a field stand-in so typed, and flowing into the extended type directly, whether its member hides the projection or keeps it (each page plants one that hides it)",
      cases: [
        reachForms(
          "src/ui/census-forms-redeclared-hand-back.ts",
          `${OBS_UI}${SINK_UI}${SNEAKY_UI}const build = (): Sneaky => new Quiet();\nexport const make: () => Sink = build;\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-redeclared-field.ts",
          `${OBS_UI}${SINK_UI}${SNEAKY_UI}interface HasSink {\n  readonly sink: Sink;\n}\nexport class Impl implements HasSink {\n  readonly sink: Sneaky = new Quiet();\n}\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-redeclared-flow.ts",
          `${OBS_UI}${SINK_UI}${SNEAKY_UI}export const sink: Sink = new Quiet();\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
      ],
    },
    {
      id: "R-INFERRED-INSTANTIATION",
      label:
        "residual (wb-021.7 cut #3, refusal #2 U1, ruling R-B155: the class it froze, named; pre-existing in the landed core and at cuts #1 and #2): an object literal's method, getter and shorthand property are read against the parts of the literal's contextual type and of its flow's declared target (literalBases), and where the contextual type is the instantiation a call infers from the literal itself while no declared target is read, the member is matched against the literal's own type, which hands nothing - a literal written inside the argument of a src callee's generic parameter (a property's value under a type parameter constrained to the type or to a union, its getter, a shorthand, an array's element, a tuple's element, two levels down, a generic method's and a generic constructor's nested argument: flowOf reads a property's value through that contextual type and an element not at all) and a literal passed, as the argument or inside it, to a generic signature with no body (a function-typed parameter, an interface method: argumentTarget trusts no parameter of one) - so each reads quiet with no row where the call's result flows into no written type, whether its member hides the projection or keeps it, while its twin under the type alone is refused (DISPATCH; each page plants one that hides it); wb-021.7 cut #4 (refusal #3 F3 and F4, and two members measured at the cut; pre-existing in the landed core) adds the members the narrowed position leaves to the contextual type alone - at the argument itself of a src callee's generic parameter, a property assignment's value (an arrow, a function expression, an identifier: flowOf reads it through the contextual type) and a spread (judgeSpread reads the contextual type), a literal relayed through Function.prototype.call to a src function, generic or not (the library signature's own type parameter takes the literal's type), and a literal passed to an overload set whose visible signature is generic while its implementation's parameter, which argumentTarget reads, declares none of the literal's members (an unknown) - each matched against the literal's own type and quiet, its twin refused (DISPATCH); the family's pages declare no explicit this parameter, and a literal so placed under a callee or a signature that declares one is NOT CLAIMED by this census (cut #4 failed a call to one closed, THIS-PARAMETERS; wb-021.7 cut #5 withdraws that row over the landed carrier wb-021.10)",
      cases: [
        reachForms(
          "src/ui/census-forms-inferred-nested-property.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: { readonly sink: T }): T => value.sink;\nexport const kept = keep({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-nested-union-constraint.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink | undefined>(value: { readonly sink: T }): T => value.sink;\nexport const kept = keep({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-nested-getter.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: { readonly sink: T }): T => value.sink;\nexport const kept = keep({\n  sink: {\n    get forget(): (projection: unknown) => void {\n      return (projection: unknown): void => void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-nested-shorthand.ts",
          `${OBS_UI}${SINK_UI}const forget = (projection: unknown): void => void projection;\nconst keep = <T extends Sink>(value: { readonly sink: T }): T => value.sink;\nexport const kept = keep({ sink: { forget } });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-array-element.ts",
          `${OBS_UI}${SINK_UI}const keepAll = <T extends Sink>(values: readonly T[]): readonly T[] => values;\nexport const kept = keepAll([\n  {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-tuple-element.ts",
          `${OBS_UI}${SINK_UI}const keepPair = <T extends Sink>(pair: readonly [number, T]): readonly [number, T] => pair;\nexport const kept = keepPair([\n  1,\n  {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n]);\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-two-levels.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: { readonly outer: { readonly sink: T } }): T => value.outer.sink;\nexport const kept = keep({\n  outer: {\n    sink: {\n      forget(projection: unknown): void {\n        void projection;\n      },\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-generic-method.ts",
          `${OBS_UI}${SINK_UI}class Box {\n  put<T extends Sink>(value: { readonly sink: T }): T {\n    return value.sink;\n  }\n}\nexport const kept = new Box().put({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-generic-constructor.ts",
          `${OBS_UI}${SINK_UI}class Box<T extends Sink> {\n  constructor(readonly value: { readonly sink: T }) {}\n}\nexport const box = new Box({\n  sink: {\n    forget(projection: unknown): void {\n      void projection;\n    },\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-function-type-parameter.ts",
          `${OBS_UI}${SINK_UI}export const run = (keep: <T extends Sink>(value: T) => T): void => {\n  keep({\n    forget(projection: unknown): void {\n      void projection;\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-interface-method.ts",
          `${OBS_UI}${SINK_UI}interface Api {\n  put<T extends Sink>(value: T): T;\n}\nexport const run = (api: Api): void => {\n  api.put({\n    forget(projection: unknown): void {\n      void projection;\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-interface-method-nested.ts",
          `${OBS_UI}${SINK_UI}interface Api {\n  put<T extends Sink>(value: { readonly sink: T }): T;\n}\nexport const run = (api: Api): void => {\n  api.put({\n    sink: {\n      forget(projection: unknown): void {\n        void projection;\n      },\n    },\n  });\n};\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-property-arrow.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep({ forget: (projection: unknown): void => void projection });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-property-function.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep({\n  forget: function (projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-property-identifier.ts",
          `${OBS_UI}${SINK_UI}const hide = (projection: unknown): void => void projection;\nfunction keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep({ forget: hide });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-spread.ts",
          `${OBS_UI}${SINK_UI}const impl = {\n  forget(projection: unknown): void {\n    void projection;\n  },\n};\nfunction keep<T extends Sink>(value: T): T {\n  return value;\n}\nexport const kept = keep({ ...impl });\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-call-relay.ts",
          `${OBS_UI}${SINK_UI}const keep = <T extends Sink>(value: T): T => value;\nexport const kept = keep.call(undefined, {\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-call-relay-plain.ts",
          `${OBS_UI}${SINK_UI}const keep = (value: Sink): Sink => value;\nexport const kept = keep.call(undefined, {\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
        ),
        reachForms(
          "src/ui/census-forms-inferred-overload-unknown.ts",
          `${OBS_UI}${SINK_UI}function keep<T extends Sink>(value: T): T;\nfunction keep(value: unknown): unknown {\n  return value;\n}\nexport const kept = keep({\n  forget(projection: unknown): void {\n    void projection;\n  },\n});\n`,
          reached(true, [], [], ["projection"]),
          formsRead(["annotation"], []),
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
  "src/workbench/reactivefiber-wiring.ts": {
    value: ["refresh", "relate"],
    type: [],
    reason: "the ReactiveFiber observe-wiring (wb-79k.2): the host seam's node-value hook admits a preview reading a workflow node() call answered with - refresh for its snapshot, relate for its display-grouping edge - inside that call's answer, never on a redraw",
  },
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
  "R-STRUCTURAL-STAND-IN": ["REACH R-STRUCTURAL-STAND-IN"],
  "R-HELD-VALUE": ["REACH R-HELD-VALUE"],
  "R-THIS-BINDING": ["REACH R-THIS-BINDING"],
  "R-INDEX-STAND-IN": ["REACH R-INDEX-STAND-IN"],
  "R-INTERFACE-REDECLARATION": ["REACH R-INTERFACE-REDECLARATION"],
  "R-INFERRED-INSTANTIATION": ["REACH R-INFERRED-INSTANTIATION"],
};

/** Every table's name, quote and its source in the export row, in census order: the anchor row holds each quote to exactly one occurrence in its source. */
export const TABLE_QUOTES: readonly { readonly table: string; readonly source: "title" | "filing"; readonly quote: string }[] = [SURFACES, ...PLANT_TABLES, READERS, ABSENCE, REACH, NAMES].map(table => ({
  table: table.name,
  source: table.source,
  quote: table.quote,
}));
