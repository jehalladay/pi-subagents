/**
 * wb-hs2j.9 (RF-REACTIVE-CONTEXT-ASSEMBLY-R10), the echo-only posture. Statement (bead notes, full form): "No Pi surface relaying
 * rf-captured context shall overwrite or re-label a field whose source authority is external (Forge verdict, Beads task state); Pi
 * treats a source result as a capture of the external authority, never an ownership transfer (the versioned assembly descriptor
 * stating the rule is a future schema, 04-target section 3, unshipped; the echo-only posture is pinnable today)" (ReactiveFiberCLI
 * docs/programs/reactive-context-assembly-2026-10-18/04-target-architecture-and-composition-contract.md:78@6a251bf73af5: "It must
 * never overwrite a field whose source authority is external (e.g., Forge verdict, Beads task state). A source result is a capture
 * of an external authority, not ownership transfer."; :43 "## 3. Proposed typed assembly descriptor", :45 "A future schema, not
 * currently advertised as a supported file:"). Acceptance: "(a) a Pi projection of rf-captured Forge/Beads data preserves the
 * producer's verdict/status bytes - no Pi code path rewrites them; (b) round-tripping an rf capture through Pi surfaces leaves
 * external-authority fields byte-identical; (c) a fixture capture carrying a Forge verdict and a bd status word projects both
 * verbatim with native source provenance and no Pi-minted synonym." Gating: the versioned assembly descriptor (04-target section
 * 3), unshipped; the posture itself is standing.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23). The quote: the roster vendors 04-target :43, :45 and :78 verbatim, which
 * hash to EXCERPT_SHA256 (`git show 6a251bf73af5:<path> | sed -n '43p;45p;78p' | sha256sum`). rf, the installed 0.1.832 (read from
 * its package): there is no Beads-specific source kind, "a typed ``command_template`` lens invokes ``bd ... --json``"
 * (integrations/lens_source.py:6-7), and "The resolved value is the row's captured value VERBATIM (``{stdout, stderr,
 * returncode}`` for a command lens" (:33-34); an observation row carries "identity and status, digests and timing, never argv,
 * output or a value" (integrations/lens_observations.py:265-266); the render schema's one text property is result.output.text,
 * "The final document bytes decoded as UTF-8 text (RFCLI-RENDER-031)" (schemas/cli/context.render.schema.json), and its result
 * object declares no additionalProperties. So the rendered document is the schema's one carrier of captured Forge and bd bytes;
 * whether a free-text field such as a diagnostic message ever quotes one is not measured here (UNVERIFIED).
 * Forge 0.2.1 (rev 572a7d1e6283): the verdict vocabulary PASS / POLICY_SATISFIED / FAIL / COULD_NOT_JUDGE
 * (forge/traceability/models.py:96-99), promoted into the result-envelope/v1 block only from that closed set
 * (application/finalize.py:1147-1150), beside the two tree-identity keys (build/tree_identity.py:142-143) and the disposition
 * words (forge/contracts/semantics.py:57-75); `--json` prints one compact line with sorted keys. bd 1.1.0-rc.1 (6a8620f34):
 * `bd statuses --json` lists seven built-in statuses with a category and a description each, and `bd show <id> --json` prints a
 * two-space-indented array whose keys run id, title, ..., status, priority, issue_type.
 *
 * Pi today. Its one rf reader is the reactivefiber.render.preview pair: the provider (providers/reactivefiber.ts) returns the
 * validated envelope as a JSON copy in both arms, and the adapter (reactivefiber-observer.ts) never copies the document - it names
 * it by sha256 - and takes coverage, tone and notes from rf's own fields alone; native-evidence.ts states no domain status for an
 * rf reading. A reading is relayed through the shared display form every registered tool output routes through
 * (sanitizeWorkbenchJson, src/workbench/redaction.ts) and through the hosted Claude capability_invoke reply (createCuratedTools,
 * which encodes the value through that display form). No live violation exists, and the census pins the posture on every leg:
 *  A, acceptance (a). A1 the injected registered reading of a capture render is byte for byte the serialization taken before the
 *    call (the reader is handed a fresh copy); A2 the native reading of it, in one --no-commit spawn of a stand-in rf; A3 an AST
 *    census of every src module (the walked set is the src program's root files: tsconfig.json's include, as TypeScript itself
 *    resolves it): the rendered document (`.text` read on an `output` object) is read exactly three times - two
 *    typeof guards and the adapter's sha256 update - so no read of that form transforms, parses or re-labels it (R-COMPUTED-ACCESS
 *    names the reads this census cannot see); A4 the hosted Claude relay
 *    replies with exactly the shared display form of the reading, and in both every Forge and bd field span (the key and value
 *    bytes as the producer wrote them) occurs exactly once, as in the producer's document. The fixture's one free-text field (the
 *    bd title) is plain words: a free-text field holding an unsafe unit or a credential shape is rewritten by the display (the
 *    R-FREE-TEXT and R-FREE-TEXT-SHAPE residuals), so rows A and B claim every verdict and status span and every field of the
 *    fixture records, never every free-text field.
 *  B, acceptance (b). B1 the Forge record and the bd record parse back to the producer's fields from every leg (injected, native,
 *    display, hosted relay); B2 a typed record on an additive result key, CONSTRUCTED in the shape 04-target :59-67 names (no rf
 *    ships it), rides every leg field for field; B3 a second Pi hop (the reading serialized and served again through the injected
 *    reader) yields the identical reading and projection, and a second display pass changes nothing; B4 the projection's payload
 *    reference is rf-output:<the producer's own output.digest>, a sha256 over the exact document bytes, and one changed verdict word
 *    changes it.
 *  C, acceptance (c). C1 the measured vocabularies (this file's lists and the roster's agree, and SYNONYMS holds every measured
 *    alternate) and their 4 x 7 matrix, each cell a capture render whose document carries exactly one verdict span and one status
 *    span; C2 every cell's injected reading and display carry the cell's field spans, and a covering subset of seven cells (every
 *    verdict and every status at least once) does so through the native reading and the hosted relay; C3 native source provenance
 *    in every cell: the snapshot names the rf operation, its evidence references are rf's own (graph, workspace, bundle, cli), its
 *    payload reference is the cell's digest, and native-evidence names provider reactivefiber, the rfo_ id, the bundle basis and
 *    the stated release, never a domain status; C4 no Pi-minted synonym: the 28 projections are identical but for the payload
 *    reference, and no surfaced projection or evidence string holds a captured value or a SYNONYMS entry; C5 no reader adopts the
 *    capture: the Forge reader refuses the reading, and native-evidence projects it under no capability id but its own.
 *  Q, the residuals' pinned quiet rows (below).
 * FIXTURES: the vocabularies, the record shapes and the key order are MEASURED; every envelope is CONSTRUCTED on the full-shape
 * render fixture (test/helpers/rf-render-fixture.ts) with two observed command-lens rows in the producer's row shape, a
 * source_capture_count of 2 and an output whose size_bytes and digest are the document's own. A record varies only its verdict or
 * status word and holds every other field fixed, so a cell is not a real Forge or bd outcome; Pi reads none of those fields, so no
 * combination is judged here.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the excerpt, the vocabularies and SYNONYMS, the residual families with their quiet-row pins, the
 * bead id and every registered test title in order - is held to the out-of-file roster
 * test/fixtures/rf-external-authority-echo-roster.json.
 * OUTSIDE ANCHORS (wb-45bx, the wb-hs2j.9 gate's F2). Rows: the owner filing's row in the tracked bead export (.beads/issues.jsonl,
 * row wb-hs2j.9) - its Acceptance line, split before each "; (x) ", yields exactly the clauses (a), (b) and (c), each verbatim in
 * exactly one row label (A, B and C); its Source quote ends the roster's excerpt line 78 and its two Cf. quotes are the excerpt's
 * lines 43 and 45; its Authority restrictions sentence ends excerpt line 78. Pins: the records case derives one obligation set from
 * sources outside this file and the roster and requires the coverage the pins measured to equal it: every descriptor of a fresh
 * native registration (src native-modules.ts registerNativeProviders) as reader:<id>, covered by C5, and every one carrying the
 * provider's own contract source (REACTIVE_FIBER_CONTRACT_SOURCE) as native:<id>, covered by A2; every rendered-document read in
 * the src program's root modules (tsconfig.json's include, as TypeScript resolves it) as read:<module>:<use>, covered by A3; the
 * filing's Authority restrictions sentence as authority:<sentence>,
 * covered by C5; every status word the export's issue rows carry as status:<word>, covered by C2; and the src display and adapter
 * measured on the shared fixture - the document changed by the display, the WORKBENCH_TEXT_LIMIT bound, an unsafe unit stripped, a
 * credential shape rewritten, an additive key unread - as display:document, display:bound:<limit>, display:unit, display:shape and
 * adapter:additive, covered by Q1, Q2, Q3, Q7 and Q4. So a row, or one of those pins, removed from every literal of this file and
 * the roster together still reds.
 * RECORDS (wb-45bx: the wb-hs2j.9 gate's F1; respin #1 for the wb-45bx refusal's U1 and U2): the two judges - the judged set,
 * registered first, and the records case, registered last - sit at FILE SCOPE, outside every suite, around the census suite that
 * holds the rows, so no single suite modifier (skip, skipIf, runIf, todo or a skip option) reaches either. Every case records its
 * end as its last statement, with the count of assertions it made (ENDED: the judged set, each pin's case after its roster
 * witness, the records case), and each judge declares its own count (expect.assertions), so a judge that stops early - an early
 * return anywhere in its body, or its end record copied ahead of its checks - is caught. The judged set walks the registration
 * (vitest's task tree, read inline: RUN PIN) at collection - every roster title once, in order, in run mode, not inverted, and the file's own
 * registrations exactly the two judges around the census suite; the records case walks it again after the run - every other
 * title ran - and requires every other case's end in registration order (the judged set's at its declared count), every pin's
 * end inside its own body (REACHED: a case returns its witness only through done()), every returned witness equal to the
 * roster's, and the coverage above. A file-level afterAll backstop reads FINISHED - every case registers onTestFinished(finished)
 * as its first statement, which records its mode, its inversion and the result the runner settled on after every hook - so it
 * needs no judge to have run: every registered test finished, in roster order, in run mode, uninverted, to a pass or a fail (a
 * hook that skips or masks a case at run time, before or after it, reds here), and unless a case failed, every case's end is
 * recorded in registration order, the records case's at its declared count. A failed case is reported by its own assertion; the
 * backstop names only a quiet miss.
 * RUN PIN (wb-wf9m, owner ruling R758 point 1, LEAD = cure (c)): test/workbench-rf-external-authority-echo-run-pin.census.ts, a
 * census-tier leg (vitest.census.config.ts, run by the gate's census step after the test step) judged in wb-u62 REPORT MODE over
 * the gate's own test report, is this file's out-of-file anchor. The report must record this file once, its cases exactly the 22
 * titles frozen there under their describe paths, each passed (collected 22, passed 22); judge() must read every title collected
 * once, passed and asserting; and its rows' pin ids and titles are frozen there against the roster. So a skip of every task at
 * collection (R-ALL-SKIP, NOT CLAIMED below) and a pin removed from every literal of this file and the roster together red there,
 * not here. For judge() to read this file's cases, no case hands its task to a call or places it in a literal (both judges read
 * the task tree INLINE into primitives), no describe's collector is held in a binding, and the scratch guard registers through
 * the helper's own afterAll (no vitest hook handed to a call) - the wb-jdpn form. Both judges hold the run pin's bytes to the
 * roster's runPin (its path and sha256), so the run pin is never deleted or edited alone.
 * RESIDUALS (named, each with a pinned quiet row): R-DISPLAY-FOLD the shared display layout folds every run of line breaks to one
 * space, so a multi-line capture (bd's indented JSON) reaches the display and the hosted relay with its bytes between fields
 * changed: the document differs from the producer's and the bd record's bytes are absent, while every field span stays verbatim and
 * the record parses unchanged (Q1); R-TEXT-BOUND the display bounds each string at WORKBENCH_TEXT_LIMIT and marks the cut, so a
 * capture past the bound is absent from the display legs, never rewritten, while both readings carry it and the payload digest
 * covers every byte (Q2); R-FREE-TEXT the display strips an unsafe unit from free text inside a capture (a zero-width code point in
 * the bd title), while the closed-vocabulary words and ids stay verbatim and the readings keep every byte (Q3); R-ADDITIVE-UNREAD
 * the adapter projects no field of an additive result key, so renders differing only there project identically, payload reference
 * included (Q4); R-COMPUTED-ACCESS A3 counts `.text` reads and string-literal element reads on an `output` object, so an alias, a
 * destructuring or a key assembled at runtime is invisible to it (Q5); R-SYNONYM-VOCABULARY C4's word scan is bound to SYNONYMS,
 * so a constant minted word outside it is caught by neither half of C4 (Q6); R-FREE-TEXT-SHAPE the display's credential-shape
 * rewrite (redactWorkbenchText: a scheme word and the token after it, a key prefix, an assignment key) rewrites a free-text field
 * of that shape, so a capture whose bd title reads "Basic fixture task" (an obviously fake fixture title, the gate's F3 probe)
 * reaches the display and the hosted relay with "[REDACTED] task" as its title, while the verdict and status words and the ids
 * stay verbatim and the injected reading keeps every byte (Q7).
 * NOT CLAIMED (by this file; the run pin's rows are named where they hold): a pin with no outside obligation (A1, A4, B1-B4, C1,
 * C3, C4, and Q5 and Q6, whose residuals describe this file's own detectors) removed from every literal of this file and the roster
 * together keeps the roster as its only anchor among this file's own judges (the run pin's frozen rows and titles red on it); a
 * coordinated edit of a judge with what it judges (an obligation's derivation with the pin that covers it, a task-tree walk with
 * the case it judges, documentReads with A3, the src walk with A3's program comparison, a judge's assertions with its declared
 * count, the run pin with the roster's runPin); a case returning the roster's own witness through done() (the witness-roster
 * class, the gate's F4 - its exact form, a case returning rosterWitness(pin) without reaching its end, reds the records case), and
 * its judge-feeding forms: an end record forged with a literal count, and a hook, listener or case that rewrites a task's mode or
 * result (runner tampering); a skip of every task at collection (R-ALL-SKIP; the wb-45bx gate's F23, owner ruling R758): ONE line
 * suffices - `it` rebound to a skipping variant at the vitest import (L2-REBIND-IT: test imported in its place and `const it =
 * test.skip`; L2-REBIND-IT-SKIPIF: `it as vitestIt` and `const it = vitestIt.skipIf(true)`) - or two sites, a describe.skip wrap
 * from before the judged set to EOF (L2-WRAP-SKIP); each reads 0 passed / 22 skipped at rc 0 in both configs and silences the
 * file's hooks with it (vitest runs no hook once every task is skipped at collection, the wb-45bx refusal's G24), so no row in
 * this file sees it, and the run pin reds on each (RUN PIN).
 * SCOPE: the vocabularies are producer facts at the measured releases; Pi vendors no rf, Forge or bd source, so a producer change
 * is seen only when a re-measure re-reads them. The armed half, a reader of the typed assembly descriptor, waits for the descriptor
 * (04-target section 3): no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, the bead export and the roster are only
 * read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, onTestFinished, type TestContext } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import { fullShapeRf, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_RELEASE } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

// The guard registers through the helper's own afterAll: the census tier's judge refuses a vitest hook handed to a call (wb-wf9m, the
// wb-jdpn form), and its run pin judges every case of this file.
installScratchLeakGuard();

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-external-authority-echo-roster.json");
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];

/** The ReactiveFiberCLI commit the statement is quoted at. */
const PIN = "6a251bf73af57c3a703caf6892dfe3015e06a481";
/** sha256 of 04-target-architecture-and-composition-contract.md lines 43, 45 and 78 at PIN, each newline-terminated. */
const EXCERPT_SHA256 = "8ffd1984dfaa436d1a938ef48463052c896ee58773408f8e8c3d7fb0b0fc5195";
/** Forge's verdict vocabulary (forge 0.2.1, forge/traceability/models.py:96-99), in declaration order. */
const FORGE_VERDICTS: readonly string[] = ["PASS", "POLICY_SATISFIED", "FAIL", "COULD_NOT_JUDGE"];
/** bd's built-in statuses (bd 1.1.0-rc.1, `bd statuses --json` built_in_statuses), in bd's order. */
const BD_STATUSES: readonly string[] = ["open", "in_progress", "blocked", "deferred", "closed", "pinned", "hooked"];
/** Words a re-label would mint for a verdict or a status word. MEASURED: bd's four categories and seven status descriptions, and
 * the Forge disposition words that are not themselves a verdict or a status word (forge/contracts/semantics.py:57-75).
 * CONSTRUCTED: English synonyms of the two vocabularies. */
const SYNONYMS: readonly string[] = [
  "active",
  "wip",
  "frozen",
  "done",
  "Available to work (default)",
  "Actively being worked on",
  "Blocked by a dependency",
  "Deliberately put on ice for later",
  "Completed",
  "Persistent, stays open indefinitely",
  "Attached to an agent's hook",
  "SUCCEEDED",
  "NO_OP",
  "PARTIAL",
  "REJECTED",
  "FAILED",
  "passed",
  "passing",
  "failing",
  "failure",
  "green",
  "red",
  "success",
  "resolved",
  "finished",
  "working",
  "stalled",
];

/** Obviously fake tree identities, 40 hex digits each. */
const GATED_COMMIT = "a1".repeat(20);
const GATED_TREE = "b2".repeat(20);
/** A bd id under a prefix no store here uses, and the title its record carries. */
const BD_ID = "fx-0001";
const BD_TITLE = "fixture task";
const FORGE_HEADING = "## forge gate (captured stdout)";
const BD_HEADING = `## bd show ${BD_ID} --json (captured stdout)`;
/** The additive result key the CONSTRUCTED typed record rides (04-target :59 AssemblyExecutionBasis, unshipped). */
const ADDITIVE_KEY = "assembly_execution_basis";
const ZERO_WIDTH = String.fromCodePoint(0x200b);
/** A free-text bd title of the shape the display's credential rewrite takes (a scheme word and a token): the wb-hs2j.9 gate's F3
 * probe, an obviously fake fixture title. */
const SHAPED_TITLE = "Basic fixture task";

/** The owner filing this census pins, and the tracked bead export that carries its row (the outside anchor). */
const BEAD = "wb-hs2j.9";
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
/** The export's Acceptance line splits into clauses before each "; (x) ". */
const CLAUSE_SPLIT = /; (?=\([a-z]\) )/;
/** The named residual families, each with its pinned quiet row in row Q (held to the roster). */
const RESIDUALS: readonly { readonly family: string; readonly pin: string }[] = [
  { family: "R-DISPLAY-FOLD", pin: "Q1" },
  { family: "R-TEXT-BOUND", pin: "Q2" },
  { family: "R-FREE-TEXT", pin: "Q3" },
  { family: "R-ADDITIVE-UNREAD", pin: "Q4" },
  { family: "R-COMPUTED-ACCESS", pin: "Q5" },
  { family: "R-SYNONYM-VOCABULARY", pin: "Q6" },
  { family: "R-FREE-TEXT-SHAPE", pin: "Q7" },
];
/** The first and the last registered test, both at file scope: the judged set and the records case. */
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the quoted excerpt, the bead export, the registration and the cases agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every case reached its end, and the pins' coverage meets the outside obligations";
/** The census suite the two judges sit around: it holds the rows. */
const CENSUS_TITLE = "wb-hs2j.9 rf external-authority echo census (RF-REACTIVE-CONTEXT-ASSEMBLY-R10, echo-only posture)";
/** The census-tier run pin (wb-wf9m): this census's out-of-file anchor, whose bytes both judges hold to the roster's runPin. */
const RUN_PIN = "test/workbench-rf-external-authority-echo-run-pin.census.ts";
/** The assertions each judge makes on its way to its end: it declares the count (expect.assertions) and records it at its end. */
const JUDGED_ASSERTIONS = 14;
const RECORDS_ASSERTIONS = 12;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) a Pi projection of rf-captured Forge/Beads data preserves the producer's verdict/status bytes - no Pi code path rewrites them: the injected and native readings change no captured byte, the shared display and the hosted Claude relay change no verdict or status span and no field of the fixture records (free text: R-FREE-TEXT, R-FREE-TEXT-SHAPE), and no `.text` read of the rendered document in src does more than type-check or digest it",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) round-tripping an rf capture through Pi surfaces leaves external-authority fields byte-identical: both fixture records parse back unchanged from every leg (free text: R-FREE-TEXT, R-FREE-TEXT-SHAPE), typed fields on an additive key included, a second hop and a second display pass change nothing, and the payload digest tracks the exact bytes",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label:
      "(c) a fixture capture carrying a Forge verdict and a bd status word projects both verbatim with native source provenance and no Pi-minted synonym: the measured vocabularies, every cell of their matrix, rf-native references and evidence, and no reader adopting the capture",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "Q",
    label:
      "the named residuals stay pinned quiet: display line-break fold, display text bound, free-text strip, additive key unread, computed document access, synonym vocabulary, free-text shape rewrite",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface RosterStatus {
  readonly name: string;
  readonly category: string;
  readonly description: string;
}
interface RosterResidual {
  readonly family: string;
  readonly pin: string;
}
interface Roster {
  readonly bead: string;
  readonly pin: string;
  readonly sourcePath: string;
  readonly excerpt: readonly string[];
  readonly verdicts: readonly string[];
  readonly dispositions: readonly string[];
  readonly statuses: readonly RosterStatus[];
  readonly synonyms: readonly string[];
  readonly residuals: readonly RosterResidual[];
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
  /** The census-tier run pin's path and its bytes' sha256 (wb-wf9m). */
  readonly runPin: { readonly file: string; readonly sha256: string };
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every((item): item is string => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.measured)) throw new Error("roster must be an object with measured and rows");
  const { forge, bd } = raw.measured;
  if (!isObject(forge) || !isObject(bd) || !Array.isArray(bd.statuses)) throw new Error("roster measured needs forge and bd objects");
  if (typeof raw.pin !== "string") throw new Error("roster pin must be a string");
  if (typeof raw.bead !== "string") throw new Error("roster bead must be a string");
  if (!isObject(raw.source) || typeof raw.source.path !== "string") throw new Error("roster source needs a path");
  if (!Array.isArray(raw.residuals)) throw new Error("roster residuals must be a list");
  if (!isObject(raw.runPin) || typeof raw.runPin.file !== "string" || typeof raw.runPin.sha256 !== "string") throw new Error("roster runPin needs a file and a sha256");
  const residuals = raw.residuals.map((entry: unknown, index: number): RosterResidual => {
    if (!isObject(entry) || typeof entry.family !== "string" || typeof entry.pin !== "string") throw new Error(`roster residuals[${index}] needs a family and a pin`);
    return { family: entry.family, pin: entry.pin };
  });
  const statuses = bd.statuses.map((entry: unknown, index: number): RosterStatus => {
    if (!isObject(entry) || typeof entry.name !== "string" || typeof entry.category !== "string" || typeof entry.description !== "string") {
      throw new Error(`roster measured.bd.statuses[${index}] needs a name, a category and a description`);
    }
    return { name: entry.name, category: entry.category, description: entry.description };
  });
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: raw.bead,
    pin: raw.pin,
    sourcePath: raw.source.path,
    excerpt: strings(raw.excerpt, "excerpt"),
    verdicts: strings(forge.verdicts, "measured.forge.verdicts"),
    dispositions: strings(forge.dispositions, "measured.forge.dispositions"),
    statuses,
    synonyms: strings(raw.synonyms, "synonyms"),
    residuals,
    tests: strings(raw.tests, "tests"),
    rows,
    runPin: { file: raw.runPin.file, sha256: raw.runPin.sha256 },
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
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
  for (const line of readFileSync(BEAD_EXPORT, "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
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
/** The filing's acceptance clauses: its first "Acceptance: " line without the closing period, split before each "; (x) ". */
const acceptanceClauses = (notes: string): string[] => noteLine(notes, "Acceptance: ").replace(/\.$/, "").split(CLAUSE_SPLIT);
/** The sentence the filing's "Authority restrictions: " line quotes. */
function authorityOf(notes: string): string {
  const quoted = /^'(.+)' \(04-target:78\)\.$/.exec(noteLine(notes, "Authority restrictions: "))?.[1];
  if (quoted === undefined) throw new Error(`${BEAD} quotes no authority restriction`);
  return quoted;
}
/** The filing's "Source: " line: its citation, its :78 quote and its two Cf. quotes (:43 and :45). */
function sourceOf(notes: string): { citation: string; quote: string; cf: string[] } {
  const match = /^ReactiveFiberCLI (\S+) '(.+?)' Cf\. 04-target:43-45 \('(.+?)' \/ '(.+?)'\)\.$/.exec(noteLine(notes, "Source: "));
  if (match === null) throw new Error(`${BEAD} carries no Source line of the measured form`);
  return { citation: match[1] ?? "", quote: match[2] ?? "", cf: [match[3] ?? "", match[4] ?? ""] };
}
/** Every distinct status word the export's issue rows carry, in first-seen order: bd's own words for the work it tracks. */
function exportStatuses(): string[] {
  const seen = new Set<string>();
  for (const line of readFileSync(BEAD_EXPORT, "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row._type === "issue" && typeof row.status === "string") seen.add(row.status);
  }
  return [...seen];
}
/** The descriptors a fresh native registration holds (src native-modules.ts registerNativeProviders), in registration order. */
async function nativeCatalog(): Promise<{ readonly id: string; readonly contractSource: string | undefined }[]> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, ROOT);
  return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, contractSource: entry.descriptor.contractSource }));
}

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
/** The sha256 of a repository file's bytes, or null when it is absent. */
function digestOf(path: string): string | null {
  return existsSync(join(REPO, path)) ? createHash("sha256").update(readFileSync(join(REPO, path))).digest("hex") : null;
}
const excerptSha256 = (lines: readonly string[]): string => sha256(lines.map(line => `${line}\n`).join(""));
const occurrences = (haystack: string, needle: string): number => haystack.split(needle).length - 1;

/** The Forge record as `forge --json` prints it: one compact line, keys sorted; only the verdict word varies. */
function forgeRecord(verdict: string): JsonObject {
  return {
    command: "build",
    envelope: {
      contract_version: "result-envelope/v1",
      disposition: "SUCCEEDED",
      gated_commit: GATED_COMMIT,
      gated_tree: GATED_TREE,
      reason_code: "FORGE_OK",
      verdict,
    },
    status: "success",
  };
}
/** The bd record as `bd show <id> --json` prints it: an array of one issue, two-space indented, keys in bd's order. */
function bdRecord(status: string, title = BD_TITLE): JsonValue[] {
  return [{ id: BD_ID, title, status, priority: 2, issue_type: "task" }];
}
const forgeBytes = (verdict: string): string => JSON.stringify(forgeRecord(verdict));
const bdBytes = (status: string, title = BD_TITLE): string => JSON.stringify(bdRecord(status, title), null, 2);

interface Capture {
  readonly verdict: string;
  readonly status: string;
  readonly title?: string;
  readonly lead?: string;
}
/** The rendered document: a heading, an optional lead block, then each captured stdout under its own heading. */
function documentOf(capture: Capture): string {
  return [
    "# context",
    "",
    ...(capture.lead === undefined ? [] : [capture.lead, ""]),
    FORGE_HEADING,
    forgeBytes(capture.verdict),
    "",
    BD_HEADING,
    bdBytes(capture.status, capture.title),
    "",
  ].join("\n");
}

/** One field span: the key and value bytes exactly as the producer separates them (Forge compact, bd `": "`). */
interface Span {
  readonly owner: "forge" | "bd";
  readonly key: string;
  readonly bytes: string;
}
function forgeSpans(verdict: string): Span[] {
  const record = forgeRecord(verdict);
  const envelope = record.envelope;
  if (!isObject(envelope)) throw new Error("the Forge record carries an envelope object");
  const leaves: [string, JsonValue][] = [
    ["command", record.command ?? null],
    ["status", record.status ?? null],
    ...Object.entries(envelope).map(([key, value]): [string, JsonValue] => [key, json(value)]),
  ];
  return leaves.map(([key, value]) => ({ owner: "forge", key, bytes: `${JSON.stringify(key)}:${JSON.stringify(value)}` }));
}
function bdSpans(status: string, title = BD_TITLE): Span[] {
  const [issue] = bdRecord(status, title);
  if (!isObject(issue)) throw new Error("the bd record carries one issue object");
  return Object.entries(issue).map(([key, value]) => ({ owner: "bd", key, bytes: `${JSON.stringify(key)}: ${JSON.stringify(value)}` }));
}
const spansOf = (capture: Capture): Span[] => [...forgeSpans(capture.verdict), ...bdSpans(capture.status, capture.title)];
/** Each span's count in `text`, in span order. */
const spanCounts = (text: string, spans: readonly Span[]): number[] => spans.map(span => occurrences(text, span.bytes));

/** The CONSTRUCTED typed record (04-target :59-67 AssemblyExecutionBasis: "exact source/lens observations and status/provenance
 * receipts"; a future schema, no rf ships it). */
function typedRecord(capture: Capture): JsonObject {
  return {
    source_observations: [
      { source_id: "forge-gate", authority: "forge", fields: { verdict: capture.verdict, gated_commit: GATED_COMMIT, gated_tree: GATED_TREE } },
      { source_id: "beads", authority: "beads", fields: { id: BD_ID, status: capture.status } },
    ],
  };
}

/** One observed command-lens row in the producer's row shape (lens_observations.py:268-285). */
function lensRow(index: number, lensKey: string, stdout: string): JsonObject {
  const value = JSON.stringify({ returncode: 0, stderr: "", stdout });
  return {
    observation_id: `rfl_${"0123456789abcdefghijk"}${index}`,
    lens_key: lensKey,
    binding_ref: `binding:workbench/${lensKey}`,
    value_digest: `sha256:${sha256(value)}`,
    parsed_value_digest: `sha256:${sha256(stdout)}`,
    status: "observed",
    code: null,
    freshness: "captured_at_render",
    replayed: false,
    required: true,
    degraded: false,
    started_at: "2026-10-23T00:00:00.000000Z",
    elapsed_ms: 12,
    exit_code: 0,
    sensitivity: "internal",
    persisted: false,
  };
}

/** The capture render: the full-shape fixture with the document, its two lens rows, the source count and the typed record. */
function captureRender(capture: Capture, typed: JsonObject = typedRecord(capture)): JsonObject {
  const base = json(fullShapeRf(ROOT));
  if (!isObject(base) || !isObject(base.result) || !isObject(base.result.work)) throw new Error("the full-shape fixture must carry a result");
  const result = base.result as JsonObject;
  const text = documentOf(capture);
  return {
    ...(base as JsonObject),
    result: {
      ...result,
      output: { text, size_bytes: Buffer.byteLength(text, "utf8"), digest: `sha256:${sha256(text)}`, path: null },
      work: { ...(result.work as JsonObject), source_capture_count: 2 },
      observations: [lensRow(0, "forge.gate", forgeBytes(capture.verdict)), lensRow(1, "beads.current", bdBytes(capture.status, capture.title))],
      [ADDITIVE_KEY]: typed,
    },
  };
}

const BASE: Capture = { verdict: "PASS", status: "in_progress" };
const CELLS: readonly Capture[] = FORGE_VERDICTS.flatMap(verdict => BD_STATUSES.map(status => ({ verdict, status })));
/** Seven cells covering every verdict and every status word at least once. */
const COVER: readonly Capture[] = BD_STATUSES.map((status, index) => ({ verdict: FORGE_VERDICTS[index % FORGE_VERDICTS.length] ?? "PASS", status }));

function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value as JsonObject;
}
function resultOf(reading: JsonValue): JsonObject {
  return objectOf(objectOf(objectOf(reading, "reading").source, "reading source").result, "reading result");
}
function textOf(reading: JsonValue): string {
  const text = objectOf(resultOf(reading).output, "reading result.output").text;
  if (typeof text !== "string") throw new Error("reading result.output.text must be a string");
  return text;
}

/** The JSON value that opens at `start` in `text`, read to its balanced end (strings honoured) and parsed. */
function jsonValueAt(text: string, start: number): JsonValue {
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === "{" || char === "[") depth += 1;
    else if (char === "}" || char === "]") {
      depth -= 1;
      if (depth === 0) return JSON.parse(text.slice(start, index + 1)) as JsonValue;
    }
  }
  throw new Error(`no balanced JSON value opens at ${start}`);
}
/** The two records as a leg's document carries them: the first value after each heading, whatever the whitespace between. */
function recordsIn(text: string): { forge: JsonValue; bd: JsonValue } {
  const forgeAt = text.indexOf("{", text.indexOf(FORGE_HEADING) + FORGE_HEADING.length);
  const bdAt = text.indexOf("[", text.indexOf(BD_HEADING) + BD_HEADING.length);
  if (text.indexOf(FORGE_HEADING) < 0 || text.indexOf(BD_HEADING) < 0 || forgeAt < 0 || bdAt < 0) throw new Error("a record heading is missing");
  return { forge: jsonValueAt(text, forgeAt), bd: jsonValueAt(text, bdAt) };
}

const CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
const project = (reading: JsonValue): ReactiveFiberProjectionTopology => reactivefiberTopology(reading, CONTEXT);
const display = (reading: JsonValue): JsonValue => sanitizeWorkbenchJson(reading);
function payloadRef(topology: ReactiveFiberProjectionTopology): string {
  const ref = topology.snapshots[0]?.nativePayloadRef;
  if (ref === undefined) throw new Error("the projection states no payload reference");
  return ref;
}
/** The projection with the payload reference removed, as one JSON text: what C4 and Q4 compare across renders. */
function withoutPayload(topology: ReactiveFiberProjectionTopology): string {
  return JSON.stringify({
    snapshots: topology.snapshots.map(snapshot => ({ ...snapshot, nativePayloadRef: null })),
    relations: topology.relations,
    diagnostics: topology.diagnostics,
  });
}
/** Every string a display of the projection or of the reading's native evidence shows, the host scope excepted. */
function surfaced(topology: ReactiveFiberProjectionTopology, evidence: object): string[] {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the projection holds no snapshot");
  const values = Object.values(evidence).flatMap(value => (Array.isArray(value) ? value : [value])).filter((value): value is string => typeof value === "string");
  return [
    snapshot.kind ?? "",
    snapshot.node.title,
    snapshot.node.statusText ?? "",
    ...(snapshot.evidenceRefs ?? []),
    snapshot.nativePayloadRef ?? "",
    snapshot.sourceVersion ?? "",
    snapshot.sourceRevision ?? "",
    ...topology.diagnostics,
    ...values,
  ];
}
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The words of `vocabulary` that `texts` hold as whole words, case folded (a letter, digit or underscore never neighbours a hit). */
function wordHits(texts: readonly string[], vocabulary: readonly string[]): string[] {
  return [...new Set(vocabulary)].filter(word => {
    const pattern = new RegExp(`(?<![A-Za-z0-9_])${escaped(word)}(?![A-Za-z0-9_])`, "i");
    return texts.some(text => pattern.test(text));
  });
}
/** Every string value of both captured records: what no surfaced string may carry. */
function capturedValues(capture: Capture): string[] {
  return spansOf(capture)
    .map(span => JSON.parse(`{${span.bytes}}`) as JsonObject)
    .flatMap(entry => Object.values(entry))
    .filter((value): value is string => typeof value === "string");
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
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
/** One registry invocation of the INJECTED preview whose reader answers a fresh copy of `envelope`, with the serialization taken
 * before the call: a reader or registry that rewrote a field in place could not match it. */
async function injectedReading(envelope: JsonObject): Promise<{ reading: JsonValue; calls: number; before: string }> {
  const before = JSON.stringify(envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      calls += 1;
      return JSON.parse(before) as Envelope;
    },
    ROOT,
  );
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls, before };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function lines(path: string): string[] {
  try {
    return readFileSync(path, "utf8").trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `stdout` and exits 0. */
function standInRf(stdout: JsonValue): string {
  const folder = makeScratch("rf-external-authority-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(stdout))});`,
      "process.exit(0);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing `envelope`. */
async function nativeReading(envelope: JsonObject): Promise<{ reading: JsonValue; spawns: string[][] }> {
  const log = standInRf(envelope);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, spawns: lines(log).map(line => JSON.parse(line) as string[]) };
}
/** The hosted Claude relay: the real curated MCP server (createCuratedTools) behind a real MCP client, its capability_invoke
 * reply parsed from the one text block it returns. */
async function hostedReply(envelope: JsonObject): Promise<{ isError: boolean; payload: JsonValue }> {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => JSON.parse(JSON.stringify(envelope)) as Envelope, ROOT);
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, ...GRANTS],
    principal: { id: "host-user", role: "reviewer" },
    workspace: ROOT,
    invocationId: "rf-external-authority-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-external-authority-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    const result = await client.callTool({
      name: "capability_invoke",
      arguments: { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: { model: "m", task: "t" } },
    });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) as JsonValue };
  } finally {
    await client.close();
    await server.instance.close();
  }
}
async function hostedValue(envelope: JsonObject): Promise<JsonValue> {
  const reply = await hostedReply(envelope);
  expect(reply.isError, "the hosted relay refused the capture render").toBe(false);
  const payload = objectOf(reply.payload, "hosted payload");
  expect(payload.kind).toBe("returned");
  return payload.value ?? null;
}

/** Every regular file below a root (symlinks are not followed). */
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
  return files;
}
const SRC = join(REPO, "src");
/** The src walk's floor (measured at base 0d7e911 and at dae1788: 115 .ts modules) and the module whose digest read must be found. */
const SRC_FLOOR = 100;
const ANCHOR_MODULE = "workbench/reactivefiber-observer.ts";
/** The src program's root modules relative to src, as TypeScript itself resolves tsconfig.json's include: the anchor of the src
 * walk outside this file's walker (wb-45bx, the refusal's F11). */
function programModules(): string[] {
  const config = ts.readConfigFile(join(REPO, "tsconfig.json"), ts.sys.readFile);
  if (config.error !== undefined) throw new Error("tsconfig.json does not parse");
  return ts
    .parseJsonConfigFileContent(config.config, ts.sys, REPO)
    .fileNames.filter(file => file.endsWith(".ts"))
    .map(file => relative(SRC, file))
    .sort();
}

const unwrapped = (node: ts.Expression): ts.Expression =>
  ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node) ? unwrapped(node.expression) : node;
/** Whether an expression names an `output` object: the identifier itself, or a property or string-literal element named output. */
function namesOutput(node: ts.Expression): boolean {
  const target = unwrapped(node);
  if (ts.isIdentifier(target)) return target.text === "output";
  if (ts.isPropertyAccessExpression(target)) return target.name.text === "output";
  return ts.isElementAccessExpression(target) && ts.isStringLiteralLike(target.argumentExpression) && target.argumentExpression.text === "output";
}
/** What the code does with one document read: a typeof guard, the argument of a digest `.update(...)`, or anything else by kind. */
function useOf(node: ts.Node): string {
  let parent = node.parent;
  while (parent !== undefined && (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent))) parent = parent.parent;
  if (parent === undefined) return "other:none";
  if (ts.isTypeOfExpression(parent)) return "typeof";
  if (ts.isCallExpression(parent) && parent.arguments.some(argument => unwrapped(argument) === node)) {
    const callee = unwrapped(parent.expression);
    if (ts.isPropertyAccessExpression(callee) && callee.name.text === "update") return "digest";
  }
  return `other:${ts.SyntaxKind[parent.kind]}`;
}
/** Every read of the rendered document in one module's source: `.text` (or a "text" string-literal element) on an `output`
 * object, each with its use. */
function documentReads(path: string, source: string): string[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  const reads: string[] = [];
  const visit = (node: ts.Node): void => {
    const read =
      (ts.isPropertyAccessExpression(node) && node.name.text === "text" && namesOutput(node.expression)) ||
      (ts.isElementAccessExpression(node) &&
        ts.isStringLiteralLike(node.argumentExpression) &&
        node.argumentExpression.text === "text" &&
        namesOutput(node.expression));
    if (read) reads.push(useOf(node));
    ts.forEachChild(node, visit);
  };
  visit(file);
  return reads;
}

/** One case's end: its title and the assertions it made on the way (vitest's count for the running test). */
interface End {
  readonly title: string;
  readonly assertions: number;
}
/** Every case's end, in run order: a case records it as its last statement, so a case that stops early records none. */
const ENDED: End[] = [];
function ended(title: string): void {
  ENDED.push({ title, assertions: expect.getState().assertionCalls });
}
/** One case's settled run: its title, mode and inversion, and the result state the runner settled on after every hook. */
interface Finish {
  readonly title: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string;
}
/** Every case's settled run, in run order (wb-wf9m, the wb-jdpn form): each case registers finished() as its first statement, so the
 * backstop reads what the runner settled on - a hook's run-time skip included - and no case hands its task to a call. */
const FINISHED: Finish[] = [];
function finished({ task }: TestContext): void {
  FINISHED.push({ title: `${task.name}`, mode: `${task.mode}`, fails: task.fails === true, state: `${task.result?.state ?? "no result"}` });
}
/** The pins that reached their end inside their own body, in run order, what each measured covering of the outside obligations,
 * and the witness each returned (the records case holds them to the roster again). */
const REACHED: string[] = [];
const COVERED = new Map<string, readonly string[]>();
const WITNESSES = new Map<string, JsonValue>();
/** A pin's witness, recorded as reached with what it measured covering: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonValue, covers: readonly string[] = []): JsonValue {
  REACHED.push(pin);
  COVERED.set(pin, [...covers]);
  WITNESSES.set(pin, json(witness));
  return witness;
}

/** Each pin's case: it asserts its own outcome and returns, through done(), the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const envelope = captureRender(BASE);
    const { reading, calls, before } = await injectedReading(envelope);
    const source = objectOf(reading, "reading").source ?? null;
    expect(calls).toBe(1);
    expect(JSON.stringify(source), "the injected reading rewrote the capture render").toBe(before);
    expect(textOf(reading)).toBe(documentOf(BASE));
    return done("A1", { calls, verbatim: JSON.stringify(source) === before, spans: spanCounts(textOf(reading), spansOf(BASE)) });
  },
  A2: async () => {
    const envelope = captureRender(BASE);
    const { reading, spawns } = await nativeReading(envelope);
    const source = objectOf(reading, "reading").source ?? null;
    expect(spawns).toHaveLength(1);
    expect(spawns[0], "the native preview spawned without --no-commit").toContain("--no-commit");
    expect(JSON.stringify(source), "the native reading rewrote the capture render").toBe(JSON.stringify(envelope));
    return done(
      "A2",
      { spawns: spawns.length, noCommit: (spawns[0] ?? []).includes("--no-commit"), verbatim: JSON.stringify(source) === JSON.stringify(envelope) },
      [`native:${PREVIEW_ID}`],
    );
  },
  A3: async () => {
    const modules = filesBelow(SRC).filter(file => file.endsWith(".ts"));
    const walked = modules.map(file => relative(SRC, file)).sort();
    const program = programModules();
    const reads = modules.flatMap(file => documentReads(file, readFileSync(file, "utf8")).map(use => `${relative(SRC, file)}:${use}`)).sort();
    const floorMet = modules.length >= SRC_FLOOR;
    const walkIsProgram = JSON.stringify(walked) === JSON.stringify(program);
    const anchorRead = reads.includes(`${ANCHOR_MODULE}:digest`);
    expect(floorMet, `src: ${modules.length} modules walked, floor ${SRC_FLOOR}`).toBe(true);
    expect(walked, "the src walk against the src program's root files (tsconfig.json's include, as TypeScript resolves it)").toEqual(program);
    expect(anchorRead, `the walk found no digest read in ${ANCHOR_MODULE}`).toBe(true);
    expect(reads.filter(read => read.includes(":other:")), "a src code path uses the rendered document beyond a typeof guard or a digest").toEqual([]);
    return done("A3", { floorMet, walkIsProgram, anchorRead, reads }, reads.map(read => `read:${read}`));
  },
  A4: async () => {
    const envelope = captureRender(BASE);
    const { reading } = await injectedReading(envelope);
    const shown = display(reading);
    const hosted = await hostedValue(envelope);
    const spans = spansOf(BASE);
    const producer = spanCounts(documentOf(BASE), spans);
    // The display form builds null-prototype objects, so the comparison is of the serialized bytes, the relay's own form.
    expect(JSON.stringify(hosted), "the hosted relay is not the shared display form of the reading").toBe(JSON.stringify(shown));
    expect(producer.every(count => count === 1), "a producer field span is not unique in the document").toBe(true);
    expect(spanCounts(textOf(shown), spans), "the shared display changed a field span").toEqual(producer);
    expect(spanCounts(textOf(hosted), spans), "the hosted relay changed a field span").toEqual(producer);
    return done("A4", {
      hostedIsDisplay: JSON.stringify(hosted) === JSON.stringify(shown),
      spans: spans.length,
      displaySpans: spanCounts(textOf(shown), spans),
      hostedSpans: spanCounts(textOf(hosted), spans),
    });
  },
  B1: async () => {
    const envelope = captureRender(BASE);
    const legs: Record<string, JsonValue> = {
      injected: (await injectedReading(envelope)).reading,
      native: (await nativeReading(envelope)).reading,
    };
    legs.display = display(legs.injected ?? null);
    legs.hosted = await hostedValue(envelope);
    const expected = { forge: json(forgeRecord(BASE.verdict)), bd: json(bdRecord(BASE.status)) };
    const parsed = Object.fromEntries(Object.entries(legs).map(([leg, reading]) => [leg, recordsIn(textOf(reading))]));
    for (const [leg, records] of Object.entries(parsed)) expect(records, `the ${leg} leg changed a captured field`).toStrictEqual(expected);
    return done("B1", { legs: Object.keys(parsed), forgeFields: forgeSpans(BASE.verdict).length, bdFields: bdSpans(BASE.status).length, unchanged: true });
  },
  B2: async () => {
    const envelope = captureRender(BASE);
    const typed = json(typedRecord(BASE));
    const legs: Record<string, JsonValue> = {
      injected: (await injectedReading(envelope)).reading,
      native: (await nativeReading(envelope)).reading,
    };
    legs.display = display(legs.injected ?? null);
    legs.hosted = await hostedValue(envelope);
    const carried = Object.fromEntries(Object.entries(legs).map(([leg, reading]) => [leg, JSON.stringify(resultOf(reading)[ADDITIVE_KEY] ?? null)]));
    for (const [leg, text] of Object.entries(carried)) expect(text, `the ${leg} leg changed the typed record`).toBe(JSON.stringify(typed));
    const records = objectOf(resultOf(legs.injected ?? null)[ADDITIVE_KEY], "the injected typed record").source_observations;
    return done("B2", { legs: Object.keys(carried), records: Array.isArray(records) ? records.length : 0, verbatim: true });
  },
  B3: async () => {
    const first = (await injectedReading(captureRender(BASE))).reading;
    const hop = objectOf(json(first), "serialized reading");
    const second = (await injectedReading(objectOf(hop.source, "serialized reading source"))).reading;
    const shown = display(second);
    expect(JSON.stringify(second), "a second hop changed the reading").toBe(JSON.stringify(first));
    expect(project(second), "a second hop changed the projection").toStrictEqual(project(first));
    expect(JSON.stringify(display(shown)), "a second display pass changed the display").toBe(JSON.stringify(shown));
    expect(sanitizeWorkbenchJsonText(shown)).toBe(JSON.stringify(shown));
    return done("B3", { secondHopVerbatim: true, projectionSame: true, displayIdempotent: true });
  },
  B4: async () => {
    const envelope = captureRender(BASE);
    const producerDigest = objectOf(objectOf(envelope.result, "result").output, "output").digest;
    const ref = payloadRef(project((await injectedReading(envelope)).reading));
    const other = payloadRef(project((await injectedReading(captureRender({ ...BASE, verdict: "FAIL" }))).reading));
    expect(ref).toBe(`rf-output:${String(producerDigest)}`);
    expect(ref).toBe(`rf-output:sha256:${sha256(documentOf(BASE))}`);
    expect(other, "one changed verdict word left the payload reference unchanged").not.toBe(ref);
    return done("B4", { producerDigest: true, oneWordChanges: true, digest: sha256(documentOf(BASE)).slice(0, 16) });
  },
  C1: async () => {
    const names = ROSTER.statuses.map(status => status.name);
    const measuredAlternates = [
      ...ROSTER.statuses.flatMap(status => [status.category, status.description]),
      ...ROSTER.dispositions.filter(word => wordHits([word], [...FORGE_VERDICTS, ...BD_STATUSES]).length === 0),
    ];
    const missing = [...new Set(measuredAlternates)].filter(word => !SYNONYMS.includes(word));
    const single = CELLS.filter(cell => {
      const text = documentOf(cell);
      return occurrences(text, `"verdict":${JSON.stringify(cell.verdict)}`) === 1 && occurrences(text, `"status": ${JSON.stringify(cell.status)}`) === 1;
    });
    expect([...FORGE_VERDICTS], "this file's verdicts against the measured roster").toStrictEqual([...ROSTER.verdicts]);
    expect([...BD_STATUSES], "this file's statuses against the measured roster").toStrictEqual(names);
    expect(missing, "a measured alternate word is missing from SYNONYMS").toEqual([]);
    expect(single).toHaveLength(CELLS.length);
    return done("C1", {
      verdicts: FORGE_VERDICTS.length,
      statuses: BD_STATUSES.length,
      cells: CELLS.length,
      singleWordCells: single.length,
      measuredAlternates: new Set(measuredAlternates).size,
    });
  },
  C2: async () => {
    let displayed = 0;
    for (const cell of CELLS) {
      const { reading } = await injectedReading(captureRender(cell));
      const spans = spansOf(cell);
      expect(textOf(reading), `${cell.verdict}/${cell.status}: the injected reading changed the document`).toBe(documentOf(cell));
      expect(spanCounts(textOf(display(reading)), spans), `${cell.verdict}/${cell.status}: the display changed a field span`).toEqual(spans.map(() => 1));
      displayed += 1;
    }
    let spawns = 0;
    for (const cell of COVER) {
      const envelope = captureRender(cell);
      const native = await nativeReading(envelope);
      const hosted = await hostedValue(envelope);
      spawns += native.spawns.length;
      expect(textOf(native.reading), `${cell.verdict}/${cell.status}: the native reading changed the document`).toBe(documentOf(cell));
      expect(spanCounts(textOf(hosted), spansOf(cell)), `${cell.verdict}/${cell.status}: the hosted relay changed a field span`).toEqual(spansOf(cell).map(() => 1));
    }
    const covered = { verdicts: new Set(COVER.map(cell => cell.verdict)).size, statuses: new Set(COVER.map(cell => cell.status)).size };
    expect(covered).toStrictEqual({ verdicts: FORGE_VERDICTS.length, statuses: BD_STATUSES.length });
    // Coverage: the status words bd's own export carries that every leg relayed (an exported word outside the matrix is uncovered).
    const relayed = new Set(COVER.map(cell => cell.status));
    return done(
      "C2",
      { injectedCells: CELLS.length, displayCells: displayed, nativeCells: COVER.length, hostedCells: COVER.length, spawns, covered },
      exportStatuses()
        .filter(status => relayed.has(status))
        .map(status => `status:${status}`),
    );
  },
  C3: async () => {
    const kinds = new Set<string>();
    const evidence = new Set<string>();
    for (const cell of CELLS) {
      const envelope = captureRender(cell);
      const result = objectOf(envelope.result, "result");
      const graph = String(objectOf(result.provenance, "provenance").graph_revision_id);
      const workspace = String(objectOf(envelope.workspace, "workspace").id);
      const { reading } = await injectedReading(envelope);
      const snapshot = project(reading).snapshots[0];
      expect(snapshot?.source).toStrictEqual({ provider: "reactivefiber", type: "context-preview", id: RF_FIXTURE_OPERATION_ID, scope: ROOT });
      expect(snapshot?.evidenceRefs).toStrictEqual([`rf-graph:${graph}`, `rf-workspace:${workspace}`, `rf-bundle:${String(result.bundle_revision_id)}`, `rf-cli:${RF_FIXTURE_RELEASE}`]);
      expect(snapshot?.nativePayloadRef).toBe(`rf-output:sha256:${sha256(documentOf(cell))}`);
      const native = nativeEvidence(PREVIEW_ID, reading);
      expect(native).toStrictEqual({ provider: "reactivefiber", nativeId: RF_FIXTURE_OPERATION_ID, sourceBasis: String(result.bundle_revision_id), producerRelease: RF_FIXTURE_RELEASE });
      for (const ref of snapshot?.evidenceRefs ?? []) kinds.add(ref.slice(0, ref.indexOf(":")));
      evidence.add(JSON.stringify(native));
    }
    expect(evidence.size, "native evidence varied with the captured words").toBe(1);
    return done("C3", {
      cells: CELLS.length,
      source: { provider: "reactivefiber", type: "context-preview" },
      evidenceRefKinds: [...kinds],
      evidenceKeys: Object.keys(JSON.parse([...evidence][0] ?? "{}") as JsonObject),
      statesDomainStatus: [...evidence].some(text => Object.hasOwn(JSON.parse(text) as JsonObject, "domainStatus")),
    });
  },
  C4: async () => {
    const shapes = new Set<string>();
    const refs = new Set<string>();
    const capturedHits = new Set<string>();
    const synonymHits = new Set<string>();
    for (const cell of CELLS) {
      const { reading } = await injectedReading(captureRender(cell));
      const topology = project(reading);
      const texts = surfaced(topology, nativeEvidence(PREVIEW_ID, reading));
      shapes.add(withoutPayload(topology));
      refs.add(payloadRef(topology));
      for (const word of wordHits(texts, capturedValues(cell))) capturedHits.add(word);
      for (const word of wordHits(texts, SYNONYMS)) synonymHits.add(word);
    }
    expect(shapes.size, "a projection varied with the captured verdict or status word").toBe(1);
    expect(refs.size, "two cells share one payload reference").toBe(CELLS.length);
    expect([...capturedHits], "a surfaced string carries a captured value").toEqual([]);
    expect([...synonymHits], "a surfaced string carries a minted synonym").toEqual([]);
    return done("C4", {
      cells: CELLS.length,
      distinctProjections: shapes.size,
      distinctPayloadRefs: refs.size,
      capturedHits: [...capturedHits],
      synonymHits: [...synonymHits],
    });
  },
  C5: async () => {
    const { reading } = await injectedReading(captureRender(BASE));
    let refusal: JsonValue = null;
    try {
      forgeGateTopology(reading, { scope: CONTEXT.scope, target: "workspace", capturedAt: CONTEXT.capturedAt, observedAt: CONTEXT.observedAt });
    } catch (error) {
      if (!(error instanceof CapabilityError)) throw error;
      refusal = { category: error.category, message: error.message };
    }
    // Every reader a fresh native registration holds, plus the landed fixed ids (the beads reader is registered elsewhere).
    const catalog = (await nativeCatalog()).map(entry => entry.id);
    const ids = [...new Set([...catalog, "forge.gate.status", "hyperunix.find", "furnace.run.inspect", "beads.work.readiness", PREVIEW_ID])];
    const evidence = Object.fromEntries(ids.map(id => [id, nativeEvidence(id, reading)]));
    expect(refusal, "the Forge reader adopted the rf capture").not.toBeNull();
    expect(ids.filter(id => Object.keys(evidence[id] ?? {}).length > 0)).toEqual([PREVIEW_ID]);
    expect(evidence[PREVIEW_ID]?.provider).toBe("reactivefiber");
    return done(
      "C5",
      {
        forgeReader: refusal,
        evidenceKeys: Object.fromEntries(ids.map(id => [id, Object.keys(evidence[id] ?? {})])),
        provider: evidence[PREVIEW_ID]?.provider ?? null,
      },
      [...catalog.map(id => `reader:${id}`), `authority:${authorityOf(readBeadRow().notes)}`],
    );
  },
  Q1: async () => {
    const envelope = captureRender(BASE);
    const { reading } = await injectedReading(envelope);
    const shown = textOf(display(reading));
    const hosted = textOf(await hostedValue(envelope));
    const witness = {
      documentChanged: shown !== documentOf(BASE),
      forgeRecordKept: shown.includes(forgeBytes(BASE.verdict)),
      bdRecordKept: shown.includes(bdBytes(BASE.status)),
      hostedSame: hosted === shown,
      spansKept: spanCounts(shown, spansOf(BASE)).every(count => count === 1),
      bdParsesSame: JSON.stringify(recordsIn(shown).bd) === JSON.stringify(bdRecord(BASE.status)),
    };
    expect(witness).toStrictEqual({ documentChanged: true, forgeRecordKept: true, bdRecordKept: false, hostedSame: true, spansKept: true, bdParsesSame: true });
    return done("Q1", witness, witness.documentChanged ? ["display:document"] : []);
  },
  Q2: async () => {
    const capture: Capture = { ...BASE, lead: Array.from({ length: 200 }, (_, index) => `context line ${index}`).join("\n") };
    const document = documentOf(capture);
    const { reading } = await injectedReading(captureRender(capture));
    const shown = textOf(display(reading));
    const forge = forgeSpans(capture.verdict);
    const witness = {
      pastBound: document.indexOf(FORGE_HEADING) > WORKBENCH_TEXT_LIMIT,
      displayMarksCut: shown.endsWith("[truncated]"),
      displayForgeSpans: spanCounts(shown, forge).reduce((sum, count) => sum + count, 0),
      readingForgeSpans: spanCounts(textOf(reading), forge).reduce((sum, count) => sum + count, 0),
      digestCoversAll: payloadRef(project(reading)) === `rf-output:sha256:${sha256(document)}`,
    };
    expect(witness).toStrictEqual({ pastBound: true, displayMarksCut: true, displayForgeSpans: 0, readingForgeSpans: forge.length, digestCoversAll: true });
    return done("Q2", witness, witness.displayMarksCut ? [`display:bound:${WORKBENCH_TEXT_LIMIT}`] : []);
  },
  Q3: async () => {
    const title = `fixture${ZERO_WIDTH}task`;
    const capture: Capture = { ...BASE, title };
    const { reading } = await injectedReading(captureRender(capture));
    const shown = textOf(display(reading));
    const closed = spansOf(capture).filter(span => span.key !== "title");
    const witness = {
      readingKeepsUnit: textOf(reading).includes(JSON.stringify(title)),
      displayTitle: recordsIn(shown).bd,
      closedSpansKept: spanCounts(shown, closed).every(count => count === 1),
    };
    expect(witness.readingKeepsUnit).toBe(true);
    expect(witness.displayTitle).toStrictEqual(bdRecord(capture.status, "fixturetask"));
    expect(witness.closedSpansKept).toBe(true);
    return done("Q3", witness, shown.includes(ZERO_WIDTH) ? [] : ["display:unit"]);
  },
  Q4: async () => {
    const plain = project((await injectedReading(captureRender(BASE))).reading);
    const varied = project((await injectedReading(captureRender(BASE, typedRecord({ verdict: "FAIL", status: "closed" })))).reading);
    const witness = { projectionSame: JSON.stringify(varied) === JSON.stringify(plain), payloadRefSame: payloadRef(varied) === payloadRef(plain) };
    expect(witness).toStrictEqual({ projectionSame: true, payloadRefSame: true });
    return done("Q4", witness, witness.projectionSame ? ["adapter:additive"] : []);
  },
  Q5: async () => {
    const counted = documentReads("counted.ts", "if (typeof output.text !== 'string') throw 0; hash.update(output.text); output.text.trim();");
    const unseen = documentReads(
      "unseen.ts",
      "const doc = output; doc.text.replace('a', 'b'); const { text } = output; text.trim(); output['te' + 'xt'].trim();",
    );
    expect(counted).toEqual(["typeof", "digest", "other:PropertyAccessExpression"]);
    expect(unseen).toEqual([]);
    return done("Q5", { counted, unseen });
  },
  Q6: async () => {
    const outside = wordHits(["forge verdict: shipped"], SYNONYMS);
    const inside = wordHits(["forge verdict: passed"], SYNONYMS);
    expect(outside).toEqual([]);
    expect(inside).toEqual(["passed"]);
    return done("Q6", { outside, inside });
  },
  Q7: async () => {
    const capture: Capture = { ...BASE, title: SHAPED_TITLE };
    const envelope = captureRender(capture);
    const { reading } = await injectedReading(envelope);
    const shown = textOf(display(reading));
    const hosted = textOf(await hostedValue(envelope));
    const closed = spansOf(capture).filter(span => span.key !== "title");
    const witness = {
      readingKeepsTitle: textOf(reading).includes(JSON.stringify(SHAPED_TITLE)),
      displayTitle: recordsIn(shown).bd,
      hostedSame: hosted === shown,
      closedSpansKept: spanCounts(shown, closed).every(count => count === 1),
    };
    expect(witness.readingKeepsTitle, "the injected reading changed the shaped title").toBe(true);
    expect(witness.displayTitle, "the display's shape rewrite of the title").toStrictEqual(bdRecord(capture.status, "[REDACTED] task"));
    expect(witness.hostedSame, "the hosted relay is not the display form").toBe(true);
    expect(witness.closedSpansKept, "the shape rewrite reached a verdict, status or id span").toBe(true);
    const rewritten = JSON.stringify(witness.displayTitle) !== JSON.stringify(bdRecord(capture.status, SHAPED_TITLE));
    return done("Q7", witness, rewritten ? ["display:shape"] : []);
  },
};

/** The obligations the pins' measured coverage must equal, each derived from a source outside this file and its roster: a fresh
 * native registration, the rendered-document reads in the src program's root modules, the owner filing and the status words in the
 * tracked bead export, and the src display and adapter measured on the shared fixture. */
async function obligations(): Promise<string[]> {
  const catalog = await nativeCatalog();
  const reads = programModules().flatMap(module => documentReads(module, readFileSync(join(SRC, module), "utf8")).map(use => `read:${module}:${use}`));
  const changes = (text: string): boolean => sanitizeWorkbenchJson(text) !== text;
  const plain = project((await injectedReading(captureRender(BASE))).reading);
  const varied = project((await injectedReading(captureRender(BASE, typedRecord({ verdict: "FAIL", status: "closed" })))).reading);
  return [
    ...catalog.map(entry => `reader:${entry.id}`),
    ...catalog.filter(entry => entry.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE).map(entry => `native:${entry.id}`),
    ...reads,
    `authority:${authorityOf(readBeadRow().notes)}`,
    ...exportStatuses().map(status => `status:${status}`),
    ...(changes(documentOf(BASE)) ? ["display:document"] : []),
    ...(changes("x".repeat(WORKBENCH_TEXT_LIMIT + 1)) ? [`display:bound:${WORKBENCH_TEXT_LIMIT}`] : []),
    ...(changes(`fixture${ZERO_WIDTH}task`) ? ["display:unit"] : []),
    ...(changes(SHAPED_TITLE) ? ["display:shape"] : []),
    ...(JSON.stringify(plain) === JSON.stringify(varied) ? ["adapter:additive"] : []),
  ];
}

/** One test of this file's vitest task tree, read into primitives by an inline walk (wb-wf9m, the wb-jdpn form: the census tier's
 * judge reads a case only while no task is handed to a call or placed in a literal, so no judge hands its task to a helper). Its
 * state is the result state, or "no result" for a test that has none. */
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string;
  readonly self: boolean;
}
const shownTask = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state}`;

/** The file's own registrations as the judges require them: the two judges at file scope around the census suite. */
const FILE_SCOPE: readonly string[] = [`test:${JUDGED_TITLE}`, `suite:${CENSUS_TITLE}`, `test:${RECORDS_TITLE}`];

it(JUDGED_TITLE, { timeout: 60_000 }, ({ task }) => {
  onTestFinished(finished);
  expect.assertions(JUDGED_ASSERTIONS);
  expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:4", "C:5", "Q:7"]);
  expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
    ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
  );
  expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  expect({ pin: PIN, excerpt: excerptSha256(ROSTER.excerpt), synonyms: [...SYNONYMS] }).toStrictEqual({
    pin: ROSTER.pin,
    excerpt: EXCERPT_SHA256,
    synonyms: [...ROSTER.synonyms],
  });
  expect({ bead: BEAD, residuals: RESIDUALS.map(entry => ({ ...entry })) }).toStrictEqual({
    bead: ROSTER.bead,
    residuals: ROSTER.residuals.map(entry => ({ ...entry })),
  });
  expect(
    RESIDUALS.map(entry => entry.pin),
    "every residual family's quiet row, in row Q's order",
  ).toEqual(ROWS.find(row => row.id === "Q")?.pins ?? []);
  expect([...ROSTER.tests], "the roster's registered titles: the judged set, every pin in row order, the records case").toEqual([
    JUDGED_TITLE,
    ...ROWS.flatMap(row => row.pins),
    RECORDS_TITLE,
  ]);
  // wb-wf9m: the census-tier run pin is this file's out-of-file anchor, so it is never deleted or edited alone.
  expect({ file: ROSTER.runPin.file, sha256: digestOf(RUN_PIN) }, "the run pin's path and its bytes' sha256 against the roster's runPin").toStrictEqual({
    file: RUN_PIN,
    sha256: ROSTER.runPin.sha256,
  });
  // The registration at collection (vitest's task tree): every roster title once, in order, in run mode, not inverted, and the
  // two judges registered at file scope, outside every suite, around the census suite. The tree is read INLINE (wb-wf9m, the wb-jdpn
  // form): no task is handed to a call or placed in a literal, each is read into primitives at the three levels this file nests, and a
  // suite nested deeper is recorded by its name, so the title compare reds on it rather than miss what it holds.
  const walked: Registered[] = [];
  const own: string[] = [];
  for (const top of task.file.tasks) {
    own.push(`${top.type}:${top.name}`);
    if (top.type !== "suite") {
      walked.push({ name: `${top.name}`, mode: `${top.mode}`, fails: top.fails === true, state: `${top.result?.state ?? "no result"}`, self: top.id === task.id });
      continue;
    }
    for (const middle of top.tasks) {
      if (middle.type !== "suite") {
        walked.push({ name: `${middle.name}`, mode: `${middle.mode}`, fails: middle.fails === true, state: `${middle.result?.state ?? "no result"}`, self: middle.id === task.id });
        continue;
      }
      for (const leaf of middle.tasks) {
        walked.push({
          name: leaf.type === "suite" ? `suite ${leaf.name}` : `${leaf.name}`,
          mode: `${leaf.mode}`,
          fails: leaf.type === "suite" ? false : leaf.fails === true,
          state: `${leaf.result?.state ?? "no result"}`,
          self: leaf.id === task.id,
        });
      }
    }
  }
  expect(
    walked.map(entry => entry.name),
    "every registered test of this file, exactly and in roster order",
  ).toEqual([...ROSTER.tests]);
  expect(
    walked.filter(entry => entry.mode !== "run" || entry.fails).map(shownTask),
    "every test is registered in run mode and not inverted",
  ).toEqual([]);
  expect(own, "the file's own registrations: the two judges at file scope around the census suite").toEqual([...FILE_SCOPE]);
  // The outside anchor of the rows: the owner filing's row in the tracked bead export.
  const bead = readBeadRow();
  const clauses = acceptanceClauses(bead.notes);
  expect(
    clauses.map(clause => clause.slice(0, 4)),
    "the filing lists acceptance (a), (b) and (c)",
  ).toEqual(["(a) ", "(b) ", "(c) "]);
  expect(
    clauses.map(clause => ROWS.filter(row => row.label.includes(clause)).map(row => row.id)),
    "each acceptance clause sits verbatim in exactly one row label",
  ).toEqual([["A"], ["B"], ["C"]]);
  const source = sourceOf(bead.notes);
  const citation = `${ROSTER.sourcePath}:78@${PIN.slice(0, 12)}`;
  expect({
    citation: source.citation,
    titleCites: bead.title.endsWith(citation),
    quoteEndsLine78: ROSTER.excerpt[2]?.endsWith(source.quote) ?? false,
    authorityEndsLine78: ROSTER.excerpt[2]?.endsWith(authorityOf(bead.notes)) ?? false,
    cf: source.cf,
  }).toStrictEqual({ citation, titleCites: true, quoteEndsLine78: true, authorityEndsLine78: true, cf: [ROSTER.excerpt[0], ROSTER.excerpt[1]] });
  ended(JUDGED_TITLE);
});

/** The census suite: the rows, each pin's case. Its collector is held in no binding (wb-wf9m: the census tier's judge refuses a
 * describe's collector that escapes into a declaration); the backstop below reads the file task vitest hands a file-level hook. */
describe(CENSUS_TITLE, () => {
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          onTestFinished(finished);
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          ended(pin);
        });
      }
    });
  }
});

it(RECORDS_TITLE, { timeout: 120_000 }, async ({ task }) => {
  onTestFinished(finished);
  expect.assertions(RECORDS_ASSERTIONS);
  // The tree read INLINE again, after the run (wb-wf9m, the wb-jdpn form): no task handed to a call or placed in a literal.
  const walked: Registered[] = [];
  const own: string[] = [];
  for (const top of task.file.tasks) {
    own.push(`${top.type}:${top.name}`);
    if (top.type !== "suite") {
      walked.push({ name: `${top.name}`, mode: `${top.mode}`, fails: top.fails === true, state: `${top.result?.state ?? "no result"}`, self: top.id === task.id });
      continue;
    }
    for (const middle of top.tasks) {
      if (middle.type !== "suite") {
        walked.push({ name: `${middle.name}`, mode: `${middle.mode}`, fails: middle.fails === true, state: `${middle.result?.state ?? "no result"}`, self: middle.id === task.id });
        continue;
      }
      for (const leaf of middle.tasks) {
        walked.push({
          name: leaf.type === "suite" ? `suite ${leaf.name}` : `${leaf.name}`,
          mode: `${leaf.mode}`,
          fails: leaf.type === "suite" ? false : leaf.fails === true,
          state: `${leaf.result?.state ?? "no result"}`,
          self: leaf.id === task.id,
        });
      }
    }
  }
  const titles = walked.map(entry => entry.name);
  expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
  expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
  const here = walked.findIndex(entry => entry.self);
  expect(here, "this case finds itself by task id, registered last").toBe(walked.length - 1);
  expect(own, "the file's own registrations: the two judges at file scope around the census suite").toEqual([...FILE_SCOPE]);
  expect({ file: ROSTER.runPin.file, sha256: digestOf(RUN_PIN) }, "the run pin's path and its bytes' sha256 against the roster's runPin").toStrictEqual({
    file: RUN_PIN,
    sha256: ROSTER.runPin.sha256,
  });
  const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
  expect(
    walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(shownTask),
    "every other test is in run mode, not inverted, and ran before this case",
  ).toEqual([]);
  expect(
    ENDED.map(end => end.title),
    "every other case reached its end, in registration order",
  ).toEqual(titles.filter((_, index) => index !== here));
  expect(ENDED.find(end => end.title === JUDGED_TITLE)?.assertions, "the judged set's assertions on the way to its end").toBe(JUDGED_ASSERTIONS);
  expect(REACHED, "every pin's case reached its end inside its own body, in row order").toEqual(ROWS.flatMap(row => row.pins));
  const pins = ROWS.flatMap(row => row.pins);
  expect(
    pins.map(pin => WITNESSES.get(pin) ?? null),
    "every pin's returned witness against the roster's",
  ).toStrictEqual(pins.map(pin => rosterWitness(pin)));
  const required = [...new Set(await obligations())].sort();
  const covered = [...new Set([...COVERED.values()].flat())].sort();
  expect(required.filter(entry => !covered.includes(entry)), "outside obligations no pin that reached its end covers").toEqual([]);
  expect(covered.filter(entry => !required.includes(entry)), "coverage no outside obligation asks for").toEqual([]);
  ended(RECORDS_TITLE);
});

// The backstop no single test, suite or hook modifier inside this file's registrations reaches. It reads FINISHED - each case's mode,
// inversion and the result the runner settled on, after every hook - and ENDED, so it needs no judge to have run and holds no suite
// collector (wb-wf9m, the wb-jdpn form: the census tier's judge refuses a describe's collector held in a binding). A registered test
// missing from FINISHED or out of roster order, or one not in run mode, inverted, or settled other than pass or fail (a hook's run-time
// skip), reds here; unless a case failed, every case's end is recorded in registration order, the records case's at its declared
// count. A failed case already reds the run, so the backstop names only a quiet miss (a run-time skip, an early return, a missing
// registration). Vitest runs this hook unless every task is skipped at collection - R-ALL-SKIP, which one line reaches (see NOT
// CLAIMED in the header) - and the census-tier run pin reds that instead.
afterAll(() => {
  const titles = FINISHED.map(entry => entry.title);
  if (JSON.stringify(titles) !== JSON.stringify(ROSTER.tests)) {
    throw new Error(`the cases that finished are not every registered test, in roster order: ${titles.join("; ") || "none"}`);
  }
  const quiet = FINISHED.filter(entry => entry.mode !== "run" || entry.fails || (entry.state !== "pass" && entry.state !== "fail")).map(
    entry => `${entry.title} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state}`,
  );
  if (quiet.length > 0) throw new Error(`a registered test did not run to a pass or a fail: ${quiet.join("; ")}`);
  if (FINISHED.some(entry => entry.state === "fail")) return;
  const ends = ENDED.map(end => end.title);
  const records = ENDED.find(end => end.title === RECORDS_TITLE)?.assertions;
  if (JSON.stringify(ends) !== JSON.stringify(titles) || records !== RECORDS_ASSERTIONS) {
    throw new Error(`a case passed without reaching its end: ${ends.length} of ${titles.length} ends recorded, the records case's after ${records ?? "no"} of its ${RECORDS_ASSERTIONS} assertions`);
  }
});
