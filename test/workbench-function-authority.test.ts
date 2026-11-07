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
 *   EAT-R154  (the 2026-11-07 scope amendment: docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/
 *             requirements/ATOMIC-REQUIREMENTS-DELTA.md lines 732-750 at pi-subagents master b8cd53aa, compiled at the Nov-6
 *             pins pi d7666a76 and mw 97e18068) "Given two admission fixtures identical except for Beads note text (one
 *             carrying a seat token that a census would parse), admission, principal/grant evaluation and the replay basis
 *             yield byte-identical results; a static census of `src/workbench/hosts/` and the admission modules finds no
 *             reader of `.beads/issues.jsonl` notes or of `bd` note output."  mutant: "Read a `notes` field to decide write
 *             authority; the two-fixture equality assertion fails."  Its scope condition: "function admission/identity
 *             only; existing census tests that read the export are out of scope."
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
 * No residual is named: every known-unpinned form of refusal #2 is pinned by a row below. Cut #4 (the respin of refusal
 * #3 under ruling R-B665) takes GUARD A (the clean-text words) and GUARD B (the EAT-R029 exactness words) in the
 * enumerate-the-resolvable form: it adds the clean-text describe and the EAT-R029 stand-in rows and sweeps below
 * red-first (each new case but the trim and sanitizer control fails on the gate's blind stub, and each of refusal #3's
 * GUARD A and GUARD B members fails on one of them), and narrows the clean-text and EAT-R029 titles to their pinned rows. No
 * residual is named for either guard: each form refusal #3 recorded against them is pinned by a row below. Cut #4 also
 * pins the EAT-R028 stand-ins for workbench:execute with the same sweeps and narrows the EAT-R028 titles to their pinned
 * rows. Clean-text readings, and action-grant or workbench:execute spellings or holdings, beyond those rows are NOT
 * CLAIMED. R-B665 exits the R-B642 set to wb-m83p, which owns it; cut #4 does not restate it.
 * Cut #5 (the respin of refusal #4 under the guard binding R-B669) takes the host-authority words: it adds the host
 * authority describe at the end of this file red-first (each of its new cases fails on the gate's blind stub, and each of
 * refusal #4's six members fails on one of its rows), and narrows the EAT-R028 binding title, the EAT-R029 JSON-policy
 * title and the EAT-R030 caller-shape title to their pinned rows. EAT-R028's mutant above is pinned at that describe's
 * listed caller policies, inputs and descriptor forms, in both host modes; other forms of it are NOT CLAIMED. No
 * residual is named: each form refusal #4 recorded is pinned by a row there. Cut #5 keeps GUARD A and GUARD B in their
 * enumerate form and does not restate the R-B642 set.
 * Cut #6 (the respin of refusal #5, in the enumerate-the-resolvable form R-B669's second-stage cap orders for the
 * host-authority words) makes the host authority describe read whole both the authority the boundary returns and the
 * authority its dispatch callback receives, and the decision sweep each authorization: each own key in order with its
 * value, nested objects and arrays included, each object's frozenness and any prototype other than the plain object's
 * or the array's. The {sessionId: s9} and {identity: ...} policy rows and the EAT-R030 caller-shape row also read what
 * the dispatch callback receives. Each of refusal #5's five host-authority members fails on one of those rows,
 * red-first. Refusal #5's U3 words (the dispatch-authority doc of FunctionDispatchAuthority, the EAT-R029 four-grant
 * row title and the EAT-R030 frozen-copy row title) are taken at rung 1: those two rows now also read what the dispatch
 * callback receives, red-first against GP33-DISPATCH-FINAL-GRANTS and GP33-DISPATCH-UNFROZEN-IDENTITY, with both titles
 * byte-identical. Cut #6 also adds the EAT-R154 describe after the host authority describe, at the end of this file,
 * pinning EAT-R154 at its listed fixture pairs and its static census only. No residual is named: each form refusal #5
 * recorded is pinned by a row. Cut #6 keeps GUARD A and GUARD B in their enumerate form and does not restate the R-B642
 * set. Merging landing 1019 (wb-wupg), cut #6 resolves landed-first its contact with
 * test/workbench-claude-tool-grants.test.ts: the host grant read now judges workbench.capabilityGrants by the grammar
 * settings.ts holds, the exact Claude tool right claude:tool:<name> included as known permission data (adoption keeps
 * the namespace:permission grammar), and the module joins that census's READERS, where its rows are pinned; the two
 * landing-1019 contact rows at the end of this file pin the four listed rights at the decision and at adoption.
 * Cut #7 (the respin of refusal #6, whose U1 is EAT-R154's byte-identical admission floor, at rung 1 of its own ladder)
 * has decideExecute take a function definition's request, at the request forms these rows list, through
 * withoutBeadsNotes in identity.ts, which omits the Beads note member at the positions these rows list; other request
 * forms are NOT CLAIMED. The EAT-R154 admission row now reads the two admissions of each listed
 * fixture pair byte-identical, read whole, and equal to the admission of the listed request carrying no note,
 * red-first. Six further EAT-R154 rows pin, each red-first or against its named falsifier: the listed typed fields
 * beside a note still change the admission; the listed nested positions; the listed notes long enough to cross a byte
 * bound; the listed getter and NaN note members; an admission handed to the boundary with a note in its policy; and the
 * script and furnace-formula scope. A census row pins that identity.ts holds the note field's name as a quoted literal
 * exactly once. Cut #7 keeps the frozen sets (R-B669's host-authority words, GUARD A and GUARD B) byte-stable and does
 * not restate the R-B642 set.
 * Cut #8 (the respin of refusal #7, whose U1 is cut #7's EAT-R154 mechanism words, at rung 1 of their own ladder) adds
 * three EAT-R154 rows at the 6 further listed request forms: a caller input that is itself an array of two export rows;
 * the caller policy {bead: the export row} or {notes: the note}, and the caller input with either beside the task
 * fields, each a null-prototype record; and an export row five objects deep in the caller input. In each host mode the
 * first row reads the plain-note and seat-note admissions of each form byte-identical, read whole, to each other and to
 * the admission of the form's listed request carrying no note, red-first: it fails under refusal #7's
 * GP15-JUDGE-OBJECTS-ONLY and GP15-JUDGE-PLAIN-PROTO-ONLY, and under GP15-WITHOUT-SKIP-TOP-ARRAY and GP15-OMIT-DEPTH3.
 * The second row reads each form's endings at the 4 listed host scenarios and its decisions at the 4 listed decision
 * readings as those of the form's listed request carrying no note, read whole; the third reads a script or
 * furnace-formula definition's two admissions of each form still differing in exactly the carrying key. Cut #8 narrows
 * the mechanism words (here, in execute.ts, function-authority.ts and identity.ts) to the request forms these rows list;
 * other request forms are NOT CLAIMED. No residual is named: each form refusal #7's U1 recorded (a caller input that is
 * itself an array, a null-prototype caller policy and caller input) is pinned by the first row. Cut #8 keeps the frozen
 * sets (R-B669's host-authority words, GUARD A and GUARD B) byte-stable and does not restate the R-B642 set.
 *
 * No spelling is adopted, so the production contract is unadopted and refuses every function dispatch (the B-authority row of
 * BEAD-PLAN.md lands "partial - enforcement seams land now; exact action grammar blocked on MW-CONTRACT"). The adopted contracts
 * below are TEST FIXTURES: the fixture-fn:* grants are not a proposed, adopted or recommended spelling, only a representable
 * stand-in that lets the exactness rules run. The loader and provider are the two calls a function launch makes once its
 * authority holds (import the pinned export, then run it); the harness counts both, and the admission wait is a park the test
 * releases by hand.
 */
import { readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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

/**
 * A whole reading of a value: each own key in order (symbols and non-enumerable keys included) with its value, nested
 * objects and arrays included, whether each object is frozen, and any prototype other than the plain object's or the
 * array's. An accessor reads as an accessor and is never invoked.
 */
function wholeOf(value: unknown): string {
  if (typeof value !== "object" || value === null) return JSON.stringify(value) ?? String(value);
  const entries = Reflect.ownKeys(value).map(key => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return `${String(key)}: ${descriptor !== undefined && Object.hasOwn(descriptor, "value") ? wholeOf(descriptor.value) : "an accessor"}`;
  });
  const kind = Array.isArray(value) ? "array" : "object";
  const prototype = Object.getPrototypeOf(value);
  const plain = prototype === (Array.isArray(value) ? Array.prototype : Object.prototype);
  return `${Object.isFrozen(value) ? "frozen " : ""}${kind}${plain ? "" : " of another prototype"} { ${entries.join(", ")} }`;
}

/** The 10 extension forms of the EAT-R028 and EAT-R029 sweeps: six extend a part at its tail, four at its head; each keeps the grammar. */
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const cycled = (alphabet: string, length: number) => alphabet.repeat(Math.ceil(length / alphabet.length)).slice(0, length);
const EXTENSIONS: readonly (readonly [string, "head" | "tail", (length: number) => string])[] = [
  ["a hyphen and letters", "tail", length => `-${cycled(LETTERS, length)}`],
  ["a dot and letters", "tail", length => `.${cycled(LETTERS, length)}`],
  ["a hyphen and digits", "tail", length => `-${cycled(DIGITS, length)}`],
  ["a dot and digits", "tail", length => `.${cycled(DIGITS, length)}`],
  ["digits", "tail", length => cycled(DIGITS, length)],
  ["letters", "tail", length => cycled(LETTERS, length)],
  ["letters and a hyphen", "head", length => `${cycled(LETTERS, length)}-`],
  ["letters and a dot", "head", length => `${cycled(LETTERS, length)}.`],
  ["letters", "head", length => cycled(LETTERS, length)],
  ["the letter a and digits", "head", length => `a${cycled(DIGITS, length)}`],
];

/** Each spelling the 10 forms make of a namespace:permission grant, at every length that keeps it within 256 characters. */
function extendedSpellings(grant: string): Set<string> {
  const [namespace = "", permission = ""] = grant.split(":");
  const spellings = new Set<string>();
  for (const [, side, extend] of EXTENSIONS) {
    for (let length = 1; grant.length + extend(length).length <= 256; length += 1) {
      const extension = extend(length);
      if (side === "tail") spellings.add(`${namespace}${extension}:${permission}`).add(`${namespace}:${permission}${extension}`);
      else spellings.add(`${extension}${namespace}:${permission}`).add(`${namespace}:${extension}${permission}`);
    }
  }
  return spellings;
}

/** Each one-character insertion, deletion or substitution of a spelling over the grammar's 38 characters. */
function oneCharacterEdits(spelling: string): Set<string> {
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz0123456789.-"];
  const edits = new Set<string>();
  for (let index = 0; index <= spelling.length; index += 1) {
    for (const char of alphabet) edits.add(`${spelling.slice(0, index)}${char}${spelling.slice(index)}`);
    if (index < spelling.length) {
      edits.add(`${spelling.slice(0, index)}${spelling.slice(index + 1)}`);
      for (const char of alphabet) edits.add(`${spelling.slice(0, index)}${char}${spelling.slice(index + 1)}`);
    }
  }
  edits.delete(spelling);
  return edits;
}

/** How many decisions refuse under each policy (an authorization is tallied under its grant). */
function tally(decide: (spelling: string) => ReturnType<typeof decideFunctionAuthority>, spellings: Iterable<string>): Record<string, number> {
  const outcomes: Record<string, number> = {};
  for (const spelling of spellings) {
    const decision = decide(spelling);
    const outcome = decision.decision === "refused" ? decision.policy : `authorized by ${spelling}`;
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
  }
  return outcomes;
}

describe("EAT-R028: workbench:execute at the enumerated rows and sweeps (wb-201v)", () => {
  it("refuses the otherwise authorized function request without workbench:execute before any wait, with zero loader and provider calls", async () => {
    const h = harness({ grants: [ACTION] });
    const wait = parked();
    const result = await h.run(admissionFor(), CONTRACT, wait.park);
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
    expect(wait.park).not.toHaveBeenCalled();
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("held with the action grant and not workbench:execute, the embedded request for mechanical.development.develop.v1, which the pinned contract binds to the action, refuses at entry as missing-execute-grant, with zero loader and provider calls, without a policy, with the pinned JSON policy (naming workbench:execute under grants, permissions and authority, with reviewed true) and with the pinned input (naming it under grants)", async () => {
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

  it.each([
    ["Pi's own workbench:detach", DETACH_GRANT],
    ["Pi's own workbench:design", "workbench:design"],
    ["the shorter spelling workbench:exec", "workbench:exec"],
    ["workbench:execute extended by -all", `${EXECUTE_GRANT}-all`],
    ["workbench:execute extended by .sub", `${EXECUTE_GRANT}.sub`],
    ["workbench:execute extended by the digit 2", `${EXECUTE_GRANT}2`],
    ["the permission execute under the namespace fixture-fn", "fixture-fn:execute"],
    ["the parent-qualified namespace org.workbench", "org.workbench:execute"],
  ])("the otherwise authorized request holding %s (%s) in place of workbench:execute refuses before any wait as missing-execute-grant, with zero loader and provider calls", async (_what, grant) => {
    const h = harness({ grants: [grant, ACTION] });
    const wait = parked();
    expect(refusalOf(await h.run(admissionFor(), CONTRACT, wait.park))).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
    expect(wait.park).not.toHaveBeenCalled();
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("the otherwise authorized request holding in place of workbench:execute each spelling the 10 listed forms make of it (six at the tail and four at the head of its namespace and of its permission, at every length that keeps it within 256 characters) refuses as missing-execute-grant, and each one-character insertion, deletion or substitution of it over the grammar's 38 characters refuses as missing-execute-grant or as unknown permission data", () => {
    const admission = admissionFor();
    const decide = (grant: string) => decideFunctionAuthority({ admission, contract: CONTRACT, entered: HOST, current: { grants: [grant, ACTION], identity: HOST } });
    const extended = extendedSpellings(EXECUTE_GRANT);
    expect(extended.size).toBe(4766);
    expect(tally(decide, extended)).toEqual({ "missing-execute-grant": extended.size });
    const edits = oneCharacterEdits(EXECUTE_GRANT);
    const outcomes = tally(decide, edits);
    expect(Object.keys(outcomes).sort()).toEqual(["missing-execute-grant", "unknown-permission-data"]);
    expect(outcomes["missing-execute-grant"]).toBeGreaterThan(1000);
  });
});

describe("EAT-R029: the exact host-issued function action grant at the enumerated rows and sweeps (wb-201v)", () => {
  it("refuses a reviewed definition held with workbench:execute and no action grant", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it.each([
    ["the other bound function's action grant", OTHER_FUNCTION_ACTION],
    ["the sibling action develop-read", "fixture-fn:develop-read"],
    ["the exact action extended by -all", `${ACTION}-all`],
    ["the exact action extended by .sub", `${ACTION}.sub`],
    ["the exact action extended by the digit 2", `${ACTION}2`],
    ["the shorter spelling develop, which the exact action begins with", "fixture-fn:develop"],
    ["the namespace sibling write", "fixture-fn:write"],
  ])("refuses %s in the adopted action's namespace (%s)", async (_what, grant) => {
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("refuses the adopted permission under the namespace other-fn (other-fn:develop-write)", async () => {
    const h = harness({ grants: [EXECUTE_GRANT, "other-fn:develop-write"] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("the adopted exact action held among four grants passes: one loader and one provider call, resting on exactly the two grants, while workbench:execute and that action refuse the other bound definition", async () => {
    const h = harness({ grants: ["forge:inspect", OTHER_FUNCTION_ACTION, ACTION, EXECUTE_GRANT] });
    const result = await h.run(admissionFor());
    expect(result).toEqual({
      status: "dispatched",
      authority: { invocationId: INVOCATION, definition: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, grants: [EXECUTE_GRANT, ACTION], identity: HOST },
      value: { outcome: "ran", invocationId: INVOCATION },
    });
    expect(h.loader).toHaveBeenCalledTimes(1);
    expect(h.provider).toHaveBeenCalledTimes(1);
    // The dispatch rests on exactly the two grants: the provider receives the authority the dispatch callback received.
    expect(h.provider.mock.calls.map(([authority]) => authority.grants)).toEqual([[EXECUTE_GRANT, ACTION]]);
    // The grant is exact per function: the same holdings do not reach the other bound definition.
    const other = harness({ grants: [EXECUTE_GRANT, ACTION] });
    expect(refusalOf(await other.run(admissionFor(OTHER_FUNCTION_ID)))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(other.loader).not.toHaveBeenCalled();
  });

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the pinned JSON policy {grants: [the action], actionGrant: the action} or with the pinned input {task, actionGrant: the action} refuses at entry as missing-function-action-grant, with zero loader calls", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    for (const admission of [admissionFor(FUNCTION_ID, { grants: [ACTION], actionGrant: ACTION }), admissionFor(FUNCTION_ID, undefined, { task: "t", actionGrant: ACTION })]) {
      expect(refusalOf(await h.run(admission))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    }
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("the production contract is unadopted (MW-CONTRACT): held with workbench:execute and both fixture action grants, both fixture definitions refuse as function-action-unadopted", async () => {
    expect(FUNCTION_ACTION_CONTRACT).toEqual({ state: "unadopted", blockedOn: "MW-CONTRACT" });
    const h = harness({ grants: [EXECUTE_GRANT, ACTION, OTHER_FUNCTION_ACTION] });
    for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID]) {
      expect(refusalOf(await h.run(admissionFor(id), FUNCTION_ACTION_CONTRACT))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    }
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("the unbound definition fixture.unbound.v1, and the pinned forged contract (a frozen adopted-shaped object that never went through adoption), refuse as unadopted", async () => {
    const h = harness({ grants: [EXECUTE_GRANT, ACTION] });
    expect(refusalOf(await h.run(admissionFor("fixture.unbound.v1")))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    const forged: FunctionActionContract = Object.freeze({ state: "adopted", bindings: Object.freeze([Object.freeze({ definitionId: FUNCTION_ID, actionGrant: ACTION })]) });
    expect(refusalOf(await h.run(admissionFor(), forged))).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
    expect(h.loader).not.toHaveBeenCalled();
  });

  it("no one-character insertion, deletion or substitution of the exact action over the grammar's 38 characters stands in for it: each refuses as a missing action grant or as unknown permission data", () => {
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

  it("the exact action extended by 1 to 232 repeated letters a at either end, up to the 256-character bound, never stands in", () => {
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

  it.each([
    ["the parent-qualified namespace org.fixture-fn", "org.fixture-fn:develop-write"],
    ["the exact action extended by -admin", `${ACTION}-admin`],
    ["the exact action extended by the digits 22", `${ACTION}22`],
  ])("refuses the stand-in %s (%s)", async (_what, grant) => {
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
    expect(refusalOf(await h.run(admissionFor()))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("the exact action extended by each of the 10 listed forms (six at the tail and four at the head of its namespace and of its permission), at every length that keeps it within 256 characters, refuses as missing-function-action-grant", () => {
    const admission = admissionFor();
    const variants = extendedSpellings(ACTION);
    expect(variants.size).toBe(4626);
    expect(tally(variant => decideFunctionAuthority({ admission, contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, variant], identity: HOST } }), variants)).toEqual({ "missing-function-action-grant": variants.size });
  });

  it("each one-character insertion, deletion or substitution of the exact action over the grammar's 38 characters refuses as missing-function-action-grant when adoption admits the spelling, and as unknown-permission-data when adoption refuses it", () => {
    const admission = admissionFor();
    const mismatches: string[] = [];
    const counts = { admitted: 0, refused: 0 };
    for (const variant of oneCharacterEdits(ACTION)) {
      const admitted = adoptable(variant);
      counts[admitted ? "admitted" : "refused"] += 1;
      const expected = admitted ? "missing-function-action-grant" : "unknown-permission-data";
      const decision = decideFunctionAuthority({ admission, contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, variant], identity: HOST } });
      const outcome = decision.decision === "refused" ? decision.policy : "authorized";
      if (outcome !== expected) mismatches.push(`${variant}: ${outcome}, expected ${expected}`);
    }
    expect(mismatches).toEqual([]);
    expect(counts.admitted).toBeGreaterThan(1000);
    expect(counts.refused).toBeGreaterThan(0);
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
    ["a definition id of one ASCII space", [{ definitionId: " ", actionGrant: ACTION }]],
    ["a definition id ending in the escape sequence ESC [0m", [{ definitionId: `${FUNCTION_ID}\u001b[0m`, actionGrant: ACTION }]],
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

  it("the two pinned caller shapes of the embedded request for mechanical.development.develop.v1 override no host identity: with the policy naming the host's principal, session and identity pair and the input naming its principal and session, a change of the host identity to local-operator:0:s9 / s9 during the park refuses at dispatch as changed-effective-identity, with zero loader calls; with the policy naming local-operator:0:s9 and s9 and the input naming local-operator:0:s9, the steady host dispatches once, its dispatch callback receiving and the boundary returning the identity local-operator:1000:s1 / s1", async () => {
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
    expect(steady.provider.mock.calls.map(([authority]) => authority.identity)).toEqual([HOST]);
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
    ["a principal of one ASCII space", { principal: " ", sessionId: "s1" }],
    ["a missing session", { principal: HOST.principal }],
    ["a non-text session", { principal: HOST.principal, sessionId: 1 }],
    ["a principal of 257 bytes in 256 characters", { principal: `${"a".repeat(255)}\u00e9`, sessionId: "s1" }],
    ["a principal ending in the escape sequence ESC [0m", { principal: `${HOST.principal}\u001b[0m`, sessionId: "s1" }],
    ["a principal ending in U+0007 (a BEL C0 control)", { principal: `${HOST.principal}${String.fromCodePoint(7)}`, sessionId: "s1" }],
    ["a principal ending in U+202E (a bidi override)", { principal: `${HOST.principal}${String.fromCodePoint(0x202e)}`, sessionId: "s1" }],
    ["a principal ending in U+200B (a default-ignorable point)", { principal: `${HOST.principal}${String.fromCodePoint(0x200b)}`, sessionId: "s1" }],
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
    const received: FunctionDispatchAuthority[] = [];
    const dispatch = async (authority: FunctionDispatchAuthority) => {
      received.push(authority);
      return "ran";
    };
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host: { grants: () => [EXECUTE_GRANT, ACTION], identity: () => returned }, dispatch });
    if (result.status !== "dispatched") throw new Error(`expected a dispatch, got ${result.status}`);
    expect(result.authority.identity).toEqual(HOST);
    expect(result.authority.identity).not.toBe(returned);
    expect(Object.isFrozen(result.authority.identity)).toBe(true);
    // The identity the dispatch callback receives, the one it rests on, is that frozen copy too.
    expect(received).toHaveLength(1);
    expect(received[0]?.identity).toEqual(HOST);
    expect(received[0]?.identity).not.toBe(returned);
    expect(Object.isFrozen(received[0]?.identity)).toBe(true);
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
    ["U+0007 (a BEL C0 control)", 7],
    ["U+202E (a bidi override)", 0x202e],
    ["U+200B (a default-ignorable point)", 0x200b],
  ])("a definition id ending in %s is not clean text", (_what, codePoint) => {
    const definitionId = `${FUNCTION_ID}${String.fromCodePoint(codePoint)}`;
    expect(() => adoptFunctionActions([{ definitionId, actionGrant: ACTION }])).toThrow(/clean definition id/);
  });

  it("each Unicode code point, U+0000 to U+10FFFF, inserted alone into the definition id fixture.<u>.v1 and into the principal local-operator:1000:<u>, is clean text exactly when stripUnsafeText leaves the text unchanged", () => {
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

  it("a definition id at the 256-byte bound, counted in bytes: 256 ASCII bytes are adopted, 257 bytes in 256 characters throw", () => {
    const at256 = `fixture.${"a".repeat(248)}`;
    const wide = `${"a".repeat(255)}é`;
    expect([Buffer.byteLength(at256), Buffer.byteLength(wide), wide.length]).toEqual([256, 257, 256]);
    expect(adoptFunctionActions([{ definitionId: at256, actionGrant: ACTION }]).state).toBe("adopted");
    expect(() => adoptFunctionActions([{ definitionId: wide, actionGrant: ACTION }])).toThrow(/clean definition id/);
  });
});

describe("clean text: the enumerated readings of a definition id, a principal and a session (wb-201v)", () => {
  /** The 25 code points String.prototype.trim removes, and the 17 of them that stripUnsafeText keeps. */
  const TRIMMED = [0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x20, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff];
  const KEPT_BLANKS = [0x20, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x202f, 0x205f, 0x3000];

  /** Whether a definition id, a principal and a session each take the text: adoption, then a known identity at decision. */
  function fieldsTake(admission: ExecuteAdmission, text: string): boolean[] {
    let adopted = true;
    try {
      adoptFunctionActions([{ definitionId: text, actionGrant: ACTION }]);
    } catch (error) {
      if (!(error instanceof CapabilityError && /clean definition id/.test(error.message))) throw error;
      adopted = false;
    }
    const known = (identity: FunctionIdentity): boolean => {
      const decision = decideFunctionAuthority({ admission, contract: CONTRACT, entered: identity, current: { grants: [EXECUTE_GRANT, ACTION], identity } });
      if (decision.decision === "authorized") return true;
      if (decision.policy === "unknown-identity-data") return false;
      throw new Error(`unexpected ${decision.policy} refusal`);
    };
    return [adopted, known({ principal: text, sessionId: HOST.sessionId }), known({ principal: HOST.principal, sessionId: text })];
  }

  it("String.prototype.trim removes 25 code points (U+0009 to U+000D, U+0020, U+00A0, U+1680, U+2000 to U+200A, U+2028, U+2029, U+202F, U+205F, U+3000 and U+FEFF), and stripUnsafeText keeps 17 of them (U+0020, U+00A0, U+1680, U+2000 to U+200A, U+202F, U+205F and U+3000)", () => {
    const trimmed: number[] = [];
    for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) if (String.fromCodePoint(codePoint).trim() === "") trimmed.push(codePoint);
    expect(trimmed).toEqual(TRIMMED);
    expect(TRIMMED.filter(codePoint => stripUnsafeText(String.fromCodePoint(codePoint)) === String.fromCodePoint(codePoint))).toEqual(KEPT_BLANKS);
  });

  it("each Unicode code point, U+0000 to U+10FFFF, as the whole text of a definition id, a principal or a session, is clean text exactly when String.prototype.trim leaves it non-empty and stripUnsafeText leaves it unchanged", () => {
    const admission = admissionFor();
    const disagreements: string[] = [];
    let refused = 0;
    for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) {
      const unit = String.fromCodePoint(codePoint);
      const clean = unit.trim() !== "" && stripUnsafeText(unit) === unit;
      if (!clean) refused += 1;
      const taken = fieldsTake(admission, unit);
      if (taken.some(field => field !== clean)) disagreements.push(`${codePoint.toString(16)}: ${taken.join(",")}`);
      if (disagreements.length > 20) break;
    }
    expect(disagreements).toEqual([]);
    expect(refused).toBeGreaterThan(6000);
  }, 120_000);

  it("each Unicode code point, U+0000 to U+10FFFF, inserted alone into the session s<u>1, is clean text exactly when stripUnsafeText leaves the session unchanged", () => {
    const admission = admissionFor();
    const disagreements: string[] = [];
    for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) {
      const sessionId = `s${String.fromCodePoint(codePoint)}1`;
      // Entered as HOST, so a clean session reads as a changed identity and an unclean one as unknown identity data.
      const decision = decideFunctionAuthority({ admission, contract: CONTRACT, entered: HOST, current: { grants: [EXECUTE_GRANT, ACTION], identity: { principal: HOST.principal, sessionId } } });
      const known = decision.decision === "refused" && decision.policy === "changed-effective-identity";
      if (known !== (stripUnsafeText(sessionId) === sessionId)) disagreements.push(codePoint.toString(16));
      if (disagreements.length > 20) break;
    }
    expect(disagreements).toEqual([]);
  }, 120_000);

  it("a definition id, a principal or a session made only of the 17 blanks stripUnsafeText keeps is refused: each blank repeated 2 times, 3 times and up to 256 bytes, and all 17 in code-point order", () => {
    const admission = admissionFor();
    const texts = KEPT_BLANKS.flatMap(codePoint => {
      const unit = String.fromCodePoint(codePoint);
      return [unit.repeat(2), unit.repeat(3), unit.repeat(Math.floor(256 / Buffer.byteLength(unit)))];
    });
    texts.push(String.fromCodePoint(...KEPT_BLANKS));
    expect(texts).toHaveLength(52);
    expect(texts.filter(text => Buffer.byteLength(text) > 256)).toEqual([]);
    const taken = texts.filter(text => fieldsTake(admission, text).some(field => field)).map(text => [...text].map(unit => unit.codePointAt(0)?.toString(16)).join(" "));
    expect(taken).toEqual([]);
  });

  it("1 to 512 ASCII letters a, and 1 to 256 characters U+00E9, as a definition id, a principal or a session, are clean text exactly when they hold at most 256 bytes", () => {
    const admission = admissionFor();
    const disagreements: string[] = [];
    for (const [unit, most] of [["a", 512], ["é", 256]] as const) {
      for (let count = 1; count <= most; count += 1) {
        const text = unit.repeat(count);
        const clean = Buffer.byteLength(text) <= 256;
        const taken = fieldsTake(admission, text);
        if (taken.some(field => field !== clean)) disagreements.push(`${unit.codePointAt(0)?.toString(16)} x ${count}: ${taken.join(",")}`);
      }
    }
    expect(disagreements).toEqual([]);
  });

  it.each([
    ["ending in the escape sequence ESC [0m", `${HOST.sessionId}\u001b[0m`],
    ["ending in U+0007 (a BEL C0 control)", `${HOST.sessionId}${String.fromCodePoint(7)}`],
    ["ending in U+202E (a bidi override)", `${HOST.sessionId}${String.fromCodePoint(0x202e)}`],
    ["ending in U+200B (a default-ignorable point)", `${HOST.sessionId}${String.fromCodePoint(0x200b)}`],
    ["of one ASCII space", " "],
    ["of one U+3000 ideographic space", String.fromCodePoint(0x3000)],
    ["of 257 bytes in 256 characters", `${"a".repeat(255)}é`],
  ])("denies a session %s as unknown identity data before any dispatch", async (_what, sessionId) => {
    const dispatch = vi.fn(async () => "ran");
    const host: FunctionAuthorityHost = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => ({ principal: HOST.principal, sessionId }) };
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
    expect(dispatch).not.toHaveBeenCalled();
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

describe("host authority: in each host mode, the listed caller policies leave the listed ending of each listed boundary scenario and decision reading unchanged, the listed caller inputs that of each listed boundary scenario, and the listed descriptor forms confer no execute right (wb-201v)", () => {
  /** Another principal and session: the identity refusal #4's witnesses name. */
  const OTHER: FunctionIdentity = Object.freeze({ principal: "local-operator:0:s9", sessionId: "s9" });
  const MODES = ["embedded", "detached"] as const;
  const PLAIN_TASK: Record<string, JsonValue> = { task: "t", workspaceId: "w", baseRevision: "r" };
  const BOTH: readonly string[] = [EXECUTE_GRANT, ACTION];

  /** A real workflow_execute admission in either host mode; decideExecute admits both with workbench:execute held. */
  function admit(hostMode: (typeof MODES)[number], policy?: JsonValue, input: JsonValue = PLAIN_TASK, ref: Partial<Pick<DefinitionRef, "id" | "schemaVersion" | "artifactDigest">> = {}): ExecuteAdmission {
    const definitionRef: DefinitionRef = { kind: "function", id: ref.id ?? FUNCTION_ID, schemaVersion: ref.schemaVersion ?? FUNCTION_SCHEMA, artifactDigest: ref.artifactDigest ?? DIGEST };
    const decision = decideExecute({ definitionRef, input, hostMode, ...(policy !== undefined ? { policy } : {}) }, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
    if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
    return decision.admission;
  }

  /** The eight listed keys and their listed values. */
  const CLAIMS: readonly (readonly [string, readonly JsonValue[]])[] = [
    ["grants", [[EXECUTE_GRANT], [ACTION], [EXECUTE_GRANT, ACTION]]],
    ["permissions", [[EXECUTE_GRANT], [ACTION], [EXECUTE_GRANT, ACTION]]],
    ["authority", [EXECUTE_GRANT, ACTION]],
    ["reviewed", [true]],
    ["actionGrant", [ACTION, OTHER_FUNCTION_ACTION]],
    ["principal", [HOST.principal, OTHER.principal]],
    ["sessionId", [HOST.sessionId, OTHER.sessionId]],
    [
      "identity",
      [
        { principal: HOST.principal, sessionId: HOST.sessionId },
        { principal: OTHER.principal, sessionId: OTHER.sessionId },
      ],
    ],
  ];
  /** Each record holding every listed key absent or with one of its values: 4 * 4 * 3 * 2 * 3 * 3 * 3 * 3 = 7776 records, the empty one included. */
  const RECORDS: readonly Record<string, JsonValue>[] = CLAIMS.reduce<Record<string, JsonValue>[]>(
    (records, [key, values]) => records.flatMap(record => [record, ...values.map(value => ({ ...record, [key]: value }))]),
    [{}],
  );
  /** The listed claims record: every key, with workbench:execute and the action named wherever a grant is, and the host's identity. */
  const CLAIMS_ALL: Record<string, JsonValue> = {
    grants: [EXECUTE_GRANT, ACTION],
    permissions: [EXECUTE_GRANT, ACTION],
    authority: EXECUTE_GRANT,
    reviewed: true,
    actionGrant: ACTION,
    principal: HOST.principal,
    sessionId: HOST.sessionId,
    identity: { principal: HOST.principal, sessionId: HOST.sessionId },
  };

  interface HostReads {
    readonly grants: readonly string[];
    readonly identity: FunctionIdentity;
  }
  /** The listed request's invocation and definition, as a dispatch or an authorization rests on them. */
  const LISTED = `${INVOCATION} for function ${FUNCTION_ID} ${FUNCTION_SCHEMA} ${DIGEST}`;
  const refusedAt = (stage: "entry" | "dispatch", policy: FunctionAuthorityRefusal) => `refused at ${stage} as ${policy} (authorization) for ${INVOCATION}; park ${stage === "entry" ? 0 : 1}, loader 0, provider 0`;
  /** The authority a listed dispatch or authorization rests on, as a deeply frozen literal: the expected side of every whole reading below. */
  const listedAuthority = (identity: FunctionIdentity) =>
    deepFreeze({ invocationId: INVOCATION, definition: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, grants: [EXECUTE_GRANT, ACTION], identity: { principal: identity.principal, sessionId: identity.sessionId } });
  const dispatchedUnder = (identity: FunctionIdentity) =>
    `dispatched ${LISTED} on ${EXECUTE_GRANT} and ${ACTION} under ${identity.principal} / ${identity.sessionId}, value ${INVOCATION}; read whole, the returned authority ${wholeOf(listedAuthority(identity))} and the authority the dispatch callback received ${wholeOf(listedAuthority(identity))}; park 1, loader 1, provider 1`;
  /** The 12 listed boundary scenarios: the host's reads at entry, what the park changes, and how the request ends. */
  const SCENARIOS: readonly (readonly [string, HostReads, HostReads | undefined, string])[] = [
    ["both grants under local-operator:1000:s1 / s1 throughout", { grants: BOTH, identity: HOST }, undefined, dispatchedUnder(HOST)],
    ["both grants under local-operator:0:s9 / s9 throughout", { grants: BOTH, identity: OTHER }, undefined, dispatchedUnder(OTHER)],
    ["workbench:execute alone", { grants: [EXECUTE_GRANT], identity: HOST }, undefined, refusedAt("entry", "missing-function-action-grant")],
    ["the action alone", { grants: [ACTION], identity: HOST }, undefined, refusedAt("entry", "missing-execute-grant")],
    ["no grant", { grants: [], identity: HOST }, undefined, refusedAt("entry", "missing-execute-grant")],
    ["workbench:execute and the other bound function's action", { grants: [EXECUTE_GRANT, OTHER_FUNCTION_ACTION], identity: HOST }, undefined, refusedAt("entry", "missing-function-action-grant")],
    ["the identity changed to local-operator:0:s9 / s9 during the park", { grants: BOTH, identity: HOST }, { grants: BOTH, identity: OTHER }, refusedAt("dispatch", "changed-effective-identity")],
    ["only the principal changed, to local-operator:0:s9, during the park", { grants: BOTH, identity: HOST }, { grants: BOTH, identity: { principal: OTHER.principal, sessionId: HOST.sessionId } }, refusedAt("dispatch", "changed-effective-identity")],
    ["only the session changed, to s9, during the park", { grants: BOTH, identity: HOST }, { grants: BOTH, identity: { principal: HOST.principal, sessionId: OTHER.sessionId } }, refusedAt("dispatch", "changed-effective-identity")],
    ["the identity changed from local-operator:0:s9 / s9 to local-operator:1000:s1 / s1 during the park", { grants: BOTH, identity: OTHER }, { grants: BOTH, identity: HOST }, refusedAt("dispatch", "changed-effective-identity")],
    ["the action grant revoked during the park", { grants: BOTH, identity: HOST }, { grants: [EXECUTE_GRANT], identity: HOST }, refusedAt("dispatch", "missing-function-action-grant")],
    ["workbench:execute revoked during the park", { grants: BOTH, identity: HOST }, { grants: [ACTION], identity: HOST }, refusedAt("dispatch", "missing-execute-grant")],
  ];
  const authorizedUnder = (identity: FunctionIdentity) => `authorized ${LISTED} on ${EXECUTE_GRANT} and ${ACTION} under ${identity.principal} / ${identity.sessionId}; read whole ${wholeOf(listedAuthority(identity))}`;
  const refusedAs = (policy: FunctionAuthorityRefusal) => `refused as ${policy} (authorization) for ${INVOCATION}`;
  /** The 10 listed decision readings: the identity read at entry, the host's reads now, and the decision. */
  const READINGS: readonly (readonly [FunctionIdentity, HostReads, string])[] = [
    [HOST, { grants: BOTH, identity: HOST }, authorizedUnder(HOST)],
    [OTHER, { grants: BOTH, identity: OTHER }, authorizedUnder(OTHER)],
    [HOST, { grants: [EXECUTE_GRANT], identity: HOST }, refusedAs("missing-function-action-grant")],
    [HOST, { grants: [ACTION], identity: HOST }, refusedAs("missing-execute-grant")],
    [HOST, { grants: [], identity: HOST }, refusedAs("missing-execute-grant")],
    [HOST, { grants: [EXECUTE_GRANT, OTHER_FUNCTION_ACTION], identity: HOST }, refusedAs("missing-function-action-grant")],
    [HOST, { grants: BOTH, identity: OTHER }, refusedAs("changed-effective-identity")],
    [HOST, { grants: BOTH, identity: { principal: OTHER.principal, sessionId: HOST.sessionId } }, refusedAs("changed-effective-identity")],
    [HOST, { grants: BOTH, identity: { principal: HOST.principal, sessionId: OTHER.sessionId } }, refusedAs("changed-effective-identity")],
    [OTHER, { grants: BOTH, identity: HOST }, refusedAs("changed-effective-identity")],
  ];

  /** How one request ends at the boundary when the park applies the scenario's change; the park, loader and provider calls are counted. */
  async function ending(admission: ExecuteAdmission, entry: HostReads, change: HostReads | undefined, contract: FunctionActionContract = CONTRACT): Promise<string> {
    let reads = entry;
    const calls = { park: 0, loader: 0, provider: 0 };
    const received: FunctionDispatchAuthority[] = [];
    const host: FunctionAuthorityHost = { grants: () => reads.grants, identity: () => ({ ...reads.identity }) };
    const park = async () => {
      calls.park += 1;
      if (change !== undefined) reads = change;
    };
    const dispatch = async (authority: FunctionDispatchAuthority) => {
      received.push(authority);
      calls.loader += 1;
      const provider = async () => {
        calls.provider += 1;
        return authority.invocationId;
      };
      return provider();
    };
    const result = await dispatchFunctionWithAuthority({ admission, contract, host, park, dispatch });
    const counted = `park ${calls.park}, loader ${calls.loader}, provider ${calls.provider}`;
    if (result.status === "refused") return `refused at ${result.stage} as ${result.refusal.policy} (${result.refusal.category}) for ${result.refusal.invocationId}; ${counted}`;
    const { invocationId, definition, grants, identity } = result.authority;
    const further = Object.keys(identity).length === 2 ? "" : " with further identity fields";
    const whole = `read whole, the returned authority ${wholeOf(result.authority)} and the authority the dispatch callback received ${received.map(wholeOf).join(" and then ")}`;
    return `dispatched ${invocationId} for ${definition.kind} ${definition.id} ${definition.schemaVersion} ${definition.artifactDigest} on ${grants.join(" and ")} under ${identity.principal} / ${identity.sessionId}${further}, value ${String(result.value)}; ${whole}; ${counted}`;
  }
  /** A decision as the readings list it. */
  function decisionEnding(decision: ReturnType<typeof decideFunctionAuthority>): string {
    if (decision.decision === "refused") return `refused as ${decision.policy} (${decision.category}) for ${decision.invocationId}`;
    const { invocationId, definition, grants, identity } = decision.authority;
    const further = Object.keys(identity).length === 2 ? "" : " with further identity fields";
    return `authorized ${invocationId} for ${definition.kind} ${definition.id} ${definition.schemaVersion} ${definition.artifactDigest} on ${grants.join(" and ")} under ${identity.principal} / ${identity.sessionId}${further}; read whole ${wholeOf(decision.authority)}`;
  }
  /** The endings of a list of requests at one scenario, tallied. */
  async function endings(admissions: readonly ExecuteAdmission[], entry: HostReads, change: HostReads | undefined): Promise<Record<string, number>> {
    const tallied: Record<string, number> = {};
    for (const admission of admissions) {
      const ended = await ending(admission, entry, change);
      tallied[ended] = (tallied[ended] ?? 0) + 1;
    }
    return tallied;
  }

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the policy {grants: [the action], actionGrant: the action, reviewed: true} refuses at entry as missing-function-action-grant, with zero loader and provider calls", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    expect(refusalOf(await h.run(admit("embedded", { grants: [ACTION], actionGrant: ACTION, reviewed: true })))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the policy {grants: [workbench:execute, the action], actionGrant: the action} refuses at entry as missing-function-action-grant, with zero loader and provider calls", async () => {
    const h = harness({ grants: [EXECUTE_GRANT] });
    expect(refusalOf(await h.run(admit("embedded", { grants: [EXECUTE_GRANT, ACTION], actionGrant: ACTION })))).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it.each([
    ["{sessionId: s9}", { sessionId: OTHER.sessionId }],
    ["{identity: {principal: local-operator:0:s9, sessionId: s9}}", { identity: { principal: OTHER.principal, sessionId: OTHER.sessionId } }],
  ] as const)("held with both grants under the steady host identity, the embedded request for mechanical.development.develop.v1 with the policy %s dispatches once: the dispatch callback receives, and the boundary returns, the whole listed authority, resting on workbench:execute and the action under local-operator:1000:s1 / s1", async (_policy, policy) => {
    const h = harness();
    const result = await h.run(admit("embedded", policy));
    expect(result.status === "dispatched" ? result.authority : undefined).toEqual({ invocationId: INVOCATION, definition: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, grants: [EXECUTE_GRANT, ACTION], identity: HOST });
    expect(h.loader).toHaveBeenCalledTimes(1);
    expect(h.provider).toHaveBeenCalledTimes(1);
    const listed = wholeOf(listedAuthority(HOST));
    expect(result.status === "dispatched" ? wholeOf(result.authority) : undefined).toBe(listed);
    expect(h.provider.mock.calls.map(([authority]) => wholeOf(authority))).toEqual([listed]);
  });

  it("with the policy {sessionId: s1}, the entry session and no principal, a change of the host identity to local-operator:0:s9 / s9 during the park refuses the embedded request for mechanical.development.develop.v1 at dispatch as changed-effective-identity, with zero loader and provider calls", async () => {
    const h = harness();
    const wait = parked();
    const pending = h.run(admit("embedded", { sessionId: HOST.sessionId }), CONTRACT, wait.park);
    h.state.identity = OTHER;
    wait.release();
    expect(refusalOf(await pending)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("held with the action grant and not workbench:execute, the detached request for mechanical.development.develop.v1, which the pinned contract binds to the action, refuses at entry as missing-execute-grant, with zero park, loader and provider calls", async () => {
    const h = harness({ grants: [ACTION] });
    const wait = parked();
    expect(refusalOf(await h.run(admit("detached"), CONTRACT, wait.park))).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
    expect(wait.park).not.toHaveBeenCalled();
    expect(h.loader).not.toHaveBeenCalled();
    expect(h.provider).not.toHaveBeenCalled();
  });

  it("in each host mode, the request for mechanical.development.develop.v1 carrying each of the 7776 listed caller policies (each record holding each of grants, permissions, authority, reviewed, actionGrant, principal, sessionId and identity absent or with one of its listed values) ends each of the 12 listed boundary scenarios as the scenario lists, as the request without a policy does: the same refusal stage, policy, category and invocation, or one dispatch whose callback receives, and whose boundary returns, the listed authority read whole (each own key and value, nested, each object's frozenness and any other prototype) on the same invocation and definition, resting on workbench:execute and the action under the same principal and session, with the same value and the same park, loader and provider calls", async () => {
    expect(RECORDS).toHaveLength(7776);
    expect(SCENARIOS).toHaveLength(12);
    for (const hostMode of MODES) {
      const admissions = [admit(hostMode), ...RECORDS.map(policy => admit(hostMode, policy))];
      for (const [scenario, entry, change, expected] of SCENARIOS) {
        expect({ hostMode, scenario, endings: await endings(admissions, entry, change) }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
      }
    }
  }, 120_000);

  it("in each host mode, decideFunctionAuthority decides the request for mechanical.development.develop.v1 carrying each of the 7776 listed caller policies, at each of the 10 listed decision readings, as the reading lists, as it decides the request without a policy: the same refusal policy, category and invocation, or the listed authorization read whole (each own key and value, nested, each object's frozenness and any other prototype) on the same invocation and definition, resting on workbench:execute and the action under the same principal and session", () => {
    expect(READINGS).toHaveLength(10);
    for (const hostMode of MODES) {
      const admissions = [admit(hostMode), ...RECORDS.map(policy => admit(hostMode, policy))];
      for (const [entered, now, expected] of READINGS) {
        const decisions: Record<string, number> = {};
        for (const admission of admissions) {
          const decision = decideFunctionAuthority({ admission, contract: CONTRACT, entered, current: { grants: now.grants, identity: now.identity } });
          const decided = decisionEnding(decision);
          decisions[decided] = (decisions[decided] ?? 0) + 1;
        }
        expect({ hostMode, entered, now, decisions }).toEqual({ hostMode, entered, now, decisions: { [expected]: 7777 } });
      }
    }
  }, 120_000);

  it("in each host mode, the request for mechanical.development.develop.v1 without a policy, carrying each of the 7776 listed caller inputs (each record above added to the plain task fields), ends each of the 12 listed boundary scenarios as the scenario lists, as the request with the plain task input does", async () => {
    for (const hostMode of MODES) {
      const admissions = [admit(hostMode), ...RECORDS.map(fields => admit(hostMode, undefined, { ...PLAIN_TASK, ...fields }))];
      for (const [scenario, entry, change, expected] of SCENARIOS) {
        expect({ hostMode, scenario, endings: await endings(admissions, entry, change) }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
      }
    }
  }, 120_000);

  it("in each host mode, without workbench:execute, the request for each of the three listed definitions under each of the three listed contracts, with each of the two listed schema versions and digests, each of the three listed policies and each of the two listed inputs, held under the steady host identity with each of the 32 subsets of the five listed grants, refuses at entry as missing-execute-grant, with zero park, loader and provider calls (13824 requests)", async () => {
    const forged = Object.freeze({
      state: "adopted",
      bindings: Object.freeze([Object.freeze({ definitionId: FUNCTION_ID, actionGrant: ACTION }), Object.freeze({ definitionId: OTHER_FUNCTION_ID, actionGrant: OTHER_FUNCTION_ACTION })]),
    }) as FunctionActionContract;
    const pool = [ACTION, OTHER_FUNCTION_ACTION, DETACH_GRANT, "workbench:design", "forge:inspect"];
    const subsets = Array.from({ length: 2 ** pool.length }, (_, mask) => pool.filter((_grant, bit) => (mask & (1 << bit)) !== 0));
    const tallied: Record<string, number> = {};
    for (const hostMode of MODES) {
      for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID, "fixture.unbound.v1"]) {
        for (const schemaVersion of [FUNCTION_SCHEMA, "mechanical-workflows/entrypoint/v2"]) {
          for (const artifactDigest of [DIGEST, `sha256:${"cd".repeat(32)}`]) {
            for (const policy of [undefined, {}, CLAIMS_ALL]) {
              for (const input of [PLAIN_TASK, { ...PLAIN_TASK, ...CLAIMS_ALL }]) {
                const admission = admit(hostMode, policy, input, { id, schemaVersion, artifactDigest });
                for (const contract of [CONTRACT, FUNCTION_ACTION_CONTRACT, forged]) {
                  for (const grants of subsets) {
                    const ended = await ending(admission, { grants, identity: HOST }, undefined, contract);
                    tallied[ended] = (tallied[ended] ?? 0) + 1;
                  }
                }
              }
            }
          }
        }
      }
    }
    expect(tallied).toEqual({ [refusedAt("entry", "missing-execute-grant")]: 13824 });
  }, 120_000);
});

describe("EAT-R154: at the listed fixture pairs a Beads note changes no admission, boundary result, dispatched authority or decision, read whole, and the listed typed fields beside a note still change the admission; the listed static census finds none of the listed Beads note reader forms in the judged files, and the note field's name once in identity.ts (wb-201v)", () => {
  const OTHER: FunctionIdentity = Object.freeze({ principal: "local-operator:0:s9", sessionId: "s9" });
  const BOTH: readonly string[] = [EXECUTE_GRANT, ACTION];
  const PLAIN_TASK: Record<string, JsonValue> = { task: "t", workspaceId: "w", baseRevision: "r" };
  /** This bead's row as the Beads export holds it, with the given note text. */
  const exportRow = (notes: string): Record<string, JsonValue> => ({ id: "wb-201v", title: "[MWI-authority] Enforce exact function authority at the final dispatch boundary", status: "in_progress", assignee: "flywheel", notes });
  const PLAIN_NOTE = "A plain note naming no seat token.";
  /** A note carrying the seat tokens a census parses (a ritual line and a claim-holder line) and the suite's grant and identity spellings. */
  const SEAT_NOTE = [
    "ritual: run=frn-run-fw-wisp-o9tx7i attempt=frn-atm-fw-wisp-kbf8dl-1 verdict=pass",
    "claims already held for wb-201v by ws-03@g10-work-s235 pid=1 2026-11-07T08:28:59.000Z",
    `grants ${EXECUTE_GRANT} ${ACTION} ${OTHER_FUNCTION_ACTION} under ${OTHER.principal} / ${OTHER.sessionId}`,
  ].join("\n");
  interface Carried {
    readonly policy?: JsonValue;
    readonly input: JsonValue;
  }
  /** Where a fixture carries the note: in the request, or on the host's identity read beside principal and sessionId. */
  interface Fixture {
    readonly carried: Carried;
    readonly hostNotes?: string;
  }
  /**
   * The 5 listed fixture forms: where the note is carried, and the one own key of the admission that echoes it (none when
   * the request is unchanged).
   */
  const FORMS: readonly (readonly [string, "policy" | "inputDigest" | "none", (notes: string) => Fixture])[] = [
    ["the caller policy {bead: the export row}", "policy", notes => ({ carried: { policy: { bead: exportRow(notes) }, input: PLAIN_TASK } })],
    ["the caller policy {notes: the note}", "policy", notes => ({ carried: { policy: { notes }, input: PLAIN_TASK } })],
    ["the caller input {the task fields, bead: the export row}", "inputDigest", notes => ({ carried: { input: { ...PLAIN_TASK, bead: exportRow(notes) } } })],
    ["the caller input {the task fields, notes: the note}", "inputDigest", notes => ({ carried: { input: { ...PLAIN_TASK, notes } } })],
    ["the host's identity read carrying a notes field beside principal and sessionId, the request unchanged", "none", notes => ({ carried: { input: PLAIN_TASK }, hostNotes: notes })],
  ];
  /** An identity read as a host that also passes a Beads note along would return it. */
  const carrying = (identity: FunctionIdentity, hostNotes: string | undefined): FunctionIdentity => (hostNotes === undefined ? identity : ({ ...identity, notes: hostNotes } as FunctionIdentity));
  const MODES = ["embedded", "detached"] as const;
  function admitCarrying(hostMode: (typeof MODES)[number], carried: Carried): ExecuteAdmission {
    const definitionRef: DefinitionRef = { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST };
    const decision = decideExecute({ definitionRef, input: carried.input, hostMode, ...(carried.policy !== undefined ? { policy: carried.policy } : {}) }, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
    if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
    return decision.admission;
  }
  /** decideExecute's decision for the request of the given definition kind carrying the fixture. */
  function decideCarrying(hostMode: (typeof MODES)[number], carried: Carried, kind: DefinitionRef["kind"]): ReturnType<typeof decideExecute> {
    const definitionRef: DefinitionRef = { kind, id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST };
    return decideExecute({ definitionRef, input: carried.input, hostMode, ...(carried.policy !== undefined ? { policy: carried.policy } : {}) }, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
  }
  /** This bead's export row without its note: its typed fields only. */
  const ROW_WITHOUT_NOTE: Record<string, JsonValue> = { id: "wb-201v", title: "[MWI-authority] Enforce exact function authority at the final dispatch boundary", status: "in_progress", assignee: "flywheel" };
  /** For each of the 5 listed fixture forms, the listed request carrying no note: the form's carrier without its note member. */
  const NOTELESS: readonly (readonly [string, Carried])[] = [
    ["the caller policy {bead: the export row}", { policy: { bead: ROW_WITHOUT_NOTE }, input: PLAIN_TASK }],
    ["the caller policy {notes: the note}", { policy: {}, input: PLAIN_TASK }],
    ["the caller input {the task fields, bead: the export row}", { input: { ...PLAIN_TASK, bead: ROW_WITHOUT_NOTE } }],
    ["the caller input {the task fields, notes: the note}", { input: PLAIN_TASK }],
    ["the host's identity read carrying a notes field beside principal and sessionId, the request unchanged", { input: PLAIN_TASK }],
  ];
  function notelessOf(form: string): Carried {
    const listed = NOTELESS.find(([label]) => label === form);
    if (listed === undefined) throw new Error(`no request carrying no note is listed for ${form}`);
    return listed[1];
  }
  interface HostReads {
    readonly grants: readonly string[];
    readonly identity: FunctionIdentity;
  }
  /** The 4 listed host scenarios: the host's reads at entry, and what the park changes. */
  const SCENARIOS: readonly (readonly [string, HostReads, HostReads | undefined])[] = [
    ["both grants under local-operator:1000:s1 / s1 throughout", { grants: BOTH, identity: HOST }, undefined],
    ["the action alone", { grants: [ACTION], identity: HOST }, undefined],
    ["workbench:execute alone", { grants: [EXECUTE_GRANT], identity: HOST }, undefined],
    ["the identity changed to local-operator:0:s9 / s9 during the park", { grants: BOTH, identity: HOST }, { grants: BOTH, identity: OTHER }],
  ];
  /** The 4 listed decision readings: the identity read at entry and the host's reads now. */
  const READINGS: readonly (readonly [FunctionIdentity, HostReads])[] = [
    [HOST, { grants: BOTH, identity: HOST }],
    [HOST, { grants: [ACTION], identity: HOST }],
    [HOST, { grants: [EXECUTE_GRANT], identity: HOST }],
    [HOST, { grants: BOTH, identity: OTHER }],
  ];
  /** How a request ends at the boundary: the whole result, the whole authority each dispatch call receives, and the park and dispatch counts. */
  async function endingOf(admission: ExecuteAdmission, entry: HostReads, change: HostReads | undefined, hostNotes?: string): Promise<string> {
    let reads = entry;
    const calls = { park: 0, dispatch: 0 };
    const received: FunctionDispatchAuthority[] = [];
    const host: FunctionAuthorityHost = { grants: () => reads.grants, identity: () => ({ ...carrying(reads.identity, hostNotes) }) };
    const park = async () => {
      calls.park += 1;
      if (change !== undefined) reads = change;
    };
    const dispatch = async (authority: FunctionDispatchAuthority) => {
      calls.dispatch += 1;
      received.push(authority);
      return authority.invocationId;
    };
    const result = await dispatchFunctionWithAuthority({ admission, contract: CONTRACT, host, park, dispatch });
    return `${wholeOf(result)}; the dispatch callback received [${received.map(wholeOf).join(", ")}]; park ${calls.park}, dispatch ${calls.dispatch}`;
  }

  it("in each host mode, decideExecute admits the request for mechanical.development.develop.v1 of each of the 5 listed fixture forms with the plain note and with the seat note, and the two admissions are byte-identical, read whole, to each other and to the admission of the listed request carrying no note (the form's carrier without its note member)", () => {
    expect(FORMS).toHaveLength(5);
    expect(NOTELESS.map(([form]) => form)).toEqual(FORMS.map(([form]) => form));
    expect({ ...ROW_WITHOUT_NOTE, notes: PLAIN_NOTE }).toStrictEqual(exportRow(PLAIN_NOTE));
    for (const hostMode of MODES) {
      for (const [form, , carry] of FORMS) {
        const control = wholeOf(admitCarrying(hostMode, notelessOf(form)));
        const plain = wholeOf(admitCarrying(hostMode, carry(PLAIN_NOTE).carried));
        const seat = wholeOf(admitCarrying(hostMode, carry(SEAT_NOTE).carried));
        expect({ hostMode, form, plain, seat }).toEqual({ hostMode, form, plain: control, seat: control });
      }
    }
  });

  it("in each host mode, at each of the 4 listed host scenarios, the request for mechanical.development.develop.v1 of each of the 5 listed fixture forms, with the plain note or the seat note, ends as the request carrying no note under a host carrying none does, byte for byte in the whole readings of the boundary result and of each authority the dispatch callback receives (read whole: each own key and value, nested, each object's frozenness and any other prototype), with the same park and dispatch counts", async () => {
    expect(SCENARIOS).toHaveLength(4);
    for (const hostMode of MODES) {
      for (const [scenario, entry, change] of SCENARIOS) {
        const control = await endingOf(admitCarrying(hostMode, { input: PLAIN_TASK }), entry, change);
        for (const [form, , carry] of FORMS) {
          const ended = async (notes: string) => {
            const fixture = carry(notes);
            return endingOf(admitCarrying(hostMode, fixture.carried), entry, change, fixture.hostNotes);
          };
          expect({ hostMode, scenario, form, plain: await ended(PLAIN_NOTE), seat: await ended(SEAT_NOTE) }).toEqual({ hostMode, scenario, form, plain: control, seat: control });
        }
      }
    }
  });

  it("in each host mode, at each of the 4 listed decision readings, decideFunctionAuthority decides the request for mechanical.development.develop.v1 of each of the 5 listed fixture forms, with the plain note or the seat note, as it decides the request carrying no note under identities carrying none, byte for byte in the decision's whole reading", () => {
    expect(READINGS).toHaveLength(4);
    for (const hostMode of MODES) {
      for (const [entered, now] of READINGS) {
        const decide = (admission: ExecuteAdmission, hostNotes?: string) =>
          wholeOf(decideFunctionAuthority({ admission, contract: CONTRACT, entered: carrying(entered, hostNotes), current: { grants: now.grants, identity: carrying(now.identity, hostNotes) } }));
        const control = decide(admitCarrying(hostMode, { input: PLAIN_TASK }));
        for (const [form, , carry] of FORMS) {
          const decided = (notes: string) => {
            const fixture = carry(notes);
            return decide(admitCarrying(hostMode, fixture.carried), fixture.hostNotes);
          };
          expect({ hostMode, entered, now, form, plain: decided(PLAIN_NOTE), seat: decided(SEAT_NOTE) }).toEqual({ hostMode, entered, now, form, plain: control, seat: control });
        }
      }
    }
  });

  it("the 4 listed host scenarios end differently for the request carrying no note: one dispatch resting on local-operator:1000:s1 / s1, a refusal at entry as missing-execute-grant, a refusal at entry as missing-function-action-grant and a refusal at dispatch as changed-effective-identity", async () => {
    const endings = await Promise.all(SCENARIOS.map(([, entry, change]) => endingOf(admitCarrying("embedded", { input: PLAIN_TASK }), entry, change)));
    expect(new Set(endings).size).toBe(4);
    const markers = [
      ['status: "dispatched"', 'principal: "local-operator:1000:s1"', 'sessionId: "s1"', "dispatch 1"],
      ['stage: "entry"', 'policy: "missing-execute-grant"', "dispatch 0"],
      ['stage: "entry"', 'policy: "missing-function-action-grant"', "dispatch 0"],
      ['stage: "dispatch"', 'policy: "changed-effective-identity"', "dispatch 0"],
    ];
    expect(endings.map((ending, index) => markers[index]?.filter(marker => !ending.includes(marker)))).toEqual([[], [], [], []]);
  });

  const PIN_A = `sha256:${"ab".repeat(32)}`;
  const PIN_B = `sha256:${"cd".repeat(32)}`;
  /**
   * The 4 listed typed forms: a request carrying a note (or none) beside a typed field, the export row's status or a snapshot
   * pin, the field's 2 listed values, and the one own key of the admission that echoes the carrying request field.
   */
  const TYPED: readonly (readonly [string, "policy" | "inputDigest", readonly [string, string], (notes: string | undefined, typed: string) => Carried])[] = [
    ["the caller policy {bead: the export row}, its status in_progress or closed", "policy", ["in_progress", "closed"], (notes, typed) => ({ policy: { bead: { ...ROW_WITHOUT_NOTE, status: typed, ...(notes !== undefined ? { notes } : {}) } }, input: PLAIN_TASK })],
    ["the caller policy {notes: the note, pin: a snapshot pin}, the pin sha256:ab... or sha256:cd...", "policy", [PIN_A, PIN_B], (notes, typed) => ({ policy: { ...(notes !== undefined ? { notes } : {}), pin: typed }, input: PLAIN_TASK })],
    ["the caller input {the task fields, bead: the export row}, its status in_progress or closed", "inputDigest", ["in_progress", "closed"], (notes, typed) => ({ input: { ...PLAIN_TASK, bead: { ...ROW_WITHOUT_NOTE, status: typed, ...(notes !== undefined ? { notes } : {}) } } })],
    ["the caller input {the task fields, notes: the note, pin: a snapshot pin}, the pin sha256:ab... or sha256:cd...", "inputDigest", [PIN_A, PIN_B], (notes, typed) => ({ input: { ...PLAIN_TASK, ...(notes !== undefined ? { notes } : {}), pin: typed } })],
  ];

  it("in each host mode, at each of the 4 listed typed forms, the request for mechanical.development.develop.v1 carrying the seat note admits, at each of the typed field's 2 listed values, as that request carrying no note does, read whole, and the admissions at the 2 values differ in exactly the one own key that echoes the carrying request field", () => {
    expect(TYPED).toHaveLength(4);
    for (const hostMode of MODES) {
      for (const [form, echo, [first, second], build] of TYPED) {
        const noted = (typed: string) => admitCarrying(hostMode, build(SEAT_NOTE, typed)) as unknown as Record<string, unknown>;
        const atFirst = noted(first);
        const atSecond = noted(second);
        expect({ hostMode, form, atFirst: wholeOf(atFirst), atSecond: wholeOf(atSecond) }).toEqual({ hostMode, form, atFirst: wholeOf(admitCarrying(hostMode, build(undefined, first))), atSecond: wholeOf(admitCarrying(hostMode, build(undefined, second))) });
        expect({ hostMode, form, differing: Reflect.ownKeys(atFirst).map(String).filter(key => wholeOf(atFirst[key]) !== wholeOf(atSecond[key])) }).toEqual({ hostMode, form, differing: [echo] });
      }
    }
  });

  /** The 3 listed nested positions: a request carrying the note deeper, and that request carrying no note there. */
  const NESTED: readonly (readonly [string, (notes: string) => Carried, Carried])[] = [
    ["the caller input {the task fields, beads: [the export row, the export row]}", notes => ({ input: { ...PLAIN_TASK, beads: [exportRow(notes), exportRow(notes)] } }), { input: { ...PLAIN_TASK, beads: [ROW_WITHOUT_NOTE, ROW_WITHOUT_NOTE] } }],
    ["the caller policy {review: {bead: {row: the export row}}}", notes => ({ policy: { review: { bead: { row: exportRow(notes) } } }, input: PLAIN_TASK }), { policy: { review: { bead: { row: ROW_WITHOUT_NOTE } } }, input: PLAIN_TASK }],
    ["the caller policy {history: [[{notes: the note}]]}", notes => ({ policy: { history: [[{ notes }]] }, input: PLAIN_TASK }), { policy: { history: [[{}]] }, input: PLAIN_TASK }],
  ];

  it("in each host mode, decideExecute admits the request for mechanical.development.develop.v1 carrying the plain note or the seat note at each of the 3 listed nested positions as that request carrying no note there does, byte for byte read whole", () => {
    expect(NESTED).toHaveLength(3);
    for (const hostMode of MODES) {
      for (const [position, carry, noteless] of NESTED) {
        const control = wholeOf(admitCarrying(hostMode, noteless));
        expect({ hostMode, position, plain: wholeOf(admitCarrying(hostMode, carry(PLAIN_NOTE))), seat: wholeOf(admitCarrying(hostMode, carry(SEAT_NOTE))) }).toEqual({ hostMode, position, plain: control, seat: control });
      }
    }
  });

  /** A null-prototype record holding the given members, as a parser that builds records without Object.prototype returns one. */
  const nullPrototype = (members: Record<string, JsonValue>): Record<string, JsonValue> => Object.assign(Object.create(null) as Record<string, JsonValue>, members);
  /** The value that carries a request's note: its caller policy when it has one, else its caller input. */
  const carrierOf = (carried: Carried): JsonValue => carried.policy ?? carried.input;
  const shapeOf = (value: JsonValue): "an array" | "a null-prototype record" | "a plain record" | "another value" => {
    if (Array.isArray(value)) return "an array";
    if (typeof value !== "object" || value === null) return "another value";
    return Object.getPrototypeOf(value) === null ? "a null-prototype record" : "a plain record";
  };
  /**
   * The 6 further listed request forms (cut #8, refusal #7's U1): a caller input that is itself an array of two export
   * rows; the caller policy {bead: the export row} or {notes: the note}, and the caller input with either added to the task
   * fields, each a null-prototype record; and an export row five objects deep in the caller input. Each names the shape of
   * the value that carries its note, the one own key of the admission that echoes its carrying request field, the request
   * carrying the given note, and the listed request carrying no note.
   */
  const FURTHER: readonly (readonly [string, ReturnType<typeof shapeOf>, "policy" | "inputDigest", (notes: string) => Carried, Carried])[] = [
    ["the caller input [the export row, the export row], itself an array", "an array", "inputDigest", notes => ({ input: [exportRow(notes), exportRow(notes)] }), { input: [ROW_WITHOUT_NOTE, ROW_WITHOUT_NOTE] }],
    ["the caller policy {bead: the export row}, a null-prototype record", "a null-prototype record", "policy", notes => ({ policy: nullPrototype({ bead: exportRow(notes) }), input: PLAIN_TASK }), { policy: nullPrototype({ bead: ROW_WITHOUT_NOTE }), input: PLAIN_TASK }],
    ["the caller policy {notes: the note}, a null-prototype record", "a null-prototype record", "policy", notes => ({ policy: nullPrototype({ notes }), input: PLAIN_TASK }), { policy: nullPrototype({}), input: PLAIN_TASK }],
    ["the caller input {the task fields, bead: the export row}, a null-prototype record", "a null-prototype record", "inputDigest", notes => ({ input: nullPrototype({ ...PLAIN_TASK, bead: exportRow(notes) }) }), { input: nullPrototype({ ...PLAIN_TASK, bead: ROW_WITHOUT_NOTE }) }],
    ["the caller input {the task fields, notes: the note}, a null-prototype record", "a null-prototype record", "inputDigest", notes => ({ input: nullPrototype({ ...PLAIN_TASK, notes }) }), { input: nullPrototype(PLAIN_TASK) }],
    ["the caller input {the task fields, deep: {a: {b: {c: {d: the export row}}}}}, the export row five objects deep", "a plain record", "inputDigest", notes => ({ input: { ...PLAIN_TASK, deep: { a: { b: { c: { d: exportRow(notes) } } } } } }), { input: { ...PLAIN_TASK, deep: { a: { b: { c: { d: ROW_WITHOUT_NOTE } } } } } }],
  ];

  it("in each host mode, decideExecute admits the request for mechanical.development.develop.v1 of each of the 6 further listed request forms (a caller input that is itself an array of two export rows; the caller policy {bead: the export row} or {notes: the note}, and the caller input with either beside the task fields, each a null-prototype record; an export row five objects deep in the caller input) with the plain note and with the seat note, and the two admissions are byte-identical, read whole, to each other and to the admission of the form's listed request carrying no note", () => {
    expect(FURTHER).toHaveLength(6);
    for (const [form, shape, , carry, noteless] of FURTHER) {
      expect({ form, plain: shapeOf(carrierOf(carry(PLAIN_NOTE))), seat: shapeOf(carrierOf(carry(SEAT_NOTE))), noteless: shapeOf(carrierOf(noteless)) }).toEqual({ form, plain: shape, seat: shape, noteless: shape });
    }
    for (const hostMode of MODES) {
      for (const [form, , , carry, noteless] of FURTHER) {
        const control = wholeOf(admitCarrying(hostMode, noteless));
        expect({ hostMode, form, plain: wholeOf(admitCarrying(hostMode, carry(PLAIN_NOTE))), seat: wholeOf(admitCarrying(hostMode, carry(SEAT_NOTE))) }).toEqual({ hostMode, form, plain: control, seat: control });
      }
    }
  });

  it("in each host mode, the request for mechanical.development.develop.v1 of each of the 6 further listed request forms, with the plain note or the seat note, ends at each of the 4 listed host scenarios as the form's listed request carrying no note does, byte for byte in the whole readings of the boundary result and of each authority the dispatch callback receives, with the same park and dispatch counts, and is decided at each of the 4 listed decision readings as that request is, in the decision's whole reading", async () => {
    expect(FURTHER).toHaveLength(6);
    for (const hostMode of MODES) {
      for (const [form, , , carry, noteless] of FURTHER) {
        for (const [scenario, entry, change] of SCENARIOS) {
          const control = await endingOf(admitCarrying(hostMode, noteless), entry, change);
          const ended = (notes: string) => endingOf(admitCarrying(hostMode, carry(notes)), entry, change);
          expect({ hostMode, form, scenario, plain: await ended(PLAIN_NOTE), seat: await ended(SEAT_NOTE) }).toEqual({ hostMode, form, scenario, plain: control, seat: control });
        }
        for (const [entered, now] of READINGS) {
          const decide = (carried: Carried) => wholeOf(decideFunctionAuthority({ admission: admitCarrying(hostMode, carried), contract: CONTRACT, entered, current: { grants: now.grants, identity: now.identity } }));
          const control = decide(noteless);
          expect({ hostMode, form, entered, now, plain: decide(carry(PLAIN_NOTE)), seat: decide(carry(SEAT_NOTE)) }).toEqual({ hostMode, form, entered, now, plain: control, seat: control });
        }
      }
    }
  });

  it("for a script definition and for a furnace-formula definition, decideExecute admits the request of each of the 6 further listed request forms with the plain note and with the seat note, and the two admissions, read whole, still differ in exactly the one own key that echoes the carrying request field (EAT-R154's scope condition: function admission and identity only)", () => {
    expect(FURTHER).toHaveLength(6);
    for (const hostMode of MODES) {
      for (const kind of ["script", "furnace-formula"] as const) {
        for (const [form, , echo, carry] of FURTHER) {
          const admitted = (notes: string) => {
            const decision = decideCarrying(hostMode, carry(notes), kind);
            if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
            return decision.admission as unknown as Record<string, unknown>;
          };
          const plain = admitted(PLAIN_NOTE);
          const seat = admitted(SEAT_NOTE);
          expect({ hostMode, kind, form, differing: Reflect.ownKeys(plain).map(String).filter(key => wholeOf(plain[key]) !== wholeOf(seat[key])) }).toEqual({ hostMode, kind, form, differing: [echo] });
        }
      }
    }
  });

  /** The seat note followed by filler letters, long enough to carry its request past the listed byte bound. */
  const longNote = (filler: number) => `${SEAT_NOTE}\n${"x".repeat(filler)}`;
  /** The 3 listed bound-crossing notes: the request, that request with the plain note, and the refusal a script definition's request gets. */
  const BOUNDS: readonly (readonly [string, Carried, Carried, string])[] = [
    ["the caller policy {notes: the note} past the policy's 4096-byte bound", { policy: { notes: longNote(4096) }, input: PLAIN_TASK }, { policy: { notes: PLAIN_NOTE }, input: PLAIN_TASK }, "malformed-policy"],
    ["the caller input {the task fields, notes: the note} past the input's 64 KiB bound", { input: { ...PLAIN_TASK, notes: longNote(64 * 1024) } }, { input: { ...PLAIN_TASK, notes: PLAIN_NOTE } }, "malformed-request"],
    ["the caller input {the task fields, notes: the note} past canonicalJson's 1 MiB bound", { input: { ...PLAIN_TASK, notes: longNote(1024 * 1024) } }, { input: { ...PLAIN_TASK, notes: PLAIN_NOTE } }, "malformed-request"],
  ];

  it("in each host mode, each of the 3 listed notes long enough to carry its request past a byte bound (the policy's 4096 bytes, the input's 64 KiB, canonicalJson's 1 MiB) leaves decideExecute's decision for mechanical.development.develop.v1 byte-identical, read whole, to that request's with the plain note, an admission, while the same request for a script definition refuses as the listed malformed policy", () => {
    expect(BOUNDS).toHaveLength(3);
    for (const hostMode of MODES) {
      for (const [bound, long, plain, scriptRefusal] of BOUNDS) {
        const control = decideCarrying(hostMode, plain, "function");
        expect({ hostMode, bound, control: control.decision }).toEqual({ hostMode, bound, control: "admitted" });
        expect({ hostMode, bound, decision: wholeOf(decideCarrying(hostMode, long, "function")) }).toEqual({ hostMode, bound, decision: wholeOf(control) });
        const script = decideCarrying(hostMode, long, "script");
        expect({ hostMode, bound, script: script.decision === "refused" ? script.policy : script.decision }).toEqual({ hostMode, bound, script: scriptRefusal });
      }
    }
  }, 60_000);

  it("in each host mode, a note member holding a getter, in the caller policy or beside the task fields of the caller input, is never invoked, and the request for mechanical.development.develop.v1 is decided as that request carrying no note is, read whole; so is the request whose note member holds NaN, a value canonicalJson refuses", () => {
    let invoked = 0;
    const withGetter = (record: Record<string, JsonValue>): Record<string, JsonValue> =>
      Object.defineProperty({ ...record }, "notes", {
        enumerable: true,
        get: () => {
          invoked += 1;
          return SEAT_NOTE;
        },
      });
    const UNREAD: readonly (readonly [string, Carried, Carried])[] = [
      ["a getter in the caller policy", { policy: withGetter({}), input: PLAIN_TASK }, { policy: {}, input: PLAIN_TASK }],
      ["a getter beside the task fields of the caller input", { input: withGetter(PLAIN_TASK) }, { input: PLAIN_TASK }],
      ["NaN in the caller policy", { policy: { notes: Number.NaN }, input: PLAIN_TASK }, { policy: {}, input: PLAIN_TASK }],
      ["NaN beside the task fields of the caller input", { input: { ...PLAIN_TASK, notes: Number.NaN } }, { input: PLAIN_TASK }],
    ];
    for (const hostMode of MODES) {
      for (const [member, carried, noteless] of UNREAD) {
        const control = decideCarrying(hostMode, noteless, "function");
        expect({ hostMode, member, control: control.decision }).toEqual({ hostMode, member, control: "admitted" });
        expect({ hostMode, member, decision: wholeOf(decideCarrying(hostMode, carried, "function")) }).toEqual({ hostMode, member, decision: wholeOf(control) });
      }
    }
    expect(invoked).toBe(0);
  });

  it("an admission handed to the boundary with a caller policy carrying a note (the admission of the request carrying no note, its policy set to {notes: the note} or {bead: the export row}, as a host that bypassed decideExecute would hand it), with the plain note or the seat note, ends at each of the 4 listed host scenarios, and is decided at each of the 4 listed decision readings, as that admission without a policy does, read whole", async () => {
    for (const hostMode of MODES) {
      const base = admitCarrying(hostMode, { input: PLAIN_TASK });
      const handed: ExecuteAdmission[] = [PLAIN_NOTE, SEAT_NOTE].flatMap(notes => {
        const policies: JsonValue[] = [{ notes }, { bead: exportRow(notes) }];
        return policies.map(policy => Object.freeze({ ...base, policy }));
      });
      expect(handed).toHaveLength(4);
      for (const [scenario, entry, change] of SCENARIOS) {
        const control = await endingOf(base, entry, change);
        for (const [index, admission] of handed.entries()) expect({ hostMode, scenario, index, ending: await endingOf(admission, entry, change) }).toEqual({ hostMode, scenario, index, ending: control });
      }
      for (const [entered, now] of READINGS) {
        const decide = (admission: ExecuteAdmission) => wholeOf(decideFunctionAuthority({ admission, contract: CONTRACT, entered, current: { grants: now.grants, identity: now.identity } }));
        const control = decide(base);
        for (const [index, admission] of handed.entries()) expect({ hostMode, entered, now, index, decision: decide(admission) }).toEqual({ hostMode, entered, now, index, decision: control });
      }
    }
  });

  it("for a script definition and for a furnace-formula definition, decideExecute admits the request of each of the 4 listed request-carried fixture forms with the plain note and with the seat note, and the two admissions, read whole, still differ in exactly the one own key that echoes the carrying request field (EAT-R154's scope condition: function admission and identity only)", () => {
    const carriedForms = FORMS.filter(([, echo]) => echo !== "none");
    expect(carriedForms).toHaveLength(4);
    for (const hostMode of MODES) {
      for (const kind of ["script", "furnace-formula"] as const) {
        for (const [form, echo, carry] of carriedForms) {
          const admitted = (notes: string) => {
            const decision = decideCarrying(hostMode, carry(notes).carried, kind);
            if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
            return decision.admission as unknown as Record<string, unknown>;
          };
          const plain = admitted(PLAIN_NOTE);
          const seat = admitted(SEAT_NOTE);
          expect({ hostMode, kind, form, differing: Reflect.ownKeys(plain).map(String).filter(key => wholeOf(plain[key]) !== wholeOf(seat[key])) }).toEqual({ hostMode, kind, form, differing: [echo] });
        }
      }
    }
  });

  /** The repository root, from this suite's own location. */
  const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  /** The 4 listed Beads note reader forms, each with the planted reader it must match. */
  const READER_FORMS: readonly (readonly [string, RegExp, string])[] = [
    ["a .beads path segment", /\.beads(?=[/\\"'`])/, 'readFileSync(join(root, ".beads", "issues.jsonl"), "utf8")'],
    ["the export file name issues.jsonl", /issues\.jsonl/, 'readFileSync("issues.jsonl", "utf8")'],
    ["a bd command literal", /(["'`])bd(?:\1|\s)/, 'spawnSync("bd", ["show", id, "--json"])'],
    ["a notes field read", /\.notes\b|(["'`])notes\1/, 'own(row, "notes")'],
  ];
  /** The census table: each judged file and the reader forms judged in it. */
  const CENSUS: readonly { readonly file: string; readonly forms: readonly (readonly [string, RegExp, string])[] }[] = [
    { file: "src/workbench/execute.ts", forms: READER_FORMS },
    { file: "src/workbench/function-authority.ts", forms: READER_FORMS },
    { file: "src/workbench/hosts/furnace-hosted.ts", forms: READER_FORMS },
    { file: "src/workbench/hosts/local-detached.ts", forms: READER_FORMS },
  ];
  /**
   * The judged file set, from outside the census table: the src/workbench modules this suite imports that export a decide or
   * dispatch function (the admission modules), and each .ts file the src/workbench/hosts directory lists.
   */
  function judgedFiles(): string[] {
    const suite = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const imported = [...suite.matchAll(/from "\.\.\/(src\/workbench\/[a-z-]+)\.js"/g)].map(match => `${match[1]}.ts`);
    const admission = imported.filter(file => /^export (?:async )?function (?:decide|dispatch)[A-Z]\w*\(/m.test(readFileSync(join(ROOT, file), "utf8")));
    const hosts = readdirSync(join(ROOT, "src/workbench/hosts"))
      .filter(name => name.endsWith(".ts"))
      .map(name => `src/workbench/hosts/${name}`);
    return [...new Set([...admission, ...hosts])].sort();
  }

  it("the census table's frozen shape: 4 judged files, each judged against the 4 listed reader forms, and the judged files are the src/workbench modules this suite imports that export a decide or dispatch function (the admission modules) and the .ts files the src/workbench/hosts directory lists", () => {
    expect(CENSUS.map(row => `${row.file}:${row.forms.length}`)).toEqual(["src/workbench/execute.ts:4", "src/workbench/function-authority.ts:4", "src/workbench/hosts/furnace-hosted.ts:4", "src/workbench/hosts/local-detached.ts:4"]);
    expect(READER_FORMS.map(([label]) => label)).toEqual(["a .beads path segment", "the export file name issues.jsonl", "a bd command literal", "a notes field read"]);
    expect(CENSUS.map(row => row.file)).toEqual(judgedFiles());
  });

  it("each listed reader form matches its planted reader, and none matches the listed typed-identifier texts (record.beads_run_id, receipt.beadsRunId) or the listed local notes-list text (const notes = [...baseNotes]; notes.push)", () => {
    expect(READER_FORMS.map(([label, form, planted]) => [label, form.test(planted)])).toEqual(READER_FORMS.map(([label]) => [label, true]));
    for (const typed of ["record.beads_run_id", "receipt.beadsRunId", "const notes = [...baseNotes]; notes.push"]) {
      expect({ typed, matched: READER_FORMS.filter(([, form]) => form.test(typed)).map(([label]) => label) }).toEqual({ typed, matched: [] });
    }
  });

  it("the static census: the text (comments included) of each judged file holds none of the 4 listed Beads note reader forms", () => {
    for (const row of CENSUS) {
      const text = readFileSync(join(ROOT, row.file), "utf8");
      expect({ file: row.file, found: row.forms.filter(([, form]) => form.test(text)).map(([label]) => label) }).toEqual({ file: row.file, found: [] });
    }
  });

  it("identity.ts, from which execute.ts imports withoutBeadsNotes, holds the Beads note field's name as a quoted literal exactly once, no notes member access, and none of the other 3 listed reader forms", () => {
    const text = readFileSync(join(ROOT, "src/workbench/identity.ts"), "utf8");
    expect([...text.matchAll(/(["'`])notes\1/g)].map(match => match[0])).toEqual(['"notes"']);
    expect(/\.notes\b/.test(text)).toBe(false);
    const others = READER_FORMS.filter(([label]) => label !== "a notes field read");
    expect(others).toHaveLength(3);
    expect(others.filter(([, form]) => form.test(text)).map(([label]) => label)).toEqual([]);
    expect(readFileSync(join(ROOT, "src/workbench/execute.ts"), "utf8")).toMatch(/^import \{[^}]*\bwithoutBeadsNotes\b[^}]*\} from "\.\/identity\.js";$/m);
  });
});

describe("the landing-1019 contact (wb-wupg): the host grant read takes the 4 listed Claude tool rights as known permission data, and adoption takes none of them as an action grant (wb-201v)", () => {
  /** The exact Claude tool rights test/workbench-claude-tool-grants.test.ts lists as TOOL_GRANTS. */
  const TOOL_RIGHTS: readonly string[] = ["claude:tool:Read", "claude:tool:mcp__docs__search", "claude:tool:mcp__docs-v2__search", `claude:tool:${"T".repeat(64)}`];

  it("held beside workbench:execute and the action, each of the 4 listed Claude tool rights leaves the decision for the request for mechanical.development.develop.v1 the authorization it is without one, read whole", () => {
    const decide = (grants: readonly string[]) => wholeOf(decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants, identity: HOST } }));
    const control = decide([EXECUTE_GRANT, ACTION]);
    expect(control.startsWith('frozen object { decision: "authorized"')).toBe(true);
    for (const right of TOOL_RIGHTS) expect({ right, decision: decide([EXECUTE_GRANT, ACTION, right]) }).toEqual({ right, decision: control });
  });

  it("adoption refuses each of the 4 listed Claude tool rights as an action grant: not representable", () => {
    for (const right of TOOL_RIGHTS) expect({ right, adoptable: adoptable(right) }).toEqual({ right, adoptable: false });
  });
});
