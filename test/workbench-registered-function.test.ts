/**
 * wb-4bxo (MNI packet P04, MWI dispatch slice PI-1): the registered workflow_execute(function) branch, driven through the
 * actual workflow_execute and workflow_observe tool objects src/index.ts registers, with one injected installed host
 * (evidence level V3, injected callbacks: the PI-FUNCTION-REGISTERED fixture gate of 02-IMPLEMENTATION-PACKAGES.md P04,
 * never MechanicalWorkflows' native exit of the same name).
 *
 * Requirements (docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at
 * 18b016b2; the Nov-4 and Nov-6 lineage EAT-R032..EAT-R035 and EAT-R155 at 0b25e14e and d7666a76):
 *   EAT-R235 AC1 "the actual registered tool object, invoked with kind:function and one injected installed host, executes exactly
 *            one function ... and returns one logical invocation ID and a native ref" (RF01); AC2 "Assert workflow_observe finds
 *            the invocation by that ID" (RF02); AC4 "a non-allowlisted function id is refused with zero producer-host calls" (RF04).
 *   EAT-R236 AC2 "the registered tool list contains exactly one workflow-execute surface and no duplicate workflow tool names"
 *            (RF11).
 *   EAT-R237 AC1 "kind:furnace-formula -> explicit unsupported diagnostic; assert zero source loads, zero producer-host/module
 *            imports, zero Forge dispatches" (RF05; EAT-R155 "while the same request shape with kind function ... proceeds").
 *   EAT-R238 AC1 "for each of {arbitrary function id (A01), absent grant (A06), dirty workspace (A10)} the registered tool refuses
 *            with zero user-loader calls, zero writer calls and zero Forge dispatches" (RF04, RF06, RF07); AC2 "a fully valid
 *            invocation reaches exactly one dispatch" (RF01); AC3 the final rights re-read (RF09).
 *   EAT-R239 AC1 "the reply's invocation record and the store's task record share the same ID" (RF02).
 *   EAT-R240 AC1 "with the injected host parked on a barrier, the tool reply returns before the host completes and carries
 *            completion: not-asserted, the invocation ID and native refs"; AC2 "After releasing the barrier, workflow_observe
 *            reports the settled outcome for the same invocation ID" (RF03, RF03b).
 *   EAT-R032 "tool promptly returns launched with one invocation ID and completion not-asserted; observer later receives
 *            terminal state" (RF03); EAT-R033 "Disabling Mechanical hosting MUST preserve script workflow behavior" (RF11: no
 *            hosting composed, a function definition still refuses as before); EAT-R034 "worker inputs contain only
 *            serializable data and cannot install or replace callbacks" (RF13).
 * Beyond the requirement rows: the shipped contract still freezes every function dispatch (RF10), a detached function launch
 * is not hosted (RF12), a host that rejects at start launches nothing and leaves no task (RF14), and the chain's writer lease
 * covers the function's whole run, not only its start (RF15). Refusals keep the shipped code vocabulary: an unreviewed id or
 * placement is unsupported-definition-kind with its own fixed reason, and a composed-chain refusal is launch-failed whose reason
 * names the deciding layer's code first (each case pins the exact reason).
 *
 * NOT CLAIMED by this suite: a real installed MechanicalWorkflows package or its native outcome (P07, V4); any Pi session
 * composing function hosting from settings (no setting enables it, so a Pi session refuses every function definition as
 * unsupported-definition-kind, RF11); an adopted action spelling (the fixture contract binds the TEST FIXTURE spelling
 * fixture-fn:develop-write, as the P03 suite does; the shipped FUNCTION_ACTION_CONTRACT stays unadopted, RF10); the projection of
 * the original Mechanical outcome (P05); controls, cancellation and journal (P06); and the A01-A14 sweep (P08).
 */
import { execFileSync } from "node:child_process";
import { realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT } from "../src/workbench/execute.js";
import { DETACH_GRANT, type FunctionHostStart, type FunctionHostStarted, type WorkflowFunctionHosting } from "../src/workbench/execute-tool.js";
import { adoptFunctionActions, FUNCTION_ACTION_CONTRACT, type FunctionActionContract } from "../src/workbench/function-authority.js";
import { MECHANICAL_REVIEWED_ENTRYPOINTS } from "../src/workbench/mechanical-descriptor.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { measureSourceIdentity, type SourceAdmissionHost, type SourceGitReader, WriteBoundaryAuthority, WriterLeases } from "../src/workbench/source-admission.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const CASE_MS = 60_000;
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_SCHEMA = "mechanical-workflows/entrypoint/v1";
const DIGEST = `sha256:${"ab".repeat(32)}`;
const PACKAGE = `sha256:${"cd".repeat(32)}`;
/** The TEST FIXTURE action spelling the P03 suite binds; no spelling is adopted for Pi (the P00 ruling). */
const ACTION = "fixture-fn:develop-write";
const OBSERVE_GRANT = "workbench:observe";
const OPERATOR = "operator-1";
const TASK: JsonValue = { task: "t", workspaceId: "w", baseRevision: "r" };
const WRITES: JsonValue = { allowWrites: true };
const NATIVE: NativeRef = { provider: "mechanical-fixture", type: "invocation", id: "mw-inv-0001" };
const CONTRACT: FunctionActionContract = adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: ACTION }]);
const RIGHTS: readonly string[] = [EXECUTE_GRANT, OBSERVE_GRANT, ACTION];
const FUNCTION_REF = { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST } as const;
const SETTLE_FAILURE = "producer failure text that must not reach the store";
/** The kind refusal's fixed reasons: a script-only host (as before this cut), an unreviewed function id, an unhosted placement. */
const SCRIPT_ONLY = "only script definitions launch in this host";
const NOT_REVIEWED = "the definition names no reviewed Mechanical entrypoint";
const NOT_EMBEDDED = "only an embedded function launch is hosted";
/** A composed-chain refusal's reason: the deciding layer's own code, then that layer's fixed reason. */
const MISSING_ACTION = "missing-function-action-grant: missing the exact function action grant the adopted contract binds to this definition";
const UNADOPTED = "function-action-unadopted: no exact function action grant is adopted for this definition (MW-CONTRACT)";
const DIRTY_BASE = "dirty-base: git status lists tracked, staged or untracked edits of the implementation base";
const WRITER_HELD = "writer-held: the writer lease of this canonical workspace is held";

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi P04 Fixture", "-c", "user.email=p04-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
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

/** A promise a case opens by hand. */
interface Barrier<T> {
  readonly promise: Promise<T>;
  open(value: T): void;
  fail(error: unknown): void;
  readonly entered: Promise<void>;
  enter(): void;
}
function barrier<T>(): Barrier<T> {
  let open: (value: T) => void = () => undefined;
  let fail: (error: unknown) => void = () => undefined;
  let enter: () => void = () => undefined;
  const promise = new Promise<T>((resolve, reject) => {
    open = resolve;
    fail = reject;
  });
  const entered = new Promise<void>(resolve => {
    enter = resolve;
  });
  return { promise, open, fail, entered, enter };
}

interface Reply {
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: string;
  readonly completion: string;
  readonly invocationId?: string;
  readonly nativeRefs: readonly NativeRef[];
  readonly definition?: { readonly kind: string; readonly id: string };
  readonly error?: { readonly code: string; readonly message: string };
}
interface Observed {
  readonly taskId: string;
  readonly status: string;
  readonly inputDigest: string | null;
  readonly error: string | null;
}
interface WorldOptions {
  readonly rights?: readonly string[];
  /** false boots a Pi session: no function hosting is composed. */
  readonly hosting?: boolean;
  readonly contract?: FunctionActionContract;
  /** Park the source admission's wait until the case opens it. */
  readonly parkAdmission?: boolean;
  /** How the injected host's run settles: open by the case (default), resolved at once, or rejected at once. */
  readonly settle?: "barrier" | "resolved" | "rejected";
  readonly startRejects?: boolean;
}

let sandbox: Hermetic | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
});

function writeSettings(dir: string, rights: readonly string[]): void {
  writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } }));
}

/**
 * Boots the real extension in a hermetic sandbox that is a clean Git worktree (.pi/ ignored), with the injected installed host
 * composed unless `hosting` is false. The source host is real source admission over that worktree, its attestation minted by
 * the host's own authority; the package host admits one installed package identity.
 */
async function boot(options: WorldOptions = {}) {
  const rights = options.rights ?? RIGHTS;
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  const dir = sandbox.dir;
  git(dir, "init", "-q");
  writeFileSync(join(dir, "README.md"), "# p04 fixture\n");
  writeFileSync(join(dir, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(dir, ".gitignore"), ".pi/\n");
  git(dir, "add", "README.md", "forge.toml", ".gitignore");
  git(dir, "commit", "-q", "--no-verify", "-m", "p04 fixture base");
  const workspace = realpathSync(dir);
  const measured = measureSourceIdentity(workspace, "forge.toml", gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  const authority = new WriteBoundaryAuthority();
  const calls = { git: 0, admit: 0, current: 0, start: 0 };
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
  const settles: Barrier<unknown>[] = [];
  const starts: FunctionHostStart[] = [];
  const hosting: WorkflowFunctionHosting = {
    contract: options.contract ?? CONTRACT,
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
    start: async (request: FunctionHostStart): Promise<FunctionHostStarted> => {
      calls.start += 1;
      starts.push(request);
      if (options.startRejects) throw new Error("the installed host refused to start");
      const settle = barrier<unknown>();
      settles.push(settle);
      if (options.settle === "resolved") settle.open({ outcome: "fixture" });
      if (options.settle === "rejected") settle.fail(new Error(SETTLE_FAILURE));
      return { nativeRefs: [NATIVE], settled: settle.promise };
    },
  };
  const pi = makePi();
  subagentsExtension(pi.pi, options.hosting === false ? {} : { functionHosting: hosting });
  const context = ctx({ cwd: dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const tool = (name: string) => {
    const registered = pi.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  const execute = async (params: Record<string, unknown>): Promise<Reply> => {
    const result = await tool("workflow_execute").execute("call-4bxo", params, undefined, undefined, context);
    return JSON.parse(textOf(result)) as Reply;
  };
  const observe = async (taskId: string): Promise<Observed | string> => {
    const text = textOf(await tool("workflow_observe").execute("observe-4bxo", { taskId }, undefined, undefined, context));
    return text.startsWith("{") ? (JSON.parse(text) as Observed) : text;
  };
  return { pi, dir, workspace, context, calls, starts, settles, admissionPark, execute, observe };
}

function functionParams(over: Record<string, unknown> = {}): Record<string, unknown> {
  return { definitionRef: FUNCTION_REF, input: TASK, hostMode: "embedded", policy: WRITES, ...over };
}
/** The input digest decideExecute's admission records for these params; it does not depend on the minted invocation. */
function admittedDigest(params: Record<string, unknown>): string {
  const decision = decideExecute(params as never, { grants: [EXECUTE_GRANT], invocationId: "wf_000000000000" });
  if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
  return decision.admission.inputDigest;
}
function localPrincipal(): string {
  return `local-operator:${process.getuid?.() ?? ""}:s1`;
}

describe("wb-4bxo P04: the registered workflow_execute(function) branch at the registered path (V3, injected installed host)", () => {
  it("RF01 EAT-R235 AC1 / EAT-R238 AC2: the registered workflow_execute launches the reviewed kind:function definition on the injected installed host exactly once and returns one logical invocation and its native references", async () => {
    const world = await boot();
    const reply = await world.execute(functionParams());
    expect(reply.error).toBeUndefined();
    expect([reply.ok, reply.invoked, reply.status, reply.completion]).toEqual([true, true, "launched", "not-asserted"]);
    expect(reply.invocationId).toMatch(/^wf_[0-9a-f]{12}$/);
    expect(reply.definition).toEqual(FUNCTION_REF);
    expect(reply.nativeRefs).toEqual([{ provider: "pi-workflow", type: "task", id: reply.invocationId, scope: world.workspace }, NATIVE]);
    expect(world.calls.start).toBe(1);
    const [start] = world.starts;
    expect(start?.invocationId).toBe(reply.invocationId);
    expect(start?.entrypoint).toBe(MECHANICAL_REVIEWED_ENTRYPOINTS[0]);
    expect(start?.definition).toEqual(FUNCTION_REF);
    expect(start?.input).toEqual(TASK);
    expect(start?.grant.authority.grants).toEqual([EXECUTE_GRANT, ACTION]);
    expect(start?.grant.authority.identity).toEqual({ principal: localPrincipal(), sessionId: "s1" });
    expect(start?.grant.packageIdentity).toBe(PACKAGE);
    expect(start?.grant.source.identity.canonicalRoot).toBe(world.workspace);
    expect(world.calls.admit).toBe(1);
  }, CASE_MS);

  it("RF02 EAT-R235 AC2 / EAT-R239 AC1: workflow_observe finds the launched function by the invocation id the reply returned, in the existing task store, with the admission's input digest", async () => {
    const world = await boot();
    const params = functionParams();
    const reply = await world.execute(params);
    const observed = await world.observe(reply.invocationId ?? "");
    expect(observed).toMatchObject({ taskId: reply.invocationId, status: "running", inputDigest: admittedDigest(params), error: null });
  }, CASE_MS);

  it("RF03 EAT-R240 AC1-AC2 / EAT-R032: with the installed host's run parked, the reply returns launched and not-asserted before the run settles, and workflow_observe reports the settled run once it settles", async () => {
    const world = await boot();
    const reply = await world.execute(functionParams());
    expect([reply.status, reply.completion]).toEqual(["launched", "not-asserted"]);
    expect(world.settles).toHaveLength(1);
    expect(await world.observe(reply.invocationId ?? "")).toMatchObject({ taskId: reply.invocationId, status: "running" });
    world.settles[0]?.open({ outcome: "fixture" });
    await flush();
    expect(await world.observe(reply.invocationId ?? "")).toMatchObject({ taskId: reply.invocationId, status: "completed", error: null });
  }, CASE_MS);

  it("RF03b EAT-R240 AC2: a run that settles with a rejection reads failed through workflow_observe, with a fixed error text and none of the producer's text", async () => {
    const world = await boot({ settle: "rejected" });
    const reply = await world.execute(functionParams());
    expect(reply.status).toBe("launched");
    await flush();
    const observed = await world.observe(reply.invocationId ?? "");
    expect(observed).toMatchObject({ taskId: reply.invocationId, status: "failed" });
    expect(typeof observed === "string" ? observed : observed.error).toBe("the installed host settled the function's run with a failure");
    expect(JSON.stringify(observed)).not.toContain(SETTLE_FAILURE);
  }, CASE_MS);

  it.each(["mechanical.development.develop.v2", "mechanical.development.other.v1", "fixture.function.v1"])(
    "RF04 EAT-R235 AC4 / EAT-R238 A01: the function id %s outside the reviewed allowlist refuses as unsupported-definition-kind with the unreviewed-id reason and zero package, source and host calls",
    async id => {
      const world = await boot();
      const reply = await world.execute(functionParams({ definitionRef: { ...FUNCTION_REF, id } }));
      expect([reply.ok, reply.invoked, reply.status, reply.invocationId]).toEqual([false, false, "refused", undefined]);
      expect(reply.error).toEqual({ code: "unsupported-definition-kind", message: NOT_REVIEWED });
      expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
    },
    CASE_MS,
  );

  it("RF05 EAT-R237 AC1 / EAT-R155: with function hosting composed, a furnace-formula definition still refuses as unsupported-definition-kind with zero package, source and host calls, while the same request shape with kind function launches", async () => {
    const world = await boot();
    const refused = await world.execute(functionParams({ definitionRef: { ...FUNCTION_REF, kind: "furnace-formula" } }));
    expect([refused.ok, refused.invoked]).toEqual([false, false]);
    expect(refused.error).toEqual({ code: "unsupported-definition-kind", message: SCRIPT_ONLY });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
    const launched = await world.execute(functionParams());
    expect([launched.ok, launched.status]).toEqual([true, "launched"]);
    expect(world.calls.start).toBe(1);
  }, CASE_MS);

  it("RF06 EAT-R238 A06: without the adopted action grant held, the function refuses at entry as launch-failed naming missing-function-action-grant, before the package barrier, with zero host calls", async () => {
    const world = await boot({ rights: [EXECUTE_GRANT, OBSERVE_GRANT] });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "launch-failed", message: MISSING_ACTION });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
  }, CASE_MS);

  it("RF07 EAT-R238 A10: an untracked file in the workspace refuses as launch-failed naming dirty-base, before any host start", async () => {
    const world = await boot();
    writeFileSync(join(world.dir, "untracked.txt"), "edit\n");
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "launch-failed", message: DIRTY_BASE });
    expect(world.calls.start).toBe(0);
  }, CASE_MS);

  it("RF09 EAT-R238 AC3: the action grant revoked in the operator's settings while the source admission waits refuses at the final boundary, with zero host starts", async () => {
    const world = await boot({ parkAdmission: true });
    const pending = world.execute(functionParams());
    await world.admissionPark?.entered;
    writeSettings(world.dir, [EXECUTE_GRANT, OBSERVE_GRANT]);
    world.admissionPark?.open(undefined);
    const reply = await pending;
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "launch-failed", message: MISSING_ACTION });
    expect([world.calls.admit, world.calls.start]).toEqual([1, 0]);
  }, CASE_MS);

  it("RF10: under the shipped contract (FUNCTION_ACTION_CONTRACT, unadopted) every function dispatch stays frozen: launch-failed naming function-action-unadopted, with zero host calls", async () => {
    const world = await boot({ contract: FUNCTION_ACTION_CONTRACT });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "launch-failed", message: UNADOPTED });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
  }, CASE_MS);

  it.each([
    ["composed", true],
    ["not composed (a Pi session)", false],
  ] as const)("RF11 EAT-R236 AC2 / EAT-R033: with function hosting %s, workflow_execute registers once and no workflow tool name repeats", async (_what, hosting) => {
    const world = await boot({ hosting });
    const names: string[] = world.pi.pi.registerTool.mock.calls.map((call: [{ name: string }]) => call[0].name);
    expect(names.filter(name => name === "workflow_execute")).toHaveLength(1);
    const workflowNames = names.filter(name => name.startsWith("workflow_"));
    expect(new Set(workflowNames).size).toBe(workflowNames.length);
  }, CASE_MS);

  it("RF11b EAT-R033: in a Pi session (no function hosting composed) the registered tool refuses a function definition as unsupported-definition-kind, as before this cut", async () => {
    const world = await boot({ hosting: false });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "unsupported-definition-kind", message: SCRIPT_ONLY });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
  }, CASE_MS);

  it.each([
    ["held", [...RIGHTS, DETACH_GRANT]],
    ["not held", RIGHTS],
  ] as const)("RF12: a detached function launch, workbench:detach %s, refuses as unsupported-definition-kind with the unhosted-placement reason, before the detach conjunction, with zero calls", async (_what, rights) => {
    const world = await boot({ rights });
    const reply = await world.execute(functionParams({ hostMode: "detached" }));
    expect([reply.ok, reply.invoked]).toEqual([false, false]);
    expect(reply.error).toEqual({ code: "unsupported-definition-kind", message: NOT_EMBEDDED });
    expect(world.calls).toEqual({ git: 0, admit: 0, current: 0, start: 0 });
  }, CASE_MS);

  it("RF13 EAT-R034: the host receives the request input as a JSON copy; callable-looking and authority-shaped members stay data and grant nothing", async () => {
    const input: JsonValue = { task: "t", develop: "() => globalThis.process.exit(1)", services: { writer: "replace" }, grants: ["*"], actionGrant: ACTION };
    const denied = await boot({ rights: [EXECUTE_GRANT, OBSERVE_GRANT] });
    const refused = await denied.execute(functionParams({ input }));
    expect(refused.error).toEqual({ code: "launch-failed", message: MISSING_ACTION });
    expect(denied.calls.start).toBe(0);
    sandbox?.restore();
    sandbox = undefined;
    const world = await boot();
    const params = functionParams({ input });
    const reply = await world.execute(params);
    expect(reply.status).toBe("launched");
    const [start] = world.starts;
    expect(start?.input).toEqual(input);
    expect(start?.input).not.toBe(params.input);
    expect(start?.entrypoint).toBe(MECHANICAL_REVIEWED_ENTRYPOINTS[0]);
    expect(start?.grant.authority.grants).toEqual([EXECUTE_GRANT, ACTION]);
  }, CASE_MS);

  it("RF14: an installed host that rejects at start launches nothing: launch-failed, and the minted invocation is not in the task store", async () => {
    const world = await boot({ startRejects: true });
    const reply = await world.execute(functionParams());
    expect([reply.ok, reply.invoked, reply.invocationId]).toEqual([false, false, undefined]);
    expect(reply.error).toEqual({ code: "launch-failed", message: "the installed host refused to start" });
    expect(world.calls.start).toBe(1);
    expect(await world.observe(world.starts[0]?.invocationId ?? "")).toBe("Workflow unavailable in this local operator/session/workspace scope.");
  }, CASE_MS);

  it("RF15: the writer lease covers the function's whole run: a second launch on the workspace refuses as launch-failed naming writer-held while the first runs, and launches once it settles", async () => {
    const world = await boot();
    const first = await world.execute(functionParams());
    expect(first.status).toBe("launched");
    const second = await world.execute(functionParams());
    expect(second.ok).toBe(false);
    expect(second.error).toEqual({ code: "launch-failed", message: WRITER_HELD });
    expect(world.calls.start).toBe(1);
    world.settles[0]?.open({ outcome: "fixture" });
    await flush();
    const third = await world.execute(functionParams());
    expect([third.ok, third.status]).toEqual([true, "launched"]);
    expect(world.calls.start).toBe(2);
  }, CASE_MS);
});
