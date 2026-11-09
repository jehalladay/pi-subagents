/**
 * wb-muip (MWI B-unknowns, slice PI-0, program mechanical-workflows-interop-2026-11-04): the evidence-census judges for
 * EAT-R080 and EAT-R081, pure over injected inputs except the two readers named as such (readStoreEntries reads the declared
 * stores of a tree; readProbeReceipt parses a committed probe receipt's text). The suite is
 * test/workbench-mechanical-evidence-census.test.ts; the requirement text is vendored in
 * test/fixtures/mwi-unknowns-requirements-roster.json.
 *
 * EAT-R080 ("The prior-run census MUST distinguish repository absence from global absence"): judgePriorRuns reads the entries
 * of the declared in-repo receipt stores dated inside a declared range (undated entries are read too), finds a witness only in
 * an entry carrying all four join components (a Pi workflow run id, a Mechanical domain outcome token, a native Forge
 * operation id, a source pin), and returns found-witness or searched-scope-absence. Its global reading is WITNESSED only beside
 * a witness and UNDETERMINED otherwise: the vocabulary has no universal-absence word, and the declared unread (external) stores
 * are carried into every record. A markdown store's entries are its top-level level-2 sections as marked's lexer reads them,
 * and their HTML comment text is not read in the arrangements the suite's R080-COMMENT-TEXT rows place (markdownEntries,
 * wb-prv7; wb-ivcm: any other arrangement is NOT CLAIMED by the suite).
 *
 * EAT-R081 ("The Forge transport probe MUST settle the exit-zero failed-gate premise from producer evidence"):
 * judgeTransportPairing admits only native transcripts (declared source native-transcript, a forge identity with version and
 * revision, a native operation id, an integer process exit, a gate verdict, an argv) and returns pairing-witnessed when an
 * admitted transcript exits 0 with the native gate verdict FAIL, scoped-non-observation when admitted FAIL transcripts exist and
 * none exits 0, and UNDETERMINED otherwise. Fixtures and adapter conditionals are excluded by source, so they never upgrade it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { Lexer, type Token, type Tokens } from "marked";

/** EAT-R080 verdict words: a found witness, or absence over the searched scope only. */
export const PRIOR_RUN_VERDICTS = ["found-witness", "searched-scope-absence"] as const;
export type PriorRunVerdict = (typeof PRIOR_RUN_VERDICTS)[number];
/** The global reading: WITNESSED beside a found witness, UNDETERMINED otherwise (bounded absence never concludes global absence). */
export const GLOBAL_READINGS = ["WITNESSED", "UNDETERMINED"] as const;
export type GlobalReading = (typeof GLOBAL_READINGS)[number];

/** The four components a witness entry joins, in record order. */
export const JOIN_COMPONENTS = ["pi-run", "mechanical-outcome", "forge-operation", "source-pin"] as const;
export type JoinComponent = (typeof JOIN_COMPONENTS)[number];
/** The snake_case domain outcome tokens read as a Mechanical outcome (docs/workbench/01 J03 names them beside indeterminate). */
export const OUTCOME_TOKENS = ["verified_candidate", "verification_failed", "needs_evidence"] as const;

/**
 * The one pattern each component is read through. pi-run: wf_ and 6+ of [a-z0-9-] as a whole token (the run-id shape
 * src/workflow/task.ts mints); mechanical-outcome: one OUTCOME_TOKENS word; forge-operation: op- and 32 lowercase hex (the
 * native ids.operation_id shape); source-pin: a whole 7-40 lowercase-hex token holding a digit and a letter (a commit sha in
 * full or abbreviated; the hex inside op-, wf_ and UUID tokens is not one).
 */
export const COMPONENT_PATTERNS: Readonly<Record<JoinComponent, RegExp>> = {
  "pi-run": /(?<![A-Za-z0-9_-])wf_[a-z0-9-]{6,}(?![A-Za-z0-9_-])/,
  "mechanical-outcome": new RegExp(`(?<![A-Za-z0-9_])(?:${OUTCOME_TOKENS.join("|")})(?![A-Za-z0-9_])`),
  "forge-operation": /(?<![A-Za-z0-9_-])op-[0-9a-f]{32}(?![A-Za-z0-9_-])/,
  "source-pin": /(?<![A-Za-z0-9_-])(?=[0-9a-f]{0,39}[0-9])(?=[0-9a-f]{0,39}[a-f])[0-9a-f]{7,40}(?![A-Za-z0-9_-])/,
};

/** markdown-entries: the top-level level-2 entries of every *.md file (or of the one file named), read through marked (markdownEntries); json-files: one entry per *.json file. */
export type StoreShape = "markdown-entries" | "json-files";
const SHAPE_SUFFIX: Readonly<Record<StoreShape, string>> = { "markdown-entries": ".md", "json-files": ".json" };

export interface ReadStore {
  readonly id: string;
  /** Repository-relative: a directory (its files with the shape's suffix) or one file. */
  readonly path: string;
  readonly shape: StoreShape;
}
export interface UnreadStore {
  readonly id: string;
  readonly reason: string;
}
export interface PriorRunScope {
  /** Inclusive YYYY-MM-DD bounds on a dated entry. */
  readonly from: string;
  readonly to: string;
  readonly read: readonly ReadStore[];
  readonly unread: readonly UnreadStore[];
}
export interface StoreEntry {
  readonly store: string;
  /** The file's repository-relative path, plus #<entry index> for a markdown entry. */
  readonly ref: string;
  readonly date: string | null;
  readonly text: string;
  /** The text the join reads where it is not `text`: a markdown entry's tokens as joinTextOf reads them (markdownEntries). Absent, the join reads `text`. */
  readonly readText?: string;
}
export interface EntryReading {
  readonly ref: string;
  readonly store: string;
  readonly date: string | null;
  readonly components: readonly JoinComponent[];
}
export interface PriorRunRecord {
  readonly requirement: "EAT-R080";
  readonly verdict: PriorRunVerdict;
  readonly global: GlobalReading;
  readonly range: { readonly from: string; readonly to: string };
  /** Entries read per declared store (dated inside the range, or undated), in declaration order. */
  readonly read: readonly { readonly store: string; readonly entries: number }[];
  /** Refs of dated entries outside the range: listed, never read. */
  readonly outOfRange: readonly string[];
  readonly undated: number;
  readonly witnesses: readonly string[];
  /** Read entries carrying one to three components. */
  readonly partials: readonly EntryReading[];
  readonly unread: readonly UnreadStore[];
}

const UNAUTHORIZED = "not authorized in this phase: EAT-R080's conditions keep external stores unread";
/**
 * The live scope: Pi's three in-repo receipt stores over 2026-10-15 (the earliest dated entry at the cut) to 2026-11-06 (the
 * cut's date), and the four external stores a joined witness could also live in, each declared unread.
 */
export const PRIOR_RUN_SCOPE: PriorRunScope = {
  from: "2026-10-15",
  to: "2026-11-06",
  read: [
    { id: "pi-receipts", path: "docs/workbench/receipts", shape: "markdown-entries" },
    { id: "pi-traceability", path: "docs/workbench/TRACEABILITY.md", shape: "markdown-entries" },
    { id: "pi-qa-receipts", path: "qa/workbench/receipts", shape: "json-files" },
  ],
  unread: [
    { id: "mechanical-workflows-repository", reason: UNAUTHORIZED },
    { id: "shared-artifact-store", reason: UNAUTHORIZED },
    { id: "claude-session-journals", reason: UNAUTHORIZED },
    { id: "workbench-machine-ledger", reason: UNAUTHORIZED },
  ],
};

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const LEADING_DAY = /^(\d{4}-\d{2}-\d{2})(?!\d)/;

/** The components `text` carries, in JOIN_COMPONENTS order. */
export function joinComponentsOf(text: string): JoinComponent[] {
  return JOIN_COMPONENTS.filter((component) => COMPONENT_PATTERNS[component].test(text));
}

const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** An HTML comment as marked's html rules read one: `<!-->`, `<!--->`, or `<!--` through the next `-->` (or its token's end). */
const COMMENT = /<!--(?:-?>|[\s\S]*?(?:-->|$))/g;

function childrenOf(token: Token): readonly Token[] {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}

/**
 * The text the join reads of marked tokens: their raw text, less the comments of an html token in the arrangements the suite's
 * R080-COMMENT-TEXT rows place, a block or inline (wb-ivcm: any other arrangement, among them an html token beside another of
 * its entry or after another top-level block of it than the level-2 heading opening it, is NOT CLAIMED by the suite); a list
 * reads its items and a table its cells (its header's first), one per line,
 * and a block quote its children; any other token with children keeps its own raw text around theirs; a leaf keeps its raw
 * text, so code (fenced, indented or a code span) is read with any comment form it shows, since code renders its text.
 */
function joinTextOf(tokens: readonly Token[]): string {
  return tokens.map(joinTextOfToken).join("");
}
function joinTextOfToken(token: Token): string {
  if (token.type === "html") return token.raw.replace(COMMENT, "");
  if (isList(token)) return token.items.map((item) => joinTextOf(item.tokens)).join("\n");
  if (isTable(token)) return [...token.header, ...token.rows.flat()].map((cell) => joinTextOf(cell.tokens)).join("\n");
  const children = childrenOf(token);
  if (children.length === 0) return token.raw;
  if (token.type === "blockquote") return joinTextOf(children);
  const inner = children.map((child) => child.raw).join("");
  const at = token.raw.indexOf(inner);
  if (at < 0) throw new Error(`a ${token.type} token whose children's text is not inside its own`);
  return `${token.raw.slice(0, at)}${joinTextOf(children)}${token.raw.slice(at + inner.length)}`;
}

/**
 * A markdown receipt's entries, read through marked's lexer: the top-level level-2 headings it reads (ATX or setext; never a
 * line inside fenced or indented code, an HTML block or comment, a list item or a block quote) split the receipt. The preamble
 * before the first such heading is entry 0 (when there is one), the k-th heading opens entry k and runs to the next one or the
 * end. An entry is dated when its heading's text begins with YYYY-MM-DD. An entry's text is its lines, so the entries' texts
 * joined by LF are the input text (a CRLF pair is one line end; a lone carriage return, a line end to marked but not to the LF
 * split, is refused); the join reads its readText, the entry's tokens as joinTextOf reads them.
 */
export function markdownEntries(store: string, ref: string, text: string): StoreEntry[] {
  const lines = text.split("\n");
  const tokens = new Lexer().lex(text);
  const starts: number[] = [];
  let line = 0;
  for (const token of tokens) {
    starts.push(line);
    line += token.raw.split("\n").length - 1;
  }
  if (line !== lines.length - 1) throw new Error(`${ref}: marked reads ${line + 1} lines where the LF split reads ${lines.length} (a lone carriage return)`);
  const heads = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 ? [index] : []));
  const segments: { readonly index: number; readonly first: number; readonly end: number }[] = [];
  if (heads[0] !== 0) segments.push({ index: 0, first: 0, end: heads[0] ?? tokens.length });
  heads.forEach((head, k) => {
    segments.push({ index: k + 1, first: head, end: heads[k + 1] ?? tokens.length });
  });
  return segments.map(({ index, first, end }) => {
    const head = index === 0 ? undefined : tokens[first];
    const from = index === 0 ? 0 : (starts[first] ?? lines.length);
    const to = starts[end] ?? lines.length;
    const date = head !== undefined && isHeading(head) ? (head.text.match(LEADING_DAY)?.[1] ?? null) : null;
    return { store, ref: `${ref}#${index}`, date, text: lines.slice(from, to).join("\n"), readText: joinTextOf(tokens.slice(first, end)) };
  });
}

/** A JSON receipt as one entry, dated by its top-level utc string when that begins with YYYY-MM-DD; otherwise undated. */
export function jsonEntry(store: string, ref: string, text: string): StoreEntry {
  let date: string | null = null;
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      const utc = (parsed as Record<string, unknown>).utc;
      if (typeof utc === "string") date = utc.match(LEADING_DAY)?.[1] ?? null;
    }
  } catch {
    date = null;
  }
  return { store, ref, date, text };
}

/** Reads one declared store of the tree at `root`: its files (sorted by name) with the shape's suffix, or the one file. */
export function readStoreEntries(root: string, store: ReadStore): StoreEntry[] {
  const target = join(root, store.path);
  const suffix = SHAPE_SUFFIX[store.shape];
  const files = statSync(target).isDirectory()
    ? readdirSync(target, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(suffix))
        .map((dirent) => `${store.path}/${dirent.name}`)
        .sort()
    : [store.path];
  return files.flatMap((path) => {
    const text = readFileSync(join(root, path), "utf8");
    return store.shape === "markdown-entries" ? markdownEntries(store.id, path, text) : [jsonEntry(store.id, path, text)];
  });
}

/** EAT-R080's judgment over the entries of the declared stores. Throws on an undeclared store or a malformed range. */
export function judgePriorRuns(scope: PriorRunScope, entries: readonly StoreEntry[]): PriorRunRecord {
  if (!DAY.test(scope.from) || !DAY.test(scope.to) || scope.from > scope.to) throw new Error(`malformed range ${scope.from}..${scope.to}`);
  const counts = new Map(scope.read.map((store) => [store.id, 0]));
  const outOfRange: string[] = [];
  const witnesses: string[] = [];
  const partials: EntryReading[] = [];
  let undated = 0;
  for (const entry of entries) {
    const count = counts.get(entry.store);
    if (count === undefined) throw new Error(`entry ${entry.ref} is from undeclared store ${entry.store}`);
    if (entry.date !== null && (entry.date < scope.from || entry.date > scope.to)) {
      outOfRange.push(entry.ref);
      continue;
    }
    counts.set(entry.store, count + 1);
    if (entry.date === null) undated += 1;
    const components = joinComponentsOf(entry.readText ?? entry.text);
    if (components.length === JOIN_COMPONENTS.length) witnesses.push(entry.ref);
    else if (components.length > 0) partials.push({ ref: entry.ref, store: entry.store, date: entry.date, components });
  }
  const found = witnesses.length > 0;
  return {
    requirement: "EAT-R080",
    verdict: found ? "found-witness" : "searched-scope-absence",
    global: found ? "WITNESSED" : "UNDETERMINED",
    range: { from: scope.from, to: scope.to },
    read: scope.read.map((store) => ({ store: store.id, entries: counts.get(store.id) ?? 0 })),
    outOfRange,
    undated,
    witnesses,
    partials,
    unread: scope.unread.map((store) => ({ id: store.id, reason: store.reason })),
  };
}

/** EAT-R081 verdict words. */
export const TRANSPORT_VERDICTS = ["pairing-witnessed", "scoped-non-observation", "UNDETERMINED"] as const;
export type TransportVerdict = (typeof TRANSPORT_VERDICTS)[number];
/** The one declared source admitted as producer evidence: a captured native run of the installed producer. */
export const PRODUCER_SOURCE = "native-transcript";
export const EXCLUSION_REASONS = ["not-producer-evidence", "producer-identity-missing", "operation-id-missing", "pairing-fields-missing"] as const;
export type ExclusionReason = (typeof EXCLUSION_REASONS)[number];
/** The native ids.operation_id shape. */
const OPERATION_ID = /^op-[0-9a-f]{32}$/;
/** The native data.gate_verdict word for a failed gate. */
const FAILED_GATE = "FAIL";

export interface ProducerIdentity {
  readonly name?: string | null;
  readonly version?: string | null;
  readonly revision?: string | null;
}
export interface TransportEvidence {
  readonly id: string;
  readonly source: string;
  readonly producer?: ProducerIdentity;
  readonly argv?: readonly string[];
  readonly processExit?: number | null;
  readonly gateVerdict?: string | null;
  readonly operationId?: string | null;
}
export interface TransportRecord {
  readonly requirement: "EAT-R081";
  readonly verdict: TransportVerdict;
  readonly admitted: readonly string[];
  readonly excluded: readonly { readonly id: string; readonly reason: ExclusionReason }[];
  /** Admitted transcripts pairing process exit 0 with gate verdict FAIL. */
  readonly witnesses: readonly string[];
  /** The admitted FAIL transcripts the verdict ranges over: producer and argv of each. */
  readonly scope: readonly { readonly id: string; readonly producer: string; readonly argv: string }[];
}

const nonEmpty = (value: string | null | undefined): value is string => typeof value === "string" && value.length > 0;

function exclusionOf(item: TransportEvidence): ExclusionReason | null {
  if (item.source !== PRODUCER_SOURCE) return "not-producer-evidence";
  const producer = item.producer;
  if (producer?.name !== "forge" || !nonEmpty(producer.version) || !nonEmpty(producer.revision)) return "producer-identity-missing";
  if (typeof item.operationId !== "string" || !OPERATION_ID.test(item.operationId)) return "operation-id-missing";
  const argv = item.argv;
  if (!Number.isSafeInteger(item.processExit) || !nonEmpty(item.gateVerdict) || argv === undefined || argv.length === 0) return "pairing-fields-missing";
  return null;
}

/** EAT-R081's judgment over transport evidence items. */
export function judgeTransportPairing(evidence: readonly TransportEvidence[]): TransportRecord {
  const admitted: TransportEvidence[] = [];
  const excluded: { readonly id: string; readonly reason: ExclusionReason }[] = [];
  for (const item of evidence) {
    const reason = exclusionOf(item);
    if (reason === null) admitted.push(item);
    else excluded.push({ id: item.id, reason });
  }
  const failed = admitted.filter((item) => item.gateVerdict === FAILED_GATE);
  const witnesses = failed.filter((item) => item.processExit === 0).map((item) => item.id);
  return {
    requirement: "EAT-R081",
    verdict: witnesses.length > 0 ? "pairing-witnessed" : failed.length > 0 ? "scoped-non-observation" : "UNDETERMINED",
    admitted: admitted.map((item) => item.id),
    excluded,
    witnesses,
    scope: failed.map((item) => ({
      id: item.id,
      producer: `forge ${item.producer?.version ?? ""} (rev ${item.producer?.revision ?? ""})`,
      argv: (item.argv ?? []).join(" "),
    })),
  };
}

export interface ContractTranscript {
  readonly id: string;
  readonly envelopeStatus?: string | null;
  readonly processExit?: number | null;
}
/** The ids whose process exit differs from the contract's exit code for their envelope status (or whose status it lacks). */
export function contractMismatches(exitCodes: Readonly<Record<string, number>>, transcripts: readonly ContractTranscript[]): string[] {
  return transcripts
    .filter((item) => {
      const status = item.envelopeStatus;
      if (typeof status !== "string" || !Object.hasOwn(exitCodes, status)) return true;
      return exitCodes[status] !== item.processExit;
    })
    .map((item) => item.id);
}

export const PROBE_SCRIPT = "qa/workbench/forge-transport-probe.mjs";
export const PROBE_RECEIPT = "qa/workbench/receipts/wb-muip-forge-transport-probe.json";
export const PROBE_SCHEMA = "workbench.forge-transport-probe/v1";

export interface ProbeTranscript extends TransportEvidence, ContractTranscript {
  readonly id: string;
  readonly stepCommand: string;
  readonly envelopeExitCode: number | null;
}
export interface ProbeReceipt {
  readonly schema: string;
  readonly bead: string;
  readonly requirement: string;
  readonly utc: string;
  readonly probe: { readonly script: string; readonly scriptSha256: string };
  readonly producer: { readonly name: string; readonly version: string; readonly revision: string; readonly variant: string | null; readonly executableSha256: string | null };
  readonly exitCodeContract: { readonly argv: readonly string[]; readonly processExit: number | null; readonly exitCodes: Readonly<Record<string, number>> };
  readonly transcripts: readonly ProbeTranscript[];
}

type Json = Record<string, unknown>;
const isObject = (value: unknown): value is Json => value !== null && typeof value === "object" && !Array.isArray(value);
function objectAt(owner: Json, key: string, where: string): Json {
  const value = owner[key];
  if (!isObject(value)) throw new Error(`${where}.${key} is not an object`);
  return value;
}
function stringAt(owner: Json, key: string, where: string): string {
  const value = owner[key];
  if (typeof value !== "string") throw new Error(`${where}.${key} is not a string`);
  return value;
}
function optionalString(owner: Json, key: string, where: string): string | null {
  const value = owner[key];
  if (value === null || typeof value === "string") return value;
  throw new Error(`${where}.${key} is neither a string nor null`);
}
function optionalNumber(owner: Json, key: string, where: string): number | null {
  const value = owner[key];
  if (value === null || typeof value === "number") return value;
  throw new Error(`${where}.${key} is neither a number nor null`);
}
function stringsAt(owner: Json, key: string, where: string): string[] {
  const value: unknown = owner[key];
  const items: readonly unknown[] = Array.isArray(value) ? value : [];
  const strings = items.filter((item): item is string => typeof item === "string");
  if (!Array.isArray(value) || strings.length !== items.length) throw new Error(`${where}.${key} is not a string array`);
  return strings;
}

/** Parses a committed probe receipt, refusing (throwing on) any field outside its recorded shape. */
export function readProbeReceipt(text: string): ProbeReceipt {
  const root: unknown = JSON.parse(text);
  if (!isObject(root)) throw new Error("probe receipt is not an object");
  const probe = objectAt(root, "probe", "receipt");
  const producer = objectAt(root, "producer", "receipt");
  const contract = objectAt(root, "exitCodeContract", "receipt");
  const codes = objectAt(contract, "exitCodes", "receipt.exitCodeContract");
  const exitCodes: Record<string, number> = {};
  for (const [status, code] of Object.entries(codes)) {
    if (typeof code !== "number") throw new Error(`receipt.exitCodeContract.exitCodes.${status} is not a number`);
    exitCodes[status] = code;
  }
  const listed: unknown = root.transcripts;
  if (!Array.isArray(listed)) throw new Error("receipt.transcripts is not an array");
  const transcripts: readonly unknown[] = listed;
  return {
    schema: stringAt(root, "schema", "receipt"),
    bead: stringAt(root, "bead", "receipt"),
    requirement: stringAt(root, "requirement", "receipt"),
    utc: stringAt(root, "utc", "receipt"),
    probe: { script: stringAt(probe, "script", "receipt.probe"), scriptSha256: stringAt(probe, "scriptSha256", "receipt.probe") },
    producer: {
      name: stringAt(producer, "name", "receipt.producer"),
      version: stringAt(producer, "version", "receipt.producer"),
      revision: stringAt(producer, "revision", "receipt.producer"),
      variant: optionalString(producer, "variant", "receipt.producer"),
      executableSha256: optionalString(producer, "executableSha256", "receipt.producer"),
    },
    exitCodeContract: { argv: stringsAt(contract, "argv", "receipt.exitCodeContract"), processExit: optionalNumber(contract, "processExit", "receipt.exitCodeContract"), exitCodes },
    transcripts: transcripts.map((item, index): ProbeTranscript => {
      const where = `receipt.transcripts[${index}]`;
      if (!isObject(item)) throw new Error(`${where} is not an object`);
      const identity = objectAt(item, "producer", where);
      return {
        id: stringAt(item, "id", where),
        source: stringAt(item, "source", where),
        stepCommand: stringAt(item, "stepCommand", where),
        argv: stringsAt(item, "argv", where),
        processExit: optionalNumber(item, "processExit", where),
        envelopeStatus: optionalString(item, "envelopeStatus", where),
        envelopeExitCode: optionalNumber(item, "envelopeExitCode", where),
        gateVerdict: optionalString(item, "gateVerdict", where),
        operationId: optionalString(item, "operationId", where),
        producer: { name: optionalString(identity, "name", `${where}.producer`), version: optionalString(identity, "version", `${where}.producer`), revision: optionalString(identity, "revision", `${where}.producer`) },
      };
    }),
  };
}
