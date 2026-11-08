/**
 * wb-0gbh (mechanical-workflows-interop-2026-11-04 B-coordination, slice PI-7): the Pi boundary for MechanicalWorkflows' one
 * published pure coordination export, src/workbench/mechanical-coordination.ts.
 *
 * Requirements (pi-subagents master 0b25e14e, triage/requirements/ATOMIC-REQUIREMENTS.md, group "coordination"); every case is
 * titled by the case id the module header cites, under a describe naming the requirement it pins:
 *  EAT-R071 "Pi MUST invoke only the published pure coordination schema and export." Acceptance: "Load exact packed producer
 *   pure-host facade with separate read-only grant; invoke valid schema data and round-trip proposal. Unsupported
 *   export/callable inputs refuse." Mutant: "Allow arbitrary coordination exports or reuse blanket write grant."
 *  EAT-R072 "Pi MUST treat a coordination proposal as observation until separately authorized." Acceptance: "Return a proposal
 *   naming Beads, Forge or Furnace action; assert zero provider effects without an independent resolver and exact authority."
 *   Mutant: "Auto-execute policy output as a command."
 *
 * THE FIXTURES are MechanicalWorkflows' files of record, vendored byte-identical with read-only git show at MechanicalWorkflows
 * origin/main 469ee2e5a6c66940a36680da9648f88c6f52ae32: contracts/entrypoints/coordination-reconcile.v1.json and
 * contracts/schemas/coordination-resolver-input.v1.schema.json and coordination-resolution.v1.schema.json. C-1 holds each to its
 * SHA-256 and git blob id, and the module's reviewed digests to the same SHA-256. Every case writes the three files (or a
 * planted edit of one) to a scratch directory and hands the boundary their paths. D-DIGEST also plants
 * test/fixtures/mw-development-entrypoint-v1.json, the B-descriptor suite's vendored development descriptor. D-EXPORT's names
 * are value exports of the coordination package's packages/coordination/src/index.ts at the same pin (blob 458913c5, read by
 * the cutting seat with the TypeScript parser).
 *
 * EXPLICITLY PARTIAL (closure gate PI-COORDINATION-INSTALLED; external MW-COORDINATION): no packed or installed coordination
 * package is read. Each case writes a scratch file standing in for the artifact, pins its SHA-256, and hands a loader that
 * records its calls, imports nothing and answers with a namespace of recording functions: reconcile (a stand-in that admits
 * every propose-only intent once, see standIn) beside one recording function for each name of OTHER_EXPORTS. The
 * installed-consumer leg is NOT RUN by this suite; the slice is not claimed live or closed.
 *
 * THE HOST of every case is a recording object: its grant read beside provider handles named after the Beads, Forge and
 * Furnace actions the planted proposals name (EFFECT_HANDLES), so a boundary that executed a proposal would call one. Every
 * call the suite plants asserts zero effect calls and zero calls of an export other than reconcile; X-NO-EFFECT also plants
 * every exact effect grant beside the coordination grant.
 *
 * Display paths added: none (the boundary returns closed-vocabulary diagnostics and data, and composes no label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { EXECUTE_GRANT } from "../src/workbench/execute.js";
import * as coordination from "../src/workbench/mechanical-coordination.js";
import {
  invokeMechanicalCoordination,
  MECHANICAL_COORDINATION_AUTHORITY,
  MECHANICAL_COORDINATION_ENTRY,
  MECHANICAL_COORDINATION_FIELDS,
  MECHANICAL_COORDINATION_GRANT,
  MECHANICAL_COORDINATION_MAX_DEPTH,
  MECHANICAL_COORDINATION_REASONS,
  MECHANICAL_COORDINATION_REVIEWED_DIGESTS,
  type MechanicalCoordinationArtifact,
  type MechanicalCoordinationEntry,
  type MechanicalCoordinationLoader,
  type MechanicalCoordinationResult,
} from "../src/workbench/mechanical-coordination.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);
const scratches: string[] = [];
afterEach(() => removeScratch(...scratches.splice(0)));
const scratch = (): string => {
  const dir = makeScratch("wb-0gbh-mw-coordination-");
  scratches.push(dir);
  return dir;
};

/** The producer files of record, as measured by read-only git show at MechanicalWorkflows origin/main 469ee2e5. */
const PRODUCER_COMMIT = "469ee2e5a6c66940a36680da9648f88c6f52ae32";
const PRODUCER_FILES = [
  { key: "descriptor", fixture: "mw-coordination-reconcile-entrypoint-v1.json", path: "contracts/entrypoints/coordination-reconcile.v1.json", blob: "566d6e76a2110ff496c1a79272ec14fd5434be45", sha256: "cae5c213da467a75fd407106c17058318c3679c269f11478e0abaf8f88622acf", bytes: 583 },
  { key: "inputSchema", fixture: "mw-coordination-resolver-input-v1.schema.json", path: "contracts/schemas/coordination-resolver-input.v1.schema.json", blob: "64298c5092a82494380d1cb8222ca0ddd784c1e9", sha256: "d3a3e99e512a793c2f1158eb19c30e5c9562d16c4a4c32e2e81b97c016026238", bytes: 4255 },
  { key: "outputSchema", fixture: "mw-coordination-resolution-v1.schema.json", path: "contracts/schemas/coordination-resolution.v1.schema.json", blob: "0066df7e54411c173b9e027fc08ceb12d40037b7", sha256: "3838bb34f466797cdb7ca88d3fbca6296192bc13fc8eb5f9b7f7243f343c94ba", bytes: 6040 },
] as const;
const fixtureBytes = (name: string): Buffer => readFileSync(new URL(`./fixtures/${name}`, import.meta.url));
const DESCRIPTOR_BYTES = fixtureBytes("mw-coordination-reconcile-entrypoint-v1.json");
const DESCRIPTOR_TEXT = DESCRIPTOR_BYTES.toString("utf8");
const INPUT_SCHEMA_BYTES = fixtureBytes("mw-coordination-resolver-input-v1.schema.json");
const OUTPUT_SCHEMA_BYTES = fixtureBytes("mw-coordination-resolution-v1.schema.json");
const DEVELOPMENT_DESCRIPTOR_BYTES = fixtureBytes("mw-development-entrypoint-v1.json");
const sha256Of = (bytes: Uint8Array | string): string => createHash("sha256").update(bytes).digest("hex");
const digestOf = (bytes: Uint8Array | string): string => `sha256:${sha256Of(bytes)}`;
const gitBlobOf = (bytes: Uint8Array): string => createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`, "utf8"), bytes])).digest("hex");

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonRecord = { [key: string]: Json };
/** The producer descriptor as its bytes parse. */
const PRODUCER_OBJECT = JSON.parse(DESCRIPTOR_TEXT) as JsonRecord;
/** A JSON record's two-space rendering after an edit, plus the final line break (the unedited producer object renders to its bytes, C-1). */
const renderedOf = (object: JsonRecord, edit: (copy: JsonRecord) => JsonRecord): string => `${JSON.stringify(edit(structuredClone(object)), null, 2)}\n`;
const rendered = (edit: (object: JsonRecord) => JsonRecord): string => renderedOf(PRODUCER_OBJECT, edit);
const withMember = (name: string, value: Json) => (object: JsonRecord): JsonRecord => ({ ...object, [name]: value });
const without = (...names: string[]) => (object: JsonRecord): JsonRecord => Object.fromEntries(Object.entries(object).filter(([key]) => !names.includes(key)));
const implementationOf = (object: JsonRecord): JsonRecord => object.implementation as JsonRecord;
const withImplementation = (edit: (implementation: JsonRecord) => JsonRecord) => (object: JsonRecord): JsonRecord => ({ ...object, implementation: edit({ ...implementationOf(object) }) });
const withExport = (name: Json) => withImplementation(implementation => ({ ...implementation, export: name }));
/** The producer's parsed schema files (C-KEYWORDS reads them; I-SCHEMA and O-SCHEMA read their required lists). */
const INPUT_SCHEMA = JSON.parse(INPUT_SCHEMA_BYTES.toString("utf8")) as JsonRecord;
const OUTPUT_SCHEMA = JSON.parse(OUTPUT_SCHEMA_BYTES.toString("utf8")) as JsonRecord;

/** Value exports of the coordination package's index at the pin other than reconcile (D-EXPORT plants each as the descriptor's export). */
const OTHER_EXPORTS: readonly string[] = [
  "canonicalJson", "digest", "sequential", "parallel", "guarded", "alternative", "inhibit", "repeated", "replayTape", "validateEffectPermissions",
  "commitDurable", "runLandingQueue", "decidePromotion", "buildDecisionReceipts", "exportEpisodeForTraining", "publishReconciled",
];

// ---- the planted input and the stand-in producer ----------------------------------------------------------------------------

const claimOf = (): JsonRecord => ({ compute: 1, workers: 1, queue: 1, latencyMs: 10 });
const intentOf = (intentId: string, extra: JsonRecord = {}): JsonRecord => ({
  intentId,
  policyId: "fifo",
  target: { kind: "candidate", uri: `cand:${intentId}` },
  expectedRevision: "head-1",
  effect: "land",
  claim: claimOf(),
  evidenceRefs: [],
  writeScopes: [`scope-${intentId}`],
  readScopes: [],
  ...extra,
});
const proposalOf = (...intents: JsonRecord[]): JsonRecord => ({ intents, memory: null, trace: [{ kind: "proposed", policyId: "fifo", detail: "x" }] });
const inputOf = (...proposals: JsonRecord[]): JsonRecord => ({
  basis: { workspaceId: "demo", revision: "head-1" },
  budget: { compute: 10, workers: 4, queue: 4, latencyMs: 1000 },
  protectedScopes: ["actor:*"],
  proposals,
});
/** The input most cases plant: two proposals of one intent each, on disjoint write scopes. */
const validInput = (): JsonRecord => inputOf(proposalOf(intentOf("a")), proposalOf(intentOf("b")));

interface StandInIntent {
  readonly intentId: string;
  readonly authority?: string;
  readonly claim: { readonly compute: number; readonly workers: number; readonly queue: number; readonly latencyMs: number };
}
interface StandInInput {
  readonly basis: JsonRecord;
  readonly budget: JsonRecord;
  readonly proposals: readonly { readonly intents: readonly StandInIntent[] }[];
}
/**
 * The stand-in for the producer's reconcile: in disclosed order, a repeated intent id is rejected INTENT_DUPLICATE, an intent
 * declaring an authority other than propose-only is rejected INTENT_AUTHORITY_EXCEEDED (the producer's own codes, resolver.ts at
 * the pin), and every other intent is admitted once; budgetUsed sums the admitted claims. It is not the producer's resolver.
 */
function standIn(input: unknown): unknown {
  const { basis, budget, proposals } = input as StandInInput;
  const admitted: StandInIntent[] = [];
  const rejected: { intent: StandInIntent; code: string; detail: string }[] = [];
  const seen = new Set<string>();
  for (const proposal of proposals) {
    for (const intent of proposal.intents) {
      if (seen.has(intent.intentId)) rejected.push({ intent, code: "INTENT_DUPLICATE", detail: `intent id ${intent.intentId} was already proposed` });
      else if (intent.authority !== undefined && intent.authority !== "propose-only") {
        rejected.push({ intent, code: "INTENT_AUTHORITY_EXCEEDED", detail: `intent declares ${intent.authority}; a policy may only propose` });
      } else admitted.push(intent);
      seen.add(intent.intentId);
    }
  }
  const budgetUsed = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
  for (const { claim } of admitted) {
    budgetUsed.compute += claim.compute;
    budgetUsed.workers += claim.workers;
    budgetUsed.queue += claim.queue;
    budgetUsed.latencyMs += claim.latencyMs;
  }
  return { basis: { ...basis }, budget: { ...budget }, admitted, rejected, conflicts: [], budgetUsed };
}
/** The stand-in's resolution of an input, computed by the suite on its own JSON copy (the expected value of a round trip). */
const expectedResolutionOf = (input: unknown): unknown => standIn(JSON.parse(JSON.stringify(input)));

// ---- the recording host, loader and namespace -------------------------------------------------------------------------------

/** The provider handles every host carries beside its grant read, named after the actions the planted proposals name. */
const EFFECT_HANDLES = {
  beads: ["close", "claim", "update", "create"],
  forge: ["publish", "build", "gate"],
  furnace: ["start", "stop", "run"],
} as const;
const EFFECT_FUNCTIONS = ["exec", "execute", "run", "spawn", "dispatch", "apply"] as const;
interface Counts {
  grants: number;
  loads: number;
  reconcile: number;
  others: number;
  effects: number;
  getters: number;
}
interface Trace {
  readonly counts: Counts;
  readonly loads: { readonly entry: MechanicalCoordinationEntry; readonly artifact: MechanicalCoordinationArtifact }[];
  readonly received: unknown[];
  readonly produced: unknown[];
}
const newTrace = (): Trace => ({ counts: { grants: 0, loads: 0, reconcile: 0, others: 0, effects: 0, getters: 0 }, loads: [], received: [], produced: [] });
/** The recording host: its grant read and the provider handles (each records an effect call). */
function hostOf(trace: Trace, grants: unknown): { grants(): unknown } & Record<string, unknown> {
  const effect = (): undefined => {
    trace.counts.effects += 1;
    return undefined;
  };
  const host: Record<string, unknown> = {
    grants: () => {
      trace.counts.grants += 1;
      return grants;
    },
  };
  for (const [provider, actions] of Object.entries(EFFECT_HANDLES)) host[provider] = Object.fromEntries(actions.map(action => [action, effect]));
  for (const name of EFFECT_FUNCTIONS) host[name] = effect;
  return host as { grants(): unknown } & Record<string, unknown>;
}
/** The recording namespace: reconcile running the producer function given, and every other export a recording function. */
function namespaceOf(trace: Trace, produce: (input: unknown) => unknown): Record<string, unknown> {
  const namespace: Record<string, unknown> = {};
  for (const name of OTHER_EXPORTS) {
    namespace[name] = () => {
      trace.counts.others += 1;
      return undefined;
    };
  }
  namespace[MECHANICAL_COORDINATION_ENTRY.export] = (input: unknown) => {
    trace.counts.reconcile += 1;
    trace.received.push(input);
    const output = produce(input);
    trace.produced.push(output);
    return output;
  };
  return namespace;
}

const write = (path: string, data: string | Uint8Array): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
};
const mkfifo = (path: string): string => {
  mkdirSync(dirname(path), { recursive: true });
  execFileSync("mkfifo", [path]);
  return path;
};
const ARTIFACT_TEXT = "planted coordination artifact bytes\n";

/** Where plant writes each file inside its scratch directory. */
interface Layout {
  readonly dir: string;
  readonly descriptor: string;
  readonly schemas: string;
  readonly inputSchema: string;
  readonly outputSchema: string;
  readonly artifact: string;
}
interface Plant {
  /** The host's grant read; the coordination grant alone unless given. */
  readonly grants?: unknown;
  /** The descriptor bytes; the producer's unless given. */
  readonly descriptor?: string | Uint8Array;
  /** The input and output schema files' bytes; the producer's unless given. */
  readonly inputSchema?: string | Uint8Array;
  readonly outputSchema?: string | Uint8Array;
  /** Edits the layout after the files are written (a path removed, a directory or FIFO put in a file's place). */
  readonly arrange?: (layout: Layout) => void;
  /** The paths the host hands, given the layout; the written ones unless given. */
  readonly descriptorPath?: (layout: Layout) => string;
  readonly schemaDirectory?: (layout: Layout) => string;
  readonly artifactPath?: (layout: Layout) => string;
  readonly artifact?: string | Uint8Array;
  /** The artifact pin the host hands, given the exact one; the exact one unless given. */
  readonly pin?: (exact: string) => unknown;
  /** The input; validInput() unless given. */
  readonly input?: unknown;
  /** The producer behind the namespace's reconcile; the stand-in unless given. */
  readonly produce?: (input: unknown) => unknown;
  /** The loader's result, given the recording namespace; the namespace unless given. */
  readonly namespace?: (recording: Record<string, unknown>) => unknown;
  /** A loader replacing the recording one. */
  readonly loader?: MechanicalCoordinationLoader;
}
interface Planted {
  readonly result: MechanicalCoordinationResult;
  readonly trace: Trace;
  readonly input: unknown;
  readonly artifactBytes: Buffer;
  readonly pin: string;
}
/** Writes the planted files to a fresh scratch directory and calls the boundary once with the recording host and loader. */
async function plant(p: Plant = {}): Promise<Planted> {
  const dir = scratch();
  const schemas = join(dir, "contracts", "schemas");
  const layout: Layout = {
    dir,
    descriptor: join(dir, "contracts", "entrypoints", "coordination-reconcile.v1.json"),
    schemas,
    inputSchema: join(schemas, MECHANICAL_COORDINATION_ENTRY.inputSchema),
    outputSchema: join(schemas, MECHANICAL_COORDINATION_ENTRY.outputSchema),
    artifact: join(dir, "package", "coordination.tgz"),
  };
  const trace = newTrace();
  write(layout.descriptor, p.descriptor ?? DESCRIPTOR_BYTES);
  write(layout.inputSchema, p.inputSchema ?? INPUT_SCHEMA_BYTES);
  write(layout.outputSchema, p.outputSchema ?? OUTPUT_SCHEMA_BYTES);
  write(layout.artifact, p.artifact ?? ARTIFACT_TEXT);
  const artifactBytes = readFileSync(layout.artifact);
  const exact = digestOf(artifactBytes);
  p.arrange?.(layout);
  const input = Object.hasOwn(p, "input") ? p.input : validInput();
  const recording = namespaceOf(trace, p.produce ?? standIn);
  const loader: MechanicalCoordinationLoader =
    p.loader ??
    (async (entry, artifact) => {
      trace.counts.loads += 1;
      trace.loads.push({ entry, artifact });
      return p.namespace === undefined ? recording : p.namespace(recording);
    });
  const result = await invokeMechanicalCoordination({
    host: hostOf(trace, Object.hasOwn(p, "grants") ? p.grants : [MECHANICAL_COORDINATION_GRANT]),
    descriptorPath: p.descriptorPath === undefined ? layout.descriptor : p.descriptorPath(layout),
    schemaDirectory: p.schemaDirectory === undefined ? layout.schemas : p.schemaDirectory(layout),
    artifactPath: p.artifactPath === undefined ? layout.artifact : p.artifactPath(layout),
    artifactDigest: (p.pin === undefined ? exact : p.pin(exact)) as string,
    input,
    loader,
  });
  expect([trace.counts.effects, trace.counts.others], "no provider handle and no export but reconcile is called").toEqual([0, 0]);
  return { result, trace, input, artifactBytes, pin: exact };
}

/** Every (field, reason) pair a case of this suite observed, for C-TALLY. */
const OBSERVED_PAIRS = new Set<string>();
/** Every table row that ran, for the closing each-liveness tally. */
const RAN = new Set<string>();
/**
 * A result's reading: "admitted", or "<field> <reason>" when its diagnostic is closed (exactly code, field and reason in that
 * order, the code mechanical-coordination-refused, frozen), else "unclosed <field> <reason>".
 */
function readingOf(result: MechanicalCoordinationResult): string {
  if (result.ok) return "admitted";
  const { diagnostic } = result;
  const closed = Object.keys(diagnostic).join(",") === "code,field,reason" && diagnostic.code === "mechanical-coordination-refused" && Object.isFrozen(diagnostic);
  OBSERVED_PAIRS.add(`${diagnostic.field} ${diagnostic.reason}`);
  return `${closed ? "" : "unclosed "}${diagnostic.field} ${diagnostic.reason}`;
}
/** A refusal's reading with the calls it caused: nothing loaded, called or effected. */
async function refusalOf(p: Plant): Promise<{ readonly reading: string; readonly loads: number; readonly reconcile: number; readonly others: number; readonly effects: number }> {
  const { result, trace } = await plant(p);
  return { reading: readingOf(result), loads: trace.counts.loads, reconcile: trace.counts.reconcile, others: trace.counts.others, effects: trace.counts.effects };
}
const refusedQuietly = (reading: string) => ({ reading, loads: 0, reconcile: 0, others: 0, effects: 0 });
/** An admitted call's trace: loaded once, reconcile called once, no other export and no effect called. */
async function admittedOf(p: Plant): Promise<Planted> {
  const planted = await plant(p);
  expect(readingOf(planted.result)).toBe("admitted");
  expect([planted.trace.counts.loads, planted.trace.counts.reconcile, planted.trace.counts.others, planted.trace.counts.effects]).toEqual([1, 1, 0, 0]);
  return planted;
}
/** A JSON record with one value at a path replaced or deleted (for the edits below). */
const editAt = (value: JsonRecord, path: readonly (string | number)[], edit: (holder: Record<string | number, unknown>, key: string | number) => void): JsonRecord => {
  const copy = structuredClone(value);
  let holder: Record<string | number, unknown> = copy;
  for (const key of path.slice(0, -1)) holder = holder[key] as Record<string | number, unknown>;
  edit(holder, path[path.length - 1] as string | number);
  return copy;
};
const setAt = (value: JsonRecord, path: readonly (string | number)[], member: unknown): JsonRecord =>
  editAt(value, path, (holder, key) => {
    holder[key] = member;
  });
const deleteAt = (value: JsonRecord, path: readonly (string | number)[]): JsonRecord =>
  editAt(value, path, (holder, key) => {
    delete holder[key];
  });
/** Whether every object and array reachable from a value is frozen and no function is reachable. */
function inert(value: unknown): boolean {
  if (typeof value === "function") return false;
  if (typeof value !== "object" || value === null) return true;
  return Object.isFrozen(value) && Object.values(value).every(inert);
}

// ---- C: the reviewed contract ---------------------------------------------------------------------------------------------------

describe("C: the reviewed contract", () => {
  it("C-1: each vendored fixture is the producer file at MechanicalWorkflows 469ee2e5 byte for byte, the reviewed digests are their SHA-256, and the entry is the descriptor's id, export and schema names", () => {
    expect(PRODUCER_COMMIT).toMatch(/^[0-9a-f]{40}$/);
    for (const file of PRODUCER_FILES) {
      const bytes = fixtureBytes(file.fixture);
      expect([file.path, bytes.length, sha256Of(bytes), gitBlobOf(bytes), MECHANICAL_COORDINATION_REVIEWED_DIGESTS[file.key]]).toEqual([file.path, file.bytes, file.sha256, file.blob, `sha256:${file.sha256}`]);
    }
    expect(Object.keys(MECHANICAL_COORDINATION_REVIEWED_DIGESTS)).toEqual(PRODUCER_FILES.map(file => file.key));
    expect(`${JSON.stringify(PRODUCER_OBJECT, null, 2)}\n`).toBe(DESCRIPTOR_TEXT);
    const implementation = implementationOf(PRODUCER_OBJECT);
    expect({ ...MECHANICAL_COORDINATION_ENTRY }).toEqual({ id: PRODUCER_OBJECT.id, export: implementation.export, inputSchema: PRODUCER_OBJECT.inputSchema, outputSchema: PRODUCER_OBJECT.outputSchema });
    expect([implementation.package, PRODUCER_OBJECT.bindings, PRODUCER_OBJECT.status]).toEqual(["@mechanical/workflows-coordination", [], "descriptor-only"]);
    expect([Object.isFrozen(MECHANICAL_COORDINATION_ENTRY), Object.isFrozen(MECHANICAL_COORDINATION_REVIEWED_DIGESTS)]).toEqual([true, true]);
  });

  it("C-KEYWORDS: the two producer schema files use exactly the keywords the boundary judges (type, properties, required, additionalProperties, items, minLength, minimum, enum, $ref), beside the root annotations and $defs", () => {
    const keywords = new Set<string>();
    const visit = (node: JsonRecord): void => {
      for (const key of Object.keys(node)) keywords.add(key);
      for (const child of Object.values((node.properties ?? {}) as Record<string, JsonRecord>)) visit(child);
      if (node.items !== undefined) visit(node.items as JsonRecord);
    };
    for (const schema of [INPUT_SCHEMA, OUTPUT_SCHEMA]) {
      const { $schema, $id, title, description, $defs, ...root } = schema;
      expect([$schema, $id, title, description].every(text => typeof text === "string")).toBe(true);
      visit(root);
      for (const node of Object.values($defs as Record<string, JsonRecord>)) visit(node);
    }
    expect([...keywords].sort()).toEqual(["$ref", "additionalProperties", "enum", "items", "minLength", "minimum", "properties", "required", "type"]);
  });

  it("C-VOCABULARY: the refusal fields and reasons are the closed lists below, in order", () => {
    expect([...MECHANICAL_COORDINATION_FIELDS]).toEqual(["grants", "pin", "descriptor", "inputSchema", "outputSchema", "input", "artifact", "loaded", "resolution"]);
    expect([...MECHANICAL_COORDINATION_REASONS]).toEqual([
      "unknown-permission-data", "missing-coordination-grant", "pin-malformed", "unreadable", "not-a-file", "digest-mismatch", "not-serialized-data",
      "schema-invalid", "export-missing", "basis-mismatch", "budget-mismatch",
    ]);
  });
});

// ---- G: the separate read-only grant (EAT-R071) ---------------------------------------------------------------------------------

describe("G: EAT-R071 - a separate read-only grant, never the blanket write grant", () => {
  it("G-1: with workbench:coordinate alone the grant read is called once and the call is admitted", async () => {
    expect(MECHANICAL_COORDINATION_GRANT).toBe("workbench:coordinate");
    const { trace } = await admittedOf({ grants: [MECHANICAL_COORDINATION_GRANT] });
    expect(trace.counts.grants).toBe(1);
  });

  it("G-2: workbench:execute, the blanket write grant, held alone refuses missing-coordination-grant with zero loader calls (the mutant 'reuse blanket write grant')", async () => {
    expect(EXECUTE_GRANT).toBe("workbench:execute");
    expect(await refusalOf({ grants: [EXECUTE_GRANT] })).toEqual(refusedQuietly("grants missing-coordination-grant"));
  });

  it("G-3: workbench:execute held beside workbench:coordinate, in either order, changes nothing: the same observation as with the coordination grant alone", async () => {
    const alone = await admittedOf({ grants: [MECHANICAL_COORDINATION_GRANT] });
    for (const grants of [[EXECUTE_GRANT, MECHANICAL_COORDINATION_GRANT], [MECHANICAL_COORDINATION_GRANT, EXECUTE_GRANT]]) {
      const both = await admittedOf({ grants });
      expect(both.result).toEqual(alone.result);
    }
  });

  const STANDINS: readonly (readonly [string, string])[] = [
    ["workbench:execute", EXECUTE_GRANT],
    ["workbench:detach", "workbench:detach"],
    ["workbench:design", "workbench:design"],
    ["workbench:observe", "workbench:observe"],
    ["a longer spelling", "workbench:coordinate-all"],
    ["a plural", "workbench:coordinates"],
    ["a shorter spelling", "workbench:coordinat"],
    ["an abbreviation", "workbench:coord"],
    ["a sub-permission", "workbench:coordinate:read"],
    ["a capitalized permission", "workbench:Coordinate"],
    ["a capitalized namespace", "Workbench:coordinate"],
    ["upper case", "WORKBENCH:COORDINATE"],
    ["padded before", " workbench:coordinate"],
    ["padded after", "workbench:coordinate "],
    ["a line break after", "workbench:coordinate\n"],
    ["a namespace wildcard", "workbench:*"],
    ["a bare wildcard", "*"],
    ["the namespace alone", "workbench:"],
    ["the permission alone", "coordinate"],
    ["the permission under the namespace's colon", ":coordinate"],
    ["another namespace", "mechanical:coordinate"],
    ["a dot for the colon", "workbench.coordinate"],
    ["a prefixed namespace", "org.workbench:coordinate"],
    ["the empty string", ""],
  ];
  it.each(STANDINS)("G-STANDINS %s (%j): held in place of workbench:coordinate, alone and beside workbench:execute, refuses missing-coordination-grant with zero loader calls", async (label, grant) => {
    expect(await refusalOf({ grants: [grant] })).toEqual(refusedQuietly("grants missing-coordination-grant"));
    expect(await refusalOf({ grants: [EXECUTE_GRANT, grant] })).toEqual(refusedQuietly("grants missing-coordination-grant"));
    RAN.add(`G-STANDINS:${label}`);
  });
  it("G-STANDINS-EMPTY: an empty grant list refuses missing-coordination-grant with zero loader calls", async () => {
    expect(await refusalOf({ grants: [] })).toEqual(refusedQuietly("grants missing-coordination-grant"));
  });

  const UNKNOWN: readonly (readonly [string, () => unknown])[] = [
    ["no grant read (undefined)", () => undefined],
    ["null", () => null],
    ["the grant as a string", () => MECHANICAL_COORDINATION_GRANT],
    ["a number", () => 1],
    ["an array-like object", () => ({ 0: MECHANICAL_COORDINATION_GRANT, length: 1 })],
    ["an object holding the list", () => ({ grants: [MECHANICAL_COORDINATION_GRANT] })],
    ["a list holding a number", () => [1]],
    ["a list holding null", () => [null]],
    ["a list holding a list of the grant", () => [[MECHANICAL_COORDINATION_GRANT]]],
    ["the grant beside a number", () => [MECHANICAL_COORDINATION_GRANT, 2]],
    ["the grant beside an object", () => [MECHANICAL_COORDINATION_GRANT, {}]],
    [
      "a hole before the grant",
      () => {
        const grants: string[] = [];
        grants[1] = MECHANICAL_COORDINATION_GRANT;
        return grants;
      },
    ],
  ];
  it.each(UNKNOWN)("G-UNKNOWN %s: the grant read is unknown permission data, refused unknown-permission-data with zero loader calls", async (label, grants) => {
    expect(await refusalOf({ grants: grants() })).toEqual(refusedQuietly("grants unknown-permission-data"));
    RAN.add(`G-UNKNOWN:${label}`);
  });

  it("G-FIRST: a missing grant refuses before the pin, the descriptor, the schemas, the input or the artifact is read (no input getter runs, no loader call)", async () => {
    const trace = newTrace();
    const input = {
      get basis() {
        trace.counts.getters += 1;
        return { workspaceId: "demo", revision: "head-1" };
      },
    };
    const missing = scratch();
    const result = await invokeMechanicalCoordination({
      host: hostOf(trace, [EXECUTE_GRANT]),
      descriptorPath: join(missing, "absent.json"),
      schemaDirectory: join(missing, "absent"),
      artifactPath: join(missing, "absent.tgz"),
      artifactDigest: "not-a-digest",
      input,
      loader: async () => {
        trace.counts.loads += 1;
        return {};
      },
    });
    expect([readingOf(result), trace.counts.getters, trace.counts.loads, trace.counts.grants]).toEqual(["grants missing-coordination-grant", 0, 0, 1]);
  });
});

// ---- P: the pin -----------------------------------------------------------------------------------------------------------------

describe("P: the artifact pin is one sha256 digest", () => {
  const HEX = "ab".repeat(32);
  const PINS: readonly (readonly [string, (exact: string) => unknown])[] = [
    ["undefined", () => undefined],
    ["null", () => null],
    ["a number", () => 1],
    ["an object holding the digest", exact => ({ artifactDigest: exact })],
    ["a list of the digest", exact => [exact]],
    ["the bare hex", exact => exact.slice("sha256:".length)],
    ["upper-case hex", exact => `sha256:${exact.slice("sha256:".length).toUpperCase()}`],
    ["63 digits", () => `sha256:${HEX.slice(1)}`],
    ["65 digits", () => `sha256:${HEX}a`],
    ["a sha512: prefix", () => `sha512:${HEX}`],
    ["padded before", exact => ` ${exact}`],
    ["a line break after", exact => `${exact}\n`],
    ["the empty string", () => ""],
  ];
  it.each(PINS)("P-1 an artifact pin %s refuses pin-malformed with zero loader calls", async (label, pin) => {
    expect(await refusalOf({ pin })).toEqual(refusedQuietly("pin pin-malformed"));
    RAN.add(`P-1:${label}`);
  });
});

// ---- D and S: only the reviewed descriptor and schemas (EAT-R071) ----------------------------------------------------------------

describe("D and S: EAT-R071 - only the reviewed descriptor and schema bytes, so only the reviewed export", () => {
  it("D-READ: a missing descriptor path refuses unreadable; a directory and a FIFO refuse not-a-file; each with zero loader calls", async () => {
    expect(await refusalOf({ descriptorPath: layout => join(layout.dir, "absent.json") })).toEqual(refusedQuietly("descriptor unreadable"));
    expect(await refusalOf({ descriptorPath: layout => layout.dir })).toEqual(refusedQuietly("descriptor not-a-file"));
    expect(await refusalOf({ descriptorPath: layout => mkfifo(join(layout.dir, "descriptor.fifo")) })).toEqual(refusedQuietly("descriptor not-a-file"));
  });

  const DIGEST: readonly (readonly [string, string | Uint8Array])[] = [
    ["the producer JSON with one more line break", `${DESCRIPTOR_TEXT}\n`],
    ["the producer JSON compacted", JSON.stringify(PRODUCER_OBJECT)],
    ["the producer bytes after a UTF-8 byte order mark", Buffer.concat([Uint8Array.from([0xef, 0xbb, 0xbf]), DESCRIPTOR_BYTES])],
    ["the development descriptor", DEVELOPMENT_DESCRIPTOR_BYTES],
    ["another schema version", rendered(withMember("schema", "mechanical-workflows/entrypoint/v2"))],
    ["another id", rendered(withMember("id", "mechanical.coordination.other.v1"))],
    ["another package", rendered(withImplementation(implementation => ({ ...implementation, package: "@mechanical/workflows-development" })))],
    ["another export", rendered(withExport("digest"))],
    ["the output schema as the input schema", rendered(withMember("inputSchema", MECHANICAL_COORDINATION_ENTRY.outputSchema))],
    ["the input schema as the output schema", rendered(withMember("outputSchema", MECHANICAL_COORDINATION_ENTRY.inputSchema))],
    ["a binding", rendered(withMember("bindings", ["discover"]))],
    ["another status", rendered(withMember("status", "invocable"))],
    ["an empty note", rendered(withMember("note", ""))],
    ["the note left out", rendered(without("note"))],
    ["an extra member", rendered(withMember("extra", 1))],
    ["the id left out", rendered(without("id"))],
    ["an extra implementation member", rendered(withImplementation(implementation => ({ ...implementation, version: "0.1.0" })))],
    ["the export left out", rendered(withImplementation(implementation => ({ package: implementation.package ?? null })))],
    ["an empty object", "{}\n"],
  ];
  it.each(DIGEST)("D-DIGEST %s: not the reviewed bytes, refused descriptor digest-mismatch with zero loader calls", async (label, descriptor) => {
    expect(await refusalOf({ descriptor })).toEqual(refusedQuietly("descriptor digest-mismatch"));
    RAN.add(`D-DIGEST:${label}`);
  });

  const NEAR_EXPORTS: readonly Json[] = ["Reconcile", "RECONCILE", "reconcile ", " reconcile", "reconcil", "reconcileAll", "reconcile2", "default", "*", "", "__proto__", "constructor"];
  it("D-EXPORT: the producer descriptor naming each of the 16 other value exports of the coordination package, or each of 12 near spellings of reconcile, as its export refuses descriptor digest-mismatch with zero loader calls and no export called (the mutant 'allow arbitrary coordination exports')", async () => {
    expect([OTHER_EXPORTS.length, new Set(OTHER_EXPORTS).size, OTHER_EXPORTS.includes(MECHANICAL_COORDINATION_ENTRY.export), NEAR_EXPORTS.length]).toEqual([16, 16, false, 12]);
    const readings: string[] = [];
    let calls = 0;
    for (const name of [...OTHER_EXPORTS, ...NEAR_EXPORTS]) {
      const outcome = await refusalOf({ descriptor: rendered(withExport(name)) });
      readings.push(outcome.reading);
      calls += outcome.loads + outcome.reconcile + outcome.others + outcome.effects;
    }
    expect([readings.length, new Set(readings), calls]).toEqual([28, new Set(["descriptor digest-mismatch"]), 0]);
  });

  it("S-READ: a missing schema directory or input schema file refuses inputSchema unreadable, a missing output schema file outputSchema unreadable; a directory or a FIFO in a schema file's place refuses not-a-file; each with zero loader calls", async () => {
    expect(await refusalOf({ schemaDirectory: layout => join(layout.dir, "absent") })).toEqual(refusedQuietly("inputSchema unreadable"));
    expect(await refusalOf({ arrange: layout => unlinkSync(layout.inputSchema) })).toEqual(refusedQuietly("inputSchema unreadable"));
    expect(await refusalOf({ arrange: layout => unlinkSync(layout.outputSchema) })).toEqual(refusedQuietly("outputSchema unreadable"));
    expect(
      await refusalOf({
        arrange: layout => {
          unlinkSync(layout.inputSchema);
          mkdirSync(layout.inputSchema);
        },
      }),
    ).toEqual(refusedQuietly("inputSchema not-a-file"));
    expect(
      await refusalOf({
        arrange: layout => {
          unlinkSync(layout.outputSchema);
          mkfifo(layout.outputSchema);
        },
      }),
    ).toEqual(refusedQuietly("outputSchema not-a-file"));
  });

  const opened = renderedOf(INPUT_SCHEMA, schema => ({ ...schema, additionalProperties: true }));
  const widened = renderedOf(OUTPUT_SCHEMA, schema =>
    setAt(schema, ["$defs", "admittedIntent", "properties", "authority", "enum"], ["propose-only", "authorized-effect"]),
  );
  const SCHEMA_DIGEST: readonly (readonly [string, Plant, string])[] = [
    ["the input schema with one more line break", { inputSchema: `${INPUT_SCHEMA_BYTES.toString("utf8")}\n` }, "inputSchema digest-mismatch"],
    ["the output schema with one more line break", { outputSchema: `${OUTPUT_SCHEMA_BYTES.toString("utf8")}\n` }, "outputSchema digest-mismatch"],
    ["the output schema in the input schema's place", { inputSchema: OUTPUT_SCHEMA_BYTES }, "inputSchema digest-mismatch"],
    ["the input schema in the output schema's place", { outputSchema: INPUT_SCHEMA_BYTES }, "outputSchema digest-mismatch"],
    ["the input schema with its root object opened", { inputSchema: opened }, "inputSchema digest-mismatch"],
    ["the output schema letting an admitted intent declare authorized-effect", { outputSchema: widened }, "outputSchema digest-mismatch"],
  ];
  it.each(SCHEMA_DIGEST)("S-DIGEST %s: not the reviewed bytes, refused with zero loader calls", async (label, p, reading) => {
    expect(await refusalOf(p)).toEqual(refusedQuietly(reading));
    RAN.add(`S-DIGEST:${label}`);
  });
});

// ---- I: serialized schema data only (EAT-R071) ---------------------------------------------------------------------------------

describe("I: EAT-R071 - only serialized data valid against the published input schema", () => {
  class PlantedValue {
    readonly value = 1;
  }
  class Listed extends Array<number> {}
  const memoryOf = (memory: unknown): unknown => {
    const input = validInput();
    (input.proposals as JsonRecord[])[0] = { ...((input.proposals as JsonRecord[])[0] as JsonRecord), memory: memory as Json };
    return input;
  };
  const shared = (): unknown => {
    const memory = { shared: true };
    const input = validInput() as Record<string, unknown>;
    const proposals = input.proposals as Record<string, unknown>[];
    for (const proposal of proposals) proposal.memory = memory;
    return input;
  };
  const sharedClaim = (): unknown => {
    const claim = claimOf();
    return inputOf(proposalOf(intentOf("a", { claim }), intentOf("b", { claim })));
  };
  const cycle = (): unknown => {
    const memory: Record<string, unknown> = {};
    memory.self = memory;
    return memoryOf(memory);
  };
  const getterTrace = { reads: 0 };
  const DATA: readonly (readonly [string, () => unknown])[] = [
    ["the input itself a function", () => () => validInput()],
    ["a function as memory", () => memoryOf(() => 1)],
    ["a function as an intent's target uri", () => setAt(validInput(), ["proposals", 0, "intents", 0, "target", "uri"], () => "cand:a")],
    ["a function as a trace detail", () => setAt(validInput(), ["proposals", 0, "trace", 0, "detail"], () => "x")],
    ["a function as a list's second element", () => memoryOf([0, () => 1])],
    ["a function as an extra top-level member", () => ({ ...validInput(), extra: () => 1 })],
    ["an own toJSON function", () => memoryOf({ toJSON: () => ({}) })],
    ["a symbol", () => memoryOf(Symbol("memory"))],
    ["a bigint", () => memoryOf(1n)],
    ["undefined as a member value", () => memoryOf(undefined)],
    ["NaN", () => setAt(validInput(), ["budget", "compute"], Number.NaN)],
    ["an infinity", () => setAt(validInput(), ["budget", "latencyMs"], Number.POSITIVE_INFINITY)],
    ["a negative infinity", () => memoryOf(Number.NEGATIVE_INFINITY)],
    [
      "an accessor member",
      () =>
        memoryOf(
          Object.defineProperty({}, "value", {
            enumerable: true,
            get: () => {
              getterTrace.reads += 1;
              return getterTrace.reads;
            },
          }),
        ),
    ],
    ["a non-enumerable member", () => memoryOf(Object.defineProperty({}, "hidden", { enumerable: false, value: 1 }))],
    ["a symbol-keyed member", () => memoryOf({ [Symbol("key")]: 1 })],
    [
      "a hole in a list",
      () => {
        const holed: number[] = [];
        holed[0] = 1;
        holed[2] = 3;
        return memoryOf(holed);
      },
    ],
    ["an extra member on a list", () => memoryOf(Object.assign([1, 2], { extra: 3 }))],
    ["a list subclass", () => memoryOf(Listed.from([1, 2]))],
    ["a Date", () => memoryOf(new Date(0))],
    ["a Map", () => memoryOf(new Map([["k", 1]]))],
    ["a boxed string", () => memoryOf(new String("memory"))],
    ["a byte array", () => memoryOf(Uint8Array.from([1]))],
    ["a class instance", () => memoryOf(new PlantedValue())],
    ["one container shared by two proposals", shared],
    ["one claim shared by two intents", sharedClaim],
    ["a cycle", cycle],
  ];
  it.each(DATA)("I-DATA %s: refused input not-serialized-data with zero loader calls and no getter run (the six function rows and the own toJSON are the 'callable inputs')", async (label, input) => {
    getterTrace.reads = 0;
    expect(await refusalOf({ input: input() })).toEqual(refusedQuietly("input not-serialized-data"));
    expect(getterTrace.reads).toBe(0);
    RAN.add(`I-DATA:${label}`);
  });

  const DATA_OK: readonly (readonly [string, () => unknown])[] = [
    ["memory null", () => memoryOf(null)],
    ["memory a number", () => memoryOf(-1.5)],
    ["memory a string", () => memoryOf("memory")],
    ["memory a boolean", () => memoryOf(true)],
    ["memory an empty list", () => memoryOf([])],
    ["memory a nested record", () => memoryOf({ a: [1, "b", null, { c: [true] }] })],
    ["memory a null-prototype record", () => memoryOf(Object.assign(Object.create(null) as object, { a: 1 }))],
    ["a frozen input", () => Object.freeze(validInput())],
    ["the input through a JSON round trip of a shared claim", () => JSON.parse(JSON.stringify(sharedClaim()))],
  ];
  it.each(DATA_OK)("I-DATA-OK %s: serialized data, admitted", async (label, input) => {
    await admittedOf({ input: input() });
    RAN.add(`I-DATA-OK:${label}`);
  });

  it(`I-DEPTH: containers nested ${MECHANICAL_COORDINATION_MAX_DEPTH} deep are admitted and one deeper refused not-serialized-data, in the input and in the resolution`, async () => {
    expect(MECHANICAL_COORDINATION_MAX_DEPTH).toBe(64);
    const nest = (levels: number): unknown => {
      let value: unknown = 0;
      for (let level = 0; level < levels; level += 1) value = [value];
      return value;
    };
    // The input is container 1, proposals 2, a proposal 3, so memory may nest 61 more.
    await admittedOf({ input: memoryOf(nest(MECHANICAL_COORDINATION_MAX_DEPTH - 3)) });
    expect(await refusalOf({ input: memoryOf(nest(MECHANICAL_COORDINATION_MAX_DEPTH - 2)) })).toEqual(refusedQuietly("input not-serialized-data"));
    // The resolution is container 1, so an extra member may nest 63 more: then the schema refuses it, one deeper the data rule.
    const deep = (levels: number) => (input: unknown): unknown => ({ ...(standIn(input) as JsonRecord), extra: nest(levels) as Json });
    expect(readingOf((await plant({ produce: deep(MECHANICAL_COORDINATION_MAX_DEPTH - 1) })).result)).toBe("resolution schema-invalid");
    expect(readingOf((await plant({ produce: deep(MECHANICAL_COORDINATION_MAX_DEPTH) })).result)).toBe("resolution not-serialized-data");
  });

  const P0 = ["proposals", 0] as const;
  const I0 = ["proposals", 0, "intents", 0] as const;
  /** The input schema's required members, read from the producer's schema file (the outside anchor). */
  const PRODUCER_INPUT_SCHEMA = INPUT_SCHEMA as unknown as { required: string[]; $defs: { intent: { required: string[] } } };
  const SCHEMA_ROWS: readonly (readonly [string, () => unknown])[] = [
    ...PRODUCER_INPUT_SCHEMA.required.map(name => [`without ${name}`, () => deleteAt(validInput(), [name])] as const),
    ["an extra top-level member", () => ({ ...validInput(), extra: 1 })],
    ["the input a list", () => []],
    ["the input a string", () => "input"],
    ["the input null", () => null],
    ["the input a number", () => 1],
    ["an empty workspaceId", () => setAt(validInput(), ["basis", "workspaceId"], "")],
    ["an empty revision", () => setAt(validInput(), ["basis", "revision"], "")],
    ["a number workspaceId", () => setAt(validInput(), ["basis", "workspaceId"], 1)],
    ["a basis without revision", () => deleteAt(validInput(), ["basis", "revision"])],
    ["an extra basis member", () => setAt(validInput(), ["basis", "branch"], "main")],
    ["a negative compute budget", () => setAt(validInput(), ["budget", "compute"], -1)],
    ["a fractional negative workers budget", () => setAt(validInput(), ["budget", "workers"], -0.5)],
    ["a string queue budget", () => setAt(validInput(), ["budget", "queue"], "1")],
    ["a budget without latencyMs", () => deleteAt(validInput(), ["budget", "latencyMs"])],
    ["an extra budget dimension", () => setAt(validInput(), ["budget", "gpus"], 1)],
    ["protectedScopes a string", () => setAt(validInput(), ["protectedScopes"], "actor:*")],
    ["protectedScopes holding a number", () => setAt(validInput(), ["protectedScopes"], [1])],
    ["proposals an object", () => setAt(validInput(), ["proposals"], {})],
    ["a proposal without intents", () => deleteAt(validInput(), [...P0, "intents"])],
    ["a proposal without memory", () => deleteAt(validInput(), [...P0, "memory"])],
    ["a proposal without trace", () => deleteAt(validInput(), [...P0, "trace"])],
    ["an extra proposal member", () => setAt(validInput(), [...P0, "score"], 1)],
    ["intents an object", () => setAt(validInput(), [...P0, "intents"], {})],
    ["a trace event without detail", () => deleteAt(validInput(), [...P0, "trace", 0, "detail"])],
    ["an extra trace event member", () => setAt(validInput(), [...P0, "trace", 0, "at"], 1)],
    ["a number trace kind", () => setAt(validInput(), [...P0, "trace", 0, "kind"], 1)],
    ...PRODUCER_INPUT_SCHEMA.$defs.intent.required.map(name => [`an intent without ${name}`, () => deleteAt(validInput(), [...I0, name])] as const),
    ["an extra intent member", () => setAt(validInput(), [...I0, "command"], "bd close wb-1")],
    ["an empty intentId", () => setAt(validInput(), [...I0, "intentId"], "")],
    ["an empty policyId", () => setAt(validInput(), [...I0, "policyId"], "")],
    ["a target without uri", () => deleteAt(validInput(), [...I0, "target", "uri"])],
    ["an extra target member", () => setAt(validInput(), [...I0, "target", "argv"], ["bd", "close"])],
    ["a number target kind", () => setAt(validInput(), [...I0, "target", "kind"], 1)],
    ["a number expectedRevision", () => setAt(validInput(), [...I0, "expectedRevision"], 1)],
    ["a number effect", () => setAt(validInput(), [...I0, "effect"], 1)],
    ["a negative claim", () => setAt(validInput(), [...I0, "claim", "compute"], -1)],
    ["a claim without compute", () => deleteAt(validInput(), [...I0, "claim", "compute"])],
    ["evidenceRefs holding a number", () => setAt(validInput(), [...I0, "evidenceRefs"], [1])],
    ["writeScopes a string", () => setAt(validInput(), [...I0, "writeScopes"], "main")],
    ["readScopes holding null", () => setAt(validInput(), [...I0, "readScopes"], [null])],
    ["an authority execute", () => setAt(validInput(), [...I0, "authority"], "execute")],
    ["an authority Propose-Only", () => setAt(validInput(), [...I0, "authority"], "Propose-Only")],
    ["an authority propose-only padded", () => setAt(validInput(), [...I0, "authority"], "propose-only ")],
    ["an empty authority", () => setAt(validInput(), [...I0, "authority"], "")],
    ["a number authority", () => setAt(validInput(), [...I0, "authority"], 1)],
    ["a null authority", () => setAt(validInput(), [...I0, "authority"], null)],
  ];
  it.each(SCHEMA_ROWS)("I-SCHEMA %s: refused input schema-invalid with zero loader calls", async (label, input) => {
    expect(await refusalOf({ input: input() })).toEqual(refusedQuietly("input schema-invalid"));
    RAN.add(`I-SCHEMA:${label}`);
  });

  const SCHEMA_OK: readonly (readonly [string, () => unknown])[] = [
    ["an intent declaring propose-only", () => setAt(validInput(), [...I0, "authority"], "propose-only")],
    ["no proposals", () => inputOf()],
    ["no protected scopes", () => setAt(validInput(), ["protectedScopes"], [])],
    ["a zero budget", () => setAt(validInput(), ["budget"], { compute: 0, workers: 0, queue: 0, latencyMs: 0 })],
    ["a fractional budget", () => setAt(validInput(), ["budget", "compute"], 2.5)],
    ["an empty trace", () => setAt(validInput(), [...P0, "trace"], [])],
    ["empty target texts", () => setAt(validInput(), [...I0, "target"], { kind: "", uri: "" })],
  ];
  it.each(SCHEMA_OK)("I-SCHEMA-OK %s: valid against the published input schema, admitted", async (label, input) => {
    await admittedOf({ input: input() });
    RAN.add(`I-SCHEMA-OK:${label}`);
  });
});

// ---- A and L: the exact packed artifact and the loader -------------------------------------------------------------------------

describe("A and L: EAT-R071 - the exact pinned artifact bytes, loaded once, its reviewed export only", () => {
  it("A-READ: a missing artifact path refuses unreadable; a directory and a FIFO refuse not-a-file; each with zero loader calls", async () => {
    expect(await refusalOf({ artifactPath: layout => join(layout.dir, "absent.tgz") })).toEqual(refusedQuietly("artifact unreadable"));
    expect(await refusalOf({ artifactPath: layout => layout.dir })).toEqual(refusedQuietly("artifact not-a-file"));
    expect(await refusalOf({ artifactPath: layout => mkfifo(join(layout.dir, "artifact.fifo")) })).toEqual(refusedQuietly("artifact not-a-file"));
  });

  it("A-DIGEST: one byte flipped after the pin was taken, and the descriptor's digest as the artifact pin, refuse artifact digest-mismatch with zero loader calls", async () => {
    const flipped = Buffer.from(ARTIFACT_TEXT, "utf8");
    flipped[0] = (flipped[0] ?? 0) ^ 0x01;
    expect(await refusalOf({ artifact: flipped, pin: () => digestOf(ARTIFACT_TEXT) })).toEqual(refusedQuietly("artifact digest-mismatch"));
    expect(await refusalOf({ pin: () => MECHANICAL_COORDINATION_REVIEWED_DIGESTS.descriptor })).toEqual(refusedQuietly("artifact digest-mismatch"));
  });

  it("L-1: the loader runs once with the reviewed entry and the exact bytes it measured with their digest, frozen; only reconcile is called, once", async () => {
    const { trace, artifactBytes, pin } = await admittedOf({});
    expect(trace.loads).toHaveLength(1);
    const [load] = trace.loads;
    expect(load?.entry).toBe(MECHANICAL_COORDINATION_ENTRY);
    expect([load?.artifact.digest, Buffer.from(load?.artifact.bytes ?? []).equals(artifactBytes), Object.isFrozen(load?.artifact), Object.keys(load?.artifact ?? {})]).toEqual([pin, true, true, ["digest", "bytes"]]);
  });

  it("L-1b: the same bytes under another file name are admitted (the pin is over bytes, not the name)", async () => {
    await admittedOf({
      artifactPath: layout => {
        const other = join(layout.dir, "elsewhere", "renamed.bin");
        write(other, readFileSync(layout.artifact));
        return other;
      },
    });
  });

  const reconcileOf = (recording: Record<string, unknown>): unknown => recording[MECHANICAL_COORDINATION_ENTRY.export];
  const EXPORTS: readonly (readonly [string, string, (recording: Record<string, unknown>) => unknown])[] = [
    ["an empty object", "loaded export-missing", () => ({})],
    ["reconcile a string", "loaded export-missing", () => ({ reconcile: "reconcile" })],
    ["reconcile a number", "loaded export-missing", () => ({ reconcile: 1 })],
    ["reconcile an object", "loaded export-missing", () => ({ reconcile: {} })],
    ["reconcile null", "loaded export-missing", () => ({ reconcile: null })],
    ["reconcile inherited", "loaded export-missing", recording => Object.create({ reconcile: reconcileOf(recording) }) as object],
    ["reconcile under default", "loaded export-missing", recording => ({ default: recording })],
    ["null", "loaded export-missing", () => null],
    ["undefined", "loaded export-missing", () => undefined],
    ["a string", "loaded export-missing", () => "reconcile"],
    ["a function holding reconcile", "admitted", recording => Object.assign(() => undefined, { reconcile: reconcileOf(recording) })],
    ["a frozen object", "admitted", recording => Object.freeze({ ...recording })],
    ["a null-prototype object", "admitted", recording => Object.assign(Object.create(null) as object, recording)],
  ];
  it.each(EXPORTS)("L-EXPORT a loader result %s reads %s; no other export is called", async (label, reading, namespace) => {
    const { result, trace } = await plant({ namespace });
    expect([readingOf(result), trace.counts.loads, trace.counts.others, trace.counts.effects]).toEqual([reading, 1, 0, 0]);
    expect(trace.counts.reconcile).toBe(reading === "admitted" ? 1 : 0);
    RAN.add(`L-EXPORT:${label}`);
  });

  it("L-EXPORT-ACCESSOR: a reconcile accessor is not read: its getter never runs and the call refuses loaded export-missing", async () => {
    let reads = 0;
    const { result, trace } = await plant({
      namespace: recording =>
        Object.defineProperty({}, "reconcile", {
          enumerable: true,
          get: () => {
            reads += 1;
            return recording.reconcile;
          },
        }),
    });
    expect([readingOf(result), reads, trace.counts.reconcile]).toEqual(["loaded export-missing", 0, 0]);
  });

  it("L-THROWS: a loader that rejects or throws, and a reconcile that throws, propagate their own error after one call, never retried", async () => {
    const failure = new Error("planted loader failure");
    const loaders = [
      async () => Promise.reject(failure),
      () => {
        throw failure;
      },
    ];
    for (const loader of loaders) {
      let calls = 0;
      await expect(
        plant({
          loader: () => {
            calls += 1;
            return loader();
          },
        }),
      ).rejects.toBe(failure);
      expect(calls).toBe(1);
    }
    const thrown = new Error("planted reconcile failure");
    let produced = 0;
    await expect(
      plant({
        produce: () => {
          produced += 1;
          throw thrown;
        },
      }),
    ).rejects.toBe(thrown);
    expect(produced).toBe(1);
  });
});

// ---- R and O: the round-trip proposal ---------------------------------------------------------------------------------------------

describe("R and O: EAT-R071 - valid schema data in, the round-trip proposal out", () => {
  it("R-ROUNDTRIP: the observation holds the entry id, observation-only, the reviewed descriptor digest, the artifact pin and the producer's resolution; it is frozen through every level and round-trips through JSON text", async () => {
    const { result, pin, input, trace } = await admittedOf({});
    if (!result.ok) throw new Error("unreachable: admitted above");
    const { observation } = result;
    expect(observation.resolution).toEqual(trace.produced[0]);
    expect(Object.keys(observation)).toEqual(["entry", "authority", "descriptorDigest", "artifactDigest", "resolution"]);
    expect([observation.entry, observation.authority, observation.descriptorDigest, observation.artifactDigest]).toEqual([
      MECHANICAL_COORDINATION_ENTRY.id,
      "observation-only",
      digestOf(DESCRIPTOR_BYTES),
      pin,
    ]);
    expect(MECHANICAL_COORDINATION_AUTHORITY).toBe("observation-only");
    expect(observation.resolution).toEqual(expectedResolutionOf(input));
    expect(JSON.parse(JSON.stringify(observation))).toEqual(observation);
    expect(inert(observation)).toBe(true);
  });

  it("R-ROUNDTRIP-COPIES: reconcile receives a JSON copy of the input, so a producer that mutates its argument or its returned value changes neither the caller's input nor the observation", async () => {
    const input = validInput();
    const snapshot = structuredClone(input);
    let returned: Record<string, unknown> = {};
    let argumentAsReceived: unknown;
    const { result, trace } = await admittedOf({
      input,
      produce: argument => {
        argumentAsReceived = structuredClone(argument);
        returned = standIn(argument) as Record<string, unknown>;
        const mutable = argument as Record<string, unknown>;
        mutable.proposals = [];
        (mutable.basis as Record<string, unknown>).revision = "mutated";
        return returned;
      },
    });
    expect(trace.received[0]).not.toBe(input);
    expect(argumentAsReceived).toEqual(snapshot);
    expect(input).toEqual(snapshot);
    returned.admitted = [];
    if (!result.ok) throw new Error("unreachable: admitted above");
    expect(result.observation.resolution).toEqual(expectedResolutionOf(snapshot));
    expect(result.observation.resolution).not.toBe(trace.produced[0]);
  });

  const asyncProducer = async (input: unknown): Promise<unknown> => standIn(input);
  const editOutput = (edit: (resolution: JsonRecord) => unknown) => (input: unknown): unknown => edit(standIn(input) as JsonRecord);
  const OUTPUT_DATA: readonly (readonly [string, (input: unknown) => unknown])[] = [
    ["a promise of the resolution (an async reconcile)", asyncProducer],
    ["a function", () => () => undefined],
    ["undefined", () => undefined],
    ["an own toJSON function", editOutput(resolution => ({ ...resolution, toJSON: () => ({}) }))],
    ["an accessor member", editOutput(resolution => Object.defineProperty({ ...resolution }, "extra", { enumerable: true, get: () => 1 }))],
    ["a Date member", editOutput(resolution => ({ ...resolution, budgetUsed: new Date(0) }))],
    ["the budget object reused as budgetUsed", editOutput(resolution => ({ ...resolution, budgetUsed: resolution.budget }))],
    [
      "a cycle",
      editOutput(resolution => {
        const cyclic: Record<string, unknown> = { ...resolution };
        cyclic.self = cyclic;
        return cyclic;
      }),
    ],
    ["NaN in budgetUsed", editOutput(resolution => setAt(resolution, ["budgetUsed", "compute"], Number.NaN))],
    ["a class instance", () => new (class Resolution {})()],
  ];
  it.each(OUTPUT_DATA)("O-DATA the producer returns %s: refused resolution not-serialized-data, no effect", async (label, produce) => {
    const { result, trace } = await plant({ produce });
    expect([readingOf(result), trace.counts.reconcile, trace.counts.effects]).toEqual(["resolution not-serialized-data", 1, 0]);
    RAN.add(`O-DATA:${label}`);
  });

  /** The resolution schema's required members, read from the producer's schema file (the outside anchor). */
  const REQUIRED_OUTPUT = OUTPUT_SCHEMA.required as string[];
  const admittedIntentOf = (extra: JsonRecord) => editOutput(resolution => setAt(resolution, ["admitted", 0], { ...((resolution.admitted as JsonRecord[])[0] as JsonRecord), ...extra }));
  const rejectedOf = (row: JsonRecord) => editOutput(resolution => ({ ...resolution, rejected: [row] }));
  const OUTPUT_SCHEMA_ROWS: readonly (readonly [string, (input: unknown) => unknown])[] = [
    ...REQUIRED_OUTPUT.map(name => [`without ${name}`, editOutput(resolution => deleteAt(resolution, [name]))] as const),
    ["an extra member", editOutput(resolution => ({ ...resolution, applied: true }))],
    ["admitted an object", editOutput(resolution => ({ ...resolution, admitted: {} }))],
    ["an admitted intent without intentId", editOutput(resolution => deleteAt(resolution, ["admitted", 0, "intentId"]))],
    ["an admitted intent declaring authorized-effect", admittedIntentOf({ authority: "authorized-effect" })],
    ["an admitted intent with an extra member", admittedIntentOf({ command: "bd close wb-1" })],
    ["a rejection with an unknown code", rejectedOf({ intent: intentOf("r"), code: "INTENT_UNKNOWN", detail: "x" })],
    ["a rejection without detail", rejectedOf({ intent: intentOf("r"), code: "INTENT_DUPLICATE" })],
    ["a conflict without intentIds", editOutput(resolution => ({ ...resolution, conflicts: [{ scope: "main" }] }))],
    ["a conflict holding a number id", editOutput(resolution => ({ ...resolution, conflicts: [{ scope: "main", intentIds: [1] }] }))],
    ["a negative budgetUsed", editOutput(resolution => setAt(resolution, ["budgetUsed", "queue"], -1))],
    ["an empty basis workspaceId", editOutput(resolution => setAt(resolution, ["basis", "workspaceId"], ""))],
    ["a list", () => []],
    ["null", () => null],
    ["a string", () => "resolution"],
  ];
  it.each(OUTPUT_SCHEMA_ROWS)("O-SCHEMA the producer returns %s: refused resolution schema-invalid, no effect", async (label, produce) => {
    const { result, trace } = await plant({ produce });
    expect([readingOf(result), trace.counts.reconcile, trace.counts.effects]).toEqual(["resolution schema-invalid", 1, 0]);
    RAN.add(`O-SCHEMA:${label}`);
  });

  const ECHO: readonly (readonly [string, string, readonly string[], Json])[] = [
    ["another workspaceId", "resolution basis-mismatch", ["basis", "workspaceId"], "other"],
    ["another revision", "resolution basis-mismatch", ["basis", "revision"], "head-2"],
    ["another compute budget", "resolution budget-mismatch", ["budget", "compute"], 11],
    ["another workers budget", "resolution budget-mismatch", ["budget", "workers"], 5],
    ["another queue budget", "resolution budget-mismatch", ["budget", "queue"], 3],
    ["another latencyMs budget", "resolution budget-mismatch", ["budget", "latencyMs"], 999],
    ["another budgetUsed (not echoed)", "admitted", ["budgetUsed", "compute"], 9],
  ];
  it.each(ECHO)("O-ECHO a resolution with %s reads %s", async (label, reading, path, value) => {
    const { result } = await plant({ produce: editOutput(resolution => setAt(resolution, path, value)) });
    expect(readingOf(result)).toBe(reading);
    RAN.add(`O-ECHO:${label}`);
  });
});

// ---- X: observation until separately authorized (EAT-R072) -----------------------------------------------------------------------

describe("X: EAT-R072 - a coordination proposal is an observation, never an effect", () => {
  const actionInput = (): JsonRecord =>
    inputOf(
      proposalOf(intentOf("bd-close", { target: { kind: "beads", uri: "bd:wb-0001" }, effect: "close", writeScopes: ["beads:wb-0001"] })),
      proposalOf(intentOf("forge-publish", { target: { kind: "forge", uri: "forge:gate/default" }, effect: "publish", writeScopes: ["forge:gate"] })),
      proposalOf(intentOf("furnace-start", { target: { kind: "furnace", uri: "furnace:formula/land" }, effect: "start", writeScopes: ["furnace:run"] })),
    );
  const EXACT_EFFECT_GRANTS = [MECHANICAL_COORDINATION_GRANT, EXECUTE_GRANT, "workbench:detach", "beads:close", "forge:publish", "furnace:start"];

  it("X-NO-EFFECT: a resolution admitting a Beads close, a Forge publish and a Furnace start comes back as observation-only data, and with every provider handle and every exact effect grant planted no provider is called (the mutant 'auto-execute policy output as a command')", async () => {
    const { result, trace, input } = await admittedOf({ input: actionInput(), grants: EXACT_EFFECT_GRANTS });
    if (!result.ok) throw new Error("unreachable: admitted above");
    const admitted = result.observation.resolution.admitted as readonly { readonly target: { readonly kind: string }; readonly effect: string }[];
    expect(admitted.map(intent => `${intent.target.kind} ${intent.effect}`)).toEqual(["beads close", "forge publish", "furnace start"]);
    expect(Object.keys(EFFECT_HANDLES)).toEqual(admitted.map(intent => intent.target.kind));
    expect([result.observation.authority, trace.counts.effects, trace.counts.others, inert(result.observation)]).toEqual(["observation-only", 0, 0, true]);
    expect(result.observation.resolution).toEqual(expectedResolutionOf(input));
  });

  it("X-AUTHORIZED: an input intent declaring authorized-effect passes the input schema, and the producer's rejection comes back as data; a producer admitting one is refused resolution schema-invalid; neither calls a provider", async () => {
    const input = setAt(actionInput(), ["proposals", 0, "intents", 0, "authority"], "authorized-effect");
    const { result, trace } = await admittedOf({ input, grants: EXACT_EFFECT_GRANTS });
    if (!result.ok) throw new Error("unreachable: admitted above");
    const rejected = result.observation.resolution.rejected as readonly { readonly intent: { readonly intentId: string }; readonly code: string }[];
    expect(rejected.map(row => `${row.intent.intentId} ${row.code}`)).toEqual(["bd-close INTENT_AUTHORITY_EXCEEDED"]);
    expect(trace.counts.effects).toBe(0);
    const admitting = (argument: unknown): unknown => {
      const resolution = standIn(argument) as JsonRecord;
      const [first] = resolution.rejected as JsonRecord[];
      return { ...resolution, admitted: [...(resolution.admitted as Json[]), first?.intent ?? null], rejected: [] };
    };
    const refusedCall = await plant({ input, grants: EXACT_EFFECT_GRANTS, produce: admitting });
    expect([readingOf(refusedCall.result), refusedCall.trace.counts.effects]).toEqual(["resolution schema-invalid", 0]);
  });

  it("X-SURFACE: the module's only function export is invokeMechanicalCoordination: nothing takes an observation to apply it", () => {
    expect(Object.entries(coordination).flatMap(([name, value]) => (typeof value === "function" ? [name] : []))).toEqual(["invokeMechanicalCoordination"]);
  });

  it("X-IMPORTS: the module imports exactly createHash, the fs constants, open (and the FileHandle type), join and the descriptor boundary's digest grammar, with no dynamic import or require", () => {
    const text = readFileSync(new URL("../src/workbench/mechanical-coordination.ts", import.meta.url), "utf8");
    const source = ts.createSourceFile("mechanical-coordination.ts", text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
    const imports: string[] = [];
    let computed = 0;
    const visit = (node: ts.Node): void => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const bindings = node.importClause?.namedBindings;
        const names = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => `${element.isTypeOnly ? "type " : ""}${element.name.text}`) : ["(other form)"];
        imports.push(`${node.moduleSpecifier.text}: ${names.join(", ")}`);
      }
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) computed += 1;
      ts.forEachChild(node, visit);
    };
    visit(source);
    expect([imports, computed]).toEqual([
      ["node:crypto: createHash", "node:fs: constants", "node:fs/promises: type FileHandle, open", "node:path: join", "./mechanical-descriptor.js: MECHANICAL_DIGEST_PATTERN"],
      0,
    ]);
  });
});

// ---- C-ORDER: the first refusal wins ---------------------------------------------------------------------------------------------

describe("C-ORDER: the steps judge in the header's order and the first refusal wins", () => {
  const notData = (): unknown => ({ ...validInput(), extra: () => 1 });
  const absentSchemas = (layout: Layout): string => join(layout.dir, "absent");
  const ORDER: readonly (readonly [string, string, Plant])[] = [
    ["no grant, a malformed pin", "grants missing-coordination-grant", { grants: [], pin: () => null }],
    ["unknown permission data, a malformed pin", "grants unknown-permission-data", { grants: null, pin: () => null }],
    ["a malformed pin, a missing descriptor", "pin pin-malformed", { pin: () => null, descriptorPath: layout => join(layout.dir, "absent.json") }],
    ["a missing descriptor, a missing schema directory", "descriptor unreadable", { descriptorPath: layout => join(layout.dir, "absent.json"), schemaDirectory: absentSchemas }],
    ["a descriptor digest mismatch, a missing schema directory", "descriptor digest-mismatch", { descriptor: rendered(withExport("digest")), schemaDirectory: absentSchemas }],
    ["a missing input schema, a byte-different output schema", "inputSchema unreadable", { arrange: layout => unlinkSync(layout.inputSchema), outputSchema: INPUT_SCHEMA_BYTES }],
    ["a byte-different input schema, a byte-different output schema", "inputSchema digest-mismatch", { inputSchema: OUTPUT_SCHEMA_BYTES, outputSchema: INPUT_SCHEMA_BYTES }],
    ["a byte-different output schema, input that is not data", "outputSchema digest-mismatch", { outputSchema: INPUT_SCHEMA_BYTES, input: notData() }],
    ["input that is not data, a missing artifact", "input not-serialized-data", { input: notData(), artifactPath: layout => join(layout.dir, "absent.tgz") }],
    ["schema-invalid input, an artifact digest mismatch", "input schema-invalid", { input: { ...validInput(), extra: 1 }, pin: () => MECHANICAL_COORDINATION_REVIEWED_DIGESTS.descriptor }],
    ["an artifact digest mismatch, a namespace without reconcile", "artifact digest-mismatch", { pin: () => MECHANICAL_COORDINATION_REVIEWED_DIGESTS.descriptor, namespace: () => ({}) }],
    ["a schema-invalid resolution with another basis", "resolution schema-invalid", { produce: input => ({ ...(standIn(input) as JsonRecord), basis: { workspaceId: "other", revision: "head-1" }, extra: 1 }) }],
    ["another basis, another budget", "resolution basis-mismatch", { produce: input => ({ ...(standIn(input) as JsonRecord), basis: { workspaceId: "other", revision: "head-1" }, budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1 } }) }],
  ];
  it.each(ORDER)("C-ORDER %s reads %s", async (label, reading, p) => {
    expect(readingOf((await plant(p)).result)).toBe(reading);
    RAN.add(`C-ORDER:${label}`);
  });

  it("C-TALLY: every table row above ran, and the refusal pairs this suite observed are exactly the closed list below, each field and reason from the vocabulary", () => {
    const tables: Readonly<Record<string, number>> = {
      "G-STANDINS": 24, "G-UNKNOWN": 12, "P-1": 13, "D-DIGEST": 19, "S-DIGEST": 6, "I-DATA": 27, "I-DATA-OK": 9, "I-SCHEMA": 58, "I-SCHEMA-OK": 7,
      "L-EXPORT": 13, "O-DATA": 10, "O-SCHEMA": 20, "O-ECHO": 7, "C-ORDER": 13,
    };
    const ranByTable: Record<string, number> = {};
    for (const key of RAN) {
      const table = key.slice(0, key.indexOf(":"));
      ranByTable[table] = (ranByTable[table] ?? 0) + 1;
    }
    expect(ranByTable).toEqual(tables);
    expect([...OBSERVED_PAIRS].sort()).toEqual([
      "artifact digest-mismatch", "artifact not-a-file", "artifact unreadable", "descriptor digest-mismatch", "descriptor not-a-file", "descriptor unreadable",
      "grants missing-coordination-grant", "grants unknown-permission-data", "input not-serialized-data", "input schema-invalid", "inputSchema digest-mismatch",
      "inputSchema not-a-file", "inputSchema unreadable", "loaded export-missing", "outputSchema digest-mismatch", "outputSchema not-a-file", "outputSchema unreadable",
      "pin pin-malformed", "resolution basis-mismatch", "resolution budget-mismatch", "resolution not-serialized-data", "resolution schema-invalid",
    ]);
    const fields: readonly string[] = MECHANICAL_COORDINATION_FIELDS;
    const reasons: readonly string[] = MECHANICAL_COORDINATION_REASONS;
    for (const pair of OBSERVED_PAIRS) {
      const [field, reason] = pair.split(" ");
      expect([fields.includes(field ?? ""), reasons.includes(reason ?? "")]).toEqual([true, true]);
    }
  });
});
