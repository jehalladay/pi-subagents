/**
 * wb-qg19 ([DX P07] EAT-R346..R348): the Furnace observe -> control path through the REGISTERED tools.
 *
 * PINNED READER SET (each case by this file and its case id, its assertion target, and the independent falsifier that reds it).
 * The booted rows (B*) boot the real extension (src/index.ts default export) through test/helpers/boot-extension.ts with the
 * claude backend and drive the served furnace_observe and workflow_control executes; the only injected boundary is the
 * process one: a fake `furnace` CLI first on PATH (written here into a test/helpers/scratch.ts directory) that answers each
 * command the vendored @furnace/sdk client spawns with a canned document and logs the command it was handed. The
 * constructor rows (C*) drive createWorkflowControlTool, the constructor src/index.ts registers, with the production adapter
 * executeFurnaceControl in a leg written as src/index.ts writes its furnace leg, over a projection seeded here, for the
 * refusals the booted tool cannot reach (named below).
 * - B1 (EAT-R346 c1): before any observe the booted workflow_control denies a Run stop cross-scope; after one furnace_observe
 *   of a Run with one Attempt it denies an Attempt stop no-confirmed-ownership (the Attempt node is in the booted projection)
 *   and permits the Run stop on the Run -> Attempt ownership edge the Attempt page confirmed (the requested receipt's
 *   ownershipConfirmationRef is that page's request id). Falsifier: furnace_observe refreshing the Run snapshot only (the
 *   trunk ce180d82 body) denies the Run stop no-confirmed-ownership and the Attempt stop cross-scope.
 * - B2 (EAT-R346 c2): the permitted Run stop sends exactly one `run stop` for the Run under the decision's request id, with no
 *   projection seeding; an observer-only grant set and a foreign target scope are denied and send zero stop commands.
 *   Falsifier: the same topology drop (no permit, zero stop commands on the authorized path).
 * - B3 (EAT-R346 c3, the fixture leg): furnace_observe alone sends only the three read commands (run status, attempt list,
 *   logs) and no control command. Falsifier: any control word in the fake's command log.
 * - B4 (EAT-R347 c1, the booted leg): a Run stop whose signal is aborted before the call reaches the model as error code
 *   aborted-before-issue (category transport) and sends zero stop commands. Falsifier: FurnaceControlRefusal without its own
 *   code (the trunk class) collapses it to executor-refused.
 * - B5 (EAT-R348 c1 and c2): a Run stop the fake answers with a run_not_found failure, a foreign Run id, a non-terminal state
 *   or another request id reaches the model with status uncertain and reply.control.uncertainty.reason exactly seam-failure,
 *   no-target-echo, no-terminal-echo and unattributable-answer, the failure label {command_error, run_not_found} for the first
 *   and the native echo (kind, request id, id, state) for the other three, never a result phase, never a result block,
 *   completionBasis not-established, and one stop command each. Falsifier: the leg forwarding {receipt, status} only (trunk).
 * - B6 (EAT-R348 c1): a Run stop aborted after the verb was issued reads wait-aborted, and one the fake never answers inside
 *   the leg's 10 s bound reads wait-timeout, each with status uncertain and no result phase. Falsifier: as B5.
 * - B7 (EAT-R348 c2, the contrast): a Run stop the fake answers stopped with a native instant settles: status settled, result
 *   phase, the echo kept and no uncertainty member. Falsifier: an uncertainty member on a settled reply, or a settled reply
 *   relabeled uncertain.
 * - B8 (EAT-R346 c1, two Attempts; wb-qg19 refusal #1 U2): after one furnace_observe of a Run whose Attempt page returns two
 *   Attempts, each of the two is a node of the booted projection that owns nothing: both Attempt stops are denied
 *   no-confirmed-ownership, never cross-scope. Falsifier: a refresh loop handed less than the topology's whole snapshot list
 *   (the gate's member G1, topology.snapshots.slice(0, 2)) leaves the second Attempt unobserved, so its stop is denied
 *   cross-scope. Its reply also passes the reading-reply pins (below).
 * - B9 (EAT-R346 beside the trunk reply; wb-qg19 refusal #1 U1): for each of two readings whose topology cannot be taken, an
 *   Attempt page whose request id is the empty string (the vendored SDK accepts any string request id, and the observer
 *   cannot confirm Run ownership from it) and an Attempt id of 308 code units (past the projection's 256-unit id bound),
 *   furnace_observe still replies with the sanitized reading (its contract furnace.external-observation/v1 and its Run id),
 *   the Run is a node of the booted projection that owns nothing (a Run stop is denied no-confirmed-ownership, never
 *   cross-scope) and no stop command is sent. Falsifier: the topology and both loops inside the data reply's try with no
 *   fallback (cut #1 883d4339) answer both readings with the catch reply instead of the reading; and (refusal #4 U1, cured
 *   by code) a catch that answers with a reading-shaped text built without the reading (the gate's member G77-A) fails the
 *   reading-reply pins (below).
 * - B10 (the same reply, zero-width readings): an Attempt page whose request id carries a zero-width space, and an Attempt
 *   whose id carries one, still get the sanitized reading as the reply, with no zero-width unit left in its text.
 *   Falsifier: a reply that is not the reading passed through sanitizeWorkbenchJsonText (an unsanitized JSON.stringify
 *   keeps the unit; the catch reply carries no contract; a reading-shaped text fails the reading-reply pins below).
 * - B11 (EAT-R346 beside the trunk reply; wb-qg19 refusal #3 U1): an Attempt page whose request id carries U+0001, a C0
 *   control the projection's text rule refuses in an ownership confirmation (the row's premise, asserted first on a bare
 *   ObservationProjection), still gets the sanitized reading as the reply (its contract and Run id, and the page request id it
 *   carries at source.requestIds.attempts is a string without that unit); the Attempt is a node of the booted projection that
 *   owns nothing (its stop is denied no-confirmed-ownership, never cross-scope), the Run owns nothing (its stop is denied
 *   no-confirmed-ownership) and no stop command is sent. Falsifier: a catch that rethrows a refused ownership edge (the gate's
 *   member G-B) answers with the catch reply instead of the reading, and a reply on that path that skips the sanitizer
 *   (JSON.stringify of the reading) keeps the unit in that page request id. Pinned beside it (refusal #4 U1, cured by
 *   code): the reading-reply pins (below), and the page request id the reply carries is the page's own request id as
 *   sanitizeWorkbenchJsonText answers it (a reading-shaped text built without the reading, the gate's member G77-A, carries
 *   its own constant there).
 * - B12 (EAT-R346 beside the trunk reply; wb-qg19 refusal #3 U2): a Run whose Attempt page returns two Attempts, the second
 *   with an id of 308 code units, still gets the sanitized reading as the reply; the first Attempt is a node of the booted
 *   projection that owns nothing (its stop is denied no-confirmed-ownership, never cross-scope), the Run owns nothing (its
 *   stop is denied no-confirmed-ownership) and no stop command is sent. Falsifier: a topology checked whole before its first
 *   write (the gate's member G-A throws before any write when one snapshot id is past 256 code units) leaves the first
 *   Attempt unobserved, so its stop is denied cross-scope; and (refusal #4 U1, cured by code) the gate's member G77-A fails
 *   the reading-reply pins (below).
 * - The reading-reply pins (B8 to B12; wb-qg19 refusal #4 U1, cured by code under the frozen words, M:78735): the assertion
 *   targets those rows' "the reply is the reading" and "the sanitized reading" words are pinned to. (1) The reply carries
 *   contract furnace.external-observation/v1 and source.runId, and the fields only a reading of the fake's pages carries:
 *   source.beadsRunId bd-qg19 and run.state active from the run status page, and attempts.returned equal to the Attempts the
 *   page returns. (2) Its capturedAt, observedAt and lastConfirmedAt are one ISO instant (the Date#toISOString form), taken
 *   between the call's start and its end. (3) The reply text is byte-equal to sanitizeWorkbenchJsonText of the reading a
 *   FurnaceObserver (src/workbench/furnace-observer.ts) built here takes of the same fake pages through the vendored SDK
 *   client, with the reply's own three instants written over that reference reading's. (4) The call sent the fake one read -
 *   run status, attempt list and logs, once each - so the reply comes from that read and no second one. Falsifiers: (1) a
 *   reading-shaped text built from the contract and the tool's own runId parameter (the gate's member G77-A: red in B9 and
 *   B12 at this pin, and in B11 at its page request id pin before it); (2) an instant that is not the call's; (3) any other
 *   field, member order or sanitizer output that differs from the reading's sanitized text; (4) a catch that reads the Run
 *   again for its reply.
 * - C1 (EAT-R347 c1, the constructor leg): unsupported-verb, invalid-target, foreign-workspace, permit-consumed and
 *   aborted-before-issue each reach the reply as their own exact error code with the adapter's category, and none sends a
 *   native call beyond the first issue of the consumed permit. Falsifier: the trunk class (executor-refused for all five).
 * - C2 (EAT-R347 c2; wb-qg19 refusal #3 U3): an invalid target whose id carries caller text, a credential-shaped fake and a
 *   stack-shaped frame reaches the reply as exactly invalid-target, the code holds none of that text and the message is the
 *   adapter's fixed text; every member of the exported closed vocabulary FURNACE_CONTROL_REFUSAL_CODES, constructed at
 *   category validation with message "m" and no policy, is its refusal's own code and the list this file expects is that
 *   vocabulary. Each value C2 lists outside it, constructed the same way, has an own `code` descriptor whose value is
 *   undefined (C2 reads that field; control-tool.ts:255 reads the same field), and a refusal with it reaches
 *   the reply as executor-refused (at the other categories and the deny policies, C6 and C7 read both only in their string
 *   forms: refusal #6 U1, narrowed under R-B812): the OUTSIDE values below (caller
 *   text, near-miss spellings of a member in
 *   letter case, a leading or trailing space and an underscore, the empty string, the core's codes executor-refused,
 *   cross-scope and no-confirmed-ownership, and an object whose string form is a member) and every own key of
 *   Object.prototype as the runtime lists it (toString, constructor, hasOwnProperty, __proto__ and valueOf among them).
 *   Falsifier: a code copied from caller text, a vocabulary drift between src and this file, or a membership test that reads
 *   the prototype chain (the gate's member G-F, `value in REFUSAL_CODES`), folds letter case, trims spaces or drops the
 *   string check.
 * - C3 (EAT-R348, the bound): an adapter summary whose echo and uncertainty strings are hostile and oversized keeps the whole
 *   reply within 8192 bytes, each echo string within 128 and each uncertainty label within 64 code units, with the fake
 *   credential redacted and no unsafe unit left. Falsifier: an unbounded or unsanitized fold of the adapter readings.
 * - C4 (EAT-R347's boundary; wb-qg19 refusal #1 U3, refusal #6 F2): the claude-agent-sdk leg as src/index.ts writes it, over
 *   a seam bound to another session, and the production forge leg (createRetainedForgeControlExecutor) over a retained
 *   operation each raise a typed refusal, a ClaudeControlRefusal and a ForgeControlRefusal, with no own `code` property -
 *   the row records each thrown refusal's class and its own code descriptor, none for both - and the reply's code is
 *   executor-refused for both: those two refusals do not carry the own code this file's Furnace refusal carries. Which
 *   refusal kind each raises, and other refusals of those two adapters, are NOT CLAIMED by this file. Falsifier: an own
 *   code on either refusal class, of
 *   any value (the descriptor then reads it, a string one reaches the reply too, and this row and the furnace-control.ts
 *   comment move together).
 * - C5 (EAT-R347 c1, every member at category validation; refusal #4 U2's named member G77-B, cured by code): each member of
 *   the closed vocabulary (this file's CODES, which C2 holds equal to FURNACE_CONTROL_REFUSAL_CODES), thrown as a
 *   FurnaceControlRefusal of category validation with message "m" and no policy by a leg through the registered constructor,
 *   reaches the reply with ok false, that member as its error code and category validation. Its category is validation only:
 *   the other categories, the deny policies and the adapter's own refusals are C6 to C9's. Falsifier: control-tool.ts's
 *   executor catch answering any one own code as executor-refused (the gate's member G77-B drops invalid-deps; the seat
 *   dropped each of the eight in turn).
 * - C6 (EAT-R347 c2, the class at every category; wb-qg19 refusal #5 U1; refusal #6 U1, narrowed under R-B812): the grid of
 *   constructions - each member of CODES and each value C2 lists outside the vocabulary (OUTSIDE, then every own key of
 *   Object.prototype as the runtime lists it), each at each of the five CapabilityErrorCategory values (CATEGORY_SET, a
 *   Record over src's type) with no policy and with each of the eight ControlDenyPolicy values (DENY_POLICY_SET, the same
 *   over src's type), all with message "m": String() of each construction's own `code` descriptor value (undefined without
 *   one) is the member itself, or "undefined" for each listed outside value, the grid's shape (5 categories, 8 policies, 45
 *   constructions of each value) asserted first. Falsifiers: the gate's member G133-B3 (FurnaceControlRefusal
 *   leaves the code undefined for denied-decision at category authorization) and the seat's members M6-CAT-UE, M6-CAT-UN,
 *   M6-POLICY, M6-POLICY-NCO and M6-OUTSIDE-AUTHZ (the delivery note's battery).
 * - C7 (EAT-R347 c1, the reply at every category; wb-qg19 refusal #5 U1; refusal #6 U1, narrowed under R-B812): each of C6's
 *   constructions, thrown by a leg through one registered constructor over RUN_TARGET (a call id per construction), reaches
 *   a reply whose ok, error code and error category, read in their string forms (one template text per construction), are
 *   false, the member itself or executor-refused for a listed outside value, and the construction's category. Falsifiers:
 *   the gate's members G133-B1 (the executor catch answers denied-decision at category
 *   authorization as executor-refused) and G133-B2 (it answers any own code of a refusal carrying a string policy as
 *   executor-refused), and the seat's members M7-CAT-UE, M7-CAT-UN, M7-POLICY-OC and M7-OUTSIDE-AUTHZ.
 * - C8 (EAT-R347 c1, the production denial at both levels; wb-qg19 refusal #5 U1, the shapes of the gate witness W133): for
 *   each ControlDenyPolicy, a leg through the registered constructor has decideControl deny the permitted request it is
 *   handed with that policy (the request change DENIALS names; the premise asserted: the core's denial carries that policy
 *   and DENIALS' category - authorization for unknown-permission-data, observer-only, missing-exact-grant, cross-scope and
 *   no-confirmed-ownership, validation for malformed-request, unknown-action and operator-confirmation), hands that denial
 *   to executeFurnaceControl and records the refusal it raises: its own code is denied-decision and its category the
 *   core's; the reply carries ok false, denied-decision and that category, and no native call is sent. Falsifiers: G133-B1
 *   and G133-B3 (each reds the five authorization rows), G133-B2 (every row) and the seat's members M8-DENY-CAT and
 *   M8-DENY-CODE.
 * - C9 (EAT-R347 c1, the adapter's other unminted and dependency refusals): a leg through the registered constructor hands
 *   executeFurnaceControl, row by row, a frozen hand-built denial whose category and policy are caller text, a frozen copy
 *   of the permit it was handed, a frozen copy of that permit after issuing the permit itself once, and the permit with a
 *   zero timeout: the adapter raises denied-decision at category authorization, then unvetted-decision, permit-consumed and
 *   invalid-deps at category validation, each as its refusal's own code, and each reply carries ok false, that code and that
 *   category; only the issued permit sends a native call (one). Falsifiers: the seat's members M9-LOOKALIKE-CAT,
 *   M9-CONSUMED and M9-DEPS-CAT.
 *
 * NOT CLAIMED (scope sentences; no residual semantics, no follow-up bead): the V6 legs of EAT-R346 and EAT-R348 (a real
 * Furnace Run and Attempt, native runs.get, the native store byte oracle, control-live uncertain receipt rows) are NOT CLAIMED
 * by this file - it runs no real furnace. Through the booted tool, unsupported-verb, invalid-target, foreign-workspace and
 * permit-consumed are NOT CLAIMED by this file's booted rows: the core admits only `stop` for furnace, an Attempt node has no
 * outgoing ownership edge, furnace_observe admits only frn-run-* Run ids observed in the session workspace and every call
 * mints a fresh permit, so the booted tool reaches none of them (C1 pins them through the constructor). Through the booted
 * tool, denied-decision, unvetted-decision and invalid-deps are NOT CLAIMED by this file's booted rows either (C5 to C9 read
 * each through the registered constructor). Beyond the adapter's own refusals that C1, C2, C8, C9 and B4 read, a
 * FurnaceControlRefusal constructed with another message than C6's or with a policy outside the ControlDenyPolicy
 * vocabulary, and one thrown over another target or call than C5's and C7's, are NOT CLAIMED by this file; the status,
 * invoked and message members of C5 to C9's replies and the policy and message of the refusals C8 and C9 record are NOT
 * CLAIMED by this file, and an adapter refusal that C1, C2, C8, C9 and B4 do not raise is NOT CLAIMED by this file. Whether
 * a refusal
 * reports invoked false (EAT-R335) and the furnace_observe reply dialect (EAT-R349, wb-752.13) are NOT CLAIMED by this file:
 * B8 to B12 read only that the reply is the sanitized reading (the reading-reply pins (1) to (4) above and, for B10, no
 * zero-width unit; for B11, its page request id without the C0 unit, as the sanitizer answers it), so what the reading itself
 * holds beyond the fields pin (1) names is NOT CLAIMED by this file (pin (3)'s reference is src's own FurnaceObserver); pin
 * (2) reads the reply's instants only as one instant taken during the call, so that it is the very instant the observer
 * stamped on the reading, rather than another one taken during the same call, is NOT CLAIMED by this file; pin (3) reads the
 * reply's text, so which call path produced a text byte-equal to the sanitizer's answer is NOT CLAIMED by this file;
 * and the reply to any reading those rows and B1-B8 do not observe is NOT CLAIMED by this file. Which topology writes stand
 * when a later one is refused is NOT CLAIMED by this file beyond B11's Attempt and B12's first Attempt, and a value outside
 * the closed vocabulary that C2 does not list is NOT CLAIMED by this file. Beyond C2's and C5's exact readings at category
 * validation with no policy, the exact own code values of C6's constructions and the exact ok, code and category values of
 * their C7 replies are NOT CLAIMED by this file: C6 and C7 read them only in their string forms (refusal #6 U1, R-B812). A
 * Run whose Attempt page
 * returns more than two Attempts is NOT CLAIMED by this file's booted rows (the census
 * test/workbench-furnace-world-model-preservation-census.test.ts S1 pins the two loops' statements whole).
 * receipt-refused and the live tier's mirror executor (test/workbench-furnace-control-live.test.ts) are NOT CLAIMED by this file.
 *
 * RESIDUALS (rule-14 enumerate-the-resolvable form, cut #7; shape frozen at refusal #2, second-stage cap M:78735, guard
 * R-B805 on the furnace-control.ts own-code words, structural exit R-B812): none known within the claims above. Refusal #4's
 * two members are cured by code - G77-A by the reading-reply pins, G77-B by C5 - and refusal #5's U1 by code: the gate's
 * G133-B3 reds C6, C7 and C8, its G133-B1 and its unrun G133-B2 red C7 and C8. Refusal #6's U1 and F2 are cured by
 * narrowing under R-B812: the furnace-control.ts own-code words and C2, C4, C6 and C7 here claim no more than C6's and C7's
 * string forms, C4's records and C2's undefined-valued own `code` descriptor read hold, and the furnace_observe comment (src/index.ts) claims the reply only as the
 * reading-reply pins hold it; stronger words are the structural-exit child wb-s8lt's. The sanitized-reading words of this
 * file stand at the guard text (M:78415); every mode outside the pinned rows is one of the NOT CLAIMED scope sentences above.
 */
import { chmodSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import { type CallOptions, Furnace } from "@furnace/sdk";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import type { CapabilityErrorCategory } from "../src/workbench/capability-registry.js";
import { executeClaudeControl } from "../src/workbench/claude-control.js";
import { type ControlDecision, type ControlDenyPolicy, decideControl, type NativeControlRequest } from "../src/workbench/control.js";
import { type ControlExecutionSummary, type ControlExecutor, createWorkflowControlTool } from "../src/workbench/control-tool.js";
import { createRetainedForgeControlExecutor, releaseForgeOperation, retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import {
  executeFurnaceControl,
  FURNACE_CONTROL_REFUSAL_CODES,
  type FurnaceControlClient,
  type FurnaceControlDeps,
  FurnaceControlRefusal,
  type FurnaceControlRefusalCode,
} from "../src/workbench/furnace-control.js";
import { FurnaceObserver } from "../src/workbench/furnace-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const RUN = "frn-run-qg19fx";
const ATTEMPT = "frn-atm-qg19fx1";
const ATTEMPT_2 = "frn-atm-qg19fx2";
/** An Attempt id of 308 code units: past the projection's 256-unit id bound (src/workbench/observation.ts assertRef). */
const LONG_ATTEMPT = `frn-atm-${"a".repeat(300)}`;
const ZWSP = String.fromCodePoint(0x200b);
/** U+0001, a C0 control: the projection's text rule refuses it in an ownership confirmation (src/workbench/observation.ts). */
const C0 = String.fromCodePoint(0x1);
/** The reading's contract (src/workbench/furnace-observer.ts FURNACE_EXTERNAL_OBSERVATION_CONTRACT). */
const CONTRACT = "furnace.external-observation/v1";
const ATTEMPTS_REQUEST = "pi-qg19-attempts";
const GRANTS = ["furnace:inspect", "control:furnace.stop"] as const;
const PLACEHOLDER = "__REQUEST_ID__";
const BOOTED_MS = 60_000;
const TIMEOUT_ROW_MS = 90_000;
/** The fixed adapter texts the replies carry (src/workbench/furnace-control.ts). */
const INVALID_TARGET_TEXT = "Furnace control target is not a native Furnace identifier.";
/** The closed refusal vocabulary this file expects; C2 holds it equal to the exported one. */
const CODES: readonly FurnaceControlRefusalCode[] = [
  "denied-decision", "unvetted-decision", "permit-consumed", "unsupported-verb", "invalid-target", "invalid-deps", "foreign-workspace", "aborted-before-issue",
];
/** C2's values outside that vocabulary; C2 adds every own key of Object.prototype as the runtime lists it. */
const OUTSIDE: readonly unknown[] = [
  "caller text at Object.<anonymous>", "INVALID-TARGET", " invalid-target", "invalid-target ", "invalid_target", "", "executor-refused", "cross-scope",
  "no-confirmed-ownership", { toString: () => "invalid-target" },
];
/** Every CapabilityErrorCategory (src/workbench/capability-registry.ts): the Record type refuses a missing and an extra key alike. */
const CATEGORY_SET: Readonly<Record<CapabilityErrorCategory, true>> = { validation: true, authorization: true, unavailable: true, transport: true, "uncertain-effect": true };
const CATEGORIES = Object.keys(CATEGORY_SET) as CapabilityErrorCategory[];
/** Every ControlDenyPolicy (src/workbench/control.ts), complete the same way, in the core's rule order. */
const DENY_POLICY_SET: Readonly<Record<ControlDenyPolicy, true>> = {
  "unknown-permission-data": true, "observer-only": true, "malformed-request": true, "unknown-action": true, "missing-exact-grant": true, "cross-scope": true,
  "no-confirmed-ownership": true, "operator-confirmation": true,
};
const DENY_POLICIES = Object.keys(DENY_POLICY_SET) as ControlDenyPolicy[];

interface Reply {
  ok: boolean;
  invoked: boolean;
  status: string;
  completion?: string;
  control?: {
    phase?: string;
    completionBasis?: string;
    requested?: { requestId?: string; ownershipConfirmationRef?: string };
    result?: unknown;
    uncertainty?: { reason?: string; failure?: { kind?: string; code?: string } };
    echo?: { kind?: string; requestId?: string; id?: string; state?: string };
  };
  error?: { code: string; category?: string; message?: string };
}
type Echo = NonNullable<NonNullable<Reply["control"]>["echo"]>;
interface ServedTool {
  execute(id: string, params: Record<string, unknown>, signal: AbortSignal | undefined, onUpdate: undefined, context: unknown): Promise<unknown>;
}
const isServedTool = (value: unknown): value is ServedTool => typeof value === "object" && value !== null && typeof Reflect.get(value, "execute") === "function";
const isHandler = (value: unknown): value is (event: unknown, context: unknown) => unknown => typeof value === "function";
function textOf(result: unknown): string {
  const content: unknown = typeof result === "object" && result !== null ? Reflect.get(result, "content") : undefined;
  const first: unknown = Array.isArray(content) ? content[0] : undefined;
  const text: unknown = typeof first === "object" && first !== null ? Reflect.get(first, "text") : undefined;
  if (typeof text !== "string") throw new Error("the tool result carries no text item");
  return text;
}
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
/** A furnace_observe reply read as a reading: its contract and Run id, or the reply text itself when it is not one. */
function readingOf(text: string): unknown {
  try {
    const parsed: unknown = JSON.parse(text);
    const source: unknown = typeof parsed === "object" && parsed !== null ? Reflect.get(parsed, "source") : undefined;
    return [
      typeof parsed === "object" && parsed !== null ? Reflect.get(parsed, "contract") : undefined,
      typeof source === "object" && source !== null ? Reflect.get(source, "runId") : undefined,
    ];
  } catch {
    return `NOT A READING: ${text.slice(0, 160)}`;
  }
}

/** The Attempt page request id a furnace_observe reply carries (source.requestIds.attempts), when it is a string. */
function pageRequestOf(text: string): string | undefined {
  const parsed: unknown = JSON.parse(text);
  const source: unknown = typeof parsed === "object" && parsed !== null ? Reflect.get(parsed, "source") : undefined;
  const ids: unknown = typeof source === "object" && source !== null ? Reflect.get(source, "requestIds") : undefined;
  const attempts: unknown = typeof ids === "object" && ids !== null ? Reflect.get(ids, "attempts") : undefined;
  return typeof attempts === "string" ? attempts : undefined;
}

/** The value at `path` inside a parsed JSON value, or undefined when a step on the way is not an object. */
function member(value: unknown, ...path: readonly string[]): unknown {
  let current: unknown = value;
  for (const key of path) current = typeof current === "object" && current !== null ? Reflect.get(current, key) : undefined;
  return current;
}
/** A reply text parsed, or undefined when it is not JSON. */
function parsedOf(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
/**
 * THE READING REPLY (1): the reply's contract and Run id, and the fields only a reading of the fake's pages carries - the
 * Beads Run id and Run state from the run status page, and the Attempt page's returned count.
 */
function readingFieldsOf(text: string): unknown {
  const parsed = parsedOf(text);
  if (parsed === undefined) return `NOT A READING: ${text.slice(0, 160)}`;
  return [member(parsed, "contract"), member(parsed, "source", "runId"), member(parsed, "source", "beadsRunId"), member(parsed, "run", "state"), member(parsed, "attempts", "returned")];
}
/** An ISO instant as Date#toISOString writes one. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
/**
 * THE READING REPLY (2): whether the reply's three instants are one instant, and whether that instant is an ISO instant lying
 * between `before` and `after`.
 */
function instantsOf(text: string, before: string, after: string): unknown {
  const parsed = parsedOf(text);
  const instants = [member(parsed, "capturedAt"), member(parsed, "observedAt"), member(parsed, "lastConfirmedAt")];
  const first = instants[0];
  return [instants.every(instant => instant === first), typeof first === "string" && ISO_INSTANT.test(first) && before <= first && first <= after];
}
/** The reference observer's limits: one poll, and the Attempt, log and call bounds its reads stay inside. */
const OBSERVE_LIMITS = { maxPolls: 1, intervalMs: 1000, maxElapsedMs: 30_000, attemptLimit: 20, logBytes: 512, callTimeoutMs: 10_000 } as const;
/**
 * THE READING REPLY (3): sanitizeWorkbenchJsonText of the reading a FurnaceObserver (src/workbench/furnace-observer.ts) takes
 * of the fake's current pages through the vendored SDK client, with `reply`'s own three instants written over that reference
 * reading's (an instant is the host clock at its own read; every other byte is what (3) compares).
 */
async function referenceReplyFor(workspace: string, reply: string): Promise<string> {
  const observer = new FurnaceObserver(new Furnace({ binary: "furnace", cwd: workspace, timeoutMs: 10_000 }), {
    workspaceRoot: workspace, runId: RUN, scope: { workspace, principal: "local-operator:qg19-reference" }, limits: { ...OBSERVE_LIMITS },
  });
  try {
    const reference = await observer.snapshot();
    const parsed = parsedOf(reply);
    return sanitizeWorkbenchJsonText({
      ...reference, capturedAt: member(parsed, "capturedAt"), observedAt: member(parsed, "observedAt"), lastConfirmedAt: member(parsed, "lastConfirmedAt"),
    });
  } finally {
    observer.close();
  }
}
/** One furnace_observe reply with the host instants just before and just after the call, and the reads the call sent. */
interface Observed {
  readonly reply: string;
  readonly before: string;
  readonly after: string;
  readonly reads: readonly string[];
}
/** THE READING REPLY, (1) to (4), for a reply of the fake's current pages, whose Attempt page returns `attempts` Attempts. */
async function expectReadingReply(workspace: string, observed: Observed, attempts: number): Promise<void> {
  expect(readingFieldsOf(observed.reply), "(1) its contract and Run id, and the fields only the reading of the fake's pages carries").toStrictEqual([CONTRACT, RUN, "bd-qg19", "active", attempts]);
  expect(instantsOf(observed.reply, observed.before, observed.after), "(2) its three instants are one ISO instant taken during the call").toStrictEqual([true, true]);
  expect(observed.reads, "(4) from the one read the call sent: run status, attempt list and logs, once each").toStrictEqual(["run status", "attempt list", "logs"]);
  expect(observed.reply, "(3) byte-equal to the sanitized text of the reading a FurnaceObserver takes of the same pages").toBe(await referenceReplyFor(workspace, observed.reply));
}

// ---------------------------------------------------------------------------------------------------------------------
// The fake furnace CLI: the one injected boundary of the booted rows.

/** One canned answer to one command, keyed by its words after the global flags ("run status", "attempt list", "logs", "run stop"). */
interface FakeAnswer {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exit?: number;
  /** Answer only after this many milliseconds (the process stays alive until then). */
  readonly delayMs?: number;
}
type FakeAnswers = Readonly<Record<string, FakeAnswer>>;
interface FakeCall {
  readonly key: string;
  readonly requestId: string | null;
  readonly runId: string | null;
  readonly done?: boolean;
}
interface FakeFurnace {
  readonly binary: string;
  play(answers: FakeAnswers): void;
  calls(): FakeCall[];
  restore(): void;
}
const fakeSource = (node: string): string =>
  [
    `#!${node}`,
    '"use strict";',
    "// wb-qg19 fake furnace: canned documents from answers.json beside this file; never a real Furnace.",
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const argv = process.argv.slice(2);",
    'const valued = new Set(["-C", "--state-dir", "--config", "--request-id"]);',
    "let requestId = null;",
    "const words = [];",
    "for (let i = 0; i < argv.length; i++) {",
    "  if (valued.has(argv[i])) { if (argv[i] === \"--request-id\") requestId = argv[i + 1] === undefined ? null : argv[i + 1]; i++; continue; }",
    "  words.push(argv[i]);",
    "}",
    'const key = words[0] === "logs" ? "logs" : words[0] + " " + words[1];',
    'const runId = words[0] === "logs" ? (words[1] === undefined ? null : words[1]) : (words[2] === undefined ? null : words[2]);',
    'const log = path.join(__dirname, "calls.jsonl");',
    'fs.appendFileSync(log, JSON.stringify({ key, requestId, runId }) + "\\n");',
    'const answers = JSON.parse(fs.readFileSync(path.join(__dirname, "answers.json"), "utf8"));',
    "const answer = Object.hasOwn(answers, key) ? answers[key] : undefined;",
    'if (answer === undefined) { process.stderr.write("wb-qg19 fake furnace: no answer for this command\\n"); process.exit(2); }',
    'const fill = text => text.split("__REQUEST_ID__").join(requestId === null ? "" : requestId);',
    "const finish = () => {",
    '  if (typeof answer.stdout === "string") process.stdout.write(fill(answer.stdout));',
    '  if (typeof answer.stderr === "string") process.stderr.write(fill(answer.stderr));',
    '  fs.appendFileSync(log, JSON.stringify({ key, requestId, runId, done: true }) + "\\n");',
    '  process.exitCode = typeof answer.exit === "number" ? answer.exit : 0;',
    "};",
    'if (typeof answer.delayMs === "number") setTimeout(finish, answer.delayMs); else finish();',
    "",
  ].join("\n");
function installFakeFurnace(): FakeFurnace {
  const dir = makeScratch("pi-qg19-furnace-");
  const binary = join(dir, "furnace");
  writeFileSync(binary, fakeSource(process.execPath));
  chmodSync(binary, 0o755);
  writeFileSync(join(dir, "answers.json"), "{}");
  const previous = process.env.PATH;
  process.env.PATH = previous === undefined ? dir : `${dir}${delimiter}${previous}`;
  const log = join(dir, "calls.jsonl");
  return {
    binary,
    play: answers => writeFileSync(join(dir, "answers.json"), JSON.stringify(answers)),
    calls: () => existsSync(log) ? readFileSync(log, "utf8").split("\n").filter(line => line !== "").map(line => JSON.parse(line) as FakeCall) : [],
    restore: () => {
      if (previous === undefined) delete process.env.PATH;
      else process.env.PATH = previous;
      removeScratch(dir);
    },
  };
}
/** The first PATH entry holding an executable named command, joined with it. */
function firstOnPath(command: string): string | undefined {
  for (const entry of (process.env.PATH ?? "").split(delimiter)) {
    if (entry === "") continue;
    const candidate = join(entry, command);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}
const envelope = (kind: string, requestId: string, data: Record<string, unknown>): string => `${JSON.stringify({ protocol_version: 1, ok: true, request_id: requestId, kind, data })}\n`;
const failed = (kind: string, code: string): string =>
  `${JSON.stringify({ protocol_version: 1, ok: false, request_id: PLACEHOLDER, kind, error: { code, message: "HYPOTHETICAL fixture refusal", retryable: false } })}\n`;
/** One running Attempt row of the Run; the first keeps the one-Attempt fixture's work id. */
const attemptRow = (id: string, ordinal: number): Record<string, unknown> => ({
  attempt_id: id, run_id: RUN, work_id: ordinal === 1 ? "wk-qg19" : `wk-qg19-${ordinal}`, ordinal, executor: "noop", state: "running",
  created_at: "2026-01-01T00:00:00Z", started_at: "2026-01-01T00:00:01Z",
});
/**
 * One active Run in the booted workspace with its running Attempts (one by default) and an empty stdout tail of the last;
 * `attemptsRequest` is the Attempt page's own request id.
 */
function observedRun(workspace: string, attempts: readonly string[] = [ATTEMPT], attemptsRequest = ATTEMPTS_REQUEST): Record<string, FakeAnswer> {
  const last = attempts.at(-1) ?? ATTEMPT;
  return {
    "run status": {
      stdout: envelope("run_status", "pi-qg19-status", {
        run_id: RUN, beads_run_id: "bd-qg19", workspace, state: "active", mode: "ephemeral_wisp", furnace_version: "0.1.0",
        state_since: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z", active: [], failed: [], attention: [], unreadable: [],
        corrupt_events: [], conflicts: [], failed_total: 0, corrupt_events_total: 0,
      }),
    },
    "attempt list": {
      stdout: envelope("attempt_list", attemptsRequest, {
        run_id: RUN, beads_run_id: "bd-qg19", unreadable: [], returned: attempts.length, complete: true, next_cursor: null,
        attempts: attempts.map((id, index) => attemptRow(id, index + 1)),
      }),
    },
    logs: { stdout: envelope("logs_read", "pi-qg19-logs", { run_id: RUN, attempt_id: last, stream: "stdout", lines: [], returned: 0, complete: true, lossy: false, next_cursor: null }) },
  };
}
const stopAnswer = (data: Record<string, unknown>, requestId = PLACEHOLDER, delayMs?: number): FakeAnswer => ({
  stdout: envelope("run_stop", requestId, data), ...(delayMs !== undefined ? { delayMs } : {}),
});
const STOPPED = { run_id: RUN, state: "stopped", state_since: "2026-01-01T00:00:05Z" };
const stopsOf = (fake: FakeFurnace): FakeCall[] => fake.calls().filter(call => call.key === "run stop" && call.done !== true);

// ---------------------------------------------------------------------------------------------------------------------
// The booted extension.

interface Booted {
  readonly workspace: string;
  observe(): Promise<string>;
  control(params: Record<string, unknown>, options?: { id?: string; signal?: AbortSignal }): Promise<Reply>;
  restore(): void;
}
async function boot(grants: readonly string[]): Promise<Booted> {
  const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } } });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context: unknown = ctx({ cwd: sandbox.dir });
    const start: unknown = booted.lifecycle.get("session_start");
    if (!isHandler(start)) throw new Error("the extension registered no session_start handler");
    await start({}, context);
    const served = (name: string): ServedTool => {
      const tool: unknown = booted.tools.get(name);
      if (!isServedTool(tool)) throw new Error(`the booted extension serves no ${name} execute`);
      return tool;
    };
    return {
      workspace: realpathSync(sandbox.dir),
      observe: async () => textOf(await served("furnace_observe").execute("qg19-observe", { runId: RUN }, undefined, undefined, context)),
      control: async (params, options = {}) =>
        JSON.parse(textOf(await served("workflow_control").execute(options.id ?? "qg19-control", params, options.signal, undefined, context))) as Reply,
      restore: () => sandbox.restore(),
    };
  } catch (error) {
    sandbox.restore();
    throw error;
  }
}
const stopOf = (workspace: string, type = "run", id = RUN, scope: string = workspace): Record<string, unknown> => ({
  target: { provider: "furnace", type, id, scope }, action: "stop", confirmed: true,
});
/** One booted furnace_observe call with the host instants just before and just after it, and the reads it sent the fake. */
async function observedBy(booted: Booted, fake: FakeFurnace): Promise<Observed> {
  const prior = fake.calls().length;
  const before = new Date().toISOString();
  const reply = await booted.observe();
  const after = new Date().toISOString();
  return { reply, before, after, reads: fake.calls().slice(prior).filter(call => call.done !== true).map(call => call.key) };
}

describe("wb-qg19 the booted Furnace observe -> control path (EAT-R346..R348)", () => {
  let fake: FakeFurnace;
  let booted: Booted | undefined;
  beforeEach(() => {
    fake = installFakeFurnace();
    // Rule 8: no furnace verb ever reaches a real Furnace from this file.
    expect(firstOnPath("furnace"), "the fake furnace is first on PATH").toBe(fake.binary);
  });
  afterEach(() => {
    booted?.restore();
    booted = undefined;
    fake.restore();
  });

  it("B1 furnace_observe applies the Run, its Attempt and the Attempt page's Run -> Attempt ownership edge to the booted projection", async () => {
    booted = await boot(GRANTS);
    const before = await booted.control(stopOf(booted.workspace));
    expect(before.error?.code, "an unobserved Run is no target").toBe("cross-scope");
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    const attempt = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt" });
    expect(attempt.error?.code, "the Attempt node is in the booted projection and owns nothing").toBe("no-confirmed-ownership");
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    const run = await booted.control(stopOf(booted.workspace));
    expect(run.error, "the Run stop is permitted").toBeUndefined();
    expect(run).toMatchObject({ ok: true, invoked: true });
    expect(run.control?.requested?.ownershipConfirmationRef, "on the edge the Attempt page confirmed").toBe(ATTEMPTS_REQUEST);
  }, BOOTED_MS);

  it("B2 an authorized Run stop sends exactly one stop with no projection seeding; an observer-only grant and a foreign scope send none", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const foreign = await booted.control(stopOf(booted.workspace, "run", RUN, "/qg19-foreign-workspace"));
    expect(foreign.error?.code, "a foreign target scope is no target").toBe("cross-scope");
    expect(stopsOf(fake), "and sends no stop command").toStrictEqual([]);
    const permitted = await booted.control(stopOf(booted.workspace));
    expect(permitted.error).toBeUndefined();
    expect(stopsOf(fake).map(call => [call.runId, call.requestId]), "one stop for the Run under the decision's request id").toStrictEqual([
      [RUN, permitted.control?.requested?.requestId],
    ]);
    booted.restore();
    booted = await boot(["furnace:inspect"]);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const observerOnly = await booted.control(stopOf(booted.workspace), { id: "qg19-observer-only" });
    expect(observerOnly.error?.code, "an observer-only grant set never controls").toBe("observer-only");
    expect(stopsOf(fake), "and sends no further stop command").toHaveLength(1);
  }, BOOTED_MS);

  it("B3 furnace_observe alone sends only the three read commands and no control command", async () => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    await booted.observe();
    expect(fake.calls().filter(call => call.done !== true).map(call => call.key), "two observes, three reads each").toStrictEqual([
      "run status", "attempt list", "logs", "run status", "attempt list", "logs",
    ]);
  }, BOOTED_MS);

  it("B4 a stop cancelled before the verb is issued reaches the model as aborted-before-issue and sends no stop", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const cancelled = new AbortController();
    cancelled.abort();
    const reply = await booted.control(stopOf(booted.workspace), { signal: cancelled.signal });
    expect(reply.ok).toBe(false);
    expect(reply.error).toMatchObject({ code: "aborted-before-issue", category: "transport", message: "Furnace control was cancelled before the native verb was issued." });
    expect(stopsOf(fake)).toStrictEqual([]);
  }, BOOTED_MS);

  const UNCERTAIN: ReadonlyArray<{ readonly reason: string; readonly answer: (requestId: string) => FakeAnswer; readonly echo?: (requestId: string) => Echo; readonly failure?: { kind: string; code: string } }> = [
    { reason: "seam-failure", answer: () => ({ exit: 1, stderr: failed("run_stop", "run_not_found") }), failure: { kind: "command_error", code: "run_not_found" } },
    { reason: "no-target-echo", answer: () => stopAnswer({ ...STOPPED, run_id: "frn-run-qg19other" }), echo: requestId => ({ kind: "run_stop", requestId, id: "frn-run-qg19other", state: "stopped" }) },
    { reason: "no-terminal-echo", answer: () => stopAnswer({ ...STOPPED, state: "active" }), echo: requestId => ({ kind: "run_stop", requestId, id: RUN, state: "active" }) },
    {
      reason: "unattributable-answer",
      answer: () => stopAnswer(STOPPED, "ctl_00000000000000000000000000000000"),
      echo: () => ({ kind: "run_stop", requestId: "ctl_00000000000000000000000000000000", id: RUN, state: "stopped" }),
    },
  ];
  it.each(UNCERTAIN)("B5 an uncertain stop keeps its exact reason $reason under reply.control and is never a result", async row => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    fake.play({ ...observedRun(booted.workspace), "run stop": row.answer(PLACEHOLDER) });
    const reply = await booted.control(stopOf(booted.workspace));
    const requestId = reply.control?.requested?.requestId ?? "";
    expect(requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty, "the adapter's own bounded reason and failure label").toStrictEqual({ reason: row.reason, ...(row.failure !== undefined ? { failure: row.failure } : {}) });
    expect(reply.control?.echo, "the native echo as the adapter bounded it").toStrictEqual(row.echo?.(requestId));
    expect([reply.control?.phase, reply.control?.result, reply.control?.completionBasis], "never a result").toStrictEqual([
      row.reason === "seam-failure" || row.reason === "unattributable-answer" ? "requested" : "acknowledged", undefined, "not-established",
    ]);
    expect(stopsOf(fake), "one native call, never re-issued").toHaveLength(1);
  }, BOOTED_MS);

  it("B6 a stop aborted after its verb was issued reads wait-aborted, never a result", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED, PLACEHOLDER, 2_000) });
    await booted.observe();
    const waiting = new AbortController();
    const pending = booted.control(stopOf(booted.workspace), { signal: waiting.signal });
    for (let waited = 0; stopsOf(fake).length === 0 && waited < 20_000; waited += 25) await sleep(25);
    expect(stopsOf(fake), "the verb was issued before the abort").toHaveLength(1);
    waiting.abort();
    const reply = await pending;
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty).toStrictEqual({ reason: "wait-aborted" });
    expect([reply.control?.phase, reply.control?.result]).toStrictEqual(["requested", undefined]);
    // The late answer is discarded; the fake still finishes before the scratch directory goes.
    for (let waited = 0; !fake.calls().some(call => call.key === "run stop" && call.done === true) && waited < 20_000; waited += 25) await sleep(25);
  }, BOOTED_MS);

  it("B6 a stop the producer never answers inside the leg's bound reads wait-timeout, never a result", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED, PLACEHOLDER, 25_000) });
    await booted.observe();
    const reply = await booted.control(stopOf(booted.workspace));
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty).toStrictEqual({ reason: "wait-timeout" });
    expect([reply.control?.phase, reply.control?.result]).toStrictEqual(["requested", undefined]);
    expect(stopsOf(fake)).toHaveLength(1);
  }, TIMEOUT_ROW_MS);

  it("B7 a stop answered stopped with a native instant settles with its echo and carries no uncertainty", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const reply = await booted.control(stopOf(booted.workspace));
    const requestId = reply.control?.requested?.requestId;
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "settled", completion: "not-asserted" });
    expect([reply.control?.phase, reply.control?.completionBasis, reply.control?.uncertainty]).toStrictEqual(["result", "producer-reported", undefined]);
    expect(reply.control?.echo).toStrictEqual({ kind: "run_stop", requestId, id: RUN, state: "stopped" });
  }, BOOTED_MS);

  it("B8 after one furnace_observe of a Run with two Attempts, each returned Attempt is a node of the booted projection", async () => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, [ATTEMPT, ATTEMPT_2]));
    const seen = await observedBy(booted, fake);
    expect(readingOf(seen.reply), "the reply is the reading").toStrictEqual([CONTRACT, RUN]);
    await expectReadingReply(booted.workspace, seen, 2);
    const first = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt-1" });
    const second = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT_2), { id: "qg19-attempt-2" });
    expect([first.error?.code, second.error?.code], "each Attempt is a node that owns nothing").toStrictEqual(["no-confirmed-ownership", "no-confirmed-ownership"]);
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);

  const UNTAKEN: ReadonlyArray<{ readonly row: string; readonly attempts: readonly string[]; readonly attemptsRequest: string }> = [
    { row: "an Attempt page whose request id is empty", attempts: [ATTEMPT], attemptsRequest: "" },
    { row: "an Attempt id of 308 code units", attempts: [LONG_ATTEMPT], attemptsRequest: ATTEMPTS_REQUEST },
  ];
  it.each(UNTAKEN)("B9 $row: furnace_observe still replies with the reading and the Run is observed", async ({ attempts, attemptsRequest }) => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, attempts, attemptsRequest));
    const seen = await observedBy(booted, fake);
    expect(readingOf(seen.reply), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    await expectReadingReply(booted.workspace, seen, attempts.length);
    const run = await booted.control(stopOf(booted.workspace));
    expect(run.error?.code, "the Run is a node of the booted projection that owns nothing").toBe("no-confirmed-ownership");
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);

  const ZERO_WIDTH: ReadonlyArray<{ readonly row: string; readonly attempts: readonly string[]; readonly attemptsRequest: string }> = [
    { row: "an Attempt page request id", attempts: [ATTEMPT], attemptsRequest: `pi-qg19${ZWSP}attempts` },
    { row: "an Attempt id", attempts: [`frn-atm-qg19${ZWSP}fx1`], attemptsRequest: ATTEMPTS_REQUEST },
  ];
  it.each(ZERO_WIDTH)("B10 $row carrying a zero-width space: the reply is still the sanitized reading", async ({ attempts, attemptsRequest }) => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, attempts, attemptsRequest));
    const seen = await observedBy(booted, fake);
    const reply = seen.reply;
    expect(readingOf(reply), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    expect(reply.includes(ZWSP), "with no zero-width unit left").toBe(false);
    await expectReadingReply(booted.workspace, seen, attempts.length);
  }, BOOTED_MS);

  it("B11 an Attempt page request id carrying U+0001: the reply is still the reading, the Attempt stands and the Run owns nothing", async () => {
    const pageRequest = `pi-qg19${C0}attempts`;
    const bare: ObservationScope = { workspace: "/qg19-premise", principal: "local-operator:1000:s1" };
    const run: NativeRef = { provider: "furnace", type: "run", id: RUN, scope: bare.workspace };
    const attempt: NativeRef = { provider: "furnace", type: "attempt", id: ATTEMPT, scope: bare.workspace };
    expect(() => new ObservationProjection().relate({
      scope: bare, from: run, to: attempt, kind: "ownership", provenance: { source: "furnace", observedAt: "2026-01-01T00:00:00Z", nativeConfirmationRef: pageRequest },
    }), "the premise: the projection's text rule refuses that ownership confirmation").toThrow("Observation ownership confirmation is empty, unsafe or exceeds payload limit.");
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, [ATTEMPT], pageRequest));
    const seen = await observedBy(booted, fake);
    const reply = seen.reply;
    expect(readingOf(reply), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    const kept = pageRequestOf(reply);
    expect([typeof kept, kept?.includes(C0)], "its page request id is a string without the C0 unit").toStrictEqual(["string", false]);
    const sanitizedPage = member(parsedOf(sanitizeWorkbenchJsonText({ attempts: pageRequest })), "attempts");
    expect([kept, typeof sanitizedPage === "string" && sanitizedPage.includes(C0)], "it is the page's own request id as sanitizeWorkbenchJsonText answers it").toStrictEqual([sanitizedPage, false]);
    await expectReadingReply(booted.workspace, seen, 1);
    const attemptStop = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt" });
    expect(attemptStop.error?.code, "the Attempt is a node of the booted projection that owns nothing").toBe("no-confirmed-ownership");
    const runStop = await booted.control(stopOf(booted.workspace), { id: "qg19-run" });
    expect(runStop.error?.code, "the Run owns nothing").toBe("no-confirmed-ownership");
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);

  it("B12 two Attempts, the second of 308 code units: the reply is still the reading, the first Attempt stands and the Run owns nothing", async () => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, [ATTEMPT, LONG_ATTEMPT]));
    const seen = await observedBy(booted, fake);
    expect(readingOf(seen.reply), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    await expectReadingReply(booted.workspace, seen, 2);
    const first = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt-1" });
    expect(first.error?.code, "the first Attempt is a node of the booted projection that owns nothing").toBe("no-confirmed-ownership");
    const runStop = await booted.control(stopOf(booted.workspace), { id: "qg19-run" });
    expect(runStop.error?.code, "the Run owns nothing").toBe("no-confirmed-ownership");
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);
});

// ---------------------------------------------------------------------------------------------------------------------
// The registered tool's constructor with the production adapter, for what the booted tool cannot reach.

const WS = "/qg19-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "local-operator:1000:s1" };
const AT = "2026-10-17T08:00:00Z";
const OWNER = "wf_qg19owner01";
const toolCtx = { cwd: WS, sessionManager: { getSessionId: () => "s1" } };
/** A furnace target observed in SCOPE with a furnace-sourced, natively confirmed ownership edge to a child. */
function seeded(targets: readonly NativeRef[]): ObservationProjection {
  const projection = new ObservationProjection();
  for (const target of targets) {
    const child: NativeRef = { provider: "furnace", type: "attempt", id: `frn-atm-${target.type}-child`, scope: WS };
    for (const source of [target, child]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `furnace.${source.type}.snapshot`, trace: { invocationId: OWNER },
        node: { title: `furnace ${source.type}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "pi-qg19-page" } });
  }
  return projection;
}
interface Counted { readonly client: FurnaceControlClient; readonly calls: string[] }
/** A control seam that counts every native call and answers a run stop with the stopped record. */
function counted(): Counted {
  const calls: string[] = [];
  const stop = async (id: string, call?: CallOptions): Promise<unknown> => {
    calls.push(`run stop ${id}`);
    return { kind: "run_stop", requestId: call?.requestId, data: { run_id: id, state: "stopped", state_since: "2026-01-01T00:00:05Z" } };
  };
  const refuse = async (verb: string): Promise<never> => {
    calls.push(verb);
    throw new Error(`wb-qg19: no ${verb} is expected`);
  };
  const client = { runs: { stop, pause: () => refuse("run pause"), resume: () => refuse("run resume") }, attempts: { stop: () => refuse("attempt stop") } };
  return { client: client as unknown as FurnaceControlClient, calls };
}
/** The furnace leg as src/index.ts writes it, over an injected seam; `reuse` re-executes the first decision it was handed. */
function leg(client: FurnaceControlClient, options: { reuse?: boolean } = {}): ControlExecutor {
  let first: ControlDecision | undefined;
  return async (decision: ControlDecision, request: NativeControlRequest, signal?: AbortSignal): Promise<ControlExecutionSummary> => {
    const chosen = options.reuse === true ? first ?? decision : decision;
    first ??= decision;
    const execution = await executeFurnaceControl(chosen, {
      client, workspaceRoot: request.scope.workspace, now: () => new Date().toISOString(), timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
    });
    return { receipt: execution.receipt, status: execution.status, ...(execution.uncertainty !== undefined ? { uncertainty: execution.uncertainty } : {}), ...(execution.echo !== undefined ? { echo: execution.echo } : {}) };
  };
}
function constructed(targets: readonly NativeRef[], executor: ControlExecutor) {
  const tasks = new Map<string, WorkflowTask>([[OWNER, { id: OWNER } as unknown as WorkflowTask]]);
  const tool = createWorkflowControlTool({
    grants: () => ["control:furnace.stop"], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection: seeded(targets), tasks, now: () => new Date().toISOString(), executors: { furnace: executor },
  });
  return async (target: NativeRef, options: { id?: string; signal?: AbortSignal } = {}): Promise<{ text: string; reply: Reply }> => {
    const result = await tool.execute(options.id ?? "qg19-call", { target: { ...target }, action: "stop", confirmed: true } as never, options.signal, undefined, toolCtx as never);
    const text = textOf(result);
    return { text, reply: JSON.parse(text) as Reply };
  };
}
const RUN_TARGET: NativeRef = { provider: "furnace", type: "run", id: "frn-run-qg19c", scope: WS };
/** One control call through the registered constructor with one provider's leg wired, over a target that owns one child. */
async function viaLeg(target: NativeRef, action: string, executor: ControlExecutor): Promise<Reply> {
  const projection = new ObservationProjection();
  const child: NativeRef = { provider: target.provider, type: "child", id: `${target.id}-child`, scope: WS };
  for (const source of [target, child]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${target.provider}.snapshot`, trace: { invocationId: OWNER },
      node: { title: "qg19", type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance: { source: target.provider, observedAt: AT, nativeConfirmationRef: "pi-qg19-page" } });
  const tasks = new Map<string, WorkflowTask>([[OWNER, { id: OWNER } as unknown as WorkflowTask]]);
  const tool = createWorkflowControlTool({
    grants: () => [`control:${target.provider}.${action}`], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection, tasks, now: () => new Date().toISOString(), executors: { [target.provider]: executor },
  });
  const result = await tool.execute("qg19-leg", { target: { ...target }, action, confirmed: true } as never, undefined, undefined, toolCtx as never);
  return JSON.parse(textOf(result)) as Reply;
}

/** One construction of C6's grid: a value handed to FurnaceControlRefusal as its refusal, at one category, with no policy or one core deny policy. */
interface Construction {
  readonly value: unknown;
  readonly label: string;
  /** A member of CODES, rather than a value C2 lists outside the vocabulary. */
  readonly owns: boolean;
  readonly category: CapabilityErrorCategory;
  readonly policy: ControlDenyPolicy | undefined;
}
/**
 * C6 and C7's grid: each member of CODES and each value C2 lists outside the vocabulary (OUTSIDE, then every own key of
 * Object.prototype as the runtime lists it), at each category, with no policy and with each core deny policy, all with the
 * one message "m".
 */
function constructions(): readonly Construction[] {
  const outside = [...OUTSIDE, ...Object.getOwnPropertyNames(Object.prototype)];
  const values = [
    ...CODES.map(code => ({ value: code as unknown, label: code, owns: true })),
    ...outside.map(value => ({ value, label: typeof value === "string" ? JSON.stringify(value) : "an object whose string form is invalid-target", owns: false })),
  ];
  return values.flatMap(({ value, label, owns }) => CATEGORIES.flatMap(category => [undefined, ...DENY_POLICIES].map(policy => ({ value, label, owns, category, policy }))));
}
const constructedRefusal = ({ value, category, policy }: Construction): FurnaceControlRefusal =>
  new FurnaceControlRefusal(category, value as FurnaceControlRefusalCode, "m", policy);
const shapeOf = ({ label, category, policy }: Construction): string => `${label} at ${category}, policy ${policy ?? "none"}`;
/** The production adapter's dependencies as the furnace leg passes them (src/index.ts), over `client`. */
function adapterDeps(client: FurnaceControlClient, request: NativeControlRequest, signal?: AbortSignal): FurnaceControlDeps {
  return { client, workspaceRoot: request.scope.workspace, now: () => new Date().toISOString(), timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}) };
}
type Prepared = { readonly handed: unknown; readonly deps: FurnaceControlDeps };
/**
 * A leg that hands the production adapter what `prepare` makes of the permitted decision it is handed, records the refusal
 * the adapter raises (its own code and category) in `seen`, and throws that refusal on to the registered constructor.
 */
function adapterLeg(client: FurnaceControlClient, seen: unknown[], prepare: (permit: ControlDecision, request: NativeControlRequest, deps: FurnaceControlDeps) => Promise<Prepared>): ControlExecutor {
  return async (decision: ControlDecision, request: NativeControlRequest, signal?: AbortSignal): Promise<ControlExecutionSummary> => {
    const { handed, deps } = await prepare(decision, request, adapterDeps(client, request, signal));
    try {
      await executeFurnaceControl(handed as ControlDecision, deps);
    } catch (error) {
      seen.push(error instanceof FurnaceControlRefusal ? [Object.getOwnPropertyDescriptor(error, "code")?.value, error.category] : `NOT A REFUSAL: ${String(error)}`);
      throw error;
    }
    throw new Error("wb-qg19: the adapter raised no refusal");
  };
}
/** RUN_TARGET observed in SCOPE with no ownership edge from it: the core denies its stop no-confirmed-ownership. */
function observedWithoutEdge(): ObservationProjection {
  const projection = new ObservationProjection();
  projection.refresh({ source: RUN_TARGET, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.run.snapshot", trace: { invocationId: OWNER },
    node: { title: "furnace run", type: "workflow", statusText: "active", statusTone: "active" } });
  return projection;
}
const coreNow = (): string => new Date().toISOString();
/**
 * For each core deny policy, the change to the permitted request a leg is handed that makes decideControl
 * (src/workbench/control.ts) deny it with that policy, and the category the core denies it with.
 */
const DENIALS: Readonly<Record<ControlDenyPolicy, { readonly category: CapabilityErrorCategory; readonly deny: (request: NativeControlRequest) => ControlDecision }>> = {
  "unknown-permission-data": { category: "authorization", deny: request => decideControl({ ...request, grants: ["NOT A GRANT"] }, { projection: seeded([RUN_TARGET]), now: coreNow }) },
  "observer-only": { category: "authorization", deny: request => decideControl({ ...request, grants: ["furnace:inspect"] }, { projection: seeded([RUN_TARGET]), now: coreNow }) },
  "malformed-request": { category: "validation", deny: request => decideControl({ ...request, requestedAt: "not an instant" }, { projection: seeded([RUN_TARGET]), now: coreNow }) },
  "unknown-action": { category: "validation", deny: request => decideControl({ ...request, action: "qg19-explode" }, { projection: seeded([RUN_TARGET]), now: coreNow }) },
  "missing-exact-grant": { category: "authorization", deny: request => decideControl({ ...request, grants: ["control:furnace.pause"] }, { projection: seeded([RUN_TARGET]), now: coreNow }) },
  "cross-scope": { category: "authorization", deny: request => decideControl(request, { projection: new ObservationProjection(), now: coreNow }) },
  "no-confirmed-ownership": { category: "authorization", deny: request => decideControl(request, { projection: observedWithoutEdge(), now: coreNow }) },
  "operator-confirmation": { category: "validation", deny: ({ params: _params, ...request }) => decideControl(request, { projection: seeded([RUN_TARGET]), now: coreNow }) },
};
/** The bound on C7's calls through one constructed tool, one call per construction of C6's grid. */
const GRID_MS = 120_000;

describe("wb-qg19 the registered control tool's constructor over the production Furnace adapter (EAT-R347, EAT-R348 bound)", () => {
  it("C1 each typed refusal the booted tool cannot reach keeps its own exact code and category, and issues nothing", async () => {
    const work: NativeRef = { provider: "furnace", type: "work", id: "frn-work-qg19", scope: WS };
    const flagged: NativeRef = { provider: "furnace", type: "run", id: "-frn-run-qg19-flag", scope: WS };
    const foreign: NativeRef = { provider: "furnace", type: "run", id: "frn-run-qg19-foreign", scope: "/qg19-elsewhere" };
    const seam = counted();
    const run = constructed([work, flagged, foreign, RUN_TARGET], leg(seam.client));
    const cancelled = new AbortController();
    cancelled.abort();
    const rows = [
      ["unsupported-verb", (await run(work)).reply],
      ["invalid-target", (await run(flagged)).reply],
      ["foreign-workspace", (await run(foreign)).reply],
      ["aborted-before-issue", (await run(RUN_TARGET, { signal: cancelled.signal })).reply],
    ] as const;
    expect(rows.map(([code, reply]) => [code, reply.ok, reply.error?.code, reply.error?.category])).toStrictEqual([
      ["unsupported-verb", false, "unsupported-verb", "validation"],
      ["invalid-target", false, "invalid-target", "validation"],
      ["foreign-workspace", false, "foreign-workspace", "authorization"],
      ["aborted-before-issue", false, "aborted-before-issue", "transport"],
    ]);
    expect(seam.calls, "no refusal issues a native call").toStrictEqual([]);
    const reused = counted();
    const again = constructed([RUN_TARGET], leg(reused.client, { reuse: true }));
    const issued = await again(RUN_TARGET, { id: "qg19-first" });
    const spent = await again(RUN_TARGET, { id: "qg19-second" });
    expect([issued.reply.status, spent.reply.ok, spent.reply.error?.code, spent.reply.error?.category]).toStrictEqual(["settled", false, "permit-consumed", "validation"]);
    expect(reused.calls, "the consumed permit issued its verb once").toStrictEqual([`run stop ${RUN_TARGET.id}`]);
  });

  it("C2 the error code is the closed refusal itself, never caller text, a stack or a listed outside value, and the vocabulary is src's", async () => {
    const hostile: NativeRef = { provider: "furnace", type: "run", id: "-x qg19 caller text Bearer FAKE-qg19-token at Object.<anonymous> (/tmp/zz.js:1:1)", scope: WS };
    const seam = counted();
    const { reply } = await constructed([hostile], leg(seam.client))(hostile);
    expect(reply.error).toMatchObject({ code: "invalid-target", category: "validation", message: INVALID_TARGET_TEXT });
    expect(seam.calls).toStrictEqual([]);
    expect(CODES, "this file's vocabulary is the exported one").toStrictEqual([...FURNACE_CONTROL_REFUSAL_CODES]);
    for (const code of CODES) {
      const refusal = new FurnaceControlRefusal("validation", code, "m");
      expect(Object.getOwnPropertyDescriptor(refusal, "code")?.value, `${code} is its own code`).toBe(code);
    }
    const prototypeKeys = Object.getOwnPropertyNames(Object.prototype);
    expect(prototypeKeys, "the runtime's own Object.prototype keys, the gate witness's five among them").toEqual(
      expect.arrayContaining(["toString", "constructor", "hasOwnProperty", "__proto__", "valueOf"]),
    );
    const values: readonly unknown[] = [...OUTSIDE, ...prototypeKeys];
    const refusals = values.map(value => new FurnaceControlRefusal("validation", value as FurnaceControlRefusalCode, "m"));
    expect(refusals.map(refusal => Object.getOwnPropertyDescriptor(refusal, "code")?.value), "no listed outside value has an own `code` descriptor value").toStrictEqual(
      values.map(() => undefined),
    );
    const replied: unknown[] = [];
    for (const refusal of refusals) replied.push((await constructed([RUN_TARGET], async () => { throw refusal; })(RUN_TARGET)).reply.error?.code);
    expect(replied, "so the tool reports the generic refusal for each").toStrictEqual(values.map(() => "executor-refused"));
  });

  it("C3 hostile, oversized adapter readings are bounded and sanitized inside the reply's byte budget", async () => {
    const secret = "FAKE-qg19-api-token-abcdefghijklmnopqrstuvwx";
    const hostile = `${String.fromCodePoint(0x202e)}api_key=${secret} ${"x".repeat(6_000)}`;
    const executor: ControlExecutor = async decision => {
      if (decision.decision !== "permitted") throw new Error("wb-qg19: a permit is expected");
      return {
        receipt: decision.receipt, status: "uncertain",
        uncertainty: { reason: hostile, failure: { kind: hostile, code: hostile } },
        echo: { kind: hostile, requestId: hostile, id: hostile, state: hostile },
      };
    };
    const { text, reply } = await constructed([RUN_TARGET], executor)(RUN_TARGET);
    expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(8_192);
    expect(text.includes(secret), "the fake credential is redacted").toBe(false);
    expect(text.includes(String.fromCodePoint(0x202e)), "no unsafe unit is left").toBe(false);
    const echo = reply.control?.echo ?? {};
    const labels = [reply.control?.uncertainty?.reason, reply.control?.uncertainty?.failure?.kind, reply.control?.uncertainty?.failure?.code];
    expect(Object.values(echo).map(value => typeof value === "string" && value.length <= 128), "each echo string within 128").toStrictEqual([true, true, true, true]);
    expect(labels.map(value => typeof value === "string" && value.length <= 64), "each uncertainty label within 64").toStrictEqual([true, true, true]);
  });

  it("C4 the claude-agent-sdk and forge legs' typed refusals carry no own code, so they reach the reply as executor-refused", async () => {
    const thrown: unknown[] = [];
    /** The leg unchanged, recording the class and the own code descriptor of what it throws. */
    const recorded = (executor: ControlExecutor): ControlExecutor => async (decision, request, signal) => {
      try {
        return await executor(decision, request, signal);
      } catch (error) {
        thrown.push([typeof error === "object" && error !== null ? error.constructor.name : typeof error, Object.getOwnPropertyDescriptor(error, "code")]);
        throw error;
      }
    };
    const session: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "qg19-session", scope: WS };
    const claudeLeg: ControlExecutor = async (decision: ControlDecision, _request: NativeControlRequest, signal?: AbortSignal): Promise<ControlExecutionSummary> => {
      const execution = await executeClaudeControl(decision, {
        seam: { interrupt: async () => undefined }, call: { invocationId: OWNER, index: 0, sessionId: "qg19-other-session" },
        now: () => new Date().toISOString(), timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
      });
      return { receipt: execution.receipt, status: execution.status };
    };
    const claude = await viaLeg(session, "interrupt", recorded(claudeLeg));
    const gate: NativeRef = { provider: "forge", type: "gate", id: "qg19-forge-op", scope: WS };
    const cancel = async (): Promise<never> => {
      throw new Error("wb-qg19: no Forge cancel is expected");
    };
    const release = retainForgeOperation(gate.id, { operations: { cancel }, connection: { capabilities: null }, workspaceRoot: WS });
    try {
      const forge = await viaLeg(gate, "cancel", recorded(createRetainedForgeControlExecutor(() => new Date().toISOString())));
      expect([claude.ok, claude.error?.code, forge.ok, forge.error?.code], "each typed refusal reaches the reply as the generic code").toStrictEqual([
        false, "executor-refused", false, "executor-refused",
      ]);
      expect(thrown, "each leg threw its typed refusal with no own code property").toStrictEqual([
        ["ClaudeControlRefusal", undefined], ["ForgeControlRefusal", undefined],
      ]);
    } finally {
      release();
      releaseForgeOperation(gate.id);
    }
  });

  it.each([...CODES])("C5 %s, thrown by a leg through the registered constructor, reaches the reply's error code as itself", async code => {
    const refusal = new FurnaceControlRefusal("validation", code, "m");
    const { reply } = await constructed([RUN_TARGET], async () => {
      throw refusal;
    })(RUN_TARGET);
    expect([reply.ok, reply.error?.code, reply.error?.category], `${code} reaches the reply as itself`).toStrictEqual([false, code, "validation"]);
  });

  it("C6 String() of each construction's own code descriptor value, at each category with no policy and with each core deny policy, is the member itself or, for each value C2 lists outside the vocabulary, 'undefined'", () => {
    const grid = constructions();
    const values = CODES.length + OUTSIDE.length + Object.getOwnPropertyNames(Object.prototype).length;
    expect([CATEGORIES.length, DENY_POLICIES.length, grid.length], "5 categories and 8 core deny policies: 45 constructions of each value").toStrictEqual([5, 8, values * 45]);
    expect(grid.map(shape => `${shapeOf(shape)}: ${String(Object.getOwnPropertyDescriptor(constructedRefusal(shape), "code")?.value)}`), "String() of the own codes").toStrictEqual(
      grid.map(shape => `${shapeOf(shape)}: ${shape.owns ? String(shape.value) : "undefined"}`),
    );
  });

  it("C7 each of C6's refusals, thrown by a leg through the registered constructor, reaches a reply whose ok, code and category read, in their string forms, false, the member itself or executor-refused, and its category", async () => {
    const grid = constructions();
    const staged: FurnaceControlRefusal[] = [];
    const run = constructed([RUN_TARGET], async () => {
      const refusal = staged.pop();
      if (refusal === undefined) throw new Error("wb-qg19: no refusal is staged");
      throw refusal;
    });
    const replied: string[] = [];
    for (const [index, shape] of grid.entries()) {
      staged.push(constructedRefusal(shape));
      const { reply } = await run(RUN_TARGET, { id: `qg19-c7-${index}` });
      replied.push(`${shapeOf(shape)}: ${reply.ok} ${reply.error?.code} ${reply.error?.category}`);
    }
    expect(replied, "in their string forms: each member as itself, each listed outside value as executor-refused, each at its own category").toStrictEqual(
      grid.map(shape => `${shapeOf(shape)}: false ${shape.owns ? String(shape.value) : "executor-refused"} ${shape.category}`),
    );
  }, GRID_MS);

  it.each(DENY_POLICIES)("C8 the core's %s denial, handed to the production adapter by a leg through the registered constructor, is denied-decision at the core's category on the refusal and in the reply", async policy => {
    const seam = counted();
    const seen: unknown[] = [];
    const { category, deny } = DENIALS[policy];
    const denying = adapterLeg(seam.client, seen, async (_permit, request, deps) => {
      const denial = deny(request);
      seen.push(denial.decision === "denied" ? [denial.decision, denial.category, denial.policy] : [denial.decision]);
      return { handed: denial, deps };
    });
    const { reply } = await constructed([RUN_TARGET], denying)(RUN_TARGET);
    expect(seen, "the premise (the core's denial: its policy and category), then the adapter's refusal (its own code and category)").toStrictEqual([
      ["denied", category, policy], ["denied-decision", category],
    ]);
    expect([reply.ok, reply.error?.code, reply.error?.category], "the reply carries that refusal's own code and category").toStrictEqual([false, "denied-decision", category]);
    expect(seam.calls, "no native call").toStrictEqual([]);
  });

  it("C9 a hand-built denial, a frozen copy of a permit, a frozen copy of an issued permit and invalid dependencies, handed to the production adapter by a leg, reach the reply as the adapter's refusal", async () => {
    const rows: ReadonlyArray<readonly [string, (permit: ControlDecision, request: NativeControlRequest, deps: FurnaceControlDeps) => Promise<Prepared>]> = [
      ["a hand-built denial", async (_permit, _request, deps) => ({
        handed: Object.freeze({ decision: "denied", category: "qg19 caller category", reason: "qg19 caller reason", policy: "qg19 caller policy" }), deps,
      })],
      ["a frozen copy of a permit", async (permit, _request, deps) => ({ handed: Object.freeze({ ...permit }), deps })],
      ["a frozen copy of an issued permit", async (permit, _request, deps) => {
        await executeFurnaceControl(permit, deps);
        return { handed: Object.freeze({ ...permit }), deps };
      }],
      ["invalid dependencies", async (permit, _request, deps) => ({ handed: permit, deps: { ...deps, timeoutMs: 0 } })],
    ];
    const observed: unknown[] = [];
    for (const [row, prepare] of rows) {
      const seam = counted();
      const seen: unknown[] = [];
      const { reply } = await constructed([RUN_TARGET], adapterLeg(seam.client, seen, prepare))(RUN_TARGET);
      observed.push([row, ...seen, reply.ok, reply.error?.code, reply.error?.category, seam.calls.length]);
    }
    expect(observed, "each row: the adapter's refusal (own code, category), the reply's ok, code and category, and the native calls sent").toStrictEqual([
      ["a hand-built denial", ["denied-decision", "authorization"], false, "denied-decision", "authorization", 0],
      ["a frozen copy of a permit", ["unvetted-decision", "validation"], false, "unvetted-decision", "validation", 0],
      ["a frozen copy of an issued permit", ["permit-consumed", "validation"], false, "permit-consumed", "validation", 1],
      ["invalid dependencies", ["invalid-deps", "validation"], false, "invalid-deps", "validation", 0],
    ]);
  });
});
