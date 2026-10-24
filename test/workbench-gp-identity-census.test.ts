/**
 * wb-gxd7.1 (GPC-FEEDBACK-CONTRACT-AUDIT-R1, program-triage-2026-10-22, epic wb-gxd7): gp identities stay uncollapsed in Pi, a
 * census with an until-then leg. Statement (the bead note's full statement; its title is trimmed): "No Pi surface shall collapse
 * two gp hashes into one identity because they share the `graphpolicy.snapshot.c1:` prefix or a hex suffix: each gp identity is
 * carried verbatim under its producer field name with its profile or form tagged (`identities.graph`, `canonical_digest`,
 * `receipt.input_snapshot`/`graph_digest`, checkpoint), compared only byte-equal within one profile/form, and old interpretations
 * are kept until GP publishes a migration (D-IDENT-1 descriptor unshipped, gated)" - GraphPolicyCLI
 * docs/programs/feedback-contract-audit-2026-10-21/README.md:42 at 0107c72992f3, merged with 02-contract-audit.md:25,42 and
 * 03-developer-workplan.md:112. Acceptance (the owner filing's; each clause sits verbatim in exactly one row label below): "(a)
 * sameGpIdentity(a,b) holds only for byte-equal strings with the same profile/form tag; prefix/suffix-sharing pairs and the
 * ledger's three digests of one snapshot compare false; (b) the checkpoint field carries a form tag in {program-bound,
 * theta-words, cas-blob}; only the program-bound form is passed as --checkpoint and a CAS blob address is never a checkpoint
 * identity; (c) census: no startsWith/endsWith/includes over gp identity strings in src; identity and profile/form never
 * rewritten on read; post-D-IDENT-1 profile read from the descriptor, else 'unknown profile'". Posture (the filing's "Not P0"
 * fact, verbatim in row C's label): "Pi holds no gp identity (0 gp hits at d75b68d1)".
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23; read-only `git show` / `git grep` in the local GraphPolicyCLI checkout, no fetch; the
 * installed gp run once in scratch). AT THE PIN 0107c72992f3 (the roster quotes every line it rests on, verbatim): README.md:42 is
 * the quote; 02-contract-audit.md:24-26 is the producer's digest ledger - one snapshot surfaces three digests: `gp graph check`
 * `identities.graph` (the whole document under GRAPH_DATA_SNAPSHOT_C1_PROFILE, "Document/profile identity"), `gp inspect graph`
 * `canonical_digest` and the declared `digests.canonical` (the projection under DATA_DIGEST_PROFILE, "DataIR projection digest",
 * sharing the `graphpolicy.snapshot.c1:` prefix with a different preimage) and `gp eval` `receipt.input_snapshot`, `gp sample` and
 * the decision journal (SHA-256 of the exact presented bytes, "Byte-exact invocation/journal join key"); :30 and :42 are D-IDENT-1
 * and D-IDENT-3 (open); :38-40 is the checkpoint ledger - the program-bound logical identity the CLI's `--checkpoint` names, the
 * library evaluator's theta-words `checkpointIdentity(theta)` and the CAS `put("checkpoint", bytes)` blob address; :52 is
 * D-STORE-1 (equate a logical digest and a CAS blob hash only on a proven preimage theorem); 03-developer-workplan.md:112 is the
 * stop condition on prefix-only equivalence; 01-finding-inventory.md:9-10 are F01 (one snapshot, three graph digests) and F02 (one
 * theta, two checkpoint identities), CONFIRMED-OPEN at 61fda0c. The field names behind the ledger rows are read from the pin's
 * code (eval-run.ts:476 `identities.checkpoint` = `receipt.checkpoint_digest`, inspect-decision.ts:161 `graph_digest`,
 * sample-command.ts:312,314 the journal's `snapshotDigest` and `checkpointDigest` written as the bare tails of the decision's
 * values, evaluate.ts:62 and receipt.ts:30 the library receipt's `checkpoint` and `digests.checkpoint`, cas.ts:71 the put result's
 * `digest`), and the filing's code facts hold (digests.ts:23,100; graph-check.ts:143; evaluate.ts:150; rpc-sample.ts:178).
 * AT gp main 0fdf395 (a descendant): docs/dev/IDENTITIES.md catalogues thirteen identity rows (I01-I13) and records the
 * host-adapter fixture's values, one theta's three checkpoint forms among them (program-bound c463f169, theta-words 81efdbef,
 * cas-blob f832aae7, all under `graphpolicy.checkpoint.c1:`); D-IDENT-1 is RULED-A, CONTESTED and registered as GPR-1607 (a
 * seven-key `graphpolicy.identity.v1` record: schema, domain, algorithm, profile `graphpolicy.c1` or null, payload, value byte for
 * byte, hex) with no product change; 0 product files (ts/src, python/src) spell `graphpolicy.identity.v1` at the pin or at 0fdf395
 * and the installed bundle holds 0, so the gate is CLOSED. The producer's WP0-IDENT evidence (gpc-1ly.12.1) records the eval and
 * sample receipts of the same snapshot and the CLI's verdict on each checkpoint form passed as `--checkpoint` (program-bound
 * accepted and echoed as `receipt.checkpoint_digest`; theta-words GP_CLI_CHECKPOINT_MISMATCH, exit 2, stage validate).
 * AT THE INSTALLED gp (0.1.0, built from 3f7d52c, a descendant of the pin): `gp graph check --schema schema.json --graph
 * snapshot.json --json` over the pin's fixtures/conformance/host-adapter files exits 0 with empty stderr and prints
 * identities.graph graphpolicy.snapshot.c1:69ce8473... and digest_checks.canonical "verified" (the snapshot's declared
 * digests.canonical is gp's recomputed projection digest); `gp eval` refuses ("not implemented: eval") in this build, so the eval
 * receipt value is the producer's record, which the census recomputes from the snapshot bytes the roster carries (4784 bytes).
 *
 * Pi has no gp seam today (see test/workbench-gp-real-interfaces.test.ts and test/workbench-gp-fallback-census.test.ts): no module
 * below src, qa or examples spells a gp identity domain or reads a gp identity field. So the trigger has not fired, the posture
 * holds by absence, and (a)-(c) are armed on a test-side REFERENCE, the rule an adopting consumer must meet, and its JUDGES,
 * beside the walk that keeps the absence true:
 *  readGpIdentity carries value, surface and field verbatim, takes the form from the LEDGER row of (surface, field) - never from
 *    the value's prefix or from a field name alone - and the profile from a carried graphpolicy.identity.v1 descriptor verbatim
 *    (null included), else 'unknown profile'; it refuses an unledgered field, a foreign descriptor and a descriptor of another value.
 *  sameGpIdentity holds exactly when form, profile and value are equal, the value byte for byte: one identity carried under two
 *    fields of one ledger row compares true; a shared prefix, a shared hex tail, another form or another profile never joins two.
 *  checkpointArgv passes only the program-bound form as --checkpoint; checkpointIdentityOf never reads a CAS blob address as a
 *    checkpoint identity.
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the comparison table over the measured carriers is the producer's identity rows (true exactly for one
 *    catalogue row and one value), each carrier equal to its producer record; A2 every measured pair sharing a domain prefix and
 *    every pair sharing a hex tail (the journal's bare tails beside the prefixed values, one hex under two domains) compares
 *    false; A3 the ledger's three digests of one snapshot, recomputed or read from its bytes and the installed gp, compare false
 *    pairwise; A4 the comparator mutants are refused, each by exactly its rules.
 *  B, acceptance (b). B1 every checkpoint field of the ledger carries one form of the filing's set, one theta's three forms share
 *    their prefix, one leaf name carries two forms, and a checkpoint value outside the ledger is refused, never tagged by its
 *    name; B2 only the program-bound form becomes --checkpoint, beside the producer's own verdicts, and the argv mutants are
 *    refused; B3 a CAS blob address is never a checkpoint identity (measured: never its theta's logical value; constructed:
 *    refused even at equal bytes) and the mutants are refused.
 *  C, acceptance (c) and the posture. C1 the walk: no module below WALK_ROOTS spells a gp identity domain, reads a gp identity
 *    field or calls startsWith, endsWith or includes over one, and no other file below them spells one, with floors, flagged and
 *    quiet controls and each residual's quiet row; C2 the reference reader carries value and field verbatim beside its ledger
 *    row's form and the rewriting readers are refused; C3 the profile comes from the descriptor or reads 'unknown profile', the
 *    profile mutants are refused, and the descriptor is measured unshipped.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the ledger, the derived vocabulary, the residual families and the registered test titles are held
 * to the out-of-file roster (test/fixtures/gp-identity-roster.json). OUTSIDE ANCHOR: the owner filing's row in the tracked bead
 * export (.beads/issues.jsonl, row wb-gxd7.1): each acceptance clause and the posture fact sit verbatim in exactly one row label,
 * every row carries one, the statement, quote, citation and authority sentence equal the roster's, the quote is the producer's
 * README.md:42 line and the authority sentence sits in its 02:30 line, the filing's field names are ledger fields, its checkpoint
 * form set is the ledger's, its three method names are CALL_METHODS, its comparator name is the reference's, its 'unknown profile'
 * is UNKNOWN_PROFILE, and its gating sentence names the roster's code facts. Not claimed: a pin removed from ROWS, the literal,
 * IMPL and the roster together (the bead row anchors rows and clauses, not pins).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED).
 * RESIDUALS (named families, each with a pinned quiet row in C1's controls): R-ALIAS a gp identity read through two or more aliases
 * (the walk follows one); R-COMPUTED a domain or field name composed at run time; R-OTHER-METHOD a prefix or suffix test by another
 * method (indexOf, slice, a regular expression); R-COMMENT a comment naming one (comments are not read); R-UNTYPED-FLOW a gp value
 * reaching a parameter or a generic helper with no gp name on the way; R-NAMESAKE a gp field whose name is generic or Pi's own
 * (the journal's snapshotDigest, the library receipt's checkpoint, the put result's digest), which the vocabulary excludes;
 * R-OUTSIDE a module outside WALK_ROOTS (test helpers and fixtures hold gp identities on purpose).
 * Display paths added: none. Test-only: no process is spawned and no file is written; src, qa, examples, the roster and the bead
 * export are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/gp-identity-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-gxd7.1";
/** The program pin every producer line and code fact is read at (GraphPolicyCLI, abbreviated as the filing cites it). */
const PIN = "0107c72992f3";
const UNKNOWN_PROFILE = "unknown profile";
const DESCRIPTOR_SCHEMA = "graphpolicy.identity.v1";
/** The filing's checkpoint forms, clause (b). */
const CHECKPOINT_FORMS: readonly string[] = ["program-bound", "theta-words", "cas-blob"];
/** The filing's three string methods, clause (c). */
const CALL_METHODS: readonly string[] = ["startsWith", "endsWith", "includes"];
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every file below them, at any depth). */
const WALK_ROOTS: readonly string[] = ["src", "qa", "examples"];
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the module count measured at base a11b36f (src 115, qa 62, examples 6). */
const FLOORS: Readonly<Record<string, number>> = { src: 100, qa: 55, examples: 5 };
/** Below the startsWith/endsWith/includes calls the walk reads at base a11b36f: the non-vacuity anchor of the call rule. */
const CALL_FLOOR = 150;
/** A gp identity spelling in a code literal: a domain-separated identity (`graphpolicy.<kind>.c1`, the producer's
 * digest-domain form) or a literal that ends inside one's prefix (`graphpolicy.`, `graphpolicy.<kind>`, `graphpolicy.<kind>.`),
 * which serves only a prefix test. A schema id (`graphpolicy.cli.v1`) is no identity. */
const GP_IDENTITY_TEXT = /graphpolicy\.(?:[a-z][a-z0-9_-]*\.c1(?![A-Za-z0-9])|[a-z][a-z0-9_-]*\.?$|$)/;
/** The same domain form inside free text (a file that is no module). */
const GP_DOMAIN_TEXT = /graphpolicy\.[a-z][a-z0-9_-]*\.c1(?![A-Za-z0-9])/;
const SNAPSHOT_DOCUMENT = "Document/profile identity";
const SNAPSHOT_PROJECTION = "DataIR projection digest";
const PRESENTED_BYTES = "Byte-exact invocation/journal join key";

interface Ground {
  readonly line: string;
  readonly quote: string;
}
interface LedgerEntry {
  readonly surface: string;
  readonly field: string;
  readonly form: string;
  readonly grounds: readonly Ground[];
}
/** The producer's ledger at the pin: every field a gp record carries an identity under, keyed by the surface that emits it, with
 * its row's form (the Meaning column of 02-contract-audit.md:24-26 for the digests, the filing's names for the checkpoint rows
 * :38-40) and the producer words it rests on (each quote sits in its roster line). */
const LEDGER: readonly LedgerEntry[] = [
  { surface: "gp graph check", field: "identities.graph", form: SNAPSHOT_DOCUMENT, grounds: [{ line: "02-contract-audit.md:24", quote: "`gp graph check` → `identities.graph`" }] },
  { surface: "gp inspect graph", field: "canonical_digest", form: SNAPSHOT_PROJECTION, grounds: [{ line: "02-contract-audit.md:25", quote: "`gp inspect graph` → `canonical_digest`" }] },
  { surface: "GraphDataIR snapshot", field: "digests.canonical", form: SNAPSHOT_PROJECTION, grounds: [{ line: "02-contract-audit.md:25", quote: "declared `digests.canonical`" }] },
  { surface: "gp eval", field: "receipt.input_snapshot", form: PRESENTED_BYTES, grounds: [{ line: "02-contract-audit.md:26", quote: "`gp eval` → `receipt.input_snapshot`" }] },
  {
    surface: "gp sample",
    field: "decision.graph_digest",
    form: PRESENTED_BYTES,
    grounds: [
      { line: "02-contract-audit.md:26", quote: "`gp sample` / decision-journal snapshot binding" },
      { line: "ts/src/cli/inspect-decision.ts:161", quote: '"graph_digest"' },
    ],
  },
  {
    surface: "decision journal",
    field: "sampled-decision.snapshotDigest",
    form: PRESENTED_BYTES,
    grounds: [
      { line: "02-contract-audit.md:26", quote: "decision-journal snapshot binding" },
      { line: "ts/src/cli/sample-command.ts:312", quote: "snapshotDigest: bare(d.graph_digest)" },
    ],
  },
  { surface: "gp eval", field: "--checkpoint", form: "program-bound", grounds: [{ line: "02-contract-audit.md:38", quote: "CLI named `--checkpoint`" }] },
  {
    surface: "gp eval",
    field: "receipt.checkpoint_digest",
    form: "program-bound",
    grounds: [
      { line: "02-contract-audit.md:38", quote: "Logical policy identity is program-bound" },
      { line: "ts/src/cli/eval-run.ts:476", quote: "receipt.checkpoint_digest" },
    ],
  },
  { surface: "gp eval", field: "identities.checkpoint", form: "program-bound", grounds: [{ line: "ts/src/cli/eval-run.ts:476", quote: "const identities = { program: receipt.program_digest, checkpoint: receipt.checkpoint_digest }" }] },
  { surface: "decision journal", field: "sampled-decision.checkpointDigest", form: "program-bound", grounds: [{ line: "ts/src/cli/sample-command.ts:314", quote: 'checkpointDigest: unqualifyDigest(d.checkpoint_digest, "checkpoint")' }] },
  {
    surface: "library evaluator receipt",
    field: "checkpoint",
    form: "theta-words",
    grounds: [
      { line: "02-contract-audit.md:39", quote: "`checkpointIdentity(theta)`" },
      { line: "ts/src/evaluator/evaluate.ts:62", quote: "readonly checkpoint: string;" },
    ],
  },
  {
    surface: "library evaluator receipt",
    field: "digests.checkpoint",
    form: "theta-words",
    grounds: [
      { line: "02-contract-audit.md:39", quote: "digest of the parameter words alone" },
      { line: "ts/src/evaluator/receipt.ts:30", quote: "readonly checkpoint: string;" },
    ],
  },
  {
    surface: "gp store put",
    field: "digest",
    form: "cas-blob",
    grounds: [
      { line: "02-contract-audit.md:40", quote: '`put("checkpoint", bytes)`' },
      { line: "ts/src/artifact-store/cas.ts:71", quote: "readonly digest: string;" },
    ],
  },
];

interface Vocabulary {
  /** Snake-case gp field leaves: read wherever they appear. */
  readonly leaves: readonly string[];
  /** `parent.leaf` paths whose leaf alone is generic: read only under that parent. */
  readonly paths: readonly string[];
  /** gp argv flags, judged as spellings. */
  readonly flags: readonly string[];
  /** Ledger fields the walk cannot name without reading Pi's own words (residual R-NAMESAKE). */
  readonly excluded: readonly string[];
}
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
/** The walk's vocabulary, derived from the ledger: a snake-case leaf names a gp field anywhere, a generic leaf only under its
 * parent, a flag is a spelling, and a single generic word or a hyphenated record kind's camel field is excluded. */
function vocabulary(ledger: readonly LedgerEntry[]): Vocabulary {
  const leaves = new Set<string>();
  const paths = new Set<string>();
  const flags = new Set<string>();
  const excluded = new Set<string>();
  for (const { field } of ledger) {
    if (field.startsWith("--")) {
      flags.add(field);
      continue;
    }
    const segments = field.split(".");
    const leaf = segments[segments.length - 1] ?? "";
    const parent = segments.length > 1 ? segments[segments.length - 2] : undefined;
    if (leaf.includes("_")) leaves.add(leaf);
    else if (parent !== undefined && IDENTIFIER.test(parent)) paths.add(`${parent}.${leaf}`);
    else excluded.add(field);
  }
  const sorted = (set: Set<string>): string[] => [...set].sort();
  return { leaves: sorted(leaves), paths: sorted(paths), flags: sorted(flags), excluded: sorted(excluded) };
}
const VOCABULARY = vocabulary(LEDGER);

const RESIDUAL_FAMILIES: readonly string[] = ["R-ALIAS", "R-COMPUTED", "R-OTHER-METHOD", "R-COMMENT", "R-UNTYPED-FLOW", "R-NAMESAKE", "R-OUTSIDE"];

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
      "(a) sameGpIdentity(a,b) holds only for byte-equal strings with the same profile/form tag; prefix/suffix-sharing pairs and the ledger's three digests of one snapshot compare false: over the measured host-adapter carriers the reference comparison is the producer's identity rows (one identity under two fields of one ledger row compares true), every pair sharing a domain prefix or a hex tail compares false, the snapshot's identities.graph, canonical_digest and receipt.input_snapshot compare false pairwise, and each collapsing comparator of the mutant table is refused by its rules",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) the checkpoint field carries a form tag in {program-bound, theta-words, cas-blob}; only the program-bound form is passed as --checkpoint and a CAS blob address is never a checkpoint identity: the form comes from the ledger row of the emitting surface and field, never from the shared graphpolicy.checkpoint.c1: prefix or a leaf name, the argv builder passes the program-bound value verbatim and refuses the theta-words form (which gp itself refuses as GP_CLI_CHECKPOINT_MISMATCH) and the cas-blob form, and a blob address is refused as a checkpoint identity even at equal bytes",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) census: no startsWith/endsWith/includes over gp identity strings in src; identity and profile/form never rewritten on read; post-D-IDENT-1 profile read from the descriptor, else 'unknown profile': today Pi holds no gp identity (0 gp hits at d75b68d1) - no module below src, qa or examples spells a gp identity domain or reads a gp identity field, so no prefix, suffix or substring test over one exists; the reference reader an adopter owes carries value and field verbatim beside its ledger row's form and reads the profile from a graphpolicy.identity.v1 descriptor only, which gp has not shipped",
    pins: ["C1", "C2", "C3"],
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
interface Carrier {
  readonly id: string;
  readonly surface: string;
  readonly field: string;
  readonly value: string;
  /** The producer's identity row (docs/dev/IDENTITIES.md at 0fdf395) the value belongs to. */
  readonly row: string;
  readonly form: string;
  readonly source: string;
}
interface CheckpointLiteral {
  readonly checkpoint: string;
  readonly rc: number;
  readonly error: string | null;
  readonly stage: string | null;
  readonly receiptCheckpointDigest: string | null;
}
interface Producer {
  readonly pin: string;
  readonly head: string;
  readonly lines: Readonly<Record<string, string>>;
  readonly headLines: Readonly<Record<string, string>>;
  readonly snapshot: { readonly path: string; readonly sha256: string; readonly bytes: string };
  readonly journal: { readonly snapshotDigest: string; readonly checkpointDigest: string };
  readonly evidence: {
    readonly graphCheck: string;
    readonly inspectCanonical: string;
    readonly evalCommitted: string;
    readonly sampleCommitted: string;
    readonly evalCompact: string;
    readonly libraryCheckpointIdentity: string;
    readonly checkpointLiterals: Readonly<Record<string, CheckpointLiteral>>;
  };
  readonly gate: { readonly descriptorSchema: string; readonly productFilesAtPin: number; readonly productFilesAtHead: number; readonly installedBundleHits: number };
  readonly installed: { readonly version: string; readonly exit: number; readonly stderr: string; readonly identitiesGraph: string; readonly digestChecksCanonical: string; readonly evalRefusal: string };
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly authority: string;
  readonly posture: string;
  readonly codeFacts: readonly string[];
  readonly producer: Producer;
  readonly carriers: readonly Carrier[];
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
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
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function nullableText(value: unknown, field: string): string | null {
  return value === null ? null : text(value, field);
}
function object(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function stringMap(value: unknown, field: string): Record<string, string> {
  return Object.fromEntries(Object.entries(object(value, field)).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = object(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  const producer = object(raw.producer, "producer");
  const snapshot = object(producer.snapshot, "producer.snapshot");
  const journal = object(producer.journal, "producer.journal");
  const evidence = object(producer.evidence, "producer.evidence");
  const gate = object(producer.gate, "producer.gate");
  const installed = object(producer.installed, "producer.installed");
  const literals = object(evidence.checkpointLiterals, "producer.evidence.checkpointLiterals");
  if (!Array.isArray(raw.rows) || !Array.isArray(raw.carriers)) throw new Error("roster needs rows and carriers lists");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    const entry = object(row, `rows[${index}]`);
    if (!Array.isArray(entry.pins)) throw new Error(`roster rows[${index}] needs pins`);
    const pins = entry.pins.map((pin: unknown, at: number): RosterPin => {
      const value = object(pin, `rows[${index}].pins[${at}]`);
      if (!Object.hasOwn(value, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs a witness`);
      return { id: text(value.id, `rows[${index}].pins[${at}].id`), witness: json(value.witness) };
    });
    return { id: text(entry.id, `rows[${index}].id`), label: text(entry.label, `rows[${index}].label`), pins };
  });
  const carriers = raw.carriers.map((value: unknown, index: number): Carrier => {
    const entry = object(value, `carriers[${index}]`);
    const at = (key: string): string => text(entry[key], `carriers[${index}].${key}`);
    return { id: at("id"), surface: at("surface"), field: at("field"), value: at("value"), row: at("row"), form: at("form"), source: at("source") };
  });
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    authority: text(raw.authority, "authority"),
    posture: text(raw.posture, "posture"),
    codeFacts: strings(raw.codeFacts, "codeFacts"),
    producer: {
      pin: text(producer.pin, "producer.pin"),
      head: text(producer.head, "producer.head"),
      lines: stringMap(producer.lines, "producer.lines"),
      headLines: stringMap(producer.headLines, "producer.headLines"),
      snapshot: { path: text(snapshot.path, "producer.snapshot.path"), sha256: text(snapshot.sha256, "producer.snapshot.sha256"), bytes: text(snapshot.bytes, "producer.snapshot.bytes") },
      journal: { snapshotDigest: text(journal.snapshotDigest, "producer.journal.snapshotDigest"), checkpointDigest: text(journal.checkpointDigest, "producer.journal.checkpointDigest") },
      evidence: {
        graphCheck: text(evidence.graphCheck, "producer.evidence.graphCheck"),
        inspectCanonical: text(evidence.inspectCanonical, "producer.evidence.inspectCanonical"),
        evalCommitted: text(evidence.evalCommitted, "producer.evidence.evalCommitted"),
        sampleCommitted: text(evidence.sampleCommitted, "producer.evidence.sampleCommitted"),
        evalCompact: text(evidence.evalCompact, "producer.evidence.evalCompact"),
        libraryCheckpointIdentity: text(evidence.libraryCheckpointIdentity, "producer.evidence.libraryCheckpointIdentity"),
        checkpointLiterals: Object.fromEntries(
          Object.entries(literals).map(([name, value]) => {
            const entry = object(value, `producer.evidence.checkpointLiterals.${name}`);
            const at = `producer.evidence.checkpointLiterals.${name}`;
            return [
              name,
              { checkpoint: text(entry.checkpoint, `${at}.checkpoint`), rc: count(entry.rc, `${at}.rc`), error: nullableText(entry.error, `${at}.error`), stage: nullableText(entry.stage, `${at}.stage`), receiptCheckpointDigest: nullableText(entry.receiptCheckpointDigest, `${at}.receiptCheckpointDigest`) },
            ];
          }),
        ),
      },
      gate: {
        descriptorSchema: text(gate.descriptorSchema, "producer.gate.descriptorSchema"),
        productFilesAtPin: count(gate.productFilesAtPin, "producer.gate.productFilesAtPin"),
        productFilesAtHead: count(gate.productFilesAtHead, "producer.gate.productFilesAtHead"),
        installedBundleHits: count(gate.installedBundleHits, "producer.gate.installedBundleHits"),
      },
      installed: {
        version: text(installed.version, "producer.installed.version"),
        exit: count(installed.exit, "producer.installed.exit"),
        stderr: text(installed.stderr, "producer.installed.stderr"),
        identitiesGraph: text(installed.identitiesGraph, "producer.installed.identitiesGraph"),
        digestChecksCanonical: text(installed.digestChecksCanonical, "producer.installed.digestChecksCanonical"),
        evalRefusal: text(installed.evalRefusal, "producer.installed.evalRefusal"),
      },
    },
    carriers,
    scan: scan as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function carrier(id: string): Carrier {
  const found = ROSTER.carriers.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`the roster holds no carrier ${id}`);
  return found;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// The reference an adopting Pi consumer owes, and its judges.

/** A gp identity as Pi must carry it: the value and its producer surface and field verbatim, the ledger row's form, and the
 * profile a D-IDENT-1 descriptor gives (else UNKNOWN_PROFILE). */
interface GpIdentity {
  readonly surface: string;
  readonly field: string;
  readonly form: string;
  readonly profile: string | null;
  readonly value: string;
}
/** One value as a gp record carries it, with the graphpolicy.identity.v1 descriptor gp sends beside it, when it does. */
interface GpRead {
  readonly surface: string;
  readonly field: string;
  readonly value: string;
  readonly descriptor?: Json;
}
type ReadOutcome = { readonly identity: GpIdentity } | { readonly refused: string };
type Reader = (read: GpRead) => ReadOutcome;
type Comparator = (a: GpIdentity, b: GpIdentity) => boolean;
type ArgvOutcome = { readonly argv: readonly string[] } | { readonly refused: string };
type ArgvBuilder = (identity: GpIdentity) => ArgvOutcome;
type CheckpointOutcome = { readonly checkpoint: { readonly form: string; readonly value: string } } | { readonly refused: string };
type CheckpointReader = (identity: GpIdentity) => CheckpointOutcome;

function ledgerForm(surface: string, field: string): string | undefined {
  return LEDGER.find(entry => entry.surface === surface && entry.field === field)?.form;
}

/** The reference reader: value, surface and field verbatim; form from the ledger row of (surface, field); profile from a carried
 * descriptor of this very value, else UNKNOWN_PROFILE. */
const readGpIdentity: Reader = read => {
  const form = ledgerForm(read.surface, read.field);
  if (form === undefined) return { refused: "unledgered" };
  let profile: string | null = UNKNOWN_PROFILE;
  if (read.descriptor !== undefined) {
    const descriptor = read.descriptor;
    if (!isObject(descriptor) || descriptor.schema !== DESCRIPTOR_SCHEMA) return { refused: "descriptor-schema" };
    if (descriptor.value !== read.value) return { refused: "descriptor-value" };
    if (descriptor.profile !== null && typeof descriptor.profile !== "string") return { refused: "descriptor-profile" };
    profile = descriptor.profile;
  }
  return { identity: { surface: read.surface, field: read.field, form, profile, value: read.value } };
};

/** The reference comparison: one form, one profile and one value, byte for byte. */
function sameGpIdentity(a: GpIdentity, b: GpIdentity): boolean {
  return a.form === b.form && a.profile === b.profile && Buffer.from(a.value, "utf8").equals(Buffer.from(b.value, "utf8"));
}

/** The reference argv: only the program-bound form is passed as --checkpoint, verbatim. */
const checkpointArgv: ArgvBuilder = identity => {
  if (identity.form === "program-bound") return { argv: ["--checkpoint", identity.value] };
  return CHECKPOINT_FORMS.includes(identity.form) ? { refused: `checkpoint-form ${identity.form}` } : { refused: "not-a-checkpoint" };
};

/** The reference checkpoint identity: a program-bound or theta-words value under its own form; a CAS blob address never. */
const checkpointIdentityOf: CheckpointReader = identity => {
  if (identity.form === "program-bound" || identity.form === "theta-words") return { checkpoint: { form: identity.form, value: identity.value } };
  return identity.form === "cas-blob" ? { refused: "blob-address" } : { refused: "not-a-checkpoint" };
};

const hexTail = (value: string): string => /[0-9a-f]{64}$/.exec(value)?.[0] ?? "";
const domainPrefix = (value: string): string => value.slice(0, value.lastIndexOf(":") + 1);
function mustRead(read: GpRead): GpIdentity {
  const outcome = readGpIdentity(read);
  if (!("identity" in outcome)) throw new Error(`the reference refused ${read.surface} ${read.field}: ${outcome.refused}`);
  return outcome.identity;
}
const readOf = (entry: Carrier): GpRead => ({ surface: entry.surface, field: entry.field, value: entry.value });
/** The GPR-1607 record gp would send beside a value (seven keys), constructed: gp ships none. */
function descriptorFor(value: string, domain: string | null, profile: string | null, payload: string): JsonObject {
  return { schema: DESCRIPTOR_SCHEMA, domain, algorithm: "sha256", profile, payload, value, hex: hexTail(value) };
}

interface Probe {
  readonly id: string;
  readonly read: GpRead;
  readonly expect: { readonly form: string; readonly profile: string | null } | { readonly refused: string };
}
/** The constructed reads (no gp build emits them): byte variants, a counterfactual domain, a descriptor-carrying read, and the
 * reads the reader must refuse. */
function probes(): Probe[] {
  const graph = carrier("graph");
  const projection = carrier("projection");
  const pretty = carrier("eval-pretty");
  const logical = carrier("argv-checkpoint");
  const blob = carrier("store-blob");
  const graphRead = readOf(graph);
  const document = { form: SNAPSHOT_DOCUMENT, profile: UNKNOWN_PROFILE };
  return [
    { id: "upper", read: { ...graphRead, value: `${domainPrefix(graph.value)}${hexTail(graph.value).toUpperCase()}` }, expect: document },
    { id: "newline", read: { ...graphRead, value: `${graph.value}\n` }, expect: document },
    { id: "cross-domain", read: { ...graphRead, value: `${domainPrefix(graph.value)}${hexTail(logical.value)}` }, expect: document },
    { id: "form-swap", read: { ...graphRead, value: projection.value }, expect: document },
    { id: "described", read: { ...graphRead, descriptor: descriptorFor(graph.value, "snapshot", "graphpolicy.c1", "c1-document") }, expect: { form: SNAPSHOT_DOCUMENT, profile: "graphpolicy.c1" } },
    { id: "described-null", read: { ...readOf(pretty), descriptor: descriptorFor(pretty.value, null, null, "presented-bytes") }, expect: { form: PRESENTED_BYTES, profile: null } },
    { id: "theta-digests", read: { surface: "library evaluator receipt", field: "digests.checkpoint", value: carrier("library-checkpoint").value }, expect: { form: "theta-words", profile: UNKNOWN_PROFILE } },
    { id: "blob-equal-bytes", read: { surface: "gp store put", field: "digest", value: logical.value }, expect: { form: "cas-blob", profile: UNKNOWN_PROFILE } },
    { id: "unledgered", read: { surface: "gp train plan", field: "checkpoint", value: blob.value }, expect: { refused: "unledgered" } },
    { id: "foreign-descriptor", read: { ...graphRead, descriptor: { ...descriptorFor(graph.value, "snapshot", "graphpolicy.c1", "c1-document"), schema: "graphpolicy.cli.v1" } }, expect: { refused: "descriptor-schema" } },
    { id: "other-value-descriptor", read: { ...graphRead, descriptor: descriptorFor(projection.value, "snapshot", "graphpolicy.c1", "c1-projection") }, expect: { refused: "descriptor-value" } },
  ];
}
const PROBES = probes();
function probe(id: string): Probe {
  const found = PROBES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no probe ${id}`);
  return found;
}
const probeIdentity = (id: string): GpIdentity => mustRead(probe(id).read);

interface Labelled {
  readonly id: string;
  readonly identity: GpIdentity;
  readonly row: string;
  readonly value: string;
}
const measured = (): Labelled[] => ROSTER.carriers.map(entry => ({ id: entry.id, identity: mustRead(readOf(entry)), row: entry.row, value: entry.value }));
function pairsOf<T>(items: readonly T[]): [T, T][] {
  return items.flatMap((a, index) => items.slice(index + 1).map((b): [T, T] => [a, b]));
}
/** Measured pairs that share a domain prefix and are not one producer identity. */
function prefixPairs(): [Labelled, Labelled][] {
  return pairsOf(measured()).filter(([a, b]) => domainPrefix(a.value) !== "" && domainPrefix(a.value) === domainPrefix(b.value) && !(a.row === b.row && a.value === b.value));
}
/** Pairs (measured, and the cross-domain probe) that share a hex tail and differ as strings. */
function suffixPairs(): [Labelled, Labelled][] {
  const cross: Labelled = { id: "cross-domain", identity: probeIdentity("cross-domain"), row: "constructed", value: probe("cross-domain").read.value };
  return pairsOf([...measured(), cross]).filter(([a, b]) => hexTail(a.value) !== "" && hexTail(a.value) === hexTail(b.value) && a.value !== b.value);
}
const LEDGER_TRIPLE = ["graph", "projection", "eval-pretty"];

/** The rules a comparator breaks: the producer's rows over the measured carriers, the prefix and suffix pairs, the ledger's
 * three digests of one snapshot, one value under another form, under another profile, and two strings that differ in bytes. */
function judgeComparator(compare: Comparator): string[] {
  const rules = new Set<string>();
  const all = measured();
  for (const a of all) for (const b of all) if (compare(a.identity, b.identity) !== (a.row === b.row && a.value === b.value)) rules.add("J-TABLE");
  if (prefixPairs().some(([a, b]) => compare(a.identity, b.identity))) rules.add("J-PREFIX");
  if (suffixPairs().some(([a, b]) => compare(a.identity, b.identity))) rules.add("J-SUFFIX");
  const triple = all.filter(entry => LEDGER_TRIPLE.includes(entry.id));
  if (pairsOf(triple).some(([a, b]) => compare(a.identity, b.identity))) rules.add("J-LEDGER");
  const projection = mustRead(readOf(carrier("projection")));
  const graph = mustRead(readOf(carrier("graph")));
  if (compare(probeIdentity("form-swap"), projection)) rules.add("J-FORM");
  if (compare(probeIdentity("described"), graph)) rules.add("J-PROFILE");
  if (compare(probeIdentity("upper"), graph) || compare(probeIdentity("newline"), graph)) rules.add("J-BYTES");
  return [...rules].sort();
}

const lowered = (value: string): string => value.toLowerCase();
/** The comparators a consumer could write instead, each collapsing identities one way. */
const COMPARATOR_MUTANTS: Readonly<Record<string, Comparator>> = {
  "M-PREFIX": (a, b) => domainPrefix(a.value) === domainPrefix(b.value),
  "M-SUFFIX": (a, b) => a.value.slice(-64) === b.value.slice(-64),
  "M-INCLUDES": (a, b) => a.value.includes(hexTail(b.value)) || b.value.includes(hexTail(a.value)),
  "M-HEX-ONLY": (a, b) => a.value.slice(a.value.lastIndexOf(":") + 1) === b.value.slice(b.value.lastIndexOf(":") + 1),
  "M-CASEFOLD": (a, b) => a.form === b.form && a.profile === b.profile && lowered(a.value) === lowered(b.value),
  "M-TRIM": (a, b) => a.form === b.form && a.profile === b.profile && a.value.trim() === b.value.trim(),
  "M-FORM-BLIND": (a, b) => a.profile === b.profile && a.value === b.value,
  "M-PROFILE-BLIND": (a, b) => a.form === b.form && a.value === b.value,
  "M-FIELD": (a, b) => a.field === b.field && a.value === b.value,
  "M-NEVER": () => false,
};

/** The rules an argv builder breaks: each program-bound value passed verbatim, the other forms and a snapshot identity refused. */
function judgeArgv(build: ArgvBuilder): string[] {
  const rules = new Set<string>();
  for (const id of ["argv-checkpoint", "receipt-checkpoint", "journal-checkpoint"]) {
    const identity = mustRead(readOf(carrier(id)));
    const outcome = build(identity);
    if (!("argv" in outcome) || JSON.stringify(outcome.argv) !== JSON.stringify(["--checkpoint", identity.value])) rules.add("B-PASS");
  }
  for (const identity of [mustRead(readOf(carrier("library-checkpoint"))), probeIdentity("theta-digests")]) if ("argv" in build(identity)) rules.add("B-THETA");
  for (const identity of [mustRead(readOf(carrier("store-blob"))), probeIdentity("blob-equal-bytes")]) if ("argv" in build(identity)) rules.add("B-BLOB");
  if ("argv" in build(mustRead(readOf(carrier("graph"))))) rules.add("B-OTHER");
  return [...rules].sort();
}
const ARGV_MUTANTS: Readonly<Record<string, ArgvBuilder>> = {
  "M-ANY-FORM": identity => ({ argv: ["--checkpoint", identity.value] }),
  "M-PREFIX-GATE": identity => (identity.value.startsWith("graphpolicy.checkpoint.c1:") ? { argv: ["--checkpoint", identity.value] } : { refused: "prefix" }),
  "M-STRIP": identity => (identity.form === "program-bound" ? { argv: ["--checkpoint", hexTail(identity.value)] } : checkpointArgv(identity)),
  "M-THETA-OK": identity => (identity.form === "theta-words" ? { argv: ["--checkpoint", identity.value] } : checkpointArgv(identity)),
};

/** The rules a checkpoint-identity reader breaks: program-bound and theta-words under their own form, verbatim; a blob refused. */
function judgeCheckpointIdentity(read: CheckpointReader): string[] {
  const rules = new Set<string>();
  const kept = (identity: GpIdentity, form: string): boolean => {
    const outcome = read(identity);
    return "checkpoint" in outcome && outcome.checkpoint.form === form && outcome.checkpoint.value === identity.value;
  };
  for (const id of ["argv-checkpoint", "receipt-checkpoint", "journal-checkpoint"]) if (!kept(mustRead(readOf(carrier(id))), "program-bound")) rules.add("K-PROGRAM");
  for (const identity of [mustRead(readOf(carrier("library-checkpoint"))), probeIdentity("theta-digests")]) if (!kept(identity, "theta-words")) rules.add("K-THETA");
  if ("checkpoint" in read(mustRead(readOf(carrier("store-blob"))))) rules.add("K-BLOB");
  if ("checkpoint" in read(probeIdentity("blob-equal-bytes"))) rules.add("K-EQUAL-BYTES");
  return [...rules].sort();
}
const CHECKPOINT_MUTANTS: Readonly<Record<string, CheckpointReader>> = {
  "M-BLOB-OK": identity => (identity.form === "cas-blob" ? { checkpoint: { form: identity.form, value: identity.value } } : checkpointIdentityOf(identity)),
  "M-BLOB-AS-PROGRAM": identity => (identity.form === "cas-blob" ? { checkpoint: { form: "program-bound", value: identity.value } } : checkpointIdentityOf(identity)),
  "M-PREFIX-ID": identity => (identity.value.startsWith("graphpolicy.checkpoint.c1:") ? { checkpoint: { form: "program-bound", value: identity.value } } : checkpointIdentityOf(identity)),
};

/** The rules a reader breaks over the measured carriers and the probes: value, surface and field verbatim, the ledger form, the
 * descriptor's profile else UNKNOWN_PROFILE, and the refusals. */
function judgeReader(read: Reader): string[] {
  const rules = new Set<string>();
  const cases: { readonly read: GpRead; readonly expect: Probe["expect"] }[] = [
    ...ROSTER.carriers.map(entry => ({ read: readOf(entry), expect: { form: entry.form, profile: UNKNOWN_PROFILE } })),
    ...PROBES.map(entry => ({ read: entry.read, expect: entry.expect })),
  ];
  for (const { read: input, expect: wanted } of cases) {
    const outcome = read(input);
    if ("refused" in wanted) {
      if (!("refused" in outcome) || outcome.refused !== wanted.refused) rules.add("R-REFUSAL");
      continue;
    }
    if (!("identity" in outcome)) {
      rules.add("R-REFUSAL");
      continue;
    }
    const got = outcome.identity;
    if (!Buffer.from(got.value, "utf8").equals(Buffer.from(input.value, "utf8"))) rules.add("R-VALUE");
    if (got.surface !== input.surface || got.field !== input.field) rules.add("R-FIELD");
    if (got.form !== wanted.form) rules.add("R-FORM");
    if (got.profile !== wanted.profile) rules.add("R-PROFILE");
  }
  return [...rules].sort();
}
const rewritten =
  (patch: (identity: GpIdentity, input: GpRead) => GpIdentity): Reader =>
  input => {
    const outcome = readGpIdentity(input);
    return "identity" in outcome ? { identity: patch(outcome.identity, input) } : outcome;
  };
/** The form a reader would guess from a value's domain prefix (the shortcut the ledger forbids). */
function formFromPrefix(value: string): string | undefined {
  if (value.startsWith("graphpolicy.snapshot.c1:")) return SNAPSHOT_DOCUMENT;
  if (value.startsWith("graphpolicy.checkpoint.c1:")) return "program-bound";
  if (value.startsWith("sha256:")) return PRESENTED_BYTES;
  return undefined;
}
const NORMALIZED_FIELDS: Readonly<Record<string, string>> = { "digests.canonical": "canonical_digest", "decision.graph_digest": "receipt.input_snapshot", "digests.checkpoint": "checkpoint" };
/** Readers that rewrite a value, a field or a form on read (C2). */
const REWRITE_MUTANTS: Readonly<Record<string, Reader>> = {
  "M-LOWER": rewritten(identity => ({ ...identity, value: lowered(identity.value) })),
  "M-STRIP-PREFIX": rewritten(identity => ({ ...identity, value: identity.value.slice(identity.value.lastIndexOf(":") + 1) })),
  "M-QUALIFY-BARE": rewritten(identity => ({ ...identity, value: identity.value.includes(":") ? identity.value : `sha256:${identity.value}` })),
  "M-TRIM": rewritten(identity => ({ ...identity, value: identity.value.trim() })),
  "M-FORM-FROM-PREFIX": rewritten(identity => ({ ...identity, form: formFromPrefix(identity.value) ?? identity.form })),
  "M-FIELD-NORMALIZE": rewritten(identity => ({ ...identity, field: NORMALIZED_FIELDS[identity.field] ?? identity.field })),
  "M-GUESS-UNLEDGERED": input => {
    const outcome = readGpIdentity(input);
    const leaf = input.field.split(".").pop() ?? input.field;
    const guess = LEDGER.find(entry => (entry.field.split(".").pop() ?? entry.field) === leaf);
    if ("refused" in outcome && outcome.refused === "unledgered" && guess !== undefined) return { identity: { surface: input.surface, field: input.field, form: guess.form, profile: UNKNOWN_PROFILE, value: input.value } };
    return outcome;
  },
};
/** The profile names the pin's ledger gives its two c1 rows (02-contract-audit.md:24-25, the Preimage column). */
const LEDGER_PROFILES: Readonly<Record<string, string>> = { [SNAPSHOT_DOCUMENT]: "GRAPH_DATA_SNAPSHOT_C1_PROFILE", [SNAPSHOT_PROJECTION]: "DATA_DIGEST_PROFILE" };
/** Readers that take the profile from anywhere but the descriptor (C3). */
const PROFILE_MUTANTS: Readonly<Record<string, Reader>> = {
  "M-PREFIX-PROFILE": rewritten(identity => ({ ...identity, profile: identity.value.startsWith("graphpolicy.") ? "graphpolicy.c1" : identity.profile })),
  "M-LEDGER-PROFILE": rewritten((identity, input) => (input.descriptor === undefined ? { ...identity, profile: LEDGER_PROFILES[identity.form] ?? identity.profile } : identity)),
  "M-DEFAULT-PROFILE": rewritten((identity, input) => (input.descriptor === undefined ? { ...identity, profile: "graphpolicy.c1" } : identity)),
  "M-NULL-REWRITE": rewritten(identity => ({ ...identity, profile: identity.profile ?? UNKNOWN_PROFILE })),
  "M-ANY-DESCRIPTOR": input => {
    const outcome = readGpIdentity({ surface: input.surface, field: input.field, value: input.value });
    if (!("identity" in outcome)) return outcome;
    const descriptor = input.descriptor;
    const profile = isObject(descriptor) && (typeof descriptor.profile === "string" || descriptor.profile === null) ? descriptor.profile : outcome.identity.profile;
    return { identity: { ...outcome.identity, profile } };
  },
};
const judged = <T>(mutants: Readonly<Record<string, T>>, judge: (subject: T) => string[]): Record<string, string[]> => Object.fromEntries(Object.entries(mutants).map(([id, subject]) => [id, judge(subject)]));

// ---------------------------------------------------------------------------------------------------------------------------------
// The walk (acceptance (c) and the posture).

const posix = (path: string): string => path.split("\\").join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
/** A path the census judges: a file below one of WALK_ROOTS. */
const judgedPath = (path: string): boolean => WALK_ROOTS.some(root => path.startsWith(`${root}/`));

interface Walk {
  readonly modules: string[];
  readonly others: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every file below one root, in name order, repository-relative; symlinks are recorded, never followed; any other entry fails closed. */
function walkRoot(root: string): Walk {
  const walk: Walk = { modules: [], others: [], symlinks: [], unreadable: [] };
  const visit = (relative: string): void => {
    const entries: Dirent[] = readdirSync(join(REPO, relative), { withFileTypes: true });
    for (const entry of [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      const child = posix(`${relative}/${entry.name}`);
      if (entry.isSymbolicLink()) walk.symlinks.push(child);
      else if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) (isModule(child) ? walk.modules : walk.others).push(child);
      else walk.unreadable.push(child);
    }
  };
  visit(root);
  return walk;
}

interface Findings {
  readonly spellings: string[];
  readonly reads: string[];
  readonly calls: string[];
  readonly callCount: number;
}
function scriptKind(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
function literalText(node: ts.Node): string | undefined {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return node.text;
  return undefined;
}
function memberName(node: ts.Node): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return node.argumentExpression.text;
  return undefined;
}
/** A read of a gp identity field: a snake-case leaf anywhere, a generic leaf under its ledger parent. */
function isGpRead(node: ts.Node): boolean {
  const name = memberName(node);
  if (name === undefined) return false;
  if (VOCABULARY.leaves.includes(name)) return true;
  if (!ts.isPropertyAccessExpression(node) && !ts.isElementAccessExpression(node)) return false;
  let parent: ts.Expression = node.expression;
  while (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent)) parent = parent.expression;
  const parentName = memberName(parent) ?? (ts.isIdentifier(parent) ? parent.text : undefined);
  return parentName !== undefined && VOCABULARY.paths.includes(`${parentName}.${name}`);
}
function bindingKey(node: ts.BindingElement): string {
  const key = node.propertyName ?? node.name;
  return ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : "";
}
const isPropertyNameIdentifier = (node: ts.Identifier): boolean => ts.isPropertyAccessExpression(node.parent) && node.parent.name === node;
/** Whether an expression holds a gp identity: a spelling, a gp field read or a one-hop alias of one, not crossing a function. */
function gpIn(node: ts.Node, aliases: ReadonlySet<string>): boolean {
  const literal = literalText(node);
  if (literal !== undefined && GP_IDENTITY_TEXT.test(literal)) return true;
  if (isGpRead(node)) return true;
  if (ts.isIdentifier(node) && aliases.has(node.text) && !isPropertyNameIdentifier(node)) return true;
  if (ts.isFunctionLike(node)) return false;
  return ts.forEachChild(node, child => (gpIn(child, aliases) ? true : undefined)) === true;
}
const NO_ALIASES: ReadonlySet<string> = new Set();
/** One module's gp spellings, gp field reads and startsWith/endsWith/includes calls over a gp identity (comments are not read). */
function scanSource(path: string, source: string): Findings {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKind(path));
  const at = (node: ts.Node): string => `${path}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`;
  const aliases = new Set<string>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && gpIn(node.initializer, NO_ALIASES)) aliases.add(node.name.text);
    if (ts.isBindingElement(node) && ts.isIdentifier(node.name) && VOCABULARY.leaves.includes(bindingKey(node))) aliases.add(node.name.text);
    ts.forEachChild(node, collect);
  };
  collect(file);
  const findings: Findings = { spellings: [], reads: [], calls: [], callCount: 0 };
  let calls = 0;
  const visit = (node: ts.Node): void => {
    const literal = literalText(node);
    if (literal !== undefined && (GP_IDENTITY_TEXT.test(literal) || VOCABULARY.flags.includes(literal))) findings.spellings.push(`${at(node)} ${JSON.stringify(literal)}`);
    if (isGpRead(node)) findings.reads.push(`${at(node)} ${node.getText(file)}`);
    if (ts.isBindingElement(node) && VOCABULARY.leaves.includes(bindingKey(node))) findings.reads.push(`${at(node)} {${bindingKey(node)}}`);
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && CALL_METHODS.includes(node.expression.name.text)) {
      calls += 1;
      if (gpIn(node.expression.expression, aliases) || node.arguments.some(argument => gpIn(argument, aliases))) findings.calls.push(`${at(node)} .${node.expression.name.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { ...findings, callCount: calls };
}
/** A file that is no module: its lines spelling a gp identity domain. */
function rawSpellings(path: string, source: string): string[] {
  return source.split("\n").flatMap((line, index) => (GP_DOMAIN_TEXT.test(line) ? [`${path}:${index + 1}`] : []));
}

interface Control {
  readonly id: string;
  readonly family: string;
  readonly source: string;
  readonly posture: boolean;
  readonly call: boolean;
}
/** In-memory modules the scanner must flag (F-), keep quiet (Q-), or keep quiet as a named residual's pinned row (R-). */
const CONTROLS: readonly Control[] = [
  { id: "F-RECEIVER-READ", family: "flagged", source: 'export const f = (r) => r.receipt.input_snapshot.startsWith("sha256:");', posture: true, call: true },
  { id: "F-ARGUMENT-READ", family: "flagged", source: "export const f = (s, r) => s.endsWith(r.identities.graph.slice(-64));", posture: true, call: true },
  { id: "F-PREFIX-LITERAL", family: "flagged", source: 'export const f = (s) => s.includes("graphpolicy.snapshot.c1:");', posture: true, call: true },
  { id: "F-TEMPLATE", family: "flagged", source: `export const f = (s, h) => s.startsWith(\`graphpolicy.checkpoint.c1:\${h}\`);`, posture: true, call: true },
  { id: "F-NAMESPACE", family: "flagged", source: 'export const f = (s) => s.startsWith("graphpolicy.");', posture: true, call: true },
  { id: "F-ALIAS", family: "flagged", source: "export const f = (r, p) => { const d = r.canonical_digest; return d.startsWith(p); };", posture: true, call: true },
  { id: "F-ELEMENT-OPTIONAL", family: "flagged", source: 'export const f = (r, h) => r["checkpoint_digest"]?.endsWith(h);', posture: true, call: true },
  { id: "F-DESTRUCTURED", family: "flagged", source: "export const f = ({ graph_digest }, h) => graph_digest.includes(h);", posture: true, call: true },
  { id: "F-DIGESTS-PATH", family: "flagged", source: "export const f = (receipt, h) => receipt.digests.checkpoint.endsWith(h);", posture: true, call: true },
  { id: "Q-OWN-PATH", family: "quiet", source: 'export const f = (p) => p.startsWith("src/");', posture: false, call: false },
  { id: "Q-OWN-DIGEST", family: "quiet", source: 'export const f = (d) => d.startsWith("sha256:");', posture: false, call: false },
  { id: "Q-SCHEMA-ID", family: "quiet", source: 'export const f = (e) => e.schema === "graphpolicy.cli.v1";', posture: false, call: false },
  { id: "Q-BYTE-EQUAL", family: "quiet", source: "export const f = (a, b) => a.input_snapshot === b.input_snapshot;", posture: true, call: false },
  { id: "R-ALIAS", family: "residual", source: 'export const f = (r) => { const a = r.input_snapshot; const b = a; return b.startsWith("sha256:"); };', posture: true, call: false },
  { id: "R-COMPUTED", family: "residual", source: 'export const f = (s) => s.startsWith(["graph", "policy."].join(""));', posture: false, call: false },
  { id: "R-OTHER-METHOD", family: "residual", source: 'export const f = (r) => r.input_snapshot.indexOf("sha256:") === 0;', posture: true, call: false },
  { id: "R-COMMENT", family: "residual", source: '// r.input_snapshot.startsWith("graphpolicy.snapshot.c1:")\nexport const f = 1;', posture: false, call: false },
  { id: "R-UNTYPED-FLOW", family: "residual", source: 'export const f = (id: string) => id.endsWith("06d3bcbb");', posture: false, call: false },
  { id: "R-NAMESAKE", family: "residual", source: "export const f = (r, h) => r.snapshotDigest.endsWith(h) || r.checkpoint.startsWith(h) || r.digest.includes(h);", posture: false, call: false },
];
/** R-OUTSIDE's pinned row: the walk's root predicate leaves test helpers and fixtures unjudged. */
const OUTSIDE = { judged: "src/workbench/example.ts", unjudged: "test/helpers/example.ts" };

// ---------------------------------------------------------------------------------------------------------------------------------
// The bead row (the outside anchor).

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
/** The filing's acceptance clauses: the text between "Acceptance: " and ". Not P0: ", split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Not P0: ", start);
  if (start < 0 || end < 0) throw new Error(`${BEAD} notes carry no Acceptance sentence`);
  return notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/);
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}
const pairName = ([a, b]: [Labelled, Labelled]): string => `${a.id}~${b.id}`;

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const facts = ROSTER.producer;
    const bytes = Buffer.from(facts.snapshot.bytes, "utf8");
    const declared = (JSON.parse(facts.snapshot.bytes) as { digests?: { canonical?: unknown } }).digests?.canonical;
    const literals = facts.evidence.checkpointLiterals;
    const cas = /`(graphpolicy\.checkpoint\.c1:[0-9a-f]{64})`/.exec(facts.headLines["docs/dev/IDENTITIES.md:103"] ?? "")?.[1];
    const records: Readonly<Record<string, readonly unknown[]>> = {
      graph: [facts.installed.identitiesGraph, facts.evidence.graphCheck],
      projection: [facts.evidence.inspectCanonical],
      declared: [declared],
      "eval-pretty": [facts.evidence.evalCommitted, `sha256:${createHash("sha256").update(bytes).digest("hex")}`],
      "sample-pretty": [facts.evidence.sampleCommitted],
      "eval-compact": [facts.evidence.evalCompact],
      "journal-snapshot": [facts.journal.snapshotDigest],
      "argv-checkpoint": [literals["program-bound"]?.checkpoint],
      "receipt-checkpoint": [literals["program-bound"]?.receiptCheckpointDigest],
      "journal-checkpoint": [facts.journal.checkpointDigest],
      "library-checkpoint": [facts.evidence.libraryCheckpointIdentity],
      "store-blob": [cas],
    };
    expect(Object.keys(records).sort(), "every carrier has a producer record").toEqual(ROSTER.carriers.map(entry => entry.id).sort());
    expect(ROSTER.carriers.filter(entry => !(records[entry.id] ?? []).every(value => value === entry.value)).map(entry => entry.id), "each carrier equals its producer records").toEqual([]);
    expect(ROSTER.carriers.filter(entry => ledgerForm(entry.surface, entry.field) !== entry.form).map(entry => entry.id), "each carrier's form is its ledger row's").toEqual([]);
    const all = measured();
    const cells: string[] = [];
    for (const a of all) {
      for (const b of all) {
        const want = a.row === b.row && a.value === b.value;
        expect(sameGpIdentity(a.identity, b.identity), `${a.id} ~ ${b.id}`).toBe(want);
        if (want && a.id < b.id) cells.push(`${a.id}~${b.id}`);
      }
    }
    expect(judgeComparator(sameGpIdentity), "the reference breaks no rule").toEqual([]);
    return done("A1", {
      carriers: ROSTER.carriers.map(entry => `${entry.id} ${entry.row} ${entry.surface} ${entry.field}`),
      cells: all.length * all.length,
      trueOffDiagonal: cells,
      reference: judgeComparator(sameGpIdentity),
    });
  },
  A2: () => {
    const prefixes = prefixPairs();
    const suffixes = suffixPairs();
    for (const [a, b] of [...prefixes, ...suffixes]) expect(sameGpIdentity(a.identity, b.identity), `${a.id} ~ ${b.id}`).toBe(false);
    expect(prefixes.every(([a, b]) => a.value !== b.value || a.row !== b.row), "a prefix pair is two producer identities").toBe(true);
    expect(suffixes.every(([a, b]) => hexTail(a.value) === hexTail(b.value) && a.value !== b.value), "a suffix pair shares its hex tail").toBe(true);
    return done("A2", {
      prefixPairs: prefixes.map(pair => `${pairName(pair)} ${domainPrefix(pair[0].value)}`),
      suffixPairs: suffixes.map(pair => `${pairName(pair)} ${hexTail(pair[0].value).slice(0, 8)}`),
    });
  },
  A3: () => {
    const facts = ROSTER.producer;
    const bytes = Buffer.from(facts.snapshot.bytes, "utf8");
    const sha = createHash("sha256").update(bytes).digest("hex");
    const declared = (JSON.parse(facts.snapshot.bytes) as { digests?: { canonical?: unknown } }).digests?.canonical;
    const [graph, projection, pretty] = LEDGER_TRIPLE.map(id => carrier(id));
    if (graph === undefined || projection === undefined || pretty === undefined) throw new Error("the ledger triple is incomplete");
    expect(sha, "the roster's bytes are the snapshot gp hashed").toBe(facts.snapshot.sha256);
    expect(pretty.value, "receipt.input_snapshot is the SHA-256 of the exact presented bytes").toBe(`sha256:${sha}`);
    expect(projection.value, "canonical_digest is the snapshot's declared digests.canonical").toBe(declared);
    expect([facts.installed.exit, facts.installed.stderr, facts.installed.digestChecksCanonical], "the installed gp verified the declared projection").toEqual([0, "", "verified"]);
    expect(graph.value, "identities.graph is the installed gp's").toBe(facts.installed.identitiesGraph);
    const fields = ["02-contract-audit.md:24", "02-contract-audit.md:25", "02-contract-audit.md:26"].map(key => /`([a-z_.]+)`/.exec((facts.lines[key] ?? "").split("→")[1] ?? "")?.[1]);
    expect(fields, "the ledger's three rows name the three fields").toEqual([graph.field, projection.field, pretty.field]);
    const identities = [graph, projection, pretty].map(entry => ({ id: entry.id, identity: mustRead(readOf(entry)), row: entry.row, value: entry.value }));
    const pairs = Object.fromEntries(pairsOf(identities).map(pair => [pairName(pair), sameGpIdentity(pair[0].identity, pair[1].identity)]));
    expect(Object.values(pairs), "the ledger's three digests of one snapshot compare false").toEqual([false, false, false]);
    expect(new Set([graph.value, projection.value, pretty.value]).size, "three distinct strings").toBe(3);
    expect(domainPrefix(graph.value) === domainPrefix(projection.value), "two of them share the snapshot prefix").toBe(true);
    return done("A3", { bytes: bytes.length, sha256: sha, fields: fields.map(field => field ?? null), sharedPrefix: domainPrefix(graph.value), pairs });
  },
  A4: () => {
    const verdicts = judged(COMPARATOR_MUTANTS, judgeComparator);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every comparator mutant is refused").toEqual([]);
    expect(judgeComparator(sameGpIdentity)).toEqual([]);
    return done("A4", { reference: judgeComparator(sameGpIdentity), mutants: verdicts });
  },
  B1: () => {
    const checkpointRows = LEDGER.filter(entry => CHECKPOINT_FORMS.includes(entry.form));
    expect([...new Set(checkpointRows.map(entry => entry.form))].sort(), "the checkpoint rows carry exactly the filing's forms").toEqual([...CHECKPOINT_FORMS].sort());
    const tagged = ROSTER.carriers.filter(entry => ["I08", "I09", "I10"].includes(entry.row)).map(entry => ({ id: entry.id, form: mustRead(readOf(entry)).form }));
    expect(tagged.every(entry => CHECKPOINT_FORMS.includes(entry.form)), "every checkpoint carrier carries a filing form").toBe(true);
    expect([...new Set(tagged.map(entry => entry.form))].sort(), "the measured checkpoint carriers cover all three forms").toEqual([...CHECKPOINT_FORMS].sort());
    const theta = ["argv-checkpoint", "library-checkpoint", "store-blob"].map(id => carrier(id).value);
    const prefixes = [...new Set(theta.map(domainPrefix))];
    expect(prefixes, "one theta's three forms share one prefix").toEqual(["graphpolicy.checkpoint.c1:"]);
    expect(new Set(theta).size, "and are three strings").toBe(3);
    expect(new Set(theta.map(value => formFromPrefix(value))).size, "so the prefix names one form for all three").toBe(1);
    const leaf = LEDGER.filter(entry => (entry.field.split(".").pop() ?? "") === "checkpoint").map(entry => `${entry.field} ${entry.form}`);
    expect(new Set(LEDGER.filter(entry => (entry.field.split(".").pop() ?? "") === "checkpoint").map(entry => entry.form)).size, "the leaf name checkpoint carries two forms").toBe(2);
    const unledgered = readGpIdentity(probe("unledgered").read);
    expect(unledgered).toEqual({ refused: "unledgered" });
    return done("B1", { forms: checkpointRows.map(entry => `${entry.surface} ${entry.field}: ${entry.form}`), carriers: tagged.map(entry => `${entry.id}: ${entry.form}`), sharedPrefix: prefixes[0] ?? "", leafCheckpoint: leaf, unledgered: json(unledgered) });
  },
  B2: () => {
    const literals = ROSTER.producer.evidence.checkpointLiterals;
    const programBound = literals["program-bound"];
    const wordsOnly = literals["words-only"];
    expect([programBound?.rc, programBound?.receiptCheckpointDigest === programBound?.checkpoint], "gp accepts the program-bound form and echoes it").toEqual([0, true]);
    expect([wordsOnly?.rc, wordsOnly?.error, wordsOnly?.stage, wordsOnly?.checkpoint], "gp refuses the theta-words form").toEqual([2, "GP_CLI_CHECKPOINT_MISMATCH", "validate", carrier("library-checkpoint").value]);
    expect(judgeArgv(checkpointArgv), "the reference argv breaks no rule").toEqual([]);
    const outcomes = Object.fromEntries(
      ["argv-checkpoint", "receipt-checkpoint", "journal-checkpoint", "library-checkpoint", "store-blob", "graph"].map(id => {
        const outcome = checkpointArgv(mustRead(readOf(carrier(id))));
        return [id, "argv" in outcome ? `argv ${outcome.argv[0]} ${hexTail(outcome.argv[1] ?? "").slice(0, 8)}` : `refused ${outcome.refused}`];
      }),
    );
    const verdicts = judged(ARGV_MUTANTS, judgeArgv);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every argv mutant is refused").toEqual([]);
    return done("B2", { outcomes, producer: { programBound: `rc ${programBound?.rc ?? "none"}`, wordsOnly: `${wordsOnly?.error ?? "none"} rc ${wordsOnly?.rc ?? "none"} ${wordsOnly?.stage ?? "none"}` }, mutants: verdicts });
  },
  B3: () => {
    const blob = mustRead(readOf(carrier("store-blob")));
    const logical = mustRead(readOf(carrier("argv-checkpoint")));
    const equalBytes = probeIdentity("blob-equal-bytes");
    expect(checkpointIdentityOf(blob)).toEqual({ refused: "blob-address" });
    expect(checkpointIdentityOf(equalBytes)).toEqual({ refused: "blob-address" });
    expect(sameGpIdentity(blob, logical), "one theta's blob address is not its logical identity").toBe(false);
    expect(blob.value === logical.value, "measured: the two values differ").toBe(false);
    expect(sameGpIdentity(equalBytes, logical), "constructed: equal bytes under the cas-blob form are still another identity").toBe(false);
    expect(judgeCheckpointIdentity(checkpointIdentityOf), "the reference breaks no rule").toEqual([]);
    const verdicts = judged(CHECKPOINT_MUTANTS, judgeCheckpointIdentity);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every checkpoint mutant is refused").toEqual([]);
    return done("B3", { blob: hexTail(blob.value).slice(0, 8), logical: hexTail(logical.value).slice(0, 8), blobOutcome: checkpointIdentityOf(blob), equalBytesOutcome: checkpointIdentityOf(equalBytes), mutants: verdicts });
  },
  C1: () => {
    const walks = WALK_ROOTS.map(root => ({ root, walk: walkRoot(root) }));
    const modules = Object.fromEntries(walks.map(({ root, walk }) => [root, walk.modules.length]));
    const floorsMet = WALK_ROOTS.every(root => (modules[root] ?? 0) >= (FLOORS[root] ?? Number.POSITIVE_INFINITY));
    expect(floorsMet, `module floors ${JSON.stringify(FLOORS)} over ${JSON.stringify(modules)}`).toBe(true);
    const scans = walks.flatMap(({ walk }) => walk.modules.map(path => scanSource(path, readFileSync(join(REPO, path), "utf8"))));
    const spellings = scans.flatMap(scan => scan.spellings);
    const reads = scans.flatMap(scan => scan.reads);
    const calls = scans.flatMap(scan => scan.calls);
    const callCount = scans.reduce((sum, scan) => sum + scan.callCount, 0);
    const otherSpellings = walks.flatMap(({ walk }) => walk.others.flatMap(path => rawSpellings(path, readFileSync(join(REPO, path), "utf8"))));
    const symlinks = walks.flatMap(({ walk }) => walk.symlinks);
    const unreadable = walks.flatMap(({ walk }) => walk.unreadable);
    expect(
      { spellings, reads, calls, otherSpellings, symlinks, unreadable },
      "no module spells a gp identity domain or flag or reads a gp identity field, no startsWith/endsWith/includes call runs over one, no other file spells one, and every entry below the roots is a file or a directory",
    ).toEqual({ spellings: [], reads: [], calls: [], otherSpellings: [], symlinks: [], unreadable: [] });
    expect(callCount >= CALL_FLOOR, `the call rule read ${callCount} calls (floor ${CALL_FLOOR})`).toBe(true);
    const controls = CONTROLS.map(control => {
      const scan = scanSource(`control/${control.id}.ts`, control.source);
      const posture = scan.spellings.length + scan.reads.length > 0;
      const call = scan.calls.length > 0;
      expect({ posture, call }, `control ${control.id}`).toEqual({ posture: control.posture, call: control.call });
      return `${control.id} ${control.family} posture=${posture} call=${call}`;
    });
    expect(CONTROLS.filter(control => control.family === "residual").map(control => control.id), "each residual but R-OUTSIDE has its quiet row").toEqual(RESIDUAL_FAMILIES.filter(family => family !== "R-OUTSIDE"));
    const outside = { judged: judgedPath(OUTSIDE.judged), unjudged: judgedPath(OUTSIDE.unjudged) };
    expect(outside, "R-OUTSIDE: test helpers are not judged").toEqual({ judged: true, unjudged: false });
    return done("C1", { roots: [...WALK_ROOTS], floors: { ...FLOORS }, floorsMet, callFloor: CALL_FLOOR, callFloorMet: callCount >= CALL_FLOOR, spellings, reads, calls, otherSpellings, symlinks, unreadable, controls, outside });
  },
  C2: () => {
    expect(judgeReader(readGpIdentity), "the reference reader breaks no rule").toEqual([]);
    const journal = mustRead(readOf(carrier("journal-snapshot")));
    expect(journal.value, "the journal's bare tail is carried bare").toBe(ROSTER.producer.journal.snapshotDigest);
    const upper = probeIdentity("upper");
    expect(upper.value, "a value is never case-folded").toBe(probe("upper").read.value);
    const verdicts = judged(REWRITE_MUTANTS, judgeReader);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every rewriting reader is refused").toEqual([]);
    return done("C2", { cases: ROSTER.carriers.length + PROBES.length, reference: judgeReader(readGpIdentity), mutants: verdicts });
  },
  C3: () => {
    const gate = ROSTER.producer.gate;
    expect(gate.descriptorSchema).toBe(DESCRIPTOR_SCHEMA);
    expect([gate.productFilesAtPin, gate.productFilesAtHead, gate.installedBundleHits], "the descriptor is unshipped at the pin, at gp main and in the installed bundle").toEqual([0, 0, 0]);
    const profiles = Object.fromEntries(["graph", "eval-pretty", "argv-checkpoint"].map(id => [id, mustRead(readOf(carrier(id))).profile]));
    expect(Object.values(profiles), "no descriptor: 'unknown profile'").toEqual([UNKNOWN_PROFILE, UNKNOWN_PROFILE, UNKNOWN_PROFILE]);
    const described = Object.fromEntries(["described", "described-null"].map(id => [id, probeIdentity(id).profile]));
    expect(described, "a descriptor's profile is read verbatim, null included").toEqual({ described: "graphpolicy.c1", "described-null": null });
    const refusals = Object.fromEntries(["foreign-descriptor", "other-value-descriptor"].map(id => [id, readGpIdentity(probe(id).read)]));
    const verdicts = judged(PROFILE_MUTANTS, judgeReader);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every profile mutant is refused").toEqual([]);
    return done("C3", { gate: { ...gate }, profiles, described, refusals: json(refusals), mutants: verdicts });
  },
};

describe("wb-gxd7.1 gp identity census (GPC-FEEDBACK-CONTRACT-AUDIT-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        pin: PIN,
        unknownProfile: UNKNOWN_PROFILE,
        descriptorSchema: DESCRIPTOR_SCHEMA,
        checkpointForms: CHECKPOINT_FORMS,
        callMethods: CALL_METHODS,
        walkRoots: WALK_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        floors: FLOORS,
        callFloor: CALL_FLOOR,
        identityText: `${GP_IDENTITY_TEXT.source}/${GP_IDENTITY_TEXT.flags}`,
        domainText: `${GP_DOMAIN_TEXT.source}/${GP_DOMAIN_TEXT.flags}`,
        ledger: LEDGER,
        vocabulary: VOCABULARY,
        ledgerTriple: LEDGER_TRIPLE,
        probes: PROBES.map(entry => entry.id),
        controls: CONTROLS.map(control => control.id),
        comparatorMutants: Object.keys(COMPARATOR_MUTANTS),
        argvMutants: Object.keys(ARGV_MUTANTS),
        checkpointMutants: Object.keys(CHECKPOINT_MUTANTS),
        rewriteMutants: Object.keys(REWRITE_MUTANTS),
        profileMutants: Object.keys(PROFILE_MUTANTS),
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual(json({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] }));
    // The ledger rests on producer words: each ground's quote sits in its roster line; a digest row's form is its line's words.
    const lines = ROSTER.producer.lines;
    expect(LEDGER.flatMap(entry => entry.grounds.filter(ground => !(lines[ground.line] ?? "").includes(ground.quote)).map(ground => `${entry.field} ${ground.line}`)), "every ground's quote is in its producer line").toEqual([]);
    expect(LEDGER.filter(entry => !CHECKPOINT_FORMS.includes(entry.form) && !(lines[entry.grounds[0]?.line ?? ""] ?? "").includes(entry.form)).map(entry => entry.field), "a digest row's form is its ledger line's words").toEqual([]);
    expect(ROSTER.producer.pin.startsWith(PIN), "the roster measured the pin the filing cites").toBe(true);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const posture = /Not P0: (.+?); posture, P2\./.exec(bead.notes)?.[1];
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    expect(posture, "the filing's posture fact is the roster's").toBe(ROSTER.posture);
    const coverage = [...clauses, ROSTER.posture].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.filter(ids => ids.length !== 1).length, "every clause of the filing and its posture fact sit verbatim in exactly one row label").toBe(0);
    expect(ROWS.filter(row => !coverage.some(ids => ids.includes(row.id))).map(row => row.id), "every row carries a clause of the filing").toEqual([]);
    expect(coverage, "each clause and the posture fact sit verbatim in exactly one row label, every row carrying one").toEqual([["A"], ["B"], ["C"], ["C"]]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect(bead.notes, "the filing quotes the roster's quote at the roster's citation").toContain(`Quote: '${ROSTER.quote}' ${ROSTER.citation};`);
    expect(ROSTER.quote, "the quote is the producer's line").toBe(lines["README.md:42"]);
    expect(bead.notes, "the filing's authority sentence is the roster's").toContain(`Authority: 02:30 '${ROSTER.authority}'`);
    expect(lines["02-contract-audit.md:30"] ?? "", "the authority sentence is the producer's 02:30 line").toContain(ROSTER.authority);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${PIN}`), "the citation pins the program sha").toBe(true);
    const named = /tagged \(([^)]+)\)/.exec(ROSTER.statement)?.[1]?.split(", ").flatMap(name => name.replace(/`/g, "").split("/"));
    expect(named, "the statement names its fields").toEqual(["identities.graph", "canonical_digest", "receipt.input_snapshot", "graph_digest", "checkpoint"]);
    expect(named?.filter(name => !LEDGER.some(entry => entry.field === name || entry.field.endsWith(`.${name}`))), "every field the statement names is a ledger field").toEqual([]);
    expect(/\{([^}]+)\}/.exec(clauses[1] ?? "")?.[1]?.split(", "), "clause (b)'s forms are CHECKPOINT_FORMS").toEqual([...CHECKPOINT_FORMS]);
    expect(/no (\S+) over gp identity strings/.exec(clauses[2] ?? "")?.[1]?.split("/"), "clause (c)'s methods are CALL_METHODS").toEqual([...CALL_METHODS]);
    expect(/else '([^']+)'/.exec(clauses[2] ?? "")?.[1], "clause (c)'s profile word is UNKNOWN_PROFILE").toBe(UNKNOWN_PROFILE);
    expect(/^\(a\) (\w+)\(a,b\)/.exec(clauses[0] ?? "")?.[1], "clause (a)'s comparator is the reference's").toBe(sameGpIdentity.name);
    expect(bead.notes, "the filing gates on the unshipped descriptor").toContain("D-IDENT-1 descriptor unshipped, gated");
    expect(ROSTER.codeFacts.filter(fact => !bead.notes.includes(fact)), "the filing names every code fact the roster holds").toEqual([]);
    expect(ROSTER.codeFacts.length).toBe(4);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
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
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
