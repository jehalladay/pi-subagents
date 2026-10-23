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
 *    census of every src module: the rendered document (`.text` read on an `output` object) is read exactly three times - two
 *    typeof guards and the adapter's sha256 update - so no read of that form transforms, parses or re-labels it (R-COMPUTED-ACCESS
 *    names the reads this census cannot see); A4 the hosted Claude relay
 *    replies with exactly the shared display form of the reading, and in both every Forge and bd field span (the key and value
 *    bytes as the producer wrote them) occurs exactly once, as in the producer's document.
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
 * and pins, every pin's witness, the excerpt, the vocabularies and SYNONYMS - is held to the out-of-file roster
 * test/fixtures/rf-external-authority-echo-roster.json.
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
 * so a constant minted word outside it is caught by neither half of C4 (Q6).
 * SCOPE: the vocabularies are producer facts at the measured releases; Pi vendors no rf, Forge or bd source, so a producer change
 * is seen only when a re-measure re-reads them. The armed half, a reader of the typed assembly descriptor, waits for the descriptor
 * (04-target section 3): no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import { fullShapeRf, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_RELEASE } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

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
      "(a) a Pi projection of rf-captured Forge/Beads data preserves the producer's verdict and status bytes: the injected and native readings, the shared display and the hosted Claude relay change no captured field, and no `.text` read of the rendered document in src does more than type-check or digest it",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) round-tripping an rf capture through Pi surfaces leaves the external-authority fields byte-identical: both records parse back unchanged from every leg, typed fields on an additive key included, a second hop and a second display pass change nothing, and the payload digest tracks the exact bytes",
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
      "the named residuals stay pinned quiet: display line-break fold, display text bound, free-text strip, additive key unread, computed document access, synonym vocabulary",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
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
interface Roster {
  readonly pin: string;
  readonly excerpt: readonly string[];
  readonly verdicts: readonly string[];
  readonly dispositions: readonly string[];
  readonly statuses: readonly RosterStatus[];
  readonly synonyms: readonly string[];
  readonly rows: readonly RosterRow[];
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
    pin: raw.pin,
    excerpt: strings(raw.excerpt, "excerpt"),
    verdicts: strings(forge.verdicts, "measured.forge.verdicts"),
    dispositions: strings(forge.dispositions, "measured.forge.dispositions"),
    statuses,
    synonyms: strings(raw.synonyms, "synonyms"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
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

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const envelope = captureRender(BASE);
    const { reading, calls, before } = await injectedReading(envelope);
    const source = objectOf(reading, "reading").source ?? null;
    expect(calls).toBe(1);
    expect(JSON.stringify(source), "the injected reading rewrote the capture render").toBe(before);
    expect(textOf(reading)).toBe(documentOf(BASE));
    return { calls, verbatim: JSON.stringify(source) === before, spans: spanCounts(textOf(reading), spansOf(BASE)) };
  },
  A2: async () => {
    const envelope = captureRender(BASE);
    const { reading, spawns } = await nativeReading(envelope);
    const source = objectOf(reading, "reading").source ?? null;
    expect(spawns).toHaveLength(1);
    expect(spawns[0], "the native preview spawned without --no-commit").toContain("--no-commit");
    expect(JSON.stringify(source), "the native reading rewrote the capture render").toBe(JSON.stringify(envelope));
    return { spawns: spawns.length, noCommit: (spawns[0] ?? []).includes("--no-commit"), verbatim: JSON.stringify(source) === JSON.stringify(envelope) };
  },
  A3: async () => {
    const modules = filesBelow(SRC).filter(file => file.endsWith(".ts"));
    const reads = modules.flatMap(file => documentReads(file, readFileSync(file, "utf8")).map(use => `${relative(SRC, file)}:${use}`)).sort();
    const floorMet = modules.length >= SRC_FLOOR;
    const anchorRead = reads.includes(`${ANCHOR_MODULE}:digest`);
    expect(floorMet, `src: ${modules.length} modules walked, floor ${SRC_FLOOR}`).toBe(true);
    expect(anchorRead, `the walk found no digest read in ${ANCHOR_MODULE}`).toBe(true);
    expect(reads.filter(read => read.includes(":other:")), "a src code path uses the rendered document beyond a typeof guard or a digest").toEqual([]);
    return { floorMet, anchorRead, reads };
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
    return { hostedIsDisplay: JSON.stringify(hosted) === JSON.stringify(shown), spans: spans.length, displaySpans: spanCounts(textOf(shown), spans), hostedSpans: spanCounts(textOf(hosted), spans) };
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
    return { legs: Object.keys(parsed), forgeFields: forgeSpans(BASE.verdict).length, bdFields: bdSpans(BASE.status).length, unchanged: true };
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
    return { legs: Object.keys(carried), records: Array.isArray(records) ? records.length : 0, verbatim: true };
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
    return { secondHopVerbatim: true, projectionSame: true, displayIdempotent: true };
  },
  B4: async () => {
    const envelope = captureRender(BASE);
    const producerDigest = objectOf(objectOf(envelope.result, "result").output, "output").digest;
    const ref = payloadRef(project((await injectedReading(envelope)).reading));
    const other = payloadRef(project((await injectedReading(captureRender({ ...BASE, verdict: "FAIL" }))).reading));
    expect(ref).toBe(`rf-output:${String(producerDigest)}`);
    expect(ref).toBe(`rf-output:sha256:${sha256(documentOf(BASE))}`);
    expect(other, "one changed verdict word left the payload reference unchanged").not.toBe(ref);
    return { producerDigest: true, oneWordChanges: true, digest: sha256(documentOf(BASE)).slice(0, 16) };
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
    return {
      verdicts: FORGE_VERDICTS.length,
      statuses: BD_STATUSES.length,
      cells: CELLS.length,
      singleWordCells: single.length,
      measuredAlternates: new Set(measuredAlternates).size,
    };
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
    return { injectedCells: CELLS.length, displayCells: displayed, nativeCells: COVER.length, hostedCells: COVER.length, spawns, covered };
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
    return {
      cells: CELLS.length,
      source: { provider: "reactivefiber", type: "context-preview" },
      evidenceRefKinds: [...kinds],
      evidenceKeys: Object.keys(JSON.parse([...evidence][0] ?? "{}") as JsonObject),
      statesDomainStatus: [...evidence].some(text => Object.hasOwn(JSON.parse(text) as JsonObject, "domainStatus")),
    };
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
    return { cells: CELLS.length, distinctProjections: shapes.size, distinctPayloadRefs: refs.size, capturedHits: [...capturedHits], synonymHits: [...synonymHits] };
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
    const ids = ["forge.gate.status", "hyperunix.find", "furnace.run.inspect", "beads.work.readiness", PREVIEW_ID];
    const evidence = Object.fromEntries(ids.map(id => [id, nativeEvidence(id, reading)]));
    expect(refusal, "the Forge reader adopted the rf capture").not.toBeNull();
    expect(ids.filter(id => Object.keys(evidence[id] ?? {}).length > 0)).toEqual([PREVIEW_ID]);
    expect(evidence[PREVIEW_ID]?.provider).toBe("reactivefiber");
    return {
      forgeReader: refusal,
      evidenceKeys: Object.fromEntries(ids.map(id => [id, Object.keys(evidence[id] ?? {})])),
      provider: evidence[PREVIEW_ID]?.provider ?? null,
    };
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
    return witness;
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
    return witness;
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
    return witness;
  },
  Q4: async () => {
    const plain = project((await injectedReading(captureRender(BASE))).reading);
    const varied = project((await injectedReading(captureRender(BASE, typedRecord({ verdict: "FAIL", status: "closed" })))).reading);
    const witness = { projectionSame: JSON.stringify(varied) === JSON.stringify(plain), payloadRefSame: payloadRef(varied) === payloadRef(plain) };
    expect(witness).toStrictEqual({ projectionSame: true, payloadRefSame: true });
    return witness;
  },
  Q5: async () => {
    const counted = documentReads("counted.ts", "if (typeof output.text !== 'string') throw 0; hash.update(output.text); output.text.trim();");
    const unseen = documentReads(
      "unseen.ts",
      "const doc = output; doc.text.replace('a', 'b'); const { text } = output; text.trim(); output['te' + 'xt'].trim();",
    );
    expect(counted).toEqual(["typeof", "digest", "other:PropertyAccessExpression"]);
    expect(unseen).toEqual([]);
    return { counted, unseen };
  },
  Q6: async () => {
    const outside = wordHits(["forge verdict: shipped"], SYNONYMS);
    const inside = wordHits(["forge verdict: passed"], SYNONYMS);
    expect(outside).toEqual([]);
    expect(inside).toEqual(["passed"]);
    return { outside, inside };
  },
};

describe("wb-hs2j.9 rf external-authority echo census (RF-REACTIVE-CONTEXT-ASSEMBLY-R10, echo-only posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the quoted excerpt and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:4", "C:5", "Q:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ pin: PIN, excerpt: excerptSha256(ROSTER.excerpt), synonyms: [...SYNONYMS] }).toStrictEqual({
      pin: ROSTER.pin,
      excerpt: EXCERPT_SHA256,
      synonyms: [...ROSTER.synonyms],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
