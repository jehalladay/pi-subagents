/**
 * wb-f3wd (MWI B-hx-evidence, slice PI-5, program mechanical-workflows-interop-2026-11-04; gate HX-TASK-SCOPE-PROBE): the
 * installed-HX task-scope capability census for EAT-R057 ("The HX probe MUST record whether installed producer can supply
 * task-scope proof."). The judge is qa/workbench/hx-task-scope-judge.mjs (pure: no I/O, no clock); the probe is
 * qa/workbench/hx-task-scope-probe.mjs, which drives the installed hx through @hyperunix/sdk against a throwaway Git
 * repository at a real commit and writes the committed record qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json.
 *
 * THE REQUIREMENT, never retyped: test/fixtures/mwi-hx-evidence-requirements-roster.json vendors the EAT-R057 block verbatim
 * (pi-subagents master 0b25e14e, triage/requirements/ATOMIC-REQUIREMENTS.md:1212-1220, read with read-only git show by the
 * cutting seat), held to its SHA-256. Every row's text is a field of that block: STATEMENT is its Statement, A1-A4 tile its
 * Acceptance sentence clause by clause, MUTANT is its Adversarial mutant and exactly one MUTANT case kills it. The requirement
 * id and the gate are judged against this bead's own row of the tracked export (.beads/issues.jsonl, wb-f3wd: "requirements
 * EAT-R057", "real-infra gate: HX-TASK-SCOPE-PROBE"), and every row's pins and every residual family against the two tables of
 * the append-only receipt docs/workbench/receipts/wb-f3wd.md (standing rule 15), so a pin or a residual removed from every
 * literal of this file still stands there: the anchors outside this file.
 *
 * THE MEASUREMENT (follow-up wb-d6m1, the landing-1013 gate's F1: the committed record's binary SHA-256, its base revision moved
 * with every field that names it, a live leg's answer count, its frame count and the capability count were each read by format
 * or as a positive count, so an edit to any of them kept the census green): the receipt's follow-up entry carries the Measured
 * record table - nine reproducible literals by field (the base revision, the task digest, the binary SHA-256 and origin, the
 * capability count, and each live leg's answer and frame counts), and the SHA-256 of the record's measurement, which is the
 * record's canonical JSON (keys in code-point order) without utc, the run's clock, and probe, the script tie S-RECORD-TIED
 * computes, so an edit to any other field of the record moves that SHA-256. The
 * cases that read a literal hold it to its row (A1-PRODUCER-PIN, A1-CAPABILITIES, A2-RECORDED-TASK, A3-RECORDED-RESPONSES), and
 * ANCHOR-MEASUREMENT holds the table's fields, the measurement's SHA-256, and the table's binary SHA-256, capability count, base
 * revision and task digest to what the cut-1 entry measured: its version pin, and the 12-digit abbreviations its EAT-R057 item
 * names.
 * THE RECORD OF ENDS (follow-up wb-d6m1, the gate's F3: a case returning early, hollowed to one assertion, skipped or dropped
 * from the registration loop kept the census green): every row records its end in REACHED as `${id}:${count}` after its last
 * assertion, count being vitest's own tally of the row's assertions (expect.getState().assertionCalls). The registration row,
 * registered first, holds the collected task tree before any other row runs: exactly the registration row, the cases, the
 * anchor rows and the liveness row, in order, each set to run and not inverted. The liveness row, registered last, holds the
 * tree again, every other test run before it, and REACHED to the receipt's Reached ends table, which ANCHOR-RECEIPT-TABLES holds
 * to every row id of this file; the file-end judge (afterAll) holds the liveness row's own end whenever it was selected.
 *
 * PINNED READER SET (case id: assertion target -> observed result at this cut; every case is in CASES below):
 * STATEMENT (judgeTaskScope, reasonsOf; the committed record)
 * - S-TASK-CAPABLE: an observation meeting every condition (native result, exit 0, terminal reached, coverage complete,
 *   absence licensed, task scope, runtime revision resolved to the base, runtime query digest) -> task-scope-supported, no blocker.
 * - S-ONE-CONDITION-EACH: that observation less exactly one condition, once per reason in REASONS -> exactly that reason.
 * - S-VOCABULARY: the verdicts are exactly task-scope-supported and task-scope-unsupported, the reasons exactly REASONS; no
 *   verdict or reason word names Git or a census.
 * - S-RECORD-FOLLOWS-JUDGE: the committed record's verdict, capable list, reasons and blocker are the judge's over the
 *   record's own task and observations.
 * - S-RECORD-TIED: the committed record names its schema, bead and requirement and is tied to the committed probe and judge
 *   scripts by their SHA-256.
 * A1 "Pin installed HX version" (the committed record)
 * - A1-PRODUCER-PIN: the record pins the runtime hx 0.1.0 by the binary SHA-256 and the binary origin of the receipt's Measured
 *   record, HXS 1.0 and protocol hxs/1.0.
 * - A1-SDK-PIN: the record's SDK version is the installed @hyperunix/sdk package version, the version the runtime reported
 *   and the version of the vendored tarball package.json depends on.
 * - A1-CAPABILITIES: the record carries the runtime's capability count, the receipt's Measured record count, and the
 *   capabilities naming a task: none.
 * A2 "query actual task/revision" (LEGS; the committed record)
 * - A2-PROBE-LEGS: the legs are exactly filesystem-live (the MW rig default discovery query), filesystem-live-best-effort
 *   (Pi's hyperunix.find coverage policy) and revision-pinned (the SDK's one revision binding, GitView of the base), recorded
 *   in that order.
 * - A2-RECORDED-TASK: the record's task is PROBE_TASK at the receipt's Measured record base revision (40-hex); every leg queried
 *   that kind and root; the pinned leg's view and argv name git:<base>, the live legs carry no view; --best-effort appears
 *   exactly on best-effort legs.
 * A3 "capture terminal response and task/query digest plus coverage" (observationOf, taskDigest; the committed record)
 * - A3-OBSERVATION-OF-RESULT: an SDK result maps to every observation field, the workspace root scrubbed; completeness keeps
 *   each of the SDK's three readings (complete, incomplete, unknown), an unknown one reading coverage-not-complete, and reads
 *   null for each of the seven other readings fed (partial, Complete, the empty string, 1, true, null, undefined).
 * - A3-OBSERVATION-OF-FAILURE: an SDK process failure maps to a process-failure observation with its exit, terminal class,
 *   diagnostic code and reason (scrubbed), no coverage, no revision and no digest; a signal-killed child keeps a null exit and
 *   its signal, and misses every condition but revision-mismatch.
 * - A3-TASK-DIGEST: the task digest is sha256 of the task's canonical JSON, independent of key order, and moves with each field.
 * - A3-RECORDED-RESPONSES: measured at this cut: filesystem-live exits 3 partial with coverage incomplete; best-effort exits 0
 *   with terminal complete and coverage still incomplete; both read the live workspace head with no revision and no runtime
 *   digest, coverage scopes fs:<workspace> and the certificate scope fs-subtree; revision-pinned is refused, exit 4
 *   provider_failed, HX-RUNTIME-INTERNAL-FAILURE with reason view-binding-pending, zero frames; the task digest is
 *   taskDigest of the task and the receipt's Measured record digest; each live leg's answer and frame counts are its rows.
 * - A3-NO-HOST-PATH: the record carries no host path; every --workspace argument reads <workspace>.
 * A4 "Record unsupported/missing witness as blocker scoped only to native-task-scope, not Git census" (judgeTaskScope; record)
 * - A4-MISSING-WITNESS: no observation -> task-scope-unsupported with a missing-witness blocker.
 * - A4-UNSUPPORTED-WITNESS: unsupported observations -> an unsupported-witness blocker and each observation's reasons.
 * - A4-SCOPE-ONLY: every blocker is scoped exactly native-task-scope with git-census exactly its notBlocked list, and a
 *   supported verdict carries no blocker.
 * - A4-RECORDED-BLOCKER: the committed record is task-scope-unsupported with an unsupported-witness blocker on gate
 *   HX-TASK-SCOPE-PROBE.
 * MUTANT "Treat a complete filesystem response as capable task proof." (reasonsOf, scopeOfKind; the committed record)
 * - M-COMPLETE-FILESYSTEM: a complete filesystem response, even revision-bound with a runtime digest -> scope-not-task only,
 *   never capable (kills the vendored mutant).
 * - M-TERMINAL-COMPLETE: the measured best-effort shape (exit 0, terminal complete, coverage incomplete) is never capable.
 * - M-SCOPE-OF-KIND: every hx.fs kind reads filesystem and no kind reads task; every recorded observation is filesystem scope.
 *
 * NOT CLAIMED (scope sentences, no follow-up): a workspace-defined named query (hx query save / hx run) carrying a task scope
 * is NOT CLAIMED by this census (the probe's task workspace defines none); hx verbs other than find (show under a view, git
 * tree, git index, git diff: the Git-census mode's mechanisms) are NOT CLAIMED; hx builds other than the recorded binary
 * SHA-256 are NOT CLAIMED; Pi's registered hyperunix.find tool is NOT CLAIMED (the probe drives the SDK directly); the
 * hx-admit guardrails EAT-R058 and EAT-R059 are NOT CLAIMED; the closure of gate HX-TASK-SCOPE-PROBE is NOT CLAIMED (the
 * slice is not claimed live or closed, EAT-R085): the record measures a capability, it certifies nothing. The record's utc
 * beyond its format is NOT CLAIMED (two runs differ only in it, so the measurement leaves it out); a live re-measure is NOT
 * CLAIMED by this census (it reads the committed record; the receipt's follow-up entry states the seat's re-run); a row whose
 * assertions are replaced one for one, keeping its count, is NOT CLAIMED by the record of ends (it counts assertions, it does
 * not read them); an edit that disables two of the record of ends' own guards together - the registration and liveness rows
 * both skipped, or the liveness row cut short with the file-end judge deleted - is NOT CLAIMED (each guard holds the others
 * one at a time; measured at this cut, a case returning early then stays green).
 *
 * RESIDUALS (rule 19(d): a named family plus a pinned quiet row, a case that reds when the quiet reading changes):
 * - R-DECLARED-SCOPE (QUIET-DECLARED-SCOPE): an observation's scope is read as declared, so a synthetic observation that
 *   declares task scope and meets every other condition is judged capable; the committed record is tied by the scripts'
 *   SHA-256 and by the receipt's measurement SHA-256.
 * - R-REQUESTED-SPELLING (QUIET-REQUESTED-SPELLING): only the runtime's resolved commit is compared with the base, so a
 *   requested spelling other than the base (HEAD) that resolves to it is accepted.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import {
  BLOCKER_SCOPE,
  GATE,
  JUDGE_SCRIPT,
  judgeTaskScope,
  LEGS,
  NOT_BLOCKED,
  type Observation,
  observationOf,
  PROBE_RECORD,
  PROBE_SCHEMA,
  PROBE_SCRIPT,
  PROBE_TASK,
  type ProbeRecord,
  REASONS,
  reasonsOf,
  scopeOfKind,
  type Task,
  taskDigest,
  VERDICTS,
  WORKSPACE_TOKEN,
} from "../qa/workbench/hx-task-scope-judge.mjs";
import { docsSection, sectionTables } from "./helpers/census.js";

const REPO = fileURLToPath(new URL("../", import.meta.url));
const BEAD = "wb-f3wd";
const ROSTER = "test/fixtures/mwi-hx-evidence-requirements-roster.json";
const EXPORT = ".beads/issues.jsonl";
const SDK_PACKAGE = "node_modules/@hyperunix/sdk/package.json";
const RECEIPT = "docs/workbench/receipts/wb-f3wd.md";
/** The receipt entry the pin and residual tables sit under (its first entry; the receipt sheds no line, standing rule 15). */
const RECEIPT_ENTRY = "2026-11-06 receipt: the installed-HX task-scope probe and its census, cut 1 (machine seat ws-02)";
/** The follow-up entry the Measured record and Reached ends tables sit under (wb-d6m1, appended after the first entry). */
const FOLLOW_UP_ENTRY =
  "2026-11-07 receipt: the committed record's measurement and every row's end, held outside the census (follow-up wb-d6m1 of landing 1013; machine seat ws-11)";
const RECEIPT_TABLES = {
  pins: { entry: RECEIPT_ENTRY, heading: "Judged pins, wb-f3wd cut 1", header: ["Row", "Pin"] },
  residuals: { entry: RECEIPT_ENTRY, heading: "Residuals, wb-f3wd cut 1", header: ["Residual", "Quiet row"] },
  measured: { entry: FOLLOW_UP_ENTRY, heading: "Measured record, wb-d6m1", header: ["Field", "Value"] },
  reached: { entry: FOLLOW_UP_ENTRY, heading: "Reached ends, wb-d6m1", header: ["Row", "Assertions"] },
} as const;
/** The Measured record table's fields, in its order: the record's reproducible literals, then its measurement's SHA-256. */
const MEASURED_FIELDS = [
  "task.baseRevision",
  "task.digest",
  "producer.binarySha256",
  "producer.binaryOrigin",
  "producer.capabilities.count",
  "filesystem-live.answerCount",
  "filesystem-live.frames",
  "filesystem-live-best-effort.answerCount",
  "filesystem-live-best-effort.frames",
  "measurement.sha256",
] as const;
type MeasuredField = (typeof MEASURED_FIELDS)[number];
/** The registration row, registered first: it holds the collected task tree before any other row runs. */
const REGISTRATION_ID = "REGISTRATION";
const REGISTRATION_TITLE =
  "the registration: this file's collected task tree holds exactly this row, the cases, the anchor rows and the liveness row, in order, each set to run and not inverted";
/** The liveness row, registered last: it holds the collected task tree and the record of ends. */
const LIVENESS_ID = "LIVENESS";
const LIVENESS_TITLE =
  "the record of ends: every test of this file is registered in order, set to run, not inverted and run, and every row reached its end with the receipt's assertion count";

type RowId = "STATEMENT" | "A1" | "A2" | "A3" | "A4" | "MUTANT";
type RosterField = "Statement" | "Acceptance" | "Adversarial mutant";

interface Case {
  readonly id: string;
  readonly row: RowId;
  readonly kind: "claim" | "quiet";
  readonly title: string;
  /** The vendored adversarial mutant this case kills, verbatim (exactly one claim case carries it). */
  readonly kills?: string;
  readonly run: () => void;
}

interface Requirement {
  readonly id: string;
  readonly lines: string;
  readonly sha256: string;
  readonly text: readonly string[];
}

interface Roster {
  readonly bead: string;
  readonly source: { readonly branch: string; readonly commit: string; readonly path: string; readonly blob: string; readonly fileSha256: string };
  readonly group: { readonly lines: string; readonly text: readonly string[] };
  readonly requirements: readonly Requirement[];
}

const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const repoText = (path: string): string => readFileSync(join(REPO, path), "utf8");
const roster = (): Roster => JSON.parse(repoText(ROSTER)) as Roster;
const record = (): ProbeRecord => JSON.parse(repoText(PROBE_RECORD)) as ProbeRecord;
const field = (requirement: Requirement, name: RosterField): string => {
  const prefix = `- ${name}: `;
  const line = requirement.text.find((candidate) => candidate.startsWith(prefix));
  return line === undefined ? "" : line.slice(prefix.length);
};
/**
 * The body rows of one table section of the receipt, read through the shared docs reader (test/helpers/census.ts): the section
 * must render exactly one table and nothing else, carry no HTML and keep its header, so a line added to the append-only receipt
 * can neither hide a row nor split the table and restate it.
 */
const receiptTable = (table: { readonly entry: string; readonly heading: string; readonly header: readonly string[] }): string[][] => {
  const markdown = repoText(RECEIPT);
  const parents = [(markdown.split("\n")[0] ?? "").replace(/^# /, ""), table.entry];
  const where = `${RECEIPT} section "${table.heading}"`;
  const section = docsSection(markdown, table.heading, 3, parents);
  if (!section.ok) throw new Error(`${where}: ${section.why}`);
  if (section.hasHtml) throw new Error(`${where} carries HTML, which can hide a row of its table`);
  const kinds = section.blocks.map((block) => (block.kind === "other" ? `other:${block.type}` : block.kind));
  if (JSON.stringify(kinds) !== JSON.stringify(["other:table"])) throw new Error(`${where} must render exactly one table and nothing else; it renders [${kinds.join(", ")}]`);
  const [head, ...rows] = sectionTables(markdown, table.heading, 3, parents).grids[0] ?? [];
  if (JSON.stringify(head ?? null) !== JSON.stringify(table.header)) throw new Error(`${where}: its header row is ${JSON.stringify(head ?? null)}; the census binds ${JSON.stringify(table.header)}`);
  return rows.map((row) => [...row]);
};
const leg = (source: ProbeRecord, id: string): Observation => {
  const found = source.observations.find((observation) => observation.id === id);
  if (found === undefined) throw new Error(`the record has no observation ${id}`);
  return found;
};
/** Canonical JSON: every object's keys in code-point order, arrays in order, no whitespace. */
const canonicalJson = (value: unknown): string =>
  JSON.stringify(value, (_key, inner: unknown) => {
    if (inner === null || typeof inner !== "object" || Array.isArray(inner)) return inner;
    return Object.fromEntries(Object.entries(inner).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0)));
  });
/** The record's measurement: its canonical JSON without utc (the run's clock) and probe (the script tie S-RECORD-TIED computes). */
const measurementOf = (source: ProbeRecord): string => canonicalJson(Object.fromEntries(Object.entries(source).filter(([key]) => key !== "utc" && key !== "probe")));
/** One row of the receipt's Measured record table (ANCHOR-MEASUREMENT holds its field column to MEASURED_FIELDS). */
const measured = (field: MeasuredField): string => {
  const value = receiptTable(RECEIPT_TABLES.measured).find(([name]) => name === field)?.[1];
  if (value === undefined) throw new Error(`${RECEIPT} has no Measured record row ${field}`);
  return value;
};
/** The rendered items of the first list under one receipt entry: that entry's bullets, as a reader sees them. */
const entryItems = (entry: string): string[] => {
  const markdown = repoText(RECEIPT);
  const section = docsSection(markdown, entry, 2, [(markdown.split("\n")[0] ?? "").replace(/^# /, "")]);
  if (!section.ok) throw new Error(`${RECEIPT} entry "${entry}": ${section.why}`);
  if (section.hasHtml) throw new Error(`${RECEIPT} entry "${entry}" carries HTML, which can hide an item`);
  const list = section.blocks.find((block) => block.kind === "list");
  return list?.kind === "list" ? list.items.map((item) => item.text) : [];
};

/** THE RECORD OF ENDS: each row's end, in run order, as `${id}:${count}` (vitest's tally of the row's assertions at its end). */
const REACHED: string[] = [];
/** The titles selected to run, read once from the collected task tree before the first row runs. */
const SELECTED: string[] = [];
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the test doing the reading. */
const registered = (tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] =>
  tasks.flatMap((child): Registered[] => {
    if (child.type === "test") return [{ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self }];
    return child.type === "suite" ? registered(child.tasks, self) : [];
  });
/** Records the calling row's end: its id and vitest's count of its assertions so far. */
const reach = (id: string): void => {
  REACHED.push(`${id}:${expect.getState().assertionCalls}`);
};
/** The receipt's Reached ends table as `${id}:${count}`, in its order. */
const reachedEnds = (): string[] => receiptTable(RECEIPT_TABLES.reached).map(([id, count]) => `${id}:${count}`);

const BASE = "0123456789abcdef0123456789abcdef01234567";
const OTHER = "89abcdef0123456789abcdef0123456789abcdef";
const TASK: Task = { id: "probe-task", kind: "hx.fs/regular-file", root: ".", baseRevision: BASE };
const DIGEST = `sha256:${"ab".repeat(32)}`;
const WORKSPACE = "/scratch/hx-task-scope-probe-x1/task";

/** An observation meeting every condition of task-scope proof; each case breaks it in exactly the place it names. */
const capable = (overrides: Partial<Observation> = {}): Observation => ({
  id: "task-leg",
  query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: `git:${BASE}`, bestEffort: false },
  argv: ["find", "--kind", "hx.fs/regular-file", "--view", `git:${BASE}`, "--workspace", WORKSPACE_TOKEN, "--hxs", "--", "."],
  scope: "task",
  outcome: "result",
  exitCode: 0,
  signal: null,
  terminal: "complete",
  statusKind: "complete",
  terminalReached: true,
  diagnostics: [],
  completeness: "complete",
  licensesAbsence: true,
  coverageScopes: [],
  view: `git:${BASE}`,
  revision: { requested: BASE, resolvedCommit: BASE },
  queryDigest: DIGEST,
  digestSource: "runtime",
  answerCount: 2,
  frames: 12,
  ...overrides,
});

/** One break per reason, in REASONS order: the observation less exactly that condition. */
const ONE_BREAK: readonly (readonly [string, Partial<Observation>])[] = [
  ["process-failed", { outcome: "process-failure" }],
  ["exit-nonzero", { exitCode: 3 }],
  ["terminal-unreached", { terminalReached: false }],
  ["coverage-not-complete", { completeness: "incomplete" }],
  ["absence-unlicensed", { licensesAbsence: false }],
  ["scope-not-task", { scope: "other" }],
  ["revision-unbound", { revision: null }],
  ["revision-mismatch", { revision: { requested: OTHER, resolvedCommit: OTHER } }],
  ["query-digest-absent", { queryDigest: null, digestSource: "absent" }],
];

const CASES: readonly Case[] = [
  {
    id: "S-TASK-CAPABLE",
    row: "STATEMENT",
    kind: "claim",
    title: "an observation meeting every condition of task-scope proof is judged task-scope-supported with no blocker",
    run: () => {
      expect(reasonsOf(capable(), BASE)).toEqual([]);
      expect(judgeTaskScope(TASK, [capable()])).toEqual({ verdict: "task-scope-supported", capable: ["task-leg"], reasons: { "task-leg": [] }, blocker: null });
    },
  },
  {
    id: "S-ONE-CONDITION-EACH",
    row: "STATEMENT",
    kind: "claim",
    title: "the capable observation less exactly one condition is refused for exactly that reason, once per reason",
    run: () => {
      expect(ONE_BREAK.map(([reason]) => reason)).toEqual([...REASONS]);
      for (const [reason, overrides] of ONE_BREAK) {
        expect(reasonsOf(capable(overrides), BASE), reason).toEqual([reason]);
        expect(judgeTaskScope(TASK, [capable(overrides)]).verdict, reason).toBe("task-scope-unsupported");
      }
      for (const completeness of ["unknown", null] as const) {
        expect(reasonsOf(capable({ completeness }), BASE), String(completeness)).toEqual(["coverage-not-complete"]);
      }
      expect(reasonsOf(capable({ revision: { requested: BASE, resolvedCommit: OTHER } }), BASE)).toEqual(["revision-mismatch"]);
      expect(reasonsOf(capable({ digestSource: "absent" }), BASE)).toEqual(["query-digest-absent"]);
      expect(reasonsOf(capable({ queryDigest: null }), BASE)).toEqual(["query-digest-absent"]);
      expect(reasonsOf(capable({ queryDigest: "" }), BASE)).toEqual(["query-digest-absent"]);
      expect(reasonsOf(capable({ exitCode: null, signal: "SIGTERM" }), BASE)).toEqual(["exit-nonzero"]);
    },
  },
  {
    id: "S-VOCABULARY",
    row: "STATEMENT",
    kind: "claim",
    title: "the verdict and reason vocabularies are exactly the judge's, and none of their words names Git or a census",
    run: () => {
      expect([...VERDICTS]).toEqual(["task-scope-supported", "task-scope-unsupported"]);
      expect([...REASONS]).toEqual([
        "process-failed",
        "exit-nonzero",
        "terminal-unreached",
        "coverage-not-complete",
        "absence-unlicensed",
        "scope-not-task",
        "revision-unbound",
        "revision-mismatch",
        "query-digest-absent",
      ]);
      expect([...VERDICTS, ...REASONS].filter((word) => /git|census/i.test(word))).toEqual([]);
    },
  },
  {
    id: "S-RECORD-FOLLOWS-JUDGE",
    row: "STATEMENT",
    kind: "claim",
    title: "the committed record's verdict, capable list, reasons and blocker are the judge's over its own task and observations",
    run: () => {
      const recorded = record();
      expect({ verdict: recorded.verdict, capable: recorded.capable, reasons: recorded.reasons, blocker: recorded.blocker }).toEqual(
        judgeTaskScope(recorded.task, recorded.observations),
      );
      expect(Object.keys(recorded.reasons)).toEqual(recorded.observations.map((observation) => observation.id));
    },
  },
  {
    id: "S-RECORD-TIED",
    row: "STATEMENT",
    kind: "claim",
    title: "the committed record names its schema, bead and requirement and is tied to the probe and judge scripts by SHA-256",
    run: () => {
      const recorded = record();
      expect(recorded.schema).toBe(PROBE_SCHEMA);
      expect(recorded.bead).toBe(BEAD);
      expect(recorded.requirement).toBe("EAT-R057");
      expect(recorded.utc).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/);
      expect(recorded.probe).toEqual({
        script: PROBE_SCRIPT,
        scriptSha256: sha256(readFileSync(join(REPO, PROBE_SCRIPT))),
        judge: JUDGE_SCRIPT,
        judgeSha256: sha256(readFileSync(join(REPO, JUDGE_SCRIPT))),
      });
    },
  },
  {
    id: "A1-PRODUCER-PIN",
    row: "A1",
    kind: "claim",
    title: "the record pins the installed runtime: hx 0.1.0 by the receipt's measured binary SHA-256 and origin, HXS 1.0, protocol hxs/1.0",
    run: () => {
      const { producer } = record();
      expect(producer.name).toBe("hx");
      expect(producer.version).toBe("0.1.0");
      expect(producer.binarySha256).toMatch(/^[0-9a-f]{64}$/);
      expect(producer.binarySha256).toBe(measured("producer.binarySha256"));
      expect(producer.hxsVersion).toBe("1.0");
      expect(producer.protocol).toBe("hxs/1.0");
      expect(["constructor", "config", "env", "path"]).toContain(producer.binaryOrigin);
      expect(producer.binaryOrigin).toBe(measured("producer.binaryOrigin"));
    },
  },
  {
    id: "A1-SDK-PIN",
    row: "A1",
    kind: "claim",
    title: "the record's SDK version is the installed package's, the runtime-reported one and the vendored tarball's",
    run: () => {
      const { producer } = record();
      const installed = (JSON.parse(repoText(SDK_PACKAGE)) as { readonly name?: unknown; readonly version?: unknown }).version;
      const manifest = JSON.parse(repoText("package.json")) as { readonly dependencies?: Readonly<Record<string, string>> };
      expect(producer.sdk.name).toBe("@hyperunix/sdk");
      expect(typeof installed).toBe("string");
      expect(producer.sdk.version).toBe(installed);
      expect(producer.sdk.reported).toBe(installed);
      expect(manifest.dependencies?.["@hyperunix/sdk"]).toBe(`file:vendor/hyperunix-sdk-${String(installed)}.tgz`);
    },
  },
  {
    id: "A1-CAPABILITIES",
    row: "A1",
    kind: "claim",
    title: "the record carries the runtime's capability count, the receipt's measured count, and its task-named capabilities: none",
    run: () => {
      const { producer } = record();
      expect(Number.isInteger(producer.capabilities.count)).toBe(true);
      expect(producer.capabilities.count).toBeGreaterThan(0);
      expect(String(producer.capabilities.count)).toBe(measured("producer.capabilities.count"));
      expect(producer.capabilities.taskNamed).toEqual([]);
    },
  },
  {
    id: "A2-PROBE-LEGS",
    row: "A2",
    kind: "claim",
    title: "the legs are filesystem-live, filesystem-live-best-effort and revision-pinned, recorded in that order",
    run: () => {
      expect(LEGS.map((item) => [item.id, item.bestEffort, item.pinned])).toEqual([
        ["filesystem-live", false, false],
        ["filesystem-live-best-effort", true, false],
        ["revision-pinned", false, true],
      ]);
      expect(record().observations.map((observation) => observation.id)).toEqual(LEGS.map((item) => item.id));
    },
  },
  {
    id: "A2-RECORDED-TASK",
    row: "A2",
    kind: "claim",
    title: "every leg queried the record's task at the receipt's measured base revision; only the pinned leg names git:<base>",
    run: () => {
      const recorded = record();
      const base = recorded.task.baseRevision;
      expect({ id: recorded.task.id, kind: recorded.task.kind, root: recorded.task.root }).toEqual({ ...PROBE_TASK });
      expect(base).toMatch(/^[0-9a-f]{40}$/);
      expect(base).toBe(measured("task.baseRevision"));
      for (const item of LEGS) {
        const observation = leg(recorded, item.id);
        expect(observation.query.operation, item.id).toBe("find");
        expect([observation.query.kind, observation.query.root], item.id).toEqual([recorded.task.kind, recorded.task.root]);
        expect(observation.query.bestEffort, item.id).toBe(item.bestEffort);
        expect(observation.argv.includes("--best-effort"), item.id).toBe(item.bestEffort);
        const viewAt = observation.argv.indexOf("--view");
        if (item.pinned) {
          expect(observation.query.view, item.id).toBe(`git:${base}`);
          expect(observation.argv[viewAt + 1], item.id).toBe(`git:${base}`);
        } else {
          expect(observation.query.view, item.id).toBeNull();
          expect(viewAt, item.id).toBe(-1);
        }
      }
    },
  },
  {
    id: "A3-OBSERVATION-OF-RESULT",
    row: "A3",
    kind: "claim",
    title: "an SDK result maps to every observation field, with the workspace root scrubbed; completeness keeps complete, incomplete and unknown, and seven other readings read null",
    run: () => {
      const observation = observationOf(
        {
          id: "live",
          query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: null, bestEffort: false },
          outcome: "result",
          result: {
            argv: ["find", "--kind", "hx.fs/regular-file", "--workspace", WORKSPACE, "--hxs", "--", "."],
            exitCode: 3,
            signal: null,
            terminal: "partial",
            status: { kind: "incomplete", terminalReached: true, framesTotal: 240 },
            terminalReached: true,
            frames: [{ kind: "header" }, { kind: "end" }],
            diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE", severity: "error", message: `hx find under ${WORKSPACE}`, details: { coverage: "opportunistic" } }],
            coverageSummary: {
              completeness: "incomplete",
              licensesAbsence: false,
              incompleteRegions: [
                { scope: `fs:${WORKSPACE}`, target: "hx.fs/directory-entry" },
                { scope: `fs:${WORKSPACE}`, target: "hx.fs/directory-entry" },
              ],
              certificates: [{ scope: `fs:${WORKSPACE}/src` }, { scope: { path: [], scope: "fs-subtree" } }],
              answerCount: 31,
            },
            view: "hx.view/workspace-head",
            revision: null,
            queryDigest: undefined,
            digestSource: "absent",
          },
        },
        WORKSPACE,
      );
      expect(observation).toEqual({
        id: "live",
        query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: null, bestEffort: false },
        argv: ["find", "--kind", "hx.fs/regular-file", "--workspace", WORKSPACE_TOKEN, "--hxs", "--", "."],
        scope: "filesystem",
        outcome: "result",
        exitCode: 3,
        signal: null,
        terminal: "partial",
        statusKind: "incomplete",
        terminalReached: true,
        diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE", severity: "error", reason: null }],
        completeness: "incomplete",
        licensesAbsence: false,
        coverageScopes: [`fs:${WORKSPACE_TOKEN}`, `fs:${WORKSPACE_TOKEN}/src`, '{"path":[],"scope":"fs-subtree"}'],
        view: "hx.view/workspace-head",
        revision: null,
        queryDigest: null,
        digestSource: "absent",
        answerCount: 31,
        frames: 2,
      });
      const pinned = observationOf(
        {
          id: "pinned",
          query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: `git:${BASE}`, bestEffort: false },
          outcome: "result",
          result: {
            argv: ["find"],
            exitCode: 0,
            signal: null,
            terminal: "complete",
            status: { kind: "complete-empty", terminalReached: true },
            terminalReached: true,
            frames: [],
            diagnostics: [],
            coverageSummary: { completeness: "complete", licensesAbsence: true, incompleteRegions: [], certificates: [], answerCount: 0 },
            view: `git:${BASE}`,
            revision: { requested: BASE.slice(0, 12), resolvedCommit: BASE },
            queryDigest: DIGEST,
            digestSource: "runtime",
          },
        },
        WORKSPACE,
      );
      expect([pinned.statusKind, pinned.revision, pinned.queryDigest, pinned.digestSource, pinned.completeness, pinned.licensesAbsence, pinned.answerCount]).toEqual([
        "complete-empty",
        { requested: BASE.slice(0, 12), resolvedCommit: BASE },
        DIGEST,
        "runtime",
        "complete",
        true,
        0,
      ]);
      // The SDK's third completeness reading, unknown, is kept (never read as complete) and reads coverage-not-complete; each
      // of the seven other readings fed below reads null. The complete control differs from the unknown one only there.
      const readingOf = (completeness: unknown): Observation =>
        observationOf(
          {
            id: "reading",
            query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: `git:${BASE}`, bestEffort: false },
            outcome: "result",
            result: {
              argv: ["find"],
              exitCode: 0,
              signal: null,
              terminal: "complete",
              status: { kind: "complete", terminalReached: true },
              terminalReached: true,
              frames: [],
              diagnostics: [],
              coverageSummary: { completeness, licensesAbsence: true, incompleteRegions: [], certificates: [], answerCount: 0 },
              view: `git:${BASE}`,
              revision: { requested: BASE, resolvedCommit: BASE },
              queryDigest: DIGEST,
              digestSource: "runtime",
            },
          },
          WORKSPACE,
        );
      const unknown = readingOf("unknown");
      expect(unknown.completeness).toBe("unknown");
      expect(reasonsOf(unknown, BASE)).toEqual(["coverage-not-complete", "scope-not-task"]);
      expect(reasonsOf({ ...unknown, scope: "task" }, BASE)).toEqual(["coverage-not-complete"]);
      expect(reasonsOf(readingOf("complete"), BASE)).toEqual(["scope-not-task"]);
      for (const other of ["partial", "Complete", "", 1, true, null, undefined]) expect(readingOf(other).completeness, String(other)).toBeNull();
    },
  },
  {
    id: "A3-OBSERVATION-OF-FAILURE",
    row: "A3",
    kind: "claim",
    title: "an SDK process failure maps to a process-failure observation: exit, terminal class, diagnostic code and reason",
    run: () => {
      const observation = observationOf(
        {
          id: "pinned",
          query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: `git:${BASE}`, bestEffort: false },
          outcome: "process-failure",
          terminal: "provider_failed",
          result: {
            argv: ["find", "--kind", "hx.fs/regular-file", "--view", `git:${BASE}`, "--workspace", WORKSPACE, "--hxs", "--", "."],
            exitCode: 4,
            signal: null,
            terminalReached: false,
            frames: [],
            diagnostics: [
              {
                code: "HX-RUNTIME-INTERNAL-FAILURE",
                severity: "fatal",
                message: "hx find binds no view in this build",
                details: { reason: `view-binding-pending: hx find under --view git:${BASE} in ${WORKSPACE}` },
              },
            ],
          },
        },
        WORKSPACE,
      );
      expect(observation).toEqual({
        id: "pinned",
        query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: `git:${BASE}`, bestEffort: false },
        argv: ["find", "--kind", "hx.fs/regular-file", "--view", `git:${BASE}`, "--workspace", WORKSPACE_TOKEN, "--hxs", "--", "."],
        scope: "filesystem",
        outcome: "process-failure",
        exitCode: 4,
        signal: null,
        terminal: "provider_failed",
        statusKind: null,
        terminalReached: false,
        diagnostics: [{ code: "HX-RUNTIME-INTERNAL-FAILURE", severity: "fatal", reason: `view-binding-pending: hx find under --view git:${BASE} in ${WORKSPACE_TOKEN}` }],
        completeness: null,
        licensesAbsence: false,
        coverageScopes: [],
        view: null,
        revision: null,
        queryDigest: null,
        digestSource: "absent",
        answerCount: null,
        frames: 0,
      });
      const killed = observationOf(
        {
          id: "killed",
          query: { operation: "find", kind: "hx.fs/regular-file", root: ".", view: null, bestEffort: false },
          outcome: "process-failure",
          terminal: "backend_failed",
          result: { argv: ["find"], exitCode: null, signal: "SIGKILL", terminalReached: false, frames: [{ kind: "header" }], diagnostics: [] },
        },
        WORKSPACE,
      );
      expect([killed.exitCode, killed.signal, killed.terminal, killed.frames, killed.diagnostics]).toEqual([null, "SIGKILL", "backend_failed", 1, []]);
      expect(reasonsOf(killed, BASE)).toEqual(REASONS.filter((reason) => reason !== "revision-mismatch"));
    },
  },
  {
    id: "A3-TASK-DIGEST",
    row: "A3",
    kind: "claim",
    title: "the task digest is sha256 of the task's canonical JSON, independent of key order, and moves with each field",
    run: () => {
      const canonical = JSON.stringify({ baseRevision: BASE, id: TASK.id, kind: TASK.kind, root: TASK.root });
      expect(taskDigest(TASK)).toBe(`sha256:${sha256(canonical)}`);
      expect(taskDigest({ root: ".", baseRevision: BASE, kind: "hx.fs/regular-file", id: "probe-task" })).toBe(taskDigest(TASK));
      const moved = [{ ...TASK, id: "other-task" }, { ...TASK, kind: "hx.fs/directory" }, { ...TASK, root: "src" }, { ...TASK, baseRevision: OTHER }].map(taskDigest);
      expect(new Set([taskDigest(TASK), ...moved]).size).toBe(5);
    },
  },
  {
    id: "A3-RECORDED-RESPONSES",
    row: "A3",
    kind: "claim",
    title: "measured: live legs exit 3 partial and 0 complete, coverage incomplete on both, at the receipt's counts; the pinned leg is refused, exit 4",
    run: () => {
      const recorded = record();
      expect(recorded.task.digest).toBe(taskDigest(recorded.task));
      expect(recorded.task.digest).toBe(measured("task.digest"));
      const live = leg(recorded, "filesystem-live");
      const bestEffort = leg(recorded, "filesystem-live-best-effort");
      expect([live.outcome, live.exitCode, live.terminal, live.statusKind]).toEqual(["result", 3, "partial", "incomplete"]);
      expect([bestEffort.outcome, bestEffort.exitCode, bestEffort.terminal, bestEffort.statusKind]).toEqual(["result", 0, "complete", "incomplete"]);
      for (const observation of [live, bestEffort]) {
        expect(observation.terminalReached, observation.id).toBe(true);
        expect(observation.diagnostics.map((item) => item.code), observation.id).toEqual(["HX-COVERAGE-INCOMPLETE"]);
        expect([observation.completeness, observation.licensesAbsence], observation.id).toEqual(["incomplete", false]);
        expect(observation.coverageScopes, observation.id).toEqual([`fs:${WORKSPACE_TOKEN}`, JSON.stringify({ path: [], scope: "fs-subtree" })]);
        expect([observation.view, observation.revision, observation.queryDigest, observation.digestSource], observation.id).toEqual([
          "hx.view/workspace-head",
          null,
          null,
          "absent",
        ]);
        expect(Number.isInteger(observation.answerCount) && Number(observation.answerCount) > 0, observation.id).toBe(true);
      }
      expect([live.answerCount, live.frames].map(String)).toEqual([measured("filesystem-live.answerCount"), measured("filesystem-live.frames")]);
      expect([bestEffort.answerCount, bestEffort.frames].map(String)).toEqual([
        measured("filesystem-live-best-effort.answerCount"),
        measured("filesystem-live-best-effort.frames"),
      ]);
      const pinned = leg(recorded, "revision-pinned");
      expect([pinned.outcome, pinned.exitCode, pinned.terminal, pinned.terminalReached, pinned.frames]).toEqual(["process-failure", 4, "provider_failed", false, 0]);
      expect(pinned.diagnostics).toEqual([
        { code: "HX-RUNTIME-INTERNAL-FAILURE", severity: "fatal", reason: `view-binding-pending: hx find under --view git:${recorded.task.baseRevision}` },
      ]);
      expect([pinned.completeness, pinned.licensesAbsence, pinned.view, pinned.revision, pinned.queryDigest]).toEqual([null, false, null, null, null]);
    },
  },
  {
    id: "A3-NO-HOST-PATH",
    row: "A3",
    kind: "claim",
    title: "the record carries no host path, and every --workspace argument reads the workspace token",
    run: () => {
      const recorded = record();
      const text = JSON.stringify(recorded);
      for (const fragment of ["/tmp/", "/home/", "/workplace/", "/Users/", "/var/", "hx-task-scope-probe-"]) expect(text.includes(fragment), fragment).toBe(false);
      for (const observation of recorded.observations) {
        const at = observation.argv.indexOf("--workspace");
        expect(at, observation.id).toBeGreaterThanOrEqual(0);
        expect(observation.argv[at + 1], observation.id).toBe(WORKSPACE_TOKEN);
      }
    },
  },
  {
    id: "A4-MISSING-WITNESS",
    row: "A4",
    kind: "claim",
    title: "no observation at all is task-scope-unsupported with a missing-witness blocker",
    run: () => {
      expect(judgeTaskScope(TASK, [])).toEqual({
        verdict: "task-scope-unsupported",
        capable: [],
        reasons: {},
        blocker: { gate: "HX-TASK-SCOPE-PROBE", scope: "native-task-scope", witness: "missing", notBlocked: ["git-census"] },
      });
    },
  },
  {
    id: "A4-UNSUPPORTED-WITNESS",
    row: "A4",
    kind: "claim",
    title: "observations that all fail are task-scope-unsupported with an unsupported-witness blocker and each one's reasons",
    run: () => {
      const judged = judgeTaskScope(TASK, [capable({ id: "a", exitCode: 3 }), capable({ id: "b", revision: null }), capable({ id: "c" })]);
      expect(judged.verdict).toBe("task-scope-supported");
      const refused = judgeTaskScope(TASK, [capable({ id: "a", exitCode: 3 }), capable({ id: "b", revision: null })]);
      expect(refused).toEqual({
        verdict: "task-scope-unsupported",
        capable: [],
        reasons: { a: ["exit-nonzero"], b: ["revision-unbound"] },
        blocker: { gate: "HX-TASK-SCOPE-PROBE", scope: "native-task-scope", witness: "unsupported", notBlocked: ["git-census"] },
      });
    },
  },
  {
    id: "A4-SCOPE-ONLY",
    row: "A4",
    kind: "claim",
    title: "every blocker is scoped exactly native-task-scope with git-census its only notBlocked mode; supported has none",
    run: () => {
      expect([GATE, BLOCKER_SCOPE, [...NOT_BLOCKED]]).toEqual(["HX-TASK-SCOPE-PROBE", "native-task-scope", ["git-census"]]);
      const samples = [judgeTaskScope(TASK, []), judgeTaskScope(TASK, [capable({ exitCode: 1 })]), judgeTaskScope(TASK, [capable()])];
      for (const judged of samples) {
        expect(judged.blocker === null, judged.verdict).toBe(judged.verdict === "task-scope-supported");
        if (judged.blocker !== null) {
          expect(Object.keys(judged.blocker).sort()).toEqual(["gate", "notBlocked", "scope", "witness"]);
          expect(judged.blocker.scope).toBe(BLOCKER_SCOPE);
          expect([...judged.blocker.notBlocked]).toEqual(["git-census"]);
          expect([judged.blocker.gate, judged.blocker.scope, judged.blocker.witness].some((value) => /git|census/i.test(value))).toBe(false);
        }
      }
    },
  },
  {
    id: "A4-RECORDED-BLOCKER",
    row: "A4",
    kind: "claim",
    title: "the committed record is task-scope-unsupported with an unsupported-witness blocker on gate HX-TASK-SCOPE-PROBE",
    run: () => {
      const recorded = record();
      expect(recorded.gate).toBe(GATE);
      expect([recorded.verdict, recorded.capable]).toEqual(["task-scope-unsupported", []]);
      expect(recorded.blocker).toEqual({ gate: GATE, scope: BLOCKER_SCOPE, witness: "unsupported", notBlocked: ["git-census"] });
    },
  },
  {
    id: "M-COMPLETE-FILESYSTEM",
    row: "MUTANT",
    kind: "claim",
    title: "a complete filesystem response, even revision-bound with a runtime digest, is never capable task proof",
    kills: "Treat a complete filesystem response as capable task proof.",
    run: () => {
      const complete = capable({ scope: "filesystem" });
      expect(reasonsOf(complete, BASE)).toEqual(["scope-not-task"]);
      expect(judgeTaskScope(TASK, [complete]).verdict).toBe("task-scope-unsupported");
      const asTheRigReadsIt = capable({ scope: "filesystem", view: "hx.view/workspace-head", revision: null, queryDigest: null, digestSource: "absent" });
      expect(reasonsOf(asTheRigReadsIt, BASE)).toEqual(["scope-not-task", "revision-unbound", "query-digest-absent"]);
    },
  },
  {
    id: "M-TERMINAL-COMPLETE",
    row: "MUTANT",
    kind: "claim",
    title: "the measured best-effort shape (exit 0, terminal complete, coverage incomplete) is never capable task proof",
    run: () => {
      const shape = capable({
        scope: "filesystem",
        terminal: "complete",
        statusKind: "incomplete",
        completeness: "incomplete",
        licensesAbsence: false,
        view: "hx.view/workspace-head",
        revision: null,
        queryDigest: null,
        digestSource: "absent",
      });
      expect(reasonsOf(shape, BASE)).toEqual(["coverage-not-complete", "absence-unlicensed", "scope-not-task", "revision-unbound", "query-digest-absent"]);
      expect(judgeTaskScope(TASK, [shape]).capable).toEqual([]);
    },
  },
  {
    id: "M-SCOPE-OF-KIND",
    row: "MUTANT",
    kind: "claim",
    title: "every hx.fs kind reads filesystem scope and no kind reads task; every recorded observation is filesystem scope",
    run: () => {
      for (const kind of ["hx.fs/regular-file", "hx.fs/directory", "hx.fs/symlink", "hx.fs/directory-entry"]) expect(scopeOfKind(kind), kind).toBe("filesystem");
      for (const kind of ["task", "hx.task/scope", "hx.lang/symbol", "hx.git/commit", "hx.fs", "fs/regular-file", ""]) expect(scopeOfKind(kind), kind).toBe("other");
      for (const observation of record().observations) {
        expect([observation.scope, scopeOfKind(observation.query.kind)], observation.id).toEqual(["filesystem", "filesystem"]);
      }
    },
  },
  {
    id: "QUIET-DECLARED-SCOPE",
    row: "MUTANT",
    kind: "quiet",
    title: "R-DECLARED-SCOPE: an observation's declared task scope is read as declared, so a synthetic one is judged capable",
    run: () => {
      const declared = capable({ id: "synthetic", argv: ["find"], coverageScopes: [`fs:${WORKSPACE_TOKEN}`] });
      expect(judgeTaskScope(TASK, [declared])).toEqual({ verdict: "task-scope-supported", capable: ["synthetic"], reasons: { synthetic: [] }, blocker: null });
    },
  },
  {
    id: "QUIET-REQUESTED-SPELLING",
    row: "STATEMENT",
    kind: "quiet",
    title: "R-REQUESTED-SPELLING: only the resolved commit is compared, so a requested HEAD that resolves to the base passes",
    run: () => {
      expect(reasonsOf(capable({ revision: { requested: "HEAD", resolvedCommit: BASE } }), BASE)).toEqual([]);
      expect(reasonsOf(capable({ revision: { requested: BASE.slice(0, 12), resolvedCommit: BASE } }), BASE)).toEqual([]);
    },
  },
];

/** The census rows: each a field of the vendored EAT-R057 block (A1-A4 tile its Acceptance) and the cases that pin it. */
const ROWS: readonly { readonly id: RowId; readonly field: RosterField; readonly text: string; readonly pins: readonly string[] }[] = [
  {
    id: "STATEMENT",
    field: "Statement",
    text: "The HX probe MUST record whether installed producer can supply task-scope proof.",
    pins: ["S-TASK-CAPABLE", "S-ONE-CONDITION-EACH", "S-VOCABULARY", "S-RECORD-FOLLOWS-JUDGE", "S-RECORD-TIED"],
  },
  { id: "A1", field: "Acceptance", text: "Pin installed HX version", pins: ["A1-PRODUCER-PIN", "A1-SDK-PIN", "A1-CAPABILITIES"] },
  { id: "A2", field: "Acceptance", text: "query actual task/revision", pins: ["A2-PROBE-LEGS", "A2-RECORDED-TASK"] },
  {
    id: "A3",
    field: "Acceptance",
    text: "capture terminal response and task/query digest plus coverage",
    pins: ["A3-OBSERVATION-OF-RESULT", "A3-OBSERVATION-OF-FAILURE", "A3-TASK-DIGEST", "A3-RECORDED-RESPONSES", "A3-NO-HOST-PATH"],
  },
  {
    id: "A4",
    field: "Acceptance",
    text: "Record unsupported/missing witness as blocker scoped only to native-task-scope, not Git census",
    pins: ["A4-MISSING-WITNESS", "A4-UNSUPPORTED-WITNESS", "A4-SCOPE-ONLY", "A4-RECORDED-BLOCKER"],
  },
  {
    id: "MUTANT",
    field: "Adversarial mutant",
    text: "Treat a complete filesystem response as capable task proof.",
    pins: ["M-COMPLETE-FILESYSTEM", "M-TERMINAL-COMPLETE", "M-SCOPE-OF-KIND"],
  },
];

/** The named residual families, each with its row and its pinned quiet case. */
const RESIDUALS: readonly { readonly id: string; readonly row: RowId; readonly quiet: string }[] = [
  { id: "R-DECLARED-SCOPE", row: "MUTANT", quiet: "QUIET-DECLARED-SCOPE" },
  { id: "R-REQUESTED-SPELLING", row: "STATEMENT", quiet: "QUIET-REQUESTED-SPELLING" },
];

/** The shape and anchor rows, registered after the cases; each records its end in REACHED as a case does. */
const ANCHOR_ROWS: readonly { readonly id: string; readonly title: string; readonly run: () => void }[] = [
  {
    id: "FROZEN-SHAPE",
    title: "frozen shape (rule 16): the rows, their pin counts, the residual families, the anchor rows and the measured fields are exactly the cut's",
    run: () => {
      expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["STATEMENT:5", "A1:3", "A2:2", "A3:5", "A4:4", "MUTANT:3"]);
      expect(RESIDUALS.map((residual) => `${residual.id}:${residual.row}:${residual.quiet}`)).toEqual([
        "R-DECLARED-SCOPE:MUTANT:QUIET-DECLARED-SCOPE",
        "R-REQUESTED-SPELLING:STATEMENT:QUIET-REQUESTED-SPELLING",
      ]);
      expect(ANCHOR_ROWS.map((row) => row.id)).toEqual(["FROZEN-SHAPE", "TILING", "ANCHOR-ROSTER", "ANCHOR-EXPORT", "ANCHOR-RECEIPT-TABLES", "ANCHOR-MEASUREMENT"]);
      expect([...MEASURED_FIELDS]).toEqual([
        "task.baseRevision",
        "task.digest",
        "producer.binarySha256",
        "producer.binaryOrigin",
        "producer.capabilities.count",
        "filesystem-live.answerCount",
        "filesystem-live.frames",
        "filesystem-live-best-effort.answerCount",
        "filesystem-live-best-effort.frames",
        "measurement.sha256",
      ]);
    },
  },
  {
    id: "TILING",
    title: "the rows and residuals tile the cases: each case is pinned once, by a row or residual of its own row and kind; every row id is distinct",
    run: () => {
      const ids = CASES.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
      const placed = [...ROWS.flatMap((row) => row.pins.map((pin) => [pin, row.id, "claim"] as const)), ...RESIDUALS.map((residual) => [residual.quiet, residual.row, "quiet"] as const)];
      expect(placed.map(([id]) => id).sort()).toEqual([...ids].sort());
      for (const [id, row, kind] of placed) {
        const pinned = CASES.find((item) => item.id === id);
        expect(pinned?.row, id).toBe(row);
        expect(pinned?.kind, id).toBe(kind);
      }
      const every = [REGISTRATION_ID, ...ids, ...ANCHOR_ROWS.map((row) => row.id), LIVENESS_ID];
      expect(new Set(every).size).toBe(every.length);
    },
  },
  {
    id: "ANCHOR-ROSTER",
    title: "outside anchor: the roster vendors EAT-R057 under its SHA-256, and the rows are its Statement, Acceptance and mutant",
    run: () => {
      const vendored = roster();
      expect(vendored.bead).toBe(BEAD);
      expect(vendored.source.commit).toMatch(/^[0-9a-f]{40}$/);
      expect(vendored.source.path).toBe("docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md");
      expect(vendored.requirements.map((requirement) => requirement.id)).toEqual(["EAT-R057"]);
      const requirement = vendored.requirements[0];
      if (requirement === undefined) throw new Error("the roster vendors no requirement");
      expect(sha256(requirement.text.join("\n"))).toBe(requirement.sha256);
      expect(requirement.text[0]?.startsWith("### EAT-R057 ")).toBe(true);
      for (const row of ROWS.filter((candidate) => candidate.field !== "Acceptance")) expect(row.text, row.id).toBe(field(requirement, row.field));
      const acceptance = field(requirement, "Acceptance");
      let rest = acceptance;
      let cursor = -1;
      for (const row of ROWS.filter((candidate) => candidate.field === "Acceptance")) {
        const at = acceptance.indexOf(row.text);
        expect(at, row.id).toBeGreaterThan(cursor);
        cursor = at;
        rest = rest.replace(row.text, "");
      }
      expect(rest).toMatch(/^[\s,.]*$/);
      expect(new Set(ROWS.map((row) => row.field))).toEqual(new Set<RosterField>(["Statement", "Acceptance", "Adversarial mutant"]));
      const kills = CASES.filter((item) => item.kills !== undefined);
      expect(kills.map((item) => [item.row, item.kind, item.kills])).toEqual([["MUTANT", "claim", field(requirement, "Adversarial mutant")]]);
    },
  },
  {
    id: "ANCHOR-EXPORT",
    title: "outside anchor: this bead's row of the tracked export names exactly EAT-R057 and the gate the judge and record carry",
    run: () => {
      const rows = rehydrateTrackerExport(repoText(EXPORT), join(REPO, EXPORT))
        .split("\n")
        .filter((line) => line.includes(`"id":"${BEAD}"`))
        .map((line) => JSON.parse(line) as { readonly id?: unknown; readonly description?: unknown })
        .filter((row) => row.id === BEAD);
      expect(rows).toHaveLength(1);
      const description = String(rows[0]?.description);
      expect(description.match(/EAT-R\d{3}/g)).toEqual(roster().requirements.map((requirement) => requirement.id));
      expect(description).toContain(`real-infra gate: ${GATE}`);
      expect(roster().group.text).toContain(`(slice PI-5; owner Pi; external: HX-PRODUCER; gate: ${GATE})`);
    },
  },
  {
    id: "ANCHOR-RECEIPT-TABLES",
    title: "outside anchor: the receipt's judged-pin and residual tables name exactly the rows' pins and the residual families, and its reached-ends table every row",
    run: () => {
      expect(ROWS.flatMap((row) => row.pins.map((pin) => [row.id, pin]))).toStrictEqual(receiptTable(RECEIPT_TABLES.pins));
      expect(RESIDUALS.map((residual) => [residual.id, residual.quiet])).toStrictEqual(receiptTable(RECEIPT_TABLES.residuals));
      const reached = receiptTable(RECEIPT_TABLES.reached);
      expect(reached.map(([id]) => id)).toStrictEqual([REGISTRATION_ID, ...CASES.map((item) => item.id), ...ANCHOR_ROWS.map((row) => row.id), LIVENESS_ID]);
      expect(reached.filter(([, count]) => !/^[1-9]\d*$/.test(count ?? "")).map(([id]) => id), "a row whose assertion count is not a positive integer").toEqual([]);
    },
  },
  {
    id: "ANCHOR-MEASUREMENT",
    title: "outside anchor: the receipt's measured-record table holds nine record literals and the record's measurement SHA-256; its SHA-256 and count are the cut-1 version pin's, its base and digest the cut-1 abbreviations'",
    run: () => {
      expect(receiptTable(RECEIPT_TABLES.measured).map(([name]) => name)).toStrictEqual([...MEASURED_FIELDS]);
      expect(sha256(measurementOf(record()))).toBe(measured("measurement.sha256"));
      const items = entryItems(RECEIPT_ENTRY);
      const pin = items.filter((text) => text.startsWith("Version pin, measured "));
      expect(pin).toHaveLength(1);
      expect(pin[0]).toContain(`binary SHA-256 ${measured("producer.binarySha256")},`);
      expect(pin[0]).toContain(`lists ${measured("producer.capabilities.count")} capabilities`);
      const task = items.filter((text) => text.startsWith("EAT-R057 "));
      expect(task).toHaveLength(1);
      expect(task[0]).toContain(`base revision ${measured("task.baseRevision").slice(0, 12)} is reproducible`);
      expect(task[0]).toContain(`Task digest ${measured("task.digest").slice(0, "sha256:".length + 12)},`);
    },
  },
];

const caseTitle = (item: Case): string => `${item.id} [${item.row}] ${item.title}`;
/** Every test this file registers, in registration order: the registration row, the cases, the anchor rows, the liveness row. */
const registeredTitles = (): string[] => [REGISTRATION_TITLE, ...CASES.map(caseTitle), ...ANCHOR_ROWS.map((row) => row.title), LIVENESS_TITLE];
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;

// The selection, read once from the collected task tree before the first row runs (no row has run, so every mode is the collected one).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registered(task.file.tasks).filter((entry) => entry.mode === "run").map((entry) => entry.name));
});
// The file-end judge: a liveness row selected to run reached its own end, after every other row's, with the receipt's count.
afterAll(() => {
  if (!SELECTED.includes(LIVENESS_TITLE)) return;
  expect(REACHED, "every row of this file reached its end, the liveness row last, each with the receipt's assertion count").toEqual(reachedEnds());
});

describe("wb-f3wd installed-HX task-scope census: EAT-R057 (MWI B-hx-evidence, gate HX-TASK-SCOPE-PROBE)", () => {
  it(REGISTRATION_TITLE, ({ task }) => {
    // The collected tree, read before any other row runs: a row this file lists but the tree lacks, renamed, skipped or inverted
    // reds here (a row dropped from the lists as well reds at the receipt's Reached ends table).
    const collected = registered(task.file.tasks, task);
    expect(
      collected.map((entry) => entry.name),
      "every registered test of this file (vitest task tree), exactly and in order",
    ).toEqual(registeredTitles());
    expect(
      collected.findIndex((entry) => entry.self),
      "this row finds itself by task identity, registered first",
    ).toBe(0);
    expect(
      collected.filter((entry) => entry.mode !== "run" || entry.fails).map(modeLine),
      "every registered test is set to run and not inverted",
    ).toEqual([]);
    reach(REGISTRATION_ID);
  });

  for (const item of CASES) {
    it(caseTitle(item), () => {
      item.run();
      reach(item.id);
    });
  }

  for (const row of ANCHOR_ROWS) {
    it(row.title, () => {
      row.run();
      reach(row.id);
    });
  }

  it(LIVENESS_TITLE, ({ task }) => {
    const walked = registered(task.file.tasks, task);
    expect(
      walked.map((entry) => entry.name),
      "every registered test of this file (vitest task tree), exactly and in order",
    ).toEqual(registeredTitles());
    expect(
      walked.findIndex((entry) => entry.self),
      "this row finds itself by task identity, registered last",
    ).toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const unrun = walked.filter((entry) => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state)));
    expect(
      unrun.map((entry) => `${modeLine(entry)} | ${entry.state ?? "no result"}`),
      "every other test is set to run, not inverted, and ran before this row",
    ).toEqual([]);
    expect(REACHED, "every row before this one reached its end, in run order, with the receipt's assertion count").toEqual(reachedEnds().slice(0, -1));
    reach(LIVENESS_ID);
  });
});

import { rehydrateTrackerExport } from "../qa/workbench/tracker-export.mjs";
