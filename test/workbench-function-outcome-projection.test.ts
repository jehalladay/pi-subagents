/**
 * wb-9a1o (MNI packet P05, MWI outcomes slice PI-3): the original MechanicalWorkflows outcome of a hosted function's run, read
 * through the actual workflow_execute and workflow_observe tool objects src/index.ts registers with one injected installed host
 * (the PI-FUNCTION-REGISTERED fixture gate, evidence_level: V3, injected callbacks: never MechanicalWorkflows' native exit of the
 * same name, and no native Forge or SDK evidence).
 *
 * Requirements, one criterion set per cut (docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/
 * ATOMIC-REQUIREMENTS.md at 18b016b2, and the Nov-4 row it extends at 0b25e14e):
 *   EAT-R242 AC1 "four tests drive injected producer callbacks yielding each variant through the registered route; each asserts
 *            the complete original outcome payload object and the separate host envelope" (RO01, one case per variant); AC2 "The
 *            direct develop() fixture of the same payloads exists only as an additional control and is not counted": this suite
 *            holds no develop() fixture, every reading is the registered route's; AC3 "dropping any one variant's projection (e.g.
 *            mapping needs_evidence onto failure) turns exactly that variant's test red" is the cut's mutant battery, recorded in
 *            the delivery note, not a case.
 *   EAT-R036 "Round-trip each real host outcome fixture through serialization/projection: verified_candidate,
 *            verification_failed, needs_evidence, indeterminate remain distinct from execution status" (RO01: each variant's
 *            domain beside the task's status completed); its mutant "Map all resolved promises to domain success" reds RO01's
 *            other three variants.
 *
 * PINNED READER SET (case id: assertion target -> observed result at this cut):
 *   RO00 the outcome rows: their kinds, in order, are docs/workbench/01 J03's four variants (the anchor outside this file) and
 *        src's MECHANICAL_DOMAINS, and each row's members are the MechanicalWorkflows variant's (frozen-shape literal) -> equal.
 *   RO01 <kind> (one case per variant): workflow_execute replies launched and not-asserted with the Pi task reference and the
 *        host's native reference, and workflow_observe reads no mechanicalOutcome while the run is open; once the run settles
 *        with that variant's outcome object, workflow_observe by the reply's invocation id reads the task's own envelope (status
 *        completed, error null) and mechanicalOutcome { domain <the kind>, payload <the complete outcome object: every member, the
 *        nested evidence references among them> }, and no member of the outcome object stands in the task envelope -> as stated.
 *   RO02 the payload is the copy taken when the run settled: the producer replacing a member of its outcome object and adding
 *        one afterwards reaches neither the domain nor the payload -> unchanged.
 *   RO03 <form> (five cases): a run that settles with RF03's settle value {outcome: "fixture"}, a kind word outside the four, the
 *        bare string verified_candidate, null, or a list holding a verified_candidate outcome reads status completed, carries no
 *        mechanicalOutcome member and names none of the four kind words anywhere in the reply -> as stated (no invented domain).
 *   RO04 the byte cap names what it drops: a needs_evidence outcome whose scope lists 120 files reads complete at the default
 *        cap; at maxBytes 2048 the reply is the task envelope without it, envelopeOmitted naming mechanicalOutcome after the four
 *        members it names already -> as stated.
 *   RO05 a run whose settlement rejects, with an outcome-shaped reason, reads status failed with the fixed error text and carries
 *        no mechanicalOutcome member: a rejection is never read as an outcome -> as stated.
 *
 * NOT CLAIMED by this suite: EAT-R243 (its B02-B04 oracles: operation/ref retention as an axis of its own, agent/Forge never
 * dispatched, no PASS-equivalent field anywhere), EAT-R244 (separate axes, explicit unknown markers, the versioned-envelope
 * schema check, the K030 record), EAT-R245 (gate credit and freshness), EAT-R246 (reopening after the initiating turn), EAT-R247
 * (bounded model-facing output beyond RO04, the UI glyph), EAT-R248 (gaps), EAT-R249 (profiles), and EAT-R037 to EAT-R040 and
 * EAT-R156 to EAT-R158 beyond what RO01 pins; a settled value outside RO03's five forms; an outcome string the shared sanitizer
 * bounds or redacts (past its 2000-character bound, or credential-shaped), which reads as the sanitizer renders it; a run stopped
 * through workflow_control before it settles; a real installed MechanicalWorkflows package or its native outcome (P07, V4).
 */
import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { EXECUTE_GRANT } from "../src/workbench/execute.js";
import type { FunctionHostStarted, WorkflowFunctionHosting } from "../src/workbench/execute-tool.js";
import { adoptFunctionActions, type FunctionActionContract } from "../src/workbench/function-authority.js";
import { MECHANICAL_DOMAINS, type NativeRef } from "../src/workbench/observation.js";
import { measureSourceIdentity, type SourceAdmissionHost, type SourceGitReader, WriteBoundaryAuthority, WriterLeases } from "../src/workbench/source-admission.js";
import { ctx, flush, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

const CASE_MS = 60_000;
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const JOURNEYS = join(REPO, "docs", "workbench", "01-product-vision-and-user-journeys.md");
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_REF = { kind: "function", id: FUNCTION_ID, schemaVersion: "mechanical-workflows/entrypoint/v1", artifactDigest: `sha256:${"ab".repeat(32)}` } as const;
const PACKAGE = `sha256:${"cd".repeat(32)}`;
/** The TEST FIXTURE action spelling the P03 and P04 suites bind; no spelling is adopted for Pi (the P00 ruling). */
const ACTION = "fixture-fn:develop-write";
const CONTRACT: FunctionActionContract = adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: ACTION }]);
const RIGHTS: readonly string[] = [EXECUTE_GRANT, "workbench:observe", ACTION];
const OPERATOR = "operator-1";
const NATIVE: NativeRef = { provider: "mechanical-fixture", type: "invocation", id: "mw-inv-0005" };
const PARAMS: Record<string, unknown> = { definitionRef: FUNCTION_REF, input: { task: "t", workspaceId: "w", baseRevision: "r" }, hostMode: "embedded", policy: { allowWrites: true } };
const RUN_FAILED = "the installed host settled the function's run with a failure";

/** The four outcome variants, each with every member MechanicalWorkflows' DevelopmentOutcome union declares for it (mw 28ecd6ac). */
const BASE = { workspaceId: "w", revision: "r" };
const CANDIDATE_BASIS = { workspaceId: "w", revision: "c1" };
const CANDIDATE = { basis: CANDIDATE_BASIS, parentBasis: BASE, evidence: { system: "git", kind: "commit", id: "c1" } };
const OUTCOMES: readonly Readonly<Record<string, JsonValue>>[] = [
  { kind: "verified_candidate", candidate: CANDIDATE, verification: { basis: CANDIDATE_BASIS, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "fixture-gate-1" } } },
  {
    kind: "verification_failed",
    candidate: CANDIDATE,
    verification: { basis: CANDIDATE_BASIS, verdict: "failed", evidence: { system: "forge", kind: "operation", id: "fixture-gate-2" }, diagnostic: "the test step failed" },
  },
  { kind: "needs_evidence", scope: { basis: BASE, coverage: "partial", files: ["README.md"], evidence: { system: "fixture", kind: "scope", id: "scope-1" } }, reason: "SCOPE_INCOMPLETE" },
  { kind: "indeterminate", reason: "the Git basis could not be measured", evidence: { system: "git", kind: "basis", id: "basis-1" } },
];
const KINDS: readonly string[] = OUTCOMES.map(outcome => String(outcome.kind));
const outcomeOf = (kind: string): Readonly<Record<string, JsonValue>> => {
  const outcome = OUTCOMES.find(entry => entry.kind === kind);
  if (outcome === undefined) throw new Error(`no ${kind} row`);
  return outcome;
};
/** Settled values that are no outcome, each with its label. */
const NOT_OUTCOMES: [string, unknown][] = [
  ["RF03's settle value", { outcome: "fixture" }],
  ["a kind word outside the four", { ...outcomeOf("verified_candidate"), kind: "verified" }],
  ["the bare string verified_candidate", "verified_candidate"],
  ["null", null],
  ["a list holding a verified_candidate outcome", [outcomeOf("verified_candidate")]],
];
/** A needs_evidence outcome too large for a 2048-byte reply beside the task envelope. */
const LARGE: Readonly<Record<string, JsonValue>> = {
  kind: "needs_evidence",
  scope: { basis: BASE, coverage: "partial", files: Array.from({ length: 120 }, (_, index) => `src/module-${String(index).padStart(3, "0")}.ts`) },
  reason: "SCOPE_INCOMPLETE",
};

/** J03's four variants, in its order: the anchor outside this file. */
function journeyVariants(): readonly string[] {
  const line = readFileSync(JOURNEYS, "utf8")
    .split("\n")
    .find(text => text.startsWith("J03 "));
  const clause = /preserving the producer's (.+?) outcome rather than collapsing to Boolean success/.exec(line ?? "");
  return clause?.[1]?.split(" / ") ?? [];
}

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi P05 Fixture", "-c", "user.email=p05-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
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

/** One run's settlement, opened by the case. */
interface Settlement {
  readonly promise: Promise<unknown>;
  resolve(value: unknown): void;
  reject(reason: unknown): void;
}
function settlement(): Settlement {
  let resolve: (value: unknown) => void = () => undefined;
  let reject: (reason: unknown) => void = () => undefined;
  const promise = new Promise<unknown>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, resolve, reject };
}
interface Reply {
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: string;
  readonly completion: string;
  readonly invocationId?: string;
  readonly nativeRefs: readonly NativeRef[];
}
type Observed = Readonly<Record<string, unknown>>;

let sandbox: Hermetic | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
}, CASE_MS);

/**
 * Boots the real extension in a hermetic sandbox that is a clean Git worktree (.pi/ ignored), with one injected installed host
 * composed: real source admission over that worktree, its attestation minted by the host's own authority, one admitted package
 * identity, and a host whose run settles when the case opens its settlement.
 */
async function boot() {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...RIGHTS] } } });
  const dir = sandbox.dir;
  git(dir, "init", "-q");
  writeFileSync(join(dir, "README.md"), "# p05 fixture\n");
  writeFileSync(join(dir, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(dir, ".gitignore"), ".pi/\n");
  git(dir, "add", "README.md", "forge.toml", ".gitignore");
  git(dir, "commit", "-q", "--no-verify", "-m", "p05 fixture base");
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
  const settlements: Settlement[] = [];
  const hosting: WorkflowFunctionHosting = {
    contract: CONTRACT,
    source,
    package: { admit: async () => PACKAGE, current: () => PACKAGE },
    start: async (): Promise<FunctionHostStarted> => {
      const settled = settlement();
      settlements.push(settled);
      return { nativeRefs: [NATIVE], settled: settled.promise };
    },
  };
  const pi = makePi();
  subagentsExtension(pi.pi, { functionHosting: hosting });
  const context = ctx({ cwd: dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const tool = (name: string) => {
    const registered = pi.tools.get(name);
    if (!registered) throw new Error(`${name} is not registered`);
    return registered;
  };
  const execute = async (): Promise<Reply> => JSON.parse(textOf(await tool("workflow_execute").execute("call-9a1o", PARAMS, undefined, undefined, context))) as Reply;
  /** workflow_observe's reply text and its JSON reading; a reply that is not JSON reds the case that reads it. */
  const observe = async (taskId: string, maxBytes?: number): Promise<{ readonly text: string; readonly observed: Observed }> => {
    const text = textOf(await tool("workflow_observe").execute("observe-9a1o", { taskId, ...(maxBytes === undefined ? {} : { maxBytes }) }, undefined, undefined, context));
    expect(text.startsWith("{"), text).toBe(true);
    return { text, observed: JSON.parse(text) as Observed };
  };
  /** Launches the function, asserts the launch reply, and returns the invocation id with the run's settlement. */
  const launch = async (): Promise<{ readonly id: string; readonly settled: Settlement }> => {
    const reply = await execute();
    expect([reply.ok, reply.invoked, reply.status, reply.completion]).toEqual([true, true, "launched", "not-asserted"]);
    expect(reply.nativeRefs).toEqual([{ provider: "pi-workflow", type: "task", id: reply.invocationId, scope: workspace }, NATIVE]);
    const settled = settlements[0];
    if (reply.invocationId === undefined || settled === undefined || settlements.length !== 1) throw new Error("the launch did not start exactly one run");
    return { id: reply.invocationId, settled };
  };
  return { observe, launch };
}

describe("wb-9a1o: a hosted function's original Mechanical outcome through workflow_observe (MNI P05, EAT-R242)", () => {
  it("RO00 the frozen shape: the outcome rows' kinds, in order, are docs/workbench/01 J03's four variants and src's MECHANICAL_DOMAINS, each row with its variant's members", () => {
    const anchor = journeyVariants();
    expect(anchor, "J03 names four variants").toHaveLength(4);
    expect(KINDS).toEqual(anchor);
    expect([...MECHANICAL_DOMAINS]).toEqual(anchor);
    expect(OUTCOMES.map(outcome => `${outcome.kind}:${Object.keys(outcome).join(",")}`)).toEqual([
      "verified_candidate:kind,candidate,verification",
      "verification_failed:kind,candidate,verification",
      "needs_evidence:kind,scope,reason",
      "indeterminate:kind,reason,evidence",
    ]);
  });

  it.each([...KINDS])(
    "RO01 EAT-R242 AC1 / EAT-R036: a run that settles with the %s outcome reads through workflow_observe as that domain with its complete original payload, beside the task's own envelope (status completed, error null)",
    async kind => {
      const world = await boot();
      const outcome = outcomeOf(kind);
      const { id, settled } = await world.launch();
      expect((await world.observe(id)).observed, "an open run carries no outcome").not.toHaveProperty("mechanicalOutcome");
      settled.resolve(structuredClone(outcome));
      await flush();
      const { observed } = await world.observe(id);
      expect(observed).toMatchObject({ taskId: id, status: "completed", error: null });
      expect(observed.mechanicalOutcome).toEqual({ domain: kind, payload: outcome });
      for (const member of Object.keys(outcome)) expect(observed, `the task envelope holds no ${member} member`).not.toHaveProperty(member);
    },
    CASE_MS,
  );

  it("RO02: the payload is the copy taken when the run settled; the producer changing its outcome object afterwards reaches neither the domain nor the payload", async () => {
    const world = await boot();
    const outcome = outcomeOf("verification_failed");
    const { id, settled } = await world.launch();
    const held: Record<string, JsonValue> = structuredClone(outcome);
    settled.resolve(held);
    await flush();
    held.kind = "verified_candidate";
    held.added = "after the run settled";
    const { observed } = await world.observe(id);
    expect(observed.mechanicalOutcome).toEqual({ domain: "verification_failed", payload: outcome });
  }, CASE_MS);

  it.each(NOT_OUTCOMES)(
    "RO03: a run that settles with %s reads status completed with no mechanicalOutcome member, and its reply names none of the four kind words",
    async (_label, value) => {
      const world = await boot();
      const { id, settled } = await world.launch();
      settled.resolve(value);
      await flush();
      const { text, observed } = await world.observe(id);
      expect(observed).toMatchObject({ taskId: id, status: "completed", error: null });
      expect(observed).not.toHaveProperty("mechanicalOutcome");
      for (const kind of KINDS) expect(text, `the reply names ${kind}`).not.toContain(kind);
    },
    CASE_MS,
  );

  it("RO04: a needs_evidence outcome whose scope lists 120 files reads complete at the default cap; at maxBytes 2048 the reply is the task envelope without it, envelopeOmitted naming mechanicalOutcome", async () => {
    const world = await boot();
    const { id, settled } = await world.launch();
    settled.resolve(structuredClone(LARGE));
    await flush();
    const full = await world.observe(id);
    expect(full.observed.mechanicalOutcome).toEqual({ domain: "needs_evidence", payload: LARGE });
    const tight = await world.observe(id, 2048);
    expect(Buffer.byteLength(tight.text, "utf8")).toBeLessThanOrEqual(2048);
    expect(tight.observed).toMatchObject({ taskId: id, status: "completed" });
    expect(tight.observed).not.toHaveProperty("mechanicalOutcome");
    expect(tight.observed.envelopeOmitted).toEqual(["identity", "inputDigest", "workspaceSourceState", "error", "mechanicalOutcome"]);
  }, CASE_MS);

  it("RO05: a run whose settlement rejects with an outcome-shaped reason reads failed with the fixed error text and carries no mechanicalOutcome member", async () => {
    const world = await boot();
    const { id, settled } = await world.launch();
    settled.reject(structuredClone(outcomeOf("verified_candidate")));
    await flush();
    const { text, observed } = await world.observe(id);
    expect(observed).toMatchObject({ taskId: id, status: "failed", error: RUN_FAILED });
    expect(observed).not.toHaveProperty("mechanicalOutcome");
    for (const kind of KINDS) expect(text, `the reply names ${kind}`).not.toContain(kind);
  }, CASE_MS);
});
