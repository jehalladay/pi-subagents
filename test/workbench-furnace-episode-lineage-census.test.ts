/**
 * wb-4ap.12 (COLLECTIVE-ADAPTATION-R12, program-triage-2026-10-17), the Furnace episode-lineage census: the until-then leg
 * of a trigger-gated requirement whose upstream record has not shipped.
 * Statement (the bead's export title, verbatim up to its own truncation): "When @furnace/sdk publishes Furnace F2's
 * persistent episode lineage (FRC-01: episode, task, actor, attempt, policy-revision and artifact refs on
 * AttemptDto/RunStatusDto), the Furnace observer shall project each ref additively as a provenanced snapshot facet or typed
 * edge (never causation, never ownership without a native confirmation reference), with absent keys keeping today's output
 * byte-identical."
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base f5589e0; re-read at 695105d, whose landing 594 touched
 * neither the vendored SDK nor the observer). The installed @furnace/sdk is 0.1.0
 * from vendor/furnace-sdk-0.1.0.tgz (128 files). Its AttemptDto declares 27 members and its RunStatusDto 16, plus RunDto's
 * 29 by heritage. Of the FRC-01 words only two reach a member name, and neither member is lineage: attempt
 * (AttemptDto.attempt_id, the record's own identity; RunDto.attempt_timeout and active_attempts, the Run's budget and live
 * count) and policy-revision (RunDto.binary_revision, the producer build; RunDto.policy_bypass and policy_provenance, the
 * start-time sources of executor and max_parallel). No file of the release spells "episode" or "lineage". Furnace's own
 * tree at main 0d41031 (2026-10-26) still reads "Status: proposed additive development program ... No implementation
 * implied" (docs/programs/collective-adaptation-2026-10-16/04-implementation-and-qa.md:3; F2 "Persistent episode lineage
 * export" at :11), and its sdk/typescript/src/protocol.ts declares the same FRC-01-word members, so the trigger has fired
 * neither in the release Pi vendors nor upstream. The census reads only the installed release, never Furnace's tree.
 * AttemptDto.superseded_by is the existing successor mark (set on run status failed and attention rows only; attempt list
 * never sets it), not F2's export: the observer reads the Run's counts and attempt list pages, so the fixture carries the
 * mark and no reading projects it. src/workbench/furnace-observer.ts copies each Attempt by named field (attemptRef) and
 * states one Run->Attempt ownership edge per returned Attempt, confirmed by the Attempt page request id. No src, docs or
 * tracker text is edited by this cut.
 *
 * CASES. T1 (ARMED) the installed release's FRC-01-word members of AttemptDto and RunStatusDto (with heritage) equal
 * LINEAGE's today sets, and no release file spells "episode" or "lineage" by path or content (the content reading is
 * proven live by finding the release's own superseded_by, spelled today only in dist/src/protocol.d.ts): when a re-vendor
 * brings F2's lineage, T1 reds naming the acceptance on landing as owed. T2 the same reader finds every FRC-01 word in a planted
 * release, through heritage and a quoted member name, so a hollowed reader reds. B1 (ACCEPTANCE[2]) a fixture without the
 * fields produces a reading, a projectionSnapshot and a projectionTopology toStrictEqual today's (frozen literals at a
 * fixed clock) and byte-identical JSON. B2 the same fixture carrying FRC-01-shaped keys under this file's own hypothetical
 * spellings (the release publishes none) on the Run status, its failed row and every Attempt row produces the same three
 * literals and no planted value: nothing is projected before the SDK publishes it. C1 (ACCEPTANCE[3]) over a failed
 * Attempt and its successor at one Work sharing one hypothetical episode, every relation is a Furnace-confirmed
 * Run->Attempt ownership edge and none is causation or Attempt->Attempt, although causation is a kind the projection
 * accepts. A1 the outside anchors: the export row's title lists exactly LINEAGE's refs and its description carries exactly
 * the ACCEPTANCE list quoted here.
 * FROZEN SHAPE (standing rule 16): LINEAGE pins `${ref}:${today.length}` as a literal; its refs are held to the export
 * title (A1) and its today sets to the installed release (T1).
 * PARKED (the external remainder, a Furnace release): ACCEPTANCE[0] and ACCEPTANCE[1] need F2's fields in a released
 * @furnace/sdk. The re-vendor that brings them reds T1 and owes both, AC2's fixture replacing B2.
 */
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AttemptDto, AttemptListDto, LogsReadDto, Response, ResponseKind, RunStatusDto } from "@furnace/sdk";
import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type FurnaceObservedRelation,
  FurnaceObserver,
  type FurnaceObserverClient,
  type FurnaceProjectionTopology,
  type FurnaceReading,
} from "../src/workbench/furnace-observer.js";
import { type NativeSnapshot, ObservationProjection } from "../src/workbench/observation.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-4ap.12";
const EXPORT = ".beads/issues.jsonl";
const SDK_ROOT = dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json"));
/** The DTOs the export title names; each is read with its heritage. */
const DTOS: readonly string[] = ["AttemptDto", "RunStatusDto"];
/** F2's own words (the title's "persistent episode lineage"): no release file spells either until F2 ships. */
const RECORD_WORDS: readonly string[] = ["episode", "lineage"];
/** Every AttemptDto field attemptRef copies: the reader's liveness anchor in the release it judges. */
const OBSERVER_READS: readonly string[] = [
  "attempt_id",
  "run_id",
  "work_id",
  "ordinal",
  "executor",
  "state",
  "outcome",
  "created_at",
  "started_at",
  "finished_at",
  "exit_code",
  "termination_cause",
];
/** The bead's acceptance, verbatim from its export description (A1 holds the whole list to the export). */
const ACCEPTANCE: readonly string[] = [
  "On landing: re-vendor @furnace/sdk per docs/workbench/17:61@9df9a03 in one owner commit sequenced with wb-zby.",
  "The furnace-observer test gains a fixture carrying the new fields and asserts each ref appears as evidenceRefs/trace.correlationIds or a typed edge with provenance.source === 'furnace' and nativeConfirmationRef from the Attempt page request id (furnace-observer.ts:170-171@9df9a03 pattern).",
  "A fixture WITHOUT the fields produces output toStrictEqual today's.",
  "No edge of kind 'causation' is stated from lineage alone (MW/02-architecture.md:44@b8264aa: event linkage is provenance, not proof of causal responsibility).",
];
const OWED = `ARMED (${BEAD}): the installed @furnace/sdk now differs on Furnace F2's lineage words. If F2 shipped, the acceptance on landing is owed: ${ACCEPTANCE[0]} ${ACCEPTANCE[1]} If it did not, re-measure LINEAGE's today sets against the new release and say so.`;

interface LineageRow {
  readonly ref: string;
  readonly pattern: RegExp;
  readonly today: readonly string[];
}
/** FRC-01's refs in the export title's order: the member-name reading that would carry each, and the members the installed
 * release already declares under it (measured; none of them is lineage). */
const LINEAGE: readonly LineageRow[] = [
  { ref: "episode", pattern: /episode/i, today: [] },
  { ref: "task", pattern: /task/i, today: [] },
  { ref: "actor", pattern: /actor/i, today: [] },
  { ref: "attempt", pattern: /attempt/i, today: ["AttemptDto.attempt_id", "RunDto.attempt_timeout", "RunDto.active_attempts"] },
  {
    ref: "policy-revision",
    pattern: /policy|revision/i,
    today: ["RunDto.binary_revision", "RunDto.policy_bypass", "RunDto.policy_provenance"],
  },
  { ref: "artifact", pattern: /artifact/i, today: [] },
];

interface Declared {
  readonly name: string;
  readonly heritage: readonly string[];
  readonly members: readonly string[];
}
function memberName(name: ts.PropertyName | undefined, source: ts.SourceFile): string {
  if (name === undefined) return "<unnamed>";
  return ts.isComputedPropertyName(name) ? name.getText(source) : name.text;
}
/** Every interface declaration of one declaration file, read through the TypeScript AST (comments never count). */
function declarations(file: string, text: string): Declared[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const found: Declared[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node))
      found.push({
        name: node.name.text,
        heritage: (node.heritageClauses ?? []).flatMap((clause) => clause.types.map((type) => type.expression.getText(source))),
        members: node.members.map((member) => memberName(member.name, source)),
      });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** Per LINEAGE row, every member of DTOS and their heritage whose own name the row's reading matches, as Interface.member. */
function lineageMembers(found: readonly Declared[]): Record<string, string[]> {
  const order = [...DTOS];
  const members: { readonly owner: string; readonly member: string }[] = [];
  for (let index = 0; index < order.length; index++) {
    const owner = order[index];
    for (const declared of found.filter((item) => item.name === owner)) {
      members.push(...declared.members.map((member) => ({ owner, member })));
      for (const parent of declared.heritage) if (!order.includes(parent)) order.push(parent);
    }
  }
  return Object.fromEntries(
    LINEAGE.map((row) => [row.ref, members.filter(({ member }) => row.pattern.test(member)).map(({ owner, member }) => `${owner}.${member}`)]),
  );
}
function spells(text: string, words: readonly string[]): string[] {
  const lower = text.toLowerCase();
  return words.filter((word) => lower.includes(word));
}
function releaseFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? releaseFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : [],
  );
}
/** The installed release, read file by file: every regular file and every interface declaration of its .d.ts files. */
function installedRelease(): { files: string[]; found: Declared[] } {
  const files = releaseFiles(SDK_ROOT);
  const found = files.filter((file) => file.endsWith(".d.ts")).flatMap((file) => declarations(file, readFileSync(file, "utf8")));
  return { files, found };
}
/** Every release file, by its path inside the package, whose path or content spells one of the words. */
function spelling(files: readonly string[], words: readonly string[]): string[] {
  return files
    .map((file) => relative(SDK_ROOT, file))
    .filter((path) => spells(path, words).length > 0 || spells(readFileSync(join(SDK_ROOT, path), "utf8"), words).length > 0);
}
/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}

const CLOCK = "2026-10-28T03:00:00.000Z";
const WORKSPACE = "/srv/furnace-lineage-ws";
const SCOPE = { workspace: WORKSPACE, principal: "lineage-tester" };
const LIMITS = { maxPolls: 1, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 };
const RUN_ID = "frn-run-lineage";
const failed: AttemptDto = {
  attempt_id: "frn-atm-l1",
  run_id: RUN_ID,
  work_id: "bd-work-l",
  ordinal: 1,
  executor: "runner",
  controller_session_id: "ctl-session-1",
  state: "failed",
  outcome: "work_failure",
  created_at: "2026-10-27T00:00:01Z",
  started_at: "2026-10-27T00:00:02Z",
  finished_at: "2026-10-27T00:00:04Z",
  exit_code: 1,
  termination_cause: "natural_exit",
};
const successor: AttemptDto = {
  attempt_id: "frn-atm-l2",
  run_id: RUN_ID,
  work_id: "bd-work-l",
  ordinal: 2,
  executor: "runner",
  controller_session_id: "ctl-session-2",
  state: "succeeded",
  outcome: "success",
  created_at: "2026-10-27T00:00:05Z",
  started_at: "2026-10-27T00:00:06Z",
  finished_at: "2026-10-27T00:00:09Z",
  exit_code: 0,
  termination_cause: "natural_exit",
};
const status: RunStatusDto = {
  run_id: RUN_ID,
  beads_run_id: "bd-run-lineage",
  workspace: WORKSPACE,
  state: "active",
  mode: "persistent_molecule",
  furnace_version: "0.1.0",
  binary_revision: "rev-lineage",
  created_at: "2026-10-27T00:00:00Z",
  updated_at: "2026-10-27T00:00:09Z",
  state_since: "2026-10-27T00:00:00Z",
  executor: "runner",
  max_parallel: 1,
  attempt_timeout: "30m",
  active: [],
  failed: [{ ...failed, superseded_by: { attempt_id: successor.attempt_id, ordinal: successor.ordinal } }],
  failed_total: 1,
  attention: [],
  unreadable: [],
  corrupt_events: [],
  corrupt_events_total: 0,
  conflicts: [],
  completed: 1,
  total: 2,
};
/** FRC-01-shaped keys under this file's own spellings: the release publishes no lineage field (T1), so no name is Furnace's. */
const UNPUBLISHED = {
  episode_ref: "HYPOTHETICAL-episode-1",
  task_ref: "HYPOTHETICAL-task-1",
  actor_ref: "HYPOTHETICAL-actor-1",
  attempt_ref: "HYPOTHETICAL-attempt-0",
  policy_revision_ref: "HYPOTHETICAL-policy-revision-7",
  artifact_refs: ["HYPOTHETICAL-artifact-a", "HYPOTHETICAL-artifact-b"],
} as const;
const withLineage = (item: AttemptDto): AttemptDto => ({ ...item, ...UNPUBLISHED });
const statusWithLineage: RunStatusDto = { ...status, ...UNPUBLISHED, failed: status.failed.map(withLineage) };

function respond<T>(kind: ResponseKind, requestId: string, data: T): Response<T> {
  return { protocolVersion: 1, kind, requestId, data, exit: { code: 0, signal: null }, stderr: "" };
}
function client(run: RunStatusDto, attempts: readonly AttemptDto[]): FurnaceObserverClient {
  return {
    runs: { get: () => ({ status: async () => respond("run_status", "req-status", run) }) },
    attempts: {
      list: async (runId, request) =>
        respond<AttemptListDto>("attempt_list", "req-attempts", {
          run_id: runId,
          beads_run_id: run.beads_run_id,
          complete: true,
          limit: request?.limit ?? null,
          returned: attempts.length,
          next_cursor: null,
          attempts: [...attempts],
          unreadable: [],
        }),
    },
    logs: {
      read: async (runId, request) =>
        respond<LogsReadDto>("logs_read", "req-logs", {
          run_id: runId,
          attempt_id: request?.attempt ?? "",
          stream: "stdout",
          complete: true,
          limit: request?.limit ?? null,
          returned: 0,
          next_cursor: null,
          lossy: false,
          lines: [],
        }),
    },
  };
}
async function outputs(
  run: RunStatusDto,
  attempts: readonly AttemptDto[],
): Promise<{ reading: FurnaceReading; snapshot: NativeSnapshot; topology: FurnaceProjectionTopology }> {
  const observer = new FurnaceObserver(client(run, attempts), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS });
  const reading = await observer.snapshot();
  return { reading, snapshot: observer.projectionSnapshot(reading), topology: observer.projectionTopology(reading) };
}

const runRef = { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE };
const attemptRef = (id: string) => ({ provider: "furnace", type: "attempt", id, scope: WORKSPACE });
const confirmed = { source: "furnace", observedAt: CLOCK, nativeConfirmationRef: "req-attempts" };
/** Today's reading of the fixture, frozen at CLOCK (measured at the base, key order included). */
const READING: FurnaceReading = {
  contract: "furnace.external-observation/v1",
  source: {
    provider: "furnace",
    runId: RUN_ID,
    beadsRunId: "bd-run-lineage",
    workspaceRoot: WORKSPACE,
    ownership: "external",
    sdk: "@furnace/sdk@0.1.0",
    producerVersion: "0.1.0",
    producerRevision: "rev-lineage",
    requestIds: { status: "req-status", attempts: "req-attempts", logs: ["req-logs"] },
  },
  capturedAt: CLOCK,
  observedAt: CLOCK,
  lastConfirmedAt: CLOCK,
  freshness: "current",
  connection: "connected",
  completeness: "complete",
  run: {
    state: "active",
    mode: "persistent_molecule",
    controllerLive: "unknown",
    stateSince: "2026-10-27T00:00:00Z",
    updatedAt: "2026-10-27T00:00:09Z",
    progress: { completed: 1, total: 2 },
    failedTotal: 1,
    corruptEventsTotal: 0,
    unreadableCount: 0,
    conflictCount: 0,
  },
  attempts: {
    complete: true,
    returned: 2,
    nextCursor: null,
    unreadableCount: 0,
    items: [
      {
        id: "frn-atm-l1",
        runId: RUN_ID,
        workId: "bd-work-l",
        ordinal: 1,
        executor: "runner",
        state: "failed",
        outcome: "work_failure",
        createdAt: "2026-10-27T00:00:01Z",
        startedAt: "2026-10-27T00:00:02Z",
        finishedAt: "2026-10-27T00:00:04Z",
        exitCode: 1,
        terminationCause: "natural_exit",
      },
      {
        id: "frn-atm-l2",
        runId: RUN_ID,
        workId: "bd-work-l",
        ordinal: 2,
        executor: "runner",
        state: "succeeded",
        outcome: "success",
        createdAt: "2026-10-27T00:00:05Z",
        startedAt: "2026-10-27T00:00:06Z",
        finishedAt: "2026-10-27T00:00:09Z",
        exitCode: 0,
        terminationCause: "natural_exit",
      },
    ],
  },
  logs: [{ attemptId: "frn-atm-l2", stream: "stdout", complete: true, lossy: false, returned: 0, nextCursor: null }],
  stream: { runLifecycle: "unavailable", attemptOutput: "logs --follow (one attempt only)", cursor: "unavailable" },
  coherence: "sequential-non-atomic",
};
/** Today's Run projection snapshot of READING. */
const RUN_SNAPSHOT: NativeSnapshot = {
  source: runRef,
  scope: SCOPE,
  capturedAt: CLOCK,
  observedAt: CLOCK,
  coverage: "complete",
  sourceRevision: "rev-lineage",
  node: { title: `Furnace Run ${RUN_ID}`, type: "workflow", statusText: "active", statusTone: "active" },
  kind: "furnace.run.snapshot",
  evidenceRefs: ["frn-atm-l1", "frn-atm-l2"],
};
/** Today's projection topology of READING: the Run snapshot, one Attempt snapshot and one confirmed ownership edge each. */
const TOPOLOGY: FurnaceProjectionTopology = {
  snapshots: [
    RUN_SNAPSHOT,
    {
      source: attemptRef("frn-atm-l1"),
      scope: SCOPE,
      capturedAt: CLOCK,
      observedAt: CLOCK,
      coverage: "complete",
      sourceRevision: "rev-lineage",
      node: { title: "Furnace Attempt frn-atm-l1", type: "sdk-operation", statusText: "failed (work_failure)", statusTone: "failure" },
      kind: "furnace.attempt.snapshot",
      trace: { invocationId: RUN_ID, correlationIds: { runId: RUN_ID, workId: "bd-work-l" } },
      interval: { startedAt: "2026-10-27T00:00:02Z", endedAt: "2026-10-27T00:00:04Z" },
    },
    {
      source: attemptRef("frn-atm-l2"),
      scope: SCOPE,
      capturedAt: CLOCK,
      observedAt: CLOCK,
      coverage: "complete",
      sourceRevision: "rev-lineage",
      node: { title: "Furnace Attempt frn-atm-l2", type: "sdk-operation", statusText: "succeeded (success)", statusTone: "success" },
      kind: "furnace.attempt.snapshot",
      trace: { invocationId: RUN_ID, correlationIds: { runId: RUN_ID, workId: "bd-work-l" } },
      interval: { startedAt: "2026-10-27T00:00:06Z", endedAt: "2026-10-27T00:00:09Z" },
    },
  ],
  relations: [
    { scope: SCOPE, from: runRef, to: attemptRef("frn-atm-l1"), kind: "ownership", provenance: confirmed },
    { scope: SCOPE, from: runRef, to: attemptRef("frn-atm-l2"), kind: "ownership", provenance: confirmed },
  ],
};

describe("wb-4ap.12 Furnace episode-lineage census (until F2 ships)", () => {
  it("T1 (ARMED): the installed release declares no lineage member on AttemptDto or RunStatusDto and spells no record word", () => {
    const release = installedRelease();
    expect(release.files.length, "the installed release was read").toBeGreaterThan(0);
    const attempt = release.found.filter((item) => item.name === "AttemptDto");
    expect(OBSERVER_READS.filter((field) => !attempt.some((item) => item.members.includes(field))), "the reader sees every field the observer copies").toEqual([]);
    expect(release.found.some((item) => item.name === "RunStatusDto" && item.heritage.includes("RunDto")), "RunStatusDto is read with its heritage").toBe(true);
    expect(lineageMembers(release.found), OWED).toStrictEqual(Object.fromEntries(LINEAGE.map((row) => [row.ref, [...row.today]])));
    expect(spelling(release.files, RECORD_WORDS), OWED).toStrictEqual([]);
    const successorMark = spelling(release.files, ["superseded_by"]).filter((path) => path.endsWith(".d.ts"));
    expect(successorMark.length, "the content reading is live: it finds the release's existing successor mark").toBeGreaterThan(0);
  });

  it("T2: the same reader finds every FRC-01 word in a planted release, through heritage and a quoted member name", () => {
    const planted = [
      "/** an episode-free comment */ export interface AttemptDto { attempt_id: string; episode_ref?: string; 'task_ref'?: string; actor?: string; artifact_refs?: string[] }",
      "export interface RunStatusDto extends RunDto { failed_total: number }",
      "export interface RunDto { policy_revision?: string; attempt_parent?: string; lineage?: string }",
    ].join("\n");
    expect(lineageMembers(declarations("planted.d.ts", planted))).toStrictEqual({
      episode: ["AttemptDto.episode_ref"],
      task: ["AttemptDto.task_ref"],
      actor: ["AttemptDto.actor"],
      attempt: ["AttemptDto.attempt_id", "RunDto.attempt_parent"],
      "policy-revision": ["RunDto.policy_revision"],
      artifact: ["AttemptDto.artifact_refs"],
    });
    expect(spells(planted, RECORD_WORDS)).toStrictEqual([...RECORD_WORDS]);
    expect(spells("furnace.external-observation/v1", RECORD_WORDS)).toStrictEqual([]);
  });

  describe("the observer's output at a fixed clock", () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(new Date(CLOCK));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("B1 (ACCEPTANCE[2]): a fixture without the fields produces today's reading, snapshot and topology, byte-identical", async () => {
      const out = await outputs(status, [failed, successor]);
      expect(out.reading).toStrictEqual(READING);
      expect(out.snapshot).toStrictEqual(RUN_SNAPSHOT);
      expect(out.topology).toStrictEqual(TOPOLOGY);
      expect(JSON.stringify(out)).toBe(JSON.stringify({ reading: READING, snapshot: RUN_SNAPSHOT, topology: TOPOLOGY }));
    });

    it("B2: FRC-01-shaped keys the release has not published change nothing and reach no output", async () => {
      expect(LINEAGE.filter((row) => !Object.keys(UNPUBLISHED).some((key) => row.pattern.test(key))).map((row) => row.ref), "every FRC-01 ref is planted").toEqual([]);
      const out = await outputs(statusWithLineage, [withLineage(failed), withLineage(successor)]);
      expect(out.reading).toStrictEqual(READING);
      expect(out.snapshot).toStrictEqual(RUN_SNAPSHOT);
      expect(out.topology).toStrictEqual(TOPOLOGY);
      expect(JSON.stringify(out)).toBe(JSON.stringify({ reading: READING, snapshot: RUN_SNAPSHOT, topology: TOPOLOGY }));
      expect(JSON.stringify(out)).not.toContain("HYPOTHETICAL");
    });

    it("C1 (ACCEPTANCE[3]): a failed Attempt and its successor sharing one episode get ownership edges only, never causation", async () => {
      const { topology } = await outputs(statusWithLineage, [withLineage(failed), withLineage(successor)]);
      const causation: FurnaceObservedRelation["kind"] = "causation";
      expect(topology.relations.map((relation) => relation.kind)).toStrictEqual(["ownership", "ownership"]);
      expect(topology.relations.filter((relation) => relation.kind === causation)).toStrictEqual([]);
      expect(topology.relations.filter((relation) => relation.from.type !== "run" || relation.to.type !== "attempt")).toStrictEqual([]);
      expect(topology.relations.map((relation) => relation.provenance)).toStrictEqual([confirmed, confirmed]);
      // The absence is the observer's: the projection accepts a causation statement between the same two Attempts.
      const projection = new ObservationProjection();
      for (const snapshot of topology.snapshots) projection.refresh(snapshot);
      for (const relation of topology.relations) projection.relate(relation);
      projection.relate({ scope: SCOPE, from: attemptRef("frn-atm-l1"), to: attemptRef("frn-atm-l2"), kind: causation, provenance: { source: "census-plant" } });
      expect(projection.relations({ scope: SCOPE }).filter((relation) => relation.kind === causation)).toHaveLength(1);
    });
  });

  it("A1: the export row's title lists exactly LINEAGE's refs and its description carries exactly the ACCEPTANCE quoted here", () => {
    const row = exportRow();
    const listed = /\(FRC-01: ([^)]+) refs on AttemptDto\/RunStatusDto\)/.exec(row.title)?.[1];
    expect(listed?.split(/, | and /)).toStrictEqual(LINEAGE.map((item) => item.ref));
    expect(row.description).toContain(`ACCEPTANCE: [${ACCEPTANCE.map(listItem).join(", ")}]`);
    expect(row.title.startsWith(`[COLLECTIVE-ADAPTATION-R12] When @furnace/sdk publishes Furnace F2's persistent episode lineage`)).toBe(true);
  });

  it("FROZEN SHAPE (standing rule 16): LINEAGE's rows and pin counts", () => {
    expect(LINEAGE.map((row) => `${row.ref}:${row.today.length}`)).toStrictEqual([
      "episode:0",
      "task:0",
      "actor:0",
      "attempt:3",
      "policy-revision:3",
      "artifact:0",
    ]);
  });
});
