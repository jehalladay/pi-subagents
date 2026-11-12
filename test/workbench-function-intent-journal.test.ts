/**
 * wb-mwsy (MNI packet P06, MWI effects slice PI-4): the journal rows of one hosted function invocation, driven through the
 * workflow_execute tool object src/index.ts registers with one injected installed host (evidence level V3, injected callbacks;
 * never a native MechanicalWorkflows run), each read back from the invocation's journal file, <invocation id>.workflow.jsonl in
 * the session's task directory.
 *
 * Requirements: EAT-R041 and EAT-R042 of docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at 0b25e14e, and criteria 1 and 2 of EAT-R250 of
 * docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at 18b016b2, which
 * extends both. EAT-R250 criterion 3 is OPEN (see NOT CLAIMED).
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
 *   SDK rights (an empty list here: this world composes no SDK edge), the source admission's operator and measured source
 *   identity, and the admitted package identity.
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
 *   the binding of this header to the cases, read through the TypeScript AST: every it or test call counts (a call of one of
 *   their members and a curried each call included), whatever its quoting or line breaks, and a call whose title is not a
 *   string literal reds it; a bullet reworded, or a case renamed or added on one side only, reds it.
 * - FJ09: with the session's task directory path held by a file, the refused launch leaves the workflow task store empty (/agents lists Workflows (0)); with the path free, the launched invocation is listed (Workflows (1))
 *   the src/index.ts runHostedFunction words "no task exists and the host is not started unless it reached the journal" (the
 *   task half): the /agents menu offers one Workflows entry, reading Workflows (0) after the refusal and Workflows (1) once
 *   the same request launched.
 * - FJ10: with an SDK edge composed (tools Read) and its rights held, the intent row read inside the start carries the final boundary's SDK rights, claude:invoke then claude:tool:Read, the list the start's grant carries
 *   EAT-R041 "Successful persist includes invocation, authority and measured source identity" and the journal.ts
 *   WorkflowJournalIntent words "principal, session, its two grants, then the SDK rights", in a world with an SDK edge: the
 *   start's grant carries the two SDK rights, and the one row read inside the start is the intent row with those rights as its
 *   sdkRights and still the authority's two grants.
 * - FJ11: readJournal keeps a function intent row and drops each of its 26 one-member variants: each string member of the intent a number or missing, grants and sdkRights each a string, holding a number or missing, and the intent null or a string
 *   the journal.ts words "A row whose intent does not validate drops like any mangled line" and "A function intent means
 *   something only whole": the variants are generated from the table of the intent's 11 members and their types, which the case
 *   first checks against intentRow (the builder of the row FJ02 reads inside the start), and readJournal returns no row for
 *   any of them.
 * - FJ12: classifyJournal keeps a function intent row and names the intent field invalid for each of the same 26 one-member variants
 *   the journal-compat.ts words "a function intent record (its string members, and string lists for grants and sdkRights)" and
 *   its isIntent doc "journal.ts isIntent": classifyJournal reads the row node-effectful and reports invalid-field:intent for
 *   each variant, so the two readers drop the same 26.
 * - FJ13: readJournal and classifyJournal each keep an acknowledge row, an override row and an agent row that carry no intent, and drop each of the three when it carries a function intent
 *   the journal.ts words "and only on a node row" and the journal-compat.ts words "on a node entry when present", for each kind
 *   that is not node (acknowledge and override, the other two of JOURNAL_ENTRY_KINDS, and an agent row, which has no kind):
 *   readJournal returns no row and classifyJournal reports invalid-field:intent for each.
 * - FJ14: with the session's task directory making each new file write-only to its owner, the intent row is appended but cannot be read back, so the launch refuses launch-failed with the intent reason, does not start the installed host, and the file holds exactly the intent row
 *   the src/index.ts functionJournal words "appended through journalAppender, which reads a dispatched marker back before it
 *   answers true" and the journal.ts header words "appended and read back before the installed host's start is called": a
 *   default ACL (setfacl) on the session's task directory makes each new file in it write-only to its owner, which the case
 *   first asserts on a probe file it cannot read back; the launch then replies launch-failed with the intent reason and calls
 *   no start, and once the ACL is removed the journal file holds exactly the intent row.
 * Adversarial mutants, each applied to one src file at cut time and run against this suite, the file restored byte-identical
 * after each run (the delivery note records the counts): EAT-R041 "Move persistence after provider call" (FJ01, FJ02); EAT-R042
 * "Write dispatch and settlement as one terminal row" (FJ04, FJ05); the intent write removed (FJ01, FJ02, FJ03, FJ05; this is
 * not EAT-R250 criterion 3, see NOT CLAIMED); a settled row written for a rejected start or a rejected settlement (FJ03, FJ06);
 * the intent clause dropped from either reader (FJ07); the intent check moved after the task store (FJ09); the intent's SDK
 * rights written as an empty list (FJ10); each one member check of either reader's isIntent removed, each member made
 * optional, and a list member's string check reduced to a list check (FJ11, FJ12); the node-kind clause of either reader's
 * intent check widened to any kind (FJ13); the intent appended with no read-back (FJ14).
 *
 * NOT CLAIMED by this suite (scope sentences):
 * - EAT-R250 criterion 3, quoted whole: "Mutation: removing the intent write turns a replay/recovery test red (one of M016's
 *   planned-integration mutation targets, now composed; recorded per C226 norm)", is NOT CLAIMED by this suite: no replay or
 *   recovery reader of the function journal exists at this cut (the bullet after next), so the intent-write mutant above reds
 *   launch and journal cases, never a replay/recovery test. Criterion 3 stays OPEN until the first reader cut (EAT-R043,
 *   EAT-R251).
 * - EAT-R043, EAT-R044 and the controls requirements EAT-R045 to EAT-R050 are NOT CLAIMED by this suite, nor EAT-R249 and
 *   EAT-R251 to EAT-R259 of the MNI program.
 * - A reader that consumes the function journal (a later run, a restart, workflow_reconcile or workflow_observe) is NOT CLAIMED
 *   by this suite: none reads it at this cut.
 * - A write fault other than the two this suite makes (the task directory path held by a file, FJ01 and FJ09; a journal file
 *   its owner cannot read back, FJ14), such as a full disk or a read-only file system, is NOT CLAIMED by this suite.
 * - Durability past the read-back (a flush to the device, a crash of the host process) is NOT CLAIMED by this suite.
 * - A real installed MechanicalWorkflows package or its native evidence (P07, V4) is NOT CLAIMED by this suite.
 * - A host where this process can read a file whose mode denies it (a root user), or where setfacl or POSIX default ACLs are
 *   missing, is NOT CLAIMED by this suite: FJ14 asserts that precondition and reds where it does not hold.
 */
import { execFileSync } from "node:child_process";
import { chmodSync, existsSync, lstatSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT } from "../src/workbench/execute.js";
import type { FunctionHostStart, FunctionHostStarted, WorkflowFunctionHosting } from "../src/workbench/execute-tool.js";
import { adoptFunctionActions, type FunctionActionContract } from "../src/workbench/function-authority.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { measureSourceIdentity, type SourceAdmissionHost, type SourceGitReader, WriteBoundaryAuthority, WriterLeases } from "../src/workbench/source-admission.js";
import { readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { classifyJournal } from "../src/workflow/journal-compat.js";
import { type AcknowledgeRecord, entryDigestOf, type OverrideRecord, RECONCILE_ACK_POLICY, RECONCILE_CONTRACT_VERSION, RECONCILE_OVERRIDE_POLICY } from "../src/workflow/reconcile.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

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
/** The SDK rights an SDK edge configuring the one Claude tool Read requires, spelled out: the invoke right, then the tool's. */
const SDK_RIGHTS: readonly string[] = ["claude:invoke", "claude:tool:Read"];
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
  /** The Claude tools of an SDK edge the hosting composes; no SDK edge when absent. */
  readonly sdkTools?: readonly string[];
  /** The capability grants the session's settings hold; the execute grant and the fixture action when absent. */
  readonly rights?: readonly string[];
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
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...(options.rights ?? RIGHTS)] } } });
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
    ...(options.sdkTools !== undefined ? { sdk: { tools: () => options.sdkTools } } : {}),
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
  /** The Workflows entries of each menu /agents offers (the count each shows is the workflow task store's size). */
  const workflowsListed = async (): Promise<string[][]> => {
    const offered: string[][] = [];
    const select = async (_title: string, options: string[]): Promise<undefined> => {
      offered.push(options);
      return undefined;
    };
    const menu = ctx({ cwd: dir, ui: { setStatus: () => undefined, setWidget: () => undefined, notify: () => undefined, select } });
    await pi.commands.get("agents")?.handler([], menu);
    return offered.map(options => options.filter(option => option.startsWith("Workflows (")));
  };
  return { dir, sourceIdentity: measured.identity.digest, starts, settles, atStart, execute, workflowsListed };
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

function intentRow(invocationId: string, sourceIdentity: string, sdkRights: readonly string[] = []): Row {
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
      sdkRights: [...sdkRights],
      operatorId: OPERATOR,
      sourceIdentity,
      packageIdentity: PACKAGE,
    },
  };
}
const DISPATCHED_ROW: Row = { ...NODE, ok: false, dispatched: true, nativeRefs: [NATIVE] };
const SETTLED_ROW: Row = { ...NODE, ok: true, nativeRefs: [NATIVE] };

/** The members of a function intent (journal.ts WorkflowJournalIntent), each with its type, in the order intentRow builds them. */
const INTENT_MEMBERS: readonly (readonly [string, "string" | "list"])[] = [
  ["invocationId", "string"],
  ["definitionId", "string"],
  ["definitionDigest", "string"],
  ["inputDigest", "string"],
  ["principal", "string"],
  ["sessionId", "string"],
  ["grants", "list"],
  ["sdkRights", "list"],
  ["operatorId", "string"],
  ["sourceIdentity", "string"],
  ["packageIdentity", "string"],
];
/** The labels of the variants intentVariants generates, in its order: the frozen shape of the variant table. */
const VARIANT_LABELS: readonly string[] = [
  "invocationId a number",
  "invocationId missing",
  "definitionId a number",
  "definitionId missing",
  "definitionDigest a number",
  "definitionDigest missing",
  "inputDigest a number",
  "inputDigest missing",
  "principal a number",
  "principal missing",
  "sessionId a number",
  "sessionId missing",
  "grants a string",
  "grants holding a number",
  "grants missing",
  "sdkRights a string",
  "sdkRights holding a number",
  "sdkRights missing",
  "operatorId a number",
  "operatorId missing",
  "sourceIdentity a number",
  "sourceIdentity missing",
  "packageIdentity a number",
  "packageIdentity missing",
  "the intent null",
  "the intent a string",
];
/** A function intent row of the form the FJ02 world writes, under a fixed invocation reference and source identity. */
const INTENT_ROW: Row = intentRow("wf_fixture000001", `sha256:${"ef".repeat(32)}`);
/** The members of an intent and the type of each, as JSON spells them: a list member reads "list". */
function memberTypes(intent: Row): (readonly [string, string])[] {
  return Object.entries(intent).map(([member, value]) => [member, Array.isArray(value) ? "list" : typeof value]);
}
/**
 * Each one-member variant of `intent`, by label, generated from INTENT_MEMBERS: a string member as a number, then missing; a
 * list member as a string, holding a number, then missing; and last the intent itself as null and as a string.
 */
function intentVariants(intent: Row): (readonly [string, unknown])[] {
  const variants: (readonly [string, unknown])[] = [];
  for (const [member, type] of INTENT_MEMBERS) {
    const value = intent[member];
    const rest = Object.fromEntries(Object.entries(intent).filter(([name]) => name !== member));
    if (type === "string") variants.push([`${member} a number`, { ...intent, [member]: 7 }]);
    else variants.push([`${member} a string`, { ...intent, [member]: EXECUTE_GRANT }], [`${member} holding a number`, { ...intent, [member]: [...(Array.isArray(value) ? value : []), 7] }]);
    variants.push([`${member} missing`, rest]);
  }
  variants.push(["the intent null", null], ["the intent a string", "intent"]);
  return variants;
}
/** Rows as a journal's text: one JSON line each. */
function jsonl(rows: readonly Row[]): string {
  return rows.map(row => `${JSON.stringify(row)}\n`).join("");
}

/** A journaled furnace effect row, the node row the two decision rows below are bound to by digest. */
const EFFECT: WorkflowJournalEntry = { index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1" };
const BOUND = { index: 0, key: "k0", ok: true, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", entryDigest: entryDigestOf(EFFECT) };
const DECIDED_IN = { workspace: "/ws", principal: "local-operator:1:s1" };
const ACKNOWLEDGED: AcknowledgeRecord = {
  contractVersion: RECONCILE_CONTRACT_VERSION,
  decision: "acknowledge",
  acknowledgementId: `ack_${"b".repeat(32)}`,
  policy: RECONCILE_ACK_POLICY,
  taskId: "wf_fixture01",
  entry: BOUND,
  scope: DECIDED_IN,
  operator: { principal: DECIDED_IN.principal },
  grant: "reconcile:furnace.acknowledge",
  recordedAt: "2026-10-15T09:00:00Z",
  reason: "inspected the producer by hand",
  determination: "indeterminate",
  evidenceClass: "operator-asserted",
  evidence: [],
  noEvidenceReason: "producer-unavailable",
  settlement: "envelope",
};
const OVERRIDDEN: OverrideRecord = {
  contractVersion: RECONCILE_CONTRACT_VERSION,
  decision: "override",
  overrideId: `ovr_${"c".repeat(32)}`,
  policy: RECONCILE_OVERRIDE_POLICY,
  taskId: "wf_fixture01",
  entry: BOUND,
  scope: DECIDED_IN,
  operator: { principal: DECIDED_IN.principal },
  grant: "reconcile:furnace.override",
  recordedAt: "2026-10-15T09:00:00Z",
  reason: "the run never started; re-run it",
  acknowledgementId: `ack_${"b".repeat(32)}`,
  duplicateRisk: "none",
  confirmation: { confirmed: true, position: 0, capabilityId: "furnace.run.start", acceptDuplicateRisk: true },
};
/** One row of each kind that is not node, none carrying an intent, in position order: an acknowledge row, an override row, then an agent row (no kind). */
const OTHER_KIND_ROWS: readonly Row[] = [
  { index: 0, key: "k0", ok: true, kind: "acknowledge", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", reconcile: ACKNOWLEDGED },
  { index: 0, key: "k0", ok: true, kind: "override", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", reconcile: OVERRIDDEN },
  { index: 1, key: "agent-key", ok: true, text: "an answer" },
];

/** Whether this process can read the file at `path`. */
function readable(path: string): boolean {
  try {
    readFileSync(path);
    return true;
  } catch {
    return false;
  }
}
/** Gives `dir` a default ACL under which each file created in it is write-only to its owner (POSIX default ACLs, setfacl). */
function makeNewFilesWriteOnly(dir: string): void {
  execFileSync("setfacl", ["-d", "-m", "u::-w-,g::---,o::---", dir], { stdio: ["ignore", "pipe", "pipe"] });
}
/** Removes the default ACL of `dir` and gives each entry in it back to its owner, so the case can read it and the sandbox can go. */
function restoreNewFiles(dir: string): void {
  execFileSync("setfacl", ["-k", dir], { stdio: ["ignore", "pipe", "pipe"] });
  for (const name of readdirSync(dir)) {
    const entry = join(dir, name);
    chmodSync(entry, lstatSync(entry).isDirectory() ? 0o700 : 0o600);
  }
}

/** The callee names a case is declared through. */
const CASE_HEADS: ReadonlySet<string> = new Set(["it", "test"]);
/** Whether `node` declares a case: a call of it or test, a call of one of their members other than each, or a curried each call. */
function declaresCase(node: ts.CallExpression): boolean {
  const callee = node.expression;
  if (ts.isIdentifier(callee)) return CASE_HEADS.has(callee.text);
  if (ts.isPropertyAccessExpression(callee)) return ts.isIdentifier(callee.expression) && CASE_HEADS.has(callee.expression.text) && callee.name.text !== "each";
  return ts.isCallExpression(callee) && ts.isPropertyAccessExpression(callee.expression) && ts.isIdentifier(callee.expression.expression) && CASE_HEADS.has(callee.expression.expression.text) && callee.expression.name.text === "each";
}
/** Every case title of `source` in file order, through the TypeScript AST; a title that is not a string literal reads as a marker no header bullet matches. */
function caseTitles(source: ts.SourceFile): string[] {
  const titles: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && declaresCase(node)) {
      const title = node.arguments[0];
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      titles.push(title !== undefined && ts.isStringLiteralLike(title) ? title.text : `<a case title that is not a string literal, line ${line}>`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return titles;
}

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
    const self = fileURLToPath(import.meta.url);
    const text = readFileSync(self, "utf8");
    const header = text.slice(0, text.indexOf("*/"));
    const listed = [...header.matchAll(/^ \* - (FJ\d\d: .+)$/gm)].map(match => match[1]);
    const titles = caseTitles(ts.createSourceFile(self, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
    expect(titles.length).toBeGreaterThan(0);
    expect(listed).toEqual(titles);
  });

  it("FJ09: with the session's task directory path held by a file, the refused launch leaves the workflow task store empty (/agents lists Workflows (0)); with the path free, the launched invocation is listed (Workflows (1))", async () => {
    const world = await boot();
    const tasks = sessionTaskDir(world.dir, SESSION);
    rmSync(tasks, { recursive: true, force: true });
    writeFileSync(tasks, "");
    const refused = await world.execute(functionParams());
    expect(refused.error).toEqual({ code: "launch-failed", message: INTENT_UNWRITTEN });
    expect(await world.workflowsListed()).toEqual([["Workflows (0)"]]);
    rmSync(tasks);
    const launched = await world.execute(functionParams());
    expect([launched.ok, launched.status]).toEqual([true, "launched"]);
    expect(await world.workflowsListed()).toEqual([["Workflows (1)"]]);
  }, CASE_MS);

  it("FJ10: with an SDK edge composed (tools Read) and its rights held, the intent row read inside the start carries the final boundary's SDK rights, claude:invoke then claude:tool:Read, the list the start's grant carries", async () => {
    const world = await boot({ sdkTools: ["Read"], rights: [...RIGHTS, ...SDK_RIGHTS] });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.status]).toEqual([true, "launched"]);
    const invocationId = world.starts[0]?.invocationId ?? "";
    expect(world.starts[0]?.grant.sdkRights).toEqual(SDK_RIGHTS);
    expect(world.atStart).toEqual([[intentRow(invocationId, world.sourceIdentity, SDK_RIGHTS)]]);
  }, CASE_MS);

  it("FJ11: readJournal keeps a function intent row and drops each of its 26 one-member variants: each string member of the intent a number or missing, grants and sdkRights each a string, holding a number or missing, and the intent null or a string", () => {
    const intent = INTENT_ROW.intent as Row;
    expect(memberTypes(intent)).toEqual(INTENT_MEMBERS);
    const variants = intentVariants(intent);
    expect(variants.map(([label]) => label)).toEqual(VARIANT_LABELS);
    expect(VARIANT_LABELS).toHaveLength(26);
    const dir = makeScratch("pi-fj-readjournal-");
    try {
      const path = join(dir, "variant.workflow.jsonl");
      writeFileSync(path, jsonl([INTENT_ROW]));
      expect(readJournal(path)).toEqual([INTENT_ROW]);
      const kept = variants.map(([label, variant]) => {
        writeFileSync(path, jsonl([{ ...INTENT_ROW, intent: variant }]));
        return [label, readJournal(path).length];
      });
      expect(kept).toEqual(VARIANT_LABELS.map(label => [label, 0]));
    } finally {
      removeScratch(dir);
    }
  }, CASE_MS);

  it("FJ12: classifyJournal keeps a function intent row and names the intent field invalid for each of the same 26 one-member variants", () => {
    const intent = INTENT_ROW.intent as Row;
    expect(memberTypes(intent)).toEqual(INTENT_MEMBERS);
    const variants = intentVariants(intent);
    expect(variants.map(([label]) => label)).toEqual(VARIANT_LABELS);
    const control = classifyJournal(jsonl([INTENT_ROW]));
    expect([control.lines.map(line => line.class), control.unsupported]).toEqual([["node-effectful"], []]);
    const named = variants.map(([label, variant]) => {
      const report = classifyJournal(jsonl([{ ...INTENT_ROW, intent: variant }]));
      return [label, report.lines.map(line => line.class).join(","), report.unsupported.map(line => `${line.reason}:${line.field}`).join(",")];
    });
    expect(named).toEqual(VARIANT_LABELS.map(label => [label, "unsupported", "invalid-field:intent"]));
  }, CASE_MS);

  it("FJ13: readJournal and classifyJournal each keep an acknowledge row, an override row and an agent row that carry no intent, and drop each of the three when it carries a function intent", () => {
    const intent = INTENT_ROW.intent as Row;
    const carrying = OTHER_KIND_ROWS.map(row => ({ ...row, intent }));
    const dir = makeScratch("pi-fj-kinds-");
    try {
      const path = join(dir, "kinds.workflow.jsonl");
      writeFileSync(path, jsonl(OTHER_KIND_ROWS));
      expect(readJournal(path)).toEqual(OTHER_KIND_ROWS);
      const control = classifyJournal(jsonl(OTHER_KIND_ROWS));
      expect([control.lines.map(line => line.class), control.unsupported]).toEqual([["operator-decision", "operator-decision", "legacy-agent"], []]);
      writeFileSync(path, jsonl(carrying));
      expect(readJournal(path)).toEqual([]);
      const report = classifyJournal(jsonl(carrying));
      expect(report.lines.map(line => line.class)).toEqual(["unsupported", "unsupported", "unsupported"]);
      expect(report.unsupported.map(line => `${line.reason}:${line.field}`)).toEqual(["invalid-field:intent", "invalid-field:intent", "invalid-field:intent"]);
    } finally {
      removeScratch(dir);
    }
  }, CASE_MS);

  it("FJ14: with the session's task directory making each new file write-only to its owner, the intent row is appended but cannot be read back, so the launch refuses launch-failed with the intent reason, does not start the installed host, and the file holds exactly the intent row", async () => {
    const world = await boot();
    const tasks = sessionTaskDir(world.dir, SESSION);
    makeNewFilesWriteOnly(tasks);
    let reply: Reply | undefined;
    try {
      const probe = join(tasks, "read-back-probe");
      writeFileSync(probe, "probe\n");
      expect(readable(probe)).toBe(false);
      rmSync(probe);
      reply = await world.execute(functionParams());
    } finally {
      restoreNewFiles(tasks);
    }
    expect([reply?.ok, reply?.invoked]).toEqual([false, false]);
    expect(reply?.error).toEqual({ code: "launch-failed", message: INTENT_UNWRITTEN });
    expect(world.starts).toHaveLength(0);
    const journals = readdirSync(tasks).filter(name => name.endsWith(".workflow.jsonl"));
    expect(journals).toHaveLength(1);
    const invocationId = (journals[0] ?? "").slice(0, -".workflow.jsonl".length);
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity)]);
  }, CASE_MS);
});
