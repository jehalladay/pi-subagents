/**
 * wb-hs2j.7 (RF-REACTIVE-CONTEXT-ASSEMBLY-R8, program-triage-2026-10-22, epic wb-hs2j): rf's typed identities stay distinct in
 * Pi. Statement (the bead note's full statement): "Pi shall carry rf's typed identity vocabulary distinctly (component_id,
 * component_instance_id, occurrence_id, graph_revision_id, render_id, transaction_id, session_id, workspace_id), with
 * inter-agent handoffs carrying an explicit render_id copied from an rf envelope, and no Pi surface shall collapse one identity
 * into another or reconstruct a render identity from model output text (no gate: the identities are shipped envelope
 * vocabulary)" - ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:86
 * at 6a251bf73af5, merged with README.md:73. Acceptance (the owner filing's, each clause verbatim in exactly one row label below):
 * "(a) Pi's rf data model types each id separately - a graph_revision_id is never used where a render_id or bundle identity is
 * required; (b) occurrence identity is never conflated with component_id or definition revision in Pi diffs or projections
 * (03-host:78); (c) Pi handoff records carry a render_id copied from an rf envelope with provenance to the producing
 * invocation; (d) no Pi code parses model-generated prose to recover a render id for authoritative use." Posture (the filing's
 * "Not P0" line, its two facts verbatim in row labels): "today's preview envelopes carry render_id null / transaction_id null"
 * and "Pi mints no handoff render ids".
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only). At the program pin (`git show 6a251bf73af5:` on the local
 * ReactiveFiberCLI checkout): 02-swarm-usage-and-command-grammar.md:86 is the quote; README.md:73 (C6 session recover /
 * handoff) reads "For handoff, require explicit render ID rather than reconstructing it from model text."; and
 * 03-host-conformance-performance-and-acceptance.md:78 (Test C-08, nested budget occurrence identity) reads "One nested child
 * rendered twice produces two distinct occurrence identities with separately priced required blocks." The installed rf
 * (0.1.832 by `rf --json --version` result.version; result.provenance.commit_id 2618c211be0d, a descendant of the pin by
 * `git merge-base --is-ancestor`) ships src/reactive_fiber_cli/domain/ids.py and schemas/cli/context.render.schema.json
 * byte-identical to the pin (sha256 in the roster). They give: the LLD 4.1 prefix table PREFIX_KINDS (rfw workspace, rft
 * logical transaction, rfo CLI/application operation, rfr render, rfs session and six more record kinds); render_id
 * ^rfr_[0-9a-z]{22,32}$, null exactly when result.ephemeral is true; transaction_id ^rft_; operation_id ^rfo_; the workspace
 * block's id ^rfw_; result.session_id an rfs_ id, an explicit id or null; component_id the declared-id grammar;
 * component_instance_id `<component_id>:<instance>`; and occurrence identity as the ordinal segment of the candidate key,
 * `<component_instance_id>::<block_key>[::<occurrence>]` (EXPL-DIFF-A14; the first occurrence is bare) - no packaged schema
 * spells an occurrence_id field. A component's definition revision is result.components[].component_revision_id (a digest).
 *
 * Pi's rf identities today. The one rf reading path is the reactivefiber.render.preview provider (providers/reactivefiber.ts),
 * its reader adapter (reactivefiber-observer.ts) and the evidence projection (native-evidence.ts) that the workflow runtime
 * spreads into its node records (src/workflow/runtime.ts). Of the rf identities they read, operation_id names the preview (the
 * adapter's context-preview NativeRef id, the evidence's nativeId), workspace.id rides as rf-workspace:<id>, graph_revision_id
 * as rf-graph:<digest> and sourceRevision, and bundle_revision_id as rf-bundle:<digest> and sourceVersion (owner ruling G-A,
 * wb-973.8); render_id and transaction_id are read only to require null. Two slots are typed bundle-else-graph by their own
 * declarations: the version cohort key of an applied node (ObservationProjection.refresh keys sourceVersion ?? sourceRevision,
 * pinned by wb-973.8's absent-key row) and the evidence's sourceBasis (native-evidence.ts:12). Neither is a bundle-identity
 * slot; the rf-bundle: reference and the snapshot's own sourceVersion are, and the graph digest never fills them. No Pi module
 * reads an rf session, component, instance, definition revision or candidate key; the session_id Pi reads is the Claude SDK's
 * (claude-host.ts and its siblings), and forge's operation_id rides provider-qualified. So (a) holds by construction, (b) and
 * (d) hold by absence, and (c)'s trigger has not fired: Pi admits no rf reading that carries a render id, so no Pi record can
 * carry one.
 *
 * THE WALK: every module below WALK_ROOTS (src, qa, examples, at any depth), parsed by the TypeScript compiler; comments are not
 * read. A judged module holding the literal "context.render" is an rf READER (measured: the three modules above).
 * OUTSIDE ANCHORS OF THE WALK (wb-mzoc F1: count floors alone let a narrowed walk pass, H05+P05): A1 holds the walked set to
 * Git's own list of the checkout (LISTING: tracked, and untracked but not ignored; a path missing on disk or no regular file is
 * left out), each listed path classed a module by the TypeScript compiler's own extension forms (ts.Extension minus its two
 * non-script forms), never by MODULE_EXTENSIONS: no listed module below WALK_ROOTS goes unwalked, no walked module is unlisted,
 * and every listed module outside WALK_ROOTS sits below an unjudged root (UNJUDGED_ROOTS: test, and the repository root's own
 * files); src is held a second time to the root files of the tsconfig.json program. The floors stay as the empty-walk guard.
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a) and the first posture fact. A1 the readers' identity table: which rf identity names each READER spells
 *    (exactly the measured sets; the filing's "Pi's own render_id / transaction_id / bundle_revision_id reads" among them),
 *    every read of render_id or transaction_id an operand of a comparison with null, the one member declaring either typed
 *    null, the rf reference prefixes the READERS mint (none naming a render, transaction, session, component or occurrence),
 *    and no module outside the READERS spelling an (a)-family name. A2 the slot map: each identity value of a preview lands in
 *    exactly its own slots of the adapter's topology and the evidence projection, with and without a bundle; without one the
 *    graph digest fills no bundle slot, and the cohort fallback is recorded as the slot's own typing. A3 render and transaction
 *    identity stay null-only: the adapter (validation) and the native provider through a hermetic stub rf (transport) refuse
 *    a reading stating either, and an admitted reading has no render- or transaction-typed key or reference. A4 the
 *    namesakes and the identities Pi does not read: an rf session id surfaces nowhere and no READER reads session_id while the
 *    Claude SDK frames' session_id is read outside them; Pi's workspace path, the authorized rf root and the rf workspace id
 *    stay three slots; forge's and rf's operation ids stay provider-qualified.
 *  B, acceptance (b). B1 no judged module spells an rf component, instance, definition-revision, candidate-key or occurrence
 *    field (B_FAMILY, from the filing's names and the measured record fields), and no READER spells the word occurrence. B2
 *    the C-08 shape (CONSTRUCTED: one nested child rendered twice, two candidate keys of one instance, one definition
 *    revision) changes no identity slot of the topology and nothing of the evidence, none of its values surfaces, the applied
 *    node stays the operation's, and Pi has no diff projection: a context.diff reading is refused and projects nothing.
 *  C, acceptance (c) and the second posture fact. C1 absent today: render_id is spelled only by the two READERS' null checks
 *    and the adapter's refusal and note texts, no module declares a render-id member, and the evidence projection of a
 *    committed render's envelope carries no render id and keeps the operation id as nativeId. C2 the provenance a reading does
 *    carry: the snapshot's source id and the evidence's nativeId are the envelope's operation_id byte for byte, the trace is
 *    exactly the host's invocation id (absent without one), the grouping edge runs from exactly the host's operation
 *    reference, and a document naming another operation or invocation moves none of them.
 *  D, acceptance (d). D1 no judged module spells the rfr_ prefix, the rf id family grammar or a render-naming pattern in any
 *    literal or regular expression; the rf prefixes spelled anywhere are rfo_ and rfw_ in the two READERS that validate them;
 *    and every read of rf document text is a typeof or a sha256 digest. D2 a document of render-id-shaped prose moves only the
 *    payload digest and no rfr_ token reaches the topology or the evidence.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness (each carries its pin id), the scan constants, the derived vocabularies, the residual families and the registered
 * test titles are held to the out-of-file roster (test/fixtures/rf-identity-distinctness-roster.json). OUTSIDE ANCHOR: the
 * owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-hs2j.7): each acceptance clause and each posture
 * fact sit verbatim in exactly one row label, every row carries one of them, the statement's eight identity names equal both
 * the quote's and FAMILY_OF's, and its statement, quotes, citations and shipped-reads list equal the roster's, so a row removed
 * from every literal of this file and the roster still reds. The bead row anchors rows, clauses and identity names, not pins:
 * see R-PIN-HOLLOW below.
 * REGISTRATION (wb-mzoc F4): the judged-set case runs first and reads this file's registered tests (vitest's task tree) as
 * collected - each roster title once, in roster order, itself first, every one (the records case included) in run mode and
 * not inverted - so a records case skipped, set to todo, inverted or deleted reds it before the records case could run.
 * RECORDS: the last case walks the same tree after the rest ran: each roster title once, in order, in run mode, not inverted,
 * ran; every pin's case reached its end (REACHED); every witness compares equal to the roster a second time (MEASURED); and
 * every pin's case compared its witness after its pinned number of assertions (COUNTED, `<pin>:<count>` held to the roster's
 * counted list; wb-mzoc F2), so a case that returns its roster witness without running its judges reds the record (H02).
 * CONTROLS (wb-mzoc F3): before the roster compare each pin's runner reads its witness's controls - a control named a quiet row
 * (QUIET_ROWS, by residual family) or an accepted form (ACCEPTED_FORMS) must read quiet, every other control must fire (a count
 * of 1 or more, a non-empty list, a ratio with a read) - so a positive control zeroed in this file and the roster together
 * still reds (X-WITNESS).
 * RESIDUALS (named families, each with pinned quiet rows: QUIET_ROWS for the controls, the judged-set case for R-PIN-HOLLOW):
 * R-COMPOSED a name, prefix or pattern composed at run time (A1 composedName, B1 composedField, D1 composedPrefix); R-COMMENT a
 * comment naming one (A1, B1, D1 comment); R-ALIAS document text read through an alias of the output object outside the
 * READERS (D1 aliasOutsideReaders); R-GENERIC-WORD the bare word occurrence outside the READERS (B1 occurrenceOutsideReaders);
 * R-NAMESAKE session_id outside the READERS and the camelCase sessionId, workspaceId and operationId, Pi's own names for its own
 * and other producers' ids (A4 sessionOutsideReaders, A1 camelNamesake); R-RENAMED a member or field holding an identity under
 * another name (C1 renamedMember, B1 renamedField); R-OUTSIDE a module below an unjudged root - test, whose helpers and
 * fixtures plant rf envelopes, and the repository root's own config modules - is not judged (B1 outsideRoots), while a module
 * below any other top-level root reds A1; R-PIN-HOLLOW a pin removed from ROWS, the frozen literal, IMPL and the roster
 * together (its counted entry and PIN_HOLLOW_MEMBERS included): the bead-row anchor reads row labels, so it cannot see one (its
 * quiet row pins the unseen pins, A1 to D2, beside a liveness reading: removing any row is seen).
 * NOT CLAIMED (coordinated hollows no anchor outside this file and its roster sees): a control changed or reclassed together
 * with its roster value and its quiet-row or accepted-form entry, or a ratio control's compared count changed with its roster
 * value (the control reading checks its read count only); the walk and the Git listing narrowed together below qa or examples
 * (below src the tsconfig.json program still sees the .ts modules), or a root moved from WALK_ROOTS to UNJUDGED_ROOTS with its
 * floor; the judged-set case and the records case dropped from the run together, the records case skipping itself at run
 * time, or the file's describe skipped - nothing in the file then runs to see it (the collector's added-line marker scan
 * refuses the skip-call spelling, not the skipIf or runIf forms).
 * Display paths added: none. Test-only: two spawns - A1's read-only git ls-files listing of the checkout, and A3's hermetic stub
 * rf (tracked scratch, the only PATH entry, an absolute-node shebang), so no installed rf ever runs; src, qa, examples,
 * tsconfig.json and the bead export are only read.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it, type RunnerTask, type RunnerTestCase } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/rf-identity-distinctness-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.7";
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every module below them, at any depth). */
const WALK_ROOTS = ["src", "qa", "examples"];
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the module count measured at base bf06b20 (src 115, qa 62, examples 6). The floors are the empty-walk
 * guard only; the walked set itself is held to the outside listings below (wb-mzoc F1). */
const FLOORS = { src: 100, qa: 55, examples: 5 };
/** The walk's outside anchor (wb-mzoc F1): Git's own list of the checkout - tracked, and untracked but not ignored. */
const LISTING = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"];
/** The TypeScript compiler's extension forms (ts.Extension) that name no script. Every other form classes a listed path as a
 * module by the compiler's own vocabulary, so the listing is never classed by MODULE_EXTENSIONS, the walk's own predicate. */
const NON_SCRIPT_FORMS: readonly string[] = [ts.Extension.Json, ts.Extension.TsBuildInfo];
/** The top-level roots whose modules Git lists but the census does not judge: test (its helpers and fixtures plant rf
 * envelopes) and "." (the repository root's own files, the vitest configs). A listed module below any other root reds A1. */
const UNJUDGED_ROOTS = [".", "test"];
/** The TypeScript program whose root files are a second outside listing of src (its include is src). */
const PROGRAM_CONFIG = "tsconfig.json";
/** The command every Pi rf envelope reader checks: a judged module holding it as a folded literal is an rf READER. */
const RENDER_COMMAND = "context.render";
const CAPABILITY = "reactivefiber.render.preview";
/** The family of each identity the filing names: (a) the data-model identities, (b) the component/occurrence identities, and
 * the namesake rf shares with another producer Pi reads (the Claude SDK's session_id). */
const FAMILY_OF: Readonly<Record<string, "a" | "b" | "namesake">> = {
  component_id: "b",
  component_instance_id: "b",
  occurrence_id: "b",
  graph_revision_id: "a",
  render_id: "a",
  transaction_id: "a",
  session_id: "namesake",
  workspace_id: "a",
};
/** The rf identities Pi's readers carry beside the filing's eight: the operation id names the preview, and the bundle is
 * acceptance (a)'s "bundle identity". */
const CARRIED = ["operation_id", "bundle_revision_id"];
/** The identity word forge shares with rf (forge.gate.status operation_id), judged beside the Claude SDK's session_id. */
const PRODUCER_NAMESAKES = ["operation_id"];
/** The two identities Pi requires null in every reading it admits. */
const NULL_ONLY = ["render_id", "transaction_id"];
/** The rf workspace id: the `id` of the envelope's workspace block. */
const WORKSPACE_ID_READ = "workspace.id";
/** An rf evidence reference prefix as the reader adapter mints it: rf-<kind>: ... */
const REF_PREFIX = /^rf-[a-z-]+:/;
/** What a render-, transaction-, session-, component- or occurrence-typed key or reference would be named. */
const IDENTITY_WORDS = /render|transaction|session|component|occurrence|candidate/i;
/** A regular expression or RegExp argument naming render ids. */
const RENDER_PATTERN = /render|rfr/i;
/** The rf id family grammar (ids.py ID_PATTERN) as a source spelling. */
const FAMILY_GRAMMAR = "rf[a-z]_";
const RENDER_PREFIX = "rfr_";
/** The non-reader module whose Claude SDK frames carry the session_id Pi does read (the non-vacuity anchor of A4). */
const CLAUDE_ANCHOR = "src/workbench/claude-host.ts";
/** The evidence call the workflow runtime builds its node records from. */
const RUNTIME = "src/workflow/runtime.ts";
/** The residual families the controls pin, each with its quiet rows (`<pin>.<control>`): a control named here must read quiet,
 * since its residual form escapes the judge; every other control of a witness must fire (wb-mzoc F3). */
const QUIET_ROWS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["A1.composedName", "B1.composedField", "D1.composedPrefix"],
  "R-COMMENT": ["A1.comment", "B1.comment", "D1.comment"],
  "R-ALIAS": ["D1.aliasOutsideReaders"],
  "R-GENERIC-WORD": ["B1.occurrenceOutsideReaders"],
  "R-NAMESAKE": ["A4.sessionOutsideReaders", "A1.camelNamesake"],
  "R-RENAMED": ["C1.renamedMember", "B1.renamedField"],
  "R-OUTSIDE": ["B1.outsideRoots"],
};
/** The one quiet control that is no residual: a form the judge accepts (D1's sha256 digest of the document text). */
const ACCEPTED_FORMS = ["D1.textDigest"];
/** R-PIN-HOLLOW: the pins whose removal from every literal (ROWS, the frozen literal, IMPL, the roster) the bead-row anchor
 * cannot see - its quiet row in the judged-set case recomputes them. */
const PIN_HOLLOW_MEMBERS = ["A1", "A2", "A3", "A4", "B1", "B2", "C1", "C2", "D1", "D2"];
const RESIDUAL_FAMILIES = [...Object.keys(QUIET_ROWS), "R-PIN-HOLLOW"];
/** Names a member holding a render id would carry: the producer's spelling, its camelCase and the reference forms. */
const RENDER_MEMBERS = ["render_id", "renderId", "renderID", "render_ref", "renderRef"];

/** The fixture workspaces: the host's own (the reading's root), a Pi workspace and an rf root the host authorizes apart. */
const ROOT = "/fixture/rf-workspace";
const PI_ROOT = "/fixture/pi-workspace";
const RF_ROOT = "/fixture/rf-root";
const PRINCIPAL = "user:fixture";
const HOST: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: PRINCIPAL },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** One obviously fake value per identity, each in its producer grammar and none a substring of another. */
const body = (fill: string): string => fill.repeat(26);
const OPERATION = `rfo_${body("o")}`;
const SECOND_OPERATION = `rfo_${body("p")}`;
const PROSE_OPERATION = `rfo_${body("q")}`;
const WORKSPACE = `rfw_${body("w")}`;
const RENDER = `rfr_${body("r")}`;
const PROSE_RENDER = `rfr_${body("m")}`;
const TRANSACTION = `rft_${body("t")}`;
const SESSION = `rfs_${body("s")}`;
const GRAPH = `sha256:${"a1".repeat(32)}`;
const BUNDLE = `sha256:${"b2".repeat(32)}`;
const REVISION = `sha256:${"d4".repeat(32)}`;
const IDEMPOTENCY = `sha256:${"e5".repeat(32)}`;
const POLICY = `sha256:${"f6".repeat(32)}`;
/** The C-08 shape (03-host:78): one nested child component rendered twice - two occurrences of one block key of one instance. */
const CHILD = "demo.parent.child";
const INSTANCE = `${CHILD}:main`;
const FIRST_OCCURRENCE = `${INSTANCE}::required`;
const SECOND_OCCURRENCE = `${FIRST_OCCURRENCE}::2`;
const INVOCATION = "inv-fixture-1";
const OPERATION_REF = { provider: "workflow", type: "node-call", id: "call-fixture-1", scope: ROOT };
/** Every fixture value by name, so a witness names the value it located instead of spelling it. */
const VALUE_NAMES: Readonly<Record<string, string>> = {
  OPERATION,
  SECOND_OPERATION,
  PROSE_OPERATION,
  WORKSPACE,
  RENDER,
  PROSE_RENDER,
  TRANSACTION,
  SESSION,
  GRAPH,
  BUNDLE,
  REVISION,
  ROOT,
  PI_ROOT,
  RF_ROOT,
  INVOCATION,
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) Pi's rf data model types each id separately - a graph_revision_id is never used where a render_id or bundle identity is required: each rf identity Pi's three readers read lands in its own typed slot (the operation id the preview, rf-workspace:, rf-graph: and sourceRevision, rf-bundle: and sourceVersion), the graph digest fills no bundle slot, and today's preview envelopes carry render_id null / transaction_id null, so no slot is render- or transaction-typed and neither id is ever stood in for",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) occurrence identity is never conflated with component_id or definition revision in Pi diffs or projections (03-host:78): absent today - no module spells an rf component, instance, definition revision, candidate key or occurrence field, Pi issues no diff, and a preview carrying the C-08 shape (one nested child rendered twice) projects neither occurrence, the component nor its revision",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) Pi handoff records carry a render_id copied from an rf envelope with provenance to the producing invocation: absent today - Pi mints no handoff render ids, admits no reading that carries one and declares no render-id member; what a reading does carry, its rf operation id, is copied from the envelope byte for byte with the host invocation and the invoking operation as provenance",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(d) no Pi code parses model-generated prose to recover a render id for authoritative use: no module spells the rf render-id prefix, the rf id family grammar or a render-naming pattern, rf document text is read only to type-check and digest it, and render-id-shaped prose in a document reaches no projected or evidence field",
    pins: ["D1", "D2"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Producer {
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly prefixKinds: { readonly [prefix: string]: string };
  readonly grammar: { readonly [field: string]: string };
  readonly recordFields: { readonly [record: string]: readonly string[] };
  readonly occurrenceQuote: string;
  readonly occurrenceCitation: string;
  readonly digests: { readonly [file: string]: string };
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly mergedQuote: string;
  readonly mergedCitation: string;
  readonly identities: readonly string[];
  readonly shippedReads: readonly string[];
  readonly posture: readonly string[];
  readonly producer: Producer;
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** Each pin's assertion count when its case compared its witness, in row order: `<pin>:<count>` (wb-mzoc F2). */
  readonly counted: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  if (!isObject(producer.programPin) || !isObject(producer.recordFields)) throw new Error("roster producer needs programPin and recordFields");
  const records = producer.recordFields;
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    mergedQuote: text(raw.mergedQuote, "mergedQuote"),
    mergedCitation: text(raw.mergedCitation, "mergedCitation"),
    identities: strings(raw.identities, "identities"),
    shippedReads: strings(raw.shippedReads, "shippedReads"),
    posture: strings(raw.posture, "posture"),
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      rfCommit: text(producer.rfCommit, "producer.rfCommit"),
      programPin: { repo: text(producer.programPin.repo, "producer.programPin.repo"), sha: text(producer.programPin.sha, "producer.programPin.sha") },
      prefixKinds: stringMap(producer.prefixKinds, "producer.prefixKinds"),
      grammar: stringMap(producer.grammar, "producer.grammar"),
      recordFields: Object.fromEntries(Object.entries(records).map(([record, fields]) => [record, strings(fields, `producer.recordFields.${record}`)])),
      occurrenceQuote: text(producer.occurrenceQuote, "producer.occurrenceQuote"),
      occurrenceCitation: text(producer.occurrenceCitation, "producer.occurrenceCitation"),
      digests: stringMap(producer.digests, "producer.digests"),
    },
    scan: scan as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
    counted: strings(raw.counted, "counted"),
  };
}

const ROSTER = readRoster();

const camel = (name: string): string => name.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
interface Vocabularies {
  /** Acceptance (a)'s names: the filing's data-model identities and the bundle, judged everywhere outside the READERS. */
  readonly aFamily: readonly string[];
  /** Acceptance (b)'s names: the filing's component/occurrence identities and the measured record identity fields. */
  readonly bFamily: readonly string[];
  /** The words rf shares with another producer Pi reads. */
  readonly namesakes: readonly string[];
  /** Every name a READER's identity table reports. */
  readonly readerTable: readonly string[];
  /** The camelCase spellings judged beside the snake_case ones (rf-only names; the namesakes' camelCase is Pi's own). */
  readonly camelForms: readonly string[];
  /** The rf id prefixes of the producer's table, each with its separator. */
  readonly prefixes: readonly string[];
}
/** The judged vocabularies, derived from the filing's names (FAMILY_OF, held to the bead row) and the measured producer facts:
 * the (b) family adds every block and component record field that names an identity (an `_id` or `_key` field). */
function vocabularies(producer: Producer): Vocabularies {
  const family = (kind: "a" | "b" | "namesake"): string[] => Object.keys(FAMILY_OF).filter(name => FAMILY_OF[name] === kind);
  const records = [...(producer.recordFields.blocks ?? []), ...(producer.recordFields.components ?? [])].filter(field => /_(?:id|key)$/.test(field));
  const aFamily = [...new Set([...family("a"), "bundle_revision_id"])].sort();
  const bFamily = [...new Set([...family("b"), ...records])].sort();
  const namesakes = [...new Set([...family("namesake"), ...PRODUCER_NAMESAKES])].sort();
  return {
    aFamily,
    bFamily,
    namesakes,
    readerTable: [...new Set([...aFamily, ...bFamily, ...namesakes, ...CARRIED])].sort(),
    camelForms: [...aFamily.filter(name => name !== "workspace_id"), ...bFamily].map(camel).sort(),
    prefixes: Object.keys(producer.prefixKinds)
      .map(prefix => `${prefix}_`)
      .sort(),
  };
}
const VOCABULARY = vocabularies(ROSTER.producer);
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordIn = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9_])(?:${words.map(escaped).join("|")})(?![A-Za-z0-9_])`);
const A_WORD = wordIn(VOCABULARY.aFamily);
const B_WORD = wordIn(VOCABULARY.bFamily);
const PREFIX_WORD = new RegExp(`(?<![A-Za-z0-9])(?:${VOCABULARY.prefixes.map(escaped).join("|")})`, "g");
/** A producer grammar from the roster, compiled for JavaScript (Python's named groups spelled the JavaScript way). */
const grammar = (field: string): RegExp => new RegExp((ROSTER.producer.grammar[field] ?? "(?!)").replace(/\(\?P</g, "(?<"));

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
/** A path the census judges: a module below one of WALK_ROOTS. */
const judgedPath = (path: string): boolean => isModule(path) && WALK_ROOTS.some(root => path.startsWith(`${root}/`));

interface Walk {
  readonly modules: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every module below each of WALK_ROOTS, in name order, repository-relative with "/" separators; symlinks are recorded, never followed. */
function walkRoots(): Walk {
  const modules: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(REPO, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      const rel = posix(relative(REPO, path));
      if (entry.isSymbolicLink()) symlinks.push(rel);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && judgedPath(rel)) modules.push(rel);
    }
  };
  for (const root of WALK_ROOTS) visit(join(REPO, root));
  return { modules, symlinks, unreadable };
}

const regularFile = (path: string): boolean => {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
};
/** Git's own list of the checkout's files (LISTING), repository-relative with "/" separators, in name order; a listed path that
 * is missing on disk or is no regular file (a symlink, a submodule) is left out. */
function gitListing(): string[] {
  const listing = spawnSync("git", LISTING, { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (listing.status !== 0) throw new Error(`git ${LISTING.join(" ")} failed: ${listing.stderr ?? ""}${listing.error?.message ?? ""}`);
  return [...new Set(listing.stdout.split("\0"))].filter(path => path.length > 0 && regularFile(join(REPO, path))).sort();
}
/** The script forms of the TypeScript compiler's extension vocabulary; a path ending in one is a module by the compiler. */
const COMPILER_FORMS: readonly string[] = Object.values(ts.Extension).filter(form => !NON_SCRIPT_FORMS.includes(form));
const compilerModule = (path: string): boolean => COMPILER_FORMS.some(form => path.toLowerCase().endsWith(form));
/** A path's top-level root: its first segment, or "." for a file at the repository root. */
const rootOf = (path: string): string => (path.includes("/") ? path.slice(0, path.indexOf("/")) : ".");
/** The root files of the TypeScript program PROGRAM_CONFIG defines, repository-relative, in name order. */
function programFiles(): string[] {
  const config = ts.readConfigFile(join(REPO, PROGRAM_CONFIG), ts.sys.readFile);
  if (config.error !== undefined) throw new Error(`${PROGRAM_CONFIG} does not parse`);
  return ts
    .parseJsonConfigFileContent(config.config, ts.sys, REPO)
    .fileNames.map(path => posix(relative(REPO, path)))
    .sort();
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
/** The leading literal text of an argument: a folded literal, else the leftmost literal piece of a concatenation or the head
 * of a template, so a pattern composed after its first piece (`"rfr_" + body`) still shows it. */
function leadingText(node: ts.Node): string | undefined {
  const folded = fold(node);
  if (folded !== undefined) return folded;
  if (ts.isParenthesizedExpression(node)) return leadingText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return leadingText(node.left);
  if (ts.isTemplateExpression(node)) return node.head.text;
  return undefined;
}
/** The last name of a member chain (`a.b.output` and `a["output"]` read output), or nothing for any other expression. */
function tailName(node: ts.Expression): string | undefined {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return fold(node.argumentExpression);
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) return tailName(node.expression);
  return undefined;
}
/** True when a call chain below `node` starts at createHash(). */
function startsAtCreateHash(node: ts.Expression): boolean {
  let current: ts.Expression = node;
  while (ts.isCallExpression(current) || ts.isPropertyAccessExpression(current)) {
    if (ts.isCallExpression(current) && ts.isIdentifier(current.expression) && current.expression.text === "createHash") return true;
    current = current.expression;
  }
  return false;
}
/** The node with its parenthesized wrappers, and the first parent that is not one. */
function unwrapped(node: ts.Node): { child: ts.Node; parent: ts.Node } {
  let child: ts.Node = node;
  let parent: ts.Node = node.parent;
  while (ts.isParenthesizedExpression(parent)) {
    child = parent;
    parent = parent.parent;
  }
  return { child, parent };
}
const EQUALITY = new Set([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
/** True when the read is one operand of an (in)equality whose other operand is the literal null. */
function comparedWithNull(node: ts.Node): boolean {
  const { child, parent } = unwrapped(node);
  if (!ts.isBinaryExpression(parent) || !EQUALITY.has(parent.operatorToken.kind)) return false;
  const other = parent.left === child ? parent.right : parent.left;
  return other.kind === ts.SyntaxKind.NullKeyword;
}

interface KeyRead {
  readonly name: string;
  readonly nullCompared: boolean;
}
interface TextRead {
  readonly object: string;
  readonly use: "typeof" | "digest" | "other";
}
interface ModuleReading {
  readonly identifiers: readonly string[];
  readonly literals: readonly string[];
  readonly regexes: readonly string[];
  readonly reads: readonly KeyRead[];
  readonly members: readonly string[];
  readonly nullTypedMembers: readonly string[];
  readonly textReads: readonly TextRead[];
  readonly workspaceIdReads: number;
  readonly nativeEvidenceCalls: number;
}
/** One module, parsed under its own script kind: its identifiers, folded literals and regular expressions (literals and RegExp
 * arguments), the names it reads by property access, literal element access or object binding (each marked when it is an
 * operand of a comparison with null), the member names it declares, its reads of a `text` field, its reads of an rf
 * workspace block's `id` and its calls of nativeEvidence. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const identifiers: string[] = [];
  const literals: string[] = [];
  const regexes: string[] = [];
  const reads: KeyRead[] = [];
  const members: string[] = [];
  const nullTypedMembers: string[] = [];
  const textReads: TextRead[] = [];
  let workspaceIdReads = 0;
  let nativeEvidenceCalls = 0;
  const classify = (node: ts.Node): TextRead["use"] => {
    const { child, parent } = unwrapped(node);
    if (ts.isTypeOfExpression(parent)) return "typeof";
    if (ts.isCallExpression(parent) && parent.arguments.length === 1 && parent.arguments[0] === child && ts.isPropertyAccessExpression(parent.expression)) {
      const callee = parent.expression;
      if (callee.name.text === "update" && startsAtCreateHash(callee.expression)) return "digest";
    }
    return "other";
  };
  const memberName = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name) ? name.text : undefined);
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) identifiers.push(node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) literals.push(node.text);
    else if (ts.isRegularExpressionLiteral(node)) regexes.push(node.text);
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) literals.push(folded);
    }
    if ((ts.isNewExpression(node) || ts.isCallExpression(node)) && ts.isIdentifier(node.expression) && node.expression.text === "RegExp") {
      const first = node.arguments?.[0];
      const pattern = first === undefined ? undefined : leadingText(first);
      if (pattern !== undefined) regexes.push(pattern);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "nativeEvidence") nativeEvidenceCalls += 1;
    if (ts.isPropertyAccessExpression(node)) {
      reads.push({ name: node.name.text, nullCompared: comparedWithNull(node) });
      if (node.name.text === "text") textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
      if (node.name.text === "id" && tailName(node.expression) === "workspace") workspaceIdReads += 1;
    }
    if (ts.isElementAccessExpression(node)) {
      const key = fold(node.argumentExpression);
      if (key !== undefined) {
        reads.push({ name: key, nullCompared: comparedWithNull(node) });
        if (key === "text") textReads.push({ object: tailName(node.expression) ?? "", use: classify(node) });
      }
    }
    if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const named = node.propertyName ?? node.name;
      const key = ts.isIdentifier(named) || ts.isStringLiteral(named) ? named.text : undefined;
      if (key !== undefined) {
        reads.push({ name: key, nullCompared: false });
        if (key === "text") {
          const declaration = node.parent.parent;
          const initializer = ts.isVariableDeclaration(declaration) ? declaration.initializer : undefined;
          textReads.push({ object: initializer === undefined ? "" : (tailName(initializer) ?? ""), use: "other" });
        }
      }
    }
    if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node) || ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) {
      const name = memberName(node.name);
      if (name !== undefined) {
        members.push(name);
        if (ts.isPropertySignature(node) && node.type !== undefined && ts.isLiteralTypeNode(node.type) && node.type.literal.kind === ts.SyntaxKind.NullKeyword) nullTypedMembers.push(name);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { identifiers, literals, regexes, reads, members, nullTypedMembers, textReads, workspaceIdReads, nativeEvidenceCalls };
}

const isReader = (reading: ModuleReading): boolean => reading.literals.includes(RENDER_COMMAND);
/** The names of `vocabulary` a module spells: as an identifier or as an exact literal, plus workspace.id when it reads one. */
function spelled(reading: ModuleReading, vocabulary: readonly string[]): string[] {
  const names = [...reading.identifiers, ...reading.literals].filter(name => vocabulary.includes(name));
  return [...new Set([...names, ...(reading.workspaceIdReads > 0 ? [WORKSPACE_ID_READ] : [])])].sort();
}
/** Every identifier or exact literal of `words`, and every folded literal holding one as a whole word. */
const wholeWordHits = (path: string, reading: ModuleReading, words: readonly string[], word: RegExp): string[] => [
  ...reading.identifiers.filter(name => words.includes(name)).map(name => `${path}: identifier ${name}`),
  ...reading.literals.filter(value => word.test(value)).map(value => `${path}: literal ${value.slice(0, 80)}`),
];
/** Of each null-only name a module reads: `<null-compared reads>/<reads>`. */
function nullOnlyReads(reading: ModuleReading): { [name: string]: string } {
  return Object.fromEntries(
    NULL_ONLY.map(name => {
      const of = reading.reads.filter(read => read.name === name);
      return [name, `${of.filter(read => read.nullCompared).length}/${of.length}`];
    }),
  );
}
/** The rf reference prefixes a module mints: its literal pieces of the rf-<kind>: form, up to the first colon. */
const refPrefixes = (reading: ModuleReading): string[] =>
  [...new Set(reading.literals.filter(value => REF_PREFIX.test(value)).map(value => value.slice(0, value.indexOf(":") + 1)))].sort();
/** The rf id prefixes a module spells in a literal or a regular expression. */
const idPrefixes = (reading: ModuleReading): string[] => [...new Set([...reading.literals, ...reading.regexes].flatMap(value => value.match(PREFIX_WORD) ?? []))].sort();
/** D1's judge for one module: a literal or pattern spelling the render prefix or the family grammar, or a pattern naming render. */
function renderPatternFindings(path: string, reading: ModuleReading): string[] {
  return [
    ...[...reading.literals, ...reading.regexes].filter(value => value.includes(RENDER_PREFIX)).map(value => `${path}: render prefix in ${value.slice(0, 60)}`),
    ...[...reading.literals, ...reading.regexes].filter(value => value.includes(FAMILY_GRAMMAR)).map(value => `${path}: family grammar in ${value.slice(0, 60)}`),
    ...reading.regexes.filter(value => RENDER_PATTERN.test(value)).map(value => `${path}: render pattern ${value.slice(0, 60)}`),
  ];
}
/** D1's text judge: every text read in a READER, and every output.text read anywhere, that is neither a typeof nor a digest. */
function textFindings(path: string, reading: ModuleReading): string[] {
  const reader = isReader(reading);
  return reading.textReads.filter(read => read.use === "other" && (reader || read.object === "output")).map(read => `${path}: ${read.object}.text`);
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly readers: string[];
  /** Git's own list of the checkout's files (gitListing): the walk's outside anchor. */
  readonly listing: string[];
  /** The root files of the tsconfig.json program (programFiles): the second outside listing of src. */
  readonly program: string[];
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  if (live === undefined) {
    const walk = walkRoots();
    const modules = new Map<string, ModuleReading>();
    for (const path of walk.modules) modules.set(path, readModule(path, readFileSync(join(REPO, path), "utf8")));
    const readers = [...modules].filter(([, reading]) => isReader(reading)).map(([path]) => path);
    live = { walk, modules, readers, listing: gitListing(), program: programFiles() };
  }
  return live;
}
interface WalkAnchor {
  readonly unwalked: string[];
  readonly unlisted: string[];
  readonly outsideRoots: string[];
  readonly programUnwalked: string[];
}
/** The walk held to its outside listings (wb-mzoc F1): the modules Git lists below WALK_ROOTS that the walk did not read, the
 * modules the walk read that Git does not list, the roots of the modules Git lists outside WALK_ROOTS, and the root files of
 * the tsconfig.json program the walk did not read. A listed path is a module by the compiler's forms, never by the walk's own
 * predicate, and its root is its first segment, never a prefix test the walk shares. */
function walkAnchor(tree: TreeReading): WalkAnchor {
  const walked = new Set(tree.walk.modules);
  const listed = tree.listing.filter(compilerModule);
  const listedSet = new Set(listed);
  const inRoots = (path: string): boolean => WALK_ROOTS.includes(rootOf(path));
  return {
    unwalked: listed.filter(path => inRoots(path) && !walked.has(path)),
    unlisted: tree.walk.modules.filter(path => !listedSet.has(path)),
    outsideRoots: [...new Set(listed.filter(path => !inRoots(path)).map(rootOf))].sort(),
    programUnwalked: tree.program.filter(path => !walked.has(path)),
  };
}
const below = (tree: TreeReading, root: string): number => tree.walk.modules.filter(path => path.startsWith(`${root}/`)).length;
const floorsMet = (tree: TreeReading): boolean => below(tree, "src") >= FLOORS.src && below(tree, "qa") >= FLOORS.qa && below(tree, "examples") >= FLOORS.examples;
const readingOf = (tree: TreeReading, path: string): ModuleReading => {
  const reading = tree.modules.get(path);
  if (reading === undefined) throw new Error(`the walk read no ${path}`);
  return reading;
};
/** A snippet read as a READER module: it carries the render command literal the readers check. */
const asReader = (snippet: string): string => `const COMMAND = "${RENDER_COMMAND}";\n${snippet}`;
const snippet = (source: string): ModuleReading => readModule("c.ts", source);

/** The full-shape fixture with this census's identity values: its operation, workspace, graph digest and bundle. */
function previewSource(adjust: (result: JsonObject) => void = () => {}, envelope: (source: JsonObject) => void = () => {}, root = ROOT): JsonObject {
  const source = fullShapeRf(root);
  source.operation_id = OPERATION;
  source.workspace = { id: WORKSPACE, root };
  const result = source.result;
  if (!isObject(result) || !isObject(result.provenance)) throw new Error("the fixture result must carry a provenance object");
  const provenance = result.provenance as JsonObject;
  provenance.graph_revision_id = GRAPH;
  (result as JsonObject).bundle_revision_id = BUNDLE;
  adjust(result as JsonObject);
  envelope(source);
  return source;
}
/** A preview reading (the provider's output shape) of previewSource. */
function previewReading(adjust: (result: JsonObject) => void = () => {}, envelope: (source: JsonObject) => void = () => {}, root = ROOT): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: root, source: previewSource(adjust, envelope, root) } as JsonValue;
}
function withText(document: string): (result: JsonObject) => void {
  return result => {
    result.output = { text: document, size_bytes: Buffer.byteLength(document), digest: `sha256:${"c3".repeat(32)}`, path: null };
  };
}
/** The C-08 records (CONSTRUCTED from the producer's field lists): two occurrences of one block key of one nested child
 * instance, each separately priced and judged, its one definition revision, and an effect row naming the instance. */
function nestedChildRecords(result: JsonObject): void {
  const block = (index: number, key: string): JsonObject => ({
    final_index: index,
    candidate_key: key,
    component_id: CHILD,
    token_cost: { kind: "estimated", tokens: 2050 },
    token_cost_kind: "estimated",
  });
  const decision = (key: string): JsonObject => ({
    candidate_key: key,
    necessity_class: "always",
    include: true,
    reason: "pinned_required",
    estimated_tokens: 2050,
    metadata: {},
    policy_revision_id: POLICY,
    judge_id: "host.default",
    judge_kind: "host_default",
    necessity_class_raw: "always",
    fallback_used: false,
    failure_mode: null,
  });
  result.blocks = [block(0, FIRST_OCCURRENCE), block(1, SECOND_OCCURRENCE)];
  result.necessity = [decision(FIRST_OCCURRENCE), decision(SECOND_OCCURRENCE)];
  result.components = [{ component_instance_id: INSTANCE, component_id: CHILD, component_revision_id: REVISION, status: "ok", source_unavailable: [] }];
  result.effects = [
    {
      render_id: null,
      component_instance_id: INSTANCE,
      effect_id: "notify-parent",
      effect_type: "notify",
      status: "not_executed",
      reason_codes: [],
      idempotency_key: IDEMPOTENCY,
      dispatch_count: 0,
      fiber_status: null,
      result_digest: null,
    },
  ];
}
/** The adapter's refusal of a reading, as `<category>: <message>`, or "admitted". */
function adapterVerdict(reading: JsonValue, context: ReactiveFiberTopologyContext = HOST): string {
  try {
    reactivefiberTopology(reading, context);
    return "admitted";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `untyped: ${String(error)}`;
  }
}
const topologyOf = (reading: JsonValue, context: ReactiveFiberTopologyContext = HOST): ReactiveFiberProjectionTopology => reactivefiberTopology(reading, context);
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
/** Every path in `value` (keys joined by ".") whose string leaf contains `needle`; an object key holding it reads `<path>{key}`. */
function locations(value: Json, needle: string, path = ""): string[] {
  const at = (key: string): string => (path === "" ? key : `${path}.${key}`);
  if (typeof value === "string") return value.includes(needle) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => locations(item, needle, at(String(index))));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => [...(key.includes(needle) ? [`${path}{${key}}`] : []), ...locations(item, needle, at(key))]);
  }
  return [];
}
/** The sorted locations of each named fixture value in `value`. */
function slotMap(value: unknown, names: readonly string[]): { [name: string]: string[] } {
  const tree = json(value);
  return Object.fromEntries(names.map(name => [name, locations(tree, VALUE_NAMES[name] ?? name).sort()]));
}
/** A fixture value's name, or the value itself when it is none of them. */
const nameOf = (value: unknown): Json => {
  const found = Object.entries(VALUE_NAMES).find(([, entry]) => entry === value);
  return found !== undefined ? found[0] : json(value ?? null);
};
/** The top-level snapshot fields (and "relations" or "diagnostics") two projections differ in. */
function projectionDelta(left: ReactiveFiberProjectionTopology, right: ReactiveFiberProjectionTopology): string[] {
  const fieldsOf = (value: Json): JsonObject => (value !== null && typeof value === "object" && !Array.isArray(value) ? value : {});
  const a = fieldsOf(json(left.snapshots[0] ?? null));
  const b = fieldsOf(json(right.snapshots[0] ?? null));
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  const differ = (x: unknown, y: unknown): boolean => JSON.stringify(x) !== JSON.stringify(y);
  return [
    ...keys.filter(key => differ(a[key], b[key])),
    ...(differ(left.relations, right.relations) ? ["relations"] : []),
    ...(differ(left.diagnostics, right.diagnostics) ? ["diagnostics"] : []),
  ];
}
/** The identity slots of a snapshot: everything that names a native object, a version, a revision, evidence or a payload. */
function identitySlots(topology: ReactiveFiberProjectionTopology): Json {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) return null;
  return json({
    source: snapshot.source,
    scope: snapshot.scope,
    sourceVersion: snapshot.sourceVersion ?? null,
    sourceRevision: snapshot.sourceRevision ?? null,
    evidenceRefs: snapshot.evidenceRefs ?? [],
    nativePayloadRef: snapshot.nativePayloadRef ?? null,
    trace: snapshot.trace ?? null,
  });
}
/** Applies a topology's snapshot to a fresh projection and reads the node back: its native reference, version cohort key and
 * evidence references. */
function appliedNode(topology: ReactiveFiberProjectionTopology): { nativeRef: Json; sourceVersion: Json; evidenceRefs: Json; applied: string; nodes: number } {
  const projection = new ObservationProjection();
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the topology holds no snapshot");
  const applied = projection.refresh(snapshot);
  const nodes = projection.query({ scope: HOST.scope, limit: 10 }).nodes;
  const node = nodes[0];
  return {
    applied,
    nodes: nodes.length,
    nativeRef: json(node?.nativeRef ?? null),
    sourceVersion: nameOf(node?.sourceVersion),
    evidenceRefs: json(node?.evidenceRefs ?? []),
  };
}
/** Every object key of a JSON tree. */
function keysOf(value: Json): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => [key, ...keysOf(item)]);
  return [];
}

installScratchLeakGuard();
const originalPath = process.env.PATH;
const stubs: string[] = [];
/** A stub rf as the ONLY PATH entry (absolute-node shebang, no host rf behind it) that prints `source` and exits 0, so the
 * provider's own envelope validator decides. */
function stubRf(source: JsonObject): void {
  const dir = makeScratch("rf-identity-distinctness-");
  stubs.push(dir);
  const binary = join(dir, "rf");
  writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
  chmodSync(binary, 0o700);
  process.env.PATH = dir;
}
/** The native provider's verdict on one envelope printed by the stub: admitted (verbatim or rewritten) or its typed refusal. */
async function providerVerdict(source: JsonObject): Promise<string> {
  stubRf(source);
  try {
    const reading = await nativeReactiveFiberRender({ model: "model", task: "task" }, ROOT);
    const carried = isObject(reading) ? reading.source : undefined;
    return JSON.stringify(carried) === JSON.stringify(source) ? "admitted verbatim" : "admitted rewritten";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `untyped: ${String(error)}`;
  }
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}
/** Each pin's witness as its case returned it; the record compares the whole set against the roster a second time. */
const MEASURED: { [pin: string]: Json } = {};
/** Each pin's assertion count when its case compared its witness (its own judges, its control readings and the compare
 * included), in run order: `<pin>:<count>` (wb-mzoc F2). A case that returns its roster witness without running its judges
 * counts fewer, and the record reds. */
const COUNTED: string[] = [];

/** A control fires when it counts a hit: a count of 1 or more, a non-empty list, a ratio with at least one read. */
function fires(value: Json): boolean {
  if (typeof value === "number") return value >= 1;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string" && /^\d+\/\d+$/.test(value)) return Number(value.slice(value.indexOf("/") + 1)) >= 1;
  throw new Error(`a control reads ${JSON.stringify(value)}: neither a count, a list nor a ratio`);
}
/** Each control of a pin's witness read as fires, quiet or absent, beside its classification (wb-mzoc F3): quiet for the pin's
 * named quiet rows (QUIET_ROWS) and accepted forms (ACCEPTED_FORMS), each of which must be present, fires for every other
 * control - so a positive control zeroed in this file and the roster together still reds. */
function controlReadings(pin: string, witness: Json): { read: { [name: string]: string }; expected: { [name: string]: string } } {
  const controls: JsonObject = isObject(witness) && isObject(witness.controls) ? (witness.controls as JsonObject) : {};
  const quiet = [...Object.values(QUIET_ROWS).flat(), ...ACCEPTED_FORMS].filter(entry => entry.startsWith(`${pin}.`)).map(entry => entry.slice(pin.length + 1));
  const names = [...new Set([...Object.keys(controls), ...quiet])].sort();
  const reading = (name: string): string => (!Object.hasOwn(controls, name) ? "absent" : fires(controls[name] ?? null) ? "fires" : "quiet");
  return {
    read: Object.fromEntries(names.map(name => [name, reading(name)])),
    expected: Object.fromEntries(names.map(name => [name, quiet.includes(name) ? "quiet" : "fires"])),
  };
}

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every registered test of this file (vitest's task tree), in registration order: its title, collected mode, inversion and
 * state, and whether it is the case reading the tree. */
function registeredTests(current: Readonly<RunnerTestCase>): Registered[] {
  const walked: Registered[] = [];
  const visit = (tasks: readonly RunnerTask[]): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === current });
      else if (child.type === "suite") visit(child.tasks);
    }
  };
  visit(current.file.tasks);
  return walked;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  A1: () => {
    const tree = liveTree();
    const modulesFloorMet = floorsMet(tree);
    const walk = walkAnchor(tree);
    const table = Object.fromEntries(tree.readers.map(path => [path, spelled(readingOf(tree, path), VOCABULARY.readerTable)]));
    const nullOnly = Object.fromEntries(tree.readers.map(path => [path, nullOnlyReads(readingOf(tree, path))]));
    const nullTyped = Object.fromEntries(tree.readers.map(path => [path, readingOf(tree, path).nullTypedMembers.filter(name => NULL_ONLY.includes(name))]));
    const prefixes = Object.fromEntries(
      [...tree.modules].filter(([, reading]) => refPrefixes(reading).length > 0).map(([path, reading]) => [path, refPrefixes(reading)]),
    );
    const typedPrefixes = Object.values(prefixes)
      .flat()
      .filter(prefix => IDENTITY_WORDS.test(prefix));
    const outside = [...tree.modules]
      .filter(([path]) => !tree.readers.includes(path))
      .flatMap(([path, reading]) => [
        ...wholeWordHits(path, reading, VOCABULARY.aFamily, A_WORD),
        ...reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name) && /^(?:graph|bundle|render|transaction)/.test(name)).map(name => `${path}: identifier ${name}`),
      ]);
    const shippedSpelled = ROSTER.shippedReads.every(name => tree.readers.some(path => (table[path] ?? []).includes(name)));
    expect(modulesFloorMet, `modules: src ${below(tree, "src")}, qa ${below(tree, "qa")}, examples ${below(tree, "examples")}`).toBe(true);
    expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable directory").toStrictEqual({ symlinks: [], unreadable: [] });
    // wb-mzoc F1: the walked set is held to listings outside this census, not to count floors alone (H05+P05).
    expect(walk.unwalked, "modules Git lists below the walk roots that the walk did not read").toEqual([]);
    expect(walk.unlisted, "modules the walk read that Git does not list").toEqual([]);
    expect(walk.outsideRoots, "the roots of the modules Git lists outside the walk roots: the unjudged roots only").toEqual([...UNJUDGED_ROOTS]);
    expect(walk.programUnwalked, `root files of the ${PROGRAM_CONFIG} program the walk did not read`).toEqual([]);
    expect(tree.readers, "the judged modules holding the render command literal").toEqual(["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"]);
    expect(shippedSpelled, `the filing's shipped reads (${ROSTER.shippedReads.join(", ")}) are spelled by a READER`).toBe(true);
    expect(
      Object.values(nullOnly).every(reads => Object.values(reads).every(ratio => ratio.split("/")[0] === ratio.split("/")[1])),
      "every render_id and transaction_id read is a comparison with null",
    ).toBe(true);
    expect(typedPrefixes, "rf reference prefixes naming a render, transaction, session, component or occurrence").toEqual([]);
    expect(outside, "(a)-family identity names spelled outside the READERS").toEqual([]);
    const of = (source: string): string[] => spelled(snippet(asReader(source)), VOCABULARY.readerTable);
    const ratio = (source: string, name: string): string => nullOnlyReads(snippet(asReader(source)))[name] ?? "";
    const outsideOf = (source: string): number => wholeWordHits("c.ts", snippet(source), VOCABULARY.aFamily, A_WORD).length;
    const controls = {
      propertyRead: ratio("const id = result.render_id;\n", "render_id"),
      nullCompare: ratio("if (result.render_id !== null) throw refused();\n", "render_id"),
      parenthesizedNullCompare: ratio("if ((result.transaction_id) === null) admit();\n", "transaction_id"),
      elementAccess: ratio('const id = result["render_id"];\n', "render_id"),
      destructure: ratio("const { render_id } = result;\n", "render_id"),
      sessionRead: of("const session = result.session_id;\n"),
      workspaceIdRead: of("const id = source.workspace.id;\n"),
      keyList: of('const KEYS = ["operation_id", "transaction_id"];\n'),
      outsideReaders: outsideOf("const digest = record.graph_revision_id;\n"),
      outsideMessage: outsideOf('throw new Error("bundle_revision_id must be a digest");\n'),
      composedName: outsideOf('const key = ["render", "id"].join("_");\nconst id = result[key];\n'),
      comment: outsideOf("// result.render_id\nexport {};\n"),
      camelNamesake: outsideOf("const sessionId = frame.sessionId;\nconst operationId = run.operationId;\n"),
      renderPrefix: refPrefixes(snippet(`const ref = \`rf-render:${"$"}{id}\`;\n`)).filter(prefix => IDENTITY_WORDS.test(prefix)),
    };
    return done("A1", { modulesFloorMet, walk: json(walk), readers: [...tree.readers], table, nullOnly, nullTyped, prefixes, typedPrefixes, outside, shippedSpelled, controls });
  },
  A2: () => {
    const names = ["OPERATION", "WORKSPACE", "GRAPH", "BUNDLE", "ROOT"];
    const stated = previewReading();
    const absent = previewReading(result => {
      Reflect.deleteProperty(result, "bundle_revision_id");
    });
    const slots = (reading: JsonValue): { topology: { [name: string]: string[] }; evidence: { [name: string]: string[] } } => ({
      topology: slotMap(topologyOf(reading), names),
      evidence: slotMap(nativeEvidence(CAPABILITY, reading), names),
    });
    const withBundle = slots(stated);
    const withoutBundle = slots(absent);
    const statedNode = appliedNode(topologyOf(stated));
    const absentNode = appliedNode(topologyOf(absent));
    const cohort = {
      stated: statedNode.sourceVersion,
      absent: absentNode.sourceVersion,
      absentBundleRefs: (absentNode.evidenceRefs as Json[]).filter(ref => typeof ref === "string" && ref.startsWith("rf-bundle:")).length,
    };
    const graphInBundleSlot = [...withoutBundle.topology.GRAPH, ...withBundle.topology.GRAPH].filter(path => path === "snapshots.0.sourceVersion" || path.startsWith("snapshots.0.evidenceRefs.2"));
    expect(withBundle.topology.OPERATION, "the operation id names the preview").toEqual(["snapshots.0.node.title", "snapshots.0.source.id"]);
    expect(withBundle.topology.GRAPH, "the graph digest rides rf-graph: and sourceRevision").toEqual(["snapshots.0.evidenceRefs.0", "snapshots.0.sourceRevision"]);
    expect(withBundle.topology.BUNDLE, "the bundle rides rf-bundle: and sourceVersion").toEqual(["snapshots.0.evidenceRefs.2", "snapshots.0.sourceVersion"]);
    expect(withoutBundle.topology.BUNDLE, "an absent bundle fills no slot").toEqual([]);
    expect(graphInBundleSlot, "the graph digest in a bundle slot").toEqual([]);
    expect(cohort, "the version cohort key is typed bundle-else-graph, and no bundle reference is made of the graph").toStrictEqual({ stated: "BUNDLE", absent: "GRAPH", absentBundleRefs: 0 });
    return done("A2", { withBundle, withoutBundle, cohort, graphInBundleSlot, statedNode: { applied: statedNode.applied, nodes: statedNode.nodes } });
  },
  A3: async () => {
    const committed = previewSource(result => {
      result.ephemeral = false;
      result.render_id = RENDER;
      result.commit_seq = 1;
    });
    const renderStated = previewSource(result => {
      result.render_id = RENDER;
    });
    const transactionStated = previewSource(undefined, source => {
      source.transaction_id = TRANSACTION;
    });
    const control = previewSource();
    const cases = { committed, renderStated, transactionStated, control };
    const reading = (source: JsonObject): JsonValue => ({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source }) as JsonValue;
    const adapter = Object.fromEntries(Object.entries(cases).map(([name, source]) => [name, adapterVerdict(reading(source))]));
    const provider: { [name: string]: string } = {};
    for (const [name, source] of Object.entries(cases)) provider[name] = await providerVerdict(source);
    const topology = json(topologyOf(reading(control)));
    const evidence = json(nativeEvidence(CAPABILITY, reading(control)));
    const typedKeys = [...new Set([...keysOf(topology), ...keysOf(evidence)])].filter(key => /render|transaction/i.test(key)).sort();
    const snapshot = isObject(topology) && Array.isArray(topology.snapshots) && isObject(topology.snapshots[0]) ? topology.snapshots[0] : {};
    const refs = Array.isArray(snapshot.evidenceRefs) ? snapshot.evidenceRefs.filter((ref): ref is string => typeof ref === "string") : [];
    const typedRefs = refs.filter(ref => /render|transaction/i.test(ref.slice(0, ref.indexOf(":") + 1)));
    const naming = { render_id: locations(topology, "render_id"), transaction_id: locations(topology, "transaction_id"), evidence: [...locations(evidence, "render"), ...locations(evidence, "transaction")] };
    const grammars = { render: grammar("render_id").test(RENDER), transaction: grammar("transaction_id").test(TRANSACTION) };
    expect(grammars, "the fixture's render and transaction ids are in the producer grammar").toStrictEqual({ render: true, transaction: true });
    expect(adapter.control, "the control preview is admitted").toBe("admitted");
    expect(provider.control, "the native provider admits the control and carries it verbatim").toBe("admitted verbatim");
    for (const name of ["committed", "renderStated", "transactionStated"]) {
      expect(adapter[name]?.startsWith("validation: "), `the adapter refuses ${name}`).toBe(true);
      expect(provider[name]?.startsWith("transport: "), `the native provider refuses ${name}`).toBe(true);
    }
    expect({ typedKeys, typedRefs }, "no render- or transaction-typed key or reference in an admitted reading").toStrictEqual({ typedKeys: [], typedRefs: [] });
    return done("A3", { adapter, provider, typedKeys, typedRefs, naming, grammars });
  },
  A4: () => {
    const tree = liveTree();
    const sessionModules = [...tree.modules].filter(([, reading]) => spelled(reading, ["session_id"]).includes("session_id")).map(([path]) => path);
    const sessionInReaders = sessionModules.filter(path => tree.readers.includes(path));
    const claudeAnchor = sessionModules.includes(CLAUDE_ANCHOR);
    const withSession = previewReading(result => {
      result.session_id = SESSION;
    });
    const withoutSession = previewReading(result => {
      result.session_id = null;
    });
    const session = {
      grammar: grammar("session_id").test(SESSION),
      topologyEqual: JSON.stringify(topologyOf(withSession)) === JSON.stringify(topologyOf(withoutSession)),
      evidenceEqual: JSON.stringify(nativeEvidence(CAPABILITY, withSession)) === JSON.stringify(nativeEvidence(CAPABILITY, withoutSession)),
      surfaced: slotMap([topologyOf(withSession), nativeEvidence(CAPABILITY, withSession)], ["SESSION"]).SESSION ?? [],
    };
    const authorized: ReactiveFiberTopologyContext = { ...HOST, scope: { workspace: PI_ROOT, principal: PRINCIPAL }, authorizedRfRoot: RF_ROOT };
    const workspaces = slotMap(topologyOf(previewReading(undefined, undefined, RF_ROOT), authorized), ["PI_ROOT", "RF_ROOT", "WORKSPACE"]);
    const forgeRef = nativeRefOf(nativeEvidence("forge.gate.status", { contract: "forge.gate.status/v1", source: { operation_id: OPERATION, status: "passed" } }));
    const rfRef = nativeRefOf(nativeEvidence(CAPABILITY, previewReading()));
    const named = (ref: typeof forgeRef): Json => (ref === undefined ? null : json({ ...ref, id: nameOf(ref.id) }));
    const operations = { forge: named(forgeRef), reactivefiber: named(rfRef), sameId: forgeRef?.id === rfRef?.id, distinct: JSON.stringify(forgeRef) !== JSON.stringify(rfRef) };
    expect(sessionInReaders, "READERS spelling session_id").toEqual([]);
    expect(claudeAnchor, `the Claude SDK frames' session_id is read in ${CLAUDE_ANCHOR}, outside the READERS`).toBe(true);
    expect(session, "an rf session id surfaces nowhere and changes nothing").toStrictEqual({ grammar: true, topologyEqual: true, evidenceEqual: true, surfaced: [] });
    expect(workspaces, "Pi's workspace, the authorized rf root and the rf workspace id stay three slots").toStrictEqual({
      PI_ROOT: ["snapshots.0.scope.workspace", "snapshots.0.source.scope"],
      RF_ROOT: [],
      WORKSPACE: ["snapshots.0.evidenceRefs.1"],
    });
    expect({ sameId: operations.sameId, distinct: operations.distinct }, "forge's and rf's operation ids stay provider-qualified").toStrictEqual({ sameId: true, distinct: true });
    const outsideSession = (source: string): number => sessionInReadersOf(snippet(source));
    const controls = {
      readerSession: outsideSession(asReader("const session = result.session_id;\n")),
      sessionOutsideReaders: outsideSession("const session = frame.session_id;\n"),
    };
    return done("A4", { sessionInReaders, claudeAnchor, session, workspaces, operations, controls });
  },
  B1: () => {
    const tree = liveTree();
    const hits = [...tree.modules].flatMap(([path, reading]) => [
      ...wholeWordHits(path, reading, VOCABULARY.bFamily, B_WORD),
      ...reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name) && !/^(?:graph|bundle|render|transaction)/.test(name)).map(name => `${path}: identifier ${name}`),
    ]);
    const occurrenceInReaders = tree.readers.flatMap(path => occurrenceHits(path, readingOf(tree, path)));
    const anchored = tree.readers.some(path => readingOf(tree, path).identifiers.includes("graph_revision_id"));
    expect(VOCABULARY.bFamily, "the (b) family: the filing's names and the measured record identity fields").toEqual(["candidate_key", "component_id", "component_instance_id", "component_revision_id", "occurrence_id"]);
    expect(anchored, "the name reader reads an identity the READERS do spell (graph_revision_id)").toBe(true);
    expect(hits, "rf component, instance, definition-revision, candidate-key or occurrence fields spelled in a judged module").toEqual([]);
    expect(occurrenceInReaders, "the word occurrence in a READER").toEqual([]);
    const spelledField = (source: string): number => {
      const reading = snippet(source);
      return wholeWordHits("c.ts", reading, VOCABULARY.bFamily, B_WORD).length + reading.identifiers.filter(name => VOCABULARY.camelForms.includes(name)).length;
    };
    const controls = {
      propertyAccess: spelledField("const key = block.candidate_key;\n"),
      elementAccess: spelledField('const id = row["component_instance_id"];\n'),
      destructure: spelledField("const { component_revision_id } = row;\n"),
      objectKey: spelledField("const row = { occurrence_id: 2 };\n"),
      pathLiteral: spelledField('const path = "result.blocks[0].component_id";\n'),
      folded: spelledField('const key = "candidate" + "_key";\n'),
      template: spelledField(`const path = \`${"$"}{prefix}.component_id\`;\n`),
      camelCase: spelledField("const id = block.componentInstanceId;\n"),
      composedField: spelledField('const key = row[["component", "id"].join("_")];\n'),
      renamedField: spelledField("const childOf = row.instance;\n"),
      comment: spelledField("// candidate_key and occurrence_id\nexport {};\n"),
      readerOccurrence: occurrenceHits("c.ts", snippet(asReader('const note = "second occurrence";\n'))).length,
      occurrenceOutsideReaders: occurrenceHits("c.ts", snippet('const note = "the first occurrence wins";\n')).length,
      outsideRoots: judgedPath("test/helpers/rf-render-fixture.ts") ? 1 : 0,
    };
    return done("B1", { bFamily: [...VOCABULARY.bFamily], anchored, hits, occurrenceInReaders, controls });
  },
  B2: () => {
    const plain = previewReading();
    const nested = previewReading(nestedChildRecords);
    const plainTopology = topologyOf(plain);
    const nestedTopology = topologyOf(nested);
    const values = { FIRST_OCCURRENCE, SECOND_OCCURRENCE, CHILD, INSTANCE, REVISION, IDEMPOTENCY, OCCURRENCE_ORDINAL: "::2" };
    const tree = json([nestedTopology, nativeEvidence(CAPABILITY, nested)]);
    const surfaced = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, locations(tree, value)]));
    const grammars = {
      firstIsBare: grammar("candidate_key").exec(FIRST_OCCURRENCE)?.groups?.occurrence ?? "bare",
      secondOrdinal: grammar("candidate_key").exec(SECOND_OCCURRENCE)?.groups?.occurrence ?? "bare",
      instance: grammar("component_instance_id").test(INSTANCE),
      revision: grammar("digest").test(REVISION),
    };
    const slotsEqual = JSON.stringify(identitySlots(plainTopology)) === JSON.stringify(identitySlots(nestedTopology));
    const evidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, plain)) === JSON.stringify(nativeEvidence(CAPABILITY, nested));
    const node = appliedNode(nestedTopology);
    const diffReading = previewReading(undefined, source => {
      source.command = "context.diff";
    });
    const diffVerdict = adapterVerdict(diffReading);
    const diff = { adapter: diffVerdict.slice(0, diffVerdict.indexOf(":")), evidenceKeys: Object.keys(nativeEvidence(CAPABILITY, diffReading)).length };
    expect(grammars, "the C-08 fixture: a bare first occurrence, a second ordinal, an instance and a revision in the producer grammar").toStrictEqual({ firstIsBare: "bare", secondOrdinal: "2", instance: true, revision: true });
    expect(slotsEqual, "the C-08 records change no identity slot of the topology").toBe(true);
    expect(evidenceEqual, "the C-08 records change nothing of the evidence").toBe(true);
    expect(Object.values(surfaced).flat(), "a C-08 value in a projected or evidence string").toEqual([]);
    expect({ nodes: node.nodes, nativeRef: node.nativeRef, sourceVersion: node.sourceVersion }, "the applied node is the operation's, versioned by the bundle").toStrictEqual({
      nodes: 1,
      nativeRef: { provider: "reactivefiber", type: "context-preview", id: OPERATION, scope: ROOT },
      sourceVersion: "BUNDLE",
    });
    expect(diff, "a context.diff reading is refused and projects nothing").toStrictEqual({ adapter: "validation", evidenceKeys: 0 });
    return done("B2", { grammars, slotsEqual, evidenceEqual, surfaced, node: { applied: node.applied, nodes: node.nodes, id: nameOf(node.nativeRef !== null && isObject(node.nativeRef) ? node.nativeRef.id : null), sourceVersion: node.sourceVersion }, diff });
  },
  C1: () => {
    const tree = liveTree();
    const renderSpellings = Object.fromEntries(
      [...tree.modules]
        .map(([path, reading]) => [path, renderSpellingsOf(reading)] as const)
        .filter(([, counts]) => counts.identifiers + counts.literals > 0),
    );
    const renderMembers = [...tree.modules].flatMap(([path, reading]) => reading.members.filter(name => RENDER_MEMBERS.includes(name)).map(name => `${path}: ${name}`));
    const runtimeBuildsFromEvidence = readingOf(tree, RUNTIME).nativeEvidenceCalls > 0;
    const committed = previewReading(result => {
      result.ephemeral = false;
      result.render_id = RENDER;
      result.commit_seq = 1;
    });
    const evidence = nativeEvidence(CAPABILITY, committed);
    const committedEvidence = {
      equalToPreview: JSON.stringify(evidence) === JSON.stringify(nativeEvidence(CAPABILITY, previewReading())),
      nativeId: nameOf(evidence.nativeId),
      renderSurfaced: locations(json(evidence), RENDER),
      keys: Object.keys(evidence).sort(),
    };
    expect(Object.keys(renderSpellings), "modules spelling render_id: the two READERS that require it null").toEqual(["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"]);
    expect(renderMembers, "a member declaring a render id").toEqual([]);
    expect(runtimeBuildsFromEvidence, `${RUNTIME} builds its node records from nativeEvidence`).toBe(true);
    expect(committedEvidence, "the evidence of a committed render's envelope carries no render id and keeps the operation id").toStrictEqual({
      equalToPreview: true,
      nativeId: "OPERATION",
      renderSurfaced: [],
      keys: ["nativeId", "producerRelease", "provider", "sourceBasis"],
    });
    const members = (source: string): number => snippet(source).members.filter(name => RENDER_MEMBERS.includes(name)).length;
    const controls = {
      interfaceMember: members("interface Handoff { render_id: string }\n"),
      camelMember: members("const handoff = { renderId: id };\n"),
      shorthandMember: members("const handoff = { renderRef };\n"),
      classField: members("class Handoff { renderID = id; }\n"),
      renamedMember: members("const handoff = { handoffRef: id };\n"),
    };
    return done("C1", { renderSpellings, renderMembers, runtimeBuildsFromEvidence, committedEvidence, controls });
  },
  C2: () => {
    const first = previewReading();
    const second = previewReading(undefined, source => {
      source.operation_id = SECOND_OPERATION;
    });
    const ids = [first, second].map(reading => {
      const topology = topologyOf(reading);
      const source = isObject(reading) && isObject(reading.source) ? reading.source : {};
      return {
        envelope: nameOf(source.operation_id),
        snapshot: nameOf(topology.snapshots[0]?.source.id),
        evidence: nameOf(nativeEvidence(CAPABILITY, reading).nativeId),
      };
    });
    const invoked: ReactiveFiberTopologyContext = { ...HOST, invocationId: INVOCATION, operationRef: OPERATION_REF };
    const withProvenance = topologyOf(first, invoked);
    const bare = topologyOf(first);
    const trace = { stated: json(withProvenance.snapshots[0]?.trace ?? null), bareHasTrace: Object.hasOwn(bare.snapshots[0] ?? {}, "trace"), bareRelations: bare.relations.length };
    const relations = withProvenance.relations.map(relation => json({ from: relation.from, to: relation.to, kind: relation.kind, source: relation.provenance.source }));
    const prose = previewReading(withText(`resume from operation ${PROSE_OPERATION} under invocation inv-other-9 (render ${PROSE_RENDER})`));
    const proseDelta = projectionDelta(withProvenance, topologyOf(prose, invoked));
    const proseEvidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, first)) === JSON.stringify(nativeEvidence(CAPABILITY, prose));
    expect(ids, "the operation id is the envelope's, byte for byte, in the snapshot and the evidence").toStrictEqual([
      { envelope: "OPERATION", snapshot: "OPERATION", evidence: "OPERATION" },
      { envelope: "SECOND_OPERATION", snapshot: "SECOND_OPERATION", evidence: "SECOND_OPERATION" },
    ]);
    expect(trace, "the trace is exactly the host's invocation, absent without one").toStrictEqual({ stated: { invocationId: INVOCATION }, bareHasTrace: false, bareRelations: 0 });
    expect(relations, "one grouping edge from exactly the host's operation reference to the preview").toStrictEqual([
      { from: OPERATION_REF, to: { provider: "reactivefiber", type: "context-preview", id: OPERATION, scope: ROOT }, kind: "grouping", source: "reactivefiber" },
    ]);
    expect({ proseDelta, proseEvidenceEqual }, "a document naming another operation and invocation moves only the payload digest").toStrictEqual({ proseDelta: ["nativePayloadRef"], proseEvidenceEqual: true });
    return done("C2", { ids, trace, relations: relations.map(relation => (isObject(relation) ? { ...relation, to: isObject(relation.to) ? { ...relation.to, id: nameOf(relation.to.id) } : null } : null)), proseDelta, proseEvidenceEqual });
  },
  D1: () => {
    const tree = liveTree();
    const findings = [...tree.modules].flatMap(([path, reading]) => renderPatternFindings(path, reading));
    const prefixes = Object.fromEntries([...tree.modules].filter(([, reading]) => idPrefixes(reading).length > 0).map(([path, reading]) => [path, idPrefixes(reading)]));
    const outputReads = [...tree.modules].flatMap(([path, reading]) => reading.textReads.filter(read => read.object === "output").map(read => `${path} ${read.use}`));
    const textFinds = [...tree.modules].flatMap(([path, reading]) => textFindings(path, reading));
    expect(VOCABULARY.prefixes.includes(RENDER_PREFIX), "the producer's prefix table holds the render prefix").toBe(true);
    expect(findings, "a literal or pattern spelling the render prefix, the family grammar or a render-naming pattern").toEqual([]);
    expect(prefixes, "the rf id prefixes spelled in the judged modules: the operation and workspace ids the two READERS validate").toStrictEqual({
      "src/workbench/providers/reactivefiber.ts": ["rfo_", "rfw_"],
      "src/workbench/reactivefiber-observer.ts": ["rfo_", "rfw_"],
    });
    expect(outputReads, "every output.text read in the judged modules (the non-vacuity anchor)").toEqual([
      "src/workbench/providers/reactivefiber.ts typeof",
      "src/workbench/reactivefiber-observer.ts typeof",
      "src/workbench/reactivefiber-observer.ts digest",
    ]);
    expect(textFinds, "rf document text read other than by a typeof or a sha256 digest").toEqual([]);
    const pattern = (source: string): number => renderPatternFindings("c.ts", snippet(source)).length;
    const reader = (source: string): number => textFindings("c.ts", snippet(asReader(source))).length;
    const controls = {
      regexLiteral: pattern("const RENDER = /rfr_[0-9a-z]{22,32}/;\n"),
      regExpCall: pattern('const RENDER = new RegExp("rfr_" + body);\n'),
      prefixTest: pattern('const isRender = id.startsWith("rfr_");\n'),
      familyGrammar: pattern("const ID = /^rf[a-z]_[0-9a-z]+$/;\n"),
      renderPattern: pattern("const found = /render id: (\\S+)/.exec(reply);\n"),
      renderPatternCall: pattern('const found = new RegExp("Render ID: (\\\\S+)").exec(reply);\n'),
      composedPrefix: pattern('const RENDER = new RegExp(["rf", "r_"].join("") + body);\n'),
      comment: pattern("// a render id is rfr_ plus a body\nexport {};\n"),
      validation: idPrefixes(snippet("const OPERATION_ID = /^rfo_[0-9a-z]{22,32}$/;\n")),
      textMatch: reader("const id = output.text.match(/x/);\n"),
      textDigest: reader('const ref = createHash("sha256").update(output.text).digest("hex");\n'),
      aliasOutsideReaders: textFindings("c.ts", snippet("const o = result.output;\nconst parts = o.text.split(marker);\n")).length,
    };
    return done("D1", { findings, prefixes, outputReads, textFinds, controls });
  },
  D2: () => {
    const prose = [`Handoff note: render_id ${PROSE_RENDER} is the committed render to resume.`, `Resume with render ${PROSE_RENDER} and fiber transaction ${PROSE_RENDER}/tx_3.`].join("\n");
    const plain = previewReading(withText("a plain context document"));
    const naming = previewReading(withText(prose));
    const left = topologyOf(plain);
    const right = topologyOf(naming);
    const delta = projectionDelta(left, right);
    const surfaced = locations(json([right, nativeEvidence(CAPABILITY, naming)]), RENDER_PREFIX);
    const digestOnly = right.snapshots[0]?.nativePayloadRef === `rf-output:sha256:${sha256(prose)}`;
    const evidenceEqual = JSON.stringify(nativeEvidence(CAPABILITY, plain)) === JSON.stringify(nativeEvidence(CAPABILITY, naming));
    const grammarMatch = grammar("render_id").test(PROSE_RENDER);
    expect(grammarMatch, "the prose names a render id in the producer grammar").toBe(true);
    expect(delta, "render-id prose moves only the payload digest").toEqual(["nativePayloadRef"]);
    expect(surfaced, "an rfr_ token in the topology or the evidence").toEqual([]);
    expect({ digestOnly, evidenceEqual }, "the payload reference is the digest of exactly the prose, and the evidence is unchanged").toStrictEqual({ digestOnly: true, evidenceEqual: true });
    return done("D2", { grammarMatch, delta, surfaced, digestOnly, evidenceEqual });
  },
};

/** A4's static judge: 1 when a READER spells session_id. */
function sessionInReadersOf(reading: ModuleReading): number {
  return isReader(reading) && spelled(reading, ["session_id"]).includes("session_id") ? 1 : 0;
}
/** B1's reader judge: identifiers or literals of a READER spelling the word occurrence. */
function occurrenceHits(path: string, reading: ModuleReading): string[] {
  if (!isReader(reading)) return [];
  return [...reading.identifiers, ...reading.literals].filter(value => /occurrence/i.test(value)).map(value => `${path}: ${value.slice(0, 60)}`);
}
/** C1's counts for one module: render_id identifiers, and folded literals holding render_id as a whole word. */
function renderSpellingsOf(reading: ModuleReading): { identifiers: number; literals: number } {
  const word = wordIn(["render_id"]);
  return { identifiers: reading.identifiers.filter(name => name === "render_id" || name === "renderId").length, literals: reading.literals.filter(value => word.test(value)).length };
}

describe("wb-hs2j.7 rf typed identity distinctness census (RF-REACTIVE-CONTEXT-ASSEMBLY-R8)", () => {
  afterEach(() => {
    if (originalPath === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = originalPath;
    removeScratch(...stubs.splice(0));
  });

  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // wb-mzoc F4: this case runs first and reads the task tree as collected, so a records case skipped, set to todo,
    // inverted or deleted reds here, before the records case could have run.
    const registered = registeredTests(task);
    expect(
      registered.map(entry => entry.name),
      "every registered test of this file (vitest task tree), exactly and in roster order, read first",
    ).toEqual([...ROSTER.tests]);
    expect(
      registered.findIndex(entry => entry.self),
      "this case finds itself by task identity, registered first",
    ).toBe(0);
    expect(
      registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`),
      "every registered test, the records case included, is collected in run mode and not inverted",
    ).toEqual([]);
    expect({
      bead: BEAD,
      scan: {
        walkRoots: WALK_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        floors: FLOORS,
        listing: LISTING,
        nonScriptForms: NON_SCRIPT_FORMS,
        unjudgedRoots: UNJUDGED_ROOTS,
        programConfig: PROGRAM_CONFIG,
        quietRows: QUIET_ROWS,
        acceptedForms: ACCEPTED_FORMS,
        pinHollowMembers: PIN_HOLLOW_MEMBERS,
        renderCommand: RENDER_COMMAND,
        capability: CAPABILITY,
        familyOf: FAMILY_OF,
        carried: CARRIED,
        producerNamesakes: PRODUCER_NAMESAKES,
        nullOnly: NULL_ONLY,
        workspaceIdRead: WORKSPACE_ID_READ,
        refPrefix: `${REF_PREFIX.source}/${REF_PREFIX.flags}`,
        identityWords: `${IDENTITY_WORDS.source}/${IDENTITY_WORDS.flags}`,
        renderPattern: `${RENDER_PATTERN.source}/${RENDER_PATTERN.flags}`,
        familyGrammar: FAMILY_GRAMMAR,
        renderPrefix: RENDER_PREFIX,
        renderMembers: RENDER_MEMBERS,
        claudeAnchor: CLAUDE_ANCHOR,
        runtime: RUNTIME,
        aFamily: VOCABULARY.aFamily,
        bFamily: VOCABULARY.bFamily,
        namesakes: VOCABULARY.namesakes,
        readerTable: VOCABULARY.readerTable,
        camelForms: VOCABULARY.camelForms,
        prefixes: VOCABULARY.prefixes,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const posture = /^Not P0: (.+?) \([^)]*\) and (.+?), so /m.exec(bead.notes);
    const source = /^Source: ReactiveFiberCLI (\S+) '([^']+)'/m.exec(bead.notes);
    const merged = /Merged \(rca-handoff-explicit-render-id-never-model-text\) (\S+) '([^']+)'/.exec(bead.notes);
    const shipped = /Shipped: yes \(Pi's own ([a-z_ /]+) reads:/.exec(bead.notes);
    const named = /typed identity vocabulary distinctly \(([^)]+)\)/.exec(ROSTER.statement);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    expect([posture?.[1], posture?.[2]], "the filing's two posture facts are the roster's").toEqual([...ROSTER.posture]);
    const coverageOf = (rows: readonly Row[]): string[][] => [...clauses, ...ROSTER.posture].map(clause => rows.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    const coverage = coverageOf(ROWS);
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and posture fact sits verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"], ["D"], ["A"], ["C"]]);
    // R-PIN-HOLLOW quiet row: the anchor reads row labels only, so one pin removed from every literal leaves its coverage
    // unchanged, while a row removed from every literal changes it (the reading is live).
    const withoutPin = (pin: string): Row[] => ROWS.map(row => ({ ...row, pins: row.pins.filter(item => item !== pin) }));
    const unseen = ROWS.flatMap(row => row.pins).filter(pin => JSON.stringify(coverageOf(withoutPin(pin))) === JSON.stringify(coverage));
    expect(unseen, "R-PIN-HOLLOW: the pins whose removal from every literal the bead-row anchor cannot see").toEqual([...PIN_HOLLOW_MEMBERS]);
    expect(
      ROWS.filter(row => JSON.stringify(coverageOf(ROWS.filter(other => other.id !== row.id))) === JSON.stringify(coverage)).map(row => row.id),
      "rows whose removal from every literal the bead-row anchor cannot see",
    ).toEqual([]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect({ citation: source?.[1], quote: source?.[2], mergedCitation: merged?.[1], mergedQuote: merged?.[2] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedCitation: ROSTER.mergedCitation,
      mergedQuote: ROSTER.mergedQuote,
    });
    expect(shipped?.[1]?.split(" / "), "the filing's shipped reads are the roster's").toEqual([...ROSTER.shippedReads]);
    const quoted = [...ROSTER.quote.matchAll(/`([a-z_]+)`/g)].map(match => match[1]);
    expect(named?.[1]?.split(", "), "the statement's identity names are the roster's").toEqual([...ROSTER.identities]);
    expect(quoted, "the quote's identity names are the roster's").toEqual([...ROSTER.identities]);
    expect(Object.keys(FAMILY_OF), "FAMILY_OF classifies exactly the filing's identity names").toEqual([...ROSTER.identities]);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(ROSTER.producer.occurrenceCitation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the occurrence citation pins the same sha").toBe(true);
    // The residual families' quiet rows (wb-mzoc F3), read after the outside anchor: every control family names one or more,
    // and each names a control of a pin of ROWS.
    expect(
      Object.entries(QUIET_ROWS)
        .filter(([, rows]) => rows.length === 0)
        .map(([family]) => family),
      "a control residual family without a pinned quiet row",
    ).toEqual([]);
    expect(
      [...Object.values(QUIET_ROWS).flat(), ...ACCEPTED_FORMS].filter(entry => !ROWS.some(row => row.pins.includes(entry.slice(0, entry.indexOf("."))))),
      "a quiet row or accepted form naming no pin of ROWS",
    ).toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          const controls = controlReadings(pin, witness);
          expect(controls.read, `${pin}: every positive control fires, every quiet row and accepted form stays quiet`).toStrictEqual(controls.expected);
          expect(witness).toStrictEqual(rosterWitness(pin));
          COUNTED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked = registeredTests(task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(COUNTED, "every pin's case compared its witness after its pinned number of assertions, in row order").toEqual([...ROSTER.counted]);
  });
});
