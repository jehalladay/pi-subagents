/**
 * wb-jwc.5 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17), the standing leg of a gated requirement:
 * the posture a future committing rf capability must take, pinned while Pi registers none.
 * Statement (the bead's export title, ASCII-quoted up to its own truncation): "Any future committing rf capability shall
 * register with a non-read effectClass, pass a stable --idempotency-key on the render argv, and on any committed or unknown
 * outcome reconcile via rf operation show instead of retrying - never directing or performing a retry after a diagnostic with
 * metadata.committed=true or an authoritative committed receipt (FOC/03:40@8a8b83e4d), and never treating not-found/stdout
 * absence as proof of no c...". Gate (the description, conjoint): rf operation show registered leaf + --idempotency-key on
 * context render + FOC-ADR-03 landed in an installed rf, conjoined with wb-x32 resolving to a committing render.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base cd8927f; re-run green at bb96515, whose landing 597 touched
 * one other census and .beads only; the rf readings below re-read unchanged by the cut #2 seat at dab445f and by the cut
 * #3 seat at 5ffe345). The installed rf
 * reads 0.1.845 (`rf --json --version`: 80 leaves, context.render and operation.show both served_reachable). `rf context
 * render --help` serves `--idempotency-key KEY` ("the same key with the same request replays the committed receipt ... the
 * same key with a different request is exit 4 RF_IDEMPOTENCY_KEY_CONFLICT, and a key with --no-commit is exit 2"). `rf
 * operation show --help` reads "Read the durable receipt of an invocation from the journal by its rfo_ operation id:
 * committed with the render_id and transaction_id it produced, or exit 3 when no committed render carries the id": the
 * shipped reader answers committed or exit 3, not the five receipt states ACCEPTANCE[2] names, so an exit 3 is exactly the
 * not_found reading that must never conclude effect-absent while an attempt may still commit. The rf conjuncts are therefore
 * met on this host; the gate stays CLOSED on its last conjunct: wb-x32 (W10 provider/interop) is open and has not resolved
 * to a committing render. In Pi at the base, src registers no committing rf capability: its two rf descriptor literals
 * (providers/reactivefiber.ts, the injected and the native registration) are the noncommitted preview, effectClass read,
 * permission reactivefiber:render, contract the carrier naming `context.render --no-commit`; its one rf launch is
 * nativeReactiveFiberRender's spawn of renderArgv, which always ends --no-commit --no-input --json; its only
 * SIGTERM-then-SIGKILL(500 ms) escalation is that function's stop(); src spells no rf operation-show leaf in any form the
 * LEAF READER reads; and RECONCILE_EVIDENCE_READS.reactivefiber names the preview alone. The censuses of wb-a9l2.8
 * (test/workbench-rf-graph-mutation-census.test.ts, row B: a committing render judged on its effectClass only) and wb-tnz5.5
 * (test/workbench-rf-federation-pin-changed-census.test.ts, B7/B8: a refused commit) left the committing render's receipt
 * rule (--idempotency-key, rf operation show) and its timeout/kill/unknown outcomes to this bead.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the clause it answers; every pin returns a measured witness held to WITNESS):
 *  A, ACCEPTANCE[0]. The committing-render admission rule (judge): an rf-driving descriptor (a reactivefiber.* id, or a
 *    contract RF_CONTRACT matches, see RF FAMILY) whose contract names context.render without --no-commit is a committing
 *    render, and it must declare a non-read effectClass, name --idempotency-key, name rf operation show and carry a
 *    permission no read grant is; an rf-driving descriptor with no contract cannot be judged and is refused. A1
 *    (effectClass): both real registrations, and every src literal the SRC READER judges rf-driving, are noncommitting
 *    reads (zero findings); the reader leaves no detected src literal UNREAD (an empty list); the src calls spelled
 *    register that hold no register-position literal are exactly the two pinned forwarding sites (REGISTER SITES); and
 *    CapabilityRegistry.register serves a copy (a write to the registered descriptor object afterwards does not reach the
 *    descriptor it serves). Planted module trees exercise every form the reader reads (each a committing literal that
 *    draws every finding), every form it refuses as UNREAD or reports as a forwarding site (each SEALED rewrite form and
 *    each form outside the register position among them), every form it excepts, and each channel named under NOT CLAIMED
 *    (PLANTED_UNSEEN: its reading pinned as the quiet value it gives); the rule refuses a committing render declared read
 *    (rf's whitespace spelling `context render` included) while admitting write, external and unknown. A2
 *    (--idempotency-key): the rule refuses a committing contract without the flag (prose naming the key included), and the
 *    live preview argv for both input arms carries --no-commit and no key (rf refuses the pair, exit 2).
 *  B, ACCEPTANCE[1], through a test-only committing stand-in (COMMIT_ID: write, reactivefiber:commit, a rule-compliant
 *    contract) whose provider spawns a stand-in rf with a committing argv, --idempotency-key <stable key> and no --no-commit,
 *    and never kills it (a commit may already be durable). B1: for each outcome the clause names (timeout, kill, unknown) the
 *    registry surfaces uncertain-effect ("Reconcile with the producer before retrying") and the stand-in records exactly one
 *    spawn; each arm pins the deadlineMs field it ran under, and the kill and unknown arms pin actedAfterHold (TIMING). B2:
 *    Pi's runtime, through the Claude host, fails the run uncertain-effect after one spawn, its live retry control answers
 *    false for the in-flight node (a forward guard, see NOT CLAIMED), and a resume of the journal refuses uncertain-effect
 *    naming the producer with zero spawns.
 *  C, ACCEPTANCE[2], over the journal of a timed-out committing run (each pin holds that run to failed, uncertain-effect,
 *    one spawn). C1 (receipt states): no reader of them exists today - the reconcile roster offers the preview as the only
 *    reactivefiber evidence read, an evidence request naming an operation-show reader is refused, src holds no spelling of
 *    the leaf the LEAF READER reads (a planted control pins each form it reads and its near misses, and LEAF_UNSEEN pins a
 *    rewritten word array as not expanded), and the rule refuses a committing contract that does not name rf operation
 *    show. C2 (not_found never concludes effect-absent): while the run is active the core refuses any acknowledgement;
 *    once settled, effect-absent citing the not-found read (outcome unavailable) and a returned preview read is
 *    operator-asserted, never producer-confirmed; the override after it is refused until the operator accepts the
 *    possible-duplicate risk; effect-confirmed on the failed read alone is refused.
 *  D, ACCEPTANCE[3], the negative guards. D1: the two preview descriptor literals are byte-stable (digests of their source
 *    text) and both registrations serve the same descriptor. D2: src's one SIGTERM-SIGKILL(500 ms) custody sits in
 *    nativeReactiveFiberRender, whose one spawn runs renderArgv (always --no-commit) and whose only callers are the preview's;
 *    the custody reaps a stand-in that ignores SIGTERM, spawned with --no-commit and no key. D3: hosts/local-detached.ts keeps
 *    NATIVE_GRANTS and NATIVE_CAPABILITIES as read grants and read capabilities, its reactivefiber case registers the preview
 *    alone, and the preview holds exactly NATIVE_GRANTS.reactivefiber. D4: the rule refuses a committing render holding no
 *    permission or only read grants, and the registry refuses the stand-in under the preview grant with zero spawns and
 *    admits it under its own grant (one spawn, under SETTLE_MS, actedAfterHold).
 * SRC READER (A1; cut #3 adds SEALED, the register position and REGISTER SITES). The src tree is every .ts module under src
 * (the srcFiles walk; a planted tree lists its .ts modules the same way). Detected: every object literal of a src module
 * in the REGISTER POSITION, and every other object literal that carries an `id` member together with an
 * `effectClass` or a `contractSource` member, or whose `id` reads as a reactivefiber.* string. The REGISTER POSITION is
 * the `descriptor` member, written inline, of an object literal whose keys all read, with no spread member and no other
 * member keyed `descriptor`, itself written inline as the first argument of a call whose callee is spelled `register` or
 * `<expression>.register` (parentheses, `as`, `satisfies`, `!` and type assertions aside). A key reads when it is an
 * identifier, a string literal, or a computed name whose expression reads. A value reads through string and
 * no-substitution template literals, `+` concatenations and templates whose every part reads, a name the module declares
 * exactly once as a const with an initializer or as an import (variables, parameters, functions, classes, enums and
 * imports are counted, so a shadowed or let/var-bound name does not read), named and aliased imports, namespace-import
 * members, re-exports (named, aliased and `export * from`) and local export aliases, each followed to the exporting src
 * module (relative specifiers only), and members of SEALED const object literals (Object.freeze({...}) followed unless
 * the module declares its own `Object`; an object literal with a spread member has no member that reads; an accessor or
 * method member never reads). SEALED: a const's own object or array literal (through wrappers and `.freeze(...)`), and
 * every object or array literal nested in its members or elements, is sealed when every reference the tree's modules hold
 * to it - its name in its own module, an import of it under any name, a namespace-import member access, counting every
 * same-named binding of a module whatever its scope and every re-export path - is either the object of a member read
 * chain that is not the target of an assignment of any operator, of ++/--, of delete, of a destructuring assignment or of
 * a for-in/for-of head, and that reads as a string where it is used (a callee, a function, an object, an array or a
 * number never does); or a spread (`...`) every value of which reads as a string. Any other reference (the object passed,
 * bound, returned or placed in a literal, a shorthand member included; a namespace import used other than through member
 * reads whose names read, re-exported, or a module re-exported by `export * as`) leaves it OPEN, with every literal nested
 * in it: members of an open object, and elements of an open array, do not read; a local export alias (`export { X }`) is
 * not a use, its importers' references are. rf-ness is decided by the id (a reactivefiber.* string) or by RF_CONTRACT over
 * the contract's static text (each unread part a placeholder), and a literal that is not rf-driving needs only its id to
 * read. A literal is UNREAD when its id does not read; when it carries a spread member or a key that does not read; when
 * it carries an accessor or method member (`accessor`: a getter or method can rewrite the literal while
 * CapabilityRegistry.register validates it, before the copy); when it is rf-driving and its effectClass, or its
 * contractSource in full, does not read; or when it is not in the register position (`position`: a literal held anywhere
 * else can be rewritten before it is registered). A literal that would be UNREAD is instead an excepted projection when
 * it is NOT in the register position, has no unread key, and each of its id, effectClass and contractSource members
 * (those present) is `B.field` off one same base B (reached through `??` left operands and the first arguments of
 * wrapping calls): a view that copies those fields from another descriptor value.
 * REGISTER SITES (A1). A src call whose callee is spelled `register` or `<expression>.register` and whose first argument is
 * not an object literal holding a register-position literal is a FORWARDING site: what it registers, if anything, the
 * reader cannot judge. A1 pins the src list of forwarding sites (today the two in hosts/local-detached.ts registryFor,
 * which register the local provider module's descriptors, held outside src), so a new one reds A1.
 * RF FAMILY (RF_CONTRACT, case-insensitive): `rf@` with `rf` starting a word; `reactive-fiber.cli/`; `reactive` then
 * `fiber` with one whitespace character, dot, underscore or hyphen between or none (ReactiveFiberCLI included); or `rf`
 * starting a word, then whitespace, then a digit (an optional `v` before it) or the word `context` or `operation`.
 * LEAF READER (C1). A spelling is a string or template literal part matching /\boperation[\s._-]*show\b/i; an outermost `+`
 * concatenation or template whose text (read as in A1, each unread part a placeholder) matches while none of its literal
 * parts does; or two adjacent elements of an array literal or an argument list (spreads of SEALED const arrays expanded,
 * elements read as in A1) that read as `operation` then `show`, case-insensitive.
 * TIMING (cut #3). No witness needs a spawned stand-in to finish inside a deadline host load can exceed. Every stand-in that
 * answers, ends or prints does so HOLD_MS (1.5 s) after it starts. DEADLINE_MS (250 ms) governs only B1's timeout arm,
 * the timed-out runs of B2, C1 and C2 and B2's resume (which spawns nothing), so the deadline wins by construction; B1's
 * kill and unknown arms and D4's own-grant reading run under SETTLE_MS (30 s, as long as the registry's default
 * CAPABILITY_DEADLINE_MS at this cut), which a stand-in acting HOLD_MS after it starts does not approach; A2 and D2 run the
 * preview under the registry default and its own 60 s timer, and D2's start and reap waits are test waits bounded at
 * 20 s. What the witness reads of the deadline: each B1 arm and the D4 reading carry their registry instance's deadlineMs
 * FIELD (Reflect.get: the configured value, not the timer the registry arms), and the kill and unknown arms and the D4
 * reading carry actedAfterHold (the call settled no earlier than HOLD_MS after it was invoked). Those stand-ins cannot end
 * their call before HOLD_MS, so an effective registry deadline below HOLD_MS ends the three calls first on every run,
 * whatever the host load: the deadline message replaces the kill and unknown messages and the D4 reading is refused, so
 * B1 and D4 red deterministically whether or not the deadlineMs field moves.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl, the bead's title and description only; later store
 * writes change neither) holds ACCEPTANCE verbatim, and each row's pins are exactly the clauses of its item, split
 * mechanically on "; " and " and "; src (the registrations, the descriptor literals, the register sites, the custody and
 * NATIVE_GRANTS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and WITNESS's keys are exactly the pins.
 * NOT CLAIMED: A judges each descriptor's declared contract, not the argv its provider spawns (A2 and D2 read the one live
 * rf launch); the committing provider here is test-only, so its key derivation and its never-kill custody prove nothing
 * about a future provider's (B pins Pi's registry, runtime and resume around it, not the provider). Both readers are
 * static: they read source text, and judge a value as its expression reads where it is written, through exactly the forms
 * above, and nothing outside those forms is read; a descriptor value that no detected literal spells is seen by A only
 * where a forwarding site registers it. The run-time channels known to this cut that they do not read, each with its
 * reading pinned in A1 as PLANTED_UNSEEN (or in C1 as LEAF_UNSEEN): a write written inside a string that code runs; a src
 * module reached through a dynamic import, a require, or a specifier that is not relative; a module outside the src tree (a
 * src file that is not .ts, anything outside src); a replaced global (Object.freeze); a callee spelled register that
 * rewrites the descriptor it receives and registers it through a call not spelled register (A pins
 * CapabilityRegistry.register's copy, not other callees); a registration whose callee is not spelled register (an element
 * access, a bound alias); an rf descriptor whose id and contract fall outside the reactivefiber.* id and RF FAMILY; and a
 * rewritten const word array, which the LEAF READER does not expand. A projection's base value is judged only where it is
 * itself a src literal of the read shape, and a literal whose rf contract would come wholly from an unread part behind a
 * non-reactivefiber id is judged not rf-driving. TIMING reads the deadlineMs field and the HOLD_MS bound only: an effective
 * deadline at or above HOLD_MS that differs from the field is not read. C2 reconciles over the timed-out run after its
 * never-killed stand-in has exited (timedOutRun awaits it): decideReconcile takes no process-liveness input, so a settled
 * run whose attempt is still in flight is answered the same way by construction, and that state is not exercised. B2's
 * retry clause is a forward guard: the runtime's retry consults agent() calls only, so control.retry answers false for
 * every node index by design, and the pin reds when a node-retry path starts answering true for the in-flight node.
 * PARKED (owed by the cut that builds the committing render, once wb-x32 resolves to one): that capability's own registration
 * test, a stable key derived from the invocation, its reader of rf operation show (committed or exit 3 on 0.1.845; the five
 * receipt states once rf ships them) wired as RECONCILE_EVIDENCE_READS.reactivefiber evidence, and its write grant. Each
 * lands red here first when it is spelled in a form these readers read: A1 (a src literal the SRC READER judges
 * rf-driving, a detected literal it leaves UNREAD, or a new forwarding site), C1 (a new evidence read, or a leaf spelling
 * the LEAF READER reads), D1-D3 (the preview). A channel named under NOT CLAIMED does not land red here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch, the only PATH entry, run by this
 * process's own node; src and the tracker export are only read. A stand-in still running when its test ends (a red path
 * can leave one, e.g. D2's SIGTERM-ignoring stand-in) is SIGKILLed by afterEach, matched by its own script path in
 * /proc/<pid>/cmdline.
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDecision, type ReconcileDeps, type ReconcileRequest } from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import type { WorkflowRunStatus } from "../src/workflow/progress.js";
import { type EvidenceReceipt, RECONCILE_EVIDENCE_READS, reconcileGrant } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowControl, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = process.cwd();
const BEAD = "wb-jwc.5";
const EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const DETACHED = "src/workbench/hosts/local-detached.ts";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANT = "reactivefiber:render";
const LEGACY_INPUT: JsonObject = { model: "m", task: "t" };
const VIEW_INPUT: JsonObject = { view: "orders.view", taskId: "t1" };
/** The test-only committing stand-in: a non-read class, a permission of its own and a contract the rule admits. */
const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
const COMMIT_CONTRACT = "reactive-fiber.cli/v1 context.render --idempotency-key KEY, outcome by rf operation show OPERATION_ID";
const COMMIT_INPUT = {
  type: "object",
  properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } },
  required: ["model", "task"],
  additionalProperties: false,
};
const COMMIT_DESCRIPTOR: CapabilityDescriptor = {
  id: COMMIT_ID,
  version: "1.0.0",
  description: "Test-only stand-in for a future committing rf render (wb-jwc.5); src registers none",
  inputSchema: COMMIT_INPUT,
  effectClass: "write",
  permissions: [COMMIT_PERMISSION],
  supportedModes: ["invoke"],
  contractSource: COMMIT_CONTRACT,
};
/** The registry deadline of B1's timeout arm and of the timed-out runs, and how long the "hold" stand-in outlives it (TIMING). */
const DEADLINE_MS = 250;
const HOLD_MS = 1500;
/** The registry deadline of every other committing stand-in call: 30 s, which process startup cannot reach (TIMING). */
const SETTLE_MS = 30_000;
/** A committed render envelope (made-up rfo_/rft_/rfr_ ids): what a held stand-in prints after Pi stopped waiting. */
const COMMITTED: JsonObject = {
  schema: "reactive-fiber.cli/v1",
  ok: true,
  command: "context.render",
  operation_id: "rfo_censuscommittedrender0001",
  workspace: null,
  transaction_id: "rft_censuscommittedrender0001",
  result: { render_id: "rfr_censuscommittedrender0001", ephemeral: false },
  diagnostics: [],
};
/** Reconcile fixtures: a fixed clock and one local operator scope (made-up ids). */
const NOW = "2026-10-28T05:00:00Z";
const PRINCIPAL = "local-operator:1:s1";
const TASK_ID = "wf_census-jwc5";
const SESSION = "s1";
const SCRIPT = `export const meta = { name: "committing-render-posture", description: "wb-jwc.5 census probe" };\nreturn await node(${JSON.stringify(COMMIT_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;

/** The bead's acceptance, verbatim from its export description (the ANCHOR test holds the whole list to the export). */
const ACCEPTANCE: readonly string[] = [
  "A registration test beside test/workbench-provider-lifecycle.test.ts asserts the committing descriptor's effectClass != read and its argv carries --idempotency-key <stable key>.",
  "On timeout/kill/unknown outcome the invoke path surfaces CapabilityError(uncertain-effect) and the runtime issues no second invocation (exactly one spawn asserted).",
  "Outcome resolution reads rf operation show receipt states (not_found/in_progress/committed/refused_before_commit/indeterminate, FOC/03:34@8a8b83e4d); not_found while an attempt may be in flight does not conclude effect-absent.",
  "Negative guards: the read-only preview registrations (providers/reactivefiber.ts:68,:142@9df9a03) stay byte-stable; the preview's SIGTERM-SIGKILL(500 ms) custody is never reused for the committing call; NATIVE_GRANTS.reactivefiber stays read-scoped for the preview (hosts/local-detached.ts:337@9df9a03) and the committing capability needs a new write grant.",
];
const UNREAD_OWED = `UNREAD (${BEAD}): src now carries a descriptor literal the SRC READER cannot read (an id that does not read, a spread member, a key that does not read, an accessor or method member, a literal outside the register position, or an rf-driving literal whose effectClass or contractSource does not read in full). Spell its fields through values the reader follows, or extend the reader; if it is a committing rf render, the parked acceptance is owed with it.`;
const FORWARDING_OWED = `REGISTER SITE (${BEAD}): src now holds a call spelled register whose first argument does not hold a register-position descriptor literal, so the SRC READER cannot judge what it registers. Register the descriptor inline in the register position, or extend the reader; if it is a committing rf render, the parked acceptance is owed with it.`;
const OWED = `ARMED (${BEAD}): src now carries an rf-driving descriptor beyond the two preview literals. If it is a committing render, the parked acceptance is owed with it: its own registration test (${ACCEPTANCE[0]}), uncertain-effect with exactly one spawn on timeout, kill and unknown outcomes, outcome resolution through rf operation show that never reads exit 3 / not_found as effect-absent while an attempt may be in flight, and a new write grant.`;

/** The clauses of one acceptance item: split on "; ", then on " and " (mechanical, so the export decides the pin set). */
function clausesOf(item: string): string[] {
  return item.split("; ").flatMap((part) => part.split(" and "));
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}
/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
function digest16(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
}

/* ---------------------------------------------------------------- the committing-render admission rule (row A) */

type Finding = "contract" | "effectClass" | "idempotency-key" | "operation-show" | "write-grant";
interface DescriptorFacts {
  readonly id: string;
  readonly effectClass: string;
  readonly permissions: readonly string[];
  readonly contractSource?: string;
}
interface Judged {
  readonly rf: boolean;
  readonly committing: boolean;
  readonly findings: readonly Finding[];
}
/** RF FAMILY (header): the contract spellings that make a descriptor rf-driving. */
const RF_CONTRACT = /\brf@|reactive-fiber\.cli\/|reactive[\s._-]?fiber|\brf\s+(?:v?\d|context\b|operation\b)/i;
const RENDER = /\bcontext[.\s]+render\b/;
const NO_COMMIT = /(?:^|\s)--no-commit(?:\s|,|;|$)/;
const KEY_FLAG = /(?:^|\s)--idempotency-key(?:[\s=,;]|$)/;
const OPERATION_SHOW = /\boperation[.\s]+show\b/;
/** Judge one descriptor: a committing rf render must meet every clause; anything else draws nothing. */
function judge(facts: DescriptorFacts, readGrants: readonly string[]): Judged {
  const rf = facts.id.startsWith("reactivefiber.") || RF_CONTRACT.test(facts.contractSource ?? "");
  if (!rf) return { rf, committing: false, findings: [] };
  const contract = facts.contractSource;
  if (contract === undefined) return { rf, committing: true, findings: ["contract"] };
  const committing = RENDER.test(contract) && !NO_COMMIT.test(contract);
  if (!committing) return { rf, committing, findings: [] };
  const findings: Finding[] = [];
  if (facts.effectClass === "read") findings.push("effectClass");
  if (!KEY_FLAG.test(contract)) findings.push("idempotency-key");
  if (!OPERATION_SHOW.test(contract)) findings.push("operation-show");
  if (facts.permissions.length === 0 || facts.permissions.every((permission) => readGrants.includes(permission))) findings.push("write-grant");
  return { rf, committing, findings };
}
/** A committing render descriptor with one field changed: the rule's constructed cases. */
function committing(changes: Partial<DescriptorFacts>): DescriptorFacts {
  return { id: COMMIT_ID, effectClass: "write", permissions: [COMMIT_PERMISSION], contractSource: COMMIT_CONTRACT, ...changes };
}

/* ---------------------------------------------------------------- src readings (TypeScript AST) */

/** A tree of modules by repo-relative path: src on disk (the census's subject), or a planted set (constructed cases). */
interface ModuleTree {
  readonly module: (path: string) => ts.SourceFile | undefined;
  /** Every module of the tree: the scope of the SEALED reference scan. */
  readonly paths: () => readonly string[];
  /** A raw view reads values as written, seals aside: the SEALED scan's own reads. */
  readonly raw?: true;
}
function parse(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
const parsed = new Map<string, ts.SourceFile>();
function sourceOf(path: string): ts.SourceFile {
  const cached = parsed.get(path);
  if (cached !== undefined) return cached;
  const file = parse(path, readFileSync(join(REPO, path), "utf8"));
  parsed.set(path, file);
  return file;
}
let srcPaths: readonly string[] | undefined;
const SRC: ModuleTree = {
  module: (path) => (path.startsWith("src/") && path.endsWith(".ts") && existsSync(join(REPO, path)) ? sourceOf(path) : undefined),
  paths: () => {
    srcPaths ??= srcFiles();
    return srcPaths;
  },
};
function plantedTree(modules: Readonly<Record<string, string>>): ModuleTree {
  const files = new Map(Object.entries(modules).map(([path, text]) => [path, parse(path, text)]));
  return { module: (path) => files.get(path), paths: () => [...files.keys()].filter((path) => path.endsWith(".ts")) };
}
function srcFiles(): string[] {
  const files = readdirSync(join(REPO, "src"), { encoding: "utf8", recursive: true })
    .filter((path) => path.endsWith(".ts"))
    .map((path) => relative(REPO, join(REPO, "src", path)).split("\\").join("/"))
    .sort();
  expect(files.length, "the src walk reads the tree").toBeGreaterThan(100);
  expect(files).toContain(PROVIDER);
  return files;
}
function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, (child) => visit(child, each));
}
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) {
    current = current.expression;
  }
  return current;
}
function nameOf(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
}
function property(literal: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const member of literal.properties) {
    if (ts.isPropertyAssignment(member) && nameOf(member.name) === name) return member.initializer;
    if (ts.isShorthandPropertyAssignment(member) && member.name.text === name) return member.name;
  }
  return undefined;
}
function enclosingFunction(node: ts.Node): string {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (ts.isFunctionDeclaration(current) && current.name !== undefined) return current.name.text;
  }
  return "<module>";
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = unwrap(call.expression);
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}

/** A module's value bindings: what each once-declared name is bound to, and what the module exports. */
interface Bindings {
  /** How many times the module declares each name (any scope). */
  readonly declared: ReadonlyMap<string, number>;
  readonly consts: Map<string, ts.Expression>;
  readonly imports: Map<string, { readonly from: string | undefined; readonly name: string }>;
  readonly exports: Map<string, { readonly local: string } | { readonly from: string | undefined; readonly name: string }>;
  readonly stars: (string | undefined)[];
}
/** The src module a relative specifier names (`.js` spells the `.ts` source); undefined for packages and missing modules. */
function moduleOf(tree: ModuleTree, from: string, specifier: ts.Expression | undefined): string | undefined {
  if (specifier === undefined || !ts.isStringLiteral(specifier) || !specifier.text.startsWith(".")) return undefined;
  const base = posix.join(posix.dirname(from), specifier.text);
  const stem = base.replace(/\.(?:js|ts)$/, "");
  return [`${stem}.ts`, posix.join(base, "index.ts")].find((candidate) => tree.module(candidate) !== undefined);
}
const bindingCache = new WeakMap<ts.SourceFile, Bindings>();
function bindingsOf(file: ts.SourceFile, tree: ModuleTree): Bindings {
  const cached = bindingCache.get(file);
  if (cached !== undefined) return cached;
  const declared = new Map<string, number>();
  const declare = (name: ts.BindingName | ts.Identifier | undefined): void => {
    if (name === undefined) return;
    if (ts.isIdentifier(name)) declared.set(name.text, (declared.get(name.text) ?? 0) + 1);
    else for (const element of name.elements) if (!ts.isOmittedExpression(element)) declare(element.name);
  };
  const consts = new Map<string, ts.Expression>();
  const imports = new Map<string, { readonly from: string | undefined; readonly name: string }>();
  const exports = new Map<string, { readonly local: string } | { readonly from: string | undefined; readonly name: string }>();
  const stars: (string | undefined)[] = [];
  visit(file, (node) => {
    if (ts.isVariableDeclaration(node)) {
      declare(node.name);
      if (ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const) !== 0) {
        consts.set(node.name.text, node.initializer);
        const statement = node.parent.parent;
        if (ts.isVariableStatement(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
          exports.set(node.name.text, { local: node.name.text });
        }
      }
    } else if (ts.isParameter(node)) {
      declare(node.name);
    } else if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node) || ts.isEnumDeclaration(node)) {
      declare(node.name);
    } else if (ts.isImportDeclaration(node) && node.importClause !== undefined && !node.importClause.isTypeOnly) {
      const from = moduleOf(tree, file.fileName, node.moduleSpecifier);
      const clause = node.importClause;
      if (clause.name !== undefined) {
        declare(clause.name);
        imports.set(clause.name.text, { from, name: "default" });
      }
      const named = clause.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) {
        declare(named.name);
        imports.set(named.name.text, { from, name: "*" });
      }
      if (named !== undefined && ts.isNamedImports(named)) {
        for (const element of named.elements) {
          declare(element.name);
          if (!element.isTypeOnly) imports.set(element.name.text, { from, name: (element.propertyName ?? element.name).text });
        }
      }
    } else if (ts.isExportDeclaration(node) && !node.isTypeOnly) {
      const from = node.moduleSpecifier === undefined ? undefined : moduleOf(tree, file.fileName, node.moduleSpecifier);
      if (node.exportClause === undefined) {
        if (node.moduleSpecifier !== undefined) stars.push(from);
      } else if (ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) {
          const local = (element.propertyName ?? element.name).text;
          exports.set(element.name.text, node.moduleSpecifier === undefined ? { local } : { from, name: local });
        }
      }
    }
  });
  for (const name of [...consts.keys()]) if (declared.get(name) !== 1) consts.delete(name);
  for (const name of [...imports.keys()]) if (declared.get(name) !== 1) imports.delete(name);
  const bindings: Bindings = { declared, consts, imports, exports, stars };
  bindingCache.set(file, bindings);
  return bindings;
}
interface At {
  readonly tree: ModuleTree;
  readonly file: ts.SourceFile;
}
interface Definition {
  readonly node: ts.Expression;
  readonly at: At;
}
const MAX_HOPS = 32;
/** The placeholder an unread part takes in a static text (it matches none of the census's patterns). */
const UNREAD = "<unread>";
/** The string an expression reads as (SRC READER), or undefined. */
function readString(node: ts.Expression | undefined, at: At, hops = 0): string | undefined {
  if (node === undefined || hops > MAX_HOPS) return undefined;
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
  if (ts.isTemplateExpression(value)) {
    let text = value.head.text;
    for (const span of value.templateSpans) {
      const part = readString(span.expression, at, hops + 1);
      if (part === undefined) return undefined;
      text += part + span.literal.text;
    }
    return text;
  }
  if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = readString(value.left, at, hops + 1);
    const right = left === undefined ? undefined : readString(value.right, at, hops + 1);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  const target = definitionOf(value, at, hops + 1);
  return target === undefined ? undefined : readString(target.node, target.at, hops + 1);
}
/** A string expression's static text: what reads, with UNREAD standing for each part that does not. */
function staticText(node: ts.Expression, at: At): string {
  const value = unwrap(node);
  const whole = readString(value, at);
  if (whole !== undefined) return whole;
  if (ts.isTemplateExpression(value)) return value.head.text + value.templateSpans.map((span) => staticText(span.expression, at) + span.literal.text).join("");
  if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.PlusToken) return staticText(value.left, at) + staticText(value.right, at);
  return UNREAD;
}
/** What a name or a member access is bound to: a const initializer, an import followed to its export, or a const-object member. */
function definitionOf(node: ts.Expression, at: At, hops: number): Definition | undefined {
  if (hops > MAX_HOPS) return undefined;
  if (ts.isIdentifier(node)) return bindingOf(node.text, at, hops + 1);
  let owner: ts.Expression;
  let name: string | undefined;
  if (ts.isPropertyAccessExpression(node)) {
    owner = unwrap(node.expression);
    name = node.name.text;
  } else if (ts.isElementAccessExpression(node)) {
    owner = unwrap(node.expression);
    name = readString(node.argumentExpression, at, hops + 1);
  } else {
    return undefined;
  }
  if (name === undefined) return undefined;
  if (ts.isIdentifier(owner)) {
    const imported = bindingsOf(at.file, at.tree).imports.get(owner.text);
    if (imported?.name === "*") return exportOf(imported.from, name, at.tree, hops + 1);
  }
  const object = objectOf(owner, at, hops + 1);
  return object === undefined ? undefined : memberOf(object.node, name, object.at, hops + 1);
}
function bindingOf(name: string, at: At, hops: number): Definition | undefined {
  const table = bindingsOf(at.file, at.tree);
  const bound = table.consts.get(name);
  if (bound !== undefined) return { node: bound, at };
  const imported = table.imports.get(name);
  return imported === undefined || imported.name === "*" ? undefined : exportOf(imported.from, imported.name, at.tree, hops + 1);
}
function exportOf(path: string | undefined, name: string, tree: ModuleTree, hops: number): Definition | undefined {
  const file = path === undefined || hops > MAX_HOPS ? undefined : tree.module(path);
  if (file === undefined) return undefined;
  const at: At = { tree, file };
  const table = bindingsOf(file, tree);
  const entry = table.exports.get(name);
  if (entry !== undefined) return "local" in entry ? bindingOf(entry.local, at, hops + 1) : exportOf(entry.from, entry.name, tree, hops + 1);
  for (const star of table.stars) {
    const found = exportOf(star, name, tree, hops + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}
function objectOf(node: ts.Expression, at: At, hops: number): { readonly node: ts.ObjectLiteralExpression; readonly at: At } | undefined {
  if (hops > MAX_HOPS) return undefined;
  const value = unwrap(node);
  if (ts.isObjectLiteralExpression(value)) return { node: value, at };
  if (ts.isCallExpression(value) && value.arguments.length === 1 && ts.isPropertyAccessExpression(value.expression) && bindingsOf(at.file, at.tree).declared.get("Object") === undefined) {
    const callee = value.expression;
    if (ts.isIdentifier(callee.expression) && callee.expression.text === "Object" && callee.name.text === "freeze") return objectOf(value.arguments[0], at, hops + 1);
  }
  const target = definitionOf(value, at, hops + 1);
  return target === undefined ? undefined : objectOf(target.node, target.at, hops + 1);
}
/** A member's key: an identifier, a string literal, or a computed name that reads; undefined otherwise. */
function keyOf(member: ts.ObjectLiteralElementLike, at: At, hops = 0): string | undefined {
  if (ts.isSpreadAssignment(member)) return undefined;
  const name = member.name;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return readString(name.expression, at, hops + 1);
  return undefined;
}
/** A member's value: a property's initializer or a shorthand's name; an accessor or a method never reads. */
function memberValue(member: ts.ObjectLiteralElementLike | undefined): ts.Expression | undefined {
  if (member === undefined) return undefined;
  if (ts.isPropertyAssignment(member)) return member.initializer;
  if (ts.isShorthandPropertyAssignment(member)) return member.name;
  return undefined;
}
function memberOf(object: ts.ObjectLiteralExpression, name: string, at: At, hops: number): Definition | undefined {
  if (!sealed(object, at.tree)) return undefined;
  if (object.properties.some((member) => ts.isSpreadAssignment(member))) return undefined;
  let found: ts.ObjectLiteralElementLike | undefined;
  for (const member of object.properties) if (keyOf(member, at, hops) === name) found = member;
  const node = memberValue(found);
  return node === undefined ? undefined : { node, at };
}
/** The elements a list reads as, const-array spreads expanded; UNREAD for each element that does not read. */
function listWords(list: readonly ts.Expression[], at: At, hops = 0): string[] {
  return list.flatMap((element) => (ts.isSpreadElement(element) ? (arrayWords(element.expression, at, hops + 1) ?? [UNREAD]) : [readString(element, at, hops + 1) ?? UNREAD]));
}
function arrayWords(node: ts.Expression, at: At, hops: number): string[] | undefined {
  if (hops > MAX_HOPS) return undefined;
  const value = unwrap(node);
  if (ts.isArrayLiteralExpression(value)) return sealed(value, at.tree) ? listWords(value.elements, at, hops + 1) : undefined;
  const target = definitionOf(value, at, hops + 1);
  return target === undefined ? undefined : arrayWords(target.node, target.at, hops + 1);
}
/* ---------------------------------------------------------------- SEALED (the SRC READER's write scan, see the header) */

/** A node that passes its expression through unchanged: parentheses, `as`, `satisfies`, `!` and a type assertion. */
function isWrapper(node: ts.Node | undefined): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion {
  return node !== undefined && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node));
}
/** The outermost wrapper around a node (the node itself when nothing wraps it). */
function wrapped(node: ts.Node): ts.Node {
  let current = node;
  while (isWrapper(current.parent) && current.parent.expression === current) current = current.parent;
  return current;
}
/** A const initializer's own literal: an object or array literal, through wrappers and `.freeze(...)` calls. */
function literalOf(node: ts.Expression | undefined): ts.ObjectLiteralExpression | ts.ArrayLiteralExpression | undefined {
  let value = node === undefined ? undefined : unwrap(node);
  for (let step = 0; value !== undefined && step <= MAX_HOPS; step++) {
    if (ts.isObjectLiteralExpression(value) || ts.isArrayLiteralExpression(value)) return value;
    value = ts.isCallExpression(value) && value.arguments.length === 1 && ts.isPropertyAccessExpression(value.expression) && value.expression.name.text === "freeze" ? unwrap(value.arguments[0]) : undefined;
  }
  return undefined;
}
/** Map a root literal, and every object or array literal nested in its members or elements, to that root. */
function nest(literal: ts.ObjectLiteralExpression | ts.ArrayLiteralExpression, root: ts.Node, rootOf: Map<ts.Node, ts.Node>): void {
  rootOf.set(literal, root);
  const children = ts.isObjectLiteralExpression(literal)
    ? literal.properties.flatMap((member) => (ts.isPropertyAssignment(member) ? [member.initializer] : []))
    : literal.elements.filter((element) => !ts.isSpreadElement(element));
  for (const child of children) {
    const inner = literalOf(child);
    if (inner !== undefined && !rootOf.has(inner)) nest(inner, root, rootOf);
  }
}
/** Whether a member read chain (its outermost wrapper) is written: an assignment of any operator, ++/--, delete, or a destructuring or for-in/for-of target. */
function isWritten(use: ts.Node): boolean {
  const parent = use.parent;
  if (ts.isBinaryExpression(parent) && parent.left === use && parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment) return true;
  if ((ts.isPrefixUnaryExpression(parent) || ts.isPostfixUnaryExpression(parent)) && (parent.operator === ts.SyntaxKind.PlusPlusToken || parent.operator === ts.SyntaxKind.MinusMinusToken)) return true;
  if (ts.isDeleteExpression(parent)) return true;
  if ((ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.initializer === use) return true;
  let pattern: ts.Node = use;
  while (
    ts.isArrayLiteralExpression(pattern.parent) ||
    ts.isObjectLiteralExpression(pattern.parent) ||
    ts.isSpreadElement(pattern.parent) ||
    ts.isSpreadAssignment(pattern.parent) ||
    ts.isParenthesizedExpression(pattern.parent) ||
    (ts.isPropertyAssignment(pattern.parent) && pattern.parent.initializer === pattern)
  ) {
    pattern = pattern.parent;
  }
  if (pattern === use) return false;
  const head = pattern.parent;
  return (ts.isBinaryExpression(head) && head.left === pattern && head.operatorToken.kind === ts.SyntaxKind.EqualsToken) || ((ts.isForOfStatement(head) || ts.isForInStatement(head)) && head.initializer === pattern);
}
/** Whether an identifier is a value reference (not a declared name, a property or member name, a specifier, a label or a type). */
function isReference(name: ts.Identifier): boolean {
  const parent = name.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === name;
  if (ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent) || ts.isEnumMember(parent)) return parent.initializer === name;
  if (
    ts.isQualifiedName(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isTypeParameterDeclaration(parent) ||
    ts.isImportClause(parent) ||
    ts.isNamespaceImport(parent) ||
    ts.isImportSpecifier(parent) ||
    ts.isExportSpecifier(parent) ||
    ts.isImportEqualsDeclaration(parent) ||
    ts.isNamespaceExport(parent) ||
    ts.isLabeledStatement(parent) ||
    ts.isBreakStatement(parent) ||
    ts.isContinueStatement(parent) ||
    ts.isMetaProperty(parent)
  ) {
    return false;
  }
  for (let node: ts.Node | undefined = parent; node !== undefined && !ts.isStatement(node) && !ts.isSourceFile(node); node = node.parent) if (ts.isTypeNode(node)) return false;
  return true;
}
/** A member read chain grown from an expression: the outermost property or element access whose object it is. */
function chainOf(node: ts.Expression): ts.Expression {
  const outer = wrapped(node);
  const parent = outer.parent;
  return (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === outer ? chainOf(parent) : node;
}
/** Whether a spread of a value copies strings only: a string, or an object or array literal every member or element of which reads as one. */
function copiesStrings(node: ts.Expression, at: At): boolean {
  if (readString(node, at) !== undefined) return true;
  const object = objectOf(node, at, 0);
  if (object !== undefined) return object.node.properties.every((member) => !ts.isSpreadAssignment(member) && readString(memberValue(member), object.at) !== undefined);
  const words = arrayWords(node, at, 0);
  return words?.every((word) => word !== UNREAD) === true;
}
interface Seals {
  /** Each const's own object or array literal, and every literal nested in one, mapped to its root (the const's literal). */
  readonly rootOf: Map<ts.Node, ts.Node>;
  /** The roots a reference leaves open. */
  readonly open: Set<ts.Node>;
}
const sealCache = new WeakMap<ModuleTree, Seals>();
const rawViews = new WeakMap<ModuleTree, ModuleTree>();
/** The tree read as written, seals aside: what the SEALED scan reads values through. */
function rawView(tree: ModuleTree): ModuleTree {
  const cached = rawViews.get(tree);
  if (cached !== undefined) return cached;
  const view: ModuleTree = { module: tree.module, paths: tree.paths, raw: true };
  rawViews.set(tree, view);
  return view;
}
/** Whether a literal's members or elements read (SEALED): an inline literal's always; a const's literal, or one nested in it, while its root is not open. */
function sealed(literal: ts.Node, tree: ModuleTree): boolean {
  if (tree.raw === true) return true;
  const seals = sealsOf(tree);
  const root = seals.rootOf.get(literal);
  return root === undefined || !seals.open.has(root);
}
function addTo<T>(map: Map<string, T[]>, key: string, value: T): void {
  const list = map.get(key);
  if (list === undefined) map.set(key, [value]);
  else list.push(value);
}
/** The SEALED scan of a tree: its const literals, and every reference its modules hold to one, judged as the header states. */
function sealsOf(tree: ModuleTree): Seals {
  const cached = sealCache.get(tree);
  if (cached !== undefined) return cached;
  const seals: Seals = { rootOf: new Map(), open: new Set() };
  sealCache.set(tree, seals);
  const raw = rawView(tree);
  const files = tree.paths().flatMap((path) => {
    const file = tree.module(path);
    return file === undefined ? [] : [file];
  });
  const consts = new Map<ts.SourceFile, Map<string, ts.Node[]>>();
  const named = new Map<ts.SourceFile, Map<string, { readonly from: string | undefined; readonly name: string }[]>>();
  const spaces = new Map<ts.SourceFile, Map<string, (string | undefined)[]>>();
  for (const file of files) {
    const local = new Map<string, ts.Node[]>();
    const imported = new Map<string, { readonly from: string | undefined; readonly name: string }[]>();
    const space = new Map<string, (string | undefined)[]>();
    visit(file, (node) => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && (ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const) === ts.NodeFlags.Const) {
        const root = literalOf(node.initializer);
        if (root !== undefined) {
          nest(root, root, seals.rootOf);
          addTo(local, node.name.text, root);
        }
      } else if (ts.isImportDeclaration(node) && node.importClause !== undefined && !node.importClause.isTypeOnly) {
        const from = moduleOf(tree, file.fileName, node.moduleSpecifier);
        const clause = node.importClause;
        if (clause.name !== undefined) addTo(imported, clause.name.text, { from, name: "default" });
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) addTo(space, bindings.name.text, from);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) if (!element.isTypeOnly) addTo(imported, element.name.text, { from, name: (element.propertyName ?? element.name).text });
        }
      }
    });
    consts.set(file, local);
    named.set(file, imported);
    spaces.set(file, space);
  }
  /** The roots a name of a module may denote: its consts of that name (any scope) and its imports of that name, followed. */
  const namedRoots = (file: ts.SourceFile, name: string, seen: Set<string>): ts.Node[] => [
    ...(consts.get(file)?.get(name) ?? []),
    ...(named.get(file)?.get(name) ?? []).flatMap((entry) => exportRoots(entry.from, entry.name, seen)),
  ];
  /** The roots a module's export of a name may denote, through local export aliases, named re-exports and `export *`. */
  const exportRoots = (path: string | undefined, name: string, seen: Set<string>): ts.Node[] => {
    const file = path === undefined ? undefined : tree.module(path);
    if (file === undefined || seen.has(`${path}\0${name}`)) return [];
    seen.add(`${path}\0${name}`);
    const out: ts.Node[] = [];
    for (const statement of file.statements) {
      if (ts.isVariableStatement(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
        if (statement.declarationList.declarations.some((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name)) out.push(...namedRoots(file, name, seen));
      } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
        const from = statement.moduleSpecifier === undefined ? undefined : moduleOf(tree, file.fileName, statement.moduleSpecifier);
        if (statement.exportClause === undefined) {
          if (name !== "default") out.push(...exportRoots(from, name, seen));
        } else if (ts.isNamedExports(statement.exportClause)) {
          for (const element of statement.exportClause.elements) {
            if (element.isTypeOnly || element.name.text !== name) continue;
            const local = (element.propertyName ?? element.name).text;
            out.push(...(statement.moduleSpecifier === undefined ? namedRoots(file, local, seen) : exportRoots(from, local, seen)));
          }
        }
      }
    }
    return out;
  };
  /** Every root a module's namespace object can reach: its own consts, every module it re-exports from, every import it holds. */
  const everyRoot = (path: string | undefined, seen: Set<string>): ts.Node[] => {
    const file = path === undefined ? undefined : tree.module(path);
    if (file === undefined || seen.has(path ?? "")) return [];
    seen.add(path ?? "");
    const out = [...(consts.get(file)?.values() ?? [])].flat();
    for (const statement of file.statements) {
      if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined) out.push(...everyRoot(moduleOf(tree, file.fileName, statement.moduleSpecifier), seen));
    }
    for (const entries of named.get(file)?.values() ?? []) for (const entry of entries) out.push(...exportRoots(entry.from, entry.name, new Set()));
    for (const froms of spaces.get(file)?.values() ?? []) for (const from of froms) out.push(...everyRoot(from, seen));
    return out;
  };
  /** Whether a reference (an identifier, or a namespace member access) is only read as SEALED allows. */
  const readsOnly = (reference: ts.Expression, file: ts.SourceFile): boolean => {
    const chain = chainOf(reference);
    const use = wrapped(chain);
    const parent = use.parent;
    if (isWritten(use)) return false;
    const at: At = { tree: raw, file };
    if (ts.isSpreadElement(parent) || ts.isSpreadAssignment(parent)) return copiesStrings(chain, at);
    return readString(chain, at) !== undefined;
  };
  const openAll = (roots: readonly ts.Node[]): void => {
    for (const root of roots) seals.open.add(root);
  };
  for (const file of files) {
    const space = spaces.get(file) ?? new Map<string, (string | undefined)[]>();
    visit(file, (node) => {
      if (ts.isExportDeclaration(node) && node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause)) openAll(everyRoot(moduleOf(tree, file.fileName, node.moduleSpecifier), new Set()));
      if (ts.isExportSpecifier(node) && node.parent.parent.moduleSpecifier === undefined) {
        for (const from of space.get((node.propertyName ?? node.name).text) ?? []) openAll(everyRoot(from, new Set()));
      }
      if (!ts.isIdentifier(node) || !isReference(node)) return;
      const roots = namedRoots(file, node.text, new Set());
      if (roots.length > 0 && !readsOnly(node, file)) openAll(roots);
      for (const from of space.get(node.text) ?? []) {
        const outer = wrapped(node);
        const access = outer.parent;
        const member =
          ts.isPropertyAccessExpression(access) && access.expression === outer
            ? { access, name: access.name.text }
            : ts.isElementAccessExpression(access) && access.expression === outer
              ? { access, name: readString(access.argumentExpression, { tree: raw, file }) }
              : undefined;
        const name = member?.name;
        if (member === undefined || name === undefined) {
          openAll(everyRoot(from, new Set()));
          continue;
        }
        const via = exportRoots(from, name, new Set());
        if (via.length > 0 && !readsOnly(member.access, file)) openAll(via);
      }
    });
  }
  return seals;
}
interface LiteralFacts extends DescriptorFacts {
  readonly file: string;
}
/** One descriptor literal as the SRC READER reads it. */
type Reading =
  | { readonly kind: "judged"; readonly facts: LiteralFacts }
  | { readonly kind: "projection"; readonly file: string }
  | { readonly kind: "unread"; readonly file: string; readonly fields: readonly string[] };
/** The base B a projected member is read off (`B.field`, through `??` left operands and first call arguments). */
function projectedBase(node: ts.Expression | undefined, field: string, at: At): string | undefined {
  let value = node === undefined ? undefined : unwrap(node);
  for (let step = 0; value !== undefined && step < 4; step++) {
    if (ts.isPropertyAccessExpression(value)) return value.name.text === field ? value.expression.getText(at.file) : undefined;
    if (ts.isCallExpression(value) && value.arguments.length > 0) value = unwrap(value.arguments[0]);
    else if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) value = unwrap(value.left);
    else return undefined;
  }
  return undefined;
}
/** An object literal whose keys all read (a spread member has no key that reads) with exactly one member keyed `descriptor`, a property assignment (REGISTER POSITION). */
function holdsOneDescriptor(holder: ts.ObjectLiteralExpression, at: At): ts.PropertyAssignment | undefined {
  let found: ts.PropertyAssignment | undefined;
  let count = 0;
  for (const member of holder.properties) {
    const key = keyOf(member, at);
    if (key === undefined) return undefined;
    if (key !== "descriptor") continue;
    count++;
    if (ts.isPropertyAssignment(member)) found = member;
  }
  return count === 1 ? found : undefined;
}
/** Whether an object literal is the first argument, written inline, of a call spelled `register` or `<expression>.register`. */
function isRegisterArgument(holder: ts.Expression): boolean {
  const outer = wrapped(holder);
  const call = outer.parent;
  return ts.isCallExpression(call) && call.arguments[0] === outer && calleeName(call) === "register";
}
/** The REGISTER POSITION (SRC READER, see the header): the `descriptor` member, written inline, of a holder passed inline to register. */
function inRegisterPosition(literal: ts.ObjectLiteralExpression, at: At): boolean {
  const member = wrapped(literal).parent;
  if (!ts.isPropertyAssignment(member) || !ts.isObjectLiteralExpression(member.parent)) return false;
  return holdsOneDescriptor(member.parent, at) === member && isRegisterArgument(member.parent);
}
/** Every call of one module spelled register whose first argument does not hold a register-position literal (REGISTER SITES). */
function forwardingSites(path: string, tree: ModuleTree): string[] {
  const file = tree.module(path);
  if (file === undefined) throw new Error(`no module ${path} in the tree`);
  const at: At = { tree, file };
  const sites: string[] = [];
  visit(file, (node) => {
    if (!ts.isCallExpression(node) || calleeName(node) !== "register") return;
    const first = node.arguments[0] === undefined ? undefined : unwrap(node.arguments[0]);
    const member = first !== undefined && ts.isObjectLiteralExpression(first) ? holdsOneDescriptor(first, at) : undefined;
    if (member !== undefined && ts.isObjectLiteralExpression(unwrap(member.initializer))) return;
    const text = node.arguments.map((argument) => argument.getText(file).replace(/\s+/g, " ")).join(", ");
    sites.push(`${path}#${enclosingFunction(node)}:${node.expression.getText(file)}(${text.length > 80 ? `${text.slice(0, 80)}...` : text})`);
  });
  return sites;
}
/** CapabilityRegistry.register serves a copy: rewrite the registered descriptor object afterwards and read what it serves. */
function copyReading(): JsonObject {
  const descriptor: CapabilityDescriptor = { ...COMMIT_DESCRIPTOR, id: "census.copy.probe", effectClass: "write", contractSource: "census copy probe" };
  const registry = new CapabilityRegistry();
  registry.register({ descriptor, invoke: () => Promise.resolve(null) });
  descriptor.id = COMMIT_ID;
  descriptor.effectClass = "read";
  descriptor.contractSource = "rf@0.1.845:reactive-fiber.cli/v1 context.render";
  const served = registry.catalogSnapshot().map((entry) => ({ id: entry.descriptor.id, effectClass: entry.descriptor.effectClass, contractSource: entry.descriptor.contractSource ?? null }));
  return { served, rewritten: { id: descriptor.id, effectClass: descriptor.effectClass } };
}
/** Every descriptor literal of one module (SRC READER, see the header). */
function descriptorReadings(path: string, tree: ModuleTree): Reading[] {
  const file = tree.module(path);
  if (file === undefined) throw new Error(`no module ${path} in the tree`);
  const at: At = { tree, file };
  const found: Reading[] = [];
  visit(file, (node) => {
    if (!ts.isObjectLiteralExpression(node)) return;
    const members = new Map<string, ts.ObjectLiteralElementLike>();
    let spreads = 0;
    let unreadKeys = 0;
    let accessors = 0;
    for (const member of node.properties) {
      if (ts.isSpreadAssignment(member)) {
        spreads++;
        continue;
      }
      if (ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member) || ts.isMethodDeclaration(member)) accessors++;
      const key = keyOf(member, at);
      if (key === undefined) unreadKeys++;
      else members.set(key, member);
    }
    const idMember = members.get("id");
    const registered = inRegisterPosition(node, at);
    if (idMember === undefined && !registered) return;
    const id = readString(memberValue(idMember), at);
    const effectMember = members.get("effectClass");
    const contractMember = members.get("contractSource");
    if (!registered && effectMember === undefined && contractMember === undefined && id?.startsWith("reactivefiber.") !== true) return;
    const effectClass = readString(memberValue(effectMember), at);
    const contractNode = memberValue(contractMember);
    const contractSource = contractNode === undefined ? undefined : readString(contractNode, at);
    const contractText = contractNode === undefined ? undefined : (contractSource ?? staticText(contractNode, at));
    const rf = id?.startsWith("reactivefiber.") === true || RF_CONTRACT.test(contractText ?? "");
    const fields: string[] = [];
    if (id === undefined) fields.push("id");
    if ((rf || id === undefined) && effectClass === undefined) fields.push("effectClass");
    if ((rf || id === undefined) && contractMember !== undefined && contractSource === undefined) fields.push("contractSource");
    if (spreads > 0) fields.push("spread");
    if (unreadKeys > 0) fields.push("key");
    if (accessors > 0) fields.push("accessor");
    if (!registered) fields.push("position");
    if (fields.length > 0) {
      const present = [
        ["id", idMember],
        ["effectClass", effectMember],
        ["contractSource", contractMember],
      ] as const;
      const bases = present.flatMap(([field, member]) => (member === undefined ? [] : [projectedBase(memberValue(member), field, at)]));
      const projection = unreadKeys === 0 && bases.every((base) => base !== undefined && base === bases[0]);
      found.push(projection && !registered ? { kind: "projection", file: path } : { kind: "unread", file: path, fields });
      return;
    }
    const permissions = memberValue(members.get("permissions"));
    found.push({
      kind: "judged",
      facts: {
        file: path,
        id: id ?? UNREAD,
        effectClass: effectClass ?? UNREAD,
        permissions: (permissions === undefined ? [] : (arrayWords(permissions, at, 0) ?? [])).filter((word) => word !== UNREAD),
        ...(contractText === undefined ? {} : { contractSource: contractText }),
      },
    });
  });
  return found;
}
/** A planted tree's readings, one word each: projection, unread:<fields>, not-rf, <committing|noncommitting>:<findings>, or forwarding:<site>. */
function plantedReadings(modules: Readonly<Record<string, string>>, grants: readonly string[]): string[] {
  const tree = plantedTree(modules);
  return tree.paths().flatMap((path) => [
    ...descriptorReadings(path, tree).map((reading) => {
      if (reading.kind === "projection") return "projection";
      if (reading.kind === "unread") return `unread:${reading.fields.join(",")}`;
      const judged = judge(reading.facts, grants);
      return judged.rf ? `${judged.committing ? "committing" : "noncommitting"}:${judged.findings.join(",")}` : "not-rf";
    }),
    ...forwardingSites(path, tree).map((site) => `forwarding:${site}`),
  ]);
}
/** NATIVE_GRANTS or NATIVE_CAPABILITIES as hosts/local-detached.ts declares it. */
function detachedMap(name: string): Record<string, string> {
  const file = sourceOf(DETACHED);
  const out: Record<string, string> = {};
  let seen = 0;
  visit(file, (node) => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.name.text !== name || node.initializer === undefined) return;
    seen++;
    const literal = unwrap(node.initializer);
    if (!ts.isObjectLiteralExpression(literal)) return;
    for (const member of literal.properties) {
      if (!ts.isPropertyAssignment(member)) continue;
      const key = nameOf(member.name);
      const value = readString(member.initializer, { tree: SRC, file });
      if (key !== undefined && value !== undefined) out[key] = value;
    }
  });
  expect(seen, `${DETACHED} declares ${name} once`).toBe(1);
  return out;
}
function readGrants(): string[] {
  return Object.values(detachedMap("NATIVE_GRANTS"));
}

/* ---------------------------------------------------------------- the stand-in rf and the committing stand-in */

type Behavior = "hold" | "kill" | "silent" | "commit" | "stubborn";
/** What a stand-in that answers prints, then it exits 0. */
const ANSWER = `process.stdout.write(${JSON.stringify(JSON.stringify(COMMITTED))}); process.exit(0);`;
/** Every stand-in that answers, ends or prints does so HOLD_MS after it starts (TIMING); "commit" is "hold", run under SETTLE_MS. */
const STAND_IN: Record<Behavior, string> = {
  hold: `setTimeout(() => { ${ANSWER} }, ${HOLD_MS});`,
  kill: `setTimeout(() => process.kill(process.pid, "SIGKILL"), ${HOLD_MS});`,
  silent: `setTimeout(() => process.exit(0), ${HOLD_MS});`,
  commit: `setTimeout(() => { ${ANSWER} }, ${HOLD_MS});`,
  stubborn: 'process.on("SIGTERM", () => {}); setInterval(() => {}, 1000);',
};
const scratches: string[] = [];
/** The spawn logs of the current test's stand-ins: afterEach reaps any stand-in still running. */
const standIns: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  for (const log of standIns.splice(0)) for (const spawned of spawnsOf(log)) reapStandIn(spawned.pid, join(dirname(log), "rf"));
  removeScratch(...scratches.splice(0));
});
/** SIGKILL a stand-in still running after its test, only when /proc shows it running this test's own stand-in script. */
function reapStandIn(pid: number, script: string): void {
  let argv: string[];
  try {
    argv = readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0");
  } catch {
    return;
  }
  if (!argv.includes(script)) return;
  try {
    process.kill(pid, "SIGKILL");
  } catch {
    // it exited between the read and the signal
  }
}
/** A stand-in `rf`, the only PATH entry, run by this process's node: every spawn appends {pid, argv} to the returned log. */
function standInRf(behavior: Behavior): string {
  const folder = makeScratch("rf-committing-posture-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  standIns.push(log);
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ pid: process.pid, argv: process.argv.slice(2) }) + "\\n");`,
      STAND_IN[behavior],
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = folder;
  return log;
}
interface Spawn {
  readonly pid: number;
  readonly argv: readonly string[];
}
function spawnsOf(log: string): Spawn[] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as Spawn);
}
/** A spawn's argv after `--workspace <root>`, which every Pi rf spawn leads with. */
function tailOf(spawned: Spawn | undefined): string[] {
  expect(spawned?.argv.slice(0, 2)).toStrictEqual(["--workspace", ROOT]);
  return [...(spawned?.argv ?? [])].slice(2);
}
async function until(condition: () => boolean, what: string, boundMs = 20_000): Promise<void> {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > boundMs) throw new Error(`timed out waiting for ${what}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}
function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
/** The stand-in's stable request key: one key per request, so rf would replay a committed receipt rather than commit twice. */
function idempotencyKey(model: string, task: string): string {
  return `pi-census-${createHash("sha256").update(JSON.stringify([model, task])).digest("hex").slice(0, 16)}`;
}
interface CommitHarness {
  readonly registry: CapabilityRegistry;
  readonly settled: Promise<void>[];
  /** The deadline the registry holds, read from the instance: what B1 and D4 report as the deadline their call ran under. */
  readonly deadlineMs: number | null;
}
/** The deadline a registry holds, read from the instance (CapabilityRegistry keeps it as its own deadlineMs field). */
function registryDeadline(registry: CapabilityRegistry): number | null {
  const value: unknown = Reflect.get(registry, "deadlineMs");
  return typeof value === "number" ? value : null;
}
/**
 * The test-only committing stand-in under a registry deadline of deadlineMs (TIMING). Its provider spawns rf once with a
 * committing argv and never kills it: when the registry stops waiting the child runs on, as a render whose commit may
 * already be durable must.
 */
function commitHarness(deadlineMs: number, onSpawn?: () => void): CommitHarness {
  const registry = new CapabilityRegistry({ deadlineMs });
  const settled: Promise<void>[] = [];
  registry.register({
    descriptor: COMMIT_DESCRIPTOR,
    invoke: (input) => {
      const fields = input !== null && typeof input === "object" && !Array.isArray(input) ? input : {};
      const model = String(fields.model);
      const task = String(fields.task);
      const argv = ["--workspace", ROOT, "context", "render", "--model", model, "--task", task, "--idempotency-key", idempotencyKey(model, task), "--no-input", "--json"];
      const call = new Promise<JsonValue>((resolve, reject) => {
        const child = spawn("rf", argv, { stdio: ["ignore", "pipe", "ignore"] });
        onSpawn?.();
        const chunks: Buffer[] = [];
        child.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
        child.once("error", () => reject(new CapabilityError("transport", "rf could not launch")));
        child.once("close", (code, signal) => {
          if (signal !== null) return reject(new CapabilityError("transport", `rf ended by signal ${signal}`));
          const text = Buffer.concat(chunks).toString("utf8");
          if (text.trim() === "") return reject(new CapabilityError("transport", `rf exited ${String(code)} with no envelope on stdout`));
          try {
            resolve(JSON.parse(text) as JsonValue);
          } catch {
            reject(new CapabilityError("transport", "rf returned malformed JSON"));
          }
        });
      });
      settled.push(call.then(() => undefined, () => undefined));
      return call;
    },
  });
  return { registry, settled, deadlineMs: registryDeadline(registry) };
}
function contextOf(grants: readonly string[], signal: AbortSignal = new AbortController().signal): InvocationContext {
  return { grants: [...grants], signal };
}
interface Refusal {
  readonly category: string;
  readonly message: string;
}
async function refusalFrom(call: Promise<JsonValue>): Promise<Refusal> {
  const caught = await call.then(
    () => undefined,
    (error: unknown) => error,
  );
  if (!(caught instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(caught)}`);
  return { category: caught.category, message: caught.message };
}
const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census script calls node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
function nodeRows(entries: readonly WorkflowJournalEntry[]): JsonValue {
  return entries
    .filter((entry) => entry.kind === "node")
    .map((entry) => ({ index: entry.index ?? null, dispatched: entry.dispatched === true, effectClass: entry.effectClass ?? null, ok: entry.ok }));
}
interface TimedOutRun {
  readonly entries: WorkflowJournalEntry[];
  readonly status: string;
  readonly category: string | null;
  readonly retryWhileInFlight: boolean | null;
  readonly spawns: number;
  readonly log: string;
}
/** One run of the committing node through Pi's runtime and Claude host, against a stand-in that outlives the deadline. */
async function timedOutRun(): Promise<TimedOutRun> {
  const log = standInRf("hold");
  let control: WorkflowControl | undefined;
  let retryWhileInFlight: boolean | null = null;
  const harness = commitHarness(DEADLINE_MS, () => {
    retryWhileInFlight = control?.retry(0) ?? null;
  });
  const entries: WorkflowJournalEntry[] = [];
  const recorded = await runWorkflow({
    script: SCRIPT,
    host: claudeHost(harness.registry, [COMMIT_PERMISSION]),
    journal: {
      append: (entry) => {
        entries.push(entry);
      },
    },
    onControl: (live) => {
      control = live;
    },
  });
  await Promise.all(harness.settled);
  return {
    entries,
    status: recorded.status,
    category: recorded.capabilityError?.category ?? null,
    retryWhileInFlight,
    spawns: spawnsOf(log).length,
    log,
  };
}

/* ---------------------------------------------------------------- reconcile fixtures (row C) */

const RECONCILE_GRANTS = ["workbench:observe", reconcileGrant("reactivefiber", "acknowledge"), reconcileGrant("reactivefiber", "override")];
function reconcileRequest(action: ReconcileRequest["action"], params: JsonObject, grants: readonly string[] = RECONCILE_GRANTS): ReconcileRequest {
  return {
    action,
    taskId: TASK_ID,
    position: 0,
    grants,
    scope: { workspace: ROOT, principal: PRINCIPAL },
    sessionId: SESSION,
    principal: { id: PRINCIPAL, role: "local-operator" },
    params,
  };
}
function reconcileDeps(entries: readonly WorkflowJournalEntry[], status: WorkflowRunStatus, receipts: readonly EvidenceReceipt[] = []): ReconcileDeps {
  return {
    task: { status, observationScope: { sessionId: SESSION, workspace: ROOT, principal: PRINCIPAL } },
    entries,
    receipts,
    currentEffectClass: (capabilityId) => (capabilityId === PREVIEW_ID ? "read" : capabilityId === COMMIT_ID ? "write" : undefined),
    now: () => NOW,
  };
}
function outcomeOf(decision: ReconcileDecision): JsonObject {
  if (decision.decision === "denied") return { decision: decision.decision, policy: decision.policy };
  return { decision: decision.decision };
}
/** An evidence read of the preview for the committing position: refused (outcome unavailable) or returned. */
function previewReceipt(row: WorkflowJournalEntry, returned: boolean): EvidenceReceipt {
  return mintEvidenceReceipt({
    taskId: TASK_ID,
    position: row.index ?? 0,
    producer: "reactivefiber",
    capabilityId: PREVIEW_ID,
    input: LEGACY_INPUT,
    requestedAt: NOW,
    observedAt: NOW,
    ...(returned ? { result: { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: fullShapeRf(ROOT) } } : { failure: "unavailable" as const }),
    recordedNativeRefs: row.nativeRefs ?? [],
  });
}
const SPELLS_OPERATION_SHOW = /\boperation[\s._-]*show\b/i;
function isComposite(node: ts.Node): node is ts.BinaryExpression | ts.TemplateExpression {
  return ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken);
}
/** The literal parts of a composite: its own string and template parts, never what its names read as. */
function literalParts(node: ts.Expression): string[] {
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return [value.text];
  if (ts.isTemplateExpression(value)) return [value.head.text, ...value.templateSpans.flatMap((span) => [...literalParts(span.expression), span.literal.text])];
  if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.PlusToken) return [...literalParts(value.left), ...literalParts(value.right)];
  return [];
}
/** Every spelling of an rf operation-show leaf in one module (LEAF READER, see the header), in source order. */
function operationShowSpellings(path: string, tree: ModuleTree): string[] {
  const file = tree.module(path);
  if (file === undefined) throw new Error(`no module ${path} in the tree`);
  const at: At = { tree, file };
  const found: string[] = [];
  visit(file, (node) => {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && SPELLS_OPERATION_SHOW.test(node.text)) {
      found.push(`${path}:literal:${node.text}`);
    }
    if (isComposite(node)) {
      let parent = node.parent;
      while (ts.isParenthesizedExpression(parent)) parent = parent.parent;
      const outermost = !isComposite(parent) && !ts.isTemplateSpan(parent);
      const text = staticText(node, at);
      if (outermost && SPELLS_OPERATION_SHOW.test(text) && !literalParts(node).some((part) => SPELLS_OPERATION_SHOW.test(part))) found.push(`${path}:composite:${text}`);
    }
    const list = ts.isArrayLiteralExpression(node) ? node.elements : ts.isCallExpression(node) || ts.isNewExpression(node) ? node.arguments : undefined;
    if (list !== undefined) {
      const words = listWords(list, at);
      for (let index = 0; index + 1 < words.length; index++) {
        if (/^operation$/i.test(words[index]) && /^show$/i.test(words[index + 1])) found.push(`${path}:adjacent@${index}:${words[index]},${words[index + 1]}`);
      }
    }
  });
  return found;
}

/* ---------------------------------------------------------------- planted module trees (rows A and C) */

/** A committing render declared read under the preview grant, with no key and no operation show: it draws every A finding. */
const PLANTED_ID = JSON.stringify("reactivefiber.render.commit");
const PLANTED_CONTRACT = JSON.stringify("rf@0.1.845:reactive-fiber.cli/v1 context.render");
const PLANTED_IDS = `export const RF_COMMIT_CAPABILITY = ${PLANTED_ID};\nexport const RF_COMMIT_CONTRACT = ${PLANTED_CONTRACT};\n`;
function plantedRegistration(id: string, contract: string, prelude = ""): string {
  return `${prelude}registry.register({ descriptor: { id: ${id}, effectClass: "read", permissions: ["reactivefiber:render"], contractSource: ${contract} }, invoke: async () => null });\n`;
}
type PlantedTrees = Readonly<Record<string, Readonly<Record<string, string>>>>;
/** Noncommitting initializers (forge values) that a SEALED rewrite form turns into a committing render's id and contract. */
const FORGE_IDS = 'const IDS = { commit: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit" };\n';
const THROUGH_IDS = plantedRegistration("IDS.commit", "IDS.contract");
/** IDS exported by one module and registered through by another: the cross-module rewrite forms add a third. */
const SHARED_IDS: Readonly<Record<string, string>> = { "src/p/ids.ts": `export ${FORGE_IDS}`, "src/p/reg.ts": plantedRegistration("IDS.commit", "IDS.contract", 'import { IDS } from "./ids.js";\n') };
function rewritten(rewrite: string, registration = THROUGH_IDS): Readonly<Record<string, string>> {
  return { "src/p/reg.ts": `${FORGE_IDS}${rewrite}${registration}` };
}
/** A noncommitting descriptor literal's fields (forge values), for the forms that place or rewrite the literal itself. */
const FORGE_FIELDS = 'id: "forge.gate.commit", effectClass: "read", permissions: ["reactivefiber:render"], contractSource: "@forge/sdk@0.1.0:GateFacade.commit"';
/** One tree per value form the SRC READER reads: each registration reads as that committing literal. */
const PLANTED_FORMS: PlantedTrees = {
  importedConsts: { "src/p/ids.ts": PLANTED_IDS, "src/p/reg.ts": plantedRegistration("RF_COMMIT_CAPABILITY", "RF_COMMIT_CONTRACT", 'import { RF_COMMIT_CAPABILITY, RF_COMMIT_CONTRACT } from "./ids.js";\n') },
  aliasedImport: { "src/p/ids.ts": PLANTED_IDS, "src/p/reg.ts": plantedRegistration("ID", "CONTRACT", 'import { RF_COMMIT_CAPABILITY as ID, RF_COMMIT_CONTRACT as CONTRACT } from "./ids.js";\n') },
  namespaceImport: { "src/p/ids.ts": PLANTED_IDS, "src/p/reg.ts": plantedRegistration("ids.RF_COMMIT_CAPABILITY", 'ids["RF_COMMIT_CONTRACT"]', 'import * as ids from "./ids.js";\n') },
  reExports: {
    "src/p/ids.ts": PLANTED_IDS,
    "src/p/barrel.ts": 'export { RF_COMMIT_CAPABILITY } from "./ids.js";\nexport { RF_COMMIT_CONTRACT as CONTRACT } from "./ids.js";\n',
    "src/q/reg.ts": plantedRegistration("RF_COMMIT_CAPABILITY", "CONTRACT", 'import { CONTRACT, RF_COMMIT_CAPABILITY } from "../p/barrel.js";\n'),
  },
  exportStar: { "src/p/ids.ts": PLANTED_IDS, "src/p/index.ts": 'export * from "./ids.js";\n', "src/reg.ts": plantedRegistration("RF_COMMIT_CAPABILITY", "RF_COMMIT_CONTRACT", 'import { RF_COMMIT_CAPABILITY, RF_COMMIT_CONTRACT } from "./p";\n') },
  exportAlias: {
    "src/p/ids.ts": `const id = ${PLANTED_ID};\nconst contract = ${PLANTED_CONTRACT};\nexport { id as RF_ID, contract as RF_CONTRACT };\n`,
    "src/p/reg.ts": plantedRegistration("RF_ID", "RF_CONTRACT", 'import { RF_CONTRACT, RF_ID } from "./ids.js";\n'),
  },
  constObject: { "src/p/reg.ts": plantedRegistration("IDS.commit", 'IDS["contract"]', `const IDS = { commit: ${PLANTED_ID}, contract: ${PLANTED_CONTRACT} } as const;\n`) },
  importedFrozenObject: {
    "src/p/ids.ts": `export const IDS = Object.freeze({ render: { commit: ${PLANTED_ID} }, contract: ${PLANTED_CONTRACT} });\n`,
    "src/p/reg.ts": plantedRegistration("IDS.render.commit", "IDS.contract", 'import { IDS } from "./ids.js";\n'),
  },
  concatenation: { "src/p/reg.ts": plantedRegistration('NS + ".render.commit"', `\`rf@\${VERSION}:reactive-fiber.cli/v1 context.render\``, 'const NS = "reactivefiber";\nconst VERSION = "0.1.845";\n') },
  computedKeys: {
    "src/p/reg.ts": `const EFFECT = "effectClass";\nregistry.register({ descriptor: { ["id"]: ${PLANTED_ID}, [EFFECT]: "read", "permissions": ["reactivefiber:render"], "contractSource": \`rf@0.1.845:reactive-fiber.cli/v1 context.render\` } });\n`,
  },
  shorthand: { "src/p/reg.ts": `const id = ${PLANTED_ID};\nconst effectClass = "read";\nconst contractSource = ${PLANTED_CONTRACT};\nregistry.register({ descriptor: { id, effectClass, permissions: ["reactivefiber:render"], contractSource } });\n` },
  rfCliWords: { "src/p/reg.ts": plantedRegistration(JSON.stringify("rf.render.commit"), JSON.stringify("rf 0.1.845 context.render (ReactiveFiberCLI)")) },
  exportedObject: {
    "src/p/ids.ts": `const IDS = { commit: ${PLANTED_ID}, contract: ${PLANTED_CONTRACT} };\nexport { IDS };\n`,
    "src/p/reg.ts": plantedRegistration("IDS.commit", "IDS.contract", 'import { IDS } from "./ids.js";\n'),
  },
  wrappedRegistration: {
    "src/p/reg.ts": `registry.register(<CapabilityProvider>({ descriptor: <CapabilityDescriptor>{ id: ${PLANTED_ID}, effectClass: "read", permissions: ["reactivefiber:render"], contractSource: ${PLANTED_CONTRACT} } as CapabilityDescriptor, invoke: async () => null } satisfies CapabilityProvider));\n`,
  },
};
/** One tree per form the SRC READER refuses as UNREAD. */
const PLANTED_REFUSED: PlantedTrees = {
  callId: { "src/p/reg.ts": plantedRegistration("commitId()", PLANTED_CONTRACT) },
  parameters: { "src/p/reg.ts": `export function descriptor(id: string, effectClass: string) {\n  return { id, effectClass, permissions: ["reactivefiber:render"], contractSource: ${PLANTED_CONTRACT} };\n}\n` },
  shadowedNames: {
    "src/p/ids.ts": PLANTED_IDS,
    "src/p/reg.ts": [
      `const P = ${PLANTED_ID};`,
      `export function byParameter(P: string) {\n  ${plantedRegistration("P", PLANTED_CONTRACT)}}`,
      `const F = ${PLANTED_ID};`,
      `export function byFunction() {\n  function F() {}\n  ${plantedRegistration("F", PLANTED_CONTRACT)}}`,
      `const K = ${PLANTED_ID};`,
      `export function byClass() {\n  class K {}\n  ${plantedRegistration("K", PLANTED_CONTRACT)}}`,
      `const E = ${PLANTED_ID};`,
      `export function byEnum() {\n  enum E { A }\n  ${plantedRegistration("E", PLANTED_CONTRACT)}}`,
      'import { RF_COMMIT_CAPABILITY } from "./ids.js";',
      `export function byImport() {\n  const RF_COMMIT_CAPABILITY = "reactivefiber.render.preview";\n  ${plantedRegistration("RF_COMMIT_CAPABILITY", PLANTED_CONTRACT)}}`,
      `const B = ${PLANTED_ID};`,
      `export function byBlockConst() {\n  { const B = "reactivefiber.render.preview"; }\n  ${plantedRegistration("B", PLANTED_CONTRACT)}}`,
      "",
    ].join("\n"),
  },
  letVarBindings: { "src/p/reg.ts": `let L = ${PLANTED_ID};\nvar V = ${PLANTED_ID};\n${plantedRegistration("L", PLANTED_CONTRACT)}${plantedRegistration("V", PLANTED_CONTRACT)}` },
  packageImport: { "src/p/reg.ts": plantedRegistration("RF_COMMIT_CAPABILITY", PLANTED_CONTRACT, 'import { RF_COMMIT_CAPABILITY } from "@pi/rf-ids";\n') },
  missingExport: { "src/p/ids.ts": PLANTED_IDS, "src/p/reg.ts": plantedRegistration("RF_COMMIT_ID", PLANTED_CONTRACT, 'import { RF_COMMIT_ID } from "./ids.js";\n') },
  spreadObjectMember: { "src/p/reg.ts": plantedRegistration("IDS.commit", PLANTED_CONTRACT, `const IDS = { ...BASE_IDS, commit: ${PLANTED_ID} };\n`) },
  spread: { "src/p/reg.ts": `registry.register({ descriptor: { ...BASE, id: ${PLANTED_ID}, effectClass: "write", permissions: ["reactivefiber:commit"], contractSource: ${JSON.stringify(COMMIT_CONTRACT)} } });\n` },
  accessor: { "src/p/reg.ts": `registry.register({ descriptor: { id: ${PLANTED_ID}, get effectClass() { return "read"; }, permissions: ["reactivefiber:render"], contractSource: ${PLANTED_CONTRACT} } });\n` },
  method: { "src/p/reg.ts": `registry.register({ descriptor: { id: ${PLANTED_ID}, effectClass() { return "read"; }, permissions: ["reactivefiber:render"], contractSource: ${PLANTED_CONTRACT} } });\n` },
  unreadKey: { "src/p/reg.ts": `registry.register({ descriptor: { [key()]: "x", id: ${PLANTED_ID}, effectClass: "write", permissions: ["reactivefiber:commit"], contractSource: ${JSON.stringify(COMMIT_CONTRACT)} } });\n` },
  rfContractPart: { "src/p/reg.ts": `export function descriptor(version: string) {\n  return { id: "rf.commit", effectClass: "read", permissions: ["reactivefiber:render"], contractSource: \`rf@\${version}:reactive-fiber.cli/v1 context.render\` };\n}\n` },
  mixedProjection: { "src/p/view.ts": `export function view(d: CapabilityDescriptor) {\n  return { id: d.id, effectClass: "read", contractSource: ${PLANTED_CONTRACT} };\n}\n` },
  twoBases: { "src/p/view.ts": "export function view(a: CapabilityDescriptor, b: CapabilityDescriptor) {\n  return { id: a.id, effectClass: b.effectClass };\n}\n" },
  projectionUnreadKey: { "src/p/view.ts": "export function view(d: CapabilityDescriptor) {\n  return { [key()]: 1, id: d.id, effectClass: d.effectClass };\n}\n" },
  noEffectClass: { "src/p/reg.ts": `registry.register({ descriptor: { id: ${PLANTED_ID}, permissions: ["reactivefiber:render"], contractSource: ${PLANTED_CONTRACT} } });\n` },
  idOnly: { "src/p/reg.ts": `registry.register({ descriptor: { ...PREVIEW_DESCRIPTOR, id: ${PLANTED_ID} } });\n` },
  // cut #3, SEALED rewrite forms: IDS's forge initializers are rewritten to a committing render's id and contract, so IDS is open
  memberWrite: rewritten(`IDS.commit = ${PLANTED_ID};\nIDS.contract = ${PLANTED_CONTRACT};\n`),
  setupModule: { ...SHARED_IDS, "src/p/setup.ts": `import { IDS } from "./ids.js";\nIDS.commit = ${PLANTED_ID};\nIDS.contract = ${PLANTED_CONTRACT};\n` },
  elementWrite: rewritten(`IDS["commit"] = ${PLANTED_ID};\n`),
  computedWrite: rewritten(`IDS[slot()] = ${PLANTED_ID};\n`),
  compoundWrite: { "src/p/reg.ts": `const IDS = { commit: "reactive", contract: "@forge/sdk@0.1.0:GateFacade.commit" };\nIDS.commit += "fiber.render.commit";\n${THROUGH_IDS}` },
  logicalWrite: rewritten(`IDS.commit &&= ${PLANTED_ID};\n`),
  updateWrite: { "src/p/reg.ts": `const IDS = { commit: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit", uses: 0 };\nIDS.uses++;\n${THROUGH_IDS}` },
  updateStringWrite: rewritten("IDS.commit++;\n"),
  deleteWrite: rewritten("delete IDS.contract;\n"),
  destructuringWrite: rewritten(`({ commit: IDS.commit } = { commit: ${PLANTED_ID} });\n`),
  arrayDestructuringWrite: rewritten(`[IDS.commit] = [${PLANTED_ID}];\n`),
  forOfWrite: rewritten(`for (IDS.commit of [${PLANTED_ID}]) void 0;\n`),
  objectAssign: rewritten(`Object.assign(IDS, { commit: ${PLANTED_ID} });\n`),
  defineProperty: rewritten(`Object.defineProperty(IDS, "commit", { value: ${PLANTED_ID} });\n`),
  reflectSet: rewritten(`Reflect.set(IDS, "commit", ${PLANTED_ID});\n`),
  alias: rewritten(`const alias = IDS;\nalias.commit = ${PLANTED_ID};\n`),
  parameter: rewritten(`function rewrite(ids: { commit: string }): void {\n  ids.commit = ${PLANTED_ID};\n}\nrewrite(IDS);\n`),
  shorthandMember: rewritten("audit({ IDS });\n"),
  methodThis: { "src/p/reg.ts": `const IDS = { commit: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit", fix(): void { this.commit = ${PLANTED_ID}; } };\nIDS.fix();\n${THROUGH_IDS}` },
  nestedAlias: {
    "src/p/reg.ts": `const IDS = { render: { commit: "forge.gate.commit" }, contract: "@forge/sdk@0.1.0:GateFacade.commit" };\nconst render = IDS.render;\nrender.commit = ${PLANTED_ID};\n${plantedRegistration("IDS.render.commit", "IDS.contract")}`,
  },
  spreadCopyWrite: {
    "src/p/reg.ts": `const IDS = { render: { commit: "forge.gate.commit" }, contract: "@forge/sdk@0.1.0:GateFacade.commit" };\nconst copy = { ...IDS };\ncopy.render.commit = ${PLANTED_ID};\n${plantedRegistration("IDS.render.commit", "IDS.contract")}`,
  },
  namespaceWrite: { ...SHARED_IDS, "src/p/setup.ts": `import * as ids from "./ids.js";\nids.IDS.commit = ${PLANTED_ID};\n` },
  namespaceWhole: { ...SHARED_IDS, "src/p/setup.ts": 'import * as ids from "./ids.js";\nrewriteAll(ids);\n' },
  reExportWrite: { ...SHARED_IDS, "src/p/barrel.ts": 'export { IDS } from "./ids.js";\n', "src/p/setup.ts": `import { IDS } from "./barrel.js";\nIDS.commit = ${PLANTED_ID};\n` },
  namespaceReExport: { ...SHARED_IDS, "src/p/barrel.ts": 'export * as ids from "./ids.js";\n', "src/p/setup.ts": `import { ids } from "./barrel.js";\nids.IDS.commit = ${PLANTED_ID};\n` },
  namespaceReExported: { ...SHARED_IDS, "src/p/barrel.ts": 'import * as ids from "./ids.js";\nexport { ids };\n', "src/p/setup.ts": `import { ids } from "./barrel.js";\nids.IDS.commit = ${PLANTED_ID};\n` },
  defaultExport: {
    "src/p/ids.ts": `${FORGE_IDS}export default IDS;\nexport { IDS };\n`,
    "src/p/setup.ts": `import ids from "./ids.js";\nids.commit = ${PLANTED_ID};\n`,
    "src/p/reg.ts": plantedRegistration("IDS.commit", "IDS.contract", 'import { IDS } from "./ids.js";\n'),
  },
  shadowedImportWrite: {
    ...SHARED_IDS,
    "src/p/setup.ts": `import { IDS } from "./ids.js";\nexport function local(): string {\n  const IDS = { commit: "forge.gate.local" };\n  return IDS.commit;\n}\nIDS.commit = ${PLANTED_ID};\n`,
  },
  shadowedFreeze: {
    "src/p/reg.ts": `const Object = { freeze: <T extends object>(value: T): T => ({ ...value, commit: ${PLANTED_ID} }) };\nconst IDS = Object.freeze({ commit: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit" });\n${THROUGH_IDS}`,
  },
  // cut #3, outside the register position: the literal can be rewritten before it is registered, so it is UNREAD
  boundDescriptor: {
    "src/p/reg.ts": `const DESCRIPTOR = { ${FORGE_FIELDS} };\nDESCRIPTOR.id = ${PLANTED_ID};\nDESCRIPTOR.contractSource = ${PLANTED_CONTRACT};\nregistry.register({ descriptor: DESCRIPTOR, invoke: async () => null });\n`,
  },
  returnedDescriptor: {
    "src/p/reg.ts": `function commitDescriptor() {\n  return { ${FORGE_FIELDS} };\n}\nconst descriptor = commitDescriptor();\ndescriptor.id = ${PLANTED_ID};\nregistry.register({ descriptor, invoke: async () => null });\n`,
  },
  wrappedHolder: { "src/p/reg.ts": `registry.register(audited({ descriptor: { ${FORGE_FIELDS} }, invoke: async () => null }));\n` },
  holderSpread: { "src/p/reg.ts": `registry.register({ descriptor: { ${FORGE_FIELDS} }, invoke: async () => null, ...OVERRIDES });\n` },
  secondDescriptor: { "src/p/reg.ts": `registry.register({ descriptor: { ${FORGE_FIELDS} }, descriptor: COMMITTING, invoke: async () => null });\n` },
  secondDescriptorLast: { "src/p/reg.ts": `registry.register({ descriptor: COMMITTING, descriptor: { ${FORGE_FIELDS} }, invoke: async () => null });\n` },
  holderUnreadKey: { "src/p/reg.ts": `registry.register({ descriptor: { ${FORGE_FIELDS} }, [slot()]: COMMITTING, invoke: async () => null });\n` },
  boundHolder: {
    "src/p/reg.ts": `const PROVIDER = { descriptor: { ${FORGE_FIELDS} }, invoke: async () => null };\nPROVIDER.descriptor.id = ${PLANTED_ID};\nregistry.register(PROVIDER);\n`,
  },
  accessorRewrite: {
    "src/p/reg.ts": `registry.register({ descriptor: { id: "forge.gate.commit", get inputSchema() { this.id = ${PLANTED_ID}; return { type: "object" }; }, effectClass: "read", permissions: ["reactivefiber:render"], contractSource: "@forge/sdk@0.1.0:GateFacade.commit" }, invoke: async () => null });\n`,
  },
  registeredProjection: {
    "src/p/reg.ts": 'export function registerFrom(base: CapabilityDescriptor): void {\n  registry.register({ descriptor: { id: base.id, effectClass: base.effectClass, permissions: ["reactivefiber:render"], contractSource: base.contractSource }, invoke: async () => null });\n}\n',
  },
  registeredSpread: { "src/p/reg.ts": 'registry.register({ descriptor: { id: "forge.gate.commit", ...COMMIT_FIELDS }, invoke: async () => null });\n' },
  registeredNoId: { "src/p/reg.ts": "registry.register({ descriptor: { ...COMMIT_DESCRIPTOR }, invoke: async () => null });\n" },
};
/** Trees the SRC READER excepts as projections, judges not rf-driving, or judges through a readable (sealed) base. */
const PLANTED_EXCEPTED: PlantedTrees = {
  projection: { "src/p/view.ts": 'export function view(descriptor: CapabilityDescriptor) {\n  return { ...descriptor, id: descriptor.id, effectClass: descriptor.effectClass, contractSource: descriptor.contractSource ?? "unknown" };\n}\n' },
  wrappedProjection: { "src/p/view.ts": "export function view(descriptor: CapabilityDescriptor) {\n  return { id: sanitize(descriptor.id, 80), effectClass: sanitize(descriptor.effectClass, 80) };\n}\n" },
  notRf: { "src/p/reg.ts": `export function register(sdkVersion: string) {\n  registry.register({ descriptor: { id: "forge.gate.status", effectClass: "read", permissions: ["forge:inspect"], contractSource: \`@forge/sdk@\${sdkVersion}:GateFacade.status\` } });\n}\n` },
  notRfUnreadEffect: { "src/p/reg.ts": 'registry.register({ descriptor: { id: "forge.gate.status", effectClass: effectOf(), permissions: ["forge:inspect"], contractSource: "@forge/sdk@0.1.0:GateFacade.status" } });\n' },
  readableBase: {
    "src/p/reg.ts": `const PREVIEW = { capability: "reactivefiber.render.preview", contract: "rf@0.1.845:reactive-fiber.cli/v1 context.render --no-commit" };\n${plantedRegistration("PREVIEW.capability", "PREVIEW.contract")}`,
  },
  sealedReads: {
    "src/p/reg.ts": `${FORGE_IDS}export const label = "" + IDS.commit + " (" + IDS.contract + ")";\nexport const same = IDS.commit === "forge.gate.commit";\nexport const words = [...[IDS.commit], IDS.contract];\n${THROUGH_IDS}`,
  },
};
/**
 * The channels NOT CLAIMED names (cut #3): in each tree the registered descriptor is a committing render at run time, while the
 * readers give the quiet reading pinned in WITNESS (A1.unseen) - a reading that moves reds A1 here first.
 */
const PLANTED_UNSEEN: PlantedTrees = {
  codeInAString: rewritten(`const SCRIPT = "IDS.commit = 'reactivefiber.render.commit'";\nrunScript(SCRIPT);\n`),
  dynamicImport: { ...SHARED_IDS, "src/p/setup.ts": `void import("./ids.js").then((module) => {\n  module.IDS.commit = ${PLANTED_ID};\n});\n` },
  requireCall: { ...SHARED_IDS, "src/p/setup.ts": `import { createRequire } from "node:module";\ncreateRequire(import.meta.url)("./ids.js").IDS.commit = ${PLANTED_ID};\n` },
  absoluteSpecifier: { ...SHARED_IDS, "src/p/setup.ts": `import { IDS } from "/repo/src/p/ids.js";\nIDS.commit = ${PLANTED_ID};\n` },
  nonTsModule: { ...SHARED_IDS, "src/p/setup.js": `import { IDS } from "./ids.js";\nIDS.commit = ${PLANTED_ID};\n` },
  replacedFreeze: {
    "src/p/ids.ts": 'export const IDS = Object.freeze({ commit: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit" });\n',
    "src/p/setup.ts": `Object.freeze = <T>(value: T): T => Object.assign(value, { commit: ${PLANTED_ID} });\n`,
    "src/p/reg.ts": plantedRegistration("IDS.commit", "IDS.contract", 'import "./setup.js";\nimport { IDS } from "./ids.js";\n'),
  },
  rewritingCallee: {
    "src/p/reg.ts": `export function register(provider: CapabilityProvider): void {\n  provider.descriptor.id = ${PLANTED_ID};\n  registry["register"](provider);\n}\nregister({ descriptor: { ${FORGE_FIELDS} }, invoke: async () => null });\n`,
  },
  aliasRegistration: { "src/p/reg.ts": "const add = registry.register.bind(registry);\nadd(commitProvider());\n" },
  rfOutsideFamily: { "src/p/reg.ts": plantedRegistration(JSON.stringify("pi.render.commit"), JSON.stringify("R-F command line: context render")) },
};
/** The LEAF READER's planted control: each form it reads, then near misses it must not read. */
const LEAF_CONTROL: Readonly<Record<string, string>> = {
  "src/leaf/words.ts": 'export const OPERATION = "operation";\nexport const SHOW_WORDS = ["show"] as const;\n',
  "src/leaf/control.ts": [
    'import { OPERATION, SHOW_WORDS } from "./words.js";',
    'const argv = ["--json"];',
    'const line = "rf operation show rfo_x";',
    "const dotted = `operation.show`;",
    'const SHOW = "show";',
    'const joined = "operation " + SHOW;',
    `const templated = \`rf operation \${SHOW} rfo_x\`;`,
    `export function headed(id: string): string { return \`rf operation show \${id}\`; }`,
    `export function middled(a: string, b: string): string { return \`\${a} rf operation show \${b} then operation.show\`; }`,
    'const nested = ("operation " + SHOW) + "!";',
    'export function split(root: string, id: string): string[] { return ["--workspace", root, "operation", "show", id, "--json"]; }',
    "export function pushed(args: string[]): void { args.push(OPERATION, SHOW); }",
    'export const LEAF = ["operation", "show"];',
    'export const shouted = ["OPERATION", "Show"];',
    'export const command = new Command("rf", "operation", "show");',
    'const PREFIX = ["--json", OPERATION];',
    "export function spread(id: string): string[] { return [...PREFIX, ...SHOW_WORDS, id]; }",
    'export const nearMisses = [["operation", "list"], ["show", "operation"], ["operation", "--json", "show"]];',
    'export function unread(verb: string): string[] { return ["operation", verb]; }',
    'export const prose = "an operation; show it";',
    "",
  ].join("\n"),
};
/** The LEAF READER's NOT CLAIMED rows (cut #3): a word array the tree rewrites is open (SEALED), so its spread is not expanded either way. */
const LEAF_UNSEEN: PlantedTrees = {
  addsLeaf: {
    "src/leaf/rewrite.ts": 'const OPERATION_WORDS = ["operation"];\nconst VERBS = ["list"];\nVERBS[0] = "show";\nexport function argv(id: string): string[] {\n  return ["--workspace", ".", ...OPERATION_WORDS, ...VERBS, id];\n}\n',
  },
  removesLeaf: {
    "src/leaf/rewrite.ts": 'const OPERATION_WORDS = ["operation"];\nconst VERBS = ["show"];\nVERBS[0] = "list";\nexport function argv(id: string): string[] {\n  return ["--workspace", ".", ...OPERATION_WORDS, ...VERBS, id];\n}\n',
  },
};

/* ---------------------------------------------------------------- judged rows */

interface Pin {
  readonly id: string;
  readonly clause: string;
  /** Runs the pin's measurements and returns its witness, held to WITNESS[id]. */
  readonly run: () => Promise<unknown>;
}
interface Row {
  readonly id: string;
  readonly acceptance: number;
  readonly pins: readonly Pin[];
}
const [A0, A1] = clausesOf(ACCEPTANCE[0]);
const [B0, B1] = clausesOf(ACCEPTANCE[1]);
const [C0, C1] = clausesOf(ACCEPTANCE[2]);
const [D0, D1, D2, D3] = clausesOf(ACCEPTANCE[3]);

const ROWS: readonly Row[] = [
  {
    id: "A",
    acceptance: 0,
    pins: [
      {
        id: "A1",
        clause: A0,
        run: async () => {
          const grants = readGrants();
          const registered = (register: (registry: CapabilityRegistry) => void) => {
            const registry = new CapabilityRegistry();
            register(registry);
            return registry
              .catalogSnapshot()
              .map(({ descriptor }) => ({ id: descriptor.id, effectClass: descriptor.effectClass, ...judge(descriptor, grants) }))
              .filter((row) => row.rf);
          };
          const native = registered((registry) => registerNativeReactiveFiberRender(registry, ROOT));
          const injected = registered((registry) =>
            registerReactiveFiberRender(registry, () => Promise.reject(new Error("the census never invokes the injected reader")), ROOT),
          );
          const readings = srcFiles().flatMap((path) => descriptorReadings(path, SRC));
          const literals = readings.flatMap((reading) => (reading.kind === "judged" ? [reading.facts] : []));
          expect(literals.length, "the src scan reads descriptor literals").toBeGreaterThanOrEqual(2);
          const rfLiterals = literals
            .map((literal) => ({ file: literal.file, id: literal.id, effectClass: literal.effectClass, ...judge(literal, grants) }))
            .filter((row) => row.rf);
          const unread = readings.flatMap((reading) => (reading.kind === "unread" ? [`${reading.file}:${reading.fields.join(",")}`] : []));
          const forwarding = srcFiles().flatMap((path) => forwardingSites(path, SRC));
          const copied = copyReading();
          const plantedFile = {
            "planted.ts": 'const C = "rf@0.1.845:reactive-fiber.cli/v1 context.render";\nregistry.register({ descriptor: { id: "reactivefiber.render.commit", effectClass: "read", permissions: ["reactivefiber:render"], contractSource: C } });',
          };
          const planted = descriptorReadings("planted.ts", plantedTree(plantedFile)).flatMap((reading) => (reading.kind === "judged" ? [judge(reading.facts, grants).findings] : []));
          const trees = (set: PlantedTrees) => Object.fromEntries(Object.entries(set).map(([form, modules]) => [form, plantedReadings(modules, grants)]));
          const forms = trees(PLANTED_FORMS);
          const refused = trees(PLANTED_REFUSED);
          const excepted = trees(PLANTED_EXCEPTED);
          const unseen = trees(PLANTED_UNSEEN);
          const constructed = {
            read: judge(committing({ effectClass: "read" }), grants).findings,
            write: judge(committing({ effectClass: "write" }), grants).findings,
            external: judge(committing({ effectClass: "external" }), grants).findings,
            unknown: judge(committing({ effectClass: "unknown" }), grants).findings,
            noContract: judge({ id: COMMIT_ID, effectClass: "write", permissions: [COMMIT_PERMISSION] }, grants).findings,
            stand: judge(COMMIT_DESCRIPTOR, grants).findings,
            spaced: judge(committing({ effectClass: "read", contractSource: "reactive-fiber.cli/v1 context render" }), grants).findings,
          };
          expect(native).toStrictEqual([{ id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] }]);
          expect(injected).toStrictEqual(native);
          expect(rfLiterals, OWED).toStrictEqual([
            { file: PROVIDER, id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] },
            { file: PROVIDER, id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] },
          ]);
          expect(unread, UNREAD_OWED).toStrictEqual([]);
          expect(forwarding, FORWARDING_OWED).toStrictEqual(["src/workbench/hosts/local-detached.ts#registryFor:register(provider)", "src/workbench/hosts/local-detached.ts#registryFor:module.register(registry)"]);
          expect(planted).toStrictEqual([["effectClass", "idempotency-key", "operation-show", "write-grant"]]);
          for (const readingsOfForm of Object.values(forms)) expect(readingsOfForm).toStrictEqual(["committing:effectClass,idempotency-key,operation-show,write-grant"]);
          expect(constructed.read).toStrictEqual(["effectClass"]);
          return { native, injected, rfLiterals, unread, forwarding, copied, planted, forms, refused, excepted, unseen, constructed };
        },
      },
      {
        id: "A2",
        clause: A1,
        run: async () => {
          const grants = readGrants();
          const rule = {
            withoutFlag: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render, outcome by rf operation show" }), grants).findings,
            proseKey: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render with an idempotency key, outcome by rf operation show" }), grants).findings,
            withFlag: judge(committing({}), grants).findings,
          };
          const argv: JsonObject = {};
          for (const [arm, input] of [["legacy", LEGACY_INPUT], ["view", VIEW_INPUT]] as const) {
            const log = standInRf("silent");
            const registry = new CapabilityRegistry();
            registerNativeReactiveFiberRender(registry, ROOT);
            const refusal = await refusalFrom(registry.invoke(PREVIEW_ID, input, contextOf([PREVIEW_GRANT])));
            const spawned = spawnsOf(log);
            expect(refusal.category).toBe("transport");
            expect(spawned).toHaveLength(1);
            argv[arm] = tailOf(spawned[0]);
          }
          expect(rule.withoutFlag).toStrictEqual(["idempotency-key"]);
          expect(rule.proseKey).toStrictEqual(["idempotency-key"]);
          for (const tail of Object.values(argv)) {
            expect(tail).toContain("--no-commit");
            expect(tail).not.toContain("--idempotency-key");
          }
          return { rule, argv };
        },
      },
    ],
  },
  {
    id: "B",
    acceptance: 1,
    pins: [
      {
        id: "B1",
        clause: B0,
        run: async () => {
          const outcomes = /^On ([a-z/]+) outcome /.exec(B0)?.[1]?.split("/") ?? [];
          const arms: Record<string, { readonly behavior: Behavior; readonly deadlineMs: number }> = {
            timeout: { behavior: "hold", deadlineMs: DEADLINE_MS },
            kill: { behavior: "kill", deadlineMs: SETTLE_MS },
            unknown: { behavior: "silent", deadlineMs: SETTLE_MS },
          };
          expect(outcomes).toStrictEqual(Object.keys(arms));
          const measured: JsonObject = {};
          for (const outcome of outcomes) {
            const arm = arms[outcome];
            const log = standInRf(arm.behavior);
            const harness = commitHarness(arm.deadlineMs);
            const invoked = performance.now();
            const refusal = await refusalFrom(harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION])));
            const settledMs = performance.now() - invoked;
            await Promise.all(harness.settled);
            const spawned = spawnsOf(log);
            expect(refusal.category).toBe("uncertain-effect");
            expect(refusal.message.endsWith("Reconcile with the producer before retrying.")).toBe(true);
            expect(spawned).toHaveLength(1);
            measured[outcome] = { deadlineMs: harness.deadlineMs, ...refusal, spawns: spawned.length, argv: tailOf(spawned[0]), actedAfterHold: outcome === "timeout" ? null : settledMs >= HOLD_MS };
          }
          return measured;
        },
      },
      {
        id: "B2",
        clause: B1,
        run: async () => {
          const recorded = await timedOutRun();
          const harness = commitHarness(DEADLINE_MS);
          const resumed = await runWorkflow({ script: SCRIPT, host: claudeHost(harness.registry, [COMMIT_PERMISSION]), journal: { entries: recorded.entries } });
          await Promise.all(harness.settled);
          const resumeSpawns = spawnsOf(recorded.log).length - recorded.spawns;
          const error = resumed.error ?? "";
          expect(recorded.status).toBe("failed");
          expect(recorded.category).toBe("uncertain-effect");
          expect(recorded.spawns).toBe(1);
          expect(recorded.retryWhileInFlight).toBe(false);
          expect(resumed.status).toBe("failed");
          expect(resumed.capabilityError?.category).toBe("uncertain-effect");
          expect(resumeSpawns).toBe(0);
          return {
            recorded: { status: recorded.status, category: recorded.category, retryWhileInFlight: recorded.retryWhileInFlight, spawns: recorded.spawns, nodeRows: nodeRows(recorded.entries) },
            resumed: {
              status: resumed.status,
              category: resumed.capabilityError?.category ?? null,
              namesProducer: error.includes('producer "reactivefiber"'),
              namesReconcile: error.includes("workflow_reconcile"),
              replayedNodeCount: resumed.replayedNodeCount,
              reconciledNodeCount: resumed.reconciledNodeCount,
              spawns: resumeSpawns,
            },
          };
        },
      },
    ],
  },
  {
    id: "C",
    acceptance: 2,
    pins: [
      {
        id: "C1",
        clause: C0,
        run: async () => {
          const run = await timedOutRun();
          const inspect = decideReconcile(reconcileRequest("inspect", {}, ["workbench:observe"]), reconcileDeps(run.entries, "failed"));
          const roster = inspect.decision === "inspect"
            ? inspect.roster.positions.map((position) => ({
                position: position.position,
                capabilityId: position.capabilityId,
                effectClass: position.effectClass,
                producer: position.producer,
                state: position.state,
                evidenceReads: [...position.evidenceReads],
              }))
            : [];
          const evidence = (capabilityId: string) =>
            outcomeOf(decideReconcile(reconcileRequest("evidence", { evidence: { capabilityId, input: LEGACY_INPUT } }, ["workbench:observe"]), reconcileDeps(run.entries, "failed")));
          const spellings = srcFiles().flatMap((path) => operationShowSpellings(path, SRC));
          const controlTree = plantedTree(LEAF_CONTROL);
          const control = Object.keys(LEAF_CONTROL).flatMap((path) => operationShowSpellings(path, controlTree));
          const unseen = Object.fromEntries(
            Object.entries(LEAF_UNSEEN).map(([form, modules]) => {
              const tree = plantedTree(modules);
              return [form, Object.keys(modules).flatMap((path) => operationShowSpellings(path, tree))];
            }),
          );
          const grants = readGrants();
          const result = {
            timedOut: { status: run.status, category: run.category, spawns: run.spawns },
            evidenceReads: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])],
            roster,
            evidence: { operationShow: evidence("reactivefiber.operation.show"), preview: evidence(PREVIEW_ID) },
            srcSpellings: spellings,
            control,
            unseen,
            rule: {
              withoutReader: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render --idempotency-key KEY" }), grants).findings,
              withReader: judge(committing({}), grants).findings,
            },
          };
          expect(result.evidenceReads).toStrictEqual([PREVIEW_ID]);
          expect(result.srcSpellings).toStrictEqual([]);
          expect(result.control).toHaveLength(14);
          return result;
        },
      },
      {
        id: "C2",
        clause: C1,
        run: async () => {
          const run = await timedOutRun();
          const rows = run.entries.filter((entry) => entry.kind === "node");
          const row = rows[rows.length - 1];
          expect(row?.index).toBe(0);
          const notFound = previewReceipt(row, false);
          const returned = previewReceipt(row, true);
          const absent = (receiptIds: readonly string[]): JsonObject => ({
            reason: "rf operation show answered exit 3 (no committed render carries the id)",
            determination: "effect-absent",
            receiptIds: [...receiptIds],
          });
          const inFlight = {
            running: outcomeOf(decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId])), reconcileDeps(run.entries, "running", [notFound]))),
            paused: outcomeOf(decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId])), reconcileDeps(run.entries, "paused", [notFound]))),
          };
          const acknowledged = decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId, returned.receiptId])), reconcileDeps(run.entries, "failed", [notFound, returned]));
          if (acknowledged.decision !== "acknowledge" || acknowledged.entry.reconcile?.decision !== "acknowledge") throw new Error(`expected an acknowledgement, got ${acknowledged.decision}`);
          const record = acknowledged.entry.reconcile;
          const withAck = [...run.entries, acknowledged.entry];
          const override = (accept: boolean): JsonObject => {
            const decided = decideReconcile(
              reconcileRequest("override", {
                reason: "re-run the committing render once",
                acknowledgementId: record.acknowledgementId,
                confirmed: true,
                confirmPosition: 0,
                confirmCapabilityId: COMMIT_ID,
                ...(accept ? { acceptDuplicateRisk: true } : {}),
              }),
              reconcileDeps(withAck, "failed", [notFound, returned]),
            );
            return decided.decision === "override" && decided.entry.reconcile?.decision === "override"
              ? { decision: decided.decision, duplicateRisk: decided.entry.reconcile.duplicateRisk }
              : outcomeOf(decided);
          };
          const confirmedOnFailed = outcomeOf(
            decideReconcile(
              reconcileRequest("acknowledge", { reason: "assume it committed", determination: "effect-confirmed", receiptIds: [notFound.receiptId] }),
              reconcileDeps(run.entries, "failed", [notFound]),
            ),
          );
          const result = {
            timedOut: { status: run.status, category: run.category, spawns: run.spawns },
            inFlight,
            receipts: [notFound, returned].map((receipt) => ({ outcome: receipt.outcome, binding: receipt.binding })),
            settled: { determination: record.determination, evidenceClass: record.evidenceClass, settlement: record.settlement },
            override: { unaccepted: override(false), accepted: override(true) },
            confirmedOnFailed,
          };
          expect(result.settled.evidenceClass).toBe("operator-asserted");
          expect(result.override.unaccepted).toStrictEqual({ decision: "denied", policy: "duplicate-risk-unaccepted" });
          return result;
        },
      },
    ],
  },
  {
    id: "D",
    acceptance: 3,
    pins: [
      {
        id: "D1",
        clause: D0,
        run: async () => {
          const file = sourceOf(PROVIDER);
          const sites: JsonObject[] = [];
          visit(file, (node) => {
            if (!ts.isCallExpression(node) || calleeName(node) !== "register") return;
            const argument = node.arguments[0];
            if (argument === undefined || !ts.isObjectLiteralExpression(argument)) return;
            const descriptor = property(argument, "descriptor");
            if (descriptor === undefined || !ts.isObjectLiteralExpression(descriptor)) return;
            const text = descriptor.getText(file);
            sites.push({ fn: enclosingFunction(node), bytes: Buffer.byteLength(text), sha256_16: digest16(text) });
          });
          const served = (register: (registry: CapabilityRegistry) => void): string => {
            const registry = new CapabilityRegistry();
            register(registry);
            const snapshot = registry.catalogSnapshot();
            expect(snapshot).toHaveLength(1);
            expect(snapshot[0]?.descriptor.contractSource).toBe(REACTIVE_FIBER_CONTRACT_SOURCE);
            return digest16(JSON.stringify({ ...snapshot[0], descriptor: { ...snapshot[0]?.descriptor, contractSource: "REACTIVE_FIBER_CONTRACT_SOURCE" } }));
          };
          const native = served((registry) => registerNativeReactiveFiberRender(registry, ROOT));
          const injected = served((registry) => registerReactiveFiberRender(registry, () => Promise.reject(new Error("never invoked")), ROOT));
          expect(sites.map((site) => site.fn)).toStrictEqual(["registerReactiveFiberRender", "registerNativeReactiveFiberRender"]);
          return { sites, served: { native, injected } };
        },
      },
      {
        id: "D2",
        clause: D1,
        run: async () => {
          const custody: JsonObject[] = [];
          for (const path of srcFiles()) {
            const file = sourceOf(path);
            visit(file, (node) => {
              if (!ts.isCallExpression(node) || calleeName(node) !== "kill") return;
              const signal = node.arguments[0];
              if (signal === undefined || !ts.isStringLiteral(signal) || !["SIGTERM", "SIGKILL"].includes(signal.text)) return;
              let delayMs: number | null = null;
              for (let current = node.parent; current !== undefined; current = current.parent) {
                if (ts.isCallExpression(current) && calleeName(current) === "setTimeout") {
                  const delay = current.arguments[1];
                  delayMs = delay !== undefined && ts.isNumericLiteral(delay) ? Number(delay.text) : null;
                  break;
                }
              }
              custody.push({ file: path, fn: enclosingFunction(node), signal: signal.text, delayMs });
            });
          }
          const provider = sourceOf(PROVIDER);
          const spawns: JsonObject[] = [];
          const renderArgv: string[] = [];
          visit(provider, (node) => {
            if (ts.isCallExpression(node) && calleeName(node) === "spawn") {
              const binary = node.arguments[0];
              const argv = node.arguments[1];
              let source: string | null = null;
              if (argv !== undefined && ts.isIdentifier(argv)) {
                visit(provider, (inner) => {
                  if (
                    ts.isVariableDeclaration(inner) &&
                    ts.isIdentifier(inner.name) &&
                    inner.name.text === argv.text &&
                    enclosingFunction(inner) === enclosingFunction(node) &&
                    inner.initializer !== undefined &&
                    ts.isCallExpression(inner.initializer)
                  ) {
                    source = calleeName(inner.initializer) ?? null;
                  }
                });
              }
              spawns.push({ fn: enclosingFunction(node), binary: binary !== undefined && ts.isStringLiteral(binary) ? binary.text : null, argvFrom: source });
            }
            if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
              visit(node, (inner) => {
                if (ts.isReturnStatement(inner) && inner.expression !== undefined && ts.isArrayLiteralExpression(inner.expression)) {
                  for (const element of inner.expression.elements) if (ts.isStringLiteral(element)) renderArgv.push(element.text);
                }
              });
            }
          });
          const callers = new Set<string>();
          for (const path of srcFiles()) {
            visit(sourceOf(path), (node) => {
              if (ts.isCallExpression(node) && calleeName(node) === "nativeReactiveFiberRender") callers.add(`${path}#${enclosingFunction(node)}`);
            });
          }
          const log = standInRf("stubborn");
          const registry = new CapabilityRegistry();
          registerNativeReactiveFiberRender(registry, ROOT);
          const controller = new AbortController();
          const call = refusalFrom(registry.invoke(PREVIEW_ID, LEGACY_INPUT, contextOf([PREVIEW_GRANT], controller.signal)));
          await until(() => spawnsOf(log).length === 1, "the stand-in to start");
          controller.abort();
          const refusal = await call;
          const [child] = spawnsOf(log);
          await until(() => child !== undefined && !alive(child.pid), "the custody to reap the stand-in");
          const reaped = { category: refusal.category, spawns: spawnsOf(log).length, argv: tailOf(child), alive: child === undefined ? null : alive(child.pid) };
          expect(custody.map((site) => site.fn)).toStrictEqual(["nativeReactiveFiberRender", "nativeReactiveFiberRender"]);
          expect(reaped.argv).toContain("--no-commit");
          expect(reaped.argv).not.toContain("--idempotency-key");
          return { custody, spawns, renderArgv, callers: [...callers].sort(), reaped };
        },
      },
      {
        id: "D3",
        clause: D2,
        run: async () => {
          const grants = detachedMap("NATIVE_GRANTS");
          const capabilities = detachedMap("NATIVE_CAPABILITIES");
          const file = sourceOf(DETACHED);
          const reactivefiberCase: string[] = [];
          visit(file, (node) => {
            if (!ts.isFunctionDeclaration(node) || node.name?.text !== "registryFor") return;
            visit(node, (inner) => {
              if (!ts.isCaseClause(inner) || !ts.isStringLiteral(inner.expression) || inner.expression.text !== "reactivefiber") return;
              for (const statement of inner.statements) {
                visit(statement, (call) => {
                  if (ts.isCallExpression(call)) reactivefiberCase.push(calleeName(call) ?? "<computed>");
                });
              }
            });
          });
          const registry = new CapabilityRegistry();
          registerNativeReactiveFiberRender(registry, ROOT);
          const preview = registry.catalogSnapshot().map(({ descriptor }) => ({ id: descriptor.id, effectClass: descriptor.effectClass, permissions: [...descriptor.permissions] }));
          expect(preview).toStrictEqual([{ id: capabilities.reactivefiber, effectClass: "read", permissions: [grants.reactivefiber] }]);
          return { grants, capabilities, reactivefiberCase, preview };
        },
      },
      {
        id: "D4",
        clause: D3,
        run: async () => {
          const grants = readGrants();
          const rule = {
            none: judge(committing({ permissions: [] }), grants).findings,
            previewGrant: judge(committing({ permissions: [PREVIEW_GRANT] }), grants).findings,
            everyReadGrant: judge(committing({ permissions: grants }), grants).findings,
            previewAndOwn: judge(committing({ permissions: [PREVIEW_GRANT, COMMIT_PERMISSION] }), grants).findings,
            own: judge(committing({ permissions: [COMMIT_PERMISSION] }), grants).findings,
          };
          const log = standInRf("commit");
          const harness = commitHarness(SETTLE_MS);
          const underPreviewGrant = await refusalFrom(harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([PREVIEW_GRANT])));
          const previewSpawns = spawnsOf(log).length;
          const invoked = performance.now();
          const reading = await harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION]));
          const settledMs = performance.now() - invoked;
          await Promise.all(harness.settled);
          expect(rule.previewGrant).toStrictEqual(["write-grant"]);
          expect(underPreviewGrant.category).toBe("authorization");
          expect(previewSpawns).toBe(0);
          return {
            rule,
            underPreviewGrant: { ...underPreviewGrant, spawns: previewSpawns },
            underOwnGrant: { deadlineMs: harness.deadlineMs, committed: JSON.stringify(reading) === JSON.stringify(COMMITTED), spawns: spawnsOf(log).length, actedAfterHold: settledMs >= HOLD_MS },
          };
        },
      },
    ],
  },
];

/** Every pin's measured witness: frozen at base cd8927f (cut #1), re-measured at dab445f with the cut #2 additions (A1's reader trees, C1's control spellings, the B1 and D4 deadlines) and at 5ffe345 with the cut #3 additions (A1's SEALED, register-position, forwarding, copy and unseen readings; C1's unseen rows; the B1 and D4 actedAfterHold readings). */
const WITNESS: Readonly<Record<string, JsonValue>> = {
  A1: {
    native: [{"id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    injected: [{"id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    rfLiterals: [{"file": "src/workbench/providers/reactivefiber.ts", "id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}, {"file": "src/workbench/providers/reactivefiber.ts", "id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    unread: [],
    forwarding: ["src/workbench/hosts/local-detached.ts#registryFor:register(provider)", "src/workbench/hosts/local-detached.ts#registryFor:module.register(registry)"],
    copied: {"served": [{"id": "census.copy.probe", "effectClass": "write", "contractSource": "census copy probe"}], "rewritten": {"id": "reactivefiber.render.commit", "effectClass": "read"}},
    planted: [["effectClass", "idempotency-key", "operation-show", "write-grant"]],
    forms: {"importedConsts": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "aliasedImport": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "namespaceImport": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "reExports": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "exportStar": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "exportAlias": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "constObject": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "importedFrozenObject": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "concatenation": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "computedKeys": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "shorthand": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "rfCliWords": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "exportedObject": ["committing:effectClass,idempotency-key,operation-show,write-grant"], "wrappedRegistration": ["committing:effectClass,idempotency-key,operation-show,write-grant"]},
    refused: {"callId": ["unread:id"], "parameters": ["unread:id,effectClass,position"], "shadowedNames": ["unread:id", "unread:id", "unread:id", "unread:id", "unread:id", "unread:id"], "letVarBindings": ["unread:id", "unread:id"], "packageImport": ["unread:id"], "missingExport": ["unread:id"], "spreadObjectMember": ["unread:id"], "spread": ["unread:spread"], "accessor": ["unread:effectClass,accessor"], "method": ["unread:effectClass,accessor"], "unreadKey": ["unread:key"], "rfContractPart": ["unread:contractSource,position"], "mixedProjection": ["unread:id,position"], "twoBases": ["unread:id,effectClass,position"], "projectionUnreadKey": ["unread:id,effectClass,key,position"], "noEffectClass": ["unread:effectClass"], "idOnly": ["unread:effectClass,spread"], "memberWrite": ["unread:id,contractSource"], "setupModule": ["unread:id,contractSource"], "elementWrite": ["unread:id,contractSource"], "computedWrite": ["unread:id,contractSource"], "compoundWrite": ["unread:id,contractSource"], "logicalWrite": ["unread:id,contractSource"], "updateWrite": ["unread:id,contractSource"], "updateStringWrite": ["unread:id,contractSource"], "deleteWrite": ["unread:id,contractSource"], "destructuringWrite": ["unread:id,contractSource"], "arrayDestructuringWrite": ["unread:id,contractSource"], "forOfWrite": ["unread:id,contractSource"], "objectAssign": ["unread:id,contractSource"], "defineProperty": ["unread:id,contractSource"], "reflectSet": ["unread:id,contractSource"], "alias": ["unread:id,contractSource"], "parameter": ["unread:id,contractSource"], "shorthandMember": ["unread:id,contractSource"], "methodThis": ["unread:id,contractSource"], "nestedAlias": ["unread:id,contractSource"], "spreadCopyWrite": ["unread:id,contractSource"], "namespaceWrite": ["unread:id,contractSource"], "namespaceWhole": ["unread:id,contractSource"], "reExportWrite": ["unread:id,contractSource"], "namespaceReExport": ["unread:id,contractSource"], "namespaceReExported": ["unread:id,contractSource"], "defaultExport": ["unread:id,contractSource"], "shadowedImportWrite": ["unread:id,contractSource"], "shadowedFreeze": ["unread:id,contractSource"], "boundDescriptor": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor: DESCRIPTOR, invoke: async () => null })"], "returnedDescriptor": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor, invoke: async () => null })"], "wrappedHolder": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register(audited({ descriptor: { id: \"forge.gate.commit\", effectClass: \"read\", permission...)"], "holderSpread": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor: { id: \"forge.gate.commit\", effectClass: \"read\", permissions: [\"rea...)"], "secondDescriptor": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor: { id: \"forge.gate.commit\", effectClass: \"read\", permissions: [\"rea...)"], "secondDescriptorLast": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor: COMMITTING, descriptor: { id: \"forge.gate.commit\", effectClass: \"r...)"], "holderUnreadKey": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register({ descriptor: { id: \"forge.gate.commit\", effectClass: \"read\", permissions: [\"rea...)"], "boundHolder": ["unread:position", "forwarding:src/p/reg.ts#<module>:registry.register(PROVIDER)"], "accessorRewrite": ["unread:accessor"], "registeredProjection": ["unread:id,effectClass,contractSource"], "registeredSpread": ["unread:spread"], "registeredNoId": ["unread:id,effectClass,spread"]},
    excepted: {"projection": ["projection"], "wrappedProjection": ["projection"], "notRf": ["not-rf"], "notRfUnreadEffect": ["not-rf"], "readableBase": ["noncommitting:"], "sealedReads": ["not-rf"]},
    unseen: {"codeInAString": ["not-rf"], "dynamicImport": ["not-rf"], "requireCall": ["not-rf"], "absoluteSpecifier": ["not-rf"], "nonTsModule": ["not-rf"], "replacedFreeze": ["not-rf"], "rewritingCallee": ["not-rf"], "aliasRegistration": [], "rfOutsideFamily": ["not-rf"]},
    constructed: {"read": ["effectClass"], "write": [], "external": [], "unknown": [], "noContract": ["contract"], "stand": [], "spaced": ["effectClass", "idempotency-key", "operation-show"]},
  },
  A2: {
    rule: {"withoutFlag": ["idempotency-key"], "proseKey": ["idempotency-key"], "withFlag": []},
    argv: {"legacy": ["context", "render", "--model", "m", "--task", "t", "--no-commit", "--no-input", "--json"], "view": ["context", "render", "--view", "orders.view", "--task-id", "t1", "--no-commit", "--no-input", "--json"]},
  },
  B1: {
    timeout: {"deadlineMs": 250, "category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: Capability reactivefiber.render.commit exceeded its deadline of 250ms.. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"], "actedAfterHold": null},
    kill: {"deadlineMs": 30000, "category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: rf ended by signal SIGKILL. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"], "actedAfterHold": true},
    unknown: {"deadlineMs": 30000, "category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: rf exited 0 with no envelope on stdout. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"], "actedAfterHold": true},
  },
  B2: {
    recorded: {"status": "failed", "category": "uncertain-effect", "retryWhileInFlight": false, "spawns": 1, "nodeRows": [{"index": 0, "dispatched": true, "effectClass": "write", "ok": false}, {"index": 0, "dispatched": false, "effectClass": "write", "ok": false}]},
    resumed: {"status": "failed", "category": "uncertain-effect", "namesProducer": true, "namesReconcile": true, "replayedNodeCount": 0, "reconciledNodeCount": 0, "spawns": 0},
  },
  C1: {
    timedOut: {"status": "failed", "category": "uncertain-effect", "spawns": 1},
    evidenceReads: ["reactivefiber.render.preview"],
    roster: [{"position": 0, "capabilityId": "reactivefiber.render.commit", "effectClass": "write", "producer": "reactivefiber", "state": "pending", "evidenceReads": ["reactivefiber.render.preview"]}],
    evidence: {"operationShow": {"decision": "denied", "policy": "malformed-request"}, "preview": {"decision": "evidence"}},
    srcSpellings: [],
    control: ["src/leaf/control.ts:literal:rf operation show rfo_x", "src/leaf/control.ts:literal:operation.show", "src/leaf/control.ts:composite:operation show", "src/leaf/control.ts:composite:rf operation show rfo_x", "src/leaf/control.ts:literal:rf operation show ", "src/leaf/control.ts:literal: rf operation show ", "src/leaf/control.ts:literal: then operation.show", "src/leaf/control.ts:composite:operation show!", "src/leaf/control.ts:adjacent@2:operation,show", "src/leaf/control.ts:adjacent@0:operation,show", "src/leaf/control.ts:adjacent@0:operation,show", "src/leaf/control.ts:adjacent@0:OPERATION,Show", "src/leaf/control.ts:adjacent@1:operation,show", "src/leaf/control.ts:adjacent@1:operation,show"],
    unseen: {"addsLeaf": [], "removesLeaf": []},
    rule: {"withoutReader": ["operation-show"], "withReader": []},
  },
  C2: {
    timedOut: {"status": "failed", "category": "uncertain-effect", "spawns": 1},
    inFlight: {"running": {"decision": "denied", "policy": "task-active"}, "paused": {"decision": "denied", "policy": "task-active"}},
    receipts: [{"outcome": "unavailable", "binding": "operator-asserted"}, {"outcome": "returned", "binding": "operator-asserted"}],
    settled: {"determination": "effect-absent", "evidenceClass": "operator-asserted", "settlement": "none"},
    override: {"unaccepted": {"decision": "denied", "policy": "duplicate-risk-unaccepted"}, "accepted": {"decision": "override", "duplicateRisk": "possible-duplicate"}},
    confirmedOnFailed: {"decision": "denied", "policy": "effect-confirmed-without-evidence"},
  },
  D1: {
    sites: [{"fn": "registerReactiveFiberRender", "bytes": 353, "sha256_16": "ee650e97701c3fd4"}, {"fn": "registerNativeReactiveFiberRender", "bytes": 358, "sha256_16": "de887b1d6381f563"}],
    served: {"native": "43a84a5710536d5e", "injected": "0a31595c97763f04"},
  },
  D2: {
    custody: [{"file": "src/workbench/providers/reactivefiber.ts", "fn": "nativeReactiveFiberRender", "signal": "SIGTERM", "delayMs": null}, {"file": "src/workbench/providers/reactivefiber.ts", "fn": "nativeReactiveFiberRender", "signal": "SIGKILL", "delayMs": 500}],
    spawns: [{"fn": "nativeReactiveFiberRender", "binary": "rf", "argvFrom": "renderArgv"}],
    renderArgv: ["--workspace", "context", "render", "--no-commit", "--no-input", "--json"],
    callers: ["src/workbench/providers/reactivefiber.ts#nativeReactiveFiberPreview", "src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender"],
    reaped: {"category": "transport", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--no-commit", "--no-input", "--json"], "alive": false},
  },
  D3: {
    grants: {"forge": "forge:inspect", "hyperunix": "hyperunix:read", "reactivefiber": "reactivefiber:render", "furnace-observe": "furnace:inspect"},
    capabilities: {"forge": "forge.gate.status", "hyperunix": "hyperunix.find", "reactivefiber": "reactivefiber.render.preview", "furnace-observe": "furnace.run.inspect"},
    reactivefiberCase: ["registerNativeReactiveFiberRender"],
    preview: [{"id": "reactivefiber.render.preview", "effectClass": "read", "permissions": ["reactivefiber:render"]}],
  },
  D4: {
    rule: {"none": ["write-grant"], "previewGrant": ["write-grant"], "everyReadGrant": ["write-grant"], "previewAndOwn": [], "own": []},
    underPreviewGrant: {"category": "authorization", "message": "Permission denied for capability reactivefiber.render.commit (invoke).", "spawns": 0},
    underOwnGrant: {"deadlineMs": 30000, "committed": true, "spawns": 1, "actedAfterHold": true},
  },
};

describe("wb-jwc.5: the committing rf render posture, pinned while Pi registers none", () => {
  for (const row of ROWS) {
    describe(`${row.id} (ACCEPTANCE[${row.acceptance}])`, () => {
      for (const pin of row.pins) {
        it(`${pin.id}: ${pin.clause}`, async () => {
          expect(await pin.run()).toStrictEqual(WITNESS[pin.id]);
        }, 60_000);
      }
    });
  }

  it("ANCHOR: the export row carries exactly the ACCEPTANCE quoted here, and each row's pins are exactly its item's clauses", () => {
    const row = exportRow();
    expect(row.title.startsWith("[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5] Any future committing rf capability shall register with a non-read effectClass, pass a stable --idempotency-key on the render argv")).toBe(true);
    expect(row.description).toContain(`ACCEPTANCE: [${ACCEPTANCE.map(listItem).join(", ")}]`);
    expect(ROWS.map((judged) => judged.acceptance)).toStrictEqual(ACCEPTANCE.map((_, index) => index));
    for (const judged of ROWS) expect(judged.pins.map((pin) => pin.clause)).toStrictEqual(clausesOf(ACCEPTANCE[judged.acceptance]));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, and WITNESS keyed by exactly the pins", () => {
    expect(ROWS.map((judged) => `${judged.id}:${judged.pins.length}`)).toStrictEqual(["A:2", "B:2", "C:2", "D:4"]);
    expect(Object.keys(WITNESS)).toStrictEqual(ROWS.flatMap((judged) => judged.pins.map((pin) => pin.id)));
  });
});
