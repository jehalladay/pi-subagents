/**
 * wb-zswl cut #1 (MNI packet P11, MWI detached-function slice PI-6): MWI EAT-R064 only, the detach authority of a detached
 * function launch, driven through the actual workflow_execute tool object src/index.ts registers, with one injected installed
 * host that composes a detached start beside its embedded start (evidence level V3, injected callbacks; no native detached
 * host runs, so the PI-DETACHED-FUNCTION-LIVE gate is NOT RUN by this suite).
 *
 * Requirement: EAT-R064 of docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at 0b25e14e (a master-only tree). Statement "Pi MUST launch detached functions only under detach
 * authority." Acceptance "Execute function detached with execute/action but no detach grant; assert no process. Exact
 * host-issued detach plus bounded SDK rights launches once with pinned snapshot." Adversarial mutant "Reuse embedded grants as
 * detached authority."
 *
 * PINNED READER SET (this file; each case by its title, verbatim and in order, then the requirement words it pins):
 * - DF01: with a detached start composed and the embedded grants held without workbench:detach, a detached launch refuses missing-detach-grant with zero package, Git and host calls, and the same request launches embedded on the embedded start alone
 *   "Execute function detached with execute/action but no detach grant; assert no process" and the mutant "Reuse embedded
 *   grants as detached authority": the grants the embedded launch rests on (workbench:execute, workbench:observe and the
 *   fixture action) start no detached host and no embedded host for a detached request, and launch the embedded request.
 * - DF02: with workbench:detach and the SDK edge's rights held, a detached launch calls the detached start once and the embedded start never, and replies launched, not-asserted, with the detached host's native references alone
 *   "Exact host-issued detach plus bounded SDK rights launches once": one detached start, zero embedded starts, the reply's
 *   native references exactly the two the detached host reported.
 * - DF03: the detached start receives one frozen request of six members: the reply's invocation, the reviewed entry, the definition, the input as a frozen JSON copy, the admission's input digest and the chain's frozen grant with exactly the configured SDK rights
 *   "launches once with pinned snapshot" (the snapshot as this suite reads it: the members the request carries, frozen): the
 *   member names in order (so no AbortSignal member), the input equal to the request's and frozen at every object and list,
 *   and the grant resting on workbench:execute and the action under the session identity, the source identity measured from
 *   the workspace, the admitted package identity and exactly claude:invoke and claude:tool:Read while claude:tool:Write is
 *   also held ("bounded SDK rights").
 * - DF04: workbench:detach revoked in the operator's settings while the source admission waits refuses missing-detach-grant at the final boundary with zero detached starts, and with it held again the same request launches
 *   "only under detach authority", at the final boundary: one package admission, zero host starts, then one detached start.
 * - DF05: workbench:detach named only in the request's policy and input, or held only as workbench:detached or as workbench:detac, refuses missing-detach-grant with zero package, Git and host calls
 *   "Exact host-issued detach", at these four forms only.
 * - DF06: with workbench:detach held and claude:invoke not held, a detached launch with an SDK edge refuses at entry as launch-failed naming missing-sdk-right, with zero package, Git and host calls
 *   "plus bounded SDK rights": a detached launch without the SDK invoke right starts nothing.
 * - DF07: the writer lease covers the detached run: while its settlement is parked a second detached launch on the workspace refuses as launch-failed naming writer-held, and once it settles the second launches
 *   the chain's one-writer lease (EAT-R232 of the P03 chain) held through the detached host's settlement.
 * - DF08: inside the detached start, before it answers, the journal holds exactly the intent row, and once it answered the dispatched row carrying the detached host's native references follows
 *   the P06 intent and dispatch rows (wb-mwsy) written for a detached launch, in that order.
 * - DF09: the header's pinned reader set lists exactly this file's case titles, in order, each verbatim
 *   the binding of this header to the cases: a bullet reworded or a case renamed on one side only reds it.
 * Adversarial mutants, each applied to this cut's source and run against this suite at cut time (the delivery note records
 * which cases each one reds): the entry detach check removed; the detach checks answered by workbench:execute (the embedded
 * grants reused as detached authority); the final boundary's detach check removed; the detached launch routed to the embedded
 * start; the request's input left unfrozen; an AbortSignal added to the request; the detached effect settled at start (the
 * lease released); the intent row dropped; the intent row written after the start; every held claude right passed as the SDK
 * rights.
 *
 * NOT CLAIMED by this suite (scope sentences):
 * - EAT-R065 to EAT-R070 of the MWI program and EAT-R295 to EAT-R298 of the MNI program are NOT CLAIMED by this suite: the
 *   detached host's own instance identity, transport ownership, reattach, lost-handshake recovery, snapshot digest, Furnace
 *   Attempts and native receipts.
 * - Observation of a detached function launch through workflow_observe or any other reader is NOT CLAIMED by this suite.
 * - A detached start that rejects, a detached settlement that rejects, and the settled journal row of a detached run are NOT
 *   CLAIMED by this suite.
 * - The writer lease after this Pi session ends (the lease owner is a P00 ruling, EAT-R269) is NOT CLAIMED by this suite.
 * - Any Pi session composing a detached start from settings is NOT CLAIMED by this suite (none does: SubagentsExtensionInjection
 *   alone composes function hosting), nor an adopted action spelling (the fixture contract binds fixture-fn:develop-write).
 * - Detach spellings other than DF05's four forms are NOT CLAIMED by this suite.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT } from "../src/workbench/execute.js";
import { DETACH_GRANT, type FunctionHostDetachedStart, type FunctionHostStart, type FunctionHostStarted, type WorkflowFunctionHosting } from "../src/workbench/execute-tool.js";
import { adoptFunctionActions, type FunctionActionContract } from "../src/workbench/function-authority.js";
import { MECHANICAL_REVIEWED_ENTRYPOINTS } from "../src/workbench/mechanical-descriptor.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { measureSourceIdentity, type SourceAdmissionHost, type SourceGitReader, WriteBoundaryAuthority, WriterLeases } from "../src/workbench/source-admission.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const CASE_MS = 60_000;
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_SCHEMA = "mechanical-workflows/entrypoint/v1";
const DIGEST = `sha256:${"ab".repeat(32)}`;
const PACKAGE = `sha256:${"cd".repeat(32)}`;
/** The TEST FIXTURE action spelling the P03 and P04 suites bind; no spelling is adopted for Pi (the P00 ruling). */
const ACTION = "fixture-fn:develop-write";
const OBSERVE_GRANT = "workbench:observe";
const OPERATOR = "operator-1";
const SESSION = "s1";
const TASK: JsonValue = { task: "t", workspaceId: "w", baseRevision: "r" };
const WRITES: JsonValue = { allowWrites: true };
const CONTRACT: FunctionActionContract = adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: ACTION }]);
const FUNCTION_REF = { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST } as const;
/** The grants an embedded launch rests on (the P04 suite's RIGHTS): no workbench:detach among them. */
const EMBEDDED_RIGHTS: readonly string[] = [EXECUTE_GRANT, OBSERVE_GRANT, ACTION];
/** The SDK rights an SDK edge configuring the one Claude tool Read requires: claude:invoke, then that tool's exact right. */
const SDK_RIGHTS: readonly string[] = ["claude:invoke", "claude:tool:Read"];
/** A held SDK right no configured tool needs: it never reaches the host. */
const UNCONFIGURED_RIGHT = "claude:tool:Write";
const DETACHED_RIGHTS: readonly string[] = [...EMBEDDED_RIGHTS, DETACH_GRANT];
/** The native references the injected host reports: one for its embedded start, two for its detached start. */
const EMBEDDED_NATIVE: NativeRef = { provider: "mechanical-fixture", type: "invocation", id: "mw-inv-0001" };
const DETACHED_NATIVE: readonly NativeRef[] = [
  { provider: "mechanical-fixture", type: "invocation", id: "mw-detached-0001" },
  { provider: "mechanical-fixture", type: "host-instance", id: "mw-host-0001" },
];
/** The detached branch's fixed reason for a grant read without workbench:detach (src/workbench/execute-tool.ts). */
const DETACH_REASON = "a detached function launch requires workbench:detach beside workbench:execute and the function action grant";
/** A composed-chain refusal's reason: the deciding layer's own code, then that layer's fixed reason. */
const MISSING_SDK_RIGHT = "missing-sdk-right: missing an exact SDK right the function's native session requires";
const WRITER_HELD = "writer-held: the writer lease of this canonical workspace is held";

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi P11 Fixture", "-c", "user.email=p11-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
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

/** A promise a case opens by hand; entered() resolves once the parked code reached it. */
interface Barrier<T> {
  readonly promise: Promise<T>;
  open(value: T): void;
  readonly entered: Promise<void>;
  enter(): void;
}
function barrier<T>(): Barrier<T> {
  let open: (value: T) => void = () => undefined;
  let enter: () => void = () => undefined;
  const promise = new Promise<T>(resolve => {
    open = resolve;
  });
  const entered = new Promise<void>(resolve => {
    enter = resolve;
  });
  return { promise, open, entered, enter };
}

interface Reply {
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: string;
  readonly completion: string;
  readonly invocationId?: string;
  readonly hostMode?: string;
  readonly nativeRefs: readonly NativeRef[];
  readonly error?: { readonly code: string; readonly message: string };
}
type Row = Record<string, unknown>;
interface WorldOptions {
  readonly rights?: readonly string[];
  /** Park the source admission's wait until the case opens it. */
  readonly parkAdmission?: boolean;
  /** The Claude tools of an SDK edge the hosting composes; absent, the hosting composes no SDK edge. */
  readonly sdkTools?: readonly string[];
}

let sandbox: Hermetic | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
}, CASE_MS);

function writeSettings(dir: string, rights: readonly string[]): void {
  writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } }));
}
/** The invocation's journal file: <invocation id>.workflow.jsonl in the session's task directory. */
function journalOf(dir: string, invocationId: string): string {
  return join(sessionTaskDir(dir, SESSION), `${invocationId}.workflow.jsonl`);
}
/** Every line of the invocation's journal, parsed, in file order; none when the file does not exist. */
function rowsOf(dir: string, invocationId: string): Row[] {
  const path = journalOf(dir, invocationId);
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(line => line !== "")
    .map(line => JSON.parse(line) as Row);
}

/**
 * Boots the real extension in a hermetic sandbox that is a clean Git worktree (.pi/ ignored), with one injected installed host
 * that composes an embedded start and a detached start. Source admission is real over that worktree, its attestation minted by
 * the host's own authority; the package host admits one installed package identity. The detached start reads the journal
 * before it answers; each run settles when the case opens the settlement it returned.
 */
async function boot(options: WorldOptions = {}) {
  const rights = options.rights ?? DETACHED_RIGHTS;
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const dir = sandbox.dir;
  git(dir, "init", "-q");
  writeFileSync(join(dir, "README.md"), "# p11 fixture\n");
  writeFileSync(join(dir, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(dir, ".gitignore"), ".pi/\n");
  git(dir, "add", "README.md", "forge.toml", ".gitignore");
  git(dir, "commit", "-q", "--no-verify", "-m", "p11 fixture base");
  const workspace = realpathSync(dir);
  const measured = measureSourceIdentity(workspace, "forge.toml", gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  const authority = new WriteBoundaryAuthority();
  const calls = { git: 0, admit: 0, current: 0, start: 0, detached: 0 };
  const admissionPark = options.parkAdmission ? barrier<void>() : undefined;
  const source: SourceAdmissionHost = {
    authorizedRoot: workspace,
    gateManifest: "forge.toml",
    git: (directory, args) => {
      calls.git += 1;
      return gitReader(directory, args);
    },
    authority,
    attestation: authority.attest(OPERATOR, measured.identity),
    leases: new WriterLeases(),
    ...(admissionPark !== undefined
      ? {
          admissionWait: async () => {
            admissionPark.enter();
            await admissionPark.promise;
          },
        }
      : {}),
  };
  const detachedStarts: FunctionHostDetachedStart[] = [];
  const detachedSettles: Barrier<unknown>[] = [];
  /** The journal's rows as each detached start read them, before it answered. */
  const atDetachedStart: Row[][] = [];
  const hosting: WorkflowFunctionHosting = {
    contract: CONTRACT,
    source,
    package: {
      admit: async () => {
        calls.admit += 1;
        return PACKAGE;
      },
      current: () => {
        calls.current += 1;
        return PACKAGE;
      },
    },
    ...(options.sdkTools !== undefined ? { sdk: { tools: () => options.sdkTools } } : {}),
    start: async (_request: FunctionHostStart): Promise<FunctionHostStarted> => {
      calls.start += 1;
      return { nativeRefs: [EMBEDDED_NATIVE], settled: barrier<unknown>().promise };
    },
    startDetached: async (request: FunctionHostDetachedStart): Promise<FunctionHostStarted> => {
      calls.detached += 1;
      detachedStarts.push(request);
      atDetachedStart.push(rowsOf(dir, request.invocationId));
      const settle = barrier<unknown>();
      detachedSettles.push(settle);
      return { nativeRefs: DETACHED_NATIVE, settled: settle.promise };
    },
  };
  const pi = makePi();
  subagentsExtension(pi.pi, { functionHosting: hosting });
  const context = ctx({ cwd: dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const execute = async (params: Record<string, unknown>): Promise<Reply> => {
    const tool = pi.tools.get("workflow_execute");
    if (!tool) throw new Error("workflow_execute is not registered");
    return JSON.parse(textOf(await tool.execute("call-zswl", params, undefined, undefined, context))) as Reply;
  };
  return { dir, workspace, sourceIdentity: measured.identity.digest, calls, detachedStarts, detachedSettles, atDetachedStart, admissionPark, execute };
}

function functionParams(over: Record<string, unknown> = {}): Record<string, unknown> {
  return { definitionRef: FUNCTION_REF, input: TASK, hostMode: "detached", policy: WRITES, ...over };
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
/** Every object and list of a value, the value itself first. */
function containers(value: unknown): unknown[] {
  if (typeof value !== "object" || value === null) return [];
  return [value, ...Object.values(value).flatMap(containers)];
}
/** The journal rows of one detached launch of functionParams(): the key is the admission's digest of the call's input. */
const NODE: Row = { index: 0, key: admittedDigest(functionParams()), kind: "node", capabilityId: FUNCTION_ID, effectClass: "write" };
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
const DISPATCHED_ROW: Row = { ...NODE, ok: false, dispatched: true, nativeRefs: [...DETACHED_NATIVE] };

describe("wb-zswl: the detach authority of a detached function launch at the registered path (V3, injected installed host)", () => {
  it("DF01: with a detached start composed and the embedded grants held without workbench:detach, a detached launch refuses missing-detach-grant with zero package, Git and host calls, and the same request launches embedded on the embedded start alone", async () => {
    const world = await boot({ rights: EMBEDDED_RIGHTS });
    const refused = await world.execute(functionParams());
    expect([refused.ok, refused.invoked]).toEqual([false, false]);
    expect(refused.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0, detached: 0 });
    const embedded = await world.execute(functionParams({ hostMode: "embedded" }));
    expect([embedded.ok, embedded.status]).toEqual([true, "launched"]);
    expect([world.calls.start, world.calls.detached]).toEqual([1, 0]);
  }, CASE_MS);

  it("DF02: with workbench:detach and the SDK edge's rights held, a detached launch calls the detached start once and the embedded start never, and replies launched, not-asserted, with the detached host's native references alone", async () => {
    const world = await boot({ rights: [...DETACHED_RIGHTS, ...SDK_RIGHTS, UNCONFIGURED_RIGHT], sdkTools: ["Read"] });
    const reply = await world.execute(functionParams());
    expect(reply.error).toBeUndefined();
    expect([reply.ok, reply.invoked, reply.status, reply.completion, reply.hostMode]).toEqual([true, true, "launched", "not-asserted", "detached"]);
    expect(reply.invocationId).toMatch(/^wf_[0-9a-f]{12}$/);
    expect(reply.nativeRefs).toEqual(DETACHED_NATIVE);
    await flush();
    expect([world.calls.start, world.calls.detached]).toEqual([0, 1]);
  }, CASE_MS);

  it("DF03: the detached start receives one frozen request of six members: the reply's invocation, the reviewed entry, the definition, the input as a frozen JSON copy, the admission's input digest and the chain's frozen grant with exactly the configured SDK rights", async () => {
    const world = await boot({ rights: [...DETACHED_RIGHTS, ...SDK_RIGHTS, UNCONFIGURED_RIGHT], sdkTools: ["Read"] });
    const input: JsonValue = { task: "t", workspaceId: "w", baseRevision: "r", steps: [{ name: "one", tags: ["a"] }] };
    const params = functionParams({ input });
    const reply = await world.execute(params);
    expect(reply.status).toBe("launched");
    expect(world.detachedStarts).toHaveLength(1);
    const [request] = world.detachedStarts;
    expect(Object.keys(request ?? {})).toEqual(["invocationId", "entrypoint", "definition", "input", "inputDigest", "grant"]);
    expect(Object.isFrozen(request)).toBe(true);
    expect(request?.invocationId).toBe(reply.invocationId);
    expect(request?.entrypoint).toBe(MECHANICAL_REVIEWED_ENTRYPOINTS[0]);
    expect(request?.definition).toEqual(FUNCTION_REF);
    expect(request?.input).toEqual(input);
    expect(request?.input).not.toBe(input);
    expect(containers(request?.input).every(item => Object.isFrozen(item))).toBe(true);
    expect(containers(request?.input)).toHaveLength(4);
    expect(request?.inputDigest).toBe(admittedDigest(params));
    expect(Object.isFrozen(request?.grant)).toBe(true);
    expect(request?.grant.authority.grants).toEqual([EXECUTE_GRANT, ACTION]);
    expect(request?.grant.authority.identity).toEqual({ principal: localPrincipal(), sessionId: SESSION });
    expect(request?.grant.source.identity.canonicalRoot).toBe(world.workspace);
    expect(request?.grant.source.identity.digest).toBe(world.sourceIdentity);
    expect(request?.grant.packageIdentity).toBe(PACKAGE);
    expect(request?.grant.sdkRights).toEqual(SDK_RIGHTS);
  }, CASE_MS);

  it("DF04: workbench:detach revoked in the operator's settings while the source admission waits refuses missing-detach-grant at the final boundary with zero detached starts, and with it held again the same request launches", async () => {
    const world = await boot({ parkAdmission: true });
    const pending = world.execute(functionParams());
    await world.admissionPark?.entered;
    writeSettings(world.dir, EMBEDDED_RIGHTS);
    world.admissionPark?.open(undefined);
    const reply = await pending;
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    expect([world.calls.admit, world.calls.start, world.calls.detached]).toEqual([1, 0, 0]);
    writeSettings(world.dir, DETACHED_RIGHTS);
    const again = await world.execute(functionParams());
    expect([again.ok, again.status]).toEqual([true, "launched"]);
    expect([world.calls.start, world.calls.detached]).toEqual([0, 1]);
  }, CASE_MS);

  it("DF05: workbench:detach named only in the request's policy and input, or held only as workbench:detached or as workbench:detac, refuses missing-detach-grant with zero package, Git and host calls", async () => {
    const world = await boot({ rights: EMBEDDED_RIGHTS });
    const inPolicy = await world.execute(functionParams({ policy: { allowWrites: true, grants: [DETACH_GRANT] } }));
    expect(inPolicy.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    const inInput = await world.execute(functionParams({ input: { task: "t", workspaceId: "w", baseRevision: "r", grants: [DETACH_GRANT] } }));
    expect(inInput.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    writeSettings(world.dir, [...EMBEDDED_RIGHTS, "workbench:detached"]);
    const extended = await world.execute(functionParams());
    expect(extended.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    writeSettings(world.dir, [...EMBEDDED_RIGHTS, "workbench:detac"]);
    const cut = await world.execute(functionParams());
    expect(cut.error).toEqual({ code: "missing-detach-grant", message: DETACH_REASON });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0, detached: 0 });
  }, CASE_MS);

  it("DF06: with workbench:detach held and claude:invoke not held, a detached launch with an SDK edge refuses at entry as launch-failed naming missing-sdk-right, with zero package, Git and host calls", async () => {
    const world = await boot({ rights: [...DETACHED_RIGHTS, "claude:tool:Read"], sdkTools: ["Read"] });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "launch-failed", message: MISSING_SDK_RIGHT });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0, detached: 0 });
  }, CASE_MS);

  it("DF07: the writer lease covers the detached run: while its settlement is parked a second detached launch on the workspace refuses as launch-failed naming writer-held, and once it settles the second launches", async () => {
    const world = await boot();
    const first = await world.execute(functionParams());
    expect(first.status).toBe("launched");
    const second = await world.execute(functionParams());
    expect([second.ok, second.invoked]).toEqual([false, false]);
    expect(second.error).toEqual({ code: "launch-failed", message: WRITER_HELD });
    expect(world.calls.detached).toBe(1);
    world.detachedSettles[0]?.open({ outcome: "fixture" });
    await flush();
    const third = await world.execute(functionParams());
    expect([third.ok, third.status]).toEqual([true, "launched"]);
    expect(world.calls.detached).toBe(2);
  }, CASE_MS);

  it("DF08: inside the detached start, before it answers, the journal holds exactly the intent row, and once it answered the dispatched row carrying the detached host's native references follows", async () => {
    const world = await boot();
    const reply = await world.execute(functionParams());
    expect(reply.status).toBe("launched");
    const invocationId = reply.invocationId ?? "";
    expect(world.atDetachedStart).toEqual([[intentRow(invocationId, world.sourceIdentity)]]);
    await flush();
    expect(rowsOf(world.dir, invocationId)).toEqual([intentRow(invocationId, world.sourceIdentity), DISPATCHED_ROW]);
  }, CASE_MS);

  it("DF09: the header's pinned reader set lists exactly this file's case titles, in order, each verbatim", () => {
    const source = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const header = source.slice(0, source.indexOf("\nimport "));
    const listed = [...header.matchAll(/^ \* - (DF\d\d: .+)$/gm)].map(match => match[1]);
    const titles = [...source.matchAll(/^\s+it\("(DF\d\d: [^"]+)"/gm)].map(match => match[1]);
    expect(titles.length).toBeGreaterThan(0);
    expect(listed).toEqual(titles);
  });
});
