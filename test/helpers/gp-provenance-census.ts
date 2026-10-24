/**
 * wb-gxd7.5 (GPC-FEEDBACK-CONTRACT-AUDIT-R5): the tables, references and judges of
 * test/workbench-gp-provenance-census.test.ts. Pi grounds every claim about gp in machine-captured evidence at a pinned
 * build: a build is its checkout sha plus its built-entry sha256, never its `--version` line; a capability is read from a
 * captured help/hello roster at that sha, never from skill prose, and a missing capture or binary is
 * 'prerequisite-missing', never 'not-implemented'; a vendored decision receipt is gp's own output, carries its generator
 * argv, gp sha, entry sha256 and probability_exactness, and is accepted by `gp inspect decision`.
 *
 * Pi holds no gp seam, so each acceptance leg is armed on a test-side REFERENCE and proven on its JUDGE:
 *  (a) provenanceFindings / revisionOf over provenance records (PROVENANCE rows);
 *  (b) capabilityOf / claimFindings over the captured roster test/fixtures/gp-capability-capture.json (CAPABILITY rows),
 *      with two mutant readers that take capability from SKILL.md prose and from the --version shortlist;
 *  (c) docLineClasses over markdown lines (DOC_LINES rows) and docFindings, the walk of every markdown file below the root;
 *  (d) receiptFixtureFindings over the vendored receipt test/fixtures/gp-sample-receipt.json (RECEIPT_MUTANTS rows) and
 *      vendoredReceipts, the walk of every JSON file below the root for a gp decision receipt;
 *  the live leg's resolver resolvePinnedGp over an in-memory host (RESOLVE rows).
 * RESIDUALS names each measured blind spot as a family with a pinned quiet row.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

/** The bead this census arms, and its four acceptance clauses verbatim (the bead's export row in .beads/issues.jsonl carries them). */
export const BEAD = "wb-gxd7.5";
export const ACCEPTANCE: readonly string[] = [
  "(a) a gp provenance record requires {sourceSha (40 hex), entrySha256} and rejects a 'gp 0.1.0 (commands: ...)' string as revision",
  "(b) capability claims are pinned to a captured roster fixture {help commands, hello methods, producing sha}; a missing fixture or binary yields 'prerequisite-missing', never 'not-implemented' (04:104)",
  "(c) docs census: no Pi text cites a gp revision via `--version` or asserts a gp verb served/unserved without a roster at a sha",
  "(d) a vendored receipt fixture carries generator argv, gp sha, entry sha256 and probability_exactness and passes a live-tier `gp inspect decision --json` (skip receipt when gp absent)",
];
/** Each acceptance clause's judged tables (a row of each must exist: the rule-16 literal and the roster hold them). */
export const CLAUSE_TABLES: readonly (readonly string[])[] = [["PROVENANCE"], ["CAPABILITY"], ["DOC_LINES"], ["RECEIPT_MUTANTS", "RESOLVE"]];
export const CAPTURE_FIXTURE = "test/fixtures/gp-capability-capture.json";
export const RECEIPT_FIXTURE = "test/fixtures/gp-sample-receipt.json";
export const ROSTER_FIXTURE = "test/fixtures/gp-provenance-roster.json";
/** The decision receipt's own schema id (gp inspect decision reports it), the vendored-receipt walk's marker. */
export const RECEIPT_SCHEMA = "graphpolicy.receipt.decision.v1";
/** The field set of a gp decision receipt as gp sample writes it at the captured build (gp inspect decision validates exactly these). */
export const RECEIPT_FIELDS: readonly string[] = [
  "backend_id",
  "candidates",
  "checkpoint_digest",
  "exp_log_provider",
  "graph_digest",
  "kind",
  "log_probabilities",
  "numerical_profile",
  "probabilities",
  "probability_exactness",
  "program_digest",
  "runtime_budget",
  "sample",
  "schema",
  "scores",
  "support_order",
  "temperature",
];
/** The rpc refusal a hello that proposes an op outside the worker's offer receives (captured). */
export const REFUSED_CODE = "GP_RPC_HELLO_OP_NOT_ALLOWED";

const SHA40 = /^[0-9a-f]{40}$/;
const SHA64 = /^[0-9a-f]{64}$/;
export const sha256 = (value: string | Uint8Array): string => createHash("sha256").update(value).digest("hex");
export const ruleOf = (finding: string): string => finding.split(":")[0] ?? finding;
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isStrings = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === "string");

// ---- the captured roster ---------------------------------------------------------------------------------------------

export interface Build {
  readonly sourceSha: string;
  readonly entry: string;
  readonly entrySha256: string;
  readonly checkoutClean: boolean;
  readonly programPin: string;
  readonly programPinIsAncestor: boolean;
  readonly node: string;
  readonly capturedUtc: string;
}
export interface Capture {
  readonly build: Build;
  readonly version: { readonly argv: readonly string[]; readonly exit: number; readonly stdout: string; readonly stderr: string };
  readonly help: {
    readonly argv: readonly string[];
    readonly exit: number;
    readonly stdoutBytes: number;
    readonly stdoutSha256: string;
    readonly stderr: string;
    readonly commands: readonly string[];
    readonly extensions: readonly string[];
    /** The help's own "Not implemented" paragraph, verbatim (read by the R-LISTED-NOT-SERVED residual only). */
    readonly notImplemented: readonly string[];
  };
  readonly hello: { readonly argv: readonly string[]; readonly exit: number; readonly requests: readonly string[]; readonly replies: readonly string[]; readonly stderr: string };
  readonly versionSource: {
    readonly file: string;
    readonly constLine: number;
    readonly constText: string;
    readonly line: number;
    readonly text: string;
    readonly revisions: readonly { readonly sha: string; readonly versionTsBlob: string; readonly rpcSchemaId: string }[];
  };
  readonly skillProse: { readonly file: string; readonly lines: readonly number[]; readonly atPin: readonly string[]; readonly atSource: readonly string[] };
}

/** The captured roster, or undefined when the capture file is absent: a missing capture is a missing prerequisite. */
export function readCapture(root: string, file = CAPTURE_FIXTURE): Capture | undefined {
  let text: string;
  try {
    text = readFileSync(join(root, file), "utf8");
  } catch {
    return undefined;
  }
  return JSON.parse(text) as Capture;
}

export interface Roster {
  readonly sourceSha: string;
  /** The first word of every command form the captured --help lists (its doc-10 block, then its extensions block). */
  readonly cli: readonly string[];
  /** The ops the captured hello negotiated, and the ops it refused with REFUSED_CODE. */
  readonly served: readonly string[];
  readonly refused: readonly string[];
  /** Every rpc method the captured session used: hello, the served and refused ops, close. */
  readonly rpc: readonly string[];
}

interface Reply {
  readonly id?: unknown;
  readonly ok?: unknown;
  readonly result?: { readonly ops?: unknown; readonly closed?: unknown };
  readonly error?: { readonly code?: unknown; readonly details?: { readonly ops?: unknown } };
}
const uniq = (values: readonly string[]): string[] => [...new Set(values)];

/** The roster of one capture, derived from its captured bytes alone. */
export function rosterOf(capture: Capture): Roster {
  const commandWords = capture.help.commands.flatMap((line) => /^ {2}gp ([a-z]+)/.exec(line)?.[1] ?? []);
  const extensionWords = capture.help.extensions.flatMap((line) => /^ {2}([a-z]+)/.exec(line)?.[1] ?? []);
  const replies = capture.hello.replies.map((line) => JSON.parse(line) as Reply);
  const served = replies.flatMap((reply) => (reply.ok === true && isStrings(reply.result?.ops) ? reply.result.ops : []));
  const refused = replies.flatMap((reply) => (reply.error?.code === REFUSED_CODE && isStrings(reply.error.details?.ops) ? reply.error.details.ops : []));
  const closes = replies.some((reply) => reply.result?.closed === true);
  return {
    sourceSha: capture.build.sourceSha,
    cli: uniq([...commandWords, ...extensionWords]),
    served,
    refused,
    rpc: uniq(["hello", ...served, ...refused, ...(closes ? ["close"] : [])]),
  };
}

// ---- (a) provenance --------------------------------------------------------------------------------------------------

/** Keys a reader could take as gp's revision. Only sourceSha and entrySha256 identify a build; versionLine stays opaque. */
export const REVISION_KEYS: readonly string[] = ["sourceSha", "entrySha256", "revision", "version", "sourceRevision", "commit"];
/** A version-shaped value: the --version line ("gp 0.1.0 (commands: ...)"), "gp 0.1.0", or a bare semver. */
export const versionShaped = (value: string): boolean => /^(?:gp\s+)?v?\d+\.\d+\.\d+(?:\s|$)/.test(value.trim());

/**
 * The judge of a gp provenance record, in rule order: P-RECORD (not an object; nothing else is read), P-SOURCE-SHA (the
 * checkout sha is not 40 lowercase hex), P-ENTRY-SHA256 (the built-entry digest is not 64 lowercase hex), P-VERSION-AS-
 * REVISION (a revision key holds a version-shaped value). A versionLine is kept verbatim and never read as a revision.
 */
export function provenanceFindings(record: unknown): string[] {
  if (!isRecord(record)) return ["P-RECORD: a provenance record is an object"];
  const findings: string[] = [];
  const { sourceSha, entrySha256 } = record;
  if (typeof sourceSha !== "string" || !SHA40.test(sourceSha)) findings.push(`P-SOURCE-SHA: sourceSha ${JSON.stringify(sourceSha)} is not a full 40-hex checkout sha`);
  if (typeof entrySha256 !== "string" || !SHA64.test(entrySha256)) findings.push(`P-ENTRY-SHA256: entrySha256 ${JSON.stringify(entrySha256)} is not a 64-hex built-entry sha256`);
  const versioned = REVISION_KEYS.filter((key) => {
    const value = record[key];
    return typeof value === "string" && versionShaped(value);
  });
  if (versioned.length > 0) findings.push(`P-VERSION-AS-REVISION: ${versioned.join(", ")} holds a version line, which is not a revision`);
  return findings;
}

export type Revision = { readonly ok: true; readonly sourceSha: string; readonly entrySha256: string } | { readonly ok: false; readonly code: "provenance-incomplete"; readonly rules: readonly string[] };

/** The revision of a provenance record: its sourceSha and entrySha256, or a typed refusal. Never its versionLine. */
export function revisionOf(record: unknown): Revision {
  const findings = provenanceFindings(record);
  if (findings.length > 0 || !isRecord(record)) return { ok: false, code: "provenance-incomplete", rules: findings.map(ruleOf) };
  return { ok: true, sourceSha: String(record.sourceSha), entrySha256: String(record.entrySha256) };
}

// ---- (b) capability --------------------------------------------------------------------------------------------------

export type Surface = "cli" | "rpc";
export const CLAIM_STATUSES: readonly string[] = ["listed", "unlisted", "served", "refused", "prerequisite-missing"];
export const MISSING: readonly string[] = ["capture", "binary"];
export interface Claim {
  readonly surface: Surface;
  readonly verb: string;
  readonly status: string;
  readonly sourceSha?: string;
  readonly via?: string;
  readonly code?: string;
  readonly missing?: string;
}

/**
 * The reference capability reader: a claim about one verb, read from the captured roster at its sha. An rpc op is served
 * or refused as the captured hello negotiated it, a cli verb is listed or unlisted as the captured --help lists it (a
 * listing is not service: no executed capture says a cli verb is served); without the capture, or without the binary for a
 * live probe, the claim is 'prerequisite-missing' and names what is missing.
 */
export function capabilityOf(capture: Capture | undefined, surface: Surface, verb: string, binary: "present" | "absent" = "present"): Claim {
  if (capture === undefined) return { surface, verb, status: "prerequisite-missing", missing: "capture" };
  if (binary === "absent") return { surface, verb, status: "prerequisite-missing", missing: "binary" };
  const roster = rosterOf(capture);
  const at = roster.sourceSha;
  if (surface === "rpc") {
    if (roster.served.includes(verb)) return { surface, verb, status: "served", sourceSha: at, via: "hello" };
    if (roster.refused.includes(verb)) return { surface, verb, status: "refused", sourceSha: at, via: "hello", code: REFUSED_CODE };
    return { surface, verb, status: "unlisted", sourceSha: at, via: "hello" };
  }
  return { surface, verb, status: roster.cli.includes(verb) ? "listed" : "unlisted", sourceSha: at, via: "help" };
}

/**
 * The judge of a capability claim, in rule order: C-STATUS (outside the closed vocabulary, e.g. 'not-implemented'),
 * C-MISSING (a prerequisite-missing claim that names nothing it misses, or carries a sha it never observed), C-AT-SHA (a
 * verdict not at the captured build's sha), C-VIA (a verdict not read from the captured help/hello), C-ROSTER (a verdict
 * the captured roster contradicts).
 */
export function claimFindings(claim: Claim, capture: Capture | undefined): string[] {
  const findings: string[] = [];
  if (!CLAIM_STATUSES.includes(claim.status)) findings.push(`C-STATUS: ${JSON.stringify(claim.status)} is not a capability status`);
  if (claim.status === "prerequisite-missing") {
    if (claim.missing === undefined || !MISSING.includes(claim.missing) || claim.sourceSha !== undefined) findings.push("C-MISSING: a prerequisite-missing claim names capture or binary and no sha");
    return findings;
  }
  if (capture === undefined || claim.sourceSha !== capture.build.sourceSha) findings.push(`C-AT-SHA: ${claim.surface} ${claim.verb} is not claimed at the captured sha`);
  if (claim.via !== (claim.surface === "rpc" ? "hello" : "help")) findings.push(`C-VIA: ${claim.surface} ${claim.verb} is read from ${String(claim.via)}, not the captured roster`);
  const reference = capture === undefined ? undefined : capabilityOf(capture, claim.surface, claim.verb);
  if (reference !== undefined && (reference.status !== claim.status || reference.code !== claim.code)) findings.push(`C-ROSTER: the captured roster reads ${claim.surface} ${claim.verb} ${reference.status}`);
  return findings;
}

/** Each verb's capability noun in skill prose. */
const NOUN_OF: Readonly<Record<string, string>> = { compile: "compilation", build: "compilation", eval: "evaluation", evaluate: "evaluation", sample: "sampling", train: "training" };

/** MUTANT reader: capability taken from SKILL.md prose ("... evaluation ... designed but NOT implemented"), the F05 source. */
export function proseClaim(prose: readonly string[], surface: Surface, verb: string): Claim {
  const text = prose.join(" ");
  const named = text.includes(NOUN_OF[verb] ?? verb);
  return { surface, verb, status: named && /NOT implemented/.test(text) ? "not-implemented" : "implemented", via: "skill" };
}

/** MUTANT reader: capability taken from the --version shortlist ("gp 0.1.0 (commands: graph check, ...)"). */
export function versionClaim(versionStdout: string, surface: Surface, verb: string): Claim {
  const shortlist = /\(commands: ([^;)]*)/.exec(versionStdout)?.[1] ?? "";
  const words = shortlist.split(",").map((form) => form.trim().split(" ")[0]);
  return { surface, verb, status: words.includes(verb) ? "served" : "unlisted", via: "version" };
}

// ---- (c) the docs census ---------------------------------------------------------------------------------------------

/** A gp name in text: the gp word (also a path ending in it), GraphPolicyCLI, the graph-policy-cli package. */
const NAMES_GP = /(?:^|[^A-Za-z0-9_$.-])gp(?![A-Za-z0-9_-])|GraphPolicyCLI|graph-policy-cli/i;
export const namesGp = (line: string): boolean => NAMES_GP.test(line);
/** C1 identity tokens: a "gp 0.1.0"- or "graph-policy-cli@0.1.0"-shaped version (also GraphPolicyCLI), or the --version flag. */
const VERSION_TOKEN = /(?:^|[^A-Za-z0-9_$.-])(?:gp|graph-policy-cli|GraphPolicyCLI)(?:\s+|@)v?\d+\.\d+\.\d+/i;
const VERSION_FLAG = /--version(?![A-Za-z0-9_-])/;
const escapeRegex = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** C2 verdict words, read word-bounded (never the tail of a hyphenated word such as re-implemented); a space reads any white space run. */
export const VERDICT_WORDS: readonly string[] = ["not implemented", "unimplemented", "implemented", "unserved", "not served", "served", "serves", "unsupported", "not supported", "supported", "unavailable", "available"];
/** C2 refusal codes, read anywhere and in any case (GP_CLI_NOT_IMPLEMENTED, GP_RPC_METHOD_UNSUPPORTED). */
export const VERDICT_CODES: readonly string[] = ["NOT_IMPLEMENTED", "UNSUPPORTED"];
/** The C2 verdict, built from its two vocabularies (wb-atq9: the receipt's ledger holds every member). */
const VERDICT = new RegExp(`(?:^|[^A-Za-z0-9_-])(?:${VERDICT_WORDS.map((word) => word.split(" ").map(escapeRegex).join("\\s+")).join("|")})(?![A-Za-z0-9])|${VERDICT_CODES.map(escapeRegex).join("|")}`, "i");
/** C2 capability nouns (the skill-prose form of a verb). */
export const NOUNS: readonly string[] = ["compilation", "evaluation", "sampling", "training"];
const HEX40 = /(?:^|[^0-9a-f])[0-9a-f]{40}(?![0-9a-f])/;
const HEX64 = /(?:^|[^0-9a-f])[0-9a-f]{64}(?![0-9a-f])/;

export type DocClass = "C1" | "C2";

/**
 * The classes one markdown line falls in. C1, a revision via --version: the line names gp and a version token, and does
 * not carry the build it means (a 40-hex sha and a 64-hex sha256, or the capture path). C2, a verb served/unserved without
 * a roster: the line names gp, a verdict and a roster verb in command form (`gp <verb>`, a backticked verb, a camelCase rpc
 * method) or a capability noun, and cites neither the capture path nor a 40-hex sha.
 */
export function docLineClasses(line: string, roster: Roster): DocClass[] {
  if (!NAMES_GP.test(line)) return [];
  const cites = line.includes(CAPTURE_FIXTURE);
  const classes: DocClass[] = [];
  if ((VERSION_TOKEN.test(line) || VERSION_FLAG.test(line)) && !cites && !(HEX40.test(line) && HEX64.test(line))) classes.push("C1");
  const verbs = uniq([...roster.cli, ...roster.rpc]).map(escapeRegex).join("|");
  const command = new RegExp(`(?:^|[^A-Za-z0-9_$.-])gp\\s+(?:${verbs})(?![A-Za-z0-9_-])`).test(line);
  const ticked = new RegExp(`\`(?:${verbs})(?:\\s[^\`]*)?\``).test(line);
  const named = [...roster.rpc.filter((method) => /[A-Z]/.test(method)), ...NOUNS].some((word) => new RegExp(`(?:^|[^A-Za-z0-9_$])${escapeRegex(word)}(?![A-Za-z0-9_])`).test(line));
  if ((command || ticked || named) && VERDICT.test(line) && !cites && !HEX40.test(line)) classes.push("C2");
  return classes;
}

/** Directories no census walk enters: VCS, dependencies and build output. */
export const SKIP_DIRS: readonly string[] = [".git", "node_modules", "dist", "build", "coverage", ".forge"];

/** Repository-relative, "/"-separated paths of every regular file below root whose name ends with suffix, sorted. */
export function filesBelow(root: string, suffix: string): string[] {
  const found: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.includes(entry.name)) walk(join(dir, entry.name));
      } else if (entry.isFile() && entry.name.endsWith(suffix)) {
        found.push(relative(root, join(dir, entry.name)).split("\\").join("/"));
      }
    }
  };
  walk(root);
  return found.sort();
}

export interface DocFinding {
  readonly file: string;
  readonly line: number;
  readonly cls: DocClass;
  readonly text: string;
}

/** Every C1/C2 line of one markdown text, in document order. */
export function docTextFindings(file: string, text: string, roster: Roster): DocFinding[] {
  return text.split("\n").flatMap((line, index) => docLineClasses(line, roster).map((cls) => ({ file, line: index + 1, cls, text: line })));
}

/** The docs census: every C1/C2 line of every markdown file below root. */
export function docFindings(root: string, roster: Roster): DocFinding[] {
  return filesBelow(root, ".md").flatMap((file) => docTextFindings(file, readFileSync(join(root, file), "utf8"), roster));
}

// ---- (d) the vendored receipt ----------------------------------------------------------------------------------------

/**
 * The judge of a vendored receipt fixture, in rule order: R-SHAPE (no generator or receipt object; nothing else is read),
 * R-ARGV (the generator is not `node <entry> sample ... --seed N ... --json`), R-SHA (not the captured checkout sha),
 * R-ENTRY (not the captured entry sha256), R-SCHEMA (not a decision receipt), R-FIELDS (not exactly the receipt fields),
 * R-EXACTNESS (no probability_exactness label), R-VALIDATION (no recorded gp inspect decision acceptance).
 */
export function receiptFixtureFindings(fixture: unknown, capture: Capture): string[] {
  if (!isRecord(fixture) || !isRecord(fixture.generator) || !isRecord(fixture.receipt)) return ["R-SHAPE: a receipt fixture is {generator, validation, receipt}"];
  const { generator, receipt, validation } = fixture;
  const findings: string[] = [];
  const argv = generator.argv;
  const seed = isStrings(argv) ? argv.indexOf("--seed") : -1;
  const generated = isStrings(argv) && argv[0] === "node" && argv[1] === capture.build.entry && argv[2] === "sample" && seed > 2 && /^\d+$/.test(argv[seed + 1] ?? "") && argv.includes("--json");
  if (!generated) findings.push("R-ARGV: the receipt is not gp sample output with its argv recorded");
  if (generator.sourceSha !== capture.build.sourceSha || typeof generator.sourceSha !== "string" || !SHA40.test(generator.sourceSha)) findings.push("R-SHA: the generator ran at no captured checkout sha");
  if (generator.entrySha256 !== capture.build.entrySha256 || typeof generator.entrySha256 !== "string" || !SHA64.test(generator.entrySha256)) findings.push("R-ENTRY: the generator ran no captured built entry");
  if (receipt.schema !== RECEIPT_SCHEMA) findings.push(`R-SCHEMA: the receipt schema is ${JSON.stringify(receipt.schema)}`);
  const fields = Object.keys(receipt).sort();
  if (JSON.stringify(fields) !== JSON.stringify(RECEIPT_FIELDS)) findings.push(`R-FIELDS: the receipt carries ${fields.join(",")}`);
  if (typeof receipt.probability_exactness !== "string" || receipt.probability_exactness === "") findings.push("R-EXACTNESS: the receipt carries no probability_exactness label");
  if (!isRecord(validation) || validation.exit !== 0 || validation.ok !== true || validation.valid !== true) findings.push("R-VALIDATION: no recorded gp inspect decision acceptance");
  return findings;
}

export interface VendoredReceipt {
  readonly file: string;
  readonly pointer: string;
}
/** The registry of vendored gp decision receipts: each sits at /receipt of a fixture receiptFixtureFindings judges clean. */
export const VENDORED_RECEIPTS: readonly VendoredReceipt[] = [{ file: RECEIPT_FIXTURE, pointer: "/receipt" }];

/** Every object of one JSON value whose schema is the decision receipt's, by JSON pointer. */
export function receiptPointers(value: unknown, pointer = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => receiptPointers(item, `${pointer}/${index}`));
  if (!isRecord(value)) return [];
  const own = value.schema === RECEIPT_SCHEMA ? [pointer] : [];
  return [...own, ...Object.entries(value).flatMap(([key, item]) => receiptPointers(item, `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`))];
}

export interface ReceiptWalk {
  readonly files: readonly string[];
  readonly unparsed: readonly string[];
  readonly receipts: readonly VendoredReceipt[];
}

/** The vendored-receipt walk: every JSON file below root, parsed, and every decision receipt inside it. */
export function vendoredReceipts(root: string): ReceiptWalk {
  const files = filesBelow(root, ".json");
  const unparsed: string[] = [];
  const receipts: VendoredReceipt[] = [];
  for (const file of files) {
    let value: unknown;
    try {
      value = JSON.parse(readFileSync(join(root, file), "utf8"));
    } catch {
      unparsed.push(file);
      continue;
    }
    for (const pointer of receiptPointers(value)) receipts.push({ file, pointer });
  }
  return { files, unparsed, receipts };
}

// ---- the live leg ----------------------------------------------------------------------------------------------------

/** The host reads the resolver needs; the live leg passes the real filesystem, the RESOLVE rows an in-memory host. */
export interface HostFs {
  readonly isFile: (path: string) => boolean;
  readonly realpath: (path: string) => string;
  readonly read: (path: string) => Uint8Array;
}
export type Resolution =
  | { readonly status: "pinned"; readonly entry: string }
  | { readonly status: "prerequisite-missing"; readonly missing: "binary" }
  | { readonly status: "prerequisite-missing"; readonly missing: "pinned-build"; readonly entry: string; readonly observedEntrySha256: string };

/**
 * The live leg's resolver: the first gp on PATH, followed to its built entry. The entry is the pinned build only when its
 * bytes hash to the captured entry sha256; any other build is a missing prerequisite (the capture says nothing about it),
 * and no gp on PATH is a missing binary. Never 'not-implemented'.
 */
export function resolvePinnedGp(pathEnv: string | undefined, pinnedEntrySha256: string, host: HostFs): Resolution {
  for (const dir of (pathEnv ?? "").split(":")) {
    if (dir === "") continue;
    const candidate = join(dir, "gp");
    if (!host.isFile(candidate)) continue;
    const entry = host.realpath(candidate);
    const observedEntrySha256 = sha256(host.read(entry));
    return observedEntrySha256 === pinnedEntrySha256 ? { status: "pinned", entry } : { status: "prerequisite-missing", missing: "pinned-build", entry, observedEntrySha256 };
  }
  return { status: "prerequisite-missing", missing: "binary" };
}

// ---- the judged tables -----------------------------------------------------------------------------------------------

/** The --version line of the captured build, spelled here as data (each row's pin is hashed into the roster). */
export const VERSION_LINE = "gp 0.1.0 (commands: graph check, inspect errors, rpc --stdio, skill install, skill provenance, skill plugin install; protocol: graphpolicy.rpc.v1)";
const SOURCE = "3f7d52cd17397d8ed22e2c768714a057fe098b62";
const ENTRY = "0ad799c31da1dcd3ea3abf78bb099a407072c11ce63a76c2c6a1dd6b9ba52bd4";

export interface ProvenanceCase {
  readonly record: unknown;
  readonly expect: readonly string[];
}
export interface ProvenanceRow {
  readonly id: string;
  readonly label: string;
  readonly cases: readonly ProvenanceCase[];
}

/** (a) "a gp provenance record requires {sourceSha (40 hex), entrySha256} and rejects a 'gp 0.1.0 (commands: ...)' string as revision". */
export const PROVENANCE: readonly ProvenanceRow[] = [
  {
    id: "P-ACCEPT",
    label: "a record carrying the full 40-hex checkout sha and the 64-hex built-entry sha256 is a provenance; the version line beside them stays an opaque producer string",
    cases: [
      { record: { sourceSha: SOURCE, entrySha256: ENTRY, versionLine: VERSION_LINE }, expect: [] },
      { record: { sourceSha: SOURCE, entrySha256: ENTRY }, expect: [] },
      { record: { sourceSha: SOURCE, entry: "ts/dist/main.js", entrySha256: ENTRY, node: "v24.20.0", checkoutClean: true }, expect: [] },
    ],
  },
  {
    id: "P-VERSION-LINE",
    label: "the gp --version line, or a gp version number, in a revision field is refused as a revision",
    cases: [
      { record: { sourceSha: VERSION_LINE, entrySha256: ENTRY }, expect: ["P-SOURCE-SHA", "P-VERSION-AS-REVISION"] },
      { record: { sourceSha: "0.1.0", entrySha256: ENTRY }, expect: ["P-SOURCE-SHA", "P-VERSION-AS-REVISION"] },
      { record: { sourceSha: SOURCE, entrySha256: ENTRY, revision: VERSION_LINE }, expect: ["P-VERSION-AS-REVISION"] },
      { record: { version: "gp 0.1.0", entrySha256: ENTRY }, expect: ["P-SOURCE-SHA", "P-VERSION-AS-REVISION"] },
    ],
  },
  {
    id: "P-SOURCE-SHA",
    label: "a checkout sha that is not the full 40 lowercase hex is refused: an abbreviated, upper-case, padded or 39-digit sha",
    cases: [
      { record: { sourceSha: SOURCE.slice(0, 7), entrySha256: ENTRY }, expect: ["P-SOURCE-SHA"] },
      { record: { sourceSha: SOURCE.slice(0, 12), entrySha256: ENTRY }, expect: ["P-SOURCE-SHA"] },
      { record: { sourceSha: SOURCE.toUpperCase(), entrySha256: ENTRY }, expect: ["P-SOURCE-SHA"] },
      { record: { sourceSha: ` ${SOURCE}`, entrySha256: ENTRY }, expect: ["P-SOURCE-SHA"] },
      { record: { sourceSha: SOURCE.slice(1), entrySha256: ENTRY }, expect: ["P-SOURCE-SHA"] },
    ],
  },
  {
    id: "P-ENTRY-SHA256",
    label: "a built-entry digest that is not 64 lowercase hex is refused: absent, qualified, a git sha, or the two identities swapped",
    cases: [
      { record: { sourceSha: SOURCE, versionLine: VERSION_LINE }, expect: ["P-ENTRY-SHA256"] },
      { record: { sourceSha: SOURCE, entrySha256: `sha256:${ENTRY}` }, expect: ["P-ENTRY-SHA256"] },
      { record: { sourceSha: SOURCE, entrySha256: SOURCE }, expect: ["P-ENTRY-SHA256"] },
      { record: { sourceSha: ENTRY, entrySha256: SOURCE }, expect: ["P-SOURCE-SHA", "P-ENTRY-SHA256"] },
    ],
  },
  {
    id: "P-NOT-A-RECORD",
    label: "a version line alone, or any non-object, is no provenance record; a record holding only the version line is refused on both identities",
    cases: [
      { record: VERSION_LINE, expect: ["P-RECORD"] },
      { record: [SOURCE, ENTRY], expect: ["P-RECORD"] },
      { record: null, expect: ["P-RECORD"] },
      { record: { versionLine: VERSION_LINE }, expect: ["P-SOURCE-SHA", "P-ENTRY-SHA256"] },
    ],
  },
];

export type Reader = "reference" | "prose" | "version" | "no-capture" | "no-binary";
export interface CapabilityCase {
  readonly reader: Reader;
  readonly surface: Surface;
  readonly verb: string;
  /** The status the reader claims, and the judge's rules over that claim. */
  readonly status: string;
  readonly expect: readonly string[];
}
export interface CapabilityRow {
  readonly id: string;
  readonly label: string;
  readonly cases: readonly CapabilityCase[];
}

/** (b) "capability claims are pinned to a captured roster fixture {help commands, hello methods, producing sha}; a missing fixture or binary yields 'prerequisite-missing', never 'not-implemented'". */
export const CAPABILITY: readonly CapabilityRow[] = [
  {
    id: "B-SERVED",
    label: "every op the captured hello negotiated is served at the captured sha, read from the hello",
    cases: ["compile", "evaluate", "inspect", "sample", "validateGraph"].map((verb) => ({ reader: "reference", surface: "rpc", verb, status: "served", expect: [] })),
  },
  {
    id: "B-REFUSED",
    label: "every op the captured hello refused is refused at the captured sha with the producer's refusal code",
    cases: ["train", "feedback", "promote", "acknowledgeState"].map((verb) => ({ reader: "reference", surface: "rpc", verb, status: "refused", expect: [] })),
  },
  {
    id: "B-LISTED",
    label: "a cli verb the captured --help lists is listed at the captured sha, never claimed served from the listing",
    cases: ["graph", "build", "inspect", "eval", "sample", "train", "benchmark", "feedback", "promote", "rpc", "compose", "store", "profile", "conformance", "state", "journal", "skill"].map((verb) => ({
      reader: "reference",
      surface: "cli",
      verb,
      status: "listed",
      expect: [],
    })),
  },
  {
    id: "B-UNLISTED",
    label: "a verb outside the captured roster is unlisted at the captured sha, never not-implemented",
    cases: [
      { reader: "reference", surface: "cli", verb: "validate", status: "unlisted", expect: [] },
      { reader: "reference", surface: "cli", verb: "infer", status: "unlisted", expect: [] },
      { reader: "reference", surface: "rpc", verb: "score", status: "unlisted", expect: [] },
    ],
  },
  {
    id: "B-PREREQUISITE",
    label: "a missing capture or a missing binary is prerequisite-missing naming what is missing, never not-implemented",
    cases: [
      { reader: "no-capture", surface: "cli", verb: "eval", status: "prerequisite-missing", expect: [] },
      { reader: "no-capture", surface: "rpc", verb: "train", status: "prerequisite-missing", expect: [] },
      { reader: "no-binary", surface: "rpc", verb: "sample", status: "prerequisite-missing", expect: [] },
    ],
  },
  {
    id: "B-PROSE-READER",
    label: "a reader that takes capability from the pin's SKILL.md prose claims not-implemented and is refused on every rule",
    cases: [
      { reader: "prose", surface: "rpc", verb: "evaluate", status: "not-implemented", expect: ["C-STATUS", "C-AT-SHA", "C-VIA", "C-ROSTER"] },
      { reader: "prose", surface: "rpc", verb: "sample", status: "not-implemented", expect: ["C-STATUS", "C-AT-SHA", "C-VIA", "C-ROSTER"] },
      { reader: "prose", surface: "cli", verb: "train", status: "not-implemented", expect: ["C-STATUS", "C-AT-SHA", "C-VIA", "C-ROSTER"] },
    ],
  },
  {
    id: "B-VERSION-READER",
    label: "a reader that takes capability from the --version shortlist misreads the roster and is refused",
    cases: [
      { reader: "version", surface: "cli", verb: "eval", status: "unlisted", expect: ["C-AT-SHA", "C-VIA", "C-ROSTER"] },
      { reader: "version", surface: "rpc", verb: "evaluate", status: "unlisted", expect: ["C-AT-SHA", "C-VIA", "C-ROSTER"] },
      { reader: "version", surface: "cli", verb: "graph", status: "served", expect: ["C-AT-SHA", "C-VIA", "C-ROSTER"] },
    ],
  },
];

/** One reader's claim for a CAPABILITY case. */
export function readClaim(entry: CapabilityCase, capture: Capture): Claim {
  switch (entry.reader) {
    case "reference":
      return capabilityOf(capture, entry.surface, entry.verb);
    case "no-capture":
      return capabilityOf(undefined, entry.surface, entry.verb);
    case "no-binary":
      return capabilityOf(capture, entry.surface, entry.verb, "absent");
    case "prose":
      return proseClaim(capture.skillProse.atPin, entry.surface, entry.verb);
    case "version":
      return versionClaim(capture.version.stdout, entry.surface, entry.verb);
  }
}

export interface DocCase {
  readonly line: string;
  readonly expect: readonly DocClass[];
}
export interface DocRow {
  readonly id: string;
  readonly label: string;
  readonly cases: readonly DocCase[];
}

const PINNED = `${SOURCE} (entry sha256 ${ENTRY})`;

/** (c) "docs census: no Pi text cites a gp revision via `--version` or asserts a gp verb served/unserved without a roster at a sha". */
export const DOC_LINES: readonly DocRow[] = [
  {
    id: "D-C1-VERSION",
    label: "a line naming gp by its version number or its --version output cites a revision via --version",
    cases: [
      { line: "gp's wire vocabulary as measured from gp 0.1.0 on this host", expect: ["C1"] },
      { line: "The Dependencies row for gp carries the measured `gp --version` line verbatim.", expect: ["C1"] },
      { line: 'the installed gp prints "gp 0.1.0 (commands: graph check)" for --version', expect: ["C1"] },
      { line: "Pi pins GraphPolicyCLI 0.1.0.", expect: ["C1"] },
      { line: "run /usr/local/bin/gp --version to identify the build", expect: ["C1"] },
      { line: "Pi depends on graph-policy-cli@0.1.0.", expect: ["C1"] },
      { line: `measured from gp 0.1.0 at ${SOURCE}, without the entry it ran`, expect: ["C1"] },
    ],
  },
  {
    id: "D-C2-VERB",
    label: "a line asserting a gp verb or capability served or unserved, without a roster at a sha",
    cases: [
      { line: "`gp eval` is not implemented in this build.", expect: ["C2"] },
      { line: "gp train is unsupported over rpc.", expect: ["C2"] },
      { line: "the gp worker answers `train` with GP_RPC_METHOD_UNSUPPORTED", expect: ["C2"] },
      { line: "gp serves validateGraph and nothing else", expect: ["C2"] },
      { line: "gp sampling and training are designed but NOT implemented", expect: ["C2"] },
    ],
  },
  {
    id: "D-GROUNDED",
    label: "the same claims carrying the build they mean (the 40-hex sha plus the entry sha256, or the captured roster) are grounded",
    cases: [
      { line: `measured from gp 0.1.0 built from ${PINNED}`, expect: [] },
      { line: `gp rpc refuses \`train\` (unsupported) per ${CAPTURE_FIXTURE}`, expect: [] },
      { line: `gp serves validateGraph at ${SOURCE}`, expect: [] },
    ],
  },
  {
    id: "D-QUIET",
    label: "gp text that cites no revision and asserts no verb verdict, and version text that names no gp, stays quiet",
    cases: [
      { line: "Pi carries no GraphPolicyCLI (gp) integration today.", expect: [] },
      { line: "a gp client maps the GP_CLI_UNKNOWN_COMMAND refusal to a typed refusal, never a local substitute", expect: [] },
      { line: "a missing gp verb is added to GraphPolicyCLI itself, never re-implemented here", expect: [] },
      { line: "| `@forge/sdk` | 0.1.0 |", expect: [] },
      { line: "rf --version prints the rf release", expect: [] },
    ],
  },
];

/** A declarative edit of the vendored fixture: delete or set the value at a JSON pointer, or drop a flag and its value from an argv. */
export type Edit =
  | { readonly op: "delete"; readonly path: string }
  | { readonly op: "set"; readonly path: string; readonly value: unknown }
  | { readonly op: "drop-flag"; readonly path: string; readonly flag: string };
export interface ReceiptMutant {
  readonly id: string;
  readonly label: string;
  readonly edits: readonly Edit[];
  readonly expect: readonly string[];
}

/** The child of an object or an array at one pointer key, else undefined. */
const childOf = (parent: unknown, key: string): unknown => (Array.isArray(parent) ? parent[Number(key)] : isRecord(parent) ? parent[key] : undefined);

/** A deep copy of value with the edits applied in order (a pointer's parent must exist; an array parent takes an index). */
export function applyEdits(value: unknown, edits: readonly Edit[]): unknown {
  const copy: unknown = structuredClone(value);
  for (const edit of edits) {
    const keys = edit.path.split("/").slice(1).map((key) => key.replaceAll("~1", "/").replaceAll("~0", "~"));
    const last = keys.pop();
    let parent: unknown = copy;
    for (const key of keys) parent = childOf(parent, key);
    if (last === undefined || !(Array.isArray(parent) || isRecord(parent))) throw new Error(`edit ${edit.op} ${edit.path}: no parent`);
    const target: Record<string, unknown> = parent as Record<string, unknown>;
    if (edit.op === "delete") delete target[last];
    else if (edit.op === "set") target[last] = edit.value;
    else {
      const argv = target[last];
      if (!isStrings(argv) || !argv.includes(edit.flag)) throw new Error(`edit drop-flag ${edit.path}: no ${edit.flag}`);
      target[last] = argv.filter((word, index) => word !== edit.flag && argv[index - 1] !== edit.flag);
    }
  }
  return copy;
}

/** (d) "a vendored receipt fixture carries generator argv, gp sha, entry sha256 and probability_exactness and passes a live-tier gp inspect decision --json". */
export const RECEIPT_MUTANTS: readonly ReceiptMutant[] = [
  { id: "M-PIN-RECEIPT", label: "the receipt the pin committed: the same receipt without probability_exactness (gp inspect decision refuses it, exit 2)", edits: [{ op: "delete", path: "/receipt/probability_exactness" }], expect: ["R-FIELDS", "R-EXACTNESS"] },
  { id: "M-EMPTY-EXACTNESS", label: "an empty probability_exactness label", edits: [{ op: "set", path: "/receipt/probability_exactness", value: "" }], expect: ["R-EXACTNESS"] },
  { id: "M-NO-ARGV", label: "no generator argv", edits: [{ op: "delete", path: "/generator/argv" }], expect: ["R-ARGV"] },
  { id: "M-HAND-WRITTEN", label: "a generator that is not gp sample (a hand-written receipt)", edits: [{ op: "set", path: "/generator/argv", value: ["vim", "receipt.json"] }], expect: ["R-ARGV"] },
  { id: "M-NO-SEED", label: "gp sample argv without its --seed", edits: [{ op: "drop-flag", path: "/generator/argv", flag: "--seed" }], expect: ["R-ARGV"] },
  { id: "M-VERSION-SHA", label: "the generator's sha given as the --version line", edits: [{ op: "set", path: "/generator/sourceSha", value: "gp 0.1.0 (commands: graph check)" }], expect: ["R-SHA"] },
  { id: "M-SHORT-SHA", label: "the generator's sha abbreviated", edits: [{ op: "set", path: "/generator/sourceSha", value: SOURCE.slice(0, 7) }], expect: ["R-SHA"] },
  { id: "M-OTHER-ENTRY", label: "a built entry other than the captured one", edits: [{ op: "set", path: "/generator/entrySha256", value: "f".repeat(64) }], expect: ["R-ENTRY"] },
  { id: "M-EXTRA-FIELD", label: "a receipt carrying an admission field (a receipt is never an admission)", edits: [{ op: "set", path: "/receipt/admission", value: "granted" }], expect: ["R-FIELDS"] },
  { id: "M-SCHEMA", label: "a receipt relabelled to another schema", edits: [{ op: "set", path: "/receipt/schema", value: "graphpolicy.receipt.runtime.v1" }], expect: ["R-SCHEMA"] },
  { id: "M-NOT-VALIDATED", label: "no recorded gp inspect decision acceptance", edits: [{ op: "delete", path: "/validation" }], expect: ["R-VALIDATION"] },
  {
    id: "M-REFUSED",
    label: "a recorded inspect refusal (exit 2) in place of the acceptance",
    edits: [
      { op: "set", path: "/validation/exit", value: 2 },
      { op: "set", path: "/validation/ok", value: false },
      { op: "set", path: "/validation/valid", value: false },
    ],
    expect: ["R-VALIDATION"],
  },
];

/** The R-STATIC-RECEIPT members: edits the static judge stays silent on (gp inspect alone judges the values, the generator replay is not re-run). */
export const STATIC_RECEIPT_EDITS: Readonly<Record<string, readonly Edit[]>> = {
  scores: [{ op: "set", path: "/receipt/scores/0", value: 0 }],
  seed: [{ op: "set", path: "/generator/argv/14", value: "12" }],
};

export interface ResolveCase {
  readonly id: string;
  readonly label: string;
  readonly path: string | undefined;
  /** The in-memory host: path to file bytes (utf8), and symlinks (path to target). */
  readonly files: Readonly<Record<string, string>>;
  readonly links: Readonly<Record<string, string>>;
  readonly expect: string;
}
const PINNED_BYTES = "pinned entry bytes";

/** The live leg's resolver over in-memory hosts: the pinned build, another build, no binary. */
export const RESOLVE: readonly ResolveCase[] = [
  { id: "L-PINNED", label: "the first gp on PATH whose entry hashes to the pinned sha256 is the pinned build", path: "/bin:/opt/gp/bin", files: { "/opt/gp/dist/main.js": PINNED_BYTES }, links: { "/opt/gp/bin/gp": "/opt/gp/dist/main.js" }, expect: "pinned /opt/gp/dist/main.js" },
  { id: "L-OTHER-BUILD", label: "a gp whose entry hashes otherwise is a missing pinned build, with the observed digest", path: "/opt/gp/bin", files: { "/opt/gp/dist/main.js": "another build" }, links: { "/opt/gp/bin/gp": "/opt/gp/dist/main.js" }, expect: `prerequisite-missing pinned-build ${sha256("another build")}` },
  { id: "L-FIRST-WINS", label: "the first gp on PATH decides, as the shell's lookup does, even when a later one is pinned", path: "/a:/b", files: { "/a/gp": "another build", "/b/gp": PINNED_BYTES }, links: {}, expect: `prerequisite-missing pinned-build ${sha256("another build")}` },
  { id: "L-NO-BINARY", label: "no gp on PATH is a missing binary", path: "/bin:/usr/bin", files: { "/bin/rf": "rf" }, links: {}, expect: "prerequisite-missing binary" },
  { id: "L-NO-PATH", label: "an absent or empty PATH is a missing binary", path: undefined, files: {}, links: {}, expect: "prerequisite-missing binary" },
];

/** The in-memory host of one RESOLVE case. */
export function memoryHost(entry: ResolveCase): HostFs {
  const target = (path: string): string => entry.links[path] ?? path;
  return {
    isFile: (path) => Object.hasOwn(entry.files, target(path)),
    realpath: target,
    read: (path) => new TextEncoder().encode(entry.files[path] ?? ""),
  };
}
export const RESOLVE_PIN = sha256(PINNED_BYTES);
export const resolutionText = (resolution: Resolution): string =>
  resolution.status === "pinned" ? `pinned ${resolution.entry}` : resolution.missing === "binary" ? "prerequisite-missing binary" : `prerequisite-missing pinned-build ${resolution.observedEntrySha256}`;

export type Probe = "doc" | "provenance" | "capability" | "receipt" | "walk" | "walk-json" | "capture";

/** The R-CAPTURE-REPLAY members: capture edits no static row reads (only the live leg replays these bytes against gp). */
export const CAPTURE_EDITS: Readonly<Record<string, readonly Edit[]>> = {
  "help.stdoutSha256": [{ op: "set", path: "/help/stdoutSha256", value: "0".repeat(64) }],
  "help.stdoutBytes": [{ op: "set", path: "/help/stdoutBytes", value: 0 }],
};
/** The edits a RESIDUALS pin carries into its hash (receipt and capture probes), else none. */
export const residualEdits = (probe: Probe, pin: string): readonly Edit[] | null => (probe === "receipt" ? (STATIC_RECEIPT_EDITS[pin] ?? null) : probe === "capture" ? (CAPTURE_EDITS[pin] ?? null) : null);
export interface Residual {
  readonly id: string;
  readonly label: string;
  readonly probe: Probe;
  readonly pins: readonly string[];
}

/**
 * The named residuals: each family is a measured blind spot, each pin a quiet row (the probe reports nothing for it). A
 * probe change that reaches a member reds the row and the family is re-judged.
 */
export const RESIDUALS: readonly Residual[] = [
  { id: "R-SPLIT-LINE", label: "a revision or verdict whose gp subject sits on another line than its version token or verb", probe: "doc", pins: ["GraphPolicyCLI was measured\nat version 0.1.0 on this host.", "the gp worker\nanswers `train` as unsupported"] },
  { id: "R-ENCODED", label: "a version token or verdict hidden by an HTML entity or a markdown escape", probe: "doc", pins: ["measured from gp&#32;0.1.0 on this host", "measured from gp 0\\.1\\.0 on this host"] },
  { id: "R-PARAPHRASE", label: "a revision or capability named outside the closed token, verb and noun lists", probe: "doc", pins: ["the 0.1 build of the policy CLI is current", "gp scoring is not implemented"] },
  { id: "R-NON-MARKDOWN", label: "text outside a markdown file (a test comment, a JSON fixture): the docs census reads .md files only", probe: "walk", pins: ["test/workbench-gp-provenance-census.test.ts"] },
  { id: "R-SHAPE-ONLY", label: "a well-formed but fabricated identity: the record judge proves shape, and only the live leg binds an entry to bytes", probe: "provenance", pins: [JSON.stringify({ sourceSha: "0".repeat(40), entrySha256: "1".repeat(64) })] },
  { id: "R-LISTED-NOT-SERVED", label: "a cli verb's service: --help lists init while its own Not implemented paragraph names it, so a listing claims no service", probe: "capability", pins: ["init", "check", "test"] },
  { id: "R-STATIC-RECEIPT", label: "a receipt's numbers and the generator's replay: the static judge reads provenance and fields, gp inspect alone judges the values", probe: "receipt", pins: ["scores", "seed"] },
  { id: "R-CAPTURE-REPLAY", label: "the capture's bytes: off the pinned build only the live leg's replay binds help, hello and version to gp, and the static rows read the capture as recorded", probe: "capture", pins: ["help.stdoutSha256", "help.stdoutBytes"] },
  { id: "R-LEXICAL-GROUNDING", label: "a docs citation grounded by any 40-hex and 64-hex tokens on its line: the docs census checks the build's shape, never that it is the captured build", probe: "doc", pins: [`measured from gp 0.1.0 built from ${"0".repeat(40)} (entry sha256 ${"1".repeat(64)})`] },
  { id: "R-JSONL", label: "a receipt inside a JSON-lines file or a string: the vendored-receipt walk parses .json files and reads objects only", probe: "walk-json", pins: [".beads/issues.jsonl"] },
];

/** A named residual family and the judged rows that pin it. */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries(RESIDUALS.map((entry) => [entry.id, [`RESIDUALS ${entry.id}`]]));

/**
 * The docs census's KNOWN UNGROUNDED lines on trunk: each is a line of an append-only landed receipt (R539: never remove
 * or edit a line), measured at this cut's base, pinned by the SHA-256 of its text. The live (c) row reads the docs walk
 * equal to this set both ways, so any new citation is red and these three stay disclosed findings, never silently clean.
 */
export const KNOWN_UNGROUNDED: readonly { readonly file: string; readonly line: number; readonly cls: DocClass; readonly sha256: string }[] = [
  { file: "docs/workbench/receipts/wb-1xvp.3.md", line: 15, cls: "C1", sha256: "d75da3c9edeca8bcf35528e5e267a4869d31ac1b74bef8a64549ed2ca81de03b" },
  { file: "docs/workbench/receipts/wb-1xvp.3.md", line: 18, cls: "C1", sha256: "941936513c835eb86d85d6ede3e2c030071ec7a5ea68319119880fdce892184d" },
  { file: "docs/workbench/receipts/wb-1xvp.5.md", line: 11, cls: "C1", sha256: "8d57e1b9c6a1f6e2d66e0f1dd39eaba01d88a5a1917d761647722d88795c70df" },
];

export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  /** The SHA-256 of each pin as written. */
  readonly pins: readonly string[];
  /** The registered test of this row. */
  readonly test: string;
}
const row = (table: string, id: string, label: string, pins: readonly string[]): JudgedRow => ({ table, id, label, pins: pins.map((pin) => sha256(pin)), test: `${table} ${id}` });

export const ROWS: readonly JudgedRow[] = [
  ...PROVENANCE.map((entry) => row("PROVENANCE", entry.id, entry.label, entry.cases.map((item) => JSON.stringify(item)))),
  ...CAPABILITY.map((entry) => row("CAPABILITY", entry.id, entry.label, entry.cases.map((item) => JSON.stringify(item)))),
  ...DOC_LINES.map((entry) => row("DOC_LINES", entry.id, entry.label, entry.cases.map((item) => JSON.stringify(item)))),
  ...RECEIPT_MUTANTS.map((entry) => row("RECEIPT_MUTANTS", entry.id, entry.label, [JSON.stringify({ edits: entry.edits, expect: entry.expect })])),
  ...RESOLVE.map((entry) => row("RESOLVE", entry.id, entry.label, [JSON.stringify({ path: entry.path ?? null, files: entry.files, links: entry.links, expect: entry.expect })])),
  ...RESIDUALS.map((entry) => row("RESIDUALS", entry.id, entry.label, entry.pins.map((pin) => `${entry.probe}:${pin}${JSON.stringify(residualEdits(entry.probe, pin))}`))),
];

// ---- the outside anchors (wb-atq9, the wb-gxd7.5 gate's F1 and F2) ------------------------------------------------------

/**
 * The census's closed vocabularies, each the list its judge reads, in the judge's order. The append-only receipt's ledger
 * holds every member; the three gp names of the C1 tokens are held there through their D-C1 and D-QUIET pins.
 */
export const VOCABULARIES: Readonly<Record<string, readonly string[]>> = {
  "verdict words": VERDICT_WORDS,
  "verdict codes": VERDICT_CODES,
  "capability nouns": NOUNS,
  "revision keys": REVISION_KEYS,
  "claim statuses": CLAIM_STATUSES,
  "missing prerequisites": MISSING,
  "receipt fields": RECEIPT_FIELDS,
  "walk exclusions": SKIP_DIRS,
};

/** The follow-up bead whose append-only receipt anchors the judged set, and that receipt. */
export const FOLLOW_UP = "wb-atq9";
export const RECEIPT_DOC = `docs/workbench/receipts/${FOLLOW_UP}.md`;

/** The opening of the owner filing (the notes' second paragraph) and of its acceptance sentence. */
export const FILING_HEAD = "Owner filing (";
export const ACCEPTANCE_HEAD = "Acceptance: ";

/**
 * The owner filing of a bead's notes: their second blank-line paragraph when it opens with FILING_HEAD, else "". bd appends
 * every later note behind a blank line and never rewrites the first two paragraphs, so the filing stays byte-stable.
 */
export function ownerFiling(notes: string): string {
  const filing = notes.split("\n\n")[1] ?? "";
  return filing.startsWith(FILING_HEAD) ? filing : "";
}

/**
 * The filing's acceptance clauses, each whole: the span after its one ACCEPTANCE_HEAD up to the end of that sentence (the
 * first "." followed by a space or the paragraph's end), cut before each "; (<letter>) " marker. The clauses open (a), (b),
 * ... in order; an absent or repeated head, or clauses out of order, read as [] (no reading).
 */
export function filingClauses(filing: string): string[] {
  const start = filing.indexOf(ACCEPTANCE_HEAD);
  if (start < 0 || filing.indexOf(ACCEPTANCE_HEAD, start + 1) >= 0) return [];
  const tail = filing.slice(start + ACCEPTANCE_HEAD.length);
  const stop = /\.(?: |$)/.exec(tail);
  const clauses = (stop === null ? tail : tail.slice(0, stop.index)).split(/; (?=\([a-z]\) )/);
  return clauses.every((clause, index) => clause.startsWith(`(${String.fromCharCode(97 + index)}) `)) ? clauses : [];
}

/** The opening of the landed delivery paragraph the orchestrator appended to the notes, and of its residual line. */
export const DELIVERED_HEAD = "DELIVERED by the orchestrator collect step (";
export const DELIVERED_RESIDUALS_HEAD = "RESIDUALS (named families, each with a pinned quiet row;";

/**
 * The residual families the landed delivery named: in the first paragraph opening DELIVERED_HEAD, its first line opening
 * DELIVERED_RESIDUALS_HEAD, every R- name after that line's "): ". Written once at delivery, never rewritten.
 */
export function deliveredResiduals(notes: string): string[] {
  const paragraph = notes.split("\n\n").find((item) => item.startsWith(DELIVERED_HEAD)) ?? "";
  const line = paragraph.split("\n").find((item) => item.startsWith(DELIVERED_RESIDUALS_HEAD)) ?? "";
  const at = line.indexOf("): ");
  return at < 0 ? [] : [...line.slice(at + 3).matchAll(/\bR-[A-Z]+(?:-[A-Z]+)*/g)].map((match) => match[0]);
}

/** The receipt's ledger families: two that add members, two that remove them (applied in this order within a cut). */
export type LedgerFamily = "Judged rows" | "Vocabularies" | "Removed rows" | "Removed vocabulary members";
export const LEDGER_FAMILIES: readonly LedgerFamily[] = ["Judged rows", "Vocabularies", "Removed rows", "Removed vocabulary members"];
export const LEDGER_HEADERS: Readonly<Record<LedgerFamily, readonly string[]>> = {
  "Judged rows": ["Row", "Label", "Pins"],
  Vocabularies: ["Vocabulary", "Members"],
  "Removed rows": ["Row", "Label", "Pins"],
  "Removed vocabulary members": ["Vocabulary", "Members"],
};

/** A ledger section's heading: "<family>, wb-atq9 cut <n>" (n from 1, no leading zero), else undefined. */
export function ledgerHeading(heading: string): { readonly family: LedgerFamily; readonly cut: number } | undefined {
  const match = /^(.+), (wb-[a-z0-9.]+) cut ([1-9][0-9]*)$/.exec(heading);
  const family = LEDGER_FAMILIES.find((name) => name === match?.[1]);
  if (match === null || family === undefined || match[2] !== FOLLOW_UP) return undefined;
  return { family, cut: Number(match[3]) };
}

export interface LedgerSection {
  readonly family: LedgerFamily;
  readonly cut: number;
  /** The table's body rows, each its cells' source texts. */
  readonly rows: readonly (readonly string[])[];
}
export interface LedgerRow {
  readonly labels: readonly string[];
  readonly pins: readonly string[];
}
/** A judged set as members: each row (TABLE/ID) with its label and pin digests, each vocabulary with its member digests; sorted. */
export interface Ledger {
  readonly rows: Readonly<Record<string, LedgerRow>>;
  readonly vocabularies: Readonly<Record<string, readonly string[]>>;
}
export type LedgerReading = { readonly ok: true; readonly ledger: Ledger } | { readonly ok: false; readonly why: string };

/** A member's ledger digest: the first 16 hex digits of its sha256 (a vocabulary member's too, so no docs page spells a judged word). */
export const digest16 = (sha: string): string => sha.slice(0, 16);
const HEX16 = /^[0-9a-f]{16}$/;
const ROW_KEY = /^[A-Z_]+\/[A-Z0-9-]+$/;
const sortedOf = (values: Iterable<string>): string[] => [...values].sort();
const cellItems = (cell: string, separator: string): string[] => (cell.trim() === "" ? [] : cell.split(separator).map((item) => item.trim()));
interface OpenRow {
  readonly labels: Set<string>;
  readonly pins: Set<string>;
}

/** Applies one table row of a ledger section to the standing members; returns why it cannot apply, else "". */
function applyLedgerRow(family: LedgerFamily, cells: readonly string[], rows: Map<string, OpenRow>, vocabularies: Map<string, Set<string>>): string {
  if (cells.length !== LEDGER_HEADERS[family].length) return `a row has ${cells.length} cells`;
  if (family === "Judged rows" || family === "Removed rows") {
    const [key = "", labelCell = "", pinsCell = ""] = cells;
    const labels = cellItems(labelCell, " ");
    const pins = cellItems(pinsCell, " ");
    if (!ROW_KEY.test(key)) return `row key ${JSON.stringify(key)} is not TABLE/ID`;
    if ([...labels, ...pins].some((item) => !HEX16.test(item))) return `row ${key} carries a digest that is not 16 hex digits`;
    if (new Set(pins).size !== pins.length) return `row ${key} lists a pin twice`;
    if (family === "Judged rows") {
      if (labels.length !== 1 || pins.length === 0) return `row ${key} states ${labels.length} labels and ${pins.length} pins`;
      const open = rows.get(key) ?? { labels: new Set<string>(), pins: new Set<string>() };
      for (const label of labels) open.labels.add(label);
      for (const pin of pins) open.pins.add(pin);
      rows.set(key, open);
      return "";
    }
    const open = rows.get(key);
    if (open === undefined) return `the removal names row ${key}, which no cut added`;
    if (labels.length + pins.length === 0) return `the removal of row ${key} names no member`;
    for (const label of labels) {
      if (!open.labels.delete(label)) return `the removal names label ${label} of row ${key}, which does not stand`;
    }
    for (const pin of pins) {
      if (!open.pins.delete(pin)) return `the removal names pin ${pin} of row ${key}, which does not stand`;
    }
    if (open.labels.size === 0 && open.pins.size === 0) rows.delete(key);
    return "";
  }
  const [name = "", membersCell = ""] = cells;
  const members = cellItems(membersCell, " ");
  if (name.trim() === "" || members.length === 0) return `vocabulary ${JSON.stringify(name)} lists no member`;
  if (members.some((member) => !HEX16.test(member))) return `vocabulary ${name} carries a digest that is not 16 hex digits`;
  if (new Set(members).size !== members.length) return `vocabulary ${name} lists a member twice`;
  if (family === "Vocabularies") {
    const open = vocabularies.get(name) ?? new Set<string>();
    for (const member of members) open.add(member);
    vocabularies.set(name, open);
    return "";
  }
  const open = vocabularies.get(name);
  if (open === undefined) return `the removal names vocabulary ${name}, which no cut added`;
  for (const member of members) {
    if (!open.delete(member)) return `the removal names member ${member} of ${name}, which does not stand`;
  }
  if (open.size === 0) vocabularies.delete(name);
  return "";
}

/**
 * The ledger the receipt's sections state, read cut by cut: the cut numbers run 1..k with no gap and cut 1 states the
 * judged rows and the vocabularies; within a cut its additions apply first, then its removals. A member (a row's label, a
 * row's pin, a vocabulary's member) stands once any cut adds it and leaves only when a Removed table of a cut names it, so
 * a table that restates the set without a member removes nothing. A removal must name a standing member, and every
 * standing row ends with exactly one label and at least one pin; any other shape is no reading.
 */
export function foldLedger(sections: readonly LedgerSection[]): LedgerReading {
  const refuse = (why: string): LedgerReading => ({ ok: false, why });
  const cuts = [...new Set(sections.map((section) => section.cut))].sort((left, right) => left - right);
  if (cuts.length === 0 || cuts.some((cut, index) => cut !== index + 1)) return refuse(`the ledger's cuts are [${cuts.join(", ")}], not 1..k without a gap`);
  const first = sections.filter((section) => section.cut === 1).map((section) => section.family);
  if (!first.includes("Judged rows") || !first.includes("Vocabularies")) return refuse("cut 1 states no judged rows or no vocabularies");
  const rows = new Map<string, OpenRow>();
  const vocabularies = new Map<string, Set<string>>();
  for (const cut of cuts) {
    for (const family of LEDGER_FAMILIES) {
      for (const section of sections.filter((item) => item.cut === cut && item.family === family)) {
        for (const cells of section.rows) {
          const why = applyLedgerRow(family, cells, rows, vocabularies);
          if (why !== "") return refuse(`cut ${cut} ${family}: ${why}`);
        }
      }
    }
  }
  for (const [key, open] of rows) {
    if (open.labels.size !== 1 || open.pins.size === 0) return refuse(`row ${key} stands with ${open.labels.size} labels and ${open.pins.size} pins`);
  }
  return {
    ok: true,
    ledger: {
      rows: Object.fromEntries([...rows].map(([key, open]) => [key, { labels: sortedOf(open.labels), pins: sortedOf(open.pins) }])),
      vocabularies: Object.fromEntries([...vocabularies].map(([name, members]) => [name, sortedOf(members)])),
    },
  };
}

/** The census's own judged set as a ledger: each row's label and pins and each vocabulary's members, as digest16 of their sha256. */
export function judgedLedger(): Ledger {
  return {
    rows: Object.fromEntries(ROWS.map((entry) => [`${entry.table}/${entry.id}`, { labels: [digest16(sha256(entry.label))], pins: sortedOf(entry.pins.map(digest16)) }])),
    vocabularies: Object.fromEntries(Object.entries(VOCABULARIES).map(([name, members]) => [name, sortedOf(members.map((member) => digest16(sha256(member))))])),
  };
}

/** The two ledger tables a receipt cut states for the census as it stands, in the census's own order. */
export function ledgerEntryTables(cut: number): string {
  const table = (family: LedgerFamily, lines: readonly string[]): string =>
    [`### ${family}, ${FOLLOW_UP} cut ${cut}`, "", `| ${LEDGER_HEADERS[family].join(" | ")} |`, `| ${LEDGER_HEADERS[family].map(() => "---").join(" | ")} |`, ...lines].join("\n");
  const rows = ROWS.map((entry) => `| ${entry.table}/${entry.id} | ${digest16(sha256(entry.label))} | ${entry.pins.map(digest16).join(" ")} |`);
  const vocabularies = Object.entries(VOCABULARIES).map(([name, members]) => `| ${name} | ${members.map((member) => digest16(sha256(member))).join(" ")} |`);
  return `${table("Judged rows", rows)}\n\n${table("Vocabularies", vocabularies)}\n`;
}
