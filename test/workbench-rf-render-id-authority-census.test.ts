/**
 * wb-hs2j.4 (RF-REACTIVE-CONTEXT-ASSEMBLY-R4), the absent-today leg. Statement (bead notes, full form): "No Pi consumer shall
 * infer federation authority, access to private sources, or cross-version exact replay from possession of a transferred rf
 * render ID or context receipt, and if Pi ever dereferences a context receipt it shall validate issuer identity and scope
 * before projecting anything from it (gated: context receipt schema, README C3 'P0 schema/SDK abstraction', proposed; nearest
 * leaves rfc-s24ro.6 and rfc-mq7k6.15 open, unshipped)" (ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/
 * 02-swarm-usage-and-command-grammar.md:46@6a251bf73af5, merged README.md:64@6a251bf73af5). Acceptance, quoted, and read back at
 * run time from the tracked bead export .beads/issues.jsonl: "(a) a Pi consumer holding only a render ID projects no source
 * content and no replay promise beyond what a scoped authorized read returns; (b) Pi read-admission gates run on every
 * dereference, an unauthorized-projection refusal is surfaced, never bypassed; (c) a receipt dereference checks
 * issuer/workspace/build and declared observer scope before any projection, digest mismatch refuses; (d) repeated exports of
 * one render/scope map to one canonical logical receipt in Pi's records." The filing's own scope: "Not P0: Pi dereferences no
 * receipts today (no receipt verb exists); no-authority-inference pins now, dereference checks arm when C3 ships - P2."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat,
 * 2026-10-23): 02-swarm-usage-and-command-grammar.md:46 carries the quote "A transfer does NOT by itself confer federation
 * authority, access to private sources or cross-version exact replay." and :48 the candidate "`context receipt`
 * read/export/verify" with "idempotence: repeated exports of same render/scope produce canonical same logical receipt; failure:
 * missing source, denied projection, stale/unsupported build, digest mismatch"; README.md:63 heads "C3. context receipt (P0
 * schema/SDK abstraction)" and :64 carries "Validate issuer identity and scope on dereference." beside "Default representation
 * must not expose more source content than the consumer is entitled to."; BEADS-2026-10-21.md:18 maps rfc-s24ro.6 ("context show
 * --detail receipt projects a transferable render receipt with no block content") and :66 rfc-mq7k6.15 ("the receipt read leaf
 * rf operation show"), both open at that map.
 * MEASURED ON THE INSTALLED rf (0.1.832 by `rf --json --version`, 2026-10-23; roster `producer`): 79 leaves, none
 * naming a receipt; `rf context show --help` offers --detail {compact,full} only, so rfc-s24ro.6's receipt projection is not
 * served; `operation.show` IS served (availability served_reachable): its help reads "Read the durable receipt of an invocation
 * from the journal by its rfo_ operation id: committed with the render_id and transaction_id it produced". That leaf is an
 * invocation receipt, not the C3 context receipt (issuer/workspace/build, observer scope, document digest, replay
 * classification), which no leaf serves. Seven served leaves read a recorded render or operation (roster
 * `producer.dereferenceLeaves`: context.show, context.replay, context.diff, context.explain and context.plan take
 * render ids, context.history lists recorded renders, operation.show takes an rfo_ id). Pi launches none of them (row C).
 * The roster's version and leaf list are those of the landed capture test/fixtures/rf-version-leaves.json (wb-o4h0.3: the same
 * rf 0.1.832 registry, 79 leaf paths in this order, all seven dereference leaves served), and C1 holds them to it; the census
 * never reads the live rf. Re-measured 2026-10-24 by the wb-sbtv seat: the installed rf now reads 0.1.836 (commit
 * b3494ab13397) with the same 79 leaf paths in the same order and the seven dereference leaves served_reachable.
 * MEASURED AT BASE (2a26385, landing 272; re-measured at f8e3a48 for wb-sbtv; re-measured at e0c7828 for wb-h55d: 116, the
 * one added file src/workbench/beads-program-readiness.ts from wb-4nut.5): src is 116 .ts files, the same 116 that
 * `git ls-files -z --cached --others -- src` lists (no untracked or ignored entry at that measurement; no symbolic link, and
 * that part is pinned, not dated: the listing keeps symbolic links, which the walk never follows, so a link reds as unwalked);
 * its one rf launch is spawn("rf", argv) in
 * nativeReactiveFiberRender (providers/reactivefiber.ts) with argv from renderArgv (`context render ... --no-commit --no-input
 * --json`); the rf descriptor (native and injected) admits only the {model, task} or {view, taskId, model?} input arm, declares
 * supportedModes ["invoke"] (no inspect, the registry's ref-dereference mode), and both readers require result.render_id null
 * (the only two src reads of a render_id, each a `!== null` comparison); no src module calls reactivefiberTopology yet (the
 * reader is pure and awaits its tool wiring); no src token spells a context or render receipt, an rfr_ id or an rf
 * dereference verb.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id and the exported acceptance part it covers; in every row pin n
 * covers part n of its clause, the clause split before ", " and before " and no "):
 *  A, acceptance (a). A1 "a Pi consumer holding only a render ID projects no source content": nine render-id or receipt
 *    inputs - exactly every input key the filing names ((a)'s render ID as the rf envelope's render_id field and its camelCase
 *    renderId, (c)'s receipt) on the bare input and on each input arm the registered descriptor declares, a set derived outside
 *    this file - are refused at input validation with 0 provider calls (injected) and 0 rf spawns (native, a stand-in rf on PATH);
 *    a render ID typed where Pi admits text rides only as that flag's value in the one `context render ... --no-commit` spawn,
 *    a fresh scoped read whose reading states render_id null; a reading naming a committed render (render_id, commit_seq or
 *    transaction_id set) is refused by the native provider (transport) and by the reader (validation) before anything is
 *    projected; an admitted reading's projection carries the context text only as Pi's sha256 digest; and src reads a
 *    render_id only to require null (an AST scan whose walk equals git's own listing of src, with five controls and one quiet
 *    row). A2 "no replay promise beyond what a
 *    scoped authorized read returns": a reading carrying producer replay, receipt and federation-authority claims in additive
 *    keys projects exactly what the bare reading projects and surfaces none of them; replayed observation rows demote to
 *    partial and only an all-fresh set reads complete; the record is dated by the host's read clock, never the producer's
 *    render time.
 *  B, acceptance (b). B1 "Pi read-admission gates run on every dereference": six alternating invocations each re-check the
 *    grant (3 refused authorization with no provider call, 3 admitted); the grant check precedes input validation (a render-id
 *    input without the grant is refused authorization, with it validation); the inspect mode needs inspect:<id> and the rf
 *    descriptor serves none (authorization without it, unavailable with it, 0 calls and 0 spawns). B2 "an unauthorized-projection
 *    refusal is surfaced": the reader refuses another workspace's reading with a typed authorization CapabilityError and returns
 *    nothing; through Pi's Claude workflow host the ungranted read fails the run with that authorization diagnostic (the granted
 *    twin completes, a render-id input fails validation); an observation record refreshed under one scope is served to no other
 *    principal or workspace. B3 "never bypassed": the reader's workspace gate runs before it reads the envelope, so another
 *    workspace's reading is refused authorization whatever it carries (a preview, a committed render id, receipt-shaped issuer
 *    and scope claims naming the observer's own root, a malformed source, an inner root equal to the observer's); only the
 *    host-bound authorizedRfRoot ever names another root, and once set it alone does.
 *  C, acceptance (c), absent today and gated. C1 "a receipt dereference checks issuer/workspace/build and declared observer scope
 *    before any projection": an AST scan of every regular file below src (a floor, an anchor token, git's own listing of src the
 *    walk must equal, and a planted positive-control tree) finds one rf launch site, no argv or literal rf dereference verb, no
 *    context/render receipt spelling and no rfr_ id; no registered descriptor spells one; through the native registration both
 *    input arms spawn exactly the --no-commit render argv; every measured dereference leaf of the installed rf is one the matcher
 *    catches, and no measured leaf serves a receipt; the roster's rf version and leaf list are the landed capture's, and every
 *    dereference leaf and every nearest leaf marked served is served there.
 *    C2 "digest mismatch refuses": Pi adopts no producer-stated digest (a reading whose stated output digest disagrees with its
 *    text projects Pi's own digest and never surfaces the stated one), and malformed graph and bundle revision digests are
 *    refused by both readers, never rewritten.
 *  D, acceptance (d), absent today. D1 "repeated exports of one render/scope map to one canonical logical receipt in Pi's
 *    records": three projections of one reading are byte-identical and refresh exactly one ObservationProjection node keyed by
 *    scope and operation id; another operation id with identical content, or another principal, is its own node; the record
 *    names no render id, no receipt and no context text.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set (every row's id, label
 * and pins, every pin's part and witness, the census constants, the residual families and the registered test titles) is held to
 * the out-of-file roster test/fixtures/rf-render-id-authority-roster.json. OUTSIDE ANCHOR: the owner filing's row in the tracked
 * bead export (.beads/issues.jsonl, row wb-hs2j.4): its Acceptance line, split mechanically, must yield exactly the four clauses,
 * each row label must open with its clause verbatim, each row must carry one pin per exported part, the parts the roster names
 * must equal the exported ones, and its Source and Gating artifact lines must equal the roster's quote, citations and nearest
 * leaves; a row or a pin removed from every literal of this file and the roster together still reds there.
 * FURTHER ANCHORS OUTSIDE THIS FILE (wb-sbtv, the R694 follow-up of landing 290: PREP F1 survivors G06, G07, G08, G13 and F2):
 * the src walk of A1 and C1 must equal git's own listing of src (G07/G08: a walk that skips src/workbench/hosts, with or without
 * a plant there, reds even while the floor and the anchor token hold); A1's render-id inputs must be exactly the key x arm set
 * derived from the export's (a) and (c) clauses, the rf envelope's render_id field (test/helpers/rf-render-fixture.ts) and the
 * registered descriptor's oneOf arms (G06: one input removed from the list, the roster constant and the A1 witness together reds
 * there); C1 holds the roster's producer version and leaf list to the landed capture test/fixtures/rf-version-leaves.json (F2);
 * the judged set walks the registered tests (vitest's task tree, collected before any case runs) and holds them to the roster's
 * titles, and those to the ROWS-derived titles plus the records title, every one in run mode and not inverted (G13: deleting or
 * skipping only the records case reds the judged set). Each new judge carries a planted positive control: the input coverage
 * reports a list missing the bare camelCase input and an input with a key no anchor requires; the git comparison reports the walk
 * minus the anchor module's directory and the walk plus a path git does not list; the capture comparison reports a producer
 * reading that departs from the capture in every judged way; the task-tree walker returns exactly the pin cases from the row
 * suites alone.
 * THIS HOP (wb-h55d, the R694 follow-up of landing 385, hop 3 of the landing-290 chain, in the R739 TERMINAL
 * enumerate-the-resolvable form: it claims exactly the two classes below and enumerates no further escapes on this chain):
 * F1, the judged set beside the records case (PREP N17): the records case holds the registered titles to the in-file literals,
 * as the judged set holds the roster's (JUDGED_TITLE first, the ROWS-derived pin titles in row order, RECORDS_TITLE last), and
 * requires the judged set to have reached its end (JUDGED_REACHED), so deleting the judged case together with its roster title,
 * or emptying it in place under its title, reds the records case; the mirror (the records case with its title) still reds the
 * judged set through RECORDS_TITLE. F2, symbolic links under src (PREP N05): git's listing keeps a symbolic link beside the
 * regular files and the walk never follows one, so a link under src, to a module or to a directory, is listed and unwalked and
 * reds A1 and C1; its planted positive control (C1 gitControls.symlinked) is a scratch git tree whose src holds one regular
 * module, a link to a module outside src that launches an rf dereference and a link to a directory outside src, and the
 * comparison reads exactly the two links unwalked.
 * RESIDUALS (named families, each with a pinned quiet row in a witness): R-COMPOSED-ARGV a dereference argv built from non-literal
 * parts (C1 composedArgv); R-INDIRECT-LAUNCH an rf launch whose binary is not the literal "rf" (C1 indirectLaunch); R-INTERRUPTED a
 * receipt spelling split by a zero-width code point (C1 interrupted); R-UNNAMED a receipt surface that never spells context or
 * render receipt (C1 unnamed; backstops: the input schema of A1 and the one-site launch inventory of C1, which see only the rf
 * descriptor's inputs and literal "rf" launches); R-STORE-READ a module reading rf's store files without launching rf (C1
 * storeRead); R-COMPOSED-KEY a render_id read through a computed key (A1 composedKey); R-STATED-DIGEST the preview reader ignores,
 * rather than refuses, a producer output digest that disagrees with the text (C2 statedDigestIgnored: it is admitted, and Pi's
 * own digest is what the record carries).
 * NOT CLAIMED: a coordinated removal of one residual family (its RESIDUALS entry, its quiet row and the roster's copies) has no
 * anchor outside this census; a coordinated edit of a judge, its planted control and what it judges inside this file (the src
 * walk and its git anchor; the coverage judge and RENDER_ID_INPUTS; the task-tree walker beside a deleted case; the records
 * case's title literals and its JUDGED_REACHED check beside a deleted or emptied judged case; the git anchor's link filter beside
 * its scratch-tree control) has none either; the records case is the last judge, so emptying it in place leaves no later case to
 * red (the judged set still holds its title, its registration and its run mode);
 * the roster's help-text readings of the installed rf (contextShowDetail, the choice of the seven dereference leaves,
 * rfc-s24ro.6's unserved --detail receipt) have no landed capture and are held to the roster only; the dereference checks
 * themselves (issuer, workspace, build, observer scope, document digest) arm with C3 and are not implemented, and no Pi receipt
 * verb or record is added.
 * RECORDS: the judged set walks this file's registered tests at collection (each roster title once, in order, in run mode, not
 * inverted); the last case walks them again after the pins: the titles equal the roster's and the in-file literals' (wb-h55d
 * F1), each ran, every pin's case reached its end (REACHED), and the judged set reached its end (JUDGED_REACHED).
 *
 * Display paths added: none. Test-only: the stand-in rf and the planted trees live in makeScratch scratch; src, the bead export
 * and the roster are only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, lstatSync, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, type RunnerTask } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type InvocationContext, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf, type Json, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const ROOT = process.cwd();
const ROSTER_PATH = join(HERE, "fixtures", "rf-render-id-authority-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-hs2j.4";

const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_PERMISSION = "reactivefiber:render";
/** A transferred render reference in the rfr_ form the program quotes (02:46 "stable `rfr_` render IDs"); test-only. */
const RENDER_ID = `rfr_${"r".repeat(26)}`;
const SECOND_OPERATION_ID = `rfo_${"b".repeat(22)}`;
const OTHER_ROOT = "/census/other-rf-workspace";
const SWARM_ROOT = "/census/swarm-rf-root";
/** The context text every census reading carries; no projection may surface it. */
const SENTINEL = "census source content sentinel: never projected";
const SCOPE: ObservationScope = { workspace: ROOT, principal: "census-principal" };
const OTHER_PRINCIPAL = "census-other-principal";
const CAPTURED_AT = "2026-10-23T03:00:00Z";
const OBSERVED_AT = "2026-10-23T03:00:01Z";
const HEAD = 'export const meta = { name: "render-id-authority", description: "wb-hs2j.4 census probe" };\n';

/** Inputs that carry a render id or a receipt; the preview descriptor admits none of them. A1 holds this list to the set
 * derived outside this file (inputCoverage): each input key the filing names, alone and on each declared input arm. */
const RENDER_ID_INPUTS: readonly JsonObject[] = [
  { render_id: RENDER_ID },
  { renderId: RENDER_ID },
  { model: "m", task: "t", render_id: RENDER_ID },
  { view: "v", taskId: "t", render_id: RENDER_ID },
  { receipt: { render_id: RENDER_ID, workspace_id: RF_FIXTURE_WORKSPACE_ID } },
  { model: "m", task: "t", receipt: { render_id: RENDER_ID } },
  { model: "m", task: "t", renderId: RENDER_ID },
  { view: "v", taskId: "t", renderId: RENDER_ID },
  { view: "v", taskId: "t", receipt: { render_id: RENDER_ID } },
];
/** The tokens the exported acceptance names: the one clause (a)'s consumer holds and the one clause (c) dereferences. */
const HELD_TOKEN = /holding only an? (.+?) projects\b/;
const DEREFERENCED_TOKEN = /^\(c\) an? (\S+) dereference\b/;
/** The landed capture of the installed rf's registry (`rf --json --version`, wb-o4h0.3), the roster's producer anchor. */
const CAPTURE = "test/fixtures/rf-version-leaves.json";
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the bead export and the cases agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, and every pin reached its end";
/** A render id typed where Pi admits text: each arm is admitted, and the id rides only as that flag's value. */
const TEXT_ARMS: readonly JsonObject[] = [
  { model: "m", task: RENDER_ID },
  { model: RENDER_ID, task: "t" },
  { view: RENDER_ID, taskId: "t" },
  { view: "v", taskId: RENDER_ID },
  { view: "v", taskId: "t", model: RENDER_ID },
];
const TEXT_FLAGS = ["--model", "--task", "--view", "--task-id"];
/** Producer claims a reading may carry in additive result keys; Pi adopts none of them (A2). */
const CLAIMS: JsonObject = {
  receipt: {
    render_id: RENDER_ID,
    issuer: { workspace_id: RF_FIXTURE_WORKSPACE_ID, build: "0.1.832", backend_instance: "census-backend" },
    observer_scope: "census-observer-scope",
    replay: "document_exact",
    federation_authority: "census-granted",
    private_sources: ["census-private-source"],
  },
  replay_capability: "replayable_exact",
};
const CLAIM_TOKENS = [RENDER_ID, "document_exact", "replayable_exact", "census-granted", "census-private-source", "census-observer-scope", "federation"];

/** rf dereference verbs: every served leaf that reads a recorded render or operation (measured) and the proposed receipt verb. */
const DEREFERENCE_VERBS: Readonly<Record<string, readonly string[]>> = {
  context: ["show", "replay", "diff", "explain", "plan", "history", "receipt"],
  operation: ["show"],
  "--detail": ["receipt"],
};
const DEREFERENCE_TEXT = /\b(?:context[\s._-]+(?:show|replay|diff|explain|plan|history|receipt)|operation[\s._-]+show)\b|--detail[\s=]+receipt\b/i;
/** A context or render receipt in any case and joining (none, whitespace, ".", "_" or "-"), plural included. */
const RECEIPT_TEXT = /(?:context|render)[\s._-]*receipts?/i;
const RENDER_ID_LITERAL = /\brfr_[0-9a-z]{4,}/i;
/** A property or binding read of a render id; a declaration name carrying one. */
const RENDER_ID_NAME = /^render_?id$/i;
const RENDER_ID_DECLARATION = /render_?ids?(?![a-z])/i;
const LAUNCH_NAMES = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
const MODULE_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};
/** Sits below the 115 src files measured at base 2a26385 (115 again at f8e3a48, 116 at e0c7828); the anchor is a token the
 * provider's bytes carry. The floor guards an empty or misdirected walk; git's own listing of src (gitListed) is what the walk
 * must equal. */
const SRC_FLOOR = 100;
const SRC_ANCHOR = ["workbench/providers/reactivefiber.ts", "RF render refused"] as const;
/** The bead export's Acceptance line splits into clauses before "; (x) " and each clause into parts before ", " or " and no ". */
const CLAUSE_SPLIT = /; (?=\([a-z]\) )/;
const PART_SPLIT = /, | and (?=no )/;
const RESIDUALS = ["R-COMPOSED-ARGV", "R-INDIRECT-LAUNCH", "R-INTERRUPTED", "R-UNNAMED", "R-STORE-READ", "R-COMPOSED-KEY", "R-STATED-DIGEST"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) a Pi consumer holding only a render ID projects no source content and no replay promise beyond what a scoped authorized read returns: no Pi input arm takes a render ID or a receipt, a committed or transferred render reading is refused before projection, the projection withholds the context text and adopts no producer replay, receipt or authority claim, and replayed rows only demote",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      "(b) Pi read-admission gates run on every dereference, an unauthorized-projection refusal is surfaced, never bypassed: the registry re-checks grants on every call before input validation and the rf descriptor serves no inspect (ref-dereference) mode, the reader refuses another workspace's reading as a typed authorization error before it reads the envelope, and no reading content or reading-stated root passes that gate",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) a receipt dereference checks issuer/workspace/build and declared observer scope before any projection, digest mismatch refuses: absent today and gated - Pi's one rf launch is the --no-commit preview, no src module or registered descriptor spells an rf dereference verb or a context receipt, the installed rf serves no context receipt (C3 is proposed), and Pi adopts no producer-stated digest while malformed revision digests are refused",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(d) repeated exports of one render/scope map to one canonical logical receipt in Pi's records: absent today - Pi keeps no receipt record; its one rf record, the observation node, is keyed by scope and operation id, so repeated projections of one reading are byte-identical and refresh one node, while another operation or scope is its own node",
    pins: ["D1"],
  },
];

/* ---------------------------------------------------------------------------------------------------------------------------
 * The roster and the bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface RosterPin {
  readonly id: string;
  readonly part: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface NearestLeaf {
  readonly id: string;
  readonly at: string;
  readonly surface: string;
  readonly leaf: string;
  readonly servedAtInstalled: boolean;
}
interface Producer {
  readonly programPin: string;
  readonly installedVersion: string;
  readonly leaves: readonly string[];
  readonly dereferenceLeaves: readonly string[];
  readonly contextShowDetail: readonly string[];
  readonly nearestLeaves: readonly NearestLeaf[];
}
interface Roster {
  readonly bead: string;
  readonly citation: string;
  readonly quote: string;
  readonly merged: { readonly id: string; readonly citation: string; readonly quote: string };
  readonly producer: Producer;
  readonly constants: Json;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return [...value];
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
const jsonCopy = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.merged) || !isObject(raw.producer)) {
    throw new Error("roster must be an object with rows, merged and producer");
  }
  const producer = raw.producer;
  if (!Array.isArray(producer.nearestLeaves)) throw new Error("roster producer.nearestLeaves must be a list");
  const nearestLeaves = producer.nearestLeaves.map((leaf: unknown, index: number): NearestLeaf => {
    if (!isObject(leaf) || typeof leaf.servedAtInstalled !== "boolean") throw new Error(`roster producer.nearestLeaves[${index}] is malformed`);
    return {
      id: text(leaf.id, "nearestLeaves.id"),
      at: text(leaf.at, "nearestLeaves.at"),
      surface: text(leaf.surface, "nearestLeaves.surface"),
      leaf: text(leaf.leaf, "nearestLeaves.leaf"),
      servedAtInstalled: leaf.servedAtInstalled,
    };
  });
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id, a part and a witness`);
      return { id: text(pin.id, "pin.id"), part: text(pin.part, "pin.part"), witness: jsonCopy(pin.witness) };
    });
    return { id: text(row.id, "row.id"), label: text(row.label, "row.label"), pins };
  });
  return {
    bead: text(raw.bead, "bead"),
    citation: text(raw.citation, "citation"),
    quote: text(raw.quote, "quote"),
    merged: { id: text(raw.merged.id, "merged.id"), citation: text(raw.merged.citation, "merged.citation"), quote: text(raw.merged.quote, "merged.quote") },
    producer: {
      programPin: text(producer.programPin, "producer.programPin"),
      installedVersion: text(producer.installedVersion, "producer.installedVersion"),
      leaves: strings(producer.leaves, "producer.leaves"),
      dereferenceLeaves: strings(producer.dereferenceLeaves, "producer.dereferenceLeaves"),
      contextShowDetail: strings(producer.contextShowDetail, "producer.contextShowDetail"),
      nearestLeaves,
    },
    constants: jsonCopy(raw.constants),
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterPin(pin: string): RosterPin {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found;
}

/** The census constants, as the roster holds them. */
function constantsOf(): Json {
  return jsonCopy({
    previewId: PREVIEW_ID,
    permission: PREVIEW_PERMISSION,
    renderId: RENDER_ID,
    renderIdInputs: RENDER_ID_INPUTS,
    textArms: TEXT_ARMS,
    textFlags: TEXT_FLAGS,
    claims: CLAIMS,
    claimTokens: CLAIM_TOKENS,
    dereferenceVerbs: DEREFERENCE_VERBS,
    dereferenceText: `${DEREFERENCE_TEXT.source}/${DEREFERENCE_TEXT.flags}`,
    receiptText: `${RECEIPT_TEXT.source}/${RECEIPT_TEXT.flags}`,
    renderIdLiteral: `${RENDER_ID_LITERAL.source}/${RENDER_ID_LITERAL.flags}`,
    renderIdName: `${RENDER_ID_NAME.source}/${RENDER_ID_NAME.flags}`,
    renderIdDeclaration: `${RENDER_ID_DECLARATION.source}/${RENDER_ID_DECLARATION.flags}`,
    launchNames: LAUNCH_NAMES,
    moduleExtensions: Object.keys(MODULE_KINDS),
    srcFloor: SRC_FLOOR,
    srcAnchor: SRC_ANCHOR,
    clauseSplit: `${CLAUSE_SPLIT.source}/${CLAUSE_SPLIT.flags}`,
    partSplit: `${PART_SPLIT.source}/${PART_SPLIT.flags}`,
    heldToken: `${HELD_TOKEN.source}/${HELD_TOKEN.flags}`,
    dereferencedToken: `${DEREFERENCED_TOKEN.source}/${DEREFERENCED_TOKEN.flags}`,
    capture: CAPTURE,
  });
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The export is read once per run (no case writes it): the judged set and A1's input coverage share the row. */
let beadRowRead: BeadRow | undefined;
function readBeadRow(): BeadRow {
  beadRowRead ??= scanBeadExport();
  return beadRowRead;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function scanBeadExport(): BeadRow {
  for (const line of readFileSync(BEAD_EXPORT, "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`the bead export carries no row ${BEAD}`);
}
/** The first line of the filing's notes that starts with `prefix`, without the prefix. */
function noteLine(notes: string, prefix: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`${BEAD} notes carry no "${prefix}" line`);
  return line.slice(prefix.length);
}
interface Clause {
  readonly letter: string;
  readonly text: string;
  readonly parts: readonly string[];
}
/** The filing's acceptance: its first "Acceptance: " line without the closing period, split into clauses and parts. */
function exportedClauses(notes: string): Clause[] {
  return noteLine(notes, "Acceptance: ")
    .replace(/\.$/, "")
    .split(CLAUSE_SPLIT)
    .map(clause => ({ letter: clause.slice(1, 2), text: clause, parts: clause.slice(4).split(PART_SPLIT) }));
}

interface Capture {
  readonly version: string;
  readonly paths: readonly string[];
  readonly served: readonly string[];
}
/** The landed capture of the installed rf's registry, read strictly: its result version, its leaf paths in order, the served ones. */
function readCapture(): Capture {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, CAPTURE), "utf8"));
  const result = isObject(raw) && isObject(raw.envelope) && isObject(raw.envelope.result) ? raw.envelope.result : undefined;
  if (result === undefined || typeof result.version !== "string" || !Array.isArray(result.leaves)) throw new Error(`${CAPTURE} must carry envelope.result.version and leaves`);
  const leaves = result.leaves.map((leaf: unknown, index: number): { path: string; served: boolean } => {
    if (!isObject(leaf) || typeof leaf.path !== "string" || typeof leaf.served !== "boolean") throw new Error(`${CAPTURE} leaves[${index}] is malformed`);
    return { path: leaf.path, served: leaf.served };
  });
  return { version: result.version, paths: leaves.map(leaf => leaf.path), served: leaves.filter(leaf => leaf.served).map(leaf => leaf.path) };
}
interface CaptureReading {
  readonly versionEqual: boolean;
  readonly leavesEqual: boolean;
  readonly dereferenceLeavesUnserved: readonly string[];
  readonly nearestUnlisted: readonly string[];
  readonly nearestServedUnserved: readonly string[];
}
/** Producer facts against the capture: version and leaf list equal its own, every dereference leaf served there, every nearest
 * leaf listed there, and every nearest leaf marked served at the installed rf served there. */
function againstCapture(facts: Pick<Producer, "installedVersion" | "leaves" | "dereferenceLeaves" | "nearestLeaves">, capture: Capture): CaptureReading {
  return {
    versionEqual: facts.installedVersion === capture.version,
    leavesEqual: JSON.stringify(facts.leaves) === JSON.stringify(capture.paths),
    dereferenceLeavesUnserved: facts.dereferenceLeaves.filter(leaf => !capture.served.includes(leaf)),
    nearestUnlisted: facts.nearestLeaves.filter(leaf => !capture.paths.includes(leaf.leaf)).map(leaf => leaf.id),
    nearestServedUnserved: facts.nearestLeaves.filter(leaf => leaf.servedAtInstalled && !capture.served.includes(leaf.leaf)).map(leaf => leaf.id),
  };
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Readings, registrations and the stand-in rf.
 * ------------------------------------------------------------------------------------------------------------------------- */

const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
const shownRoot = (value: string): string => value.split(ROOT).join("<root>");

/** The full-shape rf --no-commit envelope (test/helpers/rf-render-fixture.ts) carrying SENTINEL as its context text, with a
 * consistent output digest and size; `edit` changes the result in place before the envelope is returned. */
function envelope(edit?: (result: JsonObject, whole: JsonObject) => void, root = ROOT): JsonObject {
  const whole = objectOf(jsonCopy(fullShapeRf(root)), "fullShapeRf");
  const result = objectOf(whole.result, "fullShapeRf result");
  result.output = { text: SENTINEL, size_bytes: Buffer.byteLength(SENTINEL), digest: `sha256:${sha256(SENTINEL)}`, path: null };
  edit?.(result, whole);
  return whole;
}
/** The value the registered preview returns: the contract, the workspace root and the envelope. */
function reading(source: Json, workspaceRoot = ROOT): JsonObject {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot, source };
}
function hostContext(extra: Partial<ReactiveFiberTopologyContext> = {}): ReactiveFiberTopologyContext {
  return { scope: { ...SCOPE }, seam: "rf-cli", capturedAt: CAPTURED_AT, observedAt: OBSERVED_AT, ...extra };
}
function project(value: Json, context = hostContext()): ReactiveFiberProjectionTopology {
  return reactivefiberTopology(value, context);
}
function snapshotOf(topology: ReactiveFiberProjectionTopology): NativeSnapshot {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the topology holds no snapshot");
  return snapshot;
}
const prefixes = (refs: readonly string[] | undefined): string[] => (refs ?? []).map(ref => ref.slice(0, ref.indexOf(":")));

interface Refusal {
  readonly category: string;
  readonly message: string;
}
function refusalOf(error: unknown): Refusal {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: shownRoot(error.message) };
}
function refusalSync(run: () => unknown): Refusal {
  try {
    run();
  } catch (error) {
    return refusalOf(error);
  }
  throw new Error("expected a CapabilityError, the call returned");
}
async function refusalFrom(call: Promise<JsonValue>): Promise<Refusal> {
  return refusalOf(await call.then(() => undefined, (caught: unknown) => caught));
}
async function outcomeOf(call: Promise<JsonValue>): Promise<string> {
  return call.then(() => "ok", (caught: unknown) => refusalOf(caught).category);
}
function contextOf(grants: readonly string[]): InvocationContext {
  return { grants: [...grants], signal: new AbortController().signal };
}

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
/** The injected reader's envelope type, rebuilt field by field from a JSON envelope (the injected registration validates nothing). */
function asEnvelope(value: JsonObject): Envelope {
  const workspace = objectOf(value.workspace, "envelope workspace");
  const { schema, ok, command, operation_id: operationId, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string" ||
    typeof workspace.id !== "string" || typeof workspace.root !== "string" || value.transaction_id !== null || !Array.isArray(diagnostics)) {
    throw new Error("not an rf envelope");
  }
  return { schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null, result: value.result ?? null, diagnostics: [...diagnostics] };
}
/** The injected registration, counting reader calls. */
function injectedPreview(): { registry: CapabilityRegistry; calls: { read: number } } {
  const calls = { read: 0 };
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls.read += 1;
    return asEnvelope(envelope());
  }, ROOT);
  return { registry, calls };
}
let nativeModule: ReturnType<typeof loadWorkbenchNative> | undefined;
/** The native registration Pi ships (registerNativeProviders), which spawns `rf` from PATH for the preview. */
async function nativeRegistry(): Promise<CapabilityRegistry> {
  nativeModule ??= loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  (await nativeModule).registerNativeProviders(registry, ROOT);
  return registry;
}
function previewDescriptor(registry: CapabilityRegistry): CapabilityDescriptor {
  const descriptor = registry.catalogSnapshot().map(entry => entry.descriptor).find(entry => entry.id === PREVIEW_ID);
  if (descriptor === undefined) throw new Error("the registry holds no preview descriptor");
  return descriptor;
}

const wordsOf = (token: string): string[] => token.trim().split(/\s+/).map(word => word.toLowerCase());
const snakeOf = (token: string): string => wordsOf(token).join("_");
const camelOf = (token: string): string => wordsOf(token).map((word, index) => (index === 0 ? word : `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)).join("");
/** The input arms the registered preview descriptor declares (each oneOf arm's required keys), after the bare input. */
function inputArms(descriptor: CapabilityDescriptor): string[][] {
  const oneOf: unknown = descriptor.inputSchema.oneOf;
  if (!Array.isArray(oneOf)) throw new Error("the preview input schema declares no oneOf arms");
  const arms = oneOf.map((arm: unknown, index: number): string[] => {
    const required = isObject(arm) ? arm.required : undefined;
    if (!Array.isArray(required) || !required.every((key: unknown) => typeof key === "string")) throw new Error(`the preview input arm ${index} declares no required keys`);
    return required.map(String);
  });
  return [[], ...arms];
}
interface InputCoverage {
  readonly held: string;
  readonly dereferenced: string;
  readonly heldIsEnvelopeField: boolean;
  readonly keys: readonly string[];
  readonly arms: readonly (readonly string[])[];
  readonly uncovered: readonly (readonly string[])[];
  readonly extra: readonly (readonly string[])[];
}
/** The render-id and receipt inputs required by anchors outside this file: the tokens the exported (a) and (c) clauses name,
 * each as an input key in snake_case and camelCase ((a)'s snake form must be a field of the rf envelope the shared fixture
 * carries), alone and on each input arm of the registered descriptor; RENDER_ID_INPUTS must hold exactly that set of key sets. */
function inputCoverage(inputs: readonly JsonObject[] = RENDER_ID_INPUTS): InputCoverage {
  const clauses = exportedClauses(readBeadRow().notes);
  const clauseText = (letter: string): string => clauses.find(clause => clause.letter === letter)?.text ?? "";
  const held = HELD_TOKEN.exec(clauseText("a"))?.[1] ?? "";
  const dereferenced = DEREFERENCED_TOKEN.exec(clauseText("c"))?.[1] ?? "";
  const envelopeFields = Object.keys(objectOf(objectOf(jsonCopy(fullShapeRf(ROOT)), "fullShapeRf").result, "fullShapeRf result"));
  const keys = [...new Set([held, dereferenced].filter(token => token.length > 0).flatMap(token => [snakeOf(token), camelOf(token)]))];
  const arms = inputArms(previewDescriptor(injectedPreview().registry));
  const keySet = (names: readonly string[]): string => JSON.stringify([...names].sort());
  const required = keys.flatMap(key => arms.map(arm => [...arm, key]));
  const present = inputs.map(input => Object.keys(input));
  return {
    held,
    dereferenced,
    heldIsEnvelopeField: held.length > 0 && envelopeFields.includes(snakeOf(held)),
    keys,
    arms,
    uncovered: required.filter(shape => !present.some(names => keySet(names) === keySet(shape))),
    extra: present.filter(names => !required.some(shape => keySet(shape) === keySet(names))),
  };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const folder = makeScratch(prefix);
  scratches.push(folder);
  return folder;
}
/** A stand-in rf, first on PATH: it logs one JSON argv line per spawn and prints `answer`, exit 0. */
function standInRf(answer: Json): string {
  const folder = scratch("rf-render-id-authority-");
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(answer)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  let raw = "";
  try {
    raw = readFileSync(log, "utf8");
  } catch {
    return [];
  }
  return raw.trim().split("\n").filter(Boolean).map(line => (JSON.parse(line) as string[]).map(shownRoot));
}

const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census scripts call node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Source readers.
 * ------------------------------------------------------------------------------------------------------------------------- */

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}
const posix = (path: string): string => path.split(sep).join("/");
/** Git's own listing of a root below a repo (tracked and untracked, ignored files included so a local ignored file cannot
 * split the walk from its anchor), regular files and symbolic links, repo-relative and sorted: the walk's anchor outside
 * filesBelow, so a walk that skips a directory or a file reds even while the floor and the anchor token hold. A symbolic link is
 * kept (wb-h55d F2): the walk never follows one, so a link under the root, to a module or to a directory, reads unwalked rather
 * than both sides agreeing by dropping it. Undefined when git cannot list it. */
function gitListed(root: string, repo = REPO, env: NodeJS.ProcessEnv = process.env): string[] | undefined {
  const listing = spawnSync("git", ["ls-files", "-z", "--cached", "--others", "--", posix(relative(repo, root))], { cwd: repo, env, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (listing.status !== 0) return undefined;
  const kept = (path: string): boolean => {
    try {
      const stats = lstatSync(join(repo, path));
      return stats.isFile() || stats.isSymbolicLink();
    } catch {
      return false;
    }
  };
  return [...new Set(listing.stdout.split("\0").filter(path => path.length > 0))].filter(kept).sort();
}
/** A walk's files (repo-relative) against git's own listing of the same root: whether they agree, and what each lacks. */
function againstGit(root: string, walked: readonly string[], repo = REPO, env?: NodeJS.ProcessEnv): { agrees: boolean; unwalked: string[]; unlisted: string[] } {
  const listed = gitListed(root, repo, env);
  if (listed === undefined) return { agrees: false, unwalked: ["<git ls-files failed>"], unlisted: [] };
  const unwalked = listed.filter(path => !walked.includes(path));
  const unlisted = walked.filter(path => !listed.includes(path));
  return { agrees: unwalked.length === 0 && unlisted.length === 0 && listed.length === walked.length, unwalked, unlisted };
}
/** Repository locators a hook may export (a linked worktree's hooks receive GIT_DIR): a scratch git tree runs without them and
 * without global or system configuration, so its commands never reach the outer repository or the host's settings. */
const GIT_LOCATORS = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];
function scratchGitEnv(): NodeJS.ProcessEnv {
  const inherited = Object.fromEntries(Object.entries(process.env).filter(([key]) => !GIT_LOCATORS.includes(key)));
  return { ...inherited, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
}
/** The git anchor's link control (wb-h55d F2): a scratch git tree whose src holds one regular module beside a symbolic link to a
 * module outside src that launches an rf dereference and a symbolic link to a directory outside src; the walk of that src, and
 * the walk against git's own listing of it. */
function symlinkedControl(): { walked: string[]; agrees: boolean; unwalked: string[]; unlisted: string[] } {
  const tree = scratch("rf-render-id-authority-git-");
  const env = scratchGitEnv();
  const init = spawnSync("git", ["init", "-q"], { cwd: tree, env, encoding: "utf8" });
  if (init.status !== 0) throw new Error(`git init failed in the scratch tree: ${init.stderr}`);
  mkdirSync(join(tree, "src", "sub"), { recursive: true });
  mkdirSync(join(tree, "outside"));
  writeFileSync(join(tree, "src", "kept.ts"), "export const kept = 1;\n");
  writeFileSync(join(tree, "outside", "launch.ts"), 'import { spawn } from "node:child_process";\nspawn("rf", ["context", "replay", id]);\n');
  symlinkSync(join("..", "outside", "launch.ts"), join(tree, "src", "zz-link.ts"));
  symlinkSync(join("..", "..", "outside"), join(tree, "src", "sub", "zz-dirlink"));
  const walked = filesBelow(join(tree, "src")).map(file => posix(relative(tree, file)));
  return { walked, ...againstGit(join(tree, "src"), walked, tree, env) };
}

interface Scan {
  readonly rfLaunches: string[];
  readonly dereferences: string[];
  readonly receipts: string[];
  readonly renderIdLiterals: string[];
  readonly renderArgv: number;
  readonly nullChecks: string[];
  readonly renderIdReads: string[];
  readonly renderIdBindings: string[];
}
const emptyScan = (): Scan => ({ rfLaunches: [], dereferences: [], receipts: [], renderIdLiterals: [], renderArgv: 0, nullChecks: [], renderIdReads: [], renderIdBindings: [] });
function merged(scans: readonly Scan[]): Scan {
  const all = emptyScan();
  for (const scan of scans) {
    all.rfLaunches.push(...scan.rfLaunches);
    all.dereferences.push(...scan.dereferences);
    all.receipts.push(...scan.receipts);
    all.renderIdLiterals.push(...scan.renderIdLiterals);
    all.nullChecks.push(...scan.nullChecks);
    all.renderIdReads.push(...scan.renderIdReads);
    all.renderIdBindings.push(...scan.renderIdBindings);
  }
  return { ...all, renderArgv: scans.reduce((sum, scan) => sum + scan.renderArgv, 0) };
}

function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
function enclosingName(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined && ts.isIdentifier(at.name)) return at.name.text;
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
  }
  return "<module>";
}
const isNullLiteral = (node: ts.Node): boolean => node.kind === ts.SyntaxKind.NullKeyword;
const EQUALITY = [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken];
/** A render_id access is a null check when it is one side of an equality against the null literal. */
function isNullCheck(access: ts.Node): boolean {
  const parent = access.parent;
  return ts.isBinaryExpression(parent) && EQUALITY.includes(parent.operatorToken.kind) &&
    ((parent.left === access && isNullLiteral(parent.right)) || (parent.right === access && isNullLiteral(parent.left)));
}
/** An argv-shaped array literal naming a dereference verb: a verb group element followed by one of its verbs (own keys only, so
 * an element such as "constructor" or "toString" names no group). */
function dereferenceArgv(elements: readonly string[]): boolean {
  return elements.some((element, index) => Object.hasOwn(DEREFERENCE_VERBS, element) && (DEREFERENCE_VERBS[element] ?? []).includes(elements[index + 1] ?? ""));
}

/** One module's facts, read from its syntax tree: rf launches, dereference verbs, receipt spellings, rfr_ literals and render_id use. */
function scanModule(fileName: string, source: string): Scan {
  const scan = emptyScan();
  let renderArgv = 0;
  const kind = MODULE_KINDS[extname(fileName)] ?? ts.ScriptKind.TS;
  const literal = (value: string, where: string): void => {
    if (DEREFERENCE_TEXT.test(value)) scan.dereferences.push(`${where}: ${value}`);
    if (RECEIPT_TEXT.test(value)) scan.receipts.push(`${where}: ${value}`);
    if (RENDER_ID_LITERAL.test(value)) scan.renderIdLiterals.push(`${where}: ${value}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const binary = node.arguments[0];
      if (name !== undefined && LAUNCH_NAMES.includes(name) && binary !== undefined && ts.isStringLiteralLike(binary) && binary.text === "rf") {
        scan.rfLaunches.push(`${fileName}:${enclosingName(node)}:${name}`);
      }
    }
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (dereferenceArgv(elements)) scan.dereferences.push(`${fileName}: [${elements.filter(Boolean).join(", ")}]`);
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node)) literal(node.text, fileName);
    if (ts.isTemplateExpression(node)) literal([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "), fileName);
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && RECEIPT_TEXT.test(node.text)) scan.receipts.push(`${fileName}: ${node.text}`);
    if (ts.isPropertyAccessExpression(node) && RENDER_ID_NAME.test(node.name.text)) {
      (isNullCheck(node) ? scan.nullChecks : scan.renderIdReads).push(fileName);
    }
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && RENDER_ID_NAME.test(node.argumentExpression.text)) {
      (isNullCheck(node) ? scan.nullChecks : scan.renderIdReads).push(fileName);
    }
    if (ts.isBindingElement(node)) {
      const key = node.propertyName ?? node.name;
      if ((ts.isIdentifier(key) || ts.isStringLiteralLike(key)) && RENDER_ID_NAME.test(key.text)) scan.renderIdReads.push(fileName);
    }
    const declared =
      ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isPropertyDeclaration(node) || ts.isPropertySignature(node) ||
      ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)
        ? node.name
        : undefined;
    if (declared !== undefined && (ts.isIdentifier(declared) || ts.isStringLiteralLike(declared)) && RENDER_ID_DECLARATION.test(declared.text)) {
      scan.renderIdBindings.push(`${fileName}: ${declared.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind));
  return { ...scan, renderArgv };
}
/** A file that is not a module is read as text by the three literal matchers. */
function scanText(fileName: string, source: string): Scan {
  const scan = emptyScan();
  for (const line of source.split("\n")) {
    if (DEREFERENCE_TEXT.test(line)) scan.dereferences.push(`${fileName}: ${line.trim()}`);
    if (RECEIPT_TEXT.test(line)) scan.receipts.push(`${fileName}: ${line.trim()}`);
    if (RENDER_ID_LITERAL.test(line)) scan.renderIdLiterals.push(`${fileName}: ${line.trim()}`);
  }
  return scan;
}
function scanFile(path: string, base: string): Scan {
  const name = posix(relative(base, path));
  const source = readFileSync(path, "utf8");
  return extname(path) in MODULE_KINDS ? scanModule(name, source) : scanText(name, source);
}
/** Every regular file below `root`, scanned; the walk reports its file count, the files it read (relative to `base`) and
 * whether it read the anchor token. */
function scanTree(root: string, base: string, anchor?: readonly [string, string]): { files: number; walked: string[]; anchored: boolean; scan: Scan } {
  const files = filesBelow(root);
  const anchored = anchor === undefined || files.some(file => posix(relative(root, file)) === anchor[0] && readFileSync(file, "utf8").includes(anchor[1]));
  return { files: files.length, walked: files.map(file => posix(relative(base, file))).sort(), anchored, scan: merged(files.map(file => scanFile(file, base))) };
}
/** The scan of one planted text, as a module named `name`. */
const scanned = (text: string, name = "control.ts"): Scan => scanModule(name, text);

/* ---------------------------------------------------------------------------------------------------------------------------
 * The pins.
 * ------------------------------------------------------------------------------------------------------------------------- */

const REACHED: string[] = [];
/** The judged set's own end, recorded as reached: the records case requires it exactly once (wb-h55d F1). */
const JUDGED_REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: { [key: string]: unknown }): Json {
  REACHED.push(pin);
  return jsonCopy({ pin, ...witness });
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    // (i) a render id or a receipt is no input: refused at input validation, before any reader call or rf spawn. The inputs are
    // exactly the set the anchors outside this file require: each token the export's (a) and (c) name, as a key, on each arm.
    const coverage = inputCoverage();
    expect({ held: coverage.held, dereferenced: coverage.dereferenced, heldIsEnvelopeField: coverage.heldIsEnvelopeField }, "the tokens the exported (a) and (c) clauses name").toStrictEqual({ held: "render ID", dereferenced: "receipt", heldIsEnvelopeField: true });
    expect({ uncovered: coverage.uncovered, extra: coverage.extra }, "the render-id inputs against the key x arm set derived from the export, the rf envelope and the descriptor").toStrictEqual({ uncovered: [], extra: [] });
    // The coverage judge is live: a list missing the bare camelCase input, or carrying an input the anchors do not require, is reported.
    const coverageControls = {
      droppedBareCamelCase: inputCoverage(RENDER_ID_INPUTS.filter(input => JSON.stringify(Object.keys(input)) !== JSON.stringify([camelOf(coverage.held)]))).uncovered,
      unrequiredKey: inputCoverage([...RENDER_ID_INPUTS, { model: "m", task: "t", token: RENDER_ID }]).extra,
    };
    expect(coverageControls).toStrictEqual({ droppedBareCamelCase: [["renderId"]], unrequiredKey: [["model", "task", "token"]] });
    const inputs = [];
    for (const input of RENDER_ID_INPUTS) {
      const injected = injectedPreview();
      const injectedRefusal = await refusalFrom(injected.registry.invoke(PREVIEW_ID, input, contextOf([PREVIEW_PERMISSION])));
      const log = standInRf(envelope());
      const native = await nativeRegistry();
      const nativeRefusal = await refusalFrom(native.invoke(PREVIEW_ID, input, contextOf([PREVIEW_PERMISSION])));
      inputs.push({ keys: Object.keys(input), injected: { ...injectedRefusal, calls: injected.calls.read }, native: { ...nativeRefusal, spawns: spawnsOf(log).length } });
    }
    expect(inputs.map(entry => [entry.injected.category, entry.injected.calls, entry.native.category, entry.native.spawns])).toEqual(RENDER_ID_INPUTS.map(() => ["validation", 0, "validation", 0]));
    // (ii) a render id typed where Pi admits text is that flag's value in one fresh scoped --no-commit render.
    const textArms = [];
    for (const input of TEXT_ARMS) {
      const log = standInRf(envelope());
      const native = await nativeRegistry();
      const output = objectOf(jsonCopy(await native.invoke(PREVIEW_ID, input, contextOf([PREVIEW_PERMISSION]))), "preview output");
      const spawns = spawnsOf(log);
      const argv = spawns[0] ?? [];
      const flags = argv.flatMap((item, index) => (item === RENDER_ID ? [argv[index - 1] ?? "<none>"] : []));
      const result = objectOf(objectOf(output.source, "output source").result, "output result");
      const readingRenderId = Object.hasOwn(result, "render_id") ? result.render_id : "absent";
      textArms.push({ input: Object.keys(input), spawns: spawns.length, verb: argv.slice(2, 4), noCommit: argv.includes("--no-commit"), flags, readingRenderId });
    }
    for (const arm of textArms) {
      expect(arm.spawns).toBe(1);
      expect(arm.verb).toEqual(["context", "render"]);
      expect(arm.noCommit).toBe(true);
      expect(arm.flags.length).toBe(1);
      expect(TEXT_FLAGS).toContain(arm.flags[0]);
      expect(arm.readingRenderId).toBeNull();
    }
    // (iii) a reading that names a committed render is refused by both readers before anything is projected.
    const variants: readonly (readonly [string, (result: JsonObject, whole: JsonObject) => void])[] = [
      ["render_id", result => {
        result.render_id = RENDER_ID;
      }],
      ["commit_seq", result => {
        result.commit_seq = 1;
      }],
      ["transaction_id", (_result, whole) => {
        whole.transaction_id = `rft_${"t".repeat(22)}`;
      }],
    ];
    const committed = [];
    for (const [variant, edit] of variants) {
      const answer = envelope(edit);
      const log = standInRf(answer);
      const native = await nativeRegistry();
      const provider = await refusalFrom(native.invoke(PREVIEW_ID, { model: "m", task: "t" }, contextOf([PREVIEW_PERMISSION])));
      const observer = refusalSync(() => project(reading(answer)));
      committed.push({ variant, provider: { ...provider, spawns: spawnsOf(log).length }, observer });
    }
    expect(committed.map(entry => [entry.provider.category, entry.observer.category])).toEqual(variants.map(() => ["transport", "validation"]));
    // (iv) an admitted reading's projection carries the context text only as Pi's own digest.
    const topology = project(reading(envelope()));
    const serialized = JSON.stringify(topology);
    const payloadRef = snapshotOf(topology).nativePayloadRef ?? null;
    expect(serialized.includes(SENTINEL)).toBe(false);
    expect(payloadRef).toBe(`rf-output:sha256:${sha256(SENTINEL)}`);
    // (v) src reads a render_id only to require it null.
    const tree = scanTree(SRC, REPO, SRC_ANCHOR);
    const controls = {
      read: scanned("const id = result.render_id;").renderIdReads.length,
      elementRead: scanned('if (result["render_id"]) use();').renderIdReads.length,
      destructured: scanned("const { render_id } = result;").renderIdReads.length,
      camelRead: scanned("forward(result.renderId);").renderIdReads.length,
      binding: scanned("function adopt(transferredRenderId: string) {}").renderIdBindings.length,
      nullCheck: scanned("if (result.render_id !== null) throw refusal;").nullChecks.length,
      composedKey: scanned('const id = result[["render", "id"].join("_")];').renderIdReads.length,
    };
    const git = againstGit(SRC, tree.walked);
    expect(tree.files).toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(tree.anchored).toBe(true);
    expect({ unwalked: git.unwalked, unlisted: git.unlisted }, "the src walk against git's own listing of src").toStrictEqual({ unwalked: [], unlisted: [] });
    expect(git.agrees).toBe(true);
    expect(tree.scan.renderIdReads).toEqual([]);
    expect(tree.scan.renderIdBindings).toEqual([]);
    expect(controls).toStrictEqual({ read: 1, elementRead: 1, destructured: 1, camelRead: 1, binding: 1, nullCheck: 1, composedKey: 0 });
    return done("A1", {
      coverage, coverageControls, inputs, textArms, committed,
      projection: { sentinelProjected: serialized.includes(SENTINEL), payloadRef, evidence: prefixes(snapshotOf(topology).evidenceRefs) },
      renderIdUse: { walkAgreesWithGit: git.agrees, nullChecks: [...tree.scan.nullChecks].sort(), reads: tree.scan.renderIdReads, bindings: tree.scan.renderIdBindings, controls },
    });
  },
  A2: async () => {
    // (i) producer replay, receipt and authority claims in additive keys change nothing Pi projects.
    const bare = project(reading(envelope()));
    const claimed = project(reading(envelope(result => Object.assign(result, jsonCopy(CLAIMS)))));
    const serialized = JSON.stringify(claimed);
    const surfaced = CLAIM_TOKENS.filter(token => serialized.toLowerCase().includes(token.toLowerCase()));
    expect(claimed).toStrictEqual(bare);
    expect(surfaced).toEqual([]);
    // (ii) replayed observation rows demote; only an all-fresh set reads complete.
    const rows = (freshness: string, replayed: boolean): Json => [
      { status: "observed", freshness, replayed },
      { status: "observed", freshness, replayed },
    ];
    const replayed = snapshotOf(project(reading(envelope(result => {
      result.observations = rows("reused", true);
    }))));
    const replayedNotes = project(reading(envelope(result => {
      result.observations = rows("reused", true);
    }))).diagnostics.filter(note => note.startsWith("observations:"));
    const fresh = snapshotOf(project(reading(envelope(result => {
      result.observations = rows("captured_at_render", false);
    }))));
    expect([replayed.coverage, replayed.node.statusTone]).toEqual(["partial", "unknown"]);
    expect([fresh.coverage, fresh.node.statusTone]).toEqual(["complete", "success"]);
    // (iii) the record is dated by the host's read, never by the producer's render time.
    const snapshot = snapshotOf(bare);
    const producerCreatedAt = objectOf(objectOf(envelope().result, "result").provenance, "provenance").created_at ?? null;
    expect([snapshot.capturedAt, snapshot.observedAt]).toEqual([CAPTURED_AT, OBSERVED_AT]);
    expect(serialized.includes(String(producerCreatedAt))).toBe(false);
    return done("A2", {
      claims: { equalToBare: true, surfaced, claimKeys: Object.keys(CLAIMS) },
      replayed: { coverage: replayed.coverage ?? null, tone: replayed.node.statusTone, notes: replayedNotes },
      fresh: { coverage: fresh.coverage ?? null, tone: fresh.node.statusTone },
      clock: { capturedAt: snapshot.capturedAt, observedAt: snapshot.observedAt, producerCreatedAt, producerTimeSurfaced: serialized.includes(String(producerCreatedAt)) },
    });
  },
  B1: async () => {
    // (i) every call re-checks the grant: no admission is remembered between calls.
    const { registry, calls } = injectedPreview();
    const sequence = [[PREVIEW_PERMISSION], [], [PREVIEW_PERMISSION], [], [PREVIEW_PERMISSION], []];
    const outcomes = [];
    for (const grants of sequence) outcomes.push(await outcomeOf(registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, contextOf(grants))));
    expect(outcomes).toEqual(["ok", "authorization", "ok", "authorization", "ok", "authorization"]);
    expect(calls.read).toBe(3);
    // (ii) the grant check precedes input validation.
    const ordering = injectedPreview();
    const ungranted = await refusalFrom(ordering.registry.invoke(PREVIEW_ID, { render_id: RENDER_ID }, contextOf([])));
    const granted = await refusalFrom(ordering.registry.invoke(PREVIEW_ID, { render_id: RENDER_ID }, contextOf([PREVIEW_PERMISSION])));
    expect([ungranted.category, granted.category, ordering.calls.read]).toEqual(["authorization", "validation", 0]);
    // (iii) the registry's ref-dereference mode (inspect) needs its own grant, and the rf descriptor serves none.
    const inspect = [];
    for (const [registration, open] of [["injected", async () => injectedPreview().registry], ["native", nativeRegistry]] as const) {
      const log = standInRf(envelope());
      const target = await open();
      const modes = [...previewDescriptor(target).supportedModes];
      const withoutGrant = await refusalFrom(target.inspect(PREVIEW_ID, { render_id: RENDER_ID }, contextOf([PREVIEW_PERMISSION])));
      const withGrant = await refusalFrom(target.inspect(PREVIEW_ID, { render_id: RENDER_ID }, contextOf([PREVIEW_PERMISSION, `inspect:${PREVIEW_ID}`])));
      inspect.push({ registration, modes, withoutGrant, withGrant, spawns: spawnsOf(log).length });
    }
    expect(inspect.map(entry => [entry.modes, entry.withoutGrant.category, entry.withGrant.category, entry.spawns])).toEqual([
      [["invoke"], "authorization", "unavailable", 0],
      [["invoke"], "authorization", "unavailable", 0],
    ]);
    return done("B1", { sequence: outcomes, providerCalls: calls.read, ordering: { ungranted, granted, calls: ordering.calls.read }, inspect });
  },
  B2: async () => {
    // (i) the reader's refusal is a typed authorization error, and nothing is returned.
    const refused = refusalSync(() => project(reading(envelope(undefined, OTHER_ROOT), OTHER_ROOT)));
    expect(refused).toStrictEqual({ category: "authorization", message: "RF reading workspace differs from observer scope." });
    // (ii) through Pi's Claude workflow host the refusal fails the run with its diagnostic; the granted twin completes.
    const script = (input: JsonObject): string => `${HEAD}return await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(input)});`;
    const runs = [];
    for (const [name, grants, input] of [
      ["ungranted", [], { model: "m", task: "t" }],
      ["granted", [PREVIEW_PERMISSION], { model: "m", task: "t" }],
      ["renderIdInput", [PREVIEW_PERMISSION], { render_id: RENDER_ID }],
    ] as const) {
      const { registry, calls } = injectedPreview();
      const result = await runWorkflow({ script: script(input), host: claudeHost(registry, grants) });
      const diagnostic = result.capabilityError;
      runs.push({ name, status: result.status, capabilityError: diagnostic === undefined ? null : { category: diagnostic.category, message: diagnostic.message }, calls: calls.read });
    }
    expect(runs.map(run => [run.status, run.capabilityError?.category ?? null, run.calls])).toEqual([
      ["failed", "authorization", 0],
      ["completed", null, 1],
      ["failed", "validation", 0],
    ]);
    // (iii) an observation record is served only to the scope it was refreshed under.
    const projection = new ObservationProjection();
    const snapshot = snapshotOf(project(reading(envelope())));
    const applied = projection.refresh(snapshot);
    const served = (scope: ObservationScope): { byScope: number; byRef: number } => ({
      byScope: projection.query({ scope, limit: 10 }).nodes.length,
      byRef: projection.query({ scope, ref: snapshot.source, limit: 10 }).nodes.length,
    });
    const records = { applied, sameScope: served(SCOPE), otherPrincipal: served({ workspace: ROOT, principal: OTHER_PRINCIPAL }), otherWorkspace: served({ workspace: OTHER_ROOT, principal: SCOPE.principal }) };
    expect(records).toStrictEqual({ applied: "applied", sameScope: { byScope: 1, byRef: 1 }, otherPrincipal: { byScope: 0, byRef: 0 }, otherWorkspace: { byScope: 0, byRef: 0 } });
    return done("B2", { refused, runs, records });
  },
  B3: async () => {
    // (i) the workspace gate runs before the envelope is read, so nothing a reading carries passes it.
    const receiptClaims = (result: JsonObject): void => {
      result.receipt = { render_id: RENDER_ID, issuer: { workspace_root: ROOT }, observer_scope: ROOT };
    };
    const carried: readonly (readonly [string, Json])[] = [
      ["preview", reading(envelope(undefined, OTHER_ROOT), OTHER_ROOT)],
      ["committedRenderId", reading(envelope(result => {
        result.render_id = RENDER_ID;
      }, OTHER_ROOT), OTHER_ROOT)],
      ["receiptClaimsObserverRoot", reading(envelope(receiptClaims, OTHER_ROOT), OTHER_ROOT)],
      ["malformedSource", reading("not an rf envelope", OTHER_ROOT)],
      ["innerRootIsObserverRoot", reading(envelope(), OTHER_ROOT)],
    ];
    const gate = carried.map(([name, value]) => ({ name, ...refusalSync(() => project(value)) }));
    expect(gate.map(entry => entry.category)).toEqual(carried.map(() => "authorization"));
    // (ii) only the host-bound authorizedRfRoot names another root, and once set it alone does.
    const swarm = reading(envelope(undefined, SWARM_ROOT), SWARM_ROOT);
    const swarmClaims = reading(envelope(receiptClaims, SWARM_ROOT), SWARM_ROOT);
    const outcome = (value: Json, context: ReactiveFiberTopologyContext): string => {
      try {
        return snapshotOf(project(value, context)).coverage ?? "unknown";
      } catch (error) {
        return refusalOf(error).category;
      }
    };
    const authorizedRoot = {
      swarmWithoutAuthorizedRoot: outcome(swarm, hostContext()),
      swarmWithAuthorizedRoot: outcome(swarm, hostContext({ authorizedRfRoot: SWARM_ROOT })),
      observerRootWithAuthorizedRoot: outcome(reading(envelope()), hostContext({ authorizedRfRoot: SWARM_ROOT })),
      swarmClaimingObserverRoot: outcome(swarmClaims, hostContext()),
    };
    expect(authorizedRoot).toStrictEqual({ swarmWithoutAuthorizedRoot: "authorization", swarmWithAuthorizedRoot: "complete", observerRootWithAuthorizedRoot: "authorization", swarmClaimingObserverRoot: "authorization" });
    return done("B3", { gate, authorizedRoot });
  },
  C1: async () => {
    // (i)-(iii) every regular file below src, scanned: one rf launch, no dereference verb, no receipt spelling, no rfr_ id. The walk
    // reads exactly what git's own listing of src holds, so a narrowed walk cannot hide a module.
    const tree = scanTree(SRC, REPO, SRC_ANCHOR);
    const git = againstGit(SRC, tree.walked);
    expect(tree.files).toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(tree.anchored).toBe(true);
    expect({ unwalked: git.unwalked, unlisted: git.unlisted }, "the src walk against git's own listing of src").toStrictEqual({ unwalked: [], unlisted: [] });
    expect(git.agrees).toBe(true);
    expect(tree.scan.rfLaunches).toEqual(["src/workbench/providers/reactivefiber.ts:nativeReactiveFiberRender:spawn"]);
    expect(tree.scan.renderArgv).toBeGreaterThanOrEqual(1);
    expect({ dereferences: tree.scan.dereferences, receipts: tree.scan.receipts, renderIdLiterals: tree.scan.renderIdLiterals }).toStrictEqual({ dereferences: [], receipts: [], renderIdLiterals: [] });
    // The walk and the matchers are live: a planted tree (deep, non-.ts, non-module) reports every planted shape.
    const planted = scratch("rf-render-id-authority-tree-");
    const deep = join(planted, "a", "b", "c", "d", "e");
    mkdirSync(deep, { recursive: true });
    writeFileSync(join(deep, "deep.ts"), 'export const argv = ["context", "show", id];\n');
    writeFileSync(join(planted, "launch.mjs"), 'import { spawn } from "node:child_process";\nspawn("rf", ["operation", "show", operationId]);\n');
    writeFileSync(join(planted, "notes.json"), '{ "verb": "rf context receipt", "id": "rfr_abcd1234" }\n');
    const plantedTree = scanTree(planted, planted);
    const fileOf = (entry: string): string => entry.slice(0, entry.indexOf(":"));
    const positive = {
      files: plantedTree.files,
      rfLaunches: plantedTree.scan.rfLaunches,
      dereferences: plantedTree.scan.dereferences.map(fileOf).sort(),
      receipts: plantedTree.scan.receipts.map(fileOf),
      renderIdLiterals: plantedTree.scan.renderIdLiterals.map(fileOf),
    };
    expect(positive).toStrictEqual({
      files: 3,
      rfLaunches: ["launch.mjs:<module>:spawn"],
      dereferences: ["a/b/c/d/e/deep.ts", "launch.mjs", "notes.json"],
      receipts: ["notes.json"],
      renderIdLiterals: ["notes.json"],
    });
    const empty = scanTree(scratch("rf-render-id-authority-empty-"), REPO);
    expect(empty.files >= SRC_FLOOR).toBe(false);
    // The git anchor is live: the src walk minus the anchor module's directory, or plus a path git does not list, disagrees; and
    // it keeps symbolic links (wb-h55d F2): in a scratch git tree, a link to a module and a link to a directory read unwalked
    // beside the one regular module the walk reads.
    const skippedDirectory = `${posix(join("src", dirname(SRC_ANCHOR[0])))}/`;
    const narrowed = againstGit(SRC, tree.walked.filter(path => !path.startsWith(skippedDirectory)));
    const widened = againstGit(SRC, [...tree.walked, "src/zz-census-unlisted.ts"]);
    const gitControls = {
      narrowedAgrees: narrowed.agrees,
      narrowedUnwalkedAreTheSkipped: narrowed.unwalked.length > 0 && narrowed.unwalked.every(path => path.startsWith(skippedDirectory)),
      widenedAgrees: widened.agrees,
      widenedUnlisted: widened.unlisted,
      symlinked: symlinkedControl(),
    };
    expect(gitControls).toStrictEqual({
      narrowedAgrees: false,
      narrowedUnwalkedAreTheSkipped: true,
      widenedAgrees: false,
      widenedUnlisted: ["src/zz-census-unlisted.ts"],
      symlinked: { walked: ["src/kept.ts"], agrees: false, unwalked: ["src/sub/zz-dirlink", "src/zz-link.ts"], unlisted: [] },
    });
    const controls = {
      argv: scanned('run(["context", "show", id]);').dereferences.length,
      dotted: scanned('const leaf = "context.replay";').dereferences.length,
      spaced: scanned('const line = "rf operation show rfo_x";').dereferences.length,
      detail: scanned('run(["context", "render", "--detail", "receipt"]);').dereferences.length,
      template: scanned(`const line = \`context diff \${a} \${b}\`;`).dereferences.length,
      receiptIdentifier: scanned("const contextReceipt = load();").receipts.length,
      renderReceiptText: scanned('const kind = "render_receipt";').receipts.length,
      renderIdLiteral: scanned('const id = "rfr_abcd1234";').renderIdLiterals.length,
      composedArgv: scanned('run(["context", verb, id]);').dereferences.length,
      indirectLaunch: scanned('const bin = "rf";\nspawn(bin, ["context", "render"]);').rfLaunches.length,
      interrupted: scanned(`const kind = "context${String.fromCodePoint(0x200b)}receipt";`).receipts.length,
      unnamed: scanned("const handoffToken = transfer(peer);").receipts.length,
      storeRead: (() => {
        const scan = scanned('const record = readFileSync(join(root, ".rf", "renders", id));');
        return scan.rfLaunches.length + scan.dereferences.length + scan.receipts.length + scan.renderIdLiterals.length;
      })(),
    };
    expect(controls).toStrictEqual({ argv: 1, dotted: 1, spaced: 1, detail: 1, template: 1, receiptIdentifier: 1, renderReceiptText: 1, renderIdLiteral: 1, composedArgv: 0, indirectLaunch: 0, interrupted: 0, unnamed: 0, storeRead: 0 });
    // No registered descriptor (native or injected) spells a dereference verb, a receipt or an rfr_ id.
    const descriptors = [...(await nativeRegistry()).catalogSnapshot(), ...injectedPreview().registry.catalogSnapshot()].map(entry => entry.descriptor);
    const descriptorHits = descriptors.filter(descriptor => {
      const json = JSON.stringify(descriptor);
      return DEREFERENCE_TEXT.test(json) || RECEIPT_TEXT.test(json) || RENDER_ID_LITERAL.test(json);
    }).map(descriptor => descriptor.id);
    expect(descriptorHits).toEqual([]);
    // (iv) the served argv: both input arms spawn exactly the --no-commit render through the native registration.
    const served = [];
    for (const input of [{ model: "m", task: "t" }, { view: "v", taskId: "t", model: "m" }]) {
      const log = standInRf(envelope());
      await (await nativeRegistry()).invoke(PREVIEW_ID, input, contextOf([PREVIEW_PERMISSION]));
      served.push(spawnsOf(log));
    }
    expect(served.map(spawns => spawns.length)).toEqual([1, 1]);
    expect(served.flat().filter(dereferenceArgv)).toEqual([]);
    // (v) the measured producer surface: every dereference leaf is one the matcher catches, and no leaf serves a receipt.
    const { producer } = ROSTER;
    const uncaught = producer.dereferenceLeaves.filter(leaf => !DEREFERENCE_TEXT.test(leaf) || !dereferenceArgv(leaf.split(".")));
    const unlisted = producer.dereferenceLeaves.filter(leaf => !producer.leaves.includes(leaf));
    const receiptLeaves = producer.leaves.filter(leaf => /receipt/i.test(leaf));
    expect({ uncaught, unlisted, receiptLeaves }).toStrictEqual({ uncaught: [], unlisted: [], receiptLeaves: [] });
    expect(producer.contextShowDetail.includes("receipt")).toBe(false);
    const nearest = producer.nearestLeaves.map(leaf => ({ id: leaf.id, leaf: leaf.leaf, listed: producer.leaves.includes(leaf.leaf), servedAtInstalled: leaf.servedAtInstalled }));
    // The roster's producer facts against the landed capture of the installed rf's registry, an anchor outside this census.
    const capture = readCapture();
    const captured = againstCapture(producer, capture);
    expect(captured, `the roster's rf version, leaves, dereference leaves and nearest leaves against the landed capture ${CAPTURE}`).toStrictEqual({
      versionEqual: true,
      leavesEqual: true,
      dereferenceLeavesUnserved: [],
      nearestUnlisted: [],
      nearestServedUnserved: [],
    });
    // The capture judge is live: a planted producer reading that departs from the capture in every judged way is reported.
    const unservedLeaf = capture.paths.find(path => !capture.served.includes(path)) ?? "<none>";
    const captureControl = againstCapture({
      installedVersion: `${producer.installedVersion}-control`,
      leaves: producer.leaves.slice(1),
      dereferenceLeaves: [...producer.dereferenceLeaves, unservedLeaf],
      nearestLeaves: [
        { id: "control-unlisted", at: "-", surface: "-", leaf: "census.control-unlisted", servedAtInstalled: false },
        { id: "control-unserved", at: "-", surface: "-", leaf: unservedLeaf, servedAtInstalled: true },
      ],
    }, capture);
    expect(captureControl).toStrictEqual({ versionEqual: false, leavesEqual: false, dereferenceLeavesUnserved: [unservedLeaf], nearestUnlisted: ["control-unlisted"], nearestServedUnserved: ["control-unserved"] });
    return done("C1", {
      src: { floorMet: tree.files >= SRC_FLOOR, anchored: tree.anchored, walkAgreesWithGit: git.agrees, rfLaunches: tree.scan.rfLaunches, renderArgvSeen: tree.scan.renderArgv >= 1, dereferences: tree.scan.dereferences, receipts: tree.scan.receipts, renderIdLiterals: tree.scan.renderIdLiterals },
      positive, emptyTreeMeetsFloor: empty.files >= SRC_FLOOR, gitControls, controls, descriptors: descriptors.map(descriptor => descriptor.id).sort(), descriptorHits, served,
      producer: { installedVersion: producer.installedVersion, leaves: producer.leaves.length, dereferenceLeaves: producer.dereferenceLeaves, uncaught, receiptLeaves, contextShowDetail: producer.contextShowDetail, nearest },
      capture: { path: CAPTURE, version: capture.version, leaves: capture.paths.length, ...captured, control: captureControl },
    });
  },
  C2: async () => {
    // (i) Pi's payload reference is its own digest of the text it holds; a disagreeing stated digest is never adopted or surfaced.
    const stated = `sha256:${"0".repeat(64)}`;
    const disagreeing = project(reading(envelope(result => {
      objectOf(result.output, "output").digest = stated;
    })));
    const agreeing = project(reading(envelope()));
    const serialized = JSON.stringify(disagreeing);
    expect(snapshotOf(disagreeing).nativePayloadRef).toBe(`rf-output:sha256:${sha256(SENTINEL)}`);
    expect(serialized.includes(stated.slice("sha256:".length))).toBe(false);
    expect(disagreeing).toStrictEqual(agreeing);
    // (ii) a malformed revision digest is refused by both readers, never rewritten.
    const malformed: readonly (readonly [string, (result: JsonObject) => void])[] = [
      ["graphUppercase", result => {
        objectOf(result.provenance, "provenance").graph_revision_id = `sha256:${"A".repeat(64)}`;
      }],
      ["graphShort", result => {
        objectOf(result.provenance, "provenance").graph_revision_id = "sha256:abc";
      }],
      ["bundleShort", result => {
        result.bundle_revision_id = "sha256:abc";
      }],
      ["bundleNull", result => {
        result.bundle_revision_id = null;
      }],
    ];
    const refusals = [];
    for (const [name, edit] of malformed) {
      const answer = envelope(edit);
      const log = standInRf(answer);
      const provider = await refusalFrom((await nativeRegistry()).invoke(PREVIEW_ID, { model: "m", task: "t" }, contextOf([PREVIEW_PERMISSION])));
      const observer = refusalSync(() => project(reading(answer)));
      refusals.push({ name, provider: { ...provider, spawns: spawnsOf(log).length }, observer });
    }
    expect(refusals.map(entry => [entry.provider.category, entry.observer.category])).toEqual(malformed.map(() => ["transport", "validation"]));
    return done("C2", {
      statedDigestIgnored: { admitted: true, payloadRef: snapshotOf(disagreeing).nativePayloadRef ?? null, statedSurfaced: serialized.includes(stated.slice("sha256:".length)), equalToAgreeing: true },
      malformed: refusals,
    });
  },
  D1: async () => {
    // (i) repeated projections of one reading are byte-identical and refresh one node.
    const value = reading(envelope());
    const projections = [project(value), project(value), project(value)].map(topology => JSON.stringify(topology));
    const projection = new ObservationProjection();
    const applied = projections.map(json => projection.refresh(snapshotOf(JSON.parse(json) as ReactiveFiberProjectionTopology)));
    const nodes = projection.query({ scope: SCOPE, limit: 10 }).nodes;
    expect(new Set(projections).size).toBe(1);
    expect(applied).toEqual(["applied", "applied", "applied"]);
    expect(nodes.length).toBe(1);
    const node = nodes[0];
    if (node === undefined) throw new Error("no node");
    expect(node.nativeRef.id, "the record is keyed by the reading's operation id").toBe(RF_FIXTURE_OPERATION_ID);
    // (ii) another operation id with identical content, or another principal, is its own node.
    const second = reading(envelope((_result, whole) => {
      whole.operation_id = SECOND_OPERATION_ID;
    }));
    projection.refresh(snapshotOf(project(second)));
    const afterSecondOperation = projection.query({ scope: SCOPE, limit: 10 }).nodes.length;
    const otherScope: ObservationScope = { workspace: ROOT, principal: OTHER_PRINCIPAL };
    projection.refresh(snapshotOf(project(value, hostContext({ scope: otherScope }))));
    const perScope = { census: projection.query({ scope: SCOPE, limit: 10 }).nodes.length, other: projection.query({ scope: otherScope, limit: 10 }).nodes.length };
    expect(afterSecondOperation).toBe(2);
    expect(perScope).toStrictEqual({ census: 2, other: 1 });
    // (iii) the record names no render id, no receipt and no context text.
    const stored = JSON.stringify(node);
    const named = { renderId: stored.includes(RENDER_ID) || RENDER_ID_LITERAL.test(stored), receipt: /receipt/i.test(stored), contextText: stored.includes(SENTINEL) };
    expect(named).toStrictEqual({ renderId: false, receipt: false, contextText: false });
    return done("D1", {
      identical: new Set(projections).size === 1, applied, nodes: nodes.length,
      ref: { ...node.nativeRef, scope: shownRoot(node.nativeRef.scope ?? "") }, afterSecondOperation, perScope, named,
      evidence: prefixes(node.evidenceRefs),
    });
  },
};

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
}
/** This file's registered tests from vitest's task tree (collected before any case runs), in registration order. */
function registeredTests(tasks: readonly RunnerTask[]): Registered[] {
  return tasks.flatMap((child): Registered[] => {
    if (child.type === "test") return [{ name: child.name, mode: child.mode, fails: child.fails === true }];
    if (child.type === "suite") return registeredTests(child.tasks);
    return [];
  });
}

describe("wb-hs2j.4 render-id authority census (RF-REACTIVE-CONTEXT-ASSEMBLY-R4, absent-today leg)", () => {
  it(JUDGED_TITLE, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:3", "C:2", "D:1"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constantsOf(), "a census constant against the roster").toStrictEqual(ROSTER.constants);
    expect(RESIDUALS, "the residual families against the roster").toStrictEqual([...ROSTER.residuals]);
    expect(ROSTER.bead).toBe(BEAD);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = exportedClauses(bead.notes);
    expect(clauses.map(clause => clause.letter), "the filing lists acceptance (a) through (d)").toEqual(["a", "b", "c", "d"]);
    expect(
      ROWS.map(row => ({ letter: row.id.toLowerCase(), opensWithClause: clauses.some(clause => row.label.startsWith(`${clause.text}: `) && clause.letter === row.id.toLowerCase()), pins: row.pins.length })),
      "a judged row against its exported clause: its label opens with the clause, one pin per part",
    ).toStrictEqual(clauses.map(clause => ({ letter: clause.letter, opensWithClause: true, pins: clause.parts.length })));
    expect(ROSTER.rows.map(row => row.pins.map(pin => pin.part)), "each pin's part against the export").toStrictEqual(clauses.map(clause => [...clause.parts]));
    const source = /^Source: ReactiveFiberCLI (\S+) '(.+?)' Merged \(([^)]+)\) (\S+) '(.+)'$/m.exec(bead.notes);
    expect({ citation: source?.[1], quote: source?.[2], mergedId: source?.[3], mergedCitation: source?.[4], mergedQuote: source?.[5] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedId: ROSTER.merged.id,
      mergedCitation: ROSTER.merged.citation,
      mergedQuote: ROSTER.merged.quote,
    });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    const gating = noteLine(bead.notes, "Gating artifact: ");
    const named = [...gating.matchAll(/\brfc-[a-z0-9]+\.[0-9]+\b/g)].map(match => match[0]);
    expect(named, "the nearest leaves the filing names against the roster").toEqual(ROSTER.producer.nearestLeaves.map(leaf => leaf.id));
    expect(ROSTER.producer.nearestLeaves.map(leaf => leaf.at.replace(/^BEADS-2026-10-21\.md:/, ":")).join(",")).toBe(/BEADS-2026-10-21\.md(:\d+,:\d+)/.exec(gating)?.[1]);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(ROSTER.merged.citation.endsWith(`@${ROSTER.producer.programPin.slice(0, 12)}`), "the merged citation pins the same sha").toBe(true);
    // The registered tests (vitest's task tree, collected before any case runs) against the roster's titles, and those against the
    // ROWS-derived titles plus the records title: deleting or skipping only the records case reds here.
    const registered = registeredTests(task.file.tasks);
    expect(registered.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect([...ROSTER.tests], "the roster's titles: the judged set, each pin by its exported part in row order, the records case").toEqual([
      JUDGED_TITLE,
      ...ROWS.flatMap(row => row.pins.map(pin => `${pin} ${rosterPin(pin).part}`)),
      RECORDS_TITLE,
    ]);
    expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`), "every registered test is in run mode and not inverted").toEqual([]);
    // The walker is live: the row suites alone (this case's siblings that are suites) hold exactly the pin cases.
    const rowSuites = (task.suite?.tasks ?? []).filter(child => child.type === "suite");
    expect(registeredTests(rowSuites).map(entry => entry.name), "the row suites hold exactly the pin cases").toEqual(ROWS.flatMap(row => row.pins.map(pin => `${pin} ${rosterPin(pin).part}`)));
    JUDGED_REACHED.push(task.name);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(`${pin} ${rosterPin(pin).part}`, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterPin(pin).witness);
        });
      }
    });
  }

  it(RECORDS_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    // The registered titles against the in-file literals too, as the judged set holds the roster's (wb-h55d F1): the judged case
    // deleted together with its roster title, which the roster compare above cannot see, reds here.
    expect(titles, "the registered titles against the in-file literals: the judged set first, each pin by its exported part in row order, this case last").toEqual([
      JUDGED_TITLE,
      ...ROWS.flatMap(row => row.pins.map(pin => `${pin} ${rosterPin(pin).part}`)),
      RECORDS_TITLE,
    ]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(JUDGED_REACHED, "the judged set reached its end, once (wb-h55d F1: the judged case emptied in place under its title reds here)").toEqual([JUDGED_TITLE]);
  });
});
