/**
 * wb-201v (MWI B-authority, slice PI-1): the authority seam at the final dispatch boundary of a function launch,
 * src/workbench/function-authority.ts.
 *
 * Spec of record: docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md
 * at pi-subagents master 0b25e14e084a5b1d612e780bc12a927b3a80dd62, lines 892-930 (TDD-MATRIX.md rows EAT-R028..EAT-R031 carry
 * the same red and mutant columns). Each describe block pins one requirement; its acceptance line and adversarial mutant,
 * verbatim:
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
 * No spelling is adopted, so the production contract is unadopted and refuses every function dispatch (the B-authority row of
 * BEAD-PLAN.md lands "partial - enforcement seams land now; exact action grammar blocked on MW-CONTRACT"). The adopted contracts
 * below are TEST FIXTURES: the fixture-fn:* grants are not a proposed, adopted or recommended spelling, only a representable
 * stand-in that lets the exactness rules run. The loader and provider are the two calls a function launch makes once its
 * authority holds (import the pinned export, then run it); the harness counts both, and the admission wait is a park the test
 * releases by hand.
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadSettings } from "../src/settings.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT, type ExecuteAdmission } from "../src/workbench/execute.js";
import {
  adoptFunctionActions,
  decideFunctionAuthority,
  dispatchFunctionWithAuthority,
  FUNCTION_ACTION_CONTRACT,
  type FunctionActionBinding,
  type FunctionActionContract,
  type FunctionAuthorityHost,
  type FunctionDispatchAuthority,
  type FunctionDispatchResult,
  type FunctionIdentity,
} from "../src/workbench/function-authority.js";
import type { DefinitionRef } from "../src/workbench/identity.js";
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
function admissionFor(id = FUNCTION_ID, policy?: JsonValue, input: JsonValue = TASK, kind: DefinitionRef["kind"] = "function"): ExecuteAdmission {
  const decision = decideExecute(
    { definitionRef: { kind, id, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, input, hostMode: "embedded", ...(policy !== undefined ? { policy } : {}) },
    { grants: [EXECUTE_GRANT], invocationId: INVOCATION },
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
    ["a shorter spelling the exact action begins with", "fixture-fn:develop"],
    ["a namespace sibling", "fixture-fn:write"],
  ])("refuses %s in the adopted action's namespace (%s)", async (_what, grant) => {
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
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
});

describe("the action grammar: representable through Pi grant settings and the detached transport, no silent bypass (wb-201v)", () => {
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

  it("a representable spelling round-trips through loadSettings, and a host reading settings on every call dispatches under it", async () => {
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
  ])("refuses to adopt %s", (_what, actionGrant) => {
    expect(() => adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }])).toThrow(/not representable/);
  });

  it("adopts a grammar-valid spelling of exactly 256 characters, the detached transport's bound", () => {
    const actionGrant = `fixture-fn:${"a".repeat(245)}`;
    expect(actionGrant).toHaveLength(256);
    expect(adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant }])).toEqual({ state: "adopted", bindings: [{ definitionId: FUNCTION_ID, actionGrant }] });
  });

  it("the transport bound mirrored by the seam is the one local-detached enforces on every launch grant", () => {
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

  it.each([
    ["an empty binding list", []],
    ["a blank definition id", [{ definitionId: " ", actionGrant: ACTION }]],
    ["a definition id with an escape", [{ definitionId: `${FUNCTION_ID}\u001b[0m`, actionGrant: ACTION }]],
    ["a binding with an extra member", [{ definitionId: FUNCTION_ID, actionGrant: ACTION, grants: [EXECUTE_GRANT] }]],
  ])("refuses %s", (_what, bindings) => {
    expect(() => adoptFunctionActions(bindings as readonly FunctionActionBinding[])).toThrow();
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
  ])("denies %s as unknown identity data before any dispatch", async (_what, identity) => {
    const dispatch = vi.fn(async () => "ran");
    const host = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => identity } as unknown as FunctionAuthorityHost;
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
    expect(dispatch).not.toHaveBeenCalled();
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
});

describe("the boundary admits function definitions only (wb-201v)", () => {
  it.each(["script", "furnace-formula"] as const)("refuses a %s admission as not a function definition", async kind => {
    const h = harness();
    expect(refusalOf(await h.run(admissionFor(FUNCTION_ID, undefined, TASK, kind)))).toEqual({ stage: "entry", policy: "not-a-function-definition", category: "validation" });
    expect(h.loader).not.toHaveBeenCalled();
  });
});
