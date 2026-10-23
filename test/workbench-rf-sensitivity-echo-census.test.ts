/**
 * wb-o4h0.6 (RF-FEDERATED-WORKSPACES-R8). Statement (bead notes, dashes as hyphens): "No Pi surface shall relabel or downgrade an
 * imported resource's producer sensitivity classification - sensitivity fields echo verbatim, redaction follows the strictest
 * applicable owner/consumer policy (pinnable today; fields ship with FW-08, open) - and if Pi ever authors a
 * reactive-fiber.federation-link/v1 manifest or committed link alias (gated FW-04/FW-04b-2, open) it shall never commit transport
 * credentials or capability secrets as manifest content" (docs/programs/federated-workspaces-2026-10-18/05-authority-consistency.md
 * :25@6a251bf73af5). Acceptance: the labels of rows A-D are its four clauses verbatim, held to the bead export below.
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat): the
 * roster vendors seven producer excerpts verbatim, each hashed here (EXCERPT_SHA256, `git show <pin>:<path> | sed -n '<range>p' |
 * sha256sum`): the statement 05:25; the A-side link record 03:10 (LINK_SCHEMA and LINK_FIELDS are parsed from it, and it says
 * "Transport credentials/capability secrets are never committed as ordinary shared manifest content"); I06 03:54; N04 01:27; rf's
 * redaction vocabulary src/reactive_fiber_cli/domain/trust.py:553-554 (LEVELS, "ordered from least to most sensitive"); and
 * src/reactive_fiber_cli/schemas/cli/context.render.schema.json:1529-1536, the TRUST-SEC-A33 sensitivity every result.observations
 * row states (ROW_CLASSES). That last field is SHIPPED: the --no-commit render envelope Pi's one rf reader admits
 * (providers/reactivefiber.ts isObservationRows) already carries a producer classification per observation row, so row A runs
 * live against it. NOT shipped at the pin (a git grep of the link schema id over rf src is empty): the link loader and the link
 * verbs (FW-04 rfc-0txnl.10, FW-04b-2 rfc-0txnl.20) and the imported-record classification of FW-08 (rfc-0txnl.17).
 *
 * THE REFERENCE RULES (the rules a future import or link surface must match; no reader or author is added or faked here):
 *  echo - every SENSITIVITY_FIELD key of a reading surfaces with the producer's word at the same path, through the provider reading
 *    and the shared JSON sanitizers (sanitizeWorkbenchJson, sanitizeWorkbenchJsonText: the structured pass the capability-output
 *    surfaces take, claude-capability-tools.ts encoded, workbench/execute.ts sanitizedJson, index.ts sanitizeWorkbenchJsonText);
 *    relabels() names each path whose word was lowered, raised, replaced, dropped or added.
 *  strictest - a surfaced class is the later of the owner's and the consumer's on the pinned ascending LEVELS (rf join_levels); a
 *    local declaration may raise a class, never lower it (admitDeclared, I06 and N04). For content, the owner's redaction markers
 *    stay and Pi's own hygiene redaction applies on top, so text is redacted wherever either policy redacts it.
 *  manifest - manifestFindings(): the schema id exactly LINK_SCHEMA, only the 03:10 fields and every required one, capability_ref
 *    (when present) a scheme:reference string (CAPABILITY_REF, this census's floor: the producer pins no grammar), and nothing the
 *    shared hygiene redaction rewrites (redaction.ts is bounded diagnostic hygiene, not a claim of universal secret detection).
 *  rename - renameFindings(): an alias rename moves the alias alone, and the new alias carries no identity material (an expected
 *    id, the locator, an rfw_/rfi_ id) and nothing the hygiene redaction rewrites.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; each acceptance row's parts are its clause's
 * "; "-separated claims, each with the pins that prove it):
 *  A, acceptance (a). A1 the producer vocabulary at the pin (LEVELS, ROW_CLASSES a sub-vocabulary in order); A2 a stand-in rf
 *    answers with a full-shape render envelope whose observation rows state secret, internal and public, and the provider's
 *    reading carries it byte for byte, each word at its path; A3 both shared JSON sanitizers surface every word verbatim; A4 the
 *    relabels() checker finds nothing on the real surfaces and names each planted overwrite (to internal, to public, upward, an
 *    unknown word, a dropped field); A5 the reader adapter (reactivefiberTopology) surfaces no class word and no other row field,
 *    so no projection string can carry a relabelled class; A6 an AST scan of every src module finds no write to a
 *    SENSITIVITY_FIELD key (assignment, compound assignment, delete, object-literal property, shorthand, string or computed literal
 *    key, Object.defineProperty, Reflect.set or Reflect.defineProperty), with a floor, an anchor and read/compare/type controls.
 *  B, acceptance (b). B1 strictest() over all LEVELS pairs is the join on the pinned order and admitDeclared() refuses each of the
 *    six lowerings and an unknown word; B2 the owner's two TRUST-SEC-A34 marker forms in output.text survive both sanitizers as
 *    verbatim substrings; B3 where the owner left a value Pi's hygiene redaction matches, the surfaced text is Pi's redaction
 *    beside the owner's markers and the labels stay verbatim (the shared text layout shows a line break as a space); B4 the reader
 *    adapter withholds the text, its payload reference the sha256 of the owner's bytes, and shows no line of it.
 *  C, acceptance (c). C1 Pi authors no link manifest: no src module or qa file spells LINK_FAMILY and no data file under src,
 *    test, docs or qa declares a link-family schema (floors and anchors per tree); C2 manifestFindings() over a clean manifest and
 *    planted ones (an assignment in the locator, a secret-named extra field, a credential-shaped capability_ref, an unknown field);
 *    C3 the capability_ref rule: a reference passes, an inline object, inline bytes, a spaced value and a credential shape do not.
 *  D, acceptance (d). D1 LINK_SCHEMA is the excerpt's and the acceptance's id, and every near spelling is refused as not exact; D2
 *    renameFindings() over a clean rename and planted ones; D3 Pi has no link-alias commit path: no src module spells an rf
 *    workspace link verb (an argv "workspace" then link, links or unlink, or a string or template literal spelling one), and the
 *    native registration's rf descriptors are reactivefiber.render.preview alone.
 *  MA and MC, the matchers rows A6 and C1 read: MA1-MA12 and MC1-MC7 the spellings each must catch; QA1-QA3, QS1, QC1 and QC2 the
 *    pinned quiet rows of their named residuals.
 * FROZEN SHAPE (standing rule 16) AND OUTSIDE ANCHORS: ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set (each
 * row's id, label, parts and pins, each pin's witness, the vocabularies) is held to the out-of-file roster
 * test/fixtures/rf-sensitivity-echo-roster.json, whose excerpts are held to the pin by EXCERPT_SHA256 and from which the
 * vocabularies are DERIVED. The tracked bead export (.beads/issues.jsonl, row wb-o4h0.6) anchors the rows themselves: its
 * Acceptance line's four clauses are rows A-D's labels in order, every claim of a clause is a part, and every part needs a pin; its
 * Gating line names exactly GATING_ARTIFACTS, in order, and its quote is the 05:25 excerpt. So a row, a claim or a sole-proving pin removed from every
 * literal of this file and from the roster at once still reds. Not claimed: one of two pins proving the same part, or a matcher pin
 * (rows MA and MC, whose only out-of-file anchor is the roster), removed from this file and the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-COMPUTED a write through a non-literal key (QA1); R-SYNONYM a classification
 * under a name outside SENSITIVITY_FIELD (QA2); R-COMPOSED-KEY a key assembled at runtime (QA3); R-OUTSIDE-SRC row A6 reads src .ts
 * modules alone, so a write in qa, docs or a .js file is never scanned (QS1); R-INTERRUPTED a link-family spelling split by a
 * zero-width code point (QC1); R-COMPOSED a link-family spelling assembled at runtime from parts (QC2); R-OPAQUE-REF a raw value
 * shaped as a scheme:reference passes the capability_ref rule (C3 case opaqueShaped, pinned to no finding).
 * SCOPE: the excerpts are producer facts at 6a251bf73af5; Pi vendors no rf source, so a producer-side change is seen only when an rf
 * pin-bump re-reads them. The live legs are A2-A6 and B2-B4 (Pi's real provider, sanitizers, reader adapter and src tree), C1 and
 * D3; A4, B1, C2, C3, D1 and D2 hold the reference rules against planted cases.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa, docs, test, the bead export and the
 * roster are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROOT = process.cwd();
const ROSTER_PATH = join(HERE, "fixtures", "rf-sensitivity-echo-roster.json");
const BEAD = "wb-o4h0.6";
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");

const FW = "docs/programs/federated-workspaces-2026-10-18";
const STATEMENT_LINE = `${FW}/05-authority-consistency.md:25`;
const LINK_LINE = `${FW}/03-protocol-and-storage.md:10`;
const LEVELS_LINE = "src/reactive_fiber_cli/domain/trust.py:553";
const ORDER_LINE = "src/reactive_fiber_cli/domain/trust.py:554";
const ROW_SCHEMA_LINES = "src/reactive_fiber_cli/schemas/cli/context.render.schema.json:1529-1536";
/** sha256 of each vendored producer excerpt at the pin, newline-terminated: `git show <pin>:<path> | sed -n '<range>p' | sha256sum`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  [STATEMENT_LINE]: "1905c8c0892c594506c7008c8ed13a5761b7a2f1404f9ba5d8a48147b826bc35",
  [LINK_LINE]: "c6eb7bdffd31150087e002f62e8b3a174db8f8500844281cfb8abf8614cdbfff",
  [`${FW}/03-protocol-and-storage.md:54`]: "9f92b1118e070ee0acbfe54757865ee84e537f273aa957d57c10d022c99340ce",
  [`${FW}/01-requirements-decisions.md:27`]: "5a5713c601755a87721727cf503e39d1d2c6f2b4a7cc89b14cb6a16b1558dbcd",
  [LEVELS_LINE]: "e39c9650795406beaa01e9e1a0d0f1386459335d75df11eb6415624b9194737c",
  [ORDER_LINE]: "0cbd0b0c730235646b34c383febfd05109b64a3604513485fa61507adcde5838",
  [ROW_SCHEMA_LINES]: "851c60a103b09a45330074955cde42c2d3496198f8bedd8743295065ec22e8c1",
};

/** rf's redaction vocabulary at the pin, least to most sensitive (trust.py:553-554). */
const LEVELS = ["public", "internal", "sensitive", "secret"];
/** The classes a result.observations row states (context.render.schema.json:1529-1536). */
const ROW_CLASSES = ["public", "internal", "secret"];
/** The A-side link record (03:10): its schema id and its fields, a trailing "?" marking an optional one. */
const LINK_SCHEMA = "reactive-fiber.federation-link/v1";
const LINK_FIELDS = ["alias", "locator", "expected_workspace_id", "expected_backend_instance_id?", "pin_policy", "capability_ref?"];
/** FW-08 (the imported-record classification), FW-04 and FW-04b-2 (the link manifest and its verbs), as the bead names them. */
const GATING_ARTIFACTS = ["rfc-0txnl.17", "rfc-0txnl.10", "rfc-0txnl.20"];

/** Row A6's field matcher: any key naming a sensitivity, in any case (sensitivity, Sensitivity, sensitivity_class, ...). */
const SENSITIVITY_FIELD = /sensitiv/i;
/** Row C1's matcher: the two link-record words in any case, joined directly or by whitespace, "_", ".", "/" or "-". */
const LINK_FAMILY = /federation[\s_./-]*link/i;
/** Row D3's matcher: an rf workspace link verb spelled in one string. */
const LINK_VERB_TEXT = /\bworkspace[\s._-]+(?:un)?links?\b/i;
const LINK_VERBS = ["link", "links", "unlink"];
/** The capability_ref rule: a scheme, a colon and a reference with no whitespace (this census's floor). */
const CAPABILITY_REF = /^[a-z][a-z0-9+.-]*:[A-Za-z0-9._~/-]{1,200}$/;
const PREVIEW_ID = "reactivefiber.render.preview";

interface Part {
  readonly claim: string;
  readonly pins: readonly string[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly parts: readonly Part[];
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and, for rows A-D, to the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a 'secret' fixture renders the producer token; overwriting with 'internal'/'public' fails; census: no Pi code assigns to an imported record's sensitivity field",
    parts: [
      { claim: "a 'secret' fixture renders the producer token", pins: ["A1", "A2", "A3"] },
      { claim: "overwriting with 'internal'/'public' fails", pins: ["A4", "A5"] },
      { claim: "census: no Pi code assigns to an imported record's sensitivity field", pins: ["A6"] },
    ],
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) differing owner/consumer policies: the surfaced redaction is the strictest",
    parts: [{ claim: "differing owner/consumer policies: the surfaced redaction is the strictest", pins: ["B1", "B2", "B3", "B4"] }],
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) a Pi-authored link manifest passes a secret-scan; capability_ref stays an out-of-band reference, never inline secret bytes",
    parts: [
      { claim: "a Pi-authored link manifest passes a secret-scan", pins: ["C1", "C2"] },
      { claim: "capability_ref stays an out-of-band reference, never inline secret bytes", pins: ["C3"] },
    ],
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(d) schema id exactly reactive-fiber.federation-link/v1; alias renames leave no secret/identity material committed",
    parts: [
      { claim: "schema id exactly reactive-fiber.federation-link/v1", pins: ["D1"] },
      { claim: "alias renames leave no secret/identity material committed", pins: ["D2", "D3"] },
    ],
    pins: ["D1", "D2", "D3"],
  },
  {
    id: "MA",
    label: "row A6's write matcher catches every sensitivity-field write shape, and its named residuals stay pinned quiet",
    parts: [],
    pins: ["MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MA8", "MA9", "MA10", "MA11", "MA12", "QA1", "QA2", "QA3", "QS1"],
  },
  {
    id: "MC",
    label: "row C1's link-family matcher catches every separator and case spelling of the link record, and its named residuals stay pinned quiet",
    parts: [],
    pins: ["MC1", "MC2", "MC3", "MC4", "MC5", "MC6", "MC7", "QC1", "QC2"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly parts: readonly Part[];
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly excerpts: Readonly<Record<string, string>>;
  readonly levels: readonly string[];
  readonly rowClasses: readonly string[];
  readonly linkSchema: string;
  readonly linkFields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isJsonObject(value: Json | undefined): value is JsonObject {
  return value !== null && value !== undefined && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (!isJsonObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
function clone(value: Json): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.excerpts)) throw new Error("roster must be an object with excerpts and a rows list");
  const excerpts: Record<string, string> = {};
  for (const [key, text] of Object.entries(raw.excerpts)) {
    if (typeof text !== "string") throw new Error(`roster excerpts[${key}] must be a string`);
    excerpts[key] = text;
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.parts) || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label, a parts list and a pins list`);
    }
    const parts = row.parts.map((part: unknown, at: number): Part => {
      if (!isObject(part) || typeof part.claim !== "string") throw new Error(`roster rows[${index}].parts[${at}] needs a claim`);
      return { claim: part.claim, pins: strings(part.pins, `rows[${index}].parts[${at}].pins`) };
    });
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, parts, pins };
  });
  if (typeof raw.linkSchema !== "string") throw new Error("roster linkSchema must be a string");
  return {
    excerpts,
    levels: strings(raw.levels, "levels"),
    rowClasses: strings(raw.rowClasses, "rowClasses"),
    linkSchema: raw.linkSchema,
    linkFields: strings(raw.linkFields, "linkFields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function excerpt(key: string): string {
  const text = ROSTER.excerpts[key];
  if (text === undefined) throw new Error(`the roster vendors no excerpt ${key}`);
  return text;
}

/** LEVELS as the vendored trust.py:553 spells them: `SensitivityLevel = Literal["public", ...]`. */
function derivedLevels(): string[] {
  const listed = /Literal\[([^\]]*)\]/.exec(excerpt(LEVELS_LINE))?.[1] ?? "";
  return [...listed.matchAll(/"([^"]+)"/g)].map(match => match[1] ?? "");
}
/** ROW_CLASSES as the vendored schema property spells its enum. */
function derivedRowClasses(): string[] {
  const listed = /"enum":\s*\[([^\]]*)\]/.exec(excerpt(ROW_SCHEMA_LINES))?.[1] ?? "";
  return [...listed.matchAll(/"([^"]+)"/g)].map(match => match[1] ?? "");
}
/** The link record as the vendored 03:10 spells it: `- <schema>: A local aliases, {<fields>}`. */
function derivedLink(): { schema: string; fields: string[] } {
  const match = /^- ([a-z.-]+\/v\d+): A local aliases, \{([^}]*)\}/.exec(excerpt(LINK_LINE));
  return { schema: match?.[1] ?? "", fields: (match?.[2] ?? "").split(",").filter(Boolean) };
}

/** The bead's own row in the tracked bead export: its notes, the owner filing this census answers to. */
function beadNotes(): string {
  for (const line of readFileSync(BEAD_EXPORT, "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The four clauses of the filing's first `Acceptance: (a) ...` line, each starting with its letter. */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(text => text.startsWith("Acceptance: (a) ")) ?? "";
  return line.slice("Acceptance: ".length).replace(/\.$/, "").split(/; (?=\([a-z]\) )/);
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
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
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits 0. */
function standInRf(envelope: Json): string {
  const folder = makeScratch("rf-sensitivity-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}

/** The bead's 'secret' fixture first, then the other two classes a row states. */
const FIXTURE_CLASSES = ["secret", "internal", "public"];
/** One result.observations row with every property the pinned schema declares, its class `sensitivity`. Its digest fill (5, 6, 7)
 * is none of fullShapeRf's (a-f, 1, 2), so no row value can collide with a fixture value the reader adapter shows. */
function observationRow(index: number, sensitivity: string): JsonObject {
  const n = String(index + 1);
  return {
    observation_id: `rfl_${n.repeat(22)}`, lens_key: `fixture.lens${n}`, binding_ref: `binding:fixture/fixture.lens${n}`,
    value_digest: `sha256:${String(index + 5).repeat(64)}`, parsed_value_digest: null, status: "observed", code: null, freshness: "captured_at_render",
    replayed: false, required: false, degraded: false, started_at: "2026-10-22T06:00:00.000000Z", elapsed_ms: 3, exit_code: 0,
    sensitivity, persisted: false,
  };
}
/** The owner's two TRUST-SEC-A34 marker forms, canonical JSON lines (block_sensitivity.py: secret form, digest form). */
const OWNER_MARKERS = [
  JSON.stringify({ capture_id: "fixture.block.one", redacted: true, redacted_without_digest: true }),
  JSON.stringify({ digest: `sha256:${"4".repeat(64)}`, redacted: true, size_bytes: 42 }),
];
/** A value the owner left (an internal block) that Pi's own hygiene redaction matches: obviously fake. */
const OWNER_LEFT = "lens fixture.lens2: password=obviously-fake-value";
const OWNER_TEXT = [...OWNER_MARKERS, OWNER_LEFT, "plain context line"].join("\n");

/** A full-shape render envelope whose output.text is `text` and whose observation rows state FIXTURE_CLASSES. */
function envelopeWith(text: string): JsonObject {
  const envelope = fullShapeRf(ROOT);
  const result = objectOf(envelope.result, "fullShapeRf result");
  const output = { ...objectOf(result.output, "fullShapeRf output"), text, size_bytes: Buffer.byteLength(text), digest: `sha256:${sha256(text)}` };
  return { ...envelope, result: { ...result, output, observations: FIXTURE_CLASSES.map((word, index) => observationRow(index, word)) } };
}
/** The provider's reading of an envelope, as A2 measures nativeReactiveFiberRender to return it. */
function readingOf(envelope: JsonObject): JsonObject {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope };
}
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};

interface Label {
  readonly path: string;
  readonly label: Json;
}
/** Every SENSITIVITY_FIELD key of a JSON value with its word, by path. */
function labelsOf(value: Json | undefined, path = ""): Label[] {
  if (Array.isArray(value)) return value.flatMap((child, index) => labelsOf(child, `${path}[${index}]`));
  if (!isJsonObject(value)) return [];
  return Object.entries(value).flatMap(([key, child]) => {
    const at = path === "" ? key : `${path}.${key}`;
    return [...(SENSITIVITY_FIELD.test(key) ? [{ path: at, label: child }] : []), ...labelsOf(child, at)];
  });
}
const rank = (word: string): number => LEVELS.indexOf(word);
const wordOf = (label: Json | undefined): string => (typeof label === "string" ? label : JSON.stringify(label ?? null));
/** What a surface did to the producer's words: one finding per path lowered, raised, replaced, dropped or added. */
function relabels(producer: readonly Label[], surfaced: readonly Label[]): string[] {
  const shown = new Map(surfaced.map(entry => [entry.path, entry.label]));
  const findings: string[] = [];
  for (const { path, label } of producer) {
    const from = wordOf(label);
    if (!shown.has(path)) {
      findings.push(`dropped ${from} at ${path}`);
      continue;
    }
    const to = wordOf(shown.get(path));
    if (to === from) continue;
    const kind = rank(from) >= 0 && rank(to) >= 0 ? (rank(to) < rank(from) ? "lowered" : "raised") : "relabelled";
    findings.push(`${kind} ${from}->${to} at ${path}`);
  }
  for (const { path, label } of surfaced) if (!producer.some(entry => entry.path === path)) findings.push(`added ${wordOf(label)} at ${path}`);
  return findings;
}
/** The stricter of two classes on the pinned ascending order: rf's join_levels over two inputs. */
function strictest(owner: string, consumer: string): string {
  return rank(consumer) > rank(owner) ? consumer : owner;
}
/** I06 and N04: a local declaration may raise the owner's class, never lower it; a word outside LEVELS is refused. */
function admitDeclared(owner: string, declared: string): string {
  if (rank(owner) < 0 || rank(declared) < 0) return `refused: unknown level ${rank(owner) < 0 ? owner : declared}`;
  if (rank(declared) < rank(owner)) return `refused: lowers ${owner} to ${declared}`;
  return `admitted ${strictest(owner, declared)}`;
}

/** The paths at which two JSON values differ (an absent member reads as a difference). */
function diffPaths(before: Json | undefined, after: Json | undefined, path: string): string[] {
  if (isJsonObject(before) && isJsonObject(after)) {
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
    return keys.flatMap(key => diffPaths(before[key], after[key], path === "" ? key : `${path}.${key}`));
  }
  if (Array.isArray(before) && Array.isArray(after)) {
    return Array.from({ length: Math.max(before.length, after.length) }, (_, index) => diffPaths(before[index], after[index], `${path}[${index}]`)).flat();
  }
  return JSON.stringify(before) === JSON.stringify(after) ? [] : [path === "" ? "<root>" : path];
}
/** Where the shared hygiene redaction rewrites a value: Pi's one scan, never a second local pattern set. */
function hygieneRewrites(value: Json): string[] {
  return diffPaths(value, sanitizeWorkbenchJson(clone(value) as JsonValue) as Json, "");
}
const FIELD_NAMES = LINK_FIELDS.map(field => field.replace(/\?$/, ""));
const REQUIRED_FIELDS = LINK_FIELDS.filter(field => !field.endsWith("?"));
/** The manifest rule a future Pi-authored link document must pass (no author exists: C1). */
function manifestFindings(manifest: Json): string[] {
  if (!isJsonObject(manifest)) return ["not-an-object"];
  const findings: string[] = [];
  if (manifest.schema !== LINK_SCHEMA) findings.push("schema-not-exact");
  for (const key of Object.keys(manifest)) if (key !== "schema" && !FIELD_NAMES.includes(key)) findings.push(`unknown-field:${key}`);
  for (const field of REQUIRED_FIELDS) if (!Object.hasOwn(manifest, field)) findings.push(`missing-field:${field}`);
  const ref = manifest.capability_ref;
  if (ref !== undefined && typeof ref !== "string") findings.push("capability-ref-inline");
  else if (typeof ref === "string" && !CAPABILITY_REF.test(ref)) findings.push("capability-ref-not-reference");
  findings.push(...hygieneRewrites(manifest).map(path => `hygiene-rewrites:${path}`));
  return findings;
}
/** The rename rule: an alias rename moves the alias alone, and the new alias carries no identity material. */
function renameFindings(before: JsonObject, after: JsonObject): string[] {
  const findings = diffPaths(before, after, "").filter(path => path !== "alias").map(path => `changed-field:${path}`);
  const alias = after.alias;
  if (typeof alias !== "string" || alias.length === 0) return [...findings, "alias-not-a-name"];
  const identity = [after.expected_workspace_id, after.expected_backend_instance_id, after.locator].filter((value): value is string => typeof value === "string" && value.length > 0);
  if (identity.some(value => alias.includes(value)) || /rf[wi]_[0-9a-z]{22,32}/.test(alias)) findings.push("alias-carries-identity");
  findings.push(...hygieneRewrites({ alias }).map(path => `hygiene-rewrites:${path}`));
  return findings;
}
const CLEAN_MANIFEST: JsonObject = {
  schema: LINK_SCHEMA, alias: "knowledge", locator: "../B", expected_workspace_id: `rfw_${"b".repeat(22)}`,
  expected_backend_instance_id: `rfi_${"c".repeat(22)}`, pin_policy: "pinned", capability_ref: "keychain:fw/knowledge",
};
const withManifest = (patch: JsonObject): JsonObject => ({ ...CLEAN_MANIFEST, ...patch });

/** The name a property key spells when it is a literal (an identifier, a string, a template without substitutions, a number). */
function keyText(name: ts.Node): string | undefined {
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return keyText(name.expression);
  return undefined;
}
/** The member an access expression names when its key is a literal. */
function accessedName(node: ts.Expression): string | undefined {
  if (ts.isParenthesizedExpression(node)) return accessedName(node.expression);
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return keyText(node.argumentExpression);
  return undefined;
}
const DEFINERS = ["Object.defineProperty", "Reflect.set", "Reflect.defineProperty"];
/** One module's writes to a SENSITIVITY_FIELD key, each `<file>:<line> <how> <name>`. */
function scanWrites(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits: string[] = [];
  const hit = (node: ts.Node, how: string, name: string | undefined): void => {
    if (name !== undefined && SENSITIVITY_FIELD.test(name)) hits.push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1} ${how} ${name}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      hit(node, "assigns", accessedName(node.left));
    }
    if (ts.isDeleteExpression(node)) hit(node, "deletes", accessedName(node.expression));
    if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) hit(node, "sets", keyText(node.name));
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const callee = `${node.expression.expression.getText(source)}.${node.expression.name.text}`;
      const key = node.arguments[1];
      if (DEFINERS.includes(callee) && key !== undefined) hit(node, callee, keyText(key));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return hits;
}
/** Row A6's scope: the src TypeScript modules, nothing else. */
const inScope = (path: string): boolean => path.startsWith("src/") && path.endsWith(".ts");

interface VerbScan {
  readonly verbArgv: string[];
  readonly verbLiterals: string[];
}
/** One module's rf workspace link verbs: an argv array with "workspace" then a LINK_VERBS word, or a string or template literal. */
function scanLinkVerbs(fileName: string, text: string): VerbScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const verbArgv: string[] = [];
  const verbLiterals: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (elements.some((element, index) => element === "workspace" && LINK_VERBS.includes(elements[index + 1] ?? ""))) verbArgv.push(`${fileName}: [${elements.filter(Boolean).join(", ")}]`);
    }
    if (ts.isStringLiteralLike(node) && LINK_VERB_TEXT.test(node.text)) verbLiterals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (LINK_VERB_TEXT.test(parts.join(" "))) verbLiterals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { verbArgv, verbLiterals };
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
  readonly files: (path: string) => boolean;
}
/** The trees row C1 reads; each floor sits below the count measured at base a7896f8 (src 115 .ts, qa 67 files; the data files
 * under src, test, docs and qa 23, floor 20), and each anchor file must be read with its token, so an emptied or misdirected walk
 * reds. */
const AUTHOR_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "workbench/providers/reactivefiber.ts", anchorToken: "isObservationRows", files: path => path.endsWith(".ts") },
  { root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts", files: () => true },
];
const DATA_FILE = /\.(?:json|toml|ya?ml)$/;
/** The schema a data file declares at its top level, when it declares one. */
function declaredSchema(path: string, text: string): string | undefined {
  if (path.endsWith(".json")) {
    try {
      const parsed: unknown = JSON.parse(text);
      return isObject(parsed) && typeof parsed.schema === "string" ? parsed.schema : undefined;
    } catch {
      return undefined;
    }
  }
  return /^\s*schema\s*[=:]\s*["']?([^"'\s]+)/m.exec(text)?.[1];
}

let nativeIds: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** The native registration's descriptors, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeIds;
}

interface Spelling {
  readonly pin: string;
  readonly text: string;
}
/** MA1-MA12 must each count one write; QA1-QA3 are the quiet rows of R-COMPUTED, R-SYNONYM and R-COMPOSED-KEY. */
const WRITE_SPELLINGS: readonly (Spelling & { readonly hits: number })[] = [
  { pin: "MA1", text: 'rec.sensitivity = "internal";', hits: 1 },
  { pin: "MA2", text: 'rec["sensitivity"] = "public";', hits: 1 },
  { pin: "MA3", text: 'rec.sensitivity ??= "public";', hits: 1 },
  { pin: "MA4", text: "delete rec.sensitivity;", hits: 1 },
  { pin: "MA5", text: 'const out = { ...rec, sensitivity: "internal" };', hits: 1 },
  { pin: "MA6", text: 'const level = "public"; const out = { ...rec, sensitivity: level, other: 1 }; const { sensitivity } = out;', hits: 1 },
  { pin: "MA7", text: 'const out = { ...rec, "sensitivity": "public" };', hits: 1 },
  { pin: "MA8", text: "const out = { ...rec, [`sensitivity`]: \"public\" };", hits: 1 },
  { pin: "MA9", text: 'Object.defineProperty(rec, "sensitivity", { value: "public" });', hits: 1 },
  { pin: "MA10", text: 'Reflect.set(rec, "sensitivity", "public");', hits: 1 },
  { pin: "MA11", text: 'row.sensitivityClass = "public";', hits: 1 },
  { pin: "MA12", text: 'Object.assign(rec, { Sensitivity: "public" });', hits: 1 },
  { pin: "QA1", text: 'const key = "sensitivity"; rec[key] = "public";', hits: 0 },
  { pin: "QA2", text: 'rec.classification = "public";', hits: 0 },
  { pin: "QA3", text: 'rec["sensi" + "tivity"] = "public";', hits: 0 },
];
const ZERO_WIDTH = String.fromCodePoint(0x200b);
/** MC1-MC7 must hit; QC1 is R-INTERRUPTED, QC2 is R-COMPOSED (the source text of a runtime join). */
const LINK_SPELLINGS: readonly (Spelling & { readonly hit: boolean })[] = [
  { pin: "MC1", text: `const id = "${LINK_SCHEMA}";`, hit: true },
  { pin: "MC2", text: `const id = "${LINK_SCHEMA.toUpperCase()}";`, hit: true },
  { pin: "MC3", text: 'const id = "reactive_fiber.federation_link/v1";', hit: true },
  { pin: "MC4", text: 'const doc = "the federation link manifest";', hit: true },
  { pin: "MC5", text: ["const id = `reactive-fiber.federation-link/v$", "{n}`;"].join(""), hit: true },
  { pin: "MC6", text: 'const kind = "FederationLink";', hit: true },
  { pin: "MC7", text: 'const id = "reactive-fiber.federation-links/v1";', hit: true },
  { pin: "QC1", text: `const id = "reactive-fiber.federation${ZERO_WIDTH}-link/v1";`, hit: false },
  { pin: "QC2", text: 'const id = ["federation", "link"].join("-");', hit: false },
];
const digestOf = (text: string): string => sha256(text).slice(0, 16);

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const levels = derivedLevels();
    const rowClasses = derivedRowClasses();
    const ascending = excerpt(ORDER_LINE).includes("ordered from least to most sensitive");
    const ranks = rowClasses.map(rank);
    const subsetInOrder = ranks.every((at, index) => at >= 0 && (index === 0 || at > (ranks[index - 1] ?? -1)));
    expect({ levels, rowClasses, ascending, subsetInOrder }).toStrictEqual({ levels: LEVELS, rowClasses: ROW_CLASSES, ascending: true, subsetInOrder: true });
    expect([...FIXTURE_CLASSES].sort()).toEqual([...ROW_CLASSES].sort());
    return { levels, rowClasses, ascending, subsetInOrder };
  },
  A2: async () => {
    const envelope = envelopeWith(OWNER_TEXT);
    const log = standInRf(envelope);
    const reading = await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT);
    // Byte for byte: every row, its class included, and nothing inside the envelope the stand-in did not print.
    expect(reading).toStrictEqual(readingOf(envelope));
    const labels = labelsOf(reading as Json);
    expect(labels.map(entry => entry.label)).toEqual(FIXTURE_CLASSES);
    return { readingKeys: Object.keys(objectOf(reading as Json, "reading")).sort(), labels: labels.map(entry => `${entry.path}=${wordOf(entry.label)}`), spawns: spawnsOf(log).length };
  },
  A3: async () => {
    const reading = readingOf(envelopeWith(OWNER_TEXT));
    const producer = labelsOf(reading);
    const structured = labelsOf(sanitizeWorkbenchJson(clone(reading) as JsonValue) as Json);
    const text = labelsOf(JSON.parse(sanitizeWorkbenchJsonText(reading)) as Json);
    const found = { structured: relabels(producer, structured), text: relabels(producer, text) };
    expect(found).toStrictEqual({ structured: [], text: [] });
    return { structured: structured.map(entry => wordOf(entry.label)), text: text.map(entry => wordOf(entry.label)), relabels: found };
  },
  A4: async () => {
    const reading = readingOf(envelopeWith(OWNER_TEXT));
    const producer = labelsOf(reading);
    const planted = (index: number, word: string | undefined): string[] => {
      const copy = objectOf(clone(reading), "copy");
      const rows = objectOf(objectOf(copy.source, "copy source").result, "copy result").observations;
      const row = objectOf(Array.isArray(rows) ? rows[index] : undefined, `copy row ${index}`);
      if (word === undefined) delete row.sensitivity;
      else row.sensitivity = word;
      return relabels(producer, labelsOf(copy));
    };
    const real = relabels(producer, labelsOf(sanitizeWorkbenchJson(clone(reading) as JsonValue) as Json));
    const overwrites = {
      "secret->internal": planted(0, "internal"), "secret->public": planted(0, "public"), "internal->public": planted(1, "public"),
      "public->secret": planted(2, "secret"), "secret->restricted": planted(0, "restricted"), dropped: planted(0, undefined),
    };
    expect(real).toEqual([]);
    for (const [name, findings] of Object.entries(overwrites)) expect(findings, name).toHaveLength(1);
    return { real, overwrites };
  },
  A5: async () => {
    const reading = readingOf(envelopeWith(OWNER_TEXT));
    const topology = reactivefiberTopology(reading as JsonValue, OBSERVER_CONTEXT);
    const shown = stringLeaves(topology);
    const stringsRead = shown.length >= 5;
    const classWords = shown.filter(text => LEVELS.some(level => new RegExp(`\\b${level}\\b`, "i").test(text)));
    const rowValues = FIXTURE_CLASSES.flatMap((word, index) => stringLeaves(observationRow(index, word))).filter(value => value.length > 8);
    const rowFieldsShown = shown.filter(text => rowValues.some(value => text.includes(value)));
    expect(stringsRead, `topology strings: ${shown.length}`).toBe(true);
    expect({ classWords, rowFieldsShown }).toStrictEqual({ classWords: [], rowFieldsShown: [] });
    return { snapshots: topology.snapshots.length, stringsRead, classWords, rowFieldsShown };
  },
  A6: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => inScope(relative(REPO, file)));
    const hits = files.flatMap(file => scanWrites(relative(REPO, file), textOf(file)));
    const anchor = join(REPO, "src", "workbench", "providers", "reactivefiber.ts");
    const srcFloorMet = files.length >= 100;
    const anchorRead = files.includes(anchor) && textOf(anchor).includes("isObservationRows");
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(anchorRead).toBe(true);
    expect(hits, "a write to a sensitivity field in src").toEqual([]);
    const controls = {
      read: scanWrites("control.ts", "const level = rec.sensitivity;").length,
      compare: scanWrites("control.ts", 'if (rec.sensitivity === "secret") return;').length,
      typeField: scanWrites("control.ts", "interface Row { sensitivity: string; readonly sensitivityClass?: string }").length,
    };
    return { srcFloorMet, anchorRead, hits, controls };
  },
  B1: async () => {
    const joins = Object.fromEntries(LEVELS.map(owner => [owner, LEVELS.map(consumer => strictest(owner, consumer))]));
    const neverBelow = LEVELS.every(owner => LEVELS.every(consumer => rank(strictest(owner, consumer)) >= Math.max(rank(owner), rank(consumer))));
    const refused = LEVELS.flatMap(owner => LEVELS.map(declared => admitDeclared(owner, declared))).filter(verdict => verdict.startsWith("refused"));
    const unknown = admitDeclared("secret", "restricted");
    expect(neverBelow).toBe(true);
    expect(refused).toHaveLength(6);
    return { order: [...LEVELS], joins, neverBelow, refused, unknown };
  },
  B2: async () => {
    const reading = readingOf(envelopeWith(OWNER_TEXT));
    const structured = objectOf(objectOf(objectOf(sanitizeWorkbenchJson(clone(reading) as JsonValue) as Json, "s").source, "s source").result, "s result");
    const textForm = objectOf(objectOf(objectOf(JSON.parse(sanitizeWorkbenchJsonText(reading)) as Json, "t").source, "t source").result, "t result");
    const shownText = (result: JsonObject): string => String(objectOf(result.output, "output").text);
    const structuredKept = OWNER_MARKERS.filter(marker => shownText(structured).includes(marker)).length;
    const textKept = OWNER_MARKERS.filter(marker => shownText(textForm).includes(marker)).length;
    expect({ structuredKept, textKept }).toStrictEqual({ structuredKept: OWNER_MARKERS.length, textKept: OWNER_MARKERS.length });
    return { markers: OWNER_MARKERS.length, structuredKept, textKept };
  },
  B3: async () => {
    const reading = readingOf(envelopeWith(OWNER_TEXT));
    const sanitized = sanitizeWorkbenchJson(clone(reading) as JsonValue) as Json;
    const result = objectOf(objectOf(objectOf(sanitized, "s").source, "s source").result, "s result");
    const surfaced = String(objectOf(result.output, "output").text);
    const consumerRedactions = surfaced.split("[REDACTED]").length - 1;
    const fakeValueShown = surfaced.includes("obviously-fake-value");
    const ownerMarkersKept = OWNER_MARKERS.filter(marker => surfaced.includes(marker)).length;
    const labelsVerbatim = relabels(labelsOf(reading), labelsOf(sanitized)).length === 0;
    expect({ consumerRedactions, fakeValueShown, ownerMarkersKept, labelsVerbatim }).toStrictEqual({ consumerRedactions: 1, fakeValueShown: false, ownerMarkersKept: 2, labelsVerbatim: true });
    return { surfaced, consumerRedactions, fakeValueShown, ownerMarkersKept, labelsVerbatim };
  },
  B4: async () => {
    const topology = reactivefiberTopology(readingOf(envelopeWith(OWNER_TEXT)) as JsonValue, OBSERVER_CONTEXT);
    const snapshot = topology.snapshots[0];
    const payloadRef = String(snapshot?.nativePayloadRef);
    const payloadRefIsOwnerBytes = payloadRef === `rf-output:sha256:${sha256(OWNER_TEXT)}`;
    const shown = stringLeaves(topology);
    const ownerTextShown = OWNER_TEXT.split("\n").filter(line => shown.some(text => text.includes(line)));
    expect({ payloadRefIsOwnerBytes, ownerTextShown }).toStrictEqual({ payloadRefIsOwnerBytes: true, ownerTextShown: [] });
    return { payloadRef, payloadRefIsOwnerBytes, ownerTextShown };
  },
  C1: async () => {
    const trees = AUTHOR_ROOTS.map(scan => {
      const files = filesBelow(join(REPO, scan.root)).filter(file => scan.files(file));
      const anchor = join(REPO, scan.root, scan.anchorFile);
      const floorMet = files.length >= scan.floor;
      const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
      const hits = files.filter(file => LINK_FAMILY.test(textOf(file))).map(file => relative(REPO, file));
      expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
      expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
      expect(hits, `files spelling the link record under ${scan.root}`).toEqual([]);
      return { root: scan.root, floorMet, anchorRead, hits };
    });
    const data = ["src", "test", "docs", "qa"].flatMap(root => filesBelow(join(REPO, root))).filter(file => DATA_FILE.test(file));
    const dataAnchor = join(REPO, "test", "fixtures", "rf-result-keys.json");
    const dataFloorMet = data.length >= 20;
    const dataAnchorRead = data.includes(dataAnchor) && textOf(dataAnchor).includes("resultKeys");
    const manifests = data.filter(file => LINK_FAMILY.test(declaredSchema(file, textOf(file)) ?? "")).map(file => relative(REPO, file));
    expect(dataFloorMet, `data files walked: ${data.length}`).toBe(true);
    expect(dataAnchorRead).toBe(true);
    expect(manifests, "a data file declaring a link-family schema is a Pi-authored link manifest").toEqual([]);
    return { trees, dataFloorMet, dataAnchorRead, manifests };
  },
  C2: async () => {
    const cases = {
      clean: manifestFindings(CLEAN_MANIFEST),
      assignmentInLocator: manifestFindings(withManifest({ locator: "../B?password=obviously-fake" })),
      secretNamedField: manifestFindings(withManifest({ password: "obviously-fake" })),
      credentialShapedRef: manifestFindings(withManifest({ capability_ref: "Bearer obviously-fake" })),
      unknownField: manifestFindings(withManifest({ token_hint: "none" })),
      missingField: manifestFindings(Object.fromEntries(Object.entries(CLEAN_MANIFEST).filter(([key]) => key !== "pin_policy"))),
    };
    expect(cases.clean).toEqual([]);
    for (const [name, findings] of Object.entries(cases)) if (name !== "clean") expect(findings.length, name).toBeGreaterThan(0);
    return cases;
  },
  C3: async () => {
    const ref = (value: Json): string[] => manifestFindings(withManifest({ capability_ref: value })).filter(finding => finding.includes("capability"));
    const cases = {
      reference: ref("keychain:fw/knowledge"), absent: manifestFindings(Object.fromEntries(Object.entries(CLEAN_MANIFEST).filter(([key]) => key !== "capability_ref"))),
      inlineObject: ref({ token: "obviously-fake" }), inlineBytes: ref([111, 98, 118]), spaced: ref("keychain: fw knowledge"),
      credentialShaped: ref("Bearer obviously-fake"), opaqueShaped: ref("env:obviouslyFakeOpaqueValue0123456789"),
    };
    expect({ reference: cases.reference, absent: cases.absent, opaqueShaped: cases.opaqueShaped }).toStrictEqual({ reference: [], absent: [], opaqueShaped: [] });
    for (const name of ["inlineObject", "inlineBytes", "spaced", "credentialShaped"] as const) expect(cases[name].length, name).toBeGreaterThan(0);
    return cases;
  },
  D1: async () => {
    const fromExcerpt = derivedLink().schema === LINK_SCHEMA;
    const fromAcceptance = acceptanceClauses(beadNotes()).some(clause => clause.includes(`schema id exactly ${LINK_SCHEMA};`));
    const near = Object.fromEntries(
      [`${LINK_SCHEMA.slice(0, -1)}2`, LINK_SCHEMA.replace("link", "links"), LINK_SCHEMA.toUpperCase(), `${LINK_SCHEMA} `, `rf:${LINK_SCHEMA}`, "reactive-fiber.federation-export/v1"]
        .map(schema => [schema, manifestFindings(withManifest({ schema }))]),
    );
    const missing = manifestFindings(Object.fromEntries(Object.entries(CLEAN_MANIFEST).filter(([key]) => key !== "schema")));
    expect({ fromExcerpt, fromAcceptance }).toStrictEqual({ fromExcerpt: true, fromAcceptance: true });
    for (const [schema, findings] of Object.entries(near)) expect(findings, schema).toEqual(["schema-not-exact"]);
    return { schema: LINK_SCHEMA, fromExcerpt, fromAcceptance, near, missing };
  },
  D2: async () => {
    const rename = (patch: JsonObject): string[] => renameFindings(CLEAN_MANIFEST, withManifest(patch));
    const cases = {
      clean: rename({ alias: "kb" }), alsoMovesLocator: rename({ alias: "kb", locator: "../C" }),
      aliasIsWorkspaceId: rename({ alias: `kb-${String(CLEAN_MANIFEST.expected_workspace_id)}` }), aliasIsLocator: rename({ alias: "../B" }),
      aliasWithAssignment: rename({ alias: "kb?password=obviously-fake" }), aliasEmpty: rename({ alias: "" }),
    };
    expect(cases.clean).toEqual([]);
    for (const [name, findings] of Object.entries(cases)) if (name !== "clean") expect(findings.length, name).toBeGreaterThan(0);
    return cases;
  },
  D3: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanLinkVerbs(relative(REPO, file), textOf(file)));
    const verbArgv = found.flatMap(result => result.verbArgv);
    const verbLiterals = found.flatMap(result => result.verbLiterals);
    const { ids, texts } = await nativeDescriptors();
    const rfIds = ids.filter(id => id.startsWith("reactivefiber."));
    const descriptorHits = ids.filter((_, index) => LINK_VERB_TEXT.test(texts[index] ?? "") || LINK_FAMILY.test(texts[index] ?? ""));
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect({ verbArgv, verbLiterals, rfIds, descriptorHits }).toStrictEqual({ verbArgv: [], verbLiterals: [], rfIds: [PREVIEW_ID], descriptorHits: [] });
    const control = (text: string): number => {
      const scan = scanLinkVerbs("control.ts", text);
      return scan.verbArgv.length + scan.verbLiterals.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "workspace", "link", "kb", "--path", "../B"]);'),
      spaced: control('const cmd = "rf workspace unlink kb";'),
      template: control(["const cmd = `rf workspace links --json $", "{x}`;"].join("")),
      composedArgv: control('const verb = "link"; spawn("rf", ["workspace", verb]);'),
    };
    return { srcFloorMet, verbArgv, verbLiterals, rfIds, descriptorHits, controls };
  },
  ...Object.fromEntries(
    WRITE_SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hits = scanWrites("control.ts", spelling.text).length;
        expect(hits).toBe(spelling.hits);
        return { digest: digestOf(spelling.text), hits };
      },
    ]),
  ),
  QS1: async () => {
    const paths = ["src/workbench/x.ts", "qa/workbench/tool.mjs", "docs/workbench/x.md", "src/workbench/x.js"];
    const scanned = paths.filter(inScope);
    expect(scanned).toEqual(["src/workbench/x.ts"]);
    return { scanned, notScanned: paths.filter(path => !inScope(path)) };
  },
  ...Object.fromEntries(
    LINK_SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = LINK_FAMILY.test(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: digestOf(spelling.text), hit };
      },
    ]),
  ),
};

describe("wb-o4h0.6 rf sensitivity echo census (RF-FEDERATED-WORKSPACES-R8)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:4", "C:3", "D:3", "MA:16", "MC:9"]);
    const shape = (rows: readonly { id: string; label: string; parts: readonly Part[]; pins: readonly string[] }[]) =>
      rows.map(({ id, label, parts, pins }) => ({ id, label, parts: parts.map(part => ({ claim: part.claim, pins: [...part.pins] })), pins: [...pins] }));
    expect(shape(ROWS)).toStrictEqual(shape(ROSTER.rows.map(row => ({ ...row, pins: row.pins.map(pin => pin.id) }))));
    for (const row of ROWS.filter(entry => entry.parts.length > 0)) {
      expect(row.pins, row.id).toEqual(row.parts.flatMap(part => part.pins));
      expect(row.label, row.id).toBe(`(${row.id.toLowerCase()}) ${row.parts.map(part => part.claim).join("; ")}`);
    }
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ levels: LEVELS, rowClasses: ROW_CLASSES, linkSchema: LINK_SCHEMA, linkFields: LINK_FIELDS, gatingArtifacts: GATING_ARTIFACTS }).toStrictEqual({
      levels: [...ROSTER.levels], rowClasses: [...ROSTER.rowClasses], linkSchema: ROSTER.linkSchema, linkFields: [...ROSTER.linkFields], gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
  });

  it("the outside anchors: the vendored producer lines hash to the pin, the vocabularies derive from them, and the bead export carries every clause", () => {
    expect(Object.keys(ROSTER.excerpts).sort()).toEqual(Object.keys(EXCERPT_SHA256).sort());
    for (const [key, digest] of Object.entries(EXCERPT_SHA256)) expect(sha256(`${excerpt(key)}\n`), key).toBe(digest);
    expect({ levels: derivedLevels(), rowClasses: derivedRowClasses(), link: derivedLink() }).toStrictEqual({
      levels: LEVELS, rowClasses: ROW_CLASSES, link: { schema: LINK_SCHEMA, fields: LINK_FIELDS },
    });
    const notes = beadNotes();
    const acceptance = ROWS.filter(row => row.parts.length > 0);
    expect(acceptanceClauses(notes), "the filing's acceptance clauses are rows A-D's labels").toEqual(acceptance.map(row => row.label));
    for (const part of acceptance.flatMap(row => row.parts)) expect(part.pins.length, part.claim).toBeGreaterThan(0);
    const gating = notes.split("\n").find(line => line.startsWith("Gating: ")) ?? "";
    expect([...gating.matchAll(/rfc-[0-9a-z]+\.\d+/g)].map(match => match[0]), "the artifacts the filing's Gating line names, in order").toEqual(GATING_ARTIFACTS);
    expect(notes, "the filing quotes the 05:25 excerpt verbatim").toContain(excerpt(STATEMENT_LINE));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
