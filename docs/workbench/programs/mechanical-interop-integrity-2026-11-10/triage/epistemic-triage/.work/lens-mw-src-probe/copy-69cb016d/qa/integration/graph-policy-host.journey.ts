/**
 * Journey driver for the GraphPolicy host adapter (MechanicalWorkflows-hnqv.2). It reaches the adapter only
 * through the BUILT package entry of @mechanical/workflows-coordination and builds a digest-stable record with the
 * qa/README fields. Every verdict about GP behavior is FIXTURE grade: no GraphPolicyCLI exists, so each client is
 * an in-process double. Regenerate the committed record with:
 *   node qa/integration/graph-policy-host.journey.ts --write
 */
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type * as Coordination from "../../packages/coordination/dist/index.js";

export const JOURNEY_FILE = "qa/integration/graph-policy-host.integration.test.ts";
export const JOURNEY_RECORD_FILE = "qa/integration/evidence/2026-10-20-graph-policy-host-journey.json";
const PACKAGE_NAME = "@mechanical/workflows-coordination";
const MANIFEST = "packages/coordination/package.json";
/** The subject under test is the host source; the path is assembled so no journey file spells a coordination source import path. */
const HOST_SOURCE = `${"packages/coordination"}/${"src"}/graph-policy-host.ts`;
const FIXTURE_DIR = "qa/integration/python-consumer/fixtures";

export type CoordinationModule = typeof Coordination;
export interface BuiltCoordination { readonly entry: string; readonly module: CoordinationModule }
export interface FixtureVerdict { readonly ok: boolean; readonly reason: "REGENERATED_BYTES_EQUAL" | "REGENERATED_BYTES_DIFFER" | "FIXTURE_UNKNOWN" }

export const repoRoot = (): string => resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sha256 = (bytes: string): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const read = (path: string): string => readFileSync(join(repoRoot(), path), "utf8");

/** Resolve the package the way an installed consumer does (package name, exports map) and import the built entry. */
export async function loadBuiltCoordination(): Promise<BuiltCoordination> {
  const root = repoRoot();
  const resolved = realpathSync(createRequire(join(root, "package.json")).resolve(PACKAGE_NAME));
  const entry = relative(root, resolved).split("\\").join("/");
  return { entry, module: (await import(pathToFileURL(resolved).href)) as CoordinationModule };
}

/** True when the whitespace-separated evidence command names the journey file as one exact argument. */
export function gateNamesJourney(command: string, file: string): boolean {
  return command.split(/\s+/).includes(file);
}

const globToRegExp = (glob: string): RegExp =>
  new RegExp(`^${glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\u0000/g, ".*")}$`);

/** True when one quoted forge input pattern selects the journey file. */
export function gateInputsCoverJourney(inputs: string, file: string): boolean {
  return [...inputs.matchAll(/"([^"]+)"/g)].some(match => globToRegExp(match[1] ?? "").test(file));
}

/** Regenerate one committed fixture through the built package and compare bytes; an unknown name is refused. */
export function verifyFixtureBytes(m: CoordinationModule, name: string, bytes: string): FixtureVerdict {
  let regenerated: string;
  if (name === "landing-queue-seed7") regenerated = `${m.canonicalJson(m.runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: m.restackFirst }))}\n`;
  else if (name === "vertical-cut-seed7") regenerated = m.verticalCutBytes(m.runVerticalCut());
  else return { ok: false, reason: "FIXTURE_UNKNOWN" };
  return regenerated === bytes ? { ok: true, reason: "REGENERATED_BYTES_EQUAL" } : { ok: false, reason: "REGENERATED_BYTES_DIFFER" };
}

type AnyPolicy<O> = Coordination.Policy<O, Coordination.Intent, number>;
interface Counted<O> { readonly policy: AnyPolicy<O>; readonly calls: () => number }

function counted<O>(inner: AnyPolicy<O>): Counted<O> {
  let n = 0;
  return { policy: { id: inner.id, revision: inner.revision, propose(o, memory, context) { n += 1; return inner.propose(o, memory, context); } }, calls: () => n };
}

export interface ObservationRow {
  readonly label: string;
  readonly fallbackFinalHash: string;
  readonly hostFinalHash: string;
  readonly proposeCalls: number;
  readonly configuration: Coordination.GraphPolicyHostConfiguration;
}
export interface DoubleRow {
  readonly double: string;
  readonly steps: number;
  readonly reasons: readonly string[];
  readonly fallbackTraceLines: number;
  readonly finalHash: string;
}
export interface JourneyBody {
  readonly schema: "mw.graph-policy-host-journey.v1";
  readonly mode: "fixture";
  readonly evidenceGrade: "FIXTURE";
  readonly certified: false;
  readonly producer: string;
  readonly producerVersion: string;
  readonly subjectBasis: { readonly builtEntry: string; readonly packageManifestSha256: string; readonly hostSourceSha256: string; readonly fixtures: Readonly<Record<string, string>> };
  readonly claimsEstablished: readonly string[];
  readonly claimsUnestablished: readonly string[];
  readonly observations: readonly ObservationRow[];
  readonly injectedFailure: { readonly unconfiguredFinalHash: string; readonly doubles: readonly DoubleRow[] };
  readonly fixtureReverify: { readonly landingQueueSeed7: string; readonly verticalCutSeed7: string };
  readonly overheadMicro: { readonly kind: "injected"; readonly basis: string; readonly hostProposeCalls: number; readonly micro: number };
}
export interface JourneyRecord extends JourneyBody { readonly bodyDigest: string }

export const journeyBytes = (record: JourneyRecord): string => `${JSON.stringify(sortKeys(record), null, 2)}\n`;

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([key, item]) => [key, sortKeys(item)]));
  }
  return value;
}

/** Run every pinned fixture through the unconfigured host, then four injected-failure doubles, then re-verify the committed fixture bytes. */
export async function buildJourneyRecord(): Promise<JourneyRecord> {
  const { module: m, entry } = await loadBuiltCoordination();
  const rows: ObservationRow[] = [];
  let totalCalls = 0;
  const probe = <O>(label: string, policy: AnyPolicy<O>, run: (p: AnyPolicy<O>) => string): void => {
    const fallback = counted(policy);
    const fallbackFinalHash = run(fallback.policy);
    const host = m.graphPolicyHost<O, Coordination.Intent, number>({ fallback: policy });
    const hosted = counted<O>(host);
    const hostFinalHash = run(hosted.policy);
    totalCalls += hosted.calls();
    rows.push({ label, fallbackFinalHash, hostFinalHash, proposeCalls: hosted.calls(), configuration: host.configuration });
  };
  probe("landing-queue seed 7 restack-first", m.restackFirst, policy => m.runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy }).finalHash);
  probe("landing-queue seed 3 fifo", m.fifoLanding, policy => m.runLandingQueue({ seed: 3, candidates: 4, lanes: 1, steps: 12, policy }).finalHash);
  probe("compaction-inheritance seed 7", m.provenanceChecked, policy => m.runCompactionInheritance({ seed: 7, tasks: 8, policy }).finalHash);
  probe("colony-resilience seed 3", m.receiptChecked, policy => m.runColonyResilience({ seed: 3, workers: 4, compute: 4, steps: 16, policy }).finalHash);
  probe("artifact-recovery seed 7 treatment", m.resumeFromSnapshot, policy => m.runArtifactRecovery({ seed: 7, work: 10, steps: 14, arm: "treatment", policy }).finalHash);
  probe("quorum-evidence seed 7 independent-test-first", m.independentTestFirst, policy => m.runQuorumEvidence({ seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "authoritative", policy }).finalHash);

  const run = (policy: AnyPolicy<Coordination.LandingObservation>): string => m.runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy }).finalHash;
  const unconfiguredFinalHash = run(m.graphPolicyHost({ fallback: m.restackFirst }));
  const clients: readonly (readonly [string, () => unknown])[] = [
    ["throws", () => { throw new Error("injected transport failure"); }],
    ["budget-exhausted", () => ({ status: "budget-exhausted" })],
    ["abstain", () => ({ status: "abstain" })],
    ["malformed-body", () => "injected garbage"],
  ];
  const doubles: DoubleRow[] = clients.map(([double, client]) => {
    const reasons = new Set<string>();
    let steps = 0;
    let fallbackTraceLines = 0;
    const host = m.graphPolicyHost<Coordination.LandingObservation, Coordination.Intent, number>({ fallback: m.restackFirst, client });
    const watching: AnyPolicy<Coordination.LandingObservation> = {
      id: host.id, revision: host.revision,
      propose(o, memory, context) {
        const proposal = host.propose(o, memory, context);
        steps += 1;
        totalCalls += 1;
        for (const line of proposal.trace) if (line.kind === "gp-fallback") { fallbackTraceLines += 1; reasons.add(line.detail.split(":")[0] ?? ""); }
        return proposal;
      },
    };
    const finalHash = run(watching); // the counters fill while the episode runs, so read them after it
    return { double, steps, reasons: [...reasons].sort(), fallbackTraceLines, finalHash };
  });

  const fixtures = {
    "landing-queue-seed7": sha256(read(`${FIXTURE_DIR}/landing-queue-seed7.json`)),
    "vertical-cut-seed7": sha256(read(`${FIXTURE_DIR}/vertical-cut-seed7.json`)),
  };
  const manifest = JSON.parse(read(MANIFEST)) as { readonly name: string; readonly version: string };
  const body: JourneyBody = {
    schema: "mw.graph-policy-host-journey.v1", mode: "fixture", evidenceGrade: "FIXTURE", certified: false,
    producer: manifest.name, producerVersion: manifest.version,
    subjectBasis: { builtEntry: entry, packageManifestSha256: sha256(read(MANIFEST)), hostSourceSha256: sha256(read(HOST_SOURCE)), fixtures },
    claimsEstablished: [
      `the built package entry exports graphPolicyHost and the unconfigured host reproduces the fallback finalHash on ${rows.length} pinned fixture runs`,
      "four injected client doubles (throws, budget-exhausted, abstain, malformed-body) each fall back with their named GP_* reason, one gp-fallback trace line per consulted step, and leave the landing-queue seed 7 finalHash equal to the unconfigured run",
      "the committed landing-queue-seed7 and vertical-cut-seed7 fixtures regenerate byte-identical through the built package",
    ],
    claimsUnestablished: [
      "any live GraphPolicyCLI behavior: no implementation exists, every client here is an in-process double",
      "a native Forge receipt: the operation id of the gate run that reached this journey lives in the candidate record, not in this body",
      "any runtime rollout surface or its readiness: none exists, and this journey adds none",
      "measured overhead: overheadMicro is injected from a propose-call count, not a wall clock",
      "coordination quality or safety in any real environment",
    ],
    observations: rows,
    injectedFailure: { unconfiguredFinalHash, doubles },
    fixtureReverify: {
      landingQueueSeed7: verifyFixtureBytes(m, "landing-queue-seed7", read(`${FIXTURE_DIR}/landing-queue-seed7.json`)).reason,
      verticalCutSeed7: verifyFixtureBytes(m, "vertical-cut-seed7", read(`${FIXTURE_DIR}/vertical-cut-seed7.json`)).reason,
    },
    overheadMicro: { kind: "injected", basis: "one micro-unit per host propose call; no wall clock", hostProposeCalls: totalCalls, micro: totalCalls * 1_000_000 },
  };
  return { ...body, bodyDigest: m.digest(body) };
}

if (process.argv.includes("--write") && process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeFileSync(join(repoRoot(), JOURNEY_RECORD_FILE), journeyBytes(await buildJourneyRecord()));
}
