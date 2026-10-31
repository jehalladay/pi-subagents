/**
 * wb-z3ft.1 (HX-CERTIFIED-STRUCTURAL-OPTIMIZATION-R1, program-triage-2026-10-22), the today legs. Statement (the owner
 * filing's title): "If an HX result Pi consumes ever carries the program's typed planner-fallback reason (gated: CSO 02 step 7
 * typed reason / SI-R11 diagnostic reason, design-only), the HX adapter shall echo the reason verbatim as its own facet and
 * shall never read it - nor any planner failure, resource-cap or snapshot-change stop - as an absent graph fact, known-empty
 * or a coverage change." (HyperUnix-CLI docs/programs/certified-structural-optimization-2026-10-18/
 * 02-precedence-and-effect-admission.md:30@0091719d0288, quoting step 7: "If a proof cannot be established, a resource cap is
 * reached, or the snapshot changes, retain the original plan and emit a typed reason. Never interpret planner failure as an
 * absent graph fact.").
 * Acceptance (owner filing, verbatim; each clause sits in exactly one row label): "(a) today: every stop kind
 * (incomplete/budget-exhausted/cancelled/view-invalidated -> partial; provider-/schema-/internal-/protocol-failed, usage-error ->
 * failure; observer.ts:81-86) projects coverage partial or unknown, never statusTone 'success' or 'known-empty' (H2
 * observer.test.ts:210); (b) today: a fallback-reason-shaped unknown field reaches no output field, projection strictEqual (H5
 * :453); (c) on landing: a typed reason with rows [] and kind 'incomplete' surfaces verbatim as its own facet, statusText still
 * 'absence not licensed', and changing only the reason text leaves coverage, statusTone and evidenceRefs byte-identical."
 *
 * The trigger has not fired. The vendored SDK (vendor/hyperunix-sdk-0.1.0.tgz, installed as @hyperunix/sdk 0.1.0) declares
 * no fallback reason, the reader adapter (src/workbench/hyperunix-observer.ts) reads none, and the producer program is
 * design-only (CSO 02:3 "Not implemented, compiled, benchmarked or admitted."; SI-R11 status DESIGN). So (a) and (b) are
 * today's obligations and (c) waits for the typed reason. The census pins that state through both paths an HX result takes
 * into Pi: the adapter itself (hyperunixTopology over a reading built here) and the registered provider (registerHyperUnixFind
 * with an injected reader serving an SDK-decoded result: the SDK's own resultToJson and the provider's JSON round trip).
 *  A, acceptance (a). A1 the stop set: the vendored declaration's ExecutionStatus kinds (read from the tarball, like H5
 *    observer.test.ts:409) minus the two complete kinds and the two mutation outcomes are exactly the filing's nine stop kinds,
 *    in its two groups (parsed from the clause, the provider-/schema-/internal-/protocol-failed shorthand expanded), and the
 *    adapter's kind tuple is the declared set. A2 on the adapter, every stop kind under either licence with rows [] (the shape
 *    a planner failure must never turn into an absent graph fact) projects coverage partial (the partial group) or unknown (the
 *    failure group), statusTone unknown or failure, and no string leaf spells known-empty or the success tone. A3 the same nine
 *    readings through the registered provider, where the two stops the statement names carry the SDK's own typed facts: the
 *    resource-cap stop (budget-exhausted) its kernel budget dimension (result.d.ts:47-48, :124; bounds.d.ts:7 "wall") with the
 *    HX-BUDGET-EXHAUSTED code, the snapshot-change stop (view-invalidated) a view identity (result.d.ts:116), and those facts
 *    reach the adapter's input yet move nothing in its projection but the facets wb-gwr.2 relays (the snapshot-change stop's
 *    view surfaces verbatim as its own view facet; every other output field strictEqual the fact-free document's); and a stop kind the
 *    SDK does not register (a planner failure surfacing under a new kind) decodes to protocol-failed and stays a failure.
 *  B, acceptance (b). The reason this census plants is a typed record for each of the program's three causes (CAUSES: this
 *    census's tokens for step 7's three conditions; the program names no token). B1 on the adapter, the record (or a bare
 *    reason string) under an unread key at six positions (PLACEMENTS) - beside the source fields, the execution status, the
 *    coverage summary, the reading, the runtime identity and a coverage certificate - leaves the projection of every readable kind under
 *    either licence strictEqual the reason-free projection (H5 :453's shape) and spells nowhere in it. B2 through the registered
 *    provider: the SDK decoder drops the record at an unknown key of each of eight typed records (DROPS, measured: the source,
 *    the execution status, the coverage summary, the evidence, the status, the transport, a certificate and a diagnostic), and
 *    keeps it in eleven free-form slots of its representation (CARRIERS, measured: a diagnostic in the existing grammar SIO 05:33 names - its
 *    code, message, details and remediation -, the diagnostic's preserved extra fields, where an unknown field of an HXS
 *    diagnostic frame lands (protocol/query.d.ts: "fields preserved"), the status's diagnostic code, an extension frame, a
 *    certificate's cause and body, an incomplete region, the result coverage, the actual cost, the execution id and a support
 *    id) - each carrier reaches the adapter's input (its paths are pinned) and still reaches no output field: projection
 *    strictEqual, nothing spelled. Each carrier sits outside the shapes wb-gwr.2 relays verbatim as a facet (R-RELAYED-SHAPE).
 *  C, acceptance (c), gated. C1 the typed reason is unshipped: the filing's own grep (its pattern read from the bead row's
 *    "Shipped: no" sentence) finds nothing in the vendored result.d.ts (read from the tarball, byte-equal to the installed copy
 *    package.json resolves) or in the adapter, and over every declaration file the tarball ships the reason family is spelled
 *    only at the recorded other-sense sites (error, plan-only and schema reasons; none on the result path Pi reads), so a
 *    re-vendor that declares a reason anywhere reds C1 until (c) lands with it. C2 the adapter reads no slot that could carry
 *    it beyond the three slots wb-gwr.2's relayed facets read (a reason carried inside a relayed shape is R-RELAYED-SHAPE):
 *    the property names its source reads (property access, string element access, destructuring; TypeScript AST) that are
 *    keys of the served SDK representation (every key at any depth of a provider reading carrying both stop facts: the SDK's
 *    own serializer is the anchor) are exactly the pinned read set, which holds every input key the adapter projects from and
 *    no CARRIERS slot, typed stop fact or reason-family name beyond the three slots wb-gwr.2's relayed facets read for their
 *    measured members (diagnostics for a conflict code, incomplete_regions for a scope and target, view for the view identity:
 *    the slots the adapter's own HYPERUNIX_CONSUMED_FIELDS 'relayed' entries name) - so a read of any other representation key
 *    reds C2, and the cut that lands (c) re-cuts this census with (c)'s cases.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every
 * pin's witness (each carries its pin id), the scan constants, the causes, the residual families and the registered test titles
 * are held to the out-of-file roster (test/fixtures/hx-planner-fallback-roster.json). OUTSIDE ANCHORS (the anchor case is its own
 * registered test, beside the frozen case): the owner filing's row in the tracked bead export (.beads/issues.jsonl, row
 * wb-z3ft.1): every acceptance clause sits verbatim in exactly one row label,
 * the title's trigger phrase in row C's and its stop phrase in row A's, every row carries one of them, the quote and citation
 * equal the roster's, each cause's condition sits in the quote, A1's stop groups are parsed from clause (a) and C1's pattern
 * from the "Shipped: no" sentence - so a row removed from every literal of this file and the roster still reds; and the
 * vendored declaration, which A1 reads the stop set from. The anchors bind rows, clauses, kinds and causes, not pins: see
 * R-PIN-HOLLOW below.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED).
 * RESIDUALS (named families, each with a pinned quiet row: the C witnesses' controls, B2's relayed-shape control for
 * R-RELAYED-SHAPE, and the anchor case for R-PIN-HOLLOW):
 * R-GRAMMAR a typed reason carried through the
 * existing diagnostic grammar as a new registered code needs no new declaration, so C1 stays quiet when the runtime starts
 * emitting one (C1 grammar: the Diagnostic declaration's nine keys, among them a free code, details and the preserved extra
 * fields; 0 family lines in protocol/query.d.ts); B2's
 * diagnostic carriers pin that such a diagnostic still reaches no output field. R-RENAMED a reason declared or read under a
 * name outside the reason family, the carrier slots and the representation's keys (C1 renamed, C2 renamed). R-DYNAMIC a
 * spread, reflective or computed read names no property and is invisible to C2 (C2 dynamic). R-HOMONYM C2 reads names, not
 * receivers: a representation key the adapter already spells for another receiver (digest, the hash digest call; scope, the
 * host scope) can be read from the representation without changing the read set (C2 homonym). For the last three, B1 and B2
 * catch an output effect only in the slots they plant; a digest or scope read outside them is seen by neither.
 * R-PIN-HOLLOW a pin removed from ROWS, the frozen literal, IMPL and the roster together: the anchor case reads row
 * labels, so it cannot see one (its quiet row pins the unseen pins, A1 to C2, beside a liveness reading: removing any
 * row is seen). R-RELAYED-SHAPE (wb-noq8, the landing-646 follow-up) a reason carried inside a shape wb-gwr.2 relays verbatim
 * (a string view, a diagnostic code naming CONFLICT as a whole segment, an incomplete region with a string scope and target)
 * surfaces as that facet by that bead's design, so B2's carriers read quiet only in the shapes they are planted in and B2's
 * "reaches no output field" holds for them, not for a relayed shape. Its quiet row, B2's relayed-shape control, plants the
 * reason in each relayed shape (RELAYED_SHAPES, one per slot the adapter's own HYPERUNIX_CONSUMED_FIELDS 'relayed' entries name)
 * through the registered provider for every readable kind, licence and cause, and pins that it reaches the adapter's input at
 * its slot, surfaces verbatim as its own facet and nothing else, and moves nothing outside the facets: snapshot (coverage,
 * tone, status text, evidence), relations and diagnostics strictEqual the reason-free projection - never an absent graph fact,
 * a known-empty answer or a coverage change.
 * Display paths added: none. Test-only: it spawns nothing and writes nothing; it reads the tarball, the installed declaration
 * and manifest, the adapter source, package.json, the roster and the bead export.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { resultFromJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  HYPERUNIX_CONSUMED_FIELDS,
  HYPERUNIX_EXECUTION_KINDS,
  type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext,
  hyperunixTopology,
} from "../src/workbench/hyperunix-observer.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-hx-planner-fallback-census.test.ts";
const ROSTER_FILE = "test/fixtures/hx-planner-fallback-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-z3ft.1";
const OBSERVER = "src/workbench/hyperunix-observer.ts";
const SDK = "@hyperunix/sdk";
const TARBALL = "vendor/hyperunix-sdk-0.1.0.tgz";
const INSTALLED = "node_modules/@hyperunix/sdk/dist/result.d.ts";
const DECLARATION_ENTRY = "package/dist/result.d.ts";
const GRAMMAR_ENTRY = "package/dist/protocol/query.d.ts";
/** C1 over every declaration file the tarball ships, and the leak check over every projection: the filing's two words, any case. */
const REASON_FAMILY = /fallback|reason/i;
const COMPLETES = ["complete", "complete-empty"];
const MUTATIONS = ["mutation-rejected", "mutation-partial"];
/** Step 7's three conditions (the bead row's quote) and the token this census spells a typed reason with for each. */
const CAUSES: readonly (readonly [string, string])[] = [
  ["proof-not-established", "a proof cannot be established"],
  ["resource-cap-reached", "a resource cap is reached"],
  ["snapshot-changed", "the snapshot changes"],
];
const LICENCES = [false, true];
/** The runtime identity the measured live read of this workspace reported (hx 0.1.0; test/workbench-hyperunix-observer.test.ts:21). */
const BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const WS = "/census/hx-stop-ws";
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-23T17:00:00Z",
  observedAt: "2026-10-23T17:00:01Z",
};
const GRANTS = { grants: ["hyperunix:read"], signal: new AbortController().signal };
/** The measured live read's certificate shape (observer.test.ts:52-54): the adapter reads its batch id only. */
const CERTIFICATE: JsonObject = {
  mode: "opportunistic",
  cause: { cause: "other", detail: "No_change_exclusion" },
  scope: { path: [], scope: "fs-subtree" },
  target: { target: "relation-expansion" },
  provider: "hx.fs/builtin",
  stream: "hx-fs",
  batch_id: "b1",
  body: {},
};
/** The SDK's typed facts of the two stops the statement names (A3): the resource-cap stop's kernel dimension, the snapshot-change stop's view. */
const STOP_FACTS: { readonly [kind: string]: JsonObject } = {
  "budget-exhausted": {
    execution_status: { kind: "budget-exhausted", diagnostic_code: "HX-BUDGET-EXHAUSTED", dimension: "wall" },
    budget_dimension: "wall",
    diagnostics: [
      { code: "HX-BUDGET-EXHAUSTED", severity: "error", message: "budget exhausted", details: { dimension: "wall" }, remediation: null, request: null },
    ],
  },
  "view-invalidated": { view: "hx-view:census-1" },
};
/** A3: a stop kind the vendored SDK does not register, as a planner failure surfacing under its own kind would arrive. */
const UNREGISTERED_KIND = "planner-failed";
/** The input keys the adapter projects from (C2 liveness: its source must still read each). */
const PROJECTED_KEYS = [
  "batch_id",
  "binarySha256",
  "contract",
  "coverage",
  "coverage_summary",
  "execution_status",
  "kind",
  "licenses_absence",
  "operation",
  "representation",
  "rows",
  "rows_retained",
  "runtime",
  "source",
  "version",
  "workspaceRoot",
];
const RESIDUAL_FAMILIES = ["R-GRAMMAR", "R-RENAMED", "R-DYNAMIC", "R-HOMONYM", "R-PIN-HOLLOW", "R-RELAYED-SHAPE"];
/** R-PIN-HOLLOW: the pins whose removal from every literal (ROWS, the frozen literal, IMPL, the roster) the anchor case cannot see. */
const PIN_HOLLOW_MEMBERS = ["A1", "A2", "A3", "B1", "B2", "C1", "C2"];
const FROZEN_TITLE = "the judged set: the frozen shape and the out-of-file roster agree";
const ANCHOR_TITLE = "the outside anchor: the bead row's clauses, trigger and stop phrase sit in the row labels, its quote holds the causes";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order and every pin reached its end";

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
      "(a) today: every stop kind (incomplete/budget-exhausted/cancelled/view-invalidated -> partial; provider-/schema-/internal-/protocol-failed, usage-error -> failure; observer.ts:81-86) projects coverage partial or unknown, never statusTone 'success' or 'known-empty' (H2 observer.test.ts:210) - nor any planner failure, resource-cap or snapshot-change stop: the vendored declaration's stops are exactly the filing's nine, each reads so under either licence with rows [] on the adapter and through the registered provider, the resource-cap stop keeping its budget dimension and the snapshot-change stop its view, and a kind the SDK does not register decodes to a failure",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(b) today: a fallback-reason-shaped unknown field reaches no output field, projection strictEqual (H5 :453): a typed reason for each of the program's three causes, under unread keys at six positions of a reading and in the eleven measured free-form slots that survive the SDK decoder, leaves the projection of every readable kind under either licence strictEqual and is spelled nowhere in it",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) on landing: a typed reason with rows [] and kind 'incomplete' surfaces verbatim as its own facet, statusText still 'absence not licensed', and changing only the reason text leaves coverage, statusTone and evidenceRefs byte-identical: gated - If an HX result Pi consumes ever carries the program's typed planner-fallback reason: the vendored SDK's declarations spell no reason outside the recorded other-sense sites and the adapter's read set holds no carrier slot beyond the three wb-gwr.2's relayed facets read",
    pins: ["C1", "C2"],
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
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly causes: readonly (readonly [string, string])[];
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
/** Refuses an object whose keys differ from `keys`, so a field written under a renamed or misspelled key never reads as absent. */
function exactKeys(value: { [key: string]: unknown }, keys: readonly string[], field: string): void {
  const found = Object.keys(value).sort();
  if (JSON.stringify(found) !== JSON.stringify([...keys].sort())) throw new Error(`${field} keys must be exactly ${keys.join(", ")}; found ${found.join(", ")}`);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
const sorted = (values: Iterable<string>): string[] => [...new Set(values)].sort();

function readRoster(): Roster {
  const value = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "roster");
  exactKeys(value, ["bead", "quote", "citation", "causes", "scan", "residuals", "rows", "tests"], "roster");
  const causes = value.causes;
  if (!Array.isArray(causes)) throw new Error("roster causes must be a list");
  const rows = value.rows;
  if (!Array.isArray(rows)) throw new Error("roster rows must be a list");
  return {
    bead: text(value.bead, "roster bead"),
    quote: text(value.quote, "roster quote"),
    citation: text(value.citation, "roster citation"),
    causes: causes.map((item, index) => {
      const pair = strings(item, `roster causes[${index}]`);
      if (pair.length !== 2) throw new Error(`roster causes[${index}] must be a [token, condition] pair`);
      return [pair[0], pair[1]] as const;
    }),
    scan: objectOf(value.scan, "roster scan") as JsonObject,
    residuals: strings(value.residuals, "roster residuals"),
    rows: rows.map((item, index) => {
      const row = objectOf(item, `roster rows[${index}]`);
      exactKeys(row, ["id", "label", "pins"], `roster rows[${index}]`);
      const pins = row.pins;
      if (!Array.isArray(pins)) throw new Error(`roster rows[${index}].pins must be a list`);
      return {
        id: text(row.id, `roster rows[${index}].id`),
        label: text(row.label, `roster rows[${index}].label`),
        pins: pins.map((pin, at) => {
          const entry = objectOf(pin, `roster rows[${index}].pins[${at}]`);
          exactKeys(entry, ["id", "witness"], `roster rows[${index}].pins[${at}]`);
          return { id: text(entry.id, `roster rows[${index}].pins[${at}].id`), witness: entry.witness as JsonValue };
        }),
      };
    }),
    tests: strings(value.tests, "roster tests"),
  };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).filter(entry => entry.id === pin);
  if (found.length !== 1) throw new Error(`the roster holds ${found.length} witnesses for ${pin}`);
  return found[0].witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
let beadRow: BeadRow | undefined;
/** The owner filing's row in the tracked bead export: exactly one row carries the bead's id. */
function readBeadRow(): BeadRow {
  if (beadRow !== undefined) return beadRow;
  const rows = readFileSync(join(REPO, BEAD_EXPORT), "utf8")
    .split("\n")
    .filter(line => line.includes(`"${BEAD}"`))
    .map(line => objectOf(JSON.parse(line), "bead export row"))
    .filter(row => row.id === BEAD);
  if (rows.length !== 1) throw new Error(`${BEAD_EXPORT} carries ${rows.length} rows for ${BEAD}`);
  beadRow = { title: text(rows[0].title, `${BEAD} title`), notes: text(rows[0].notes, `${BEAD} notes`) };
  return beadRow;
}
/** The filing's acceptance clauses, (a) to (c), each as written. */
function acceptanceClauses(notes: string): string[] {
  const body = /Acceptance: (.*?)\. Not P0:/s.exec(notes)?.[1] ?? "";
  return body.length === 0 ? [] : body.split(/; (?=\([bc]\) )/);
}
const quoteOf = (notes: string): string => /Quote: '(.*?)' docs\/programs\//s.exec(notes)?.[1] ?? "";
const triggerOf = (title: string): string => /^\[[^\]]+\] (If .+?) \(gated:/.exec(title)?.[1] ?? "";
const stopPhraseOf = (title: string): string => /shall never read it - (nor any .+?) - as an absent graph fact/.exec(title)?.[1] ?? "";
/** C1's pattern, as the bead row's "Shipped: no" sentence states its grep. */
function filingGrep(notes: string): RegExp {
  const source = /Shipped: no - .*?grep \/([^/]+)\/ over vendored result\.d\.ts and hyperunix-observer\.ts = 0\./s.exec(notes)?.[1];
  if (source === undefined) throw new Error(`the ${BEAD} row states no grep over the vendored result.d.ts and the adapter`);
  return new RegExp(source);
}
/** The filing's stop groups, from clause (a)'s parenthesis: "a/b -> partial; c-/d-failed, e -> failure; <citation>". */
function filingGroups(clause: string): { readonly [reading: string]: readonly string[] } {
  const inner = /every stop kind \(([^)]*)\)/.exec(clause)?.[1] ?? "";
  const groups: { [reading: string]: string[] } = {};
  for (const part of inner.split("; ")) {
    const arrow = / -> ([a-z]+)$/.exec(part);
    if (arrow === null) continue;
    const kinds: string[] = [];
    for (const item of part.slice(0, arrow.index).split(", ")) {
      const names = item.split("/");
      const last = names[names.length - 1];
      const suffix = last.slice(last.indexOf("-") + 1);
      for (const name of names) kinds.push(name.endsWith("-") ? `${name}${suffix}` : name);
    }
    groups[arrow[1]] = kinds;
  }
  return groups;
}

/** The regular files of a gzipped ustar archive, by path. */
function tarEntries(bytes: Buffer): Map<string, Buffer> {
  const entries = new Map<string, Buffer>();
  let offset = 0;
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (start: number, length: number): string =>
      header
        .subarray(start, start + length)
        .toString("utf8")
        .replace(/\0[\s\S]*$/, "");
    const name = field(0, 100);
    const prefix = field(345, 155);
    const size = Number.parseInt(field(124, 12).trim() || "0", 8);
    const type = field(156, 1);
    if (type === "0" || type === "") entries.set(prefix.length > 0 ? `${prefix}/${name}` : name, Buffer.from(bytes.subarray(offset + 512, offset + 512 + size)));
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}
let tarball: Map<string, Buffer> | undefined;
function vendored(): Map<string, Buffer> {
  if (tarball === undefined) tarball = tarEntries(gunzipSync(readFileSync(join(REPO, TARBALL))));
  return tarball;
}
function vendoredText(path: string): string {
  const bytes = vendored().get(path);
  if (bytes === undefined) throw new Error(`${TARBALL} ships no ${path}`);
  return bytes.toString("utf8");
}
/** The vendored declaration's ExecutionStatus kinds in declaration order (the H5 observer.test.ts:409 reading). */
function declaredKinds(): string[] {
  const declaration = vendoredText(DECLARATION_ENTRY);
  const start = declaration.indexOf("export type ExecutionStatus =");
  const end = declaration.indexOf("export type ExecutionStatusKind");
  if (start < 0 || end <= start) throw new Error(`${DECLARATION_ENTRY} declares no ExecutionStatus union`);
  return [...declaration.slice(start, end).matchAll(/readonly kind: "([^"]+)";/g)].map(match => match[1]);
}
function stopGroups(): { readonly partial: readonly string[]; readonly failure: readonly string[] } {
  const groups = filingGroups(acceptanceClauses(readBeadRow().notes)[0] ?? "");
  return { partial: groups.partial ?? [], failure: groups.failure ?? [] };
}
const readableKinds = (): string[] => declaredKinds().filter(kind => !MUTATIONS.includes(kind));

/** A reading the adapter accepts, as the registered provider shapes one (observer.test.ts:39-44), with one certificate. */
function reading(kind: string, licensed: boolean): JsonObject {
  return {
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed },
      rows: [],
      rows_retained: true,
      operation: "find",
      coverage: [CERTIFICATE],
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY },
  };
}
/** An SDK document in the hyperunix.result/1 representation the decoder reads, with one certificate and no rows. */
function sdkDocument(kind: string, licensed: boolean, overrides: JsonObject = {}): JsonObject {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [CERTIFICATE],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 3, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 3 },
    execution_status: { kind, diagnostic_code: null },
    diagnostics: [],
    view: null,
    cost: null,
    transport: {
      started_at: "2026-10-23T16:59:59.000Z",
      startup_latency_s: 0.01,
      process_duration_s: 0.2,
      stdout_bytes: 1000,
      stderr_bytes: 0,
      stderr_bytes_retained: 0,
      frames: 3,
    },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: ["opportunistic"],
      completeness: licensed ? "complete" : "incomplete",
      licenses_absence: licensed,
      certificates_license_absence: false,
      incomplete_regions: [],
      result_coverage: null,
      answer_count: null,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
    ...overrides,
  };
}
/** What registerHyperUnixFind returns when its injected reader serves the SDK-decoded document. */
async function served(document: JsonObject): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(
    registry,
    { find: async () => native, runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }), close: async () => {} },
    WS,
  );
  return registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, GRANTS);
}

/** The census's typed reason for one cause: what a fallback record could carry, every value spelled so a leak is visible. */
const typedReason = (cause: string): JsonObject => ({ kind: "planner-fallback", reason: cause, retained: "original-plan" });
const field = (value: JsonObject, key: string): JsonObject => objectOf(value[key], key) as JsonObject;
/** One plant: where a reason goes, given the value it is planted in and the reason (a record, or a bare string for SHAPES' string form). */
type Plant = (value: JsonObject, reason: JsonValue) => JsonObject;
/** B1: the keys the adapter does not read, on a reading. */
const PLACEMENTS: readonly (readonly [string, Plant])[] = [
  ["source", (value, reason) => ({ ...value, source: { ...field(value, "source"), planner_fallback: reason } })],
  [
    "execution_status",
    (value, reason) => ({ ...value, source: { ...field(value, "source"), execution_status: { ...field(field(value, "source"), "execution_status"), fallback: reason } } }),
  ],
  [
    "coverage_summary",
    (value, reason) => ({ ...value, source: { ...field(value, "source"), coverage_summary: { ...field(field(value, "source"), "coverage_summary"), fallback: reason } } }),
  ],
  ["reading", (value, reason) => ({ ...value, planner_fallback: reason })],
  ["runtime", (value, reason) => ({ ...value, runtime: { ...field(value, "runtime"), fallback: reason } })],
  ["certificate", (value, reason) => ({ ...value, source: { ...field(value, "source"), coverage: [{ ...CERTIFICATE, fallback: reason }] } })],
];
/** B1: the two forms a reason-shaped field takes, a typed record and a bare token. */
const SHAPES: readonly (readonly [string, (cause: string) => JsonValue])[] = [
  ["record", cause => typedReason(cause)],
  ["string", cause => cause],
];
/** B2: unknown keys of the SDK's typed records, on a document: measured dropped by the decoder. */
const DROPS: readonly (readonly [string, Plant])[] = [
  ["source", (document, reason) => ({ ...document, planner_fallback: reason })],
  ["execution_status", (document, reason) => ({ ...document, execution_status: { ...field(document, "execution_status"), fallback: reason } })],
  ["coverage_summary", (document, reason) => ({ ...document, coverage_summary: { ...field(document, "coverage_summary"), fallback: reason } })],
  ["evidence", (document, reason) => ({ ...document, evidence: { ...field(document, "evidence"), fallback: reason } })],
  ["status", (document, reason) => ({ ...document, status: { ...field(document, "status"), fallback: reason } })],
  ["transport", (document, reason) => ({ ...document, transport: { ...field(document, "transport"), fallback: reason } })],
  ["certificate", (document, reason) => ({ ...document, coverage: [{ ...CERTIFICATE, fallback: reason }] })],
  [
    "diagnostic",
    (document, reason) => ({
      ...document,
      diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE", severity: "warning", message: "licenses no absence", details: {}, remediation: null, request: null, fallback: reason }],
    }),
  ],
];
const tokenOf = (reason: JsonValue): string => (isObject(reason) ? text(reason.reason, "typed reason") : text(reason, "reason token"));
/** B2: the free-form slots of the SDK representation, each with the slot key C2 reads for; measured kept by the decoder. */
const CARRIERS: readonly (readonly [string, string, Plant])[] = [
  [
    "diagnostic",
    "diagnostics",
    (document, reason) => ({
      ...document,
      diagnostics: [
        { code: "HX-PLANNER-FALLBACK", severity: "info", message: `planner fallback: ${tokenOf(reason)}`, details: { fallback: reason }, remediation: { fallback: reason }, request: null },
      ],
    }),
  ],
  [
    "diagnostic-extra",
    "extra",
    (document, reason) => ({
      ...document,
      diagnostics: [{ code: "HX-COVERAGE-INCOMPLETE", severity: "warning", message: "licenses no absence", details: {}, remediation: null, request: null, extra: { fallback: reason } }],
    }),
  ],
  [
    "status-diagnostic-code",
    "diagnostic_code",
    (document, reason) => ({ ...document, execution_status: { ...field(document, "execution_status"), diagnostic_code: `HX-PLANNER-FALLBACK-${tokenOf(reason).toUpperCase()}` } }),
  ],
  ["extension", "extensions", (document, reason) => ({ ...document, extensions: { "hx.planner.fallback": reason } })],
  ["certificate-cause", "cause", (document, reason) => ({ ...document, coverage: [{ ...CERTIFICATE, cause: { cause: "fallback", fallback: reason } }] })],
  ["certificate-body", "body", (document, reason) => ({ ...document, coverage: [{ ...CERTIFICATE, body: { fallback: reason } }] })],
  [
    "incomplete-region",
    "incomplete_regions",
    (document, reason) => ({ ...document, coverage_summary: { ...field(document, "coverage_summary"), incomplete_regions: [{ scope: "fs:src", fallback: reason }] } }),
  ],
  [
    "result-coverage",
    "result_coverage",
    (document, reason) => ({ ...document, coverage_summary: { ...field(document, "coverage_summary"), result_coverage: { fallback: reason } } }),
  ],
  ["cost", "cost", (document, reason) => ({ ...document, cost: { fallback: reason } })],
  ["execution-id", "execution_id", (document, reason) => ({ ...document, execution_id: `fallback:${tokenOf(reason)}` })],
  ["support-id", "support_ids", (document, reason) => ({ ...document, evidence: { ...field(document, "evidence"), support_ids: [`fallback:${tokenOf(reason)}`] } })],
];
/** The slot keys of the SDK's typed stop facts (A3), which C2 reads for beside the carriers. */
const STOP_FACT_SLOTS = ["budget_dimension", "dimension", "view"];
/** R-RELAYED-SHAPE: the shapes wb-gwr.2 relays verbatim as a facet, one per relayed slot (name, slot, plant, the facet the planted
 * reason must surface as). Every B2 carrier stays outside them; B2's relayed-shape control plants the reason in each. */
const RELAYED_SHAPES: readonly (readonly [string, string, Plant, (reason: JsonValue) => JsonValue])[] = [
  ["view", "view", (document, reason) => ({ ...document, view: `fallback:${tokenOf(reason)}` }), reason => ({ kind: "view", view: `fallback:${tokenOf(reason)}` })],
  [
    "conflict-code",
    "diagnostics",
    (document, reason) => ({
      ...document,
      diagnostics: [
        { code: `HX-PLANNER-FALLBACK-${tokenOf(reason).toUpperCase()}-CONFLICT`, severity: "info", message: "census plant", details: {}, remediation: null, request: null },
      ],
    }),
    reason => ({ kind: "conflict", code: `HX-PLANNER-FALLBACK-${tokenOf(reason).toUpperCase()}-CONFLICT` }),
  ],
  [
    "region-target",
    "incomplete_regions",
    (document, reason) => ({
      ...document,
      coverage_summary: { ...field(document, "coverage_summary"), incomplete_regions: [{ scope: "fs:src", target: `fallback:${tokenOf(reason)}` }] },
    }),
    reason => ({ kind: "incomplete-region", scope: "fs:src", target: `fallback:${tokenOf(reason)}` }),
  ],
];

/** Every path of `value` whose key or string leaf spells the reason family or the cause token. */
function marks(value: unknown, cause: string, path: string): string[] {
  const spelled = (word: string): boolean => REASON_FAMILY.test(word) || word.toLowerCase().includes(cause);
  if (typeof value === "string") return spelled(value) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => marks(item, cause, `${path}.${index}`));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => [...(spelled(key) ? [`${path}.${key}`] : []), ...marks(child, cause, `${path}.${key}`)]);
  }
  return [];
}
/** A leak: the topology spells the reason family or the cause anywhere (its serialized text, every key and leaf). */
const leaks = (topology: HyperUnixProjectionTopology, cause: string): boolean => {
  const serialized = JSON.stringify(topology);
  return REASON_FAMILY.test(serialized) || serialized.toLowerCase().includes(cause);
};
type Tuple = [string, boolean, string, string, string];
const tupleOf = (kind: string, licensed: boolean, topology: HyperUnixProjectionTopology): Tuple => {
  const [snapshot] = topology.snapshots;
  return [kind, licensed, snapshot.coverage ?? "absent", snapshot.node.statusTone, snapshot.node.statusText];
};

/** Every property name a module's source reads: property access, string element access and object destructuring. */
function readNames(source: string): string[] {
  const file = ts.createSourceFile("subject.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) names.add(node.name.text);
    else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) names.add(node.argumentExpression.text);
    else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      if (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) names.add(key.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return sorted(names);
}
const carrierSlots = (): string[] => sorted([...CARRIERS.map(([, slot]) => slot), ...STOP_FACT_SLOTS]);
/** The carrier and stop-fact slots wb-gwr.2's relayed facets read, named by the adapter's own manifest (C2; R-RELAYED-SHAPE). */
const manifestRelayedSlots = (): string[] =>
  carrierSlots().filter(slot => HYPERUNIX_CONSUMED_FIELDS.some(field => field.use === "relayed" && field.path.split(/\.|\[\]/).includes(slot)));
/** C1/C2 residual controls: a declaration and reads in shapes the scans are blind to (each must stay quiet). */
const RENAMED_DECLARATION = "    readonly plannerCause: string | null;\n";
const RENAMED_READ = "const why = source.planner_cause;\n";
const DYNAMIC_READ = "const all = {...source};\nconst keys = Object.keys(source);\nconst slot = source[name];\n";
const HOMONYM_READ = "const named = source.digest;\nconst region = record(item)?.scope;\n";
const familyLines = (source: string): number => source.split("\n").filter(line => REASON_FAMILY.test(line)).length;
/** Every object key at any depth of a value. */
function keysOf(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, child]) => [key, ...keysOf(child)]);
  return [];
}

/** Every scan constant, as the roster holds it. */
const SCAN: JsonObject = {
  reasonFamily: `${REASON_FAMILY.source}/${REASON_FAMILY.flags}`,
  completes: COMPLETES,
  mutations: MUTATIONS,
  licences: LICENCES,
  sdk: SDK,
  tarball: TARBALL,
  installed: INSTALLED,
  declarationEntry: DECLARATION_ENTRY,
  grammarEntry: GRAMMAR_ENTRY,
  observer: OBSERVER,
  certificate: CERTIFICATE,
  stopFacts: STOP_FACTS,
  unregisteredKind: UNREGISTERED_KIND,
  placements: PLACEMENTS.map(([name]) => name),
  shapes: SHAPES.map(([name]) => name),
  drops: DROPS.map(([name]) => name),
  carriers: CARRIERS.map(([name, slot]) => `${name}:${slot}`),
  relayedShapes: RELAYED_SHAPES.map(([name, slot]) => `${name}:${slot}`),
  stopFactSlots: STOP_FACT_SLOTS,
  projectedKeys: PROJECTED_KEYS,
  pinHollowMembers: PIN_HOLLOW_MEMBERS,
  controls: { renamedDeclaration: RENAMED_DECLARATION, renamedRead: RENAMED_READ, dynamicRead: DYNAMIC_READ, homonymRead: HOMONYM_READ },
};

/** Which rows' labels carry each acceptance clause, the trigger and the stop phrase of the bead row, in that order. */
function anchorCoverage(rows: readonly Row[], bead: BeadRow): string[][] {
  const phrases = [...acceptanceClauses(bead.notes), triggerOf(bead.title), stopPhraseOf(bead.title)];
  return phrases.map(phrase => rows.filter(row => phrase.length > 0 && row.label.includes(phrase)).map(row => row.id));
}

const REACHED: string[] = [];
function done(pin: string, witness: { [key: string]: unknown }): JsonValue {
  REACHED.push(pin);
  return json({ pin, ...witness });
}

type Impl = () => JsonValue | Promise<JsonValue>;
const IMPL: { readonly [pin: string]: Impl } = {
  A1: () => {
    const declared = declaredKinds();
    const { partial, failure } = stopGroups();
    const notStops = [...COMPLETES, ...MUTATIONS];
    const stops = declared.filter(kind => !notStops.includes(kind));
    expect(declared, "the vendored declaration declares the adapter's kind tuple").toEqual([...HYPERUNIX_EXECUTION_KINDS]);
    expect(
      notStops.filter(kind => !declared.includes(kind)),
      "every excluded kind is a declared kind",
    ).toEqual([]);
    expect(partial.length > 0 && failure.length > 0, "the filing's clause (a) lists a partial and a failure group").toBe(true);
    expect(stops, "the declared stops, in declaration order, are the filing's partial group then its failure group").toEqual([...partial, ...failure]);
    return done("A1", { declared, notStops, stops: { partial, failure } });
  },
  A2: () => {
    const { partial, failure } = stopGroups();
    const seen: Tuple[] = [];
    for (const kind of [...partial, ...failure]) {
      for (const licensed of LICENCES) {
        const topology = hyperunixTopology(reading(kind, licensed), CONTEXT);
        const tuple = tupleOf(kind, licensed, topology);
        const serialized = JSON.stringify(topology);
        expect(tuple[2], `${kind} coverage`).toBe(partial.includes(kind) ? "partial" : "unknown");
        expect(tuple[3], `${kind} tone`).toBe(partial.includes(kind) ? "unknown" : "failure");
        expect(serialized.includes("known-empty") || serialized.includes('"success"'), `${kind} spells known-empty or the success tone`).toBe(false);
        seen.push(tuple);
      }
    }
    expect(seen).toHaveLength(2 * (partial.length + failure.length));
    return done("A2", { readings: seen });
  },
  A3: async () => {
    const { partial, failure } = stopGroups();
    const seen: Tuple[] = [];
    const facts: { [kind: string]: string[] } = {};
    for (const kind of [...partial, ...failure]) {
      for (const licensed of LICENCES) {
        const overrides = STOP_FACTS[kind] ?? {};
        const value = await served(sdkDocument(kind, licensed, overrides));
        const source = objectOf(objectOf(value, "provider reading").source, "provider source");
        if (STOP_FACTS[kind] !== undefined) {
          const carried = [
            ...(source.budget_dimension === "wall" ? ["budget_dimension:wall"] : []),
            ...(objectOf(source.execution_status, "execution status").dimension === "wall" ? ["execution_status.dimension:wall"] : []),
            ...(source.view === "hx-view:census-1" ? ["view:hx-view:census-1"] : []),
          ];
          expect(carried.length > 0, `${kind}'s typed facts reach the adapter's input`).toBe(true);
          facts[kind] = carried;
          // wb-gwr.2: the snapshot-change stop's view is relayed verbatim as its own facet; nothing else in the projection moves.
          const { facets: relayedFacets, ...movedRest } = hyperunixTopology(value, CONTEXT);
          expect(movedRest, `${kind}'s typed facts move nothing in the projection but the relayed facets`).toStrictEqual(
            hyperunixTopology(await served(sdkDocument(kind, licensed)), CONTEXT),
          );
          expect(relayedFacets, `${kind}'s relayed facets`).toStrictEqual(kind === "view-invalidated" ? [{ kind: "view", view: "hx-view:census-1" }] : undefined);
        }
        const topology = hyperunixTopology(value, CONTEXT);
        const tuple = tupleOf(kind, licensed, topology);
        const serialized = JSON.stringify(topology);
        expect(tuple[2], `${kind} coverage through the provider`).toBe(partial.includes(kind) ? "partial" : "unknown");
        expect(tuple[3], `${kind} tone through the provider`).toBe(partial.includes(kind) ? "unknown" : "failure");
        expect(serialized.includes("known-empty") || serialized.includes('"success"'), `${kind} spells known-empty or the success tone`).toBe(false);
        expect(tuple, `${kind} reads through the provider as on the adapter`).toEqual(tupleOf(kind, licensed, hyperunixTopology(reading(kind, licensed), CONTEXT)));
        seen.push(tuple);
      }
    }
    const unregistered = await served(sdkDocument(UNREGISTERED_KIND, false));
    const decoded = text(objectOf(objectOf(objectOf(unregistered, "provider reading").source, "provider source").execution_status, "execution status").kind, "decoded kind");
    const unregisteredTuple = tupleOf(decoded, false, hyperunixTopology(unregistered, CONTEXT));
    expect(failure.includes(decoded), `${UNREGISTERED_KIND} decodes to a failure-group kind`).toBe(true);
    expect(unregisteredTuple[3], `${UNREGISTERED_KIND} stays a failure`).toBe("failure");
    return done("A3", { readings: seen, facts, unregistered: { kind: UNREGISTERED_KIND, decoded, reading: unregisteredTuple } });
  },
  B1: () => {
    const kinds = readableKinds();
    let runs = 0;
    const unequal: string[] = [];
    const leaked: string[] = [];
    for (const kind of kinds) {
      for (const licensed of LICENCES) {
        const base = reading(kind, licensed);
        const expected = hyperunixTopology(base, CONTEXT);
        for (const [placement, plant] of PLACEMENTS) {
          for (const [shape, reasonOf] of SHAPES) {
            for (const [cause] of CAUSES) {
              runs++;
              const planted = plant(base, reasonOf(cause));
              expect(marks(planted, cause, "reading").length > 0, `${placement}/${shape} plants the reason`).toBe(true);
              const topology = hyperunixTopology(planted, CONTEXT);
              const at = `${kind}/${licensed}/${placement}/${shape}/${cause}`;
              if (JSON.stringify(topology) !== JSON.stringify(expected)) unequal.push(at);
              else expect(topology).toStrictEqual(expected);
              if (leaks(topology, cause)) leaked.push(at);
            }
          }
        }
      }
    }
    expect(unequal, "projections a planted reason changed").toEqual([]);
    expect(leaked, "projections spelling a planted reason").toEqual([]);
    expect(runs).toBe(kinds.length * LICENCES.length * PLACEMENTS.length * SHAPES.length * CAUSES.length);
    return done("B1", { kinds, runs, unequal, leaked });
  },
  B2: async () => {
    const kinds = readableKinds();
    let runs = 0;
    const unequal: string[] = [];
    const leaked: string[] = [];
    const dropped: { [name: string]: string[] } = {};
    const carried: { [name: string]: string[] } = {};
    for (const kind of kinds) {
      for (const licensed of LICENCES) {
        const base = sdkDocument(kind, licensed);
        const baseValue = await served(base);
        expect(marks(baseValue, CAUSES[0][0], "reading"), "the reason-free provider reading spells no reason").toEqual([]);
        const expected = hyperunixTopology(baseValue, CONTEXT);
        for (const [cause] of CAUSES) {
          const plants: (readonly [string, string, Plant])[] = [
            ...DROPS.map(([name, plant]) => ["drop", name, plant] as const),
            ...CARRIERS.map(([name, , plant]) => ["carrier", name, plant] as const),
          ];
          for (const [family, name, plant] of plants) {
            runs++;
            const value = await served(plant(base, typedReason(cause)));
            const paths = sorted(marks(value, cause, "reading"));
            const book = family === "drop" ? dropped : carried;
            const previous = book[name];
            if (previous === undefined) book[name] = paths;
            else expect(paths, `${family} ${name} reaches the reading at the same paths for every kind, licence and cause`).toEqual(previous);
            const topology = hyperunixTopology(value, CONTEXT);
            const at = `${kind}/${licensed}/${family}:${name}/${cause}`;
            if (JSON.stringify(topology) !== JSON.stringify(expected)) unequal.push(at);
            else expect(topology).toStrictEqual(expected);
            if (leaks(topology, cause)) leaked.push(at);
          }
        }
      }
    }
    for (const [name, paths] of Object.entries(dropped)) expect(paths, `the decoder drops the reason at ${name}`).toEqual([]);
    for (const [name, slot] of CARRIERS) {
      expect(
        (carried[name] ?? []).some(path => path.split(".").includes(slot)),
        `carrier ${name} reaches the adapter's input under ${slot}`,
      ).toBe(true);
    }
    expect(unequal, "projections a carried reason changed").toEqual([]);
    expect(leaked, "projections spelling a carried reason").toEqual([]);
    expect(runs).toBe(kinds.length * LICENCES.length * CAUSES.length * (DROPS.length + CARRIERS.length));
    // R-RELAYED-SHAPE quiet row: a reason inside each shape wb-gwr.2 relays reaches the adapter's input at its slot, surfaces
    // verbatim as its own facet and nothing else, and moves nothing outside the facets.
    expect(sorted(RELAYED_SHAPES.map(([, slot]) => slot)), "R-RELAYED-SHAPE plants one shape per slot the adapter's manifest relays").toEqual(manifestRelayedSlots());
    let relayedRuns = 0;
    const relayedReached: { [name: string]: string[] } = {};
    const relayedMoved: string[] = [];
    const relayedOff: string[] = [];
    for (const kind of kinds) {
      for (const licensed of LICENCES) {
        const base = sdkDocument(kind, licensed);
        const expected = hyperunixTopology(await served(base), CONTEXT);
        for (const [cause] of CAUSES) {
          for (const [name, , plant, facetOf] of RELAYED_SHAPES) {
            relayedRuns++;
            const reason = typedReason(cause);
            const value = await served(plant(base, reason));
            const paths = sorted(marks(value, cause, "reading"));
            const previous = relayedReached[name];
            if (previous === undefined) relayedReached[name] = paths;
            else expect(paths, `relayed shape ${name} reaches the reading at the same paths for every kind, licence and cause`).toEqual(previous);
            const { facets, ...rest } = hyperunixTopology(value, CONTEXT);
            const at = `${kind}/${licensed}/${name}/${cause}`;
            if (JSON.stringify(rest) !== JSON.stringify(expected)) relayedMoved.push(at);
            if (JSON.stringify(facets) !== JSON.stringify([facetOf(reason)])) relayedOff.push(at);
          }
        }
      }
    }
    for (const [name, slot] of RELAYED_SHAPES) {
      expect(
        (relayedReached[name] ?? []).some(path => path.split(".").includes(slot)),
        `relayed shape ${name} reaches the adapter's input under ${slot}`,
      ).toBe(true);
    }
    expect(relayedMoved, "R-RELAYED-SHAPE: projections a relayed-shape reason moved outside the facets").toEqual([]);
    expect(relayedOff, "R-RELAYED-SHAPE: projections whose facets are not exactly the planted reason, verbatim").toEqual([]);
    expect(relayedRuns).toBe(kinds.length * LICENCES.length * CAUSES.length * RELAYED_SHAPES.length);
    const relayedShape = { runs: relayedRuns, reached: relayedReached, moved: relayedMoved, off: relayedOff };
    return done("B2", { kinds, runs, dropped, carried, unequal, leaked, relayedShape });
  },
  C1: () => {
    const notes = readBeadRow().notes;
    const grep = filingGrep(notes);
    const manifest = objectOf(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")), "package.json");
    const spec = objectOf(manifest.dependencies, "package.json dependencies")[SDK];
    const installedVersion = objectOf(JSON.parse(readFileSync(join(REPO, "node_modules", SDK, "package.json"), "utf8")), "installed package.json").version;
    const declaration = vendoredText(DECLARATION_ENTRY);
    const installedEqual = readFileSync(join(REPO, INSTALLED), "utf8") === declaration;
    const observer = readFileSync(join(REPO, OBSERVER), "utf8");
    const filingHits = { declaration: declaration.split("\n").filter(line => grep.test(line)).length, observer: observer.split("\n").filter(line => grep.test(line)).length };
    const declarations = [...vendored().keys()].filter(path => path.endsWith(".d.ts")).sort();
    const otherSense: { [path: string]: string[] } = {};
    for (const path of declarations) {
      const lines = vendoredText(path)
        .split("\n")
        .filter(line => REASON_FAMILY.test(line))
        .map(line => line.trim());
      if (lines.length > 0) otherSense[path] = lines;
    }
    const grammar = vendoredText(GRAMMAR_ENTRY);
    const opening = grammar.indexOf("export interface Diagnostic {");
    const diagnostic = opening < 0 ? "" : grammar.slice(opening, grammar.indexOf("\n}", opening));
    const grammarKeys = [...diagnostic.matchAll(/^ {4}readonly (\w+):/gm)].map(match => match[1]);
    expect(spec, "package.json resolves the SDK from the vendored tarball").toBe(`file:${TARBALL}`);
    expect(installedEqual, "the installed result.d.ts is the vendored one").toBe(true);
    expect(filingHits, "the filing's grep over the vendored result.d.ts and the adapter").toEqual({ declaration: 0, observer: 0 });
    expect(declarations.length > 0 && declarations.includes(DECLARATION_ENTRY) && declarations.includes(GRAMMAR_ENTRY), "the tarball's declaration files are read").toBe(true);
    expect(otherSense[DECLARATION_ENTRY], "the result declaration spells no reason").toBeUndefined();
    expect(grammarKeys.includes("code") && grammarKeys.includes("details"), "the diagnostic grammar declares a free code and details").toBe(true);
    return done("C1", {
      spec,
      installedVersion,
      installedEqual,
      filingGrep: grep.source,
      filingHits,
      declarationFiles: declarations.length,
      otherSense,
      controls: {
        grammar: { keys: grammarKeys, familyLines: familyLines(grammar) },
        renamed: familyLines(RENAMED_DECLARATION),
      },
    });
  },
  C2: async () => {
    const names = readNames(readFileSync(join(REPO, OBSERVER), "utf8"));
    // The key set comes from the SDK's own serializer and the provider: a served reading carrying both stop facts.
    const keys = sorted(keysOf(await served(sdkDocument("budget-exhausted", false, { ...STOP_FACTS["budget-exhausted"], view: "hx-view:census-1" }))));
    const reads = names.filter(name => keys.includes(name));
    const slots = carrierSlots();
    const carriersRead = names.filter(name => slots.includes(name));
    const familyRead = names.filter(name => REASON_FAMILY.test(name));
    const projectedMissing = PROJECTED_KEYS.filter(key => !reads.includes(key));
    expect(
      slots.filter(slot => !keys.includes(slot)),
      "every carrier and stop-fact slot is a key of the served SDK representation",
    ).toEqual([]);
    // wb-gwr.2: the carrier slots the relayed facets read, from the adapter's own manifest; no other slot is read.
    const relayedSlots = manifestRelayedSlots();
    expect(relayedSlots, "the carrier slots wb-gwr.2's relayed facets name").toEqual(["diagnostics", "incomplete_regions", "view"]);
    expect(carriersRead, "carrier and stop-fact slots the adapter reads").toEqual(relayedSlots);
    expect(familyRead, "reason-family names the adapter reads").toEqual([]);
    expect(projectedMissing, "projected input keys the adapter no longer reads (a collapsed collector)").toEqual([]);
    const control = (source: string): { readonly names: string[]; readonly added: string[]; readonly flagged: string[] } => {
      const read = readNames(source);
      return {
        names: read,
        added: read.filter(name => keys.includes(name) && !reads.includes(name)),
        flagged: read.filter(name => slots.includes(name) || REASON_FAMILY.test(name)),
      };
    };
    const renamed = control(RENAMED_READ);
    const dynamic = control(DYNAMIC_READ);
    const homonym = control(HOMONYM_READ);
    expect([...renamed.added, ...renamed.flagged], "R-RENAMED: a carrier read under another name stays quiet").toEqual([]);
    expect([...dynamic.added, ...dynamic.flagged], "R-DYNAMIC: a spread, reflective or computed read stays quiet").toEqual([]);
    expect(homonym.added, "R-HOMONYM: a read of a representation key the adapter already spells elsewhere adds nothing").toEqual([]);
    // Each access form over a slot the adapter never reads (wb-gwr.2 now reads diagnostics and view, so those two would add nothing).
    const forms = control("const d = source.support_ids;\nconst {extensions} = source;\nconst c = source['cost'];\nconst v = record(source)?.extra;\n");
    expect(forms.flagged, "the collector reads each access form").toEqual(["cost", "extensions", "extra", "support_ids"]);
    expect(forms.added, "and each such read adds to the read set").toEqual(["cost", "extensions", "extra", "support_ids"]);
    return done("C2", { keys, reads, slots, carriersRead, familyRead, projectedMissing, controls: { renamed, dynamic, homonym } });
  },
};

describe("wb-z3ft.1 HX planner-fallback reason census (HX-CERTIFIED-STRUCTURAL-OPTIMIZATION-R1, today legs)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, causes: CAUSES, scan: json(SCAN), residuals: RESIDUAL_FAMILIES, self: SELF }).toStrictEqual({
      bead: ROSTER.bead,
      causes: ROSTER.causes.map(pair => [...pair]),
      scan: ROSTER.scan,
      residuals: [...ROSTER.residuals],
      self: SELF,
    });
  });

  it(ANCHOR_TITLE, { timeout: 60_000 }, () => {
    // The owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    expect(
      clauses.map(clause => clause.slice(0, 4)),
      "the filing lists acceptance (a), (b) and (c)",
    ).toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = anchorCoverage(ROWS, bead);
    expect(coverage, "every acceptance clause, the trigger and the stop phrase sit verbatim in exactly one row label").toEqual([["A"], ["B"], ["C"], ["C"], ["A"]]);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a phrase of the filing").toBe(true);
    // R-PIN-HOLLOW quiet row: the anchor reads row labels only, so one pin removed from every literal leaves its reading
    // unchanged, while a row removed from every literal changes it (the reading is live).
    const withoutPin = (pin: string): Row[] => ROWS.map(row => ({ ...row, pins: row.pins.filter(item => item !== pin) }));
    const unseen = ROWS.flatMap(row => row.pins).filter(pin => JSON.stringify(anchorCoverage(withoutPin(pin), bead)) === JSON.stringify(coverage));
    expect(unseen, "R-PIN-HOLLOW: the pins whose removal from every literal the anchor cannot see").toEqual(PIN_HOLLOW_MEMBERS);
    expect(
      ROWS.filter(row => JSON.stringify(anchorCoverage(ROWS.filter(other => other.id !== row.id), bead)) === JSON.stringify(coverage)).map(row => row.id),
      "rows whose removal from every literal the anchor cannot see",
    ).toEqual([]);
    const quote = quoteOf(bead.notes);
    expect({ quote, citation: ROSTER.citation }, "the filing's quote and citation").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(
      CAUSES.filter(([, condition]) => !quote.includes(condition)),
      "every cause's condition sits in the filing's quote",
    ).toEqual([]);
    expect(quote, "the quote names the planner failure the stops must never become").toContain("Never interpret planner failure as an absent graph fact.");
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
