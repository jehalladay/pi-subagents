/**
 * wb-mwsy (MNI packet P06, MWI effects slice PI-4): the journal rows of one hosted function invocation, driven through the
 * workflow_execute tool object src/index.ts registers with one injected installed host (evidence level V3, injected callbacks;
 * never a native MechanicalWorkflows run), each read back from the invocation's journal file, <invocation id>.workflow.jsonl in
 * the session's task directory (the file name and directory a script run's journal uses).
 *
 * Requirements: EAT-R041 and EAT-R042 of docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at 0b25e14e, and EAT-R250 of docs/workbench/programs/mechanical-native-interoperability-2026-11-09/
 * requirements/ATOMIC-REQUIREMENTS.md at 18b016b2, which extends both.
 *
 * PINNED READER SET (this file; each case by its title, verbatim and in order, then the requirement words it pins):
 * - FJ01: with the session's task directory path held by a file, the launch refuses launch-failed with the intent reason and does not start the installed host; with the path free, the same request launches
 *   EAT-R041 "Fault durable intent write; assert no import callback can write/claim/gate": the reply is launch-failed with the
 *   fixed intent reason, the installed host's start is called zero times and the file stays empty; once the path is free the
 *   same request replies launched and the start is called once.
 * - FJ02: inside the installed host's start, before it answers, the journal holds exactly the intent row, carrying the invocation, its authority and its measured source identity
 *   EAT-R041 "Successful persist includes invocation, authority and measured source identity" and EAT-R250 criterion 1 (its
 *   parked form): the one row read inside the start is a dispatched marker whose intent equals the reply's invocation
 *   reference, the definition id and digest, the admission's input digest, the final boundary's principal, session, grants and
 *   SDK rights, the source admission's operator and measured source identity, and the admitted package identity.
 * - FJ03: an installed host that counts the start and then rejects it leaves the reply launch-failed and the journal holding exactly the intent row
 *   EAT-R042 "Drop reply after producer accepted start; retained journal has dispatched intent with native ref or
 *   start-unknown, no fabricated settlement" (its start-unknown form) and EAT-R250 criterion 1 (its killed form).
 * - FJ04: once the start answered and while the settlement is parked, the journal holds exactly the intent row, then a dispatched marker carrying the native reference and no intent
 *   EAT-R042 (its native-ref form): the second row is a dispatched marker carrying the host's native reference, and no settled
 *   row follows while the settlement is parked.
 * - FJ05: a settled run's journal holds exactly the intent row, the dispatched row and the settled row, in that file order
 *   EAT-R250 criterion 2 "the journal shows the intent row strictly before the dispatch row, with native refs appended at
 *   settlement": the settled row is no marker, reads ok, and carries the host's native reference.
 * - FJ06: a run whose settlement rejects leaves the journal holding exactly the intent row and the dispatched row
 *   EAT-R042 "no fabricated settlement", for a rejected settlement.
 * - FJ07: readJournal and classifyJournal each keep the three rows and drop an intent row with a number for a string, an intent row with grants that are not a list, and an agent row that carries an intent
 *   the readers of those rows: readJournal (journal.ts) and classifyJournal (journal-compat.ts) agree, and classifyJournal
 *   names the intent field as invalid for each drop.
 * - FJ08: the header's pinned reader set lists exactly this file's case titles, in order, each verbatim
 *   the binding of this header to the cases: a bullet reworded or a case renamed on one side only reds it.
 * Adversarial mutants, each run red on a throwaway copy at cut time (the delivery note records the counts): EAT-R041 "Move
 * persistence after provider call" (FJ01, FJ02); EAT-R042 "Write dispatch and settlement as one terminal row" (FJ04, FJ05);
 * EAT-R250 criterion 3 "removing the intent write" (FJ01, FJ02, FJ03, FJ05); a settled row written for a rejected start or a
 * rejected settlement (FJ03, FJ06); the intent clause dropped from either reader (FJ07).
 *
 * NOT CLAIMED by this suite (scope sentences):
 * - EAT-R043, EAT-R044 and the controls requirements EAT-R045 to EAT-R050 are NOT CLAIMED by this suite, nor EAT-R249 and
 *   EAT-R251 to EAT-R259 of the MNI program.
 * - A reader that consumes the function journal (a later run, a restart, workflow_reconcile or workflow_observe) is NOT CLAIMED
 *   by this suite: none reads it at this cut.
 * - A write fault other than the task directory path held by a file (a full disk, a read-only file system, a lost read-back)
 *   is NOT CLAIMED by this suite; journalAppender's read-back is the dispatch-wiring suite's SEAM-READBACK case.
 * - Durability past the read-back (a flush to the device, a crash of the host process) is NOT CLAIMED by this suite.
 * - A real installed MechanicalWorkflows package or its native evidence (P07, V4) is NOT CLAIMED by this suite.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT } from "../src/workbench/execute.js";
import type { FunctionHostStart, FunctionHostStarted, WorkflowFunctionHosting } from "../src/workbench/execute-tool.js";
import { adoptFunctionActions, type FunctionActionContract } from "../src/workbench/function-authority.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { measureSourceIdentity, type SourceAdmissionHost, type SourceGitReader, WriteBoundaryAuthority, WriterLeases } from "../src/workbench/source-admission.js";
import { readJournal } from "../src/workflow/journal.js";
import { classifyJournal } from "../src/workflow/journal-compat.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const CASE_MS = 60_000;
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_SCHEMA = "mechanical-workflows/entrypoint/v1";
const DIGEST = `sha256:${"ab".repeat(32)}`;
const PACKAGE = `sha256:${"cd".repeat(32)}`;
/** The TEST FIXTURE action spelling the P03 and P04 suites bind; no spelling is adopted for Pi (the P00 ruling). */
const ACTION = "fixture-fn:develop-write";
const OPERATOR = "operator-1";
const TASK: JsonValue = { task: "t", workspaceId: "w", baseRevision: "r" };
const WRITES: JsonValue = { allowWrites: true };
const NATIVE: NativeRef = { provider: "mechanical-fixture", type: "invocation", id: "mw-inv-0001" };
const CONTRACT: FunctionActionContract = adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: ACTION }]);
const RIGHTS: readonly string[] = [EXECUTE_GRANT, ACTION];
const FUNCTION_REF = { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST } as const;
/** The launch-failed reason when the intent row does not reach the journal (src/index.ts). */
const INTENT_UNWRITTEN = "the invocation intent row did not reach the journal; the installed host was not started";
/** The rejection the FJ03 host answers its start with, after counting it. */
const REPLY_LOST = "the reply of the installed host was lost";
const SESSION = "s1";

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi P06 Fixture", "-c", "user.email=p06-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];
const FIXTURE_ENV: NodeJS.ProcessEnv = Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name)));

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, env: FIXTURE_ENV, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
/** The source host's SourceGitReader: real git in the directory, the locating variables removed. */
const gitReader: SourceGitReader = (directory, args) => {
  try {
    return execFileSync("git", ["-C", directory, ...args], { env: FIXTURE_ENV, encoding: "buffer", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 30_000 });
  } catch {
    return undefined;
  }
};

/** A promise a case opens or fails by hand. */
interface Barrier<T> {
  readonly promise: Promise<T>;
  open(value: T): void;
  fail(error: unknown): void;
}
function barrier<T>(): Barrier<T> {
  let open: (value: T) => void = () => undefined;
  let fail: (error: unknown) => void = () => undefined;
  const promise = new Promise<T>((resolve, reject) => {
    open = resolve;
    fail = reject;
  });
  promise.catch(() => undefined);
  return { promise, open, fail };
}

interface Reply {
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: string;
  readonly invocationId?: string;
  readonly error?: { readonly code: string; readonly message: string };
}
type Row = Record<string, unknown>;
interface WorldOptions {
  /** The installed host counts its start, then rejects it: the start's reply is lost. */
  readonly startRejects?: boolean;
}

let sandbox: Hermetic | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
}, CASE_MS);

/** The invocation's journal file: <invocation id>.workflow.jsonl in the session's task directory. */
function journalOf(dir: string, invocationId: string): string {
  return join(sessionTaskDir(dir, SESSION), `${invocationId}.workflow.jsonl`);
}
/** Every line of the invocation's journal, parsed, in file order; none when the file does not exist or its directory cannot be made. */
function rowsOf(dir: string, invocationId: string): Row[] {
  let path: string;
  try {
    path = journalOf(dir, invocationId);
  } catch {
    return [];
  }
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(line => line !== "")
    .map(line => JSON.parse(line) as Row);
}

/**
 * Boots the real extension in a hermetic sandbox that is a clean Git worktree (.pi/ ignored), with one injected installed host
 * composed. Source admission is real over that worktree, its attestation minted by the host's own authority; the package host
 * admits one installed package identity. The host's start reads the journal before it answers; its run settles when the case
 * opens or fails the settlement it returned.
 */
async function boot(options: WorldOptions = {}) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...RIGHTS] } } });
  const dir = sandbox.dir;
  git(dir, "init", "-q");
  writeFileSync(join(dir, "README.md"), "# p06 fixture\n");
  writeFileSync(join(dir, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(dir, ".gitignore"), ".pi/\n");
  git(dir, "add", "README.md", "forge.toml", ".gitignore");
  git(dir, "commit", "-q", "--no-verify", "-m", "p06 fixture base");
  const workspace = realpathSync(dir);
  const measured = measureSourceIdentity(workspace, "forge.toml", gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  const authority = new WriteBoundaryAuthority();
  const source: SourceAdmissionHost = {
    authorizedRoot: workspace,
    gateManifest: "forge.toml",
    git: gitReader,
    authority,
    attestation: authority.attest(OPERATOR, measured.identity),
    leases: new WriterLeases(),
  };
  const starts: FunctionHostStart[] = [];
  const settles: Barrier<unknown>[] = [];
  /** The journal's rows as each start read them, before it answered. */
  const atStart: Row[][] = [];
  const hosting: WorkflowFunctionHosting = {
    contract: CONTRACT,
    source,
    package: { admit: async () => PACKAGE, current: () => PACKAGE },
    start: async (request: FunctionHostStart): Promise<FunctionHostStarted> => {
      starts.push(request);
      atStart.push(rowsOf(dir, request.invocationId));
      if (options.startRejects) throw new Error(REPLY_LOST);
      const settle = barrier<unknown>();
      settles.push(settle);
      return { nativeRefs: [NATIVE], settled: settle.promise };
    },
  };
  const pi = makePi();
  subagentsExtension(pi.pi, { functionHosting: hosting });
  const context = ctx({ cwd: dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const execute = async (params: Record<string, unknown>): Promise<Reply> => {
    const tool = pi.tools.get("workflow_execute");
    if (!tool) throw new Error("workflow_execute is not registered");
    return JSON.parse(textOf(await tool.execute("call-mwsy", params, undefined, undefined, context))) as Reply;
  };
  return { dir, sourceIdentity: measured.identity.digest, starts, settles, atStart, execute };
}

function functionParams(): Record<string, unknown> {
  return { definitionRef: FUNCTION_REF, input: TASK, hostMode: "embedded", policy: WRITES };
}
/** The input digest decideExecute's admission records for these params; it does not depend on the minted invocation. */
function admittedDigest(params: Record<string, unknown>): string {
  const decision = decideExecute(params as never, { grants: [EXECUTE_GRANT], invocationId: "wf_000000000000" });
  if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
  return decision.admission.inputDigest;
}
function localPrincipal(): string {
  return `local-operator:${process.getuid?.() ?? ""}:${SESSION}`;
}
/** The key of the invocation's rows: the admission's digest of the call's input. */
const KEY = admittedDigest(functionParams());
const NODE: Row = { index: 0, key: KEY, kind: "node", capabilityId: FUNCTION_ID, effectClass: "write" };

function intentRow(invocationId: string, sourceIdentity: string): Row {
  return {
    ...NODE,
    ok: false,
    dispatched: true,
    intent: {
      invocationId,
      definitionId: FUNCTION_ID,
      definitionDigest: DIGEST,
      inputDigest: admittedDigest(functionParams()),
      principal: localPrincipal(),
      sessionId: SESSION,
      grants: [EXECUTE_GRANT, ACTION],
      sdkRights: [],
      operatorId: OPERATOR,
      sourceIdentity,
      packageIdentity: PACKAGE,
    },
  };
}
const DISPATCHED_ROW: Row = { ...NODE, ok: false, dispatched: true, nativeRefs: [NATIVE] };
const SETTLED_ROW: Row = { ...NODE, ok: true, nativeRefs: [NATIVE] };

describe("wb-mwsy: the journal rows of a hosted function invocation", () => {
  it("FJ01: with the session's task directory path held by a file, the launch refuses launch-failed with the intent reason and does not start the installed host; with the path free, the same request launches", async () => {
    const world = await boot();
    const tasks = sessionTaskDir(world.dir, SESSION);
    rmSync(tasks, { recursive: true, force: true });
    writeFileSync(tasks, "");
    const refused = await world.execute(functionParams());
    expect([refused.ok, refused.invoked]).toEqual([false, false]);
    expect(refused.error).toEqual({ code: "launch-failed", message: INTENT_UNWRITTEN });
    expect(world.starts).toHaveLength(0);
    expect([statSync(tasks).isFile(), statSync(tasks).size]).toEqual([true, 0]);
    rmSync(tasks);
    const launched = await world.execute(functionParams());
    expect([launched.ok, launched.status]).toEqual([true, "launched"]);
    expect(world.starts).toHaveLength(1);
  }, CASE_MS);

  it("FJ02: inside the installed host's start, before it answers, the journal holds exactly the intent row, carrying the invocation, its authority and its measured source identity", async () => {
    const world = await boot();
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.status]).toEqual([true, "launched"]);
    const invocationId = world.starts[0]?.invocationId ?? "";
    expect(reply.invocationId).toBe(invocationId);
    expect(world.atStart).toEqual([[intentRow(invocationId, world.sourceIdentity)]]);
  }, CASE_MS);

  it("FJ03: an installed host that counts the start and then rejects it leaves the reply launch-failed and the journal holding exactly the intent row", async () => {
    const world = await boot({ startRejects: true });
    const reply = await world.execute(functionParams());
    expect(reply.error).toEqual({ code: "launch-failed", message: REPLY_LOST });
    expect(world.starts).toHaveLength(1);
    await flush();
    const invocationId = world.starts[0]?.invocationId ?? "";
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity)]);
  }, CASE_MS);

  it("FJ04: once the start answered and while the settlement is parked, the journal holds exactly the intent row, then a dispatched marker carrying the native reference and no intent", async () => {
    const world = await boot();
    const reply = await world.execute(functionParams());
    expect(reply.status).toBe("launched");
    await flush();
    const invocationId = world.starts[0]?.invocationId ?? "";
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity), DISPATCHED_ROW]);
  }, CASE_MS);

  it("FJ05: a settled run's journal holds exactly the intent row, the dispatched row and the settled row, in that file order", async () => {
    const world = await boot();
    await world.execute(functionParams());
    const invocationId = world.starts[0]?.invocationId ?? "";
    world.settles[0]?.open({ outcome: "fixture" });
    await flush();
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity), DISPATCHED_ROW, SETTLED_ROW]);
  }, CASE_MS);

  it("FJ06: a run whose settlement rejects leaves the journal holding exactly the intent row and the dispatched row", async () => {
    const world = await boot();
    await world.execute(functionParams());
    const invocationId = world.starts[0]?.invocationId ?? "";
    world.settles[0]?.fail(new Error("producer failure"));
    await flush();
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity), DISPATCHED_ROW]);
  }, CASE_MS);

  it("FJ07: readJournal and classifyJournal each keep the three rows and drop an intent row with a number for a string, an intent row with grants that are not a list, and an agent row that carries an intent", async () => {
    const world = await boot();
    await world.execute(functionParams());
    const invocationId = world.starts[0]?.invocationId ?? "";
    world.settles[0]?.open({ outcome: "fixture" });
    await flush();
    const path = journalOf(world.dir, invocationId);
    const rows = rowsOf(world.dir, invocationId);
    expect(rows).toHaveLength(3);
    expect(readJournal(path)).toEqual(rows);
    expect(classifyJournal(readFileSync(path, "utf8")).lines.map(line => line.class)).toEqual(["node-effectful", "node-effectful", "node-effectful"]);
    const intent = rows[0]?.intent as Row;
    const variants: Row[] = [
      { ...rows[0], intent: { ...intent, sourceIdentity: 7 } },
      { ...rows[0], intent: { ...intent, grants: EXECUTE_GRANT } },
      { index: 1, key: "agent-key", ok: true, text: "an answer", intent },
    ];
    const text = `${variants.map(variant => JSON.stringify(variant)).join("\n")}\n`;
    const variantPath = join(world.dir, "variants.workflow.jsonl");
    writeFileSync(variantPath, text);
    expect(readJournal(variantPath)).toEqual([]);
    const report = classifyJournal(text);
    expect(report.lines.map(line => line.class)).toEqual(["unsupported", "unsupported", "unsupported"]);
    expect(report.unsupported.map(line => `${line.reason}:${line.field}`)).toEqual(["invalid-field:intent", "invalid-field:intent", "invalid-field:intent"]);
  }, CASE_MS);

  it("FJ08: the header's pinned reader set lists exactly this file's case titles, in order, each verbatim", () => {
    const source = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const header = source.slice(0, source.indexOf("\nimport "));
    const listed = [...header.matchAll(/^ \* - (FJ\d\d: .+)$/gm)].map(match => match[1]);
    const titles = [...source.matchAll(/^\s+it\("(FJ\d\d: [^"]+)"/gm)].map(match => match[1]);
    expect(titles.length).toBeGreaterThan(0);
    expect(listed).toEqual(titles);
  });
});
