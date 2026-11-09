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
 * Cut #9 (the respin of refusal #8, whose U1 and U2 are two sentences of the cut #8 receipt entry wider than their
 * pins, each at rung 1 of its own ladder) appends two describes to the end of this file. The first hands the boundary
 * the listed admission (the admission of the request for mechanical.development.develop.v1 with the plain task fields
 * and no policy) changed in one of its 6 listed other fields, at each of that field's listed values: contractVersion,
 * inputDigest, hostMode, policy, grant and admissionPolicy, which its frozen-shape row reads as the own keys, beside
 * invocationId and definition, of the admission of that request carrying the caller policy {}. In each host mode it
 * reads the changed admission's endings at the 4 listed host scenarios and its decisions at the 4 listed decision
 * readings as those of the listed admission, read whole; red-first, it fails under refusal #8's
 * GP13-BOUNDARY-READS-GRANT and GP13-BOUNDARY-READS-HOSTMODE. The second reads, in each host mode, the listed request
 * (the plain task fields, under workbench:execute) of each of the 3 definition kinds execute.ts lists, carrying each of
 * the 6 listed array caller policies, refusing as malformed-policy, read whole; red-first, it fails under
 * GP13-ARRAYPOLICY-FUNCTION and GP13-ARRAYPOLICY-FORMULA. At the boundary, other values, other fields, other admission
 * shapes, host scenarios and decision readings are NOT CLAIMED, and at decideExecute, other array caller policies and
 * request shapes are NOT CLAIMED. No residual is named: each of the four members refusal #8 recorded against the two
 * receipt sentences (U1's two and U2's two) fails one of these rows. Cut #9 keeps the frozen sets (R-B669's
 * host-authority words, GUARD A and GUARD B) and refusal #7's cure byte-stable, and does not restate the R-B642 set.
 * Follow-up wb-s3lg (the R694 carry of landing 1031: F1 leads, F2 rides) holds the two cut #9 tables to an anchor outside
 * this suite: the cut #9 entry of docs/workbench/receipts/wb-201v.md, whose pinned reader set lists, in its own spelling,
 * the 6 listed other fields with each field's listed values and the 6 listed array caller policies. One row in each cut #9
 * describe reads that entry (its heading exactly once, up to the next entry heading) and requires the table, spelled as
 * the entry spells it, to equal the entry's list in order; the array row also reads the entry's count of definition
 * kinds. Red-first, each of the landing-1031 gate's two coordinated CT6 hollows, 0 failed at cut #9, fails one of these
 * rows: GP3-CT6-ARRAY-POLICY-ROW (the policy [{}] cut from ARRAY_POLICIES, its frozen-shape literal and the length pin)
 * and GP3-CT6-FIELD-VALUE-PIN (workbench:detach cut from OTHER_FIELDS and the field frozen-shape literal). A hollow that
 * also edits the receipt entry is NOT CLAIMED by these rows (standing rule 15 refuses a removed receipt line), and the
 * boundary describe's host scenarios and decision readings are NOT CLAIMED by these rows.
 * wb-m83p cut #1 (the structural exit of the R-B642 set, ruling R-B665: wb-m83p owns that set, and this cut is rung 1 of
 * its own ladder) takes the fixed-reason and final-read words. Two rows are strengthened: the seven rows of the refusal
 * reasons describe now also read that the reason contains none of either request's definition text members (each own
 * key of its admitted definition beside its kind), and are retitled to the texts they read; the no-park timing row now
 * also reads that the final grant read happened. Two describes are appended to the end of this file. The fixed-reason
 * text census pins, for each of the 7 refusal policies, a pair of requests that share none of their 7 texts and carry
 * one reason containing none of them, with a planted row per policy that keeps its leg live, a frozen-shape row, and
 * anchors in the module's FunctionAuthorityRefusal union, identity.ts's DefinitionRef, each admitted definition and an
 * authorization of each scenario. The final-reads describe pins, with an admission park and with none, the host's second
 * grant and identity reads at the listed request (6 listed changes refuse at dispatch; with no change, one dispatch whose
 * callback receives the very authority object the boundary returns), the 6 listed entry refusals that never call a
 * given park, and with no park the 2 listed changes queued by the final grant read, each reading taken when the boundary
 * settles, with a frozen-shape row and anchors in the module source and an authorization. Red-first: the census and the strengthened reason rows fail under refusal
 * #3's GP18-REASON-DIGEST and GP18-REASON-SCHEMA-KIND, and the final-reads describe and the strengthened no-park row
 * under GP18-NOPARK-ENTRY-FINAL. Whether a reason names a definition's kind, other texts, pairs, requests, changes and
 * scheduling forms are NOT CLAIMED. No residual is named.
 * wb-m83p cut #2 (the respin of wb-m83p refusal #1, rung 1 of this bead's own ladder) takes refusal #1's U1 (the
 * final-read words) and U2 (the dispatch-count words) in the PIN-AND-FALSIFY form, with the words narrowed to the pinned
 * sets. One describe is appended to the end of this file, the final reads and the dispatch count at the 4 listed
 * requests: the request for mechanical.development.develop.v1 under the pinned contract, in each host mode, carrying no
 * caller policy or the caller policy {}. With an admission park and with none, each reading taken when the boundary
 * settles, each of the 6 listed changes the host's second reads report refuses at dispatch with zero callback, loader
 * and provider calls after two reads of each (48 rows); with no change, the one dispatch's callback receives the very authority object the boundary returns (8 rows);
 * and at each of the 11 listed callback outcomes (7 resolutions, 3 rejections and 1 synchronous throw), the callback is
 * invoked once, and the boundary returns the value it resolves with unchanged, or rejects with its rejection or its
 * throw unchanged (88 rows). A frozen-shape row and an anchor row hold the tables: the requests from execute.ts's
 * EXECUTE_HOST_MODES and ExecuteAdmission's optional members, the counts the module source names at each of its claim
 * sites and the outcome values its header names, the paths from FunctionDispatchOptions's optional members, and the
 * changes from an authorization and FunctionAuthorityHost. Red-first: before the module's words were narrowed, the anchor row failed;
 * and the describe fails under each of refusal #1's members GP28-NOPARK-DETACHED-ENTRY-FINAL,
 * GP28-NOPARK-POLICY-ENTRY-FINAL, GP28-DISPATCH-RETRY-ON-THROW and GP28-DISPATCH-TWICE-UNDEFINED, each of which reads 0
 * failed on the cut #1 suite. The module's final-read, dispatch-count, timing and entry-snapshot words now name these
 * rows, the listed request's timing rows and the EAT-R030 snapshot row; other requests, changes, callback outcomes and
 * scheduling forms are NOT CLAIMED. No residual is named.
 * wb-m83p cut #3 (the respin of wb-m83p refusal #2, in the enumerate-the-resolvable form rule 19(c) orders once the
 * final-read and dispatch-count claim words reach their second-stage cap) takes refusal #2's U1 (the zero-call words)
 * and U2 (the invoked-once words) in the PIN-AND-FALSIFY form, with each count word of the set narrowed to the pinned
 * window. Each row the module's final-read, dispatch-count, final-boundary timing, EAT-R031 and entry-refusal words name,
 * and the EAT-R030 snapshot row, now takes each of its readings twice: when the boundary settles, and again once the
 * timer drain ends. The timer drain (startTimerDrain, above): the row installs vitest's fake setTimeout, clearTimeout,
 * setInterval, clearInterval, setImmediate and clearImmediate before its request enters the boundary and plants one
 * sentinel timer 2147483647 ms out; once the boundary settles, vi.runAllTimersAsync fires the timers the fake clock
 * holds, and the timers they queue, until it holds none, and the row requires that it holds none and that the sentinel
 * ran once. Those rows are the 144 boundary rows of the cut #2 describe, the 22 boundary rows of the cut #1 final-reads
 * describe, the 4 timing rows of the EAT-R031 describe and the EAT-R030 snapshot row (171 rows). One describe is appended
 * to the end of this file: the timer drain's frozen shape and its anchors outside the suite's literals (the module header
 * names the faked functions and the sentinel delay; the fake clock replaces exactly those global functions and the real
 * timers restore them; a drain ends with its sentinel run once; and each of the module's 4 listed claim sites names the
 * end of the timer drain). Red-first: before the module's words were narrowed, the anchor row failed; and the cut fails
 * under each of refusal #2's members GP2M-DEFER-DISPATCH-AFTER-REFUSAL, GP2M-DEFER-SECOND-DISPATCH,
 * GP2M-CHAIN-SECOND-DISPATCH and GP2M-DEFER-RETRY-ON-REJECT, each of which reads 0 failed on the cut #2 suite. A call,
 * read or wait that lands after the timer drain ends is NOT CLAIMED, and other requests, changes, callback outcomes and
 * scheduling forms stay NOT CLAIMED. No residual is named.
 * wb-rrni (the R694 follow-up of landing 1049: F6 of the PASS-WITH-FINDING verdict on wb-m83p cut #3 found that
 * wb-201v's zero-call and before-any-dispatch words at entry refusals were read only when the boundary settles, since
 * the gate's M13, which with no admission park dispatches a made-up authority one zero-delay timer after an entry
 * refusal, read 0 failed on this suite) has 51 wb-201v rows take each of their readings twice, when the boundary
 * settles and again once the timer drain ends. Without an admission park they are the 38 rows the gate's liveness
 * witness M13W fails: EAT-R028's binding row, EAT-R029's 16 rows that run the boundary, the action grammar's
 * unrepresentable-spelling row, EAT-R030's 8 listed unknown identities and its accessor-principal row, the
 * function-definition boundary's 2 rows, the 7 clean-text rows that deny a listed session before any dispatch and host
 * authority's 2 rows whose caller policy names the action. With an admission park given they are EAT-R028's first row
 * and its 8 stand-ins, and in the host authority describe the detached row, the 13824 descriptor forms (one drain for
 * each host mode's 6912) and the 7776-policy and 7776-input rows (one drain for each of the 12 listed boundary
 * scenarios in each host mode). The host authority describe's ending helper now returns settled, the ending read when
 * the boundary settles, beside again(), which reads it once more from the calls as they stand, and endings tallies
 * both. Each row's title and each reading it took are kept. The module header gains one paragraph naming these rows,
 * and the timer drain describe's table lists it as its fifth claim site; that describe's title, its frozen-shape row's
 * title and the table's doc now count 5 sites. Red-first: on the module's trunk words the timer drain describe's anchor
 * row failed (1 failed | 420 passed); under M13 this suite fails exactly the 38 rows M13W fails (0 on the trunk suite);
 * and under the same dispatch made at every entry refusal, with an admission park or without one, it fails 57 rows: the
 * 51 above and the 6 that already fail under it on the trunk suite. A call, read or wait that lands after the timer
 * drain ends, and every other row, are NOT CLAIMED. No residual is named.
 * wb-uqax (the R694 follow-up of landing 1066: F1 of the PASS-WITH-FINDING verdict on wb-rrni found that the timer
 * drain describe's frozen-shape literal pins only the labels of its 5 listed claim sites, so the gate's members that
 * swap the fifth site's cut for the fourth site's, for the first site's or for a bare cut of the drain-end phrase, and
 * its trunk member that swaps the fourth site's cut for the third's, each read 0 failed on this suite) appends one row
 * to that describe. Each listed site's cut opens, in the module's prose, on the 8 words the row pins for that site; and
 * each drain-end phrase of the module's source, found there as often as the module's prose names one, sits inside
 * exactly one listed site's text, each listed site's text holding exactly one. Red-first: each of those four members
 * fails the new row, and so does each of them with the row's pinned words edited to match it, through the phrase
 * positions alone. An exchange of two listed sites' cuts together with their pinned words, which keeps every listed
 * text checked, is NOT CLAIMED; the module's words and every other row are unchanged. No residual is named.
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
import { decideExecute, EXECUTE_GRANT, EXECUTE_HOST_MODES, type ExecuteAdmission } from "../src/workbench/execute.js";
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

/**
 * The timer drain (wb-m83p cut #3). A row calls startTimerDrain() before its request enters the boundary: it installs the
 * fake timer functions DRAIN_FAKES lists (vitest's fake setTimeout, clearTimeout, setInterval, clearInterval,
 * setImmediate and clearImmediate) and plants one sentinel timer SENTINEL_DELAY ms out. Once the boundary settles, the
 * row takes its readings, awaits drain() and takes them again. drain() runs vi.runAllTimersAsync, which fires the timers
 * the fake clock holds, and the timers they queue, one per real macrotask turn (so the microtask and process.nextTick
 * queues run between them), until the clock holds none; it then requires that the clock holds no timer and that the
 * sentinel ran once. A reading is never taken after drain() returns, so a call or read that lands later is NOT CLAIMED by
 * any row: the fake clock holds no timer set through a timer function captured before it is installed or taken from
 * node:timers, and no I/O callback, worker or message port.
 */
const DRAIN_FAKES = ["setTimeout", "clearTimeout", "setInterval", "clearInterval", "setImmediate", "clearImmediate"] as const;
/** How far out the drain's sentinel timer is planted: 2 ** 31 - 1 ms. */
const SENTINEL_DELAY = 2 ** 31 - 1;
function startTimerDrain() {
  vi.useFakeTimers({ toFake: [...DRAIN_FAKES] });
  const sentinel = vi.fn();
  setTimeout(sentinel, SENTINEL_DELAY);
  return {
    sentinel,
    async drain() {
      await vi.runAllTimersAsync();
      expect({ timers: vi.getTimerCount(), sentinel: sentinel.mock.calls.length }).toEqual({ timers: 0, sentinel: 1 });
    },
  };
}

function refusalOf<T>(result: FunctionDispatchResult<T>) {
  return result.status === "refused" ? { stage: result.stage, policy: result.refusal.policy, category: result.refusal.category } : { dispatched: true };
}

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  // A row that started a timer drain (wb-m83p cut #3) gets the real timer functions back here, drained or not.
  vi.useRealTimers();
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

/** Each text member of an admitted definition (wb-m83p): every own key of the definition beside its kind, with its value, in key order. */
function definitionTexts(definition: Readonly<DefinitionRef>): readonly (readonly [string, string])[] {
  return Reflect.ownKeys(definition)
    .filter(key => key !== "kind")
    .map(key => [String(key), String(Reflect.get(definition, key))] as const);
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [ACTION] });
    const wait = parked();
    const result = await h.run(admissionFor(), CONTRACT, wait.park);
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
      expect(wait.park).not.toHaveBeenCalled();
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("held with the action grant and not workbench:execute, the embedded request for mechanical.development.develop.v1, which the pinned contract binds to the action, refuses at entry as missing-execute-grant, with zero loader and provider calls, without a policy, with the pinned JSON policy (naming workbench:execute under grants, permissions and authority, with reviewed true) and with the pinned input (naming it under grants)", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [ACTION] });
    const claims: JsonValue = { grants: [EXECUTE_GRANT, ACTION], permissions: [EXECUTE_GRANT], authority: EXECUTE_GRANT, reviewed: true };
    const results: FunctionDispatchResult<unknown>[] = [];
    for (const admission of [admissionFor(), admissionFor(FUNCTION_ID, claims), admissionFor(FUNCTION_ID, undefined, { task: "t", grants: [EXECUTE_GRANT] })]) {
      results.push(await h.run(admission));
    }
    const pure = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: [ACTION], identity: HOST } });
    const observe = () => {
      for (const result of results) expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
      expect(pure).toMatchObject({ decision: "refused", policy: "missing-execute-grant", invocationId: INVOCATION });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    expect(results).toHaveLength(3);
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [grant, ACTION] });
    const wait = parked();
    const result = await h.run(admissionFor(), CONTRACT, wait.park);
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
      expect(wait.park).not.toHaveBeenCalled();
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT] });
    const result = await h.run(admissionFor());
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
    const result = await h.run(admissionFor());
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("refuses the adopted permission under the namespace other-fn (other-fn:develop-write)", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, "other-fn:develop-write"] });
    const result = await h.run(admissionFor());
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("the adopted exact action held among four grants passes: one loader and one provider call, resting on exactly the two grants, while workbench:execute and that action refuse the other bound definition", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: ["forge:inspect", OTHER_FUNCTION_ACTION, ACTION, EXECUTE_GRANT] });
    const result = await h.run(admissionFor());
    const observeDispatch = () => {
      expect(result).toEqual({
        status: "dispatched",
        authority: { invocationId: INVOCATION, definition: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, grants: [EXECUTE_GRANT, ACTION], identity: HOST },
        value: { outcome: "ran", invocationId: INVOCATION },
      });
      expect(h.loader).toHaveBeenCalledTimes(1);
      expect(h.provider).toHaveBeenCalledTimes(1);
      // The dispatch rests on exactly the two grants: the provider receives the authority the dispatch callback received.
      expect(h.provider.mock.calls.map(([authority]) => authority.grants)).toEqual([[EXECUTE_GRANT, ACTION]]);
    };
    observeDispatch();
    // The grant is exact per function: the same holdings do not reach the other bound definition.
    const other = harness({ grants: [EXECUTE_GRANT, ACTION] });
    const otherResult = await other.run(admissionFor(OTHER_FUNCTION_ID));
    const observeOther = () => {
      expect(refusalOf(otherResult)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(other.loader).not.toHaveBeenCalled();
    };
    observeOther();
    await timers.drain();
    observeDispatch();
    observeOther();
  });

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the pinned JSON policy {grants: [the action], actionGrant: the action} or with the pinned input {task, actionGrant: the action} refuses at entry as missing-function-action-grant, with zero loader calls", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT] });
    const results: FunctionDispatchResult<unknown>[] = [];
    for (const admission of [admissionFor(FUNCTION_ID, { grants: [ACTION], actionGrant: ACTION }), admissionFor(FUNCTION_ID, undefined, { task: "t", actionGrant: ACTION })]) {
      results.push(await h.run(admission));
    }
    const observe = () => {
      for (const result of results) expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
    };
    expect(results).toHaveLength(2);
    observe();
    await timers.drain();
    observe();
  });

  it("the production contract is unadopted (MW-CONTRACT): held with workbench:execute and both fixture action grants, both fixture definitions refuse as function-action-unadopted", async () => {
    expect(FUNCTION_ACTION_CONTRACT).toEqual({ state: "unadopted", blockedOn: "MW-CONTRACT" });
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, ACTION, OTHER_FUNCTION_ACTION] });
    const results: FunctionDispatchResult<unknown>[] = [];
    for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID]) {
      results.push(await h.run(admissionFor(id), FUNCTION_ACTION_CONTRACT));
    }
    const observe = () => {
      for (const result of results) expect(refusalOf(result)).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    expect(results).toHaveLength(2);
    observe();
    await timers.drain();
    observe();
  });

  it("the unbound definition fixture.unbound.v1, and the pinned forged contract (a frozen adopted-shaped object that never went through adoption), refuse as unadopted", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, ACTION] });
    const unbound = await h.run(admissionFor("fixture.unbound.v1"));
    const forged: FunctionActionContract = Object.freeze({ state: "adopted", bindings: Object.freeze([Object.freeze({ definitionId: FUNCTION_ID, actionGrant: ACTION })]) });
    const forgedResult = await h.run(admissionFor(), forged);
    const observe = () => {
      expect(refusalOf(unbound)).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
      expect(refusalOf(forgedResult)).toEqual({ stage: "entry", policy: "function-action-unadopted", category: "unavailable" });
      expect(h.loader).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, grant] });
    const result = await h.run(admissionFor());
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT, ACTION, PROPOSED_EXAMPLE] });
    const result = await h.run(admissionFor());
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-permission-data", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-m83p cut #3: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const shared = { principal: HOST.principal, sessionId: HOST.sessionId };
    const wait = parked();
    const dispatch = vi.fn(async () => "ran");
    const pending = dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host: { grants: () => [EXECUTE_GRANT, ACTION], identity: () => shared }, park: wait.park, dispatch });
    shared.principal = "local-operator:1001:s1";
    wait.release();
    const result = await pending;
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "dispatch", policy: "changed-effective-identity", category: "authorization" });
      expect(dispatch).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const dispatch = vi.fn(async () => "ran");
    const host = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => identity } as unknown as FunctionAuthorityHost;
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
      expect(dispatch).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("reads the identity through its own property descriptors: an accessor principal is unknown identity data and its getter never runs", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const getter = vi.fn(() => HOST.principal);
    const identity = Object.defineProperty({ sessionId: HOST.sessionId }, "principal", { get: getter, enumerable: true });
    const dispatch = vi.fn(async () => "ran");
    const host = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => identity } as unknown as FunctionAuthorityHost;
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
      expect(getter).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-m83p cut #3: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
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
    const result = await pending;
    const observe = () => {
      expect(result.status).toBe("dispatched");
      expect(held).toEqual([[EXECUTE_GRANT, ACTION]]);
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-m83p cut #3: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
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
    const result = await pending;
    const observe = () => {
      expect(result.status).toBe("dispatched");
      expect(queued).toBe(true);
      expect(atDispatch).toEqual([{ grants: [EXECUTE_GRANT, ACTION], identity: HOST }]);
    };
    observe();
    await timers.drain();
    observe();
  });

  it("with no admission park, a revocation queued by the final read never precedes dispatch", async () => {
    // wb-m83p cut #3: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
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
    const observe = () => {
      expect(result.status).toBe("dispatched");
      expect(atDispatch).toEqual([[EXECUTE_GRANT, ACTION]]);
      expect(reads).toBe(2);
    };
    observe();
    await timers.drain();
    observe();
  });
});

describe("the boundary admits function definitions only (wb-201v)", () => {
  it.each(["script", "furnace-formula"] as const)("refuses a %s admission as not a function definition", async kind => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness();
    const result = await h.run(admissionFor(FUNCTION_ID, undefined, TASK, kind));
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "not-a-function-definition", category: "validation" });
      expect(h.loader).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const dispatch = vi.fn(async () => "ran");
    const host: FunctionAuthorityHost = { grants: () => [EXECUTE_GRANT, ACTION], identity: () => ({ principal: HOST.principal, sessionId }) };
    const result = await dispatchFunctionWithAuthority({ admission: admissionFor(), contract: CONTRACT, host, dispatch });
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "unknown-identity-data", category: "authorization" });
      expect(dispatch).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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

  it.each(POLICIES)("%s: one reason for two requests that differ in definition, invocation, identity and held grants, containing none of either request's definition text members (each own key of its admitted definition beside its kind), action, invocation, principal or session", policy => {
    const a = refusalFor(A, policy);
    const b = refusalFor(B, policy);
    expect([a.policy, b.policy, a.invocationId, b.invocationId]).toEqual([policy, policy, A.invocation, B.invocation]);
    expect(a.reason).toBe(b.reason);
    for (const s of [A, B]) for (const text of [s.id, s.action, s.invocation, s.identity.principal, s.identity.sessionId]) expect(a.reason).not.toContain(text);
    for (const s of [A, B]) {
      const definition = admissionFor(s.id, undefined, TASK, policy === "not-a-function-definition" ? "script" : "function", s.invocation).definition;
      for (const [member, text] of definitionTexts(definition)) expect({ member, contained: a.reason.includes(text) }).toEqual({ member, contained: false });
    }
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

  /**
   * How one request ends at the boundary when the park applies the scenario's change; the park, loader and provider calls
   * are counted. settled is the ending read when the boundary settles; again() reads it once more from the calls as they
   * stand when it is called, which a row does once the timer drain ends (wb-rrni).
   */
  async function ending(admission: ExecuteAdmission, entry: HostReads, change: HostReads | undefined, contract: FunctionActionContract = CONTRACT): Promise<{ readonly settled: string; readonly again: () => string }> {
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
    const read = () => {
      const counted = `park ${calls.park}, loader ${calls.loader}, provider ${calls.provider}`;
      if (result.status === "refused") return `refused at ${result.stage} as ${result.refusal.policy} (${result.refusal.category}) for ${result.refusal.invocationId}; ${counted}`;
      const { invocationId, definition, grants, identity } = result.authority;
      const further = Object.keys(identity).length === 2 ? "" : " with further identity fields";
      const whole = `read whole, the returned authority ${wholeOf(result.authority)} and the authority the dispatch callback received ${received.map(wholeOf).join(" and then ")}`;
      return `dispatched ${invocationId} for ${definition.kind} ${definition.id} ${definition.schemaVersion} ${definition.artifactDigest} on ${grants.join(" and ")} under ${identity.principal} / ${identity.sessionId}${further}, value ${String(result.value)}; ${whole}; ${counted}`;
    };
    return { settled: read(), again: read };
  }
  /** A decision as the readings list it. */
  function decisionEnding(decision: ReturnType<typeof decideFunctionAuthority>): string {
    if (decision.decision === "refused") return `refused as ${decision.policy} (${decision.category}) for ${decision.invocationId}`;
    const { invocationId, definition, grants, identity } = decision.authority;
    const further = Object.keys(identity).length === 2 ? "" : " with further identity fields";
    return `authorized ${invocationId} for ${definition.kind} ${definition.id} ${definition.schemaVersion} ${definition.artifactDigest} on ${grants.join(" and ")} under ${identity.principal} / ${identity.sessionId}${further}; read whole ${wholeOf(decision.authority)}`;
  }
  /** How many of the listed readings render each ending, each reading taken when this is called (wb-rrni). */
  function tallyOf(readings: readonly (() => string)[]): Record<string, number> {
    const tallied: Record<string, number> = {};
    for (const read of readings) {
      const ended = read();
      tallied[ended] = (tallied[ended] ?? 0) + 1;
    }
    return tallied;
  }
  /** The endings of a list of requests at one scenario, tallied as each boundary settles (settled), and again() from each ending's again() (wb-rrni). */
  async function endings(admissions: readonly ExecuteAdmission[], entry: HostReads, change: HostReads | undefined): Promise<{ readonly settled: Record<string, number>; readonly again: () => Record<string, number> }> {
    const tallied: Record<string, number> = {};
    const agains: (() => string)[] = [];
    for (const admission of admissions) {
      const ended = await ending(admission, entry, change);
      tallied[ended.settled] = (tallied[ended.settled] ?? 0) + 1;
      agains.push(ended.again);
    }
    return { settled: tallied, again: () => tallyOf(agains) };
  }

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the policy {grants: [the action], actionGrant: the action, reviewed: true} refuses at entry as missing-function-action-grant, with zero loader and provider calls", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT] });
    const result = await h.run(admit("embedded", { grants: [ACTION], actionGrant: ACTION, reviewed: true }));
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("held with workbench:execute and not the action grant, the embedded request for mechanical.development.develop.v1 with the policy {grants: [workbench:execute, the action], actionGrant: the action} refuses at entry as missing-function-action-grant, with zero loader and provider calls", async () => {
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [EXECUTE_GRANT] });
    const result = await h.run(admit("embedded", { grants: [EXECUTE_GRANT, ACTION], actionGrant: ACTION }));
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-function-action-grant", category: "authorization" });
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
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
    // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
    const timers = startTimerDrain();
    const h = harness({ grants: [ACTION] });
    const wait = parked();
    const result = await h.run(admit("detached"), CONTRACT, wait.park);
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: "missing-execute-grant", category: "authorization" });
      expect(wait.park).not.toHaveBeenCalled();
      expect(h.loader).not.toHaveBeenCalled();
      expect(h.provider).not.toHaveBeenCalled();
    };
    observe();
    await timers.drain();
    observe();
  });

  it("in each host mode, the request for mechanical.development.develop.v1 carrying each of the 7776 listed caller policies (each record holding each of grants, permissions, authority, reviewed, actionGrant, principal, sessionId and identity absent or with one of its listed values) ends each of the 12 listed boundary scenarios as the scenario lists, as the request without a policy does: the same refusal stage, policy, category and invocation, or one dispatch whose callback receives, and whose boundary returns, the listed authority read whole (each own key and value, nested, each object's frozenness and any other prototype) on the same invocation and definition, resting on workbench:execute and the action under the same principal and session, with the same value and the same park, loader and provider calls", async () => {
    expect(RECORDS).toHaveLength(7776);
    expect(SCENARIOS).toHaveLength(12);
    for (const hostMode of MODES) {
      const admissions = [admit(hostMode), ...RECORDS.map(policy => admit(hostMode, policy))];
      for (const [scenario, entry, change, expected] of SCENARIOS) {
        // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
        const timers = startTimerDrain();
        const ended = await endings(admissions, entry, change);
        expect({ hostMode, scenario, endings: ended.settled }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
        await timers.drain();
        expect({ hostMode, scenario, endings: ended.again() }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
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
        // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends.
        const timers = startTimerDrain();
        const ended = await endings(admissions, entry, change);
        expect({ hostMode, scenario, endings: ended.settled }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
        await timers.drain();
        expect({ hostMode, scenario, endings: ended.again() }).toEqual({ hostMode, scenario, endings: { [expected]: 7777 } });
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
    const drained: Record<string, number> = {};
    for (const hostMode of MODES) {
      // wb-rrni: each reading is taken when the boundary settles and again once the timer drain ends (one drain per host mode).
      const timers = startTimerDrain();
      const agains: (() => string)[] = [];
      for (const id of [FUNCTION_ID, OTHER_FUNCTION_ID, "fixture.unbound.v1"]) {
        for (const schemaVersion of [FUNCTION_SCHEMA, "mechanical-workflows/entrypoint/v2"]) {
          for (const artifactDigest of [DIGEST, `sha256:${"cd".repeat(32)}`]) {
            for (const policy of [undefined, {}, CLAIMS_ALL]) {
              for (const input of [PLAIN_TASK, { ...PLAIN_TASK, ...CLAIMS_ALL }]) {
                const admission = admit(hostMode, policy, input, { id, schemaVersion, artifactDigest });
                for (const contract of [CONTRACT, FUNCTION_ACTION_CONTRACT, forged]) {
                  for (const grants of subsets) {
                    const ended = await ending(admission, { grants, identity: HOST }, undefined, contract);
                    tallied[ended.settled] = (tallied[ended.settled] ?? 0) + 1;
                    agains.push(ended.again);
                  }
                }
              }
            }
          }
        }
      }
      await timers.drain();
      for (const [ended, count] of Object.entries(tallyOf(agains))) drained[ended] = (drained[ended] ?? 0) + count;
    }
    expect(tallied).toEqual({ [refusedAt("entry", "missing-execute-grant")]: 13824 });
    expect(drained).toEqual({ [refusedAt("entry", "missing-execute-grant")]: 13824 });
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

/**
 * The anchor outside this suite that the two cut #9 tables are held to (wb-s3lg, the R694 carry of landing 1031): the cut #9
 * entry of docs/workbench/receipts/wb-201v.md, whose pinned reader set lists each table's rows in the receipt's own spelling.
 */
const CUT_9_ENTRY_HEADING = "## 2026-11-07 receipt: cut #9, the respin of gate refusal #8, the boundary-reads and array-policy words (machine seat ws-14, base 4c21b67)";
/** The wb-201v receipt's cut #9 entry: how many receipt lines are its heading, and its text from that heading to the next entry heading or the end of the file. */
function cut9ReceiptEntry(): { readonly headings: number; readonly entry: string } {
  const lines = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "docs/workbench/receipts/wb-201v.md"), "utf8").split("\n");
  const start = lines.indexOf(CUT_9_ENTRY_HEADING);
  const next = lines.findIndex((line, index) => index > start && line.startsWith("## "));
  return { headings: lines.filter(line => line === CUT_9_ENTRY_HEADING).length, entry: start === -1 ? "" : lines.slice(start, next === -1 ? undefined : next).join("\n") };
}
/** The receipt's names for the two fixture strings it does not spell out: the action (its cut #9 entry says so) and the plain note. */
const RECEIPT_NAMES: ReadonlyMap<string, string> = new Map([
  [ACTION, "the action"],
  ["A plain note naming no seat token.", "a plain note"],
]);
/** A JSON value as the receipt spells it in a code span: strings bare or by the receipt's name, keys bare, members joined by ", ". */
function inReceiptWords(value: JsonValue): string {
  if (Array.isArray(value)) return `[${value.map(inReceiptWords).join(", ")}]`;
  if (value !== null && typeof value === "object") return `{${Object.entries(value).map(([key, member]) => `${key}: ${inReceiptWords(member)}`).join(", ")}}`;
  return typeof value === "string" ? (RECEIPT_NAMES.get(value) ?? value) : String(value);
}

describe("the boundary at the listed rows: an admission handed to it that differs from the listed admission in one of the admission's 6 listed other fields, at each of that field's listed values, ends at each of the 4 listed host scenarios and is decided at each of the 4 listed decision readings as the listed admission does, in each host mode, read whole (wb-201v)", () => {
  const HOST_MODES = ["embedded", "detached"] as const;
  type HostMode = (typeof HOST_MODES)[number];
  const SWAPPED_IDENTITY: FunctionIdentity = Object.freeze({ principal: "local-operator:0:s9", sessionId: "s9" });
  const EXECUTE_AND_ACTION: readonly string[] = [EXECUTE_GRANT, ACTION];
  /** A listed value that removes the field from the admission, and one that sets hostMode to the other listed host mode. */
  const REMOVED = Symbol("removed");
  const OTHER_HOST_MODE = Symbol("the other host mode");
  type ListedValue = JsonValue | typeof REMOVED | typeof OTHER_HOST_MODE;
  /**
   * The 6 listed other fields of the admission (its own keys beside invocationId and definition, in order, as the
   * admission of a request carrying a policy holds them), each with its listed values.
   */
  const OTHER_FIELDS: readonly (readonly [string, readonly ListedValue[]])[] = [
    ["contractVersion", ["workbench.execute/v2", "", REMOVED]],
    ["inputDigest", [`sha256:${"cd".repeat(32)}`, "not-a-digest", REMOVED]],
    ["hostMode", [OTHER_HOST_MODE, "remote", REMOVED]],
    ["policy", [{}, { grants: [EXECUTE_GRANT, ACTION], actionGrant: ACTION, reviewed: true }, [1]]],
    ["grant", ["workbench:other", "workbench:detach", "", REMOVED]],
    ["admissionPolicy", ["digest-pinned", "", REMOVED]],
  ];
  const labelOf = (value: ListedValue): string => (value === REMOVED ? "removed" : value === OTHER_HOST_MODE ? "the other host mode" : JSON.stringify(value));
  /** The listed admission: the admission of the request for mechanical.development.develop.v1 with the plain task fields, with no policy unless one is given. */
  function listedAdmission(hostMode: HostMode, policy?: JsonValue): ExecuteAdmission {
    const definitionRef: DefinitionRef = { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST };
    const decision = decideExecute({ definitionRef, input: TASK, hostMode, ...(policy !== undefined ? { policy } : {}) }, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
    if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
    return decision.admission;
  }
  /** The listed admission with one field at one listed value (or removed), frozen, as a host that bypassed decideExecute would hand it. */
  function handedWith(listed: ExecuteAdmission, field: string, value: ListedValue, hostMode: HostMode): ExecuteAdmission {
    if (value === REMOVED) return Object.freeze(Object.fromEntries(Object.entries(listed).filter(([key]) => key !== field))) as unknown as ExecuteAdmission;
    const replacement: JsonValue = value === OTHER_HOST_MODE ? (hostMode === "embedded" ? "detached" : "embedded") : value;
    return Object.freeze({ ...listed, [field]: replacement }) as unknown as ExecuteAdmission;
  }
  /** The own keys whose whole reading (or presence) differs between two admissions. */
  function keysDiffering(first: ExecuteAdmission, second: ExecuteAdmission): string[] {
    const left = first as unknown as Record<string, unknown>;
    const right = second as unknown as Record<string, unknown>;
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])];
    return keys.filter(key => Object.hasOwn(left, key) !== Object.hasOwn(right, key) || wholeOf(left[key]) !== wholeOf(right[key]));
  }
  interface ReadPair {
    readonly grants: readonly string[];
    readonly identity: FunctionIdentity;
  }
  /** The 4 listed host scenarios (the EAT-R154 rows' four): the host's reads at entry, and what the park changes. */
  const BOUNDARY_SCENARIOS: readonly (readonly [string, ReadPair, ReadPair | undefined])[] = [
    ["both grants under local-operator:1000:s1 / s1 throughout", { grants: EXECUTE_AND_ACTION, identity: HOST }, undefined],
    ["the action alone", { grants: [ACTION], identity: HOST }, undefined],
    ["workbench:execute alone", { grants: [EXECUTE_GRANT], identity: HOST }, undefined],
    ["the identity changed to local-operator:0:s9 / s9 during the park", { grants: EXECUTE_AND_ACTION, identity: HOST }, { grants: EXECUTE_AND_ACTION, identity: SWAPPED_IDENTITY }],
  ];
  /** The 4 listed decision readings: the identity read at entry and the host's reads now. */
  const BOUNDARY_READINGS: readonly (readonly [FunctionIdentity, ReadPair])[] = [
    [HOST, { grants: EXECUTE_AND_ACTION, identity: HOST }],
    [HOST, { grants: [ACTION], identity: HOST }],
    [HOST, { grants: [EXECUTE_GRANT], identity: HOST }],
    [HOST, { grants: EXECUTE_AND_ACTION, identity: SWAPPED_IDENTITY }],
  ];
  /** How an admission ends at the boundary: the whole result, the whole authority each dispatch call receives, and the park and dispatch counts. */
  async function endsAs(admission: ExecuteAdmission, entry: ReadPair, change: ReadPair | undefined): Promise<string> {
    let now = entry;
    let parks = 0;
    const received: FunctionDispatchAuthority[] = [];
    const host: FunctionAuthorityHost = { grants: () => now.grants, identity: () => ({ ...now.identity }) };
    const park = async () => {
      parks += 1;
      if (change !== undefined) now = change;
    };
    const dispatch = async (authority: FunctionDispatchAuthority) => {
      received.push(authority);
      return authority.invocationId;
    };
    const result = await dispatchFunctionWithAuthority({ admission, contract: CONTRACT, host, park, dispatch });
    return `${wholeOf(result)}; dispatched with [${received.map(wholeOf).join(", ")}]; parks ${parks}, dispatches ${received.length}`;
  }
  const decidedAs = (admission: ExecuteAdmission, entered: FunctionIdentity, now: ReadPair): string => wholeOf(decideFunctionAuthority({ admission, contract: CONTRACT, entered, current: { grants: now.grants, identity: now.identity } }));

  it("the table's frozen shape: the 6 listed other fields, each with its listed values, are the own keys, in order, beside invocationId and definition, of the admission of the listed request carrying the caller policy {}, in each host mode", () => {
    expect(OTHER_FIELDS.map(([field, values]) => `${field}: ${values.map(labelOf).join(" | ")}`)).toEqual([
      'contractVersion: "workbench.execute/v2" | "" | removed',
      `inputDigest: "sha256:${"cd".repeat(32)}" | "not-a-digest" | removed`,
      'hostMode: the other host mode | "remote" | removed',
      'policy: {} | {"grants":["workbench:execute","fixture-fn:develop-write"],"actionGrant":"fixture-fn:develop-write","reviewed":true} | [1]',
      'grant: "workbench:other" | "workbench:detach" | "" | removed',
      'admissionPolicy: "digest-pinned" | "" | removed',
    ]);
    for (const hostMode of HOST_MODES) {
      const keys = Reflect.ownKeys(listedAdmission(hostMode, {})).map(String);
      expect({ hostMode, others: keys.filter(key => key !== "invocationId" && key !== "definition") }).toEqual({ hostMode, others: OTHER_FIELDS.map(([field]) => field) });
    }
  });

  /** A listed value as the receipt's cut #9 entry spells it. */
  function inReceiptEntry(value: ListedValue): string {
    if (value === REMOVED) return "removed";
    if (value === OTHER_HOST_MODE) return "the other host mode";
    if (value === "") return "the empty string";
    if (value === `sha256:${"cd".repeat(32)}`) return "`sha256:` then `cd` 32 times";
    return `\`${inReceiptWords(value)}\``;
  }

  it("the table's outside anchor: the 6 listed other fields, each with its listed values in order, are the fields and values the cut #9 entry of docs/workbench/receipts/wb-201v.md lists for the listed admission, in that entry's spelling, and the action that entry names is the fixture action (wb-s3lg)", () => {
    const { headings, entry } = cut9ReceiptEntry();
    const listing = /Its (\d+) listed other fields and their listed values: (.+?)\. The action is the fixture spelling `([^`]+)`\./.exec(entry);
    expect({ headings, count: listing?.[1], action: listing?.[3], fields: listing?.[2]?.split(/; (?:and )?/) }).toEqual({
      headings: 1,
      count: String(OTHER_FIELDS.length),
      action: ACTION,
      fields: OTHER_FIELDS.map(([field, values]) => `\`${field}\` (${values.map(inReceiptEntry).join(", ")})`),
    });
  });

  it("in each host mode, each listed value changes the listed admission in exactly its own field, and the 4 listed host scenarios end the listed admission differently (one dispatch resting on local-operator:1000:s1 / s1, a refusal at entry as missing-execute-grant, one at entry as missing-function-action-grant and one at dispatch as changed-effective-identity), and the 4 listed decision readings decide it as authorized, missing-execute-grant, missing-function-action-grant and changed-effective-identity", async () => {
    for (const hostMode of HOST_MODES) {
      const listed = listedAdmission(hostMode);
      for (const [field, values] of OTHER_FIELDS) {
        for (const value of values) expect({ hostMode, field, value: labelOf(value), differing: keysDiffering(listed, handedWith(listed, field, value, hostMode)) }).toEqual({ hostMode, field, value: labelOf(value), differing: [field] });
      }
      const endings = await Promise.all(BOUNDARY_SCENARIOS.map(([, entry, change]) => endsAs(listed, entry, change)));
      const markers = [
        ['status: "dispatched"', 'principal: "local-operator:1000:s1"', 'sessionId: "s1"', "dispatches 1"],
        ['stage: "entry"', 'policy: "missing-execute-grant"', "dispatches 0"],
        ['stage: "entry"', 'policy: "missing-function-action-grant"', "dispatches 0"],
        ['stage: "dispatch"', 'policy: "changed-effective-identity"', "dispatches 0"],
      ];
      expect({ hostMode, distinct: new Set(endings).size, missing: endings.map((ending, index) => markers[index]?.filter(marker => !ending.includes(marker))) }).toEqual({ hostMode, distinct: 4, missing: [[], [], [], []] });
      const decisions = BOUNDARY_READINGS.map(([entered, now]) => decideFunctionAuthority({ admission: listed, contract: CONTRACT, entered, current: { grants: now.grants, identity: now.identity } }));
      expect({ hostMode, decided: decisions.map(decision => (decision.decision === "refused" ? decision.policy : decision.decision)) }).toEqual({ hostMode, decided: ["authorized", "missing-execute-grant", "missing-function-action-grant", "changed-effective-identity"] });
    }
  });

  it("in each host mode, an admission handed to the boundary that differs from the listed admission (the admission of the request for mechanical.development.develop.v1 with the plain task fields and no policy) in exactly one of the 6 listed fields, at each of that field's listed values, ends at each of the 4 listed host scenarios as the listed admission does, byte for byte in the whole readings of the boundary result and of each authority the dispatch callback receives, with the same park and dispatch counts, and is decided at each of the 4 listed decision readings as the listed admission is, in the decision's whole reading", async () => {
    expect(OTHER_FIELDS).toHaveLength(6);
    for (const hostMode of HOST_MODES) {
      const listed = listedAdmission(hostMode);
      for (const [scenario, entry, change] of BOUNDARY_SCENARIOS) {
        const control = await endsAs(listed, entry, change);
        for (const [field, values] of OTHER_FIELDS) {
          for (const value of values) {
            const ending = await endsAs(handedWith(listed, field, value, hostMode), entry, change);
            expect({ hostMode, scenario, field, value: labelOf(value), ending }).toEqual({ hostMode, scenario, field, value: labelOf(value), ending: control });
          }
        }
      }
      for (const [entered, now] of BOUNDARY_READINGS) {
        const control = decidedAs(listed, entered, now);
        for (const [field, values] of OTHER_FIELDS) {
          for (const value of values) {
            const decision = decidedAs(handedWith(listed, field, value, hostMode), entered, now);
            expect({ hostMode, entered, now, field, value: labelOf(value), decision }).toEqual({ hostMode, entered, now, field, value: labelOf(value), decision: control });
          }
        }
      }
    }
  });
});

describe("decideExecute's policy rule at the listed rows: in each host mode, the listed request (the plain task fields, under workbench:execute) of each of the 3 definition kinds execute.ts lists, carrying each of the 6 listed array caller policies, refuses as malformed-policy, read whole, while that request carrying the caller policy {} is admitted (wb-201v)", () => {
  const POLICY_HOST_MODES = ["embedded", "detached"] as const;
  /** The definition kinds, in execute.ts's DEFINITION_KINDS order (the frozen-shape row reads that list from the source). */
  const LISTED_KINDS: readonly DefinitionRef["kind"][] = ["script", "function", "furnace-formula"];
  /** The 6 listed array caller policies. */
  const ARRAY_POLICIES: readonly JsonValue[] = [[], [1], [{}], [EXECUTE_GRANT, ACTION], [{ notes: "A plain note naming no seat token." }], [[{ grants: [EXECUTE_GRANT, ACTION] }]]];
  const SOURCE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  /** decideExecute's decision for the listed request: the given kind, the listed definition id, the plain task fields and the given caller policy, under workbench:execute. */
  function decidedWithPolicy(hostMode: (typeof POLICY_HOST_MODES)[number], kind: DefinitionRef["kind"], policy: JsonValue): ReturnType<typeof decideExecute> {
    const definitionRef: DefinitionRef = { kind, id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST };
    return decideExecute({ definitionRef, input: TASK, hostMode, policy }, { grants: [EXECUTE_GRANT], invocationId: INVOCATION });
  }
  /** The malformed-policy refusal, read whole: a frozen record holding decision, category, reason, policy and the invocation, in that order. */
  const MALFORMED_POLICY = wholeOf(Object.freeze({ decision: "refused", category: "validation", reason: "malformed execute policy", policy: "malformed-policy", invocationId: INVOCATION }));

  it("the table's frozen shape: the 6 listed array caller policies, each an array, and the 3 listed definition kinds, which are the kinds execute.ts lists in DEFINITION_KINDS", () => {
    expect(ARRAY_POLICIES.map(policy => `${Array.isArray(policy) ? "an array" : "not an array"} ${JSON.stringify(policy)}`)).toEqual([
      "an array []",
      "an array [1]",
      "an array [{}]",
      'an array ["workbench:execute","fixture-fn:develop-write"]',
      'an array [{"notes":"A plain note naming no seat token."}]',
      'an array [[{"grants":["workbench:execute","fixture-fn:develop-write"]}]]',
    ]);
    const source = readFileSync(join(SOURCE_ROOT, "src/workbench/execute.ts"), "utf8");
    const listed = /^const DEFINITION_KINDS: readonly string\[\] = \[([^\]]*)\];$/m.exec(source);
    expect([...(listed?.[1] ?? "").matchAll(/"([^"]*)"/g)].map(match => match[1])).toEqual([...LISTED_KINDS]);
  });

  it("the table's outside anchor: the 6 listed array caller policies, in order, are the array caller policies the cut #9 entry of docs/workbench/receipts/wb-201v.md lists in its array-policy frozen-shape row, in that entry's spelling, and that row's count of definition kinds is the 3 listed kinds (wb-s3lg)", () => {
    const { headings, entry } = cut9ReceiptEntry();
    const listing = /a literal pins the (\d+) listed array caller policies, each an array \((.+?)\), and the (\d+) listed definition kinds/.exec(entry);
    expect({ headings, count: listing?.[1], kinds: listing?.[3], policies: [...(listing?.[2] ?? "").matchAll(/`([^`]*)`/g)].map(match => match[1]) }).toEqual({
      headings: 1,
      count: String(ARRAY_POLICIES.length),
      kinds: String(LISTED_KINDS.length),
      policies: ARRAY_POLICIES.map(inReceiptWords),
    });
  });

  it("control: in each host mode, the listed request of each of the 3 listed definition kinds carrying the caller policy {} is admitted, with the policy {} echoed", () => {
    for (const hostMode of POLICY_HOST_MODES) {
      for (const kind of LISTED_KINDS) {
        const decision = decidedWithPolicy(hostMode, kind, {});
        expect({ hostMode, kind, decision: decision.decision, policy: decision.decision === "admitted" ? wholeOf(decision.admission.policy) : undefined }).toEqual({ hostMode, kind, decision: "admitted", policy: "frozen object {  }" });
      }
    }
  });

  it("in each host mode, the listed request of each of the 3 listed definition kinds carrying each of the 6 listed array caller policies refuses as malformed-policy, read whole: a frozen refusal holding decision refused, category validation, reason malformed execute policy, policy malformed-policy and the invocation, in that order", () => {
    expect(ARRAY_POLICIES).toHaveLength(6);
    for (const hostMode of POLICY_HOST_MODES) {
      for (const kind of LISTED_KINDS) {
        for (const policy of ARRAY_POLICIES) expect({ hostMode, kind, policy: JSON.stringify(policy), decision: wholeOf(decidedWithPolicy(hostMode, kind, policy)) }).toEqual({ hostMode, kind, policy: JSON.stringify(policy), decision: MALFORMED_POLICY });
      }
    }
  });
});

describe("the fixed-reason text census: for each of the 7 refusal policies, both listed requests of its pair carry one reason, and it contains none of the 7 texts either request carries: each definition text member (each own key of the admitted definition beside its kind), the fixture action, the invocation, and the entered principal and session (wb-m83p)", () => {
  /** A listed request's texts. */
  interface CensusScenario {
    readonly label: "C" | "D";
    readonly id: string;
    readonly schemaVersion: string;
    readonly artifactDigest: string;
    readonly action: string;
    readonly invocation: string;
    readonly identity: FunctionIdentity;
  }
  const C: CensusScenario = {
    label: "C",
    id: "fixture.census-c.v1",
    schemaVersion: "fixture-schema/c-v3",
    artifactDigest: `sha256:${"0123456789abcdef".repeat(4)}`,
    action: "fixture-fn:census-c-run",
    invocation: "fn_census_c_01",
    identity: { principal: "local-operator:1002:c-user", sessionId: "sess-c-77" },
  };
  const D: CensusScenario = {
    label: "D",
    id: "fixture.census-d.v2",
    schemaVersion: "other-schema/d-v9",
    artifactDigest: `sha256:${"fedcba9876543210".repeat(4)}`,
    action: "fixture-fn:census-d-run",
    invocation: "fn_census_d_02",
    identity: { principal: "local-operator:1003:d-user", sessionId: "sess-d-88" },
  };
  const CENSUS_CONTRACT = adoptFunctionActions([
    { definitionId: C.id, actionGrant: C.action },
    { definitionId: D.id, actionGrant: D.action },
  ]);
  /** The 7 refusal policies, in the order the module's FunctionAuthorityRefusal union lists them (the anchor row reads that union from the source). */
  const CENSUS_POLICIES: readonly FunctionAuthorityRefusal[] = [
    "not-a-function-definition",
    "unknown-identity-data",
    "changed-effective-identity",
    "unknown-permission-data",
    "missing-execute-grant",
    "function-action-unadopted",
    "missing-function-action-grant",
  ];
  const ESCAPE = String.fromCodePoint(0x1b);
  const CENSUS_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  interface CensusRequest {
    readonly label: string;
    readonly scenario: CensusScenario;
    readonly admission: ExecuteAdmission;
    readonly refusal: FunctionAuthorityRefused;
    /** The 7 texts the request carries, by member name. */
    readonly texts: readonly (readonly [string, string])[];
  }
  /** decideExecute's admission of scenario s's request for a definition of the given kind, under workbench:execute, with the plain task fields. */
  function censusAdmission(s: CensusScenario, kind: DefinitionRef["kind"]): ExecuteAdmission {
    const admitted = decideExecute({ definitionRef: { kind, id: s.id, schemaVersion: s.schemaVersion, artifactDigest: s.artifactDigest }, input: TASK, hostMode: "embedded" }, { grants: [EXECUTE_GRANT], invocationId: s.invocation });
    if (admitted.decision !== "admitted") throw new Error(`census admission refused: ${admitted.policy}`);
    return admitted.admission;
  }
  /**
   * Scenario s's listed request for a policy: its admission (a function definition, but under not-a-function-definition a
   * script for C and a furnace-formula for D), the decision built to refuse it with that policy, and its 7 texts.
   */
  function censusRequest(s: CensusScenario, policy: FunctionAuthorityRefusal): CensusRequest {
    const other = s === C ? D : C;
    const admission = censusAdmission(s, policy !== "not-a-function-definition" ? "function" : s === C ? "script" : "furnace-formula");
    const held =
      policy === "missing-execute-grant"
        ? [s.action]
        : policy === "missing-function-action-grant"
          ? [EXECUTE_GRANT, other.action]
          : policy === "unknown-permission-data"
            ? [EXECUTE_GRANT, s.action, `${s.action}:more`]
            : [EXECUTE_GRANT, s.action];
    const read: FunctionIdentity =
      policy === "unknown-identity-data"
        ? { principal: `${s.identity.principal}${ESCAPE}[0m`, sessionId: s.identity.sessionId }
        : policy === "changed-effective-identity"
          ? { principal: `${s.identity.principal}-moved`, sessionId: s.identity.sessionId }
          : s.identity;
    const contract = policy === "function-action-unadopted" ? FUNCTION_ACTION_CONTRACT : CENSUS_CONTRACT;
    const decision = decideFunctionAuthority({ admission, contract, entered: s.identity, current: { grants: held, identity: read } });
    if (decision.decision !== "refused") throw new Error(`expected a ${policy} refusal`);
    const texts: readonly (readonly [string, string])[] = [
      ...definitionTexts(admission.definition),
      ["fixture action", s.action],
      ["invocation", s.invocation],
      ...Reflect.ownKeys(s.identity).map(key => [`entered ${String(key)}`, String(Reflect.get(s.identity, key))] as const),
    ];
    return { label: `${policy}/${s.label}`, scenario: s, admission, refusal: decision, texts };
  }
  /** The census table: per policy, its pair's two requests, C then D. Built inside each case, so a fixture fault fails that case. */
  const censusRows = () => CENSUS_POLICIES.map(policy => ({ policy, requests: [censusRequest(C, policy), censusRequest(D, policy)] as const }));
  function censusRow(policy: FunctionAuthorityRefusal) {
    const row = censusRows().find(candidate => candidate.policy === policy);
    if (row === undefined) throw new Error(`no census row for ${policy}`);
    return row;
  }
  /** The member names of the texts a reason contains. */
  const contained = (reason: string, texts: CensusRequest["texts"]) => texts.filter(([, text]) => reason.includes(text)).map(([member]) => member);

  it("the census table's frozen shape: 7 policy rows, each holding its pair's two requests, C then D, each judged against the same 7 text members", () => {
    expect(censusRows().flatMap(row => row.requests.map(request => `${request.label}:${request.texts.map(([member]) => member).join(",")}`))).toEqual([
      "not-a-function-definition/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "not-a-function-definition/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "unknown-identity-data/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "unknown-identity-data/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "changed-effective-identity/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "changed-effective-identity/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "unknown-permission-data/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "unknown-permission-data/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "missing-execute-grant/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "missing-execute-grant/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "function-action-unadopted/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "function-action-unadopted/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "missing-function-action-grant/C:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
      "missing-function-action-grant/D:id,schemaVersion,artifactDigest,fixture action,invocation,entered principal,entered sessionId",
    ]);
  });

  it("the census's anchors outside its own literals: its policies are the FunctionAuthorityRefusal union the module source declares, in order; each request's first members are, in order, the own keys beside the kind of the definition decideExecute admitted, which are the DefinitionRef members identity.ts declares beside the kind; each request's 7 texts are exactly the texts the module reports for it: that definition's values, the invocation its refusal carries, and the action beside workbench:execute and the value of each own identity key that an authorization of its scenario's function request under the census contract rests on; and no text of one request of a pair holds a text of the other", () => {
    const module = readFileSync(join(CENSUS_ROOT, "src/workbench/function-authority.ts"), "utf8");
    const union = /^export type FunctionAuthorityRefusal =((?:\n {2}\| "[a-z-]+")+);$/m.exec(module);
    expect([...(union?.[1] ?? "").matchAll(/"([a-z-]+)"/g)].map(match => match[1])).toEqual([...CENSUS_POLICIES]);
    const identity = readFileSync(join(CENSUS_ROOT, "src/workbench/identity.ts"), "utf8");
    const declared = [...(/^export interface DefinitionRef \{\n([^}]*)\}$/m.exec(identity)?.[1] ?? "").matchAll(/^ {2}readonly (\w+):/gm)].map(match => match[1]).filter(member => member !== "kind");
    expect(declared).toHaveLength(3);
    for (const row of censusRows()) {
      for (const request of row.requests) {
        const definition = request.admission.definition;
        const own = Reflect.ownKeys(definition)
          .filter(key => key !== "kind")
          .map(key => [String(key), String(Reflect.get(definition, key))]);
        expect(own.map(([member]) => member)).toEqual(declared);
        expect(request.texts.slice(0, own.length)).toEqual(own);
        const control = decideFunctionAuthority({ admission: censusAdmission(request.scenario, "function"), contract: CENSUS_CONTRACT, entered: request.scenario.identity, current: { grants: [EXECUTE_GRANT, request.scenario.action], identity: request.scenario.identity } });
        if (control.decision !== "authorized") throw new Error(`expected the ${request.scenario.label} control to be authorized`);
        const identity = control.authority.identity;
        const reported = [...own.map(([, text]) => text), request.refusal.invocationId, ...control.authority.grants.filter(grant => grant !== EXECUTE_GRANT), ...Reflect.ownKeys(identity).map(key => String(Reflect.get(identity, key)))];
        const judged = request.texts.map(([, text]) => text);
        expect({ label: request.label, unjudged: reported.filter(text => !judged.includes(text)), unreported: judged.filter(text => !reported.includes(text)) }).toEqual({ label: request.label, unjudged: [], unreported: [] });
        expect(judged).toHaveLength(reported.length);
      }
      const [c, d] = row.requests;
      expect({ policy: row.policy, inC: c.texts.flatMap(([, text]) => contained(text, d.texts)), inD: d.texts.flatMap(([, text]) => contained(text, c.texts)) }).toEqual({ policy: row.policy, inC: [], inD: [] });
    }
  });

  it.each(CENSUS_POLICIES)("%s: both listed requests of the pair carry one reason, and it contains none of the 7 texts of either request", policy => {
    const [c, d] = censusRow(policy).requests;
    expect([c.refusal.policy, d.refusal.policy, c.refusal.invocationId, d.refusal.invocationId]).toEqual([policy, policy, C.invocation, D.invocation]);
    expect(c.refusal.reason).toBe(d.refusal.reason);
    expect({ C: contained(c.refusal.reason, c.texts), D: contained(c.refusal.reason, d.texts) }).toEqual({ C: [], D: [] });
  });

  it.each(CENSUS_POLICIES)("%s, planted: the reason with any one of the 7 texts of either request appended in parentheses is caught as containing that text's member", policy => {
    for (const request of censusRow(policy).requests) {
      for (const [member, text] of request.texts) {
        expect({ request: request.label, member, caught: contained(`${request.refusal.reason} (${text})`, request.texts).includes(member) }).toEqual({ request: request.label, member, caught: true });
      }
    }
  });
});

describe("the final reads on both dispatch paths, each reading taken when the boundary settles and again once the timer drain ends: with an admission park and with none, the listed request that passes entry reads the host's grants and identity once more each, each of the 6 listed changes those second reads report refuses at dispatch, and with no change the one dispatch's callback receives the very authority the boundary returns; with a park given, each of the 6 listed entry refusals refuses at entry without calling the park; and with no park, each of the 2 listed changes queued by the final grant read lands after the dispatch (wb-m83p cuts #1 and #3)", () => {
  const PATHS = ["with an admission park", "with no admission park"] as const;
  type DispatchPath = (typeof PATHS)[number];
  const STEADY_GRANTS: readonly string[] = [EXECUTE_GRANT, ACTION];
  const ESCAPE = String.fromCodePoint(0x1b);
  const READS_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  interface SecondReads {
    readonly family: "a dropped authority grant" | "a changed identity field" | "unknown read data";
    readonly member: string;
    readonly policy: FunctionAuthorityRefusal;
    /** What the host's second grants read reports. */
    readonly grants: readonly string[] | undefined;
    /** What the host's second identity read reports. */
    readonly identity: FunctionIdentity;
  }
  /** The 6 listed changes: each grant the authorization rests on dropped, each identity field changed, and each read reporting unknown data. */
  const SECOND_READS: readonly SecondReads[] = [
    { family: "a dropped authority grant", member: EXECUTE_GRANT, policy: "missing-execute-grant", grants: [ACTION], identity: HOST },
    { family: "a dropped authority grant", member: ACTION, policy: "missing-function-action-grant", grants: [EXECUTE_GRANT], identity: HOST },
    { family: "a changed identity field", member: "principal", policy: "changed-effective-identity", grants: STEADY_GRANTS, identity: { principal: "local-operator:1001:s1", sessionId: HOST.sessionId } },
    { family: "a changed identity field", member: "sessionId", policy: "changed-effective-identity", grants: STEADY_GRANTS, identity: { principal: HOST.principal, sessionId: "s2" } },
    { family: "unknown read data", member: "grants", policy: "unknown-permission-data", grants: undefined, identity: HOST },
    { family: "unknown read data", member: "identity", policy: "unknown-identity-data", grants: STEADY_GRANTS, identity: { principal: `${HOST.principal}${ESCAPE}[0m`, sessionId: HOST.sessionId } },
  ];
  const READ_ROWS = PATHS.flatMap(path => SECOND_READS.map(change => ({ path, ...change })));
  /** A host whose first reads report workbench:execute with the action under local-operator:1000:s1 / s1, and whose later reads report `second`. */
  function secondReadHost(second: Pick<SecondReads, "grants" | "identity">) {
    const reads = { grants: 0, identity: 0 };
    const host: FunctionAuthorityHost = {
      grants: () => {
        reads.grants += 1;
        return reads.grants === 1 ? STEADY_GRANTS : second.grants;
      },
      identity: () => {
        reads.identity += 1;
        return reads.identity === 1 ? { ...HOST } : { ...second.identity };
      },
    };
    return { host, reads };
  }
  /** The listed request (the admission of mechanical.development.develop.v1 under the pinned contract) through the boundary on a path, the park released by hand, under a started timer drain. */
  async function throughPath(path: DispatchPath, host: FunctionAuthorityHost, reads: { readonly grants: number; readonly identity: number }) {
    const timers = startTimerDrain();
    const wait = parked();
    const received: FunctionDispatchAuthority[] = [];
    const provider = vi.fn(async () => "ran");
    const loader = vi.fn(async () => provider);
    const pending = dispatchFunctionWithAuthority({
      admission: admissionFor(),
      contract: CONTRACT,
      host,
      ...(path === "with an admission park" ? { park: wait.park } : {}),
      dispatch: async authority => {
        received.push(authority);
        return (await loader())();
      },
    });
    const atEntry = { ...reads };
    wait.release();
    const result = await pending;
    /** The park, loader and provider calls so far, read when called. */
    const calls = () => ({ park: wait.park.mock.calls.length, loader: loader.mock.calls.length, provider: provider.mock.calls.length });
    return { result, atEntry, calls, received, drain: timers.drain };
  }
  interface EntryRefusal {
    readonly policy: FunctionAuthorityRefusal;
    readonly category: string;
    readonly kind: DefinitionRef["kind"];
    readonly contract: FunctionActionContract;
    readonly grants: readonly string[] | undefined;
    readonly identity: FunctionIdentity;
  }
  /** The 6 listed entry refusals: one per policy a request can refuse with at entry, each with an admission park given. */
  const ENTRY_REFUSALS: readonly EntryRefusal[] = [
    { policy: "not-a-function-definition", category: "validation", kind: "script", contract: CONTRACT, grants: STEADY_GRANTS, identity: HOST },
    { policy: "unknown-identity-data", category: "authorization", kind: "function", contract: CONTRACT, grants: STEADY_GRANTS, identity: { principal: `${HOST.principal}${ESCAPE}[0m`, sessionId: HOST.sessionId } },
    { policy: "unknown-permission-data", category: "authorization", kind: "function", contract: CONTRACT, grants: undefined, identity: HOST },
    { policy: "missing-execute-grant", category: "authorization", kind: "function", contract: CONTRACT, grants: [ACTION], identity: HOST },
    { policy: "function-action-unadopted", category: "unavailable", kind: "function", contract: FUNCTION_ACTION_CONTRACT, grants: STEADY_GRANTS, identity: HOST },
    { policy: "missing-function-action-grant", category: "authorization", kind: "function", contract: CONTRACT, grants: [EXECUTE_GRANT, OTHER_FUNCTION_ACTION], identity: HOST },
  ];
  type QueuedState = { grants: readonly string[]; identity: FunctionIdentity };
  /** The 2 listed changes queued by the final grant read: one to each host read. */
  const QUEUED: readonly (readonly ["grants" | "identity", string, (state: QueuedState) => void])[] = [
    [
      "grants",
      "a revoked action grant",
      state => {
        state.grants = [EXECUTE_GRANT];
      },
    ],
    [
      "identity",
      "a changed effective principal",
      state => {
        state.identity = { principal: "local-operator:1001:s1", sessionId: HOST.sessionId };
      },
    ],
  ];

  it("the tables' frozen shape: the 12 second-read rows (2 paths by 6 changes), the 6 entry refusals and the 2 queued changes", () => {
    expect(READ_ROWS.map(row => `${row.path}:${row.family}:${row.member}:${row.policy}`)).toEqual([
      "with an admission park:a dropped authority grant:workbench:execute:missing-execute-grant",
      "with an admission park:a dropped authority grant:fixture-fn:develop-write:missing-function-action-grant",
      "with an admission park:a changed identity field:principal:changed-effective-identity",
      "with an admission park:a changed identity field:sessionId:changed-effective-identity",
      "with an admission park:unknown read data:grants:unknown-permission-data",
      "with an admission park:unknown read data:identity:unknown-identity-data",
      "with no admission park:a dropped authority grant:workbench:execute:missing-execute-grant",
      "with no admission park:a dropped authority grant:fixture-fn:develop-write:missing-function-action-grant",
      "with no admission park:a changed identity field:principal:changed-effective-identity",
      "with no admission park:a changed identity field:sessionId:changed-effective-identity",
      "with no admission park:unknown read data:grants:unknown-permission-data",
      "with no admission park:unknown read data:identity:unknown-identity-data",
    ]);
    expect(ENTRY_REFUSALS.map(row => `${row.policy}:${row.category}`)).toEqual([
      "not-a-function-definition:validation",
      "unknown-identity-data:authorization",
      "unknown-permission-data:authorization",
      "missing-execute-grant:authorization",
      "function-action-unadopted:unavailable",
      "missing-function-action-grant:authorization",
    ]);
    expect(QUEUED.map(([read, change]) => `${read}:${change}`)).toEqual(["grants:a revoked action grant", "identity:a changed effective principal"]);
  });

  it("the tables' anchors outside their own literals: the dropped grants are, in order, the grants an authorization of the listed request rests on, and the changed identity fields its identity's own keys; the unknown-read-data rows and the queued changes each cover, in order, the reads the module source's FunctionAuthorityHost declares; the paths number 2 to the power of the optional members the source's FunctionDispatchOptions declares; the entry refusals with changed-effective-identity are the source's FunctionAuthorityRefusal union; and each second-read change and each queued change alters, from the steady host state, exactly the read and the grant or identity field it names", () => {
    const authorized = decideFunctionAuthority({ admission: admissionFor(), contract: CONTRACT, entered: HOST, current: { grants: STEADY_GRANTS, identity: HOST } });
    if (authorized.decision !== "authorized") throw new Error("expected the listed request to be authorized");
    const members = (family: SecondReads["family"]) => SECOND_READS.filter(row => row.family === family).map(row => row.member);
    expect(members("a dropped authority grant")).toEqual([...authorized.authority.grants]);
    expect(members("a changed identity field")).toEqual(Reflect.ownKeys(authorized.authority.identity));
    const module = readFileSync(join(READS_ROOT, "src/workbench/function-authority.ts"), "utf8");
    const hostReads = [...(/^export interface FunctionAuthorityHost \{\n([\s\S]*?)^\}$/m.exec(module)?.[1] ?? "").matchAll(/^ {2}(\w+)\(\):/gm)].map(match => match[1]);
    expect(hostReads).toHaveLength(2);
    expect(members("unknown read data")).toEqual(hostReads);
    expect(QUEUED.map(([read]) => read)).toEqual(hostReads);
    const optional = [...(/^export interface FunctionDispatchOptions<T> \{\n([\s\S]*?)^\}$/m.exec(module)?.[1] ?? "").matchAll(/^ {2}readonly \w+\?:/gm)];
    expect(optional).toHaveLength(1);
    expect(PATHS).toHaveLength(2 ** optional.length);
    const union = [...(/^export type FunctionAuthorityRefusal =((?:\n {2}\| "[a-z-]+")+);$/m.exec(module)?.[1] ?? "").matchAll(/"([a-z-]+)"/g)].map(match => match[1]);
    expect(union).toHaveLength(7);
    expect([...ENTRY_REFUSALS.map(row => row.policy), "changed-effective-identity"].sort()).toEqual([...union].sort());
    /** The host reads a reported state changes from the steady one (workbench:execute with the action under local-operator:1000:s1 / s1). */
    const changedReads = (state: { readonly grants: readonly string[] | undefined; readonly identity: FunctionIdentity }) =>
      hostReads.filter(read => (read === "grants" ? JSON.stringify(state.grants) !== JSON.stringify(STEADY_GRANTS) : JSON.stringify(state.identity) !== JSON.stringify(HOST)));
    for (const row of SECOND_READS) {
      const dropped = STEADY_GRANTS.filter(grant => !(row.grants ?? STEADY_GRANTS).includes(grant));
      const fields = Reflect.ownKeys(HOST)
        .filter(key => Reflect.get(row.identity, key) !== Reflect.get(HOST, key))
        .map(String);
      const named = row.family === "a dropped authority grant" ? dropped : row.family === "a changed identity field" ? fields : changedReads(row);
      const read = row.family === "a dropped authority grant" ? "grants" : row.family === "a changed identity field" ? "identity" : row.member;
      expect({ row: `${row.family}:${row.member}`, changed: changedReads(row), named }).toEqual({ row: `${row.family}:${row.member}`, changed: [read], named: [row.member] });
    }
    for (const [read, change, apply] of QUEUED) {
      const state: QueuedState = { grants: STEADY_GRANTS, identity: HOST };
      apply(state);
      expect({ change, changed: changedReads(state) }).toEqual({ change, changed: [read] });
    }
  });

  it.each(READ_ROWS.map(row => [row.path, row.family, row.member, row.policy, row] as const))("%s: %s (%s) at the host's second reads refuses at dispatch as %s, with zero loader and provider calls and two grant reads and two identity reads, each read when the boundary settles and again once the timer drain ends", async (_path, _family, _member, _policy, row) => {
    const { host, reads } = secondReadHost(row);
    const run = await throughPath(row.path, host, reads);
    const observe = () => {
      expect(refusalOf(run.result)).toEqual({ stage: "dispatch", policy: row.policy, category: "authorization" });
      expect({ reads, ...run.calls() }).toEqual({ reads: { grants: 2, identity: 2 }, park: row.path === "with an admission park" ? 1 : 0, loader: 0, provider: 0 });
      if (row.path === "with an admission park") expect(run.atEntry).toEqual({ grants: 1, identity: 1 });
    };
    observe();
    await run.drain();
    observe();
  });

  it.each(PATHS)("%s, with no change at the second reads: one dispatch, with one loader and one provider call and two grant reads and two identity reads, each read when the boundary settles and again once the timer drain ends, whose callback receives the very authority object the boundary returns, resting on workbench:execute and the action under local-operator:1000:s1 / s1", async path => {
    const { host, reads } = secondReadHost({ grants: STEADY_GRANTS, identity: HOST });
    const run = await throughPath(path, host, reads);
    const observe = () => {
      if (run.result.status !== "dispatched") throw new Error("expected one dispatch");
      expect({ reads, ...run.calls(), value: run.result.value }).toEqual({ reads: { grants: 2, identity: 2 }, park: path === "with an admission park" ? 1 : 0, loader: 1, provider: 1, value: "ran" });
      expect(run.received).toHaveLength(1);
      expect(run.received[0]).toBe(run.result.authority);
      expect({ grants: run.result.authority.grants, identity: run.result.authority.identity }).toEqual({ grants: [EXECUTE_GRANT, ACTION], identity: HOST });
    };
    observe();
    await run.drain();
    observe();
  });

  it.each(ENTRY_REFUSALS.map(row => [row.policy, row] as const))("with an admission park given, the listed request refused at entry as %s refuses there without calling the park: zero park and dispatch calls and one grant read and one identity read, each read when the boundary settles and again once the timer drain ends", async (_policy, row) => {
    const timers = startTimerDrain();
    const reads = { grants: 0, identity: 0 };
    const host: FunctionAuthorityHost = {
      grants: () => {
        reads.grants += 1;
        return row.grants;
      },
      identity: () => {
        reads.identity += 1;
        return { ...row.identity };
      },
    };
    const wait = parked();
    const dispatch = vi.fn(async () => "ran");
    const pending = dispatchFunctionWithAuthority({ admission: admissionFor(FUNCTION_ID, undefined, TASK, row.kind), contract: row.contract, host, park: wait.park, dispatch });
    wait.release();
    const result = await pending;
    const observe = () => {
      expect(refusalOf(result)).toEqual({ stage: "entry", policy: row.policy, category: row.category });
      expect({ reads, park: wait.park.mock.calls.length, dispatch: dispatch.mock.calls.length }).toEqual({ reads: { grants: 1, identity: 1 }, park: 0, dispatch: 0 });
    };
    observe();
    await timers.drain();
    observe();
  });

  it.each(QUEUED)("with no admission park, a change to the host's %s read (%s) queued as a microtask by the final grant read itself lands after the dispatch: the final grant read queues it, and dispatch is invoked once, on what the host held at that read, after two grant reads, each read when the boundary settles and again once the timer drain ends", async (_read, _change, apply) => {
    const timers = startTimerDrain();
    const state: QueuedState = { grants: STEADY_GRANTS, identity: HOST };
    let grantReads = 0;
    let queued = false;
    const host: FunctionAuthorityHost = {
      grants: () => {
        grantReads += 1;
        if (grantReads === 2) {
          queued = true;
          queueMicrotask(() => apply(state));
        }
        return state.grants;
      },
      identity: () => ({ ...state.identity }),
    };
    const atDispatch: QueuedState[] = [];
    const result = await dispatchFunctionWithAuthority({
      admission: admissionFor(),
      contract: CONTRACT,
      host,
      dispatch: async () => {
        atDispatch.push({ grants: state.grants, identity: { ...state.identity } });
        return "ran";
      },
    });
    const observe = () => {
      expect({ status: result.status, grantReads, queued }).toEqual({ status: "dispatched", grantReads: 2, queued: true });
      expect(atDispatch).toEqual([{ grants: STEADY_GRANTS, identity: HOST }]);
    };
    observe();
    await timers.drain();
    observe();
  });
});

describe("the final reads and the dispatch count at the 4 listed requests, each reading taken when the boundary settles and again once the timer drain ends: in each host mode, carrying no caller policy or the caller policy {}, with an admission park and with none, a request that passes entry reads the host's grants and identity once more each; each of the 6 listed changes those second reads report refuses at dispatch, with zero loader and provider calls; with no change, the one dispatch's callback receives the very authority object the boundary returns; and at each of the 11 listed callback outcomes, the callback is invoked once and the boundary returns the value it resolves with unchanged, or rejects with its rejection or its synchronous throw unchanged (wb-m83p cuts #2 and #3)", () => {
  const LISTED_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  const STEADY: readonly string[] = [EXECUTE_GRANT, ACTION];
  const ESC = String.fromCodePoint(0x1b);
  const PATHS = ["with an admission park", "with no admission park"] as const;
  type ListedPath = (typeof PATHS)[number];
  /** One of the 4 listed requests: the request for mechanical.development.develop.v1 under the pinned contract, in one host mode, carrying no caller policy or the caller policy {}. */
  interface ListedRequest {
    readonly hostMode: ExecuteAdmission["hostMode"];
    readonly policy: JsonValue | undefined;
  }
  const REQUESTS: readonly ListedRequest[] = [
    { hostMode: "embedded", policy: undefined },
    { hostMode: "embedded", policy: {} },
    { hostMode: "detached", policy: undefined },
    { hostMode: "detached", policy: {} },
  ];
  /** A listed request's label, from its own fields. */
  const requestLabel = (request: ListedRequest) => `the ${request.hostMode} request carrying ${request.policy === undefined ? "no caller policy" : `the caller policy ${JSON.stringify(request.policy)}`}`;
  /** The listed request's real workflow_execute admission (decideExecute, under workbench:execute). */
  function admissionOf(request: ListedRequest): ExecuteAdmission {
    const decision = decideExecute(
      { definitionRef: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, input: TASK, hostMode: request.hostMode, ...(request.policy !== undefined ? { policy: request.policy } : {}) },
      { grants: [EXECUTE_GRANT], invocationId: INVOCATION },
    );
    if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
    return decision.admission;
  }
  interface SecondReadChange {
    readonly family: "a dropped authority grant" | "a changed identity field" | "unknown read data";
    readonly member: string;
    readonly policy: FunctionAuthorityRefusal;
    /** What the host's second grants read reports. */
    readonly grants: readonly string[] | undefined;
    /** What the host's second identity read reports. */
    readonly identity: FunctionIdentity;
  }
  /** The 6 listed changes: each grant an authorization rests on dropped, each identity field changed, and each read reporting unknown data. */
  const CHANGES: readonly SecondReadChange[] = [
    { family: "a dropped authority grant", member: EXECUTE_GRANT, policy: "missing-execute-grant", grants: [ACTION], identity: HOST },
    { family: "a dropped authority grant", member: ACTION, policy: "missing-function-action-grant", grants: [EXECUTE_GRANT], identity: HOST },
    { family: "a changed identity field", member: "principal", policy: "changed-effective-identity", grants: STEADY, identity: { principal: "local-operator:1001:s1", sessionId: HOST.sessionId } },
    { family: "a changed identity field", member: "sessionId", policy: "changed-effective-identity", grants: STEADY, identity: { principal: HOST.principal, sessionId: "s2" } },
    { family: "unknown read data", member: "grants", policy: "unknown-permission-data", grants: undefined, identity: HOST },
    { family: "unknown read data", member: "identity", policy: "unknown-identity-data", grants: STEADY, identity: { principal: `${HOST.principal}${ESC}[0m`, sessionId: HOST.sessionId } },
  ];
  /** No change at the second reads: they report the steady state again. */
  const UNCHANGED: Pick<SecondReadChange, "grants" | "identity"> = { grants: STEADY, identity: HOST };
  /** One of the 11 listed callback outcomes: what the dispatch callback does on its first call. */
  interface CallbackOutcome {
    readonly settle: "resolves" | "rejects" | "throws";
    readonly value: unknown;
  }
  const CALLBACK_OUTCOMES: readonly CallbackOutcome[] = [
    { settle: "resolves", value: "ran" },
    { settle: "resolves", value: Object.freeze({ outcome: "ran" }) },
    { settle: "resolves", value: undefined },
    { settle: "resolves", value: null },
    { settle: "resolves", value: false },
    { settle: "resolves", value: 0 },
    { settle: "resolves", value: "" },
    { settle: "rejects", value: new Error("provider failed") },
    { settle: "rejects", value: "provider failed" },
    { settle: "rejects", value: undefined },
    { settle: "throws", value: new Error("loader failed") },
  ];
  /** What an outcome's value is, read from the value itself. */
  const valueLabel = (value: unknown) =>
    value instanceof Error ? "an Error" : value === "" ? "the empty string" : typeof value === "string" ? "a string" : typeof value === "object" && value !== null ? "an object" : String(value);
  /** An outcome's label, from its own fields. */
  const outcomeLabel = (outcome: CallbackOutcome) =>
    outcome.settle === "resolves" ? `resolves ${valueLabel(outcome.value)}` : outcome.settle === "rejects" ? `rejects with ${valueLabel(outcome.value)}` : `throws ${valueLabel(outcome.value)} synchronously`;
  /** What a callback resolves with on any call after its first: never a listed outcome, so a second invocation changes how the boundary settles. */
  const SECOND_CALL = "a second call";
  /** A host whose first reads report workbench:execute with the action under local-operator:1000:s1 / s1, and whose later reads report `second`. */
  function listedHost(second: Pick<SecondReadChange, "grants" | "identity">) {
    const reads = { grants: 0, identity: 0 };
    const host: FunctionAuthorityHost = {
      grants: () => {
        reads.grants += 1;
        return reads.grants === 1 ? STEADY : second.grants;
      },
      identity: () => {
        reads.identity += 1;
        return reads.identity === 1 ? { ...HOST } : { ...second.identity };
      },
    };
    return { host, reads };
  }
  type Settled = { readonly settled: "fulfilled"; readonly result: FunctionDispatchResult<unknown> } | { readonly settled: "rejected"; readonly reason: unknown };
  /** A listed request through the boundary on a path with the given dispatch callback, under a started timer drain; a given park is released by hand. */
  async function throughListed(request: ListedRequest, path: ListedPath, host: FunctionAuthorityHost, reads: { readonly grants: number; readonly identity: number }, dispatch: (authority: FunctionDispatchAuthority) => Promise<unknown>) {
    const timers = startTimerDrain();
    const wait = parked();
    const pending = dispatchFunctionWithAuthority<unknown>({ admission: admissionOf(request), contract: CONTRACT, host, ...(path === "with an admission park" ? { park: wait.park } : {}), dispatch });
    const atEntry = { ...reads };
    wait.release();
    const settled = await pending.then(
      (result): Settled => ({ settled: "fulfilled", result }),
      (reason: unknown): Settled => ({ settled: "rejected", reason }),
    );
    return { settled, atEntry, parked: wait.park, drain: timers.drain };
  }
  const SECOND_READ_ROWS = REQUESTS.flatMap(request => PATHS.flatMap(path => CHANGES.map(change => ({ request, path, change }))));
  const STEADY_ROWS = REQUESTS.flatMap(request => PATHS.map(path => ({ request, path })));
  const OUTCOME_ROWS = REQUESTS.flatMap(request => PATHS.flatMap(path => CALLBACK_OUTCOMES.map(outcome => ({ request, path, outcome }))));

  it("the tables' frozen shape: the 4 listed requests, the 2 paths, the 6 listed changes and the 11 listed callback outcomes, and the 48 second-read rows, the 8 steady rows and the 88 outcome rows they make, in order", () => {
    expect(REQUESTS.map(requestLabel)).toEqual([
      "the embedded request carrying no caller policy",
      "the embedded request carrying the caller policy {}",
      "the detached request carrying no caller policy",
      "the detached request carrying the caller policy {}",
    ]);
    expect([...PATHS]).toEqual(["with an admission park", "with no admission park"]);
    expect(CHANGES.map(change => `${change.family}:${change.member}:${change.policy}`)).toEqual([
      "a dropped authority grant:workbench:execute:missing-execute-grant",
      "a dropped authority grant:fixture-fn:develop-write:missing-function-action-grant",
      "a changed identity field:principal:changed-effective-identity",
      "a changed identity field:sessionId:changed-effective-identity",
      "unknown read data:grants:unknown-permission-data",
      "unknown read data:identity:unknown-identity-data",
    ]);
    expect(CALLBACK_OUTCOMES.map(outcomeLabel)).toEqual([
      "resolves a string",
      "resolves an object",
      "resolves undefined",
      "resolves null",
      "resolves false",
      "resolves 0",
      "resolves the empty string",
      "rejects with an Error",
      "rejects with a string",
      "rejects with undefined",
      "throws an Error synchronously",
    ]);
    const key = (...parts: readonly string[]) => parts.join(" | ");
    expect(SECOND_READ_ROWS.map(row => key(requestLabel(row.request), row.path, row.change.member))).toEqual(REQUESTS.flatMap(request => PATHS.flatMap(path => CHANGES.map(change => key(requestLabel(request), path, change.member)))));
    expect(STEADY_ROWS.map(row => key(requestLabel(row.request), row.path))).toEqual(REQUESTS.flatMap(request => PATHS.map(path => key(requestLabel(request), path))));
    expect(OUTCOME_ROWS.map(row => key(requestLabel(row.request), row.path, outcomeLabel(row.outcome)))).toEqual(REQUESTS.flatMap(request => PATHS.flatMap(path => CALLBACK_OUTCOMES.map(outcome => key(requestLabel(request), path, outcomeLabel(outcome))))));
    expect([SECOND_READ_ROWS.length, STEADY_ROWS.length, OUTCOME_ROWS.length]).toEqual([48, 8, 88]);
  });

  it("the tables' anchors outside their own literals: the requests' host modes are execute.ts's EXECUTE_HOST_MODES, each mode with as many requests as 2 to the power of the optional members execute.ts's ExecuteAdmission declares, and each request's admission holds its host mode and holds the policy exactly when the request carries one; each of the module source's claim sites that counts listed requests or listed callback outcomes names these tables' counts, and its outcome list names, by kind, the values the outcomes settle with; the paths number 2 to the power of the optional members the module's FunctionDispatchOptions declares; the dropped grants are, in order, the grants an authorization of each request rests on, the changed identity fields its identity's own keys, and the unknown-read-data rows the reads the module's FunctionAuthorityHost declares; and each change alters, from the steady host state, exactly the read and the grant or identity field it names", () => {
    const execute = readFileSync(join(LISTED_ROOT, "src/workbench/execute.ts"), "utf8");
    const admissionOptional = [...(/^export interface ExecuteAdmission \{\n([\s\S]*?)^\}$/m.exec(execute)?.[1] ?? "").matchAll(/^ {2}readonly (\w+)\?:/gm)].map(match => match[1]);
    expect(admissionOptional).toEqual(["policy"]);
    expect(REQUESTS.map(request => request.hostMode)).toEqual(EXECUTE_HOST_MODES.flatMap(mode => Array.from({ length: 2 ** admissionOptional.length }, () => mode)));
    for (const request of REQUESTS) {
      const admission = admissionOf(request);
      expect({ request: requestLabel(request), hostMode: admission.hostMode, policy: Object.hasOwn(admission, "policy") ? admission.policy : "absent" }).toEqual({ request: requestLabel(request), hostMode: request.hostMode, policy: request.policy ?? "absent" });
    }
    for (const mode of EXECUTE_HOST_MODES) expect(REQUESTS.filter(request => request.hostMode === mode).map(request => request.policy === undefined)).toEqual([true, false]);
    const module = readFileSync(join(LISTED_ROOT, "src/workbench/function-authority.ts"), "utf8");
    /** The module's text as one line of prose: each line's comment marker dropped, whitespace runs collapsed. */
    const prose = module
      .split("\n")
      .map(line => line.replace(/^\s*(?:\/\*\*|\*\/|\*|\/\/)\s?/, ""))
      .join(" ")
      .replace(/\s+/g, " ");
    const counts = (pattern: RegExp) => [...prose.matchAll(pattern)].map(match => Number(match[1]));
    expect(counts(/\b(\d+) listed requests\b/g)).toEqual([REQUESTS.length, REQUESTS.length, REQUESTS.length]);
    expect(counts(/\b(\d+) listed callback outcomes\b/g)).toEqual([CALLBACK_OUTCOMES.length, CALLBACK_OUTCOMES.length]);
    const byKind = /\b(\d+) listed callback outcomes \((\d+) resolutions: ([^;]+); (\d+) rejections: ([^;]+); and (\d+) synchronous throws? of ([^)]+)\)/.exec(prose);
    const named = (list: string | undefined) => (list ?? "").split(/, | and /).map(item => item.trim());
    const ofKind = (settle: CallbackOutcome["settle"]) => CALLBACK_OUTCOMES.filter(outcome => outcome.settle === settle).map(outcome => valueLabel(outcome.value));
    expect({
      total: Number(byKind?.[1]),
      resolutions: [Number(byKind?.[2]), named(byKind?.[3])],
      rejections: [Number(byKind?.[4]), named(byKind?.[5])],
      throws: [Number(byKind?.[6]), named(byKind?.[7])],
    }).toEqual({
      total: CALLBACK_OUTCOMES.length,
      resolutions: [ofKind("resolves").length, ofKind("resolves")],
      rejections: [ofKind("rejects").length, ofKind("rejects")],
      throws: [ofKind("throws").length, ofKind("throws")],
    });
    const optional = [...(/^export interface FunctionDispatchOptions<T> \{\n([\s\S]*?)^\}$/m.exec(module)?.[1] ?? "").matchAll(/^ {2}readonly \w+\?:/gm)];
    expect(optional).toHaveLength(1);
    expect(PATHS).toHaveLength(2 ** optional.length);
    const hostReads = [...(/^export interface FunctionAuthorityHost \{\n([\s\S]*?)^\}$/m.exec(module)?.[1] ?? "").matchAll(/^ {2}(\w+)\(\):/gm)].map(match => match[1]);
    expect(hostReads).toHaveLength(2);
    const members = (family: SecondReadChange["family"]) => CHANGES.filter(change => change.family === family).map(change => change.member);
    expect(members("unknown read data")).toEqual(hostReads);
    for (const request of REQUESTS) {
      const authorized = decideFunctionAuthority({ admission: admissionOf(request), contract: CONTRACT, entered: HOST, current: { grants: STEADY, identity: HOST } });
      if (authorized.decision !== "authorized") throw new Error(`expected ${requestLabel(request)} to be authorized`);
      expect({ request: requestLabel(request), dropped: members("a dropped authority grant"), fields: members("a changed identity field") }).toEqual({ request: requestLabel(request), dropped: [...authorized.authority.grants], fields: Reflect.ownKeys(authorized.authority.identity) });
    }
    /** The host reads a reported state changes from the steady one (workbench:execute with the action under local-operator:1000:s1 / s1). */
    const changedReads = (state: Pick<SecondReadChange, "grants" | "identity">) =>
      hostReads.filter(read => (read === "grants" ? JSON.stringify(state.grants) !== JSON.stringify(STEADY) : JSON.stringify(state.identity) !== JSON.stringify(HOST)));
    expect(changedReads(UNCHANGED)).toEqual([]);
    for (const change of CHANGES) {
      const dropped = STEADY.filter(grant => !(change.grants ?? STEADY).includes(grant));
      const fields = Reflect.ownKeys(HOST)
        .filter(key => Reflect.get(change.identity, key) !== Reflect.get(HOST, key))
        .map(String);
      const named = change.family === "a dropped authority grant" ? dropped : change.family === "a changed identity field" ? fields : changedReads(change);
      const read = change.family === "a dropped authority grant" ? "grants" : change.family === "a changed identity field" ? "identity" : change.member;
      expect({ change: `${change.family}:${change.member}`, changed: changedReads(change), named }).toEqual({ change: `${change.family}:${change.member}`, changed: [read], named: [change.member] });
    }
  });

  it.each(SECOND_READ_ROWS.map(row => [requestLabel(row.request), row.path, row.change.family, row.change.member, row.change.policy, row] as const))(
    "%s, %s: %s (%s) at the host's second reads refuses at dispatch as %s, with zero callback, loader and provider calls and two grant reads and two identity reads, each read when the boundary settles and again once the timer drain ends",
    async (_request, _path, _family, _member, _policy, row) => {
      const { host, reads } = listedHost(row.change);
      const received: FunctionDispatchAuthority[] = [];
      const provider = vi.fn(async () => "ran");
      const loader = vi.fn(async () => provider);
      const run = await throughListed(row.request, row.path, host, reads, async authority => {
        received.push(authority);
        return (await loader())();
      });
      const observe = () => {
        if (run.settled.settled !== "fulfilled") throw new Error("expected the boundary to settle with a refusal");
        expect(refusalOf(run.settled.result)).toEqual({ stage: "dispatch", policy: row.change.policy, category: "authorization" });
        expect({ reads, park: run.parked.mock.calls.length, callbacks: received.length, loader: loader.mock.calls.length, provider: provider.mock.calls.length }).toEqual({
          reads: { grants: 2, identity: 2 },
          park: row.path === "with an admission park" ? 1 : 0,
          callbacks: 0,
          loader: 0,
          provider: 0,
        });
        if (row.path === "with an admission park") expect(run.atEntry).toEqual({ grants: 1, identity: 1 });
      };
      observe();
      await run.drain();
      observe();
    },
  );

  it.each(STEADY_ROWS.map(row => [requestLabel(row.request), row.path, row] as const))(
    "%s, %s, with no change at the second reads: one dispatch, with one callback, loader and provider call each and two grant reads and two identity reads, each read when the boundary settles and again once the timer drain ends, whose callback receives the very authority object the boundary returns, resting on workbench:execute and the action under local-operator:1000:s1 / s1",
    async (_request, _path, row) => {
      const { host, reads } = listedHost(UNCHANGED);
      const received: FunctionDispatchAuthority[] = [];
      const provider = vi.fn(async () => "ran");
      const loader = vi.fn(async () => provider);
      const run = await throughListed(row.request, row.path, host, reads, async authority => {
        received.push(authority);
        return (await loader())();
      });
      const observe = () => {
        if (run.settled.settled !== "fulfilled" || run.settled.result.status !== "dispatched") throw new Error("expected one dispatch");
        const result = run.settled.result;
        expect({ reads, park: run.parked.mock.calls.length, callbacks: received.length, loader: loader.mock.calls.length, provider: provider.mock.calls.length, value: result.value }).toEqual({
          reads: { grants: 2, identity: 2 },
          park: row.path === "with an admission park" ? 1 : 0,
          callbacks: 1,
          loader: 1,
          provider: 1,
          value: "ran",
        });
        expect(received[0]).toBe(result.authority);
        expect({ grants: result.authority.grants, identity: result.authority.identity }).toEqual({ grants: [EXECUTE_GRANT, ACTION], identity: HOST });
      };
      observe();
      await run.drain();
      observe();
    },
  );

  it.each(OUTCOME_ROWS.map(row => [requestLabel(row.request), row.path, outcomeLabel(row.outcome), row] as const))(
    "%s, %s: a dispatch callback that %s is invoked once, with two grant reads and two identity reads, each read when the boundary settles and again once the timer drain ends, on an authority resting on workbench:execute and the action under local-operator:1000:s1 / s1, and the boundary returns the value it resolves with unchanged, or rejects with its rejection or its throw unchanged",
    async (_request, _path, _outcome, row) => {
      const { host, reads } = listedHost(UNCHANGED);
      const received: FunctionDispatchAuthority[] = [];
      const run = await throughListed(row.request, row.path, host, reads, authority => {
        received.push(authority);
        if (received.length > 1) return Promise.resolve(SECOND_CALL);
        if (row.outcome.settle === "throws") throw row.outcome.value;
        return row.outcome.settle === "rejects" ? Promise.reject(row.outcome.value) : Promise.resolve(row.outcome.value);
      });
      const observe = () => {
        expect({ reads, park: run.parked.mock.calls.length, callbacks: received.length, settled: run.settled.settled }).toEqual({
          reads: { grants: 2, identity: 2 },
          park: row.path === "with an admission park" ? 1 : 0,
          callbacks: 1,
          settled: row.outcome.settle === "resolves" ? "fulfilled" : "rejected",
        });
        expect({ grants: received[0]?.grants, identity: received[0]?.identity }).toEqual({ grants: [EXECUTE_GRANT, ACTION], identity: HOST });
        if (run.settled.settled === "rejected") {
          expect(run.settled.reason).toBe(row.outcome.value);
          return;
        }
        if (run.settled.result.status !== "dispatched") throw new Error("expected one dispatch");
        expect(run.settled.result.value).toBe(row.outcome.value);
        expect(received[0]).toBe(run.settled.result.authority);
      };
      observe();
      await run.drain();
      observe();
    },
  );
});

describe("the timer drain (wb-m83p cut #3): it fakes the 6 listed timer functions, the ones the module header names, in order, and only those, each restored by the real timers; its sentinel is planted 2147483647 ms out, as the module header says, and a drain ends with it run once and no timer left; and each of the module's 5 listed claim sites names the end of the timer drain", () => {
  const DRAIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
  /** The module's 5 listed claim sites that take their readings at the two points, each with how its text is cut from the module source (the fifth, wb-rrni's). */
  const CLAIM_SITES: readonly (readonly [string, RegExp])[] = [
    ["the module header's final-reads paragraph", /^\/\*\*\n([\s\S]*?)\n \*\n \* Host authority,/m],
    ["the module header's EAT-R031 line", /^ \* {3}EAT-R031 {2}([\s\S]*?)\n \* {3}EAT-R154/m],
    ["the doc of FunctionDispatchOptions.dispatch", /\/\*\*\n((?:(?!\*\/)[\s\S])*?)\*\/\n {2}readonly dispatch: /],
    ["the doc of dispatchFunctionWithAuthority", /\/\*\*\n((?:(?!\*\/)[\s\S])*?)\*\/\nexport async function dispatchFunctionWithAuthority</],
    ["the module header's wb-rrni paragraph", /^ \* Read twice at the rows wb-rrni lists ([\s\S]*?)\n \*\n \* PARTIAL by plan/m],
  ];
  /** A cut of the module source as one line of prose: each line's comment marker dropped, whitespace runs collapsed. */
  const proseOf = (text: string) =>
    text
      .split("\n")
      .map(line => line.replace(/^\s*(?:\/\*\*|\*\/|\*|\/\/)\s?/, ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  /** The phrase each listed claim site names the end of the timer drain by. */
  const DRAIN_END = "once the timer drain ends";
  /** Each own global function of this realm, by name (read through its property descriptor, so no getter runs). */
  const globalFunctions = () =>
    new Map(
      Reflect.ownKeys(globalThis)
        .filter((key): key is string => typeof key === "string")
        .flatMap(key => {
          const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
          return descriptor !== undefined && typeof descriptor.value === "function" ? [[key, descriptor.value as unknown] as const] : [];
        }),
    );

  it("the drain's frozen shape: the 6 faked timer functions in order, the sentinel delay, and the 5 listed claim sites in order", () => {
    expect([...DRAIN_FAKES]).toEqual(["setTimeout", "clearTimeout", "setInterval", "clearInterval", "setImmediate", "clearImmediate"]);
    expect(SENTINEL_DELAY).toBe(2147483647);
    expect(CLAIM_SITES.map(([site]) => site)).toEqual([
      "the module header's final-reads paragraph",
      "the module header's EAT-R031 line",
      "the doc of FunctionDispatchOptions.dispatch",
      "the doc of dispatchFunctionWithAuthority",
      "the module header's wb-rrni paragraph",
    ]);
  });

  it("the drain's anchors outside its own literals: the module header's timer drain sentence names, in order, exactly the timer functions the drain fakes and the delay its sentinel is planted at; while a drain is started, the global functions it replaces are exactly those it fakes, and the real timers restore each; a drain started with nothing else planted ends with its sentinel, not run before, run once and no timer left; and each listed claim site's text names the end of the timer drain, which the module's prose names once per listed site", async () => {
    const module = readFileSync(join(DRAIN_ROOT, "src/workbench/function-authority.ts"), "utf8");
    const header = proseOf(/^\/\*\*\n([\s\S]*?)\n \*\//.exec(module)?.[1] ?? "");
    const drainSentence = /The timer drain: (.*?) A call, read or wait that lands after the timer drain ends is NOT CLAIMED/.exec(header)?.[1] ?? "";
    expect({ faked: drainSentence.match(/\b(?:set|clear)(?:Timeout|Interval|Immediate)\b/g) ?? [], sentinel: Number(/sentinel timer planted (\d+) ms out/.exec(drainSentence)?.[1]) }).toEqual({ faked: [...DRAIN_FAKES], sentinel: SENTINEL_DELAY });
    const real = globalFunctions();
    const timers = startTimerDrain();
    const replaced = [...real].filter(([name, value]) => Reflect.get(globalThis, name) !== value).map(([name]) => name);
    expect([...replaced].sort()).toEqual([...DRAIN_FAKES].sort());
    expect(timers.sentinel).not.toHaveBeenCalled();
    await timers.drain();
    vi.useRealTimers();
    expect([...real].filter(([name, value]) => Reflect.get(globalThis, name) !== value).map(([name]) => name)).toEqual([]);
    for (const [site, cut] of CLAIM_SITES) {
      const text = cut.exec(module)?.[1];
      expect({ site, cut: text !== undefined, names: proseOf(text ?? "").includes(DRAIN_END) }).toEqual({ site, cut: true, names: true });
    }
    expect(proseOf(module).split(DRAIN_END).length - 1).toBe(CLAIM_SITES.length);
  });

  it("each listed claim site's cut is its own (wb-uqax): it cuts a text of the module whose prose opens on the 8 words this row pins for that site; and each drain-end phrase of the module's source, found there as often as the module's prose names one, sits inside exactly one listed site's text, each listed site's text holding exactly one", () => {
    const module = readFileSync(join(DRAIN_ROOT, "src/workbench/function-authority.ts"), "utf8");
    const cuts = CLAIM_SITES.map(([site, cut]) => {
      const match = new RegExp(cut.source, `${cut.flags}d`).exec(module);
      const [start, end] = match?.indices?.[1] ?? [-1, -1];
      return { site, start, end, opening: proseOf(match?.[1] ?? "").split(" ").slice(0, 8).join(" ") };
    });
    expect(cuts.map(({ site, opening }) => `${site}: ${opening}`)).toEqual([
      "the module header's final-reads paragraph: function-authority.ts — the authority seam at the FINAL",
      "the module header's EAT-R031 line: at the suite's 4 listed requests (the final",
      "the doc of FunctionDispatchOptions.dispatch: The loader and provider calls. At the rows",
      "the doc of dispatchFunctionWithAuthority: The final dispatch boundary, in three steps where",
      "the module header's wb-rrni paragraph: (the R694 follow-up of landing 1049): each listed",
    ]);
    const lineAt = (at: number) => module.slice(0, at).split("\n").length;
    const phrases = [...module.matchAll(new RegExp(DRAIN_END.split(" ").join(String.raw`[\s*/]+`), "g"))].map(found => ({
      line: lineAt(found.index),
      sites: cuts.filter(({ start, end }) => start <= found.index && found.index + found[0].length <= end).map(({ site }) => site),
    }));
    expect(phrases).toHaveLength(proseOf(module).split(DRAIN_END).length - 1);
    expect(phrases.filter(({ sites }) => sites.length !== 1)).toEqual([]);
    expect(cuts.map(({ site }) => ({ site, phrases: phrases.filter(({ sites }) => sites.includes(site)).length }))).toEqual(cuts.map(({ site }) => ({ site, phrases: 1 })));
  });
});
