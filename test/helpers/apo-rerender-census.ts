/**
 * wb-021.5 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R7, program-triage-2026-10-18): the instruments and the judged tables of
 * test/workbench-apo-rerender-census.test.ts, the rerender-authority census. The census file states the requirement, its
 * acceptance and what each table pins; this module holds the world every subject renders in, the judge that reads one
 * subject's renders, the two source scans, the mention judge and the tables. ROWS digests every case as written for the
 * out-of-file roster (test/fixtures/apo-rerender-roster.json); RESIDUAL_FAMILIES names the residuals, each with its pinned
 * quiet row.
 *
 * Display paths added: none (test-only; src is read and run, never edited). Scratch: none (every world is in memory).
 */
import { createHash } from "node:crypto";
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
  /** Every render serialized to the same bytes. */
  readonly identical: boolean;
  /** The projection's state digest moved. */
  readonly stateChanged: boolean;
}
export interface Judged {
  readonly reading: Reading;
  /** The read members the renders called, sorted: the subject's liveness. */
  readonly reads: readonly string[];
  /** The bytes of the first render. */
  readonly first: string;
}
/** What every view refresh must read: nothing admitted, nothing invoked, no effect, the same bytes, the same state. */
export const QUIET: Reading = { admissions: [], admitted: 0, invoked: [], effects: [], identical: true, stateChanged: false };

const unique = (values: readonly string[]): string[] => [...new Set(values)].sort();
const serialize = (value: unknown): string => JSON.stringify(value) ?? String(value);
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
    const outputs: string[] = [];
    for (let index = 0; index < renders; index++) outputs.push(serialize(draw()));
    await settle();
    const called = log.called.slice(mark.called);
    const reading: Reading = {
      admissions: unique([...called.filter(name => !READ.has(name)), ...log.writes.slice(mark.writes).map(name => `set:${name}`)]),
      admitted: admittedTotal(world.counts) - mark.admitted,
      invoked: unique([...log.attempts.slice(mark.attempts).map(entry => `attempt:${entry}`), ...log.provider.slice(mark.provider).map(entry => `provider:${entry}`)]),
      effects: unique([...log.evidence.slice(mark.evidence).filter(name => name !== "get").map(name => `evidence.${name}`), ...log.host.slice(mark.host)]),
      identical: outputs.every(output => output === outputs[0]),
      stateChanged: stateDigest(world.raw) !== mark.digest,
    };
    return { reading, reads: unique(called.filter(name => READ.has(name))), first: outputs[0] ?? "" };
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
  | { readonly plant: "pure" }
  | { readonly plant: "read-window" }
  | { readonly plant: "read-all" };

const DRAWN = { drawn: "the same frame" };
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
    case "pure":
      return () => () => DRAWN;
    case "read-window":
      return world => () => readMember(world.projection, "window");
    case "read-all":
      return world => () => READ_MEMBERS.map(member => readMember(world.projection, member));
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The source scans.

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

export interface ReaderScan {
  /** Each Pick or Omit over ObservationProjection, as the members it keeps (sorted, comma-joined; <unresolved> when its keys are not literals). */
  readonly readers: readonly string[];
  /** Kept members that are not read members, sorted and unique. */
  readonly writers: readonly string[];
}
/** Reads every Pick<ObservationProjection, ...> and Omit<ObservationProjection, ...> type in a module by the TypeScript AST. */
export function scanReaders(fileName: string, text: string): ReaderScan {
  const readers: string[] = [];
  const writers: string[] = [];
  const visit = (current: ts.Node): void => {
    if (ts.isTypeReferenceNode(current)) {
      const utility = typeNameText(current.typeName);
      const [target, keysNode] = current.typeArguments ?? [];
      if ((utility === "Pick" || utility === "Omit") && target && keysNode && ts.isTypeReferenceNode(target) && typeNameText(target.typeName) === "ObservationProjection") {
        const keys = literalKeys(keysNode);
        const kept = keys === undefined ? ["<unresolved>"] : utility === "Pick" ? keys : PROJECTION_MEMBERS.filter(member => !keys.includes(member));
        readers.push([...kept].sort().join(","));
        writers.push(...kept.filter(member => !READ.has(member)));
      }
    }
    ts.forEachChild(current, visit);
  };
  visit(parse(fileName, text));
  return { readers, writers: unique(writers) };
}

/** True when a module imports the name ObservationProjection (as a type or a value) from a module path ending in observation.js. */
export function importsProjection(fileName: string, text: string): boolean {
  const source = parse(fileName, text);
  return source.statements.some(
    statement =>
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      /(?:^|\/)observation\.js$/.test(statement.moduleSpecifier.text) &&
      statement.importClause?.namedBindings !== undefined &&
      ts.isNamedImports(statement.importClause.namedBindings) &&
      statement.importClause.namedBindings.elements.some(element => (element.propertyName ?? element.name).text === "ObservationProjection"),
  );
}

/** The public method names of a class declared in a module (constructor, private, protected and static members excluded), in source order. */
export function publicMethods(fileName: string, text: string, className: string): string[] {
  const source = parse(fileName, text);
  const names: string[] = [];
  for (const statement of source.statements) {
    if (!ts.isClassDeclaration(statement) || statement.name?.text !== className) continue;
    for (const member of statement.members) {
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;
      const hidden = ts.getModifiers(member)?.some(modifier => [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.StaticKeyword].includes(modifier.kind));
      if (!hidden) names.push(member.name.text);
    }
  }
  return names;
}

/** The member names of an interface declared in a module, in source order. */
export function interfaceMembers(fileName: string, text: string, interfaceName: string): string[] {
  const source = parse(fileName, text);
  const names: string[] = [];
  for (const statement of source.statements) {
    if (!ts.isInterfaceDeclaration(statement) || statement.name.text !== interfaceName) continue;
    for (const member of statement.members) if (member.name && ts.isIdentifier(member.name)) names.push(member.name.text);
  }
  return names;
}

/** The string literals of one property's union type inside an interface (CapabilityDescriptor.effectClass and the like). */
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
  /** The bead's own words this table pins (title or notes, verbatim). */
  readonly quote: string;
  readonly rows: readonly TableRow<C>[];
}
export interface SurfaceRow extends TableRow<SurfaceCase> {
  /** The src module whose render the row judges. */
  readonly module: string;
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
export const SURFACES: { readonly name: "SURFACES"; readonly quote: string; readonly rows: readonly SurfaceRow[] } = {
  name: "SURFACES",
  quote: "a Pi view refresh or observation re-projection",
  rows: [
    {
      id: "GRAPH-VIEW",
      module: "src/workbench/graph-view.ts",
      label: "the graph-view model, built and rebuilt by its cached builder, reads quiet over N refreshes",
      cases: [{ surface: "graph.build" }, { surface: "graph.build", focus: "F" }, { surface: "graph.builder" }],
    },
    {
      id: "TIMELINE",
      module: "src/workbench/timeline.ts",
      label: "the timeline lanes at two zoom and pan settings read quiet over N refreshes",
      cases: [
        { surface: "timeline.lanes", zoom: 1, pan: 0 },
        { surface: "timeline.lanes", zoom: 4, pan: 2 },
      ],
    },
    {
      id: "OBSERVE",
      module: "src/workbench/observe-query.ts",
      label: "the model-facing observe reply, bare and with relations and events, reads quiet over N refreshes",
      cases: [
        { surface: "observe.invocation", relations: false, events: 0 },
        { surface: "observe.invocation", relations: true, events: 10 },
      ],
    },
    {
      id: "TOPOLOGY",
      module: "src/workbench/topology-slice.ts",
      label: "the linked topology slice of two focused nodes reads quiet over N refreshes",
      cases: [
        { surface: "topology.slice", focus: "F" },
        { surface: "topology.slice", focus: "U" },
      ],
    },
    {
      id: "ATTENTION",
      module: "src/workbench/attention.ts",
      label: "the attention report at two bottleneck caps reads quiet over N refreshes",
      cases: [
        { surface: "attention.select", bottlenecks: 5 },
        { surface: "attention.select", bottlenecks: 1 },
      ],
    },
    { id: "LATENCY", module: "src/workbench/latency.ts", label: "the latency decomposition reads quiet over N refreshes", cases: [{ surface: "latency.decompose" }] },
    { id: "TELEMETRY", module: "src/workbench/telemetry.ts", label: "the operations telemetry report reads quiet over N refreshes", cases: [{ surface: "telemetry.operations" }] },
    { id: "INSPECTOR", module: "src/ui/workflow-inspector.ts", label: "the inspector layout of each of the four views reads quiet over N redraws", cases: view("inspector.layout") },
    {
      id: "DIALOG",
      module: "src/ui/workflow-menu.ts",
      label: "the real host seam's dialog redraw of each of the four views, its per-redraw model builders included, reads quiet over N redraws",
      cases: view("dialog.redraw"),
    },
    {
      id: "REPROJECTION",
      module: "src/workbench/observation.ts",
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
      id: "R-LATE-DRIFT",
      label: "residual: drift that first appears after N renders reads quiet",
      cases: [{ subject: { plant: "late-drift" }, expect: QUIET }],
    },
  ],
};

export const QUIETS: Table<PlantItem> = {
  name: "QUIET",
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
      id: "R-FULL-TYPE",
      label: "residual: a parameter typed as the whole projection is not a typed reader to this scan",
      cases: [{ text: "function draw(projection: ObservationProjection): void {}", expect: { readers: 0, writers: [] } }],
    },
    {
      id: "R-ALIASED-CLASS",
      label: "residual: a Pick over an alias of the projection class is not read",
      cases: [{ text: 'type P = ObservationProjection; type R = Pick<P, "ingest">;', expect: { readers: 0, writers: [] } }],
    },
  ],
};

export const ABSENCE: Table<MentionItem> = {
  name: "ABSENCE",
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

export const PLANT_TABLES: readonly Table<PlantItem>[] = [ADMISSION, INVOCATION, EFFECT, IDENTITY, QUIETS];

/** Source modules that read the projection but never on a redraw, each with the reason; every other view module is a SURFACES row. */
export const NON_RENDER: Readonly<Record<string, string>> = {
  "src/workbench/evidence-wiring.ts": "the evidence producer wiring: its query reader runs inside a loader, on the explicit load-evidence action the host performs, never on a redraw",
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
];

/** The named residual families, each with its pinned quiet row (the row's registered test). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "R-DEFERRED-EFFECT": ["INVOCATION R-DEFERRED-EFFECT"],
  "R-SIDE-CHANNEL": ["EFFECT R-SIDE-CHANNEL"],
  "R-LATE-DRIFT": ["IDENTITY R-LATE-DRIFT"],
  "R-FULL-TYPE": ["READERS R-FULL-TYPE"],
  "R-ALIASED-CLASS": ["READERS R-ALIASED-CLASS"],
  "R-PARAPHRASE": ["ABSENCE R-PARAPHRASE"],
};

/** Every table's name and quote, in census order: the anchor row holds each quote to the bead's own export text. */
export const TABLE_QUOTES: readonly { readonly table: string; readonly quote: string }[] = [SURFACES, ...PLANT_TABLES, READERS, ABSENCE].map(table => ({ table: table.name, quote: table.quote }));
