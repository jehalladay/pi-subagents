/**
 * wb-201v (MWI B-authority, slice PI-1): the authority seam at the final dispatch boundary of a function launch,
 * src/workbench/function-authority.ts.
 *
 * Spec of record: docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md
 * at pi-subagents master 0b25e14e084a5b1d612e780bc12a927b3a80dd62, lines 892-930 (TDD-MATRIX.md rows EAT-R028..EAT-R031 carry
 * the same red and mutant columns). Each EAT describe block pins one requirement; its acceptance line and adversarial
 * mutant, verbatim:
 *   EAT-R028  "Remove workbench:execute from an otherwise admitted function request; assert zero loader/provider calls."
 *             mutant: "Allow descriptor metadata to confer execute rights."
 *   EAT-R029  "A reviewed descriptor plus no action grant refuses; another function action grant refuses; only the adopted
 *             exact action passes."  mutant: "Accept any mechanical namespace grant."
 *   EAT-R030  "Park admission and change effective user/session identity; release and assert refusal before import; caller
 *             principal field cannot override host identity."  mutant: "Snapshot principal before wait and never compare again."
 *   EAT-R031  "Revoke action grant while waiting; assert no dispatch after release."
 *             mutant: "Only validate rights when request enters queue."
 * The condition all four share: "Exact action grant spelling is proposed; MW-CONTRACT must bind it. It must be representable
 * through Pi grant settings and detached transport; no silent grammar bypass."
 *
 * The other describe blocks pin, each at its enumerated rows only: the action grammar (adoption judged through loadSettings
 * and through launchDetachedWorkflow's launch-grant check at the listed samples and sweeps; the Conditions line above is
 * pinned at those samples only); adoption's bounds, binding members and clean-text check; the rule order at the
 * enumerated fault forms; the fixed refusal reasons at the enumerated request pairs; unknown permission data; the
 * function-definition boundary; and the not-wired reading of workflow_execute at the enumerated host reads. Cut #2 (the
 * respin of gate refusal #1) added the judged mirror and every block after the function-definition boundary. Cut #3 (the
 * enumerate-the-resolvable respin of refusal #2, R-B656) pins each further form refusal #2 recorded, red-first against its
 * named member, and narrows the describes to their pinned rows. NOT CLAIMED by this suite: rule-order fault forms, reason
 * pairs, grammar spellings, workflow_execute host reads and final-boundary scheduling forms beyond the enumerated rows;
 * multi-unit unsafe text beyond the listed rows; action-grant spellings beyond the enumerated EAT-R029 rows and sweeps.
 * No residual is named: every known-unpinned form of refusal #2 is pinned by a row below.
 *
 * No spelling is adopted, so the production contract is unadopted and refuses every function dispatch (the B-authority row of
 * BEAD-PLAN.md lands "partial - enforcement seams land now; exact action grammar blocked on MW-CONTRACT"). The adopted contracts
 * below are TEST FIXTURES: the fixture-fn:* grants are not a proposed, adopted or recommended spelling, only a representable
 * stand-in that lets the exactness rules run. The loader and provider are the two calls a function launch makes once its
 * authority holds (import the pinned export, then run it); the harness counts both, and the admission wait is a park the test
 * releases by hand.
 */
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadSettings } from "../src/settings.js";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT, type ExecuteAdmission } from "../src/workbench/execute.js";
import { createWorkflowExecuteTool, DETACH_GRANT, type WorkflowExecuteDeps } from "../src/workbench/execute-tool.js";
import {
  adoptFunctionActions,
  decideFunctionAuthority,
  dispatchFunctionWithAuthority,
  FUNCTION_ACTION_CONTRACT,
  type FunctionActionBinding,
  type FunctionActionContract,
  type FunctionAuthorityHost,
  type FunctionAuthorityInput,
  type FunctionAuthorityRefusal,
  type FunctionAuthorityRefused,
  type FunctionDispatchAuthority,
  type FunctionDispatchResult,
  type FunctionIdentity,
} from "../src/workbench/function-authority.js";
import { launchDetachedWorkflow } from "../src/workbench/hosts/local-detached.js";
import type { DefinitionRef } from "../src/workbench/identity.js";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import { hermeticDir } from "./helpers/boot-extension.js";

const DIGEST = `sha256:${"ab".repeat(32)}`;
const INVOCATION = "fn_0123456789ab";
/** The definition id and schema the program's proposed entrypoint names (02-host-architecture-and-protocol.md at 0b25e14e). */
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_SCHEMA = "mechanical-workflows/entrypoint/v1";
const OTHER_FUNCTION_ID = "fixture.review.v1";
/** TEST FIXTURE spellings (see the header): representable as namespace:permission, never an adopted spelling. */
const ACTION = "fixture-fn:develop-write";
const OTHER_FUNCTION_ACTION = "fixture-fn:review-write";
/** The program's own example spelling (02-host-architecture-and-protocol.md:52 at 0b25e14e), which has two colons. */
const PROPOSED_EXAMPLE = "mechanical:develop:write";
const HOST: FunctionIdentity = Object.freeze({ principal: "local-operator:1000:s1", sessionId: "s1" });
const TASK: JsonValue = { task: "t", workspaceId: "w", baseRevision: "r" };

const CONTRACT: FunctionActionContract = adoptFunctionActions([
  { definitionId: FUNCTION_ID, actionGrant: ACTION },
  { definitionId: OTHER_FUNCTION_ID, actionGrant: OTHER_FUNCTION_ACTION },
]);

/** A real workflow_execute admission of a digest-pinned function definition, optionally carrying a caller policy and input. */
function admissionFor(id = FUNCTION_ID, policy?: JsonValue, input: JsonValue = TASK, kind: DefinitionRef["kind"] = "function", invocationId = INVOCATION): ExecuteAdmission {
  const decision = decideExecute(
    { definitionRef: { kind, id, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, input, hostMode: "embedded", ...(policy !== undefined ? { policy } : {}) },
    { grants: [EXECUTE_GRANT], invocationId },
  );
  if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
  return decision.admission;
}

/** The host the seam reads: the operator's grants and the effective identity, both mutable by the test while parked. */
function harness(start: { grants?: readonly string[]; identity?: FunctionIdentity } = {}) {
  const state: { grants: readonly string[] | undefined; identity: FunctionIdentity } = { grants: start.grants ?? [EXECUTE_GRANT, ACTION], identity: start.identity ?? HOST };
  const reads = { grants: 0, identity: 0 };
  const host: FunctionAuthorityHost = {
    grants: () => {
      reads.grants += 1;
      return state.grants;
    },
    identity: () => {
      reads.identity += 1;
      return { ...state.identity };
    },
  };
  const provider = vi.fn(async (authority: FunctionDispatchAuthority) => ({ outcome: "ran", invocationId: authority.invocationId }));
  const loader = vi.fn(async (_definition: Readonly<DefinitionRef>) => provider);
  const dispatch = async (authority: FunctionDispatchAuthority) => (await loader(authority.definition))(authority);
  const run = (admission: ExecuteAdmission, contract: FunctionActionContract = CONTRACT, park?: () => Promise<void>) =>
    dispatchFunctionWithAuthority({ admission, contract, host, ...(park !== undefined ? { park } : {}), dispatch });
  return { state, reads, host, loader, provider, run };
}

/** The admission wait: park() pends until the test calls release(). */
function parked() {
  let resolveWait: () => void = () => undefined;
  const park = vi.fn(
    () =>
      new Promise<void>(resolve => {
        resolveWait = resolve;
      }),
  );
  return { park, release: () => resolveWait() };
}

function refusalOf<T>(result: FunctionDispatchResult<T>) {
  return result.status === "refused" ? { stage: result.stage, policy: result.refusal.policy, category: result.refusal.category } : { dispatched: true };
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
});

/** A canonical scratch directory for the two judges below (hermeticDir composes test/helpers/scratch.ts; afterEach removes it). */
function judgeDir(): string {
  sandbox = hermeticDir();
  return realpathSync(sandbox.dir);
}

/** Whether workbench.capabilityGrants carries the spelling: loadSettings over project settings listing it after workbench:execute. */
function settingsCarry(dir: string, spelling: string): boolean {
  writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify({ workbench: { workflowAgentBackend: "claude", capabilityGrants: [EXECUTE_GRANT, spelling] } }));
  try {
    return loadSettings(dir).workbench?.capabilityGrants?.includes(spelling) === true;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("workbench.capabilityGrants")) return false;
    throw error;
  }
}

/**
 * Whether the detached transport carries the grants: launchDetachedWorkflow's launch-grant check, on a request whose
 * permissions omit inspect, so validation stops at the permissions check that follows it and nothing is created or spawned.
 */
async function transportCarries(cwd: string, grants: readonly string[]): Promise<boolean> {
  const outcome = await launchDetachedWorkflow({
    directory: join(cwd, "never-created"),
    invocationId: "fa_transport_probe",
    scriptPath: join(cwd, "never-read.js"),
    cwd,
    input: {},
    trustedScript: true,
    backend: "deterministic",
    grants,
    permissions: ["execute"],
  }).then(
    () => "launched",
    (error: unknown) => (error instanceof Error ? error.message : String(error)),
  );
  if (outcome === "Invalid invocation permissions.") return true;
  if (outcome === "Invalid explicit grants.") return false;
  throw new Error(`unexpected detached validation outcome: ${outcome}`);
}

/** Whether adoption takes the spelling as a function action grant; any refusal must be the grammar refusal. */
function adoptable(actionGrant: string): boolean {
  try {
    adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }]);
    return true;
  } catch (error) {
    if (error instanceof CapabilityError && /not representable/.test(error.message)) return false;
    throw error;
  }
}

/** Freezes a value and everything it holds, so a decision that writes to its input throws. */
function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null) return value;
  for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
  return Object.freeze(value);
}

describe("EAT-R028: a function dispatch requires workbench:execute (wb-201v)", () => {
  it("refuses an otherwise authorized function request without workbench:execute before any wait, with zero loader and provider calls", async () => {
    const h = harness({ grants: [ACTION] });
    const wait = parked();
    const result = await h.run(admissionFor(), CONTRACT, wait.park);
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
    expect(wait.park).not.toHaveBeenCalled();
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("a reviewed definition the adopted contract binds confers no execute right, and a JSON policy or input that claims one confers none either", async () => {
    const h = harness({ grants: [ACTION] });
    const claims: JsonValue = { grants: [EXECUTE_GRANT, ACTION], permissions: [EXECUTE_GRANT], authority: EXECUTE_GRANT, reviewed: true };
    for (const admission of [admissionFor(), admissionFor(FUNCTION_ID, claims), admissionFor(FUNCTION_ID, undefined, { task: "t", grants: [EXECUTE_GRANT] })]) {
      expect(refusalOf(await h.run(admission))).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
    }
    const pure = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [ACTION], identity: HOST } });
    expect(pure).toMatchObject({ decision: "refused", policy: "missing-execute-grant", invocationId: INVOCATION });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("workbench:execute revoked while the admission is parked refuses at the final boundary: no loader or provider call after release", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    expect(wait.park).toHaveBeenCalledTimes(1);
    h.state.grants = [ACTION];
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "missing-execute-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });
});

describe("EAT-R029: a function dispatch requires the exact host-issued function action grant (wb-201v)", () => {
  it("refuses a reviewed definition held with workbench:execute and no action grant", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it.each([
    ["another function's action grant", OTHER_FUNCTION_ACTION],
    ["another action of the same function", "fixture-fn:develop-read"],
    ["a longer spelling that begins with the exact action", `${ACTION}-all`],
    ["a longer spelling that extends the exact action through a dot", `${ACTION}.sub`],
    ["a longer spelling that extends the exact action through a digit", `${ACTION}2`],
    ["a shorter spelling the exact action begins with", "fixture-fn:develop"],
    ["a namespace sibling", "fixture-fn:write"],
  ])("refuses %s in the adopted action's namespace (%s)", async (_what, grant) => {
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("refuses the adopted permission under another namespace (other-fn:develop-write): the namespace is part of the exact spelling", async () => {
    const h = harness({ grants: [EXECUTE_GRANT, "other-fn:develop-write"] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("only the adopted exact action passes: one loader and one provider call, resting on exactly the two grants", async () => {
    const h = harness({ grants: ["forge:inspect", OTHER_FUNCTION_ACTION, ACTION, EXECUTE_GRANT] });
    const result = await h.run(admissionFor());
    expect(result).toEqual({
      status: "dispatched",
      authority: { invocationId: INVOCATION, definition: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, grants: [EXECUTE_GRANT, ACTION], identity: HOST },
      value: { outcome: "ran", invocationId: INVOCATION },
    });
    expect(h.loader).toHaveBeenCalledTimes(1);
    expect(h.provider).toHaveBeenCalledTimes(1);
    // The grant is exact per function: the same holdings do not reach the other bound definition.
    const other = harness({ grants: [EXECUTE_GRANT, ACTION] });
    expect(refusalOf(await other.run(admissionFor(OTHER_FUNCTION_ID)))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(other.loader).not.toHaveBeenCalled();
  });

  it("reads the action grant from host context only: a JSON policy or input that names it confers nothing", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    for (const admission of [admissionFor(FUNCTION_ID, { grants: [ACTION], actionGrant: ACTION }), admissionFor(FUNCTION_ID, undefined, { task: "t", actionGrant: ACTION })]) {
      expect(refusalOf(await h.run(admission))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    }
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("the production contract is unadopted (MW-CONTRACT): every function dispatch refuses, whatever grants are held", async () => {
    expect(FUNCTION_ACTION_CONTRACT).toEqual({ state: "unadopted", blockedOn: "MW-CONTRACT" });
    const h = harness({ grants: [EXECUTE_GRANT, ACTION, OTHER_FUNCTION_ACTION] });
    for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID]) {
      expect(refusalOf(await h.run(admissionFor(id), FUNCTION_ACTION_CONTRACT))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    }
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("a definition the adopted contract does not bind, and a contract object that never went through adoption, refuse as unadopted", async () => {
    const h = harness({ grants: [EXECUTE_GRANT, ACTION] });
    expect(refusalOf(await h.run(admissionFor("fixture.unbound.v1")))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    const forged: FunctionActionContract = Object.freeze({ state: "adopted", bindings: Object.freeze([Object.freeze({ definitionId: FUNCTION_ID, actionGrant: ACTION })]) });
    expect(refusalOf(await h.run(admissionFor(), forged))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("no one-character insertion, deletion or substitution of the exact action stands in for it: each refuses, as a missing action grant when the grammar admits it", () => {
    const alphabet = [..."abcdefghijklmnopqrstuvwxyz0123456789.-"];
    const variants = new Set<string>();
    for (let index = 0; index <= ACTION.length; index += 1) {
      for (const char of alphabet) variants.add(`${ACTION.slice(0, index)}${char}${ACTION.slice(index)}`);
      if (index < ACTION.length) {
        variants.add(`${ACTION.slice(0, index)}${ACTION.slice(index + 1)}`);
        for (const char of alphabet) variants.add(`${ACTION.slice(0, index)}${char}${ACTION.slice(index + 1)}`);
      }
    }
    variants.delete(ACTION);
    const outcomes = new Map<string, number>();
    for (const variant of variants) {
      const decision = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, variant], identity: HOST } });
      const outcome = decision.decision === "refused" ? decision.policy : `authorized by ${variant}`;
      outcomes.set(outcome, (outcomes.get(outcome) ?? 0) + 1);
    }
    expect([...outcomes.keys()].sort()).toEqual(["missing-function-action-grant", "unknown-permission-data"]);
    expect(outcomes.get("missing-function-action-grant")).toBeGreaterThan(1000);
  });

  it("the exact action extended by 1 to 232 repeated letters at either end, up to the 256-character bound, never stands in", () => {
    const refused: string[] = [];
    for (let count = 1; count <= 256 - ACTION.length; count += 1) {
      for (const variant of [`${ACTION}${"a".repeat(count)}`, `${"a".repeat(count)}${ACTION}`]) {
        const decision = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, variant], identity: HOST } });
        if (decision.decision === "refused" && decision.policy === "missing-function-action-grant") refused.push(variant);
      }
    }
    expect(refused).toHaveLength(2 * (256 - ACTION.length));
  });

  it("the unadopted production contract refuses under every subset of the pinned grant pool, for both fixture definitions", () => {
    const pool = [EXECUTE_GRANT, DETACH_GRANT, ACTION, OTHER_FUNCTION_ACTION, "forge:inspect", "fixture-fn:develop", "workbench:design"];
    const authorized: string[] = [];
    for (let mask = 0; mask < 2 ** pool.length; mask += 1) {
      const grants = pool.filter((_, bit) => (mask & (1 << bit)) !== 0);
      for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID]) {
        const decision = decideFunctionAuthority({ admission: admissionFor(id), contract: FUNCTION_ACTION_CONTRACT, entered: HOST, current: { grants, identity: HOST } });
        if (decision.decision !== "refused") authorized.push(`${id} ${JSON.stringify(grants)}`);
      }
    }
    expect(authorized).toEqual([]);
  });
});

describe("the action grammar: adoption judged against Pi grant settings and the detached transport at the enumerated samples (wb-201v)", () => {
  it("refuses to adopt the program's example spelling mechanical:develop:write, which workbench.capabilityGrants cannot carry", () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude", capabilityGrants: [EXECUTE_GRANT, PROPOSED_EXAMPLE] } } });
    const dir = sandbox.dir;
    expect(() => loadSettings(dir)).toThrow(/capabilityGrants/);
    expect(() => adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: PROPOSED_EXAMPLE }])).toThrow(/not representable/);
  });

  it("a host that reports the unrepresentable spelling anyway is unknown permission data, denied before any dispatch", async () => {
    const h = harness({ grants: [EXECUTE_GRANT, ACTION, PROPOSED_EXAMPLE] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "unknown-permission-data", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("the representable spelling fixture-fn:develop-write round-trips through loadSettings, and a host reading settings on every call dispatches under it", async () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude", capabilityGrants: [EXECUTE_GRANT, ACTION] } } });
    const dir = sandbox.dir;
    expect(loadSettings(dir).workbench?.capabilityGrants).toEqual([EXECUTE_GRANT, ACTION]);
    const dispatch = vi.fn(async () => "ran");
    const host: FunctionAuthorityHost = { grants: () => loadSettings(dir).workbench?.capabilityGrants, identity: () => HOST };
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    expect(result).toMatchObject({ status: "dispatched", value: "ran", authority: { grants: [EXECUTE_GRANT, ACTION] } });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["a wildcard", "fixture-fn:*"],
    ["a bare namespace", "fixture-fn"],
    ["an empty permission", "fixture-fn:"],
    ["an upper-case namespace", "Fixture-fn:develop-write"],
    ["a trailing newline", `${ACTION}\n`],
    ["a leading space", ` ${ACTION}`],
    ["an empty string", ""],
    ["257 characters, past the detached transport's 256", `fixture-fn:${"a".repeat(246)}`],
    ["an empty namespace", ":develop-write"],
    ["an upper-case permission", "fixture-fn:Develop-write"],
    ["two colons", PROPOSED_EXAMPLE],
    ["an underscore", "fixture_fn:develop-write"],
    ["a namespace that starts with a digit", "1fixture:develop-write"],
    ["a permission that starts with a hyphen", "fixture-fn:-write"],
    ["a trailing space", `${ACTION} `],
  ])("refuses to adopt %s", async (_what, actionGrant) => {
    expect(() => adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }])).toThrow(/not representable/);
    // The mirror, judged: workbench.capabilityGrants or the detached transport refuses the same spelling.
    const dir = judgeDir();
    expect(settingsCarry(dir, actionGrant) && (await transportCarries(dir, [EXECUTE_GRANT, actionGrant]))).toBe(false);
  });

  it("adopts a grammar-valid spelling of exactly 256 characters, the detached transport's bound", async () => {
    const actionGrant = `fixture-fn:${"a".repeat(245)}`;
    expect(actionGrant).toHaveLength(256);
    expect(adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }])).toEqual({ state: "adopted", bindings: [{ definitionId: FUNCTION_ID, actionGrant }] });
    const dir = judgeDir();
    expect([settingsCarry(dir, actionGrant), await transportCarries(dir, [EXECUTE_GRANT, actionGrant])]).toEqual([true, true]);
  });

  it.each([
    ["hyphens in both parts", ACTION],
    ["a dot in the permission", "fixture-fn:develop.write"],
    ["a digit in the permission", "fixture-fn:develop-write2"],
    ["a dot and a digit in the namespace", "fixture.fn2:write"],
    ["one letter in each part", "f:w"],
    ["parts that end in a digit, a dot and a hyphen", "fixture0.-:write0.-"],
  ])("adopts a spelling with %s, which workbench.capabilityGrants and the detached transport both carry", async (_what, actionGrant) => {
    expect(adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }]).state).toBe("adopted");
    const dir = judgeDir();
    expect([settingsCarry(dir, actionGrant), await transportCarries(dir, [EXECUTE_GRANT, actionGrant])]).toEqual([true, true]);
  });

  it("for each probe character at the head or the tail of a namespace or a permission, adoption accepts the spelling exactly when workbench.capabilityGrants and the detached transport both carry it", async () => {
    const dir = judgeDir();
    const letters = [..."abcdefghijklmnopqrstuvwxyz"];
    const grammar = [...letters, ..."0123456789.-"];
    const outside = [..."AZ_*:/@ \t", "\u00e9"];
    const disagreements: string[] = [];
    let adopted = 0;
    for (const char of [...grammar, ...outside]) {
      for (const spelling of [`${char}fixture:write`, `fixture${char}:write`, `fixture:${char}write`, `fixture:write${char}`]) {
        const seam = adoptable(spelling);
        const carried = settingsCarry(dir, spelling) && (await transportCarries(dir, [EXECUTE_GRANT, spelling]));
        if (seam !== carried) disagreements.push(`${JSON.stringify(spelling)}: adopted ${seam}, carried ${carried}`);
        if (seam) adopted += 1;
      }
    }
    expect(disagreements).toEqual([]);
    // A part starts with a letter and continues with letters, digits, dots and hyphens.
    expect(adopted).toBe(letters.length * 2 + grammar.length * 2);
  });

  it.each([
    ["two adjacent dots", "fixture..fn:write"],
    ["two adjacent hyphens", "fixture--fn:write"],
    ["a 100-character namespace", `${"n".repeat(100)}:write`],
  ])("a spelling with %s is adopted, and workbench.capabilityGrants and the detached transport both carry it", async (_what, actionGrant) => {
    const dir = judgeDir();
    expect([adoptable(actionGrant), settingsCarry(dir, actionGrant), await transportCarries(dir, [EXECUTE_GRANT, actionGrant])]).toEqual([true, true, true]);
  });

  it("for each grammar character doubled inside a namespace or a permission, and for parts of 1, 2, 63, 64, 65, 100, 128, 200 and 244 characters, adoption accepts the spelling and workbench.capabilityGrants and the detached transport both carry it", async () => {
    const dir = judgeDir();
    const spellings = [..."abcdefghijklmnopqrstuvwxyz0123456789.-"].flatMap(char => [`fix${char}${char}ture:write`, `fixture:wr${char}${char}ite`]);
    for (const length of [1, 2, 63, 64, 65, 100, 128, 200, 244]) spellings.push(`${"n".repeat(length)}:write`, `fixture:${"w".repeat(length)}`);
    const disagreements: string[] = [];
    for (const spelling of spellings) {
      const verdicts = [adoptable(spelling), settingsCarry(dir, spelling), await transportCarries(dir, [EXECUTE_GRANT, spelling])];
      if (verdicts.some(verdict => !verdict)) disagreements.push(`${spelling}: ${JSON.stringify(verdicts)}`);
    }
    expect(spellings).toHaveLength(94);
    expect(disagreements).toEqual([]);
  });

  it("at the pinned 256- and 257-character spellings, launchDetachedWorkflow's launch-grant check carries 256 characters and refuses 257, first, last or alone in the grant list, while workbench.capabilityGrants carries both", async () => {
    const at256 = `fixture-fn:${"a".repeat(245)}`;
    const at257 = `${at256}a`;
    expect([at256.length, at257.length]).toEqual([256, 257]);
    const dir = judgeDir();
    expect([settingsCarry(dir, at256), settingsCarry(dir, at257)]).toEqual([true, true]);
    for (const grants of [[at256], [EXECUTE_GRANT, at256], [at256, EXECUTE_GRANT]]) expect(await transportCarries(dir, grants)).toBe(true);
    for (const grants of [[at257], [EXECUTE_GRANT, at257], [at257, EXECUTE_GRANT]]) expect(await transportCarries(dir, grants)).toBe(false);
  });

  it("the text of local-detached's launch-grant check names the seam's 256-character bound", () => {
    const detached = readFileSync(new URL("../src/workbench/hosts/local-detached.ts", import.meta.url), "utf8");
    expect(detached).toContain('grants.some(grant => typeof grant !== "string" || !grant.trim() || grant.length > 256)');
  });

  it.each([
    ["Pi's own workbench:execute", EXECUTE_GRANT],
    ["Pi's own workbench:detach", "workbench:detach"],
    ["another Pi workbench authority (workbench:design)", "workbench:design"],
  ])("refuses %s as a function action grant, so a dispatch always rests on two distinct grants", (_what, actionGrant) => {
    expect(() => adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }])).toThrow(/workbench/);
  });

  it("refuses two bindings for one definition and one action grant shared by two definitions", () => {
    expect(() =>
      adoptFunctionActions([
        { definitionId: FUNCTION_ID, actionGrant: ACTION },
        { definitionId: FUNCTION_ID, actionGrant: OTHER_FUNCTION_ACTION },
      ]),
    ).toThrow(/once/);
    expect(() =>
      adoptFunctionActions([
        { definitionId: FUNCTION_ID, actionGrant: ACTION },
        { definitionId: OTHER_FUNCTION_ID, actionGrant: ACTION },
      ]),
    ).toThrow(/once/);
  });

  const MALFORMED: readonly (readonly [string, unknown])[] = [
    ["an empty binding list", []],
    ["a blank definition id", [{ definitionId: " ", actionGrant: ACTION }]],
    ["a definition id with an escape", [{ definitionId: `${FUNCTION_ID}\u001b[0m`, actionGrant: ACTION }]],
    ["a binding with an extra member", [{ definitionId: FUNCTION_ID, actionGrant: ACTION, grants: [EXECUTE_GRANT] }]],
    ["a binding list that is not an array", { 0: { definitionId: FUNCTION_ID, actionGrant: ACTION }, length: 1 }],
    ["a null binding", [null]],
    ["an array binding", [[FUNCTION_ID, ACTION]]],
    ["a binding with a non-plain prototype", [Object.assign(Object.create({ inherited: true }), { definitionId: FUNCTION_ID, actionGrant: ACTION })]],
    ["a binding with a symbol-keyed member", [{ definitionId: FUNCTION_ID, actionGrant: ACTION, [Symbol("extra")]: true }]],
    ["a binding without its action grant", [{ definitionId: FUNCTION_ID }]],
    ["a binding without its definition id", [{ actionGrant: ACTION }]],
    ["a non-text definition id", [{ definitionId: 7, actionGrant: ACTION }]],
  ];
  it.each(MALFORMED)("refuses %s", (_what, bindings) => {
    expect(() => adoptFunctionActions(bindings as readonly FunctionActionBinding[])).toThrow(CapabilityError);
  });
});

describe("EAT-R030: a changed effective principal or session refuses the dispatch (wb-201v)", () => {
  it("park the admission, change the effective principal, release: refused before import, zero loader and provider calls", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    h.state.identity = { principal: "local-operator:1001:s1", sessionId: HOST.sessionId };
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("park the admission, change only the session, release: refused before import", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    h.state.identity = { principal: HOST.principal, sessionId: "s2" };
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
  });

  const COMPOSED: FunctionIdentity = { principal: "local-operator:1000:caf\u00e9", sessionId: "s\u00e9" };
  const LOSSY_READINGS: readonly (readonly [string, FunctionIdentity, FunctionIdentity, (identity: FunctionIdentity) => string])[] = [
    ["the two fields concatenated", HOST, { principal: "local-operator:1000:s1s", sessionId: "1" }, identity => identity.principal + identity.sessionId],
    ["the two fields joined by a colon", HOST, { principal: "local-operator:1000", sessionId: "s1:s1" }, identity => `${identity.principal}:${identity.sessionId}`],
    ["the pair read as an unordered set", HOST, { principal: HOST.sessionId, sessionId: HOST.principal }, identity => [identity.principal, identity.sessionId].sort().join("\n")],
    ["each field case-folded", HOST, { principal: "LOCAL-OPERATOR:1000:S1", sessionId: "S1" }, identity => `${identity.principal.toLowerCase()}\n${identity.sessionId.toLowerCase()}`],
    ["each field trimmed", HOST, { principal: ` ${HOST.principal}`, sessionId: `${HOST.sessionId} ` }, identity => `${identity.principal.trim()}\n${identity.sessionId.trim()}`],
    [
      "each field Unicode-normalized (composed at entry, decomposed after)",
      COMPOSED,
      { principal: "local-operator:1000:cafe\u0301", sessionId: "se\u0301" },
      identity => `${identity.principal.normalize("NFC")}\n${identity.sessionId.normalize("NFC")}`,
    ],
  ];
  it.each(LOSSY_READINGS)("park, change both fields so that %s still reads the same, release: refused before import", async (_reading, entered, changed, reading) => {
    expect([changed.principal === entered.principal, changed.sessionId === entered.sessionId, reading(changed) === reading(entered)]).toEqual([false, false, true]);
    const h = harness({ identity: entered });
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    h.state.identity = changed;
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("a caller principal or session field cannot override host identity, in either direction", async () => {
    const claimsHost: JsonValue = { principal: HOST.principal, sessionId: HOST.sessionId, identity: { principal: HOST.principal, sessionId: HOST.sessionId } };
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(FUNCTION_ID, claimsHost, { task: "t", principal: HOST.principal, sessionId: HOST.sessionId }), CONTRACT, wait.park);
    h.state.identity = { principal: "local-operator:0:s9", sessionId: "s9" };
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    // With the host identity unchanged, a caller naming another principal and session dispatches under the HOST identity.
    const steady = harness();
    const result = await steady.run(admissionFor(FUNCTION_ID, { principal: "local-operator:0:s9", sessionId: "s9" }, { task: "t", principal: "local-operator:0:s9" }));
    expect(result.status === "dispatched" ? result.authority.identity : undefined).toEqual(HOST);
  });

  it("the identity read at entry is a snapshot: a host that mutates the object it returned is still caught", async () => {
    const shared = { principal: HOST.principal, sessionId: HOST.sessionId };
    const wait = parked();
    const dispatch = vi.fn(async () => "ran");
    const pending = dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host: { grants: () => [EXECUTE_GRANT, ACTION], identity: () => shared }, park: wait.park, dispatch });
    shared.principal = "local-operator:1001:s1";
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(dispatch).not.toHaveBeenCalled();
  });

  it.each([
    ["a blank principal", { principal: " ", sessionId: "s1" }],
    ["a missing session", { principal: HOST.principal }],
    ["a non-text session", { principal: HOST.principal, sessionId: 1 }],
    ["a principal of 257 bytes in 256 characters", { principal: `${"a".repeat(255)}\u00e9`, sessionId: "s1" }],
    ["a principal carrying an escape", { principal: `${HOST.principal}\u001b[0m`, sessionId: "s1" }],
    ["a principal carrying a BEL C0 control", { principal: `${HOST.principal}${String.fromCodePoint(7)}`, sessionId: "s1" }],
    ["a principal carrying a bidi override", { principal: `${HOST.principal}${String.fromCodePoint(0x202e)}`, sessionId: "s1" }],
    ["a principal carrying a default-ignorable point", { principal: `${HOST.principal}${String.fromCodePoint(0x200b)}`, sessionId: "s1" }],
  ])("denies %s as unknown identity data before any dispatch", async (_what, identity) => {
    const dispatch = vi.fn(async () => "ran");
    const host = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => identity } as unknown as FunctionAuthorityHost;
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("reads the identity through its own property descriptors: an accessor principal is unknown identity data and its getter never runs", async () => {
    const getter = vi.fn(() => HOST.principal);
    const identity = Object.defineProperty({ sessionId: HOST.sessionId }, "principal", { get: getter, enumerable: true });
    const dispatch = vi.fn(async () => "ran");
    const host = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => identity } as unknown as FunctionAuthorityHost;
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
    expect(getter).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("the identity an authorized dispatch rests on is a frozen copy of the host's read, not the object the host returned", async () => {
    const returned = { principal: HOST.principal, sessionId: HOST.sessionId };
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host: { grants: () => [EXECUTE_GRANT, ACTION], identity: () => returned }, dispatch: async () => "ran" });
    if (result.status !== "dispatched") throw new Error(`expected a dispatch, got ${result.status}`);
    expect(result.authority.identity).toEqual(HOST);
    expect(result.authority.identity).not.toBe(returned);
    expect(Object.isFrozen(result.authority.identity)).toBe(true);
  });
});

describe("EAT-R031: revoked grants are re-evaluated at dispatch (wb-201v)", () => {
  it("revoke the action grant while waiting: nothing runs while parked, and no dispatch after release", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    expect(h.loader).not.toHaveBeenCalled();
    h.state.grants = [EXECUTE_GRANT];
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("the rights and the identity are read again after the wait settles: once at entry and once at the final boundary", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    expect(h.reads).toEqual({ grants: 1, identity: 1 });
    wait.release();
    expect((await pending).status).toBe("dispatched");
    expect(h.reads).toEqual({ grants: 2, identity: 2 });
    expect(h.provider).toHaveBeenCalledTimes(1);
  });

  it("grants that turn into unknown permission data while waiting are denied at the final boundary", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    h.state.grants = undefined;
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "unknown-permission-data", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("a revocation queued as a microtask right after release lands after the dispatch: dispatch is invoked while the host still holds both grants", async () => {
    const h = harness();
    const wait = parked();
    const held: (readonly string[] | undefined)[] = [];
    const pending = dispatchFunctionWithAuthority({
      admission: admissionFor(),
      contract: CONTRACT,
      host: h.host,
      park: wait.park,
      dispatch: async () => {
        held.push(h.state.grants);
        return "ran";
      },
    });
    wait.release();
    queueMicrotask(() => {
      h.state.grants = [EXECUTE_GRANT];
    });
    expect((await pending).status).toBe("dispatched");
    expect(held).toEqual([[EXECUTE_GRANT, ACTION]]);
  });

  type HostState = { grants: readonly string[]; identity: FunctionIdentity };
  const CHANGES: readonly (readonly [string, (state: HostState) => void])[] = [
    [
      "a revoked action grant",
      state => {
        state.grants = [EXECUTE_GRANT];
      },
    ],
    [
      "a changed effective principal",
      state => {
        state.identity = { principal: "local-operator:1001:s1", sessionId: HOST.sessionId };
      },
    ],
  ];
  it.each(CHANGES)("%s, queued as a microtask by the final read itself, never precedes the dispatch: dispatch is invoked on what the host held at that read", async (_change, change) => {
    const state: HostState = { grants: [EXECUTE_GRANT, ACTION], identity: HOST };
    let released = false;
    let queued = false;
    const host: FunctionAuthorityHost = {
      grants: () => {
        if (released && !queued) {
          queued = true;
          queueMicrotask(() => change(state));
        }
        return state.grants;
      },
      identity: () => ({ ...state.identity }),
    };
    const wait = parked();
    const atDispatch: HostState[] = [];
    const pending = dispatchFunctionWithAuthority({
      admission: admissionFor(),
      contract: CONTRACT,
      host,
      park: wait.park,
      dispatch: async () => {
        atDispatch.push({ grants: state.grants, identity: { ...state.identity } });
        return "ran";
      },
    });
    released = true;
    wait.release();
    expect((await pending).status).toBe("dispatched");
    expect(queued).toBe(true);
    expect(atDispatch).toEqual([{ grants: [EXECUTE_GRANT, ACTION], identity: HOST }]);
  });

  it("with no admission park, a revocation queued by the final read never precedes dispatch", async () => {
    const state = { grants: [EXECUTE_GRANT, ACTION] as readonly string[] };
    let reads = 0;
    const atDispatch: (readonly string[])[] = [];
    const result = await dispatchFunctionWithAuthority({
      admission: admissionFor(),
      contract: CONTRACT,
      host: {
        grants: () => {
          reads += 1;
          if (reads === 2) queueMicrotask(() => {
            state.grants = [EXECUTE_GRANT];
          });
          return state.grants;
        },
        identity: () => ({ ...HOST }),
      },
      dispatch: async () => {
        atDispatch.push(state.grants);
        return "ran";
      },
    });
    expect(result.status).toBe("dispatched");
    expect(atDispatch).toEqual([[EXECUTE_GRANT, ACTION]]);
  });
});

describe("the boundary admits function definitions only (wb-201v)", () => {
  it.each(["script", "furnace-formula"] as const)("refuses a %s admission as not a function definition", async kind => {
    const h = harness();
    expect(refusalOf(await h.run(admissionFor(FUNCTION_ID, undefined, TASK, kind)))).toEqual({ stage: "entry", policy: "not-a-function-definition", category: "validation" });
    expect(h.loader).not.toHaveBeenCalled();
  });
});

describe("adoptFunctionActions: the binding list's bounds and each binding's members (wb-201v)", () => {
  const bulk = (count: number): FunctionActionBinding[] =>
    Array.from({ length: count }, (_, index) => ({ definitionId: `fixture.bulk-${index}.v1`, actionGrant: `fixture-fn:bulk-${index}` }));

  it("binds 1 to 64 definitions: one and 64 bindings are adopted, none and 65 throw", () => {
    for (const count of [1, 64]) {
      const contract = adoptFunctionActions(bulk(count));
      expect(contract.state === "adopted" ? contract.bindings.length : 0).toBe(count);
    }
    for (const count of [0, 65]) expect(() => adoptFunctionActions(bulk(count))).toThrow(/binds 1 to 64 definitions/);
  });

  it("the returned contract, its binding list and each binding are frozen", () => {
    const contract = adoptFunctionActions(bulk(3));
    if (contract.state !== "adopted") throw new Error("expected an adopted contract");
    expect([contract, contract.bindings, ...contract.bindings].map(value => Object.isFrozen(value))).toEqual([true, true, true, true, true]);
  });

  it("reads each binding member through its own property descriptor: an accessor member is refused and its getter never runs", () => {
    const definitionGetter = vi.fn(() => FUNCTION_ID);
    const grantGetter = vi.fn(() => ACTION);
    const accessorId = Object.defineProperty({ actionGrant: ACTION }, "definitionId", { get: definitionGetter, enumerable: true });
    const accessorGrant = Object.defineProperty({ definitionId: FUNCTION_ID }, "actionGrant", { get: grantGetter, enumerable: true });
    expect(() => adoptFunctionActions([accessorId as FunctionActionBinding])).toThrow(/clean definition id/);
    expect(() => adoptFunctionActions([accessorGrant as FunctionActionBinding])).toThrow(/not representable/);
    expect(definitionGetter).not.toHaveBeenCalled();
    expect(grantGetter).not.toHaveBeenCalled();
  });

  it.each([
    ["a BEL C0 control", 7],
    ["a bidi override", 0x202e],
    ["a default-ignorable point", 0x200b],
  ])("a definition id carrying %s is not clean text", (_what, codePoint) => {
    const definitionId = `${FUNCTION_ID}${String.fromCodePoint(codePoint)}`;
    expect(() => adoptFunctionActions([{ definitionId, actionGrant: ACTION }])).toThrow(/clean definition id/);
  });

  it("each Unicode code point, U+0000 to U+10FFFF, inserted alone into a definition id and into a principal, is clean text exactly when stripUnsafeText leaves the text unchanged", () => {
    const admission = admissionFor();
    const disagreements: string[] = [];
    let unsafe = 0;
    for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) {
      const unit = String.fromCodePoint(codePoint);
      const definitionId = `fixture.${unit}.v1`;
      const clean = stripUnsafeText(definitionId) === definitionId;
      if (!clean) unsafe += 1;
      let adopted = true;
      try {
        adoptFunctionActions([{ definitionId, actionGrant: ACTION }]);
      } catch {
        adopted = false;
      }
      // Entered as HOST, so a clean principal reads as a changed identity and an unclean one as unknown identity data.
      const principal = `local-operator:1000:${unit}`;
      const decision = decideFunctionAuthority({ admission, contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, ACTION], identity: { principal, sessionId: HOST.sessionId } } });
      const known = decision.decision === "refused" && decision.policy === "changed-effective-identity";
      if (adopted !== clean || known !== (stripUnsafeText(principal) === principal)) disagreements.push(codePoint.toString(16));
      if (disagreements.length > 20) break;
    }
    expect(disagreements).toEqual([]);
    expect(unsafe).toBeGreaterThan(6000);
  }, 120_000);

  it("a definition id is at most 256 bytes, counted in bytes: 256 ASCII bytes are adopted, 257 bytes in 256 characters throw", () => {
    const at256 = `fixture.${"a".repeat(248)}`;
    const wide = `${"a".repeat(255)}é`;
    expect([Buffer.byteLength(at256), Buffer.byteLength(wide), wide.length]).toEqual([256, 257, 256]);
    expect(adoptFunctionActions([{ definitionId: at256, actionGrant: ACTION }]).state).toBe("adopted");
    expect(() => adoptFunctionActions([{ definitionId: wide, actionGrant: ACTION }])).toThrow(/clean definition id/);
  });
});

describe("decideFunctionAuthority: at the enumerated fault forms, the earliest failing rule reports (wb-201v)", () => {
  type Fault = "kind" | "unknown-identity" | "changed-identity" | "unknown-permissions" | "no-execute" | "unadopted" | "no-action";
  /** The rules in their stated order, each named by the one fault that breaks it and the policy that fault reports alone. */
  const ORDER: readonly (readonly [Fault, FunctionAuthorityRefusal])[] = [
    ["kind", "not-a-function-definition"],
    ["unknown-identity", "unknown-identity-data"],
    ["changed-identity", "changed-effective-identity"],
    ["unknown-permissions", "unknown-permission-data"],
    ["no-execute", "missing-execute-grant"],
    ["unadopted", "function-action-unadopted"],
    ["no-action", "missing-function-action-grant"],
  ];
  function withFaults(...faults: Fault[]): FunctionAuthorityInput {
    const has = (fault: Fault) => faults.includes(fault);
    const grants = [...(has("no-execute") ? [] : [EXECUTE_GRANT]), has("no-action") ? OTHER_FUNCTION_ACTION : ACTION, ...(has("unknown-permissions") ? [PROPOSED_EXAMPLE] : [])];
    const identity = has("unknown-identity") ? { principal: " ", sessionId: HOST.sessionId } : has("changed-identity") ? { principal: "local-operator:1001:s1", sessionId: HOST.sessionId } : HOST;
    const admission = admissionFor(FUNCTION_ID, undefined, TASK, has("kind") ? "script" : "function");
    return { admission, contract: has("unadopted") ? FUNCTION_ACTION_CONTRACT : CONTRACT, entered: HOST, current: { grants, identity } };
  }
  /** Every pair of rules that can fail together, earlier rule first; an unknown identity cannot also be a changed one. */
  const PAIRS = ORDER.flatMap(([first, policy], index) =>
    ORDER.slice(index + 1)
      .filter(([second]) => !(first === "unknown-identity" && second === "changed-identity"))
      .map(([second]) => [first, second, policy] as const),
  );

  // Every decision below runs on a deeply frozen input, so a rule that writes to what it is given throws on its own path.
  it("with no fault the decision authorizes, so each fault below is what refuses", () => {
    expect(decideFunctionAuthority(deepFreeze(withFaults())).decision).toBe("authorized");
  });

  it.each(ORDER)("the %s fault alone reports %s", (fault, policy) => {
    expect(decideFunctionAuthority(deepFreeze(withFaults(fault)))).toMatchObject({ decision: "refused", policy });
  });

  it("the pair set is every pair of the seven rules but unknown with changed identity: 20 pairs", () => {
    expect(PAIRS).toHaveLength(20);
  });

  it.each(PAIRS)("the %s and %s faults together report the earlier rule, %s", (first, second, policy) => {
    expect(decideFunctionAuthority(deepFreeze(withFaults(first, second)))).toMatchObject({ decision: "refused", policy });
  });

  it.each([
    ["a script admission with no grant read", { admission: admissionFor(FUNCTION_ID, undefined, TASK, "script"), contract: CONTRACT, entered: HOST, current: { grants: undefined, identity: HOST } }, "not-a-function-definition"],
    ["a script admission with a non-array grant read", { admission: admissionFor(FUNCTION_ID, undefined, TASK, "script"), contract: CONTRACT, entered: HOST, current: { grants: EXECUTE_GRANT, identity: HOST } }, "not-a-function-definition"],
    ["a script admission with unknown entry identity", { admission: admissionFor(FUNCTION_ID, undefined, TASK, "script"), contract: CONTRACT, entered: undefined, current: { grants: [EXECUTE_GRANT, ACTION], identity: HOST } }, "not-a-function-definition"],
    ["a forged adopted contract without workbench:execute", { admission: admissionFor(), contract: Object.freeze({ state: "adopted", bindings: Object.freeze([Object.freeze({ definitionId: FUNCTION_ID, actionGrant: ACTION })]) }) as FunctionActionContract, entered: HOST, current: { grants: [ACTION], identity: HOST } }, "missing-execute-grant"],
    ["an unbound definition without workbench:execute", { admission: admissionFor("fixture.unbound.v1"), contract: CONTRACT, entered: HOST, current: { grants: [ACTION], identity: HOST } }, "missing-execute-grant"],
  ] as const)("%s reports the earlier rule", (_what, input, policy) => {
    expect(decideFunctionAuthority(deepFreeze(input))).toMatchObject({ decision: "refused", policy });
  });
});

describe("refusal reasons: one fixed reason per policy across the enumerated request pairs (wb-201v)", () => {
  interface Scenario {
    readonly id: string;
    readonly action: string;
    readonly invocation: string;
    readonly identity: FunctionIdentity;
  }
  const A: Scenario = { id: "fixture.zq-alpha.v1", action: "fixture-fn:zq-alpha", invocation: "fn_aaaaaaaaaaaa", identity: { principal: "local-operator:1000:zq-alpha", sessionId: "zq-alpha" } };
  const B: Scenario = { id: "fixture.zq-beta.v1", action: "fixture-fn:zq-beta", invocation: "fn_bbbbbbbbbbbb", identity: { principal: "local-operator:1001:zq-beta", sessionId: "zq-beta" } };
  const BOTH = adoptFunctionActions([
    { definitionId: A.id, actionGrant: A.action },
    { definitionId: B.id, actionGrant: B.action },
  ]);
  const POLICIES: readonly FunctionAuthorityRefusal[] = [
    "not-a-function-definition",
    "unknown-identity-data",
    "changed-effective-identity",
    "unknown-permission-data",
    "missing-execute-grant",
    "function-action-unadopted",
    "missing-function-action-grant",
  ];
  /** The pure decision for scenario `s`, built to reach `policy`. */
  function refusalFor(s: Scenario, policy: FunctionAuthorityRefusal): FunctionAuthorityRefused {
    const other = s === A ? B : A;
    const held =
      policy === "missing-execute-grant"
        ? [s.action]
        : policy === "missing-function-action-grant"
          ? [EXECUTE_GRANT, other.action]
          : policy === "unknown-permission-data"
            ? [EXECUTE_GRANT, s.action, `${s.action}:more`]
            : [EXECUTE_GRANT, s.action];
    const identity =
      policy === "unknown-identity-data"
        ? { principal: `${s.identity.principal}\u001b[0m`, sessionId: s.identity.sessionId }
        : policy === "changed-effective-identity"
          ? { principal: `${s.identity.principal}-moved`, sessionId: s.identity.sessionId }
          : s.identity;
    const admission = admissionFor(s.id, undefined, TASK, policy === "not-a-function-definition" ? "script" : "function", s.invocation);
    const contract = policy === "function-action-unadopted" ? FUNCTION_ACTION_CONTRACT : BOTH;
    const decision = decideFunctionAuthority({ admission, contract, entered: s.identity, current: { grants: held, identity } });
    if (decision.decision !== "refused") throw new Error(`expected a ${policy} refusal`);
    return decision;
  }

  it.each(POLICIES)("%s: one reason for two requests that differ in definition, invocation, identity and held grants, naming none of them", policy => {
    const a = refusalFor(A, policy);
    const b = refusalFor(B, policy);
    expect([a.policy, b.policy, a.invocationId, b.invocationId]).toEqual([policy, policy, A.invocation, B.invocation]);
    expect(a.reason).toBe(b.reason);
    for (const s of [A, B]) for (const text of [s.id, s.action, s.invocation, s.identity.principal, s.identity.sessionId]) expect(a.reason).not.toContain(text);
  });

  const input = (grants: unknown, identity: FunctionIdentity = HOST, admission: ExecuteAdmission = admissionFor()): FunctionAuthorityInput => ({ admission, contract: CONTRACT, entered: HOST, current: { grants, identity } });
  const V2: ExecuteAdmission = Object.freeze({ ...admissionFor(), definition: Object.freeze({ ...admissionFor().definition, schemaVersion: "mechanical-workflows/entrypoint/v2" }) });
  const FIELD_PAIRS: readonly (readonly [string, FunctionAuthorityRefusal, FunctionAuthorityInput, FunctionAuthorityInput])[] = [
    ["a script and a furnace-formula admission", "not-a-function-definition", input([EXECUTE_GRANT, ACTION], HOST, admissionFor(FUNCTION_ID, undefined, TASK, "script")), input([EXECUTE_GRANT, ACTION], HOST, admissionFor(FUNCTION_ID, undefined, TASK, "furnace-formula"))],
    ["a changed principal and a changed session", "changed-effective-identity", input([EXECUTE_GRANT, ACTION], { principal: "local-operator:1001:s1", sessionId: HOST.sessionId }), input([EXECUTE_GRANT, ACTION], { principal: HOST.principal, sessionId: "s2" })],
    ["no grant read and a list holding a spelling outside the grammar", "unknown-permission-data", input(undefined), input([EXECUTE_GRANT, PROPOSED_EXAMPLE])],
    ["one held grant and two held grants", "missing-execute-grant", input([ACTION]), input([ACTION, OTHER_FUNCTION_ACTION])],
    ["two schema versions of the bound definition", "missing-function-action-grant", input([EXECUTE_GRANT, OTHER_FUNCTION_ACTION]), input([EXECUTE_GRANT, OTHER_FUNCTION_ACTION], HOST, V2)],
  ];
  it.each(FIELD_PAIRS)("%s carry one %s reason", (_pair, policy, first, second) => {
    const [a, b] = [decideFunctionAuthority(first), decideFunctionAuthority(second)];
    if (a.decision !== "refused" || b.decision !== "refused") throw new Error(`expected two ${policy} refusals`);
    expect([a.policy, b.policy]).toEqual([policy, policy]);
    expect(a.reason).toBe(b.reason);
  });

  it("the boundary returns the decision's refusal unchanged, at entry and at the final boundary", async () => {
    const atEntry = await harness({ grants: [ACTION] }).run(admissionFor());
    const pureEntry = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [ACTION], identity: HOST } });
    expect(atEntry.status === "refused" ? atEntry.refusal : undefined).toEqual(pureEntry);
    const h = harness();
    const wait = parked();
    const pending = h.run(admissionFor(), CONTRACT, wait.park);
    h.state.grants = [EXECUTE_GRANT];
    wait.release();
    const atFinal = await pending;
    const pureFinal = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT], identity: HOST } });
    expect(atFinal.status === "refused" ? atFinal.refusal : undefined).toEqual(pureFinal);
  });
});

describe("decideFunctionAuthority: unknown permission data and its input (wb-201v)", () => {
  it.each([
    ["no read at all", undefined],
    ["a single grant that is not a list", EXECUTE_GRANT],
    ["a list holding a non-text entry", [EXECUTE_GRANT, ACTION, 7]],
    ["a list holding a spelling outside the grammar", [EXECUTE_GRANT, ACTION, PROPOSED_EXAMPLE]],
  ])("denies %s as unknown permission data (docs/workbench/12-security.md)", (_what, grants) => {
    expect(decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants, identity: HOST } })).toMatchObject({
      decision: "refused",
      policy: "unknown-permission-data",
    });
  });

  it("decides synchronously and mutates nothing it is given: a deeply frozen input yields the decision itself, never a promise", () => {
    const input = deepFreeze({ admission: admissionFor(), contract: CONTRACT, entered: { ...HOST }, current: { grants: [EXECUTE_GRANT, ACTION], identity: { ...HOST } } });
    const decision = decideFunctionAuthority(input);
    expect("then" in decision).toBe(false);
    expect(decision).toMatchObject({ decision: "authorized", authority: { grants: [EXECUTE_GRANT, ACTION], identity: HOST } });
  });
});

describe("not wired: each enumerated workflow_execute request naming a function definition resolves and launches nothing (wb-201v)", () => {
  const ctx = { cwd: "/ws" } as unknown as ExtensionContext;
  async function executeFunction(rights: unknown, hostMode: "embedded" | "detached") {
    const resolveSource = vi.fn((): never => {
      throw new Error("a function definition is never resolved");
    });
    const launchEmbedded = vi.fn(async () => []);
    const launchDetached = vi.fn(async () => []);
    const deps: WorkflowExecuteDeps = {
      grants: () => rights as readonly string[],
      observerScope: () => ({ workspace: "/ws", principal: HOST.principal }),
      localPrincipal: () => HOST.principal,
      sessionIdOf: () => HOST.sessionId,
      mintInvocationId: () => INVOCATION,
      resolveSource,
      launchEmbedded,
      launchDetached,
    };
    const params = { definitionRef: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, input: TASK, hostMode };
    const result = await createWorkflowExecuteTool(deps).execute("call-1", params as never, undefined, undefined, ctx as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    const reply = JSON.parse(text) as { error?: { code?: string } };
    return { code: reply.error?.code, calls: [resolveSource.mock.calls.length, launchEmbedded.mock.calls.length, launchDetached.mock.calls.length] };
  }

  it.each([
    ["embedded with no grant read", "embedded", undefined],
    ["embedded with a non-array grant read", "embedded", EXECUTE_GRANT],
    ["embedded with workbench:execute and a spelling outside the grammar", "embedded", [EXECUTE_GRANT, PROPOSED_EXAMPLE]],
    ["detached with workbench:execute, workbench:detach and a spelling outside the grammar", "detached", [EXECUTE_GRANT, DETACH_GRANT, PROPOSED_EXAMPLE]],
    ["detached with workbench:execute and a spelling outside the grammar", "detached", [EXECUTE_GRANT, PROPOSED_EXAMPLE]],
    ["embedded with only a spelling outside the grammar", "embedded", [PROPOSED_EXAMPLE]],
  ] as const)("a request %s refuses as unknown-permission-data, with zero resolve and launch calls", async (_what, hostMode, rights) => {
    expect(await executeFunction(rights, hostMode)).toEqual({ code: "unknown-permission-data", calls: [0, 0, 0] });
  });

  it.each([
    ["embedded", [EXECUTE_GRANT], "unsupported-definition-kind"],
    ["embedded", [EXECUTE_GRANT, DETACH_GRANT], "unsupported-definition-kind"],
    ["detached", [EXECUTE_GRANT, DETACH_GRANT], "unsupported-definition-kind"],
    ["detached", [EXECUTE_GRANT], "missing-detach-grant"],
    ["embedded", [], "missing-execute-grant"],
    ["embedded", [DETACH_GRANT], "missing-execute-grant"],
    ["detached", [], "missing-execute-grant"],
    ["detached", [DETACH_GRANT], "missing-execute-grant"],
  ] as const)("with hostMode %s and %j held, a function definition refuses as %s, with zero resolve and launch calls", async (hostMode, rights, code) => {
    expect(await executeFunction(rights, hostMode)).toEqual({ code, calls: [0, 0, 0] });
  });
});
